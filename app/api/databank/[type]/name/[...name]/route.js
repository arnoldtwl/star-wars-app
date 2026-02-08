/**
 * API Route: Proxy for Star Wars Databank API
 * Fetches enrichment data (description + image) for Star Wars entities
 * 
 * Route: /api/databank/[type]/name/[...name]
 * Example: /api/databank/characters/name/Luke%20Skywalker
 */

const DATABANK_BASE_URL = 'https://starwars-databank-server.vercel.app/api/v1'
const VALID_TYPES = ['characters', 'locations', 'species', 'vehicles']

/**
 * Choose the best match from Databank results
 * Prefers exact case-insensitive match, falls back to first result
 */
function chooseBestMatch(results, targetName) {
    if (!results || results.length === 0) {
        return null
    }

    const normalizedTarget = targetName.toLowerCase().trim()

    // Try exact match first
    const exactMatch = results.find(
        (item) => item.name?.toLowerCase().trim() === normalizedTarget
    )
    if (exactMatch) {
        return exactMatch
    }

    // Try partial match (target name contained in result name)
    const partialMatch = results.find(
        (item) => item.name?.toLowerCase().includes(normalizedTarget)
    )
    if (partialMatch) {
        return partialMatch
    }

    // Fall back to first result
    return results[0]
}

export async function GET(request, { params }) {
    try {
        const { type, name: nameParts } = await params

        // Validate type
        if (!VALID_TYPES.includes(type)) {
            return Response.json(
                { error: `Invalid type. Must be one of: ${VALID_TYPES.join(', ')}` },
                { status: 400 }
            )
        }

        // Reconstruct name from path parts (handles names with slashes)
        const name = nameParts.join('/')

        if (!name) {
            return Response.json(
                { error: 'Name parameter is required' },
                { status: 400 }
            )
        }

        // Build upstream URL
        const encodedName = encodeURIComponent(name)
        const upstreamUrl = `${DATABANK_BASE_URL}/${type}/name/${encodedName}`

        // Fetch from Databank with caching
        const response = await fetch(upstreamUrl, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        })

        if (!response.ok) {
            // If upstream returns 404, return empty result (not an error)
            if (response.status === 404) {
                return Response.json({ description: null, image: null })
            }

            console.error(`Databank API error: ${response.status} ${response.statusText}`)
            return Response.json(
                { error: 'Upstream API error' },
                { status: 502 }
            )
        }

        const data = await response.json()

        // Handle array response (search results)
        const results = Array.isArray(data) ? data : [data]
        const bestMatch = chooseBestMatch(results, name)

        if (!bestMatch) {
            return Response.json({ description: null, image: null })
        }

        // Return only the fields we need
        return Response.json({
            description: bestMatch.description || null,
            image: bestMatch.image || null,
            name: bestMatch.name || null,
        })
    } catch (error) {
        console.error('Databank proxy error:', error)
        return Response.json(
            { error: 'Internal server error' },
            { status: 502 }
        )
    }
}
