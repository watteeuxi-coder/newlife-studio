# Motion Design — Design Spec
_Date: 2026-10-07_

## Overview

Give the NEWLIFE STUDIO site a "motion design video" feel: kinetic typography plus scroll storytelling. Scope: a redesigned Hero plus a shared set of section transitions. The content stays the same; only how it moves changes.

Stack: Framer Motion (already installed) + **Lenis** (new dependency, about 3 KB) for smooth scrolling. No GSAP.

Validated mockups: `.superpowers/brainstorm/*/content/hero-design.html` and `transitions-design.html` (gitignored, local reference only).

---

## 1 — Smooth scroll (Lenis)

- New client component `components/ui/SmoothScroll.tsx`. It mounts one Lenis instance (`lerp: 0.1`) and drives it from a `requestAnimationFrame` loop. It renders `children`, or nothing, and is mounted once in `app/page.tsx`.
- **Disabled** when `prefers-reduced-motion: reduce` matches. In that case the native scroll is kept unchanged.
- Anchor links (`href="#..."`): intercept clicks on `a[href^="#"]` and call `lenis.scrollTo(target, { offset: -80 })` so sections do not land under the fixed header (same 80px as the current `scroll-padding-top`).
- `globals.css`: add `html.lenis { scroll-behavior: auto; }` so the CSS `scroll-behavior: smooth` does not fight Lenis.
- Framer `useScroll` reads native scroll positions, and Lenis scrolls the real window, so no extra wiring is needed.

## 2 — Shared primitives

### `components/ui/KineticHeading.tsx`
- Props: `children` (string segments), `highlight?` (the segment rendered with `grad-text`), `as?: 'h1' | 'h2'`, `className?`, `delay?`.
- Splits the text into **lines/segments**. Each segment sits in an `overflow-hidden` inline-block wrapper, and its inner span animates `y: '105%' → 0` (duration 0.8s, ease `[0.22,1,0.36,1]`, stagger 0.1s).
- Triggers with `whileInView` (`once: true`, `margin: '-10% 0px'`). The Hero uses `animate` on mount instead.
- Accessibility: the visible split text gets `aria-hidden`, and the full sentence is rendered once in an `sr-only` span, so screen readers read one sentence.
- Reduced motion: renders the plain heading, with no transform.

### `.grad-text` sweep
- Add a `background-size: 200%` gradient animation (3s linear infinite) to the existing `.grad-text` in `globals.css`, so every highlighted word gets the moving light reflection. Turned off under `prefers-reduced-motion`.

### `components/ui/Marquee.tsx`
- Props: `items: string[]`, `className?`.
- Giant outlined text (`-webkit-text-stroke: 1px` accent at 30–40% opacity, transparent fill, `font-black`, `text-5xl md:text-7xl`), duplicated twice to make a seamless loop.
- Base motion: CSS `translateX(0 → -50%)` linear infinite.
- Scroll boost (desktop only): Framer `useScroll` + `useVelocity` speed the loop up while the user scrolls.
- `aria-hidden="true"` (decorative). Static under reduced motion.

### `components/ui/TiltReveal.tsx`
- Wrapper for cards: `initial { opacity: 0, y: 60, rotateX: 35 }` → `whileInView { opacity: 1, y: 0, rotateX: 0 }`, `transformOrigin: 'center bottom'`, with a `perspective: 900px` parent. Prop `index` gives a 0.12s stagger.
- On mobile (< 768px) it falls back to a simple `y: 30` fade, with no rotateX.

## 3 — Hero (`components/sections/Hero.tsx`)

Kept: kicker tag, typewriter line, WhatsApp + "Voir les forfaits" CTAs, stat counters, aurora blobs.
Removed: the right-hand glass console (`CONSOLE_LINES`, `CONSOLE_BARS`).

New behaviour:
1. **Entrance**: the H1 uses `KineticHeading` (lines "On donne une" / "nouvelle vie" / "à ton business en ligne"), revealed line by line on mount. "nouvelle vie" keeps `grad-text` and gets the sweep. The tag, typewriter, CTAs and stats keep their staggered `fadeUp` after the title.
2. **Marquee**: `Marquee` at the bottom of the hero with `NEWLIFE STUDIO — SITES VITRINE — E-COMMERCE — SEO — REFONTE`.
3. **Scroll exit + 3D screen** (desktop, `lg+`):
   - The hero section becomes taller (`h-[180vh]`) with a `sticky top-0 h-screen` inner stage.
   - `useScroll({ target: section, offset: ['start start', 'end end'] })` → `progress`.
   - Copy block: `y: 0 → -120px`, `scale: 1 → 0.75`, `opacity: 1 → 0` over progress 0–0.6.
   - New `HeroScreen` sub-component: a browser frame (three dots + bar) showing the 3 portfolio screenshots (`/images/portfolio/*.png`, `next/image`) in a 3-column grid. It starts below the fold and moves to `y: 0`, `rotateX: 40° → 0`, `scale: 0.85 → 1` over progress 0–0.7.
   - On mobile and tablet (< `lg`) and under reduced motion: no sticky stage, normal `min-h-screen` hero, and no 3D screen (the portfolio section already shows the shots).

## 4 — Section transitions

| Section | Treatment |
|---|---|
| Services | `KineticHeading` title + service cards wrapped in `TiltReveal` |
| *(between Services and Forfaits)* | One `Marquee`: `SITES VITRINE ✦ E-COMMERCE ✦ SEO ✦ REFONTE ✦ MAINTENANCE`, with accent top/bottom borders |
| Forfaits | `KineticHeading` + plan cards in `TiltReveal` |
| Portfolio | `KineticHeading` + **curtain reveal** per card: `clipPath: inset(30% 20% 30% 20% round 16px) → inset(0 round 16px)` (1.2s) and the inner image `scale: 1.25 → 1` (1.4s), via `whileInView`. The existing hover effects are kept |
| Témoignages | `KineticHeading` + cards in `TiltReveal` |
| Pourquoi, FAQ, Contact | `KineticHeading` only |

`KineticHeading` replaces the current `motion.div` head fade on the `<h2>` only. Kicker and paragraph keep their existing `useScrollReveal` fade.

## 5 — Performance and accessibility

- Animate only `transform`, `opacity` and `clip-path`. Add `will-change` only on the sticky hero layers.
- Every new component checks `useReducedMotion()` from Framer and renders a static version.
- No new fonts or images. Lenis is the only new dependency.
- Mobile: no rotateX tilt, no sticky hero, and the marquee is CSS only (no velocity hook).

## 6 — Verification

- `npm run build` passes and `npm run lint` is clean.
- Manual check in the browser (dev server) at desktop 1440px and mobile 390px:
  - Hero entrance, marquee, and the scroll exit into the 3D screen.
  - Each section title reveals once, and the cards tilt in.
  - Header anchor links land correctly under the header with Lenis active.
  - With macOS "Reduce motion" on: static layout, native scroll, all content visible.
- No horizontal page scroll at 390px (the marquee must stay clipped).
