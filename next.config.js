/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starwars-visualguide.com',
        pathname: '/assets/img/**',
      },
      {
        protocol: 'https',
        hostname: 'lumiere-a.akamaihd.net',
        pathname: '/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
