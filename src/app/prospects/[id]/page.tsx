'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { formatDate } from '@/lib/utils'
import { getRecommendationsForEntity } from '@/lib/recommendations'
import { ArrowLeft, Edit3, UserCheck, PhoneCall, FileText, Bot } from 'lucide-react'
import type { Prospect, ProspectStatus, Priority, FollowUp, Quote, Recommendation } from '@/lib/types'

const STATUS_OPTIONS = [
  { value: 'Nuevo', label: 'Nuevo' },
  { value: 'Contactado', label: 'Contactado' },
  { value: 'Interesado', label: 'Interesado' },
  { value: 'Cotización enviada', label: 'Cotización enviada' },
  { value: 'Seguimiento', label: 'Seguimiento' },
  { value: 'Ganado', label: 'Ganado' },
  { value: 'Perdido', label: 'Perdido' },
  { value: 'Archivado', label: 'Archivado' },
]

export default function ProspectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [prospect, setProspect] = useState<Prospect | null>(null)
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [editModal, setEditModal] = useState(false)
  const [convertModal, setConvertModal] = useState(false)
  const [convertDone, setConvertDone] = useState(false)

  const loadAll = useCallback(async () => {
    const repo = getRepository()
    const p = await repo.prospects.get(id)
    if (!p) { router.push('/prospects'); return }
    setProspect(p)
    const [followUps, quotes, recs] = await Promise.all([
      repo.followUps.getByRelation(id),
      repo.quotes.getByRelation(id),
      getRecommendationsForEntity(id, 'prospect'),
    ])
    setFollowUps(followUps)
    setQuotes(quotes)
    setRecommendations(recs)
    setLoading(false)
  }, [id, router])

  useEffect(() => {
    const timer = requestAnimationFrame(() => { loadAll() })
    return () => cancelAnimationFrame(timer)
  }, [id, loadAll])

  async function handleUpdate(data: Partial<Prospect>) {
    const repo = getRepository()
    const updated = await repo.prospects.update(id, data)
    if (updated) setProspect(updated)
    setEditModal(false)
    loadAll()
  }

  async function handleConvert() {
    const repo = getRepository()
    const client = await repo.prospects.convertToClient(id)
    if (client) {
      setConvertDone(true)
      setConvertModal(false)
      loadAll()
      setTimeout(() => router.push(`/clients/${client.id}`), 1500)
    }
  }

  function handleQuickFollowUp() {
    router.push(`/followups?relatedTo=${id}&type=prospect`)
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
      </AppLayout>
    )
  }

  if (!prospect) return null

  const hasRecs = recommendations.length > 0

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/prospects')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Prospectos
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{prospect.name}</h1>
            <Badge>{prospect.status}</Badge>
            <Badge>{prospect.priority}</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditModal(true)}>
              <Edit3 className="h-4 w-4 mr-1" /> Editar
            </Button>
            {prospect.status !== 'Ganado' && (
              <Button size="sm" onClick={() => setConvertModal(true)}>
                <UserCheck className="h-4 w-4 mr-1" /> Convertir en Cliente
              </Button>
            )}
          </div>
        </div>

        {convertDone && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            Prospecto convertido a cliente exitosamente. Redirigiendo...
          </div>
        )}

        {hasRecs && (
          <Card className="mb-6 border-amber-200 bg-amber-50/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-amber-600" />
                <h2 className="font-semibold text-gray-900">Recomendaciones ({recommendations.length})</h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-amber-100">
                {recommendations.map(rec => (
                  <div key={rec.id} className="px-5 py-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge>{rec.priority}</Badge>
                          <Badge>{rec.confidence}</Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{rec.action}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{rec.reason}</p>
                        {rec.evidence && rec.evidence.length > 0 && (
                          <div className="mt-1 text-xs text-gray-500">
                            {rec.evidence.map((e, i) => <span key={i} className="block">• {e}</span>)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Información General</h2></CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div><dt className="text-gray-500">Empresa</dt><dd className="font-medium text-gray-900">{prospect.company || '—'}</dd></div>
                  <div><dt className="text-gray-500">Teléfono</dt><dd className="font-medium text-gray-900">{prospect.phone}</dd></div>
                  <div><dt className="text-gray-500">Correo</dt><dd className="font-medium text-gray-900">{prospect.email || '—'}</dd></div>
                  <div><dt className="text-gray-500">Origen</dt><dd className="font-medium text-gray-900">{prospect.origin}</dd></div>
                  <div><dt className="text-gray-500">Tipo de cliente</dt><dd className="font-medium text-gray-900">{prospect.type}</dd></div>
                  <div><dt className="text-gray-500">Registrado</dt><dd className="font-medium text-gray-900">{formatDate(prospect.createdAt)}</dd></div>
                  <div className="col-span-2"><dt className="text-gray-500">Producto / Proyecto de interés</dt><dd className="font-medium text-gray-900">{prospect.interest || '—'}</dd></div>
                  {prospect.notes && <div className="col-span-2"><dt className="text-gray-500">Notas</dt><dd className="font-medium text-gray-900">{prospect.notes}</dd></div>}
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Seguimientos</h2>
                  <Button size="sm" variant="outline" onClick={handleQuickFollowUp}>
                    <PhoneCall className="h-4 w-4 mr-1" /> Nuevo Seguimiento
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {followUps.length === 0 ? (
                  <div className="px-5 py-8 text-center"><p className="text-sm text-gray-500">Sin seguimientos registrados</p></div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {followUps.map(f => (
                      <div key={f.id} className="px-5 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{f.contactMethod}</span>
                          <span className="text-xs text-gray-400">{formatDate(f.date)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{f.result || f.notes}</p>
                        {f.nextAction && <p className="text-xs text-gray-500 mt-1">Próximo: {f.nextAction} {f.nextActionDate && `(${formatDate(f.nextActionDate)})`}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Cotizaciones</h2>
                  <Button size="sm" variant="outline" onClick={() => router.push(`/quotes/new?relatedTo=${prospect.id}&type=prospect&name=${prospect.name}`)}>
                    <FileText className="h-4 w-4 mr-1" /> Nueva Cotización
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {quotes.length === 0 ? (
                  <div className="px-5 py-8 text-center"><p className="text-sm text-gray-500">Sin cotizaciones registradas</p></div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {quotes.map(q => (
                      <div key={q.id} className="px-5 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">${q.amount?.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{formatDate(q.date)}</p>
                        </div>
                        <Badge>{q.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Próxima Acción</h2></CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-gray-900">{prospect.nextAction || 'No definida'}</p>
                {prospect.nextActionDate && (
                  <p className="text-xs text-gray-500 mt-1">Fecha: {formatDate(prospect.nextActionDate)}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Modal open={editModal} onClose={() => setEditModal(false)} title="Editar Prospecto">
        <EditForm prospect={prospect} onSave={handleUpdate} onCancel={() => setEditModal(false)} />
      </Modal>

      <Modal open={convertModal} onClose={() => setConvertModal(false)} title="Convertir en Cliente">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Se creará un cliente con los datos de <strong>{prospect.name}</strong> y el prospecto pasará a estado "Ganado".
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setConvertModal(false)}>Cancelar</Button>
            <Button onClick={handleConvert}>
              <UserCheck className="h-4 w-4 mr-1.5" /> Confirmar Conversión
            </Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  )
}

function EditForm({ prospect, onSave, onCancel }: { prospect: Prospect; onSave: (data: Partial<Prospect>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ ...prospect })

  return (
    <div className="space-y-4">
      <Input label="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <Input label="Empresa" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Teléfono" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <Input label="Correo" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select label="Estado" options={STATUS_OPTIONS} value={form.status} onChange={e => setForm({...form, status: e.target.value as ProspectStatus})} />
        <Select label="Prioridad" options={[
          { value: 'Crítica', label: 'Crítica' },
          { value: 'Alta', label: 'Alta' },
          { value: 'Media', label: 'Media' },
          { value: 'Baja', label: 'Baja' },
        ]} value={form.priority} onChange={e => setForm({...form, priority: e.target.value as Priority})} />
      </div>
      <Input label="Producto / Proyecto de interés" value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} />
      <Input label="Próxima acción" value={form.nextAction} onChange={e => setForm({...form, nextAction: e.target.value})} />
      <Input label="Fecha próxima acción" type="date" value={form.nextActionDate} onChange={e => setForm({...form, nextActionDate: e.target.value})} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Notas</label>
        <textarea className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
        <Button onClick={() => onSave(form)}>Guardar Cambios</Button>
      </div>
    </div>
  )
}
