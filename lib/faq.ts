// Questions fréquentes : liste complète sur /offre#faq, sélection de 3 sur l'accueil.
export const FAQ = [
  {
    q: 'Combien de temps pour livrer mon site ?',
    a: 'Entre 5 et 10 jours après réception de tes contenus, selon le forfait. Le Starter est livré en 5 jours, le Premium en 10 jours. Je te tiens informé à chaque étape.',
  },
  {
    q: "Je n'ai ni logo ni contenu, c'est un problème ?",
    a: "Pas du tout. Je t'accompagne pour les textes, je peux créer un logo simple et te guider pour les photos. Tu n'as pas besoin d'être expert — c'est mon rôle.",
  },
  {
    q: 'Mon site sera-t-il optimisé pour mobile ?',
    a: "Oui, à 100%. Tous mes sites sont pensés mobile-first : la majorité de tes visiteurs viennent de TikTok et Instagram, donc l'expérience téléphone est ma priorité.",
  },
  {
    q: 'Pourrai-je modifier mon site moi-même ?',
    a: "Oui. Je peux te livrer une solution facile à modifier et te former. Si tu préfères ne pas t'en occuper, la maintenance à 30 €/mois, sans engagement, couvre les petites modifications (textes, photos, horaires) jusqu'à 30 min par mois.",
  },
  {
    q: 'Comment se passe le paiement ?',
    a: "Un acompte au démarrage du projet, puis le solde à la livraison, après les 2 séries de retouches incluses. Paiement en deux fois, sans frais.",
  },
]

export type FaqEntry = (typeof FAQ)[number]

/** Accueil : logo/contenu, mobile, modifier soi-même (délai et paiement sont déjà dans « Comment ça se passe ») */
export const HOME_FAQ = [FAQ[1], FAQ[2], FAQ[3]]
