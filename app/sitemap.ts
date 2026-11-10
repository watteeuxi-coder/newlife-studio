import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'
import { aboutReady, legalReady, privacyReady } from '@/lib/content'
import { PROJECTS } from '@/lib/projects'

// Pages à remplir (à propos, légal) ajoutées seulement quand leur contenu est complet (sinon noindex)
const ROUTES = [
  { path: '', priority: 1, ready: true },
  { path: '/offre', priority: 0.9, ready: true },
  { path: '/concepts', priority: 0.7, ready: true },
  ...PROJECTS.map((p) => ({ path: `/concepts/${p.slug}`, priority: 0.6, ready: true })),
  { path: '/contact', priority: 0.8, ready: true },
  { path: '/a-propos', priority: 0.5, ready: aboutReady() },
  { path: '/mentions-legales', priority: 0.1, ready: legalReady() },
  { path: '/confidentialite', priority: 0.1, ready: privacyReady() },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.filter((r) => r.ready).map(({ path, priority }) => ({
    url: `${SITE_CONFIG.siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
