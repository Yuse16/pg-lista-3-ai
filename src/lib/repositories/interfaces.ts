import type { Prospect, Client, FollowUp, Quote, Task, ActivityItem } from '../types'

export interface IProspectRepository {
  list(): Promise<Prospect[]>
  get(id: string): Promise<Prospect | null>
  create(data: Omit<Prospect, 'id' | 'createdAt' | 'updatedAt'>): Promise<Prospect>
  update(id: string, data: Partial<Prospect>): Promise<Prospect | null>
  delete(id: string): Promise<void>
  search(query: string): Promise<Prospect[]>
  convertToClient(prospectId: string): Promise<Client | null>
}

export interface IClientRepository {
  list(): Promise<Client[]>
  get(id: string): Promise<Client | null>
  create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client>
  update(id: string, data: Partial<Client>): Promise<Client | null>
  delete(id: string): Promise<void>
  search(query: string): Promise<Client[]>
}

export interface IFollowUpRepository {
  list(): Promise<FollowUp[]>
  get(id: string): Promise<FollowUp | null>
  create(data: Omit<FollowUp, 'id' | 'createdAt'>): Promise<FollowUp>
  update(id: string, data: Partial<FollowUp>): Promise<FollowUp | null>
  delete(id: string): Promise<void>
  getByRelation(relatedTo: string): Promise<FollowUp[]>
}

export interface IQuoteRepository {
  list(): Promise<Quote[]>
  get(id: string): Promise<Quote | null>
  create(data: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>): Promise<Quote>
  update(id: string, data: Partial<Quote>): Promise<Quote | null>
  delete(id: string): Promise<void>
  cancel(id: string): Promise<void>
  getByRelation(relatedTo: string): Promise<Quote[]>
}

export interface ITaskRepository {
  list(): Promise<Task[]>
  get(id: string): Promise<Task | null>
  create(data: Omit<Task, 'id' | 'createdAt'>): Promise<Task>
  update(id: string, data: Partial<Task>): Promise<Task | null>
  delete(id: string): Promise<void>
}

export interface IActivityRepository {
  list(): Promise<ActivityItem[]>
  create(data: Omit<ActivityItem, 'id'>): Promise<ActivityItem>
}

export interface IRepository {
  prospects: IProspectRepository
  clients: IClientRepository
  followUps: IFollowUpRepository
  quotes: IQuoteRepository
  tasks: ITaskRepository
  activities: IActivityRepository
}
