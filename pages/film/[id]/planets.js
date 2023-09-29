import Layout from '@/components/Layout';
import commonStyles from '@/pages/film/Common.module.css';

// The Planets component for rendering a list of planets in the browser
export default function Planets({ planets }) {
  return (
    <Layout>
      <div className={commonStyles.container}>
        <h1 className={commonStyles.title}>Planets</h1>
        <ul className={commonStyles.list}>
        {/* Map over the planets array to generate a list 
           planets for each film */}
          {planets.map(planet => (
            <li key={planet.name} className={commonStyles.listItem}>
              {planet.name}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

// Fetch the episode ID from the URL
export async function getStaticPaths() {
  const res = await fetch('https://swapi.dev/api/films/');
  const data = await res.json();
  const paths = data.results.map(film => ({ params: { id: film.episode_id.toString() } }));

  // Return the paths, fallback is set to false so any paths not returned by getStaticPaths will result in a 404 page.
  return {
    paths,
    fallback: false,
  };
}

// Fetch the film data and planets for the film using Promise.all()
export async function getStaticProps({ params }) {
  const res = await fetch(`https://swapi.dev/api/films/${params.id}/`);
  const film = await res.json();

  // Fetch planets for the film
  const planetsData = await Promise.all(
    film.planets.map(planetUrl => fetch(planetUrl).then(res => res.json()))
  );

  // Return the film data and planets as props
  return {
    props: {
      planets: planetsData,
    },
  };
}
