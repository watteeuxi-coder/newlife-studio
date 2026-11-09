// Choix du formulaire de contact (mêmes noms que les forfaits de /offre). Partagé entre le formulaire et l'API.
export const FORMULES = ['Je ne sais pas encore', 'Starter', 'Pro', 'Premium'] as const

export type Formule = (typeof FORMULES)[number]

export function isFormule(value: unknown): value is Formule {
  return typeof value === 'string' && (FORMULES as readonly string[]).includes(value)
}

/** Valeur de ?formule= dans l'URL de /contact (ex. « Pro » → « pro ») */
export function formuleSlug(formule: Formule): string {
  return formule.toLowerCase()
}

/** ?formule=pro → « Pro ». Absent ou inconnu → « Je ne sais pas encore ». */
export function formuleFromSlug(slug: string | null): Formule {
  return FORMULES.find((f) => f !== FORMULES[0] && formuleSlug(f) === slug?.toLowerCase()) ?? FORMULES[0]
}
