/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Mode SSR pour Vercel (nécessaire pour next-auth)
};

module.exports = nextConfig;