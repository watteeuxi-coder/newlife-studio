'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealHead, revealItem } from '@/lib/motion'
import { PROJECTS } from '@/lib/projects'
import ProjectShot from '@/components/ui/ProjectShot'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

export default function Portfolio({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
  const CardHeading = Title === 'h1' ? 'h2' : 'h3'

  return (
    <section id="concepts" className="tone-base">
      <div className="wrap">
        <motion.div
          className="section-head"
          {...revealHead}
        >
          <span className="kicker">Mes concepts</span>
          <Title>Exemples de sites vitrine&nbsp;: <span className="grad-text">trois métiers, trois démos</span></Title>
          <p>
            Les premiers avis clients arrivent bientôt. En attendant, voilà ce que je sais faire.
            Ouvre un concept pour voir le besoin et ce que j&rsquo;ai construit, ou teste directement la démo.
          </p>
        </motion.div>

        <div className="spot-group grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.slug}
              {...revealItem(i)}
              className="spot group flex flex-col rounded-2xl border border-line bg-surface overflow-hidden shadow-soft hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Capture → page du concept */}
              <Link href={`/concepts/${p.slug}`} tabIndex={-1} aria-hidden="true" className="relative block h-52 p-5 bg-void">
                <ProjectShot title={p.title} cat={p.cat} image={p.image} bg={p.bg} />
              </Link>
              {/* Meta */}
              <div className="p-5 mt-auto">
                <div className="flex items-center gap-2">
                  {/* Un cran sous le titre de section (h1 sur /concepts → h2) */}
                  <CardHeading className="text-text-base font-semibold">{p.title}</CardHeading>
                  <span className="px-2 py-0.5 rounded-full border border-accent/30 text-accent text-[10px] font-semibold uppercase tracking-wider">
                    Démo
                  </span>
                </div>
                <div className="text-text-muted text-xs mt-1">{p.cat}</div>
                <div className="flex flex-wrap items-center justify-between gap-x-4 mt-3">
                  <Link
                    href={`/concepts/${p.slug}`}
                    className="inline-flex items-center min-h-[44px] text-accent text-sm font-semibold hover:text-accent-bright transition-colors"
                  >
                    Voir le concept →<span className="sr-only"> {p.title}</span>
                  </Link>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 min-h-[44px] text-text-dim text-sm font-semibold hover:text-text-base transition-colors"
                  >
                    Tester la démo
                    <ArrowIcon />
                    <span className="sr-only"> {p.title} (nouvel onglet)</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <Link href="/offre#forfaits" className="inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors mt-6">
          Voir les tarifs des sites vitrine →
        </Link>
      </div>
    </section>
  )
}
