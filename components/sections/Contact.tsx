'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealHead } from '@/lib/motion'
import { waLink, SITE_CONFIG } from '@/lib/config'
import ContactForm from '@/components/ui/ContactForm'

export default function Contact({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
  const wa = waLink()

  return (
    <section id="contact" className="tone-base">
      <div className="wrap">
        <motion.div
          {...revealHead}
          className="rounded-3xl border border-line bg-surface p-8 sm:p-12 text-center shadow-soft max-w-3xl mx-auto"
        >
          <span className="kicker justify-center">Contact</span>
          <Title className="text-3xl sm:text-4xl font-bold text-text-base mb-4 leading-tight">
            Ton projet de site web à Rouen&nbsp;?<br className="hidden sm:block" /> On en parle.
          </Title>
          <p className="text-text-dim mb-8 max-w-lg mx-auto leading-relaxed">
            Le plus rapide : WhatsApp. Sinon, laisse-moi un message ici et je te réponds sous 24h.
          </p>

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-white font-semibold text-lg hover:bg-accent-bright active:scale-[0.98] transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
            </svg>
            Discuter sur WhatsApp
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8" aria-hidden="true">
            <span className="flex-1 h-px bg-line" />
            <span className="text-text-muted text-xs uppercase tracking-widest">ou par message</span>
            <span className="flex-1 h-px bg-line" />
          </div>

          <ContactForm />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-1 mt-8 text-sm text-text-dim">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-2 min-h-[44px] hover:text-text-base transition-colors break-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 shrink-0" aria-hidden="true">
                <rect x={3} y={5} width={18} height={14} rx={2} />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {SITE_CONFIG.email}
            </a>
            <p className="inline-flex items-center gap-2 min-h-[44px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 shrink-0" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                <circle cx={12} cy={9.5} r={2.5} />
              </svg>
              Rouen et alentours
            </p>
          </div>
        </motion.div>

        <nav aria-label="Avant de m’écrire" className="flex flex-col sm:flex-row items-center justify-center gap-x-8 mt-8">
          <Link href="/offre" className="inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors">Voir les tarifs →</Link>
          <Link href="/concepts" className="inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors">Voir des exemples de sites →</Link>
        </nav>
      </div>
    </section>
  )
}
