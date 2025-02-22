const BASE_URL = 'https://swapi.dev/api'

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

export async function fetchWithCache(url, options = {}) {
  try {
    const res = await fetch(url, {
      next: { 
        revalidate: 86400, // Cache for 24 hours since Star Wars data rarely changes
        tags: ['swapi'] // Tag for cache invalidation if needed
      },
      ...options
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
    }

    return res.json()
  } catch (error) {
    console.error(`API Error fetching ${url}:`, error)
    throw new Error(error.message || 'Failed to fetch data')
  }
}

export async function getFilms() {
  try {
    const data = await fetchWithCache(`${BASE_URL}/films/`)
    return {
      results: data.results.sort((a, b) => a.episode_id - b.episode_id)
    }
  } catch (error) {
    console.error('Error fetching films:', error)
    throw new Error('Failed to load Star Wars films')
  }
}

export async function getFilm(id) {
  try {
    return await fetchWithCache(`${BASE_URL}/films/${id}/`)
  } catch (error) {
    console.error(`Error fetching film ${id}:`, error)
    throw new Error(`Failed to load Star Wars film Episode ${id}`)
  }
}

export async function getHumanSpecies() {
  try {
    return await fetchWithCache(`${BASE_URL}/species/1/`, {
      next: { 
        revalidate: 604800, // Cache for a week since this is static data
        tags: ['species', 'human']
      }
    })
  } catch (error) {
    console.error('Error fetching human species:', error)
    throw new Error('Failed to load human species data')
  }
}

export async function getPlanet(id) {
  try {
    return await fetchWithCache(`${BASE_URL}/planets/${id}/`)
  } catch (error) {
    console.error(`Error fetching planet ${id}:`, error)
    throw new Error(`Failed to load planet data`)
  }
}

export async function getSpecies(id) {
  try {
    return await fetchWithCache(`${BASE_URL}/species/${id}/`)
  } catch (error) {
    console.error(`Error fetching species ${id}:`, error)
    throw new Error(`Failed to load species data`)
  }
}

export async function getStarship(id) {
  try {
    return await fetchWithCache(`${BASE_URL}/starships/${id}/`)
  } catch (error) {
    console.error(`Error fetching starship ${id}:`, error)
    throw new Error(`Failed to load starship data`)
  }
}

export async function getVehicle(id) {
  try {
    return await fetchWithCache(`${BASE_URL}/vehicles/${id}/`)
  } catch (error) {
    console.error(`Error fetching vehicle ${id}:`, error)
    throw new Error(`Failed to load vehicle data`)
  }
}

export async function getRelatedData(urls) {
  try {
    return await Promise.all(
      urls.map(url => fetchWithCache(url))
    )
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
