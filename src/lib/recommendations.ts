import { getRepository } from './repositories/repository'
import { isOverdue, isToday, daysUntil, getTodayString } from './utils'
import type { Recommendation } from './types'

function genId(): string {
  return 'rec_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7)
}

const priorityOrder: Record<string, number> = { Crítica: 0, Alta: 1, Media: 2, Baja: 3 }

function sortByPriority(recs: Recommendation[]): Recommendation[] {
  return recs.sort((a, b) => (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99))
}

export async function generateRecommendations(): Promise<Recommendation[]> {
  const recs: Recommendation[] = []
  const repo = getRepository()
  const [prospects, clients, followUps, quotes, tasks] = await Promise.all([
    repo.prospects.list(),
    repo.clients.list(),
    repo.followUps.list(),
    repo.quotes.list(),
    repo.tasks.list(),
  ])
  const today = getTodayString()

  for (const p of prospects) {
    if (p.status === 'Archivado' || p.status === 'Perdido' || p.status === 'Ganado') continue

    const prospectFollowUps = followUps.filter(f => f.relatedTo === p.id)
    const prospectQuotes = quotes.filter(q => q.relatedTo === p.id)
    const lastFollowUpDate = prospectFollowUps.length > 0
      ? prospectFollowUps.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
      : null
    const daysSinceLastContact = lastFollowUpDate ? daysUntil(lastFollowUpDate) * -1 : null

    // Rule: Nuevo sin contacto
    if (p.status === 'Nuevo') {
      recs.push({
        id: genId(), action: `Contactar a ${p.name} de ${p.company}`,
        reason: 'Prospecto nuevo sin contacto registrado',
        priority: 'Media', relatedTo: p.id, relatedType: 'prospect',
        dataUsed: ['Estado: Nuevo', `Registrado: ${p.createdAt}`, `Empresa: ${p.company}`],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'prospect', entityId: p.id,
        title: 'Prospecto nuevo sin contacto',
        suggestedAction: 'Realizar primer contacto telefónico o por WhatsApp',
        evidence: [`Estado actual: ${p.status}`, `Días sin contacto: ${daysSinceLastContact ?? 'Nunca contactado'}`, `Interés: ${p.interest || 'No especificado'}`],
      })
    }

    // Rule: Sin próxima acción definida
    if (!p.nextAction && p.status !== 'Nuevo') {
      recs.push({
        id: genId(), action: `Definir próxima acción para ${p.name}`,
        reason: 'El prospecto no tiene una próxima acción definida',
        priority: 'Alta', relatedTo: p.id, relatedType: 'prospect',
        dataUsed: ['Estado: ' + p.status, 'Próxima acción: No definida'],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'prospect', entityId: p.id,
        title: 'Definir siguiente paso',
        suggestedAction: 'Agendar una llamada o definir un paso concreto',
        evidence: [`Estado: ${p.status}`, 'Sin próxima acción programada'],
      })
    }

    // Rule: Interesado sin actividad programada
    if (p.status === 'Interesado' && (!p.nextActionDate || isOverdue(p.nextActionDate))) {
      recs.push({
        id: genId(), action: `Programar actividad para ${p.name} - interesado sin acción pendiente`,
        reason: 'Prospecto interesado sin actividad programada o con actividad vencida',
        priority: 'Alta', relatedTo: p.id, relatedType: 'prospect',
        dataUsed: ['Estado: Interesado', `Próxima acción: ${p.nextAction || 'No definida'}`, `Fecha: ${p.nextActionDate || 'Sin fecha'}`],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'prospect', entityId: p.id,
        title: 'Prospecto interesado sin seguimiento',
        suggestedAction: 'Contactar para avanzar en la negociación',
        evidence: [`Estado: ${p.status}`, `Interés: ${p.interest}`, `Último seguimiento: ${lastFollowUpDate ?? 'Ninguno'}`],
      })
    }

    // Rule: Cotización enviada sin seguimiento
    if (p.status === 'Cotización enviada') {
      const hasRecentFollowUp = prospectFollowUps.some(f => {
        const days = daysUntil(f.nextActionDate || '')
        return days >= -7
      })
      if (!hasRecentFollowUp) {
        recs.push({
          id: genId(), action: `Dar seguimiento a cotización de ${p.name}`,
          reason: 'Cotización enviada sin seguimiento reciente',
          priority: 'Alta', relatedTo: p.id, relatedType: 'prospect',
          dataUsed: ['Estado: Cotización enviada', `Cotizaciones: ${prospectQuotes.length}`],
          confidence: 'Alta', attended: false, createdAt: today,
          entityType: 'prospect', entityId: p.id,
          title: 'Cotización enviada sin seguimiento',
          suggestedAction: 'Llamar para confirmar recepción y resolver dudas',
          evidence: [`Estado: ${p.status}`, `Cotizaciones activas: ${prospectQuotes.filter(q => q.status === 'Enviada' || q.status === 'Pendiente').length}`],
        })
      }
    }

    // Rule: Varios días sin contacto
    if (daysSinceLastContact !== null && daysSinceLastContact > 7 && p.status !== 'Nuevo') {
      recs.push({
        id: genId(), action: `Retomar contacto con ${p.name} - ${daysSinceLastContact} días sin comunicación`,
        reason: `El prospecto lleva ${daysSinceLastContact} días sin contacto`,
        priority: daysSinceLastContact > 14 ? 'Alta' : 'Media', relatedTo: p.id, relatedType: 'prospect',
        dataUsed: [`Último contacto: ${lastFollowUpDate}`, `Días sin contacto: ${daysSinceLastContact}`],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'prospect', entityId: p.id,
        title: 'Prospecto sin contacto reciente',
        suggestedAction: 'Llamar para retomar la conversación',
        evidence: [`Días sin contacto: ${daysSinceLastContact}`, `Estado: ${p.status}`],
      })
    }
  }

  for (const c of clients) {
    const clientFollowUps = followUps.filter(f => f.relatedTo === c.id)
    const clientQuotes = quotes.filter(q => q.relatedTo === c.id)
    const lastFollowUpDate = clientFollowUps.length > 0
      ? clientFollowUps.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
      : null
    const daysSinceLastContact = lastFollowUpDate ? daysUntil(lastFollowUpDate) * -1 : null

    // Rule: Inactivo
    if (c.status === 'Inactivo') {
      recs.push({
        id: genId(), action: `Intentar recuperar a ${c.name} de ${c.company}`,
        reason: 'Cliente marcado como inactivo',
        priority: 'Media', relatedTo: c.id, relatedType: 'client',
        dataUsed: ['Estado: Inactivo', `Actualizado: ${c.updatedAt}`],
        confidence: 'Media', attended: false, createdAt: today,
        entityType: 'client', entityId: c.id,
        title: 'Recuperar cliente inactivo',
        suggestedAction: 'Llamar para conocer motivo de inactividad y ofrecer promoción',
        evidence: [`Estado: ${c.status}`, `Última actualización: ${c.updatedAt}`, `Interés previo: ${c.interest}`],
      })
    }

    // Rule: Activo sin próxima acción
    if (c.status === 'Activo' && clientFollowUps.length > 0) {
      const hasPendingAction = clientFollowUps.some(f => f.nextActionDate && !isOverdue(f.nextActionDate))
      if (!hasPendingAction) {
        recs.push({
          id: genId(), action: `Programar siguiente contacto con ${c.name}`,
          reason: 'Cliente activo sin próxima acción programada',
          priority: 'Media', relatedTo: c.id, relatedType: 'client',
          dataUsed: ['Estado: Activo', 'Sin próxima acción'],
          confidence: 'Media', attended: false, createdAt: today,
          entityType: 'client', entityId: c.id,
          title: 'Programar seguimiento a cliente activo',
          suggestedAction: 'Agendar llamada de seguimiento comercial',
          evidence: [`Estado: ${c.status}`, `Prioridad: ${c.priority}`, `Interés: ${c.interest}`],
        })
      }
    }

    // Rule: Cliente con seguimiento vencido
    for (const f of clientFollowUps) {
      if (f.status !== 'Finalizada' && f.status !== 'Cancelada' && f.nextActionDate && isOverdue(f.nextActionDate)) {
        recs.push({
          id: genId(), action: `Seguimiento vencido con ${c.name}: ${f.nextAction}`,
          reason: `Seguimiento prometido para ${f.nextActionDate} está vencido`,
          priority: 'Crítica', relatedTo: c.id, relatedType: 'client',
          dataUsed: [`Fecha prometida: ${f.nextActionDate}`, `Acción: ${f.nextAction}`],
          confidence: 'Muy alta', attended: false, createdAt: today,
          entityType: 'followup', entityId: f.id,
          title: 'Seguimiento vencido',
          suggestedAction: 'Realizar seguimiento pendiente cuanto antes',
          evidence: [`Acción comprometida: ${f.nextAction}`, `Vencido desde: ${f.nextActionDate}`, `Resultado anterior: ${f.result}`],
        })
      }
    }

    // Rule: Sin contacto reciente (activo pero sin seguimiento en >14 días)
    if (daysSinceLastContact !== null && daysSinceLastContact > 14 && c.status === 'Activo') {
      recs.push({
        id: genId(), action: `Contactar a ${c.name} - ${daysSinceLastContact} días sin seguimiento`,
        reason: `Cliente activo lleva ${daysSinceLastContact} días sin contacto`,
        priority: 'Media', relatedTo: c.id, relatedType: 'client',
        dataUsed: ['Estado: Activo', `Días sin contacto: ${daysSinceLastContact}`],
        confidence: 'Media', attended: false, createdAt: today,
        entityType: 'client', entityId: c.id,
        title: 'Cliente sin contacto reciente',
        suggestedAction: 'Llamar para ofrecer productos de su interés',
        evidence: [`Días sin contacto: ${daysSinceLastContact}`, `Interés: ${c.interest}`, `Prioridad: ${c.priority}`],
      })
    }

    // Rule: Cliente con cotización pendiente
    const pendingQuotesForClient = clientQuotes.filter(q => q.status === 'Pendiente' || q.status === 'Enviada')
    if (pendingQuotesForClient.length > 0) {
      recs.push({
        id: genId(), action: `${c.name} tiene ${pendingQuotesForClient.length} cotización(es) pendiente(s) por $${pendingQuotesForClient.reduce((s, q) => s + q.amount, 0).toLocaleString()}`,
        reason: 'Cliente con cotizaciones abiertas que requieren seguimiento',
        priority: 'Alta', relatedTo: c.id, relatedType: 'client',
        dataUsed: [`Cotizaciones pendientes: ${pendingQuotesForClient.length}`, `Monto total: $${pendingQuotesForClient.reduce((s, q) => s + q.amount, 0)}`],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'client', entityId: c.id,
        title: 'Cotizaciones pendientes con cliente',
        suggestedAction: 'Dar seguimiento a cotizaciones abiertas',
        evidence: pendingQuotesForClient.map(q => `Cotización #${q.id}: $${q.amount} (${q.status})`),
      })
    }

    // Rule: Compromiso para hoy
    for (const f of clientFollowUps) {
      if (f.status !== 'Finalizada' && f.status !== 'Cancelada' && f.nextActionDate && isToday(f.nextActionDate)) {
        recs.push({
          id: genId(), action: `Compromiso hoy con ${c.name}: ${f.nextAction}`,
          reason: 'Existe un compromiso programado para hoy',
          priority: 'Crítica', relatedTo: c.id, relatedType: 'client',
          dataUsed: [`Fecha: ${f.nextActionDate}`, `Compromiso: ${f.nextAction}`],
          confidence: 'Muy alta', attended: false, createdAt: today,
          entityType: 'followup', entityId: f.id,
          title: 'Compromiso para hoy',
          suggestedAction: 'Cumplir el compromiso con el cliente',
          evidence: [`Acción: ${f.nextAction}`, `Cliente: ${c.name}`, `Fecha programada: ${f.nextActionDate}`],
        })
      }
    }

    // Rule: Invitar a visitar tienda (si no ha tenido seguimiento presencial)
    const hasStoreVisit = clientFollowUps.some(f => f.contactMethod === 'Visita a tienda')
    if (!hasStoreVisit && c.status === 'Activo') {
      recs.push({
        id: genId(), action: `Invitar a ${c.name} a visitar la tienda`,
        reason: 'Cliente activo que aún no ha visitado la tienda recientemente',
        priority: 'Baja', relatedTo: c.id, relatedType: 'client',
        dataUsed: ['Sin visita a tienda registrada', `Interés: ${c.interest}`],
        confidence: 'Baja', attended: false, createdAt: today,
        entityType: 'client', entityId: c.id,
        title: 'Invitación a tienda',
        suggestedAction: 'Enviar WhatsApp invitando a conocer nuevos productos',
        evidence: ['Sin registro de visita a tienda', `Productos de interés: ${c.interest}`],
      })
    }
  }

  for (const q of quotes) {
    if (q.status === 'Cancelada' || q.status === 'Aceptada' || q.status === 'Rechazada') continue

    const quoteFollowUps = followUps.filter(f => f.relatedTo === q.relatedTo)
    const daysSinceCreated = daysUntil(q.createdAt) * -1
    const hasFollowUpAfterQuote = quoteFollowUps.some(f => new Date(f.date) > new Date(q.createdAt))

    // Rule: Pendiente
    if (q.status === 'Pendiente') {
      recs.push({
        id: genId(),
        action: `Cotización pendiente de $${q.amount.toLocaleString()} - requiere acción`,
        reason: `Cotización pendiente desde ${q.createdAt}`,
        priority: q.amount > 50000 ? 'Crítica' : 'Alta',
        relatedTo: q.relatedTo, relatedType: q.relatedType,
        dataUsed: [`Monto: $${q.amount}`, 'Estado: Pendiente', `Creada: ${q.createdAt}`],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'quote', entityId: q.id,
        title: 'Cotización pendiente',
        suggestedAction: 'Contactar al cliente para presentar la cotización',
        evidence: [`Monto: $${q.amount}`, `Estado: ${q.status}`, `Días desde creación: ${daysSinceCreated}`],
      })
    }

    // Rule: Enviada sin seguimiento
    if (q.status === 'Enviada' && !hasFollowUpAfterQuote) {
      recs.push({
        id: genId(),
        action: `Cotización enviada sin seguimiento - $${q.amount.toLocaleString()}`,
        reason: 'Cotización enviada sin seguimiento registrado después del envío',
        priority: 'Alta', relatedTo: q.relatedTo, relatedType: q.relatedType,
        dataUsed: [`Monto: $${q.amount}`, 'Estado: Enviada'],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'quote', entityId: q.id,
        title: 'Cotización enviada sin seguimiento',
        suggestedAction: 'Llamar para confirmar recepción y resolver dudas',
        evidence: [`Monto: $${q.amount}`, `Estado: ${q.status}`, 'Sin seguimiento posterior al envío'],
      })
    }

    // Rule: Más de 3 días sin actividad
    if (daysSinceCreated > 3 && !hasFollowUpAfterQuote) {
      recs.push({
        id: genId(),
        action: `Cotización de $${q.amount.toLocaleString()} lleva ${daysSinceCreated} días sin actividad`,
        reason: `Más de 3 días sin actividad en la cotización`,
        priority: q.amount > 50000 ? 'Crítica' : 'Alta', relatedTo: q.relatedTo, relatedType: q.relatedType,
        dataUsed: [`Días sin actividad: ${daysSinceCreated}`, `Monto: $${q.amount}`],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'quote', entityId: q.id,
        title: 'Cotización sin actividad',
        suggestedAction: 'Dar seguimiento urgente a la cotización',
        evidence: [`Días sin actividad: ${daysSinceCreated}`, `Monto: $${q.amount}`],
      })
    }

    // Rule: Más de 7 días sin respuesta
    if (q.status === 'Enviada' && daysSinceCreated > 7) {
      recs.push({
        id: genId(),
        action: `Cotización de $${q.amount.toLocaleString()} lleva ${daysSinceCreated} días sin respuesta`,
        reason: 'Más de 7 días sin respuesta del cliente',
        priority: 'Crítica', relatedTo: q.relatedTo, relatedType: q.relatedType,
        dataUsed: [`Días sin respuesta: ${daysSinceCreated}`, `Monto: $${q.amount}`],
        confidence: 'Alta', attended: false, createdAt: today,
        entityType: 'quote', entityId: q.id,
        title: 'Cotización sin respuesta prolongada',
        suggestedAction: 'Llamar para conocer decisión o si necesita ajustes',
        evidence: [`Días sin respuesta: ${daysSinceCreated}`, `Monto: $${q.amount}`],
      })
    }
  }

  for (const f of followUps) {
    // Rule: Vencido sin completar
    if (f.status === 'Pendiente' || f.status === 'En proceso') {
      if (f.nextActionDate && isOverdue(f.nextActionDate)) {
        recs.push({
          id: genId(),
          action: `Seguimiento vencido: ${f.nextAction || 'Sin acción definida'}`,
          reason: `Seguimiento vencido desde ${f.nextActionDate}`,
          priority: 'Crítica', relatedTo: f.relatedTo, relatedType: f.relatedType,
          dataUsed: [`Fecha vencida: ${f.nextActionDate}`, `Método: ${f.contactMethod}`, `Estado: ${f.status}`],
          confidence: 'Muy alta', attended: false, createdAt: today,
          entityType: 'followup', entityId: f.id,
          title: 'Seguimiento vencido',
          suggestedAction: 'Realizar el seguimiento pendiente y actualizar resultado',
          evidence: [`Fecha prometida: ${f.nextActionDate}`, `Método de contacto: ${f.contactMethod}`, `Resultado anterior: ${f.result || 'Sin resultado'}`],
        })
      }

      // Rule: Para hoy
      if (f.nextActionDate && isToday(f.nextActionDate)) {
        recs.push({
          id: genId(),
          action: `Seguimiento para hoy: ${f.nextAction || 'Contactar'}`,
          reason: 'Seguimiento programado para hoy',
          priority: 'Alta', relatedTo: f.relatedTo, relatedType: f.relatedType,
          dataUsed: [`Fecha: ${f.nextActionDate}`, `Acción: ${f.nextAction}`],
          confidence: 'Muy alta', attended: false, createdAt: today,
          entityType: 'followup', entityId: f.id,
          title: 'Seguimiento para hoy',
          suggestedAction: 'Realizar el seguimiento y registrar resultado',
          evidence: [`Fecha programada: ${f.nextActionDate}`, `Acción: ${f.nextAction}`, `Contacto: ${f.contactMethod}`],
        })
      }

      // Rule: Sin resultado
      if (!f.result) {
        recs.push({
          id: genId(),
          action: `Seguimiento sin resultado registrado - ${f.contactMethod}`,
          reason: 'El seguimiento no tiene resultado documentado',
          priority: 'Media', relatedTo: f.relatedTo, relatedType: f.relatedType,
          dataUsed: ['Resultado: No registrado', `Método: ${f.contactMethod}`],
          confidence: 'Media', attended: false, createdAt: today,
          entityType: 'followup', entityId: f.id,
          title: 'Seguimiento sin resultado',
          suggestedAction: 'Documentar el resultado del último contacto',
          evidence: [`Método: ${f.contactMethod}`, 'Sin resultado documentado'],
        })
      }

    }
  }

  for (const f of followUps) {
    // Rule: Sin próxima acción después de completarse
    if (f.status === 'Finalizada' && !f.nextAction) {
      recs.push({
        id: genId(),
        action: 'Definir próxima acción después del seguimiento completado',
        reason: 'Seguimiento finalizado sin próxima acción definida',
        priority: 'Media', relatedTo: f.relatedTo, relatedType: f.relatedType,
        dataUsed: ['Estado: Finalizada', 'Próxima acción: No definida'],
        confidence: 'Media', attended: false, createdAt: today,
        entityType: 'followup', entityId: f.id,
        title: 'Definir siguiente paso',
        suggestedAction: 'Programar el siguiente contacto con el cliente',
        evidence: ['Seguimiento completado', 'Sin próxima acción definida'],
      })
    }
  }

  for (const t of tasks) {
    if (t.status === 'Finalizada' || t.status === 'Cancelada') continue

    // Rule: Vencida
    if (t.date && isOverdue(t.date)) {
      recs.push({
        id: genId(), action: `Tarea vencida: ${t.title}`,
        reason: `Tarea programada para ${t.date} está vencida`,
        priority: 'Crítica', relatedTo: t.relatedTo, relatedType: t.relatedType === 'none' ? 'task' : t.relatedType,
        dataUsed: [`Fecha: ${t.date}`, `Prioridad original: ${t.priority}`],
        confidence: 'Muy alta', attended: false, createdAt: today,
        entityType: 'task', entityId: t.id,
        title: 'Tarea vencida',
        suggestedAction: 'Completar la tarea o reprogramarla',
        evidence: [`Título: ${t.title}`, `Fecha vencida: ${t.date}`, `Prioridad: ${t.priority}`],
      })
    }

    // Rule: Para hoy
    if (t.date && isToday(t.date)) {
      recs.push({
        id: genId(), action: `Tarea para hoy: ${t.title}`,
        reason: 'Tarea programada para hoy',
        priority: t.priority === 'Crítica' ? 'Crítica' : 'Alta',
        relatedTo: t.relatedTo, relatedType: t.relatedType === 'none' ? 'task' : t.relatedType,
        dataUsed: [`Fecha: ${t.date}`, `Prioridad: ${t.priority}`],
        confidence: 'Muy alta', attended: false, createdAt: today,
        entityType: 'task', entityId: t.id,
        title: 'Tarea para hoy',
        suggestedAction: 'Realizar la tarea hoy',
        evidence: [`Título: ${t.title}`, `Fecha: ${t.date}`, `Prioridad: ${t.priority}`],
      })
    }
  }

  return sortByPriority(recs).slice(0, 30)
}

export async function getRecommendationsForEntity(entityId: string, entityType: 'prospect' | 'client'): Promise<Recommendation[]> {
  const all = await generateRecommendations()
  return all.filter(r => r.relatedTo === entityId && r.relatedType === entityType)
}

export async function getTopRecommendations(count: number = 5): Promise<Recommendation[]> {
  const all = await generateRecommendations()
  return all.filter(r => !r.attended).slice(0, count)
}
