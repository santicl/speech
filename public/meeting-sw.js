const shellCache = 'meeting-offline-shell-v1'
const contentCache = 'meeting-offline-content-v1'
const navigationPaths = new Set(['/', '/meet', '/meet/'])

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))

async function fallback(request, cacheName, cachedRequest = request) {
  const cached = await caches.match(cachedRequest, { cacheName }).catch(() => undefined)
  if (!cached) return fetch(request)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 3000)
  try {
    const response = await fetch(request, { signal: controller.signal })
    return response.ok ? response : cached
  } catch {
    return cached
  } finally {
    clearTimeout(timeout)
  }
}

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return
  if (!request.destination && request.cache === 'reload') return
  if (request.mode === 'navigate' && navigationPaths.has(url.pathname)) {
    event.respondWith(fallback(request, shellCache, new URL('/', url).href))
  } else if (url.pathname === '/api/meeting') {
    event.respondWith(fallback(request, contentCache))
  } else if (url.pathname.startsWith('/static/') || url.pathname.startsWith('/pdfjs/')) {
    event.respondWith(fallback(request, shellCache))
  }
})
