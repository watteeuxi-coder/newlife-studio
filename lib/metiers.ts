/**
 * Pages par métier (/site-web-<métier>-rouen). Règle : rien d'inventé.
 * Prix, délais et contenus des formules = lib/forfaits.ts ; démos = lib/projects.ts (pas des clients).
 * Chaque page a son angle, ses listes et sa FAQ : pas de texte où seul le métier change.
 */
export type MetierFormule = 'Starter' | 'Pro' | 'Premium' | 'Sur-mesure'

export interface Metier {
  slug: string
  /** Nom court, pour les liens (footer, accueil) */
  label: string
  /** Pour le fil d'Ariane et les données structurées */
  serviceName: string
  seo: { title: string; description: string }
  kicker: string
  h1: string
  intro: string
  probleme: { title: string; text: string }
  contenu: { title: string; intro?: string; items: string[] }
  /** Slug de la démo (lib/projects.ts) ; absent = pas encore de démo pour ce métier */
  demo?: string
  demoText: { title: string; text: string }
  formule: { name: MetierFormule; why: string; alt?: string }
  envoi: string[]
  faq: { q: string; a: string }[]
}

export const METIERS: Metier[] = [
  {
    slug: 'site-web-barbershop-rouen',
    label: 'Barbershop',
    serviceName: 'Site web pour barbershop',
    seo: {
      title: 'Site web pour barbershop à Rouen',
      description:
        'Site web pour barbershop ou salon de coiffure à Rouen : prestations et prix, réservation par WhatsApp, horaires, galerie. Formule Pro dès 499 €, démo en ligne.',
    },
    kicker: 'Site web · Barbershop',
    h1: 'Ton barbershop à Rouen, réservé en un message',
    intro:
      'Tes clients te trouvent sur Instagram, puis t’écrivent pour connaître tes prix et tes dispos. Ton site met tout au même endroit, avec un bouton qui ouvre WhatsApp pour réserver.',
    probleme: {
      title: 'Les DM entre deux coupes',
      text: 'Un client te demande tes tarifs, un autre s’il reste une place samedi, un troisième ton adresse. Tu réponds quand tu peux, entre deux coupes. Les messages s’empilent, certains restent sans réponse, et un client qui attend trop va chez le voisin.',
    },
    contenu: {
      title: 'Ce que contient ton site',
      items: [
        'Tes prestations avec leur durée et leur prix',
        'Un bouton « Réserver » qui ouvre WhatsApp avec un message prêt',
        'Tes horaires et ton adresse visibles dès l’accueil',
        'Une galerie de tes coupes',
        'Google Maps, pour trouver ton salon sans chercher',
        'Un lien prêt à mettre dans ta bio Instagram et TikTok',
      ],
    },
    demo: 'the-fade-room',
    demoText: {
      title: 'La démo : The Fade Room',
      text: 'Un barbershop fictif que j’ai construit pour montrer ce type de site : 4 pages, 7 prestations avec durée et prix, réservation par WhatsApp, galerie en mosaïque.',
    },
    formule: {
      name: 'Pro',
      why: 'Accueil, prestations, galerie et contact tiennent dans les 5 pages de la formule Pro, avec Google Maps et tes réseaux sociaux.',
      alt: 'Une seule page te suffit (prestations, horaires, bouton Réserver) ? La formule Starter, à partir de 299 €.',
    },
    envoi: [
      'La liste de tes prestations, avec durée et prix',
      'Des photos de tes coupes (prises au téléphone, ça marche)',
      'Tes horaires et ton adresse',
      'Ton Instagram ou ton TikTok, si tu en as un',
    ],
    faq: [
      {
        q: 'Je peux avoir un agenda de réservation en ligne ?',
        a: 'Oui, en sur-mesure : la prise de rendez-vous est sur devis. Le bouton qui ouvre WhatsApp pour réserver, lui, est inclus dans toutes les formules.',
      },
      {
        q: 'Je n’ai pas de belles photos de mes coupes.',
        a: 'Je te guide pour les prendre au téléphone : lumière, cadrage, fond. Tu peux aussi commencer avec ce que tu as déjà posté sur Instagram.',
      },
      {
        q: 'Et si je change mes prix ?',
        a: 'Tu peux les modifier toi-même, je t’explique comment. Ou c’est compris dans la maintenance à 30 €/mois (petites modifications jusqu’à 30 min par mois).',
      },
    ],
  },
  {
    slug: 'site-web-artisan-rouen',
    label: 'Artisan',
    serviceName: 'Site web pour artisan',
    seo: {
      title: 'Site web pour artisan à Rouen',
      description:
        'Site web pour artisan à Rouen et alentours : tes chantiers en photos, ta zone d’intervention et un formulaire de demande de devis. Formule Pro dès 499 €.',
    },
    kicker: 'Site web · Artisan',
    h1: 'Artisan à Rouen : un site qui montre ton travail et reçoit tes demandes de devis',
    intro:
      'Avant d’appeler un artisan, on veut voir ses chantiers et savoir s’il intervient dans sa commune. Ton site répond à ces deux questions, et le client t’envoie sa demande de devis avec les bonnes infos.',
    probleme: {
      title: 'Le bouche-à-oreille ne suffit plus',
      text: 'Un voisin donne ton nom, la personne te cherche sur Google… et ne trouve qu’un numéro, sans photo ni zone d’intervention. Elle ne sait pas si tu fais ce type de travaux ni si tu viens chez elle. Dans le doute, elle appelle quelqu’un qui a un site.',
    },
    contenu: {
      title: 'Ce que contient ton site',
      items: [
        'Tes réalisations en photos, avant et après quand tu les as',
        'Une page par type de travaux que tu fais',
        'Ta zone d’intervention, commune par commune',
        'Un formulaire de demande de devis : type de travaux, commune, délai souhaité',
        'Ton numéro en un clic depuis le téléphone',
        'Tes assurances et qualifications, uniquement celles que tu me fournis',
      ],
    },
    demoText: {
      title: 'Pas encore de démo artisan',
      text: 'Je préfère te le dire : je n’ai pas encore construit de démo pour un artisan. Mes trois concepts te montrent le niveau de finition, la galerie photo et les formulaires que je mets en place.',
    },
    formule: {
      name: 'Pro',
      why: 'Jusqu’à 5 pages : accueil, 2 ou 3 pages pour tes types de travaux, tes réalisations et le contact. Formulaire avancé et Google Maps inclus.',
      alt: 'Beaucoup de métiers différents à présenter ? La formule Premium va jusqu’à 10 pages, à partir de 799 €.',
    },
    envoi: [
      'Des photos de tes chantiers (avant et après si tu en as)',
      'La liste des travaux que tu fais',
      'Les communes où tu interviens',
      'Tes assurances et qualifications, si tu veux les afficher',
    ],
    faq: [
      {
        q: 'Je peux ajouter mes nouveaux chantiers moi-même ?',
        a: 'Oui, je peux te livrer un site où tu ajoutes tes photos, et je t’explique comment faire. Sinon, la maintenance à 30 €/mois couvre les petites modifications, jusqu’à 30 min par mois.',
      },
      {
        q: 'Je n’ai pas de photos « avant » de mes chantiers.',
        a: 'Pas grave : on commence avec les photos de tes réalisations terminées. Pour les prochains chantiers, pense à prendre une photo avant de commencer.',
      },
      {
        q: 'J’interviens aussi en dehors de Rouen.',
        a: 'Ta zone d’intervention, c’est toi qui la donnes : on affiche toutes les communes où tu te déplaces.',
      },
    ],
  },
  {
    slug: 'site-web-coach-sportif-rouen',
    label: 'Coach sportif',
    serviceName: 'Site web pour coach sportif',
    seo: {
      title: 'Site web pour coach sportif à Rouen',
      description:
        'Site web pour coach sportif à Rouen : ta méthode, tes formules et tes prix, un formulaire selon l’objectif, un lien pour ta bio Instagram. Démo en ligne.',
    },
    kicker: 'Site web · Coach sportif',
    h1: 'Coach sportif à Rouen : un lien en bio qui trie les demandes sérieuses',
    intro:
      'Tes abonnés veulent savoir comment tu travailles et combien ça coûte avant de t’écrire. Ton site leur répond, et le formulaire te dit tout de suite quel objectif a la personne.',
    probleme: {
      title: 'Toujours les mêmes questions en DM',
      text: '« C’est combien ? », « Tu fais du suivi à distance ? », « Ça marche pour perdre du poids ? ». Tu réponds aux mêmes questions plusieurs fois par jour, et les personnes vraiment motivées se perdent au milieu des curieux.',
    },
    contenu: {
      title: 'Ce que contient ton site',
      items: [
        'Ta méthode, étape par étape',
        'Tes formules avec leurs prix',
        'Un formulaire où la personne choisit son objectif',
        'Les questions fréquentes, avec tes réponses',
        'Des avant/après, uniquement avec l’accord écrit de tes clients',
        'Tes réseaux sociaux reliés au site',
      ],
    },
    demo: 'alex-fit',
    demoText: {
      title: 'La démo : Alex Fit',
      text: 'Un coach fictif que j’ai construit pour montrer ce type de site : 3 formules avec leurs prix, une méthode en 4 étapes, une galerie avant/après filtrable par objectif et un formulaire qui envoie vraiment les demandes par email.',
    },
    formule: {
      name: 'Pro',
      why: 'Design animé, formulaire avancé et intégration de tes réseaux : c’est ce que contient la formule Pro, sur 5 pages maximum.',
      alt: 'Tu veux juste une page à mettre en bio ? La formule Starter, à partir de 299 €.',
    },
    envoi: [
      'Ta méthode, avec tes mots',
      'Tes formules et tes tarifs',
      'Des photos de toi en séance',
      'Des transformations, seulement si tes clients ont donné leur accord',
    ],
    faq: [
      {
        q: 'Mes clients peuvent prendre rendez-vous et payer en ligne ?',
        a: 'C’est du sur-mesure : prise de rendez-vous et paiement en ligne sont sur devis. Toutes les formules incluent le formulaire et le bouton WhatsApp.',
      },
      {
        q: 'Je n’ai pas d’avant/après à montrer.',
        a: 'Ce n’est pas obligatoire. Ta méthode, tes formules et des photos de toi en séance suffisent pour commencer. On ajoute des transformations plus tard, avec l’accord de tes clients.',
      },
      {
        q: 'Et si je change mes formules ?',
        a: 'Tu peux les modifier toi-même, je t’explique comment. Ou c’est compris dans la maintenance à 30 €/mois.',
      },
    ],
  },
  {
    slug: 'site-web-agent-immobilier-rouen',
    label: 'Agent immobilier',
    serviceName: 'Site web pour agent immobilier',
    seo: {
      title: 'Site web pour agent immobilier à Rouen',
      description:
        'Site web pour agent ou mandataire immobilier à Rouen : ton secteur, tes biens, des demandes déjà détaillées. Outil de tri des dossiers locataires sur devis.',
    },
    kicker: 'Site web · Immobilier',
    h1: 'Agent immobilier à Rouen : ton secteur, tes biens et des demandes déjà détaillées',
    intro:
      'Deux besoins différents : te présenter et montrer tes biens, c’est un site vitrine. Gagner du temps sur les dossiers locataires, c’est un outil sur mesure. Je fais les deux.',
    probleme: {
      title: 'Des demandes sans les infos utiles',
      text: 'Un contact écrit « Le bien est toujours dispo ? », sans dire s’il veut acheter, vendre ou louer, ni son budget. Tu dois le relancer pour tout savoir. Pour une location, il faut en plus réunir revenus, contrat et garant avant même de proposer une visite.',
    },
    contenu: {
      title: 'Ton site vitrine',
      intro: 'Pour te présenter et recevoir des demandes claires :',
      items: [
        'Ta présentation et le secteur que tu couvres',
        'Une sélection de tes biens, que tu mets à jour ou que je mets à jour avec la maintenance',
        'Un formulaire où le visiteur décrit son projet : achat, vente ou location',
        'Ton numéro en un clic',
        'Les mentions obligatoires de ta profession, avec les infos que tu me fournis',
      ],
    },
    demo: 'elite-immo',
    demoText: {
      title: 'L’outil sur mesure : la démo Elite Immo',
      text: 'Pour aller plus loin, sur devis : un assistant pose les questions au futur locataire, monte son dossier et le note. Tu retrouves les dossiers dans un tableau de bord, avec le suivi des prospects et un agenda des visites. Elite Immo est une agence fictive que j’ai construite pour le montrer.',
    },
    formule: {
      name: 'Pro',
      why: 'Pour le site vitrine : présentation, secteur, biens et contact tiennent dans les 5 pages de la formule Pro, avec Google Maps et formulaire avancé.',
      alt: 'L’assistant, le tableau de bord et l’agenda de la démo sont du sur-mesure : on en parle et je te fais un devis.',
    },
    envoi: [
      'Ton secteur et ta présentation',
      'Tes biens actuels, avec photos et descriptions',
      'Ta carte professionnelle et tes mentions légales',
      'Ce qui te prend le plus de temps aujourd’hui, si tu penses à l’outil sur mesure',
    ],
    faq: [
      {
        q: 'Le site se met à jour tout seul avec mes annonces sur les portails ?',
        a: 'Non, ce n’est pas inclus. Je peux mettre des liens vers tes annonces, et tes biens se mettent à jour à la main, par toi ou avec la maintenance.',
      },
      {
        q: 'Je suis mandataire, pas en agence. Ça marche aussi ?',
        a: 'Oui. Le site te présente toi, ton secteur et tes biens, avec les mentions que tu me donnes.',
      },
      {
        q: 'Combien coûte l’outil de tri des dossiers ?',
        a: 'Ça dépend de ce dont tu as besoin : on en parle, et je te fais un devis. Le site vitrine seul démarre à 499 € avec la formule Pro.',
      },
    ],
  },
]

export const getMetier = (slug: string) => METIERS.find((m) => m.slug === slug)
