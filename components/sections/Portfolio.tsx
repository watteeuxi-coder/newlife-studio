'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const PROJECTS = [
  {
    title: 'Fade & Co. Barbershop',
    cat: 'Barbershop · Réservation en ligne',
    bg: 'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.22), transparent 60%), linear-gradient(160deg,#0c1424,#0a0f1c)',
  },
  {
    title: 'Maison Lumière',
    cat: 'Restaurant · Menu & réservation',
    bg: 'radial-gradient(circle at 70% 20%, rgba(248,170,90,0.2), transparent 60%), linear-gradient(160deg,#160f0c,#0e0c12)',
  },
  {
    title: 'Coach Marco',
    cat: 'Coach sportif · Programmes & coaching',
    bg: 'radial-gradient(circle at 30% 80%, rgba(94,230,168,0.22), transparent 60%), linear-gradient(160deg,#0a1612,#0a0f1c)',
  },
  {
    title: 'Atelier Bois & Fer',
    cat: 'Artisan · Portfolio & devis',
    bg: 'radial-gradient(circle at 70% 80%, rgba(124,108,255,0.22), transparent 60%), linear-gradient(160deg,#100f1c,#0a0f1c)',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

function MockBrowser() {
  return (
    <div className="rounded-lg overflow-hidden border border-white/10">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-3 rounded bg-white/20 w-3/4" />
        <div className="h-2 rounded bg-white/10 w-1/2" />
        <div className="h-2 rounded bg-white/10 w-2/3" />
        <div className="flex gap-2 mt-3">
          <div className="h-8 rounded bg-white/15 flex-1" />
          <div className="h-8 rounded bg-accent/30 w-16" />
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="portfolio">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Réalisations</span>
          <h2>Des projets qui <span className="grad-text">donnent envie</span></h2>
          <p>Un aperçu du style NEWLIFE — chaque site est pensé pour l&rsquo;image de marque et la conversion.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-white/[0.08] overflow-hidden hover:border-accent/20 transition-colors cursor-pointer"
            >
              {/* Screenshot */}
              <div
                className="relative h-48 p-5"
                style={{ background: p.bg }}
              >
                <MockBrowser />
              </div>
              {/* Meta */}
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="text-text-base font-semibold">{p.title}</h3>
                  <div className="text-text-muted text-xs mt-1">{p.cat}</div>
                </div>
                <span className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  <ArrowIcon />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
