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
    <section aria-labelledby="project-cta-title" className="tone-tint">
      <div className="wrap">
        <div className="max-w-3xl mx-auto rounded-3xl border border-line bg-surface p-8 sm:p-12 text-center shadow-soft">
          <h2 id="project-cta-title" className="text-2xl sm:text-3xl font-bold text-text-base mb-3">
            Discuter de ton projet
          </h2>
          <p className="text-text-dim leading-relaxed max-w-md mx-auto mb-8">
            Dis-moi ce que tu fais et ce dont tu as besoin. Je te réponds sous 24h.
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
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-line-strong text-text-dim hover:border-accent/50 hover:text-text-base active:scale-[0.98] transition-all"
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
