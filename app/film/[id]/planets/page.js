import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, routes } from '@/app/lib/api'

export default async function PlanetsPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const planets = await getRelatedData(film.planets)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Planets in {film.title}</h1>
      <div className={styles.grid}>
        {planets.map((planet) => (
          <div key={planet.name} className={styles.card}>
            <div className={styles.info}>
              <h2 className={styles.name}>{planet.name}</h2>
              <p className={styles.detail}>
                <span className={styles.label}>Climate:</span>
                <span className={styles.value}>{planet.climate}</span>
              </p>
              <p className={styles.detail}>
                <span className={styles.label}>Population:</span>
                <span className={styles.value}>
                  {planet.population === 'unknown' 
                    ? 'Unknown' 
                    : parseInt(planet.population).toLocaleString()}
                </span>
              </p>
              <p className={styles.detail}>
                <span className={styles.label}>Terrain:</span>
                <span className={styles.value}>{planet.terrain}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link href={routes.film(id)} prefetch={true} className={styles.backLink}>
        Back to Film
      </Link>
    </div>
  )
}
