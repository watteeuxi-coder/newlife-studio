import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { waLink, telLink, PHONE, SITE_CONFIG } from '@/lib/config'
import { InstagramIcon, TikTokIcon } from '@/components/ui/SocialIcons'
import { PAGES, LEGAL_PAGES } from '@/lib/nav'
import { ZONES } from '@/lib/zones'
import WaIcon from '@/components/ui/WaIcon'

const linkClass =
  'flex items-center min-h-[44px] md:min-h-0 md:py-1.5 text-sm text-text-dim hover:text-text-base transition-colors'

export default function Footer() {
  return (
    // pb-28 sur mobile : la barre de navigation du bas ne recouvre pas les derniers liens
    <footer className="tone-base relative z-[1] pt-12 pb-28 md:pb-10">
      <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
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
            Une nouvelle vie pour ton business en ligne.
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
              <a href={telLink()} className={`${linkClass} gap-2`}>
                <Phone className="w-4 h-4 text-accent" strokeWidth={1.8} aria-hidden="true" />
                {PHONE.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_CONFIG.email}`} className={`${linkClass} gap-2 break-all`}>
                <Mail className="w-4 h-4 text-accent shrink-0" strokeWidth={1.8} aria-hidden="true" />
                {SITE_CONFIG.email}
              </a>
            </li>
            <li>
              <a href={SITE_CONFIG.social.instagram.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                <InstagramIcon className="w-4 h-4 text-accent" />
                Instagram<span className="sr-only"> {SITE_CONFIG.social.instagram.handle} (nouvel onglet)</span>
              </a>
            </li>
            <li>
              <a href={SITE_CONFIG.social.tiktok.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                <TikTokIcon className="w-4 h-4 text-accent" />
                TikTok<span className="sr-only"> {SITE_CONFIG.social.tiktok.handle} (nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">Zones desservies</p>
          <ul className="space-y-1.5 md:space-y-0">
            {ZONES.map((z) => (
              <li key={z.zip} className="text-sm text-text-dim md:py-1.5">
                {z.city} <span className="font-mono text-xs text-text-muted">{z.zip}</span>
              </li>
            ))}
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
