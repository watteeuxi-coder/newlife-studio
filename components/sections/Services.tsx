'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealHead, revealItem } from '@/lib/motion'
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
    desc: "Je modernise ton site existant pour le rendre rapide, beau et réellement efficace.",
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
    desc: "Je te rends visible sur Google pour attirer des clients qualifiés, sans dépendre de la pub.",
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
    desc: "Je garde ton site à jour, sécurisé et performant — tu n'as plus à t'en occuper.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

// Niveau des titres de cartes : un cran sous le titre de section (h1 sur /offre → cartes en h2)
type CardHeading = 'h2' | 'h3'

function ServiceCard({ service, index, Heading }: { service: typeof SERVICES[number]; index: number; Heading: CardHeading }) {
  return (
    <motion.article
      {...revealItem(index % 3)}
      whileHover={{ scale: 1.02 }}
      className="spot group rounded-2xl border border-line bg-surface p-7 overflow-hidden cursor-default shadow-soft transition-colors hover:border-accent/40"
    >
      <span className="absolute top-5 right-5 text-xs font-mono text-text-muted">{service.id}</span>
      <div className="w-11 h-11 text-accent mb-5">{service.icon}</div>
      <Heading className="text-text-base font-semibold text-lg mb-2">{service.title}</Heading>
      <p className="text-text-dim text-sm leading-relaxed">{service.desc}</p>
    </motion.article>
  )
}

function CtaCard({ Heading }: { Heading: CardHeading }) {
  const wa = waLink()
  return (
    <motion.article
      {...revealItem(2)}
      className="spot rounded-2xl border border-pill-cyan-line bg-pill-cyan-bg p-7 flex flex-col justify-center shadow-soft"
    >
      <Heading className="text-text-base font-semibold text-lg mb-3">Un besoin sur mesure ?</Heading>
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

export default function Services({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
  return (
    <section id="services" className="tone-base">
      <div className="wrap">
        <motion.div
          className="section-head"
          {...revealHead}
        >
          <span className="kicker">Mes services</span>
          <Title>Site vitrine, e-commerce, refonte&nbsp;: <span className="grad-text">tout pour exister en ligne</span></Title>
          <p>Du premier site à la boutique qui tourne 24h/24 — je construis, je modernise et je fais grandir ta présence web.</p>
        </motion.div>

        <div className="spot-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} Heading={Title === 'h1' ? 'h2' : 'h3'} />
          ))}
          <CtaCard Heading={Title === 'h1' ? 'h2' : 'h3'} />
        </div>

        <Link href="/concepts" className="inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors mt-6">
          Voir des exemples de sites vitrine →
        </Link>
      </div>
    </section>
  )
}
