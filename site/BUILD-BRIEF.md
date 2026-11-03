# Build brief: Paraa Capital site (Next.js 16 + Tailwind 4 + shadcn + Watermelon UI)

## ROUND 2 (2026-11-03): this section overrides anything below it
The user asked for three things:
1. Remove all basket NAV data. The explorer, range stats, `/nav` page, ledger, changelog and CSV are **gone**.
2. Refine the overall UI/UX, with smooth animation and transitions.
3. Follow the design system **strictly**.

Their answers to the open questions:
- **Light theme**, like the design file.
- **Main buttons = Primary #272A33** (white label), gold #FDC037 = secondary.
- **No basket performance data anywhere.**

### Design system: strict
Every token is in `src/app/globals.css`, and all of them come from the design file. **Use only these:**
- **Surfaces:**
  - `bg-background` (#FFF) and `bg-background-alt` (Greyscale 50 #F8F9FD) for alternating sections;
  - `bg-card` (#FFF) with `border` (Greyscale 200) and `shadow-card`;
  - `bg-muted` (Greyscale 100);
  - `bg-paper` (#F2F2F2);
  - `bg-ink` (#272A33) for dark emphasis panels, with white text.
- **Text:**
  - `text-foreground` (Greyscale 900) for headings and key numbers;
  - `text-muted-foreground` (Greyscale 600) for body;
  - `text-faint` (Greyscale 500) for captions;
  - `text-accent` (gold-800) is the **only** gold text colour.
- **Gold:** `bg-secondary` (#FDC037), and the `gold-50 … gold-900` tints/ramp for fills, highlights and badges. `main-1/2/3` are the "Main" swatches.
- **Alerts:** `success` #10B981, `warning` #FACC15, `error` #EF4444, plus `positive`/`negative`.
  - Use them only as fills, icons, borders, bars or tinted backgrounds (e.g. `bg-success/10 border-success`).
  - **Never use them as text on white.** They fail contrast: green 2.5:1, yellow 1.6:1, red 3.8:1.
  - Meaning goes in words and +/− signs, with dark text.
- **Buttons:**
  - `ButtonLink`/`Button` `variant="default"` is the dark primary; `"secondary"` is gold; `"outline"` and `"ghost"` are also available.
  - **At most one primary button per view**, and gold secondary buttons are rare.
- **Type:** only the file's scale.
  - Headings: `type-h1 … type-h6` (Bold).
  - Body: `text-body-xl|lg|md|sm|xs` with weights `font-normal|medium|semibold|bold`, plus `font-extrabold` only at sm/xs, as the file shows.
  - **No arbitrary sizes** (`text-[28px]` etc.). Big numbers use `type-h2`/`type-h3`/`type-h4` + `num`.
  - `text-body-xs` (10px) is for labels only, never sentences.
- **Radius:** `rounded-sm|md|lg|xl` (8/12/16/24). **Spacing:** the 4px grid only. **No raw hex anywhere in components.**
- **Focus:** the global 2px Primary ring. Don't remove it.

### Motion: smooth, but quiet
- Use `Reveal`, `RevealGroup` and `RevealItem` from `@/components/paraa/primitives` (a 16px rise, fade and blur-clear, once). They are the **only** scroll reveals: one vocabulary, no per-section custom timings.
- **Hover:** cards lift `hover:-translate-y-0.5 hover:shadow-lift` (200ms, `ease-out-soft`); links get underline or arrow nudges; buttons are already animated.
- **State changes:**
  - numbers that change use `@number-flow/react` (already installed);
  - accordions and tabs animate height and layout through Motion and Radix;
  - the quiz uses `AnimatePresence`.
- Respect reduced motion: `MotionConfig reducedMotion="user"` is global, and nothing may stay at opacity 0 without JS.
- **Don't** add parallax, scroll-jacking, looping or autoplay animations, or anything over ~600ms.

### Removed: don't reintroduce
`/nav`, NAV charts, basket returns, drawdowns, "best/worst month", "since inception", CSV downloads, and links to any of them.
`lib/calc.ts` and `lib/nav-data.ts` are gone; the fee maths is in `lib/fees.ts`. The routes in `lib/routes.ts` are now `/` only.

### Homepage order (`src/app/page.tsx`)
Hero → TrustChecks → FeeReceipt → RupeeDollar → HowMoneyMoves → FitQuiz → (Incident, commented out) → Methodology → Router → PartnerCard → Faq → ClosingCta.

---
*Round 1 brief follows. Its file-ownership table is historical; its accessibility and compliance rules still apply.*

Finished version of **Concept A "The Open Book"** with grafts from B, C and D.
Round-1 prototypes (the source of all copy, maths and structure) live in `../concept-a … ../concept-d`.
Specs: `../02-concepts.md` (§0.2 footer/legal, §0.3 copy rulebook: **binding**, §0.4 dataset).
Audit of the prototypes: `../03-audit.md`. Its fixes are already in the prototype HTML; port the *fixed* HTML.

## Homepage order (`src/app/page.tsx`)
| # | Section | Source | Component (named export) | File | Owner |
|---|---|---|---|---|---|
| – | Rebrand bar | A | `RebrandBar` | `components/site/rebrand-bar.tsx` | agent 1 |
| – | Header | A | `SiteHeader` | `components/site/header.tsx` | agent 1 |
| 1 | Hero, **ledger table commented out** | A5.1 | `Hero` (+ `HeroLedger` kept but not rendered) | `components/home/hero.tsx`, `hero-ledger.tsx` | agent 1 |
| 2 | Every claim, checkable | A5.2 | `TrustChecks` | `components/home/trust-checks.tsx` | agent 1 |
| 3 | NAV explorer | A5.3 | `NavExplorer` | `components/home/nav-explorer.tsx` | agent 2 |
| 4 | Both ends of the range | A5.4 | `RangeStats` | `components/home/range-stats.tsx` | agent 2 |
| 5 | The rupee, honestly (chart) | **B5.2** | `RupeeDollar` | `components/home/rupee-dollar.tsx` | agent 3 |
| 6 | Fee receipt | A5.5 | `FeeReceipt` | `components/home/fee-receipt.tsx` | agent 2 |
| 7 | How your money moves, **refined** | A5.6 | `HowMoneyMoves` | `components/home/how-money-moves.tsx` | agent 2 |
| 8 | Am I a fit? (questionnaire) | **D5.3** | `FitQuiz` | `components/home/fit-quiz.tsx` | agent 3 |
| – | NAV changelog: **commented out** | A5.7 | `Changelog` | `components/home/changelog.tsx` | agent 1 |
| – | Last time something went wrong: **commented out** | A5.8 | `Incident` | `components/home/incident.tsx` | agent 1 |
| 9 | Methodology | A5.9 | `Methodology` | `components/home/methodology.tsx` | agent 1 |
| 10 | Routes for checkers | A5.10 | `Router` | `components/home/router.tsx` | agent 1 |
| 11 | Partner card | **C5.6** | `PartnerCard` | `components/home/partner-card.tsx` | agent 3 |
| 12 | FAQ grouped by worry | A5.11 | `Faq` | `components/home/faq.tsx` | agent 1 |
| 13 | Closing CTA | A5.12 | `ClosingCta` | `components/home/closing-cta.tsx` | agent 1 |
| – | Footer + legal block | A + §0.2 | `SiteFooter` | `components/site/footer.tsx` | agent 1 |
| – | `/nav` NAV & performance centre (changelog section commented out there too) | A6 | page | `app/nav/page.tsx` + `components/nav/*` | agent 2 |

"Commented out" means: the component exists and is imported, but its JSX in the page is inside
`{/* … */}` with a one-line note saying why, so it can be switched back on in one edit.

Section anchors (header nav and cross-links use these): `#checks`, `#explorer`, `#range`, `#rupee`,
`#fees`, `#how`, `#fit`, `#method`, `#routes`, `#partners`, `#faq`.

## Use what's already built (don't re-create)
- `@/components/paraa/primitives`: `Section`, `SectionHead`, `Card`, `Badge`, `Illustrative`, `ToConfirm`,
  `ButtonLink`, `ArrowLink`, `Disclosure`, `Reveal`.
- `@/components/paraa/accordion`: `Accordion` (Radix; Watermelon accordion-9 look).
- `@/components/watermelon/adaptive-slider`: `AdaptiveSlider` (amount sliders).
- `@/components/watermelon/stepper`: `Stepper` (small integer inputs, e.g. months held).
- `@/components/watermelon/discrete-tabs`: `DiscreteTabs` (ARIA tabs with panels).
- `@/components/ui/button`: `Button` (for real buttons; `ButtonLink` for links).
- `@/lib/format`: `formatINR`, `formatUSD`, `formatPct`, `roundHalfUp`, `monthLabel`, `dateLabel`, `MINUS`.
  **All number display goes through these** (audit rule: round half-up only when displaying;
  ₹ Indian grouping; US$ international grouping; U+2212 minus).
- `@/lib/calc` + `@/lib/nav-data`: NAV maths, fee receipt, `headline()`, `SHOW_PERFORMANCE`. Tested.
- Icons: `lucide-react` only. No emoji, no images of people, no stock photos.

## Rules
- **Design tokens only.** Use Tailwind classes backed by `globals.css`: `bg-background`, `bg-background-alt`,
  `bg-card`, `bg-muted`, `text-muted-foreground`, `text-faint`, `text-accent` (gold text),
  `bg-primary`/`text-primary-foreground` (gold CTA, dark label), `border-border`, `border-border-strong`,
  `text-positive`, `text-negative`, `text-warning`, plus `gold-*`/`ink-*` primitives.
  **No raw hex, no `style={{color…}}`**, except SVG chart geometry, which may use `var(--…)` strings.
- **Type:** headings use `type-h1`…`type-h6`; body uses `text-body-xl|lg|md|sm` (xs = labels only).
  One `<h1>` per page (the hero). Section titles are `<h2>` via `SectionHead`.
- **Gold is the single accent**, used sparingly (≈3 gold items per screen).
- **Accessibility:**
  - every input has a visible label;
  - live results use `aria-live="polite"`;
  - charts are SVGs with `role="img"` + `aria-label`, plus a visually hidden data table or summary;
  - colour is never the only signal (use +/− and words);
  - touch targets are ≥ 44px; focus stays visible;
  - motion stays subtle (`Reveal` and the Watermelon components only).
- **Responsive:** check 375 / 768 / 1024 / 1440. No horizontal page scroll; wide tables scroll inside `overflow-x-auto`.
- **Compliance:** follow the rulebook (`../02-concepts.md` §0.3). In particular:
  - every number that could look real carries `<Illustrative/>`;
  - registrations, routes and partners use `<ToConfirm/>`;
  - currency claims always state both directions;
  - no "forex", "guaranteed", "safe", "#1", "best", "assured", "risk-free" or "insured";
  - commission figures stay off the homepage (a link to the partner page is fine).
- **Client components** (`"use client"`) only where there is state or interaction; everything else is a server component.
- Pure maths lives in `src/lib/*.ts` with a `*.test.ts` next to it, using relative imports with the `.ts` extension
  (e.g. `import { x } from "./format.ts"`) so `npm test` (node --test) can run it.
- **Gates before you finish:**
  ```
  npm run typecheck
  npx eslint src
  npm test
  ```
  All must pass for your files.
