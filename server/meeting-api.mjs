import { createHash } from 'node:crypto'
import htmlParser from 'node-html-parser'

const { parse } = htmlParser
const origin = 'https://wol.jw.org'
const sourcePath = /^\/es\/wol\/(?:meetings|d|bc|b|pc)\/r4\/lp-s\/[a-z0-9/]+$/
const biblePath = /^\/es\/wol\/bc\/r4\/lp-s\/\d+\/\d+(?:\/\d+)?$/
const lessonPath = /^\/es\/wol\/pc\/r4\/lp-s\/\d+\/\d+\/\d+$/
const durationPattern = /\((\d+)\s+mins?\.?\)/iu
const sections = {
  'TESOROS DE LA BIBLIA': 'tesoros',
  'SEAMOS MEJORES MAESTROS': 'maestros',
  'NUESTRA VIDA CRISTIANA': 'vida',
}

class InvalidRequest extends Error {}

function clean(text = '') {
  return text.replace(/\s+/gu, ' ').trim()
}

async function fetchPage(path) {
  let url = new URL(path, origin)
  const signal = AbortSignal.timeout(12000)
  for (let step = 0; step < 5; step += 1) {
    if (url.origin !== origin || !sourcePath.test(url.pathname)) {
      throw new Error('WOL devolvió un enlace que no se pudo reconocer.')
    }
    let response
    try {
      response = await fetch(url, { redirect: 'manual', signal })
    } catch {
      throw new Error('No se pudo conectar con WOL. Comprueba tu conexión y vuelve a intentar.')
    }
    if (response.ok) {
      return { document: parse(await response.text()), fragment: decodeURIComponent(url.hash.slice(1)), pathname: url.pathname }
    }
    const location = response.headers.get('location')
    if (response.status >= 300 && response.status < 400 && location) {
      const next = new URL(location, url)
      if (!next.hash) next.hash = url.hash
      url = next
    } else {
      break
    }
  }
  throw new Error('WOL no devolvió el contenido solicitado.')
}

function meetingWeek(input) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input || '')) throw new InvalidRequest('Selecciona una fecha válida.')
  const date = new Date(input + 'T00:00:00Z')
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== input) {
    throw new InvalidRequest('Selecciona una fecha válida.')
  }
  const monday = new Date(date)
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7))
  const thursday = new Date(monday)
  thursday.setUTCDate(thursday.getUTCDate() + 3)
  const year = thursday.getUTCFullYear()
  const firstDay = new Date(Date.UTC(year, 0, 1))
  const week = Math.ceil(((thursday - firstDay) / 86400000 + 1) / 7)
  return { monday: monday.toISOString().slice(0, 10), index: year + '/' + String(week).padStart(2, '0') }
}

function referenceFor(anchor) {
  const label = clean(anchor.text)
  const href = anchor.getAttribute('href')
  if (!label || !href) return null
  let url
  try {
    url = new URL(href, origin)
  } catch {
    return null
  }
  if (![origin, 'https://www.jw.org'].includes(url.origin)) return null
  const bible = url.origin === origin && biblePath.test(url.pathname)
  return { label, url: url.href, bible }
}

function references(node) {
  return node.querySelectorAll('a[href]').map(referenceFor).filter(Boolean)
}

function guideRuns(node, style) {
  if (node.nodeType === 3) return [{ text: node.text, style }]
  if (node.nodeType !== 1 || node.classList.contains('pageNum')) return []
  if (node.tagName === 'BR') return [{ text: ' ', style }]
  const reference = node.tagName === 'A' ? referenceFor(node) : null
  if (reference) return [{ text: node.text, reference }]
  const emphasis = { STRONG: 'bold', B: 'bold', EM: 'italic', I: 'italic' }[node.tagName] || style
  return node.childNodes.flatMap(child => guideRuns(child, emphasis))
}

function guideParts(article) {
  const parts = []
  let section = 'apertura'
  let part
  let images = []
  const nodes = article.querySelector('.bodyTxt')?.querySelectorAll('h2,h3,p,img') || []
  for (const node of nodes) {
    const tag = node.tagName
    let text = clean(node.text)
    if (tag === 'H2') {
      const heading = sections[text.toUpperCase()]
      if (heading) {
        section = heading
        part = undefined
        images = []
      }
      continue
    }
    if (tag === 'H3') {
      const numbered = text.match(/^(\d+)\.\s+(.+)$/u)
      const number = numbered ? Number(numbered[1]) : null
      const heading = numbered?.[2] || text
      const minutes = Number(heading.match(durationPattern)?.[1] || 0)
      const title = clean(heading.replace(durationPattern, ''))
      const partSection = title.toLowerCase().includes('palabras de conclusión') ? 'cierre' : section
      part = {
        id: [partSection, number ?? '', title.toLowerCase()].join('|'),
        number, title, section: partSection, minutes, images,
        details: [], blocks: [], links: references(node), speech: section === 'tesoros' && number === 1, points: [],
      }
      parts.push(part)
      images = []
      continue
    }
    if (tag === 'IMG') {
      const src = node.getAttribute('src')
      if (src?.startsWith('/es/wol/mp/r4/lp-s/')) {
        const image = { url: origin + src, alt: node.getAttribute('alt') || '' }
        const destination = part?.images || images
        destination.push(image)
      }
      continue
    }
    if (!part) continue
    const duration = text.match(/^\((\d+)\s+mins?\.?\)\s*/iu)
    if (duration) {
      part.minutes = Number(duration[1])
      text = text.slice(duration[0].length)
    }
    if (!text) continue
    const links = references(node)
    const runs = guideRuns(node)
    const firstText = runs.find(run => run.text.trim())
    if (duration && firstText && !firstText.reference) {
      firstText.text = firstText.text.replace(/^\s*\(\d+\s+mins?\.?\)\s*/iu, '')
    }
    part.blocks.push({ runs, list: Boolean(node.closest('li')) })
    part.details.push(text)
    part.links.push(...links)
    const verses = links.filter(link => link.bible)
    if (part.speech && verses.length) {
      part.points.push({ id: createHash('sha256').update(text).digest('hex'), text, verses, support: links.filter(link => !link.bible) })
    }
  }
  return parts
}

async function weeklyProgram(input) {
  const { index, monday } = meetingWeek(input)
  const { document: directory } = await fetchPage('/es/wol/meetings/r4/lp-s/' + index)
  const returnedWeek = directory.querySelector('#todayWeek')?.getAttribute('value')
  if (returnedWeek && returnedWeek !== index) throw new Error('WOL devolvió una guía de otra semana.')
  const heading = directory.querySelectorAll('h2').find(node => clean(node.text) === 'Vida y Ministerio')
  const path = heading?.nextElementSibling?.querySelector('a[href^="/es/wol/d/r4/lp-s/"]')?.getAttribute('href')
  if (!path) throw new Error('WOL todavía no muestra una guía para esta semana.')

  const { document } = await fetchPage(path)
  const article = document.querySelector('article#article')
  const label = clean(article?.querySelector('header h1')?.text)
  const reading = clean(article?.querySelector('header h2')?.text)
  const parts = article ? guideParts(article) : []
  if (!label || !parts.some(part => part.speech) || !parts.some(part => part.section === 'vida')) {
    throw new Error('No fue posible reconocer la estructura de la guía en WOL.')
  }
  return { week: monday, label, reading, source: origin + path, parts }
}

async function bibleText(path) {
  if (!biblePath.test(path)) throw new InvalidRequest('Referencia bíblica inválida.')
  const { document, fragment, pathname } = await fetchPage(path)
  const citation = fragment.match(/^v=(\d+):(\d+):(\d+)(?:-(?:(\d+):(\d+):)?(\d+))?$/)
  const chapterPage = pathname.match(/\/b\/r4\/lp-s\/[a-z0-9]+\/(\d+)\/(\d+)$/)
  if (!citation && (fragment || !chapterPage)) throw new Error('WOL no devolvió una referencia bíblica reconocible.')
  const [, book, chapter] = citation || chapterPage
  const first = Number(citation?.[3] ?? 0)
  const last = Number(citation?.[6] ?? citation?.[3] ?? Infinity)
  if ((citation?.[4] && (citation[4] !== book || citation[5] !== chapter)) || last < first) {
    throw new Error('Consulta el pasaje completo mediante su enlace en WOL.')
  }

  const verses = new Map()
  const spans = document.querySelectorAll('span.v[id^="v' + book + '-' + chapter + '-"]')
  for (const span of spans) {
    const number = Number(span.getAttribute('id').split('-')[2])
    if (number < first || number > last) continue
    for (const anchor of span.querySelectorAll('a')) {
      if (anchor.classList.contains('vl') || anchor.classList.contains('b') || /^[*+]$/.test(clean(anchor.text))) {
        anchor.remove()
      }
    }
    const lines = verses.get(number) || []
    lines.push(clean(span.text))
    verses.set(number, lines)
  }
  if (!verses.size || (citation && verses.size !== last - first + 1)) {
    throw new Error('No se encontró el texto completo de la cita en WOL.')
  }
  return Array.from(verses, ([number, lines]) => ({ number, text: lines.join(' ') }))
}

function publicationImage(node) {
  const image = node.tagName === 'IMG'
  const src = node.getAttribute(image ? 'src' : 'data-bg-image')
  if (!src) return null
  let url
  try {
    url = new URL(src, origin)
  } catch {
    return null
  }
  if (url.origin !== origin || !url.pathname.startsWith('/es/wol/mp/r4/lp-s/')) return null

  const alt = clean(node.getAttribute(image ? 'alt' : 'data-bg-image-label') || '')
  const caption = clean(node.closest('figure')?.querySelector('figcaption')?.text)
  if (!alt && !caption && !node.closest('a') && (!image || node.closest('header'))) return null

  return { url: url.href, alt, caption }
}

function publicationBlocks(article, pathname, fragment) {
  if (!article) return []
  let nodes = article.querySelectorAll('header img, header [data-bg-image], .bodyTxt h2, .bodyTxt h3, .bodyTxt h4, .bodyTxt h5, .bodyTxt p, .bodyTxt img, .bodyTxt [data-bg-image]')
  if (fragment) {
    const range = fragment.match(/^h=(\d+):\d+(?:-(\d+):(\d+))?$/)
    if (!range) return []
    const first = Number(range[1])
    const last = range[2] === undefined ? first : Number(range[2]) - (range[3] === '0' ? 1 : 0)
    const included = nodes.map((node, index) => ({ id: Number(node.getAttribute('data-pid')), index }))
      .filter(node => node.id >= first && node.id <= last)
    if (!included.length) return []
    nodes = nodes.slice(included[0].index, included[included.length - 1].index + 1)
  }

  const seenImages = new Set()
  const blocks = []
  for (const node of nodes) {
    if (node.tagName === 'IMG' || node.hasAttribute('data-bg-image')) {
      const image = publicationImage(node)
      if (image && !seenImages.has(image.url)) {
        seenImages.add(image.url)
        blocks.push({ kind: 'image', ...image })
      }
      if (!/^(?:H[2-5]|P)$/.test(node.tagName)) continue
    }
    if (node.closest('figcaption') || node.closest('.gen-field')) continue
    const text = clean(node.text)
    if (!text) continue
    if (node.tagName !== 'P') {
      blocks.push({ kind: 'heading', text })
      continue
    }
    const questionBlock = node.nextElementSibling?.classList.contains('gen-field')
      || node.classList.contains('qu') || node.classList.contains('question')
    const prompts = questionBlock ? [text] : /^Preguntas?\s*:/iu.test(text) ? text.match(/¿[^?]+\?/gu) || [text] : []
    const uid = node.getAttribute('data-pid') || createHash('sha256').update(text).digest('hex')
    blocks.push({
      kind: node.closest('.stdPullQuote') ? 'quote' : 'paragraph',
      runs: guideRuns(node),
      questions: prompts.map((label, index) => ({ id: pathname + '#' + uid + '-' + index, label })),
    })
  }
  return blocks
}

async function publicationText(path) {
  if (!lessonPath.test(path) && !/^\/es\/wol\/d\/r4\/lp-s\/\d+$/.test(path)) throw new InvalidRequest('Enlace de lección inválido.')
  const { document, fragment, pathname } = await fetchPage(path)
  const article = document.querySelector('article#article')
  const title = clean(article?.querySelector('h1')?.text)
  let paragraphs = []
  if (!fragment) {
    paragraphs = (article?.querySelectorAll('.bodyTxt p[data-pid]') || []).map(node => clean(node.text)).filter(Boolean)
  } else {
    const range = fragment.match(/^h=(\d+):\d+(?:-(\d+):(\d+))?$/)
    if (range) {
      const [, start, end, endOffset] = range
      const first = Number(start)
      const last = end === undefined ? first : Number(end) - (endOffset === '0' ? 1 : 0)
      const nodes = article?.querySelectorAll('p[data-pid],h2[data-pid],h3[data-pid]') || []
      paragraphs = nodes.filter(node => {
        const id = Number(node.getAttribute('data-pid'))
        return id >= first && id <= last
      }).map(node => clean(node.text)).filter(Boolean)
    }
  }
  if (!paragraphs.length) {
    throw new Error('Abre la lección enlazada para consultar el punto completo.')
  }
  const stanzas = (article?.querySelectorAll('.bodyTxt ol.source > li') || [])
    .filter(stanza => stanza.querySelector('.txtSrcBullet'))
    .map(stanza => stanza.querySelectorAll('p').map(line => clean(line.text)).filter(Boolean))
  const scripture = article?.querySelector('.themeScrp')
  return {
    title, paragraphs, stanzas,
    themeScriptures: scripture ? references(scripture).filter(reference => reference.bible) : [],
    context: clean(article?.querySelector('header .contextTtl')?.text),
    blocks: publicationBlocks(article, pathname, fragment),
  }
}

async function videoSource(id) {
  if (!/^pub-[a-z0-9_-]{1,90}_VIDEO$/i.test(id)) throw new InvalidRequest('Video inválido.')
  const response = await fetch('https://b.jw-cdn.org/apis/mediator/v1/media-items/S/' + id + '?clientType=www', {
    signal: AbortSignal.timeout(12000),
  })
  if (!response.ok) throw new Error('El video no está disponible en este momento.')
  const { media } = await response.json()
  const item = media?.[0]
  const files = (item?.files || []).filter(file => {
    if (!file.progressiveDownloadURL) return false
    const url = new URL(file.progressiveDownloadURL)
    return url.protocol === 'https:' && url.hostname.endsWith('.jw-cdn.org') && /\.mp4$/i.test(url.pathname)
  })
  const video = files.find(file => file.label === '480p') || files.find(file => file.label === '360p') || files[0]
  if (!video) throw new Error('No se encontró una versión reproducible de este video.')
  return { title: item.title, video: video.progressiveDownloadURL }
}

async function publicationImageResponse(path) {
  if (!/^\/es\/wol\/mp\/r4\/lp-s\/[a-z0-9_-]+\/\d+\/\d+$/i.test(path || '')) {
    throw new InvalidRequest('Imagen de la guía inválida.')
  }
  const upstream = await fetch(new URL(path, origin), {
    redirect: 'error', signal: AbortSignal.timeout(12000),
  })
  const type = upstream.headers.get('content-type')?.split(';')[0].trim()
  if (!upstream.ok || !/^image\/(?:jpeg|png|webp|gif|avif)$/i.test(type || '')) {
    throw new Error('No se encontró la imagen en WOL.')
  }
  return new Response(upstream.body, {
    headers: { 'content-type': type, 'cache-control': 'public, max-age=86400' },
  })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

export default async function meetingApi(request) {
  if (request.method !== 'GET') return json({ error: 'Método no permitido.' }, 405)
  const query = new URL(request.url).searchParams
  try {
    if (query.has('image')) return await publicationImageResponse(query.get('image'))
    if (query.has('verse')) return json(await bibleText(query.get('verse')))
    if (query.has('document')) return json(await publicationText(query.get('document')))
    if (query.has('lesson')) return json(await publicationText(query.get('lesson')))
    if (query.has('video')) return json(await videoSource(query.get('video')))
    return json(await weeklyProgram(query.get('date')))
  } catch (error) {
    return json({ error: error.message }, error instanceof InvalidRequest ? 400 : 502)
  }
}
