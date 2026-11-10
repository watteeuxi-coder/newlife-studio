'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Tag, LayoutGrid, User, Mail } from 'lucide-react'
import { waLink } from '@/lib/config'
import { PAGES, isActivePage } from '@/lib/nav'
import WaIcon from '@/components/ui/WaIcon'
import { LiquidNavbar, type LiquidNavItem, type NimbusFx } from '@/components/ui/liquid-glass-navbar'

// Icône Lucide + petite scène jouée au clic, par page (ordre de lib/nav.ts)
const ICONS: Record<string, { Icon: typeof House; fx: NimbusFx }> = {
  '/': { Icon: House, fx: 'glow' },
  '/offre': { Icon: Tag, fx: 'spin' },
  '/concepts': { Icon: LayoutGrid, fx: 'pop' },
  '/a-propos': { Icon: User, fx: 'wave' },
  '/contact': { Icon: Mail, fx: 'drop' },
}

const ITEMS: LiquidNavItem[] = PAGES.map((p) => {
  const { Icon, fx } = ICONS[p.href]
  return { label: p.label, href: p.href, fx, icon: <Icon width={18} height={18} strokeWidth={1.8} aria-hidden="true" /> }
})

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="NEWLIFE STUDIO — Accueil">
      <span className="w-7 h-7 text-accent flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2L12 22M5 9L12 2L19 9" />
          <path d="M5 15L12 22L19 15" opacity={0.5} />
        </svg>
      </span>
      <span className="text-text-base text-sm font-semibold tracking-wide">
        <strong>NEWLIFE</strong> <span className="font-normal text-text-dim">STUDIO</span>
      </span>
    </Link>
  )
}

/**
 * Desktop : carte flottante — logo, pilule « liquid glass » au centre, WhatsApp à droite.
 * Mobile (< 768 px) : logo + WhatsApp compact en haut, pilule en barre flottante en bas (icônes seules).
 * La goutte suit la page active (usePathname) ; au clic elle part tout de suite vers le lien choisi.
 */
export default function Header() {
  const pathname = usePathname()
  const fromPath = ITEMS.findIndex((it) => isActivePage(pathname, it.href))
  const [pending, setPending] = useState<number | null>(null)
  useEffect(() => setPending(null), [pathname])
  const active = pending ?? fromPath
  const wa = waLink()

  return (
    <>
      <header className="fixed top-3 inset-x-0 z-40 px-3">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4 h-14 md:h-16 pl-4 pr-3 md:pr-2 rounded-2xl border border-line bg-night/80 backdrop-blur-md shadow-soft">
          <Logo />

          {/* Desktop : WebGL + réfraction (Chrome) ; libellés masqués entre 768 et 1023 px faute de place */}
          <div className="hidden md:flex flex-1 justify-center min-w-0">
            <LiquidNavbar items={ITEMS} active={active} onChange={(i) => setPending(i)} compact="below-lg" webgl refraction />
          </div>

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 shrink-0 h-10 px-3.5 md:px-4 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all"
          >
            <WaIcon className="w-4 h-4" />
            WhatsApp
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </div>
      </header>

      {/* Mobile : barre façon appli en bas, icônes seules, goutte en CSS (pas de WebGL) */}
      <div
        className="md:hidden fixed inset-x-0 z-40 flex justify-center pointer-events-none"
        style={{ bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
      >
        <LiquidNavbar
          items={ITEMS}
          active={active}
          onChange={(i) => setPending(i)}
          compact
          className="pointer-events-auto"
        />
      </div>
    </>
  )
}
