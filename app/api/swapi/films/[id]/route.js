/**
 * SWAPI Single Film Route
 * GET /api/swapi/films/:id - Returns a single Star Wars film by episode_id
 */

const SWAPI_BASE = 'https://swapi.dev/api'

export async function GET(request, { params }) {
    const { id } = await params

    if (!id) {
        return Response.json(
            { error: 'Film ID is required' },
            { status: 400 }
        )
    }

    try {
        const response = await fetch(`${SWAPI_BASE}/films/${id}/`, {
            next: {
                revalidate: 86400, // 24 hour cache
                tags: ['swapi', 'films', `film-${id}`]
            }
        })

        if (!response.ok) {
            if (response.status === 404) {
                return Response.json(
                    { error: `Film ${id} not found` },
                    { status: 404 }
                )
            }
            return Response.json(
                { error: 'Failed to fetch film from SWAPI' },
                { status: response.status }
            )
        }

        const film = await response.json()
        return Response.json(film)
    } catch (error) {
        console.error(`SWAPI film ${id} error:`, error)
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
