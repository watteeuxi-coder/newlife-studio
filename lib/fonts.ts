import { Caveat } from 'next/font/google'

// Police manuscrite des mots en accent (« nouvelle vie » du hero, « Ilan » sur /a-propos)
export const caveat = Caveat({ subsets: ['latin'], weight: ['700'], display: 'swap' })

/** Mot en accent : Caveat cyan foncé, surligné en cyan d'identité */
export const handAccent = `${caveat.className} text-accent text-[1.2em] font-bold leading-none whitespace-nowrap bg-[linear-gradient(transparent_62%,rgba(34,211,238,0.35)_62%)] px-1`
