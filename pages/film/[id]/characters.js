import Layout from '@/components/Layout';
import commonStyles from '@/pages/film/Common.module.css';


// The Characters component for rendering a list of characters in the browser
export default function Characters({ characters }) {
  return (
    <Layout>
      <div className={commonStyles.container}>
        <h1 className={commonStyles.title}>Characters</h1>
        <ul className={commonStyles.list}>
          {/* Map over the characters array to generate a list*/}
          {characters.map(character => (
            <li key={character.name} className={commonStyles.listItem}>
              {character.name}
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

  return {
    paths,
    fallback: false,
  };
}


// Fetch the film data and characters for the film using Promise.all()
export async function getStaticProps({ params }) {
  const res = await fetch(`https://swapi.dev/api/films/${params.id}/`);
  const film = await res.json();

  // Fetch characters for the film using Promise.all()
  const charactersData = await Promise.all(
    film.characters.map(characterUrl => fetch(characterUrl).then(res => res.json()))
  );

  // Return the film data and characters as props
  return {
    props: {
      characters: charactersData,
    },
  };
}
