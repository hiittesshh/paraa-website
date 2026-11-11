# Joint design/dev review: visual side (D1)

**Date:** 11 Nov 2026. **Reviewed:** the production build at `http://localhost:3001`, against `spec.md` v1.2, my reference build (`img/ref-*.jpg`, `img/ref-proposed-*.jpg`) and `dev-questions.md`.

**Method:**
- Playwright-core and Chrome, from the scratchpad root.
- Full pages and first views at **320×640, 390×844, 768×1024, 1024×768 and 1440×900**, plus 360, 1280 and 1920 for overflow, and 720×450 for the 200% zoom case.
- States captured:
  - tools on the tax tab;
  - mobile menu open;
  - FAQ with a second item open;
  - sticky readout;
  - header over the band;
  - form idle, errors, sending (held 6.5s, so the "still sending" line shows), the real 503 (no webhook) and sent (the Server Action's answer rewritten, as in `dev3/form.mjs`).
- Every §11 B check and the visual F checks were **measured in the DOM**, not only eyeballed. The scripts are in `scratchpad/design-d1/built/` (`review.mjs`, `copy.mjs`, `sticky.mjs`, `hero1024.mjs`, `board.mjs`); the raw numbers are in `report.json`.
- The owner's brand-board input arrived during this review. My proposal for it is **§B**, mocked on the real build (`img/board-*.jpg`).

## Verdict

**The build matches the spec.** It also matches the reference with its fixes (`ref-proposed`) almost pixel for pixel. All 75 spec strings I checked are present word for word. Both page budgets are met, and so is the band budget. No hairline, radius, shadow or gold is out of place.

| Severity | Count | Items |
|---|---|---|
| **Blocker** | **0** | – |
| **Should-fix** | **2** | V1 zero tick still collides with the thumb; V2 hero cramped at 1024–1279 |
| **Nice** | **5** | V3 money-path end node is 3 lines; V4 oil column 8px off its segment; V5 scenario chips wrap to 3 lines on phones; V6 "Copy reference" indent; V7 `abbr` dotted underlines |

Plus §4, my visual answers to the open dev questions, and **§B, the brand-board proposal**.

---

## 1. Heights against the budgets

| Width | Page | Budget | Band | Band budget |
|---|---|---|---|---|
| 1440 | **7,649** | ≤ 7,700 ✓ (51 spare) | **1,239** | ≤ 1,250 ✓ |
| 1024 | 7,943 | – | 1,353 | – |
| 768 | 10,724 | – | 1,661 | – |
| 390 | **11,962** | ≤ 12,000 ✓ (38 spare) | **1,973** | ≤ 2,000 ✓ |
| 320 | 13,192 | – | 2,279 | – |

The 1280 and 1920 pages are 7,649 (the container caps at 1200). With the brand-board mock (§B), the heights are **unchanged** at every width: Bold headings add no line wraps.

**Section heights at 1440 / 390:**

| Section | 1440 | 390 |
|---|---|---|
| Hero | 797 | 1,423 |
| Basket | 806 | 1,044 |
| How | 901 | 1,635 |
| Band | 1,239 | 1,973 |
| Tools | 1,270 | 2,143 |
| FAQ | 800 | 1,016 |
| Ask | 1,189 | 1,649 |
| Footer | 582 | 1,014 |

The 390 page has 38px of slack and the band 27px. Any copy added later (the FIU-IND number line, the 1930 helpline, "Get the app") will need its height accounted for in the same change.

## 2. §11 B, visual consistency

| ID | Result | Evidence (measured) |
|---|---|---|
| B1 | ✓ | Every visible h2: 30px (320, 390), 36 (768), 40 (1024, 1440) |
| B2 | ✓ | At 1440, exactly {48, 40, 24, 18, 16, 14, 12}px |
| B3 | ✓ | Radii {4, 8, 12, 16}px plus the thumb circle; no pills |
| B4 | ✓ | `shadow-panel` on the hero frame, and on the menu panel below 1024; nothing else |
| B5 | ✓ | white · grey-50 · white · **ink** · grey-50 · white · grey-50 · white |
| B6 | ✓ | Gold only as the logo, the basket bar segment and swatch, and the breakdown swatch; at most 2 uses per screen |
| B7 | ✓ | Two filled buttons on the page, hero "Ask a CA" (y = 486) and "Send my question" (y = 6,834), never in the same view; the header CTA is outline |
| B8 | ✓ | Both mocks: first text in DOM is "Example"; caption below; no %, ₹ value, price, chart or date |
| B9 | ✓ | Only icons from §3.6 (+ `ArrowDown`, see F3), stroke 1.75, 16 and 20px |
| B10 | ✓ | 2px only on fact cells, steps, "What you own", path end nodes and the selected tab bar |
| B11 | ✓ | Section top padding 64 (< 768) / 96 (≥ 768); hero 32 / 64 / 80 |
| B12 | ✓ | "Ask a CA" identical in header, hero and footer at every width |
| B13 | ✓ | Dev 1's hover captures (`dev1/*-state-*-hover.png`) show colour, border and underline only |
| B14 | ✓ | Checked chip ink; tab ink text and 2px ink bar; nav ink text and bar (`built-1440-scrolled-band.jpg`); thumb white with ink ring |
| B15 | ✓ | Four cells: same 2px ink rule, 16/600 first sentence, one arrow each |
| B16 | ✓ | 75 strings from §6 and §7 checked programmatically, 0 missing. No R1 words in visible copy (the only "safe" hits are `motion-safe` class names in the RSC payload) |
| B17 | **✗ minor** | Nodes 1–4 are 56px; the end node is **70px** (3 lines) at 1440 and 1024. Lines meet node middles (offset 0); labels are ≤ 2 lines. See V3 |
| B18 | ✓ | Result column = card height on both tabs (904 / 904, 631 / 633 at 1440); inner wrapper `sticky` |
| B19 | ✓ | Names ink 600, detail lines grey-600 400, amounts right-aligned, bars span the row (414 / 414px) |
| B20 | ✓ | Group 3 grid 453 / 635 at 1440; rule 1px ink-600, full content width |
| B21 | ✓ | All four step bodies start at y = 2,018 at 1440, including the 2-line "Add money to your wallet" |
| B22 | ✓ | 2 × 2 at 320 and 390 (119 / 154px, equal); one row from 640 |
| B23 | ✓ | Sent: every child at the same x (37 / 694); buttons "Copy reference", "Ask another question"; no ring on the heading |
| B24 | ✓ | "What you own" rule 1,152px; text 634px |
| B25 | ✓ | Registered with FIU-IND · You can lose money · Withdrawals go only to you · We never ask for your OTP or PIN |

## 3. §11 F, visual parts

| ID | Result | Evidence |
|---|---|---|
| F1 | ✓ | No horizontal overflow at 320, 360, 390, 768, 1024, 1280, 1440 or 1920 |
| F2 | ✓ | At 720×450 (1440 at 200%): header `relative` (not sticky), readout static, no overflow |
| F6 | ✓ | At 320, "Markets and the rupee" is 144×62 (2 lines); no chip is truncated |
| F7 | ✓ | §1 |
| F8 | ✓ | 1440: facts row at y = 670 with all four first sentences in view (`built-1440-first-view.jpg`). 390: cells 1–2 in full (bottom 707) and cell 3's first sentence (`built-390-first-view.jpg`) |
| F9 | ✓ | §1 |
| F11 | ✓ | At 320 the right group ends at x = 304 = the content edge; 102 + 24 + 91 + 8 + 44 = 269 |
| F12 | ✓ | Vertical path 380px at 390 and 768; arrows centred under their 20px lines (x 36 / 36), 4px above the next node |
| F13 | ✓ | One column at every width; the mobile helper sits between its label and input |
| F14 | ✓ | No "Get the app"; How it works ends on the off-ramp, the footer on "Ask a CA" |
| F15 | ✓ | Hero panel 48px below the facts row (390, 768); footer brand → links 40px; tab list → card 24px |

The readout (decision 32, K12) reads "Example result: ₹74,100 (−25.9%)" and "Estimate: you’d keep ₹68,800", on one line at 320. Stuck under the header it brings the chrome to 112px: 13% of 844 and 18% of 640 (`built-390-readout-sticky.jpg`, `built-320-readout-sticky.jpg`). That's acceptable.

---

## 4. Discrepancies

### V1 (should-fix): the zero tick still touches the thumb

- **What:** §4.14 hides the tick while the thumb's centre is within **24px** of zero. 24px is the thumb's *diameter*, but the collision we set out to stop is the tick touching the thumb's *edge* (12px from centre). Just past 24px the tick sits 12px from the thumb edge and reads as the "⊢◯" glitch from Round D:
  - **768, tax tab, default +₹1,00,000:** 26px from zero, so the tick shows beside the thumb (`built-768-tools-tax.jpg`);
  - **390, what-if, Gold −5% (the default scenario):** 24.3px, so the tick shows touching the thumb (`built-390-tools-default.jpg`, Gold slider).
- **Where:** `src/components/ui/slider.tsx` (the `nearZero` threshold), spec §4.14 and G8.
- **Fix:** hide the tick while the thumb centre is within **32px** of zero (thumb 24px plus 8px clear). G8 still passes as written: at 1440, −₹2,00,000 is 48px from zero and the tick shows. At 390 the tax tick shows from about −₹3,00,000 (Dev 3's F8 already proposes that wording for G8).

### V2 (should-fix): hero cramped at 1024–1279

- **What:** at 1024 the L3 5/7 grid gives the copy column 380px, so the 48px h1 breaks over **4 lines** ("One basket / that follows US / stocks, gold / and crude oil": 216px, with "US" split from "stocks"). The first view at 1024×768 then shows the facts row's first sentences only (`built-1024-first-view.jpg`). It's the one width where the hero reads crowded.
- **Where:** `home/hero.tsx` grid classes; spec §6.2 ("Grid at 1024: L3 5/7").
- **Fix (tested on the build):** `lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`, so 6/6 from 1024 and 5/7 from 1280. Measured:
  - h1 goes from 4 lines to **3** at 1024;
  - the hero height is unchanged (845);
  - the panel at 464px still fits every row on one line (`built-1024-first-view-proposed-6-6.jpg`);
  - 1152 and above are unchanged (already 3 lines).
- **Spec text:** §6.2 Grid row: "1024: 6/6 (464 / 464); ≥ 1280: L3 5/7".

### V3 (nice): money-path end node is 70px tall (B17, Dev F5)

- **What:** "Your bank account, in your name" wraps to 3 lines in a 145px (1440) or 122px (1024) node. Every line still meets its node's middle, so nothing looks broken; it's only taller than its neighbours (`built-1440-full.jpg`, How it works).
- **Fix:** answer Dev F5 by **rewording B17** to "nodes are 56px except the end node, which may be 70px; every line meets its node's vertical middle". Changing the copy or the ratio buys little: with `px-2` the node still wraps to 3 lines at 1024.

### V4 (nice): the oil column starts 8px left of its bar segment

- **What:** at ≥ 1024 the sleeve grid uses `gap-6` while the bar uses `gap-1`. US stocks and gold line up exactly (x 144 / 144, 720 / 720), but crude oil starts at 1,075 while its segment starts at 1,067 at 1440.
- **Where:** `home/basket.tsx`, spec §6.3 ("grid `grid-cols-[50fr_30fr_20fr] gap-6`").
- **Fix:** the sleeve grid takes the bar's gap (`gap-1`) and keeps its `pr-6` inside each column. All three columns then start exactly under their segments, and the text spacing doesn't change.

### V5 (nice): scenario chips wrap to 3 lines on phones

- **What:**
  - **390:** chips are 154px. "All three fall / Rupee stronger too" and "Stronger rupee / Rupee 5% stronger" wrap their notes to 2 lines, giving 84px chips next to 62px ones.
  - **320:** 119px chips reach 106px tall.

  The chips read as cramped, and this is the tool's first decision (`built-390-tools-default.jpg`).
- **Fix:** below 640, `twoLine` chips use `px-3` instead of `px-4` (12px). At 390 the notes then get 128px of text width, which should fit "Rupee stronger too" on one line. **Verify at 390 before adopting.** At 320 the wrap stays, which is acceptable.

### V6 (nice): "Copy reference" indented on its own line at 390 (Dev Q38)

- **What:** the quiet `md` button wraps under "Your reference: PQ-…" and its `px-4` starts the label 16px in from the text edge (`built-390-form-sent.jpg`). At 1440 it sits inline and looks right.
- **Fix:** make it a **`secondary md` button on its own line** (`mt-3`), the same as "Copy my question" in the 503 alert. That gives both Copy buttons one look, removes the indent at every width, and needs no negative margin.

### V7 (nice): `abbr` dotted underlines

- **What:** the browser's default `abbr[title]` dotted underline shows on KYC (step 1), VDA (tax rules) and FIU-IND (band row D, FAQ). On the ink band it reads as a stray hairline under "FIU-IND" (`built-1440-scrolled-band.jpg`). The gloss is already written out in words, and the tooltip does nothing on touch (Dev Q21).
- **Fix:** `abbr { text-decoration: none; }` in base CSS. The `title` stays for screen readers and mouse hover.

### Known, not a discrepancy

**The gold logo is faint on white** (1.64:1), at 40px in the header and footer (owner decision 52). The single swap point in `brand.tsx` is ready for the ink-wordmark lockup.

## 5. Visual answers to the open dev questions

| Q | Answer | Why |
|---|---|---|
| F3 | **Add `ArrowDown` to §3.6 and B9** | §4.11 requires it; it renders at 16px with stroke 1.75 like the rest |
| F4 | **Confirm line placement** | Rendered layout is identical at every width; no arbitrary properties needed |
| F5 | **Reword B17** (V3) | – |
| Q20 | **Confirm `ml-1` + `whitespace-nowrap`** | At 1440 every first sentence fits on one line; the arrow never orphans |
| Q22 | **Confirm** | Visually correct at both layouts; the heading-first DOM is better for screen readers |
| Q24 | **Confirm** | Widths match §6.2 exactly; capping at 600 from 640 looks better than stretching to 719 |
| Q26 | **Keep the readout ink** | "Example result:" is the honesty word; it shouldn't recede to grey. The value already stands out at 600 |
| Q28 | **Confirm `lg:rounded-r-md`** | Checked at 1024 and 1440: the fill stays inside the card's corners |
| Q38 | **Replace with V6** | One look for both Copy buttons beats a negative margin |

---

## B. Brand board: how the page should apply it (proposal for v1.3)

**Input:** `brand-board.md` and `img/brand-colors-board.png` (owner, 11 Nov). Light `#F2F2F2` becomes the light surface. Secondary gold becomes a real secondary role. The ramps take the board's exact values. Headings go Bold 700.

**Coordination:** Designer 3 owns the v1.3 tokens. Everything below is stated as roles and values, so D3 can name the variables.

**Mocked on the production build** by injecting only these rules (`scratchpad/design-d1/built/board.mjs`). Images:
- `img/board-1440-first-view.jpg`, `board-1440-full.jpg`, `board-390-first-view.jpg`, `board-390-full.jpg`, `board-1024-full.jpg`;
- section crops `board-{1440,390}-{basket,how,security,numbers,ask}.jpg`.

### B1. The idea: gold marks the two things a visitor should notice

Gold has to earn its place, or the page slides back into the promotional look the audit removed (T5, T7). So gold appears only where it carries a meaning, always **as a fill with ink on it**, or as a fill sitting on the ink band:

| # | Gold role | Where | Meaning | Spec |
|---|---|---|---|---|
| G1 | **The ask** | Hero "Ask a CA" (lg) and form "Send my question" (lg): the page's two decision points | "This is the step to take" | Fill `#FDC037`, border `#FDC037`, text ink (**8.72:1**). Hover: Additional-600 `#E5A920` (ink 6.84). Active: Additional-700 `#B98818`. Focus ring: ink, 2px |
| G2 | **Your money's start and end** | Money path end nodes, "Your bank account" and "Your bank account, in your name" | "Your money starts and ends in your own account", the section's whole message | Fill gold, no border, text ink. Middle nodes become Light `#F2F2F2` |
| G3 | **The verdict** | The band's three "Not Paraa." labels | Caution: the thing to remember from the fake pairs | `Tag`-shaped fill: gold, ink text 600, 4px radius, `px-1.5`, on ink (gold vs ink 8.72) |
| G4 | **Identity and data** (unchanged) | Logo; the gold sleeve in the basket bar, swatches and breakdown | The brand; the gold asset | As built |

**The primary/secondary button system that results:**
- **ink fill** = "confirm inside a component" (no use on the page today; it stays available);
- **gold fill** = "the ask";
- **outline** = everything else: the header "Ask a CA", "Try again", the Copy buttons, "Ask another question".

The header CTA **stays outline**, so there's never more than one gold button in view. In the hero view the hero button is the only gold action, and in the Ask view the submit is.

**Gold budget per screen (measured on the mock, ≤ 3 including the logo):**

| View | Gold uses |
|---|---|
| Hero | logo + G1 = 2 |
| Basket | logo + data = 2 |
| How | logo + G2 = 2 |
| Band | logo + G3 = 2 |
| Tools | logo + data = 2 |
| FAQ | logo = 1 |
| Ask | logo + G1 = 2 |

**Considered and rejected:**
- **Gold nav marker, gold tab bar, gold selected chips:** a gold line or fill on white is 1.64:1, below the 3:1 a state indicator needs (WCAG 1.4.11). In the tools, a gold "selected" chip would also sit beside the gold sleeve's swatch and read as "gold". These stay ink.
- **Gold result panel or figure:** wrapping a −25.9% loss in gold reads as celebratory. Results stay neutral (R8 equal weight).
- **Gold on the Example tag or the facts row:** honesty labels and the "You can lose money" cell must stay neutral (owner decision 1).
- **A gold band or gold section background:** that's the old CTA band (audit T7).
- **Gold text anywhere:** fails on light (1.64 / 1.47:1). The board's gold shades are fills only.

### B2. Light `#F2F2F2`: the alternate surface

| Use | Value | Contrast | Note |
|---|---|---|---|
| **Alternate sections** (Basket, Run the numbers, Ask) | `#F2F2F2` replaces grey-50 `#F8F9FD` | White cards on it: **1.12:1** (today 1.05) | The cards (tool, form) now separate from their section without a shadow. The rhythm white → Light → white reads more clearly |
| **The tool result column** at ≥ 1024 | `#F2F2F2` | – | Inset inside the white card |
| **Quiet fills on white**: mock note, money-path middle nodes, `accent` hover, read-only inputs | `#F2F2F2` replaces grey-100 `#F1F5F9` | – | One neutral fill family instead of a cool and a neutral grey side by side |
| **Hairlines on a Light section** | `--border` becomes grey-300 `#CBD5E1` inside `tone="alt"` | 1.33:1 | **Required:** grey-200 is **1.10:1** on `#F2F2F2`, effectively invisible. Same mechanism as `.theme-ink`: the section scope redefines `--border` |
| **Diverging-bar track** on the Light inset | grey-300 | – | `bg-muted` would vanish on `#F2F2F2` |
| Text on Light | ink 12.80 · grey-700 9.25 · grey-600 6.77 | all ≥ 4.5 ✓ | grey-500 is **4.25:1** on Light, so the `placeholder` role stays white-inputs-only (it already is) |
| `::selection` | Secondary-6 `#FEE6AF` replaces gold-200 | ink on it 11.71 | Board value |
| **The ink band** | No Light surface inside it; the mock island stays white | Light on ink 12.80 if ever needed | Body text stays grey-300 (9.65). White keeps the island reading as "the app" |
| The Light ramp `#F3F3F3` … `#FAFAFA` | **No role** | – | Nothing on the page needs a second near-white. Adding unused tokens invites misuse (decision 16's rule). Add one only with a job |

### B3. The ramps take the board's exact values

| Role (spec v1.2) | Was (eyedropped) | Board value |
|---|---|---|
| `primary-hover` | ink-600 `#484B55` | Primary-1 **`#3D3F47`** (white on it 10.5) |
| `primary-active` | ink-900 `#131416` | Additional dark-900 **`#151517`** |
| band `--border` | ink-600 `#484B55` | dark-600 **`#4C4E57`** |
| band `--border-strong` | ink-500 `#62646C` | dark-500 **`#64666F`** |
| band `--muted` / `accent` | ink-700 `#32353F` | dark-700 **`#343844`** |
| band `--card` | ink-800 `#1F2027` | dark-800 `#1F2027` (same) |
| gold hover / active (new, G1) | – | 600 **`#E5A920`** / 700 **`#B98818`** |
| selection | gold-200 `#FEE2AC` | Secondary-6 **`#FEE6AF`** |
| Success, Warning | – | `#10B981`, `#FACC15` as tokens, **fills, icons and borders only**, never text on light. No current use; add the tokens for the board, give them no class until a job exists |

### B4. Bold 700 headings and the type rhythm

- **Bold 700** on `type-display` (48), `type-title` (40), `type-heading` (24), `type-figure` and the result and small-section `type-subhead` headings ("After one year", "Tax estimate", "What happens next").
- **Stay 600:** FAQ questions (they're control labels in a list of nine, not headings, and nine bold 18px lines read heavy), nav, buttons, chip labels, row values, `type-label` and fact-cell first sentences. Manrope's Semibold is a design-file weight, so this follows the file.
- **Stay 400:** body, ledes, captions.
- **Measured on the build:** **no line breaks change** at 390, 1024 or 1440. The h1 is 3 / 4 / 3 lines and every h2 the same height, so the page heights are identical (§1) and every B check still passes.
- **What it does to the rhythm:** the heading-to-body contrast goes up a step, so section starts read faster on the long phone page. The h1 at 48/700 holds −0.025em tracking without clotting (`board-1440-first-view.jpg`). I'd keep every size, line height and tracking unchanged.
- **One thing to watch:** the band's 24px h3s at 700 on ink look slightly heavier than on white (light-on-dark halation). Accept for v1.3; if it bothers the owner, `type-heading` on `.theme-ink` can drop to 600 without breaking B2.
- **Open:** the file lists body styles as Bold, Medium or Regular (no Semibold). If the typography board, when it arrives, says UI labels are Bold, the 600 set above moves to 700 in one token. Nothing else changes.

### B5. What v1.3 needs to change (for D3)

1. **Roles:**
   - `--background-alt` and `--muted` / `--accent` (light) → `#F2F2F2`;
   - a `tone="alt"` scope that sets `--border` to grey-300;
   - band and ink ramp values per B3;
   - `--selection` → `#FEE6AF`.
2. **A new button variant `accent`:** gold fill, ink text, hover `#E5A920`, active `#B98818`. Used by the hero CTA and the form submit only. Decision 10 (header CTA outline) and B7 (one filled button per screen) stand.
3. **MoneyPath:** end nodes `bg-brand border-0` with ink text; middle nodes Light.
4. **Band Group 2:** "Not Paraa." rendered as a gold `Tag` fill (`rounded-xs px-1.5 bg-brand text-primary-foreground`), not plain bold white.
5. **Type:** heading roles 700 as in B4, plus B2's "exactly 7 sizes" check unchanged. New QA check: "Bold only on heading roles and figures".
6. **Gold rule rewrite** (replaces decision 13): "Gold is a fill, never text on light and never a state line on light. It marks the ask (G1), your money's start and end (G2), the band's verdict (G3), the logo and the gold sleeve. ≤ 3 gold uses per screen including the logo." B6 becomes "only G1–G4".
7. **Contrast table additions:**

| Pair | Ratio |
|---|---|
| ink on gold | 8.72 |
| ink on `#E5A920` | 6.84 |
| ink, grey-700, grey-600 on `#F2F2F2` | 12.80 / 9.25 / 6.77 |
| grey-500 on `#F2F2F2` | 4.25 (placeholder never on Light) |
| grey-300 hairline on `#F2F2F2` | 1.33 (decorative) |
| white card on `#F2F2F2` | 1.12 |

---

## Images (`img/`)

| File | Shows |
|---|---|
| `built-{320,390,768,1024,1440}-full.jpg` / `-first-view.jpg` | The production build as is |
| `built-{390,768,1440}-tools-default.jpg`, `-tools-tax.jpg` | Tools, both tabs (V1 tick at 768; V5 chips at 390) |
| `built-{390,768}-menu-open.jpg` | Mobile menu |
| `built-{390,1440}-faq-open.jpg` | FAQ with a second item open |
| `built-{320,390,768}-readout-sticky.jpg` | The readout stuck under the header |
| `built-{390,1440}-scrolled-band.jpg` | Header over the band, current marker |
| `built-{390,1440}-form-{idle,errors,sending,503,sent}.jpg` | Every form state |
| `built-1024-first-view-proposed-6-6.jpg` | V2 fix applied on the build |
| `board-*.jpg` | §B mocked on the build |
