# Consumer fintech trust: Wise and Mercury

**Researcher scope:** Wise (India site) and Mercury. **Theme:** trust done well in consumer fintech: fees you can see, disclosure in the first view, real product UI, and polished but restrained interaction.
**Date visited:** 10 Nov 2026. **Method:** headless Chrome (playwright-core) with a normal desktop UA (Chrome 130, Windows) and an iPhone UA for mobile, at 1440×900 and 390×844. Scripts and the full screenshot sets are in the scratchpad under `research-consumer/` (`extract.mjs`, `interact.mjs`, `curate.mjs`, `merc-form.mjs`).
**Lens:** the `ui-ux-pro-max` skill (v2.15.0): its UX guidelines (`ux` domain), the landing patterns, the product rows and `references/quick-reference.md`. Guideline IDs are cited in square brackets, e.g. [`number-tabular`].

**Labels:** **[M]** measured by script (computed styles, DOM, counts). **[O]** observed in a screenshot or by interacting. **[I]** inferred: my interpretation, not verified.

**Blocked or limited:**
- Wise's sign-up form sits behind Cloudflare Turnstile, which fails in headless Chrome ("Turnstile error: 600010"). I saw the first two steps but couldn't reach the email field, so **Wise's form error states are not reported**.
- Mercury's sign-up loaded fine, and I tested it up to an empty submit. I didn't type an email or go further.

---

## 1. Pages visited

| Site | Page | URL | Status | Height at 1440 [M] |
|---|---|---|---|---|
| Wise | Home (India) | https://wise.com/in/ | 200 | 11,495px (9,825 at 390) |
| Wise | Pricing | https://wise.com/in/pricing/ | 200 | 5,211px |
| Wise | How it works / calculator | https://wise.com/in/send-money/ | 200 | 13,198px |
| Wise | Security | https://wise.com/in/safety-and-security/ | 200 | 7,607px |
| Wise | About | https://wise.com/in/about/our-story | 200 | 8,541px |
| Wise | Help | https://wise.com/help | 200 | 2,562px |
| Wise | Sign-up | https://wise.com/register | 200 | Turnstile blocks step 3 |
| Mercury | Home | https://mercury.com/ | 200 | 11,683px (15,120 at 390) |
| Mercury | Pricing (with pricing FAQ) | https://mercury.com/pricing | 200 | 7,045px |
| Mercury | How Mercury works (partner banks) | https://mercury.com/blog/how-mercury-works-with-partner-banks | 200 | 5,468px |
| Mercury | Security | https://mercury.com/security | 200 | 10,566px |
| Mercury | About | https://mercury.com/about | 200 | 7,588px |
| Mercury | FAQ | https://mercury.com/faq | 200 | 12,879px |
| Mercury | Legal | https://mercury.com/legal | 200 | 5,247px |
| Mercury | Sign-up | https://app.mercury.com/signup | 200 | 900px (single card) |

---

## 2. Measured facts

### Wise

| Fact | Value | |
|---|---|---|
| Fonts | **Wise Sans** (display, weights 800–900, renders as heavy caps) + **Inter** (everything else, 246 of 257 text nodes) | M |
| H1 | 103.5px / 800 / line-height 0.87 (Wise Sans), "Send and spend money worldwide". 50.9px at 390 | M |
| H2 | 58px / 800 Wise Sans for most. One Inter 44.75px / 600 with −1.34px tracking ("100% transparent"). 88.5px for "Excellent everywhere" | M |
| H3 / body | H3 18px / 600 Inter. Body 16–18px / 400 Inter, line-height 1.44–1.5, +0.16px tracking. Body colour `#454745` (9.37:1 on white) | M |
| Colours | Text `#163300` (forest), lime `#9FE870` for blocks and buttons, near-black `#0E0F0C`, page tints `rgba(22,51,0,.08)` | M |
| Container | Max-width 1440px, content inset 100px, so a 1,240px measure. Hero container 1600px | M |
| Section rhythm | 56.3px top and bottom margins or padding between sections (the same value everywhere) | M |
| Buttons | Pills (radius 9999px, used 252 times). Main CTA 48px tall, 16px / 600, 24px side padding. **Nav "Sign up" is 81×32 (74×32 at 390)** | M |
| Card radii | 18.8px and 28.2px (fluid values), 50% icon circles | M |
| Shadows | Effectively none: one 1px ring | M |
| Nav | Personal · Business · Platform (mega menus with "Pricing" inside each) · language · Help · Log in · Sign up. Nav height 76px | M |
| Sections on home | 8, the last being a 3,655px grid of "Send money to [country]" links | M |
| Motion | 2 infinite 3s WAAPI animations near the top. 0 animations on the security page. Colour transitions 0.35s `cubic-bezier(0.8,0.05,0.2,0.95)`. **26** `prefers-reduced-motion` rules. Only 2 elements change with scroll | M |
| Hover | Sign-up pill darkens `#163300` → `#0D1F00` with lighter text. No movement, no shadow | M |
| Number formatting | The calculator follows browser locale: `en-IN` shows **8,00,000.00**, `en-US` shows 800,000.00 | M |

### Mercury

| Fact | Value | |
|---|---|---|
| Fonts | **arcadia** (text) + **arcadiaDisplay** (headings), both custom. Uses in-between weights: **360, 420, 480** | M |
| H1 | 49.3px / 480 (home), 57px / 480 (pricing, security). 28px at 390 | M |
| H2 | 42px / 480, +0.42px tracking, line-height 1.15. Sub-H2 28px / 480 | M |
| Body | 16px / 400–420, line-height 24px. Captions and disclosure 12px / 400 (**10px on mobile**) | M |
| Colours | Headings `#272735` (14.3:1 on `#FBFCFD`), body `#535461` (7.28:1). Dark surfaces `#171721` / `#1E1E2A`. Primary `#5266EB` (white text 4.71:1). Hover `#4354C8` | M |
| Container | 1952px max with 32px gutters. Headings sit in a centred **672px** column (left edge 384px at 1440) | M |
| Radii | **4px dominant** (108 uses), 12px cards, 32–40px pill buttons | M |
| Shadows | None in practice | M |
| Buttons | **40px tall**, 16px / 420, 20px side padding. Primary is solid `#5266EB`, secondary is `rgba(156,180,232,.2)` | M |
| Nav | Products · Solutions · Resources · About (mega menus) · Pricing · Log in · Open account. Height 72px. A promo bar sits above it | M |
| Sections on home | 13. The hero is **2,250px tall, with a 900px sticky video that scrubs as you scroll** (`hero-scrub-lg.mp4`) | M |
| Motion | Animation count rises 10 → 32 while scrolling (reveals). Tabs use `fadeInTabTranslate` 300ms and `fadeOutBlur` 500ms. Colour transitions 150ms and 300ms `cubic-bezier(0,0,0.2,1)`. 75 elements change between scroll 0 and 600. 4 reduced-motion rules. Videos on the security page have a visible pause button | M |
| Overflow | Home has horizontal overflow at 1440 (`scrollWidth > clientWidth`) | M |
| Disclosure | "Mercury is a fintech company, not an FDIC-insured bank. Banking services provided through Choice Financial Group and Column N.A., Members FDIC." It's in the first view on home, pricing and security, at 1440 and 390 | M/O |

---

## 3. Analysis

### 3.1 Fees and calculators

**Wise does this best.** On `/in/send-money/`, the first view is the calculator ([wise-02](shots/wise-02-fee-calculator-first-view.jpg)) [O]. It shows:
- "You send exactly 8,00,000.00 INR" and "Recipient gets 8,427.97 USD".
- The rate, with a lock icon and "Guaranteed for 39h".
- "Arrives Today – by Tuesday".
- "Total fees: Included in INR amount: 12,096.42 INR", with the fee figure as an underlined link.

Clicking the fee opens a **Breakdown / Comparison** dialog ([wise-03](shots/wise-03-fee-breakdown-gst.jpg)) [O]. It lists Bank transfer fee 0 INR · Our fee 9,573.99 INR · **GST 2,522.43 INR** · Total 12,096.42 INR, "Included in the amount you send". Typing 2,50,000 recalculated the fee to 4,188.38 INR straight away [M].

Further down the page, a two-row table compares pay-in methods on the same amount: Wise account 11,714.18 INR against bank transfer 12,096.42 INR ([wise-04](shots/wise-04-cost-comparison-table.jpg)) [M].

The pricing page ends its "Fees at a glance" list with a link: **"View in the regulator's standardized format"** → `wise.com/pricing/fees-documents` [M]. The list itself is a hairline list (category, then rows with a right-aligned price; "Free" is green) ([wise-05](shots/wise-05-fees-at-a-glance.jpg)).

Why it works [I]:
- The fee is a number in rupees on a real amount, never a "low fees" adjective.
- Tax is shown as its own line.
- The comparison is against Wise's own alternatives, not a competitor strawman.
- The rate lock answers "will this change before I pay?"

Skill support: [`number-tabular`], `Number Formatting` (ux), [`progressive-disclosure`] (total first, breakdown on demand), and the landing pattern *Pricing-Focused Landing*: "show actual totals … transparently; address objections in the FAQ".

**But the Wise homepage hides it.** On `/in/`, the calculator only starts at y ≈ 3,696px [M], in the fourth section. The first view says "Save on hidden conversion fees" with no number [O]. The page that earns the most trust is the product page, not the homepage.

**Mercury** prices plans rather than transactions ([mercury-03](shots/mercury-03-pricing-plans.jpg)): $0 / $29.90 / $299 a month, an annual toggle ("15% off"), a "Compare plans" table with "Expand all", and add-ons with their real prices ("$35/mo, waived until Dec 31, 2026") [M]. The price digits are rendered as separate spans ("2 3 9 5 . 9 0") so they can roll between monthly and annual [M/I].

Its strongest fee move is in the **Pricing FAQ**, which uses the skeptic's own words ([mercury-06](shots/mercury-06-faq-how-we-make-money.jpg)) [M]:
- "How does Mercury make money?" The answer lists every source: interest on deposits, FX on international wires, Treasury and venture-debt fees, card FX, interchange, subscriptions.
- "Are ACH and domestic wires really free?"
- "Is wiring USD internationally really free?"

### 3.2 Where the disclosures go

| | Wise (India) | Mercury |
|---|---|---|
| First view | Nothing regulatory in the hero. "Regulated by the Reserve Bank of India" is an H3 in section 2 [M] | A one-sentence "what we are and aren't" disclosure sits inside the hero at 1440 and 390 ([mercury-01](shots/mercury-01-hero-disclosure-1440.jpg)) [M/O] |
| Who is actually regulated | Footer: "Vaho Forex Private Limited ('Vaho') is an Authorised Dealer Category-II … authorised by the RBI … responsible for applicable LRS regulatory compliance, customer dealings and pricing", plus JPMorgan Chase Mumbai for banking infrastructure ([wise-08](shots/wise-08-mobile-footer-legal-390.jpg)) [M] | Named partner banks in the first view, a long-form "How Mercury works" article linked from the footer, and numbered footnotes on every page [M] |
| Consistency | `/in/pricing/` and `/in/about/our-story` show the **UK FCA** footer, not the Vaho/RBI text [M] | The same disclosure component appears on every page tested [O] |
| Footnotes | Few. Tooltip "i" icons next to claims in the hero [O] | Superscripts in body copy (yield², loans³, banking¹) link to a "Disclaimers and footnotes" H2 at the end of each page [M] |

What I take from this [I]:
- Mercury's sentence works because it says what Mercury is **not**, names the parties that **are** regulated, and repeats as the same component everywhere.
- Wise's homepage line "Regulated by the Reserve Bank of India" compresses a partner arrangement into a first-person claim. The footer is accurate; the headline is generous. Under our R6, that headline would fail.
- Mercury's execution has two costs:
  - It drops to 10px on mobile [M], below the skill's `readable-font-size` and "Text < 12px" anti-pattern.
  - On mobile pricing it floats over content as a fixed bar about 90px tall, out of 844px ([mercury-08](shots/mercury-08-mobile-sticky-disclosure-390.jpg)) [O].

### 3.3 How product UI is shown

**Mercury shows the real app.** The section after the hero swaps between four product videos and an end frame (`flow_1..4.mp4`, `hero_end_frame_xl.jpg`) [M]. They show the actual dashboard: Accounts, a search bar, "Available $5,144,707.07", pending deposits, and per-account balances with small-cents styling ([mercury-02](shots/mercury-02-real-product-ui.jpg)) [O]. A text list on the left (Business banking · Cards · Payments · Accounting) drives which screen is shown, with a 300ms tab crossfade [M]. "Launch demo" goes to a full interactive sandbox at `demo.mercury.com` [M].

The security page uses **cropped product panels to prove claims** instead of illustrations [O] ([mercury-05](shots/mercury-05-security-vault-ui.jpg)):
- Mercury Vault: "Your accounts are FDIC insured up to $5M", with a progress bar.
- An ACH authorisation form.
- A permissions panel.

Under the Vault panel: **"Treasury rate shown was accurate as of 01/14/25"**. That is a date on a number inside a product mock-up [M].

**Wise uses its working calculator as the product UI.** Elsewhere it shows phone photos (a hand holding a phone with "80,000 → 878.15") and illustrated 3D objects (a painted padlock) [O]. The calculator is far more convincing than the photos [I].

Skill support: landing pattern *Product Demo + Features*: "use an interactive demo only when it explains value better than static media … keep the final product state available as static content". Mercury's static end frame does exactly that.

### 3.4 Trust signals: honest or inflated

| Signal | Site | Verdict [I] |
|---|---|---|
| "Profitable since June 2022" · "Up to $5M in FDIC insurance¹" · "97%+ of deposits are FDIC-insured²" ([mercury-04](shots/mercury-04-security-facts-footnotes.jpg)) | Mercury | **Honest.** Specific, dated and footnoted, and the mechanism is explained ("through our partner banks' sweep networks") |
| Fee breakdown with GST, rate lock with expiry, "View in the regulator's standardized format" | Wise | **Honest.** Checkable by the visitor |
| "What you can do with Wise in India" → **"Not available yet: Receive money, Earn a return"** at sign-up ([wise-07](shots/wise-07-signup-not-available-yet.jpg)) | Wise | **Honest.** Limits shown before commitment, with a ✓ or ✗ badge and text |
| "4.8★ App Store 152K reviews", "4.3/5 Trustpilot from 305,446 reviews" | Wise | Quantified and attributable, but borrowed authority. **Not available to Paraa** (R11) |
| "100,000 new customers join Wise every month", "18.9 million people" | Wise | Unsourced on the page. Plausible at Wise's scale; it would be inflation for us |
| "Winner of Best Cross-Border Fintech 2025" | Wise | An award without the awarding body in the line [O]. Weak |
| "Regulated by the Reserve Bank of India" (H3) | Wise | **Overstated.** The regulated party is Vaho, an AD-II partner |
| Testimonials with names (Wise), founder quotes (Mercury), investor logos and $5.2B valuation press (Mercury) | Both | Social proof Paraa doesn't have and must not invent (R11) |
| "Radically different banking" | Mercury | A pure adjective. The disclosure under it does the trust work, not the headline |

### 3.5 Typography, grid, spacing, colour, hierarchy

**Mercury is restraint as a system** [M]:
- One family in two optical cuts, at in-between weights (360 / 420 / 480), so headings never shout. The H1 is only about 49–57px at 1440.
- A narrow 672px heading column, centred on a wide grid.
- 4px corners on almost everything, 12px on cards, and no shadows.
- Colour is one blue for action, plus slate neutrals and a dark band for product.
- Hierarchy comes from size and spacing, not colour. That matches [`visual-hierarchy`] and [`weight-hierarchy`]. Mercury goes lighter than the skill's 600–700 heading weight, which works because the display cut is designed for it [I].

**Wise is loud on purpose** [M]:
- The display face at 58–104px in heavy caps.
- Lime and forest blocks.
- Pills everywhere.

What keeps it readable is the content inside: the calculator and fee lists use plain Inter 14–18px, hairlines and right-aligned figures. The brand is loud but the data is quiet [I]. The 56.3px section rhythm is the same everywhere [M] (skill [`spacing-scale`], [`whitespace-balance`]).

Accessibility, measured:
- Both sites pass contrast on body text (9.37:1 and 7.28:1 [M]) [`color-accessible-pairs`].
- Wise's security page has **no H1** [M].
- Both have tap targets under 44px: Wise's nav sign-up is 32px and every Mercury button is 40px [M] [`touch-target-size`].

### 3.6 Components

- **Calculators (Wise):**
  - The input font is 67px at 1440 [M].
  - Currency chips are 40px pills.
  - A helper chip sits right under the input ("Sending over 25,000 USD or equivalent? We'll discount our fee").
  - The fee row is a link that opens the breakdown.
  - Outputs are right-aligned [O].
  - Skill: [`input-helper-text`], [`progressive-disclosure`].
- **Plan comparison (Mercury):** a full table on desktop with "Expand all". On mobile, two "Plan type" dropdowns choose which two plans to compare side by side [O]. Skill: [`content-priority`], [`horizontal-scroll`] avoided.
- **FAQs:**
  - Mercury uses accordions with `aria-expanded` (37 on pricing [M]), hairline separators, a chevron, and question text at 16px / 400.
  - Wise uses "+" accordions on its send-money and security pages [O]. Its pricing page has only 4 `aria-expanded` elements [M].
  - Neither uses `<details>`; Paraa already does, which is a plus.
- **CTAs:**
  - Mercury: "Open account" (primary) + "Launch demo" (secondary, translucent).
  - Wise: "Sign up in minutes", "See our pricing", "How we keep your money safe".
  - Both pair a commitment CTA with a **verification** CTA. Wise's "See our pricing" and "How we keep your money safe" are exactly the skeptic's next questions [I]. Skill: [`primary-action`].
- **Forms (Mercury sign-up)** ([mercury-07](shots/mercury-07-signup-inline-errors.jpg)) [M]:
  - Step 1 asks for first and last name only, under "Apply in 10 minutes."
  - Visible labels; `aria-describedby` points at a help-text slot.
  - An empty submit sets `aria-invalid="true"` and shows "Please complete this field" under each field, with a warning icon and red text. The colour isn't the only signal.
  - Consent text with four links sits **under** the button, in small grey type [O].
  - Skill: [`input-labels`], [`error-placement`], [`color-not-decorative-only`]. They validate on submit rather than on blur [O]; the skill prefers blur [`inline-validation`].

### 3.7 Interaction and motion

- **Wise:**
  - Almost nothing moves: 2 looping animations in the hero area and none on security [M].
  - Hover changes colour only.
  - 26 reduced-motion rules.
  - The fee dialog is the one "rich" interaction, and it has a purpose.
- **Mercury:**
  - Calm at the component level: colour transitions at 150 and 300ms, decelerate easing, and tab crossfades where exit (blur-out 500ms) and enter (300ms) overlap.
  - Ambitious at the page level: the scroll-scrubbed hero video holds 2,250px of scroll [M]. This is the piece the earlier Paraa round copied.
  - The security-page videos have **visible pause controls** [O], following the skill's *Product Demo* rule ("visible play/pause controls").
- **The restraint behind both** [I]: motion is used for state (tab changes, dialogs, a hover colour), not decoration. That's [`motion-meaning`], [`fade-crossfade`], [`state-transition`] and `Excessive Motion` ("animate 1–2 key elements per view"). Mercury's hero breaks this. Mercury can afford it because the reader already knows the brand. An unknown fintech can't (audit T2).

### 3.8 Mobile (390×844)

- **Wise** [M/O]:
  - The hero stacks into H1, then lede, then a full-width 358×48 CTA.
  - The calculator survives intact at full width.
  - The regulatory footer is legible: full-size body text, 16px at 1440 [M] ([wise-08](shots/wise-08-mobile-footer-legal-390.jpg)).
  - The weak points are the 32px nav button and the 3,655px country grid.
- **Mercury** [M/O]:
  - The hero keeps its email field and two side-by-side 40px buttons.
  - The disclosure shrinks to 10px.
  - On pricing, the disclosure floats permanently over content ([mercury-08](shots/mercury-08-mobile-sticky-disclosure-390.jpg)).
  - The compare table turns into dropdowns, which is good.
  - The page grows to 15,120px.

### 3.9 Why these feel designed rather than generated [I]

1. **Specific numbers with conditions.** "Guaranteed for 39h", "GST 2,522.43 INR", "accurate as of 01/14/25", "$35/mo, waived until Dec 31, 2026". Generated pages say "low fees" and "bank-grade security".
2. **Copy that answers the doubt in the doubter's words.** "Are ACH and domestic wires really free?" and "How does Mercury make money?"
3. **Admitted limits.** "Not available yet", "not an FDIC-insured bank".
4. **Unusual, deliberate type choices.** Weights 420 and 480; one fixed 56.3px rhythm. Not the default 400/700 and Tailwind spacing.
5. **Almost no decoration.** No shadows, no glows, and no gradient blobs on UI. Mercury's corners are 4px.
6. **Product UI with believable mess.** Cents in small type, masked account numbers ("••8799"), a cursor in the frame.
7. **Footnotes.** Nothing says "a lawyer read this" like a numbered footnote.

### 3.10 What would not suit Paraa

See "Do not adopt" below.

---

## 4. Comparison

| | Wise | Mercury | Paraa should be closer to |
|---|---|---|---|
| Fee transparency | ★ A real-amount calculator, a breakdown with GST, a pay-in comparison, the regulator's format | Plan prices, plus "how we make money" and "really free?" FAQs | **Wise** for the numbers, **Mercury** for the FAQ |
| Disclosure placement | Accurate in the footer, overstated in a headline, inconsistent across pages | ★ First view, one component, every page, footnoted | **Mercury** (but static, at least 12–14px) |
| Product UI | A working calculator, photos of phones | ★ Real app frames, a sandbox demo, UI crops as evidence | **Mercury**, in a light theme |
| Trust signals | Ratings, counts, awards, testimonials | Footnoted facts, press, investors, quotes | Neither's social proof. **Mercury's footnoted-fact format** only |
| Type and colour | Loud brand, quiet data | ★ Quiet everywhere | **Mercury** (Manrope 600, one accent) |
| Motion | ★ Nearly static | Calm components, a heavy hero | **Wise's** level, with **Mercury's** component timings |
| Forms | Not testable (Turnstile) | ★ Minimal step 1, inline errors, aria-invalid | **Mercury** |
| Mobile | ★ A clean stack, legible legal text | Good table pattern, tiny floating disclosure | **Wise** |

---

## 5. Actionable recommendations for Paraa

The section numbers refer to the page order in `audit-2026-11-10.md`, Phase 2. Each item follows the honesty rules in `content-rules.md` §0.3.

| # | Adopt | Where on our page | Why (source) | Skill guideline | Rule |
|---|---|---|---|---|---|
| 1 | **A one-sentence "what we are and aren't" line directly under the hero CTA**: Paraa's legal entity, what it is not (not a bank; not SEBI approval of this product), and who holds the money. Static, not sticky, at least 14px, ink on white. All facts stay `TO CONFIRM` until real | §1 Hero, below the buttons | Mercury's first-view disclosure is its single strongest trust move. Its 10px floating version is the part not to copy | [`readable-font-size`], [`color-accessible-pairs`], [`content-priority`]; landing *Trust & Authority*: "Transparent pricing" | R6, R15 |
| 2 | **A total-fee row in the example app panel**: "Fees on ₹1,00,000 for 12 months: ₹X, included" as a row with a chevron. Plus an "as of [date]" line and the `Illustrative` badge | §1 app panel | Wise puts the total fee in the calculator's first view. Mercury dates numbers inside UI ("accurate as of 01/14/25") | [`number-tabular`], `Number Formatting`, [`progressive-disclosure`] | R3, R7 |
| 3 | **A fee breakdown that opens from the total**: our fee, currency conversion in, management fee, exit fee, conversion out, GST/TCS (`TO CONFIRM`), total. Right-aligned tabular figures, a dashed rule before the total, "included in what you invest" or "deducted from…" | §5 Run the numbers (fee tab); also in the hero panel row | Wise's Breakdown dialog, including GST as its own line | [`progressive-disclosure`], [`number-tabular`], [`fade-crossfade`] (200ms) | R7, R10 |
| 4 | **A cost table on one real amount**, comparing *our own* paths (for example "held 6 months" vs "held 12+ months", which shows the exit fee changing). Never a competitor strawman | §5 under the calculator | Wise's pay-in comparison table on 8,00,000 INR | [`visual-hierarchy`], [`number-tabular`] | R5, R7, R8 |
| 5 | **Indian grouping always for ₹**, whatever the browser locale (Wise changes with locale) | Every number | Wise renders 8,00,000.00 in en-IN and 800,000.00 in en-US | `Number Formatting` | R10 |
| 6 | **"How does Paraa make money?" as the first FAQ item**, listing every revenue source in one paragraph (fees, FX spread if any, and "your advisor may be paid by us; see Fees") | §7 FAQ, item 1 | Mercury's pricing FAQ | Landing *Pricing-Focused*: "address objections in the FAQ" | R7, R13 |
| 7 | **Write FAQ questions in the doubter's words**: "Is the CA question really free?", "Can I get my money out any time?", "What if Paraa shuts down?" | §7 FAQ | Mercury's "…really free?" | [`progressive-disclosure`] | R9, R12 |
| 8 | **Security band = footnoted facts + UI crops**: a 3-up row of facts (each with a superscript to its source and date), then 2–3 cropped light-theme panels of real controls (2-step login, withdrawals only to your own verified bank, a device list). No padlock art | §6 Security (ink band) | Mercury's security page: facts row + Vault/ACH/permissions crops. Wise's painted padlock is the counterexample | [`color-dark-mode`], [`color-accessible-pairs`] (check on `#272A33`), [`icon-style-consistent`] | R3, R6 |
| 9 | **One "Disclosures and notes" block above the footer**, numbered. Every claim on the page links to it with `<sup><a href="#note-n">` and a back-link | §9 Footer | Mercury's "Disclaimers and footnotes". It suits our `<Disclosure>` single-source rule | [`long-token-wrapping`] for URLs in notes; keyboard-reachable links | R6, R15 |
| 10 | **"What Paraa does / doesn't do yet"**: ✓ and ✗ items, each with text (for example "Not yet: SIPs, NRI accounts, joint holdings"; the list is `TO CONFIRM`) | §4 How it works, end, or beside §8 Ask a CA | Wise's "Not available yet" at sign-up. Stating limits before commitment | [`color-not-decorative-only`] | R9, R12 |
| 11 | **Ask-a-CA form like Mercury's step 1**: few fields, visible labels, help text tied with `aria-describedby`, inline error with icon + text + `aria-invalid`, consent and privacy sentence with links **under** the button, then a submit state of loading → success with "what happens next" and when | §8 Ask a CA | Mercury sign-up, measured | [`input-labels`], [`error-placement`], [`inline-validation`] (on blur), [`submit-feedback`], `Focusable Error Summary` | R12 |
| 12 | **Verification CTAs next to the main one**: the secondary button should answer the next doubt ("See every fee", "How we protect your account"), not "Learn more" | §1 Hero, §5, §6 | Wise's "See our pricing" and "How we keep your money safe" | [`primary-action`] | R12 |
| 13 | **Quiet type**: Manrope display at 600, headings in a 640–680px column with `text-wrap: balance`, body 16–18px with line-height 1.5, a single accent. 8px and 12px corners, no shadows except the app panel | Global | Mercury: weights 420/480, 672px column, 4px/12px corners, no shadows | [`weight-hierarchy`], [`line-length`], [`heading-line-balance`], [`elevation-consistent`] | n/a |
| 14 | **Motion only for state**: 150ms colour on hover, a 200–300ms crossfade for tabs and app screens with exit shorter than enter, nothing scroll-linked, a pause button on any moving media, all of it off under reduced motion | Global | Wise is nearly static. Mercury's component timings (150/300ms, decelerate) | [`motion-meaning`], [`exit-faster-than-enter`], [`fade-crossfade`], `Reduced Motion`, `Excessive Motion` | n/a |
| 15 | **44px targets everywhere, including the nav CTA** (both sites miss this) | Nav, chips, FAQ rows | Wise nav 32px, Mercury 40px | [`touch-target-size`] | n/a |
| 16 | **On mobile, keep the fee and disclosure legible rather than floating**: a stacked app panel at full width (Wise), disclosure inline at 14px | §1 at 390 | Wise mobile calculator; the Mercury mobile bar is the anti-example | [`readable-font-size`], [`fixed-element-offset`] | n/a |

## 6. Do not adopt

| Don't adopt | Seen at | Why not for Paraa | Skill / rule |
|---|---|---|---|
| A scroll-scrubbed, pinned hero video (2,250px of scroll) | Mercury home | The owner has already rejected it (audit T2). It delays substance for an unknown brand. 75 scroll-linked changes in the first 600px | `Motion Sensitivity` ("parallax/scroll-jacking"), `Excessive Motion` |
| A landscape scene with a desk and chair as the hero | Mercury home ([mercury-01](shots/mercury-01-hero-disclosure-1440.jpg)) | It's the same motif as Paraa's old valley hero (audit T1), which read as generated art. The owner chose a static hero with an app panel | Skill *Product Demo*: show the product |
| A floating, fixed disclosure bar on mobile; 10px legal text | Mercury pricing at 390 | Covers about 11% of the viewport and is unreadable. Put the disclosure inline at 14px or more | [`readable-font-size`], [`fixed-element-offset`] |
| Rolling price digits | Mercury pricing | The audit removed NumberFlow (F1/F2). Rolling digits on money suggest movement and cost JS | [`motion-meaning`], [`number-tabular`] |
| Heavy caps display at 58–104px, lime and forest colour blocks, pills everywhere (radius 9999 used 252 times) | Wise | That's Wise's brand. It's off our tokens (8/12/16px corners, gold kept for a few things) and repeats the round-12 mistake (T5, T6) | [`elevation-consistent`], [`color-semantic`] |
| Ratings, review counts, awards, testimonials, "X customers a month", investor logos, valuation press | Both | We have none, and R11 forbids inventing them. Even real ones would need a source, entity and date | R6, R11 |
| A headline regulatory claim that compresses a partner arrangement ("Regulated by the RBI") | Wise home | Name the entity, the regulator, the number and a link, or use `TO CONFIRM` | R6 |
| Footers that change by page (UK FCA text on the India pricing page) | Wise | Our disclosures must come from one source | R15 |
| An email or phone capture in the hero | Mercury home | Audit T3: don't ask for contact details before the page has earned it | [`progressive-disclosure`] |
| Dark-theme product shots | Mercury | Our page is light, with one ink band. The app panel should match the light surface | [`dark-mode-pairing`] |
| A 3,655px SEO grid of "Send money to [country]" links | Wise home | SEO filler. It reads as a generated page tail | [`content-priority`] |
| Painted 3D padlock / globe illustrations for security | Wise home and security | Decoration standing in for evidence. Use facts and UI crops (recommendation 8) | [`motion-meaning`] / style consistency |
| The skill's own `--design-system` output for "fintech investment trust" (Dark Mode OLED, the "Enterprise Gateway" pattern, green accent, "avoid light mode") | ui-ux-pro-max | It conflicts with the owner's light-page decision and suits an enterprise portal, not a retail basket. The skill's *Banking/Traditional Finance* product row (Minimalism & Swiss + Accessible & Ethical, Trust & Authority) and the *IBM Plex / Financial Trust* pairing rationale fit better. We keep Manrope | Recorded so nobody re-runs it and takes it as advice |

---

## 7. Screenshots

| File | What it shows |
|---|---|
| [wise-01-hero-1440.jpg](shots/wise-01-hero-1440.jpg) | Wise India home first view: brand-loud hero, no fee figure |
| [wise-02-fee-calculator-first-view.jpg](shots/wise-02-fee-calculator-first-view.jpg) | `/in/send-money/` first view: calculator with rate lock, arrival and total fee |
| [wise-03-fee-breakdown-gst.jpg](shots/wise-03-fee-breakdown-gst.jpg) | Total-fees dialog: our fee, GST and total, with Breakdown / Comparison tabs (en-IN grouping) |
| [wise-04-cost-comparison-table.jpg](shots/wise-04-cost-comparison-table.jpg) | Pay-in cost comparison on 8,00,000 INR |
| [wise-05-fees-at-a-glance.jpg](shots/wise-05-fees-at-a-glance.jpg) | Pricing page hairline fee list |
| [wise-06-security-section.jpg](shots/wise-06-security-section.jpg) | Home "Safe at every step": a hairline list, plus the decorative padlock to avoid |
| [wise-07-signup-not-available-yet.jpg](shots/wise-07-signup-not-available-yet.jpg) | Sign-up step 2: what works in India and what's "Not available yet" |
| [wise-08-mobile-footer-legal-390.jpg](shots/wise-08-mobile-footer-legal-390.jpg) | Mobile footer naming Vaho Forex (AD-II, RBI) and JPMorgan Chase Mumbai |
| [mercury-01-hero-disclosure-1440.jpg](shots/mercury-01-hero-disclosure-1440.jpg) | Hero with the "not an FDIC-insured bank" disclosure in the first view (and the desk-in-landscape motif to avoid) |
| [mercury-02-real-product-ui.jpg](shots/mercury-02-real-product-ui.jpg) | Real dashboard frames driven by a text list, with footnote superscripts |
| [mercury-03-pricing-plans.jpg](shots/mercury-03-pricing-plans.jpg) | Plan cards, annual toggle, floating disclosure |
| [mercury-04-security-facts-footnotes.jpg](shots/mercury-04-security-facts-footnotes.jpg) | Footnoted, dated facts row on the security page |
| [mercury-05-security-vault-ui.jpg](shots/mercury-05-security-vault-ui.jpg) | Product UI crop as evidence, with "rate accurate as of 01/14/25" and a pause control |
| [mercury-06-faq-how-we-make-money.jpg](shots/mercury-06-faq-how-we-make-money.jpg) | Pricing FAQ: "How does Mercury make money?" and "…really free?" |
| [mercury-07-signup-inline-errors.jpg](shots/mercury-07-signup-inline-errors.jpg) | Sign-up step 1 after an empty submit: inline icon + text errors, consent under the button |
| [mercury-08-mobile-sticky-disclosure-390.jpg](shots/mercury-08-mobile-sticky-disclosure-390.jpg) | Mobile pricing with the fixed disclosure bar covering content |

The full scroll sets (every page at 1440, and home, pricing and security at 390), the `facts.json` per page and the interaction logs are in the scratchpad: `research-consumer/out/`.
