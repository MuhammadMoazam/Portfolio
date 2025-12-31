/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Devicons for skill icons
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/gh/devicons/devicon/**',
      },
      // Unsplash for demo images
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Placeholder images
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // GitHub avatars and assets
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      // Common CDNs
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      // UI Avatars for placeholder avatars/logos
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      // Cursor logo
      {
        protocol: 'https',
        hostname: 'www.cursor.com',
      },
    ],
  },
}

module.exports = nextConfig


