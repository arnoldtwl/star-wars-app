/**
 * Film poster image mappings
 * Maps SWAPI episode_id to local poster image paths
 */

export const FILM_POSTERS = {
    1: 'https://u4zfdnwvyzqbdrlm.public.blob.vercel-storage.com/films/episode-1.jpeg',
    2: 'https://u4zfdnwvyzqbdrlm.public.blob.vercel-storage.com/films/episode-2.jpeg',
    3: 'https://u4zfdnwvyzqbdrlm.public.blob.vercel-storage.com/films/episode-3.jpeg',
    4: 'https://u4zfdnwvyzqbdrlm.public.blob.vercel-storage.com/films/episode-4.jpeg',
    5: 'https://u4zfdnwvyzqbdrlm.public.blob.vercel-storage.com/films/episode-5.jpeg',
    6: 'https://u4zfdnwvyzqbdrlm.public.blob.vercel-storage.com/films/episode-6.jpeg',
}

/**
 * Get poster path for a film by episode ID
 * @param {number|string} episodeId - The episode ID
 * @returns {string|null} - Path to poster image or null if not found
 */
export function getFilmPoster(episodeId) {
    const id = typeof episodeId === 'string' ? parseInt(episodeId, 10) : episodeId
    return FILM_POSTERS[id] || null
}
