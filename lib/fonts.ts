import localFont from 'next/font/local'

/**
 * Police manuscrite des mots en accent (« nouvelle vie » du hero, « Ilan » sur /a-propos).
 * Caveat 700, réduite aux seules lettres utilisées (« nouvelleviIlan » + espace) : 4,9 Ko au lieu de 51 Ko.
 * Fichier obtenu via l'API Google Fonts (paramètre text=), version v23.
 * Caveat — Copyright 2014 The Caveat Project Authors (https://github.com/googlefonts/caveat),
 * SIL Open Font License 1.1 (https://openfontlicense.org) : le découpage et l'usage web sont autorisés.
 * ⚠️ Si un nouveau mot passe en Caveat, régénérer le fichier avec ses lettres, sinon elles s'afficheront
 * dans la police de secours.
 */
export const caveat = localFont({
  src: '../app/fonts/caveat-700-accent.woff2',
  weight: '700',
  style: 'normal',
  display: 'swap',
  preload: true,
})

/** Mot en accent : Caveat cyan foncé, surligné en cyan d'identité */
export const handAccent = `${caveat.className} text-accent text-[1.2em] font-bold leading-none whitespace-nowrap bg-[linear-gradient(transparent_62%,rgba(34,211,238,0.35)_62%)] px-1`
