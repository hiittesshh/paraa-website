# Build brief: Paraa Capital site (Next.js 16 + Tailwind 4 + shadcn + Watermelon UI)

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
