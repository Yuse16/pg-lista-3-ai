'use client'
import { Search, Bell, User, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { InstallAppButton } from '@/components/pwa/install-app-button'

export function Topbar() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const { profile, demoMode } = useAuth()
  const [showDemoInfo, setShowDemoInfo] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/prospects?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar prospectos, clientes..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
          />
        </div>
      </form>
      <div className="flex items-center gap-1">
        {demoMode && (
          <div className="relative">
            <button
              onClick={() => setShowDemoInfo(!showDemoInfo)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 mr-2 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <Info className="h-3.5 w-3.5" />
              Demo
            </button>
            {showDemoInfo && (
              <div className="absolute top-full right-0 mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-xs text-gray-600 space-y-1.5">
                <p className="font-medium text-gray-900">Modo demo</p>
                <p>Los datos se guardan solamente en este dispositivo (localStorage).</p>
                <p>Borrar los datos del navegador puede eliminarlos.</p>
                <p>La conexión con Supabase llegará en una fase posterior.</p>
              </div>
            )}
          </div>
        )}
        <InstallAppButton />
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200 ml-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {profile?.name || 'Vendedor Nogalera'}
          </span>
        </div>
      </div>
    </header>
  )
}
