'use client'

import { motion } from 'framer-motion'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useCountUp } from '@/hooks/useCountUp'
import { waLink } from '@/lib/config'

const STATS = [
  { target: 3, suffix: '+', label: 'Projets livrés' },
  { target: 100, suffix: '%', label: 'Clients satisfaits' },
  { target: 5, suffix: 'j', label: 'Délai moyen' },
]

const CONSOLE_LINES = [
  { prefix: '$', text: 'newlife init --client', ok: false },
  { prefix: '›', text: 'Analyse de ton business...', ok: false },
  { prefix: '›', text: 'Design sur mesure', ok: true },
  { prefix: '›', text: 'Optimisation mobile', ok: true },
  { prefix: '›', text: 'SEO & vitesse', ok: true },
]

const CONSOLE_BARS = [40, 62, 48, 80, 70, 95, 88]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }
}

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, ref] = useCountUp(target)
  return (
    <div ref={ref as any}>
      <div className="text-xl font-bold text-accent">{count}{suffix}</div>
      <div className="text-xs text-text-muted mt-0.5">{label}</div>
    </div>
  )
}

export default function Hero() {
  const text = useTypewriter()
  const wa = waLink()

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Aurora background blobs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-aurora-1" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/[0.08] blur-[100px] animate-aurora-2" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-accent/[0.06] blur-[80px] animate-aurora-3" />
      </div>

      <div className="wrap relative w-full" style={{ zIndex: 2 }}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-16">

          {/* Left col */}
          <div className="flex-1 max-w-2xl">
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent mb-6"
              {...fadeUp(0)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Studio web freelance · Propulsé par l&rsquo;IA
            </motion.span>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-text-base mb-6"
              {...fadeUp(0.1)}
            >
              On donne une{' '}
              <span className="grad-text">nouvelle vie</span>
              {' '}à ton business en ligne
            </motion.h1>

            <motion.p
              className="text-lg text-text-dim min-h-[1.75rem] mb-8"
              {...fadeUp(0.2)}
            >
              {text}
              <span className="cursor" aria-hidden="true" />
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              {...fadeUp(0.3)}
            >
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-void font-semibold hover:bg-accent-bright transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
                </svg>
                Discuter sur WhatsApp
              </a>
              <a
                href="#forfaits"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-text-dim hover:border-accent/50 hover:text-text-base transition-colors"
              >
                Voir les forfaits →
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-8"
              {...fadeUp(0.4)}
            >
              {STATS.map((s) => (
                <StatCounter key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
              ))}
            </motion.div>
          </div>

          {/* Right col — glass console (hidden on mobile) */}
          <motion.div
            className="hidden lg:block flex-shrink-0 w-[340px]"
            {...fadeUp(0.2)}
          >
            <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.08)]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              {/* Console body */}
              <div className="p-5 font-mono text-sm space-y-2">
                {CONSOLE_LINES.map((l, i) => (
                  <div key={i} className="flex items-center gap-2 text-text-dim">
                    <span className="text-accent w-3">{l.prefix}</span>
                    <span>{l.text}</span>
                    {l.ok && (
                      <span className="ml-auto text-green-400">✓</span>
                    )}
                  </div>
                ))}
                {/* Bar chart */}
                <div className="flex items-end gap-1.5 pt-3 h-16">
                  {CONSOLE_BARS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-accent/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
