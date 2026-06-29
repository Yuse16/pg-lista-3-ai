const statusColors: Record<string, string> = {
  Nuevo: 'bg-blue-100 text-blue-800',
  Contactado: 'bg-yellow-100 text-yellow-800',
  Interesado: 'bg-green-100 text-green-800',
  'Cotización enviada': 'bg-purple-100 text-purple-800',
  Seguimiento: 'bg-cyan-100 text-cyan-800',
  Ganado: 'bg-emerald-100 text-emerald-800',
  Perdido: 'bg-red-100 text-red-800',
  Archivado: 'bg-gray-100 text-gray-600',
  Activo: 'bg-green-100 text-green-800',
  Inactivo: 'bg-gray-100 text-gray-600',
  Pendiente: 'bg-yellow-100 text-yellow-800',
  Enviada: 'bg-blue-100 text-blue-800',
  Aceptada: 'bg-green-100 text-green-800',
  Rechazada: 'bg-red-100 text-red-800',
  Cancelada: 'bg-gray-100 text-gray-500',
  'En proceso': 'bg-cyan-100 text-cyan-800',
  Finalizada: 'bg-green-100 text-green-800',
  Crítica: 'bg-red-100 text-red-800',
  Alta: 'bg-orange-100 text-orange-800',
  Media: 'bg-yellow-100 text-yellow-800',
  Baja: 'bg-gray-100 text-gray-600',
}

interface BadgeProps {
  children: string
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  const color = statusColors[children] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}>
      {children}
    </span>
  )
}
