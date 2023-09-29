// Import required modules and components
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from './index.module.css'; // Importing module CSS for styling

// The Home function is the default component exported from this module.
// It takes 'films' as a prop, which contains an array of Star Wars films.
export default function Home({ films }) {
  return (
    // Use the Layout component to wrap the content of the page.
    <Layout>
      {/* Use a div with a 'container' class for general styling */}
      <div className={styles.container}>
        {/* Display the title of the page */}
        <h1 className={styles.title}>Star Wars Films</h1>
        
        {/* Create an unordered list to display the films */}
        <ul className={styles.links}>
          {/* Map over the films array to generate a list item for each film */}
          {films.map(film => (
            <li key={film.episode_id}>
              {/* Use the Link component to generate navigable URLs for each film */}
              <Link href={`/film/${film.episode_id}`} className={styles.filmList}>
                Episode {film.episode_id}: {film.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

// getStaticProps is a Next.js function that fetches data at build time.
// In this case, it fetches a list of Star Wars films from the SWAPI.
export async function getStaticProps() {
  // Fetch the films data from the Star Wars API
  const res = await fetch('https://swapi.dev/api/films/');
  const data = await res.json();

  // Return the films data as a prop to the Home component
  return {
    props: {
      films: data.results,
    },
  };
}
