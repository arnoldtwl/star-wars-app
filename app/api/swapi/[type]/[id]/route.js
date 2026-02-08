/**
 * SWAPI Resource Route
 * GET /api/swapi/:type/:id - Returns a SWAPI resource by type and ID
 * Supported types: people, planets, species, starships, vehicles
 */

const SWAPI_BASE = 'https://swapi.dev/api'

const VALID_TYPES = ['people', 'planets', 'species', 'starships', 'vehicles']

export async function GET(request, { params }) {
    const { type, id } = await params

    if (!VALID_TYPES.includes(type)) {
        return Response.json(
            { error: `Invalid resource type: ${type}. Valid types: ${VALID_TYPES.join(', ')}` },
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
        const response = await fetch(`${SWAPI_BASE}/${type}/${id}/`, {
            next: {
                revalidate: 86400, // 24 hour cache
                tags: ['swapi', type, `${type}-${id}`]
            }
        })

        if (!response.ok) {
            if (response.status === 404) {
                return Response.json(
                    { error: `${type} ${id} not found` },
                    { status: 404 }
                )
            }
            return Response.json(
                { error: `Failed to fetch ${type} from SWAPI` },
                { status: response.status }
            )
        }

        const resource = await response.json()
        return Response.json(resource)
    } catch (error) {
        console.error(`SWAPI ${type}/${id} error:`, error)
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
