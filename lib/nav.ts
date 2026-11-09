export type PageLink = { href: string; label: string }

export const PAGES: PageLink[] = [
  { href: '/', label: 'Accueil' },
  { href: '/offre', label: 'Offre' },
  { href: '/concepts', label: 'Concepts' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export const LEGAL_PAGES: PageLink[] = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Confidentialité' },
]

export function isActivePage(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}
