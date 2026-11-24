/**
 * Contenus fournis par l'utilisateur pour /a-propos, /mentions-legales et /politique-confidentialite.
 * Règle du projet : rien d'inventé. Un champ à `null` = info pas encore fournie.
 * Tant qu'un champ requis est à null, la page affiche « Page en préparation » (noindex, hors sitemap).
 */

// Textes fournis par l'utilisateur le 2026-11-09 (prénom seul, pas de photo)
export const ABOUT = {
  /** Chapô sous le titre : un paragraphe par entrée */
  intro: [
    'Salut, moi c’est Ilan.',
    'Je crée des sites web pour les commerçants, artisans et indépendants de Rouen et ses alentours. Pas des sites tout faits : un site pensé pour ton activité, avec quelqu’un qui te répond vraiment.',
  ] as string[] | null,
  /** Sections titrées : un paragraphe par entrée */
  sections: [
    {
      title: 'Comment tout a commencé',
      paragraphs: [
        'Au début, ce sont des amis qui sont venus me voir. Ils savaient que je créais des sites et m’ont demandé de leur en faire un, pour leur business ou pour un projet perso. À force, j’ai compris que beaucoup de gens avaient besoin d’un site sans savoir par où commencer.',
        'J’ai lancé NEWLIFE STUDIO pour aller plus loin, et aider beaucoup plus de personnes à exister en ligne.',
      ],
    },
    {
      title: 'Ce qui me rend différent',
      paragraphs: [
        'En parallèle de mes projets web, je fais des études de commerce. Ce mélange, c’est ma force : je ne pense pas seulement « joli site », je pense « clients ». Comment ton visiteur te trouve, ce qui lui donne confiance, ce qui le fait t’appeler. Passion du web et sens du commerce, c’est ce que je mets dans chaque projet.',
      ],
    },
    {
      title: 'Comment j’aime travailler',
      paragraphs: [
        'Je ne veux pas que tu te sentes comme un client parmi d’autres. Je veux qu’on bosse comme des potes : tu m’écris quand tu veux, je t’explique tout simplement, sans jargon, et on avance ensemble jusqu’à ce que ton site te ressemble vraiment.',
      ],
    },
    {
      title: 'Où je travaille',
      paragraphs: [
        'Je suis basé autour de Rouen et je travaille avec les pros de Rouen, Franqueville-Saint-Pierre, Bois-Guillaume, Mont-Saint-Aignan, Bihorel et Darnétal. On peut se voir en vrai pour parler de ton projet.',
      ],
    },
  ] as { title: string; paragraphs: string[] }[] | null,
}

/** Date de dernière mise à jour des mentions légales et de la politique de confidentialité (ISO). */
export const LEGAL_UPDATED = '2026-11-24'

/** « 24 novembre 2026 » */
export const formatDateFr = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

// Infos fournies par l'utilisateur le 2026-11-24
export const LEGAL = {
  editeur: {
    /** Nom et prénom, ou raison sociale */
    nom: 'Ilan Figueira Watteeux' as string | null,
    statut: 'entrepreneur individuel (micro-entrepreneur)' as string | null,
    nomCommercial: 'NEWLIFE STUDIO' as string | null,
    siren: '133 281 436' as string | null,
    rcs: 'RCS Rouen' as string | null,
    tva: 'TVA non applicable, art. 293 B du CGI' as string | null,
    adresse: '7 Résidence du Manoir, 76116 Martainville-Épreville, France' as string | null,
  },
  directeurPublication: 'Ilan Figueira Watteeux' as string | null,
  mediation: 'En cours de désignation.' as string | null,
  // Hébergeur trouvé dans le code (vercel.json). Adresse : Privacy Notice de Vercel (vercel.com/legal/privacy-notice).
  hebergeur: {
    nom: 'Vercel Inc.',
    adresse: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis',
    site: 'https://vercel.com',
  },
}

export const PRIVACY = {
  /** Durée de conservation des messages reçus via le formulaire */
  conservation:
    'Le temps de traiter ta demande, puis 3 ans après notre dernier échange. Ensuite, elles sont supprimées.' as string | null,
}

export const aboutReady = (): boolean => ABOUT.intro !== null && ABOUT.sections !== null

export const legalReady = (): boolean =>
  Object.values(LEGAL.editeur).every((v) => v !== null) &&
  LEGAL.directeurPublication !== null &&
  LEGAL.mediation !== null

// La politique de confidentialité nomme le responsable du traitement → dépend aussi des mentions légales
export const privacyReady = (): boolean => legalReady() && PRIVACY.conservation !== null
