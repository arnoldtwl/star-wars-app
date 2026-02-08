// Routes object for consistent URL handling
export const routes = {
  home: '/',
  film: (id) => `/film/${id}`,
  filmCharacters: (id) => `/film/${id}/characters`,
  filmPlanets: (id) => `/film/${id}/planets`,
  filmSpecies: (id) => `/film/${id}/species`,
  filmStarships: (id) => `/film/${id}/starships`,
  filmVehicles: (id) => `/film/${id}/vehicles`,
}

/**
 * Get the base URL for API calls
 * In server components, we need the full URL
 */
function getBaseUrl() {
  // Check if we're on the server
  if (typeof window === 'undefined') {
    // Server-side: use environment variable or localhost
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }
  // Client-side: use relative URLs
  return ''
}

async function fetchFromApi(endpoint, options = {}) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}${endpoint}`

  try {
    const res = await fetch(url, {
      next: {
        revalidate: 86400, // Cache for 24 hours
        tags: ['swapi']
      },
      ...options
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.error || `Failed to fetch data: ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error) {
    console.error(`API Error fetching ${endpoint}:`, error)
    throw new Error(error.message || 'Failed to fetch data')
  }
}

export async function getFilms() {
  try {
    return await fetchFromApi('/api/swapi/films')
  } catch (error) {
    console.error('Error fetching films:', error)
    throw new Error('Failed to load Star Wars films')
  }
}

export async function getFilm(id) {
  try {
    return await fetchFromApi(`/api/swapi/films/${id}`)
  } catch (error) {
    console.error(`Error fetching film ${id}:`, error)
    throw new Error(`Failed to load Star Wars film Episode ${id}`)
  }
}

export async function getHumanSpecies() {
  try {
    return await fetchFromApi('/api/swapi/species/1')
  } catch (error) {
    console.error('Error fetching human species:', error)
    throw new Error('Failed to load human species data')
  }
}

export async function getPlanet(id) {
  try {
    return await fetchFromApi(`/api/swapi/planets/${id}`)
  } catch (error) {
    console.error(`Error fetching planet ${id}:`, error)
    throw new Error('Failed to load planet data')
  }
}

export async function getSpecies(id) {
  try {
    return await fetchFromApi(`/api/swapi/species/${id}`)
  } catch (error) {
    console.error(`Error fetching species ${id}:`, error)
    throw new Error('Failed to load species data')
  }
}

export async function getStarship(id) {
  try {
    return await fetchFromApi(`/api/swapi/starships/${id}`)
  } catch (error) {
    console.error(`Error fetching starship ${id}:`, error)
    throw new Error('Failed to load starship data')
  }
}

export async function getVehicle(id) {
  try {
    return await fetchFromApi(`/api/swapi/vehicles/${id}`)
  } catch (error) {
    console.error(`Error fetching vehicle ${id}:`, error)
    throw new Error('Failed to load vehicle data')
  }
}

export async function getRelatedData(urls) {
  if (!urls || urls.length === 0) {
    return []
  }

  try {
    const baseUrl = getBaseUrl()
    const res = await fetch(`${baseUrl}/api/swapi/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ urls }),
      next: {
        revalidate: 86400,
        tags: ['swapi', 'batch']
      }
    })

    if (!res.ok) {
      throw new Error('Failed to fetch related data')
    }

    const data = await res.json()
    return data.results
  } catch (error) {
    console.error('Error fetching related data:', error)
    throw new Error('Failed to load related Star Wars data')
  }
}

export async function getFilmIds() {
  try {
    const { results } = await getFilms()
    return results.map((film) => ({
      id: film.episode_id.toString(),
    }))
  } catch (error) {
    console.error('Error fetching film IDs:', error)
    throw new Error('Failed to load film IDs')
  }
}

// Error handling utility
export function handleApiError(error) {
  console.error('API Error:', error)
  throw new Error(error.message || 'An error occurred while fetching data')
}

