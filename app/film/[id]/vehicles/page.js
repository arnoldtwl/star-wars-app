import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, routes } from '@/app/lib/swapi'
import ClickableCard from '@/app/components/ClickableCard'

export default async function VehiclesPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const vehicles = await getRelatedData(film.vehicles)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vehicles in {film.title}</h1>
      <div className={styles.grid}>
        {vehicles.map((vehicle) => (
          <ClickableCard
            key={vehicle.name}
            itemName={vehicle.name}
            itemType="vehicles"
            modalContent={
              <div className={styles.info}>
                <p className={styles.detail}>
                  <span className={styles.label}>Model:</span>
                  <span className={styles.value}>
                    {vehicle.model === 'unknown' ? 'Unknown' : vehicle.model}
                  </span>
                </p>
                <p className={styles.detail}>
                  <span className={styles.label}>Manufacturer:</span>
                  <span className={styles.value}>
                    {vehicle.manufacturer === 'unknown' ? 'Unknown' : vehicle.manufacturer}
                  </span>
                </p>
                <p className={styles.detail}>
                  <span className={styles.label}>Class:</span>
                  <span className={styles.value}>
                    {vehicle.vehicle_class === 'unknown' ? 'Unknown' : vehicle.vehicle_class}
                  </span>
                </p>
                {vehicle.crew !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Crew:</span>
                    <span className={styles.value}>{vehicle.crew}</span>
                  </p>
                )}
                {vehicle.passengers !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Passengers:</span>
                    <span className={styles.value}>{vehicle.passengers}</span>
                  </p>
                )}
                {vehicle.cargo_capacity !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Cargo Capacity:</span>
                    <span className={styles.value}>{vehicle.cargo_capacity} kg</span>
                  </p>
                )}
                {vehicle.max_atmosphering_speed !== 'unknown' && (
                  <p className={styles.detail}>
                    <span className={styles.label}>Max Speed:</span>
                    <span className={styles.value}>{vehicle.max_atmosphering_speed} km/h</span>
                  </p>
                )}
              </div>
            }
          >
            <div className={styles.info}>
              <h2 className={styles.name}>{vehicle.name}</h2>
              <p className={styles.detail}>
                <span className={styles.label}>Model:</span>
                <span className={styles.value}>
                  {vehicle.model === 'unknown' ? 'Unknown' : vehicle.model}
                </span>
              </p>
              <p className={styles.detail}>
                <span className={styles.label}>Class:</span>
                <span className={styles.value}>
                  {vehicle.vehicle_class === 'unknown' ? 'Unknown' : vehicle.vehicle_class}
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
