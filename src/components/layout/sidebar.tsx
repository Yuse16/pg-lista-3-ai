'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Users, UserPlus, PhoneCall, FileText, Calendar,
  Bot, LogOut,
} from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prospects', label: 'Prospectos', icon: UserPlus },
  { href: '/clients', label: 'Clientes', icon: Users },
  { href: '/followups', label: 'Seguimientos', icon: PhoneCall },
  { href: '/quotes', label: 'Cotizaciones', icon: FileText },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const { profile, demoMode, signOut } = useAuth()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <Bot className="h-7 w-7 text-blue-600" />
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">PG Lista 3</h1>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 py-3 border-t border-gray-100 space-y-1">
        <div className="px-3 py-2 text-xs text-gray-500">
          {profile ? (
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">{profile.name}</p>
              <p className="text-xs text-gray-400">{profile.role === 'admin' ? 'Administrador' : 'Vendedor'}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Vendedor Nogalera</p>
          )}
          {demoMode && <p className="mt-1 text-xs text-amber-600" title="Datos guardados solo en este dispositivo. No se sincronizan.">Modo demo — datos locales</p>}
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
