# D2: UX, trust and the visitor's path through the homepage

**Author:** Designer 2 (UX, trust and user journey). **Date:** 10 Nov 2026. **Branch:** `feat/trust-redesign`.
**Status:** first draft for the cross-review with D1 (visual and brand) and D3 (system and QA). It covers the whole page from the UX and trust side. Where a visual or system choice changes what the visitor can do or believe, I state a position so we can argue about it.

**Inputs read:** all five research files and their key shots, `audit-2026-11-10.md`, `content-rules.md` §0.3, `content-audit.md`, `proposal.md` §5–6 (plus §8–9 for the open facts), and every component under `src/`. I checked the running site at 1440 and 390, and I posted to the live API: with no webhook configured, `/api/advisor-request` returns **503 `{"error":"not_configured"}`**, and a bad payload returns **422** with per-field messages.

**Skill used:** `ui-ux-pro-max` v2.15.0. I used its UX guidelines (`references/quick-reference.md` and `--domain ux`), the **Trust & Authority + Conversion** landing pattern and the **Accessible & Ethical** style. I rejected its fintech design-system output (Dark Mode OLED, crypto palette), as all five researchers did. I also rejected one part of the Trust & Authority pattern: its "Proof (logos, certs, stats)" step. We have none of those, so checkable facts and stated limits do that job here. Guideline IDs appear in `code`.

**How to read this:**
- **Must** means the build fails review without it.
- **Should** means the default, which the team can debate.
- **Position** marks a point I expect D1 or D3 to challenge (all collected in §10).
- Copy in this document is final draft copy. It uses only facts marked *Confirmed* in `content-audit.md` §3, or lines the owner kept on purpose. Nothing here needs a placeholder.

---

## 0. The ten-line version

1. **One job per section.** Each section answers one doubt, in the order a sceptical first-time visitor has them: *What is it? → What am I buying? → How does it work? → Is it legit, and how do I avoid being scammed? → What could happen to my money and tax? → What else? → Can I ask someone first?*
2. **The security band moves up** from 6th to 4th, before the tools. A visitor who doubts we're real won't play with a calculator.
3. **There's no separate facts strip.** Its job goes into a four-cell "Before you start" row at the foot of the hero. One cell is "You can lose money", at the same weight as the other three.
4. **The real conversion is the question form.** Every CTA says **"Ask a CA"** and leads there. The form turns the facts we can't publish yet (fees, who holds the money, maturity length) into suggested questions, never into empty sections.
5. **The hero asks for nothing.** No phone field. The first data request is in the form, beside the line that says what we do with it.
6. **The what-if tool opens on "All three fall".** The visitor sees the bad case before they touch anything.
7. **Every claim carries its limit in the same component, at the same type size.** Registration sits with "isn't approval". Withdrawals sit with "after it matures". The CA sits with "may be paid by us". The rupee is always described in both directions.
8. **Each form failure gets its own message.** In particular, the 503 "not configured" case never says "try again in a few minutes", because retrying won't help.
9. **Motion only shows a change of state.** No pins, loops or reveals that delay content. Everything works with JavaScript off, with reduced motion, by keyboard and at 320px.
10. **Placeholders:** I agree with the round-4 ban. No visible `TO CONFIRM` on the public page. A dev-only check lists the gaps instead (§11, Q1).

---

## 1. Who arrives, and what they doubt

**Primary visitor.** A resident Indian adult, probably on a mid-range Android phone. They've heard of Paraa through an advisor, a CA or a message, and they've never heard of us before. They are wary of investment scams (impersonation, OTP fraud, "guaranteed returns"). They know UPI, KYC and slab rates. They don't know what a derivative contract or a "token" is. They will give us about 10 seconds to look legitimate and about one scroll to look worth their time.

**Secondary visitor.** A CA or advisor checking us before recommending us. They read the FAQ, the footer notes and the tax wording closely, and they distrust adjectives.

### 1.1 Doubts, in the order they arise, mapped to sections

| # | The visitor's doubt, in their words | Answered by | What we can say today | The limit shown beside it |
|---|---|---|---|---|
| D1 | "What is this?" | §1 Hero, H1 and lede | One basket that follows US stocks, gold and crude oil; residents of India; add and withdraw in rupees; one price a day | "One of the baskets in the Paraa app" |
| D2 | "Is this a real, registered company?" | Hero "Before you start" row → §4 Security, row D | Registered with FIU-IND for anti-money-laundering reporting | "This isn't approval of this investment" |
| D3 | "Can I lose money?" | Hero row, cell 4 → §5 Numbers | Yes. You hold units, not the assets | "You hold units of the basket, not the shares, gold or oil" |
| D4 | "What exactly am I buying?" | §2 Basket | Units; three markets; derivative contracts; example mix | "These percentages are an example"; "all three can fall at the same time" |
| D5 | "How do I put money in and get it out?" | §3 How it works | KYC, wallet, UPI or bank transfer, verified payment, next daily price, maturity, redeem, withdraw to own account | "Money you add can't be withdrawn until it's invested, matured and redeemed" |
| D6 | "Who can take my money? How do I spot a fake?" | §4 Security band | Withdrawals only to your verified account; we never ask for OTP or PIN, or for payment to a personal account; examples of fakes | None needed: these are rules about our own behaviour |
| D7 | "What could happen to ₹1 lakh?" | §5 Numbers, "If markets move" | Made-up scenarios on an example mix, loss first | "Not a forecast, and not the basket's past returns"; "before fees and tax"; rupee in both directions |
| D8 | "What tax would I pay?" | §5 Numbers, "Tax on your profit" | Two hedged rules and an estimate | "Depends on how this income is classified"; the VDA alternative; "A CA can confirm your own tax" |
| D9 | "What about [my specific thing]?" | §6 FAQ | Only questions with confirmed answers | Each answer carries its own limit |
| D10 | "Can I ask a real person before I commit?" | §7 Ask a CA | You don't need an account; we contact you about it | "Your CA may be paid by us" |
| D11 | "Who's legally responsible?" | Footer | Risk note, FIU note, ASCI line, © Paraa Capital | Legal entity, grievance officer and legal pages come later (launch blockers) |

### 1.2 Doubts we can't answer yet, and where they go instead

These are the visitor's biggest questions. The owner's rule keeps them off the page until confirmed, with no empty sections. The page still mustn't feel evasive, so each one is turned into an **action**, not a gap. Each becomes a suggested question in the form (§7), and none appears as a heading, row or "coming soon".

| Unanswered doubt | Why it's off the page | Where the visitor can take it today |
|---|---|---|
| "What are the fees?" | Fees unconfirmed (`content-audit` Q11) | Form suggestion: *What are the fees on ₹1 lakh?* |
| "Who holds my money? What if Paraa shuts down?" | Custody unconfirmed (Q12) | Form suggestion: *Who holds my money?* |
| "How long until it matures? Can I exit early?" | Length unconfirmed (Q9) | Form suggestion: *When would my investment mature, and can I exit early?* |
| "Where do I download the app?" | Store links unconfirmed (Q16) | Step 1 says "In the Paraa app" with no link; the form is the action |
| "Which company am I dealing with?" | Legal entity unconfirmed (Q14) | Footer gets it once confirmed (§11) |
| "Is the call with the CA free?" | Unconfirmed (Q2, proposal decision 15) | No claim either way. The form promises only "We contact you about it" |

**Position P1.** This table is the honest substitute for "TO CONFIRM" tags. The visitor sees an action, the owner sees the gap list in §11, and nothing public pretends a section is coming.

---

## 2. Page order and purpose

| # | Section (anchor) | The one doubt it answers | Surface | Height budget at 1440 | Change from the audit's order |
|---|---|---|---|---|---|
| 1 | **Hero** (no anchor; `#main` starts here) | What is it, and is it legit? | White | ≤ 1 screen (900px), including the "Before you start" row | Absorbs the facts strip |
| 2 | **What you're buying** `#basket` | What am I buying? | Grey-50 | ~0.8 screen | Same place |
| 3 | **How it works** `#how` | How does money go in and come out? | White | ~0.8 screen | Same place; no stacking cards |
| 4 | **How we protect your account** `#security` | Can anyone take my money? How do I spot a fake? | **Ink, the only dark band** | ≤ 1.3 screens | **Moved up from 6th** |
| 5 | **Run the numbers** `#numbers` (tabs `#what-if`, `#tax`) | What could happen to my money? What tax? | Grey-50 | ~1 screen | Moved down from 5th to after security |
| 6 | **Questions before you invest** `#faq` | What's left? | White | ~0.8 screen | Same |
| 7 | **Ask a CA** `#ask` | Can I ask someone first? | Grey-50 | ~0.9 screen | Same; calm, not a gold band |
| 8 | **Footer** | Who's responsible? What are the legal terms? | White | as needed | Same |

**Total target:** about 6.5–7 screens at 1440×900, and under 9,000px at 390. That's shorter than Vested (11,749px) and INDmoney (16,988px), and close to Zerodha's confident 4.3 screens (`india-retail.md` A12; `content-priority`).

### 2.1 Why the security band goes before the tools (Position P2)

- **Doubt order.** For an unknown brand, "is this a scam?" comes before "what might I earn?". Researchers on four of the five tracks found that impersonation fear dominates Indian retail (`security.md` §10, `institutional.md` rec. 4, `us-investing-competitors.md` rec. 11).
- **Narrative continuity.** Step 4 of How it works ends with "withdraw … to a bank account in your name", and the band opens with "Withdrawals go only to you". The same claim is shown, then made checkable.
- **Better hand-off to the form.** The tax estimate ends with "A CA can confirm your own tax", so putting the tools right before the FAQ and the form makes the last three sections a single run: *estimate → remaining questions → ask*.
- **Band placement.** The dark band lands at about 40% of the page rather than 70%. The page has one clear change of register in its middle, not a dark block just before the form.

**Cost:** a visitor who came for the calculators scrolls past the band first. The nav's "Calculators" link and the hero's lack of friction make that a single tap.

### 2.2 Why there's no separate facts strip (Position P3)

The audit's facts strip would hold the same three facts as the band, a scroll apart. That's the "security facts scattered across five places" problem the audit set out to fix (T4). Instead:
- The hero's "Before you start" row states each fact once, in one line, and links to its proof in the band.
- The band gives each fact its explanation, an example and its limit.
- That's summary → detail (`progressive-disclosure`), not duplication.

---

## 3. Navigation

### 3.1 Header (all widths)

| Element | Spec | Why |
|---|---|---|
| Height | 64px phone, 72px desktop. Solid white `bg-background` from the start (there's no scenery to float over any more), with a 1px hairline once `scrollY > 8` | `fixed-element-offset`; `Sticky Navigation`. Fireblocks' 130px header (16% of a phone screen) is the anti-example |
| Position | `position: sticky; top: 0` (not `fixed`), so it takes up its own space and nothing slides under it. `html { scroll-padding-top: 88px }` (header + 16) | `focus-not-obscured` (WCAG 2.4.11) |
| Left | Paraa logo, linking to `/` with `aria-label="Paraa Capital, home"` | |
| Desktop nav (≥1024px) | **The basket · How it works · Security · Calculators · FAQ**, in page order | Five items: nouns a visitor would search for, not component names (audit D7) |
| Right | Primary button **Ask a CA** → `/#ask`. On phones it sits beside the menu button and is always visible | `primary-action`: one CTA, defined once |
| Phone (<1024px) | Logo · **Ask a CA** · menu button (44×44, `aria-label="Menu"`) | `touch-target-size` |

**Labels, and why each one:**

| Label | Anchor | Rejected alternatives |
|---|---|---|
| The basket | `#basket` | "Basket" (bare; reads like a shopping cart) |
| How it works | `#how` | none |
| Security | `#security` | "Our rules" (vague); "Safety" (R1 bans "safe") |
| Calculators | `#numbers` | "Run the numbers" (a verb doesn't scan in a nav); "Tools" (vague). It names a component, but it's the word people actually look for |
| FAQ | `#faq` | none |
| **Ask a CA** (button) | `#ask` | "Talk to a CA" (§3.4) |

**Current-section marker.**
- Uses `aria-current="location"` on the link whose section crosses the middle of the viewport. The existing IntersectionObserver with `rootMargin: -50% 0 -50% 0` stays.
- Shown as a 2px **ink** underline that grows over 150ms, plus a change of text colour from grey-600 to grey-900. Ink, because gold is reserved (audit tokens).
- Over the ink band the header stays white, so the "Security" item stays readable.
- `nav-state-active`; `color-not-decorative-only` (weight and underline, not colour alone).

### 3.2 Mobile menu

- **Kept:** the native `<details>` disclosure. It opens and closes with no JavaScript and announces its own state. It is a disclosure, not a modal dialog, so there's no focus trap and no scroll lock.
- **Panel:** full width under the header, white, hairline top and bottom. Five rows at 52px with a right-chevron, then a full-width **Ask a CA** button at 48px. The panel's `max-height` is `calc(100dvh - 64px)` with internal scrolling.

| Trigger | Behaviour |
|---|---|
| Tap the menu button | Opens. Icon swaps Menu → X, and `aria-label` changes to "Close menu". A 150ms opacity fade where `::details-content` can animate, instant elsewhere |
| Tap a link | Closes, then the page scrolls to the anchor (smooth unless reduced motion). Focus moves to that section's `h2`, which needs `tabindex="-1"` (`focus-on-route-change`, by analogy) |
| Escape | Closes and returns focus to the menu button |
| Tap outside the panel | Closes. **New**: today only Escape and link taps close it |
| Viewport widens past 1024px | Force-closes, so a stale open panel can't sit behind the desktop nav |
| Back button | Never needs to close the menu: opening it adds no history entry (`back-behavior`) |

### 3.3 Anchors and deep links

- **IDs:** `#basket`, `#how`, `#security` (rows `#security-withdrawals`, `#security-checks`, `#security-fakes`, `#security-registration`), `#numbers` (tab panels `#what-if`, `#tax`), `#faq` (each item `#faq-<slug>`), `#ask`.
- **Every in-page link:**
  - scrolls smoothly (`scroll-behavior: smooth` only under `prefers-reduced-motion: no-preference`);
  - lands below the header (`scroll-margin-top` comes from `scroll-padding-top`);
  - moves focus to the target heading without a second scroll (`focus({ preventScroll: true })`).
- **`#what-if` and `#tax`** select their tab, then scroll to `#numbers`.
- **`#faq-<slug>`** opens that `<details>`.
- **Old anchors keep working:** `#tour` maps to the hero and `#trust` to `#security`, via a small hash map, so shared links don't break.
- Switching a tab updates the hash with `history.replaceState`. It adds no history entries, so Back still leaves the page (`back-behavior`).

### 3.4 CTA label: "Ask a CA", not "Talk to a CA" (Position P4)

Round 4 approved "Talk to a CA", and the proposal kept it. I recommend **"Ask a CA"** everywhere.
- **R12:** a CTA states the next action honestly. The next action is *writing a question*, and the confirmed promise is only "We contact you about it". "Talk to" implies a conversation we can't promise (`content-audit` Q2).
- **It fits.** It's the same width at 320px, so the header no longer needs two labels.
- **The fallback** if the owner keeps round 4: "Talk to a CA" in the nav, with the line under the hero button doing the honesty work ("Send a question first. You don't need an account.").

The form's submit button stays **Send my question**.

---

## 4. The first 10 seconds, and the first scroll

### 4.1 Hero layout and order

**Desktop (≥1024px).** Two columns, 5/7, inside the 1280px container. Left: copy. Right: the example app panel. A full-width hairline row, "Before you start", runs across the foot of the hero, and stays in the first view at 1440×900 and 1366×768.

**Phone (390×844).** Source order and visual order are the same: H1 → lede → CTA → helper line → "Before you start" (four one- or two-line cells) → app panel. With 32px H1 and 18px lede the first view ends at about 720px, so the visitor sees what it is, the action, and the registration and its limit before any picture.

**Position P5.** On phones, proof goes before the picture, so the panel doesn't peek into the first view (Blockaid's mobile hero put art first, and its promise started 540px down: `security.md` §8; `content-priority`). D1 may prefer the panel to peek. My compromise: keep the cells tight (the 16px type and 12px gaps in §5.1) before moving any of them.

### 4.2 What the visitor knows after 10 seconds (the "five-second test")

| Question | Answered by | Visible without scrolling at 390? |
|---|---|---|
| What is it? | H1 + lede | Yes |
| Is it for me? | "for residents of India" | Yes |
| What can I do now? | **Ask a CA** + helper "You don't need an account" | Yes |
| Is it registered, and what does that mean? | Cell 1 | Yes |
| Can I lose money? | Cell 4 | Yes (it's last in the row; check it at 360px) |
| What does it look like? | App panel | No on phones (Position P5); yes on desktop |

### 4.3 The first scroll

- **Desktop:** one wheel step (about 100–120px) moves the hero up; nothing pins or scrubs. The second section's heading, "What you're buying", appears inside the first 1.2 screens.
- **Phone:** the first swipe brings in the app panel, then the basket.
- **Must:** nothing animates in a way that holds back the next section. The existing reveal (12px rise, once, with no-JS fallback) applies only to the panel and to section bodies, never to headings or legal lines (`opacity-threshold`, `excessive-motion`).

---

## 5. Copy deck, section by section

**Global copy rules on top of R1–R15:**
- **ASCI clause 2 words** "currency", "securities", "custodian" and "depositories" never appear in page copy. "Rupee vs dollar" is the label.
- **Abbreviations** are glossed on first use with `<abbr>`: CA (chartered accountant), KYC (know-your-customer checks), FIU-IND (Financial Intelligence Unit-India), VDA (virtual digital asset).
- **The badge on examples** reads **Example** (the `<Illustrative/>` component, R3; the plainer word per R9).
- **Formats:** "₹1,00,000" and "₹1 lakh" are both fine, but each control uses one style consistently. Minus is U+2212.

### 5.0 Page metadata

- **Title:** `Paraa Capital: a basket that follows US stocks, gold and crude oil, for residents of India`
- **Description:** `One basket that follows US stocks, gold and crude oil, for residents of India. You add money and withdraw in rupees. You can lose money.` ("bought in rupees" is removed; see `content-audit` Q7.)
- **OG title:** `A basket that follows US stocks, gold and crude oil`

### 5.1 Hero

| Slot | Copy |
|---|---|
| H1 (≤ 20 words, R9) | **One basket that follows US stocks, gold and crude oil** |
| Lede | One of the baskets in the Paraa app, for residents of India. You add money and withdraw in rupees, and each unit's price is updated once a day. |
| Primary button | **Ask a CA** |
| Helper under the button | Send a question first. You don't need an account. |
| Secondary link (text link with →) | How we protect your account → `#security` |

**"Before you start" row.** A visually hidden `h2` reads "Before you start". There are four cells, each with a bold first sentence and a plain second sentence, and each links to its proof in the band.

| # | Bold | Plain | Link target |
|---|---|---|---|
| 1 | Registered with FIU-IND. | For anti-money-laundering reporting. This isn't approval of this investment. | `#security-registration` |
| 2 | Withdrawals go only to you. | In rupees, to a bank account in your name. | `#security-withdrawals` |
| 3 | We never ask for your OTP or PIN. | Not by call, not by message. | `#security-fakes` |
| 4 | You can lose money. | You hold units of the basket, not the shares, gold or oil. | `#numbers` |

- Cell 1 adds ", no. {FIU_REG_NO}" after "FIU-IND" **only** when `FIU_REG_NO` is set. Nothing renders otherwise.
- Cells are links with the whole cell as the target (minimum 44px tall). The underline appears on hover and focus.

**Position P6.** Cell 4 is a risk line in the body of the page. Round 16 kept risk lines in the footer only (`content-audit` §4). I'm asking the owner to reverse that for this one line:
- It's the cheapest trust signal a stranger can get: Mercury's "what we are *not*" line in the first view is the strongest single trust move in the consumer research (`consumer-fintech.md` rec. 1).
- R8 asks for the downside at equal weight.
- "You don't own the shares" is already an owner-kept limit.

If the owner says no, the row has three cells and cell 4's link moves to the lede.

**Example app panel.** Built in HTML (TRM-style), not as an image. Light theme, one shadow.

| Slot | Copy |
|---|---|
| Panel label (`aria-label` of the region) | Example of the Paraa app |
| Badge, top right of every screen, inside the frame so a crop can't remove it | **Example** |
| Tabs (3) | **Add money** · **Invest** · **Withdraw** |
| Caption under the panel, outside the frame | An illustration with sample amounts. Not a screenshot of the app, a real account or a quote. |

| Screen | Big line | Rows | Note |
|---|---|---|---|
| Add money | Amount **₹10,000** | Pay by: UPI or bank transfer · Goes to: Your Paraa wallet · Status: We verify the payment | Once it's verified, you can invest it. |
| Invest | Amount **₹10,000** | From: Your Paraa wallet · You get: Units of the basket · Price: The next daily price | Each investment has a maturity date. |
| Withdraw | Withdraw to **••4821** | Available: After it matures · Paid in: Rupees · Bank account: In your name | Withdrawals can't go to anyone else's account. |

**Never in the panel:**
- portfolio values, gains or any percentage;
- unit prices, charts or dates (a dated mock goes stale: Groww's 2021 panel, `india-retail.md` §3.3);
- names, bank logos, "Every month" (monthly plans aren't in the app: `content-audit` Q10);
- a "Talk to a CA" screen (the app has none: `content-audit` §3).

**Position P7.** The panel shows three real flows only. That's honest, and it previews How it works.

### 5.2 What you're buying `#basket`

| Slot | Copy |
|---|---|
| H2 | **What you're buying** |
| Lede | Units of one basket that follows three markets. Each moves for its own reasons, and all three can fall at the same time. |
| Label above the mix (before the numbers in reading order) | Example mix. These percentages are an example. |

| Market | Example share | What it is | What moves it |
|---|---|---|---|
| US stocks | 50% | Tokens (digital units) that track shares of large US companies. | Moves with the share prices of those companies. |
| Gold | 30% | Tracks the global price of gold. | Has often moved differently from shares, though not always. |
| Crude oil | 20% | Tracks the global price of crude oil. | Moves with global supply and demand. |

- The "Tokenized" chip on the US stocks tile is **removed**. It's an unexplained label that a careful reader links to the crypto line in the footer (proposal decision 4). The gloss in the "What it is" line carries the meaning.
- "All three can fall at the same time" is supported: gold fell with shares in Oct 2008 and Mar 2020 (`content-audit` §3). It's part of P6's argument for risk lines in the body.

**"What you own" note.** A bordered note block in the same section, at body size, not small print:
- **H3:** What you own
- **Body:** Units of the basket. The basket follows these markets through derivative contracts (agreements whose value follows a price), so you don't own the shares, gold or oil directly.

**Facts list.** Three items, each with an icon and a text label:
- Add money and withdraw in rupees
- One price per unit, updated once a day
- Each investment has a maturity date

"Invest once or every month" is **removed** until the app has monthly plans (Q10).

### 5.3 How it works `#how`

| Slot | Copy |
|---|---|
| H2 | **From sign-up to withdrawal, in four steps** |
| Lede | What happens to your money, in the order it happens. |

| # | Step title | Body | Limit, in the same step |
|---|---|---|---|
| 1 | Verify your identity | In the Paraa app, complete <abbr>KYC</abbr> (know-your-customer checks) with PAN, Aadhaar through DigiLocker and a face scan. | none |
| 2 | Add money to your wallet | Pay in rupees by UPI or bank transfer. We verify the payment before you can invest it. | Money you add can't be withdrawn until it has been invested, has matured and has been redeemed. |
| 3 | Invest | Invest from your Paraa wallet. Your money buys units at the next daily price. Weekends and holidays keep the last price. | none |
| 4 | Redeem and withdraw | When your investment matures, redeem it to your wallet. Then withdraw in rupees to a verified bank account in your name. | none |

**After the steps:** Not ready to sign up? **Ask a CA your question first.** You don't need an account. (The bold part links to `#ask`.)

- The steps are numbered along one rule: an `<ol>` with static rows. The sticky stacking cards and the white → gold → ink colour ramp are removed (audit D5).
- The "Talk to a CA" step is removed from the four: it's not part of the money flow, and it now sits after the steps as the off-ramp to the form.
- The step 2 limit is the most surprising rule in the product. It sits **in** the step, at body size, in grey-900, not in the FAQ only.

### 5.4 How we protect your account `#security` (the ink band)

| Slot | Copy |
|---|---|
| H2 | **How we protect your account** |
| Lede | What the app allows, what we'll never ask you for, and what our registration does and doesn't mean. |

**Row A `#security-withdrawals`**
- **H3:** Withdrawals go only to you
- **Body:** The app pays out only in rupees, to a bank account you've verified in your own name, after your investment matures.
- **Example UI** (light card on ink, with the **Example** badge): Withdraw to ••4821 · Name matches yours ✓ "Allowed" · Someone else's account ✕ "Not allowed". Each state is a word plus an icon (`color-not-decorative-only`).

**Row B `#security-checks`**
- **H3:** We check who you are, and every payment
- **Body:** <abbr>KYC</abbr> happens in the app, with PAN, Aadhaar through DigiLocker and a face scan. Money you add by UPI or bank transfer is verified before it can be invested.

**Row C `#security-fakes`**
- **H3:** We never ask for your OTP or PIN
- **Body:** Not by call, not by message. We also never ask you to pay into a personal account. Anyone who does isn't us.
- **"Spot a fake"**: three example messages, each a light card with a warning icon and the text label **Not from Paraa**:
  1. "Your withdrawal is on hold. Share the OTP we just sent to release it." → *Paraa never asks for an OTP or PIN.*
  2. "Pay the processing fee to my personal account and your units will be released." → *Paraa never asks you to pay into a personal account.*
  3. "I can send your withdrawal to a different account for you." → *Withdrawals only go to your own verified account.*
- **Below the cards:** If someone contacts you claiming to be Paraa, don't share any code and don't pay. To report fraud in India, call **1930** or go to **cybercrime.gov.in**.

**Row D `#security-registration`**
- **H3:** Registered with FIU-IND
- **Two columns, same type size and weight**, under the labels **What it means** and **What it doesn't mean** (`visual-hierarchy`: equal size means equal weight; Vested's protection-scope pair):
  - **What it means:** Paraa Capital is registered with <abbr>FIU-IND</abbr> (Financial Intelligence Unit-India) for anti-money-laundering reporting. We must verify customers, keep records and report suspicious transactions.
  - **What it doesn't mean:** It isn't approval of this investment, and no authority recommends it.
- With `FIU_REG_NO` set, add a line: "Registration no. {FIU_REG_NO}", in tabular figures. With it unset, nothing renders.

**Position P8 (the 1930 line).** The 1930 helpline and cybercrime.gov.in are public facts about India's National Cyber Crime Reporting Portal, not claims about Paraa. They give a scam-wary visitor somewhere to go when we can't yet publish our own support contact. They **must** be checked against the official source and dated in the source code comment before launch (R3). If compliance prefers not to, remove the sentence and keep "don't share any code and don't pay".

**Band rules (UX side).**
- Exactly four rows, each with an `h3` and anchor.
- No "Learn more" links: the facts are the content.
- On phones the text comes before its example, and every row stacks to one column below 640px (`security.md` rec. 10).
- No numbers appear in the band except the registration number.
- **Static.** No reveal on headings (Blockaid's band: 0% pixel change).

### 5.5 Run the numbers `#numbers`

| Slot | Copy |
|---|---|
| H2 | **Run the numbers** |
| Lede | Two estimates with made-up inputs you can change. Neither is a forecast. |
| Tab 1 | **If markets move** (`#what-if`) |
| Tab 2 | **Tax on your profit** (`#tax`) |

#### Tab 1: If markets move

| Slot | Copy |
|---|---|
| H3 (visible) | What could happen to your money in a year |
| Amount group label | Starting amount |
| Amount chips | ₹50,000 · ₹1 lakh (default) · ₹5 lakh · ₹10 lakh |
| Scenario group label | Try a scenario |
| Chips (label / sub-label) | **All three fall** / Rupee stronger too (**default**) · **Stocks fall** / Stocks down 20% · **Oil falls** / Oil down 40% · **Stronger rupee** / Rupee 5% stronger · **Weaker rupee** / Rupee 5% weaker |
| When the sliders match no chip | Text beside the group: "Your own scenario" (all chips unpressed) |
| Note under the chips | Made-up scenarios on an example mix. Not a forecast, and not the basket's past returns. |
| Sliders | US stocks · Gold · Crude oil (value text: "No change", "+12%", "−20%") · Rupee vs dollar (value text: "No change", "5% weaker", "5% stronger") |
| Rupee hint (under its slider) | A weaker rupee raises your investment's rupee value. A stronger rupee lowers it. |
| Reset | Set everything back to zero |
| Result heading | After one year |
| Result label | Your investment's value |
| Result | ₹74,100 · −₹25,900 (−25.9%) on the default |
| Breakdown heading | Where the change came from |
| Breakdown rows | US stocks / Gold / Crude oil: "−25% on its part of the basket" · Rupee vs dollar: "5% stronger" · each with a signed ₹ amount |
| Footnote in the result | Example only, before fees and tax. |
| Screen-reader summary (polite, after 400ms of no change) | ₹1,00,000 would become ₹74,100 after one year, −25.9%. Example only. |

**Position P9.** The default is the **"All three fall"** preset, not zero.
- R5 allows "a loss or zero"; the loss is more useful.
- A zero default shows "₹1,00,000 → ₹1,00,000" and teaches nothing until the visitor acts.
- Opening on the worst made-up case is the strongest honesty signal the tool can send ("we show you the bad case first"), and it gives the downside first billing (R8).
- The maths is unchanged (`lib/basket.ts` `scenario()`). The proposal checked the figures: ₹74,100, −25.9%.

#### Tab 2: Tax on your profit

| Slot | Copy |
|---|---|
| H3 | Tax on your profit |
| Lede | Move the slider or type an amount to estimate what you'd keep. |
| Rule 1 title / body | **Profit may be taxed at your slab rate** / It depends on how this income is classified. If the basket counts as a <abbr>VDA</abbr> (virtual digital asset), the rate is a flat 30% plus cess. |
| Rule 2 title / body | **Losses may not carry forward** / This also depends on how this income is classified. If the basket counts as a virtual digital asset, a loss can't be set off against other income or carried forward. |
| Amount label | Your profit or loss in a year |
| Amount field helper | Use a minus sign for a loss, like −50,000. |
| Slab group label | Your income tax slab |
| Slab helper | The rate on the top part of your income. |
| Slab chips | 0% · 5% · 10% · 15% · 20% · 25% · 30% (default) |
| Result label (profit) | You'd keep |
| Result label (loss) | Your loss for the year |
| Row (profit) | Tax on profit (30% + 4% cess, an add-on to income tax) |
| Row (loss) | Tax on a loss · ₹0 |
| Row (zero) | Tax · ₹0. "No profit, so no tax." |
| Footnote | Estimate only. It assumes profit is taxed as business income at your slab, and leaves out surcharge and rebates. If the basket counts as a virtual digital asset, tax is a flat 30% plus cess, whatever your slab. |
| Link under the footnote | **Ask a CA about your own tax** → `#ask` |

The maths is unchanged (`lib/tax.ts` `estimateTax()`). The default is ₹1 lakh profit at 30%, the case with the most tax (R5).

### 5.6 FAQ `#faq`

| Slot | Copy |
|---|---|
| H2 | **Questions before you invest** |
| Side line | Don't see yours? **Ask a CA.** You don't need an account. |

Items, in order. Each is a native `<details>` with id `faq-<slug>`. The first is open on load.

| Slug | Question | Answer |
|---|---|---|
| `registered` | Is Paraa registered with anyone? | Paraa Capital is registered with FIU-IND (Financial Intelligence Unit-India){`, no. X,` only if set} for anti-money-laundering reporting. That means verifying customers, keeping records and reporting suspicious transactions. It isn't approval of this investment, and no authority recommends it. |
| `own` | What do I actually own? | Units of the basket. The basket follows US stocks, gold and crude oil through derivative contracts (agreements whose value follows a price), so you don't own the shares, gold or oil directly. |
| `lose` | Can I lose money? | Yes. The basket's value can fall, and all three markets can fall at the same time. Try "All three fall" in **Run the numbers** to see an example. *(Owner decision: P6. If no, drop this item.)* |
| `money-out` | When can I get my money out? | Each investment has a maturity date. When it matures, redeem it, which moves it to your Paraa wallet. Then withdraw in rupees to a verified bank account in your name. |
| `uninvested` | Can I take out money I've added but not invested? | Not straight away. Money you add to your Paraa wallet has to be invested first. You can withdraw it after that investment matures and you redeem it. |
| `price` | How often does the price change? | Once a day. Each unit has one price, and money you invest buys units at the next price. Weekends and holidays keep the last price. |
| `rupee` | How does the rupee affect my money? | US stocks, gold and crude oil are mostly priced in dollars. So a weaker rupee raises your investment's rupee value, and a stronger rupee lowers it. |
| `tax` | How is it taxed? | It depends on how this income is classified. If it's business income, profit is taxed at your slab rate plus 4% cess. If the basket counts as a virtual digital asset, it's a flat 30% plus cess, and a loss can't be set off or carried forward. **Try the tax estimate**, and ask a CA about your own tax. |
| `who-replies` | Who replies to my question? | Your question goes to our team, and we contact you about it. Your CA may be paid by us. |
| `real` | How do I know it's really Paraa? | We never ask you to share your OTP or PIN by call or message, or to pay into a personal account. If someone does, it isn't us. See **how to spot a fake**. |

**Removed until confirmed:**
- "Can I invest every month?" (Q10).
- No fees, custody or "how does Paraa make money" items. That last one is the first item to add once fees exist (`consumer-fintech.md` rec. 6).

`uninvested` and `lose` are split out because people search a FAQ by question. A rule hidden inside another answer isn't found (`progressive-disclosure`).

### 5.7 Ask a CA `#ask`

**Left column (context).**

| Slot | Copy |
|---|---|
| H2 | **Ask a chartered accountant before you decide** |
| Lede | You don't need an account. Write your question, and we'll contact you about it. |
| "What happens next" (an `<ol>`) | 1. Your question goes to our team. · 2. We contact you about it. · 3. You decide what to do next. |
| Limit, at body size, not small print | Your CA may be paid by us. |
| OTP line | We never ask for your OTP or PIN by call or message. |

**Right column (form card).**

| Field | Label | Helper (always visible; linked by `aria-describedby`) | Input attributes |
|---|---|---|---|
| Name | Your name | none | `autocomplete="name"`, `maxlength=80` |
| Mobile | Mobile number | Indian mobile, 10 digits. We'll use it to contact you about this question. | `type="tel" inputmode="tel" autocomplete="tel-national"`, with "+91" shown as a prefix outside the input |
| Email | Email (optional) | none | `type="email" inputmode="email" autocomplete="email"` |
| Question | Your question | At least 10 characters. | `textarea`, 4 rows, `maxlength=1000`, auto-grows to 8 rows |
| Suggestions (above the textarea) | Label: "Not sure what to ask? Start with one of these:" | Chips: **What are the fees on ₹1 lakh?** · **When would my investment mature, and can I exit early?** · **Who holds my money?** · **How will my profit be taxed?** | Buttons, `type="button"` |
| Consent | Paraa Capital can contact me about this question. | none | checkbox, never pre-ticked |
| Submit | **Send my question** | none | `type="submit"` |
| Privacy line (under the button) | Your details go to Paraa Capital's team so we can contact you about this question. | none | Add "Read our privacy notice" once the page exists (`isLive()` gates it) |

- **Removed:** the textarea placeholder "For example: what are the fees…". The chips do that job better, and a placeholder isn't a label (`input-labels`).
- **Not a promise:** the mobile helper's "We'll use it to contact you" only restates what the consent box asks for. A promise of "only" or "never shared" needs the privacy facts (§11, Q8).
- **Field order** stays name → mobile → email → question → consent. The validation and API in `lib/advisor-request.ts` and `route.ts` are unchanged, and so are the server's messages.

### 5.8 Footer

- **Brand column:** logo · "One basket that follows US stocks, gold and crude oil, for residents of India." · **bold:** "We never ask you to share your OTP or PIN, or to pay into a personal account."
- **Links** (mirror the nav, plus the form): The basket · How it works · Security · Calculators · FAQ · Ask a CA.
- **Legal block:** always open, 16px body (never under 14px), grey-600 or darker on white (≥ 4.5:1). In this order:
  1. the risk note `global-risk-v3` (wording unchanged, owner decision);
  2. the FIU note `fiu-registration-v1`;
  3. the ASCI line `asci-vda-v1`, verbatim.
- **Bottom line:** "© {year} Paraa Capital."

Registrations table, company details, grievance officer, legal pages and the RBI Alert List are **added** here once confirmed. There are no empty slots until then.

---

## 6. Interaction inventory

Each interaction exists because it answers a doubt or prevents an error. Anything not on this list doesn't move.

| # | Interaction | Where | Behaviour | Timing | Why it exists | Guideline |
|---|---|---|---|---|---|---|
| I1 | Anchor scroll + focus | All in-page links | Smooth scroll to the target, then focus its heading without scrolling again | Browser smooth; instant under reduced motion | Keyboard and screen-reader users land where sighted users do | `Smooth Scroll`, `focus-not-obscured` |
| I2 | Scrollspy underline | Desktop nav | Underline and weight on the current section | 150ms | Orientation on a 7-section page | `nav-state-active` |
| I3 | Mobile menu | Header | §3.2 | 150ms fade | Primary nav on phones | `drawer-usage` |
| I4 | App panel tabs | Hero | Click or arrow keys switch the screen. **Manual start only**: no autoplay, no swipe, no scroll link | 200ms crossfade, exit 120ms (`exit-faster-than-enter`) | "What would I see after joining?" | `auto-rotation-controls`, `motion-meaning` |
| I5 | Proof-cell links | Hero row | Jump to the band row; the target row's heading gets focus | as I1 | Summary → proof | `progressive-disclosure` |
| I6 | Tool tabs | `#numbers` | ARIA tabs with automatic activation; the hash updates via `replaceState` | Instant swap; no animation | Two tools, one section, half the scroll | WAI tabs pattern, `back-behavior` |
| I7 | Amount and scenario chips | What-if | `aria-pressed` toggles. A scenario chip sets the four sliders together; touching a slider afterwards clears the chip and shows "Your own scenario" | Instant | One tap to the downside (R8) | `state-clarity` |
| I8 | Sliders | What-if, Tax | The native `input[type=range]` is the real control. Thumb and fill follow the pointer **1:1** (the spring is removed, audit F2). The result updates every frame | 0ms | A money tool that lags feels broken | `transform-performance` |
| I9 | Typed amount | Tax | Text field paired with the slider; each updates the other. Clamps to range on blur; Indian grouping applied on blur | On blur | Sliders can't hit ₹1,37,500 precisely; typing can | `Input Types`, `Mobile Keyboards` |
| I10 | Reset | What-if | All four sliders to 0; scenario chips unpressed; focus stays on the button; result announced | Instant | Way back from any state | `error-recovery` (by analogy) |
| I11 | Result change | What-if, Tax | Numbers swap instantly. **No rolling digits.** Bars resize with a 150ms width transition only when the change comes from a chip (not while dragging) | 0 / 150ms | Shows what changed without false motion | `motion-meaning`, `number-tabular` |
| I12 | FAQ disclosure | `#faq` | Native `<details>`; several can be open at once; the first is open on load; the chevron rotates | 150ms rotate | Scannable questions, answers on demand, Ctrl+F still finds closed text | `progressive-disclosure` |
| I13 | FAQ deep link | `#faq-<slug>` | Opens the item and focuses its `summary` | as I1 | Links from elsewhere on the page land on the answer | `deep-linking` |
| I14 | Suggested questions | Form | Tap inserts the text into the textarea (appended on a new line if text exists), moves focus to the end of the textarea, and clears any question error | Instant | Turns unanswered doubts into an action; removes blank-page friction | `input-helper-text` |
| I15 | Phone formatting | Form | On blur, strip +91, spaces, dashes and a leading 0 (`normalisePhone`), then display as "98765 43210". On paste, the same | On blur | People paste numbers in many shapes | `Mobile Keyboards` |
| I16 | Inline validation | Form | §7.2 | On blur, then live | Errors where and when they help | `inline-validation` |
| I17 | Submit | Form | §7.3 | n/a | The conversion | `submit-feedback`, `loading-buttons` |
| I18 | Copy reference | Form success | "Copy" button beside the reference; label changes to "Copied" for 2s; polite announcement | 2s | The reference is the visitor's only receipt | `Success Feedback` |
| I19 | Copy my question | Form failure (503, second failure) | Copies the question text; "Copied" for 2s | 2s | Nothing typed is lost even if the form can't send | `error-recovery` |
| I20 | Hover and press | Every link and button | Colour or background change; a press scale of 0.98 on buttons only | 150ms | Feedback that a click registered | `state-transition` |

**Removed interactions:**
- the hero phone prefill (the `paraa:prefill` event);
- the pinned flight and the scroll-driven tour;
- the sticky stacking step cards;
- the hover lift on basket tiles that can't be clicked (audit D4);
- the spring on sliders and columns;
- the gradient art cards.

---

## 7. The question form, in full

### 7.1 Arrival

- Any "Ask a CA" link scrolls to `#ask` and focuses the section's **H2** (`tabindex="-1"`), **never a field**, so a phone keyboard doesn't jump up before the visitor has read the "what happens next" list.
- The form is visible on load. It has no reveal (it must be "ready when seen").

### 7.2 Validation timing

All messages come from `validateRequest()`, so the client and the server always agree.

| Moment | What happens |
|---|---|
| Typing in an untouched field | Nothing. No errors while someone is still typing (`inline-validation`) |
| Leaving a field (blur) that has a value | Validate that field. Show its error below it, set `aria-invalid="true"` and add the error's id to `aria-describedby` (keep the helper id too) |
| Leaving an **empty** required field | Nothing yet. Tabbing through a form mustn't paint it red |
| Typing in a field that already shows an error | Re-validate live. The error disappears the moment the value is valid (positive feedback, no waiting for blur) |
| Ticking the consent box | Clears its error at once |
| Submit with errors | Validate every field. **One error:** focus that field. **Two or more:** show an error summary at the top of the form, focus it, and keep the inline errors (`error-summary`, `focus-management`) |

**Error summary copy:**
- **Heading:** "Please fix {n} things before sending"
- **Items:** one link per error, using the field's message, linking to the field (e.g. "Please enter a valid 10-digit mobile number.").
- **Markup:** `role="alert"`, `tabindex="-1"`.

**Error appearance.**
- The error sits under its field, never above the input it describes.
- It reads as an icon (a warning triangle, `aria-hidden`) plus text.
- The input's border thickens to 2px in the error colour, with text at ≥ 4.5:1. The text carries the meaning, and colour is only a second signal (`color-not-decorative-only`, Mercury's pattern in `consumer-fintech.md`).

**Character counter (question).**
- Shows "{n} / 1,000" under the textarea at all times, in grey.
- It is announced (polite) only when crossing 900 and 1,000.
- At 1,000 the field stops accepting input (`maxlength`), and the counter reads "1,000 / 1,000, the limit".

### 7.3 Sending and its outcomes

| State | Trigger | What the visitor sees | Focus and announcement | Data kept |
|---|---|---|---|---|
| **Idle** | Load | The form with helpers | none | n/a |
| **Sending** | Valid submit | Button reads "Sending…" at a fixed width (no layout jump); `aria-disabled="true"`. Fields become `readonly` (not `disabled`, so the text stays readable and selectable). Suggestion chips are inert | Polite: "Sending your question" | Everything |
| **Still sending** | 6s with no reply | A line under the button: "Still sending. Please keep this page open." | Polite | Everything |
| **Sent** (200 + reference) | Server accepted | The form is replaced in place by the confirmation (below) | Focus moves to the confirmation heading | Name, mobile and email kept in memory for "Ask another question" |
| **Field errors from the server** (422) | Server disagrees | As §7.2 submit-with-errors, using the server's `fields` | As §7.2 | Everything |
| **Not open yet** (503 `not_configured`) | Webhook not set | Error panel (copy below), with a **Copy my question** button. No "try again" button | `role="alert"`; focus on the panel heading | Everything |
| **Couldn't send** (502, 400, other 5xx, network error, client timeout after 15s) | Delivery failed | Error panel (copy below), with a **Try again** button that resubmits the same data. After a second failure, also **Copy my question** | `role="alert"`; focus on the panel heading | Everything |
| **Offline** | `navigator.onLine === false` at submit | Error panel: offline copy. Not sent | `role="alert"` | Everything |
| **Bot** (honeypot filled) | Server fakes success | The same as Sent (by design) | n/a | n/a |

**Double-submit guard.** While "Sending", further submits are ignored. A **Try again** creates one request at a time.

**Copy for each outcome:**

- **Sent:**
  - **H3:** Thank you. We've received your question.
  - **Line:** Your reference: **PQ-1A2B3C4D** [Copy]
  - **Line:** Keep it in case you need to mention this question. We'll contact you about it.
  - **Line:** We never ask for your OTP or PIN by call or message.
  - **Secondary button:** Ask another question
- **Ask another question:** clears the question and consent, keeps name, mobile and email (`redundant-entry`, WCAG 3.3.7), and focuses the question field. Consent is per question, so it must be ticked again.
- **Not open yet (503):**
  - **H3:** We can't take questions on this website yet
  - **Body:** Nothing was sent. What you typed is still here. You can copy your question and keep it.
  - **Button:** Copy my question
- **Couldn't send:**
  - **H3:** Sorry, we couldn't send your question
  - **Body:** What you typed is still here. Please try again.
  - **Buttons:** Try again · after a second failure, also Copy my question
- **Offline:**
  - **H3:** You seem to be offline
  - **Body:** Nothing was sent, and what you typed is still here. Send it again when you're back online.
  - **Button:** Try again

**Why the 503 copy differs.**
- Today's single failure message says "please try again in a few minutes". For `not_configured` that's untrue: the form will fail every time until someone sets `ADVISOR_REQUEST_WEBHOOK_URL`.
- Telling someone to retry something that can't work wastes their trust (`error-clarity`: cause + fix).
- It needs one client change: branch on `res.status === 503 && data.error === "not_configured"`. The API's behaviour stays exactly as it is (owner decision 4).

**Launch rule.** A webhook-less form on the live site is a broken primary CTA, and the 503 state is a safety net, not a plan. §11 lists it as a blocker.

**Not stored.** No draft is saved to `localStorage` or `sessionStorage`. The question may contain personal details, and the form is short. Recovery comes from "kept in memory" plus "Copy my question".

---

## 8. Every state, for every interactive part

"No-JS" means the server HTML before or without hydration. "RM" means `prefers-reduced-motion: reduce`.

### 8.1 Header and menu

| State | Spec |
|---|---|
| At top | White, no hairline |
| Scrolled | Hairline appears (150ms) |
| Link hover / focus | Text goes grey-600 → grey-900; focus ring 2px ink, 2px offset |
| Current section | Ink underline + `aria-current="location"` |
| No current section (hero, footer) | No underline |
| Menu closed / open | §3.2; `summary` label "Menu" / "Close menu" |
| No-JS | Menu still opens and closes (native). No scrollspy, no outside-click close |
| RM | No fade; instant |

### 8.2 App panel tabs (hero)

| State | Spec |
|---|---|
| Default | "Add money" selected |
| Hover | Tab text darkens; no movement |
| Focus | Ring around the tab; arrow keys move between tabs (roving `tabindex`); Home and End jump to the first and last |
| Selected | `aria-selected="true"`, weight 600 plus an underline or marker (gold is allowed here per the audit tokens, but the **weight and marker** carry the state, not the colour) |
| Switching | Outgoing screen fades out over 120ms, incoming fades in over 200ms. Both screens share one grid cell, so the panel height never changes (CLS 0) |
| No-JS | Screen 1 shows. The tab row is rendered but hidden (`visibility: hidden`, space reserved) until hydration, so dead buttons are never offered and nothing shifts |
| RM | Instant swap |
| Loading / empty / error | None. The panel is static HTML with fixed sample content and can't fail |

Nothing inside a screen is focusable. The screens are pictures of a UI, with `role="tabpanel"` and `aria-labelledby` the tab, and their text is real (readable by screen readers, selectable).

### 8.3 Tool tabs (`#numbers`)

| State | Spec |
|---|---|
| Default | "If markets move", unless the URL hash is `#tax` |
| Keyboard | Left and Right arrows switch (automatic activation, because both panels render instantly); Tab moves into the panel |
| Phone (<640px) | The two tabs become a two-segment control at full width, each half ≥ 44px tall. Both labels fit at 320px; check "Tax on your profit" at 16px |
| No-JS | **Both panels render stacked**, each with its visible H3, and the tablist is hidden. Nothing is unreachable |
| RM | No change (no animation used) |

### 8.4 What-if tool

| State | Spec |
|---|---|
| Server render | Default state (₹1 lakh, "All three fall", ₹74,100) is rendered in the HTML. **No loading state and no skeleton**: the answer is there before JavaScript runs |
| Before hydration | Controls are visible; sliders move natively but the result doesn't change. This lasts a moment on a good connection. Acceptable |
| Chip pressed | `aria-pressed="true"`, filled style plus a check icon (not colour alone) |
| Custom scenario | All scenario chips unpressed; "Your own scenario" shown beside the group label |
| All zero | Result "₹1,00,000", change "₹0 (0.0%)", breakdown rows read "no change". Not treated as an empty state; it's a valid answer |
| Gain | "+₹X (+Y%)". The bar goes right, labelled with the signed amount; no green-only signal |
| Loss | "−₹X (−Y%)", minus U+2212; the bar goes left |
| Slider focus | Ring on the thumb; arrows step 1%, PageUp/PageDown 5%, Home and End to the limits; `aria-valuetext` = "Gold, minus 20 percent" / "Rupee 5% stronger" |
| Phone result dock | Below 1024px, while any control in the tool has focus or is being dragged and the result card is off-screen, a 64px bar sticks to the bottom of the **tool's own box** (not the viewport): "Value after one year ₹74,100 (−25.9%)". It never covers the controls being used (`focus-not-obscured`) |
| Screen reader | One polite live region; updates 400ms after the last change; one full sentence, not a bare number (`contextual-live-badge-updates`) |
| Error | None possible: chips and sliders only allow valid values |

### 8.5 Tax estimator

| State | Spec |
|---|---|
| Server render | Default (₹1,00,000 profit, 30%) rendered with its result |
| Profit | "You'd keep ₹68,800" (₹1,00,000 − ₹31,200); tax row shown |
| Zero | "You'd keep ₹0", "Tax ₹0", "No profit, so no tax." |
| Loss | "Your loss for the year ₹50,000"; "Tax on a loss ₹0"; the screen-reader text adds "Whether it can be carried forward depends on how this income is classified." |
| Typed amount, valid | Slider jumps to the value; result updates on input |
| Typed amount, not a number | On blur: inline error "Enter an amount in rupees, like 1,50,000 or −50,000." The result keeps the last valid value and is marked "(last valid amount)" |
| Typed amount, out of range | On blur, clamp to −₹5,00,000 or ₹20,00,000 and show a helper: "The estimate goes from −₹5 lakh to ₹20 lakh." Not an error |
| Slab chips | Radio group (`fieldset` + `legend`), so arrows move between slabs; the selected one has a check |
| RM / No-JS | As the what-if |

### 8.6 FAQ

| State | Spec |
|---|---|
| Load | First item open, the rest closed |
| Hover / focus on a summary | Question text darkens; focus ring on the whole row; row ≥ 64px |
| Open | Chevron rotated; answer at 18px body, grey-700, max 65ch |
| Deep-linked | Opens and focuses as I13 |
| Find in page | Closed answers are found and opened by Ctrl+F (native `<details>` in Chromium) |
| No-JS / RM | Fully works; RM removes the rotate transition |
| Empty / error | Not possible (static content) |

### 8.7 Form

All states are in §7.3. On top of those:
- every input has hover (border darkens), focus (2px ink ring plus a border), error, readonly-while-sending and disabled states;
- chips have hover, focus and pressed styles;
- the consent box has a hit area ≥ 44×44 that includes its label.

### 8.8 Proof cells and in-page links

| State | Spec |
|---|---|
| Rest / hover / focus | Underline on hover and focus; whole-cell target; arrow nudges 2px on hover (not under RM) |
| Target on arrival | Focus moves to the target's heading; no flash tint (a tint on dark is noisy and the focus ring already shows position) |

---

## 9. Accessibility and usability requirements

**Target:** WCAG 2.2 AA throughout, with AAA contrast for body text where it costs nothing (the Accessible & Ethical style).

| Area | Requirement |
|---|---|
| Structure | One `h1` (hero). Each section is a `<section aria-labelledby>` with an `h2`; rows and cards use `h3`. No level is skipped (`heading-hierarchy`). Landmarks: `header`, `nav` ×2 (labelled "Main" and "Site"), `main`, `footer` |
| Skip link | "Skip to content" → `#main`; visible on focus (keep the existing one) |
| Keyboard | Every control is reachable in visual order. Tabs follow the WAI-ARIA tabs pattern; sliders are native ranges; the FAQ is native. No keyboard trap anywhere (the menu isn't modal) |
| Focus | 2px ink ring with 2px offset on light surfaces; 2px white ring on the ink band. Never `outline: none` without a replacement. A focused element is never hidden under the sticky header (`scroll-padding-top`) |
| Contrast | Body ≥ 7:1 where possible (grey-700 on white); captions ≥ 4.5:1; on ink, body text at white 85% (10.8:1, `security.md` rec. 8). The gold logo on white is 1.64:1, so it's decorative and the brand name is in the `aria-label` |
| Type size | Body 16–18px; legal text ≥ 14px (16px preferred); nothing under 14px anywhere, including mobile captions (Mercury's 10px and INDmoney's 11px are the anti-examples) |
| Targets | All targets ≥ 44×44px with ≥ 8px between them: chips, slab radios, tabs, FAQ rows, footer links, the consent box and inline links in the hero row |
| Colour | Gain and loss, allowed and not allowed, real and fake, error: each has a word or icon as well as a colour |
| Numbers | `font-variant-numeric: tabular-nums` on every amount, percentage and the reference; Indian grouping for ₹ whatever the browser locale (`number-tabular`, R10) |
| Live regions | Exactly three: what-if result (polite, debounced), tax result (polite, debounced) and the form status (polite for sending, `alert` for errors). Nothing else announces |
| Motion | Under RM: no smooth scroll, no fades, no chevron rotate, no reveal. Nothing on the page moves on its own at any time (`auto-rotation-controls` therefore never applies) |
| No-JS | The whole page reads and every link works. The form needs JavaScript to send (it posts JSON). Without it, the form shows a server-rendered line: "Sending a question needs JavaScript turned on." There's no silent dead button |
| Zoom and reflow | Works at 320px wide and at 200% zoom with no horizontal scroll; the sticky header doesn't cover focused content at 200% zoom (`horizontal-scroll`) |
| Language | `lang="en-IN"`; `<abbr title>` for CA, KYC, FIU-IND and VDA on first use in each section that uses them |
| Forms | Visible labels; helpers and errors linked by `aria-describedby`; `autocomplete` tokens; `inputmode`; required fields marked in words ("optional" on email instead of `*` on the others, since 4 of 5 are required) |
| Test matrix | 320, 375, 390, 768, 1024, 1366×768, 1440×900; keyboard only; NVDA + Chrome; TalkBack + Chrome on Android; JS off; RM on; 200% zoom |

---

## 10. Positions D1 and D3 are likely to challenge

| # | Position | Who will push back, and why | My case | What I'd accept |
|---|---|---|---|---|
| P1 | Unanswered doubts become form suggestions, not sections or tags | Owner or D3: "suggestions about fees imply we'll answer them" | We promise only "we contact you about it". The chips are the visitor's questions, not our claims | Softer chip text ("Ask about fees") |
| P2 | Security band 4th, before the tools | D1 (rhythm: dark band mid-page) or the audit author | Doubt order; step 4 → band continuity; tools then flow into FAQ and form | Band 5th (after the tools) if D1 shows the rhythm fails, but never after the FAQ |
| P3 | No separate facts strip | D1 (lose a visual "proof" band); D3 (component exists in the audit) | It duplicates the band. The hero row does the summary job | A strip **only** if it holds facts the band doesn't |
| P4 | "Ask a CA" instead of "Talk to a CA" | Owner (round 4 approval) | R12; we can't promise a conversation | "Talk to a CA" in the nav if the hero helper line stays |
| P5 | On phones, proof before the panel | D1 (wants the product visual in the first view) | `content-priority`; a phone's first view should prove, not decorate | Panel peeking ≤ 120px if the four cells still fit above it |
| P6 | "You can lose money" in the hero row and a "Can I lose money?" FAQ item | Owner (round 16 kept risk lines in the footer only) | Mercury's first-view line; R8; it costs one line | Drop cell 4 and the FAQ item; keep "all three can fall" in the basket lede |
| P7 | Panel shows Add money / Invest / Withdraw only; no CA screen, no monthly, no dates | D1 (fewer, plainer screens) | Each screen is a confirmed flow; anything else shows a feature the app lacks | A fourth screen once the app has it |
| P8 | 1930 / cybercrime.gov.in line in the band | Compliance | Public facts; gives a scam-wary visitor somewhere to go when we have no support contact | Remove it and keep "don't share any code and don't pay" |
| P9 | What-if opens on "All three fall" | D1 or owner ("leading with a loss feels negative") | R5 allows it; R8 asks for it; a zero default teaches nothing | Zero default **with** "All three fall" as the first chip, visually first |
| P10 | Tools as tabs; both panels stacked with no JS | D3 (tabs hide content; prefers two stacked tools) | Halves the scroll (audit D6); deep links select tabs; nothing is unreachable | Stacked with a sticky in-section switcher if testing shows people miss tab 2 |
| P11 | Selected states are carried by weight, check icon or marker, never by gold alone | D1 (gold as the active colour) | `color-not-decorative-only`; gold is 1.6:1 on white | Gold fill **plus** the check icon |
| P12 | No sticky bottom CTA bar on phones | D1 or growth ("conversion") | The header CTA is always visible; a fixed bar covers content (`fixed-element-offset`; Mercury's 90px bar) | None |
| P13 | Header is `sticky`, solid white from load, 64/72px | D1 (transparent over hero) | No scenery left to float over; a solid header avoids contrast checks on a moving background | Transparent at top **only** if the hero background is the same white |
| P14 | "Example" as the badge word (component `<Illustrative/>`) | D3 (R3 names the badge "Illustrative") | R9 plain words | "Illustrative" if compliance prefers the formal word |
| P15 | 503 gets its own copy; no "try again" | D3 (one error component) | `error-clarity`: a retry that can't work is a false instruction | One component with a variant prop |
| P16 | Basket "Tokenized" chip removed | Owner (kept "Tokenized") | An unexplained label beside a crypto line in the footer confuses people; the gloss stays | Keep the chip only with an approved one-line explanation |

---

## 11. Open questions for the owner

In priority order. Q1–Q4 block a calm launch of this design. The rest change copy.

1. **Placeholders.** I agree with the round-4 ban on visible `TO CONFIRM` in public. To keep the gaps from being forgotten, I suggest a **dev-only report**: a test that lists every unset fact (`FIU_REG_NO`, store links, privacy URL, legal entity…) and prints it in CI, with nothing on the page. Do you agree, or do you want the proposal's "visible on this branch only" tags?
2. **Is `ADVISOR_REQUEST_WEBHOOK_URL` set in production?** If not, the main CTA fails for every visitor (you get the honest 503 panel, but no question is sent). I treat it as a launch blocker.
3. **Risk line in the body (P6).** May "You can lose money. You hold units of the basket, not the shares, gold or oil." sit in the hero row, with "Can I lose money?" in the FAQ? This reverses round 16 for one line.
4. **"Ask a CA" or "Talk to a CA" (P4)?** And who reads the questions: CAs, or "our team"? If not CAs, every "Ask a CA" becomes "Ask a question" (one pass).
5. **The 1930 / cybercrime.gov.in line (P8):** can compliance approve it?
6. **Monthly plans (Q10):** when the app gets the screen, "Invest once or every month" comes back to the basket facts, the panel and the FAQ. Until then it's off. Agreed?
7. **"One of the baskets in the Paraa app"** stays in the hero lede (content-audit Q8). Still right?
8. **Privacy line.** The form line says only what the form does ("Your details go to Paraa Capital's team so we can contact you about this question."). Can we say more: *only* for this, not shared, kept for N days? Needs the privacy notice.
9. **FIU-IND without a number.** R6 requires a number and a link. Shipping the registration line without either needs your explicit exception (proposal decision 19). Until the number is set, the line carries its limit but no number.
10. **"Tokens (digital units)"** stays in the basket row, and the "Tokenized" chip goes (P16). Agreed?
11. **The badge word:** "Example" or "Illustrative" (P14)?
12. **When fees are confirmed:** "How does Paraa make money?" becomes FAQ item 1, and a fee line joins the basket facts. Is a fee section wanted at all, or the FAQ only?

---

## 12. Implementation notes for developers (UX-relevant only)

These are notes, not a code plan. D3 owns the system spec.

- **Hero:** delete `hero-ask.tsx` and the `paraa:prefill` listener in `ask-form.tsx`. Delete the pinned flight (`hero.tsx` and `hero-scene.tsx`) and the scroll-driven tour logic in `product-tour.tsx`. The panel's screen data moves to a small static module (three screens per §5.1).
- **Header:** change the `MENU_LINKS` labels and anchors (§3.1); add outside-click and resize-close to the menu; change the CTA to "Ask a CA" with one label (no `min-[352px]` split).
- **Basket:** remove `asset-art.tsx` use, the hover lift and the `Mark` highlighter; drop the "Tokenized" tag; drop "Invest once or every month".
- **Steps:** replace the sticky stacked cards with a static `<ol>`.
- **Tools:**
  - wrap `WhatIf` and `TaxEstimator` in one `#numbers` section with an accessible tabs component;
  - make the default preset `all-fall`;
  - replace `AdaptiveSlider`'s spring with direct styles;
  - add the typed amount field to the tax tool;
  - remove `Columns`' spring (or the columns entirely: the breakdown rows carry the meaning);
  - debounce the live regions by 400ms.
- **Security:** a new `security.tsx` replaces `trust.tsx` and `what-you-get.tsx` (the carousel goes).
- **FAQ:** add ids and the hash-open behaviour; add the `uninvested`, `lose` (if P6), `tax` and `who-replies` items; remove "Can I invest every month?".
- **Form:**
  - add helpers, the error summary, blur timing, the counter, suggestion chips, the 503 branch, Try again, Copy, offline detection, the 6s "still sending" line, a 15s client timeout (`AbortSignal.timeout(15000)`), and readonly-while-sending;
  - "Ask another question" keeps the contact fields;
  - **no change** to `lib/advisor-request.ts` or `route.ts`.
- **Global:**
  - `scroll-padding-top: 88px`;
  - smooth scroll only under `prefers-reduced-motion: no-preference`;
  - a hash map for the old anchors (`#tour` → top, `#trust` → `#security`, `#what-if` and `#tax` → tab + `#numbers`).
