import Link from 'next/link'
import type { Metadata } from 'next'

// noindex explicite : sinon le « index, follow » du layout s'ajoute au noindex automatique de Next
export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="tone-base">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Erreur 404</p>
          <h1>Cette page n&rsquo;existe pas</h1>
          <p>Le lien est peut-être cassé, ou la page a été déplacée.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all"
          >
            Retour à l&rsquo;accueil
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-line-strong bg-surface text-text-base font-semibold hover:border-accent active:scale-[0.98] transition-all"
          >
            Me contacter
          </Link>
        </div>
      </div>
    </section>
  )
}
