import Layout from "@/components/Layout";
import commonStyles from '@/pages/film/Common.module.css';

// The Starships component for rendering a list of starships in the browser
export default function Starships({ starships }) {
    return (
        <Layout>
            <div className={commonStyles.container}>
                <h1 className={commonStyles.title}>Starships</h1>
                <ul className={commonStyles.list}>
                {/* Map over the starships array to generate a list*/}
                {starships.map(starship => (
                    <li key={starship.name} className={commonStyles.listItem}>
                    {starship.name}
                    </li>
                ))}
                </ul>
            </div>
        </Layout>
    );
}

// Fetch the episode ID from the URL
export async function getStaticPaths() {
    const res = await fetch("https://swapi.dev/api/films/");
    const data = await res.json();
    const paths = data.results.map((film) => ({
        params: { id: film.episode_id.toString() },
    }));

    // Return the paths, fallback is set to false so any paths not returned by getStaticPaths will result in a 404 page.
    return {
        paths,
        fallback: false,
    };
}

// Fetch the film data and starships for the film using Promise.all()
export async function getStaticProps({ params }) {
    const res = await fetch(`https://swapi.dev/api/films/${params.id}/`);
    const film = await res.json();

    // Fetch starships for the film
    const starshipsData = await Promise.all(
        film.starships.map((starshipUrl) =>
            fetch(starshipUrl).then((res) => res.json())
        )
    );

    // Return the film data and starships as props
    return {
        props: {
            starships: starshipsData,
        },
    };
}