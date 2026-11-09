import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

// Pages en préparation (à propos, légal) exclues tant qu'elles sont vides (noindex)
const ROUTES = [
  { path: '', priority: 1 },
  { path: '/offre', priority: 0.9 },
  { path: '/concepts', priority: 0.7 },
  { path: '/contact', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_CONFIG.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
