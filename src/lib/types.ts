export interface Prospect {
  id: string
  name: string
  company: string
  phone: string
  email: string
  origin: ProspectOrigin
  type: ClientType
  interest: string
  notes: string
  status: ProspectStatus
  priority: Priority
  nextAction: string
  nextActionDate: string
  assignedTo: string
  createdAt: string
  updatedAt: string
}

export type ProspectStatus =
  | 'Nuevo'
  | 'Contactado'
  | 'Interesado'
  | 'Cotización enviada'
  | 'Seguimiento'
  | 'Ganado'
  | 'Perdido'
  | 'Archivado'

export type ProspectOrigin =
  | 'Visita a tienda'
  | 'Recomendación'
  | 'WhatsApp'
  | 'Llamada'
  | 'Correo'
  | 'Página web'
  | 'Redes sociales'
  | 'Cliente anterior'
  | 'Otro'

export type ClientType =
  | 'Constructora'
  | 'Contratista'
  | 'Arquitecto'
  | 'Ingeniero'
  | 'Instalador'
  | 'Empresa'
  | 'Gobierno'
  | 'Revendedor'
  | 'Particular'

export type Priority = 'Crítica' | 'Alta' | 'Media' | 'Baja'

export interface Client {
  id: string
  name: string
  company: string
  phone: string
  email: string
  rfc: string
  address: string
  city: string
  type: ClientType
  classification: string
  status: ClientStatus
  priority: Priority
  interest: string
  notes: string
  assignedTo: string
  createdAt: string
  updatedAt: string
}

export type ClientStatus = 'Activo' | 'Inactivo'

export interface FollowUp {
  id: string
  relatedTo: string
  relatedType: 'prospect' | 'client'
  contactMethod: ContactMethod
  date: string
  result: string
  notes: string
  nextAction: string
  nextActionDate: string
  assignedTo: string
  status: TaskStatus
  createdAt: string
}

export type ContactMethod =
  | 'Llamada'
  | 'WhatsApp'
  | 'Correo'
  | 'Visita a tienda'
  | 'Reunión'
  | 'Cotización'
  | 'Otro'

export interface Quote {
  id: string
  relatedTo: string
  relatedType: 'prospect' | 'client'
  date: string
  amount: number
  status: QuoteStatus
  notes: string
  assignedTo: string
  nextFollowUp: string
  createdAt: string
  updatedAt: string
}

export type QuoteStatus =
  | 'Pendiente'
  | 'Enviada'
  | 'Aceptada'
  | 'Rechazada'
  | 'Cancelada'

export interface Task {
  id: string
  title: string
  description: string
  relatedTo: string
  relatedType: 'prospect' | 'client' | 'none'
  date: string
  priority: Priority
  status: TaskStatus
  assignedTo: string
  createdAt: string
}

export type TaskStatus = 'Pendiente' | 'En proceso' | 'Finalizada' | 'Cancelada'

export interface Recommendation {
  id: string
  action: string
  reason: string
  priority: Priority
  relatedTo: string
  relatedType: 'prospect' | 'client' | 'quote' | 'followup' | 'task'
  dataUsed: string[]
  confidence: 'Muy alta' | 'Alta' | 'Media' | 'Baja'
  attended: boolean
  createdAt: string
  entityType?: 'prospect' | 'client' | 'quote' | 'followup' | 'task'
  entityId?: string
  title?: string
  suggestedAction?: string
  evidence?: string[]
}

export type CommercialRecommendation = Recommendation

export interface DashboardStats {
  activeProspects: number
  activeClients: number
  followUpsToday: number
  followUpsOverdue: number
  pendingQuotes: number
  priorityOpportunities: number
  recentActivity: ActivityItem[]
  commercialSummary: CommercialSummary
}

export interface ActivityItem {
  id: string
  type: 'prospect_created' | 'client_created' | 'followup_registered' | 'quote_created' | 'status_changed' | 'conversion'
  description: string
  relatedTo: string
  relatedType: 'prospect' | 'client'
  date: string
}

export interface CommercialSummary {
  totalQuotes: number
  totalFollowUps: number
  conversionsThisMonth: number
  prospectsCreatedThisMonth: number
}
