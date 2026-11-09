'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { waLink, PERF_SCORE } from '@/lib/config'
import WaIcon from '@/components/ui/WaIcon'
import { handAccent } from '@/lib/fonts'


// Cartes d'infos : une seule liste. Mobile = pastilles sous les boutons ; lg = cartes flottantes autour du titre.
// La rotation est sur l'élément interne : framer-motion pilote le transform de l'élément externe (fondu).
const FACT_POSITIONS = [
  'lg:left-0 lg:top-6',
  'lg:right-0 lg:top-12',
  'lg:left-6 lg:bottom-4',
  'lg:right-8 lg:bottom-8',
]
const FACT_TILTS = ['lg:-rotate-[4deg]', 'lg:rotate-[3deg]', 'lg:rotate-[2deg]', 'lg:-rotate-[3deg]']

const factCard =
  'inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-text-dim ' +
  'lg:rounded-2xl lg:px-4 lg:py-3 lg:gap-3 lg:shadow-[0_16px_40px_-16px_rgba(11,18,32,0.22)]'

function ScoreRing({ score }: { score: number }) {
  return (
    <span className="relative flex items-center justify-center w-4 h-4 lg:w-11 lg:h-11 shrink-0">
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={20} cy={20} r={16} fill="none" strokeWidth={4} className="stroke-ok/20" />
        <circle
          cx={20}
          cy={20}
          r={16}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${score} 100`}
          className="stroke-ok"
        />
      </svg>
      <span className="hidden lg:block relative font-mono text-xs font-bold text-ok-text">{score}</span>
    </span>
  )
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  code: 'm8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14',
  phone: 'M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 15h2',
}

const FEATURES = [
  { label: 'Code sur mesure', icon: ICONS.code, tone: 'bg-pill-cyan-bg border-pill-cyan-line text-pill-cyan-text' },
  { label: 'Pensé pour mobile', icon: ICONS.phone, tone: 'bg-pill-green-bg border-pill-green-line text-pill-green-text' },
]

export default function Hero() {
  const reduceMotion = useReducedMotion()

  // Fondu léger (opacité + 8px). Le h1 n'est jamais animé : c'est l'élément LCP.
  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
        }

  const facts = [
    <>
      <ScoreRing score={PERF_SCORE} />
      <span className="flex flex-wrap items-baseline gap-x-1 lg:flex-col lg:gap-0">
        <span className="font-semibold text-text-base">{PERF_SCORE}/100</span>
        <span className="lg:hidden" aria-hidden="true">·</span>
        <span className="lg:text-xs lg:text-text-muted">Performance mobile de ce site</span>
      </span>
    </>,
    <>
      <span className="text-accent"><Icon d={ICONS.clock} /></span>
      <span className="font-medium text-text-base">Livré en 5 à 10 jours</span>
    </>,
    <>
      <span className="flex flex-wrap items-center gap-x-2 lg:flex-col lg:items-start lg:gap-0.5">
        <span className="font-medium text-text-base">Réponse sous 24h</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-ok-text">
          <span className="w-2 h-2 rounded-full bg-ok" aria-hidden="true" />
          Dispo pour échanger
        </span>
      </span>
    </>,
    <>
      <span className="text-accent"><Icon d={ICONS.pin} /></span>
      <span className="font-medium text-text-base">Rouen et alentours</span>
    </>,
  ]

  return (
    // pt-20 : place pour le header flottant. Le bas suit l'espacement commun des sections (globals.css).
    <section id="top" className="relative pt-20 overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap relative">
        <div className="relative">
          <div className="relative z-[1] max-w-2xl mx-auto text-center pt-10 sm:pt-14 lg:pt-28 lg:pb-28">
            <motion.p
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent mb-6"
              {...fade(0)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-brand" aria-hidden="true" />
              Studio web · Rouen et alentours
            </motion.p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance text-text-base mb-6">
              Une{' '}
              <span className={handAccent}>nouvelle vie</span>{' '}
              pour ton business en ligne
            </h1>

            <motion.p className="text-lg text-text-dim leading-relaxed max-w-xl mx-auto mb-8" {...fade(0.1)}>
              Des sites web pour commerçants et indépendants, faits pour que tes clients te trouvent et te contactent.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3" {...fade(0.2)}>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-bright active:scale-[0.98] transition-all"
              >
                Discuter de ton projet
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-line-strong bg-surface text-text-base font-semibold hover:border-accent active:scale-[0.98] transition-all"
              >
                <WaIcon className="w-5 h-5 text-ok" />
                WhatsApp
              </a>
            </motion.div>
          </div>

          <ul className="relative mt-8 flex flex-wrap justify-center gap-2 lg:static lg:mt-0" aria-label="En bref">
            {facts.map((content, i) => (
              <motion.li key={i} className={`lg:absolute ${FACT_POSITIONS[i]}`} {...fade(0.35 + i * 0.12)}>
                <div className={`${factCard} ${FACT_TILTS[i]}`}>{content}</div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Pastilles colorées sous le hero */}
        {/* « Local, à Rouen » retiré : doublon de la carte « Rouen et alentours » */}
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-10 lg:mt-4">
          {FEATURES.map((f) => (
            <li
              key={f.label}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium ${f.tone}`}
            >
              <Icon d={f.icon} />
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
