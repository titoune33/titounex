/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Pas de static export pour Vercel — permet le SSR pour next-auth
};

module.exports = nextConfig;
