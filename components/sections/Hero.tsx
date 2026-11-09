'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { waLink, PERF_SCORE } from '@/lib/config'
import { Send, PencilLine } from 'lucide-react'
import WaIcon from '@/components/ui/WaIcon'
import { handAccent } from '@/lib/fonts'


// Cartes d'infos. Mobile : elles encadrent le titre (2 au-dessus du petit texte, 2 sous le lien WhatsApp),
// inclinées en sens opposés et débordant un peu vers les bords. lg : cartes flottantes autour du titre (inchangé).
// La rotation est sur l'élément interne : framer-motion pilote le transform de l'élément externe (fondu).
const FACT_POSITIONS = [
  'lg:left-0 lg:top-6',
  'lg:right-0 lg:top-12',
  'lg:left-6 lg:bottom-4',
  'lg:right-8 lg:bottom-8',
]
const FACT_TILTS = [
  '-rotate-[3deg] lg:-rotate-[4deg]',
  'rotate-[3deg] lg:rotate-[3deg]',
  'rotate-[3deg] lg:rotate-[2deg]',
  '-rotate-[3deg] lg:-rotate-[3deg]',
]

const factCard =
  'flex h-full items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-xs text-text-dim ' +
  'shadow-[0_10px_24px_-14px_rgba(11,18,32,0.28)] ' +
  'lg:inline-flex lg:h-auto lg:rounded-2xl lg:px-4 lg:py-3 lg:gap-3 lg:text-sm lg:shadow-[0_16px_40px_-16px_rgba(11,18,32,0.22)]'

function ScoreRing({ score }: { score: number }) {
  return (
    <span className="relative flex items-center justify-center w-5 h-5 lg:w-11 lg:h-11 shrink-0">
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
  { label: 'Code sur mesure', icon: <Icon d={ICONS.code} />, tone: 'bg-pill-cyan-bg border-pill-cyan-line text-pill-cyan-text' },
  { label: 'Pensé pour mobile', icon: <Icon d={ICONS.phone} />, tone: 'bg-pill-green-bg border-pill-green-line text-pill-green-text' },
]

// Bandeau mobile : les mêmes + 2 infos vraies (inclus dans chaque site, cf. lib/forfaits.ts)
const MARQUEE = [
  ...FEATURES,
  { label: 'Formulaire + WhatsApp', icon: <Send className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />, tone: 'bg-pill-amber-bg border-pill-amber-line text-pill-amber-text' },
  { label: '2 retouches incluses', icon: <PencilLine className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />, tone: 'bg-pill-rose-bg border-pill-rose-line text-pill-rose-text' },
]

const pill = 'inline-flex items-center gap-2 whitespace-nowrap rounded-full border font-medium'

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

  // Textes courts en mobile (lg:hidden), textes complets en desktop (hidden lg:inline) — desktop inchangé
  const facts = [
    <>
      <ScoreRing score={PERF_SCORE} />
      <span className="flex flex-col leading-tight lg:leading-normal">
        <span className="font-semibold text-text-base">{PERF_SCORE}/100</span>
        <span className="lg:hidden">Performance</span>
        <span className="hidden lg:inline lg:text-xs lg:text-text-muted">Performance mobile de ce site</span>
      </span>
    </>,
    <>
      <span className="text-accent"><Icon d={ICONS.clock} /></span>
      <span className="font-medium text-text-base lg:hidden">Livré en 5-10&nbsp;j</span>
      <span className="font-medium text-text-base hidden lg:inline">Livré en 5 à 10 jours</span>
    </>,
    <>
      <span className="flex flex-col items-start leading-tight gap-0.5 lg:leading-normal">
        <span className="font-medium text-text-base lg:hidden">Réponse 24h</span>
        <span className="font-medium text-text-base hidden lg:inline">Réponse sous 24h</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-ok-text">
          <span className="w-2 h-2 rounded-full bg-ok" aria-hidden="true" />
          <span className="lg:hidden">Dispo</span>
          <span className="hidden lg:inline">Dispo pour échanger</span>
        </span>
      </span>
    </>,
    <>
      <span className="text-accent"><Icon d={ICONS.pin} /></span>
      <span className="font-medium text-text-base lg:hidden">Rouen &amp; alentours</span>
      <span className="font-medium text-text-base hidden lg:inline">Rouen et alentours</span>
    </>,
  ]

  // -mx-4 : les cartes débordent un peu vers les bords (la section est en overflow-hidden → pas de défilement horizontal)
  const mobilePair = (idx: [number, number], delay: number, spacing: string) => (
    <ul className={`lg:hidden flex justify-between gap-3 -mx-4 text-left ${spacing}`} aria-label="En bref">
      {idx.map((i, k) => (
        <motion.li key={i} className="flex-1 max-w-[11.5rem]" {...fade(delay + k * 0.12)}>
          <div className={`${factCard} ${FACT_TILTS[i]}`}>{facts[i]}</div>
        </motion.li>
      ))}
    </ul>
  )

  return (
    // pt-20 : place pour le header flottant. Le bas suit l'espacement commun des sections (globals.css).
    <section id="top" className="relative pt-20 overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap relative">
        <div className="relative">
          <div className="relative z-[1] max-w-2xl mx-auto text-center pt-4 sm:pt-14 lg:pt-28 lg:pb-28">
            {/* Mobile : 2 cartes au-dessus du petit texte */}
            {mobilePair([0, 1], 0.3, 'mb-7')}

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

            {/* Mobile : un seul gros bouton, WhatsApp en lien plus léger dessous. Desktop : 2 boutons côte à côte. */}
            <motion.div className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-3" {...fade(0.2)}>
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
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 text-sm font-semibold text-text-base hover:text-accent transition-all lg:min-h-0 lg:px-6 lg:py-3 lg:text-base lg:rounded-full lg:border lg:border-line-strong lg:bg-surface lg:hover:text-text-base lg:hover:border-accent active:scale-[0.98]"
              >
                <WaIcon className="w-5 h-5 text-ok" />
                <span className="lg:hidden">Ou écris-moi sur WhatsApp</span>
                <span className="hidden lg:inline">WhatsApp</span>
              </a>
            </motion.div>

            {/* Mobile : 2 cartes sous le lien WhatsApp */}
            {mobilePair([2, 3], 0.45, 'mt-5')}
          </div>

          {/* Desktop : cartes flottantes autour du titre (inchangé) */}
          <ul className="hidden lg:block" aria-label="En bref">
            {facts.map((content, i) => (
              <motion.li key={i} className={`lg:absolute ${FACT_POSITIONS[i]}`} {...fade(0.35 + i * 0.12)}>
                <div className={`${factCard} ${FACT_TILTS[i]}`}>{content}</div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Desktop : pastilles fixes (inchangé) */}
        <ul className="hidden lg:flex flex-wrap justify-center gap-3 mt-4">
          {FEATURES.map((f) => (
            <li key={f.label} className={`${pill} px-4 py-2 text-sm ${f.tone}`}>
              {f.icon}
              {f.label}
            </li>
          ))}
        </ul>

        {/* Mobile : bandeau qui défile en boucle (CSS, globals.css), 2e copie masquée aux lecteurs d'écran */}
        <div className="marquee lg:hidden mt-6 -mx-6">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex gap-2 pr-2" aria-hidden={copy === 1 ? true : undefined}>
                {MARQUEE.map((f) => (
                  <li key={f.label} className={`${pill} text-xs px-3 py-1.5 ${f.tone}`}>
                    {f.icon}
                    {f.label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
