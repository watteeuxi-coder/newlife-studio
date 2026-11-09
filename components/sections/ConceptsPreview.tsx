'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealHead, revealItem } from '@/lib/motion'
import { PROJECTS } from '@/lib/projects'
import ProjectShot from '@/components/ui/ProjectShot'

/** Aperçu des démos sur l'accueil. Mobile : défilement horizontal pour ne pas empiler 3 grandes cartes. */
export default function ConceptsPreview() {
  return (
    <section id="apercu-concepts" className="tone-white">
      <div className="wrap">
        <motion.div
          className="section-head section-head--split"
          {...revealHead}
        >
          <span className="kicker">Mes concepts</span>
          <h2>Ce que je <span className="grad-text">sais construire</span></h2>
          <p>Trois sites de démo, un par métier, pour te montrer ce que je peux construire pour toi.</p>
        </motion.div>

        {/* scroll-px-6 = px-6 : sinon le snap colle la 1re carte au bord de l'écran */}
        <ul className="spot-group flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 scroll-px-6 pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          {PROJECTS.map((p, i) => (
            <motion.li key={p.title} {...revealItem(i)} className="snap-start shrink-0 w-[80%] sm:w-[55%] md:w-auto">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="spot group block rounded-2xl border border-line overflow-hidden hover:border-accent/25 transition-colors"
              >
                <div className="h-44 p-4 bg-void">
                  <ProjectShot title={p.title} image={p.image} bg={p.bg} sizes="(min-width: 768px) 33vw, 80vw" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-text-base font-semibold">{p.title}</h3>
                    <span className="px-2 py-0.5 rounded-full border border-accent/30 text-accent text-[10px] font-semibold uppercase tracking-wider">
                      Démo
                    </span>
                  </div>
                  <p className="text-text-muted text-xs mt-1">{p.cat}</p>
                  {/* Nom accessible = texte visible + précision (pas d'aria-label qui le remplacerait) */}
                  <span className="sr-only">, tester la démo (nouvel onglet)</span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        <Link
          href="/concepts"
          className="inline-flex items-center min-h-[44px] mt-6 text-accent font-semibold hover:text-accent-bright transition-colors"
        >
          Voir les 3 concepts →
        </Link>
      </div>
    </section>
  )
}
