# Round B review by D3 (system, consistency, QA) of D1 and D2

**Date:** 10 Nov 2026. **Reviewed:** `d1-visual.md` (all of it, plus the nine sketches in `img/`) and `d2-ux.md` (all 800 lines), against my own `d3-system.md`.
**New measurements for this review** (headless Chrome, the page's own Manrope, 10 Nov):

| Label width at 14px / 600 | |
|---|---|
| "Ask a CA" | 57px |
| "Ask a question" | 97px |
| "Talk to a CA" | 76px |
| "Tax on your profit" | 116px |
| "If markets move" | 105px |
| "Markets and the rupee" | 150px |
| "Example" | 56px |

The official logo is 82px wide at 32px tall and 102px wide at 40px tall. These numbers decide two of the conflicts below.

**What I'll need for the merge** is in §5. **What changes in my own spec** is in §4.

---

## 0. Verdicts at a glance

| # | Conflict | D1 | D2 | D3 (was) | **D3 verdict now** |
|---|---|---|---|---|---|
| V1 | Gold on the slider thumb | gold + ink ring | n/a | ink (C1) | **Concede:** gold thumb with a 2px ink ring |
| V2 | Gold nav marker and band focus ring | gold | ink / white | ink / white | **Hold:** ink marker, white ring in the band |
| V3 | Hero panel | one still screen | 3 tabbed flows | Tabs (C7) | **Concede to D1:** one still screen, no tabs |
| V4 | What the still panel may show | % bar + "Invested so far" | no % or values | no %/charts | **Hold the round-11 rule:** no % bar in the panel. Owner question |
| V5 | Scroll reveals | none | panel + bodies | 2 lists (C14) | **Concede:** none. Delete `reveal*.tsx` |
| V6 | Tag size and radius | 4px, 12/600 | n/a | 4px, 14/600 | **Hold 14/600** (honesty label). Radius already agrees |
| V7 | Tools switcher | segmented, 40px segments | tabs (segmented on phones) | underline tabs | **Concede to segmented**, with 44px segments, on Base UI Tabs |
| V8 | Tools with JS off | n/a | both panels stacked | tool 1 + note | **Concede to D2** (a `<noscript>` style) |
| V9 | Band position | 5th (after the tools) | **4th** | 6th (audit) | **Support D2:** 4th |
| V10 | Facts strip | a row in the hero (product facts) | "Before you start" row in the hero (trust facts + risk) | own section | **Concede:** a hero row. Content: D2's cells, D1's visual |
| V11 | "You can lose money" cell | n/a | yes, same weight | n/a | **Support,** pending owner. Same component, no warning styling |
| V12 | CTA label | "Ask a question" | "Ask a CA" | one label | **One label.** "Ask a CA" fits 320 with room; "Ask a question" fits only with a 32px logo and 14px label. The owner decides who reads the questions |
| V13 | Header CTA weight | primary | primary | secondary | **Concede:** primary (the same action may appear twice in one view) |
| V14 | What-if default | zero (sketch) | "All three fall" | zero | **Support D2,** on condition that the result names the scenario |
| V15 | Text greys | ink / grey-700 / grey-600; grey-500 out of text | grey-700 body | grey-900 / 600 / 500 | **Concede to D1** in full |
| V16 | Money-path diagram | yes, in How it works | n/a | n/a | **Defer:** ship the steps only; the path returns with custody |
| V17 | Mobile result readout | ≤ 56px bar, "D2's call" | 64px dock at the bottom of the tool, conditional | sticky top line, always on | **Hold top-sticky,** CSS only, 56px |
| V18 | Gain and loss bar colour | green / red | colour as a second signal | single ink | **Hold single colour.** Owner question (D1 Q8) |
| V19 | "Spot a fake" | 2-column table | 3 light message cards | StatePair mocks | **Concede to D1's table** with D2's copy. I drop StatePair |
| V20 | Focus ring width | 3px | 2px | 2px | **Concede:** 3px |
| V21 | Type sizes and breakpoints | 34/40/48 · 28/32/40; 640/1024 | 32px h1 phone | 36/44/48 · 30/36/40; 768 step | **Concede to D1** |
| V22 | Header height | 64 | 64 / 72 | 64 | **Hold 64** at every width |
| V23 | Legal and FAQ answer sizes | 14 / 16 | 16 / 18 | 14 / 16 | **Hold 14 / 16** |
| V24 | Chip semantics | n/a | `aria-pressed` buttons | radio group | **Hold radios** (amount and slab always have exactly one) |

---

## 1. Where we agree

These need no debate and go straight into the merged spec:

- **Surfaces:** a light page, exactly one ink band, no dark result panels, no gold buttons or bands, no hover lift, no pills (all three of us).
- **Corners and elevation:** 8 controls / 12 panels / 16 app frame. One shadow, on the hero panel only.
- **Product drawings:** in HTML, with the "Example" tag inside the frame. No scenery, people, padlocks, seals or crypto imagery.
- **Type and figures:** Manrope at 400 and 600 only, 48px cap, one h2 size, tabular figures on every number, U+2212 minus, nothing a person must read under 14px.
- **Motion:** none on load, nothing pinned or looping, no rolling digits, a native slider that tracks 1:1, colour-only hover at 150ms, everything at 0ms under reduced motion.
- **Header and menu:** sticky (not fixed), solid white, white over the ink band (no flip). Native `<details>` for the menu and the FAQ.
- **Form:** visible labels, errors under the field with icon + text, a 503 message that doesn't say "try again", and no phone field in the hero.
- **Placeholders:** none on the public page. Absent, not tagged.
- **Band rules:** registration last; text before its example on phones; band ≤ 1.3 screens at 1440. D1 measured 1,100px.
- **The skill:** its dark/crypto output is rejected; Trust & Authority + Minimalism & Swiss + Accessible & Ethical are adopted.

---

## 2. Conflicts: options, position, reason, and what would change my mind

### V1–V2. Gold as a state colour (my C1, D1 §2.2, D2 P11)

- **Options:**
  - **(a)** gold never marks state (my draft);
  - **(b)** D1's five gold jobs: logo, gold sleeve, nav marker, slider thumb, band focus ring;
  - **(c)** a split.
- **Position:**
  - **(c)**. I **concede the slider thumb.** D1's 2px ink ring answers my contrast objection: ink vs white is 14.33:1, so the gold is never the edge (WCAG 1.4.11).
  - I **keep the nav marker ink**, with D2. A 2px gold underline is the *only* thing that tells you which link is current besides a grey-600 → ink text change, and those two states differ by about 1.9:1. Gold at 1.64:1 on white doesn't meet 3:1 as a state indicator; ink does.
  - I **keep the band focus ring white**, with D2. One rule ("the ring is the scope's foreground"), 14.33:1 against 8.72:1, and gold stays out of interaction states except the thumb.
- **Budget restated:** "≤ 3 gold *uses* per screen, where a repeated control (4 thumbs) or one data series (bar + legend + breakdown swatch) counts as one use." The worst screen, the tools, then shows the logo, the thumbs and the gold-sleeve swatch: 3.
- **Would change my mind:** the owner explicitly wants the gold nav marker, *and* it's paired with an ink text-weight change that alone gives ≥ 3:1 between states (it doesn't today).

### V3–V4. The hero panel: D1's one still screen vs D2's three tabbed flows vs my Tabs

- **Options:**
  - **(a)** D1: one static screen;
  - **(b)** D2: Add money / Invest / Withdraw tabs;
  - **(c)** my shared Tabs component.
- **Position: (a). I concede C7 for the hero.**
- **Why:**
  - **Repetition:** D2's Withdraw tab duplicates the band's withdraw crop, and Add money / Invest duplicate How-it-works steps 2–3. That's three drawings of one flow, which is exactly audit T8.
  - **Implementation:** a still panel is a Server Component with zero JS. It's perfect with JS off (no hidden tab row, so D2's `visibility: hidden` workaround isn't needed), and there's no CLS risk from screen switching.
  - **Trust:** D1's point that clickable fake UI invites people to treat it as the app is fair. The Example tag mitigates it but doesn't remove it.
  - **Fit with the owner's wording:** "static hero with an example app panel".
  - Tabs remain a single component, used once (the tools), so P4 "one component per job" still holds.
- **But the panel's content needs a decision (V4).** The build brief's round-11 honesty rule (never revoked by rounds 12–16) says: *"Mock screens carry an Example tag and show no returns, value, percentages, prices or charts."*
  - D1's panel shows a 50/30/20 bar with percentages.
  - D2's rule list also bans any percentage in the panel.
  - **My position:** no bar or percentages in the panel until the owner explicitly allows *allocation* percentages in mocks. Allocation isn't performance, but the rule is literal. The basket section, one scroll below, already carries the mix with "These percentages are an example".
  - **The still panel shows rows only:** Basket (US stocks, gold and crude oil) · Price (updated once a day) · Add money (UPI or bank transfer) · Withdraw to (••4821, in your name). "Invested so far ₹60,000" is allowed by the rule (a sample amount paid in, as `product-tour.tsx` already reasoned), but it answers nothing in the hero, so I'd drop it.
  - This also removes the triple repetition of the bar (panel, basket, calculator) that D1 counts as a unifying device.
- **Would change my mind:**
  - **V3:** the owner answers my Q4 with "yes, it may switch screens" *and* D2 has evidence that visitors look for the flows in the hero rather than in How it works.
  - **V4:** the owner rules that allocation percentages are allowed in mocks. Then D1's bar goes back in, as the same `AllocationBar` component the basket uses.

### V5. Scroll reveals (my C14, D1 P8, D2 §4.3)

- **Options:** none (D1); the panel and section bodies (D2); two lists (me).
- **Position: none. I concede.**
- **Why:**
  - The institutional references measured 0 reveals; Vested's 29–61 are the generated-site tell.
  - It deletes `reveal.tsx`, `reveal-controller.tsx` and their CSS. That's one script fewer, and QA no longer needs a "waiting" state check.
  - P5 ("complete without JS") becomes trivially true.
  - D2's own placement (the panel) is moot on desktop, where the panel is in the first view and was never revealed anyway.
- **Would change my mind:** the owner asks for it back. Then only D2's scope applies (section bodies, never headings, legal, figures or the band).

### V6. Tags: size and radius

- We already agree on **4px** (my `rounded-xs`). The conflict is the **text size**: D1 uses 12/600 and I use 14/600.
- **Position: 14/600, 24px tall, 8px padding** (72px wide for "Example").
- **Why:**
  - Proposal §4 sets "Honesty labels… never below 14px" and "`ExampleTag`: 14px, 600 weight".
  - D1's own rule says 12px is "for uppercase labels only, never sentences". "Example" is an honesty label in sentence case, so 12px breaks both rules.
- **Also:** D1's segmented control has a 6px inner radius, which is off-scale. Use 4px (`rounded-xs`) inside the 8px track.
- **I accept D1's square (0 radius) bar segments.** "No radius" is always allowed, and square = data matches my swatch rule.
- **Would change my mind:** nothing short of the owner relaxing the 14px honesty floor.

### V7–V8. The tools switcher: segmented vs tabs, and what happens with JS off

- **Options:**
  - **(a)** my underline tabs;
  - **(b)** D1's segmented control (48px track, 40px segments, ink selected);
  - **(c)** D2's tabs that become a segmented control on phones.
- **Position: (b) at all widths, fixed to 44px segments.**
  - Track 52px, 4px inset, 8px radius; segments 44px tall, 4px radius, 14/600.
  - Selected: ink fill, white text, plus a forced-colours outline.
  - Built on Base UI Tabs, so the semantics are a `tablist`.
- **Why I concede:**
  - With the hero static, this is the only tabs instance, and it has two options. A 2-way switch reads naturally as a segmented control.
  - It makes "selected = ink fill" one language across chips and segments. My own QA B14 asked for that, and my underline tabs actually broke it.
  - D2's (c) would give the same control two looks by width. That's a consistency regression.
  - **D1's 40px segments break D1's own P7 (44px)**, hence the fix.
- **Fit at 320** (measured):
  - Each segment has 140px, or about 124px after 8px padding.
  - "Tax on your profit" (116px) fits with 8px to spare. "If markets move" (105px) fits.
  - **D1's "Markets and the rupee" (150px) does not fit.**
  - Rule: labels ≤ 120px at 14/600. Segments may wrap to two lines (`min-h-11`, never a fixed height, never truncated) as the 200%-zoom and text-spacing fallback.
- **JS off:** I **adopt D2's behaviour.** Both panels render stacked, each under its visible h3, and the tablist is hidden. Mechanism (missing from D2):
  - Base UI renders inactive panels with `hidden`.
  - A `<noscript><style>[data-tools-panel][hidden]{display:block}[data-tools-tablist]{display:none}</style></noscript>` in the section reveals them.
  - That needs no hydration flag and causes no CLS for JS users.
- **Would change my mind:** a usability test showing people miss tab 2. Then go to D2's fallback: stacked tools with a sticky in-section switcher.

### V9. Band position: 4th (D2) vs after the tools (D1, audit, me)

- **Position: support D2. The band goes 4th, after How it works, before the tools.**
- **Why:**
  - **Research:** four of the five tracks put impersonation fear first for Indian retail.
  - **Continuity:** step 4 ends with "to a bank account in your name", and the band opens with "Withdrawals go only to you".
  - **The run at the end:** tools → FAQ → form becomes one run (D2's "estimate → remaining questions → ask").
  - **It costs the system nothing.** Tones re-sequence as white · alt · white · **ink** · alt · white · alt · white, alternation holds, and the band is never next to the footer.
- **Knock-on edits:**
  - the nav order follows the page order (D2's list already does);
  - the hero's "Before you start" links now jump about 2 screens rather than 4.
- **Would change my mind:** D1 shows, in a re-measured sketch, that a 1,100px dark block at about 40% makes the first half of the page feel heavy on phones. Then use D2's own fallback, the band 5th (directly after the tools, never after the FAQ).

### V10–V11. The facts strip, and "You can lose money"

- **Options:**
  - **(a)** a separate compact section (audit, me);
  - **(b)** D1's hero facts row with product facts (who it's for, money in, price, money out);
  - **(c)** D2's "Before you start" row with trust facts (registration + limit, withdrawals only to you, never OTP, you can lose money), each linking to its proof.
- **Position:** no separate section (I concede (a)). **Content: D2's cells. Visual: D1's** (2px ink rule, 16/600 first sentence, 14 or 16/400 second sentence).
- **Why:**
  - D1's four facts restate the lede ("residents of India", "rupees", "once a day") and the basket's facts list.
  - D2's four answer the three doubts a sceptic has in the first 10 seconds (registered? can someone take my money? can I lose?), and they're summaries with links to proof (`progressive-disclosure`), not duplicates.
- **"You can lose money" (V11):**
  - I support it as a **same-component, same-weight cell**: no red, no warning icon, no different box. Equal weight is the point (R8).
  - It reverses round 16 for one line, so it's the owner's call (D2 Q3). If the answer is no, the row has three cells and the layout reflows to 3 columns (L5 already handles 3).
- **Registration cell without a number:**
  - My `Fact` type required `number` + `verifyHref` for any "status" fact, which would block the cell today.
  - **I relax it:** a status fact renders as a plain sentence **only with its limit in the same component** (`limit` becomes a required field). Number and link appear automatically when `FIU_REG_NO` and a lookup URL exist.
  - This is still an owner exception to R6 (D1 Q2, D2 Q9, my Q2: three of us asked the same thing; the merge will ask it once).
- **Would change my mind:** the owner prefers D1's product facts. They then move to the basket's facts list, which D2 keeps anyway, so nothing is lost.

### V12–V13. CTA label and header weight

- **All three of us want one label everywhere.** D1 breaks it in one place: at 390, "the button shortens if needed (today's trick)". That trick goes.
- **Fit at 320** (288px of content):

| Header option | Logo | Label | Button width | Menu + gaps | Total | Fits? |
|---|---|---|---|---|---|---|
| "Ask a CA" | 102 (40px tall) | 57 | 89 | 60 | 251 | yes |
| "Ask a question" | 102 | 97 | 129 | 60 | 291 | **no** |
| "Ask a question" | 82 (32px tall) | 97 | 129 | 60 | 271 | yes, with 14px label and 16px padding only |

- **Position:**
  - Use whichever label is *true* (D2's Q4: do CAs read the questions?).
  - If both are true, "Ask a CA": it's specific, it fits, and it's R12's "next action".
  - Either way the header uses `md` = 44px with a **14/600** label (I concede D1's header size) and a 32px logo below 360px.
- **Header weight (V13): I concede primary.**
  - Both D1 and D2 make the header CTA the persistent primary. On phones it's the only CTA visible in most views.
  - My objection (two ink buttons in the hero's first view) is weaker than I thought: it's the same action, so `primary-action` ("one primary action per screen") holds.
  - QA B7 is reworded: "one primary *action* per screen; the same action may appear twice (header + section)."
- **Would change my mind:** a sketch showing the two identical ink buttons competing at 390. Then the hero's primary becomes D2's text link and the header keeps the button.

### V14. What-if default: "All three fall" (D2) vs zero

- **Position: support D2.** R5 allows a loss or zero. A zero default ("₹1,00,000 → ₹1,00,000") teaches nothing, and the loss shows the downside first (R8).
- **Condition (a system rule, not just copy):**
  - The result panel **names the active scenario** ("If all three fall and the rupee strengthens"), so "−25.9%" can't be read as a forecast or a past return.
  - The "made-up scenarios" line sits **adjacent to the result**, not only under the chips. D1 moves it into the 18px section lede, which helps but is about 600px away on phones.
- **QA update:** reference J1 (default state) becomes ₹74,100 · −₹25,900 (−25.9%) · US −₹12,500 / gold −₹1,500 / oil −₹8,000 / rupee −₹3,900. The zero case becomes a reset check.
- **Would change my mind:** the owner finds the loss default alarming. Then use D2's fallback: zero default, with "All three fall" as the first chip.

### V15. Text greys (D1 §2.1)

- **Position: concede fully.**
  - Headings, figures and strong text: **ink** `#272A33`. That's one near-black on the page instead of my grey-900 next to ink buttons.
  - Body: **grey-700** (10.35 on white, 9.84 on grey-50).
  - Secondary: **grey-600** (7.58 / 7.20 / 6.92 on grey-100).
  - **grey-500 leaves text** and stays only as the control edge (`--input`).
- **Why:** it deletes the failure mode I was policing ("`text-faint` never on `bg-muted`", 4.34:1) instead of policing it. Every text pair is now ≥ 6.9:1. D2 independently chose grey-700 body.
- **Naming:** `--foreground` = ink, new role **`--copy`** = grey-700 (class `text-copy`; not `text-body`, which would collide with the `text-body-*` sizes in `cn()`), `--muted-foreground` = grey-600. The `faint` role is deleted.
- **Band text:** D1 uses `#D4D4D6` (white 80%) for body and grey-300 for labels. **Those two values are 9.68 vs 9.65:1, so they're visually the same.** One token is enough: `--copy` in `.theme-ink` = `color-mix(in srgb, white 80%, var(--p-ink))`, used for labels too (labels differ by size and case, not colour). D2 asked for 85%; D1's 80% wins as the visual call (both pass AAA).

### V16. The money-path diagram (D1 §6.4.2)

- **Options:**
  - **(a)** ship it as drawn, under the steps;
  - **(b)** drop it;
  - **(c)** defer it until custody is confirmed;
  - **(d)** merge it with the steps.
- **Position: (c).** Ship the steps alone now (D2's four, each carrying its limit at body size), and put D1's insight in the lede: "Your money starts and ends in a bank account in your name."
- **Why:**
  - **Duplication:** the path repeats steps 2–4 directly above it (D1 says so), so it's two depictions in one section (P4).
  - **Length:** it makes How it works the **longest section on phones** (1,471px measured).
  - **The research's case for a money chain** (`us-investing-competitors.md` rec. 1) was about naming *who holds the money*. That's exactly the node that can't be drawn yet. Without it, the path's unique content is the loop, and one sentence carries that.
  - **Cost:** it's a new component (horizontal and vertical variants, connector labels at an off-scale 13px, an `ol` with arrows `aria-hidden`), built for content that's redundant today.
- **D1's design is good, and it isn't wasted:** `MoneyPath` goes into the merged spec as a **specified, not built** component. It's added with its custody node the day custody is confirmed, probably in the band rather than How it works.
- **Would change my mind:** D1 merges rather than duplicates. The path *replaces* the step visual while D2's step-2 limit stays at body size, and How it works stays ≤ 750px at 1440 and ≤ 1,200px at 390.

### V17. The mobile result readout (my C9, D1 §9.4 hold, D2 §8.4 dock)

- **Options:**
  - **(a)** mine: sticky to the *top* (under the header) inside the tool's box, always on below 1024, CSS only;
  - **(b)** D2: a 64px dock sticky to the *bottom* of the tool's box, shown only while a control has focus or is dragged and the result card is off-screen;
  - **(c)** none.
- **Position: (a), at 56px** (D1's ceiling). I adopt D2's "inside the tool's own box, never the viewport".
- **Why:**
  - **Ergonomics:** when you drag a slider with your thumb, your hand covers the lower part of the screen. A bottom dock sits under the hand, a top line doesn't. *(This is my inference; it should be checked on a phone in QA.)*
  - **Simplicity:** (a) is pure CSS `position: sticky`. (b) needs JS to watch focus, drag and intersection, and showing or hiding mid-gesture adds motion and a flicker risk.
  - **Focus not obscured:** handled by `scroll-margin-top` on the tool's controls (header 64 + readout 56 + 16).
- **Would change my mind:** on a real 390×844 Android test, the 120px of header + readout feels cramped, or people don't notice it. Then (b).

### V18. Gain and loss bar colour (D1 §2.3, D1 Q8)

- **Position:** hold single ink. The bar's side of the centre line shows the sign, and the text carries the value.
- **Why:**
  - Proposal §4: "Red, yellow, green: form errors only. Not used for risk or performance."
  - Green on gains frames up-moves as good, the one-directional framing R2/R8 fight.
  - Green fails on white (2.54:1), so it would be a fill-only decorative signal anyway.
- **The same logic applies to D1's withdraw crop:** a green check disc and a red cross disc. Use ink icons with words, "Allowed" / "Not allowed" (D2's copy). D1's sketch has a check with no word, which fails "colour/icon not the only signal".
- **Would change my mind:** the owner answers D1 Q8 with "green and red are fine". Then green and red as fills only, always beside a signed figure, and never in a mock.

### V19. "How to spot a fake"

- **Options:**
  - D1's two-column hairline table;
  - D2's three light message cards with a warning icon and "Not from Paraa";
  - my StatePair ("From Paraa" vs "Not from Paraa" mocks).
- **Position: D1's table with D2's three scam lines and responses. I drop StatePair.**
- **Why:**
  - **My StatePair needed a "From Paraa" example message, which would invent what official Paraa messages look like.** That's an unconfirmed fact.
  - D2's three cards are three more mock objects in a band that already has the withdraw crop, which repeats the "cards" look we're removing.
  - The table reuses the hairline row, works as a real `<table>` (or a `dl` on phones with D1's "Not Paraa." lead-in), and measured 1,100px for the whole band.
- **D2's 1930 / cybercrime.gov.in sentence** sits under the table (compliance gate as D2 says). The phone number is a `tel:` link and the portal is an external link (new tab, icon, sr text), both 44px targets.

### V20–V21. Focus ring, type sizes and breakpoints

- **V20, concede 3px.** D1 and D2 both cite the Accessible & Ethical style ("3–4px focus"). It costs nothing and it's more visible on low-DPI screens in sunlight. 3px solid `--ring`, 2px offset; inset (−3px) inside clipping containers.
- **V21, concede D1's scale and breakpoints:**
  - display 34 / 40 / 48;
  - section 28 / 32 / 40;
  - figure 32 / 40 / 40;
  - title (h3) 20/28 at every width: my 24px heading step is **dropped**;
  - question 18/26;
  - lede 18/28, body 16/26, small 14/22, label 12/16 caps.
  - Breakpoints **640 / 1024 only**; my 768 step is dropped. Section padding 64 / 80 / 96.
  - That's 7 sizes at 1440, the same count with fewer jobs.
- **Two exceptions I hold:**
  - D1's 17/24 question size at 390 adds an eighth size; use 18/26 everywhere. It fits.
  - D1's 13px connector labels are moot (V16).

### V22–V24. Header height, legal and FAQ sizes, chip semantics

- **V22, 64px at every width** (D1 and I agree; D2 has 72 on desktop). One token, more content in view. `scroll-padding-top` = 64 + 16 = 80, from the token, not D2's hard-coded 88.
- **V23, legal 14/22 grey-600, FAQ answers 16/26 grey-700.**
  - D2's 16px legal would roughly double the footer's length for text that already passes at 7.58:1 (research A11's floor is 14px).
  - D2's 18px answers would make an answer the same size as a lede.
  - Both break "one size per job".
  - **I do concede D1 and D2's point that the "Your CA may be paid by us" limit sits at 16px:** a limit takes the size of the claim it qualifies (D2 rule 7). My `Disclosure inline` now inherits its size from context instead of fixing it at 14.
- **V24, radios for amount and slab chips** (exactly one is always chosen). Scenario chips are a radio group that can have none checked.
  - D2's `aria-pressed` toggle buttons announce "toggle button, pressed", which wrongly implies you can un-press to reach a neutral state.
  - **I don't adopt D2's check icon** in chips. It shifts the label width when selected. Ink fill against white is a 14:1 luminance change, which isn't "colour alone", and forced-colours mode gets an outline.

---

## 3. Gaps, inconsistencies and things that break the system

### D1

| # | Issue | Fix for the merge |
|---|---|---|
| D1-1 | The 390 sketch header has **no menu button**, and the text plans a width-dependent label ("shortens if needed") | Logo · CTA · menu at every width below 1024; one label (V12) |
| D1-2 | Segmented control segments are 40px, against D1's own 44px rule (P7); inner radius 6px is off-scale | 44px segments, 4px inner radius (V7) |
| D1-3 | Tag at 12/600 breaks the 14px honesty floor and D1's own "12px only for uppercase labels" | 14/600 (V6) |
| D1-4 | The panel shows % and a bar, which conflicts with round-11 "no percentages or charts in mocks" | Rows only until the owner rules (V4) |
| D1-5 | Withdraw crop: "Name matches yours ✓" has no word; green and red discs | "Allowed" / "Not allowed" + ink icons (V18) |
| D1-6 | Error state "2px error edge" shifts the text by 1px inside the field | Keep the 1px border and add `ring-1 ring-inset ring-error` (no shift). I add ring utilities to my shadow allowlist for this only |
| D1-7 | "No new hex values", but it adds `#D4D4D6` and `#4A4C54` | Fine as **derived tokens** (`color-mix` of primitives), declared once in `.theme-ink`; and collapse the body/label pair (V15) |
| D1-8 | Primary hover `#3D4049` is the code's derived `ink-2`, not the design file's ramp, and ink → `#3D4049` differs by only about 1.2:1, a near-invisible hover (Groww's flaw in the research) | `#484B55` (file ink-600, white 8.70:1) |
| D1-9 | Header hairline "after 8px of scroll" needs a scroll listener | A 1px IntersectionObserver sentinel at the top of `main`, or just a permanent hairline. No scroll listener |
| D1-10 | **States not specified** for chips (hover, focus, disabled), the slider (hover, focus, active), the segmented control (focus, hover), FAQ rows (hover, focus), and every form state beyond error and success | The merged spec takes these from D3 §5 and D2 §7–8 |
| D1-11 | No JS-off or reduced-motion behaviour per component | D3 §7.6, updated with V8 |
| D1-12 | Slider track 4px `grey-200` (1.23:1) is nearly invisible in sunlight | Use `grey-300` (border-strong). The thumb and fill still carry the value |
| D1-13 | Copy drifts from D2's deck: h1 "bought in rupees" (removed by content-audit Q7), step 2 "Talk to a CA", "invest once or every month" (monthly is unconfirmed), nav labels | D2's copy deck is the source of truth in the merge; the D1 sketch is re-measured with it |

### D2

| # | Issue | Fix for the merge |
|---|---|---|
| D2-1 | Hero "inside the 1280px container" vs 1200 (D1 and D3); header 64/72 | 1200 container (1152 content); 64 header (V22) |
| D2-2 | **The tax typed amount (I9) asks for a minus sign**, but Android numeric keyboards (`inputmode="numeric"`/`"decimal"`) often have no minus, and U+2212 vs a hyphen needs parsing | Replace the sign with a **Profit / Loss** segmented choice (radio) plus a positive amount field, `inputmode="numeric"`. Grouping applied on blur. The maths gets `profit × ±1` with no lib change |
| D2-3 | "Exactly three live regions", yet I18/I19 ("Copied", 2s) and the 6s "Still sending" line also announce | One polite **form status** region carries sending, still sending and copied, so the count is still three |
| D2-4 | Copy buttons assume `navigator.clipboard`, which fails on non-secure origins and some WebViews | Fallback: select the text in a read-only input and say "Selected. Press copy." Never fail silently |
| D2-5 | Bars "resize with a 150ms **width** transition", which animates a layout property | `transform: scaleX()` with `transform-origin` at the zero line (`transform-performance`) |
| D2-6 | Selected tab: "gold is allowed here per the audit tokens", which contradicts D2's own ink nav marker | Moot for the hero (V3); segments are ink (V7) |
| D2-7 | Suggestion chips have no visual spec. If they look like ChoiceChips, they'll read as a selection; appending text can exceed `maxlength` 1000 | Style them as Button `secondary` md with a leading `Plus` icon (actions, not choices). Appending is skipped, with a helper message, if it would exceed 1000 |
| D2-8 | Basket "What you own" is a **bordered note block**, a box in a rules-not-boxes system; the facts list has icons (D1 removed icons beside facts) | A RuledItem (2px rule + h3 + body); the facts list without icons |
| D2-9 | Tools tablist "hidden with no JS": no mechanism given | The `<noscript>` style (V8) |
| D2-10 | Page target "under 9,000px at 390", but D2's content (10 FAQ items, 4 band rows with 3 cards, form chips and counter) exceeds D1's sketch, which already measured 9,766px with less | My ceiling of 11,500px at 390 stands. D1 re-measures the sketch with D2's deck before the merge |
| D2-11 | Three scripts touch the hash (anchor focus, tab `replaceState`, the `#faq-*` opener, the old-anchor map) | One `HashRouter` client island owns all of it, and it's added to the client allowlist |
| D2-12 | `tabindex="-1"` on every section h2 for focus after an anchor jump | OK. The h2 shows the focus ring only on `:focus-visible`, with `outline-offset: 4px`. Programmatic focus uses `preventScroll` (D2 has this) |
| D2-13 | "Before you start" cells are whole-cell links, so their accessible names are 2 sentences | Acceptable. The cell is one `<a>`, and the underline goes on the bold sentence on hover and focus. Check that 4 cells at 360px still end above the fold (D2 flagged this itself) |
| D2-14 | The FAQ grows to 10 items, so its open/close rows dominate the mobile page | No system change, but the band + FAQ + form height should be watched in the re-measure (D2-10) |

---

## 4. Concessions: what changes in `d3-system.md`

| # | My draft said | It now says | Because |
|---|---|---|---|
| 1 | Gold never marks state (C1) | Gold may be the **slider thumb, with a 2px ink ring**. The nav marker, focus, tabs and chips stay ink or white. Budget = ≤ 3 gold **uses** per screen | D1's ring meets 1.4.11 |
| 2 | One Tabs for the hero and the tools (C7) | Hero panel is a **still screen**, a Server Component; Tabs only in the tools | Repetition, zero JS, owner's "static" |
| 3 | Underline tabs, no indicator | **Segmented** look on Base UI Tabs: 52px track, 44px segments, ink selected, wrap rather than truncate | One selected language with the chips |
| 4 | Tools with JS off: tool 1 + a note | **Both panels stacked** via a `<noscript>` style | D2 §8.3 |
| 5 | Reveal on two lists (C14) | **No reveals**; delete `reveal.tsx`, `reveal-controller.tsx` and the CSS | D1, the research, simplicity |
| 6 | Facts strip as its own compact section | **A hero foot row** (`RuledItem` ×3–4); the alternation exception goes away | D1 + D2 |
| 7 | `Fact` status needs number + link to render | Renders as a plain sentence **with a required `limit`**; number and link appear when set | Owner round 10; owner exception to R6 |
| 8 | Header CTA secondary | **Primary**, 44px, 14/600; "one primary *action* per screen" | D1 + D2; persistent conversion |
| 9 | foreground grey-900, body grey-600, faint grey-500 | foreground **ink**, `copy` **grey-700**, muted **grey-600**; grey-500 only for control edges; `faint` deleted; band copy = one derived token | D1 §2.1 |
| 10 | Focus ring 2px | **3px**, 2px offset | Accessible & Ethical |
| 11 | Type 36/44/48 · 30/36/40 · 20→24 h3; 768 step | **D1's scale**; breakpoints **640 / 1024**; padding 64/80/96; h3 20/28 at all widths | D1 §3, §4 |
| 12 | Hero L3 5/7 | **6/6** with a 48px gap for the hero; 5/7 for the band and Ask | D1 measured it |
| 13 | StatePair for "spot a fake" | **D1's table** with D2's copy; StatePair deleted | It invented an official message |
| 14 | `Disclosure inline` fixed at 14px | **Inherits the size of the claim** it qualifies | D1 + D2 (R8) |
| 15 | Form: focus the first invalid field; "Ask another" → name | **Error summary for ≥ 2 errors**; blur validation for non-empty fields; arrival focus on the `#ask` h2; "Ask another question" keeps the contact fields and focuses the question; live debounce 400ms | D2 §7 (`error-summary`, WCAG 3.3.7) |
| 16 | What-if default zero (QA J1) | **"All three fall"**, with the scenario named in the result; J1 = ₹74,100 | D2 P9 |
| 17 | Band 6th | **4th** | D2 P2 |
| 18 | FAQ chevron, sticky heading on tall screens | **Plus/minus; not sticky** | D1 §9.6 |
| 19 | AllocationBar `rounded-xs` | **Square segments** (0 radius) with 2–4px gaps | D1 |
| 20 | Card padding 24/32 | **20 / 32 / 32** (390 / 768 / 1440) | D1 §4.2 |

**Positions I keep:** ink nav marker and white band ring (V2); no % bar in the panel until the owner rules (V4); 14px tags (V6); one CTA label, no width swap (V12); steps only, with the path deferred (V16); top-sticky mobile readout (V17); single-colour bars and neutral status icons (V18); 64px header, 14px legal, 16px answers (V22–V23); radio chips (V24); `#484B55` hover (D1-8).

---

## 5. What I need for the merge

**From the owner** (one consolidated list; duplicates across our three drafts are merged):

1. **Allocation % / bar inside the example panel** (round-11 rule) (V4).
2. **"You can lose money"** in the hero row and the FAQ: a round-16 reversal (V11; D2 Q3).
3. **Who reads the questions**, which decides "Ask a CA" vs "Ask a question" (V12; D2 Q4).
4. **FIU-IND as a plain sentence without a number:** the R6 exception, plus the number and lookup URL when available (D1 Q2, D2 Q9, D3 Q2).
5. **Green and red for gains and losses**, and for status icons in mocks (V18; D1 Q8).
6. **A logo lock-up with an ink wordmark, ideally SVG.** The gold PNG's "CAPITAL" is 1.6:1 on white (D1 Q1, D3 Q1).
7. The **1930 / cybercrime.gov.in** line (D2 Q5).
8. **The webhook in production** and the **privacy notice** (D2 Q2, Q8; D3 Q8): both are launch blockers for the form.
9. The **"Tokenized"** tag: drop (D2) or keep with an explanation (D1 Q4).

**From D1, before the merge:**
- re-run the sketch with D2's copy deck, the band 4th, the static panel without the bar, 14px tags, 44px segments and no money path, and **re-measure page height at 1440 and 390** against my ceilings (7,500 / 11,500);
- confirm the band copy token (80%) and the slider track colour.

**From D2, before the merge:**
- choose the tax sign control (D2-2);
- give the suggestion-chip visual sign-off (D2-7);
- confirm the one form-status live region (D2-3);
- confirm that the hero row's 4 cells fit above the fold at 360×740.

**What I'll do in the merge:**
- rewrite `d3-system.md` §3 (text roles, gold uses, ring, type, breakpoints), §5 (still panel, segmented Tabs, removed Reveal and StatePair, added HashRouter, Profit/Loss control, form states from D2 §7) and §10 (QA: J1 default, B7 wording, the no-reveal check, the noscript check, the tax sign control, the header fit at 320);
- take section order and copy from D2, and visual values from D1, with every conflict above resolved as stated or by the owner's answer.
