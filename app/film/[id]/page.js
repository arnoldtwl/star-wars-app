import Link from 'next/link'
import styles from './page.module.css'
import { getFilm, getFilmIds, routes } from '@/app/lib/swapi'

async function generateStaticParams() {
  return await getFilmIds()
}

export default async function FilmPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Episode {film.episode_id}: {film.title}</h1>
      <div className={styles.details}>
        <p><strong>Director:</strong> {film.director}</p>
        <p><strong>Producer:</strong> {film.producer}</p>
        <p><strong>Release Date:</strong> {film.release_date}</p>
        <p className={styles.crawl}>{film.opening_crawl}</p>
      </div>
      <div className={styles.links}>
        <Link href={routes.filmCharacters(film.episode_id)} className={styles.linkItem}>
          Characters
        </Link>
        <Link href={routes.filmPlanets(film.episode_id)} className={styles.linkItem}>
          Planets
        </Link>
        <Link href={routes.filmStarships(film.episode_id)} className={styles.linkItem}>
          Starships
        </Link>
        <Link href={routes.filmVehicles(film.episode_id)} className={styles.linkItem}>
          Vehicles
        </Link>
        <Link href={routes.filmSpecies(film.episode_id)} className={styles.linkItem}>
          Species
        </Link>
      </div>
      <Link href={routes.home} className={styles.backLink}>
        Back to Films
      </Link>
    </div>
  )
}
