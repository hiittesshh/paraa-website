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
npm test           # node --test: all the maths (fees, rupee, quiz, formatting, routes, cn)
```

## Stack and why
| Piece | Used for | Why this and not something else |
|---|---|---|
| Next.js 16 (App Router) | Pages, static prerendering, `next/font` | The homepage prerenders to static HTML. Manrope is self-hosted at build time, so visitors' browsers never call Google. |
| Tailwind CSS 4 | Styling | The design file's tokens live once in `src/app/globals.css` (`@theme`); every component uses them. |
| shadcn/ui | Button, the `cn()` helper | Source is copied in, not imported, so it is restyled to the design file. |
| **Watermelon UI** | `AdaptiveSlider`, `DiscreteTabs`, `Stepper`, plus the accordion-9 look | Installed with `npx shadcn add https://registry.watermelon.sh/r/<name>.json`, then adapted (see below). |
| Radix Accordion | FAQ and methodology | Handles `aria-expanded` and keyboard support. |
| Motion | Scroll reveals, the hero's 3D receipt, header shrink, Watermelon micro-interactions | `MotionConfig reducedMotion="user"` honours the OS "reduce motion" setting. |
| @number-flow/react | Animated numbers in the fee receipt | Digits roll to the new value; screen readers get the plain formatted string. |
| lucide-react | Icons | One icon set. `react-icons` was removed. |

Material UI was **not** used. Its look fights the design file and would add a second styling
system; the brief said "may use".

## What the user asked for, and where it is
| Request | Where |
|---|---|
| **Round 2:** light theme, following the design file strictly (Primary #272A33 buttons, gold #FDC037 secondary) | `src/app/globals.css` holds every token; see the ROUND 2 section of `BUILD-BRIEF.md` |
| **Round 2:** remove all basket NAV data (explorer, range stats, ledger, changelog, CSV, the `/nav` page) | Deleted. It's in git history at commit `2194970` if ever needed. The fee maths moved to `src/lib/fees.ts`. |
| **Round 2:** smaller hero receipt with a 3D effect and vignette | `src/components/home/hero.tsx` + `src/components/paraa/tilt-3d.tsx` (scroll and pointer tilt, depth layers, reduced-motion safe) |
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
- **3D needs an unclipped path.** Inside `Tilt3D`, nothing between the card and a `data-depth`
  layer may use `overflow: hidden`, because that flattens the 3D.
- **Compliance labels:** `<Illustrative/>` marks every dummy number and `<ToConfirm/>` marks every
  unconfirmed fact. The copy rulebook is `../02-concepts.md` §0.3.
