'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import { Search, MapPin, Phone, Globe, ArrowRight, UserPlus, Loader2 } from 'lucide-react'

const BUSINESS_TYPES = [
  { value: 'Constructoras', label: 'Constructoras' },
  { value: 'Contratistas', label: 'Contratistas' },
  { value: 'Arquitectos', label: 'Arquitectos' },
  { value: 'Ingenieros', label: 'Ingenieros' },
  { value: 'Instaladores', label: 'Instaladores' },
  { value: 'Electricistas', label: 'Electricistas' },
  { value: 'Plomeros', label: 'Plomeros' },
  { value: 'Tiendas de materiales', label: 'Tiendas de materiales' },
  { value: 'Empresas de mantenimiento', label: 'Empresas de mantenimiento' },
]

interface PlaceResult {
  id: string
  name: string
  address: string
  phone: string
  rating: number | null
  website: string
  type: string
  mapsUrl: string
}

export default function ProspectingPage() {
  const router = useRouter()
  const [city, setCity] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [results, setResults] = useState<PlaceResult[]>([])
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!city.trim() || !businessType) return

    setSearching(true)
    setError('')
    setSearched(false)

    try {
      const res = await fetch('/api/prospecting/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: city.trim(), businessType }),
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Error al buscar')
        return
      }

      const data = await res.json()
      setResults(data.places)
      setSearched(true)
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setSearching(false)
    }
  }

  function addAsProspect(place: PlaceResult) {
    const name = place.name
    const phone = place.phone.replace(/[^0-9]/g, '')
    const company = place.name
    const params = new URLSearchParams({
      name,
      phone,
      company,
      interest: businessType,
      origin: 'Prospección web',
    })
    router.push(`/prospects/new?${params.toString()}`)
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            Prospección Web
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Encuentra constructoras, contratistas y más negocios por ubicación para contactarlos
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  label="Ciudad"
                  placeholder="Ej: Saltillo, Coahuila"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="w-56">
                <Select
                  label="Tipo de negocio"
                  placeholder="Seleccionar..."
                  options={BUSINESS_TYPES}
                  value={businessType}
                  onChange={e => setBusinessType(e.target.value)}
                />
              </div>
              <Button type="submit" loading={searching} className="mb-0.5">
                {searching ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-1.5" />
                )}
                Buscar
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4 text-sm text-red-700">{error}</CardContent>
          </Card>
        )}

        {searched && results.length === 0 && !error && (
          <EmptyState
            title="Sin resultados"
            description={`No se encontraron ${businessType.toLowerCase()} en ${city}. Intenta con otra ciudad o tipo de negocio.`}
            icon={<MapPin className="h-8 w-8 text-gray-400" />}
          />
        )}

        {results.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''} en <strong>{city}</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map(place => (
                <Card key={place.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{place.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {place.rating && (
                            <Badge>{place.rating.toFixed(1) + ' ★'}</Badge>
                          )}
                          {place.type && (
                            <Badge>{place.type.replace(/_/g, ' ')}</Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addAsProspect(place)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" /> Agregar
                      </Button>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {place.address && (
                        <a
                          href={place.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{place.address}</span>
                        </a>
                      )}
                      {place.phone && (
                        <a
                          href={`tel:${place.phone}`}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{place.phone}</span>
                        </a>
                      )}
                      {place.website && (
                        <a
                          href={place.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <Globe className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">Sitio web</span>
                        </a>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2 pt-3 border-t border-gray-100">
                      {place.phone && (
                        <a href={`tel:${place.phone}`}>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" /> Llamar
                          </Button>
                        </a>
                      )}
                      {place.website && (
                        <a href={place.website} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline">
                            <Globe className="h-4 w-4 mr-1" /> Visitar
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
