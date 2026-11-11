# Reference build of `spec.md`: what it showed

**Date:** 10 Nov 2026. **Built by:** D1. **Spec read:** `spec.md` v1, all of it.
**Build:** one static HTML file, `…\scratchpad\design-d1\reference.html`. It uses the §2.1 tokens (the CSS values as written), the §6 and §7 copy word for word, the §4 component classes translated to plain CSS, Manrope from Google Fonts and `src/assets/paraa-logo.png`. Both tools run the real maths (`basket.ts` `scenario()`, `tax.ts`, `format.ts`), and the screen matches Appendix B: ₹74,100 / −₹25,900 (−25.9%) / −₹12,500 · −₹1,500 · −₹8,000 · −₹3,900, and ₹68,800 / ₹31,200.

Opening the file with `#fix` on the URL turns on a separate CSS layer containing only the fixes proposed below, so each fix can be seen and measured against the spec as written.

**Screenshots** were taken with playwright-core and Chrome at 390×844, 768×1024 and 1440×900, plus 320 for the overflow check. They're in `img/ref-*.jpg`, indexed at the end of this file. Every `ref-*` image shows the spec **as written**. Only `ref-proposed-*` images include the fixes.

**Three faults in my own build were found and fixed before measuring.** They aren't spec issues, but a developer could hit the same ones:
- a `.split` class collision;
- an icon squashed by padding;
- the `space-y-8` + `-mt-4` collapse not reproduced. See N17: the spec relies on it, and it's fragile.

---

## 1. Page heights against the budgets

| Width | Spec as written | With fixes N1–N8 | Budget | Verdict |
|---|---|---|---|---|
| 1440 | **7,653px** | 7,617px | ≤ 7,500 (§5.1, QA F7) | **Over by 153** (117 with fixes) |
| 768 | 10,824px | 10,670px | none set | n/a |
| 390 | **12,122px** | 11,990px | ≤ 11,500 | **Over by 622** (490 with fixes) |
| 320 | 13,380px | n/a | none set | n/a |

**Section heights, spec as written** (px):

| Section | 1440 | 768 | 390 |
|---|---|---|---|
| Header | 64 | 64 | 64 |
| Hero + facts row | 797 | 1,247 | 1,401 |
| What you're buying | 806 | 1,018 | 1,044 |
| How it works | 901 | 1,495 | 1,833 |
| **Security band** | **1,275** (budget ≤ 1,200: **over**) | 1,683 | 1,921 (budget ≤ 2,000: ok) |
| Run the numbers | 1,270 | 2,015 | **2,135** (largest) |
| FAQ (first item open) | 852 | 970 | 1,068 |
| Ask a CA | 1,106 | 1,538 | 1,642 |
| Footer | 582 | 794 | 1,014 |

With the fixes, the band is 1,213 at 1440 and How it works is 1,701 at 390.

**Where the overage comes from:**
- **At 1440:** the band (+75) and How it works (the money-path connector labels set its height, see N3).
- **At 390:** content, not layout. The tools (2,135), the band (1,921), How it works (1,833) and Ask (1,642) are each tight already.

The spec's 11,500 was set before Round B added the FAQ items, the form helpers and the prompts. My Round B review predicted "expect 11,000px or more".

**Recommendation (N14):**
- Apply N1–N8.
- **Amend the budgets to ≤ 7,700 at 1440 and ≤ 12,000 at 390**, rather than squeeze a money tool or cut honesty copy. 7,700 is still under the 8,000 the research set as the "short page" bar, and both direct competitors run 11,700–17,000 at 1440.
- If the owner wants 7,500 held, the one layout lever left is N14b: sliders in two columns at ≥ 1024 (−180px). It costs slider resolution: the oil slider's 120 steps would get about 260px of track.

## 2. Spec checks that pass on screen

- **B1:** every h2 is the same size at each width (30 / 36 / 40px).
- **B2:** exactly seven font sizes at 1440: 12, 14, 16, 18, 24, 40 and 48.
- **B4:** one shadow (the hero frame), plus the open menu.
- **B6:** gold is at most 2 uses per screen (logo, and the basket data series).
- **B14:** chips use an ink fill, tabs use ink text and a bar, and the thumb is white with an ink border.
- **B15:** the four facts cells look identical.
- **F1:** no horizontal overflow at 320, 390, 768 or 1440.
- **F6:** at 320, "Markets and the rupee" wraps to 2 lines inside a 144×62 tab.
- **F11:** the header at 320 fits: the logo, "Ask a CA" and the menu end exactly at the 304px content edge. The §6.1 arithmetic is wrong, though (N23).
- **F8, first view at 1440×900:** the facts row starts at **y = 669** (spec: about 680). The h1, lede, CTA, helper, panel and all four cells' first sentences are visible (`ref-1440-first-view.jpg`).
- **F8, first view at 390×844:** cells 1–3 are visible and cell 4's rule sits at y = 828. That's what the spec allows (`ref-390-first-view.jpg`).
- **Tools:** the default "All three fall" state is named inside the result frame; Appendix B values match.
- **Form states** (errors, sending with the 6s "still sending" line, sent, and the 503 alert with only "Copy my question") all render from the §7 copy.

---

## 3. Issues, each with a proposed spec fix

**Severity:**
- **S1:** looks broken, or breaks a budget.
- **S2:** a clear quality problem.
- **S3:** polish, or an ambiguity a developer would have to guess at.

The "Fix" column is the proposed text change for D3, who owns `spec.md`.

### Problems visible on screen

| # | Sev | Where (spec ref) | What the build showed | Proposed spec fix |
|---|---|---|---|---|
| **N1** | S1 | Money path at ≥ 1024 (§4.11) | `li` 2–5 are `flex` with the default `align-items: stretch`, so every node is stretched to the height of its connector column (line, plus a 3-line label). The middle nodes measure **145×130**, the end node **147×108**, the first node 134×56. That leaves three grey slabs and one small box (`ref-1440-full.jpg`, How it works) | Add **`items-start`** to `li` 2–5: "each `li` 2–5 is `flex flex-[1.9] basis-0 min-w-0 items-start`". Measured result: every node 56px (70 for the 3-line end node) |
| **N2** | S2 | Money path below 1024 (§4.11) | The vertical path is about 560px at 390 and 768: five 56px nodes plus four connectors of about 68px. At 768 it fills only the left 360px of a 720px column, with the right half empty (`ref-768-full.jpg`) | Below 1024: node **`min-h-11`** (44), connector **`py-1`**, line **20px**. Saves 132px at 390 and 768. Optional, at 640–1023: put the path (360px) beside the "no shortcut back" and off-ramp lines in two columns |
| **N3** | S3 | Money path connector labels at 1440 (§4.11) | The connectors are about 120px wide, so three of the four labels wrap to **3 lines**, and "Your bank account, in your name" wraps to 3 lines in a 147px node. The end node is then 70px tall while the connector line stays at 28px (the 56px node's middle), so the last arrow points at the node's upper third. The labels also set the whole block's height | Change the ratio: connectors `flex-[1.1]`, nodes `flex-1`, the end node `flex-[1.25]`. Centre the line on the node by giving the connector's line row the node's actual height (`items-center` on an inner row), not a fixed 56px. Or ask D2 for 2-line labels ("UPI or bank transfer, verified") |
| **N4** | S1 | Tool result inset at ≥ 1024 (§4.15 `ResultInset`) | The inset is `lg:self-start` **and** has the grey-50 fill, so the fill stops where its content stops: 650px tall in a 904px card on the what-if, and about 470 in 641 on the tax tab. The card's bottom-right corner is a white void and the inset looks like a floating half-panel (`ref-1440-tools-default.jpg`, `ref-1440-tools-tax-tab.jpg`) | Split the job. The **column** stretches (`self-stretch`, `bg-background-alt border-l`). An **inner wrapper** is sticky: `<div class="lg:tall:sticky lg:tall:top-[calc(var(--header-h)+1.5rem)]">`. Verified in `#fix` mode: the fill runs the full card height and the figures stay in view while you scroll the sliders |
| **N5** | S2 | Tool breakdown rows (§4.15, §6.6.1) | The rows use `DefinitionList`, whose `dt` is `text-muted-foreground` 14/400. The sleeve name ("US stocks") and its detail line ("−25% on its part of the basket") are the same colour, size and weight, so the row reads as one grey paragraph. Only the amount stands out | Inside the breakdown, the name is `text-body-md font-semibold text-foreground` and the detail line stays `text-muted-foreground`. Also state the row layout, which the spec leaves to guesswork (N18b) |
| **N6** | S1 | Security band (§6.5, Group 3; budget §5.1) | The band is **1,275px** at 1440 (budget 1,200). Group 3's `border-t` sits on a `max-w-[72ch]` block, so the hairline stops at x ≈ 846, mid-page, aligned with nothing. It reads as unfinished (`ref-1440-full.jpg`) | (a) Group 3 becomes **L3**: the h3 in the left 5 columns, the body in the right 7 (the body keeps `max-w-[72ch]`), the rule runs full width. That matches Group 1's split. (b) Group gaps are `mt-12` at every width and Group 3 is `pt-8`. Measured: **1,213** (−62). The last 13px: the Group 1 rows go to `py-4`, or the band budget becomes 1,250 |
| **N7** | S3 | "What you own" (§6.3) | `RuledItem max-w-prose` makes the 2px rule stop at 634px. It doesn't line up with the sleeve columns above (column 2 starts at 720) | Put the max-width on the text only: the rule runs full width (`RuledItem`), and `max-w-prose` goes on the title and body |
| **N8** | S3 | Steps at ≥ 1024 (§6.4) | "Add money to your wallet" wraps to 2 lines at 24px in 270px; the other three titles take 1. The four bodies start at different heights, a visible step across the row | `ol` gets `lg:grid-rows-[auto_auto_auto]`, and each `li` gets `lg:grid lg:grid-rows-subgrid lg:row-span-3 lg:gap-y-2`, so labels, titles and bodies align across columns. +26px; verified in `#fix` mode |
| **N9** | S3 | Chips at 390 (§6.6.1) | The amount chips wrap 3 + 1, leaving "₹10 lakh" alone on a second row. The scenario chips are 154px wide, so "Rupee 5% stronger" wraps to 2 lines and three chip rows are 84px tall (`ref-390-tools-default.jpg`) | Amount chips: `grid grid-cols-2 gap-2` below 640 (two even rows, same height, deliberate) and `flex` from 640. Scenario chips: keep them, and note that a 2-line note is allowed |
| **N10** | S2 | Name and mobile side by side at ≥ 640 (§7.2, §4.16) | The mobile field has a helper **between label and input**, and the name field doesn't. The two inputs in the row are 52px apart vertically, and the errors land at different heights too (`ref-1440-form-errors.jpg`) | Put the helper **under the input** for every field that has one (label → input → helper → error), keeping `aria-describedby`. The two inputs then share a baseline. Alternative: stack name and mobile at every width (+70px) |
| **N11** | S3 | Question prompts (§4.16 `QuestionPrompts`) | `Button quiet md` has `px-4`, so the `+` icons and text sit 16px in from every label and input edge. It reads as a nested list (`ref-1440-form-errors.jpg`) | Wrap the `ul` in `-mx-4` (it stays inside the card padding at both `p-5` and `p-8`). The icons then line up with the labels, and the hover fill still has its padding |
| **N12** | S3 | Sent state (§7.4) | `CircleCheck` has `mx-auto`, so it's centred, while the heading, reference, lines and button are left-aligned. The icon floats over nothing (`ref-1440-form-sent.jpg`) | Either drop `mx-auto` (icon left, above the h3), which I recommend because it matches every other block in the card, or centre the whole confirmation (`text-center`, buttons centred) |
| **N13** | S3 | Mobile menu open (§4.19) | With the menu open, the header's outline "Ask a CA" and the menu's filled "Ask a CA" are both on screen, 300px apart (`ref-390-menu-open.jpg`). It isn't a rule break (one filled button), but it's the same action twice | Drop the menu's CTA (the header button is always visible), saving 64px of panel. Or keep it and hide the header's CTA while the menu is open. My vote is to drop it |
| **N14** | S1 | Page-length budget (§5.1, F7) | See §1: 7,653 / 12,122 as written, 7,617 / 11,990 with the fixes | (a) **Amend to ≤ 7,700 at 1440 and ≤ 12,000 at 390.** (b) If 7,500 must hold: at ≥ 1024, the four sliders go in a `grid-cols-2 gap-x-8` grid (−180px), accepting about 260px of track per slider |
| **N15** | S3 | Hero panel (§6.2) | It measures **635×427**, not the spec's "about 635×380". The first view also repeats itself: the panel title "US stocks, gold and crude oil" sits beside the h1 that says the same, and "in your name" appears in both cell 2 and the panel's last row. The panel is a plain text table and reads more like a form than an app (`ref-1440-first-view.jpg`) | Correct the size note to "about 635×430". For D2: when the app's basket name is confirmed, use it as the panel title instead of repeating the h1. Until then, consider "Your basket". Content call, not layout |
| **N22** | S3 | Tax slider zero tick (§4.14) | The default of +₹1,00,000 sits 4% from the zero tick on a −5 lakh to +20 lakh range. The 24px thumb overlaps the 2px tick and it looks like a glitch ("⊢◯") (`ref-1440-tools-tax-tab.jpg`) | Draw the tick **under** the track's fill and thumb (`z-index` below the input), and hide it while the thumb is within one thumb-width of zero |

### Places the spec is ambiguous or contradicts itself

| # | Where | The ambiguity | What I built | Proposed spec text |
|---|---|---|---|---|
| **N17** | Tax panel lede (§6.6.2: `-mt-4` inside `space-y-8`) | It only works because Tailwind 4's `space-y` sets `margin-block-end` and the two margins collapse to 16px. Under Tailwind 3 semantics, or in a flex or grid column, the lede overlaps the h3. My first render did exactly that | 16px | Wrap the h3 and lede in one `div`, lede `mt-2`. No negative margins anywhere |
| **N18** | Tools spacing (§4.12 `Tabs.Panel pt-6` and §6.6 "Tool card (`Panel`, `mt-6`)") | Both apply, so the gap is 48px, or one is meant, so it's 24px | 24px | "The card has no margin; the 24px comes from `Tabs.Panel pt-6`." |
| **N18b** | Breakdown row layout (§4.15 `DivergingBar` `col-span-2` inside a `DefinitionList` whose rows are `flex`) | `col-span-2` needs a grid row | grid | "Breakdown rows are `grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 items-baseline`; the bar is `col-span-2`." |
| **N19** | Hero below 1024 (§6.2) | The facts row → panel gap isn't specified | 48 | "Below 1024 the panel is `mt-12`." |
| **N20** | Footer below 1024 (§6.9) | The brand → links gap isn't specified | 40 | "Below 1024, `gap-y-10` between the brand block and the links." |
| **N21** | Vertical money path (§4.11) | "…the label beside it; then `ArrowDown`": where does the arrow sit? | Under the line, on its x | "The `ArrowDown` sits under the line at its x position (`pl-[13px]`), directly above the next node." |
| **N23** | Header width maths (§6.1) | It says "logo 102 · CTA 89 · menu 44 (gaps 8) = 251 of 288". The header container is `gap-6`, so brand → right group is 24px, and the measured CTA is 91px | n/a | Measured: 102 + 24 + 91 + 8 + 44 = **269 of 288** at 320. It still fits, with 19px to spare |
| **N24** | Sent heading focus (§7.4) | Focus moves to the confirmation `h3` (`tabIndex -1`). The global `:focus-visible` ring then draws a 2px box around a 24px heading for keyboard users. The section h2s get `outline-offset-4`; this h3 has no rule | Global ring | Give every programmatic-focus heading the same rule: `focus-visible:outline-offset-4 rounded-sm` (or say plainly that headings get no ring). One rule for h2s, band h3s and this h3 |

### Areas that look generic or weak (no spec breach)

- **FAQ at ≥ 1024:** the left column is empty for about 700px under the side line (decision 40: not sticky). The list runs fine and nothing looks broken. **No change.**
- **Hero panel:** see N15. It's honest but plain. It will read as "designed" once it carries the app's real basket name and its real row labels (D3 Q9 / owner).
- **The logo on white:** the gold "CAPITAL" line is faint at every width, as expected (decision 52). It stays on the owner list.

---

## 4. Image index (`img/`)

All images are the spec **as written**, unless the name says `proposed`.

| File | Shows |
|---|---|
| `ref-1440-full.jpg`, `ref-768-full.jpg`, `ref-390-full.jpg` | Whole page |
| `ref-1440-first-view.jpg`, `ref-768-first-view.jpg`, `ref-390-first-view.jpg`, `ref-320-first-view.jpg` | First screen at each size |
| `ref-{390,768,1440}-tools-default.jpg` | Run the numbers, tab 1, default "All three fall" |
| `ref-{390,768,1440}-tools-tax-tab.jpg` | Tab switched to "Tax on your profit" |
| `ref-{390,768}-tools-readout-sticky.jpg` | Scrolled into the tool: the 48px readout stuck under the header |
| `ref-{390,768}-menu-open.jpg` | Mobile menu open |
| `ref-{390,768,1440}-faq-open.jpg` | FAQ with items 1, 3 and 7 open |
| `ref-{390,768,1440}-form-errors.jpg` | Empty submit: four inline errors, focus on the first |
| `ref-{390,768,1440}-form-sending.jpg` | Sending: read-only fields, spinner, prompts inert, the "still sending" line |
| `ref-{390,768,1440}-form-sent.jpg` | Confirmation with reference |
| `ref-{390,768,1440}-form-503.jpg` | Not configured: the alert with "Copy my question", no retry |
| `ref-proposed-{390,768,1440}-full.jpg`, `ref-proposed-*-first-view.jpg` | Same page with fixes N1–N8 applied (`#fix`) |

The element screenshots are taken with the header and readout set to static, so they don't land in the middle of a crop. The `readout-sticky` shots show the real sticky behaviour.
