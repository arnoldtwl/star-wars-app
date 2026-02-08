import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, routes } from '@/app/lib/swapi'
import ClickableCard from '@/app/components/ClickableCard'

export default async function SpeciesPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const species = await getRelatedData(film.species)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Species in {film.title}</h1>
      <div className={styles.grid}>
        {species.map((specie) => (
          <ClickableCard
            key={specie.name}
            itemName={specie.name}
            itemType="species"
            modalContent={
              <div className={styles.info}>
                <p className={styles.detail}>
                  <span className={styles.label}>Classification:</span>
                  <span className={styles.value}>{specie.classification}</span>
                </p>
                <p className={styles.detail}>
                  <span className={styles.label}>Designation:</span>
                  <span className={styles.value}>{specie.designation}</span>
                </p>
                <p className={styles.detail}>
                  <span className={styles.label}>Language:</span>
                  <span className={styles.value}>{specie.language}</span>
                </p>
                {specie.average_height !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Average Height:</span>
                    <span className={styles.value}>{specie.average_height}cm</span>
                  </p>
                )}
                {specie.average_lifespan !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Average Lifespan:</span>
                    <span className={styles.value}>{specie.average_lifespan} years</span>
                  </p>
                )}
              </div>
            }
          >
            <div className={styles.info}>
              <h2 className={styles.name}>{specie.name}</h2>
              <p className={styles.detail}>
                <span className={styles.label}>Classification:</span>
                <span className={styles.value}>{specie.classification}</span>
              </p>
              <p className={styles.detail}>
                <span className={styles.label}>Language:</span>
                <span className={styles.value}>{specie.language}</span>
              </p>
            </div>
          </ClickableCard>
        ))}
      </div>
      <Link href={routes.film(id)} prefetch={true} className={styles.backLink}>
        Back to Film
      </Link>
    </div>
  )
}
