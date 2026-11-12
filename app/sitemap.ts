import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'
import { aboutReady, legalReady, privacyReady } from '@/lib/content'
import { PROJECTS } from '@/lib/projects'
import { METIERS } from '@/lib/metiers'

// Pages à remplir (à propos, légal) ajoutées seulement quand leur contenu est complet (sinon noindex).
// `updated` = date de la dernière vraie modification du contenu de la page (pas la date du build).
// À mettre à jour à la main quand le contenu d'une page change (le header et le footer ne comptent pas).
const ROUTES = [
  { path: '', priority: 1, ready: true, updated: '2026-11-10' },
  { path: '/offre', priority: 0.9, ready: true, updated: '2026-11-12' },
  { path: '/concepts', priority: 0.7, ready: true, updated: '2026-11-12' },
  ...PROJECTS.map((p) => ({ path: `/concepts/${p.slug}`, priority: 0.6, ready: true, updated: '2026-11-12' })),
  ...METIERS.map((m) => ({ path: `/${m.slug}`, priority: 0.8, ready: true, updated: '2026-11-12' })),
  { path: '/contact', priority: 0.8, ready: true, updated: '2026-11-12' },
  { path: '/a-propos', priority: 0.5, ready: aboutReady(), updated: '2026-11-10' },
  { path: '/mentions-legales', priority: 0.1, ready: legalReady(), updated: '2026-11-10' },
  { path: '/confidentialite', priority: 0.1, ready: privacyReady(), updated: '2026-11-10' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.filter((r) => r.ready).map(({ path, priority, updated }) => ({
    url: `${SITE_CONFIG.siteUrl}${path}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority,
  }))
}
