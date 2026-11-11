# Joint design/dev review: systems, consistency and QA (D3)

> **Update, 11 Nov (spec v1.4):** the owner decided the open items here:
> - OQ-1: no gold buttons (decision 64);
> - S5: adopted, with the 390 budget at 12,100 (decision 65);
> - `motion` and the registries are installed but unused (decision 66);
> - skills (decision 67).
>
> **Developers now work from `fix-list.md`,** which supersedes §5's X-list (every X item maps to an FL item there).

**Reviewer:** Designer 3 (design system, consistency, QA; spec owner). **Date:** 11 Nov 2026.

**Build:** production `next start` on :3001, build `A9mzzdmKE5Z42GGRU03NR`, branch `feat/trust-redesign`. Checked against `spec.md` v1.2. The spec is now **v1.3**: the brand board, the dev answers and this review.

**Also read:**
- `dev-questions.md` (every Dev 2 and Dev 3 item is now answered);
- `brand-board.md`;
- `joint-review-d1.md` and `joint-review-d2.md`.

**Method.** No `src/` changes. The scripts are in `C:\Users\mhite\AppData\Local\Temp\claude\c23aa2fd0974f34e\64bd01ee-d1ca-463b-90b5-6ae5b206ae35\scratchpad\`.

| Script | What it does |
|---|---|
| `qa-browser.mjs` | axe-core 4.14.0, injected through playwright-core 1.63 into Chrome. Rule tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` and `best-practice`. Also measures the DOM (B1–B5, C4–C6, F1, F7–F9, F12, I4, H1, H13) |
| `qa-board.mjs` | Injects the v1.3 roles and weights into the live build, then re-measures heights, overflow and contrast |
| `qa-readonly.mjs`, `qa-s5.mjs` | Single checks: the read-only field fill (H10), and the height cost of D2's S5 and D1's V2 |
| `chunks.mjs`, `classify-chunks.mjs`, `find-icons.mjs`, `measure-libs.mjs` | The JS budget: per-chunk gzip, and isolated library sizes with esbuild |
| `lh-1..3.json`, `lh-summary.mjs` | Lighthouse 13.6.0 through `npx lighthouse`, mobile preset, 3 runs |
| `contrast-board.mjs`, `contrast-v13.mjs` | WCAG contrast for every pairing the board changes |

The code checks (A) use the Grep tool, because `rg` isn't on PATH; the patterns are the spec's.

---

## 0. Verdict

**The build meets the v1.2 spec almost everywhere I measured:**
- axe finds **0 violations of any impact** in 15 runs (8 states × 2 widths, minus the menu at 1440);
- Lighthouse mobile medians: Performance **99**, Accessibility 100, Best practices 100, SEO 100; LCP 0.92s, TBT 104ms, CLS 0;
- every page and band budget is met.

**Two checks fail:**
- **A16:** the temporary `/dev` preview ships an extra client file;
- **I1:** First Load JS is 215 KB, but the old 140 KB budget sat below the framework's own 171 KB. v1.3 re-bases it to 200 / 30 KB, and the build still needs about 15 KB of our code cut to meet that.

**The brand board is applied in v1.3.** I simulated it on the live build:
- no page height changes at any width;
- no overflow;
- **0 AA contrast failures** at 390 and 1440.

| Severity | Count | Items |
|---|---|---|
| **Blocker** (for merge) | **1** | X1 delete `src/app/dev/` (A16) |
| **Should-fix** | **13** | The v1.3 board changes (X2–X7), the JS budget (X8), and the adopted joint-review fixes (X9–X14) |
| **Nice-to-have** | **9** | X15–X23 |
| **For the coordinator / owner** | **3** | OQ-1 gold buttons; D2's S5 fact-cell size vs the 390 budget; OQ-2 typography board |

---

## 1. QA results by check ID

✓ pass · ✗ fail · ◐ partial or not fully run (reason given).

### A. Code and tokens

| ID | Result | Evidence |
|---|---|---|
| A1 | ✓ | 0 hex, `rgb`, `hsl` or `oklch` hits in `src/components` (and none in `page.tsx`) |
| A2 | ✓ (v1.3 list) | 0 hits for arbitrary `text/leading/tracking/rounded/shadow/size`. The other arbitrary values are all on the list, except some that the build uses correctly but v1.2 didn't list:<br>• `data-[at-top]:` (header)<br>• `group-data-[size=mock]/dl:` (`DefinitionList`)<br>• `aria-[current=location]:` (`NavLink`)<br>• the mobile menu's `[&::details-content]:` opacity with `transition-[opacity,content-visibility]` and `[transition-behavior:allow-discrete]`<br>v1.3 adds them to A2. No code change |
| A3 | ✓ | 0 hits |
| A4 | ✓ | 0 hits in `src`. `package.json` has no `motion`, `@number-flow`, `@radix-ui` or `tw-animate` |
| A5 | ✓ | `tone="ink"`: 1 hit (`home/security.tsx:35`). `theme-ink`: 1 file (`ui/section.tsx`) |
| A6 | ✓ | 0 hits |
| A7 | ✓ | Only `rounded-none` on the allocation-bar segments and swatch |
| A8 | ✓ | `shadow-panel` only in `mock-frame.tsx` and `mobile-menu.tsx`; `ring-*` only in `field.tsx` |
| A9 | ✓ (v1.3 list) | No `dark:` and no inline colour or background. Inline `style` is used for:<br>• `flexGrow` (bar, `SplitBar`)<br>• `left` (zero tick)<br>• `--a` / `--b` (slider)<br>• `transform` (`DivergingBar`, now listed per Dev Q25)<br>`--w` is set from the ref, not inline |
| A10 | ✓ | `utils.test.ts` has the §2.3 `cn()` cases. v1.3 adds `text-brand-foreground` |
| A11 | ✓ | 0 hits |
| A12 | ✓ | The disclosure phrases appear only in `src/content/disclosures.tsx` |
| A13 | ✓ | Every gate is green:<br>• `npm run typecheck`, exit 0<br>• `npx eslint src`, exit 0<br>• `npm test`, 51 tests, exit 0<br>• build: the :3001 production build. I ran the todo guard's `findTodos("src")` directly and it found **0 hits**, so `npm run build` passes **without** `REVIEW_BUILD` |
| A14 | ✓ | 0 hits for "to confirm / todo / lorem / tbd" in the :3001 HTML (172,872 bytes) |
| A15 | ✓ | 0 hits |
| A16 | **✗** | Client files: the §9 list plus `ui/tabs.tsx` (client by §4.12) **and `src/app/dev/components/demos.tsx`**. The preview route returns 404 in production, but its code must not merge → **X1** |
| A17 | ✓ | `bg-data-gold` is only in `ui/allocation-bar.tsx` (Dev 2's C2 consolidation) |
| A18 | ✓ | `advisor-forward.test.ts` covers:<br>• 200 with the reference format<br>• the payload shape and token<br>• 422 (invalid, non-object)<br>• 503<br>• 502 (non-2xx, throw, timeout)<br>• the 8s default<br>• the honeypot (also with no webhook)<br>• `readAskForm` and `toAskState` |
| A19 | ✓ | Negative margins: only `-mx-4` (prompts), the readout's `-mx-5 -mt-5 sm:-mx-8 sm:-mt-8`, `-mb-px` (tab) and `-ml-1` / `-mt-1` (path arrows) |
| A20 | ◐ | With `APP_URL = null`, "Get the app" appears 0 times. The test-URL half needs a local build with a URL set; not run |
| A21 | ✓ | The extended `text-wrap: pretty` selector and `[tabindex="-1"]:focus { outline: none; }` are present. The only other `outline-none` is §5.1's own `<main tabIndex={-1} class="… outline-none">` |

### C. Accessibility (automated)

| ID | Result | Evidence |
|---|---|---|
| C1 | ✓ (◐ "failed") | axe 4.14.0 with the six tags above, at 390×844 and 1440×900. **0 violations of any impact** in each of these states:<br>• default<br>• menu open (390)<br>• tools tab 2<br>• form invalid<br>• sending (POST held 2.5s)<br>• 503 (no webhook)<br>• sent (honeypot answer)<br>• offline (`setOffline`)<br>**Not run:** "failed" (502), which needs a failing webhook. D2 exercised it on a second server without axe. It renders the same `Alert error` as offline and 503, which both pass |
| C2 | ✓ | Lighthouse Accessibility 100 in 3 of 3 runs |
| C3 | ✓ | axe `color-contrast`: 0 failures in every state, including the band and its light mock. **v1.3 roles injected:** 0 AA failures. The only flags are AAA-only: grey-600 on Light is 6.77, under AAA's 7:1, and AA is the target |
| C4 | ✓ with **X12** | **All targets ≥ 44×44 except the footer "FAQ" link, at 26 × 44** (every width; D2's S3 found the same) → X12. The script also flagged things that aren't targets:<br>• slider and field labels (22px tall; their controls are ≥ 44)<br>• the consent checkbox (20 × 20 inside a label ≥ 44 tall)<br>• the sr-only honeypot<br>• links in the closed menu (`content-visibility: hidden`)<br>v1.3 rewords C4 and §8 so labels count only where they are the hit area |
| C5 | ✓ | One `h1`. h1 → h2 → h3 → h4 with no skips; sr-only `h2`s "Before you start" and "Site information". The success heading is an `h3`: "Thank you. We’ve received your question." |
| C6 | ✓ | 1 `header`; `nav`s named "Main", "Main menu" (mobile) and "Site"; `main#main`; 1 `footer`; every `main section` is named (`aria-labelledby`) |

### I. Performance

| ID | Result | Evidence |
|---|---|---|
| I1 | **✗** (v1.2 and v1.3 budgets) | **215.0 KB** gzip over 10 scripts on `/`; **170.7 KB** on a 404 URL (the empty-page baseline); so **44.3 KB is ours**. v1.2's 140 / 35 budget is unreachable, since the framework alone is 170.7. **v1.3 budget: ≤ 200 total / ≤ 30 ours** (decision 63). The cut is X8, analysed in §2 |
| I2 | ✓ (by chunk scan) | `next analyze` wasn't run. Scanning every chunk for module markers finds no motion, number-flow or Radix code; `package.json` doesn't list them |
| I3 | ✓ | Lighthouse 13.6.0, mobile (simulated Slow 4G, 4× CPU), median of 3:<br>• Performance **99** (100 / 99 / 99)<br>• **LCP 0.92s** (the h1)<br>• **TBT 104ms** (64 / 117 / 104)<br>• **CLS 0.000**<br>• FCP 0.92s, Speed Index 1.05s<br>The remaining insights aren't ours to fix:<br>• the render-blocking CSS file (11 KB, about 140ms estimated)<br>• 14 KB of legacy polyfills and 26 KB of unused code, both in the React DOM chunk |
| I4 | ✓ | 836 elements (Lighthouse counts 804 at its viewport); budget 900 |
| I5 | ✓ | Exactly 2 woff2 (latin and latin-ext), both preloaded by the `Link` header |
| I6 | ✓ | 0 third-party requests |
| I7 | ◐ not run | INP while dragging at 4× CPU needs a DevTools trace. I3's TBT of 104ms and the 1:1 native slider give no reason to expect a problem |

### Other §11 checks I could run headlessly

| ID | Result | Evidence |
|---|---|---|
| B1 | ✓ | Every visible `h2` is 30px at 390 and 40px at 1440 |
| B2 | ✓ | At 1440 the sizes are exactly {48, 40, 24, 18, 16, 14, 12}. Weights: 400 / 600 (v1.2); with v1.3 injected, h1–h4 are 700 |
| B3 | ✓ | Radii {4, 8, 12, 16}px |
| B4 | ✓ | Box shadows on 1 element at 1440 and 2 at 390 (the mock frame, plus the menu panel) |
| B5 | ✓ (v1.2) | white · `#F8F9FD` · white · `#272A33` · `#F8F9FD` · white · `#F8F9FD` · white. With v1.3 injected, `#F2F2F2` sits in the three alternate slots |
| B17 | ✓ (v1.3 wording) | Nodes at 1440: 56 / 56 / 56 / 56 / **70** (the 3-line end node; Dev F5, D1 V3) |
| F1 | ✓ | `scrollWidth = clientWidth` at 320, 360, 390, 768, 1024, 1280, 1440 and 1920, with no element past the edge |
| F7 | ✓ | **7,649** at 1440 (51 spare) and **11,962** at 390 (38 spare). With the v1.3 tokens and 700 headings: **unchanged** at all five widths |
| F8 | ✓ | 390: cells 1 and 2 end at y = 609 / 707 (≤ 844). 1440: the row ends at y = 766 (≤ 900) |
| F9 | ✓ | Band 1,239 at 1440, 1,973 at 390 |
| F12 | ✓ | Vertical money path 380px at 390 and 768 (≤ 440) |
| G8 | ✓ (as built) | 0 ticks at the tax default at 320, 390 and 1440. At −₹2,00,000 the tick shows at 1440 only, which is §4.14's own formula (Dev F8). v1.3: 32px threshold, re-test at −₹4,00,000 |
| H1 | ✓ | With JS off:<br>• both panels are `display: block`, with no `inert` (F6 and F7 work), and the tablist is hidden;<br>• 9 native `details`;<br>• an empty submit lands on `/#ask` with 4 `aria-invalid` fields;<br>• a valid submit shows the 503 copy with no submit, no buttons and the question kept |
| H6 / H13 | ✓ | With JS: the 503 copy shows, with no submit and no prompts; "Copy my question" is the only button, and the question is kept |
| H10 | ✓ | While a POST is held, all four fields are `readOnly` with the alternate fill (`rgb(248,249,253)`, Light in v1.3) |
| H12 | ✓ | `/api/advisor-request`:<br>• bad JSON → 400 `invalid_json`;<br>• invalid → 422 with fields;<br>• valid → 503 `not_configured`;<br>• honeypot → 200 with a `PQ-` reference |
| H14 | ✓ | The open menu holds five links: The basket · How it works · Security · Calculators · FAQ. There's no CTA in it |
| D8 (part) | ✓ | An invalid submit focuses `name` |
| Sent | ✓ | The honeypot path renders `PQ-…`, the `h3`, "Copy reference" and "Ask another question" |

**Not run by me:** D, E, F2–F6, F10–F15, G1–G7, H2–H5, H7–H9, H11, H15, J and K.
- D1 and D2 ran D, E, H and K;
- D1 ran F;
- G and real-device F10 / G7 still need hands.

---

## 2. The JS budget

**Measured** (level-9 gzip of each script `next start` serves):

| | gzip | What |
|---|---|---|
| Framework (404 page) | 170.7 KB | React DOM 69.9, router 45.4, Next client 38.6, server-action runtime 7.5, Turbopack 3.8, two small chunks 5.5 |
| Chunk A | 24.9 KB | Base UI (Tabs + Button), the header and menu, the tools' shell, 9 icons |
| Chunk B | 10.4 KB | what-if, tax, `AskForm`, prompts, `CircleCheck` |
| Chunk C | 9.0 KB | `next/image`'s client component + lucide's core |
| **Total** | **215.0 KB** | 44.3 KB of it ours |

**What each library costs** (esbuild, minified and gzipped alone, with React external):
- Base UI Tabs: **13.3 KB**;
- Base UI Button: 3.1 KB, almost all of it shared with Tabs;
- Tabs + Button together: 13.3 KB;
- the 10 client lucide icons: **2.4 KB**, so **lucide is tree-shaken** and isn't worth touching.

**Decision (spec decision 63, §9):**
- **The budget is ≤ 200 KB total and ≤ 30 KB ours.** It's measured against the 404 page, because "an empty page" has to be one this repo actually builds.
- **The cut is worth making, as a should-fix (not a blocker):**
  1. **Hand-built Tabs and a native `<button>`** (−12 KB): the APG contract in §4.12 v1.3, and `@base-ui/react` leaves `package.json`.
     - It serves **two tabs**, and is 30% of our JS.
     - Its default `inert` on the hidden panel already needed Dev 3's F7 workaround against decision 28.
     - The skill guidance to use a library's Tabs is overridden on purpose, for those reasons.
  2. **`getImageProps` for the logo** (about −7.5 KB, estimated from chunk C minus lucide's core): the logo is a static PNG in a Server Component, so it needs no client JS.
- **Expected after both:** about 196 KB total, about 25 KB ours.
- **Lighthouse is already at 99,** so the user-visible gain is on low-end Android parse and compile time, not on the lab score. That's why it's should-fix.

---

## 3. Brand board → v1.3 (decisions 58–62), coordinated with D1 and D2

I own the tokens. D1 (`joint-review-d1.md` §B) and D2 (`joint-review-d2.md` §4) wrote their positions at the same time. Here is where v1.3 lands.

| Topic | v1.3 | D1 | D2 | Note |
|---|---|---|---|---|
| Primitives | Exact board values: Primary 1–6 and 400–900, Secondary 1–6 and 400–900, Light ramp, alerts, greyscale incl. 800 | ✓ (values) | – | Unused steps stay primitives with no class. A22 keeps primitives out of components |
| Light `#F2F2F2` | `--background-alt`, `--muted`, `--accent` → Light | ✓ same | ✓ | One neutral family |
| Hairlines on Light | `.theme-alt` scope sets `--border` to grey-300 (1.33) | ✓ same mechanism | ✓ (grey-300 or Primary-6) | `Section tone="alt"` maps to `theme-alt` |
| `+91` on a read-only Light field | `--placeholder` → grey-600 (6.77) | "white inputs only" | "never on Light" | **Mine:** the read-only fill *is* Light (H10), so grey-500 would be 4.25:1 there. Moving the role is the only rule that holds in every state |
| Diverging-bar track | `bg-border` (grey-300 in the section); zero line `bg-muted-foreground` | grey-300 | – | `bg-muted` would vanish on the Light inset |
| Primary hover / active | Primary-1 `#3D3F47` (10.50) / `#151517` (18.24) | ✓ | – | |
| Band ramp | ink-600 `#4C4E57`, ink-500 `#64666F`, ink-700 `#343844` | ✓ | – | Through the primitives; no role change |
| Selection | Secondary-6 `#FEE6AF` (grey-900 on it 14.58) | ✓ | – | |
| **Gold roles** | **G1** money-path end nodes · **G2** "Not Paraa." tags · **G3** logo + data · **G4** selection | G2, G3, G4 of D1's numbering ✓ | ✓ within the "never" list | D1's "the ask" (G1) is **not** adopted. See the next row |
| **Gold buttons** | **None until OQ-1** (decision 59) | Gold hero and submit buttons | Optional (V4) | The owner's own recorded answer is "Main buttons = Primary #272A33 … gold = secondary" (`build-brief.md`). D1's proposal makes gold the main-action colour, the opposite. The spec doesn't overrule the owner's words, so it asks (OQ-1, §12). `§4.3` specifies a `brand` variant (hover 6.84, active 4.50), so either answer is a two-prop change |
| Never gold | D2's list, verbatim in §3.1 | ✓ | ✓ | B6 rewritten; A23 limits `*-brand` to two files |
| Headings | 700 on display / title / heading / subhead / figure. FAQ questions → new `type-question` (600) | ✓ | ✓ (FAQ at 600) | `type-subhead` is shared by FAQ summaries and headings, so the FAQ needs its own utility (same metrics) |
| 12px `type-label` | 600 (open: OQ-2) | 600 | – | The design file's 12px styles are 800 / 500 / 400; it waits for the typography board |
| Success / warning | Variables, no class (decision 62) | ✓ | – | Nothing on the page needs them yet |

**Contrast:** every changed pairing is in Appendix A v1.3. The new ones that matter:

| Pair | Ratio |
|---|---|
| ink on Light | 12.80 |
| grey-700 on Light | 9.25 |
| grey-600 on Light | 6.77 |
| grey-500 on Light | 4.25 (never text) |
| ink on gold, and gold on ink | 8.72 |
| gold on white / Light | 1.64 / 1.47 (fills only) |
| grey-300 on Light | 1.33 |
| white card on Light | 1.12 (the border carries it) |

**Simulated on :3001** (`qa-board.mjs`), with the v1.3 roles and weights injected:
- page and band heights unchanged at 320, 390, 768, 1024 and 1440 (Δ 0);
- no overflow;
- axe: 0 AA contrast failures at 390 and 1440;
- surfaces read white · `#F2F2F2` · white · ink · `#F2F2F2` · white · `#F2F2F2` · white.

---

## 4. Cross-review alignment (what v1.3 adopted from D1 and D2)

| Item | v1.3 | Owner | Severity |
|---|---|---|---|
| D1 V1 zero tick within 32px | **Adopted** (§4.14, G8 → −₹4,00,000) | Dev 1 | should-fix |
| D1 V2 hero 6/6 at 1024–1279 | **Adopted** (§6.2, decision 20). I measured the h1 at 4 → 3 lines with the hero height unchanged | Dev 2 | should-fix |
| D1 V3 / Dev F5 end node 70px | **Adopted** (B17 reworded) | – | – |
| D1 V4 oil column 8px off | Logged, not specced | Dev 2 | nice |
| D1 V5 scenario chips `px-3` below 640 | Logged; verify at 390 first | Dev 1 (`choice-chips.tsx`) | nice |
| D1 V6 / Dev Q38 Copy reference | **Adopted** (secondary md on its own line) | Dev 3 | nice |
| D1 V7 / D2 N2 `abbr` underline | **Adopted** (base CSS) | Dev 1 | nice |
| D1 / D2 Q26 readout ink | **Adopted** (no change) | – | – |
| D2 S1 forced-colours tab | **Adopted** (§4.12, A2, H5) | Dev 1 | should-fix |
| D2 S2 outcome off-screen after a no-JS POST | **Adopted** (§7.1 `/#ask-form`, §7.4 Alerts at the top of the card, H2) | Dev 3 | should-fix |
| D2 S3 footer "FAQ" 26px | **Adopted** (§4.4 `min-w-11`); my C4 found the same | Dev 1 | should-fix |
| D2 S4 / Dev Q32 dead "Ask another question" | **Adopted** (client-only) | Dev 3 | should-fix |
| **D2 S5 fact-cell limit at the claim's size** | **Not adopted yet: coordinator.** Measured with `qa-s5.mjs`: **+50px at 390 → 12,012, over the 12,000 budget**; +34 at 1440 → 7,683 (fits). Decision 56 forbids meeting a budget by cutting honesty, so it needs either a ≥ 12px layout saving at 390 (D1 to pick), or D2's fallback of amending decision 53 ("one step down for a fact cell's second sentence") | Dev 2 (if adopted) | coordinator |
| D2 N1 long smooth scrolls | Logged | Dev 2 (`hash-handler.tsx`) | nice |
| D2 N3 "• •4821" gap | Logged | Dev 2 (`hero-panel`, `security`) | nice |
| D2 N4 "0% + 4% cess" | Logged | Dev 3 (`tax-estimator.tsx`) | nice |
| D2 N5 three buttons in failed state | Not adopted (Q31: the submit stays) | – | – |
| D2 N6 `-ml-4` | Not adopted (superseded by V6) | – | – |
| D2 N7 / N8 path label alignment, orphans | Logged | Dev 2 | nice |
| D2 N9 cold `/#ask` focus | Logged | Dev 2 (`hash-handler.tsx`) | nice |
| D2 N10 panel ring inset | Logged; carry it into the hand-built Tabs | Dev 1 | nice |

---

## 5. Fixes by owner

Each item names the spec section it implements. Do the board changes (X2–X7) as one PR, so the page never shows half a theme.

### Blocker (merge)

| # | Fix | Owner | Files | Re-test |
|---|---|---|---|---|
| X1 | Delete the temporary component preview | Dev 1 | `src/app/dev/` (whole folder) | A16 |

### Should-fix: the brand board (v1.3)

| # | Fix | Owner | Files | Re-test |
|---|---|---|---|---|
| X2 | `globals.css` per §2.1 v1.3:<br>• board primitives;<br>• roles: `--background-alt`, `--muted` and `--accent` → Light; `--placeholder` → grey-600; `--primary-hover` → ink-1; `--primary-active` → ink-900;<br>• `--brand` and `--brand-foreground` with their aliases; `--success` and `--warning` with no aliases; `--selection` → gold-6; `--data-gold` → `--p-gold`;<br>• the `.theme-alt` scope;<br>• `type-*` at 700, plus the new `type-question`;<br>• `abbr[title]`;<br>• the print `--muted` | Dev 1 | `src/app/globals.css` | B2, B5, B26, B27, C1, C3, A22 |
| X3 | `tone="alt"` → `theme-alt` | Dev 1 | `ui/section.tsx` | B5, B27 |
| X4 | FAQ questions keep 600: summary `type-subhead` → `type-question` | Dev 1 | `ui/faq-item.tsx` | B26, F7 |
| X5 | Money-path end nodes as gold fills: `bg-brand text-brand-foreground` plus `forced-colors:border-2 forced-colors:border-[CanvasText]`, dropping `border-2 border-rule bg-card` | Dev 2 | `ui/money-path.tsx` | B6, B10, H5, A23 |
| X6 | "Not Paraa." as a gold tag: `rounded-xs bg-brand px-1.5 font-semibold text-brand-foreground`. Reword the header comment ("no … gold") | Dev 2 | `home/security.tsx` | B6, F9, A23 |
| X7 | `DivergingBar` track `bg-muted` → `bg-border`; zero line `bg-border-strong` → `bg-muted-foreground` | Dev 3 | `ui/tool-result.tsx` | B18, B19 |
| – | (trivial) The font comment: "400, 600 and 700" | Dev 1 | `src/app/layout.tsx` | – |
| – | (tests) `cn("text-body-md", "text-brand-foreground")` keeps both | Dev 1 | `src/lib/utils.test.ts` | A10 |

### Should-fix: the JS budget and the joint review

| # | Fix | Owner | Files | Re-test |
|---|---|---|---|---|
| X8 | JS budget (§9, decision 63):<br>• rebuild Tabs by hand to §4.12's APG contract, keeping the exports, classes and `TabsNoScript`;<br>• `<Button>` becomes a native `<button>`;<br>• `brand.tsx` uses `getImageProps` + `<img>` (`loading: "eager"` in the header);<br>• remove `@base-ui/react`;<br>**Dev 3:** re-test `tools-tabs.tsx` (D3, E3, G4, H1, H5) | Dev 1 (+ Dev 3 re-test) | `ui/tabs.tsx`, `ui/button.tsx`, `site/brand.tsx`, `package.json` | I1 ≤ 200 / 30, I3, D3, H1, H5 |
| X9 | Zero tick hidden within 32px | Dev 1 | `ui/slider.tsx` | G8 (−₹4,00,000) |
| X10 | Forced-colours tab border: `forced-colors:border-[Canvas] forced-colors:data-active:border-[CanvasText]` | Dev 1 | `ui/tabs.tsx` (keep it through X8) | H5 |
| X11 | Hero 6/6 at 1024–1279: `lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]` | Dev 2 | `home/hero.tsx` | F8 at 1024×768, B11 |
| X12 | `FooterLink` `min-w-11` | Dev 1 | `ui/link.tsx` (FooterLink) or `site/footer.tsx` | C4 |
| X13 | No-JS outcome in view:<br>• permalink `/#ask-form`;<br>• `Panel id="ask-form"`;<br>• the 503, couldn't-send and offline Alerts at the top of the card | Dev 3 | `home/ask-form.tsx`, `home/ask.tsx` | H1, H2 (outcome in the 390 first view), C1 |
| X14 | "Ask another question" rendered only when `hydrated` | Dev 3 | `home/ask-form.tsx` | H1, D8 |

### Nice-to-have

| # | Fix | Owner | Files |
|---|---|---|---|
| X15 | Breakdown bar in its own `<dd aria-hidden class="col-span-2">`, and `DivergingBar` drops `col-span-2` (Q29) | Dev 3 | `ui/tool-result.tsx` |
| X16 | "Copy reference" as `Button secondary md mt-3` on its own line (Q38, D1 V6) | Dev 3 | `home/ask-form.tsx` |
| X17 | Pre-hydration value sync for `Slider` and `ChoiceChips`, like `AskForm` (Q36) | Dev 1 | `ui/slider.tsx`, `ui/choice-chips.tsx` |
| X18 | Scenario chips `px-3` below 640 (D1 V5, verify at 390) | Dev 1 | `ui/choice-chips.tsx` |
| X19 | Panel focus ring inset (D2 N10) | Dev 1 | `ui/tabs.tsx` |
| X20 | Oil column aligned to its segment, `gap-1` (D1 V4) | Dev 2 | `home/basket.tsx` |
| X21 | The "••4821" mask without tabular gaps (D2 N3); path label alignment and orphans (N7, N8) | Dev 2 | `home/hero-panel.tsx`, `home/security.tsx`, `ui/money-path.tsx` |
| X22 | Short smooth scrolls only, and cold `/#ask` focusing its heading (D2 N1, N9) | Dev 2 | `home/hash-handler.tsx` |
| X23 | Row label "Tax on profit (0% slab)" at the 0% slab (D2 N4; a copy change, so §6.6.2 is updated when adopted) | Dev 3 | `home/tax-estimator.tsx` |

### For the coordinator / owner

- **OQ-1, gold buttons** (§12): (0) none, the default and built now; (a) D1's gold hero and submit buttons; (b) the owner's earlier answer taken literally, a gold header CTA. One gold button per screen in every case.
- **D2 S5:** adopt with a ≥ 12px layout saving at 390, or amend decision 53 (§4).
- **OQ-2:** the typography board, which decides 12px labels (600 now) and possibly 700 for UI labels.

---

## 6. Developer items answered this round (`dev-questions.md`)

**Developer 2.** F3–F5 and Q19–Q24 are all accepted as built. The spec now states:
- F3: `ArrowDown`;
- F4: line placement;
- F5: B17 reworded;
- Q19: `ReactNode`;
- Q20: `ml-1` with nowrap;
- Q21: `abbr` only where the copy expands it;
- Q22: name first in the DOM;
- Q23: `openGraph` only in the layout;
- Q24: `sm:max-w-[600px]`.

C1–C3 are acknowledged and verified. **No code change from these answers.** Dev 2's code changes come from the board and the joint review (X5, X6, X11, X20–X22).

**Developer 3.**
- **Accepted as built:** F6 (and the `@layer base` foundation fix), F7, Q25, Q27, Q28, Q30, Q33–Q37, the slider's `shrink-0 whitespace-nowrap`, and the `AskForm` pre-hydration capture.
- **Changed:**
  - F8: 32px threshold and −₹4,00,000;
  - Q26: keep ink (no change);
  - Q29: `dd` (X15);
  - Q31: placement (X13);
  - Q32: client-only (X14);
  - Q38: secondary button (X16).
