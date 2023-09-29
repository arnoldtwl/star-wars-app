import Layout from "@/components/Layout";
import commonStyles from '@/pages/film/Common.module.css';

// The Species component for rendering a list of species in the browser
export default function Species({ species }) {
    return (
        <Layout>
            <div className={commonStyles.container}>
                <h1 className={commonStyles.title}>Species</h1>
                <ul className={commonStyles.list}>
                {/* Map over the species array to generate a list*/}
                {species.map(specie => (
                    <li key={specie.name} className={commonStyles.listItem}>
                    {specie.name}
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

// Fetch the film data and species for the film using Promise.all()
export async function getStaticProps({ params }) {
    const res = await fetch(`https://swapi.dev/api/films/${params.id}/`);
    const film = await res.json();

    // Fetch species for the film
    const speciesData = await Promise.all(
        film.species.map((specieUrl) =>
            fetch(specieUrl).then((res) => res.json())
        )
    );

    // Return the film data and species as props
    return {
        props: {
            species: speciesData,
        },
    };
}