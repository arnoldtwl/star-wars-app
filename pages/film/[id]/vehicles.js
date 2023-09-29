import Layout from "@/components/Layout";
import commonStyles from '@/pages/film/Common.module.css';

// The Vehicles component for rendering a list of vehicles in the browser
export default function Vehicles({ vehicles }) {
    return (
        <Layout>
            <div className={commonStyles.container}>
                <h1 className={commonStyles.title}>Vehicles</h1>
                <ul className={commonStyles.list}>
                {/* Map over the vehicles array to generate a list*/}
                {vehicles.map(vehicle => (
                    <li key={vehicle.name} className={commonStyles.listItem}>
                    {vehicle.name}
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

// Fetch the film data and vehicles for the film using Promise.all()
export async function getStaticProps({ params }) {
    const res = await fetch(`https://swapi.dev/api/films/${params.id}/`);
    const film = await res.json();

    // Fetch vehicles for the film
    const vehiclesData = await Promise.all(
        film.vehicles.map((vehicleUrl) =>
            fetch(vehicleUrl).then((res) => res.json())
        )
    );

    // Return the film data and vehicles as props
    return {
        props: {
            vehicles: vehiclesData,
        },
    };
}