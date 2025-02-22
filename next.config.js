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
    ],
  },
}

module.exports = nextConfig
