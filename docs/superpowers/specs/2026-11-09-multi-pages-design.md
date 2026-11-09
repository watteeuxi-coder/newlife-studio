# Site multi-pages — Design Spec
_Date : 2026-11-09 — branche `refonte`_

## Objectif

Passer du one-page actuel à un site multi-pages, plus clair pour les petits commerçants qui arrivent depuis TikTok/Instagram (mobile d'abord), et mieux référencé (une page = un sujet = un title/description).

Contraintes du `CLAUDE.md` : mobile d'abord (375 px), une modification à la fois, aucun client/avis/chiffre inventé, pas de design « template IA », tutoiement.

**Fusion dans `main` : interdite tant que l'étape 2 (accueil complet) n'est pas validée.**

## Découpage (une étape = un cycle test 375 px → build → push `refonte` → validation)

1. **Socle multi-pages** — layout commun, navigation par pages, `/offre`, `/concepts`, `/contact` avec les sections existantes, metadata par page, sitemap.
2. **Accueil allégé** — hero + engagements, « Pour qui », « Comment ça se passe », aperçu concepts, CTA. Copy détaillée en début d'étape.
3. **Contact enrichi** — menu « Quelle formule t'intéresse ? », transmis dans l'email, WhatsApp, zone Rouen et alentours.
4. **Pages à remplir** — `/a-propos`, `/mentions-legales`, `/confidentialite` : structure seule, textes fournis par l'utilisateur (rien d'inventé, notamment pas d'infos légales).

## Architecture (approche A validée)

Tout ce qui est commun vit dans `app/layout.tsx` :

```
<body>
  fond fixe : .bg-grid, .noise, <ParticleCanvas />
  <Header />
  <main>{children}</main>      ← chaque page ne rend que ses sections
  <ProjectCta />                ← bloc « Discuter de ton projet », identique partout
  <Footer />
  <WhatsAppButton />            ← flottant, mobile
</body>
```

- `ProjectCta` (nouveau, `components/layout/ProjectCta.tsx`) : titre « Discuter de ton projet », bouton WhatsApp + lien « Écrire un message » → `/contact`. Sur `/contact` (détecté via `usePathname`), seul le bouton WhatsApp est affiché.
- Les pages sont des Server Components qui exportent `metadata` et assemblent des sections existantes (`'use client'` reste dans les sections).

## Pages

| Route | Contenu | Étape |
|---|---|---|
| `/` | Hero (+ engagements) ; puis Pour qui, Comment ça se passe, aperçu concepts, CTA | 1 → 2 |
| `/offre` | Services → Forfaits → Pourquoi nous → FAQ | 1 |
| `/concepts` | Section concepts actuelle (3 démos, badge « Démo ») | 1 |
| `/contact` | Section contact actuelle (formulaire + WhatsApp + email) ; puis formule + zone | 1 → 3 |
| `/a-propos`, `/mentions-legales`, `/confidentialite` | Structure, textes à venir | 4 |

La section « Contact » actuelle (`components/sections/Contact.tsx`) sort de l'accueil et devient le contenu de `/contact`.

## Navigation

- Desktop : logo → `/` · Offre · Concepts · À propos · Contact · bouton WhatsApp.
- Mobile (menu plein écran existant, scroll lock iOS conservé) : Accueil · Offre · Concepts · À propos · Contact.
- `next/link` partout ; lien actif : style + `aria-current="page"`.
- Le menu mobile se ferme au changement de page (clic sur un lien et changement de `pathname`) ; le scroll est débloqué **avant** la navigation pour que Next remonte en haut de la nouvelle page.
- Les ancres existantes deviennent des liens de page : « Voir les forfaits » → `/offre#forfaits`, logo/`#top` → `/`.
- `À propos` pointe vers `/a-propos` dès l'étape 1 ; la page existe à l'étape 1 sous forme minimale (titre + « Page en préparation ») pour éviter un lien cassé, sa structure complète vient à l'étape 4. Idem pour les liens légaux du footer.

## Footer commun

- Colonne marque (logo + phrase actuelle).
- Liens pages : Accueil, Offre, Concepts, À propos, Contact.
- Contact : WhatsApp (`waLink()`), email (`SITE_CONFIG.email`), « Rouen et alentours ».
- Bas de footer : © NEWLIFE STUDIO · Mentions légales · Confidentialité.
- Mobile : colonnes empilées, liens ≥ 44 px de haut.

## SEO

- `app/layout.tsx` : `title.template = '%s — NEWLIFE STUDIO'`, `title.default` = title actuel de l'accueil.
- Chaque page : `title`, `description`, `alternates.canonical`, `openGraph` (title, description, url).
- Vérifier dans le HTML buildé que `og:image` (`app/opengraph-image.tsx`) est présent sur chaque page ; sinon le référencer explicitement.
- `app/sitemap.ts` : toutes les routes publiques.

Titles et descriptions (étape 1) :

| Route | Title | Description |
|---|---|---|
| `/` | NEWLIFE STUDIO — On donne une nouvelle vie à ton business en ligne | (actuelle) |
| `/offre` | Offre & tarifs | Sites vitrine, e-commerce, refonte, SEO et maintenance. Forfaits dès 299 €, livrés en 5 à 10 jours, paiement en 2 fois. |
| `/concepts` | Nos concepts | Trois sites de démonstration — barbershop, salle de sport, immobilier — pour voir ce qu'on peut construire pour ton activité. |
| `/contact` | Contact | Parle-nous de ton projet sur WhatsApp ou par message. Réponse sous 24h. |
| `/a-propos` | À propos | Qui est derrière NEWLIFE STUDIO. |

## Vérification (chaque étape)

- `npm run dev` : chaque page à 375 px puis desktop, menu mobile (ouverture, navigation, fermeture, scroll lock), lien actif.
- Console navigateur sans erreur sur chaque page.
- `npm run build` sans erreur ; routes attendues listées dans la sortie.
- Push `refonte` + preview Vercel.

## Hors périmètre

- Pages individuelles par démo (`/concepts/[slug]`) — plus tard.
- Spec motion design du 2026-10-07 — inchangée, non implémentée ici.
