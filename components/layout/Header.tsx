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
          ? 'bg-void border-b border-line'
          : scrolled
            ? 'bg-void/90 backdrop-blur-md border-b border-line'
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
