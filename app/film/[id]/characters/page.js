import Link from 'next/link'
import styles from '@/app/styles/shared.module.css'
import { getFilm, getRelatedData, getHumanSpecies, routes } from '@/app/lib/api'

export default async function CharactersPage({ params }) {
  const { id } = await params
  const film = await getFilm(id)
  const characters = await getRelatedData(film.characters)
  
  // Get species data and additional info for each character
  const charactersWithDetails = await Promise.all(
    characters.map(async (character) => {
      // Get species name
      let speciesName = 'Unknown'
      if (character.species && character.species.length > 0) {
        const speciesData = await getRelatedData(character.species)
        speciesName = speciesData[0].name
      } else {
        const humanSpecies = await getHumanSpecies()
        speciesName = humanSpecies.name
      }

      // Get homeworld name
      let homeworldName = 'Unknown'
      if (character.homeworld) {
        const homeworldData = await getRelatedData([character.homeworld])
        homeworldName = homeworldData[0].name
      }

      // Get starships
      let starships = []
      if (character.starships && character.starships.length > 0) {
        const starshipData = await getRelatedData(character.starships)
        starships = starshipData.map(ship => ship.name)
      }

      // Get vehicles
      let vehicles = []
      if (character.vehicles && character.vehicles.length > 0) {
        const vehicleData = await getRelatedData(character.vehicles)
        vehicles = vehicleData.map(vehicle => vehicle.name)
      }

      return {
        ...character,
        speciesName,
        homeworldName,
        starships,
        vehicles
      }
    })
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Characters in {film.title}</h1>
      <div className={styles.grid}>
        {charactersWithDetails.map((character) => (
          <div key={character.name} className={styles.card}>
            <div className={styles.info}>
              <h2 className={styles.name}>{character.name}</h2>
              <p className={styles.detail}>Species: {character.speciesName}</p>
              <p className={styles.detail}>Homeworld: {character.homeworldName}</p>
              <p className={styles.detail}>Born: {character.birth_year === 'unknown' ? 'Unknown' : character.birth_year}</p>
              <p className={styles.detail}>Gender: {character.gender === 'n/a' ? 'Unknown' : character.gender}</p>
              {character.height !== 'unknown' && (
                <p className={styles.detail}>Height: {character.height}cm</p>
              )}
              {character.starships.length > 0 && (
                <p className={styles.detail}>
                  Starships: {character.starships.join(', ')}
                </p>
              )}
              {character.vehicles.length > 0 && (
                <p className={styles.detail}>
                  Vehicles: {character.vehicles.join(', ')}
                </p>
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
