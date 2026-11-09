/**
 * Sites de démonstration (pas des clients). Utilisés sur /concepts et dans l'aperçu de l'accueil.
 * Pour ajouter un projet : dépose une capture d'écran (1280×832 conseillé)
 * dans public/images/portfolio/ puis ajoute une entrée ici avec `image`.
 * Sans `image`, la carte affiche un placeholder dégradé avec l'initiale.
 */
export interface Project {
  title: string
  cat: string
  url: string
  image?: string
  bg: string
}

export const PROJECTS: Project[] = [
  {
    title: 'The Fade Room',
    cat: 'Barbershop · Réservation en ligne',
    url: 'https://barbershopv2.vercel.app',
    image: '/images/portfolio/barbershop.png',
    bg: 'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.22), transparent 60%), linear-gradient(160deg,#0c1424,#0a0f1c)',
  },
  {
    title: 'Alex Fit',
    cat: 'Salle de sport · Programmes & coaching',
    url: 'https://alex-fit.vercel.app',
    image: '/images/portfolio/alex-fit.png',
    bg: 'radial-gradient(circle at 30% 80%, rgba(94,230,168,0.22), transparent 60%), linear-gradient(160deg,#0a1612,#0a0f1c)',
  },
  {
    title: 'Elite Immo',
    cat: 'Immobilier · Chatbot & génération de leads',
    url: 'https://elite-immo-five.vercel.app',
    image: '/images/portfolio/elite-immo.png',
    bg: 'radial-gradient(circle at 70% 80%, rgba(124,108,255,0.22), transparent 60%), linear-gradient(160deg,#100f1c,#0a0f1c)',
  },
]
