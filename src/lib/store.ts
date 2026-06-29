import type { Prospect, Client, FollowUp, Quote, Task, QuoteStatus } from './types'
import { seedProspects, seedClients, seedFollowUps, seedQuotes, seedTasks } from './seed-data'

const STORAGE_KEYS = {
  prospects: 'pglista3_prospects',
  clients: 'pglista3_clients',
  followups: 'pglista3_followups',
  quotes: 'pglista3_quotes',
  tasks: 'pglista3_tasks',
} as const

function load<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback
  try {
    const data = localStorage.getItem(key)
    if (data) return JSON.parse(data)
  } catch (e) { console.error('Failed to load from localStorage', e) }
  return fallback
}

function save<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) { console.error('Failed to save to localStorage', e) }
}

let initialized = false
function ensureSeed() {
  if (initialized) return
  initialized = true
  if (typeof window === 'undefined') return
  const hasData = localStorage.getItem(STORAGE_KEYS.prospects)
  if (!hasData || JSON.parse(hasData).length === 0) {
    save(STORAGE_KEYS.prospects, seedProspects)
    save(STORAGE_KEYS.clients, seedClients)
    save(STORAGE_KEYS.followups, seedFollowUps)
    save(STORAGE_KEYS.quotes, seedQuotes)
    save(STORAGE_KEYS.tasks, seedTasks)
  }
}

export const store = {
  init() { ensureSeed() },

  prospects: {
    list(): Prospect[] { ensureSeed(); return load<Prospect>(STORAGE_KEYS.prospects, []) },
    get(id: string): Prospect | undefined { return this.list().find(p => p.id === id) },
    create(data: Prospect): Prospect { const items = this.list(); items.push(data); save(STORAGE_KEYS.prospects, items); return data },
    update(id: string, data: Partial<Prospect>): Prospect | undefined {
      const items = this.list(); const idx = items.findIndex(p => p.id === id)
      if (idx === -1) return undefined
      items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() }
      save(STORAGE_KEYS.prospects, items); return items[idx]
    },
    delete(id: string): void {
      const items = this.list().filter(p => p.id !== id)
      save(STORAGE_KEYS.prospects, items)
    },
    convertToClient(prospectId: string): Client | undefined {
      const prospect = this.get(prospectId)
      if (!prospect) return undefined
      const client: Client = {
        id: generateId(),
        name: prospect.name,
        company: prospect.company,
        phone: prospect.phone,
        email: prospect.email,
        rfc: '',
        address: '',
        city: '',
        type: prospect.type,
        classification: 'Lista 3',
        status: 'Activo',
        priority: prospect.priority,
        interest: prospect.interest,
        notes: prospect.notes,
        assignedTo: prospect.assignedTo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      this.update(prospectId, { status: 'Ganado' })
      store.clients.create(client)
      return client
    },
  },

  clients: {
    list(): Client[] { ensureSeed(); return load<Client>(STORAGE_KEYS.clients, []) },
    get(id: string): Client | undefined { return this.list().find(c => c.id === id) },
    create(data: Client): Client { const items = this.list(); items.push(data); save(STORAGE_KEYS.clients, items); return data },
    update(id: string, data: Partial<Client>): Client | undefined {
      const items = this.list(); const idx = items.findIndex(c => c.id === id)
      if (idx === -1) return undefined
      items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() }
      save(STORAGE_KEYS.clients, items); return items[idx]
    },
    delete(id: string): void {
      const items = this.list().filter(c => c.id !== id)
      save(STORAGE_KEYS.clients, items)
    },
  },

  followUps: {
    list(): FollowUp[] { ensureSeed(); return load<FollowUp>(STORAGE_KEYS.followups, []) },
    get(id: string): FollowUp | undefined { return this.list().find(f => f.id === id) },
    create(data: FollowUp): FollowUp { const items = this.list(); items.push(data); save(STORAGE_KEYS.followups, items); return data },
    update(id: string, data: Partial<FollowUp>): FollowUp | undefined {
      const items = this.list(); const idx = items.findIndex(f => f.id === id)
      if (idx === -1) return undefined
      items[idx] = { ...items[idx], ...data }
      save(STORAGE_KEYS.followups, items); return items[idx]
    },
    delete(id: string): void { save(STORAGE_KEYS.followups, this.list().filter(f => f.id !== id)) },
    getByRelation(relatedTo: string): FollowUp[] { return this.list().filter(f => f.relatedTo === relatedTo) },
  },

  quotes: {
    list(): Quote[] { ensureSeed(); return load<Quote>(STORAGE_KEYS.quotes, []) },
    get(id: string): Quote | undefined { return this.list().find(q => q.id === id) },
    create(data: Quote): Quote { const items = this.list(); items.push(data); save(STORAGE_KEYS.quotes, items); return data },
    update(id: string, data: Partial<Quote>): Quote | undefined {
      const items = this.list(); const idx = items.findIndex(q => q.id === id)
      if (idx === -1) return undefined
      items[idx] = { ...items[idx], ...data, updatedAt: new Date().toISOString() }
      save(STORAGE_KEYS.quotes, items); return items[idx]
    },
    delete(id: string): void {
      this.update(id, { status: 'Cancelada' as QuoteStatus })
    },
    cancel(id: string): void {
      this.update(id, { status: 'Cancelada' as QuoteStatus })
    },
    getByRelation(relatedTo: string): Quote[] { return this.list().filter(q => q.relatedTo === relatedTo) },
  },

  tasks: {
    list(): Task[] { ensureSeed(); return load<Task>(STORAGE_KEYS.tasks, []) },
    get(id: string): Task | undefined { return this.list().find(t => t.id === id) },
    create(data: Task): Task { const items = this.list(); items.push(data); save(STORAGE_KEYS.tasks, items); return data },
    update(id: string, data: Partial<Task>): Task | undefined {
      const items = this.list(); const idx = items.findIndex(t => t.id === id)
      if (idx === -1) return undefined
      items[idx] = { ...items[idx], ...data }
      save(STORAGE_KEYS.tasks, items); return items[idx]
    },
    delete(id: string): void { save(STORAGE_KEYS.tasks, this.list().filter(t => t.id !== id)) },
  },
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}
