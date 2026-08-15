/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // Garde le build pour le static mais permet les pages dynamiques
  },
};

module.exports = nextConfig;
