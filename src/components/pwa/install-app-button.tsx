'use client'
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<{ prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> } | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as { standalone?: boolean }).standalone === true

    if (isStandalone) {
      requestAnimationFrame(() => setIsInstalled(true))
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as unknown as { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> })
      setIsSupported(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    const mediaQuery = window.matchMedia('(display-mode: browser)')
    const checkInstalled = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches
      setIsInstalled(standalone)
    }
    mediaQuery.addEventListener('change', checkInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      mediaQuery.removeEventListener('change', checkInstalled)
    }
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  if (isInstalled || !isSupported) return null

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
      title="Instalar aplicación"
    >
      <Download className="h-4 w-4" />
      <span className="hidden lg:inline">Instalar</span>
    </button>
  )
}
