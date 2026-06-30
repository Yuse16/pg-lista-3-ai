import { NextResponse } from 'next/server'

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY

const PLACE_TYPES = [
  'constructor', 'contractor', 'architect', 'engineer',
  'general_contractor', 'building_supply_store', 'home_improvement_store',
  'electrician', 'plumber', 'painter', 'roofing_contractor',
] as const

export async function POST(req: Request) {
  try {
    const { city, businessType } = await req.json()

    if (!city?.trim() || !businessType?.trim()) {
      return NextResponse.json({ error: 'Ciudad y tipo de negocio son obligatorios' }, { status: 400 })
    }

    if (!GOOGLE_API_KEY) {
      return NextResponse.json({ error: 'API key no configurada' }, { status: 500 })
    }

    const query = `${businessType.trim()} en ${city.trim()}`
    const types = businessType.toLowerCase().includes('construc') ? 'general_contractor|building_supply_store'
      : businessType.toLowerCase().includes('arquit') || businessType.toLowerCase().includes('arquit') ? 'architect'
      : businessType.toLowerCase().includes('ingenier') ? 'engineer'
      : businessType.toLowerCase().includes('instalador') || businessType.toLowerCase().includes('electric') ? 'electrician|plumber'
      : businessType.toLowerCase().includes('contratista') ? 'general_contractor'
      : 'establishment'

    const url = 'https://places.googleapis.com/v1/places:searchText'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating,places.websiteUri,places.primaryType,places.id,places.googleMapsUri',
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'es',
        maxResultCount: 20,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Places API error:', response.status, errorText)
      return NextResponse.json({ error: `Error al buscar: ${response.statusText}` }, { status: response.status })
    }

    const data = await response.json()

    const places = (data.places || []).map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || 'Sin nombre',
      address: place.formattedAddress || '',
      phone: place.nationalPhoneNumber || '',
      rating: place.rating || null,
      website: place.websiteUri || '',
      type: place.primaryType || '',
      mapsUrl: place.googleMapsUri || '',
    }))

    return NextResponse.json({ places, query })
  } catch (error: any) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
