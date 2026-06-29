'use client'
import { useEffect } from 'react'

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    let cancelled = false

    async function register() {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        })

        if (cancelled) return

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              const wantsUpdate = window.confirm(
                'Hay una nueva versión disponible. ¿Deseas actualizar y recargar?'
              )
              if (wantsUpdate) {
                newWorker.postMessage({ type: 'SKIP_WAITING' })
              }
            }
          })
        })
      } catch {
        console.info('Service worker registration skipped (not supported or blocked)')
      }
    }

    register()

    let refreshTimeout: ReturnType<typeof setTimeout> | null = null

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'SKIP_WAITING') {
        if (refreshTimeout) clearTimeout(refreshTimeout)
        refreshTimeout = setTimeout(() => window.location.reload(), 500)
      }
    })

    return () => {
      cancelled = true
      if (refreshTimeout) clearTimeout(refreshTimeout)
    }
  }, [])

  return null
}
