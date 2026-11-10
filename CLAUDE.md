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
- Animations d'apparition : `revealHead` / `revealItem(i)` de `lib/motion.ts` (pas de valeurs en dur dans les sections)

Structure du site (multi-pages, spec `docs/superpowers/specs/2026-11-09-multi-pages-design.md`) :
- `app/layout.tsx` porte le commun : thème clair (`data-theme="light"`), bruit léger, `Header` (carte flottante), `<main>`, `ProjectCta` (bloc « Discuter de ton projet », WhatsApp seul sur `/contact`), `Footer`, bouton WhatsApp flottant. Page 404 : `app/not-found.tsx` (noindex).
- Pages : `/` (Hero → Pour qui → Pourquoi moi → aperçu des concepts → Comment ça se passe → Inclus → 3 questions → Zones), `/offre` (Services → Forfaits (+ Maintenance, Sur-mesure) → FAQ), `/concepts` (3 démos, `Portfolio.tsx` : pas des clients), `/contact` (formulaire), `/a-propos` (`About.tsx` : pastille, « Salut, moi c’est Ilan. », blocs icône + texte dont « Où je travaille » et « Mes engagements », indexée), `/mentions-legales`, `/confidentialite` (en préparation, noindex, hors sitemap).
- Données des démos : `lib/projects.ts` (partagées entre `/concepts` et l'accueil).
- Infos réelles validées par l'utilisateur : livré en 5 à 10 jours **après réception des contenus**, selon la formule ; réponse sous 24h ; acompte au démarrage, solde à la livraison ; **2 séries de retouches incluses** ; zone Rouen et alentours. Prix « à partir de » : Starter 299 €, Pro 499 €, Premium 799 € ; formules empilées (Pro et Premium incluent tout le Starter). **Maintenance 30 €/mois sans engagement** (hébergement et suivi, sauvegardes et mises à jour, petites modifications jusqu'à 30 min/mois, support prioritaire WhatsApp). **Sur-mesure sur devis** (prise de rendez-vous, espace client, automatisations, emails automatiques).
- Données des forfaits et liste « Inclus » : `lib/forfaits.ts`. Questions fréquentes : `lib/faq.ts` (toutes sur /offre, `HOME_FAQ` sur l'accueil).
- Textes de `/a-propos`, `/mentions-legales`, `/confidentialite` : `lib/content.ts`. Un champ à `null` = info pas encore fournie → la page reste « en préparation » (noindex, hors sitemap) ; dès que tout est rempli, elle s'affiche et devient indexable automatiquement.
- Formules du formulaire de contact : `lib/formules.ts` (validées aussi côté API, transmises dans l'email). Les boutons des forfaits mènent à `/contact?formule=starter|pro|premium|maintenance|sur-mesure`, qui présélectionne la formule (absent ou inconnu → « Je ne sais pas encore »).
- Email reçu : `lib/contact-email.ts` — email du prospect en `reply_to` + lien mailto, téléphone en lien `tel:`.
- Liste des pages : `lib/nav.ts`. Metadata d'une page : `pageMetadata()` de `lib/seo.ts`. Title de page < 60 caractères (suffixe « — NEWLIFE STUDIO » compris), description 140–160, « Rouen » quand c'est pertinent.
- Données structurées : `lib/schema.ts` (`ProfessionalService` dans le layout, `FAQPage` sur /offre), via `components/layout/JsonLd.tsx`. Infos vraies uniquement, pas d'adresse ni de SIRET tant qu'ils ne sont pas fournis. Les réponses de la FAQ restent dans le HTML même repliées (lisibles par Google). Un seul h1 par page (prop `titleAs="h1"` sur la première section). La 1re section d'une page (hors hero) reçoit une marge haute qui compense le header fixe (`globals.css`).

## Palette (exacte) — thème clair, tout le site

Couleurs en variables CSS (`app/globals.css`, bloc `[data-theme='light']`) exposées comme tokens Tailwind. Toujours utiliser les tokens (`text-text-*`, `bg-surface`, `border-line`, `border-line-strong`, `bg-void`, `text-accent`, `bg-accent text-white`), jamais `white/x` ni d'hex en dur. (Les valeurs de `:root` sont l'ancien thème sombre, plus utilisé.)

| Token | Hex | Usage | Contraste |
|---|---|---|---|
| `void` | `#FAFAF7` | Fond (body, `themeColor`) | — |
| `surface` / `night` | `#FFFFFF` | Cartes, champs | — |
| `text-base` | `#0B1220` | Texte principal | 17,9:1 |
| `text-dim` | `#3D4A5C` | Paragraphes | 8,6:1 |
| `text-muted` | `#5B6779` | Légendes, placeholders | 5,5:1 |
| `accent` | `#0E7490` (cyan-strong) | Liens, accents, bouton principal (texte blanc 5,4:1) | 5,1:1 |
| `accent-bright` | `#155E75` | Survol | 7,3:1 |
| `accent-brand` | `#22D3EE` | Cyan d'identité : **déco uniquement**, jamais du texte | 1,7:1 |
| `line` | `#E3E7EB` | Séparateurs, bordures de cartes | déco |
| `line-strong` | `#8A94A3` | Bordures des champs et boutons secondaires | 3,1:1 |
| `ok` / `ok-text` | `#16A34A` / `#15803D` | Disponibilité, score | 3,3 / 5,0:1 |
| `pill-{cyan,green,amber,rose,blue,lime}-{bg,line,text}` | — | Pastilles douces (texte ≥ 5,2:1, pas d'opacité réduite) | ✅ |
| erreurs | `text-red-700` | Messages d'erreur du formulaire | ✅ |

**Fonds de section** (classes `tone-*`, alterner sans jamais deux identiques à la suite) : **pas de ligne de séparation**, chaque section commence par un fondu (96 px, 72 px en mobile) depuis la couleur de la précédente (`--prev`, `globals.css`). Le footer est en `tone-base`.
- `tone-base` (#FAFAF7), `tone-white` (#FFFFFF), `tone-tint` (#F6FCFD + points et halo à 6 % ; contraste vérifié, pire cas 4,6:1).
- Tête de section en 2 colonnes en desktop (titre / intro) : `section-head section-head--split`.
- Cartes : `rounded-2xl border border-line bg-surface shadow-soft`, posées sur `tone-base` ou `tone-tint` de préférence. Ajouter `spot` sur la carte et `spot-group` sur sa grille : halo cyan qui suit la souris (`components/layout/Spotlight.tsx`, desktop sans reduced-motion uniquement). Pas de spotlight sur le bloc final ni sur la carte du formulaire.
- Icônes : **Lucide** (`lucide-react`, version fixée), trait 1.8, dans un carré `w-11 h-11 rounded-xl` teinté avec les couleurs `pill-*` ; étapes « Comment ça se passe » : carré plein `bg-accent text-white` + numéro en filigrane.
- Grille uniquement dans le hero de l'accueil (`.hero-grid`, estompée vers le bas). `.grad-text` = dégradé cyan-strong → cyan-deep sur 1–2 mots clés.

- Accent manuscrit : **Caveat** 700 via `handAccent` de `lib/fonts.ts` (« nouvelle vie » du hero, « Ilan » sur /a-propos), jamais animé (LCP).
- Score du hero : « 90+/100 · Performance mobile (de ce site) », plancher `PERF_FLOOR` dans `lib/config.ts` (choix de l'utilisateur, plus de chiffre exact). Doit rester vrai : remesurer (Lighthouse mobile, médiane de 3) après chaque changement visuel de l'accueil, ≥ 90 obligatoire. Lighthouse mobile : rester > 90 sur chaque page, accessibilité 100.
- Titres de cartes : un niveau sous le titre de leur section (h1 de page → cartes en h2).
- Image de partage `app/opengraph-image.tsx` : thème clair, slogan, « Studio web · Rouen et alentours » (pas de délai ni de mention de l'IA).

## Polices (exactes)

- **Space Grotesk** → `--font-display` → `font-display` (tout le site, titres et texte)
- **JetBrains Mono** → `--font-mono` → `font-mono` (numéros `01/02/03`, détails « techniques »)
- Les fichiers `app/fonts/Geist*.woff` sont des restes du template, non utilisés.

## Animations existantes

- Entrée : `lib/motion.ts` — fondu + `y: 24 → 0`, 0,6 s, ease `[0.22, 1, 0.36, 1]`, cascade 0,08 s entre cartes, `whileInView` `once: true, margin: '-10% 0px'`. Opacity et transform uniquement.
- Changement de page : fondu 0,25 s (`app/template.tsx`, qui porte `<main>`), **jamais au premier chargement** (LCP).
- `<MotionConfig reducedMotion="user">` dans le layout (`MotionProvider`)
- Hero (clair) : slogan « Une *nouvelle vie* pour ton business en ligne » (« nouvelle vie » en Caveat), 4 cartes d'infos en fondu (flottantes en desktop, pastilles en mobile), h1 jamais animé (LCP)
- Services : halo radial qui suit le pointeur, `whileHover scale 1.02`
- `prefers-reduced-motion` respecté (global via MotionConfig, scroll, hero, menu) → à respecter sur toute nouvelle animation
- Spec motion design validée mais **pas encore implémentée** : `docs/superpowers/specs/2026-10-07-motion-design-design.md` (Lenis, KineticHeading, Marquee, TiltReveal, hero 3D)

## Ton des textes

- **Tutoiement** systématique envers le visiteur (« ton business », « tu n'as plus à t'en occuper »).
- **Ilan parle en « je »** (« je te réponds sous 24h », « mes services »). Jamais « on » / « nous » / « notre » pour désigner le studio. « On » reste seulement quand il veut dire *toi et moi* (« On en parle », « on avance ensemble »).
- Slogan neutre : « Une nouvelle vie pour ton business en ligne ». Message WhatsApp pré-rempli : « Bonjour Ilan ! Je viens de ton site et j'aimerais te parler de mon projet. »
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
