# Multi-pages — Étape 1 : socle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer le one-page en site multi-pages (`/`, `/offre`, `/concepts`, `/contact` + pages en préparation) avec layout commun, navigation par pages et metadata par page.

**Architecture:** Tout le commun (fonds, Header, bloc « Discuter de ton projet », Footer, bouton WhatsApp) vit dans `app/layout.tsx`. Chaque page est un Server Component qui exporte sa `metadata` (via `lib/seo.ts`) et assemble les sections existantes. La liste des pages est centralisée dans `lib/nav.ts`.

**Tech Stack:** Next.js 14.2 App Router, React 18, TypeScript, Tailwind 3.4, Framer Motion 11.

**Spec :** `docs/superpowers/specs/2026-11-09-multi-pages-design.md`

**Tests :** le projet n'a pas de framework de test. La vérification se fait par `npm run build` (typage + génération des routes), par `curl` sur le serveur de prod local (title, h1, canonical, og:image de chaque page) et dans Chrome à 375 px (menu, navigation, console). Branche : `refonte`. **Ne rien fusionner dans `main`.**

---

## Fichiers

| Fichier | Action | Rôle |
|---|---|---|
| `lib/nav.ts` | Créer | Liste des pages + pages légales + `isActivePage()` |
| `lib/seo.ts` | Créer | `pageMetadata()` : title, description, canonical, OG, Twitter, noindex |
| `components/ui/WaIcon.tsx` | Créer | Icône WhatsApp partagée |
| `components/layout/ProjectCta.tsx` | Créer | Bloc « Discuter de ton projet » (WhatsApp seul sur `/contact`) |
| `components/layout/PagePending.tsx` | Créer | Page « en préparation » (h1 + phrase) |
| `components/layout/Footer.tsx` | Réécrire | Footer commun (pages, contact, légal) |
| `components/layout/Header.tsx` | Réécrire | Liens de pages (`next/link`), lien actif, fermeture du menu au changement de page |
| `app/globals.css` | Modifier | `.section-head h1` stylé comme `h2` |
| `components/sections/Services.tsx`, `Portfolio.tsx`, `Contact.tsx` | Modifier | Prop `titleAs` (`'h1' \| 'h2'`) pour avoir un h1 par page |
| `components/sections/Hero.tsx` | Modifier | « Voir les forfaits » → `/offre#forfaits` |
| `app/layout.tsx` | Modifier | Title template + éléments communs |
| `app/page.tsx` | Réécrire | Accueil : Hero seul (l'étape 2 complète) |
| `app/offre/page.tsx`, `app/concepts/page.tsx`, `app/contact/page.tsx` | Créer | Pages avec sections existantes |
| `app/a-propos/page.tsx`, `app/mentions-legales/page.tsx`, `app/confidentialite/page.tsx` | Créer | Pages en préparation (noindex) |
| `app/sitemap.ts` | Modifier | Routes publiques indexables |
| `CLAUDE.md` | Modifier | Nouvelle structure du site |

---

### Task 1 : Configuration des pages et du SEO

**Files:**
- Create: `lib/nav.ts`
- Create: `lib/seo.ts`

- [ ] **Step 1 : Créer `lib/nav.ts`**

```ts
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
```

- [ ] **Step 2 : Créer `lib/seo.ts`**

```ts
import type { Metadata } from 'next'

const SITE_NAME = 'NEWLIFE STUDIO'

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
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}
```

- [ ] **Step 3 : Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune sortie (0 erreur).

- [ ] **Step 4 : Commit**

```bash
git add lib/nav.ts lib/seo.ts
git commit -m "feat: config des pages (nav) et helper metadata par page"
```

---

### Task 2 : Un h1 par page (prop `titleAs`)

**Files:**
- Modify: `app/globals.css` (bloc `.section-head h2`)
- Modify: `components/sections/Services.tsx`
- Modify: `components/sections/Portfolio.tsx`
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1 : `app/globals.css`** — remplacer le sélecteur `.section-head h2 {` par :

```css
.section-head h1,
.section-head h2 {
```

- [ ] **Step 2 : `Services.tsx`** — remplacer `export default function Services() {` par :

```tsx
export default function Services({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
```

et remplacer la ligne du titre :

```tsx
          <h2>Tout ce qu&rsquo;il faut pour <span className="grad-text">exister en ligne</span></h2>
```

par :

```tsx
          <Title>Tout ce qu&rsquo;il faut pour <span className="grad-text">exister en ligne</span></Title>
```

- [ ] **Step 3 : `Portfolio.tsx`** — remplacer `export default function Portfolio() {` par :

```tsx
export default function Portfolio({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
```

et :

```tsx
          <h2>Trois métiers, <span className="grad-text">trois sites de démo</span></h2>
```

par :

```tsx
          <Title>Trois métiers, <span className="grad-text">trois sites de démo</span></Title>
```

- [ ] **Step 4 : `Contact.tsx`** — remplacer `export default function Contact() {` par :

```tsx
export default function Contact({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
```

et remplacer le bloc titre :

```tsx
          <h2 className="text-3xl sm:text-4xl font-bold text-text-base mb-4 leading-tight">
            Prêt à donner une nouvelle vie<br className="hidden sm:block" /> à ton business ?
          </h2>
```

par :

```tsx
          <Title className="text-3xl sm:text-4xl font-bold text-text-base mb-4 leading-tight">
            Prêt à donner une nouvelle vie<br className="hidden sm:block" /> à ton business ?
          </Title>
```

- [ ] **Step 5 : Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 6 : Commit**

```bash
git add app/globals.css components/sections/Services.tsx components/sections/Portfolio.tsx components/sections/Contact.tsx
git commit -m "feat: titre de section en h1 possible (un h1 par page)"
```

---

### Task 3 : Composants communs (icône WhatsApp, bloc final, page en préparation, footer)

**Files:**
- Create: `components/ui/WaIcon.tsx`
- Create: `components/layout/ProjectCta.tsx`
- Create: `components/layout/PagePending.tsx`
- Rewrite: `components/layout/Footer.tsx`

- [ ] **Step 1 : Créer `components/ui/WaIcon.tsx`**

```tsx
export default function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
    </svg>
  )
}
```

- [ ] **Step 2 : Créer `components/layout/ProjectCta.tsx`**

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { waLink } from '@/lib/config'
import WaIcon from '@/components/ui/WaIcon'

/** Bloc de fin commun à toutes les pages. Sur /contact, le formulaire est juste au-dessus → WhatsApp seul. */
export default function ProjectCta() {
  const pathname = usePathname()
  const onContactPage = pathname === '/contact'

  return (
    <section aria-labelledby="project-cta-title">
      <div className="wrap">
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-12 text-center">
          <h2 id="project-cta-title" className="text-2xl sm:text-3xl font-bold text-text-base mb-3">
            Discuter de ton projet
          </h2>
          <p className="text-text-dim leading-relaxed max-w-md mx-auto mb-8">
            Dis-nous ce que tu fais et ce dont tu as besoin. On te répond sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-void font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all"
            >
              <WaIcon className="w-5 h-5" />
              Discuter sur WhatsApp
            </a>
            {!onContactPage && (
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-text-dim hover:border-accent/50 hover:text-text-base active:scale-[0.98] transition-all"
              >
                Écrire un message
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3 : Créer `components/layout/PagePending.tsx`**

```tsx
/** Page dont le texte n'est pas encore fourni : on n'invente rien, on l'annonce. */
export default function PagePending({ title }: { title: string }) {
  return (
    <section>
      <div className="wrap">
        <div className="section-head">
          <h1>{title}</h1>
          <p>Page en préparation.</p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4 : Réécrire `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'
import { waLink, SITE_CONFIG } from '@/lib/config'
import { PAGES, LEGAL_PAGES } from '@/lib/nav'
import WaIcon from '@/components/ui/WaIcon'

const linkClass =
  'flex items-center min-h-[44px] md:min-h-0 md:py-1.5 text-sm text-text-dim hover:text-text-base transition-colors'

export default function Footer() {
  return (
    // pb-24 sur mobile : le bouton WhatsApp flottant ne recouvre pas les derniers liens
    <footer className="relative z-[1] border-t border-white/[0.07] pt-12 pb-24 md:pb-10">
      <div className="wrap grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2" aria-label="NEWLIFE STUDIO — Accueil">
            <span className="w-6 h-6 text-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L12 22M5 9L12 2L19 9" />
                <path d="M5 15L12 22L19 15" opacity={0.5} />
              </svg>
            </span>
            <span className="text-text-base text-sm font-semibold">
              <strong>NEWLIFE</strong>{' '}
              <span className="font-normal text-text-dim">STUDIO</span>
            </span>
          </Link>
          <p className="text-text-muted text-sm mt-3 max-w-xs leading-relaxed">
            On donne une nouvelle vie à ton business en ligne.
          </p>
        </div>

        <nav aria-label="Pages du site">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">Pages</p>
          <ul>
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={linkClass}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">Contact</p>
          <ul>
            <li>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                <WaIcon className="w-4 h-4 text-accent" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_CONFIG.email}`} className={`${linkClass} break-all`}>
                {SITE_CONFIG.email}
              </a>
            </li>
            <li className="flex items-center min-h-[44px] md:min-h-0 md:py-1.5 text-sm text-text-dim">
              Rouen et alentours
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap mt-10">
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-muted">
          <p>© 2026 NEWLIFE STUDIO</p>
          <ul className="flex gap-6">
            {LEGAL_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="flex items-center min-h-[44px] sm:min-h-0 hover:text-text-base transition-colors">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5 : Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 6 : Commit**

```bash
git add components/ui/WaIcon.tsx components/layout/ProjectCta.tsx components/layout/PagePending.tsx components/layout/Footer.tsx
git commit -m "feat: footer commun, bloc « Discuter de ton projet », page en préparation"
```

---

### Task 4 : Header avec liens de pages

**Files:**
- Rewrite: `components/layout/Header.tsx`

Le scroll lock iOS, le menu plein écran, Échap/focus et `transition-colors` sont conservés tels quels. Changements : `next/link`, lien actif (`aria-current`), menu fermé au changement de page, scroll débloqué **avant** la navigation (sinon la restauration de position s'appliquerait après que Next a remonté la nouvelle page en haut).

- [ ] **Step 1 : Réécrire `components/layout/Header.tsx`**

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { waLink } from '@/lib/config'
import { PAGES, isActivePage } from '@/lib/nav'
import WaIcon from '@/components/ui/WaIcon'

// Desktop : le logo fait office de lien Accueil
const DESKTOP_LINKS = PAGES.filter((p) => p.href !== '/')

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  // Position de scroll mémorisée pendant que le menu bloque la page (null = pas bloquée)
  const lockedY = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const wa = waLink()

  useEffect(() => {
    const onScroll = () => {
      // Body en position fixed → scrollY vaut 0 : on ne touche pas au fond du header
      if (lockedY.current !== null) return
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Changement de page (liens, retour arrière…) → menu fermé
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Scroll lock compatible iOS Safari : overflow:hidden ne suffit pas, il faut figer le body
  function lockScroll() {
    if (lockedY.current !== null) return
    lockedY.current = window.scrollY
    Object.assign(document.body.style, {
      position: 'fixed',
      top: `-${lockedY.current}px`,
      left: '0',
      right: '0',
      overflow: 'hidden',
    })
  }

  function unlockScroll() {
    if (lockedY.current === null) return
    const y = lockedY.current
    lockedY.current = null
    Object.assign(document.body.style, { position: '', top: '', left: '', right: '', overflow: '' })
    // 'instant' sinon le scroll-behavior: smooth du html anime le retour
    window.scrollTo({ top: y, behavior: 'instant' })
  }

  function onMenuLink() {
    // Débloquer avant la navigation : Next remonte ensuite la nouvelle page en haut
    unlockScroll()
    setMenuOpen(false)
  }

  // Menu ouvert : scroll bloqué, focus sur le 1er lien, Échap ferme et rend le focus
  // au bouton, focus hors du header ferme, passage en desktop ferme
  useEffect(() => {
    if (!menuOpen) return
    lockScroll()
    menuRef.current?.querySelector('a')?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onFocusOut = (e: FocusEvent) => {
      if (!(e.target as Element).closest?.('header')) setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = () => desktop.matches && setMenuOpen(false)

    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocusOut)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocusOut)
      desktop.removeEventListener('change', onResize)
      unlockScroll()
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        menuOpen
          ? 'bg-void border-b border-white/10'
          : scrolled
            ? 'bg-void/90 backdrop-blur-md border-b border-white/10'
            : ''
      }`}
    >
      <div className="wrap flex items-center justify-between h-16">
        {/* Brand */}
        <Link href="/" onClick={onMenuLink} className="flex items-center gap-2" aria-label="NEWLIFE STUDIO — Accueil">
          <span className="w-7 h-7 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2L12 22M5 9L12 2L19 9" />
              <path d="M5 15L12 22L19 15" opacity={0.5} />
            </svg>
          </span>
          <span className="text-text-base text-sm font-semibold tracking-wide">
            <strong>NEWLIFE</strong>{' '}
            <span className="font-normal text-text-dim">STUDIO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-7">
          {DESKTOP_LINKS.map((l) => {
            const active = isActivePage(pathname, l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm transition-colors duration-200 ${
                  active ? 'text-text-base' : 'text-text-dim hover:text-text-base'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-void text-sm font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all"
        >
          <WaIcon className="w-4 h-4" />
          WhatsApp
        </a>

        {/* Mobile burger → menu (WhatsApp reste sur le bouton flottant) */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-accent"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-6 h-6" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu — plein écran sous le header (4rem) ; repli 100vh si dvh non supporté */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            ref={menuRef}
            id="mobile-menu"
            aria-label="Menu principal"
            className="md:hidden fixed inset-x-0 top-16 h-[calc(100vh_-_4rem)] bg-void overflow-y-auto overscroll-contain"
            style={{ height: 'calc(100dvh - 4rem)' }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="wrap py-3">
              {PAGES.map((l) => {
                const active = isActivePage(pathname, l.href)
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onMenuLink}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center min-h-[48px] text-lg transition-colors ${
                        active ? 'text-accent' : 'text-text-dim hover:text-text-base'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2 : Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 3 : Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat(header): navigation par pages, lien actif, menu fermé au changement de page"
```

---

### Task 5 : Layout commun et accueil

**Files:**
- Modify: `app/layout.tsx`
- Rewrite: `app/page.tsx`
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1 : `app/layout.tsx` — imports.** Après `import { SITE_CONFIG } from '@/lib/config'`, ajouter :

```tsx
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectCta from '@/components/layout/ProjectCta'
```

- [ ] **Step 2 : `app/layout.tsx` — title template.** Remplacer :

```tsx
  title: 'NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne',
```

par :

```tsx
  title: {
    default: 'NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne',
    template: '%s — NEWLIFE STUDIO',
  },
```

- [ ] **Step 3 : `app/layout.tsx` — body.** Remplacer :

```tsx
      <body>{children}</body>
```

par :

```tsx
      <body>
        {/* Fonds fixes (z=0), partagés par toutes les pages */}
        <div className="bg-grid" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />
        <ParticleCanvas />

        <Header />
        <main>{children}</main>
        <ProjectCta />
        <Footer />

        {/* Bouton WhatsApp flottant (mobile) */}
        <WhatsAppButton />
      </body>
```

- [ ] **Step 4 : Réécrire `app/page.tsx`**

```tsx
import Hero from '@/components/sections/Hero'

// Accueil allégé : l'étape 2 ajoute « Pour qui », « Comment ça se passe » et l'aperçu des concepts
export default function HomePage() {
  return <Hero />
}
```

- [ ] **Step 5 : `Hero.tsx` — lien forfaits.** Ajouter `import Link from 'next/link'` sous `import { motion } from 'framer-motion'`, puis remplacer :

```tsx
              <a
                href="#forfaits"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-text-dim hover:border-accent/50 hover:text-text-base hover:bg-white/[0.04] active:scale-[0.98] transition-all"
              >
                Voir les forfaits →
              </a>
```

par :

```tsx
              <Link
                href="/offre#forfaits"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-text-dim hover:border-accent/50 hover:text-text-base hover:bg-white/[0.04] active:scale-[0.98] transition-all"
              >
                Voir les forfaits →
              </Link>
```

- [ ] **Step 6 : Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 7 : Commit**

```bash
git add app/layout.tsx app/page.tsx components/sections/Hero.tsx
git commit -m "feat: layout commun (header, bloc final, footer) et accueil allégé"
```

---

### Task 6 : Pages

**Files:**
- Create: `app/offre/page.tsx`, `app/concepts/page.tsx`, `app/contact/page.tsx`
- Create: `app/a-propos/page.tsx`, `app/mentions-legales/page.tsx`, `app/confidentialite/page.tsx`

- [ ] **Step 1 : `app/offre/page.tsx`**

```tsx
import Services from '@/components/sections/Services'
import Forfaits from '@/components/sections/Forfaits'
import Pourquoi from '@/components/sections/Pourquoi'
import Faq from '@/components/sections/Faq'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Offre & tarifs',
  description:
    'Sites vitrine, e-commerce, refonte, SEO et maintenance. Forfaits dès 299 €, livrés en 5 à 10 jours, paiement en 2 fois.',
  path: '/offre',
})

export default function OffrePage() {
  return (
    <>
      <Services titleAs="h1" />
      <Forfaits />
      <Pourquoi />
      <Faq />
    </>
  )
}
```

- [ ] **Step 2 : `app/concepts/page.tsx`**

```tsx
import Portfolio from '@/components/sections/Portfolio'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Nos concepts',
  description:
    "Trois sites de démonstration — barbershop, salle de sport, immobilier — pour voir ce qu'on peut construire pour ton activité.",
  path: '/concepts',
})

export default function ConceptsPage() {
  return <Portfolio titleAs="h1" />
}
```

- [ ] **Step 3 : `app/contact/page.tsx`**

```tsx
import Contact from '@/components/sections/Contact'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Parle-nous de ton projet sur WhatsApp ou par message. Réponse sous 24h.',
  path: '/contact',
})

export default function ContactPage() {
  return <Contact titleAs="h1" />
}
```

- [ ] **Step 4 : `app/a-propos/page.tsx`**

```tsx
import PagePending from '@/components/layout/PagePending'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'À propos',
  description: 'Qui est derrière NEWLIFE STUDIO.',
  path: '/a-propos',
  noindex: true,
})

export default function AProposPage() {
  return <PagePending title="À propos" />
}
```

- [ ] **Step 5 : `app/mentions-legales/page.tsx`**

```tsx
import PagePending from '@/components/layout/PagePending'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site NEWLIFE STUDIO.',
  path: '/mentions-legales',
  noindex: true,
})

export default function MentionsLegalesPage() {
  return <PagePending title="Mentions légales" />
}
```

- [ ] **Step 6 : `app/confidentialite/page.tsx`**

```tsx
import PagePending from '@/components/layout/PagePending'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Confidentialité',
  description: 'Politique de confidentialité du site NEWLIFE STUDIO.',
  path: '/confidentialite',
  noindex: true,
})

export default function ConfidentialitePage() {
  return <PagePending title="Confidentialité" />
}
```

- [ ] **Step 7 : Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: 0 erreur.

- [ ] **Step 8 : Commit**

```bash
git add app/offre app/concepts app/contact app/a-propos app/mentions-legales app/confidentialite
git commit -m "feat: pages /offre, /concepts, /contact et pages en préparation"
```

---

### Task 7 : Sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1 : Réécrire `app/sitemap.ts`**

```ts
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
```

- [ ] **Step 2 : Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): sitemap multi-pages"
```

---

### Task 8 : Vérification complète

- [ ] **Step 1 : Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, et les routes `/`, `/offre`, `/concepts`, `/contact`, `/a-propos`, `/mentions-legales`, `/confidentialite` listées en `○ (Static)`.

- [ ] **Step 2 : Contrôle HTML de chaque page (serveur de prod local)**

Run (dans un terminal, en arrière-plan) : `npx next start -p 3100`

Puis :

```bash
for p in / /offre /concepts /contact /a-propos /mentions-legales /confidentialite; do
  html=$(curl -s "http://127.0.0.1:3100$p")
  echo "== $p"
  echo "$html" | grep -o '<title>[^<]*</title>'
  echo "$html" | grep -o '<link rel="canonical" href="[^"]*"'
  echo "$html" | grep -c '<h1' | sed 's/^/h1: /'
  echo "$html" | grep -o 'property="og:image" content="[^"]*"' | head -1
  echo "$html" | grep -o '<meta name="robots" content="[^"]*"'
  echo "$html" | grep -o 'Discuter de ton projet' | head -1
done
```

Expected, pour chaque page : un `<title>` propre (`Offre & tarifs — NEWLIFE STUDIO`, etc.), une canonical sur sa propre URL, `h1: 1`, une ligne `og:image`, « Discuter de ton projet » présent, et `noindex` uniquement sur les 3 pages en préparation.
**Si `og:image` manque sur une page** : ajouter dans `lib/seo.ts` → `openGraph.images: ['/opengraph-image']` et `twitter.images: ['/opengraph-image']`, rebuild, recontrôler.

- [ ] **Step 3 : Contrôle visuel à 375 px (Chrome, `npm run dev`, sur `http://127.0.0.1:3000` à cause du service worker sur `localhost`)**

Pour chaque page : pas de débordement horizontal, h1 visible sous le header, bloc final présent (WhatsApp seul sur `/contact`), footer lisible avec liens ≥ 44 px.
Menu mobile : ouverture, lien actif en cyan, clic sur « Offre » → arrive en haut de `/offre`, menu fermé, scroll débloqué (`document.body.style.position === ''`). « Voir les forfaits » sur l'accueil → `/offre#forfaits`. Retour arrière du navigateur menu ouvert → menu fermé.

- [ ] **Step 4 : Console**

Console navigateur sans erreur sur chacune des 7 pages.

- [ ] **Step 5 : Mettre à jour `CLAUDE.md`**

Remplacer la ligne « Structure de la page (`app/page.tsx`) : … » par :

```markdown
Structure du site (multi-pages, spec `docs/superpowers/specs/2026-11-09-multi-pages-design.md`) :
- `app/layout.tsx` porte le commun : fonds fixes (grille, bruit, `ParticleCanvas` désactivé sur mobile et en reduced-motion), `Header`, `<main>`, `ProjectCta` (bloc « Discuter de ton projet », WhatsApp seul sur `/contact`), `Footer`, bouton WhatsApp flottant.
- Pages : `/` (Hero), `/offre` (Services → Forfaits → Pourquoi → FAQ), `/concepts` (3 démos), `/contact` (formulaire), `/a-propos`, `/mentions-legales`, `/confidentialite` (en préparation, noindex).
- Liste des pages : `lib/nav.ts`. Metadata d'une page : `pageMetadata()` de `lib/seo.ts`. Un seul h1 par page (prop `titleAs="h1"` sur la première section).
```

```bash
git add CLAUDE.md
git commit -m "docs: CLAUDE.md à jour (structure multi-pages)"
```

- [ ] **Step 6 : Push + preview**

```bash
git push
```

Vérifier si Vercel crée la preview du commit (`gh api repos/watteeuxi-coder/newlife-studio/commits/<sha>/statuses`) ; sinon proposer `vercel deploy` (preview) à l'utilisateur. **Ne pas fusionner dans `main`.**
