/* global self, caches, fetch, URL, Request */
/* eslint-disable no-undef */
const CACHE_NAME = 'pglista3-v1'
const STATIC_ASSETS = [
  '/offline.html',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/icon-512-maskable.svg',
  '/icons/apple-touch-icon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    })
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (url.origin !== self.location.origin) {
    return
  }

  const path = url.pathname

  const isStaticAsset = STATIC_ASSETS.some((asset) => path.startsWith(asset))
  const isNavigation = request.mode === 'navigate'
  const isIcon = path.startsWith('/icons/')

  if (isStaticAsset || isIcon) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    )
    return
  }

  if (isNavigation) {
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline.html'))
    )
    return
  }

  event.respondWith(fetch(request))
})
