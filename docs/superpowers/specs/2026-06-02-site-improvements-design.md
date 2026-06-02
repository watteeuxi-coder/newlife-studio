# Site Improvements — Design Spec
_Date: 2026-06-02_

## Overview

Four improvements to the NEWLIFE STUDIO marketing site (Next.js 14, Framer Motion, Tailwind). No new dependencies required.

---

## 1 — Modal Forfait

### Goal
Replace the direct WhatsApp link on each plan CTA with an in-page modal that gives the prospect context before contacting.

### Trigger
`Forfaits.tsx` — each "Choisir X" button calls `onClick={() => setOpenPlan(plan)}` instead of navigating to WhatsApp.

### State
`useState<Plan | null>(null)` in `Forfaits.tsx`. Pass `plan` and `onClose` to `ForfaitModal`.

### Modal anatomy
- **Overlay:** `fixed inset-0 z-50`, `bg-black/60 backdrop-blur-sm`, Framer Motion `opacity: 0→1` on mount
- **Panel:** centered, `max-w-lg w-full mx-4`, `bg-white/[0.06] border border-accent/40 backdrop-blur-xl rounded-2xl`, slide-up on mount (`y: 20→0`)
- **Header:** plan name (small caps, accent colour) + price (bold, large) + ✕ close button top-right
- **Timeline:** 3 steps in a horizontal row connected by `border-t border-accent/30`:
  - `J1` — Brief
  - `J3–5` — Maquette
  - `J7–10` — Livraison
  Each step: small circle bullet (accent), day label above, step name below
- **Features list:** reuses the existing `plan.features` array with `CheckIcon`
- **WhatsApp CTA:** full-width button, same style as primary CTA. `href` built as:
  ```
  https://wa.me/33769892000?text=Bonjour+NEWLIFE+STUDIO%2C+je+suis+intéressé+par+le+forfait+[NAME]+à+[PRICE]
  ```
- **Close:** ✕ button, click on overlay, `Escape` key (`useEffect` + `keydown` listener)

### New file
`components/ui/ForfaitModal.tsx` — receives `plan: Plan | null` and `onClose: () => void`

---

## 2 — Section Témoignages

### Goal
Social proof between Portfolio and Pourquoi nous.

### Placement
`app/page.tsx`: insert `<Temoignages />` between `<Portfolio />` and `<Pourquoi />`

### Data (hardcoded)
```ts
[
  {
    name: 'Karim B.',
    job: 'Gérant de barbershop',
    stars: 5,
    text: "Site livré en 6 jours, mes clients réservent maintenant en ligne. Retour sur investissement dès le premier mois.",
  },
  {
    name: 'Sofia M.',
    job: 'Coach fitness indépendante',
    stars: 5,
    text: "Le design correspond exactement à mon image. Professionnel, rapide, à l'écoute. Je recommande sans hésiter.",
  },
  {
    name: 'Thomas L.',
    job: 'Agent immobilier',
    stars: 5,
    text: "Le chatbot qualifie mes leads avant même que je décroche le téléphone. Bluffant.",
  },
]
```

### Card style
- `bg-white/[0.04] border border-accent/[0.15] backdrop-blur-xl rounded-2xl p-6`
- Hover: `hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]`
- Stars: 5 × `★` in accent colour
- Avatar initial: `w-10 h-10 rounded-full bg-accent/20 text-accent font-bold` with first letter of name
- Scroll reveal: `whileInView` fade-up, staggered delay per card

### Grid
`grid-cols-1 md:grid-cols-3 gap-6`

### New file
`components/sections/Temoignages.tsx`

---

## 3 — Animated Counters in Hero

### Goal
Replace the 3 static stat strings with counters that animate from 0 to their target value when the stats block enters the viewport.

### Stats
| Label | Target | Suffix |
|---|---|---|
| Projets livrés | 3 | `+` |
| Clients satisfaits | 100 | `%` |
| Délai moyen | 5 | `j` |

### Hook: `useCountUp`
```ts
// hooks/useCountUp.ts
useCountUp(target: number, duration: number = 1500): number
```
- Uses `useRef` for a DOM node + `useInView` (Framer Motion, already installed) to fire once
- On enter: `requestAnimationFrame` loop increments from 0 to `target` over `duration` ms
- Returns current count value as `number`

### Usage in Hero
Replace `STATS` array with new typed array `{ target, suffix, label }`. Each stat renders `useCountUp(target)` result + suffix.

### Files changed
- `hooks/useCountUp.ts` (new)
- `components/sections/Hero.tsx` (STATS replaced)

---

## 4 — Scroll Reveal Audit

### Goal
Ensure every section has a consistent fade-up entrance. Most already use `whileInView` on internal elements; this pass adds it to sections that are missing or incomplete.

### Sections to update
| Section | Current state | Action |
|---|---|---|
| `Hero.tsx` | Uses `animate` on mount (not scroll-triggered — correct, it's the first section) | No change |
| `Services.tsx` | Check if section head has reveal | Add `useScrollReveal` to section head if missing |
| `Forfaits.tsx` | Section head uses `useScrollReveal` ✓, cards use `whileInView` ✓ | No change |
| `Portfolio.tsx` | Section head uses `useScrollReveal` ✓, cards use `whileInView` ✓ | No change |
| `Temoignages.tsx` | New section | Built with reveal from the start |
| `Pourquoi.tsx` | Check | Add if missing |
| `Faq.tsx` | Check | Add if missing |
| `Contact.tsx` | Check | Add if missing |

### Pattern to apply (where missing)
```tsx
const [headRef, headVisible] = useScrollReveal()
// on the section heading wrapper:
<motion.div ref={headRef} initial={{ opacity:0, y:30 }} animate={headVisible ? {opacity:1,y:0} : {}} transition={{duration:0.6}}>
```
Individual cards/items already use `whileInView` where applicable.

---

## File summary

| File | Action |
|---|---|
| `components/ui/ForfaitModal.tsx` | Create |
| `components/sections/Temoignages.tsx` | Create |
| `hooks/useCountUp.ts` | Create |
| `components/sections/Forfaits.tsx` | Add modal state + onClick |
| `components/sections/Hero.tsx` | Replace STATS with animated counters |
| `components/sections/Services.tsx` | Add scroll reveal if missing |
| `components/sections/Pourquoi.tsx` | Add scroll reveal if missing |
| `components/sections/Faq.tsx` | Add scroll reveal if missing |
| `components/sections/Contact.tsx` | Add scroll reveal if missing |
| `app/page.tsx` | Insert `<Temoignages />` |
