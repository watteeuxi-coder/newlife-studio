import type { Metadata } from 'next'

const SITE_NAME = 'NEWLIFE STUDIO'
// Le openGraph d'une page remplace celui du layout : sans ça, l'image de partage (app/opengraph-image.tsx) disparaît
const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'NEWLIFE STUDIO — Une nouvelle vie pour ton business en ligne',
}

interface PageSeo {
  title: string
  description: string
  path: string
  /** Pages en préparation : hors index Google tant qu'elles sont vides */
  noindex?: boolean
}

export function pageMetadata({ title, description, path, noindex = false }: PageSeo): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`
  return {
    // absolute : le template du layout ne s'applique pas à la page d'accueil (même segment)
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [OG_IMAGE] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
