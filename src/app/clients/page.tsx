'use client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { EmptyState } from '@/components/ui/empty-state'
import { Search, Users, Eye } from 'lucide-react'
import type { Client, ClientType } from '@/lib/types'

const STATUS_OPTIONS = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
]

const TYPE_OPTIONS: { value: ClientType; label: string }[] = [
  { value: 'Constructora', label: 'Constructora' },
  { value: 'Contratista', label: 'Contratista' },
  { value: 'Arquitecto', label: 'Arquitecto' },
  { value: 'Ingeniero', label: 'Ingeniero' },
  { value: 'Instalador', label: 'Instalador' },
  { value: 'Empresa', label: 'Empresa' },
  { value: 'Gobierno', label: 'Gobierno' },
  { value: 'Revendedor', label: 'Revendedor' },
  { value: 'Particular', label: 'Particular' },
]

export default function ClientsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
      <ClientsContent />
    </Suspense>
  )
}

function ClientsContent() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [allClients, setAllClients] = useState<Client[]>([])
  const [search, setSearch] = useState(() => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get('search') || ''
  })
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const repo = getRepository()
      const all = await repo.clients.list()
      setAllClients(all)
      applyFilters(all, search, '', '')
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyFilters(all: Client[], search: string, status: string, type: string) {
    let filtered = all
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.phone.includes(q)
      )
    }
    if (status) filtered = filtered.filter(c => c.status === status)
    if (type) filtered = filtered.filter(c => c.type === type)
    setClients(filtered)
  }

  function handleSearch() {
    applyFilters(allClients, search, statusFilter, typeFilter)
  }

  function handleStatusChange(value: string) {
    setStatusFilter(value)
    applyFilters(allClients, search, value, typeFilter)
  }

  function handleTypeChange(value: string) {
    setTypeFilter(value)
    applyFilters(allClients, search, statusFilter, value)
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
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="flex flex-wrap gap-3 p-4">
            <div className="flex-1 min-w-[200px]">
              <Input placeholder="Buscar por nombre, empresa o teléfono..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
            </div>
            <Select options={STATUS_OPTIONS} placeholder="Filtrar por estado" value={statusFilter} onChange={(e) => handleStatusChange(e.target.value)} className="w-36" />
            <Select options={TYPE_OPTIONS} placeholder="Filtrar por tipo" value={typeFilter} onChange={(e) => handleTypeChange(e.target.value)} className="w-40" />
            <Button variant="secondary" onClick={handleSearch}><Search className="h-4 w-4 mr-1.5" /> Buscar</Button>
          </CardContent>
        </Card>

        {clients.length === 0 ? (
          <EmptyState title="No hay clientes" description="Convierte prospectos a clientes desde la vista de detalle." icon={<Users className="h-8 w-8 text-gray-400" />} />
        ) : (
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Nombre</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Empresa</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Teléfono</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Tipo</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Clasificación</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Prioridad</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => router.push(`/clients/${c.id}`)}>
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.company || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                    <td className="px-4 py-3"><Badge>{c.type}</Badge></td>
                    <td className="px-4 py-3 text-gray-600">{c.classification}</td>
                    <td className="px-4 py-3"><Badge>{c.status}</Badge></td>
                    <td className="px-4 py-3"><Badge>{c.priority}</Badge></td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); router.push(`/clients/${c.id}`) }}>
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
