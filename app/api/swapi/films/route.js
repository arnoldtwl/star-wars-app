/**
 * SWAPI Films List Route
 * GET /api/swapi/films - Returns all Star Wars films sorted by episode_id
 */

import { getFilmPoster } from '../../../lib/filmImages'

const SWAPI_BASE = 'https://swapi.dev/api'

import { getFilms } from '../../../lib/swapi'

export async function GET() {
    try {
        const data = await getFilms()
        return Response.json(data)
    } catch (error) {
        console.error('SWAPI films API error:', error)
        return Response.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
