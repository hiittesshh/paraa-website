# Paraa Capital website

Concept A, "The Open Book", built out as a finished site, with three sections grafted in from
the other round-1 concepts. The round-1 prototypes, research, specs and audit live one folder up
(`../`).

```
npm install
npm run dev        # http://localhost:3000 (hot reload)
npm run build && npm start   # production build, the same as a deploy
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # node --test: all the maths (NAV, fees, rupee, quiz, formatting, routes)
```

## Stack and why
| Piece | Used for | Why this and not something else |
|---|---|---|
| Next.js 16 (App Router) | Pages, static prerendering, `next/font` | Both pages prerender to static HTML. Manrope is self-hosted at build time, so visitors' browsers never call Google. |
| Tailwind CSS 4 | Styling | The design file's tokens live once in `src/app/globals.css` (`@theme`); every component uses them. |
| shadcn/ui | Button, the `cn()` helper | Source is copied in, not imported, so it is restyled to the design file. |
| **Watermelon UI** | `AdaptiveSlider`, `DiscreteTabs`, `Stepper`, plus the accordion-9 look | Installed with `npx shadcn add https://registry.watermelon.sh/r/<name>.json`, then adapted (see below). |
| Radix Accordion | FAQ and methodology | Handles `aria-expanded` and keyboard support. |
| Motion | Subtle reveals and Watermelon micro-interactions | `MotionConfig reducedMotion="user"` honours the OS "reduce motion" setting. |
| lucide-react | Icons | One icon set. `react-icons` was removed. |

Material UI was **not** used. Its look fights the design file and would add a second styling
system; the brief said "may use".

## What the user asked for, and where it is
| Request | Where |
|---|---|
| Comment out the basket data (hero ledger + NAV changelog) | `src/components/home/hero.tsx` (`HeroLedger` is commented out), `src/app/page.tsx` (`Changelog`), and `src/app/nav/page.tsx` (its changelog) |
| Comment out "our mistake" part | `src/app/page.tsx` (`Incident`) |
| Refine "How your money moves" | `src/components/home/how-money-moves.tsx`: a five-step rail, the same five questions on every step, and the unconfirmed route drawn dashed |
| Rupee and dollar movement graph from B | `src/components/home/rupee-dollar.tsx` + `src/lib/rupee.ts` |
| Partner card from C | `src/components/home/partner-card.tsx` |
| Questionnaire from D | `src/components/home/fit-quiz.tsx` + `src/lib/quiz.ts` |

Each commented-out section still exists as a component. To bring one back, remove the `{/* */}`
around it in the page.

## Watermelon components: what was changed and why
The registry ships demo code: hardcoded pink and purple gradients, a "Calories" label, and some
accessibility gaps. As the shadcn model intends, the copied source was adapted:
- **adaptive-slider:** now uses design-file gold, has a visible `<label>`, announces the formatted
  amount through `aria-valuetext`, shows a focus ring, and has no fixed-height card wrapper.
- **discrete-tabs:**
  - Uses real ARIA tabs (tablist, tab and tabpanel) with arrow, Home and End keys.
  - Each tab is one focus stop; the original had two.
  - A `labels="all"` option is used where people scan the tabs to choose one (FAQ, baskets).
- **stepper:** the −/+ buttons now have names, the value is announced, and its icons come from lucide.
- **Install side-effect fixed:** the install pulled in an unknown npm package called `cn`. It was
  replaced with the standard `clsx` + `tailwind-merge`.

## Rules worth knowing before you change anything
- **All numbers go through `src/lib/format.ts`.** Maths runs at full precision and is rounded
  half-up only when shown. ₹ uses Indian grouping; US$ uses international grouping.
- **`src/lib/routes.ts` lists the pages that exist.** Links to anything else render as "Soon",
  not a 404. When you build a page, add its path there.
- **`cn()` knows the custom `text-body-*` sizes** (`src/lib/utils.ts`). Without that, gold
  buttons lose their dark label colour.
- **Compliance labels:** `<Illustrative/>` marks every dummy number and `<ToConfirm/>` marks every
  unconfirmed fact. The copy rulebook is `../02-concepts.md` §0.3.
- **Turning performance figures off:** set `NEXT_PUBLIC_SHOW_PERFORMANCE=off` to hide them.
