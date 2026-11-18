import { isCongregationStudy, meetingImage, meetingUrl, referenceRequest } from './meetingData'

const shellCache = 'meeting-offline-shell-v1'
const contentCache = 'meeting-offline-content-v1'
const shellUrl = '/'

function marker(week) {
  return '/meeting-offline-status/' + week
}

function jsonResponse(value) {
  return new Response(JSON.stringify(value), { headers: { 'content-type': 'application/json; charset=utf-8' } })
}

function checkResponse(response, type) {
  if (!response.ok || !response.headers.get('content-type')?.includes(type)) {
    throw new Error('El servidor no devolvió el contenido solicitado.')
  }
  return response
}

async function workerReady() {
  const workers = navigator.serviceWorker
  await workers.register('/meeting-sw.js', { scope: '/' })
  let timeout
  try {
    await Promise.race([
      workers.ready,
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error('El navegador no pudo activar el acceso sin conexión.')), 12000)
      }),
    ])
  } finally {
    clearTimeout(timeout)
  }
}

async function prepareShell(signal) {
  const cache = await caches.open(shellCache)
  const network = { cache: 'reload', signal }
  const html = checkResponse(await fetch(shellUrl, network), 'text/html')
  const document = new DOMParser().parseFromString(await html.clone().text(), 'text/html')
  const assets = Array.from(document.querySelectorAll('script[src], link[rel~="stylesheet"][href]'))
    .map(node => new URL(node.getAttribute('src') || node.getAttribute('href'), window.location.origin))
    .filter(url => url.origin === window.location.origin && url.pathname.startsWith('/static/'))
  if (!assets.some(url => url.pathname.endsWith('.js'))) throw new Error('No se encontró la aplicación que debe abrirse sin conexión.')

  await Promise.all(assets.map(async url => {
    const type = url.pathname.endsWith('.css') ? 'text/css' : 'javascript'
    const response = checkResponse(await fetch(url, network), type)
    await cache.put(url.href, response)
  }))
  await cache.put(shellUrl, html)
  return assets.map(url => url.href)
}

function blockReferences(blocks = []) {
  return blocks.flatMap(block => (block.runs || []).flatMap(run => run.reference ? [run.reference] : []))
}

async function downloadItem(cache, task, signal) {
  if (signal.aborted) throw new Error('Descarga cancelada.')
  let response = await cache.match(task.url)
  if (response) return task.type === 'image' ? null : response.json()

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      response = checkResponse(await fetch(task.url, { signal, cache: 'reload' }), task.type === 'image' ? 'image/' : 'application/json')
      const content = task.type === 'image' ? null : await response.clone().json()
      await cache.put(task.url, response)
      return content
    } catch (error) {
      if (attempt || signal.aborted) throw error
    }
  }
}

export async function offlineStatus(guide) {
  if (!('caches' in window) || !('serviceWorker' in navigator) || !guide) return null
  const saved = await caches.match(marker(guide.week), { cacheName: contentCache })
  if (!saved) return null
  const { urls, assets, failures } = await saved.json()
  const week = await caches.match(meetingUrl({ date: guide.week }), { cacheName: contentCache })
  const copy = await week?.json()
  if (JSON.stringify(copy?.parts) !== JSON.stringify(guide.parts)) return null
  const [shell, ...resources] = await Promise.all([
    caches.match(shellUrl, { cacheName: shellCache }),
    ...assets.map(url => caches.match(url, { cacheName: shellCache })),
    ...urls.map(url => caches.match(url, { cacheName: contentCache })),
  ])
  if (!shell || resources.some(resource => !resource)) return null
  return { failures }
}

export async function downloadWeek(guide, signal, progress) {
  if (!window.isSecureContext || !('caches' in window) || !('serviceWorker' in navigator)) {
    throw new Error('La descarga sin conexión requiere HTTPS o localhost en un navegador compatible.')
  }
  const [assets] = await Promise.all([prepareShell(signal), workerReady()])
  const cache = await caches.open(contentCache)
  const queue = new Map()

  function addReference(reference, study = false) {
    const [type, value] = referenceRequest(reference)
    if (type === 'video') return
    const url = meetingUrl({ [type]: value })
    const previous = queue.get(url)
    if (previous) {
      previous.study ||= study
    } else {
      queue.set(url, { type, url, label: reference.label, study })
    }
  }

  function addImage(image) {
    const url = meetingImage(image.url)
    if (!queue.has(url)) queue.set(url, { type: 'image', url, label: image.alt || image.caption || 'Imagen de la guía' })
  }

  for (const part of guide.parts) {
    const study = isCongregationStudy(part)
    for (const reference of part.links || []) addReference(reference, study)
    for (const reference of blockReferences(part.blocks)) addReference(reference, study)
    for (const image of part.images || []) addImage(image)
    for (const point of part.points || []) {
      for (const reference of [...point.verses, ...point.support]) addReference(reference)
    }
  }

  const successful = new Set()
  const failed = new Map()
  const done = new Set()
  progress(0, queue.size)
  while (done.size < queue.size) {
    const batch = [...queue.values()].filter(task => !done.has(task.url)).slice(0, 3)
    await Promise.all(batch.map(async task => {
      try {
        const content = await downloadItem(cache, task, signal)
        if (task.type === 'document') {
          for (const citation of content.themeScriptures || []) addReference(citation)
          if (task.study) {
            for (const citation of blockReferences(content.blocks)) addReference(citation)
            for (const image of (content.blocks || []).filter(block => block.kind === 'image')) addImage(image)
          }
        }
        successful.add(task.url)
      } catch (error) {
        if (signal.aborted || error.name === 'QuotaExceededError') throw error
        failed.set(task.url, task.label)
      } finally {
        done.add(task.url)
        if (!signal.aborted) progress(done.size, queue.size)
      }
    }))
  }

  if (signal.aborted) throw new Error('Descarga cancelada.')
  const failures = [...new Set(failed.values())]
  await cache.put(meetingUrl({ date: guide.week }), jsonResponse(guide))
  await cache.put(marker(guide.week), jsonResponse({ urls: [...successful], assets, failures }))
  return { failures }
}
