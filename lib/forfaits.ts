// Contenu des forfaits (validé par l'utilisateur). Pro et Premium incluent tout le Starter.

/** Socle commun à toutes les formules : section « Inclus » de l'accueil */
export const INCLUDED = [
  { title: 'Design sur mesure', text: 'Fait pour ton activité, pas un modèle recopié.' },
  { title: 'Pensé pour le téléphone', text: 'Tes clients arrivent d’Insta et TikTok, sur mobile.' },
  { title: 'Formulaire de contact', text: 'Tes clients t’écrivent sans quitter ton site.' },
  { title: 'Bouton WhatsApp direct', text: 'Un clic, et la conversation démarre.' },
  { title: '2 séries de retouches', text: 'Tu vois la maquette, je corrige ce que tu veux changer.' },
  { title: 'Paiement en deux fois', text: 'Acompte au démarrage, solde à la livraison.' },
]

export type Plan = {
  name: 'Starter' | 'Pro' | 'Premium'
  /** Prix de départ (« à partir de ») */
  price: string
  tag: string
  /** Formules empilées : « Tout le Starter, plus : » */
  includes: 'Starter' | 'Pro' | null
  features: string[]
  featured: boolean
}

export const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '299 €',
    tag: 'Idéal pour lancer ton activité avec une présence pro.',
    includes: null,
    features: [
      'Site vitrine 1 page',
      'Design sur mesure',
      '100% responsive mobile',
      'Formulaire de contact',
      'Bouton WhatsApp direct',
      'Livraison en 5 jours',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    price: '499 €',
    tag: 'Pour une présence complète qui convertit vraiment.',
    includes: 'Starter',
    features: [
      "Site jusqu'à 5 pages",
      'Design premium animé',
      'SEO de base inclus',
      'Intégration réseaux sociaux',
      'Formulaire avancé + Google Maps',
      'Livraison en 7 jours',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    price: '799 €',
    tag: "L'expérience complète, taillée pour vendre et durer.",
    includes: 'Pro',
    features: [
      'Site complet jusqu’à 10 pages',
      'Animations cinématiques',
      'SEO avancé & optimisation conversion',
      'Accompagnement à la prise en main : je t’explique comment gérer ton site',
      'Livraison en 10 jours',
    ],
    featured: false,
  },
]

export const MAINTENANCE = {
  price: '30 €',
  period: '/mois',
  note: 'Sans engagement',
  features: [
    'Hébergement et suivi',
    'Sauvegardes et mises à jour',
    'Petites modifications (textes, photos, horaires) jusqu’à 30 min par mois',
    'Support prioritaire sur WhatsApp',
  ],
}

export const SUR_MESURE = {
  price: 'Sur devis',
  features: ['Boutique en ligne et paiement', 'Prise de rendez-vous', 'Espace client', 'Automatisations', 'Emails automatiques'],
}
