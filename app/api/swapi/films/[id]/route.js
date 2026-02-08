/**
 * SWAPI Single Film Route
 * GET /api/swapi/films/:id - Returns a single Star Wars film by episode_id
 */

import { getFilm } from '../../../../lib/swapi'

export async function GET(request, { params }) {
    const { id } = await params

    if (!id) {
        return Response.json(
            { error: 'Film ID is required' },
            { status: 400 }
        )
    }

    try {
        const film = await getFilm(id)
        return Response.json(film)
    } catch (error) {
        console.error(`SWAPI film ${id} error:`, error)
        return Response.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
