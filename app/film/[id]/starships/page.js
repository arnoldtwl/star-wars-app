import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, routes } from '@/app/lib/api'

export default async function StarshipsPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const starships = await getRelatedData(film.starships)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Starships in {film.title}</h1>
      <div className={styles.grid}>
        {starships.map((starship) => (
          <div key={starship.name} className={styles.card}>
            <div className={styles.info}>
              <h2 className={styles.name}>{starship.name}</h2>
              <p className={styles.detail}>Model: {starship.model === 'unknown' ? 'Unknown' : starship.model}</p>
              <p className={styles.detail}>Class: {starship.starship_class === 'unknown' ? 'Unknown' : starship.starship_class}</p>
              {starship.crew !== 'unknown' && (
                <p className={styles.detail}>Crew: {starship.crew}</p>
              )}
              {starship.passengers !== 'unknown' && (
                <p className={styles.detail}>Passengers: {starship.passengers}</p>
              )}
              {starship.cargo_capacity !== 'unknown' && (
                <p className={styles.detail}>Cargo Capacity: {starship.cargo_capacity} kg</p>
              )}
            </div>
          </div>
        ))}
      </div>
        <Link href={routes.film(id)} prefetch={true} 
        className={styles.backLink}>
          Back to Film
        </Link>
    </div>
  )
}
