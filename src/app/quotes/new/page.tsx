'use client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { ArrowLeft, Save } from 'lucide-react'
import type { QuoteStatus } from '@/lib/types'

export default function NewQuotePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
      <NewQuoteContent />
    </Suspense>
  )
}

function NewQuoteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [relatedTo, setRelatedTo] = useState(searchParams.get('relatedTo') || '')
  const [relatedType, setRelatedType] = useState<'prospect' | 'client'>(searchParams.get('type') as 'prospect' | 'client' || 'prospect')
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [nextFollowUp, setNextFollowUp] = useState('')
  const [prospects, setProspects] = useState<{ id: string; name: string }[]>([])
  const [clients, setClients] = useState<{ id: string; name: string }[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const repo = getRepository()
      const [prospects, clients] = await Promise.all([
        repo.prospects.list(),
        repo.clients.list(),
      ])
      setProspects(prospects.map(p => ({ id: p.id, name: p.name })))
      setClients(clients.map(c => ({ id: c.id, name: c.name })))
    }
    load()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!relatedTo || !amount) return
    setSaving(true)

    const repo = getRepository()
    await repo.quotes.create({
      relatedTo,
      relatedType,
      date: new Date().toISOString(),
      amount: parseFloat(amount) || 0,
      status: 'Pendiente' as QuoteStatus,
      notes,
      assignedTo: 'Vendedor Nogalera',
      nextFollowUp,
    })
    router.push('/quotes')
  }

  const options = relatedType === 'prospect' ? prospects : clients

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Regresar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Cotización</h1>
        </div>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Datos de la cotización</h2>
          </CardHeader>
          <CardContent>
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
                  placeholder="Seleccionar..."
                  value={relatedTo}
                  onChange={e => setRelatedTo(e.target.value)}
                />
              </div>
              <Input label="Monto *" type="number" step="0.01" min="0" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
              <Input label="Próximo seguimiento" placeholder="Ej: Llamar para confirmar recepción" value={nextFollowUp} onChange={e => setNextFollowUp(e.target.value)} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notas</label>
                <textarea className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Detalles de la cotización..." value={notes} onChange={e => setNotes(e.target.value)} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancelar</Button>
                <Button type="submit" loading={saving}>
                  <Save className="h-4 w-4 mr-1.5" /> Guardar Cotización
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
