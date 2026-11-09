'use client'

import { motion } from 'framer-motion'
import { Users, Store, Handshake, MapPin, BadgeCheck, Check, type LucideIcon } from 'lucide-react'
import { revealHead, revealItem } from '@/lib/motion'
import { handAccent } from '@/lib/fonts'

// Icône + couleur de pastille par bloc (dans l'ordre des sections de lib/content.ts, puis les engagements)
const BLOCK_STYLE: Record<string, { Icon: LucideIcon; tone: string }> = {
  'Comment tout a commencé': { Icon: Users, tone: 'bg-pill-cyan-bg border-pill-cyan-line text-pill-cyan-text' },
  'Ce qui me rend différent': { Icon: Store, tone: 'bg-pill-green-bg border-pill-green-line text-pill-green-text' },
  'Comment j’aime travailler': { Icon: Handshake, tone: 'bg-pill-amber-bg border-pill-amber-line text-pill-amber-text' },
  'Où je travaille': { Icon: MapPin, tone: 'bg-pill-rose-bg border-pill-rose-line text-pill-rose-text' },
  'Mes engagements': { Icon: BadgeCheck, tone: 'bg-pill-blue-bg border-pill-blue-line text-pill-blue-text' },
}

type Block = { title: string; paragraphs?: string[]; list?: string[] }

/** /a-propos : « Salut, moi c’est Ilan. » centré, puis blocs icône + texte séparés par une fine ligne. */
export default function About({ greeting, intro, blocks }: { greeting: string; intro: string[]; blocks: Block[] }) {
  // « Salut, moi c’est Ilan. » → « Ilan » en manuscrit
  const [before, after] = greeting.split('Ilan')

  return (
    <section className="tone-base">
      <div className="wrap">
        {/* Le h1 n'est pas animé : c'est l'élément LCP de la page */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <motion.span {...revealHead} className="inline-flex items-center rounded-full border border-pill-cyan-line bg-pill-cyan-bg px-4 py-1.5 text-sm font-medium text-pill-cyan-text mb-6">
            Qui se cache derrière NEWLIFE STUDIO
          </motion.span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-balance text-text-base mb-6">
            {before}
            <span className={handAccent}>Ilan</span>
            {after}
          </h1>
          {intro.map((p) => (
            <motion.p key={p} {...revealItem(1)} className="text-lg text-text-dim leading-relaxed">
              {p}
            </motion.p>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {blocks.map((b, i) => {
            const { Icon, tone } = BLOCK_STYLE[b.title] ?? BLOCK_STYLE['Comment tout a commencé']
            return (
              <motion.div
                key={b.title}
                {...revealItem(i)}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-8 border-t border-line first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className={`flex items-center justify-center w-12 h-12 shrink-0 rounded-xl border ${tone}`} aria-hidden="true">
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </span>
                <div>
                  <h2 className="text-text-base text-xl font-semibold mb-3">{b.title}</h2>
                  <div className="space-y-3 text-text-dim leading-relaxed">
                    {b.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                    {b.list && (
                      <ul className="space-y-2">
                        {b.list.map((c) => (
                          <li key={c} className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-1 text-accent shrink-0" strokeWidth={2.4} aria-hidden="true" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
