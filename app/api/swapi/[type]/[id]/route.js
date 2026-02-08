/**
 * SWAPI Resource Route
 * GET /api/swapi/:type/:id - Returns a SWAPI resource by type and ID
 * Supported types: people, planets, species, starships, vehicles
 */

import {
    getPlanet,
    getSpecies,
    getStarship,
    getVehicle
} from '../../../../lib/swapi'

// SWAPI 'people' is often called from generic route
async function getPerson(id) {
    const url = `https://swapi.dev/api/people/${id}/`
    const res = await fetch(url, { next: { revalidate: 86400, tags: ['swapi', 'people'] } })
    if (!res.ok) throw new Error(`Failed to fetch person: ${res.status}`)
    return res.json()
}

const RESOURCE_HANDLERS = {
    planets: getPlanet,
    species: getSpecies,
    starships: getStarship,
    vehicles: getVehicle,
    people: getPerson
}

export async function GET(request, { params }) {
    const { type, id } = await params

    if (!RESOURCE_HANDLERS[type]) {
        return Response.json(
            { error: `Invalid resource type: ${type}. Valid types: ${Object.keys(RESOURCE_HANDLERS).join(', ')}` },
            { status: 400 }
        )
    }

    if (!id) {
        return Response.json(
            { error: 'Resource ID is required' },
            { status: 400 }
        )
    }

    try {
        const handler = RESOURCE_HANDLERS[type]
        const resource = await handler(id)
        return Response.json(resource)
    } catch (error) {
        console.error(`SWAPI ${type}/${id} error:`, error)
        return Response.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
