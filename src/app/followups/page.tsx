'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { EmptyState } from '@/components/ui/empty-state'
import { Modal } from '@/components/ui/modal'
import { formatDate } from '@/lib/utils'
import { Search, PhoneCall, Plus, CheckCircle, XCircle } from 'lucide-react'
import type { FollowUp, ContactMethod } from '@/lib/types'

const CONTACT_METHODS: { value: ContactMethod; label: string }[] = [
  { value: 'Llamada', label: 'Llamada' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Correo', label: 'Correo' },
  { value: 'Visita a tienda', label: 'Visita a tienda' },
  { value: 'Reunión', label: 'Reunión' },
  { value: 'Cotización', label: 'Cotización' },
  { value: 'Otro', label: 'Otro' },
]

const TYPE_FILTER = [
  { value: 'prospect', label: 'Prospectos' },
  { value: 'client', label: 'Clientes' },
]

export default function FollowUpsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
      <FollowUpsContent />
    </Suspense>
  )
}

function FollowUpsContent() {
  const searchParams = useSearchParams()
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const [nameMap, setNameMap] = useState<Record<string, string>>({})
  const [relatedTo] = useState(searchParams.get('relatedTo') || '')
  const [relatedType, setRelatedType] = useState(searchParams.get('type') || '')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [createModal, setCreateModal] = useState(false)

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
      await applyFilters(relatedTo, relatedType, '')
      setLoading(false)
    }
    load()
  }, [relatedTo, relatedType])

  async function applyFilters(rt: string, rtype: string, search: string) {
    const repo = getRepository()
    let all = await repo.followUps.list()
    if (rt) all = all.filter(f => f.relatedTo === rt)
    if (rtype) all = all.filter(f => f.relatedType === rtype)
    if (search) {
      const q = search.toLowerCase()
      all = all.filter(f => f.contactMethod.toLowerCase().includes(q) || (f.result || '').toLowerCase().includes(q))
    }
    setFollowUps(all)
  }

  async function handleSearch() {
    await applyFilters(relatedTo, relatedType, search)
  }

  function getRelatedName(relatedTo: string, _relatedType: string): string {
    return nameMap[relatedTo] || '—'
  }

  async function handleCreate(data: { relatedTo: string; relatedType: 'prospect' | 'client'; contactMethod: ContactMethod; result: string; nextAction: string; nextActionDate: string }) {
    const repo = getRepository()
    await repo.followUps.create({
      relatedTo: data.relatedTo,
      relatedType: data.relatedType,
      contactMethod: data.contactMethod,
      date: new Date().toISOString(),
      result: data.result,
      notes: '',
      nextAction: data.nextAction,
      nextActionDate: data.nextActionDate,
      assignedTo: 'Vendedor Nogalera',
      status: 'Finalizada',
    })
    setCreateModal(false)
    await applyFilters(relatedTo, relatedType, search)
  }

  async function handleDelete(id: string) {
    const repo = getRepository()
    await repo.followUps.delete(id)
    await applyFilters(relatedTo, relatedType, search)
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
          <h1 className="text-2xl font-bold text-gray-900">Seguimientos</h1>
          <Button onClick={() => setCreateModal(true)}>
            <Plus className="h-4 w-4 mr-1.5" /> Nuevo Seguimiento
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="flex flex-wrap gap-3 p-4">
            <div className="flex-1 min-w-[200px]">
              <Input placeholder="Buscar seguimientos..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
            </div>
            <Select options={TYPE_FILTER} placeholder="Tipo" value={relatedType} onChange={e => setRelatedType(e.target.value)} className="w-36" />
            <Button variant="secondary" onClick={handleSearch}><Search className="h-4 w-4 mr-1.5" /> Buscar</Button>
          </CardContent>
        </Card>

        {followUps.length === 0 ? (
          <EmptyState title="No hay seguimientos" description="Registra el primer seguimiento a un prospecto o cliente." action={{ label: 'Nuevo Seguimiento', onClick: () => setCreateModal(true) }} icon={<PhoneCall className="h-8 w-8 text-gray-400" />} />
        ) : (
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Relacionado</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Método</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Resultado</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Fecha</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Próxima acción</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {followUps.map(f => (
                  <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Badge>{f.relatedType === 'prospect' ? 'Prospecto' : 'Cliente'}</Badge>
                        <span className="text-gray-900 font-medium">{getRelatedName(f.relatedTo, f.relatedType)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge>{f.contactMethod}</Badge></td>
                    <td className="px-4 py-3 text-gray-600 max-w-[250px] truncate">{f.result || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(f.date)}</td>
                    <td className="px-4 py-3 text-gray-600">{f.nextAction || '—'}{f.nextActionDate ? ` (${formatDate(f.nextActionDate)})` : ''}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(f.id)}>
                        <XCircle className="h-4 w-4 text-gray-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>

      <Modal open={createModal} onClose={() => setCreateModal(false)} title="Nuevo Seguimiento">
        <QuickFollowUpForm
          initialRelatedTo={searchParams.get('relatedTo') || ''}
          initialRelatedType={(searchParams.get('type') as 'prospect' | 'client') || undefined}
          onSave={handleCreate}
          onCancel={() => setCreateModal(false)}
        />
      </Modal>
    </AppLayout>
  )
}

function QuickFollowUpForm({
  initialRelatedTo, initialRelatedType, onSave, onCancel,
}: {
  initialRelatedTo?: string
  initialRelatedType?: 'prospect' | 'client'
  onSave: (data: { relatedTo: string; relatedType: 'prospect' | 'client'; contactMethod: ContactMethod; result: string; nextAction: string; nextActionDate: string }) => void
  onCancel: () => void
}) {
  const [relatedTo, setRelatedTo] = useState(initialRelatedTo || '')
  const [relatedType, setRelatedType] = useState<'prospect' | 'client'>(initialRelatedType || 'prospect')
  const [contactMethod, setContactMethod] = useState<ContactMethod>('Llamada')
  const [result, setResult] = useState('')
  const [nextAction, setNextAction] = useState('')
  const [nextActionDate, setNextActionDate] = useState('')
  const [prospects, setProspects] = useState<{ id: string; name: string }[]>([])
  const [clients, setClients] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    async function load() {
      const repo = getRepository()
      const [p, c] = await Promise.all([
        repo.prospects.list(),
        repo.clients.list(),
      ])
      setProspects(p.map(p => ({ id: p.id, name: p.name })))
      setClients(c.map(c => ({ id: c.id, name: c.name })))
    }
    load()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!relatedTo || !contactMethod) return
    onSave({ relatedTo, relatedType, contactMethod, result, nextAction, nextActionDate })
  }

  const options = relatedType === 'prospect' ? prospects : clients

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Tipo"
          options={[
            { value: 'prospect', label: 'Prospecto' },
            { value: 'client', label: 'Cliente' },
          ]}
          value={relatedType}
          onChange={e => { setRelatedType(e.target.value as 'prospect' | 'client'); setRelatedTo('') }}
        />
        <Select
          label={relatedType === 'prospect' ? 'Prospecto' : 'Cliente'}
          options={options.map(o => ({ value: o.id, label: o.name }))}
          placeholder={relatedType === 'prospect' ? 'Seleccionar prospecto' : 'Seleccionar cliente'}
          value={relatedTo}
          onChange={e => setRelatedTo(e.target.value)}
        />
      </div>
      <Select
        label="Método de contacto"
        options={CONTACT_METHODS}
        value={contactMethod}
        onChange={e => setContactMethod(e.target.value as ContactMethod)}
      />
      <Input label="Resultado" placeholder="¿Qué se trató?" value={result} onChange={e => setResult(e.target.value)} />
      <Input label="Próxima acción" placeholder="¿Qué sigue?" value={nextAction} onChange={e => setNextAction(e.target.value)} />
      <Input label="Fecha próxima acción" type="date" value={nextActionDate} onChange={e => setNextActionDate(e.target.value)} />
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
        <Button type="submit"><CheckCircle className="h-4 w-4 mr-1.5" /> Registrar</Button>
      </div>
    </form>
  )
}
