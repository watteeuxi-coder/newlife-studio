'use client'

import { useState, useEffect } from 'react'
import { waLink } from '@/lib/config'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#forfaits', label: 'Forfaits' },
  { href: '#portfolio', label: 'Réalisations' },
  { href: '#pourquoi', label: 'Pourquoi nous' },
  { href: '#faq', label: 'FAQ' },
]

function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const wa = waLink()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
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

        {/* Mobile burger → opens WhatsApp (conversion-first) */}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden flex items-center justify-center w-10 h-10 text-accent"
          aria-label="Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-6 h-6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </a>
      </div>
    </header>
  )
}
