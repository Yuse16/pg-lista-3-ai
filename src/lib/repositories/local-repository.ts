import { store } from '../store'
import { generateId } from '../utils'
import type {
  IRepository, IProspectRepository, IClientRepository,
  IFollowUpRepository, IQuoteRepository, ITaskRepository, IActivityRepository,
} from './interfaces'
import type { Prospect, Client, FollowUp, Quote, Task, ActivityItem } from '../types'

const prospectRepo: IProspectRepository = {
  async list() { return store.prospects.list() },
  async get(id) { return store.prospects.get(id) ?? null },
  async create(data) {
    const now = new Date().toISOString()
    const item: Prospect = { id: generateId(), ...data, createdAt: now, updatedAt: now }
    store.prospects.create(item)
    return item
  },
  async update(id, data) { return store.prospects.update(id, data) ?? null },
  async delete(id) { store.prospects.delete(id) },
  async search(query) {
    const q = query.toLowerCase()
    return store.prospects.list().filter(p =>
      p.name.toLowerCase().includes(q) || p.company.toLowerCase().includes(q) || p.phone.includes(q)
    )
  },
  async convertToClient(prospectId) { return store.prospects.convertToClient(prospectId) ?? null },
}

const clientRepo: IClientRepository = {
  async list() { return store.clients.list() },
  async get(id) { return store.clients.get(id) ?? null },
  async create(data) {
    const now = new Date().toISOString()
    const item: Client = { id: generateId(), ...data, createdAt: now, updatedAt: now }
    store.clients.create(item)
    return item
  },
  async update(id, data) { return store.clients.update(id, data) ?? null },
  async delete(id) { store.clients.delete(id) },
  async search(query) {
    const q = query.toLowerCase()
    return store.clients.list().filter(c =>
      c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.phone.includes(q)
    )
  },
}

const followUpRepo: IFollowUpRepository = {
  async list() { return store.followUps.list() },
  async get(id) { return store.followUps.get(id) ?? null },
  async create(data) {
    const item: FollowUp = { id: generateId(), ...data, createdAt: new Date().toISOString() }
    store.followUps.create(item)
    return item
  },
  async update(id, data) { return store.followUps.update(id, data) ?? null },
  async delete(id) { store.followUps.delete(id) },
  async getByRelation(relatedTo) { return store.followUps.getByRelation(relatedTo) },
}

const quoteRepo: IQuoteRepository = {
  async list() { return store.quotes.list() },
  async get(id) { return store.quotes.get(id) ?? null },
  async create(data) {
    const now = new Date().toISOString()
    const item: Quote = { id: generateId(), ...data, createdAt: now, updatedAt: now }
    store.quotes.create(item)
    return item
  },
  async update(id, data) { return store.quotes.update(id, data) ?? null },
  async delete(id) { store.quotes.delete(id) },
  async cancel(id) { store.quotes.cancel(id) },
  async getByRelation(relatedTo) { return store.quotes.getByRelation(relatedTo) },
}

const taskRepo: ITaskRepository = {
  async list() { return store.tasks.list() },
  async get(id) { return store.tasks.get(id) ?? null },
  async create(data) {
    const item: Task = { id: generateId(), ...data, createdAt: new Date().toISOString() }
    store.tasks.create(item)
    return item
  },
  async update(id, data) { return store.tasks.update(id, data) ?? null },
  async delete(id) { store.tasks.delete(id) },
}

const activityRepo: IActivityRepository = {
  async list() {
    const prospects = store.prospects.list()
    const clients = store.clients.list()
    const followUps = store.followUps.list()
    const quotes = store.quotes.list()
    return [
      ...prospects.map(p => ({ id: p.id, type: 'prospect_created' as const, description: `Nuevo prospecto: ${p.name}`, relatedTo: p.id, relatedType: 'prospect' as const, date: p.createdAt })),
      ...clients.map(c => ({ id: c.id, type: 'client_created' as const, description: `Cliente registrado: ${c.name}`, relatedTo: c.id, relatedType: 'client' as const, date: c.createdAt })),
      ...followUps.map(f => ({ id: f.id, type: 'followup_registered' as const, description: `Seguimiento: ${f.contactMethod}${f.result ? ' - ' + f.result : ''}`, relatedTo: f.relatedTo, relatedType: f.relatedType as 'prospect' | 'client', date: f.createdAt })),
      ...quotes.map(q => ({ id: q.id, type: 'quote_created' as const, description: `Cotización: $${q.amount.toLocaleString()} (${q.status})`, relatedTo: q.relatedTo, relatedType: q.relatedType as 'prospect' | 'client', date: q.createdAt })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 50)
  },
  async create(data) {
    return { id: generateId(), ...data }
  },
}

export const localRepository: IRepository = {
  prospects: prospectRepo,
  clients: clientRepo,
  followUps: followUpRepo,
  quotes: quoteRepo,
  tasks: taskRepo,
  activities: activityRepo,
}
