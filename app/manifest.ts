import type { MetadataRoute } from 'next'

/** Site installable (« Ajouter à l'écran d'accueil »). Icônes : public/, générées par scripts/generate-icons.mjs */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NEWLIFE STUDIO',
    short_name: 'NEWLIFE',
    description: 'Création de sites web pour les commerçants, artisans et indépendants de Rouen et alentours.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#0b1220',
    background_color: '#0b1220',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
