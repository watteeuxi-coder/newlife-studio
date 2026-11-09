import { SITE_CONFIG } from '@/lib/config'

/**
 * Contenus fournis par l'utilisateur pour /a-propos, /mentions-legales et /confidentialite.
 * Règle du projet : rien d'inventé. Un champ à `null` = info pas encore fournie.
 * Tant qu'un champ requis est à null, la page affiche « Page en préparation » (noindex, hors sitemap).
 */

export const ABOUT = {
  /** Chapô sous le titre (1–2 phrases) */
  intro: null as string | null,
  /** « Qui est derrière NEWLIFE STUDIO » : un paragraphe par entrée */
  story: null as string[] | null,
}

export const LEGAL = {
  editeur: {
    /** Nom et prénom, ou raison sociale */
    nom: null as string | null,
    /** Ex. micro-entreprise, SASU… */
    statut: null as string | null,
    siret: null as string | null,
    adresse: null as string | null,
    email: SITE_CONFIG.email,
  },
  directeurPublication: null as string | null,
  // Le site est déployé sur Vercel. Adresse à confirmer sur https://vercel.com/legal avant publication.
  hebergeur: {
    nom: 'Vercel Inc.',
    adresse: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
    site: 'https://vercel.com',
  },
}

export const PRIVACY = {
  /** Durée de conservation des messages reçus via le formulaire (ex. « 3 ans après le dernier échange ») */
  conservation: null as string | null,
}

export const aboutReady = (): boolean => ABOUT.intro !== null && ABOUT.story !== null

export const legalReady = (): boolean =>
  Object.values(LEGAL.editeur).every((v) => v !== null) && LEGAL.directeurPublication !== null

// La politique de confidentialité nomme le responsable du traitement → dépend aussi des mentions légales
export const privacyReady = (): boolean => legalReady() && PRIVACY.conservation !== null
