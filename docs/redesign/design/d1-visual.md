# D1: visual design and brand identity (draft for cross-review)

**Author:** Designer 1 (visual language, brand consistency). **Date:** 10 Nov 2026. **Branch:** `feat/trust-redesign`.
**Superseded in part (round B):** `review-d1.md` §4 lists the 15 positions this draft now gives up. Where they differ, the review wins. The changes cover gold for state, band order, the panel's percentages, the hero cells, gain/loss colour, the tag size, tabs and the type details.
**Scope:** the whole homepage, from the visual angle. Where a visual choice depends on a UX or system decision, I state my position so D2 (UX and trust) and D3 (system and QA) can argue with it (section 11).

**Inputs read:** all five research files and their shots, `audit-2026-11-10.md`, `content-rules.md` §0.3, `content-audit.md`, `design-tokens.md`, `src/app/page.tsx`, `globals.css`, every component in `src/components/`, and today's screenshots of the running page at 1440 and 390.

**Tested, not just written.** I built a static HTML sketch of the whole page and screenshotted it at 1440×900, 768×1024 and 390×844 with playwright-core. The numbers marked **[S]** below were measured on that sketch. Contrast ratios were computed with the WCAG 2.x formula **[C]**. Images are in `img/` (index in the appendix). The sketch source is at `…\scratchpad\design-d1\sketch.html`. It's a throwaway, not code to port.

**The skill.** I ran `ui-ux-pro-max` with `--design-system "banking finance trust light minimal" --variance 3 --motion 2 --density 3`. This time it returned **Trust & Authority + Conversion**, **Minimalism & Swiss Style** and the **Banking/Traditional Finance** palette (navy, slate, a gold accent, `#F8FAFC` background), not the dark/crypto output the researchers got from "fintech" queries. Its type suggestion (IBM Plex Sans, "Financial Trust") is noted and set aside, because Manrope is fixed. Guideline IDs in `code` come from its `references/quick-reference.md`. Where I deviate from the skill, I say why.

---

## 0. The idea in one paragraph

**The page is set like a well-kept statement, not an advert.** It's white and grey, structured with hairlines and small labels rather than boxes. Numbers use tabular figures. Ink does the work and gold only marks a few things. The only "pictures" are the product drawn in HTML (one panel in the hero, one crop in the security band) and two diagrams drawn with rules: the basket's composition bar and the money path. One dark band holds everything about protection and fakes. Nothing moves unless you touch it. The test for every element: *could a careful accountant have laid this out?* If it looks like decoration, it goes.

---

## 1. Design principles

Each principle has a purpose and the evidence behind it.

| # | Principle | Purpose | Evidence / guideline |
|---|---|---|---|
| P1 | **Rules, not boxes.** Structure comes from 1–2px hairlines and 12px uppercase labels. Cards are kept only for things that really are objects (the app panel, the tool, the form, the crop). | An unknown company earns trust by looking measured. A grid of identical rounded cards is the strongest "generated site" tell (audit D1, D2). | TRM's labelled hairline columns (`trm-03`), Wise's hairline fee list (`wise-05`). Skill: Minimalism "no unnecessary decorations, clean borders"; `whitespace-balance`. |
| P2 | **Gold marks, it never decorates.** Gold has five jobs (section 2.2) and is banned everywhere else. | When gold is everywhere it means nothing and the page reads as promotional (audit T5). Kept scarce, it means "this is Paraa" or "you are here". | Zerodha's orange appears only on price numerals; TRM and Chainalysis each use one accent (`institutional.md` §3.4). Skill: Trust & Authority "accent… only"; Minimalism "single primary only"; `color-semantic`. |
| P3 | **The product is the only illustration.** No scenery, people, 3D, icons-in-circles, gradients or glow. Product UI is built in HTML, labelled "Example" inside its own frame, and states no value, gain or price. | Decoration says nothing about the product (audit T1). An HTML panel stays sharp, selectable and light (audit F5). | TRM's HTML product panel (`trm-02`); Zerodha's static product hero (`zerodha-01`); Mercury's dated UI crops (`mercury-05`). Skill: *Product Demo* "show the product". |
| P4 | **Numbers look like records.** Every figure uses tabular lining numerals, Indian grouping, U+2212 for minus, and sits next to its label and its "Example" tag. | Specific, checkable numbers read as human. Rounded marketing numbers read as generated (`india-retail.md` §3.8). | `number-tabular`; R3, R10. Neither TRM nor Chainalysis uses tabular figures, so this is somewhere we can be better than them. |
| P5 | **One dark place, one meaning.** Ink `#272A33` fills one band: protection, fakes and registration. Everything else is light, including the calculators. | The dark band means "this is about your safety". A second dark panel would dilute that, and today's page has three. | Blockaid's single band (27% of a light page, `blockaid-02`). Owner decision 1. |
| P6 | **Quiet type, one size per job.** Manrope 600 for headings and 400 for reading. One H2 size for the whole page. Nothing over 48px. | Hierarchy should come from size and space, not shouting weight or colour. Mercury's quiet type is the closest model. | `font-scale`, `weight-hierarchy`, `visual-hierarchy`. Mercury (`consumer-fintech.md` §3.5). |
| P7 | **Anything you can operate has an edge you can see.** Every control's boundary is at least 3:1 against its background. Every target is at least 44px. Every focus ring is 3px. | The skill's Accessible & Ethical style, and India's low-end screens in sunlight. | Skill: Accessible & Ethical (44px, 3–4px focus); `touch-target-size`, `focus-states`; WCAG 1.4.11. |
| P8 | **Still by default.** No scroll reveals, nothing pinned, nothing looping. Colour changes take 150ms. App-panel states and tabs crossfade in 200ms. | Calm reads as competent. Both institutional sites measured zero scroll reveals (`institutional.md` §2). | `excessive-motion`, `motion-meaning`, `state-transition`. Skill dial motion 2/10 "Subtle". |

---

## 2. Colour

All values are from `design-tokens.md` and `globals.css`. **No new hex values are added.** The two "on ink" text and rule colours are white at 80% and 16% opacity, flattened so they're solid and the ratios are exact.

### 2.1 Roles

| Role | Token | Hex | Where | Contrast **[C]** |
|---|---|---|---|---|
| Page | `white` | `#FFFFFF` | Hero, How it works, FAQ, footer | n/a |
| Alternate surface | `grey-50` | `#F8F9FD` | Basket, Run the numbers, Ask | n/a |
| Dark band | `ink` | `#272A33` | Security band **only** | n/a |
| Heading and figure text | `ink` | `#272A33` | All headings, figures, row values, strong text | 14.33 on white · 13.62 on grey-50 |
| Body text | `grey-700` | `#334155` | Paragraphs, FAQ answers | 10.35 on white · 9.84 on grey-50 |
| Secondary text | `grey-600` | `#475569` | Ledes, captions, labels, row labels, legal | 7.58 on white · 7.20 on grey-50 |
| *(retired from text)* | `grey-500` | `#64748B` | **Control edges only**: inputs, chips, secondary button, segmented control | 4.76 on white · 4.52 on grey-50 (≥3:1 for edges) |
| Hairline | `grey-200` | `#E2E8F0` | Dividers inside cards, row rules, header and footer rules | 1.23 (decorative) |
| Strong hairline | `grey-300` | `#CBD5E1` | Rules between FAQ items and list rows on grey-50 | 1.48 / 1.41 (decorative) |
| Group rule | `ink` | `#272A33` | 2px rule over each fact and each step | n/a |
| Neutral fill | `grey-100` | `#F1F5F9` | Money-path middle nodes | n/a |
| Primary action | `ink`, white text | `#272A33` | Every primary button | 14.33 |
| Selected control | `ink`, white text | `#272A33` | Selected chip and selected segment | 14.33 |
| **On ink:** heading | white | `#FFFFFF` | Band headings | 14.33 |
| **On ink:** body | white 80% | `#D4D4D6` | Band paragraphs | 9.68 |
| **On ink:** label | `grey-300` | `#CBD5E1` | Band column labels | 9.65 |
| **On ink:** rule | white 16% | `#4A4C54` | Band hairlines | 1.67 (decorative) |
| **On ink:** focus ring | `gold-500` | `#FDC037` | Focus inside the band | 8.72 |

Why body is grey-700 and not the audit's grey-600: risk, fee and tax copy is long. 10:1 holds up better in sunlight on a cheap screen than 7.6:1. Grey-600 stays for everything that should step back. Grey-500 leaves text entirely: at 4.52:1 on grey-50 it scrapes AA, and two greys for secondary text is one too many (`color-accessible-pairs`).

### 2.2 Gold: the complete list of allowed uses

| # | Use | Why it's gold |
|---|---|---|
| 1 | The logo | It's the brand. |
| 2 | The **gold sleeve** in the composition bar (hero panel, basket, calculator dots) | Its meaning is literal: this segment *is* gold. |
| 3 | The **current-section marker** in the header nav (2px underline) | "You are here". |
| 4 | The **slider thumb** fill (24px, with a 2px ink ring) | "The thing you move". Gold alone is 1.64:1 on white, so the ink ring provides the 3:1 edge. |
| 5 | The **focus ring inside the ink band** (3px) | Ink would vanish on ink. Gold measures 8.72:1. |
| (+) | `::selection` background `gold-200` | Already in the CSS, harmless. |

**Banned:** gold buttons, gold section backgrounds (today's Ask band), gold cards, gold headings, gold text of any shade (including `gold-800`; we don't need it), gold icons, the `Mark` highlighter, gold numerals in results, gold chips, gold tints and gradients.

*Deviation from the skill:* Trust & Authority says "accent for CTA only". The skill's banking accent is a dark gold (`#A16207`) that can carry white text. Ours is a light gold, and on a white page a gold button has a 1.64:1 edge and reads as a sale banner (audit T7). So the primary action is ink, and gold keeps the jobs above.

### 2.3 Data and alert colours

| Use | Colour | Rule |
|---|---|---|
| US stocks sleeve | `ink` `#272A33` | |
| Gold sleeve | `gold-500` `#FDC037` | Gold vs ink 8.72:1 |
| Crude oil sleeve | `grey-400` `#94A3B8` | Ink vs grey-400 5.59:1. Gold vs grey-400 is only 1.56:1, so **every segment is labelled with its name and % in text**. Colour is never the only key (`color-not-decorative-only`). |
| Gain bar / allowed icon | `success` `#10B981` | **Fill only.** 2.54:1 on white, so never text. A check glyph on it is ink (5.65:1). |
| Loss bar / not-allowed icon / field error | `error` `#EF4444` | **Fill, 2px border and icon only** (3.76:1 ≥ 3:1 for graphics). The error *message* is ink 14/600 next to the icon. |
| Warning | `warning` `#FACC15` | Not used on this page. |

Gains and losses are carried by the **signed figure** (`+₹4,750` / `−₹4,750`, U+2212) and the bar's side of the centre line. Colour is the third signal, not the first.

### 2.4 Surface sequence (top to bottom)

White (hero and facts) → grey-50 (Basket) → white (How it works) → grey-50 (Run the numbers) → **ink (Security)** → white (FAQ) → grey-50 (Ask) → white (footer, with a 1px grey-200 top rule). Every boundary is a change of surface, so no section needs a divider line and the rhythm never doubles up.

---

## 3. Typography

**Manrope only**, variable weight. Loaded weights: **400, 600**. 500 is allowed for the button label only if 600 looks heavy at 14px. The logo is an image. 700 and 800 are retired from the page (today's `type-*` utilities are all 700).

### 3.1 Scale

The sizes come from the design file. Mobile sizes are our call, as before.

| Style | Use | 1440 | 768 | 390 | Weight | Tracking |
|---|---|---|---|---|---|---|
| Display (h1) | Hero headline only | **48/56** | 40/48 | 34/40 | 600 | −0.02em |
| Section (h2) | Every section title, the band included. **One size.** | **40/48** | 32/40 | 28/36 | 600 | −0.015em |
| Figure | Big numbers: basket %, calculator result | 40/48 | 40/48 | 32/40 | 600, tabular | −0.02em |
| Title (h3) | Fact, step, row and panel titles | 20/28 | 20/28 | 20/28 | 600 | −0.01em |
| Question | FAQ summary | 18/26 | 18/26 | 17/24 | 600 | 0 |
| Lede | Under section titles | 18/28 | 18/28 | 18/28 | 400 | 0 |
| Body | All reading text | 16/26 | 16/26 | 16/26 | 400 | 0 |
| Small | Captions, legal, chip labels, row notes | 14/22 | 14/22 | 14/22 | 400 (600 for labels on controls) | 0 |
| Label | Uppercase labels over facts, steps, table columns | 12/16 | 12/16 | 12/16 | 600 | +0.06em |

Rules:
- **The 48px cap holds.** The h1/h2 ratio is only 1.2, on purpose. The hero has the first view to itself, so it doesn't need to shout, and the section titles carry the page.
- The design file's 32px and 24px heading sizes **aren't used**. The page needs three levels (section, title, body), not six.
- **12px is for uppercase labels only, never sentences.** Legal, risk and caption text is never below 14px.
- **Line length:** body max **64ch**, ledes max **52ch**, legal max **72ch** (`line-length`).
- **Headings** use `text-wrap: balance`, **paragraphs** use `text-wrap: pretty` (`heading-line-balance`).
- **Numerals:** `font-variant-numeric: tabular-nums lining-nums` on every figure, row value, chip amount and tabular column. Verified: at 600/40px, Manrope's proportional "111111" is 101px wide against 144px for "888888". With `tnum` both are 149px. The ₹ glyph renders in Manrope.
- **Weight on dark:** the band keeps 600 for its headings, the same as the light page. The security research suggested 500 on dark. I tested 600 in the sketch and it doesn't bloom at 40px on `#272A33`, so one rule wins.
- **No tracking on body or small text** (`letter-spacing`). The +0.06em is for uppercase labels only.

### 3.2 What changes from today

- `type-h1`/`type-h2`/`type-h4`/`type-h6` drop from 700 to 600.
- The 80px, 72px and 28px one-offs go (audit T6, F3).
- The h1 mobile size moves from 40 to **34px**, matching the file note, so the 59-character headline fits in 4 lines at 358px (it measured 4 lines in the sketch).

---

## 4. Grid and spacing

### 4.1 Containers and columns

| | 1440 (≥1024) | 768 (640–1023) | 390 (<640) |
|---|---|---|---|
| Max content width | **1152px** (container 1200 incl. 24px padding) | 704px (32px padding) | 358px (16px padding) |
| Columns | 12 × 74px, 24px gutter | 8, 24px gutter | 4, 16px gutter |
| Side margin at that width | 144px | 32px | 16px |

Breakpoints are **640 / 1024**, plus 1440 as the design reference (`breakpoint-consistency`). Nothing is fixed-width. The app panel and the tool are fluid inside their columns.

Two-column patterns used on the page (desktop):
- **6/6**: hero (text | panel), with a 48px gap.
- **7/5**: section head (title | lede, lede bottom-aligned with the title's last line). Calculator (inputs | result).
- **5/7**: band (crop | facts). Ask (text | form). Footer (brand | links).
- **4/8**: FAQ (title | list).
- **4 equal**: facts strip, steps.
- **50/30/20**: basket columns follow the composition bar's own proportions.

### 4.2 Spacing scale

4px base. Steps used: **4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96**. 40, 56 and 128 aren't used.

| Space | 1440 | 768 | 390 |
|---|---|---|---|
| Section padding, top and bottom | **96** | **80** | **64** |
| Section head → content | 48 | 48 | 32 |
| Hero top (below the 64px header) | 80 | 64 | 32 |
| Hero → facts strip | 80 | 64 | 48 |
| Between rows in a hairline list | 20 top/bottom | 20 | 16 |
| Card padding (tool, form) | 32 | 32 | 20 |
| Panel body padding | 24 | 24 | 16 |
| Label → its text | 8 | 8 | 8 |
| Title → body | 8 | 8 | 8 |
| Button gap | 12 | 12 | 12 (stacked) |

**Measured page length [S]:** 5,972px at 1440 (6.6 screens), 8,248px at 768, 9,766px at 390. The research targets were "6–8 desktop screens" and "under 8,000px" (`india-retail.md` A12, `us-investing-competitors.md` §7). Today's page is over 12,000px at 1440.

---

## 5. Corners, borders, shadow

| Thing | Radius | Border | Shadow |
|---|---|---|---|
| Button, input, chip, segmented control | **8px** (inner segment 6px) | Primary: none. Secondary, input, chip: 1px `grey-500` inset | none |
| Tag ("Example", "Tokenized") | **4px**. No pills anywhere. | 1px `ink` inset, 12/600 ink text, 24px tall | none |
| Money-path node | 8px | Start and end nodes: 1.5px ink. Middle nodes: `grey-100` fill, no border | none |
| Card (tool, form, band crop) | **12px** | 1px `grey-200` (none on the band crop; the ink around it is the edge) | none |
| App panel (hero) | **16px** | 1px `grey-200` | **the only shadow**: `0 1px 2px rgb(15 23 42/.06), 0 12px 32px rgb(15 23 42/.08)` |
| Composition bar segments | **0** (square) | 2px gaps (panel) / 4px gaps (basket) | none |
| Fact and step rules | n/a | 2px `ink` top rule | none |
| Sections, header, footer | 0 | 1px `grey-200` (header after scroll; footer top) | none |

The panel has a shadow because it's the one thing presented as "a window you're looking at". Nothing else overlaps anything (`elevation-consistent`). `shadow-card` and `shadow-lift` are retired.

*Deviation from the skill:* Minimalism suggests `border-radius: 0`. The design file's swatches use soft corners, and 8/12/16 is the brand. We get the precision from square bar segments, 4px tags and hairlines instead.

---

## 6. Icons, imagery, product UI and diagrams

### 6.1 Icons

- **Lucide only, 1.5px stroke, 20px in rows and 16px inline, `ink` or `grey-600`.** No icon in a circle or tinted square, no 40px or 72px icons, no emoji (`icon-style-consistent`, `no-emoji-icons`).
- **An icon must carry meaning that the words beside it need.** Allowed on this page:
  - check and cross on the withdraw crop (16px glyph in a 20px success/error disc);
  - plus/minus on FAQ rows;
  - external-link arrow;
  - alert-circle on field errors;
  - the reset arrow on the calculator;
  - menu and close.

  That's about ten instances.
- **Removed:** the rupee, repeat, chart and calendar icons beside facts; the 40px step icons; the `MessageSquareWarning` and `BadgeIndianRupee` card art.

### 6.2 Imagery

**None.** No photos, illustrations, scenery, isometric art, padlocks, globes, shields, seals, logos of regulators or partners, or monograms of people (R11 and owner decision 3). The `asset-art.tsx` drawings (skyline, ingot, waves) and the whole `hero-scene.tsx` go.

### 6.3 Product UI: one component, used twice

**`ExamplePanel`** is the hero panel. **`ExampleCrop`** is the same visual language, cropped, in the band. Both follow these rules:

- A white surface with its own **light colour scope**. Inside the ink band, its text must not inherit the band's white heading colour. The sketch hit exactly this bug: the "Withdraw to" title went white on white. Today's `surface-light` hack exists for the same reason. D3 should make "light island" a proper scope, not 14 inline overrides (audit F3).
- An **"Example" tag inside the frame**, top right, so a crop can't remove it.
- It **shows no value, gain, price, chart, return or maturity date.** Only a sample "invested so far" amount, the example mix, and facts that are true of the product.
- The account is masked as `••4821`. Rows are label (grey-600) and value (ink 600, tabular, right-aligned) with 1px grey-200 rules.
- Caption under the hero panel, 14px grey-600: *"An illustration with sample numbers. Not a screenshot of the app, a real account, a quote or a past result."*

### 6.4 Diagrams, all drawn with HTML and CSS rules (real text, no images)

1. **Composition bar** (hero panel and basket). A 100% bar split 50/30/20, square segments, each labelled in text. The *same object* appears in three places (panel, basket, calculator dots), which ties the page together without a mascot or illustration.
2. **Money path** (How it works). Five nodes: Your bank account → Paraa wallet → Basket units → Paraa wallet → Your bank account, in your name. Labelled connectors say what happens between nodes: "UPI or bank transfer. We verify it." / "Invest at the next daily price" / "After it matures, redeem" / "Withdraw in rupees". The start and end nodes share the ink outline, so the loop reads at a glance: **your money starts and ends in your own bank account**. Every node and connector is a confirmed fact (`content-audit.md` §3). **There's no custody node** (see 12.6).
3. **"How to spot a fake" table** (band). Two columns, "If someone asks you to…" and "It isn't Paraa. What we actually do". Three rows, hairlines only. Blockaid's threat-state idea, translated into the retail scams people actually meet, with no crypto iconography.

**Removed:** the laptop and desk, the three duplicate app mock-ups (audit T8), the stacking cards that change colour by step (D5), the "What you get" carousel (T6), and the what-if "You invest / Value after" column chart. At typical moves the two columns differ by a few percent and look identical, so they say nothing the figure doesn't.

---

## 7. Motion (visual position; D3 owns the tokens)

- Hover and press: 150ms colour/background only. No translate, no lift, no scale.
- Selected states (chip, segment, FAQ open): 150ms colour.
- Tab switch in "Run the numbers": 200ms crossfade, exit 120ms (`exit-faster-than-enter`).
- **No scroll reveal.** I'd remove `Reveal` from every section. See 11.3.
- Calculator figures change instantly. No spring, no NumberFlow, and the slider thumb is never lagged (audit F2).
- `prefers-reduced-motion`: everything above becomes 0ms. Nothing depends on motion to be understood.

---

## 8. Component visuals (enough to compose the sections)

| Component | Spec |
|---|---|
| **Primary button** | 48px tall (44px in the header), 8px radius, ink fill, white 16/600 (14/600 in the header), 20px side padding. Hover: `#3D4049` (ink-2). Focus: 3px ink ring, 2px offset. On the band: gold ring. |
| **Secondary button** | Same size, white fill, 1px grey-500 inset edge, ink text. Hover: grey-50 fill. |
| **Text link** | Ink 600 with a 1px underline at 4px offset (`decoration-grey-400`). Hover: decoration ink. Never gold. |
| **Tag** | 24px tall, 4px radius, 1px ink inset, 12/600 ink, +0.02em, 8px side padding. Variants: "Example", "Tokenized". |
| **Chip** | Min 44px tall, 8px radius, white, 1px grey-500 edge, 14/600 ink. Two-line scenario chips: label 14/600 plus note 14/400 grey-600 (about 60px tall). Selected: ink fill, white text, note grey-300. |
| **Segmented control** | 48px tall, 4px inset padding, 1px grey-500 edge, 8px radius. Segments 40px tall, 6px radius, 14/600. Selected: ink fill, white text. Full width at 390. |
| **Slider** | 4px grey-200 track. Fill from the zero mark to the thumb in ink. 1px × 16px grey-400 tick at zero. Thumb 24px gold with a 2px ink ring; touch area 44px. Label row: name 14/400 grey-700 left, value 14/600 ink tabular right. |
| **Input** | 48px tall, 8px radius, 1px grey-500 edge, 16px text (no iOS zoom). Focus: 2px ink edge plus 3px ink ring at 2px offset. Error: 2px error edge, and an alert-circle icon with the 14/600 ink message under the field. Label above, 14/600 ink. |
| **Hairline row (`dl`)** | 12px vertical padding, 1px grey-200 top rule, label grey-600 / value ink 600 tabular, right-aligned. |
| **Fact** | 2px ink top rule, 16px gap, label (12 caps), 8px gap, text 16/24 600 ink. |
| **Diverging bar** | 4px tall, grey-200 track, 1px grey-400 centre tick. Fill success (right) or error (left), width ∝ amount. |
| **FAQ row** | Native `<details>`. Summary min 64px, 18/26 600 ink, plus/minus 20px grey-600 at right. Answer 16/26 grey-700, max 64ch, 24px bottom padding. 1px grey-300 rules. |

---

## 9. Section by section

Measured heights **[S]** are from the sketch. Copy is today's audited copy unless noted. I've only changed words where the layout needed a label (the facts row, the band rows). Those are flagged for D2 and the content owner.

### 9.0 Header

- **1440:** 64px, white, `position: sticky`. A 1px grey-200 bottom rule appears after 8px of scroll. Logo (40px tall), then the nav: five links at 14/600 grey-600, 44px targets, the current one in ink with a 2px gold underline. Primary button "Ask a question" at the right.
- **It stays white over the ink band.** It doesn't flip (Groww's flip was rejected).
- **768:** logo, button, menu (44px square, 8px radius, 1px grey-500 edge). The nav moves into the menu.
- **390:** same as 768. The button shortens if needed (today's "Ask a CA" trick).
- **Nav labels (my position, D2 decides the words):** *What's in it · How it works · Run the numbers · Security · Questions*. These name the visitor's question, not the component (audit D7).
- **Logo problem:** the official PNG is an all-gold gradient. On white, its "CAPITAL" line is about 1.6:1. Logos are exempt from WCAG, but it will look washed out. See 12.1.

### 9.1 Hero, with the facts row (white)

**Purpose:** what this is, what you'd see, and the first checkable facts, all in the first view at 1440×900.

**1440** (`img/d1-sketch-1440-first-view.jpg`):
- A 6/6 grid with a 48px gap, vertically centred, 80px below the header.
- **Left column:**
  - h1 48/56, three lines at 552px.
  - Lede 18/28 grey-600, 20px below.
  - Buttons 32px below: primary "Ask a question" and secondary "See what's in the basket" (→ `#basket`), 12px apart.
  - The **registration line** 32px below: 14/22 grey-600, max 46ch, with a 2px grey-300 left rule and 16px inset: *"Paraa Capital is registered with FIU-IND for anti-money-laundering reporting. This isn't approval of this investment."* Plain words, not a badge, chip or seal (R6). Today's translucent pill over the drawing goes.
- **Right column: `ExamplePanel`** (552px wide, about 420px tall):
  - Bar 48px: small logo mark and "Paraa" 14/700 | "Example" tag.
  - Body, 24px padding:
    - label "BASKET";
    - title "US stocks, gold and crude oil" 20/28;
    - composition bar 12px tall, 16px below the title;
    - legend 14/22 with 8px square swatches and figures in ink 600;
    - rows: Invested so far **₹60,000** · Price *Updated once a day* · Add money *UPI or bank transfer* · Withdraw to *Bank account ••4821 · in your name*.
  - Caption 12px below the panel.
- **Facts row:** 80px below the hero grid. Four equal columns, 24px gutters, each a "fact" (2px ink rule, label, 16/24 600 ink text):
  - WHO IT'S FOR: Residents of India
  - MONEY IN: Rupees, by UPI or bank transfer
  - PRICE: One price per unit, once a day
  - MONEY OUT: In rupees, only to a bank account in your name

  Then 96px bottom padding.
- **Measured [S]:** the facts row starts at y = 704, so its labels and text are in the first 900px. Hero section total 826px.

**768:**
- One column. Text first (h1 40/48, two lines), then buttons side by side, then the registration line.
- The panel sits 48px below at **max-width 600px**, left-aligned (at 704px wide the rows spread too far).
- Facts row: 2 × 2.
- Hero 1,306px [S].

**390** (`img/d1-sketch-390-first-view.jpg`):
- 32px top. h1 34/40 (four lines), lede, then both buttons **full width, stacked** (48px each, 12px gap), then the registration line.
- The panel follows at full width with 16px body padding. The legend wraps to two lines, and the withdraw row shortens to "••4821, in your name".
- Facts: one column, each with its 2px rule.
- The first 844px shows the headline, lede, both buttons, the registration line and the top of the panel. Nothing is asked of the visitor (no phone field; audit T3).

**Removed:** scenery, flight, the pinned 470svh track, the phone-number field, "See an example", and the laptop.

### 9.2 What's in the basket (grey-50)

**Purpose:** what you're buying, in one picture that can't be misread (`img/d1-sketch-1440-basket.jpg`).

**1440:**
- Section head: 7/5, h2 left, lede "Three markets, each moving for its own reasons." right, bottom-aligned.
- **Composition bar:** full 1152px width, **40px tall**, 50/30/20, with 4px gaps showing the grey-50 surface. The bar is the visual. There's no hover and no animation.
- Underneath, a grid with the **same 50/30/20 proportions** and 4px gaps, so each column starts under its own segment:
  - figure "50%" 40/48 tabular;
  - title 20/28, with a "Tokenized" tag beside US stocks (if that word stays; see 12.4);
  - *what* in 16/26 grey-700;
  - *why* in 14/22 grey-600;
  - 24px right padding per column.
- Footnote row 32px below: "Example" tag plus "These percentages are an example." 14px grey-600.
- 608px tall [S].

**768:** same structure. The 20% column is 140px wide, so the text wraps to 5–6 lines. That's acceptable, and it was checked with no overflow [S]. 660px.

**390:**
- Bar 32px tall at full width.
- Columns stack, each a row with a 1px grey-300 top rule and 20px padding: figure, title and text.
- Add a 12px square swatch before each figure so the link to the bar survives when the columns no longer sit under their segments.
- 1,031px [S].

**Removed:** the three coloured tiles (ink, gold, grey-400 cards with hover lift), the skyline, ingot and wave drawings, and the four icon facts (now the hero's facts row).

### 9.3 How it works (white)

**Purpose:** how hard it is, and where your money is at each step (`img/d1-sketch-1440-how-it-works.jpg`).

**1440:**
- Section head 7/5: "From sign-up to withdrawal, in four steps" | lede "Your money starts and ends in a bank account in your name." (new line, for D2 and the content owner. It's true by `content-audit.md` §3).
- **Steps:** four equal columns, each a fact-style block: 2px ink rule, label "STEP 1" (12 caps, tabular), title 20/28, body 16/26. Today's titles and bodies are kept. Step 3's title becomes "Add money and invest" because "Invest in rupees" conflicts with the USDT debit (`content-audit.md` §7).
- **Money path:**
  - 64px below the steps, after a 1px grey-200 rule and a label "WHERE YOUR MONEY IS".
  - Five nodes and four connectors in one row: a 9-column grid, nodes about 124px, connectors about 112px.
  - Nodes are 56px min-height, 8px radius, 14/600 ink, centred. Start and end nodes are white with a 1.5px ink edge. Middle nodes have a grey-100 fill.
  - Each connector is a 1px grey-500 line with a 6px arrowhead and its label (13/18 grey-600, centred) below.
- 697px [S].

> Note: the connector labels are 13px in the sketch. Use **14/20**: it's on the scale, and the column has room if the connectors widen to 128px.

**768:**
- Steps 2 × 2.
- The path turns **vertical**: nodes left-aligned (44px min height), connectors become a 1px grey-500 vertical line 20px in from the left with the label beside it.
- 1,111px.

**390:**
- Steps stack, path vertical as at 768.
- 1,471px [S]. This is the longest section on mobile. If D2 wants it shorter, the step bodies can drop to their titles plus one line, because the path repeats steps 3–4.

**Removed:** sticky stacking cards, the 40px numbers and icons, and the white → gold-100 → gold → ink colour change (audit D5), and the scroll line.

### 9.4 Run the numbers (grey-50)

**Purpose:** what could happen to my money, and what tax would I pay. Two tools in one section. Their maths is unchanged.

**1440:**
- Head 7/5: h2 "Run the numbers" | lede "Made-up scenarios on an example mix. Not a forecast, and not past returns." Moving that disclaimer up into the lede puts it at 18px, where it can't be missed.
- **Segmented control**, 32px below: "Markets and the rupee" | "Tax on your profit".
- **Tool card**, 32px below: white, 12px radius, 1px grey-200, a 7/5 split.
  - **Inputs (left, 32px padding, 28px between groups):**
    - "If you invest" amount chips (₹50,000 · ₹1 lakh · ₹5 lakh · ₹10 lakh);
    - "Try a scenario" two-line chips;
    - three sleeve sliders and the rupee slider, with its two-direction hint under it (R2, 14px grey-600, the same size as the slider labels);
    - "Set everything back to zero" as a text link with the reset icon.
  - **Result (right, grey-50 fill, 1px grey-200 left rule, 32px padding, `lg:sticky` top 88px):**
    - label "AFTER ONE YEAR";
    - "Your investment's value" 14px grey-600;
    - figure **₹1,00,000** 40/48 ink tabular (not gold);
    - change line `₹0 (0.0%)` 16/600 ink;
    - rows "Where the change came from": swatch, name, signed ₹ amount, diverging bar under each;
    - foot "Example only, before fees and tax." 14px.
- **Tax tab:** the same card. Inputs: profit/loss slider and slab chips. Result:
  - "You'd keep" figure;
  - a 12px split bar (kept = ink, tax = grey-400, labelled in the rows below; no gold);
  - the tax row;
  - the full assumption note at 14px grey-600. Today it's 12px; it carries the VDA warning, so it moves up to 14.
- 872px [S].

**768:**
- The card stacks: inputs, then the result under a 1px grey-200 rule. The result isn't sticky.
- **Hold:** at 768 the result sits below about 600px of inputs. Put a one-line **live summary** at the top of the result ("₹1,00,000 → ₹95,250, −4.8%") so a slider change is visible without scrolling? That's D2's call. I'd make it a sticky bottom bar only if it stays at or under 56px.
- 1,343px.

**390:**
- The segmented control is full width, with segments sharing it equally.
- Chips wrap: amount chips go 2 × 2 with each chip at least 44px, scenario chips go 2 per row.
- Card padding 20px. Figure 32/40.
- 1,385px [S].

**Removed:** the two dark result panels (`surface-ink`, `shadow-lift`), gold result figures, gold selected chips, pill chips, the column chart, `Mark` under "could move", and the second section header for tax.

### 9.5 Security: the one ink band

**Purpose:** is my account protected, and how do I spot a fake (`img/d1-sketch-1440-security-band.jpg`, `img/d1-sketch-390-security-band.jpg`).

**1440:**
- Ink edge to edge, 96px padding.
- Head 7/5: h2 white "How we protect your account" | lede `#D4D4D6` "What we always do, what we never ask, and how to spot someone pretending to be us."
- **Row 1, 5/7, 48px gap:**
  - **Left: `ExampleCrop`** "Withdraw to", 460px. A white card, 12px radius, 20px padding, "Example" tag, rows: Bank account **••4821** · Name matches yours ✓ (success disc, ink check) · Someone else's account "Not allowed" ✕ (error disc, white cross).
  - **Right: three facts** as a hairline list (1px `#4A4C54` rules, 20px padding):
    - "Withdrawals go only to you" (20/28 white) with its line in `#D4D4D6`;
    - "We check every payment you add" (new title, for D2 and the content owner; "Paraa verifies it" is confirmed);
    - "We never ask for your OTP or PIN by call or message".
- **Row 2, 64px below: "How to spot a fake".**
  - Title 20/28 white, then a two-column table, 50/50.
  - Column labels: 12 caps grey-300.
  - Rows: the scam line in quotes (16/26 white) | what Paraa actually does (16/26 `#D4D4D6`). 16px padding, `#4A4C54` rules.
  - Three rows: OTP; "pay into this UPI ID"; "give me your bank details and I'll withdraw for you". Every answer is something the content audit confirms.
- **Row 3, 48px below a `#4A4C54` rule:** the registration sentence at 16/26 `#D4D4D6`, max 72ch. No number and no link, because neither is confirmed. See 12.2.
- **Band height: 1,100px [S]** (1.22 screens). That's under the 1.3-screen cap the security research set.

**768:**
- Row 1 stacks with the **facts first and the crop second** (max 480px), so the text leads (research: Blockaid's art-before-text problem).
- The table keeps two columns, 1,441px.

**390:**
- Facts, then the crop, then the fake table as stacked pairs. The column headers are hidden, so each answer starts with a white 600 "**Not Paraa.**" lead-in.
- 1,666px [S], about 2 screens. Acceptable for the section that matters most. Don't trim the fake rows.

**Rules for the band:**
- No icons except the two state discs.
- No shield, padlock, globe, radar, dot grid or glow.
- Gold appears only as the focus ring.
- The header stays white above it.

**Removed:** the "Our rules" light-card grid on a dark page with gradient art panels, the FIU "badge" card, the CA card and the price card. Price and CA aren't security, and they already live in the hero facts and the Ask section (audit T4).

### 9.6 Questions before you invest (white)

**1440:**
- 4/8 grid, 48px gap.
- **Left:** h2 plus lede "Don't see yours? Ask a question." with an ink underlined link. Not sticky: the list is only about 600px.
- **Right:** `<details>` list as in section 8. The first item is open.
- 646px [S].

**768 / 390:** one column, title above the list. Summary 17/24 at 390. 730 / 808px.

Change from today: answer text goes from 16px grey-600 to 16px **grey-700**, one size below the question, never two (`india-retail.md` A9). The chevron becomes a plus/minus.

### 9.7 Ask a chartered accountant (grey-50)

**1440:**
- 5/7 grid, 48px gap, top-aligned.
- **Left:**
  - h2 at **40px**, not today's 48px. h1 is for the hero only.
  - Lede "You don't need an account to ask."
  - "What happens next" as an ordered hairline list: rows 14px padding, 1px grey-300 rules, the number in grey-600 tabular (no ink circles), text 16/600 ink.
  - "Your CA may be paid by us." at **16px body** grey-700, not 14px. It's a conflict-of-interest line and shouldn't look like fine print.
- **Right: form card.** White, 12px radius, 1px grey-200, 32px padding, no shadow:
  - Name | Mobile (2 columns);
  - Email (optional);
  - Question (textarea 112px);
  - consent checkbox (20px, `accent-color: ink`) with 14px grey-700 text;
  - primary button "Send my question", auto width.
- **A privacy line under the button is designed but left out.** No privacy notice is confirmed (question 14). No empty slot ships.
- 706px [S].

**Success state:**
- Inside the same card: a 24px success check icon;
- "Thank you. We've received your question." at 20/28 600 ink;
- the reference in ink 600 tabular;
- the OTP reminder in 14px grey-600;
- a secondary button "Ask another question".
- No tinted circle.

**768:** stacks, text then form, 1,038px. **390:** form card padding 20px, all fields one column, button full width, 1,134px [S].

**Removed:** the full gold band (audit T7), the ink number circles, `shadow-lift`.

### 9.8 Footer (white)

**1440:**
- 1px grey-200 top rule, 64px top and 40px bottom padding.
- 5/7 grid:
  - **Brand column:** logo (see 12.1), the line "US stocks, gold and crude oil in one basket, for residents of India." in 14px grey-600, then the OTP line in 14/600 ink.
  - **Links:** 3 columns of 44px-target links, 14/600 grey-700, hover ink with underline. The same five labels as the header, plus "Ask a question".
- **Disclosures:** 48px below a grey-200 rule, 2 columns:
  - risk note (`global-risk-v3`) | FIU-IND note and the ASCI line;
  - all 14/22 grey-600, `strong` in ink, max 72ch.
- © line, 32px below a grey-200 rule.
- 453px [S].

**768:** brand above the links, disclosures 2 columns. **390:** everything one column, links 2 columns, 739px.

No legal text is below 14px, and none is lighter than grey-600 (7.58:1). That fixes Zerodha's 10.4px at 2.7:1 and Mercury's 10px.

---

## 10. Generic or AI-generated patterns removed, and what replaces them

| Pattern today | Why it reads as generated | Replacement |
|---|---|---|
| Glowing sunset scenery with a desk and chair | Gradient, glow and a metaphor unrelated to the product | `ExamplePanel` in HTML |
| Highlighter strokes under four headings (`Mark`) | Decoration standing in for emphasis | Nothing. The heading is the emphasis. |
| Icon in a coloured circle beside every fact | The most common template tell | Text facts with labels and rules |
| Three app mock-ups showing the same thing | Repetition | One panel and one crop, with different content |
| Cards that lift on hover but can't be clicked | False affordance | No hover on anything you can't click |
| Pills for every button and chip, 24–28px corners | Default UI-kit look | 8px controls, 4px tags, 12/16 cards |
| Gold carousel with an 80px heading | Borrowed brand (Wise) | Deleted; its content lives in the facts row |
| Gold CTA band | Sales banner | Calm grey-50 section with a white form |
| Colour change step by step (white → gold → ink) | Colour without meaning | Equal steps on a 2px rule |
| Dark result panels with gold figures | A second and third dark surface; gold as decoration | Light result inset with ink figures |
| Rolling digits and spring-animated bars | Motion for its own sake (and 266 KB of JS) | Instant updates |
| Symmetric 3 × 3 card grids | Real content is uneven | Uneven 50/30/20 columns, 5/7 and 4/8 splits, a three-row table |

---

## 11. Positions I expect D2 or D3 to challenge

1. **The facts strip is part of the hero, not its own section** (audit §2 "Facts strip"). The four facts sit in the first view at 1440 and do the job the audit's strip and today's "What you get" cards were doing. A separate section would push the basket down by about 300px and repeat the hero's whiteness. *D2 may want the strip to hold registration facts; nothing confirmed is left to put there.*
2. **The hero panel is one static screen, with no tabs or crossfade, and the product tour is gone.** The audit kept 2–3 tabbed screens. Fake UI that responds to clicks invites people to treat it as the app. The money path and the band crop now cover what the tour's "Invest" and "Withdraw" screens showed.
3. **No scroll reveal at all.** The audit kept the 12px reveal "once". Every element fading up is a generated-site tell (Vested's 29–61 ScrollTriggers), and the institutional references use none. Dropping it also deletes `reveal.tsx` and `reveal-controller.tsx`.
4. **The calculators are light.** One ink band means the result panels can't be dark. D3 may prefer contrast to make the "answer" pop; I use a grey-50 inset and the 40px ink figure instead.
5. **Gold never fills a control.** Selected chips and segments are ink. The slider thumb is gold *with an ink ring*. The audit listed the gold thumb, so this agrees, but the ring is my addition for the 3:1 edge.
6. **Body text is grey-700, and grey-500 is retired from text.** The audit had grey-600 body and grey-500 captions. I'd rather run one secondary grey than two.
7. **No pills anywhere, tags included.** The audit allowed pills "for status tags only". At 24px, a 4px tag reads as a label on a record, which is the tone we want.
8. **Only three type levels from the file are used** (48, 40, 20/18 and body). D3 may want the file's 32 and 24 in play. I'd rather leave them unused than invent jobs for them.
9. **The money path has no custody node.** D2 may say a path that skips "who holds it" looks evasive. My answer: every node shown is confirmed; adding a blank or "TO CONFIRM" node is banned. The node gets added the day custody is confirmed (12.6).
10. **The band leads with mechanisms, then "spot a fake", and puts registration last.** The research (`security.md` rec 4) put registration as the closing row too. D2 might want it first. It's an anti-money-laundering registration, not product approval, so leading with it overstates it.
11. **The header doesn't change colour over the band.** A white bar over ink is a strong edge, but flipping is the Groww scroll effect that was rejected.
12. **"TO CONFIRM" placeholders: I agree with the ban.** A visible placeholder on a public page looks unfinished, and it repeats the gap more loudly than leaving it out. The cost is that R6 can't be met for FIU-IND (12.2).
13. **The what-if column chart is removed.** D2 may like the before/after picture. At realistic moves, the bars are visually identical.

---

## 12. Open questions for the owner

1. **Logo on white.** The only logo file (`src/assets/paraa-logo.png`) is an all-gold gradient. On white, gold is 1.64:1, so "CAPITAL" will look faint. Is there, or can we have, a lockup with the mark in gold and the wordmark in ink `#272A33`? Until then we ship the gold file at 40px tall, which is legal but weak.
2. **FIU-IND without a number.** The sentence appears in the hero, the band, the FAQ and the footer. R6 says a status claim needs the entity, body, number and link. Placeholders are banned, so either send the number and letter (then each instance gets "Reg. no. … · Check it ↗"), or accept that it ships as a plain sentence. It's never a badge, and it stays at caption weight in the hero.
3. **Can the panel look like the real app?** It's an invented layout today. If the rebuilt investor app has a basket screen we may draw from, the panel should borrow its structure, so the site and the app agree when someone downloads it.
4. **"Tokenized".** Keep it as a tag on US stocks? A tag gives it weight. If counsel is unsure (content audit questions 5 and 17), I'd drop the tag and leave the word in the sentence.
5. **Gold as both brand and asset.** The gold sleeve is drawn in brand gold. That's natural, but it means the brand colour appears in data. Fine with you?
6. **Custody.** When "who holds the money" is confirmed, the money path gains a node under "Basket units", and the band gains a row. The space is designed; nothing ships until it's real.
7. **"Invest once or every month" (step 3).** It's backend only today (content audit question 10). If monthly plans aren't in the app at launch, the step line shortens. It doesn't change the layout.
8. **Green and red for gain and loss.** They're standard in Indian market apps, and here they're always backed by a signed figure. Okay?

---

## Appendix A. Contrast ratios **[C]**

| Pair | Ratio | Use |
|---|---|---|
| ink on white / grey-50 | 14.33 / 13.62 | Headings, figures, primary button text (inverse) |
| grey-700 on white / grey-50 | 10.35 / 9.84 | Body |
| grey-600 on white / grey-50 | 7.58 / 7.20 | Secondary, legal |
| grey-500 on white / grey-50 | 4.76 / 4.52 | Control edges only |
| grey-400 on white | 2.56 | Oil segment fill (labelled) |
| gold on white / grey-50 | 1.64 / 1.56 | Fills only, never text, never a lone edge |
| gold-800 on white | 5.27 | Not used |
| white on ink | 14.33 | Band headings |
| `#D4D4D6` (white 80%) on ink | 9.68 | Band body |
| grey-300 on ink | 9.65 | Band labels |
| gold on ink | 8.72 | Band focus ring |
| `#4A4C54` (white 16%) on ink | 1.67 | Band rules (decorative) |
| success on white | 2.54 | Fill only |
| ink on success | 5.65 | Check glyph |
| error on white | 3.76 | Fill, 2px edge, icon |
| ink vs grey-400 / gold vs grey-400 | 5.59 / 1.56 | Sleeve separability: gold and oil need text labels |

## Appendix B. Measured sketch heights **[S]**

| Section | 1440 | 768 | 390 |
|---|---|---|---|
| Header | 64 | 64 | 64 |
| Hero + facts | 826 | 1,306 | 1,468 |
| Basket | 608 | 660 | 1,031 |
| How it works | 697 | 1,111 | 1,471 |
| Run the numbers | 872 | 1,343 | 1,385 |
| Security band | 1,100 | 1,441 | 1,666 |
| FAQ (5 items, first open) | 646 | 730 | 808 |
| Ask | 706 | 1,038 | 1,134 |
| Footer | 453 | 555 | 739 |
| **Page** | **5,972** | **8,248** | **9,766** |

No horizontal overflow at any width [S].

## Appendix C. Images (`docs/redesign/design/img/`)

| File | Shows |
|---|---|
| `d1-sketch-1440-first-view.jpg` | Hero, panel and facts row in the first 900px |
| `d1-sketch-1440-full.jpg` | Whole page at 1440 |
| `d1-sketch-1440-basket.jpg` | Composition bar with 50/30/20 columns |
| `d1-sketch-1440-how-it-works.jpg` | Steps on rules plus the money path |
| `d1-sketch-1440-security-band.jpg` | The ink band: crop, facts, spot-a-fake table, registration |
| `d1-sketch-768-full.jpg` | Whole page at 768 |
| `d1-sketch-390-first-view.jpg` | Mobile first view |
| `d1-sketch-390-full.jpg` | Whole page at 390 |
| `d1-sketch-390-security-band.jpg` | Band at 390: text before crop, "Not Paraa." lead-ins |

The sketch is a composition test: real copy, approximate controls, no behaviour. It is not a build reference for component internals. Section 8 is.
