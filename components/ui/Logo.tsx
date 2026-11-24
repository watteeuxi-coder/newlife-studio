import Link from 'next/link'
import { logoFont } from '@/lib/fonts'

/**
 * Logo NEWLIFE (piste A, 2026-11-24) : symbole « N » + flèche cyan, puis « NEWLIFE » (Space Grotesk 700)
 * et « STUDIO » plus fin et espacé.
 * - `light` (défaut) : pour fond clair — N et texte en couleur texte.
 * - `dark` : version inversée pour fond sombre — N et texte en blanc.
 * Couleurs d'identité du logo (mêmes que les icônes, scripts/generate-icons.mjs) : cyan #06b6d4, fond sombre #0b1220.
 */
const LOGO_CYAN = '#06b6d4'

export function LogoSymbol({ className }: { className?: string }) {
  // viewBox recadré sur le symbole (trait compris) : le dessin d'origine est en 0 0 84 84
  return (
    <svg viewBox="18 16 56 52" className={className} aria-hidden="true">
      <path d="M24 62V24l36 38V30" fill="none" stroke="currentColor" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 30l8-8 8 8" fill="none" stroke={LOGO_CYAN} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Logo({ variant = 'light', className = '' }: { variant?: 'light' | 'dark'; className?: string }) {
  const main = variant === 'dark' ? 'text-white' : 'text-text-base'
  const sub = variant === 'dark' ? 'text-white' : 'text-text-dim'
  return (
    <Link href="/" className={`inline-flex items-center gap-2 shrink-0 ${className}`} aria-label="NEWLIFE STUDIO — Accueil">
      <LogoSymbol className={`w-7 h-[26px] ${main}`} />
      <span className={`${logoFont.className} flex items-baseline gap-1.5 leading-none`}>
        <span className={`${main} text-[17px] font-bold tracking-tight`}>NEWLIFE</span>
        <span className={`${sub} text-[11px] font-normal tracking-[0.28em]`}>STUDIO</span>
      </span>
    </Link>
  )
}
