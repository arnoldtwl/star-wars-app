import styles from '../[id].module.css';
import Layout from '@/components/Layout';
import Link from 'next/link';

// The Film function is the default component exported from this module.
// It takes a 'film' object as a prop, containing details about a specific Star Wars film
export default function Film({ film }) {
  return (
    // Use the Layout component to wrap the content of the page.
    <Layout>
        <div className={styles.container}>
          {/* Display the film's episode number and title */}
          <h1 >Episode {film.episode_id}: {film.title}</h1>
          {/* Display additional details about the film */}
          <p><strong>Director:</strong> {film.director}</p>
          <p><strong>Producer:</strong> {film.producer}</p>
          <p><strong>Release Date:</strong> {film.release_date}</p>
          <p>{film.opening_crawl}</p>
          <div className={styles.links}>
            <div>
              <Link href={`/film/${film.episode_id}/characters`} className={styles.linkItem}>Characters</Link>
            </div>
            {/* Navigation links to various details about the film */}
            <div>
              <Link href={`/film/${film.episode_id}/planets`} className={styles.linkItem}>Planets</Link>
            </div>
            <div>
              <Link href={`/film/${film.episode_id}/starships`} className={styles.linkItem}>Starships</Link>
            </div>
            <div>
              <Link href={`/film/${film.episode_id}/vehicles`} className={styles.linkItem}>Vehicles</Link>
            </div>
            <div>
              <Link href={`/film/${film.episode_id}/species`} className={styles.linkItem}>Species</Link>
            </div>
          </div>
        </div>
    </Layout>
  );
}

// getStaticPaths is a Next.js function that generates the paths for static generation.
// In this case, it fetches the episode IDs for all Star Wars films from the SWAPI.
export async function getStaticPaths() {
  const res = await fetch('https://swapi.dev/api/films/');
  const data = await res.json();
  const paths = data.results.map(film => ({ params: { id: film.episode_id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}

// getStaticProps is a Next.js function that fetches data for static generation at build time.
// In this case, it fetches details about a specific Star Wars film based on the episode ID.
export async function getStaticProps({ params }) {
  const res = await fetch(`https://swapi.dev/api/films/${params.id}/`);
  const film = await res.json();

  // Return the film data as a prop to the Film component
  return {
    props: {
      film,
    },
  };
}
