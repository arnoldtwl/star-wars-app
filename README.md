# Star Wars Information App

A Next.js application that displays information about Star Wars films and related data using the SWAPI (Star Wars API).

## 🚀 Features

- **Film Directory**: View Star Wars films (Episodes 1-6) with original release details.
  > **Note**: Currently supports Episodes 1-6 only, as SWAPI does not contain data for the sequel trilogy.
- **Deep Dive**: Explore characters, planets, starships, vehicles, and species for each film.
- **Cloud Storage**: Film posters hosted on [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) for optimal performance.
- **Modern Tech**: Built with Next.js 16 (App Router) and React 19.
- **Responsive UI**: Star Wars themed interface with responsive design.

## 📦 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: CSS Modules
- **Data Source**: [SWAPI](https://swapi.dev/) (Star Wars API)
- **Enrichment Data**: [Star Wars Databank](https://starwars-databank-server.vercel.app/) (Descriptions & Images)
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (for asset storage)

## 🛠️ Project Structure

```
star-wars-app/
├── app/                    # App Router directory
│   ├── api/               # API routes (SWAPI proxy)
│   ├── film/             # Film details routes
│   ├── lib/               # Utilities (API clients, image helpers)
│   └── page.js           # Home page
├── public/               # Static assets
└── scripts/              # Utility scripts (e.g., image upload)
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account (for Blob storage)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env.local` file in the root directory and add your Vercel Blob token:
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## 📝 API Documentation

### GET `/api/swapi/films`

Returns a list of all Star Wars films, sorted by episode ID. Includes a hosted `posterUrl` for each film.

**Response:**
```json
{
  "results": [
    {
      "title": "A New Hope",
      "episode_id": 4,
      ...
      "posterUrl": "https://.../episode-4.jpeg"
    },
    ...
  ]
}
```

### GET `/api/databank/[type]/name/[name]`

Proxy endpoint that fetches enrichment data (description and image) from the Star Wars Databank API.

- **type**: `characters`, `locations`, `species`, `vehicles`
- **name**: Name of the entity (e.g., "Luke Skywalker")

**Response:**
```json
{
  "description": "Luke Skywalker was a Tatooine farmboy...",
  "image": "https://.../luke.jpg",
  "name": "Luke Skywalker"
}
```

## 📜 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `node scripts/uploadFilmImages.js`: Upload local film images to Vercel Blob (one-time setup)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
