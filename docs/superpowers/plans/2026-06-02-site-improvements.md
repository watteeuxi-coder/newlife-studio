1# Site Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 features to the NEWLIFE STUDIO Next.js site: forfait modal, testimonials section, animated hero counters, and scroll reveal (already present everywhere — no extra work needed).

**Architecture:** All additions are self-contained React components in the existing `components/` tree. State for the modal lives in `Forfaits.tsx`. The counter hook is a new file in `hooks/`. The testimonials section is a new file inserted between Portfolio and Pourquoi in `page.tsx`.

**Tech Stack:** Next.js 14, React 18, Framer Motion (already installed), TypeScript, Tailwind CSS

---

## File Map

| File | Action |
|---|---|
| `hooks/useCountUp.ts` | Create — RAF-based count-up hook triggered by useInView |
| `components/ui/ForfaitModal.tsx` | Create — modal overlay for forfait detail + WhatsApp CTA |
| `components/sections/Temoignages.tsx` | Create — 3-card testimonials section |
| `components/sections/Hero.tsx` | Modify — replace static STATS with animated counters |
| `components/sections/Forfaits.tsx` | Modify — add modal state, change CTA from `<a>` to `<button>` |
| `app/page.tsx` | Modify — import and insert `<Temoignages />` |

> **Scroll reveal:** All existing sections (`Services`, `Pourquoi`, `Faq`, `Contact`) already use `useScrollReveal`. No changes needed there.

---

## Task 1: `useCountUp` hook

**Files:**
- Create: `hooks/useCountUp.ts`

- [ ] **Step 1: Create the hook**

```ts
// hooks/useCountUp.ts
'use client'
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as any, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return [count, ref] as const
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors on the new file (it may show pre-existing errors elsewhere — ignore those).

---

## Task 2: Hero animated counters

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Replace STATS and add StatCounter**

Open `components/sections/Hero.tsx`. Make these changes:

Add import at the top (after existing imports):
```tsx
import { useCountUp } from '@/hooks/useCountUp'
```

Replace the `STATS` constant:
```tsx
const STATS = [
  { target: 3, suffix: '+', label: 'Projets livrés' },
  { target: 100, suffix: '%', label: 'Clients satisfaits' },
  { target: 5, suffix: 'j', label: 'Délai moyen' },
]
```

Add a `StatCounter` component just before the `Hero` default export:
```tsx
function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, ref] = useCountUp(target)
  return (
    <div ref={ref as any}>
      <div className="text-xl font-bold text-accent">{count}{suffix}</div>
      <div className="text-xs text-text-muted mt-0.5">{label}</div>
    </div>
  )
}
```

- [ ] **Step 2: Replace the STATS render block**

Find the stats render block (currently around line 100–110):
```tsx
{STATS.map((s) => (
  <div key={s.l}>
    <div className="text-xl font-bold text-accent">{s.n}</div>
    <div className="text-xs text-text-muted mt-0.5">{s.l}</div>
  </div>
))}
```

Replace with:
```tsx
{STATS.map((s) => (
  <StatCounter key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
))}
```

- [ ] **Step 3: TypeScript check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

- [ ] **Step 4: Verify in browser**

Visit http://localhost:3333, scroll past the fold and back to the Hero stats — the 3 numbers should animate up from 0.

---

## Task 3: ForfaitModal component

**Files:**
- Create: `components/ui/ForfaitModal.tsx`

- [ ] **Step 1: Create the modal**

```tsx
// components/ui/ForfaitModal.tsx
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface ModalPlan {
  name: string
  price: string
  features: string[]
}

interface Props {
  plan: ModalPlan | null
  onClose: () => void
}

const TIMELINE = [
  { day: 'J1', label: 'Brief' },
  { day: 'J3–5', label: 'Maquette' },
  { day: 'J7–10', label: 'Livraison' },
]

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4 text-accent flex-shrink-0">
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

export default function ForfaitModal({ plan, onClose }: Props) {
  useEffect(() => {
    if (!plan) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [plan, onClose])

  const waMessage = plan
    ? encodeURIComponent(
        `Bonjour NEWLIFE STUDIO, je suis intéressé par le forfait ${plan.name} à ${plan.price}`
      )
    : ''
  const waHref = `https://wa.me/33769892000?text=${waMessage}`

  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-accent/40 bg-white/[0.06] backdrop-blur-xl p-8 overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase text-accent mb-1">
                  {plan.name}
                </div>
                <div className="text-4xl font-bold text-text-base">{plan.price}</div>
              </div>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-base transition-colors p-1"
                aria-label="Fermer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Timeline */}
            <div className="mb-6">
              <div className="text-xs text-text-muted uppercase tracking-wider mb-4">
                Déroulement du projet
              </div>
              <div className="flex items-start">
                {TIMELINE.map((step, i) => (
                  <div key={step.day} className="flex-1 relative">
                    {i < TIMELINE.length - 1 && (
                      <div className="absolute top-3 left-1/2 w-full h-px bg-accent/30" />
                    )}
                    <div className="flex flex-col items-center gap-1.5 relative">
                      <div className="w-6 h-6 rounded-full border-2 border-accent bg-accent/20 flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <div className="text-xs font-bold text-accent">{step.day}</div>
                      <div className="text-xs text-text-muted text-center">{step.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-text-dim text-sm">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-accent text-void font-semibold hover:bg-accent-bright transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
              </svg>
              Démarrer avec le forfait {plan.name}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

---

## Task 4: Wire modal into Forfaits

**Files:**
- Modify: `components/sections/Forfaits.tsx`

- [ ] **Step 1: Add imports and state**

Add at the top of `Forfaits.tsx` (after existing imports):
```tsx
import { useState } from 'react'
import ForfaitModal, { type ModalPlan } from '@/components/ui/ForfaitModal'
```

Inside the `Forfaits` component, add state before the `return`:
```tsx
const [openPlan, setOpenPlan] = useState<ModalPlan | null>(null)
```

- [ ] **Step 2: Change the CTA from `<a>` to `<button>`**

Find the existing CTA (near end of each card):
```tsx
<a
  href={wa}
  target="_blank"
  rel="noopener noreferrer"
  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors ${
    plan.ctaStyle === 'primary'
      ? 'bg-accent text-void hover:bg-accent-bright'
      : 'border border-white/20 text-text-dim hover:border-accent/50 hover:text-text-base'
  }`}
>
  {plan.cta}
</a>
```

Replace with:
```tsx
<button
  onClick={() => setOpenPlan({ name: plan.name, price: plan.price, features: plan.features })}
  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors ${
    plan.ctaStyle === 'primary'
      ? 'bg-accent text-void hover:bg-accent-bright'
      : 'border border-white/20 text-text-dim hover:border-accent/50 hover:text-text-base'
  }`}
>
  {plan.cta}
</button>
```

- [ ] **Step 3: Add the modal to the JSX**

At the very end of the returned JSX, just before the closing `</section>`:
```tsx
<ForfaitModal plan={openPlan} onClose={() => setOpenPlan(null)} />
```

The full `return` should now end like:
```tsx
      </div>
    </div>
    <ForfaitModal plan={openPlan} onClose={() => setOpenPlan(null)} />
  </section>
)
```

- [ ] **Step 4: Remove now-unused `wa` variable**

Find and remove this line from inside the `Forfaits` component:
```tsx
const wa = waLink()
```

Also remove the `waLink` import if it's no longer used anywhere in the file:
```tsx
import { waLink } from '@/lib/config'
```
→ becomes:
```tsx
import { } from '@/lib/config'
```
Or just delete the import line entirely.

- [ ] **Step 5: TypeScript check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

- [ ] **Step 6: Verify in browser**

Visit http://localhost:3333/#forfaits — click any "Choisir X" button. The modal should open with the correct plan name, price, timeline, features list, and WhatsApp button. Press Escape or click outside to close.

---

## Task 5: Temoignages section

**Files:**
- Create: `components/sections/Temoignages.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/Temoignages.tsx
'use client'

import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TEMOIGNAGES = [
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

export default function Temoignages() {
  const [headRef, headVisible] = useScrollReveal()

  return (
    <section id="temoignages">
      <div className="wrap">
        <motion.div
          ref={headRef as any}
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          animate={headVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="kicker">Témoignages</span>
          <h2>Ce que disent <span className="grad-text">nos clients</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMOIGNAGES.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 rounded-2xl border border-accent/[0.15] bg-white/[0.04] backdrop-blur-xl p-6 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] transition-all"
            >
              <div className="flex gap-0.5 text-accent text-base leading-none">
                {'★'.repeat(t.stars)}
              </div>
              <p className="text-text-dim text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-text-base text-sm font-semibold">{t.name}</div>
                  <div className="text-text-muted text-xs">{t.job}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

---

## Task 6: Wire Temoignages into page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add import**

In `app/page.tsx`, add after the `Portfolio` import line:
```tsx
import Temoignages from '@/components/sections/Temoignages'
```

- [ ] **Step 2: Insert section**

Find in the JSX:
```tsx
<Portfolio />
<Pourquoi />
```

Replace with:
```tsx
<Portfolio />
<Temoignages />
<Pourquoi />
```

- [ ] **Step 3: TypeScript check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

- [ ] **Step 4: Verify in browser**

Visit http://localhost:3333 and scroll down past the Portfolio section. The Témoignages section should appear with 3 glassmorphism cards, each with stars, quote text, and author avatar. Cards should fade up on scroll entry.

---

## Task 7: Final end-to-end verification

- [ ] **Step 1: Full TypeScript check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npx tsc --noEmit 2>&1
```

Expected: zero errors introduced by these changes.

- [ ] **Step 2: Lint check**

```bash
cd "/Users/ilsko76/NEWLIFE STUDIO/newlife-studio" && npm run lint 2>&1 | tail -10
```

Expected: no new lint errors.

- [ ] **Step 3: Browser walkthrough**

Visit http://localhost:3333 and verify:

1. **Hero counters** — scroll past Hero once, return to top. The 3 stats (3+, 100%, 5j) should have already counted up and stay at their target values.
2. **Forfait modal** — click "Choisir Starter" → modal opens with Starter/299€/timeline/features/WhatsApp button. Click outside → closes. Click "Choisir Pro" → modal opens with Pro/499€. Press Escape → closes.
3. **Témoignages** — scroll to the section between Portfolio and Pourquoi nous. 3 cards appear with staggered fade-up.
4. **WhatsApp modal link** — click the WhatsApp button inside the modal. Verify the URL contains the pre-filled message with the correct plan name and price (check browser URL bar before the tab opens).
