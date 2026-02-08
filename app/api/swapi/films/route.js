/**
 * SWAPI Films List Route
 * GET /api/swapi/films - Returns all Star Wars films sorted by episode_id
 */

import { getFilmPoster } from '../../../lib/filmImages'

const SWAPI_BASE = 'https://swapi.dev/api'

export async function GET() {
    try {
        const response = await fetch(`${SWAPI_BASE}/films/`, {
            next: {
                revalidate: 86400, // 24 hour cache
                tags: ['swapi', 'films']
            }
        })

        if (!response.ok) {
            return Response.json(
                { error: 'Failed to fetch films from SWAPI' },
                { status: response.status }
            )
        }

        const data = await response.json()



        // Sort by episode_id
        const sortedFilms = data.results.sort((a, b) => a.episode_id - b.episode_id).map(film => ({
            ...film,
            posterUrl: getFilmPoster(film.episode_id)
        }))

        return Response.json({ results: sortedFilms })
    } catch (error) {
        console.error('SWAPI films error:', error)
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
