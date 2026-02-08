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

import { getFilmPoster } from './filmImages'

const SWAPI_BASE = 'https://swapi.dev/api'

/**
 * Shared fetch helper that hits SWAPI directly
 */
async function fetchFromSwapi(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${SWAPI_BASE}${endpoint}`

  const res = await fetch(url, {
    next: {
      revalidate: 86400, // Cache for 24 hours
      tags: ['swapi']
    },
    ...options
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch from SWAPI: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function getFilms() {
  try {
    const data = await fetchFromSwapi('/films/')

    // Enrich with posters and sort by episode_id
    const results = data.results
      .map(film => ({
        ...film,
        posterUrl: getFilmPoster(film.episode_id)
      }))
      .sort((a, b) => a.episode_id - b.episode_id)

    return { ...data, results }
  } catch (error) {
    console.error('Error fetching films:', error)
    throw new Error('Failed to load Star Wars films')
  }
}

export async function getFilm(id) {
  try {
    const film = await fetchFromSwapi(`/films/${id}/`)
    return {
      ...film,
      posterUrl: getFilmPoster(film.episode_id)
    }
  } catch (error) {
    console.error(`Error fetching film ${id}:`, error)
    throw new Error(`Failed to load Star Wars film Episode ${id}`)
  }
}

export async function getHumanSpecies() {
  return fetchFromSwapi('/species/1/')
}

export async function getPlanet(id) {
  return fetchFromSwapi(`/planets/${id}/`)
}

export async function getSpecies(id) {
  return fetchFromSwapi(`/species/${id}/`)
}

export async function getStarship(id) {
  return fetchFromSwapi(`/starships/${id}/`)
}

export async function getVehicle(id) {
  return fetchFromSwapi(`/vehicles/${id}/`)
}

export async function getRelatedData(urls) {
  if (!urls || urls.length === 0) {
    return []
  }

  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          return await fetchFromSwapi(url)
        } catch (error) {
          console.error(`Batch fetch error for ${url}:`, error)
          return { error: `Failed to fetch ${url}` }
        }
      })
    )
    return results
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
