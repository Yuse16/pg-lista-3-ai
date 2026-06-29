'use client'
import { useEffect, useState } from 'react'
import { getRepository } from '@/lib/repositories/repository'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Modal } from '@/components/ui/modal'
import { formatDate, isToday, isOverdue, getTodayString } from '@/lib/utils'
import { CheckCircle, Clock, AlertTriangle, Plus, Calendar } from 'lucide-react'
import type { Task, TaskStatus, Priority } from '@/lib/types'

const PRIORITY_OPTIONS = [
  { value: 'Crítica', label: 'Crítica' },
  { value: 'Alta', label: 'Alta' },
  { value: 'Media', label: 'Media' },
  { value: 'Baja', label: 'Baja' },
]

export default function AgendaPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [nameMap, setNameMap] = useState<Record<string, string>>({})
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
      await refresh()
      setLoading(false)
    }
    load()
  }, [])

  async function refresh() {
    const repo = getRepository()
    const all = await repo.tasks.list()
    all.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setTasks(all)
  }

  const todayTasks = tasks.filter(t => isToday(t.date) && t.status !== 'Finalizada' && t.status !== 'Cancelada')
  const overdueTasks = tasks.filter(t => isOverdue(t.date) && t.status !== 'Finalizada' && t.status !== 'Cancelada')
  const upcomingTasks = tasks.filter(t => {
    if (t.status === 'Finalizada' || t.status === 'Cancelada') return false
    if (isToday(t.date) || isOverdue(t.date)) return false
    return true
  })
  const completedTasks = tasks.filter(t => t.status === 'Finalizada')

  async function handleStatusUpdate(id: string, status: TaskStatus) {
    const repo = getRepository()
    await repo.tasks.update(id, { status })
    await refresh()
  }

  async function handleCreate(data: { title: string; description: string; relatedTo: string; relatedType: 'prospect' | 'client' | 'none'; date: string; priority: Priority }) {
    const repo = getRepository()
    await repo.tasks.create({
      title: data.title,
      description: data.description,
      relatedTo: data.relatedTo,
      relatedType: data.relatedType,
      date: data.date,
      priority: data.priority,
      status: 'Pendiente',
      assignedTo: 'Vendedor Nogalera',
    })
    setCreateModal(false)
    await refresh()
  }

  async function handleDelete(id: string) {
    const repo = getRepository()
    await repo.tasks.delete(id)
    await refresh()
  }

  function getRelatedName(task: Task): string | null {
    return nameMap[task.relatedTo] || null
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
          <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
          <Button onClick={() => setCreateModal(true)}>
            <Plus className="h-4 w-4 mr-1.5" /> Nueva Tarea
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <h2 className="font-semibold text-gray-900">Hoy ({todayTasks.length})</h2>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {todayTasks.length === 0 ? (
                  <div className="px-5 py-6 text-center"><p className="text-sm text-gray-500">Sin tareas para hoy</p></div>
                ) : (
                  <TaskList tasks={todayTasks} onStatusChange={handleStatusUpdate} onDelete={handleDelete} getRelatedName={getRelatedName} />
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <h2 className="font-semibold text-gray-900">Vencidas ({overdueTasks.length})</h2>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {overdueTasks.length === 0 ? (
                  <div className="px-5 py-6 text-center"><p className="text-sm text-gray-500">Sin tareas vencidas</p></div>
                ) : (
                  <TaskList tasks={overdueTasks} onStatusChange={handleStatusUpdate} onDelete={handleDelete} getRelatedName={getRelatedName} />
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <h2 className="font-semibold text-gray-900">Próximas ({upcomingTasks.length})</h2>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {upcomingTasks.length === 0 ? (
                  <div className="px-5 py-6 text-center"><p className="text-sm text-gray-500">Sin tareas próximas</p></div>
                ) : (
                  <TaskList tasks={upcomingTasks} onStatusChange={handleStatusUpdate} onDelete={handleDelete} getRelatedName={getRelatedName} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {completedTasks.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <h2 className="font-semibold text-gray-900">Finalizadas ({completedTasks.length})</h2>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {completedTasks.map(t => (
                  <div key={t.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 line-through">{t.title}</p>
                      <p className="text-xs text-gray-400">{formatDate(t.date)}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(t.id)}>Eliminar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Modal open={createModal} onClose={() => setCreateModal(false)} title="Nueva Tarea">
        <NewTaskForm onSave={handleCreate} onCancel={() => setCreateModal(false)} />
      </Modal>
    </AppLayout>
  )
}

function TaskList({
  tasks, onStatusChange, onDelete, getRelatedName,
}: {
  tasks: Task[]
  onStatusChange: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
  getRelatedName: (t: Task) => string | null
}) {
  return (
    <div className="divide-y divide-gray-100">
      {tasks.map(t => (
        <div key={t.id} className="px-5 py-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Badge>{t.priority}</Badge>
                <span className="text-sm font-medium text-gray-900">{t.title}</span>
              </div>
              {t.description && <p className="text-xs text-gray-500 mt-1">{t.description}</p>}
              {getRelatedName(t) && (
                <p className="text-xs text-blue-600 mt-1">Relacionado: {getRelatedName(t)}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{formatDate(t.date)}</p>
            </div>
            <div className="flex gap-1 ml-3">
              <Button size="sm" variant="ghost" onClick={() => onStatusChange(t.id, 'Finalizada')}>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(t.id)}>
                <Clock className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function NewTaskForm({
  onSave, onCancel,
}: {
  onSave: (data: { title: string; description: string; relatedTo: string; relatedType: 'prospect' | 'client' | 'none'; date: string; priority: Priority }) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [relatedType, setRelatedType] = useState<'prospect' | 'client' | 'none'>('none')
  const [relatedTo, setRelatedTo] = useState('')
  const [date, setDate] = useState(getTodayString())
  const [priority, setPriority] = useState<Priority>('Media')
  const [prospects, setProspects] = useState<{ id: string; name: string }[]>([])
  const [clients, setClients] = useState<{ id: string; name: string }[]>([])

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) return
    onSave({ title: title.trim(), description: description.trim(), relatedTo, relatedType, date, priority })
  }

  const options = relatedType === 'prospect' ? prospects : relatedType === 'client' ? clients : []

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Título *" placeholder="Ej: Llamar a cliente" value={title} onChange={e => setTitle(e.target.value)} />
      <Input label="Descripción" placeholder="Detalles de la tarea" value={description} onChange={e => setDescription(e.target.value)} />
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Relacionado con"
          options={[
            { value: 'none', label: 'Ninguno' },
            { value: 'prospect', label: 'Prospecto' },
            { value: 'client', label: 'Cliente' },
          ]}
          value={relatedType}
          onChange={e => { setRelatedType(e.target.value as 'prospect' | 'client' | 'none'); setRelatedTo('') }}
        />
        {relatedType !== 'none' && (
          <Select
            label={relatedType === 'prospect' ? 'Prospecto' : 'Cliente'}
            options={options.map(o => ({ value: o.id, label: o.name }))}
            placeholder="Seleccionar..."
            value={relatedTo}
            onChange={e => setRelatedTo(e.target.value)}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Fecha *" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <Select label="Prioridad" options={PRIORITY_OPTIONS} value={priority} onChange={e => setPriority(e.target.value as Priority)} />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
        <Button type="submit"><CheckCircle className="h-4 w-4 mr-1.5" /> Crear Tarea</Button>
      </div>
    </form>
  )
}
