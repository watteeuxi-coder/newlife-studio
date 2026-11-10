'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, ShoppingBag, RefreshCw, Search, ShieldCheck, type LucideIcon } from 'lucide-react'
import { revealHead, revealItem } from '@/lib/motion'

// Les besoins hors forfaits (boutique, rendez-vous…) sont dans la carte « Sur-mesure » des forfaits
const SERVICES: { title: string; desc: string; Icon: LucideIcon; tone: string; note?: string }[] = [
  {
    title: 'Site vitrine',
    desc: 'Un site élégant qui présente ton activité et inspire confiance dès la première seconde.',
    Icon: Monitor,
    tone: 'bg-pill-cyan-bg border-pill-cyan-line text-pill-cyan-text',
  },
  {
    title: 'Boutique en ligne',
    desc: 'Vendre tes produits en ligne, avec paiement. On en parle et je te fais un devis selon ton projet.',
    Icon: ShoppingBag,
    tone: 'bg-pill-green-bg border-pill-green-line text-pill-green-text',
    note: 'Sur devis',
  },
  {
    title: 'Refonte',
    desc: 'Je modernise ton site existant pour le rendre rapide, beau et réellement efficace.',
    Icon: RefreshCw,
    tone: 'bg-pill-amber-bg border-pill-amber-line text-pill-amber-text',
  },
  {
    title: 'SEO',
    desc: 'Je te rends visible sur Google pour attirer des clients qualifiés, sans dépendre de la pub.',
    Icon: Search,
    tone: 'bg-pill-rose-bg border-pill-rose-line text-pill-rose-text',
  },
  {
    title: 'Maintenance',
    desc: 'Je garde ton site à jour, sécurisé et performant — tu n’as plus à t’en occuper.',
    Icon: ShieldCheck,
    tone: 'bg-pill-blue-bg border-pill-blue-line text-pill-blue-text',
  },
]

// Niveau des titres de cartes : un cran sous le titre de section (h1 sur /offre → cartes en h2)
type CardHeading = 'h2' | 'h3'

function ServiceCard({ service, index, Heading }: { service: (typeof SERVICES)[number]; index: number; Heading: CardHeading }) {
  const { Icon } = service
  return (
    <motion.article
      {...revealItem(index % 3)}
      whileHover={{ scale: 1.02 }}
      className="spot group rounded-2xl border border-line bg-surface p-7 overflow-hidden cursor-default shadow-soft transition-colors hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <span className={`flex items-center justify-center w-11 h-11 rounded-xl border ${service.tone}`} aria-hidden="true">
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </span>
        {service.note && (
          <span className="px-3 py-1 rounded-full border border-pill-green-line bg-pill-green-bg text-pill-green-text text-xs font-semibold">
            {service.note}
          </span>
        )}
      </div>
      <Heading className="text-text-base font-semibold text-lg mb-2">{service.title}</Heading>
      <p className="text-text-dim text-sm leading-relaxed">{service.desc}</p>
    </motion.article>
  )
}

export default function Services({ titleAs: Title = 'h2' }: { titleAs?: 'h1' | 'h2' }) {
  const Heading: CardHeading = Title === 'h1' ? 'h2' : 'h3'
  return (
    <section id="services" className="tone-base">
      <div className="wrap">
        <motion.div className="section-head" {...revealHead}>
          <span className="kicker">Mes services</span>
          <Title>Site vitrine, refonte, SEO&nbsp;: <span className="grad-text">tout pour exister en ligne</span></Title>
          <p>
            Du premier site vitrine à la refonte de ton site actuel&nbsp;: je construis, je modernise et je t&rsquo;aide à
            être trouvé sur Google.
          </p>
        </motion.div>

        <div className="spot-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} Heading={Heading} />
          ))}
        </div>

        <Link
          href="/concepts"
          className="inline-flex items-center min-h-[44px] text-accent font-semibold hover:text-accent-bright transition-colors mt-6"
        >
          Voir des exemples de sites vitrine →
        </Link>
      </div>
    </section>
  )
}
