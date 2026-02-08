import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, routes } from '@/app/lib/swapi'
import ClickableCard from '@/app/components/ClickableCard'

export default async function StarshipsPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const starships = await getRelatedData(film.starships)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Starships in {film.title}</h1>
      <div className={styles.grid}>
        {starships.map((starship) => (
          <ClickableCard
            key={starship.name}
            itemName={starship.name}
            itemType="starships"
            modalContent={
              <div className={styles.info}>
                <p className={styles.detail}>
                  <span className={styles.label}>Model:</span>
                  <span className={styles.value}>
                    {starship.model === 'unknown' ? 'Unknown' : starship.model}
                  </span>
                </p>
                <p className={styles.detail}>
                  <span className={styles.label}>Manufacturer:</span>
                  <span className={styles.value}>
                    {starship.manufacturer === 'unknown' ? 'Unknown' : starship.manufacturer}
                  </span>
                </p>
                <p className={styles.detail}>
                  <span className={styles.label}>Class:</span>
                  <span className={styles.value}>
                    {starship.starship_class === 'unknown' ? 'Unknown' : starship.starship_class}
                  </span>
                </p>
                {starship.crew !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Crew:</span>
                    <span className={styles.value}>{starship.crew}</span>
                  </p>
                )}
                {starship.passengers !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Passengers:</span>
                    <span className={styles.value}>{starship.passengers}</span>
                  </p>
                )}
                {starship.cargo_capacity !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Cargo Capacity:</span>
                    <span className={styles.value}>{starship.cargo_capacity} kg</span>
                  </p>
                )}
              </div>
            }
          >
            <div className={styles.info}>
              <h2 className={styles.name}>{starship.name}</h2>
              <p className={styles.detail}>
                <span className={styles.label}>Model:</span>
                <span className={styles.value}>
                  {starship.model === 'unknown' ? 'Unknown' : starship.model}
                </span>
              </p>
              <p className={styles.detail}>
                <span className={styles.label}>Class:</span>
                <span className={styles.value}>
                  {starship.starship_class === 'unknown' ? 'Unknown' : starship.starship_class}
                </span>
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
