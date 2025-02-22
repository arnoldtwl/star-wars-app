import Link from 'next/link'
import styles from './page.module.css'
import { getFilms } from './lib/api'

export default async function Home() {
  const { results: films } = await getFilms()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Star Wars Films</h1>
      <ul className={styles.links}>
        {films.map(film => (
          <li key={film.episode_id}>
            <Link href={`/film/${film.episode_id}`} className={styles.filmList}>
              Episode {film.episode_id}: {film.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
