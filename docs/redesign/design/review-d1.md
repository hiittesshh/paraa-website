# Review by D1 (visual and brand) of D2 and D3

**Date:** 10 Nov 2026. **Reviewed:** `d2-ux.md` (all 800 lines) and `d3-system.md` (all sections; §3.2 CSS skimmed past the role block). **Against:** my `d1-visual.md` and the sketch screenshots in `img/`.

**One thing I missed:** I hadn't read `proposal.md`. Line 230 limits red, yellow and green to "form errors only", not risk or performance. Line 429 already has "You can lose money" as a hero risk note, and line 523 already makes "All fall" the what-if default. Several of D2's and D3's positions that I'd have argued against are earlier approved decisions, not new ideas. I've adjusted below.

---

## 1. Where we agree

All three of us reached the same place on most of the page, independently:
- **Hero:** light, static, no scenery. A solid sticky header (64px). No phone field in the hero.
- **The one ink band** holds security, fakes and registration. Its text leads its example on phones, and it's capped at about 1.3 screens.
- **Gold is never a button.** The primary action is ink. No `Mark`, no gold CTA band, no gold result figures.
- **Weights 400 and 600 only.** One h2 size, 48px cap, 12px uppercase labels only, legal and honesty text at 14px or more, tabular figures everywhere, Indian grouping, U+2212 minus.
- **Corners 4/8/12/16, no pills.** One shadow (hero mock, plus the open mobile menu, which is fine). No hover lift.
- **The example panel:**
  - built in HTML, with "Example" inside the frame, a caption outside it, and no bezel;
  - no values, returns, prices, charts or dates;
  - the frame is one component shared by the hero and the band (D3's `MockFrame`; my `ExamplePanel` and `ExampleCrop`).
- **Rules, not boxes.** A 2px rule starts an item and a 1px hairline separates rows. Steps sit on a rule, with no stacking cards or colour ramp.
- **Tools:**
  - light results with ink figures;
  - the Columns chart is removed;
  - the native range slider tracks the pointer 1:1;
  - no Motion and no NumberFlow;
  - the two tools share one section.
- **The FAQ stays native `<details>`.** Links are ink with an underline. Control edges are grey-500 (4.76:1). Focus is never hidden by the header.
- **No visible "TO CONFIRM".** Unconfirmed facts are simply absent. D2's dev-only gap report and D3's typed `FactItem` that renders `null` are both good ways to keep the gaps tracked.
- **Logo:** we all flagged that the gold PNG is 1.64:1 on white and soft. It's one combined request to the owner (§5).

---

## 2. Conflicts

Each item gives the options, my position, the reason, and what would change my mind. **Moved** means I've changed my draft's position.

### 2.1 Gold as a state colour (slider thumb, nav marker, band focus ring)
- **Options:**
  - D1: a gold thumb with an ink ring, a gold nav underline, and a gold focus ring in the band.
  - D3 (C1): gold carries identity only (the logo and the gold sleeve); every state is ink, or white in the band.
  - D2: ink nav marker and white band ring; the hero tab marker may be gold if weight carries the state.
- **Position: Moved, to D3's rule in full.** Thumbs are white with a 2px ink border, the nav marker is ink, the band focus ring is white.
- **Reasons:**
  - On the tools screen, four gold thumbs plus the logo break the 3-per-screen gold budget that the proposal and D3 both set (`proposal.md` line 232).
  - "Gold = Paraa or gold the metal" is a rule anyone can test. "Gold = Paraa, gold, *and* you are here, *and* the thing you move" isn't.
  - The ink ring I added to pass WCAG 1.4.11 was already a sign that gold was the wrong colour for that job.
- **Would change my mind:** nothing for the thumb. If the page feels lifeless in the build review, the one addition I'd propose is D3's own offer: a single gold marker for the active screen in the hero panel, with an ink outline. And only if the panel has tabs at all (§2.2).

### 2.2 The hero panel: one still screen (D1), three tabbed flows (D2), the Tabs component (D3)
- **Options:**
  - D1: one static screen, no tabs.
  - D2: three manual tabs (Add money · Invest · Withdraw), no autoplay, 200/120ms crossfade, no percentages.
  - D3: the same underline Tabs component for the hero and the tools; asks the owner whether the panel may switch at all (Q4) and whether the app is phone-only (Q9).
- **Position: one still screen, held, but weakly. It's the owner's call (D3 Q4).** And I concede D2's content rule: **no percentages in the panel**. My draft's 50/30/20 legend inside an app frame can be read as returns ("US stocks 50%"), so the composition bar leaves the panel; the Basket section owns it. The single screen becomes D2's **Invest** screen (Amount ₹10,000 · From: your Paraa wallet · You get: units of the basket · Price: the next daily price · note "Each investment has a maturity date").
- **Reasons for one screen:**
  1. **Three clickable fake screens beside the primary CTA** make a second interactive cluster in the first view (`primary-action`). People try to use mock UI that responds to clicks.
  2. **The content is covered elsewhere.** Add money → Invest → Withdraw is exactly the How-it-works money path, and Withdraw is the band's crop. Three tabs would show the same flow a third time. That's audit T8's "same information three times", the problem we're fixing.
  3. **Chrome.** With D3's `size="sm"` tabs under a 48px header strip, the panel spends about 92px on chrome before any content.
- **Division of labour I propose:** the hero shows **Invest**, How it works shows the whole **path**, and the band shows **Withdraw**. Nothing appears twice.
- **Would change my mind:**
  - The owner says the panel may switch (Q4) *and* we drop either the money path or the band crop, so the flow isn't shown three times.
  - If tabs ship: D3's underline component with D2's three screens. Tabs sit **inside** the 48px header strip, not in a second row. The panel height is fixed to the tallest screen. The marker is ink.
  - **Phone-only app (D3 Q9):** if the app is phone-only, the frame must use phone proportions (about 360px wide, no bezel) even at 1440. Showing a desktop layout of a phone-only product misstates it, and honesty wins over composition. The hero then becomes text 7 / panel 5, with the panel centred in its column.

### 2.3 Scroll reveals
- **Options:**
  - D1: none.
  - D2: the reveal applies only to the panel and section bodies, never headings or legal lines.
  - D3 (C14): only Basket rows and How-it-works steps, and D3 "would accept none".
- **Position: none.**
- **Reasons:**
  - Both institutional references measured zero reveals (`institutional.md` §2), and Blockaid's band measured 0% pixel change.
  - "Everything fades up" is the template tell we're removing.
  - Deleting it also deletes `reveal.tsx`, `reveal-controller.tsx` and their CSS.
  - D2 revealing **the hero panel** is the worst case: the reveal script only arms below the fold, so it's either a no-op or it flashes the most important visual on load.
- **Would change my mind:** nothing visual. If we keep any, D3's minimum (Basket rows and steps only, ≤ 4 items, once), and never the panel, a heading, the band or the tools.

### 2.4 Where the band goes
- **Options:**
  - D1 and the audit: 6th, after the tools.
  - D2 (P2): 4th, before the tools.
  - D3: follows whatever order is chosen.
- **Position: Moved, to D2's order.** The surfaces still alternate: white, grey-50, white, **ink**, grey-50, white, grey-50, white.
- **Reasons:**
  - **Doubt order:** "is this a scam?" comes before "what might I earn?".
  - **Continuity:** the money path ends on the node "Your bank account, in your name", and the band opens with "Withdrawals go only to you" and the Withdraw crop. The last thing drawn becomes the first thing proved.
  - **Visually it's better too.** A dark band at about 40% of the page divides it in the middle (Blockaid's sits at 30%). At 70% it's a dark block just before the form.
- **Would change my mind:** nothing. I asked for the band to move and was wrong not to.

### 2.5 FIU-IND placement
- **Options:**
  - D1: a caption line under the hero CTAs, then the last row of the band.
  - D2: hero row cell 1, plus band row D ("What it means" / "What it doesn't mean", two equal columns).
  - D3: a `Disclosure lead` under the hero CTAs, plus a `FactItem` that can't render as a status fact without a number and link.
- **Position: once in the first view, as D2's cell 1** (it replaces my lead line), **and last in the band, as D2's row D.** The FAQ and footer copies stay as they are.
- **Reasons:**
  - D2's means / doesn't-mean pair at equal size is better than my single sentence. It's Vested's protection-scope pattern, and R8 in visual form.
  - It must never be a badge, seal, logo, chip or `type-heading` value. D3's FactItem would put "FIU-IND" at 24px as the *value*, which looks like a credential. In the band, the h3 "Registered with FIU-IND" is fine because the doesn't-mean column sits right beside it.
  - Having both a lead line and a cell in the first view would say it twice.
- **Would change my mind:** the owner sends the number and lookup URL. Then it becomes D3's `status` fact, with "Reg. no. … · Check it ↗", in both places.

### 2.6 The facts row, and "You can lose money" (D2 P6)
- **Options:**
  - D1: a hero-foot row of product facts (who it's for / money in / price / money out).
  - D2: a hero-foot row of trust cells (registration / withdrawals / OTP / you can lose money), each linking to its proof.
  - D3: a separate compact facts-strip section (`#facts`, same tone as the hero, `border-y`).
- **Position: D2's four cells, in my visual form**, at the foot of the hero. Not a separate section.
- **Visual form:**
  - 2px ink rule;
  - bold first sentence 16/24 600 ink;
  - plain second sentence 14/22 grey-600;
  - the whole cell is a link with an `ArrowRight` that nudges 2px.
- **"You can lose money" gets exactly the same treatment:** no warning icon, no red, no box. Equal weight is the point (R8).
- **Reasons:**
  - My product facts (rupees, daily price) fit naturally into D2's longer lede, so nothing is lost.
  - D2's cells answer the sceptic's doubts, and mine only described the product.
  - D3's separate strip needs the "one allowed same-tone neighbour" exception, a seam in the surface rule, and with today's data it can only hold plain facts that repeat the lede.
  - D3's `FactItem` and `RuledItem` components are still the right parts to build the cells from.
- **"You can lose money" is the owner's call** (round 16 kept risk lines in the footer). I support it: Mercury's "what we are not" line is the strongest first-view trust move in the research, and the proposal already had it (line 429).
- **Would change my mind:** the owner says no. Then three cells, and the 4-column grid becomes 3 at ≥ 1024. Don't leave an empty fourth slot.

### 2.7 CTA label: "Ask a CA", "Talk to a CA" or "Ask a question"
- **Options:**
  - D1: "Ask a question" (the content audit's hero choice).
  - D2: "Ask a CA" everywhere.
  - D3 (C12): any one label, the same everywhere, never swapped by width.
  - Round 4: "Talk to a CA".
- **Position: one label everywhere (D3), and that label is "Ask a CA" only if the owner confirms CAs read the questions.** Otherwise it's "Ask a question". This is D2's own Q4 condition, so we're closer than the labels suggest.
- **Header CTA:** D3's **secondary** (outline) style, so the hero's filled button stays the one primary in the first view.
- **Reasons:**
  - R12 means the label must say what happens next.
  - "Talk to" promises a conversation nobody has confirmed (`content-audit` Q2).
  - Visually, all three fit at 320px, so width doesn't decide it.
- **Would change my mind:** owner confirmation that CAs answer. Then "Ask a CA", no debate.

### 2.8 What-if opening on "All three fall" (D2 P9)
- **Position: agree,** with one visual condition. The result panel must **name the scenario next to the figure**, not only show it as a selected chip 400px away. A label above the figure: "Made-up scenario: All three fall". The "Example only, before fees and tax." footnote stays.
- **Reasons:**
  - R5 allows a loss default, the proposal already chose it (line 523), and a zero default teaches nothing.
  - **Crop risk:** "₹74,100 (−25.9%)" cropped on its own reads as "the basket lost 25.9%". The scenario name inside the result frame works like the Example tag inside the mock frame: a crop can't separate them.
- **Would change my mind:** nothing. This is a good change.

### 2.9 Corners and the "Example" tag
- **Not really a conflict.** D3's scale is 4 (tags, swatches, checkbox), 8 (controls), 12 (panels), 16 (mock frame), no pills. That's exactly my draft. The differences are details:
  - **The Example tag:** mine 12px text, D3 14px ("honesty labels ≥ 14px"). **Moved to 14px.** D3 is right: it's an honesty label, and my own rule says honesty text is never below 14px.
  - **Allocation bar ends:** mine square, D3 a 4px outer radius. Accept D3's.
  - **Swatches:** mine 8px, D3 10px squares. Accept 10px.
- **Would change my mind:** n/a.

### 2.10 grey-500 as text, and the body grey
- **Options:**
  - D1: body grey-700, secondary grey-600, grey-500 for control edges only.
  - D2: body grey-700 (≥ 7:1), captions ≥ 4.5:1.
  - D3: body grey-600 (`muted-foreground`), `text-faint` grey-500 for source lines, meta and step numbers; there's no grey-700 primitive at all.
- **Position: held, with D2.** Body is grey-700 (10.35:1 / 9.84:1). Secondary text is grey-600 (7.58:1 / 7.20:1). **grey-500 text is limited to the input placeholder and the `+91` adornment, on white inputs only (4.76:1).** D3's `StepList` numbers and source lines use grey-600.
- **Reasons:**
  - Half our sections are grey-50, where grey-500 is 4.52:1. That passes AA by 0.02, which is too little margin for low-DPI phones in sunlight.
  - Today the page has no source lines (no stats), so `text-faint` has almost no job. An unused role gets used for the wrong thing, which is D3's own argument against primitives as classes (C5).
  - Body text gets the darker grey because risk, tax and FAQ copy is the longest reading on the page.
- **Risk I accept:** ink headings (L ≈ 0.023) and grey-700 body (L ≈ 0.05) are close in value. Hierarchy then rests on size and weight, which is `visual-hierarchy`'s preferred lever anyway.
- **Would change my mind:** a side-by-side at 390, in the build, where grey-700 body visibly flattens the heading/body hierarchy. Then grey-600 body with no `text-faint` role.

### 2.11 Near-black: ink `#272A33` or grey-900 `#0F172A` for text
- **Options:**
  - D1: ink for headings, figures and rules.
  - D3: `--foreground` and `--rule` grey-900, `--primary` ink.
- **Position: ink for text, rules and buttons.** One near-black.
- **Reasons:**
  - D3's set has **two near-blacks side by side**: a grey-900 2px rule under a heading next to an ink button. Grey-900 is navy-slate and ink is neutral charcoal, and that shows at 2px and in large type.
  - Ink is the design file's labelled Primary. Contrast barely changes: 14.33:1 against 17.85:1.
- **Would change my mind:** QA shows ink headings on grey-50 look washed out next to the slate body greys. I doubt it at 13.62:1.

### 2.12 Sticky mobile result line
- **Options:**
  - D1: open (any bar ≤ 56px).
  - D2: a 64px dock at the **bottom** of the tool's box while a control is focused or being dragged.
  - D3 (C9): a 56px readout sticky **under the header**, scoped to the tool's container.
- **Position: one readout, D3's top placement, 48px, scoped to the tool, white with a 1px grey-200 bottom rule, figure 16/600 tabular.** Not ink: the band stays the only dark surface.
- **Reasons:**
  - **Bottom docks sit where thumbs drag sliders,** so it can cover the very control in use.
  - **At the top it's in the reading area.** But 64px header plus 56px readout is 120px, 14% of an 844px screen, close to Fireblocks' 16% anti-pattern (`fixed-element-offset`). At 48px it's 112px (13%) and still holds "₹74,100 · −25.9%" on one line.
  - Two designers independently found the same problem (on a phone the result is about 700px below the first slider), so some readout is warranted.
- **Would change my mind:** D2 shows the bottom dock never overlaps the active slider (for example, it only shows when the slider is in the top half of the viewport).

### 2.13 Gain and loss colour
- **Options:**
  - D1: success and error fills on the diverging bars, and success/error discs on the band's ✓/✕.
  - D3 (C8) and the proposal: ink for both directions, red and green only for form errors.
- **Position: Moved, to D3's rule in full.** Ink bars both ways, direction from the side of the zero line, value in signed text. On the band crop, ✓ and ✕ are 16px ink icons with the words "Allowed" and "Not allowed" (D3's `Tag` with icon).
- **Reasons:**
  - It's an approved decision I hadn't read (`proposal.md` line 230).
  - It also removes the page's only non-brand hues, which makes the gold sleeve the only colour in the data. That's cleaner.
- **Would change my mind:** n/a.

### 2.14 "How to spot a fake": table (D1), three message cards (D2), From/Not-from pair (D3)
- **Options:**
  - D1: a two-column table, scam line | what Paraa actually does, three rows, hairlines.
  - D2: three light message cards, each with a warning icon and "Not from Paraa" inside, plus the 1930 / cybercrime.gov.in line.
  - D3: `StatePair`, a "From Paraa" mock beside a "Not from Paraa" mock.
- **Position: the table, with D2's three scam lines** (they're more realistic than mine) **and D2's 1930 line** as plain text below it, if compliance approves.
- **Reasons:**
  1. **Crop risk.** A scam message drawn as a realistic message card in our visual language is exactly what a fraudster would screenshot. "Pay the processing fee to my personal account…" in a Paraa-styled frame, cropped above the label, does harm. In a table, the quote and its rebuttal share one row.
  2. **One focal object.** The band already has one white object (the Withdraw crop). Three more white cards make four light rectangles on ink, and the band stops reading as one calm surface.
  3. **D3's "From Paraa" side has no confirmed content.** Our sending domain, sender ID and support number are all unconfirmed (D3's own Q6). A made-up genuine message would itself be a claim.
- **Would change my mind:**
  - If the owner confirms official channels (Q6), a single D3 `StatePair` could *replace* the table, with the "Not from Paraa" tag inside each frame, first in DOM, at 14px.
  - D2's cards are acceptable only if each "Not from Paraa" label sits inside the card's top edge, so it can't be cropped off.

### 2.15 Tools switcher: segmented control (D1) or underline tabs (D3)
- **Position: Moved, to D3's underline Tabs.** One component for the job, no pill-ish track, server-rendered marker that survives forced colours. Below 640 the two tabs share the width equally (D3 §5.5), which gives D2 the 44px halves it wanted.

### 2.16 Type details
| Item | D1 | D2 | D3 | Position |
|---|---|---|---|---|
| h3 (step, row, panel) | 20/28 | n/a | 24/32 at ≥ 1024, 20 below | **Moved to D3.** It's file H4, and step titles still fit in 264px |
| h1 phone | 34/40 | 32 | 36/42 (32 below 360) | **D3's**, if D2's shorter H1 wins ("One basket that follows…", 3 lines at 358px). If the longer H1 stays, 34, so it's never more than 4 lines |
| Tracking | −0.02 / −0.015em | n/a | −0.025 / −0.02em | **D3's.** Trivial; one owner for the numbers |
| FAQ answer | 16 grey-700 | **18** grey-700 (§8.6) | 16 muted | **16.** One step below the 18px question, never the same size (D2 is inconsistent here: its own A9 note says one step below) |
| Focus ring | 3px | 2px ink / white | 2px | **Moved to 2px**, offset 2px |
| Line height h1 | 56 | n/a | 54 | **D3's** |

### 2.17 Hero grid and spacing
- **Grid:** D1 6/6 with a 48px gap; D2 and D3 5/7 with 64px. **Moved to 5/7, 64px**, unless the panel becomes phone-proportioned (§2.2), then 7/5.
- **Section padding:** D1 96/80/64; D3 96/64 (two steps). **Moved to D3's.** Fewer steps, and my sketch already fits the ≤ 7,500px budget at 96.

### 2.18 Band text colours
- **Position: Moved, to D3's roles.** Band body grey-300 (9.65:1), not my flattened white-80% (9.68:1). Hairlines ink-600 (1.65:1), not my white-16%. They're the same to the eye, but D3's are named roles, not one-off alpha values. D2's white 85% is also within range; D3's role wins for the system.

### 2.19 Other small positions
- **Hero secondary action:**
  - D2's "How we protect your account →" text link replaces my "See what's in the basket" button. Wise's "How we keep your money safe" is the precedent.
  - But D2's cells 1–3 already link to `#security`, so a fourth link to the same place is redundant. **Drop the secondary link** and let the cells be the verification path.
  - D2's helper line under the button stays.
- **Phone order, proof before the panel (D2 P5):** accept. The panel is the first swipe.
- **"Tokenized" chip:** accept D2's removal. My draft already offered it.
- **Badge word "Example":** agree with D2.
- **Chip "checked" check icon (D2 §8.4):** challenge. Adding a 16px icon on select changes the chip's width and reflows the row on every tap.
  - The ink fill is a luminance change, not a hue-only signal, so it already meets 1.4.1, alongside `aria-checked` and D3's forced-colours outline.
  - If the icon stays, its 16px slot must be reserved in every chip.
- **Press scale:** D2 says 0.98, D3 says 0.97. Pick one. **0.97 (D3).**
- **Basket bar height:**
  - D3's `AllocationBar` is 12px. Mine was 40px in the Basket section, where the bar *is* the section's picture.
  - One component with `size="sm"` (12px, legends and the panel if ever) and `size="lg"` (40px desktop, 32px phone, Basket only).
  - Columns follow the 50/30/20 proportions at ≥ 1024 so each text block starts under its segment. Below that, equal columns with swatches.

---

## 3. What looks generic, inconsistent or unfinished in the drafts

### In D2
1. **Basket "Facts list: three items, each with an icon and a text label."** That's the icon-row template we're removing (an icon beside every fact).
   - It repeats the hero lede (rupees, daily price) and the How-it-works steps (maturity).
   - Drop it. If one fact must stay, "Each investment has a maturity date" can be a line in the basket lede.
2. **The "What you own" bordered note block.** A box inside a section, against the rules-not-boxes principle all three drafts share. Make it a `RuledItem` (2px rule, h3, body) under the composition columns.
3. **Form suggestion chips.** The purpose is excellent (it turns unanswered doubts into an action).
   - The visual risk: four chips of 30–50 characters will wrap to 2–3 lines each at 390. They'll also look identical to the tools' `ChoiceChips`, which *select* values, while these *insert text*. Same look, different behaviour.
   - Render them as a list of quiet text buttons with a leading `Plus` icon ("+ What are the fees on ₹1 lakh?"), one per line, 44px rows.
4. **First-view density.** At 1440 the hero holds:
   - H1, a 27-word lede, the primary button and its helper line;
   - a secondary link;
   - four two-sentence cells;
   - the panel.

   That's about 15 text blocks. Dropping the secondary link (§2.19) helps. D2 also claims the cells stay in the first view at **1366×768**. With a 3-line H1, a 4-line lede at 453px and the helper line, I estimate the cells start about 690px down, under a 704px viewport after the header. **Unverified; it needs a measurement before we promise it.**
5. **Page length against D2's own budget** (under 9,000px at 390). My sketch, with *less* content, is already 9,766px at 390. D2 adds:
   - 5 FAQ items;
   - suggestion chips;
   - a counter and helper texts;
   - the 1930 line;
   - a 4-row band with three cards;
   - the "What you own" block;
   - the facts list.

   Expect 11,000px or more. Cuts that cost nothing: the facts list (item 1), the cards → table (§2.14), and step bodies trimmed to one line at 390 (the path repeats them). D3's 11,500px ceiling is the realistic number.
6. **The always-visible "{n} / 1,000" counter.** It's noise under every question for the 99% who write two lines. Show it from 800 characters.
7. **Nav "Calculators" against the h2 "Run the numbers".** You click one word and land on another. Either is fine, but they should match.
8. **Internal inconsistencies:** header 72px on desktop (§3.1) against 64 elsewhere and in D3; FAQ answer 18px (§8.6) against D2's own "one step below the question" rule.

### In D3
1. **Two near-blacks** (`--foreground`/`--rule` grey-900 against `--primary` ink). See §2.11.
2. **`--brand-text` gold-800: "at most one word or figure per screen, D1 to choose."** I choose none. A role with no job will find one. Delete the role and add it back with a contrast proof the day a job exists (D3's own change-control rule).
3. **`StatePair` "From Paraa"** has no confirmed content (§2.14).
4. **The separate facts-strip section** needs an exception to D3's own surface rule, and today it can only hold facts that repeat the lede (§2.6).
5. **`text-faint` job list** (source lines, meta, step numbers): there are no source lines on the page, and step numbers on grey-50 sit at 4.52:1 (§2.10).
6. **MockFrame `border-border-strong` (grey-300) against Panel `border` (grey-200).** Two frame greys for two kinds of white box on the same page. Use grey-200 for both. The mock frame already has its shadow (hero) or the ink around it (band) to separate it.
7. **Tabs `size="sm"` in a second row under the 48px mock header** gives about 92px of chrome. If hero tabs survive, put them in the header strip.
8. **The reveal kept on exactly the densest content** (Basket rows, steps). If any reveal survives, those are the parts a reader scans fastest, so the delay costs most there. Another reason for "none" (§2.3).
9. **Mobile readout at 56px.** See §2.12; 48px.
10. **The `active:scale-97` press on chips** in a wrapping row: fine, but confirm it doesn't cause sub-pixel text shimmer in Android Chrome at 0.97. If it does, drop it to colour only.

### In my own draft (found while reviewing)
- **50/30/20 in the hero panel** read as returns. Removed (§2.2).
- **The success/error discs and bars** broke an approved rule. Removed (§2.13).
- **A 12px Example tag** broke my own 14px honesty rule. Fixed (§2.9).
- **Gold doing four jobs** made the rule untestable. Reduced to two (§2.1).
- **I specified the light-island colour scope as a problem** (the sketch's white-on-white title) but didn't solve it. D3's `.theme-light` inside `.theme-ink` is the solution. Adopted.

---

## 4. Concessions: what changes in D1

| # | Was (`d1-visual.md`) | Now |
|---|---|---|
| 1 | Gold: logo, gold sleeve, nav marker, slider thumb, band focus ring | **Logo and gold sleeve only.** Ink nav marker; white thumb with an ink border; white focus ring on the band (D3 C1) |
| 2 | Band 6th | **Band 4th**, after How it works (D2 P2) |
| 3 | Hero panel shows the composition bar with 50/30/20 | **No percentages in the panel.** Single screen = D2's **Invest** screen; tabs only if the owner allows (D3 Q4); phone proportions if the app is phone-only (D3 Q9) |
| 4 | Hero facts row: who / money in / price / money out | **D2's four trust cells**, in the RuledItem visual, including "You can lose money" at equal weight (owner call) |
| 5 | FIU line under the CTAs, plus a band sentence | **Hero cell 1**, plus **band row D** with means / doesn't-mean at equal size, last in the band |
| 6 | Success/error fills on bars and crop icons | **Ink bars both ways; ink icons with the words "Allowed" / "Not allowed"** (proposal line 230) |
| 7 | Example tag 12px | **14px** |
| 8 | Segmented control for the tools | **D3 underline Tabs** |
| 9 | h3 20/28; focus 3px; 6/6 hero; 96/80/64 padding; my tracking values | **h3 24/32 at ≥ 1024; focus 2px; 5/7 hero with 64px gap; 96/64 padding; D3's tracking** |
| 10 | Band body white-80%, rules white-16%, gold ring | **D3's grey-300, ink-600 and white ring** |
| 11 | Secondary hero button "See what's in the basket" | **No secondary action.** The cells link to the proof; D2's helper line stays |
| 12 | Phone: panel right after the buttons | **Cells before the panel** (D2 P5) |
| 13 | "Ask a question" | **One label everywhere:** "Ask a CA" if the owner confirms CAs read questions, otherwise "Ask a question" |
| 14 | What-if default zero | **"All three fall" default**, with the scenario named inside the result frame |
| 15 | Bar segments square, 8px swatches | **4px outer radius, 10px swatches** |

**Still held:** no scroll reveals; one still hero screen (owner decides); body grey-700 and no grey-500 text beyond placeholder and `+91`; ink as the one near-black; the spot-a-fake table; a 48px top readout on phones; no chip check icon (or a reserved slot); the large basket bar variant; delete `--brand-text`.

---

## 5. One combined request to the owner

All three drafts ask about the logo: a vector (SVG) lockup with the **mark in gold and the wordmark in ink**, for white backgrounds. The current PNG is all gold (1.64:1 on white, soft at 3×). It's one asset request, not three.
