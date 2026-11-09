'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { PROJECTS } from '@/lib/projects'
import ProjectShot from '@/components/ui/ProjectShot'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

export default function Portfolio({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="concepts">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Nos concepts</span>
          <Title>Trois métiers, <span className="grad-text">trois sites de démo</span></Title>
          <p>
            Les premiers avis clients arrivent bientôt. En attendant, voilà ce qu&rsquo;on sait faire.
            Clique sur un site pour le tester.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col rounded-2xl border border-white/[0.08] overflow-hidden hover:border-accent/25 hover:shadow-[0_12px_40px_-16px_rgba(34,211,238,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Screenshot */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Tester la démo ${p.title}`}
                className="relative block h-52 p-5"
                style={{ background: p.bg }}
              >
                <ProjectShot title={p.title} image={p.image} bg={p.bg} />
              </a>
              {/* Meta */}
              <div className="flex items-center justify-between p-5 mt-auto">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-text-base font-semibold">{p.title}</h3>
                    <span className="px-2 py-0.5 rounded-full border border-accent/30 text-accent text-[10px] font-semibold uppercase tracking-wider">
                      Démo
                    </span>
                  </div>
                  <div className="text-text-muted text-xs mt-1">{p.cat}</div>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tester la démo ${p.title}`}
                  className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                >
                  <ArrowIcon />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
