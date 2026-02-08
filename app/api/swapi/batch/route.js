/**
 * SWAPI Batch Fetch Route
 * POST /api/swapi/batch - Fetches multiple SWAPI URLs in parallel
 * Request body: { urls: string[] }
 */

import { getRelatedData } from '../../../lib/swapi'

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

        const results = await getRelatedData(urls)
        return Response.json({ results })
    } catch (error) {
        console.error('SWAPI batch error:', error)
        return Response.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
