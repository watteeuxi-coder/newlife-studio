'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { waLink } from '@/lib/config'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#forfaits', label: 'Forfaits' },
  { href: '#concepts', label: 'Concepts' },
  { href: '#pourquoi', label: 'Pourquoi nous' },
  { href: '#faq', label: 'FAQ' },
]

// Sur mobile, pas de bouton WhatsApp dans le header → le contact passe par le menu
const MOBILE_LINKS = [...NAV_LINKS, { href: '#contact', label: 'Contact' }]

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  // Position de scroll mémorisée pendant que le menu bloque la page (null = pas bloquée)
  const lockedY = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()
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

  function onMenuLink(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // Débloquer avant de suivre l'ancre, sinon la restauration du scroll annule le saut
    e.preventDefault()
    unlockScroll()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView()
    history.pushState(null, '', href)
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
        <a href="#top" className="flex items-center gap-2" aria-label="NEWLIFE STUDIO">
          <span className="w-7 h-7 text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L12 22M5 9L12 2L19 9" />
              <path d="M5 15L12 22L19 15" opacity={0.5} />
            </svg>
          </span>
          <span className="text-text-base text-sm font-semibold tracking-wide">
            <strong>NEWLIFE</strong>{' '}
            <span className="font-normal text-text-dim">STUDIO</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-text-dim hover:text-text-base text-sm transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
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
              {MOBILE_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => onMenuLink(e, l.href)}
                    className="flex items-center min-h-[48px] text-lg text-text-dim hover:text-text-base transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
