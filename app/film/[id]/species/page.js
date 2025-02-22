import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, routes } from '@/app/lib/api'

export default async function SpeciesPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const species = await getRelatedData(film.species)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Species in {film.title}</h1>
      <div className={styles.grid}>
        {species.map((specie) => (
          <div key={specie.name} className={styles.card}>
            <div className={styles.info}>
              <h2 className={styles.name}>{specie.name}</h2>
              <p className={styles.detail}>Classification: {specie.classification === 'unknown' ? 'Unknown' : specie.classification}</p>
              <p className={styles.detail}>Language: {specie.language === 'unknown' ? 'Unknown' : specie.language}</p>
              {specie.average_height !== 'unknown' && (
                <p className={styles.detail}>Average Height: {specie.average_height}cm</p>
              )}
              {specie.average_lifespan !== 'unknown' && (
                <p className={styles.detail}>Average Lifespan: {specie.average_lifespan} years</p>
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
