import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'
import { getFilms, routes } from './lib/swapi'
import { getFilmPoster } from './lib/filmImages'

export default async function HomePage() {
  const { results: films } = await getFilms()

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to Star Wars Universe</h1>
        <p className={styles.heroSubtitle}>Explore the epic saga through its legendary films</p>
      </section>

      <section className={styles.films}>
        <div className={styles.grid}>
          {films.map((film) => {
            const posterSrc = getFilmPoster(film.episode_id)
            return (
              <div key={film.episode_id} className={styles.card}>
                {posterSrc && (
                  <div className={styles.posterContainer}>
                    <Image
                      src={posterSrc}
                      alt={`Poster for ${film.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.poster}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <div className={styles.episodeNumber}>Episode {film.episode_id}</div>
                  <h2 className={styles.filmTitle}>{film.title}</h2>
                  <div className={styles.filmMeta}>
                    <p className={styles.releaseDate}>Released: {new Date(film.release_date).getFullYear()}</p>
                    <p className={styles.director}>Director: {film.director}</p>
                    <p className={styles.producer}>Producer: {film.producer}</p>
                  </div>
                  <p className={styles.openingCrawl}>
                    {film.opening_crawl.split('.')[0]}...
                  </p>
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Characters</span>
                      <span className={styles.statValue}>{film.characters.length}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Planets</span>
                      <span className={styles.statValue}>{film.planets.length}</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Vehicles</span>
                      <span className={styles.statValue}>{film.vehicles.length}</span>
                    </div>
                  </div>
                  <Link href={routes.film(film.episode_id)} className={styles.viewDetails}>
                    View Details
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
