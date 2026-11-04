# Build brief: Paraa Capital site (Next.js 16 + Tailwind 4 + shadcn + Watermelon UI)

## ROUND 10 (2026-11-04): FIU-IND registration
The user stated that Paraa is registered with FIU-IND. The hero's third tile now says so, and a footer note
(`fiu-registration-v1`) says what that means. Rules:
- **State the registration as a fact.** No "approved by", "certified by" or "under the Ministry of Finance", and
  no government emblem or logo: wording that suggests official backing is misleading, however it's phrased.
- **Keep the footer note beside any such claim.**
- **Still needed (R6):** the number (`FIU_REG_NO` in `src/lib/links.ts`), the legal entity's name, and
  compliance sign-off on the wording. Not yet on file.

## ROUND 9 (2026-11-04): hero rebuilt, overrides anything below it
The user rejected the split hero. It's now a centred headline over three full-width tiles that start as a
tilted 3D stack and deal out into a linked row while the page is pinned (md+; phones don't pin). The finished
row is the plain CSS layout, so server render and reduced motion show it flat. All in `hero.tsx`.
**The hero must not repeat Basket:** its tiles answer "why Paraa?" (rupees, no tax when you invest, the
registration) and never show the asset split. The gold facts band (`FactMarquee`) was removed because it repeated those three.

## ROUND 8 (2026-11-04): the rest of the page, overrides anything below it
The user liked only Basket, Why USD and How it works from round 7: big colour blocks, big numbers, drawn art.
Those three are the reference and weren't changed. Everything else was brought up to them: a fully dark hero
with art on the deck cards, live visuals in the what-if and tax calculator with the answer in big gold type,
art tiles for CA Advisors (`PlanArt`, `ChatArt`, `FileArt`), a gold #ask band, solid FAQ tiles, and a dark
closing band whose skyline runs into the footer. Headings stay inside the design file's 48px limit.

## ROUND 7 (2026-11-04): bolder, overrides anything below it
The user found round 6 still too plain. Same tokens, type scale, copy and pinned hero, with more visual weight:
- **Replaces round 2's motion limits:** scroll-linked effects and one slow loop are now allowed. Scrolling is
  still never taken over (no wheel interception), and anything that loops needs a pause control.
- **Replaces round 6's "no cards":** Basket is solid tiles sized by share with drawn art (`asset-art.tsx`), How it
  works is sticky stacking cards, Advisors has icon rows. No art may read as basket performance.
- **New pieces:** `Mark` (gold highlighter under a heading phrase), `FactMarquee` (gold band with pause), the
  dark hero stage, the dark Why USD band whose line and rupee figure follow scroll, the header progress line.

## ROUND 6 (2026-11-04): structural polish, overrides anything below it
The user asked for a clean, polished UI that doesn't look generated. Colours, type, copy and the pinned
hero stayed; how sections are built changed. Guidance came from Impeccable (`pbakaus/impeccable`) and Emil
Kowalski's skills; `npx impeccable detect http://localhost:3000` checks the running site.
- **No small label above a heading.** The `eyebrow` utility and `SectionHead`'s `eyebrow` prop are gone.
- **No rows of same-size icon + heading + text cards, and no card inside a card.** Use hairline rows
  (Tax, Advisors, FAQ), a real proportional shape (Basket's bar) or a numbered rail (How it works). Cards are
  for tools only: the tax calculator and the form.
- **One dark Primary band (`surface-ink`) for the main action (#ask), one gold band (closing CTA), a dark
  footer.** `surface-ink` also switches the focus ring to gold; a white card inside it sets it back.
- **Sliders are slim** and fill from zero when the range crosses zero. Slider values are bold body text.
- **Motion:** the hero's 3D deck is the page's one big moment, and it lands flat so the text is crisp.
  `Reveal` is now a 12px rise + fade over 500ms with no blur; section headings don't animate. Easing is
  `cubic-bezier(.23, 1, .32, 1)`. The rupee line draws once. The header underline follows the current section.
- **Icons come from lucide, never text glyphs** such as arrows.

Homepage order is unchanged. "CA Advisors" and the #ask band are now two separate sections.

## ROUND 5 (2026-11-03): no Grade Capital anywhere, overrides anything below it
- **The site never mentions Grade Capital.** The name-change bar (`rebrand-bar.tsx`) and the footer's
  "Formerly Grade Capital." are gone; this replaces `content-rules.md` §0.1's rebrand bar and the
  "Formerly" part of §0.2's bottom line. Don't link to any grade.capital address either.
- **Blog hidden until it has a Paraa address.** `BLOG_URL` in `src/lib/links.ts` is `null`, which hides
  the header and footer Blog links and the Learn box. Set it and all three come back.
- **Logo:** the official wordmark (`src/assets/paraa-logo.png`) and app icon (`src/app/icon.png`,
  `apple-icon.png`). A brand guide is coming; it will set colours and type.

## ROUND 4 (2026-11-03): user-friendly pass, overrides anything below it
The user found the site too wordy, the navbar unclear and the placeholders unfriendly. Rules now:
- **No placeholder tags on the public page.** No "TO CONFIRM", "Illustrative" badges or "Soon" links.
  If a fact isn't confirmed, leave it out rather than tagging it (this replaces rulebook R6's visible
  marking). Example numbers are labelled in plain words ("Example allocation, for illustration").
- **Short and plain.** One-line card text, simple words, no jargon ("pts", "NAV", "sleeve").
- **Navbar:** Basket · Why USD · How it works · Tax · CA Advisors · Blog, plus "Talk to a CA".
- **Removed:** the readiness quiz, the birth-year calculator, the rupee help/hurt cards, the "never do"
  box, FAQ tabs, and the footer's empty registration / company / grievance / legal-link blocks.
  Those footer blocks must come back, filled in, before launch (`content-rules.md` §0.2).
- **Form:** name, mobile, question, consent. Nothing else.

Homepage order: Hero → Basket → Try it (#what-if) → Why USD → How it works → Tax → CA Advisors (#ask)
→ Blog → FAQ → Closing CTA.

## ROUND 3 (2026-11-03)
The site now sells **one international basket**: tokenized US stocks, gold and crude oil, held through
derivative contracts, priced daily (NAV) in US dollars. The user's decisions:
- **The word "crypto" appears nowhere in site copy.** The single exception is the ASCI disclaimer, verbatim,
  in the footer legal block (`asci-vda-v1`), chosen by the user. Don't paraphrase it or repeat it elsewhere.
- **Tax position (as the user stated it):** nothing is taxed when you invest; profit is business income from
  derivatives, taxed at the investor's slab rate + 4% cess, filed on ITR-3. Loss carry-forward is 4 or 8
  years depending on classification, so the copy names both and defers to the CA. The CA review is `TO CONFIRM`.
- **CA advisors:** a CA is assigned when someone joins; before that, visitors send a question (`#ask`), which
  goes to `/api/advisor-request` and on to `ADVISOR_REQUEST_WEBHOOK_URL` (see `.env.example`). Without that
  variable the form says "not sent"; it never drops a question silently.
- **Blog:** one link, `BLOG_URL` in `src/lib/links.ts`. No blog article titles on the site (they contain
  words the site's copy rules keep off it).

Facts taken from the platform (grade-backend), not invented: KYC via DigiLocker/PAN/selfie that never
auto-rejects; units at the next daily NAV; monthly plans skip a missed payment, never double-charge;
withdrawals only at maturity, only to the investor's own account; minimum US$100.
Still `TO CONFIRM`: sleeve weights (`lib/basket.ts`, illustrative 50/30/20), lock-in length, withdrawal
timing, fees, contract venue/custodian, CA response time, CA fee, advisor-desk email, registrations.

Removed in round 3 (in git history): the fee receipt and its invented fee schedule (`lib/fees.ts`), hero
variants A/B/D and `/preview`, Methodology, Routes for checkers, the partner card, the trust-check cards.

### Homepage order (`src/app/page.tsx`)
Hero (3D deck: the three sleeves) → Basket (#basket) → What-if (#what-if) → Why dollars (#why-usd) →
How it works (#how) → Tax (#tax) → Is it right for you? (#fit) → Your CA (#advisors, form at #ask) →
Blog (#learn) → FAQ (#faq) → Closing CTA.

---
*Round 2 follows. Its design-system and motion rules still apply; its homepage order and fee notes don't.*

## ROUND 2 (2026-11-03)
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
Round-1 prototypes (the source of all copy, maths and structure) were `concept-a … concept-d`; they,
the full spec `02-concepts.md` and the audit `03-audit.md` are in git history at commit `2194970`.
The shared part of the spec is kept in `content-rules.md` (§0.2 footer/legal, §0.3 copy rulebook: **binding**, §0.4 dataset).

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
- **Compliance:** follow the rulebook (`content-rules.md` §0.3). In particular:
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
