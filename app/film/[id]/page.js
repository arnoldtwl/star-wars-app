import Link from 'next/link'
import styles from './page.module.css'
import { getFilm } from '@/app/lib/api'

async function generateStaticParams() {
  const res = await fetch('https://swapi.dev/api/films/')
  const data = await res.json()
  
  return data.results.map((film) => ({
    id: film.episode_id.toString(),
  }))
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
        <Link href={`/film/${film.episode_id}/characters`} className={styles.linkItem}>
          Characters
        </Link>
        <Link href={`/film/${film.episode_id}/planets`} className={styles.linkItem}>
          Planets
        </Link>
        <Link href={`/film/${film.episode_id}/starships`} className={styles.linkItem}>
          Starships
        </Link>
        <Link href={`/film/${film.episode_id}/vehicles`} className={styles.linkItem}>
          Vehicles
        </Link>
        <Link href={`/film/${film.episode_id}/species`} className={styles.linkItem}>
          Species
        </Link>
      </div>
      <Link href="/" className={styles.backLink}>
        Back to Films
      </Link>
    </div>
  )
}
