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
              <p className={styles.detail}>Climate: {planet.climate === 'unknown' ? 'Unknown' : planet.climate}</p>
              <p className={styles.detail}>Terrain: {planet.terrain === 'unknown' ? 'Unknown' : planet.terrain}</p>
              <p className={styles.detail}>Population: {planet.population === 'unknown' ? 'Unknown' : planet.population}</p>
              {planet.diameter !== 'unknown' && (
                <p className={styles.detail}>Diameter: {planet.diameter}km</p>
              )}
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
