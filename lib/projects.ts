/**
 * Sites de démonstration (pas des clients). Utilisés sur /concepts, dans l'aperçu de l'accueil
 * et sur les pages /concepts/[slug].
 * Règle : « built » ne liste que des fonctionnalités réellement présentes dans le code de la démo
 * (relu le 2026-11-10 : barbershopv2, site sport / alex-fit, ELITE-IMMO).
 * Captures : 1280×832, prises sur les démos en ligne, dans public/images/.
 */
export interface Shot {
  src: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  /** Métier, affiché dans l'en-tête de la page concept */
  metier: string
  /** Métier · fonctionnalité phare (cartes) */
  cat: string
  url: string
  image?: string
  bg: string
  /** Le problème courant de ce métier (pas un client réel) */
  besoin: string
  /** Ce que la démo fait vraiment */
  built: string[]
  /** Captures supplémentaires (la 1re capture est `image`) */
  shots: Shot[]
  /** Pour quel pro de Rouen ce type de site est fait (adressé au visiteur, rien d'inventé) */
  local: { title: string; text: string }
  /** Formule conseillée pour un site de ce type, et pourquoi */
  formule: { name: 'Pro' | 'Sur-mesure'; why: string }
  seo: { title: string; description: string }
}

export const PROJECTS: Project[] = [
  {
    slug: 'the-fade-room',
    title: 'The Fade Room',
    metier: 'Barbershop',
    cat: 'Barbershop · Réservation par WhatsApp',
    url: 'https://barbershopv2.vercel.app',
    image: '/images/portfolio/barbershop.png',
    bg: 'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.22), transparent 60%), linear-gradient(160deg,#0c1424,#0a0f1c)',
    besoin:
      'Tes clients te découvrent sur Instagram, puis t’écrivent en DM pour connaître tes prix, tes horaires et savoir s’il reste une place. Tu réponds entre deux coupes, des messages se perdent, et un client sans réponse va chez le voisin.',
    built: [
      '4 pages : accueil, prestations, galerie, contact',
      'Les 7 prestations avec leur durée et leur prix',
      'Un bouton « Réserver » qui ouvre WhatsApp en un clic',
      'Horaires et adresse visibles dès l’accueil',
      'Galerie photo en mosaïque',
      'Page contact avec formulaire, horaires et téléphone',
      'Site pensé pour le téléphone',
    ],
    shots: [
      { src: '/images/concepts/the-fade-room-prestations.png', alt: 'Page des prestations de The Fade Room : coupes et barbe avec durée, prix et bouton Réserver' },
      { src: '/images/concepts/the-fade-room-contact.png', alt: 'Page contact de The Fade Room : formulaire, adresse et horaires de la semaine' },
    ],
    local: {
      title: 'Pour ton barbershop à Rouen',
      text: 'Tu tiens un barbershop ou un salon de coiffure à Rouen ou dans les alentours ? Ce type de site met tes prestations, tes prix et tes horaires au même endroit, avec un bouton qui ouvre WhatsApp pour réserver. Tu mets le lien dans ta bio Instagram, et tes clients ont leurs réponses avant de t’écrire.',
    },
    formule: {
      name: 'Pro',
      why: 'Accueil, prestations, galerie et contact : 4 pages. La formule Pro va jusqu’à 5 pages et ajoute Google Maps, pour qu’on trouve ton salon facilement.',
    },
    seo: {
      title: 'The Fade Room, concept de site barbershop',
      description:
        'Concept de site pour un barbershop : prestations avec durée et prix, réservation par WhatsApp en un clic, horaires, galerie photo. Une démo à tester en ligne.',
    },
  },
  {
    slug: 'alex-fit',
    title: 'Alex Fit',
    metier: 'Coach sportif',
    cat: 'Coach sportif · Formules & suivi',
    url: 'https://alex-fit.vercel.app',
    image: '/images/portfolio/alex-fit.png',
    bg: 'radial-gradient(circle at 30% 80%, rgba(94,230,168,0.22), transparent 60%), linear-gradient(160deg,#0a1612,#0a0f1c)',
    besoin:
      'Avant d’écrire à un coach, les gens veulent savoir comment il travaille, combien ça coûte et ce que ça donne. Sans site, tout passe par les DM : tu répètes les mêmes réponses, et les demandes sérieuses se perdent au milieu des curieux.',
    built: [
      '4 pages : accueil, transformations, coaching, contact',
      '3 formules présentées avec leurs prix',
      'La méthode en 4 étapes : bilan, plan, entraînement, suivi',
      'Galerie avant/après avec un curseur à glisser, filtrable par objectif',
      'Questions fréquentes en accordéon',
      'Formulaire où le visiteur choisit son objectif ; les demandes arrivent vraiment par email',
      'Animations au scroll et transitions entre les pages',
    ],
    shots: [
      { src: '/images/concepts/alex-fit-formules.png', alt: 'Les 3 formules de coaching d’Alex Fit, Starter, Pro et Elite, avec leur prix mensuel' },
      { src: '/images/concepts/alex-fit-transformations.png', alt: 'Galerie avant/après d’Alex Fit avec filtres par objectif : perte de poids, prise de masse, remise en forme' },
    ],
    local: {
      title: 'Pour ton activité de coach à Rouen',
      text: 'Tu es coach sportif à Rouen ou dans les alentours ? Un site comme celui-ci présente ta méthode, tes formules et tes prix, et le formulaire te dit tout de suite quel objectif a la personne. Tu réponds aux demandes sérieuses, sans répéter les mêmes infos en DM.',
    },
    formule: {
      name: 'Pro',
      why: '4 pages, des animations et un formulaire selon l’objectif : c’est la formule Pro (jusqu’à 5 pages, design animé, formulaire avancé).',
    },
    seo: {
      title: 'Alex Fit, concept de site de coach sportif',
      description:
        'Concept de site pour un coach sportif : formules et prix, méthode en 4 étapes, avant/après filtrables, formulaire selon l’objectif. Une démo à tester en ligne.',
    },
  },
  {
    slug: 'elite-immo',
    title: 'Elite Immo',
    metier: 'Agent immobilier',
    cat: 'Immobilier · Assistant & suivi des prospects',
    url: 'https://elite-immo-five.vercel.app',
    image: '/images/portfolio/elite-immo.png',
    bg: 'radial-gradient(circle at 70% 80%, rgba(124,108,255,0.22), transparent 60%), linear-gradient(160deg,#100f1c,#0a0f1c)',
    besoin:
      'Pour chaque location, les demandes s’accumulent. Il faut demander à chacun ses revenus, son contrat, son garant et sa date d’entrée, puis trier les dossiers et caler les visites. Le tri prend des heures, et les bons dossiers attendent.',
    built: [
      'Un assistant de discussion qui monte le dossier du locataire, question par question : nom, revenus, contrat, garant, date d’entrée, email, téléphone',
      'Un score calculé automatiquement : à partir de 80, le dossier est marqué « qualifié » et une notification arrive',
      'Un tableau de bord : prospects, dossiers qualifiés, visites, graphique d’activité, objectif du mois, dossiers urgents',
      'La liste des prospects avec recherche, filtres et fiche détaillée',
      'Un tableau des tâches à glisser-déposer',
      'Un agenda des visites, en vue mois et semaine',
      'Français et anglais, mode clair et sombre, données enregistrées dans une vraie base de données',
    ],
    shots: [
      { src: '/images/concepts/elite-immo-assistant.png', alt: 'Assistant d’Elite Immo qui pose ses questions au futur locataire pour constituer son dossier' },
      { src: '/images/concepts/elite-immo-agenda.png', alt: 'Agenda des visites d’Elite Immo en vue mois, avec le résumé de la semaine' },
    ],
    local: {
      title: 'Pour ton agence immobilière à Rouen',
      text: 'Tu es agent ou mandataire immobilier à Rouen ou dans les alentours ? Pour présenter tes biens, ton secteur et recevoir des demandes déjà détaillées, un site vitrine suffit. Si tu passes des heures à trier les dossiers locataires, un outil comme celui de cette démo peut faire ce tri pour toi.',
    },
    formule: {
      name: 'Sur-mesure',
      why: 'L’assistant, le tableau de bord et l’agenda de cette démo sont du sur-mesure : on en parle et je te fais un devis. Pour un site vitrine seul, la formule Pro suffit.',
    },
    seo: {
      title: 'Elite Immo, concept pour agent immobilier',
      description:
        'Concept d’outil pour agent immobilier : un assistant constitue et note les dossiers locataires, avec tableau de bord, suivi des prospects et agenda des visites.',
    },
  },
]

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug)
