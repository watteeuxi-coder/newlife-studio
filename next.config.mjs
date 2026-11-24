/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Ancienne adresse de la politique de confidentialité (renommée le 2026-11-24)
  async redirects() {
    return [{ source: '/confidentialite', destination: '/politique-confidentialite', permanent: true }]
  },
}

export default nextConfig
