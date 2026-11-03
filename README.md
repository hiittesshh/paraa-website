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
npm test           # node --test: basket what-if, tax, CA request, rupee, quiz, formatting, routes, cn
```

The "Ask a CA" form needs `ADVISOR_REQUEST_WEBHOOK_URL` (copy `.env.example` to `.env.local`).
Without it the form tells the visitor their question wasn't sent.

## Layout
```
src/
  app/              the homepage, /api/advisor-request (the CA question form), layout,
                    globals.css (every design token)
  components/
    home/           homepage sections, one per file
    site/           header, footer, rebrand bar, brand mark
    paraa/          shared primitives: Section, Card, Reveal, Money, Accordion, SiteLink
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
| shadcn/ui | Button, the `cn()` helper | Source is copied in, not imported, so it is restyled to the design file. |
| **Watermelon UI** | `AdaptiveSlider`, `DiscreteTabs`, `Stepper`, plus the accordion-9 look | Installed with `npx shadcn add https://registry.watermelon.sh/r/<name>.json`, then adapted (see below). |
| Radix Accordion | FAQ | Handles `aria-expanded` and keyboard support. |
| Motion | Scroll reveals, the hero's 3D deck, header shrink, Watermelon micro-interactions | `MotionConfig reducedMotion="user"` honours the OS "reduce motion" setting. |
| @number-flow/react | Animated rupee figures in the what-if and tax estimator | Digits roll to the new value; screen readers get the plain formatted string. |
| lucide-react | Icons | One icon set. `react-icons` was removed. |

Material UI was **not** used. Its look fights the design file and would add a second styling
system; the brief said "may use".

## What the user asked for, and where it is
| Request | Where |
|---|---|
| **Round 3:** focus on the international basket (US stocks, crude oil, gold) | `components/home/hero.tsx` (3D deck), `basket.tsx` + `sleeve-info.tsx`, `what-if.tsx` + `lib/basket.ts` |
| **Round 3:** why invest in USD | `components/home/rupee-dollar.tsx` (chart + live birth-year calculator) + `lib/rupee.ts` |
| **Round 3:** how tax works | `components/home/tax.tsx` + `tax-estimator.tsx` + `lib/tax.ts` |
| **Round 3:** CA advisors, and a way to send a question | `components/home/advisors.tsx` + `ask-form.tsx`, `app/api/advisor-request/route.ts`, `lib/advisor-request.ts` |
| **Round 3:** link to the blog | `components/home/learn.tsx`, header and footer; the URL is `lib/links.ts` |
| **Round 3:** no "crypto" anywhere | Site copy is clean; the only occurrence is the ASCI line in the footer legal block, by decision |
| **Round 2:** light theme, following the design file strictly | `src/app/globals.css` holds every token; see ROUND 2 in `docs/build-brief.md` |
| **Round 2:** remove all basket NAV data | Deleted; in git history at commit `2194970`. |
| Rupee and dollar movement graph from B | `src/components/home/rupee-dollar.tsx` + `src/lib/rupee.ts` |
| Questionnaire from D | `src/components/home/fit-quiz.tsx` + `src/lib/quiz.ts` |

Sections removed in round 3 (fee receipt, methodology, partner card and others) are in git
history; see `docs/build-brief.md`, ROUND 3.

## Watermelon components: what was changed and why
The registry ships demo code: hardcoded pink and purple gradients, a "Calories" label, and some
accessibility gaps. As the shadcn model intends, the copied source was adapted:
- **adaptive-slider:** now uses design-file gold, has a visible `<label>`, announces the formatted
  amount through `aria-valuetext`, shows a focus ring, and has no fixed-height card wrapper.
- **discrete-tabs:**
  - Uses real ARIA tabs (tablist, tab and tabpanel) with arrow, Home and End keys.
  - Each tab is one focus stop; the original had two.
  - A `labels="all"` option is used where people scan the tabs to choose one (the FAQ).
- **stepper:** the −/+ buttons now have names, the value is announced, and its icons come from lucide.
- **Install side-effect fixed:** the install pulled in an unknown npm package called `cn`. It was
  replaced with the standard `clsx` + `tailwind-merge`.

## Rules worth knowing before you change anything
- **All numbers go through `src/lib/format.ts`.** Maths runs at full precision and is rounded
  half-up only when shown. ₹ uses Indian grouping; US$ uses international grouping.
- **`src/lib/routes.ts` lists the pages that exist.** Links to anything else render as "Soon",
  not a 404. When you build a page, add its path there.
- **`cn()` knows the custom `text-body-*` sizes** (`src/lib/utils.ts`). Without that, a button
  loses its label colour.
- **Alert colours are never text on white.** Green, yellow and red fail contrast as text, so they
  are fills, icons and borders, with dark text on top. The only gold text is `text-accent` (gold-800).
- **3D needs an unclipped path.** In the hero deck, nothing between the stage and a card may use
  `overflow: hidden`, because that flattens the 3D (and breaks the sticky pin).
- **Compliance labels:** `<Illustrative/>` marks every dummy number and `<ToConfirm/>` marks every
  unconfirmed fact. The copy rulebook is `docs/content-rules.md` §0.3.
