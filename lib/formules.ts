// Choix du formulaire de contact (mêmes noms que les forfaits de /offre). Partagé entre le formulaire et l'API.
export const FORMULES = ['Je ne sais pas encore', 'Starter', 'Pro', 'Premium'] as const

export type Formule = (typeof FORMULES)[number]

export function isFormule(value: unknown): value is Formule {
  return typeof value === 'string' && (FORMULES as readonly string[]).includes(value)
}
