import Link from 'next/link'
import { waLink, SITE_CONFIG } from '@/lib/config'
import { PAGES, LEGAL_PAGES } from '@/lib/nav'
import WaIcon from '@/components/ui/WaIcon'

const linkClass =
  'flex items-center min-h-[44px] md:min-h-0 md:py-1.5 text-sm text-text-dim hover:text-text-base transition-colors'

export default function Footer() {
  return (
    // pb-24 sur mobile : le bouton WhatsApp flottant ne recouvre pas les derniers liens
    <footer className="relative z-[1] border-t border-line pt-12 pb-24 md:pb-10">
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
        <div className="pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-text-muted">
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
