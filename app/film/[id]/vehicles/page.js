import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, routes } from '@/app/lib/api'

export default async function VehiclesPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const vehicles = await getRelatedData(film.vehicles)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vehicles in {film.title}</h1>
      <div className={styles.grid}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.name} className={styles.card}>
            <div className={styles.info}>
              <h2 className={styles.name}>{vehicle.name}</h2>
              <p className={styles.detail}>Model: {vehicle.model === 'unknown' ? 'Unknown' : vehicle.model}</p>
              <p className={styles.detail}>Class: {vehicle.vehicle_class === 'unknown' ? 'Unknown' : vehicle.vehicle_class}</p>
              {vehicle.crew !== 'unknown' && (
                <p className={styles.detail}>Crew: {vehicle.crew}</p>
              )}
              {vehicle.passengers !== 'unknown' && (
                <p className={styles.detail}>Passengers: {vehicle.passengers}</p>
              )}
              {vehicle.cargo_capacity !== 'unknown' && (
                <p className={styles.detail}>Cargo Capacity: {vehicle.cargo_capacity} kg</p>
              )}
              {vehicle.max_atmosphering_speed !== 'unknown' && (
                <p className={styles.detail}>Max Speed: {vehicle.max_atmosphering_speed} km/h</p>
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
