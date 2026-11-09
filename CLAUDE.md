# NEWLIFE STUDIO — Guide projet pour Claude

Site vitrine one-page du studio web freelance NEWLIFE STUDIO. Objectif du site : faire cliquer sur **WhatsApp** ou envoyer le **formulaire de contact**.

## Cible

- Petits commerçants, artisans et indépendants : barbershops, coachs, immobilier, restaurants…
- Ils arrivent surtout via **TikTok et Instagram** → **80 % des visites se font sur mobile**. Le site doit être d'abord pensé, testé et optimisé pour le téléphone.

## Stack

- **Next.js 14.2** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3.4** (tokens dans `tailwind.config.ts`) + classes utilitaires maison dans `app/globals.css` (`.wrap`, `.kicker`, `.section-head`, `.grad-text`, `.bg-grid`, `.noise`)
- **Framer Motion 11** pour les animations (pas de GSAP)
- Polices via `next/font/google`
- Déploiement **Vercel** (`vercel.json` → `framework: nextjs`, pas d'export statique)
- API : `app/api/contact/route.ts` (formulaire email). SEO : `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, metadata dans `app/layout.tsx`
- Config centrale (WhatsApp, email, URL) : `lib/config.ts` → utiliser `waLink()` et `SITE_CONFIG`, jamais de numéro en dur
- Hook : `useScrollReveal` (`hooks/`)

Structure du site (multi-pages, spec `docs/superpowers/specs/2026-11-09-multi-pages-design.md`) :
- `app/layout.tsx` porte le commun : fonds fixes (grille, bruit, `ParticleCanvas` désactivé sur mobile et en reduced-motion), `Header`, `<main>`, `ProjectCta` (bloc « Discuter de ton projet », WhatsApp seul sur `/contact`), `Footer`, bouton WhatsApp flottant.
- Pages : `/` (Hero → Pour qui → aperçu des concepts → Comment ça se passe), `/offre` (Services → Forfaits → Pourquoi → FAQ), `/concepts` (3 démos, `Portfolio.tsx` : pas des clients), `/contact` (formulaire), `/a-propos`, `/mentions-legales`, `/confidentialite` (en préparation, noindex, hors sitemap).
- Données des démos : `lib/projects.ts` (partagées entre `/concepts` et l'accueil).
- Infos réelles validées par l'utilisateur : livré en 5 à 10 jours **après réception des contenus**, selon la formule ; réponse sous 24h ; acompte au démarrage, solde à la livraison ; **2 séries de retouches incluses** ; zone Rouen et alentours.
- Textes de `/a-propos`, `/mentions-legales`, `/confidentialite` : `lib/content.ts`. Un champ à `null` = info pas encore fournie → la page reste « en préparation » (noindex, hors sitemap) ; dès que tout est rempli, elle s'affiche et devient indexable automatiquement.
- Formules du formulaire de contact : `lib/formules.ts` (validées aussi côté API, transmises dans l'email).
- Liste des pages : `lib/nav.ts`. Metadata d'une page : `pageMetadata()` de `lib/seo.ts`. Un seul h1 par page (prop `titleAs="h1"` sur la première section). La 1re section d'une page (hors hero) reçoit une marge haute qui compense le header fixe (`globals.css`).

## Palette (exacte)

| Token Tailwind | Hex | Usage |
|---|---|---|
| `void` | `#05070d` | Fond principal (body, `themeColor`) |
| `void-2` | `#070b14` | Fond secondaire |
| `night` | `#0b1120` | Surfaces / cartes sombres |
| `night-2` | `#0e1729` | Surfaces variante |
| `accent` | `#22d3ee` | Couleur de marque (cyan) : CTA, kickers, icônes |
| `accent-bright` | `#7df0ff` | Hover des CTA, milieu du dégradé `.grad-text` |
| `accent-deep` | `#0a7d92` | Accent foncé |
| `text-base` | `#e9eef7` | Texte principal |
| `text-dim` | `#aab6cc` | Texte secondaire / paragraphes |
| `text-muted` | `#6f7e98` | Légendes, labels |

- Variable CSS `--accent-rgb: 34, 211, 238` pour les `rgba()` (glows, sélection, focus).
- Surfaces en verre : `bg-white/[0.03–0.06]` + `border-white/[0.08–0.10]`, hover `border-accent/30`.
- Dégradé `.grad-text` : `linear-gradient(135deg, #22d3ee, #7df0ff, #22d3ee)` sur 1–2 mots clés par titre.
- Couleurs hors palette tolérées seulement dans les placeholders de la section Concepts (`Portfolio.tsx`).

## Polices (exactes)

- **Space Grotesk** → `--font-display` → `font-display` (tout le site, titres et texte)
- **JetBrains Mono** → `--font-mono` → `font-mono` (numéros `01/02/03`, détails « techniques »)
- Les fichiers `app/fonts/Geist*.woff` sont des restes du template, non utilisés.

## Animations existantes

- Entrée : fade + `y: 28–30 → 0`, durée 0.6–0.65 s, ease `[0.22, 1, 0.36, 1]`, stagger 0.07–0.12 s, `whileInView` avec `once: true, margin: '-10% 0px'`
- Hero : blobs « aurora » (1 seul sur mobile), sous-titre fixe, 3 engagements (Livré en 5 à 10 jours · Réponse sous 24h · Paiement en 2 fois)
- Services : halo radial qui suit le pointeur, `whileHover scale 1.02`
- Pourquoi : orbe à anneaux qui tournent
- `prefers-reduced-motion` respecté (scroll, particules) → à respecter sur toute nouvelle animation
- Spec motion design validée mais **pas encore implémentée** : `docs/superpowers/specs/2026-10-07-motion-design-design.md` (Lenis, KineticHeading, Marquee, TiltReveal, hero 3D)

## Ton des textes

- **Tutoiement** systématique envers le visiteur (« ton business », « tu n'as plus à t'en occuper »). Le studio parle en « on ».
- **Direct** : phrases courtes, pas de jargon technique, pas de superlatifs creux.
- **Orienté résultats** pour petits commerçants et indépendants : plus de clients, réservations en ligne, visible sur Google, livré vite, prix clair. Parler du bénéfice avant la technique.
- Français correct avec apostrophes typographiques (`&rsquo;` dans le JSX).

## Skills à utiliser sur ce projet

| Skill | Pour quoi |
|---|---|
| `superpowers:brainstorming` | Avant toute nouvelle section, refonte ou fonctionnalité : cadrer l'intention et valider la direction |
| `superpowers:writing-plans` / `executing-plans` | Découper un chantier en étapes (une modification à la fois) |
| `design:design-critique` | Avis critique sur une section ou une maquette (hiérarchie, lisibilité, effet « template ») |
| `design:ux-copy` | Copywriting : titres, CTA, microcopy, FAQ, dans le ton défini ci-dessus |
| `design:accessibility-review` | Contrastes, focus, aria, navigation clavier, reduced-motion |
| `design:design-system` | Garder les tokens (couleurs, espacements, composants) cohérents |
| `vercel:nextjs` | App Router, metadata/SEO technique, images, routes API |
| `vercel:react-best-practices` | Relecture qualité des composants TSX après modification |
| agent `vercel:performance-optimizer` | Core Web Vitals, poids des animations sur mobile, Lighthouse |
| `claude-in-chrome` / `run` | Lancer le site et vérifier visuellement en **largeur mobile** (375 px) puis desktop |
| `superpowers:verification-before-completion` | Vérifier (`npm run build`, rendu) avant d'annoncer qu'un changement est fini |
| `superpowers:systematic-debugging` | En cas de bug ou de build cassé |
| `vercel:deploy` | Déployer en preview / prod (seulement si demandé) |

Pas de skill SEO dédié installé : le SEO passe par `vercel:nextjs` (metadata, sitemap, OG) + `design:ux-copy` (textes).

## Règles de travail

1. **Mobile d'abord.** Concevoir et vérifier à 375 px avant le desktop. Pas d'effet lourd (blur géant, canvas, 3D) sur mobile.
2. **Une modification à la fois.** Un changement ciblé, vérifié, puis on passe au suivant. Pas de refonte globale non demandée.
3. **Interdit : inventer des clients, des avis, des chiffres ou des résultats.** Pas de témoignages, notes, statistiques, nombre de clients, résultats obtenus ou badges du type « Le plus choisi » sans info réelle fournie par l'utilisateur. **Si une info réelle manque, la demander** plutôt que mettre un placeholder crédible. Faux témoignages, compteurs et badge « Le plus choisi » retirés le 2026-11-09 : ne pas les réintroduire.
4. **Éviter les designs qui font « template IA ».** Pas de sections génériques à 3 cartes identiques en série, d'emojis décoratifs, de dégradés violets, de textes vagues (« solutions innovantes »), d'icônes posées partout. Préférer des choix affirmés, du contenu réel (vraies captures, vrais projets) et une hiérarchie claire.
5. **Expliquer chaque modification en 2–3 phrases** : ce qui a changé, où, et pourquoi.
6. Réutiliser les tokens et classes existants plutôt que d'ajouter des couleurs ou des valeurs en dur.

## Workflow Git

- Travailler sur la branche **`refonte`**, jamais directement sur `main`.
- **Avant chaque push** : tester en local (`npm run dev`) en largeur mobile (375 px) **et** vérifier que la console du navigateur n'affiche aucune erreur. Lancer aussi `npm run build`.
- **Ne fusionner dans `main`** qu'une fois l'étape validée par l'utilisateur.
