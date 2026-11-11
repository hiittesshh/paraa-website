# Review by D2 (UX, trust, journey) of D1 and D3

**Reviewer:** Designer 2. **Date:** 10 Nov 2026. **Read in full:** `d1-visual.md` (617 lines), the D1 sketches (`img/d1-sketch-1440-first-view`, `-390-first-view`, `-1440-security-band`, `-1440-how-it-works`), and `d3-system.md` (1,346 lines). I re-checked my own `d2-ux.md` against both.

**How I judged:** for each point I asked what the first-time sceptical visitor (mid-range Android, scam-wary, never heard of us) sees, understands and can do. Evidence comes from the five research files. Guideline IDs are from `ui-ux-pro-max`. Where my own draft was weaker, I say so and change it (§4).

---

## 1. Where we agree

All three drafts already share most of the page:
- **Hero:** light page, one ink band, static hero with an HTML example panel. No phone field in the hero, no scenery, no pin, no loops.
- **Structure:** hairlines and rules instead of card grids; no pills; 8/12/16 corners; one shadow (the hero panel); Manrope 400/600; the 48px cap; tabular figures; Indian grouping; U+2212 minus.
- **Primary action:** ink, never gold. Gold never a button, background, heading or text on light. No `Mark` highlighter.
- **Gone:** Motion, NumberFlow and slider springs. Thumbs track 1:1, and figures change instantly.
- **Tools:** both in one "Run the numbers" section with tabs; light result panels (no second and third dark surface); the column chart removed (D1 and D3; I'd half-removed it already).
- **Security band:** text before the example on phones; no shields, padlocks, globes or glow; header stays white over it.
- **FAQ:** native `<details>`, several can be open, first open, ids for deep links.
- **Form:** visible labels; "(optional)" on email only; error under the field with icon, text and border; focus to the success heading as an `h3`; no toast; no `disabled` submit for "not valid yet".
- **Placeholders:** no visible "TO CONFIRM" on the public page. A fact that isn't real renders nothing (D3's `FactItem` returning `null` is the right mechanism).
- **Accessibility:** WCAG 2.2 AA plus our 44px rule; `scroll-padding-top`; mobile menu closes when focus leaves it (D3, new, and right); `tall:` gate on sticky things; legal text ≥ 14px.

D3's code findings are real UX bugs, and I adopt them:
- **S5:** the form fails silently without JS.
- **S4:** ₹ arrives late because only the latin font subset is preloaded.
- **S2:** `colorScheme: "dark"` on a light page.
- **S3:** the focus ring changes the shape of whatever is focused.
- **S7:** an invisible link hit-strip makes taps land on the wrong target.

---

## 2. Conflicts: options, my position, reasons, what would change my mind

Status key: **Hold** = I keep my position · **Concede** = I adopt theirs · **Merge** = a combination.

### 2.1 Hero panel: one still screen (D1) vs three tabbed flows (D2) vs shared Tabs (D3)

- **Options:**
  - (a) one static screen (D1);
  - (b) 3 tabs: Add money / Invest / Withdraw (D2);
  - (c) D3's underline Tabs serving the hero and the tools.
- **Position: Concede to (a).**
- **Why:**
  - **D1's single screen already shows all three of my flows at a glance.** Its rows are "Add money: UPI or bank transfer", "Price: Updated once a day" and "Withdraw to: Bank account ••4821, in your name". My tabs made the visitor click to see what D1 shows without a click.
  - **D1's point is right:** a fake UI that responds to clicks invites people to treat it as the app.
  - **(a) is lighter:** no client island (D3 §8), no hidden content without JS, no CLS risk from a fixed panel height.
  - **It's the literal reading** of the owner's "static hero".
  - **The money path in How it works covers the flow in order**, which is what my tabs were really for.
- **One condition (Merge):** the composition bar in the panel must read **"Example mix"**, not just sit inside the frame. The app's own demo data shows a different mix (`content-audit` Q4: US stocks, oil and some crypto, no gold). Someone who later opens the app and sees a different split will remember the site showed 50/30/20. The frame's Example tag covers a crop, but the label on the bar covers a reader. The proposal banned "the asset split" in mocks for this reason. I'd accept the bar only with that label, and drop it from the panel if the owner can't confirm the mix is close.
- **D3's Tabs** then serve the tools only, which still justifies one component.
- **What would change my mind:** none needed. If testing showed visitors didn't link the panel to the flows, the money path is the fix, not tabs.

### 2.2 Facts row: what goes in it, and where

- **Options:**
  - D1: four product facts (Who it's for / Money in / Price / Money out), plus the registration line separately under the CTAs.
  - D2: four trust facts (Registration / Withdrawals only to you / Never OTP / You can lose money).
  - D3: a compact section of 2–4 `FactItem`s that renders only when complete.
- **Position: Merge.**
  1. **Registration line:** D1's placement under the CTAs, as D3's `Disclosure variant="lead"`. That's in the first view at 390 as well as 1440 (D1's sketch proves it). It **leaves my row**, so it isn't said twice in one screen.
  2. **The row:** D1's form (2px rule, label, one line) and D3's markup (a section with an sr-only h2). The content becomes:

| Label | Text |
|---|---|
| MONEY IN | Rupees, by UPI or bank transfer. We verify every payment. |
| MONEY OUT | In rupees, only to a bank account in your name. |
| OTP AND PIN | We never ask for them, by call or message. |
| RISK | You can lose money. You hold units of the basket, not the shares, gold or oil. |

- **Why:**
  - D1's "Who it's for: Residents of India" and "Price: once a day" repeat the lede 200px above them (`content-priority`). Those two slots are better spent on a scam fact and the downside, which nothing else in the first view says.
  - D1's Money in and Money out are better than my "Withdrawals go only to you": they answer both halves of "how do I put money in and get it out?".
  - My OTP cell stays, because impersonation is the fear four of five research tracks named.
  - The RISK cell remains my Position P6 (owner decision; §2.13).
- **What would change my mind:** the owner refusing the risk line. Then the fourth cell becomes D1's "PRICE: One price per unit, once a day", and "all three can fall at the same time" stays in the basket lede.

### 2.3 Phone first view: proof before the panel (D2 P5) vs panel after the text (D1)

- **Position: Concede to D1's order:** text → registration line → panel → facts row.
- **Why:** my P5 was about getting the registration and its limit into the first 844px. D1's sketch does that with the lead line, and it also shows the top of the product (`content-priority` met both ways). The facts row moving below the panel costs the RISK cell about 600px. The basket lede repeats "all three can fall", so the downside still comes before any tool.

### 2.4 Scroll reveals: none (D1) vs Basket and steps only (D3) vs once on section bodies (D2)

- **Position: Concede to D1: no reveals.**
- **Why:**
  - My draft only allowed a reveal that couldn't hide content. That's a weak reason to keep something with no job.
  - Both institutional references measured **0** reveals, and Vested's 29–61 fade-ups are listed as a generated-site tell (`excessive-motion`, `motion-meaning`).
  - Removing it deletes `reveal.tsx` and `reveal-controller.tsx`, a client component, which helps D3's 140 KB budget.
  - D3 already said it would accept "no reveals at all" (C14).

### 2.5 Security band order and content

The drafts differ less than it seemed. All three put **registration last**: my row D, D1's row 3, and D3 via `security.md` rec. 4. The real differences are below.

**(a) Spot-a-fake format: D1's two-column table vs my three message cards vs D3's StatePair ("From Paraa / Not from Paraa" mock frames).**
- **Position: Concede to D1's table.**
- **Why:**
  - It's text first. It reads well to a screen reader as a table, stacks on phones with "Not Paraa." lead-ins, and adds no more fake UI to a band whose job is telling real from fake.
  - **D3's StatePair has a trust problem:** a "From Paraa" mock implies we know what a genuine Paraa message looks like, by channel and wording. That isn't confirmed (no official channels: D3's own Q6). Drop StatePair.

**(b) D1's table copy needs two fixes** (§3, D1-3).

**(c) Registration row.**
- **Options:** my two equal columns ("What it means / What it doesn't mean"), or D1's single sentence.
- **Position: Merge.** Give it an **h3 "Registered with FIU-IND"**, so the anchor and heading navigation find it, followed by D1's sentence and one line of meaning: "That means we must verify customers, keep records and report suspicious transactions. It isn't approval of this investment, and no authority recommends it."
- **Why:** D1's sentence puts the limit in the same sentence, which is already equal weight, so my columns were more structure than the content needs. But without a heading the row reads as fine print at the bottom of the band.

**(d) The 1930 / cybercrime.gov.in line.** Not in D1 or D3. **Hold**, pending compliance (my P8). It's the only place a scam-wary visitor is told where to go when we can't publish a support contact.

**(e) The KYC row.** I drop my "We check who you are" row. KYC is in step 1, and D1's "We check every payment you add" is tighter.

### 2.6 Band position: 4th (D2) vs after the tools (D1, D3 and the audit)

- **Position: Concede: the band goes 5th, after Run the numbers.**
- **Why:**
  - My main argument was that a doubter won't use calculators before trusting us. The merged hero now serves that visitor directly: registration line, OTP cell, and a secondary CTA that jumps to the band (§2.12).
  - In my order, How it works step 4, D1's money path end node and the band's first row would say "a bank account in your name" three times in a row.
  - Surfaces alternate cleanly either way, so D1's rhythm doesn't decide it.
  - No research tests this order. It was my judgement, and two colleagues and the audit judge otherwise.
- **Condition:** the hero's secondary CTA must link to `#security` (not to the basket, which is one scroll away anyway).
- **What would change my mind back:** session data showing visitors leave before reaching the band, or test feedback that the tools feel "salesy" before any safety content.

### 2.7 D1's money-path diagram

- **Position: Keep it**, with five changes. It's the best comprehension device in either draft. It makes the confusing rule visible: money you add can only come back via units, maturity and redeem, never straight back from the wallet.
  1. **Make it a semantic `<ol>`** whose items read as sentences in order ("Your bank account → UPI or bank transfer, we verify it → Paraa wallet → …"), not boxes with decorative arrows (`1.3.1`, `1.3.2`).
  2. **Add the limit under the path at body size:** "There's no shortcut back. Money you add has to be invested, mature and be redeemed before you can withdraw it." (Confirmed: `RebrandWithdrawScreen.tsx:424`.) That puts the limit next to the claim instead of deep in the FAQ.
  3. **Keep the asymmetry:** the start node "Your bank account" and the end node "Your bank account, in your name". The source account isn't confirmed. That's why D1's lede must change (§3, D1-2).
  4. **Don't run the steps and the path at full length on phones.** D1 measured 1,471px, the longest section on mobile. On phones, step bodies shorten to their titles plus one line (D1's own suggestion), and the vertical path carries the detail.
  5. **Steps 2–3 change** as in §3, D1-4: no "Talk to a CA" step and no "every month".
- **Custody node:** D1 is right that it's absent until confirmed, and it doesn't look evasive. The path names only places the visitor sees in the app.

### 2.8 Gold: thumb and nav marker (D1) vs never for state (D3)

- **Position: With D3: no gold for state.** Nav marker and slider thumb are ink (thumb: white fill, 2px ink border).
- **Why:**
  - **A UX reason beyond contrast:** D1 itself sets gold to mean "the gold sleeve" (bar segment, legend, calculator swatches). A gold thumb on the *US stocks* and *Crude oil* sliders breaks that mapping on the one screen where it matters most. A visitor matching colours to sleeves would read the thumb as "gold". That's `color-semantic`.
  - A 2px gold underline at 1.64:1 is the faintest thing in the header, and it's the state indicator. Ink is unambiguous in sunlight.
  - Four gold thumbs break D3's ≤ 3 budget.
- **Gold focus ring inside the band (D1) vs white (D3):** no UX stake. Both pass (8.72 vs 14.33). I'd take white so "focus = ring role" is one rule.
- **What would change my mind:** none for the thumb. For the nav marker, only if D1 keeps the ink text change and the gold underline is purely brand garnish. Even then I'd rather not.

### 2.9 Mobile result readout: D3 sticky top line vs my bottom dock

- **Position: Concede to D3.**
- **Why:**
  - When you drag a horizontal slider with your thumb, your hand covers the area **below** the slider. A readout above, under the header, stays visible. Mine sat where the hand is.
  - Mine also appeared and disappeared with focus, which is a visual change with no new information. D3's is steady while the tool is on screen and scrolls away with it.
- **Conditions (D3 has most):**
  - ≤ 56px;
  - sticky inside the tool's own container;
  - `tall:` gated;
  - `scroll-margin-top` on the controls;
  - shows value **and** signed change;
  - no live region of its own (the debounced one stays the only announcer).
- D1's "≤ 56px" matches.

### 2.10 Must the form work without JavaScript? (D3 C13 / Q3)

- **Options:** (a) a `<noscript>` notice only; (b) a Server Action with `useActionState` that reuses `validateRequest` and the webhook forwarder, while the JSON route stays for the JS path.
- **Position: (b) should ship; (a) is the floor.**
- **The stronger reason isn't JS-off, it's before hydration.** On slow 3G on a cheap Android, a visitor can fill the form and tap Send before the bundle runs. Today that reloads the page, loses everything typed and says nothing (D3 S5). That's far likelier for our audience than JS being disabled. A Server Action form is progressively enhanced, so it submits before hydration.
- **Conditions:**
  - Business logic unchanged: the same validation and the same webhook.
  - The no-JS path must render **the same states**: inline errors, the reference on success, and the distinct 503 copy (§2.11).
- **Owner point:** decision 4 says keep the API. Strictly, this adds a second entry to the same logic, so the owner should OK it (D3 Q3).
- **What would change my mind:** if the build shows the action path costs more than about 5 KB or duplicates validation code, ship (a) and render the submit as "Loading…" (`aria-disabled`) until hydration, so it never looks ready while dead (D3 H2).

### 2.11 Form behaviour details (D3 §5.12 vs D2 §7)

| Point | D3 | D2 | Position |
|---|---|---|---|
| Error summary for 2+ errors | none; focus first invalid | summary + focus | **Concede.** Five fields; `focus-management` allows "without a summary". Less UI, same outcome |
| When blur validation starts | only after the first failed submit | on blur if the field has a value, from the start | **Hold.** `inline-validation` says validate on blur. Typing "98765" and moving on should say so then, not after Send. Empty fields still aren't flagged on blur, so nothing turns red from tabbing |
| Fields while sending | editable | `readonly` | **Hold (minor).** An edit made while sending isn't sent, yet the success view implies it was. Readonly keeps the text readable and selectable |
| 503 not configured | same failure alert as 502 (H6) | own copy, no "try again", Copy my question | **Hold.** A retry instruction that can't work is false (`error-clarity`). One Alert component with a variant satisfies D3's one-component rule |
| Privacy line under submit | D3: yes, link when the page exists; D1: "designed but left out" | "Your details go to Paraa Capital's team so we can contact you about this question." | **Hold.** It states what the form does today, not a policy. That makes it a fact, not an empty slot. D1's omission leaves a phone-number field with nothing beside it (audit T3) |
| Suggestion chips | absent | four question chips | **Hold.** They turn the unpublished facts (fees, custody, maturity) into an action. That's how the page stays honest without empty sections. Ask D3 to add `QuestionChips` (buttons that insert text, not radios) |
| Spinner while sending | `animate-spin`, `motion-safe` | label only | Concede; harmless |

### 2.12 CTA labels and the header

- **Primary label:** D1 "Ask a question"; D2 and D3 "Ask a CA".
  - **Position: Hold "Ask a CA"**, with D3 (C12).
  - **Why:** the CA is the differentiator, and the owner kept "the CA question form" (decision 4).
  - **What would change my mind:** D1's label is the honest fallback if the owner can't confirm who reads questions (`content-audit` Q2). Then "Ask a question" is used everywhere, in one pass.
- **D1's nav "Questions" beside the button "Ask a question"** puts two "question" targets with different destinations side by side. The nav label should be "FAQ" (my label).
- **Header CTA style:** D1 primary (ink fill), D3 secondary (outline). **With D3.** D1's own first-view sketch shows two identical ink "Ask a question" buttons 400px apart (`primary-action`: one primary per view). The outlined header button stays visible all page long, so nothing is lost.
- **Hero secondary CTA:** D1 "See what's in the basket" vs mine "How we protect your account" → `#security`. **Hold.** The basket is one swipe away. The band, after my concession in §2.6, is four sections away and is the next doubt.
- **Nav labels and order** (final, matching the new order): **The basket · How it works · Calculators · Security · FAQ**, with **Ask a CA** as the button. D1's "What's in it" and "Run the numbers" are fine words, but "Calculators" is what people scan for.

### 2.13 What-if default: zero (D1, D3) vs "All three fall" (D2 P9)

- **Position: Hold**, as an owner decision, with a ready fallback.
- **Why:**
  - At zero, the big figure is "₹1,00,000 → ₹1,00,000". It teaches nothing until the visitor acts, and with JS off or before hydration it's all they get (D3 §7.6 shows exactly that).
  - The loss default meets R5 and R8 and shows the tool's purpose in one look.
- **The real risk:** someone reads ₹74,100 as a forecast. The pressed "All three fall" chip and the "Made-up scenarios" line sit right above the figure, and D1's idea of moving that disclaimer into the 18px lede helps.
- **Fallback if the owner or compliance prefers zero:** zero default, "All three fall" listed first, and D1's lede disclaimer.
- **Note for D3:** QA J1 then becomes the "All three fall" values (J2).

### 2.14 Gain and loss bars: green and red (D1) vs single ink (D3)

- **Position: With D3: single colour**, direction plus signed figure.
- **Why:** on this page red already means "you did something wrong" (form errors). A made-up market loss shown in the same red reads as an error state, and the tool opens on losses. The sign and the side of the zero line already carry it (`color-not-decorative-only`).
- **What would change my mind:** user testing showing people miss losses without red.

### 2.15 Tools without JS: both panels stacked (D2) vs tab 1 plus a noscript line (D3)

- **Position: Concede to D3.**
- **Why:** stacked-then-tabbed collapses the page height on hydration, which is a large CLS hit on exactly the slow phones we care about. My worry was the tax rules (the VDA warning) being hidden. They're also in the FAQ answer "How is it taxed?", which works without JS, so no honesty text is unreachable.

### 2.16 Typed amount in the tax tool (D2) vs slider only (D3)

- **Position: Concede: drop the typed field.** Track click, arrow keys and 10k steps already meet 2.5.7. The estimate is rough by design, and the field brought five extra states (invalid, clamped, last-valid…) for little gain.

### 2.17 Chips: radios (D3) vs `aria-pressed` buttons (D2)

- **Position: Concede to D3.** Single choice is a radio group: one tab stop and arrow keys, and "none checked" after a slider move is valid.

### 2.18 Corner radii

- D1 and D3 are effectively identical (4 / 8 / 12 / 16, no pills). No UX stake.
- **The one difference with a user impact is tag text size:** D1 12/600, D3 14px. **With D3:** "Example" is an honesty label, and every honesty label is ≥ 14px.
- D1's 20px state discs in the withdraw crop are icons, not shapes. They're fine, and D3's "only circle is the thumb" rule should read "only circular *shape*".

### 2.19 Grey-500 text, and the body grey

- **Grey-500:** D1 retires it from text; D3 keeps it as `text-faint` for captions, sources and meta. **With D1.**
  - At 4.52:1 on grey-50 it scrapes AA. This page has almost no source lines (no stats).
  - D3 already bans faint for honesty lines and on `bg-muted`. A role with that many exceptions and that few jobs is a trap for the next person who uses it for a caption that matters.
  - Keep grey-500 for control edges (`--input`).
- **Body grey:** D1 grey-700 (10.35:1), D3 grey-600 (7.58:1). **With D1.** The page is mostly risk, tax and FAQ reading on phones in daylight. Both are AAA, but the extra margin is cheap. D3 deleted the grey-700 primitive, so it would come back as the body role.
- **No UX stake (D1/D3 to settle):** heading ink `#272A33` (D1) vs grey-900 `#0F172A` (D3). I only note that two near-blacks on one page (ink buttons and grey-900 text) is a consistency question.

### 2.20 Other D1 ↔ D3 differences, with my vote

| Point | D1 | D3 | Vote |
|---|---|---|---|
| h3 size at 1440 | 20 | 24 | no UX stake |
| Focus ring width | 3px | 2px | either passes 2.4.7; no stake |
| Band body text | white 80% | grey-300 role | D3 (a role, not alpha); same legibility |
| "Example" tag in DOM | inside frame | inside frame, **first in DOM** | D3: a screen reader hears "Example" before any figure |
| Facts row source lines | none | optional "Source … checked …" | D1: see §3, D3-3 |
| Mock frame proportions | wide card | ask the owner if the app is phone-only (Q9) | **D3's question matters**: if the app is phone-only, a desktop-shaped panel misrepresents it. Ask before building |

---

## 3. Things in their drafts that harm the journey, trust, clarity or accessibility

### D1

| # | Where | Problem | Fix |
|---|---|---|---|
| D1-1 | Hero h1 | Keeps "bought in rupees", which the content audit left open because the wallet debit is in USDT (Q7) | Use D2's "One basket that follows US stocks, gold and crude oil" until counsel rules |
| D1-2 | How it works lede | "Your money starts and ends in a bank account in your name" claims the **source** account is yours. Only withdrawals are confirmed to go to your own account. D1's own path diagram gets this right | "Your money comes back only to a bank account in your name." |
| D1-3 | Spot-a-fake row 2 | **Clarity bug.** The scam line is "Pay into this UPI ID to activate your basket", but real Paraa also takes money by UPI, so the visitor can't tell what's fake about it. The answer "You only add money inside the app" isn't confirmed either | Scam line: "Pay the fee into my personal UPI ID to activate your basket." Answer: "We never ask you to pay into a personal account." Add "inside the app" only if the owner confirms deposits always start there |
| D1-4 | Steps | Step 2 "Talk to a CA" isn't part of the money flow (and the app has no CA screen). Step 3 "invest once or every month": monthly plans aren't in the app (Q10) | D2's steps: Verify → Add money → Invest → Redeem and withdraw. CA as the off-ramp line after the steps |
| D1-5 | Facts row | "Who it's for" and "Price" repeat the lede 200px above | §2.2 merge |
| D1-6 | Spot-a-fake column heads | Whole sentences ("IT ISN'T PARAA. WHAT WE ACTUALLY DO") in 12px uppercase grey-300. They carry the table's meaning, and uppercase sentences are slow to read (D3's own rule: 12px caps only for 1–3 words) | 14px sentence case, or the "Not Paraa." lead-in at every width (D1 already uses it at 390) |
| D1-7 | Header | Primary CTA in the header plus the hero = two identical primaries in the first view (visible in the sketch). Nav "Questions" next to "Ask a question" | §2.12 |
| D1-8 | Hero panel | The composition bar shows a mix the app's demo contradicts | "Example mix" label on the bar, or drop it from the panel (§2.1) |
| D1-9 | Form | Privacy line left out entirely | D2's factual line (§2.11) |
| D1-10 | Money path | 13px connector labels in the sketch (D1 already notes 14/20); boxes plus arrows with no list semantics | 14/20; `<ol>` (§2.7) |
| D1-11 | Gold thumb and nav marker | Breaks D1's own gold = gold-sleeve mapping; faint state indicator | §2.8 |

### D3

| # | Where | Problem | Fix |
|---|---|---|---|
| D3-1 | StatePair "From Paraa / Not from Paraa" | A "From Paraa" mock asserts what a genuine message looks like. That's an unconfirmed fact about channels (D3's own Q6), in the band whose job is telling real from fake | D1's text table (§2.5) |
| D3-2 | H6 / Alert | 503 `not_configured` gets the generic failure alert, which implies "try again" | A variant with its own copy (§2.11) |
| D3-3 | `FactItem` source line "Source: … · checked …" | On our facts the only source would be ourselves ("Source: Paraa"). That's self-citation dressed as verification, the kind of theatre R6 exists to prevent | Allow a source line only for a third-party source with a link (a regulator register) |
| D3-4 | Hero Tabs (C7), the C9 condition and §7.6 "what-if at zero" | Superseded by the static panel; the zero default is an open owner call (§2.13) | Tabs for the tools only; the default follows the owner's ruling |
| D3-5 | `text-faint` | A role with more "never" rules than jobs | Retire it from text (§2.19) |
| D3-6 | Fields "stay editable while sending" | An edit made while sending is silently lost | `readonly` while sending |
| D3-7 | Validation only re-checks on blur **after** a failed submit | Late feedback on a phone number someone just mistyped | Blur validation on filled fields from the start (§2.11) |
| D3-8 | Missing: `QuestionChips` | The form's suggested questions need a component (buttons that insert text, not radios) | Add to the inventory |

**Nothing in either draft lacks a purpose,** with three exceptions:
- D1's two lede-repeating facts;
- D3's self-sourced fact lines;
- the composition bar appearing a third time inside the hero panel. D1 calls it the page's motif; I'd accept that only with the "Example mix" label.

---

## 4. Concessions: what I now change in D2

| # | Was (d2-ux.md) | Now |
|---|---|---|
| 1 | Hero panel: 3 tabs (Add money / Invest / Withdraw) | **D1's one static screen**, with "Example mix" on its bar. My panel tab states (§8.2) are deleted |
| 2 | Hero row: Registration / Withdrawals / OTP / Risk; registration as cell 1 | **Registration as D1's lead line under the CTAs.** Row = MONEY IN / MONEY OUT / OTP AND PIN / RISK (§2.2) |
| 3 | Phones: proof row before the panel (P5) | **D1's order:** text → registration line → panel → row |
| 4 | Reveal once on panel and section bodies | **No reveals anywhere** |
| 5 | Band 4th, before the tools (P2) | **Band 5th, after Run the numbers.** The hero secondary CTA links to `#security` |
| 6 | Spot-a-fake as three "Not from Paraa" message cards | **D1's two-column table**, with the copy fixes in D1-3 and D1-6 |
| 7 | Registration row as two columns "means / doesn't mean" | **h3 + D1's sentence + one meaning line** |
| 8 | Band row "We check who you are, and every payment" | **D1's "We check every payment you add"**; KYC stays in step 1 |
| 9 | Phone result dock at the bottom of the tool | **D3's sticky top readout** inside the tool (§2.9 conditions) |
| 10 | Error summary for 2+ errors | **Removed;** focus the first invalid field |
| 11 | Typed amount field in the tax tool | **Removed** |
| 12 | Tools with JS off: both panels stacked | **Tab 1 + a noscript line** (D3); tax rules stay reachable in the FAQ |
| 13 | Chips as `aria-pressed` buttons | **Radios** (D3 ChoiceChips) |
| 14 | Tool tab 1 "If markets move" | **D1's "Markets and the rupee"**, which names the half of the tool that R2 is about |
| 15 | Band lede | **D1's:** "What we always do, what we never ask, and how to spot someone pretending to be us." |
| 16 | How it works: steps only | **Steps + D1's money path,** with the no-shortcut limit under it; step bodies short on phones (§2.7) |
| 17 | Nav order | **The basket · How it works · Calculators · Security · FAQ** (follows the new order) |
| 18 | "Sending…" with no spinner | A `motion-safe` spinner is fine |

**Final page order (D2's view after review):** Hero (lead registration line, panel, facts row) → What you're buying → How it works (steps + money path) → Run the numbers → **Security (ink)** → FAQ → Ask a CA → Footer. This is D1's order, and D3's surface sequence fits it unchanged.

**Still held, for the merge or the owner:**
- "Ask a CA" (fallback: D1's "Ask a question");
- the RISK cell and FAQ "Can I lose money?" (P6, owner);
- the what-if default "All three fall" (P9, owner);
- distinct 503 copy and Copy my question;
- blur validation from the start; readonly while sending;
- suggestion chips; the factual privacy line;
- the 1930 line (compliance);
- no gold for state; single-colour gain and loss bars; grey-700 body and no grey-500 text (with D1);
- the steps without the CA step and without monthly plans;
- the copy fixes D1-1 to D1-3;
- the Server Action form path (with D3).
