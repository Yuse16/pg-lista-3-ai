'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { ArrowLeft, Save } from 'lucide-react'
import type { ProspectOrigin, ClientType, ProspectStatus, Priority } from '@/lib/types'

const ORIGINS: { value: ProspectOrigin; label: string }[] = [
  { value: 'Visita a tienda', label: 'Visita a tienda' },
  { value: 'Recomendación', label: 'Recomendación' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Llamada', label: 'Llamada' },
  { value: 'Correo', label: 'Correo' },
  { value: 'Página web', label: 'Página web' },
  { value: 'Redes sociales', label: 'Redes sociales' },
  { value: 'Cliente anterior', label: 'Cliente anterior' },
  { value: 'Otro', label: 'Otro' },
]

const CLIENT_TYPES: { value: ClientType; label: string }[] = [
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

const INITIAL_STATE = {
  name: '', company: '', phone: '', email: '',
  origin: '' as ProspectOrigin | '', type: '' as ClientType | '', interest: '', notes: '',
  nextAction: '', nextActionDate: '',
}

export default function NewProspectPage() {
  const router = useRouter()
  const [form, setForm] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  async function validate() {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio'
    if (!form.phone.trim()) errs.phone = 'El teléfono es obligatorio'
    else {
      const repo = getRepository()
      const allProspects = await repo.prospects.list()
      const duplicate = allProspects.find(p => p.phone === form.phone.trim())
      if (duplicate) errs.phone = `Ya existe un prospecto con este teléfono: ${duplicate.name}`
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Correo inválido'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const isValid = await validate()
    if (!isValid) return
    setSaving(true)

    const repo = getRepository()
    await repo.prospects.create({
      name: form.name.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      origin: form.origin as ProspectOrigin || 'Otro',
      type: form.type as ClientType || 'Particular',
      interest: form.interest.trim(),
      notes: form.notes.trim(),
      status: 'Nuevo' as ProspectStatus,
      priority: 'Media' as Priority,
      nextAction: form.nextAction.trim(),
      nextActionDate: form.nextActionDate,
      assignedTo: 'Vendedor Nogalera',
    })
    router.push('/prospects')
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Regresar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Prospecto</h1>
        </div>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Datos del prospecto</h2>
            <p className="text-xs text-gray-500">Completa los campos obligatorios para registrar rápidamente</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Nombre *" placeholder="Nombre completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} error={errors.name} />
                <Input label="Empresa" placeholder="Nombre de la empresa" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Teléfono *" placeholder="Número telefónico" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} error={errors.phone} />
                <Input label="Correo" placeholder="correo@ejemplo.com" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} error={errors.email} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select label="Origen" placeholder="¿Cómo llegó?" options={ORIGINS} value={form.origin} onChange={e => setForm({...form, origin: e.target.value as ProspectOrigin})} />
                <Select label="Tipo de cliente" placeholder="Seleccionar tipo" options={CLIENT_TYPES} value={form.type} onChange={e => setForm({...form, type: e.target.value as ClientType})} />
              </div>
              <Input label="Producto o proyecto de interés" placeholder="Ej: Porcelanatos, baños, grifería..." value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} />
              <Input label="Próxima acción" placeholder="Ej: Llamar para presentación" value={form.nextAction} onChange={e => setForm({...form, nextAction: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Fecha próxima acción" type="date" value={form.nextActionDate} onChange={e => setForm({...form, nextActionDate: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notas</label>
                <textarea
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Observaciones adicionales..."
                  value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancelar</Button>
                <Button type="submit" loading={saving}>
                  <Save className="h-4 w-4 mr-1.5" /> Guardar Prospecto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
