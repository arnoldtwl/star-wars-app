/**
 * SWAPI Batch Fetch Route
 * POST /api/swapi/batch - Fetches multiple SWAPI URLs in parallel
 * Request body: { urls: string[] }
 */

const SWAPI_BASE = 'https://swapi.dev/api'

export async function POST(request) {
    try {
        const body = await request.json()
        const { urls } = body

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return Response.json(
                { error: 'urls array is required' },
                { status: 400 }
            )
        }

        // Limit batch size to prevent abuse
        if (urls.length > 50) {
            return Response.json(
                { error: 'Maximum 50 URLs allowed per batch request' },
                { status: 400 }
            )
        }

        // Validate all URLs are SWAPI URLs
        const isValidSwapiUrl = (url) => url.startsWith('https://swapi.dev/api/')
        if (!urls.every(isValidSwapiUrl)) {
            return Response.json(
                { error: 'All URLs must be valid SWAPI URLs' },
                { status: 400 }
            )
        }

        // Fetch all URLs in parallel
        const results = await Promise.all(
            urls.map(async (url) => {
                try {
                    const response = await fetch(url, {
                        next: {
                            revalidate: 86400, // 24 hour cache
                            tags: ['swapi', 'batch']
                        }
                    })

                    if (!response.ok) {
                        return { error: `Failed to fetch ${url}`, status: response.status }
                    }

                    return await response.json()
                } catch (error) {
                    console.error(`Batch fetch error for ${url}:`, error)
                    return { error: `Failed to fetch ${url}` }
                }
            })
        )

        return Response.json({ results })
    } catch (error) {
        console.error('SWAPI batch error:', error)
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
