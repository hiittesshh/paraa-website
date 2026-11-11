# Paraa Capital website

The marketing site for Paraa Capital's international basket: tokenized US stocks, gold and crude
oil in one basket, priced daily in US dollars, with a chartered accountant for every investor.
Round 3 (2026-11-03) rebuilt the content around that; the rules it set are in
`docs/build-brief.md`, ROUND 3.

The round-1 work (research brief, four static prototypes, specs, audit, comparison) was removed
from the tree; it's in git history at commit `2194970`. Code comments that cite `concept-*/`,
`02-concepts.md` §A–D or `03-audit.md` point there: `git show 2194970:concept-a/concept.js`.

```
npm install
npm run dev        # http://localhost:3000 (hot reload)
npm run build && npm start   # production build, the same as a deploy
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # node --test: basket what-if, tax, CA request, rupee, formatting, routes, cn, Todo guard
```

The "Ask a CA" form needs `ADVISOR_REQUEST_WEBHOOK_URL` (copy `.env.example` to `.env.local`).
Without it the form tells the visitor their question wasn't sent.

## Unfinished facts
A fact only the company can supply stays off the page until it's confirmed; `docs/redesign/proposal.md`
section 9 lists them. If a bracket `[TODO:` placeholder is ever added for review, `next build` fails until
it's gone (`scripts/todo-guard.mjs`), unless `REVIEW_BUILD=1` is set for an internal build.

## Layout
```
src/
  app/              the homepage, /api/advisor-request (the CA question form), layout,
                    globals.css (every design token)
  components/
    home/           homepage sections, one per file
    site/           header, footer, brand mark
    paraa/          shared primitives: Section, Card, RiskLine, ExampleTag, Todo, Reveal, Mark, Money
    ui/             shadcn source (Button)
    watermelon/     adapted Watermelon UI components
  lib/              pure maths and formatting, each with a *.test.ts beside it
docs/
  build-brief.md    rules for changing the site: design system, motion, accessibility, compliance
  content-rules.md  site map, footer/legal block, copy rulebook (binding), illustrative dataset
  design-tokens.md  colours and type extracted from the design file
```

## Stack and why
| Piece | Used for | Why this and not something else |
|---|---|---|
| Next.js 16 (App Router) | Pages, static prerendering, `next/font` | The homepage prerenders to static HTML. Manrope is self-hosted at build time, so visitors' browsers never call Google. |
| Tailwind CSS 4 | Styling | The design file's tokens live once in `src/app/globals.css` (`@theme`); every component uses them. |
| shadcn/ui | The `ui/` component pattern, the `cn()` helper | Source is copied in, not imported, so it is restyled to the design file. Tabs and Button are hand-built (round 17) to keep JavaScript small. |
| lucide-react | Icons | One icon set. `react-icons` was removed. |
| Motion, Magic UI, Aceternity, React Bits | **Installed, not used** | The owner chose "install only" (round 17). Nothing in `src` may import them until the spec says so (QA A4/A24). On this network, `npx shadcn add @aceternity/…` and `@react-bits/…` need `NODE_OPTIONS=--dns-result-order=ipv4first`. |

**Round 17:** the homepage was rebuilt from `docs/redesign/design/spec.md`, the source of truth for design, copy and QA. Its fixes are tracked in `docs/redesign/design/fix-list.md`. NumberFlow, Base UI, the Radix accordion, `tw-animate-css` and the Watermelon slider were removed.

Material UI was **not** used. Its look fights the design file and would add a second styling
system; the brief said "may use".

## What the user asked for, and where it is
| Request | Where |
|---|---|
| **Round 11:** calm trust redesign | `docs/redesign/proposal.md` is the spec; decisions are in ROUND 11 of `docs/build-brief.md` |
| **Round 11:** the CA form also collects email (optional) | `components/home/ask-form.tsx`, `lib/advisor-request.ts`, `app/api/advisor-request/route.ts` |
| **Round 6:** clean, polished UI that doesn't look generated | Every section; rules in ROUND 6 of `docs/build-brief.md` |
| **Round 3:** focus on the international basket (US stocks, crude oil, gold) | `components/home/hero.tsx`, `basket.tsx` + `sleeve-info.tsx`, `lib/basket.ts` |
| **Round 3:** why invest in USD | Off the page until RBI/FBIL data exists. The component is in git history at `d3fb2b3`; `lib/rupee.ts` stays |
| **Round 3:** how tax works | Off the page until CA sign-off; a row in `fees.tsx` carries it. The estimator is in git history at `d3fb2b3`; `lib/tax.ts` stays |
| **Round 3:** CA advisors, and a way to send a question | `components/home/who.tsx`, `ask.tsx` + `ask-form.tsx`, `app/api/advisor-request/route.ts`, `lib/advisor-request.ts` |
| **Round 3:** link to the blog | Header and footer; the URL is `lib/links.ts`. **Round 5:** hidden (`BLOG_URL = null`) until the Paraa blog has an address |
| **Round 5:** no Grade Capital anywhere | Name-change bar and "Formerly Grade Capital" removed; see ROUND 5 in `docs/build-brief.md` |
| **Round 5:** the official logo | `components/site/brand.tsx` (`src/assets/paraa-logo.png`), `src/app/icon.png`, `apple-icon.png` |
| **Round 3:** no "crypto" anywhere | Site copy is clean; the only occurrence is the ASCI line in the footer legal block, by decision |
| **Round 2:** light theme, following the design file strictly | `src/app/globals.css` holds every token; see ROUND 2 in `docs/build-brief.md` |
| **Round 2:** remove all basket NAV data | Deleted; in git history at commit `2194970`. |
| **Round 4:** simpler navbar, less text, no placeholder tags, plain words | Every section; rules in ROUND 4 of `docs/build-brief.md` |

Sections removed in round 3 (fee receipt, methodology, partner card and others) are in git
history; see `docs/build-brief.md`, ROUND 3.

## Watermelon components: what was changed and why
The registry ships demo code: hardcoded pink and purple gradients, a "Calories" label, and some
accessibility gaps. As the shadcn model intends, the copied source was adapted:
- **adaptive-slider:** now uses design-file gold, has a visible `<label>`, announces the formatted
  amount through `aria-valuetext`, shows a focus ring, has no fixed-height card wrapper, and is a
  slim track that fills from zero when the range crosses zero.
- **Install side-effect fixed:** the install pulled in an unknown npm package called `cn`. It was
  replaced with the standard `clsx` + `tailwind-merge`.

## Rules worth knowing before you change anything
- **All numbers go through `src/lib/format.ts`.** Maths runs at full precision and is rounded
  half-up only when shown. ₹ uses Indian grouping; US$ uses international grouping.
- **`src/lib/routes.ts` lists the pages that exist.** When you build a page, add its path there.
- **`cn()` knows the custom `text-body-*` sizes** (`src/lib/utils.ts`). Without that, a button
  loses its label colour.
- **Alert colours are never text on white.** Green, yellow and red fail contrast as text, so they
  are fills, icons and borders, with dark text on top. The only gold text is `text-accent` (gold-800).
- **Unconfirmed facts are visible on this branch.** This replaces round 4's "no placeholder tags" (see
  the guard above). The copy rulebook is `docs/content-rules.md` §0.3.
