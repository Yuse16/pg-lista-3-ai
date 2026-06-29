'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getRepository } from '@/lib/repositories/repository'
import { generateRecommendations } from '@/lib/recommendations'
import { isOverdue, isToday } from '@/lib/utils'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import {
  Users, UserPlus, PhoneCall, FileText, TrendingUp, Clock,
  AlertTriangle, CheckCircle2, ArrowRight, Bot, RefreshCw,
} from 'lucide-react'
import type { DashboardStats, Recommendation } from '@/lib/types'

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async function loadData() {
    const repo = getRepository()
    const [prospects, clients, followUps, quotes] = await Promise.all([
      repo.prospects.list(),
      repo.clients.list(),
      repo.followUps.list(),
      repo.quotes.list(),
    ])

    const todayFollowUps = followUps.filter(f =>
      f.status !== 'Finalizada' && f.status !== 'Cancelada' && f.nextActionDate && isToday(f.nextActionDate)
    )
    const overdueFollowUps = followUps.filter(f =>
      f.status !== 'Finalizada' && f.status !== 'Cancelada' && f.nextActionDate && isOverdue(f.nextActionDate)
    )
    const pendingQuotes = quotes.filter(q => q.status === 'Pendiente' || q.status === 'Enviada')
    const activeProspects = prospects.filter(p => !['Archivado', 'Perdido', 'Ganado'].includes(p.status))
    const activeClients = clients.filter(c => c.status === 'Activo')

    const recs = await generateRecommendations()

    const recentActivity = [
      ...prospects.map(p => ({ id: p.id, type: 'prospect_created' as const, description: `Nuevo prospecto: ${p.name}`, relatedTo: p.id, relatedType: 'prospect' as const, date: p.createdAt })),
      ...clients.map(c => ({ id: c.id, type: 'client_created' as const, description: `Cliente registrado: ${c.name}`, relatedTo: c.id, relatedType: 'client' as const, date: c.createdAt })),
      ...followUps.map(f => ({ id: f.id, type: 'followup_registered' as const, description: `Seguimiento: ${f.contactMethod}${f.result ? ' - ' + f.result : ''}`, relatedTo: f.relatedTo, relatedType: f.relatedType as 'prospect' | 'client', date: f.createdAt })),
      ...quotes.map(q => ({ id: q.id, type: 'quote_created' as const, description: `Cotización: $${q.amount.toLocaleString()} (${q.status})`, relatedTo: q.relatedTo, relatedType: q.relatedType as 'prospect' | 'client', date: q.createdAt })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)

    setStats({
      activeProspects: activeProspects.length,
      activeClients: activeClients.length,
      followUpsToday: todayFollowUps.length,
      followUpsOverdue: overdueFollowUps.length,
      pendingQuotes: pendingQuotes.length,
      priorityOpportunities: recs.filter(r => r.priority === 'Crítica' || r.priority === 'Alta').length,
      recentActivity,
      commercialSummary: {
        totalQuotes: quotes.length,
        totalFollowUps: followUps.length,
        conversionsThisMonth: prospects.filter(p => p.status === 'Ganado').length,
        prospectsCreatedThisMonth: prospects.filter(p => {
          const d = new Date(p.createdAt); const now = new Date()
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        }).length,
      },
    })
    setRecommendations(recs)
    setLoading(false)
  }, [])

  useEffect(() => {
    const timer = requestAnimationFrame(() => { loadData() })
    const onFocus = () => { loadData() }
    window.addEventListener('focus', onFocus)
    return () => {
      cancelAnimationFrame(timer)
      window.removeEventListener('focus', onFocus)
    }
  }, [loadData])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </AppLayout>
    )
  }

  const topRecs = recommendations.filter(r => !r.attended).slice(0, 5)

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">{recommendations.length > 0 ? `${recommendations.length} recomendaciones activas` : 'Plan recomendado para hoy'}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="h-4 w-4 mr-1.5" /> Actualizar
            </Button>
            <Button onClick={() => router.push('/prospects/new')}>
              + Nuevo Prospecto
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg"><UserPlus className="h-5 w-5 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats!.activeProspects}</p>
                <p className="text-xs text-gray-500">Prospectos activos</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg"><Users className="h-5 w-5 text-green-600" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats!.activeClients}</p>
                <p className="text-xs text-gray-500">Clientes activos</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg"><PhoneCall className="h-5 w-5 text-yellow-600" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats!.followUpsToday}</p>
                <p className="text-xs text-gray-500">Seg. para hoy</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className={`p-2 rounded-lg ${stats!.followUpsOverdue > 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
              <AlertTriangle className={`h-5 w-5 ${stats!.followUpsOverdue > 0 ? 'text-red-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${stats!.followUpsOverdue > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {stats!.followUpsOverdue}
              </p>
              <p className="text-xs text-gray-500">Seg. vencidos</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg"><FileText className="h-5 w-5 text-purple-600" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats!.pendingQuotes}</p>
                <p className="text-xs text-gray-500">Cotiz. pendientes</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg"><TrendingUp className="h-5 w-5 text-orange-600" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats!.priorityOpportunities}</p>
                <p className="text-xs text-gray-500">Oportunidades</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-50 rounded-lg"><CheckCircle2 className="h-5 w-5 text-cyan-600" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats!.commercialSummary.conversionsThisMonth}</p>
                <p className="text-xs text-gray-500">Conversiones</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg"><Clock className="h-5 w-5 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats!.commercialSummary.prospectsCreatedThisMonth}</p>
                <p className="text-xs text-gray-500">Nuevos prosp.</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Recomendaciones del Agente</h2>
                  <Bot className="h-5 w-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {topRecs.length === 0 ? (
                  <div className="px-5 py-8">
                    <p className="text-sm text-gray-500 text-center">No hay recomendaciones pendientes. Todos los registros están al día.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {topRecs.map((rec, idx) => (
                      <div key={rec.id + idx} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge>{rec.priority}</Badge>
                              <Badge>{rec.confidence}</Badge>
                              {rec.title && <span className="text-xs text-gray-400 truncate">{rec.title}</span>}
                            </div>
                            <p className="text-sm font-medium text-gray-900">{rec.action}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{rec.reason}</p>
                            {rec.dataUsed.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {rec.dataUsed.map((d, i) => (
                                  <span key={i} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{d}</span>
                                ))}
                              </div>
                            )}
                            {rec.evidence && rec.evidence.length > 0 && (
                              <div className="mt-1.5 text-xs text-gray-400">
                                {rec.evidence.map((e, i) => (
                                  <span key={i} className="block">• {e}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const path = rec.relatedType === 'prospect' ? '/prospects/' : '/clients/'
                                router.push(path + rec.relatedTo)
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {recommendations.length > 5 && (
                  <div className="px-5 py-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">
                      +{recommendations.length - 5} recomendaciones adicionales — revisa los módulos individuales
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Actividad Reciente</h2>
              </CardHeader>
              <CardContent className="p-0">
                {stats!.recentActivity.length === 0 ? (
                  <div className="px-5 py-8">
                    <p className="text-sm text-gray-500">Sin actividad reciente</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {stats!.recentActivity.map((act, i) => (
                      <div key={act.id + i} className="px-5 py-3">
                        <p className="text-sm text-gray-700 truncate">{act.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(act.date).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Resumen Comercial</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total cotizaciones</span>
                  <span className="text-sm font-semibold">{stats!.commercialSummary.totalQuotes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total seguimientos</span>
                  <span className="text-sm font-semibold">{stats!.commercialSummary.totalFollowUps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversiones este mes</span>
                  <span className="text-sm font-semibold">{stats!.commercialSummary.conversionsThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nuevos prospectos (mes)</span>
                  <span className="text-sm font-semibold">{stats!.commercialSummary.prospectsCreatedThisMonth}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
