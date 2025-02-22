# Star Wars Information App

A Next.js application that displays information about Star Wars films and related data using the SWAPI (Star Wars API).

## 🚀 Features

- View all Star Wars films
- Detailed information for each film
- Related data for characters, planets, starships, vehicles, and species
- Server-side rendering for optimal performance
- Responsive design with Star Wars themed UI
- Error handling and loading states

## 📦 Tech Stack

- Next.js 15 (App Router)
- React
- CSS Modules
- SWAPI (Star Wars API)

## 🛠️ Project Structure

```
star-wars-app/
├── app/                    # App Router directory
│   ├── lib/               # Utilities and API functions
│   ├── film/             # Film-related routes
│   │   └── [id]/         # Dynamic film routes
│   ├── layout.js         # Root layout
│   ├── page.js           # Home page
│   └── not-found.js      # 404 page
└── public/               # Static assets
```

## 🚦 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## 🌟 Key Features

- Server Components for improved performance
- Streaming and Suspense for better loading states
- Incremental Static Regeneration (ISR) for data caching
- Error boundaries for robust error handling
- Responsive and accessible design

## 📝 API Documentation

The app uses SWAPI (Star Wars API) for data. Main endpoints:

- `/films` - List all films
- `/films/{id}` - Get specific film
- Related endpoints for characters, planets, etc.

Data is cached using Next.js 15's built-in caching mechanisms.

## 🎨 Styling

- CSS Modules for component-scoped styling
- Star Wars themed design
- Responsive layouts
- Loading animations

## ⚡ Performance

- Server-side rendering
- Automatic image optimization
- Route prefetching
- API response caching

## 🔧 Error Handling

- Global error boundary
- Per-route error handling
- Fallback UI components
- Detailed error logging

## 📱 Accessibility

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Color contrast compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
