# Joint design/dev review: D2 (UX, trust, journey)

**Reviewer:** Designer 2. **Date:** 11 Nov 2026. **Build:** production `next start` on :3001, build `A9mzzdmKE5Z42GGRU03NR`, against `spec.md` v1.2. Read alongside `dev-questions.md` (F1–F8, Q1–Q38, C1–C3) and `brand-board.md` (owner, 11 Nov).

**How I tested.** Everything was run with playwright-core and Chrome from the scratchpad root. Scripts and screenshots are in `…\scratchpad\d2-joint\` (`copy.mjs`, `nav.mjs`, `focus.mjs`, `tools.mjs`, `aria.mjs`, `form.mjs`, `probe2.mjs`, `misc.mjs`, `forced.mjs`; images in `shots\`).

- **Sizes:** walked screen by screen at 390×844, 360×740, 1440×900 and 1366×768.
- **Copy:** every §6/§7 string checked word for word against the rendered DOM (189 strings).
- **Orphans and truncation:** measured per line.
- **Anchors:** every anchor clicked, and every deep link loaded cold.
- **Focus:** tabbed through the whole page at 1440, 390, 360 and 720×450 (200% zoom). The focus pass used reduced motion so final positions were measured, not mid-scroll ones.
- **Accessibility tree:** read through CDP.
- **Form, success / 502 / slow / timeout:** I didn't fake responses in the page. I started a **second `next start` from the same build on :3002**, with `ADVISOR_REQUEST_WEBHOOK_URL` pointing at a local mock webhook I could switch between ok, 500, 7s and 12s.
- **Form, 503:** the real local state on :3001.
- **Offline:** `setOffline`.
- **Before hydration:** chunk scripts blocked or held back.
- **JS off:** `javaScriptEnabled: false`.

No `src/` or `spec.md` changes.

**Severity:**
- **Blocker:** must be fixed before launch: a claim without its limit, a broken primary path, or a stated honesty check that fails.
- **Should-fix:** a visitor is misled, gets stuck, or a stated QA check fails for some users.
- **Nice-to-have:** polish.

---

## 0. Summary

| Severity | Count | Items |
|---|---|---|
| **Blocker** | **0** | Every honesty limit renders beside its claim, word for word |
| **Should-fix** | **5** (+ 2 for v1.3) | S1 forced-colours tabs · S2 no-JS/pre-hydration submit lands away from its outcome · S3 footer "FAQ" target 26px wide · S4 dead "Ask another question" with JS off · S5 fact-cell limits smaller than their claims (decision 53) · v1.3: V1 gold never for state or emphasis, V2 contrast and hairlines on #F2F2F2 |
| **Nice-to-have** | **10** (+ 2 for v1.3) | N1–N10 · v1.3: V3 Bold 700 scope, V4 a gold CTA |

**The trust path holds.**
- **First view:**
  - **390×844:** the h1, lede, CTA and helper are visible, plus fact cells 1–3 in full. "You can lose money" ends at y = 707 of 844.
  - **360×740:** cells 1–2 are visible in full (cell 2 ends at y = 729).
  - **1440×900 and 1366×768:** all four cells are visible.
- **Copy:** all 189 spec strings match exactly, with typographic ’ and U+2212 everywhere. No straight apostrophes, no hyphen-minus figures, no banned words (R1, ASCI clause 2 and K8), no truncation and no horizontal scroll at any width.
- **Calculators:** every Appendix B value matches. The readouts start "Example result:" / "Estimate:", and each live region speaks the exact §6.6 sentence.
- **Form:** every state works and reads as specified: client errors, blur timing, sending, still sending, sent, Copy (and its "Selected" fallback), 503, 502 with a second-failure Copy, an 8.4s timeout ending in "couldn't send", offline, and keeping typed values on a submit before hydration. One webhook call per question, even with a forced double-submit.
- **Page length:** 7,649px at 1440 and 11,962px at 390, both within budget. The band is 1,239 / 1,973.

---

## 1. QA results (§11 D, E, H, K and my UX checks)

| ID | Result | Evidence |
|---|---|---|
| **D1** skip link | ✓ | First Tab = "Skip to content" (12–56px, 2px ring); Enter → `main#main` |
| **D2** reading order | ✓ | 46 stops at 390: header → hero CTA → 4 cells → off-ramp → tabs → tool → FAQ → form → footer. Matches the DOM and visual order |
| **D3** tabs | ✓ | → selects "Tax on your profit" and replaces the hash with `#tax`; Home/End work; Tab moves into the panel |
| **D4** chips | ✓ | One stop per group (amount, scenario); → moves the checked radio |
| **D5** sliders | ✓ | → gives −24 with `aria-valuetext` "−24%"; Home −40%; End +40% |
| **D6** FAQ | ✓ | Enter opens, Space closes |
| **D7** menu | ✓ | Enter opens ("Close menu"); Esc closes and focuses the summary; Tab-out, a link, an outside click and widening to 1100 each close it |
| **D8** form focus | ✓ | Empty submit focuses `#ask-name`; "Ask another question" focuses the question and keeps name and mobile |
| **D9** focus not obscured | ✓ | 0 focused controls under the header or readout at 1440, 390, 360 or 200% zoom. The only "overlap" is the skip link, which is fixed over the header by design |
| **D10** no trap | ✓ | Tab cycles back to the start |
| **D11** anchors | ✓ | All 5 nav links, the header and hero CTAs, the 4 fact cells, the off-ramp, the FAQ "Ask a CA.", "Try the tax estimate" and "how to spot a fake" land on their heading or summary below the header. A CTA never focuses a field |
| **D12** no ring on focused headings | ✓ | Every heading focused by script computes `outline: none`; every operable control shows its 2px ring |
| **E1/E2** live text | ✓ | Exact strings, e.g. "Made-up scenario: Stocks fall. ₹1,00,000 would become ₹90,000 after one year, −10.0%. Example only." / "No tax on a loss of ₹50,000. Whether it can be carried forward…". Silent on load |
| **E3** roles | ✓ (DOM/AX only) | Tabs `tab` + selected; chips `radio` + checked in named groups; sliders named "US stocks"… *Spoken output not verified with a real screen reader* |
| **E4** mocks | ✓ | The figure's first text is "Example", then "Paraa", "Basket"… |
| **E5** form | ✓ | `aria-describedby` = help + error ids; `role="alert"` on failures; sent `h3` focused; status says "Copied." |
| **E6** FAQ state | ✓ | `expanded` true/false in the AX tree |
| **E7** external links | n/a | None render (`APP_URL`, helpline off) |
| **E8** facts row | ✓ | A list of 4 links under "Before you start", in B25 order |
| **E9** readout | ✓ | Both readouts are `aria-hidden`; the live region carries the scenario |
| **E10** Copy reference | ✓ | Button "Copy reference"; "Copied" in status |
| **H1** JS off | ✓ with **S2, S4** | Both panels stacked (tablist hidden, no `inert`), noscript alert shown, FAQ and menu native, the form posts to the action (`POST /#ask`) and renders errors, 503 copy (no button, question kept) or the confirmation |
| **H2** before hydration | ✓ with **S2** | Errors, 503 and sent all render after the native POST; values kept. Typing before hydration survives (Q36) |
| **H3** fonts blocked | ✓ | No overflow; ₹ present |
| **H4** print | ✓ | Band prints white with ink headings; 4 footer disclosures print |
| **H5** forced colours | **✗ (S1)** | Chips, thumb and checkbox are visible; **the selected tab isn't** |
| **H6 / H13** 503 | ✓ | Alert focused; **no submit, no prompts**; fields editable; privacy line stays; "Copy my question" copies the question |
| **H7** 502 | ✓ | "Sorry, we couldn’t send your question" + Try again; the second failure adds Copy; Try again succeeds once the hook recovers. Timeout gives "couldn't send" at 8.4s |
| **H8** offline | ✓ | Offline alert; nothing lost; Try again sends once back online |
| **H9 / H15** reference | ✓ | "PQ-084BC82F" copied; with the clipboard blocked the label reads "Selected" and the reference is selected |
| **H10** sending | ✓ | Fields `readOnly` (typing does nothing); "Sending…" `aria-busy`; "Still sending. Please keep this page open." after 6s; 1 webhook call with a forced double-submit |
| **H11** deep links | ✓ | `#tax` / `#what-if` select the tab and focus its `h3`; `#faq-tax` / `#faq-uninvested` open and focus their summary; `#tour` → `#top` + h1; `#trust` → `#security` |
| **H12** API contract | ✓ | Bad JSON 400, invalid 422 with fields, no webhook 503; on :3002 a 200 with "PQ-…", the bearer token and the unchanged payload |
| **H14** menu | ✓ | 5 links, no CTA; the header's "Ask a CA" stays visible |
| **K1–K14** | ✓ | "isn’t / doesn’t mean… approval" beside all 4 FIU mentions; "Your CA may be paid by us" in Ask and the FAQ; both rupee directions; "You can lose money" once; "Crypto" once (footer ASCI); no K8 words; maturity limit on hero cell 3, band row A, FAQ and step 4; readouts open with their honesty word; "sign-up" only in the How-it-works h2; scam guidance ends with "…call your bank straight away." |
| **G2** nothing moves on load | ✓ | 0 animations |
| **F7/F8/F9** | ✓ | 7,649 / 11,962; first views as above; band 1,239 / 1,973 |

---

## 2. Issues

### Blockers

None.

### Should-fix

**S1. In forced colours (Windows contrast themes) the selected tab looks the same as the unselected one, so QA H5 fails.**

- **Where:** "Run the numbers" tab list, every width (`ui/tabs.tsx`, §4.12).
- **Evidence:** `forced.mjs`, `shots/tabs-forced-active.png`. In normal mode the selected tab has `border-bottom: 2px solid rgb(39,42,51)` and the unselected one `2px solid rgba(0,0,0,0)`. **Under `forced-colors: active` both compute to `2px solid rgb(0,0,0)`, with the same text colour and the same weight (600).** The forced palette turns the transparent border into CanvasText, so nothing marks which tool is showing.
- **Why it matters:** a contrast-theme user can't tell whether they're looking at the market scenarios or the tax estimate.
- **Spec change, §4.12 `Tabs.Tab` classes:** append `forced-colors:border-[Canvas] forced-colors:data-active:border-[CanvasText]`. Add both arbitrary values to A2's allow-list ("forced-colours system colours on the tab border").
- **Also:** §4.12's sentence "The selected bar is the tab's own border: … kept in forced colours" becomes "…kept in forced colours; the unselected tabs' transparent border is set to `Canvas` there, or it would be forced visible too".
- **Re-test:** H5.

**S2. A submit with JS off or before hydration lands on the section heading, not on the outcome, so the result is off-screen.**

- **Where:** `#ask` after the native POST (§7.1 permalink `/#ask`; §7.4 alert placement), at 390 (and taller phones).
- **Evidence:** `probe2.mjs`, `shots/land-prehydration-390.jpg`. After the POST the page settles at `#ask` top = 80px, **but the 503 alert sits at y = 1,294 of an 844px screen.** The visitor sees "Ask a chartered accountant before you decide", the "What happens next" list and their own name still in the field, and nothing says whether the question went. A 502 is the same. The sent confirmation only peeks in at the bottom.
- **The JS path is fine:** focus moves to the alert or heading.
- **Why it matters:** this is exactly the slow-3G visitor decision 41 was written for. Seeing no result, they either leave thinking it failed or resubmit.
- **Spec change:**
  1. **§7.1:** the permalink becomes **`"/#ask-form"`**, and the form card (`Panel`) gets `id="ask-form"`. It inherits `scroll-margin-top` from `scroll-padding-top`.
  2. **§7.4:** the 503, couldn't-send and offline Alerts render at the **top of the form card**, above "Your name", in every mode (not "where the submit was"). The JS path is unchanged in effect, because focus already moves to the Alert. The no-JS landing then shows the outcome at the card top. Invalid states already show the first error at the card top, and sent replaces the card.
  3. **QA H1/H2** add: "after the POST, the outcome (alert, first error or confirmation heading) is inside the first viewport at 390×844".
- **Copy unchanged.**

**S3. The footer "FAQ" link is a 26 × 44px target.**

- **Where:** footer link grid, every width.
- **Evidence:** `focus.mjs`: `A "FAQ"` measures 26×44 at 1440, 390, 360 and 200% zoom. Every other footer link is ≥ 54px wide.
- **The rule:** §8 says "every pointer target ≥ 44×44px except inline links in prose". This is a standalone link.
- **Fix (no spec change):** `FooterLink` gets `min-w-11` (or the `a` fills its grid cell: `flex w-full`). §4.4's FooterLink row should state it: "`inline-flex min-h-11 min-w-11`".

**S4. With JS off, the confirmation shows an "Ask another question" button that does nothing.**

- **Where:** sent state, JS disabled (dev Q32).
- **Evidence:** `form.mjs` `nojs-ok`: after clicking it, the page still shows the confirmation and nothing changes.
- **Why it matters:** a dead button on the success screen reads as broken, at the very moment we want to look dependable.
- **Spec change (answers Q32):** §7.4 "Copy buttons (client only; not rendered before hydration)" becomes "**Client-only controls** (not rendered before hydration): 'Copy reference', 'Copy my question' and **'Ask another question'**".
- Before hydration on slow 3G the button simply appears once the scripts load. With JS off, the confirmation ends at the OTP line, which is a complete state.

**S5. In the hero facts row each limit is set a size smaller and greyer than the claim it qualifies.**

- **Where:** fact cells 1 and 3 (and 2), every width (§4.9 second sentence `text-body-md text-muted-foreground` vs §1 decision 53: "A limit takes the size of the claim it qualifies").
- **Evidence:**
  - "Registered with FIU-IND." is 16px/600 ink, while its limit "This isn’t approval of this investment." is 14px/400 grey-600.
  - "Withdrawals go only to you." against "…after your investment matures." is the same.
  - These are the two most important limits in the first view, and the spec's own rule says they should match the claim's size.
  - v1.3's Bold headings and the possibility of bolder claims (V3) would widen the gap.
- **Measured cost of fixing it** (`misc.mjs` simulation, second sentence at 16/26): at 390 the cell bottoms move from 609 / 707 / 827 to **617 / 745 / 873**, so "You can lose money" is still in full in the 844px first view (745). At 360×740, cell 1 is still in full (the spec requires only cell 1); cell 2's last line ends 5px below the fold.
- **Spec change, §4.9 anatomy:** second sentence `<span class="mt-1 block text-body-lg text-copy">`, i.e. 16px, the same size as the claim, grey-700, which keeps a weight and colour step but not a size step.
- **First-view text in §6.2:** at 390 cells 1–2 in full, unchanged; at 360 "cell 1 in full, cell 2's first sentence".
- If the owner prefers the 14px look, amend decision 53 to read "same size, **or one step down for a fact cell's second sentence**", so the spec stops contradicting itself.

### Nice-to-have

| # | What | Where | Evidence | Fix |
|---|---|---|---|---|
| N1 | Anchor jumps are long animated scrolls: hero CTA → `#ask` takes **2.1s**, the "You can lose money" cell → `#numbers` **3.3s** | Every long in-page link, motion on | `focus.mjs` landing timings at 390 and 1440 | §3.5: "smooth scroll only for jumps ≤ 2 viewports; longer jumps are instant (`hash-handler` sets `behavior: 'auto'`)". RM is already instant |
| N2 | `<abbr>` default dotted underline on KYC, FIU-IND and VDA looks like a link but does nothing on touch (Round D N-g) | Step 1, band group 3, FAQ, tax rule 1 | `walk-390-03.jpg`, `walk-390-07.jpg` | §3.2: `abbr { text-decoration: none; }` (the gloss is already in words) |
| N3 | The masked account renders "• •4821", with a visible gap between the bullets | Hero panel, band mock | `walk-390-01.jpg`, `walk-1440-03.jpg`; `dd` has `tabular-nums`, so the bullets take digit-width cells | Wrap "••" in `<span class="[font-variant-numeric:normal]">` or render the mask without `num` |
| N4 | At the 0% slab the row reads "Tax on profit (0% + 4% cess, an add-on to income tax) · ₹0", which looks like a 4% charge | Tax tool | `tools.mjs` `tax0slab` | §6.6.2: when slab = 0, the row label is "Tax on profit (0% slab)" |
| N5 | In the couldn't-send and offline states, three buttons sit together: "Try again", "Copy my question" and the primary "Send my question", and two of them do the same thing (dev Q31) | Form, failed/offline | `shots/form-502b-390.jpg` | Accept as built (Q31: both work, also before hydration), or mirror the 503 rule: hide the submit while the Alert holds "Try again" |
| N6 | "Copy reference" wraps onto its own line, 16px in from the text edge (dev Q38) | Sent state, 390 | `shots/form-sent-390.jpg` | Allow `-ml-4` on that one button (add to A19), so it lines up with the reference text |
| N7 | At ≥ 1024 the last money-path label ("Withdraw in rupees") sits about 14px lower than the other three, because its line is centred on the 3-line end node | How it works, 1440 / 1366 | `walk-1440-02.jpg` | §4.11: labels `row-start-2 self-start` aligned to a fixed top (`mt-[calc((3.5rem-1px)/2)]` on row 2), or accept (dev F5 rewording of B17) |
| N8 | Remaining one-word last lines: the node "Your bank / account" (1440); the FAQ link "Try the tax / estimate" (360) | How it works, FAQ | `copy.mjs` orphan scan | `text-wrap: balance` on money-path nodes; `whitespace-nowrap` on the FAQ's "Try the tax estimate" link |
| N9 | A shared link to `/#ask` or `/#numbers` loaded cold scrolls there but leaves focus on `body`, while `/#security-*`, `/#faq-*`, `/#tax` and `/#tour` move focus to their heading | Cold deep links | `nav.mjs` `deep`: `#ask@390` → BODY | §5.3: "On load, any hash that matches a section or band-row id focuses its heading (no ring), the same as a click" |
| N10 | The tool panel is its own Tab stop, so its 2px ring outlines a 930px-tall box at 1440 (1,831px at 390) | "Run the numbers" | `focus.mjs` stop `DIV base-ui…` | Keep the stop (APG: the panel's first content isn't focusable). Draw the ring inset (`focus-visible:outline-offset-[-2px]`) so it doesn't sit on the card edge |

---

## 3. Developer questions I can answer from the UX side

| # | Verdict | Reason |
|---|---|---|
| F5 / B17 | Reword B17: "no node stretched by its label; one- and two-line nodes are 56px" | It's a measurement wording issue; N7 covers the one visible effect |
| F6, F7 | Adopt both | Without them the tax panel and its VDA warning aren't reachable with JS off (decision 28's whole reason). Verified: panels shown, `inert=false` |
| F8 / G8 | Adopt "drag to −₹3,00,000" | Measured: the tick shows at −₹5,00,000 and stays hidden at the default at 390 |
| Q22 | Confirm the heading-first DOM | A screen reader hears "US stocks, 50%…", and the heading opens its block |
| Q26 | **Keep the whole readout ink** | The honesty word ("Example result:" / "Estimate:") must not be quieter than the figure it qualifies (K12, decision 53) |
| Q30 | Confirm: the scenario line follows the checked chip | Verified: a one-step slider nudge shows "Your own scenario" and clears the chips. The line and chips never disagree, which is what matters |
| Q31 | Confirm, with N5 as an option | Both actions work and nothing shifts. The cost is one redundant button |
| Q32 | **Render after hydration only** | S4 |
| Q36 | Confirm, and apply the same layout-effect sync to `Slider` and `ChoiceChips` later | Typed form values survive (verified). Tool inputs snapping back is harmless (inputs and result stay consistent) |
| Q38 | Allow `-ml-4` | N6 |

---

## 4. Brand board (v1.3) from the UX and trust side

The owner's board is binding. These are the points where its adoption could mislead visitors or hurt readability. The contrast figures are computed with the WCAG formula (`misc.mjs`).

**V1 (should-fix for v1.3). Gold must never mark state, never sit on a figure, and never emphasise a reassurance over the risk.**
- **Why:**
  - **Data mapping:** gold already *means* the gold sleeve (bar segment, legend swatch, breakdown swatch). A gold selected chip, tab bar, slider thumb or nav marker in "Run the numbers" reads as "this is about gold".
  - **Contrast:** gold as a state edge is 1.64:1 on white and 1.47:1 on #F2F2F2. That's below the 3:1 a state needs (WCAG 1.4.11).
  - **Emphasis:** a gold result figure or gold-tinted gain looks like a promise, on a tool that opens on a loss.
  - **R8:** gold on fact cells 1, 3 or 4 but not cell 2 would make the risk line the quiet one.
- **Rule for v1.3** (add to §3.1 as "Gold never…"):
  - no gold for selected, checked, current, focus or slider states anywhere;
  - no gold on any figure, result, readout, gain/loss bar or honesty line;
  - no gold highlight on any single fact cell;
  - gold text only as gold-800 `#8C6612`, which is 5.22:1 on white but only **4.66:1 on #F2F2F2**, so body size and up only, never captions on Light;
  - gold-700 `#B98818` is 3.18:1, so never text.
- **Allowed:** gold as a fill under ink text (8.72:1), e.g. a primary button (V4); gold as brand identity outside the tools (logo, a section's decorative rule); and gold-on-ink in the band (8.72:1).

**V2 (should-fix for v1.3). Re-check text and hairlines on Light #F2F2F2.**
- **Text:**
  - grey-700 is 9.25:1, grey-600 6.77:1, ink 12.80:1, so all pass;
  - **grey-500 is 4.25:1, which fails AA.** Keep inputs and the `+91` adornment on white input fills, never on #F2F2F2.
- **Hairlines:**
  - **grey-200 on #F2F2F2 is 1.10:1** and grey-300 1.33:1, so the sleeve-row separators in the basket and any `border` on Light effectively vanish;
  - a white card on #F2F2F2 is only 1.12:1.
- **Rule:** on Light surfaces, hairlines use the strong hairline (grey-300 or the board's Primary-6 `#A9AAAD`), and cards keep their 1px border. Re-measure B-checks on the alt sections.

**V3 (nice-to-have; guidance). Bold 700: headings only.**
- **Measured:** simulating 700 on h1–h4 and FAQ summaries **didn't move the first view**. The h1 stays 3 lines at 390 and 360, and "You can lose money" still ends at y = 707 (390). Page height +26px at 360.
- **Keep at 600:** FAQ summaries (nine 2-line questions at 700 become a heavy wall at 390), fact-cell first sentences (S5: a bolder claim widens the claim/limit gap), chip and button labels, and the readout. Body stays 400.
- **For D1:** with 700, check the display tracking (−0.025em); "ll" in "follows" is the tightest pair.
- **Re-run F8 after v1.3.**

**V4 (nice-to-have). If the primary button becomes Secondary gold:**
- ink text on gold is 8.72:1, so contrast is fine;
- keep **one** gold button per screen;
- keep the header CTA outline, so the hero and header don't show two gold buttons;
- the 2px focus ring stays ink with a 2px offset (visible against both white and gold);
- never a gold band or a gold section background (audit T7: it reads as a sales banner).

---

## 5. Test set-up (stopped after the run)

To re-test the webhook-dependent states:
1. Run `node …\scratchpad\d2-joint\mock-hook.mjs`. It listens on :4590 and switches with `/mode?m=ok|fail|slow|timeout`; the log is at `/log`.
2. Run `next start -p 3002` from the repo with `ADVISOR_REQUEST_WEBHOOK_URL=http://127.0.0.1:4590/hook`, using the same build as :3001.
3. Run `node d2-joint\form.mjs` and `probe2.mjs`.

Both processes touch nothing in the repo. I stopped them after the run, and the developers' :3000 and :3001 servers were left as they were.
