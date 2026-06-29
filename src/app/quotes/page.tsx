'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { EmptyState } from '@/components/ui/empty-state'
import { formatDate, isOverdue } from '@/lib/utils'
import { FileText, Plus, Ban, AlertTriangle } from 'lucide-react'
import type { Quote, QuoteStatus, Recommendation } from '@/lib/types'
import { generateRecommendations } from '@/lib/recommendations'

const STATUS_FILTER = [
  { value: 'Pendiente', label: 'Pendiente' },
  { value: 'Enviada', label: 'Enviada' },
  { value: 'Aceptada', label: 'Aceptada' },
  { value: 'Rechazada', label: 'Rechazada' },
  { value: 'Cancelada', label: 'Cancelada' },
]

export default function QuotesPage() {
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [nameMap, setNameMap] = useState<Record<string, string>>({})
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [cancelModal, setCancelModal] = useState<Quote | null>(null)
  const [now] = useState(Date.now)
  const [, setRecs] = useState<Recommendation[]>([])

  useEffect(() => {
    async function load() {
      const repo = getRepository()
      const [prospects, clients] = await Promise.all([
        repo.prospects.list(),
        repo.clients.list(),
      ])
      const map: Record<string, string> = {}
      prospects.forEach(p => { map[p.id] = p.name })
      clients.forEach(c => { map[c.id] = c.name })
      setNameMap(map)

      const all = await repo.quotes.list()
      all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setQuotes(all)
      setRecs(await generateRecommendations())
      setLoading(false)
    }
    load()
  }, [])

  async function loadData() {
    await applyFilters(statusFilter)
    setRecs(await generateRecommendations())
  }

  async function applyFilters(status: string) {
    const repo = getRepository()
    let all = await repo.quotes.list()
    if (status) all = all.filter(q => q.status === status)
    all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setQuotes(all)
  }

  async function handleStatusChange(value: string) {
    setStatusFilter(value)
    await applyFilters(value)
  }

  function getRelatedName(q: Quote): string {
    return nameMap[q.relatedTo] || '—'
  }

  async function handleCancel() {
    if (!cancelModal) return
    const repo = getRepository()
    await repo.quotes.cancel(cancelModal.id)
    setCancelModal(null)
    await loadData()
  }

  async function handleStatusUpdate(id: string, status: QuoteStatus) {
    const repo = getRepository()
    await repo.quotes.update(id, { status })
    await loadData()
  }

  function needsFollowUp(q: Quote): boolean {
    if (q.status === 'Cancelada' || q.status === 'Aceptada' || q.status === 'Rechazada') return false
    if (q.nextFollowUp && isOverdue(q.nextFollowUp)) return true
    const daysSince = Math.floor((now - new Date(q.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    if (q.status === 'Enviada' && daysSince > 3) return true
    return false
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
          <h1 className="text-2xl font-bold text-gray-900">Cotizaciones</h1>
          <Button onClick={() => router.push('/quotes/new')}>
            <Plus className="h-4 w-4 mr-1.5" /> Nueva Cotización
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="flex flex-wrap gap-3 p-4">
            <Select options={STATUS_FILTER} placeholder="Filtrar por estado" value={statusFilter} onChange={(e) => handleStatusChange(e.target.value)} className="w-44" />
          </CardContent>
        </Card>

        {quotes.length === 0 ? (
          <EmptyState title="No hay cotizaciones" description="Crea la primera cotización para un prospecto o cliente." action={{ label: 'Nueva Cotización', href: '/quotes/new' }} icon={<FileText className="h-8 w-8 text-gray-400" />} />
        ) : (
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Cliente / Prospecto</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Monto</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Seguimiento</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Fecha</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Cambiar estado</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map(q => (
                  <tr key={q.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Badge>{q.relatedType === 'prospect' ? 'Prospecto' : 'Cliente'}</Badge>
                        <span className="text-gray-900 font-medium">{getRelatedName(q)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">${(q.amount || 0).toLocaleString()}</td>
                    <td className="px-4 py-3"><Badge>{q.status}</Badge></td>
                    <td className="px-4 py-3">
                      {needsFollowUp(q) ? (
                        <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
                          <AlertTriangle className="h-3 w-3" /> Requiere seguimiento
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(q.date)}</td>
                    <td className="px-4 py-3">
                      <select
                        className="text-xs border border-gray-200 rounded px-2 py-1"
                        value={q.status}
                        onChange={e => handleStatusUpdate(q.id, e.target.value as QuoteStatus)}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Enviada">Enviada</option>
                        <option value="Aceptada">Aceptada</option>
                        <option value="Rechazada">Rechazada</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {q.status !== 'Cancelada' && q.status !== 'Aceptada' && (
                        <Button size="sm" variant="ghost" onClick={() => setCancelModal(q)}>
                          <Ban className="h-4 w-4 text-gray-400" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>

      <Modal open={!!cancelModal} onClose={() => setCancelModal(null)} title="Cancelar Cotización">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            ¿Estás seguro de cancelar la cotización de <strong>${cancelModal?.amount?.toLocaleString()}</strong> para <strong>{cancelModal ? getRelatedName(cancelModal) : ''}</strong>?
          </p>
          <p className="text-xs text-gray-500">La cotización no se eliminará, solo cambiará su estado a "Cancelada".</p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCancelModal(null)}>Volver</Button>
            <Button variant="danger" onClick={handleCancel}>Cancelar Cotización</Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}
