/**
 * Star Wars Databank API client utilities
 * Provides on-demand enrichment data from the Star Wars Databank
 */

// Mapping from SWAPI resource types to Databank endpoints
export const SWAPI_TO_DATABANK = {
    people: 'characters',
    planets: 'locations',
    species: 'species',
    starships: 'vehicles', // Best-effort: Databank has no starships, try vehicles
    vehicles: 'vehicles',
}

// Client-side cache for enrichment data
const enrichmentCache = new Map()
const inFlightRequests = new Map()

/**
 * Normalize a name for consistent caching and URL encoding
 * @param {string} name - The name to normalize
 * @returns {string} - Normalized name
 */
export function normalizeName(name) {
    if (!name) return ''
    return name
        .trim()
        .replace(/\s+/g, ' ') // Collapse multiple spaces
        .toLowerCase()
}

/**
 * Get cache key for enrichment data
 * @param {string} type - SWAPI resource type
 * @param {string} name - Item name
 * @returns {string} - Cache key
 */
function getCacheKey(type, name) {
    return `${type}:${normalizeName(name)}`
}

/**
 * Fetch enrichment data for a specific item
 * @param {string} swapiType - SWAPI resource type (people, planets, species, starships, vehicles)
 * @param {string} name - Item name to look up
 * @param {AbortSignal} [signal] - Optional AbortController signal for cancellation
 * @returns {Promise<{description: string|null, image: string|null}>}
 */
export async function fetchEnrichment(swapiType, name, signal) {
    const databankType = SWAPI_TO_DATABANK[swapiType]
    if (!databankType) {
        console.warn(`Unknown SWAPI type: ${swapiType}`)
        return { description: null, image: null }
    }

    const cacheKey = getCacheKey(swapiType, name)

    // Return cached result if available
    if (enrichmentCache.has(cacheKey)) {
        return enrichmentCache.get(cacheKey)
    }

    // Dedupe in-flight requests
    if (inFlightRequests.has(cacheKey)) {
        return inFlightRequests.get(cacheKey)
    }

    // Create the fetch promise
    const fetchPromise = (async () => {
        try {
            const encodedName = encodeURIComponent(name)
            const response = await fetch(`/api/databank/${databankType}/name/${encodedName}`, {
                signal,
            })

            if (!response.ok) {
                if (response.status === 502) {
                    console.warn(`Databank API error for ${name}`)
                }
                return { description: null, image: null }
            }

            const data = await response.json()
            const result = {
                description: data.description || null,
                image: data.image || null,
            }

            // Cache the result
            enrichmentCache.set(cacheKey, result)
            return result
        } catch (error) {
            if (error.name === 'AbortError') {
                // Request was cancelled, don't cache
                throw error
            }
            console.error(`Error fetching enrichment for ${name}:`, error)
            return { description: null, image: null }
        } finally {
            // Remove from in-flight requests
            inFlightRequests.delete(cacheKey)
        }
    })()

    // Track in-flight request
    inFlightRequests.set(cacheKey, fetchPromise)

    return fetchPromise
}

/**
 * Clear the enrichment cache (useful for testing)
 */
export function clearEnrichmentCache() {
    enrichmentCache.clear()
    inFlightRequests.clear()
}
