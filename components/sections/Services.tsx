'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { waLink } from '@/lib/config'

const SERVICES = [
  {
    id: '01',
    title: 'Sites vitrine',
    desc: "Un site élégant qui présente ton activité et inspire confiance dès la première seconde.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x={3} y={4} width={18} height={14} rx={2} />
        <path d="M3 9h18M8 21h8M12 18v3" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'E-commerce',
    desc: "Une boutique en ligne rapide et optimisée pour vendre tes produits 24h/24, 7j/7.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx={9} cy={20} r={1.4} />
        <circle cx={18} cy={20} r={1.4} />
        <path d="M2 3h3l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.2L22 7H6" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Refonte',
    desc: "On modernise ton site existant pour le rendre rapide, beau et réellement efficace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'SEO',
    desc: "On te rend visible sur Google pour attirer des clients qualifiés, sans dépendre de la pub.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx={11} cy={11} r={7} />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Maintenance',
    desc: "On garde ton site à jour, sécurisé et performant — tu n'as plus à t'en occuper.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const cardRef = useRef<HTMLElement>(null)

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const r = cardRef.current!.getBoundingClientRect()
    cardRef.current!.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    cardRef.current!.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="relative group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 overflow-hidden cursor-default transition-colors hover:border-accent/30"
      style={{
        background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.07) 0%, transparent 60%)',
      }}
    >
      <span className="absolute top-5 right-5 text-xs font-mono text-text-muted">{service.id}</span>
      <div className="w-11 h-11 text-accent mb-5">{service.icon}</div>
      <h3 className="text-text-base font-semibold text-lg mb-2">{service.title}</h3>
      <p className="text-text-dim text-sm leading-relaxed">{service.desc}</p>
    </motion.article>
  )
}

function CtaCard() {
  const [ref, isInView] = useScrollReveal()
  const wa = waLink()
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl border border-accent/30 p-7 flex flex-col justify-center"
      style={{ background: 'linear-gradient(160deg, rgba(34,211,238,0.08), rgba(255,255,255,0.01))' }}
    >
      <h3 className="text-text-base font-semibold text-lg mb-3">Un besoin sur mesure ?</h3>
      <p className="text-text-dim text-sm leading-relaxed mb-5">
        Tu as un projet spécifique ? On en parle directement sur WhatsApp.
      </p>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:text-accent-bright transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
        </svg>
        Discuter sur WhatsApp →
      </a>
    </motion.article>
  )
}

export default function Services() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="services">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Nos services</span>
          <h2>Tout ce qu&rsquo;il faut pour <span className="grad-text">exister en ligne</span></h2>
          <p>Du premier site à la boutique qui tourne 24h/24 — on construit, on modernise et on fait grandir ta présence web.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
          <CtaCard />
        </div>
      </div>
    </section>
  )
}
