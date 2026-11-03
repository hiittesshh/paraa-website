# 03 — Audit: Paraa Capital website prototypes

*Audit agent output · 2 Nov 2026 · last stage before fixes. Nothing in the concept folders was edited; fixes go back to the build agents through the SEND-BACK LIST below.*

**How to read this.** The verdict for each concept and the top 5 issues come first. Then there is a scorecard, the full findings table, the send-back list (the part developers act on), the compliance claims register, and the evidence: browser runs, contrast maths and calculator checks. Every finding cites `file:line`. All paths are relative to `D:\paraa-website\`.

---

## 1. Executive summary

| Concept | Verdict | One-line reason |
|---|---|---|
| **A — The Open Book** | **Needs fixes** (small) | The strongest proof-led concept, and its maths is right. But the hero shows return figures without a benchmark (R4), and 4 of the 5 FAQ groups vanish when JavaScript is off. |
| **B — Rupee vs Dollar** | **Needs fixes** | The calculators all work. But the fee and the headline are rounded with ceiling/floor so they match the spec instead of the maths. The rupee chart is unreadable on phones, and several light-theme labels fail contrast. |
| **C — The Firm** | **Needs fixes** | Distinctive and well built. But commission maths sits on the homepage that retail visitors are routed to (R13), "Approved by Compliance" badges read as real approvals, and one letter contradicts the dataset. |
| **D — Downside First** | **Needs fixes** (small) | The most honest concept. But one page uses two opposite sign conventions for "rupee move", and the risks page understates exit costs by about ₹1,200 compared with the fee schedule. |

No concept needs a rework. Once the High items are fixed, every concept is fit to show as a prototype.

**Top 5 issues overall**

1. **Rounding is not one rule, and the spec's own check values are wrong.** The fee formula in the spec gives ₹2,472.37. Concept A shows ₹2,472 (correct). Concept B uses `Math.ceil` to force ₹2,473 (`concept-b/concept.js:116`). B also floors its birth-year headline to ₹2,713 (`concept-b/concept.js:63`), but the line under it says US$30.84, and 30.84 × 88 = ₹2,714. A reader who checks gets a different number. Concept D's 6-month exit example says you'd receive "about ₹98,505" (`concept-d/risks.html:229`); the fee schedule gives ₹97,280. **Rule decided below (§6).**
2. **Red text and small labels fail contrast.** On dark cards, the shared `--negative` (#EF4444) measures 4.31:1 on `--surface` and 3.81:1 on `--surface-2`. Every small loss figure in tables (the A ledger, C's "−$10,000", D's stress table) is below AA. The `Illustrative` labels are 10px faint text (`shared/components.css:84`), which breaks the design file's own "10px = labels only, never sentences" rule, and on `--surface-2` they measure 4.15:1.
3. **Concept D contradicts itself on signs.** On the D homepage, the simulator uses "−5% = rupee stronger" (`concept-d/index.html:101-104`), but the stress table further down the same page uses "−18% (weaker)" (`concept-d/index.html:333`). A reader can't hold both conventions at once.
4. **Four claims read stronger than the facts allow.** These are: hero returns with no benchmark or inception date (A), "Who regulates us" (A), "Approved by Compliance, ref [ID] TO CONFIRM" written as plain text (C), and the ₹50,000 commission example on the homepage that investors are sent to (C).
5. **The no-JS and touch basics are inconsistent.** Concept A ships tab panels with `hidden` in the HTML, so without JS the FAQ answers can't be reached (`concept-a/index.html:628-647`). Every range slider is 32px tall (`shared/components.css:126`). The chart points in A are 24px. B's rupee chart renders its axis labels at about 6px on a 375px phone.

**What was verified, and how.** Every page was loaded in headless Chrome 156 through a small Node + DevTools-protocol script (no Puppeteer), at 375, 768, 1024 and 1440px. The script measured horizontal overflow, controls under 44px, heading order, unlabeled inputs, SVGs without text alternatives, fonts in use and console errors, then ran a second pass with JavaScript disabled. Screenshots are in `C:\Users\mhite\AppData\Local\Temp\claude\d--main-advisor-app-main-advisor-app-main-investor-app\ccecb5e1-3973-4b48-b02e-a75a649f814d\scratchpad\audit\shots\`, and I looked at them. Each `concept.js` was also loaded in Node, and its pure functions were run against the spec's check values. Contrast ratios were computed with the WCAG 2 formula.
**Not verified:** a real screen reader (NVDA or VoiceOver), real iOS or Android devices, the share-card PNG download in B (canvas output wasn't exercised; code review only), and `prefers-reduced-motion` behaviour (code review only: `shared/motion.css:10-12` and `shared/motion.js:5` handle it correctly).

---

## 2. Scorecard (1 = poor, 5 = excellent)

| Dimension | A | B | C | D |
|---|---|---|---|---|
| 1. Professionalism and design-file fidelity | 4 | 3 | 4 | 4 |
| 2. Accessibility | 3 | 3 | 3 | 3 |
| 3. Responsiveness (375 / 768 / 1024 / 1440) | 4 | 3 | 4 | 4 |
| 4. Compliance risk (5 = lowest risk) | 3 | 4 | 3 | 3 |
| 5. Distinctiveness (5 = least generic) | 5 | 4 | 4 | 5 |
| 6. Cross-concept dataset consistency | 4 | 3 | 3 | 3 |
| 7. Functional correctness | 4 | 4 | 4 | 4 |

Shared good news:
- No concept page overflows horizontally at any of the four widths.
- No page logs a console error.
- Manrope loads everywhere.
- There's exactly one `<h1>` per page, no heading levels are skipped, every input has a label, and every SVG is either `aria-hidden` or labelled.
- No banned word appears outside the two allowed exceptions (the hidden SEBI-mandated line and C's "Never say" column).
- No page mentions crypto.

---

## 3. Findings table

Severity: **Blocker** = must not be shown to anyone. **High** = fix before showing outside the team. **Medium** = fix in this round. **Low** = polish. Dimensions use the numbers from the scorecard (1–7).

### shared/ (affects every concept)

| ID | Sev | Dim | File:line | Issue | Fix |
|---|---|---|---|---|---|
| S1 | High | 2 | `shared/tokens.css:79` | Dark `--negative` #EF4444 measures 4.90:1 on `--bg`, **4.31:1 on `--surface`** and **3.81:1 on `--surface-2`**. Small red text in tables and cards fails AA: the A ledger "Month" column, C "−$10,000", the D stress table, and A's chart label "Largest fall" (3.84:1). | Change the dark value to `--negative: color-mix(in srgb, var(--error) 80%, var(--white));`. That gives 5.41:1 on surface and 4.78:1 on surface-2, and it is still a tint of the labelled design colour. Use `var(--error)` directly where a *fill* is wanted (bars, bands). |
| S2 | High | 1, 2 | `shared/components.css:84` | `.stat-source` is 10px (`--fs-xs`) in `--text-faint`. It carries full sentences and the compliance label ("as of 31 Oct 2026 · in USD · net of fees · Illustrative"). The design file says 10px is "labels only, never sentences" (`00-design-tokens.md:69`). On `--surface-2` it measures 4.15:1. | `.stat-source { font-size: var(--fs-sm); color: var(--text-muted); }` |
| S3 | Medium | 2 | `shared/tokens.css:90-91`, `components.css:75` | In the light theme, `--text-faint` (grey-500) measures 4.25:1 on `--bg-alt` (paper), and `.badge-accent` (gold-800 on gold at 18%) measures 4.37:1 on paper. Both fail for 12px text. This hits B's calculator card, rebrand bar and footer headings. | In the light block, set `--text-muted: var(--grey-700); --text-faint: var(--grey-600);` (6.77:1 on paper). Add `[data-theme="light"] .badge-accent { color: var(--gold-900); }` (7.46:1). |
| S4 | Medium | 2, 3 | `shared/components.css:126` | Range sliders have `min-height: 32px`, so every slider in B, C and D is under the 44px target (measured: 32px tall at all widths). | Change it to `min-height: 44px`. |
| S5 | Medium | 2 | `shared/components.css:107` (comment) / pattern | The tabs component claims to "work as stacked panels without JS". That's only true if the HTML has no `hidden` on panels. A ships `hidden` panels, so without JS they're unreachable (see A3). | Document it in the component comment: "Never put `hidden` on a tabpanel in HTML; `motion.js` hides inactive panels on load (line 50)." |
| S6 | Medium | 1, 4 | every page footer (for example `concept-b/index.html:593`, `concept-d/index.html:653`) | R15 says disclaimers are components rendered from one source. In practice `global-risk-v1` is pasted into 8 pages. The footers also differ: B and D have no "Foreign entities" line (§0.2.2) and no `sr-only` footer `h2`, and the company details are a `dl` in A, a `ul` in C and a run-on `p` in B and D. | Add `shared/disclosures.js`, exporting `{ 'global-risk-v1': '…', 'sebi-mandated-v1': '…', … }`. On load it fills every `[data-disclosure-id]`; keep the current static text as the no-JS fallback. Make all footers use Concept A's footer markup (`concept-a/index.html:670-780`) exactly. |
| S7 | Medium | 6 | `02-concepts.md` (spec, not code) | The spec's check values disagree with its own formulas. **A5.4** says "11 months" underwater; the dataset (§0.4) gives 14. **A5.5, R7 and B5.6** say ₹2,473 / ₹97,527; the formula gives ₹2,472.37 / ₹97,527.63. **B3** says ₹2,713; 1000 × 88 / 32.43 = ₹2,713.54. | Design agent: change the spec to **14 months**, **₹2,472 (2.47%)**, **₹97,528** and **₹2,714**, and add the rounding rule from §6 to R10. |
| S8 | Low | 7 | `shared/motion.js:57` | `Paraa.pct` writes a hyphen-minus, not U+2212 (R10). No concept uses it today. | Use `'\u2212'` for negatives, or delete the helper. |
| S9 | Low | 1 | `shared/tokens.css:63,68,99,100`; `components.css:13,103,147,179` | Four hex values aren't in the design file: #17181B (`--bg-alt`), #F5F5F6 (`--text`), #047857 and #B91C1C (light positive and negative). Some sizes are off-scale: 15px, 22px, 20px. The proto-bar uses a raw `rgba()`. | Record the four hexes in `00-design-tokens.md` as derived values (with the reason), or replace them with `color-mix()` on design tokens. Move the off-scale sizes to the nearest step (14 / 24 / 18). The proto-bar is prototype chrome, so it can stay as is. |
| S10 | Low | 1 | `concept-a/index.html:18-27`, `concept-b/index.html:18-24`, `concept-c/index.html:18-27`, `concept-d/index.html:18-27` | The rebrand bar is built three different ways: the close icon is an SVG or the `&times;` glyph, the link sits inside or outside the `p`, and the `aria-label` reads "Name change notice" or "Rebrand notice". | Move `.rebrand-bar` into `components.css` with one markup pattern (A's) and one label ("Name change notice"). |
| S11 | Low | 7 | `index.html:78`, `index.html:25` | The gallery links to `COMPARISON.md`, which doesn't exist. At 375px, the `nowrap` badge in the header widens the layout to 412px. | Create the file, or remove the row. Add `white-space: normal` to that badge. |
| S12 | Low | 2 | `shared/components.css:12,49` | `.brand` (28px) and standalone `.link-arrow` (22px) are under 44px in C, D and the gallery. A and B patch this in their own CSS. | Move A's patch into components.css: `.brand { min-height: 44px; }` and `a.link-arrow { display: inline-flex; align-items: center; min-height: 44px; }`. |
| S13 | Low | 1 | `shared/base.css` | `<code>` falls back to monospace (`concept-a/nav.html:293`, `concept-d/index.html:319`, `concept-d/risks.html:91,286`), which breaks the "Manrope only" rule. | Add `code { font-family: var(--font); font-variant-numeric: tabular-nums; }`. |
| S14 | Low | 3 | `shared/components.css:176` | The fixed proto-bar covers the last footer line in A and B. C and D pad for it themselves. | Add `body { padding-bottom: 80px; }` next to `.proto-bar` and remove the per-concept copies. |
| S15 | Low | 7 | all pages | Dead `href="#"` links (the shared site-map stubs): A 40 / 32 · B 41 / 37 · C 51 / 34 · D 42 / 43 (index / second page). No page has a broken *file* link or a missing anchor. | Expected for a prototype. Before any external showing, point them at one shared `stub.html?page=…` page ("Page in preparation"), so nothing silently jumps to the top of the page. |

### Concept A — The Open Book

| ID | Sev | Dim | File:line | Issue | Fix |
|---|---|---|---|---|---|
| A1 | High | 4 | `concept-a/index.html:174-177`, `:280-286`; `nav.html:106-107` | The "Since inception **+10.6%**" and "Annualised **+4.6%**" figures have no comparison and no inception date. R4 needs four things: period, net or gross, currency and comparison. The hero stat row also has no working off-switch (A10 asks for a config flag; only a bare `data-hero-stats` attribute exists). | Change the stat-source to "since 1 Jul 2024 · in USD · net of fees · vs USD cash TO CONFIRM · Illustrative" (with the `TO CONFIRM` in a `placeholder-tag`). In `concept.js`, add `var CONFIG = { perf: 'on' }`, read `?perf=off`, and when it's off hide `[data-hero-stats]` and the two return stats in the explorer. |
| A2 | Medium | 4 | `concept-a/index.html:204` | The card title "Who regulates us" asserts that a regulator exists. B5 says no licence is confirmed. | Change it to **"Our registrations, if any"**. Keep the body text and the TO CONFIRM tag. |
| A3 | High | 2 | `concept-a/index.html:303,309,628,633,638,643`; `nav.html:216,222` | The tab panels have `hidden` in the HTML. The no-JS run confirmed 6 hidden panels on the homepage, so 4 of the 5 FAQ groups and the Basket 2/3 notes are unreachable. | Delete the `hidden` attribute from every `role="tabpanel"`. `shared/motion.js:50` already hides inactive panels once JS runs. |
| A4 | Medium | 7 | `concept-a/nav.html:186`, `:252` | The no-JS fallback says "The monthly grid below shows every month", but the grid `<tbody>` is built only by JS, so it's empty without JS (confirmed). | Write the 3 year rows (2024–2026) into the HTML as static cells, with the same values the JS produces; the JS can rebuild them. Otherwise, change the fallback to "The full history needs JavaScript or the CSV download." |
| A5 | Medium | 2 | `concept-a/concept.css:129-131` | The chart points are 24×24px (30 per chart, 56 on /nav). That's too small to tap. | Keep the 8px visible dot but make the button 44×44: `width: 44px; height: 44px; margin: -22px 0 0 -22px;`. |
| A6 | Medium | 4 | `concept-a/index.html:645` | "We don't offer currency speculation." is a factual claim about a structure that isn't confirmed yet (spec A10 flags it). | Change it to "We don't offer currency speculation `<span class="placeholder-tag">TO CONFIRM with counsel</span>`." |
| A7 | Low | 1 | `concept-a/concept.css:125,127` | Chart text is 11px, which is off the type scale. | Use `font-size: var(--fs-sm)`. |
| A8 | Low | 3 | `concept-a/concept.css:48-50` | At 375px, the header CTA "See every number" wraps onto 2 lines and "Paraa Capital" wraps (seen in the screenshot). | At `max-width: 440px`, hide `.nav-actions .btn` (the hero CTA is on screen anyway; B already does this). |
| A9 | Low | 1 | `concept-a/index.html:270,396,400,471,539`; `nav.html:130,184,255,344` | There are inline `style=""` attributes. | Replace them with classes in `concept.css` (`.fig-flush { margin-inline: 0 }`, `.mt-4`, and so on). |
| A10 | Low | 5 | `concept-a/index.html:579-605` | The router cards are generic in structure. | See §7: add one concrete artefact preview to each card. |

### Concept B — Rupee vs Dollar

| ID | Sev | Dim | File:line | Issue | Fix |
|---|---|---|---|---|---|
| B1 | High | 6 | `concept-b/concept.js:115-116`; `index.html:399`; `learn.html:302` | The fee total is rounded *up* (`Math.ceil`) to match the spec's ₹2,473. The maths gives ₹2,472.37, and Concept A shows ₹2,472. | Change it to `totalShown: Math.round(total)`. Change the static fallback text in both HTML files to `₹2,472`. |
| B2 | Medium | 6 | `concept-b/concept.js:63`; `index.html:88-89` | The headline is floored to ₹2,713, but the same block says "bought US$30.84", and 30.84 × 88.00 = ₹2,714. A checker sees a mismatch. | Change it to `inrTodayShown: Math.round(inrToday)` and remove the "rounded DOWN" comment. Change the static `₹2,713` (×2) to `₹2,714`. The share card follows automatically. |
| B3 | Medium | 3 | `concept-b/index.html:134`; `concept.css:81-88` | `<figure class="card rupee-chart">` keeps the browser's default 40px side margins, so it's narrower than its section (visible at 375px). Its SVG text is 12px inside a 720-unit viewBox, which renders at about 6px on a phone. | Add `.rupee-chart { margin-inline: 0; }`. At `max-width: 640px`, set `.rc-axis, .rc-band-label { font-size: 22px; }` and `.rc-end { font-size: 24px; }` (in viewBox units, so about 11–12px on screen), and hide the 2014 and 2022 x-labels. |
| B4 | Medium | 2 | `concept-b/concept.css:47,55` | The calculator card sits on `--bg-alt` (paper). There, the sample text (faint) measures 4.25:1, the `Illustrative` badge 4.37:1 and the source line 4.25:1. | Set `.calc-card { background: var(--surface); }` (white). S3 then covers the rest. |
| B5 | Medium | 5 | `concept-b/index.html:411-430` | "If you do want it managed" is a generic 3-step "how it works" (Vested, INDmoney and Groww have the same thing). | See §7: replace step 2 with a one-line rupee-in/rupee-out worked example that uses the fee receipt figure. |
| B6 | Low | 6 | `concept-b/index.html:312,331`; `learn.html:143-144`; `concept.js:124` | Dollars are written in Indian grouping ("US$2,50,000", "US$2,48,864"). Elsewhere: "$48,000", and A's "$11.06". | Apply the §6 rule: dollars use international grouping, so US$250,000 and US$248,864. Use `toLocaleString('en-US')` in `fmtUSDIndian` and rename it `fmtUSDIntl`. |
| B7 | Low | 4 | `concept-b/learn.html:144` | The worked example uses a name ("Priya"). It's allowed because it's labelled Example, but R11's spirit says no invented people. | Change it to "Example: a student sends US$8,000 for a course in May. Limit left for the year: US$242,000." |
| B8 | Low | 4 | `concept-b/index.html:93` | "This is the currency alone, not an investment" is smaller (12px, muted) than the ₹ headline it qualifies. | Give it the `.calc-line` size (16px), the same as the lines above. |
| B9 | Low | 1 | `concept-b/index.html:36` | B adds a 7th nav item, "Rupee & you", which isn't in the shared global nav. | Acceptable for this concept's second page, but put it under "How it works ▾" so the global nav stays the same everywhere. |

### Concept C — The Firm

| ID | Sev | Dim | File:line | Issue | Fix |
|---|---|---|---|---|---|
| C1 | High | 4 | `concept-c/index.html:399-413` | The homepage shows "20 clients × ₹5,00,000 × 0.50% = ₹50,000 a year". R13 says commission talk lives only under `/advisors`, and this page's "Investing for myself" tab invites retail visitors in. | Delete the `.mini-earn` card (`:408-412`). Keep the H2, the trail-commission line and the "No targets…" line, and change the link to `link-arrow` "See what partners earn" → `advisors.html#model`. |
| C2 | High | 4 | `concept-c/advisors.html:185,191,197` | Each badge reads "Approved by Compliance, ref [ID] TO CONFIRM, valid until [date]" as plain text. On screen it reads as an approval that has happened. | Replace each with `<span class="placeholder-tag">Compliance approval ref TO CONFIRM</span>`. Don't show the word "Approved" until a real reference exists. |
| C3 | Medium | 6 | `concept-c/index.html:561-562` | The letter "Sep 2026 · A strong month, and why we didn't chase it / The month went our way" contradicts the dataset: Sep 2026 was **−0.5%** (11.02 → 10.97). | Change the title to "Sep 2026 · A small loss, and why we kept our limits", and the excerpt to "The basket fell 0.5% in dollars. Here is why we didn't change its limits." |
| C4 | Medium | 4 | `concept-c/index.html:405` | "No incentive to churn your clients" is only true if there is no upfront commission (spec C10), and that is TO CONFIRM. | Change it to "No targets. No contests." and add `<span class="placeholder-tag">No-churn claim depends on upfront commission: TO CONFIRM</span>`. |
| C5 | Medium | 4 | `concept-c/index.html:532-540` | The "Regulator" row is an empty, placeholder-only entry, which still implies an existing relationship with a regulator. | Delete that `<details>` until a real, disclosable entry exists. Keep the disclosure at `:542`. |
| C6 | Medium | 4 | `concept-c/index.html:384` | "Sold for a house purchase, disclosed 2 Aug 2026" is a personal financial disclosure, and it needs written consent (spec C10). | Change the note to "Sale. Reason shown only with the person's written consent `<span class="placeholder-tag">TO CONFIRM</span>`". |
| C7 | Medium | 5 | `concept-c/index.html:547-621` | The letters grid, DDQ form and "Talk to us" form are generic as built. While the names are TO CONFIRM, the "named person" difference doesn't show. | See §7. |
| C8 | Low | 6 | `concept-c/index.html:383,394`; `concept.js:80` | "$1,10,000" and "$1,80,000" use Indian grouping for dollars. | Per §6: $110,000 and $180,000. In `concept.js:80`, use `toLocaleString('en-US')`. |
| C9 | Low | 1 | `concept-c/index.html:102` vs `:379` | The same role is called "Chief risk officer" in one place and "Risk officer" in the other. | Use "Chief risk officer" in both. |
| C10 | Low | 4 | `concept-c/index.html:500`; `advisors.html:251` | "(TO CONFIRM)" appears as plain text in the success messages. | Render it as a `placeholder-tag` (build the status with `innerHTML` from a trusted constant, or add a second span). |
| C11 | Low | 4 | `concept-c/advisors.html:89-127` | The earnings model has no disclosure component (R15). | Add `<p class="disclosure" data-disclosure-id="advisor-earnings-v1">Illustrative. Not an offer. Trail rate TO CONFIRM. This models your pay, not your clients' returns.</p>`. |

### Concept D — Downside First

| ID | Sev | Dim | File:line | Issue | Fix |
|---|---|---|---|---|---|
| D1 | High | 2, 6 | `concept-d/index.html:333,340,347,354` and `risks.html:301,309,317,325` vs `index.html:101-104` | The stress table says "−18% (weaker)", but the simulator on the same page uses "−5% = rupee stronger". The two sign conventions are opposite. | Use the simulator's convention (+ = rupee weaker = USD/INR up). Change the cells to "+18% (rupee weaker)", "+19% (rupee weaker)", "+6% (rupee weaker)" and "−6% (rupee stronger)". On `risks.html`, delete the now-duplicate "USD/INR change" column (`:292` and its cells). |
| D2 | High | 6 | `concept-d/risks.html:229` | The 6-month exit example says "exit fee ₹1,000 … conversion ₹495 … receive about ₹98,505". It leaves out conversion-in and management fees. The fee schedule (A's receipt function) gives ₹97,280. | Replace it with: "You invest ₹1,00,000 and withdraw after 6 months: conversion in ₹500, management fee ₹744, exit fee ₹988, conversion out ₹489. You'd receive about ₹97,280 (assumed return 0%)." |
| D3 | Medium | 6 | `concept-d/index.html:461` | The October letter says "Two withdrawal requests were delayed by a missed US holiday (now fixed)". A's log says 16 Sep, 38 requests, already fixed in September. | Change it to "In September, 38 withdrawal requests were delayed a day by a US holiday our timeline missed (now fixed; see log)." |
| D4 | Medium | 4 | `concept-d/index.html:334-356`; `risks.html:303-328` | Simulated results are coloured green and labelled "(gain)", which styles a simulation like a track record. | Remove the `pos` and `neg` classes from the simulated cells (keep the sign, and add the word "simulated"). In `concept.js:250-251`, stop toggling `pos`/`neg`. Change the header to "Simulated in ₹ (not a track record)". |
| D5 | Medium | 4 | `concept-d/index.html:393-406`; `risks.html:345-358` | The kill-switch items are written as binding promises, and they aren't legally confirmed (spec D10). | Add under the lede: "Draft commitments. Not in force until Legal confirms each threshold `<span class="placeholder-tag">TO CONFIRM</span>`." |
| D6 | Medium | 5 | `concept-d/index.html:473-534` | The "What the app asks you" rail is a 5-step onboarding strip that every app site has. Only step 3 differs. | See §7. |
| D7 | Low | 1 | `concept-d/index.html:395`; `risks.html:347` | The phrase "minus no exit fee" is awkward. | Change it to "with no exit fee". |
| D8 | Low | 1 | `concept-d/risks.html:63` | The badge says "About 400 words · 2 min", but the brief is about 170 words. | Change it to "About 170 words · under 2 min". |
| D9 | Low | 7 | `concept-d/concept.js:144` | The quiz's "Check the cheaper DIY routes first" link goes to `#`. | Point it to `risks.html#dont`, or to a stub until a DIY page exists in D. |
| D10 | Low | 7 | `concept-d/concept.js:128` | A request at exactly 15:00 counts as "after the cut-off". | Use `>` in the code, or change the copy to "at or after 3 pm". |
| D11 | Low | 1 | `concept-d/index.html:163-232` | All 5 risk meters are gold, which is the most gold on any page. D8 allows it, but it isn't "sparingly". | Optional: `.risk-card .meter i.on { background: var(--text-muted); }`. |

**Totals: 9 High, 22 Medium, 25 Low (56 findings). There are no Blockers.**

---

## 4. SEND-BACK LIST (Blocker / High / Medium only)

Apply these exactly. Each item refers to the finding ID above for the evidence.

### shared/ (7 items: build lead; S7 goes to the design agent)
1. **S1** In `shared/tokens.css`, in the dark block (line 79), change `--negative: var(--error);` to `--negative: color-mix(in srgb, var(--error) 80%, var(--white));`. Leave the light theme as it is.
2. **S2** In `shared/components.css:84`, set `.stat-source { font-size: var(--fs-sm); color: var(--text-muted); }`.
3. **S3** In `shared/tokens.css`, in the `[data-theme="light"]` block, set `--text-muted: var(--grey-700); --text-faint: var(--grey-600);`. In `components.css`, add `[data-theme="light"] .badge-accent { color: var(--gold-900); }`.
4. **S4** In `shared/components.css:126`, change `min-height: 32px` to `44px` on `input[type="range"]`.
5. **S5** In `shared/components.css:107`, replace the comment with: "Never put `hidden` on a tabpanel in HTML; motion.js hides inactive panels."
6. **S6** Create `shared/disclosures.js`, holding the text of `global-risk-v1`, `sebi-mandated-v1`, `nav-explorer-v1`, `nav-centre-v1`, `splitter-v1`, `learn-v1`, `stress-v1`, `c-regulator-log-v1` and `advisor-earnings-v1`. On load it sets `textContent`/`innerHTML` for each matching `[data-disclosure-id]` and leaves the static text when JS is off. Load it on every page. Copy Concept A's footer block (`concept-a/index.html:670-780`) into B, C and D, keeping each concept's own link targets.
7. **S7 (design agent, `02-concepts.md`)** A5.4: "11 months" → "**14 months**". A5.5 check value: "₹2,473 (2.47%)" → "**₹2,472 (2.47%)**", "₹97,527" → "**₹97,528**". R7 example and B5.6 row: ₹2,473 → **₹2,472**. B3: ₹2,713 → **₹2,714** (in both places). Add to R10: "Compute at full precision. Round half-up to the nearest rupee (or 0.1%) only when displaying. Never round directionally. A receipt's total is the rounded raw total. Dollar amounts use international grouping (US$250,000)."

### Concept A (6 items)
1. **A1** On every "Since inception" and "Annualised" stat (`index.html:174-177, 280-286`; `nav.html:106-107` caption at `:130`), make the source line read "since 1 Jul 2024 · in USD · net of fees · vs USD cash <placeholder-tag TO CONFIRM> · Illustrative". In `concept.js`, add `var CONFIG = { perf: 'on' }` with a `?perf=off` override that hides `[data-hero-stats]`, `[data-stat="ret"]`'s and `[data-stat="ann"]`'s parent `.stat`, and the comparison-table return columns.
2. **A2** `index.html:204`: change "Who regulates us" to "**Our registrations, if any**".
3. **A3** Remove `hidden` from `index.html:303,309,628,633,638,643` and `nav.html:216,222`.
4. **A4** Write the monthly-grid rows statically into `nav.html:252` (2024: Aug–Dec plus a "Start" cell for Jul; 2025: all 12; 2026: Jan–Oct, with the year totals that `calendarYears()` gives). Keep the JS rebuild.
5. **A5** `concept.css:129-131`: make `.nc-pt` 44×44 with `margin: -22px 0 0 -22px`, and keep the `::after` dot at 8px.
6. **A6** `index.html:645`: append a `placeholder-tag` "TO CONFIRM with counsel" after "We don't offer currency speculation."

### Concept B (5 items)
1. **B1** `concept.js:116`: `totalShown: Math.round(total)`. `index.html:399` and `learn.html:302`: change the static text to `₹2,472`.
2. **B2** `concept.js:63`: `inrTodayShown: Math.round(inrToday)`. `index.html:88-89`: change both `₹2,713` to `₹2,714`.
3. **B3** `concept.css`: add `.rupee-chart { margin-inline: 0; }`, plus `@media (max-width: 640px) { .rc-axis, .rc-band-label { font-size: 22px; } .rc-end { font-size: 24px; } }`. In `index.html`, add `class="rc-axis rc-axis-minor"` to the 2014 and 2022 labels (`:174,:176`) and hide `.rc-axis-minor` under 640px.
4. **B4** `concept.css:47`: `.calc-card { background: var(--surface); }`.
5. **B5** `index.html:420`: replace step 2 with "Add rupees from your bank. On ₹1,00,000 held a year, fees come to ₹2,472 (Illustrative; see the fee receipt). Route: <placeholder-tag TO CONFIRM>."

### Concept C (7 items)
1. **C1** Delete `index.html:408-412` (`.mini-earn`). Change `:406` to `<a class="link-arrow" href="advisors.html#model">See what partners earn</a>`, and make the `.split` a single column.
2. **C2** `advisors.html:185,191,197`: replace each badge with `<span class="placeholder-tag">Compliance approval ref TO CONFIRM</span>`.
3. **C3** `index.html:561`: title "Sep 2026 · A small loss, and why we kept our limits". `:562`: "The basket fell 0.5% in dollars. Here is why we didn't change its limits."
4. **C4** `index.html:405`: change it to "No targets. No contests." followed by `<span class="placeholder-tag">No-churn claim depends on upfront commission: TO CONFIRM</span>`.
5. **C5** Delete `index.html:532-540` (the "Regulator" entry).
6. **C6** `index.html:384`: change the note to "Sale. Reason shown only with the person's written consent" + `placeholder-tag` TO CONFIRM.
7. **C7** Apply the §7 de-generic suggestions to the Letters, DDQ and Talk-to-us sections.

### Concept D (6 items)
1. **D1** Change the stress-table "Rupee move" cells to "+18% (rupee weaker)", "+19% (rupee weaker)", "+6% (rupee weaker)" and "−6% (rupee stronger)" in `index.html:333,340,347,354` and `risks.html:301,309,317,325`. On `risks.html`, delete the "USD/INR change" header (`:292`) and its four cells. Change both captions to "+ = rupee weaker (USD/INR up), the same as the simulator."
2. **D2** `risks.html:229`: replace the example with "You invest ₹1,00,000 and withdraw after 6 months: conversion in ₹500, management fee ₹744, exit fee ₹988, conversion out ₹489. You'd receive about ₹97,280 (assumed return 0%)." + `badge` Illustrative.
3. **D3** `index.html:461`: "In September, 38 withdrawal requests were delayed a day by a US holiday our timeline missed (now fixed; see log)."
4. **D4** Remove `pos` and `neg` from the simulated cells (`index.html:334-356`, `risks.html:303-328`). In `concept.js:250-251`, delete the two `classList.toggle` lines. Change the header text to "Simulated in ₹ (not a track record)".
5. **D5** Under the commitments lede (`index.html:391`, `risks.html:343`), add: `<p class="callout callout-warn">Draft commitments. Not in force until Legal confirms each threshold <span class="placeholder-tag">TO CONFIRM</span>.</p>`
6. **D6** Apply the §7 suggestion to the app-flow rail.

---

## 5. Compliance claims register

Status key: **OK** = fine as written. **Hedge** = keep, with the rewrite given. **Remove** = take it out. **Needs Compliance** = can't be decided here; a human with authority must sign off.

| # | Concept | File:line | Claim (quoted) | Status | Safer rewrite / condition |
|---|---|---|---|---|---|
| 1 | A | `index.html:176` | "Since inception +10.6%" | Hedge | Add the inception date and comparison (A1). Production needs audit + TWRR + every basket shown. |
| 2 | A | `index.html:285` | "Annualised +4.6%" | Hedge | As #1. |
| 3 | A | `index.html:204` | "Who regulates us" | Hedge | "Our registrations, if any" |
| 4 | A | `index.html:645` | "We don't offer currency speculation." | Needs Compliance | Keep only with the TO CONFIRM tag until counsel confirms. |
| 5 | A | `index.html:515-539` | "Days since last logged incident: 47 … within [N] business days" | Needs Compliance | It is an operational promise. Legal must confirm N. |
| 6 | A | `index.html:466` | "Assets held by a custodian are normally kept separate…" | OK | Already hedged with TO CONFIRM. |
| 7 | A | `index.html:630` | "If it's not there, we don't charge it." | Needs Compliance | True only once the fee schedule is final; keep the "Performance fee: TO CONFIRM" next to it. |
| 8 | B | `index.html:88-90` | "₹2,713 … the years the rupee won" | Hedge | ₹2,714, with "currency alone, not an investment" at the same size (B2, B8). |
| 9 | B | `index.html:185-188` | "When it helps … When it hurts" | OK | Both directions, same size (R2 met). |
| 10 | B | `index.html:312` | "LRS … up to US$2,50,000 … across all purposes" | Needs Compliance | Already marked VERIFY. Write US$250,000. |
| 11 | B | `learn.html:180` | "TCS … counts towards your income tax … isn't a fee kept by anyone" | Needs Compliance | A tax outcome claim. Keep VERIFY; a CA must sign it off. |
| 12 | B | `index.html:398-401` | "It isn't the cheapest option on this list" | OK | Honest, and it names categories rather than competitors. |
| 13 | B | `learn.html:144` | "Priya sends US$8,000…" | Hedge | Remove the name (B7). |
| 14 | C | `index.html:90,111,153` | "Own money in Paraa baskets: $48,000 / $22,000 / $0" | Needs Compliance | Personal disclosures; they need consent from each person and a quarterly sign-off. |
| 15 | C | `index.html:384` | "Sold for a house purchase" | Needs Compliance | C6. |
| 16 | C | `index.html:410` | "20 clients × ₹5,00,000 × 0.50% = ₹50,000 a year" | Remove (from home) | Keep it only on `/advisors` (C1). |
| 17 | C | `index.html:405` | "No incentive to churn your clients." | Hedge | C4. |
| 18 | C | `advisors.html:185-197` | "Approved by Compliance, ref [ID]…" | Remove | A placeholder-tag only (C2). |
| 19 | C | `index.html:272` | "Fund administrator (independent)" | Needs Compliance | "Independent" needs a named firm. It is already TO CONFIRM. |
| 20 | C | `index.html:530` | "two of our staff must approve any revision" | Needs Compliance | A process claim; it must be true before launch. |
| 21 | C | `index.html:535` | "Regulator · TO CONFIRM" Q&A entry | Remove | C5. |
| 22 | C | `advisors.html:85` | "If you aren't registered as an investment adviser, you're a distributor…" | OK | Matches brief §3.2. |
| 23 | C | `index.html:433-439` | The "Never say" column ("dollar appreciation", "tax-free", "no fees") | OK | The R1 exception (quoted as forbidden examples). |
| 24 | D | `index.html:124-125` | "₹78,731 … You'd have lost ₹21,269" | OK | A loss default, labelled Illustrative; the gain preset is also present. |
| 25 | D | `index.html:330-357` | Stress table "+14.2% (gain)" etc. | Hedge | Make the colour neutral and say "Simulated" in the header (D4). Compliance may also require removing the ₹ column (spec D10). |
| 26 | D | `index.html:393-406` | Kill-switch "we return your money at NAV within [30] days" | Needs Compliance | Binding promises; add the "Draft" line (D5). |
| 27 | D | `index.html:505` | "A red answer pauses your sign-up." | Needs Compliance | The app team must build it first. It is already TO CONFIRM. |
| 28 | D | `risks.html:394`; `:408` | "No borrowing to increase positions … None allowed, in every basket" / "Borrow to amplify returns" (don't-list) | Needs Compliance | Must be true for every basket. This wording correctly avoids "leverage". |
| 29 | D | `risks.html:229` | "You'd receive about ₹98,505" | Remove | It understates costs; use ₹97,280 (D2). |
| 30 | D | `index.html:550` | "This checks nothing itself." (platform checker) | OK | Correctly avoids implying an endorsement by a regulator. |
| 31 | D | `index.html:457` | "Basket 1 rose 0.8% in dollars in October" | OK | It matches the dataset (+0.8%) and is labelled Illustrative. |
| 32 | All | footer | "Registered name / Registrations … TO CONFIRM" | OK | It is the empty-slot rule done right. A row ships only when all five cells are real. |
| 33 | All | footer | SEBI-mandated line, hidden | OK | Hidden until a SEBI-registered entity is confirmed; verbatim, so exempt from R1. |
| 34 | All | footer | "We never ask for your OTP, PIN or money over WhatsApp…" | OK | It is a promise, but a standard and operationally easy one. |

Things I looked for and did **not** find anywhere:
- "forex" (outside FAQ/never-say), "leverage", "guaranteed", "safe", "insured", "#1/best/first" (as rankings), "tax-free" (outside never-say)
- crypto or USDT
- testimonials, stock photos, invented full names (the one exception is B7)
- any currency benefit shown in one direction only

---

## 6. Cross-concept dataset: the single rules, and who changes what

**Rule 1: rounding.** Compute at full precision. Round **to the nearest** rupee (half-up), or to 0.1% for percentages, **only at display**. Never round up or down to make a number "safe" or to match a spec value. A displayed total is the rounded raw total. Why: these sites ask the reader to *check* the numbers. Directional rounding makes the visible inputs disagree with the visible result. B's ₹2,713 vs 30.84 × 88 = ₹2,714 is one example, and a receipt whose lines don't add up is another. For the fee receipt the lines add up exactly: 500 + 0 + 1,482 + 0 + 490 = **₹2,472**, and 1,00,000 − 2,472 = **₹97,528**.

**Rule 2: time underwater.** Derive it from the dataset: peak Mar 2025 (10.79) → first month-end above it, May 2026 (10.82) = **14 months**. Both A (`index.html:346`, computed) and D (`risks.html:211`, computed) already show 14. Only the spec says 11; it's a typo. **Change the spec, not the code.**

**Rule 3: dollar formatting.** ₹ uses Indian grouping (₹1,00,000). US$ uses international grouping (US$250,000, $110,000).

**Rule 4: the rupee-move sign.** Everywhere, **+ means the rupee weakened** (USD/INR went up, your rupee value rises), and **− means it strengthened**. B's splitter and D's simulator already do this; D's stress table doesn't.

| Figure | A | B | C | D | Correct | Who changes |
|---|---|---|---|---|---|---|
| Fee on ₹1,00,000 for 12 months | ₹2,472 ✓ | ₹2,473 ✗ | — | (2.5% drag, consistent) | ₹2,472 | B (B1), spec (S7) |
| You receive | ₹97,528 ✓ | — | — | — | ₹97,528 | spec (S7) |
| Birth-year headline, 1995 | — | ₹2,713 ✗ | (references the card) | — | ₹2,714 | B (B2), spec |
| Time underwater | 14 ✓ | — | — | 14 ✓ | 14 | spec only |
| 6-month exit, ₹1,00,000 | ₹97,280 (receipt) | — | — | ₹98,505 ✗ | ₹97,280 | D (D2) |
| Sep 2026 month | −0.5% ✓ | — | "a strong month" ✗ | — | −0.5% | C (C3) |
| US-holiday withdrawal incident | 16 Sep, 38 requests ✓ | — | — | "two requests", Oct letter ✗ | 16 Sep, 38 | D (D3) |
| Rupee-move sign | — | + = weaker ✓ | — | mixed ✗ | + = weaker | D (D1) |
| Dollar grouping | $11.06 ✓ | US$2,50,000 ✗ | $1,10,000 ✗ | US$[X] | US$250,000 | B (B6), C (C8) |
| Weakest month / max drawdown | −6.3% / −11.8% ✓ | — | — | −6.3% / −11.8% ✓ | — | none |
| Since inception / annualised | +10.6% / +4.6% ✓ | — | — | (computed, not shown) | — | none |

---

## 7. Genericness: could each homepage section appear unchanged on a competitor's site?

"Yes" means Groww, INDmoney, Vested, Zerodha or Wealthfront could publish that section as is.

### Concept A
| Section | Generic? | Suggestion |
|---|---|---|
| Ledger hero | No | — |
| Four checkable slots | No | — |
| NAV explorer | No (since-inception default + forced drawdown shading) | — |
| Both ends of the range | No | — |
| Fee receipt | No | — |
| Custody strip | No | — |
| NAV changelog | No | — |
| Incident counter | No | — |
| Methodology | Partly | It's ours already because of the "never do" line. |
| Router (`:579-605`) | **Yes in structure** | Put one real artefact preview inside each card: the CA card shows a single sample Schedule FA row, the advisor card shows one "Say / Never say" pair, and the institution card lists the six DDQ contents. |
| FAQ by worry | No | — |
| Closing (CSV before app) | No | — |

**Working unique ideas (≥2 needed): 4** — fee receipt ✓, NAV changelog ✓, days-since counter ✓ (computes 47 today), and client-side CSV download ✓.

### Concept B
| Section | Generic? | Suggestion |
|---|---|---|
| Birth-year hero | No | — |
| Rupee honestly chart | No | — |
| Splitter with mirror row | No | — |
| Dollars do / don't (`:274-304`) | **Partly** (INDmoney's "Why US") | Attach the rupee-strengthened year next to each "can't" item. For example: "Help if the rupee strengthens while you need rupees: 2007, −8.7%." |
| LRS planner | Partly | Keep. |
| DIY comparison | No | — |
| How Paraa works (`:411-430`) | **Yes** (3 steps) | B5: use the fee figure and route gap in the steps themselves. |
| Learn cards (`:433-472`) | **Yes in format** (Varsity) | Put each chapter's one-line takeaway on its card. For example, ch 6: "If you'd sell after a 10% fall, stop here." |
| FAQ | No | — |
| Closing ("buy an ETF") | No | — |

**Working unique ideas: 3** — birth-year calculator ✓, DIY comparison that ranks Paraa last ✓, share card (button wired; PNG output not exercised by me).

### Concept C
| Section | Generic? | Suggestion |
|---|---|---|
| People register | No | — |
| Router tabs | Partly | The "Start with the risks" investor tab makes it ours. |
| Governance table | No | — |
| Entity tree | No | — |
| Skin in the game | No | — |
| Partner teaser | Yes once the earnings card is removed (C1) | Lead with a "say this, not that" pair instead of money. |
| Say / not say | No | — |
| CA pack | No | — |
| DDQ (`:468-504`) | **Partly** (a contact form) | Show the *date of the last DDQ update* and a changelog line ("Valuation policy v3, Aug 2026: Illustrative"). |
| Regulator Q&A | No | — |
| Letters (`:547-574`) | **Yes** (Marcellus-style grid) | On each card, show that letter's mandatory "what we got wrong" count ("2 mistakes listed"), shared with D's rule. |
| Talk to us (`:577-621`) | **Yes while the name is TO CONFIRM** | Show the person's register entry (role, what they decide, own holding) beside the form, so the "named person" claim is visible even before a real name exists. |

**Working unique ideas: 3** — skin-in-the-game register (static, total computed ✓), public say/not-say card ✓, regulator/auditor question log ✓.

### Concept D
| Section | Generic? | Suggestion |
|---|---|---|
| Loss simulator hero | No | — |
| Five risk cards | No (ranked, with ₹ examples) | — |
| Fit quiz that can say no | No | — |
| Stress archive | No | — |
| What can go right | No | — |
| Kill switch | No | — |
| Exit estimator | No | — |
| Letter with 3 wrongs | No | — |
| App flow rail (`:473-534`) | **Yes except step 3** | Annotate each frame with "what we will never ask here" (step 1: "never your UPI PIN"; step 4: "never a personal account"). That turns the onboarding strip into an anti-fraud guide. |
| Moving from Grade | Partly (Zerodha does anti-phishing) | Keep; the platform checker differentiates. |
| Closing | No | — |

**Working unique ideas: 5** — loss-first simulator ✓, quiz with a no-CTA red verdict ✓, stress archive ✓, exit estimator ✓ (spec check passes), kill-switch list ✓.

---

## 8. Evidence

### 8.1 Browser run (headless Chrome 156, CDP)
| Page | 375 | 768 | 1024 | 1440 | Controls < 44px (excluding inline text links) | Console |
|---|---|---|---|---|---|---|
| index.html (gallery) | **412px layout** (nowrap badge) | ok | ok | ok | brand 28px, skip-link 42px | clean |
| A index | no overflow | ok | ok | ok | 28 chart points 24×24 | clean |
| A nav | no overflow | ok | ok | ok | 28 chart points 24×24, 28 more on the compare chart | clean |
| B index | no overflow | ok | ok | ok | 3 sliders 32px tall | clean |
| B learn | no overflow | ok | ok | ok | 2 sliders 32px | clean |
| C index | no overflow | ok | ok | ok | brand 28px, skip-link 42px | clean |
| C advisors | no overflow | ok | ok | ok | brand, 2 sliders 32px | clean |
| D index | no overflow | ok | ok | ok | brand, 2 sliders, 2 link-arrows 22px | clean |
| D risks | no overflow | ok | ok | ok | brand, 3 sliders, link-arrow 22px | clean |

**No-JS pass.**
- A index: 6 tab panels hidden (A3).
- A nav: an empty month-grid tbody (A4), and the chart shows its fallback text.
- B shows the 1995 sample (₹2,713).
- C and D: all content visible.

**Font sizes found in use:** 10, 11 (A only), 12, 13 (B only), 14, 15 (brand mark), 16–48. **Font families in use:** Manrope, plus monospace for `<code>`.

### 8.2 Contrast (WCAG 2; AA = 4.5:1 for text under 18.66px bold / 24px regular)
| Pair | Ratio | Result |
|---|---|---|
| text-muted #94A3B8 on bg / surface / surface-2 | 7.19 / 6.33 / 5.59 | pass |
| text-faint #888A90 on bg / surface / **surface-2** | 5.34 / 4.70 / **4.15** | fail on surface-2 |
| **negative #EF4444** on bg / **surface** / **surface-2** | 4.90 / **4.31** / **3.81** | fail on cards |
| gold #FDC037 on bg (eyebrows, links) | 11.21 | pass |
| ink-900 on gold CTA / on hover gold | 11.21 / 10.06 | pass |
| badge-accent, dark | 9.27 | pass |
| Light: text-muted grey-600 on white / paper | 7.58 / 6.77 | pass |
| Light: **text-faint grey-500** on white / **paper** | 4.76 / **4.25** | fail on paper |
| Light: gold-800 text on white / paper | 5.27 / 4.71 | pass |
| Light: **badge-accent** on white / **paper** | 4.82 / **4.37** | fail on paper |
| Light: negative #B91C1C / positive #047857 on white | 6.47 / 5.48 | pass |
| Proposed fix: error 80% + white on surface / surface-2 | 5.41 / 4.78 | pass |
| Proposed fix: gold-900 badge on paper | 7.46 | pass |

### 8.3 Calculator check values (node, requiring each `concept.js`)
| Check | Spec | Got | Result |
|---|---|---|---|
| A since inception / annualised | +10.6% / +4.6% | +10.6% / +4.6% | PASS |
| A strongest / weakest | +4.1% Sep 2025 / −6.3% Apr 2025 | same | PASS |
| A max drawdown / negative months | −11.8% / 10 of 27 | same | PASS |
| A time underwater | 11 (A5.4) vs 14 (§0.4) | 14 | PASS against the dataset; spec typo |
| A fee receipt, total / net | ₹2,473 / ₹97,527 | ₹2,472 / ₹97,528 (raw 2,472.37 / 97,527.63) | Code right, spec wrong |
| B 1995: usdThen / strong years / worst | 30.84 / 7 / 2007 −8.7% | same | PASS |
| B 1995 headline | ₹2,713 | raw 2,713.54, shown 2,713 (floor) | Rounding rule → ₹2,714 |
| B strengthened years 1980–2026 | 2003, 04, 05, 07, 10, 17, 21 | same, derived | PASS |
| B splitter / mirror / 4 ways | ₹1,09,180 / ₹1,02,820 / 109,180, 102,820, 96,820, 91,180 | same | PASS |
| B LRS left / inflation toy | US$248,864 / 27.2% | same | PASS |
| B fee figure | ₹2,473 | ceil(2,472.37) = 2,473 | Rounding rule → ₹2,472 |
| C earnings | ₹50,000 / ₹4,167 / ₹1 crore | same | PASS |
| C team total | $1,80,000 | 180,000 summed | PASS (format → $180,000) |
| D default / both-your-way | ₹78,731 / ₹1,12,613 | same; effects −15,000 / −4,250 / −2,019 | PASS |
| D stress ₹ column / balance | +1.5, +14.2, −3.5, −3.2 / +15.5, −14.5 | same | PASS |
| D exit (Mon 2 Nov 2026, after 3 pm) | Tue 3 / Thu 5 / Mon 9 Nov | same | PASS |
| D recovery | 14 | 14 | PASS |
| D 6-month exit text vs fee schedule | — | text ₹98,505 vs schedule ₹97,280 | FAIL (D2) |

### 8.4 Links
- No broken internal file links or missing anchors on any concept page.
- Proto-bar links on all 9 pages resolve, and `aria-current` is correct.
- Gallery: `COMPARISON.md` is missing. `03-audit.md` resolves once this file exists.
- Dead `#` links: counts in S15.
