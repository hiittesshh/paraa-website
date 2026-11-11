# D2 review of the reference build (Round D, pre-handoff)

**Reviewer:** Designer 2 (UX, trust, journey). **Date:** 10 Nov 2026.

**Read:**
- `spec.md` v1: decisions, §4 components, §5–7, §11 K, §12;
- `reference-notes.md`;
- every `img/ref-*` state shot (form errors, sending, sent and 503; tabs; menu; readout; FAQ).

**Walked myself:**
- `reference.html` with playwright-core and Chrome, at 390×844 and 1440×900, one screen at a time with the sticky header live (16 and 10 screens);
- a script that finds one-word last lines (orphans) at 360, 390 and 1440;
- `#fix` crops of How it works, the tools and the band.

My captures are in the scratchpad at `…\scratchpad\d2-walk\` (`390-s00…s15`, `1440-s00…s09`, `fix-*`). The owner's decisions since Round B are applied throughout: "You can lose money" in the hero, "Ask a CA", the what-if opening on "All three fall", the app on phone and web, FIU-IND as a plain sentence, and the webhook and privacy page as launch blockers.

**Severity:**
- **Blocker:** a claim shows on screen without its limit, or the spec contradicts its own honesty check. It must be fixed before handoff.
- **Should-fix:** a visitor is misled, gets stuck or does something useless. Fix it in this build.
- **Nice-to-have:** polish.

Each issue gives the exact spec change for D3.

---

## 0. Verdict

**It's close.** The laptop first view is the strongest version of this page so far:
- what it is, the action, all four facts and the product are visible in one screen;
- every form state reads calmly;
- the tools open on the downside with "Made-up scenario" beside the figure.

**Two blockers,** both one-line copy changes, both cases of a limit missing beside its claim:
1. **Hero cell 2** says withdrawals go to you, without "after it matures".
2. **The sticky tool readouts** show ₹74,100 and "You'd keep ₹68,800" with no "Example" or "Estimate". That fails the spec's own check K9.

**Seven should-fixes:**
- the risk cell is the only hero fact below the fold on a phone;
- the 503 state still offers a live Send button;
- "Not ready to sign up?" points at a sign-up the page can't give;
- the scam guidance ends without a next step;
- the prompt line doesn't say what tapping does;
- two layout and state details in the form.

**D1's fixes:** I agree with 20 of them. I disagree with two: N10's main fix (moving the phone helper under the input) and N15's "Your basket" title.

**Budgets:** yes to 7,700 at 1440 and 12,000 at 390. No to N14b's two-column sliders.

**Band position (4th):** walking the page, it reads well right after How it works. Row A's withdraw example makes it read as "here is what protects that flow", not a repeat. **I withdraw my Round B preference for 5th.**

---

## 1. The first 10 seconds and the first scroll

### Phone (390×844), `390-s00`, `390-s01`

| Second | What the visitor sees | Doubt it meets |
|---|---|---|
| 0–3 | "One basket that follows US stocks, gold and crude oil" (3 lines), then the lede (4 lines) | What is it, and is it for me |
| 3–5 | Full-width **Ask a CA** + "Send a question first. You don't need an account." | What can I do, and what does it cost me (no sign-up) |
| 5–10 | Facts: Registered with FIU-IND + its limit · Withdrawals go only to you · We never ask for your OTP or PIN | Is it real; can I get money out; scam fear |
| **Not in view** | "You can lose money." Its rule sits at y = 828, and the sentence starts below the fold | **Can I lose money**: the one downside fact is the one fact that needs a scroll (**S1**) |
| First scroll | Risk cell → example panel → "What you're buying" | The product, then what I'm buying |

**Verdict:** right order, no ask, no decoration. Two faults:
- The facts row shows three reassurances and holds the downside back, which breaks R8's "equal weight" on the most-used screen (S1).
- Cell 2's claim lacks its maturity limit (B1).

At 360×740, a common Android size, only cell 1 fits, which makes the order matter more.

### Laptop (1440×900), `ref-1440-first-view`

Everything is in view: the h1, lede, CTA and helper, the panel with "Example" and its maturity note, and all four cells (row at y = 669). One outline header CTA and one filled hero CTA, so there's no duplicate primary.

The first wheel step brings in "What you're buying" with "Example mix" ahead of the numbers. **No issues beyond B1.**

---

## 2. Every doubt, and where it's answered

| Doubt | Answered where | Limit beside it? | Status |
|---|---|---|---|
| What is it? | h1, lede, panel | "One of the baskets in the Paraa app" | ✓ |
| Is it real or registered? | Cell 1 → band row "Registered with FIU-IND" → FAQ 1 → footer | "This isn't approval…" in every place | ✓ (plain sentence, owner decision 5) |
| Can I lose money? | Cell 4 → `#numbers`, opening on "All three fall" | n/a (it is the limit) | ✓ at 1440; **below the fold at 390 (S1)** |
| What am I buying? | Basket + "What you own" | "Example mix…" ahead of the numbers; "you don't own the shares…" | ✓ |
| How does money go in and out? | Steps + money path + "no shortcut back" | yes, under the path | ✓ |
| Can anyone else take my money? | Cell 2 → band row A + withdraw example | Band row A: yes. **Cell 2: no (B1)** | **B1** |
| How do I spot a fake? | Band rows C and fakes, FAQ "really Paraa" | n/a | ✓, but **no next step if it already happened (S4)** |
| What could happen to ₹1 lakh? What tax? | Tools | Frame: yes. **Sticky readouts: no (B2)** | **B2** |
| Who reads my question? Are they independent? | Ask "What happens next" + "Your CA may be paid by us", FAQ | yes | ✓ |
| Fees, custody, maturity length | Not on the page (owner); routed to the form prompts | n/a | ✓ by design |
| Where's the app? Can I start? | "In the Paraa app" (step 1); no link | n/a | **The page implies sign-up is available (S3)**; see the owner question in §6 |
| Who is the company? How do I complain? | Footer: "© 2026 Paraa Capital." only | n/a | Launch blockers §12 #3–4. The footer will read unfinished until then; that's correct, not a design fix |

---

## 3. Issues, with the exact spec change

### Blockers

**B1. Hero cell 2 claims "Withdrawals go only to you" without the maturity limit.**

- **The problem:** the owner's honesty limits include the maturity wording, and the spec's own rule is that "a limit takes the size of the claim it qualifies" (decision 53). Band row A and the FAQ say "after your investment matures", but the hero cell, the first place a phone visitor meets the claim, says only "In rupees, to a bank account in your name."
- **Read cold, it promises withdrawal on demand.** That's the doubt most likely to turn into a complaint.
- **This gap was in my own D2 copy.** I'm correcting it here.
- **Spec change, §6.2 facts row, cell 2, second sentence:**
  - from: "In rupees, to a bank account in your name."
  - to: **"In rupees, to a bank account in your name, after your investment matures."**
- **Also:**
  - render it from the registry as **`withdraw-cell-v1`** (add the row to the §4.21 table);
  - add QA **K11:** "Each place that says where withdrawals go (hero cell, band row A, FAQ 'When can I get my money out?') carries 'after … matures' in the same component."
- **Cost:** +1 line at 390 (about +22px); none at 1440 (cells 1 and 4 are already 2 lines).

**B2. The sticky readouts show figures with no honesty label, so QA K9 fails as specified.**

- **The problem:** on a phone the readout is the figure the visitor watches while dragging (`390-s08`, `ref-390-tools-readout-sticky`). It reads "All three fall: **₹74,100** (−25.9%)" and, on the tax tab, "You'd keep **₹68,800**". When stuck under the header it's detached from "Made-up scenario" and "Estimate only". A screenshot of it is a bare number.
- **K9** ("Mock and tool figures carry 'Example' / 'Made-up scenario' / 'Estimate only' in the same frame") fails as written.
- **Spec change, §6.6.1, "Readout text":**
  - from: `{All three fall | … | Your own scenario}: <b>{value}</b> ({pct})`
  - to: `Example result: <b>{value}</b> ({pct})`. The scenario name is dropped from the readout; it's visible in the chips and on the result.
- **Spec change, §6.6.2, "Readout text":**
  - from: `You’d keep <b>{keep}</b>`, or `Your loss for the year <b>{loss}</b>`
  - to: `Estimate: you’d keep <b>{keep}</b>` / `Estimate: a loss of <b>{loss}</b>`
- **Why drop the scenario name:** the labelled version then fits on one line at 320 (about 248px of text room inside `px-5`). "Example · All three fall: ₹74,100 (−25.9%)" would wrap and break the fixed 48px `h-readout` and its `scroll-mt` maths.

### Should-fix

**S1. The risk cell is the only hero fact a phone visitor doesn't see.**
- **Spec change, §6.2 facts row order:** 1 Registered with FIU-IND · **2 You can lose money** · 3 Withdrawals go only to you · 4 We never ask for your OTP or PIN. Links unchanged per cell.
- **Effect at 390:** cells 1–2 are fully visible and cell 3's first sentence is visible (with B1's extra line).
- At 1440, all four are visible in either order. At 768 the 2 × 2 grid puts the registration and the risk in the first row, which pairs "who we are" with "what you risk".
- **Decision 7 text:** replace the order with this one and add "(order chosen so the downside is in the 390 first view, R8)".

**S2. The 503 state shows a live "Send my question" right under "We can't take questions on this website yet".**
- **The problem:** decision 46 says "no retry", but the submit is still a primary button (`ref-390-form-503`). The visitor's obvious next tap does nothing new.
- **Spec change, §7.4 "Not open yet" row, add:** "In `not_configured`, the submit and `QuestionPrompts` are **not rendered**. The fields stay editable so the text can be copied. The privacy line stays. The Alert's 'Copy my question' is the only action."
- **QA H:** "503: no submit visible."

**S3. "Not ready to sign up?" implies a sign-up the page can't offer.**
- **The problem:** there's no app link anywhere (§12 #4), so the visitor reads "sign up", looks for it, and finds nothing. The line's job is the off-ramp to the form.
- **Spec change, §6.4 "After the path", the off-ramp:**
  - from: "Not ready to sign up? "
  - to: **"Want to ask before you start? "**
  - The rest is unchanged: "Ask a CA your question first." + " You don't need an account."
- **Also:** K8 adds "sign up" as a banned phrase until app links exist. The h2 "From sign-up to withdrawal" stays; it describes the flow, not an action here.

**S4. The scam guidance ends without a next step.**
- **The problem:** with `SHOW_CYBERCRIME_HELPLINE` off (decision 35), the band ends "…don't share any code and don't pay." A visitor reading this because something already happened has nowhere to go: no Paraa contact (§12 #4), no helpline.
- **Spec change, §6.5 Group 2 "Under the list":** when the helpline is off, append: **"If you've already shared a code or paid someone, call your bank straight away."** It's generic, true advice and names nothing unconfirmed.
- **Also:** move compliance approval of the 1930 / cybercrime.gov.in sentence onto the §12 launch list (as #12, "recommended before launch"). It's the only useful action the band can offer until official channels exist.

**S5. The prompt line doesn't say what tapping does, and the prompts sit indented (D1's N11).**
- **The problem:** "Start with one of these:" over four "+" buttons reads as a choice or a submit.
- **Spec change, §7.2 prompts label:**
  - from: "Not sure what to ask? Start with one of these:"
  - to: **"Not sure what to ask? Tap one to add it:"** (one line at 390)
- Apply N11's `-mx-4` too.

**S6. Name and mobile side by side, with the mobile helper above its input (D1's N10). I agree with the problem, not the fix.**
- **Why not N10's main fix:** moving the helper under the input means the visitor types their number **before** reading "We'll use it to contact you about this question". That line is the answer to audit T3 (asking for a number before saying why), and hints belong before the input (WCAG 3.3.2; the GOV.UK hint pattern).
- **Spec change instead, §6.8 layout + §7.2 "Order":** name and mobile are **one column at every width** (delete `sm:grid-cols-2`). Single-column forms are also faster to complete. **Cost:** about +70px at ≥ 640 only; 390 is already stacked.

**S7. Sent state.**
- **(a)** D1's N12: drop `mx-auto` so the icon sits left, above the h3.
- **(b)** Rename the reference button from "Copy" to **"Copy reference"**. "Copy" alone is ambiguous to a screen reader that lands on it, and to the eye beside "PQ-…".
- **(c)** D1's N24, my preference: programmatically focused, non-interactive headings (`h1`/`h2`/`h3` with `tabIndex={-1}`) get **no visible ring**: `[tabindex="-1"]:focus{outline:none}`. They aren't operable controls (2.4.7 applies to components), the scroll already puts them in view, and the ring box around "Thank you…" in `ref-390-form-sent` reads like a selection error. If D3 prefers a ring, use N24's `outline-offset-4` everywhere. One rule either way.

**S8. D1's layout fixes that change what the visitor understands.**
- **N1:** misaligned money-path nodes read as "three slabs and a box".
- **N4:** the half-height result panel looks broken.
- **N5:** the breakdown rows read as one grey paragraph, so you can't scan which sleeve cost what.
- **N6:** the band's last rule stops mid-page and looks unfinished.
- **N9:** the lone "₹10 lakh" chip.

Apply all five as written; verified in `#fix` (`fix-1440-how`, `fix-1440-numbers`, `fix-1440-security`).

### Nice-to-have

| # | Issue | Spec change |
|---|---|---|
| N-a | Orphans found by script: "too" in the "All three fall" chip note (360/390); "money?" in the FAQ summary at 390; "account." in the mock caption at 390; the dt "released.”" in the fakes table at 1440; 3-line money-path labels at 1440 | §2.1 base: extend `p, li, dd { text-wrap: pretty }` to **`p, li, dt, dd, summary, figcaption, label, legend`**, and add `text-balance` to the `twoLine` chip note span (§4.13) |
| N-b | Money-path label 1 wraps to 3 lines ("UPI or bank / transfer. We / verify it.") | §4.11 `li` 2 connector copy: **"UPI or bank transfer, verified"** (D1's N3 suggestion). With N3's ratio change, every label is ≤ 2 lines |
| N-c | The tax slider label doesn't say whose profit | §6.6.2 slider label: **"Your profit or loss from the basket in a year"** |
| N-d | FAQ item 1 (open) repeats band row D word for word, two sections later | §6.7: make **`faq-money-out`** the first item and the open one; `faq-registered` moves to second, closed. It's the top unresolved doubt (liquidity) and not shown in full elsewhere. About −26px at 390 |
| N-e | Step 3 repeats the weekend rule that the FAQ "How often does the price change?" carries | §6.4 step 3 body: **"Invest from your Paraa wallet. The money you invest buys units at the next daily price."** About −26px at 390; offsets B1 for the budget |
| N-f | Footer links at ≥ 1024 sit in two rows about 85px apart (`1440-s08`) and look sparse | §6.9: the links `ul` gets `content-start gap-y-0` (rows are 44px `min-h`) |
| N-g | "CA" is first used in buttons with no gloss (R9). It's a common term in India; the Ask h2 and FAQ spell it out | No change. Recorded so it isn't "fixed" with an `abbr` tooltip, which doesn't work on touch |

---

## 4. Verdict on D1's proposed fixes

| # | Verdict | Note |
|---|---|---|
| N1 | **Agree** | S8 |
| N2 | **Agree** | At 390 the compact path reads fine (`fix-390-how`). The steps and path still say the same four things back to back on phones; N-e trims one repeat. Not worth hiding labels per breakpoint |
| N3 | **Agree** | Plus N-b's shorter label 1 |
| N4 | **Agree** | S8 |
| N5 | **Agree** | S8; clarity, not polish |
| N6 | **Agree** | (a) and (b). For the last 13px, take the band budget to 1,250 rather than tighten Group 1 rows: the band is the one place we shouldn't compress |
| N7 | **Agree** | |
| N8 | **Agree** | |
| N9 | **Agree** | Amount chips 2 × 2 below 640 |
| N10 | **Disagree with the main fix; agree with the alternative** | S6: single column at all widths, so the helper stays before the input |
| N11 | **Agree** | With S5's copy |
| N12 | **Agree** | Icon left |
| N13 | **Agree** | Drop the menu's CTA: the header's "Ask a CA" stays visible with the menu open (`ref-390-menu-open`) |
| N14 | **Agree with (a); reject (b)** | §5 |
| N15 | **Agree** with the size note; **disagree** with "Your basket" | "Your basket" implies the visitor's own account, beside a caption saying it's not a real account. Keep "US stocks, gold and crude oil" until the app's real basket name is confirmed. The echo of the h1 is harmless and it's the product's name |
| N17 | **Agree** | No negative margins |
| N18 / N18b | **Agree** | |
| N19 / N20 / N21 | **Agree** | |
| N22 | **Agree** | The "⊢◯" at ₹1 lakh reads as a glitch on the default state |
| N23 | **Agree** | |
| N24 | **Agree that it needs one rule**; I prefer no ring on `tabIndex={-1}` headings | S7(c) |

---

## 5. Page-length budgets: 7,700 at 1440 and 12,000 at 390

**Yes to both. No to N14b.**
- A budget is a proxy for "respect the sceptic's time". It isn't the goal.
- What fills 390 is honesty and tool content: tools 2,135, band 1,921, How 1,833, Ask 1,642. Cutting any of it to hit 11,500 would cost a limit or a usable control.
- **N14b** halves the slider track on a money tool. About 260px for 120 steps is about 2px per step under a thumb, which works against clarity and 2.5.7.
- 7,700 is still under the research's 8,000 "short page" bar. Competitors run 11,700–17,000 at 1440, and Vested's mobile page is 13,939.

**My changes, estimated (re-measure after applying):**

| | 1440 | 390 |
|---|---|---|
| D1's fixes | 7,617 | 11,990 |
| B1 (cell 2 + 1 line) | 0 | +22 |
| S6 (single-column name/mobile) | about +70 | 0 |
| S2, S5, S7 | 0 | 0 |
| N-d, N-e | about −26 | about −52 |
| **Total** | **about 7,660** | **about 11,960** |

**Spec change, §5.1 and F7:**
- "≤ 7,700px at 1440 and ≤ 12,000px at 390";
- the band ≤ **1,250** at 1440 (N6).
- **Add:** "Budgets are ceilings for layout. Never meet one by cutting a limit, a disclosure or slider resolution."

---

## 6. What works, and one owner question

**Keep exactly as built:**
- **The laptop first view.**
- **The facts-cell → band links:** each lands on the proof row with its heading focused.
- **The band:** text-first fakes table, "Not Paraa." lead-ins, no fraud-shaped mock messages.
- **The money path with "There's no shortcut back."** It's the clearest explanation of the hardest rule.
- **The what-if result:** "Made-up scenario: All three fall" inside the frame, and ink-only gain/loss bars.
- **The form states:** read-only while sending, "Still sending" at 6s, focus to the first error, contact fields kept on "Ask another question".
- **The privacy line,** which says what's sent and why, with no promise we can't keep.

**Owner question (new, from decision 4, "the app is on phone and web"):** is there a public web-app URL or a store listing we can link? If yes, it belongs as a secondary action after the steps ("Open the Paraa app"). Today the page's only action is a question, and a convinced visitor has no way to start. If no, S3's copy keeps the page honest until there is one.
