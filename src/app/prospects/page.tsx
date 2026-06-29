'use client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, statusOptions } from '@/components/ui/select'
import { EmptyState } from '@/components/ui/empty-state'
import { Plus, Search, UserPlus, Eye } from 'lucide-react'
import type { Prospect } from '@/lib/types'

const PROSPECT_STATUSES = ['Nuevo', 'Contactado', 'Interesado', 'Cotización enviada', 'Seguimiento', 'Ganado', 'Perdido', 'Archivado'] as const
const PRIORITIES = ['Crítica', 'Alta', 'Media', 'Baja'] as const

export default function ProspectsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
      <ProspectsContent />
    </Suspense>
  )
}

function ProspectsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [allProspects, setAllProspects] = useState<Prospect[]>([])
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const repo = getRepository()
      const all = await repo.prospects.list()
      setAllProspects(all)
      const params = new URLSearchParams(window.location.search)
      const searchParam = params.get('search') || ''
      setSearch(searchParam)
      applyFilters(all, searchParam, '', '')
      setLoading(false)
    }
    load()
  }, [])

  function applyFilters(all: Prospect[], search: string, status: string, priority: string) {
    let filtered = all
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.phone.includes(q)
      )
    }
    if (status) filtered = filtered.filter(p => p.status === status)
    if (priority) filtered = filtered.filter(p => p.priority === priority)
    setProspects(filtered)
  }

  function handleSearch() {
    applyFilters(allProspects, search, statusFilter, priorityFilter)
  }

  function handleStatusChange(value: string) {
    setStatusFilter(value)
    applyFilters(allProspects, search, value, priorityFilter)
  }

  function handlePriorityChange(value: string) {
    setPriorityFilter(value)
    applyFilters(allProspects, search, statusFilter, value)
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Prospectos</h1>
          <Button onClick={() => router.push('/prospects/new')}>
            <Plus className="h-4 w-4 mr-1.5" /> Nuevo Prospecto
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="flex flex-wrap gap-3 p-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Buscar por nombre, empresa o teléfono..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Select
              options={statusOptions(PROSPECT_STATUSES)}
              placeholder="Filtrar por estado"
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-44"
            />
            <Select
              options={statusOptions(PRIORITIES)}
              placeholder="Filtrar por prioridad"
              value={priorityFilter}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className="w-40"
            />
            <Button variant="secondary" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-1.5" /> Buscar
            </Button>
          </CardContent>
        </Card>

        {prospects.length === 0 ? (
          <EmptyState
            title="No hay prospectos"
            description="Registra tu primer prospecto para comenzar a dar seguimiento."
            action={{ label: 'Registrar Prospecto', href: '/prospects/new' }}
            icon={<UserPlus className="h-8 w-8 text-gray-400" />}
          />
        ) : (
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Empresa</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Teléfono</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Prioridad</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Próxima acción</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prospects.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push(`/prospects/${p.id}`)}>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-600">{p.company}</td>
                    <td className="px-4 py-3 text-gray-600">{p.phone}</td>
                    <td className="px-4 py-3"><Badge>{p.status}</Badge></td>
                    <td className="px-4 py-3"><Badge>{p.priority}</Badge></td>
                    <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">{p.nextAction || '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); router.push(`/prospects/${p.id}`) }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
