/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pas de output: "export" — on garde le SSR pour next-auth
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;