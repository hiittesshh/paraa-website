# Fix list: the one list developers work from

**Date:** 11 Nov 2026. **Spec:** `spec.md` **v1.5** (Step 4b added for the v1.5 rulings). Every change below is specified there; the § references point to it.

**Sources, de-duplicated:**
- `joint-review-d1.md`: V1–V7 and §B, the brand board;
- `joint-review-d2.md`: S1–S5, N1–N10 and §4, V1–V4;
- `joint-review-d3.md`: X1–X23;
- the v1.3 brand-board changes (decisions 58–62);
- the owner's decisions of 11 Nov 2026 (decisions 64–67).

Items that are closed or won't be fixed are listed at the end, so every source item can be traced.

**Severity:**
- **Blocker:** no merge without it.
- **Should-fix:** a stated spec rule or QA check fails without it.
- **Nice:** polish. Specified, but it can follow in a later PR.

**Owners:**
- **Dev 1:** `globals.css`, `layout.tsx`, `ui/*` except Dev 2's four, `site/*`, `package.json`, removing `src/app/dev/`.
- **Dev 2:** `page.tsx`, `home/{hero, hero-panel, basket, how-it-works, security, faq, hash-handler, sleeve-info}`, `ui/{mock-frame, fact-cell, allocation-bar, money-path}`.
- **Dev 3:** `home/{tools, tools-tabs, what-if, tax-estimator, ask, ask-form}`, `ui/{tool-result, question-prompts}`, `app/actions.ts`, `lib/advisor-forward.*`, `app/api/advisor-request/route.ts`.

**Rules for every item:**
- Don't add `motion` imports or registry components (decision 66).
- Use the installed skills (`frontend-design`, `design-taste-frontend`, `vercel-react-best-practices`, `vercel-composition-patterns`, `web-design-guidelines`) only where they agree with `brand-board.md`, `content-rules.md` and the spec. **The project wins every conflict.** Taste Skill's house rules (dealt palettes, no captions, stock photos, no register numbers) don't apply (decision 67).

---

## Order and dependencies at a glance

```
Step 1  Dev 1  FL-01 + FL-02 + FL-03 (one PR: tokens, the .theme-alt scope, FAQ weight) ──┐
                FL-04                                                                     │ unblocks
Step 2  Dev 1  FL-05 … FL-10 (foundation components; independent of Step 1)              │
Step 3  Dev 2  FL-11, FL-12 wait for FL-01 ◄────────────────────────────────────────────┤
               FL-13 … FL-19 can start at once                                           │
        Dev 3  FL-20 waits for FL-01 + FL-02 ◄──────────────────────────────────────────┘
               FL-21 … FL-25 can start at once (FL-24 in the same edit as FL-20)
Step 4  Dev 1  FL-26 … FL-29 (JS budget). FL-26 carries FL-06 + FL-07; FL-29 after FL-26 + FL-27
        Dev 3  FL-30 re-test, waits for FL-26
Step 4b (v1.5 rulings)
        Dev 1  FL-34 plain <a>, no next/link (closes I1) ──► Dev 2 FL-35 verifies the logo → #top jump
        Dev 1  FL-36 drop the CSS scroll-behavior rule ──► Dev 2 FL-35 comment tidy, G2 / G9 re-check
        Dev 2  FL-37 connector lines as borders; FL-38 translate="no" (independent)
        Dev 3  spot-checks its two TextLinks after FL-34 (FL-30 itself is closed)
Step 5  Dev 1  FL-31 delete src/app/dev/, last (it's the component preview until then)
        Dev 1  FL-32 gate: decision 66 (A4, A24), every owner's files
        Dev 2  FL-33 gate: re-measure the page budgets after everything above
```

**Cross-owner constraints:**
1. **FL-01 must be merged before Dev 2 starts FL-11 and FL-12,** and before Dev 3 starts FL-20. They use `bg-brand`, `text-brand-foreground`, `--p-light`, and the grey-300 `--border` from `.theme-alt`.
2. **FL-01, FL-02 and FL-03 ship together.** Otherwise the FAQ questions go Bold the moment `type-subhead` becomes 700, and the Light sections show near-invisible grey-200 hairlines.
3. **FL-05 (Dev 1) comes before Dev 3 closes G8** on the tax slider, so the re-test runs at −₹4,00,000.
4. **FL-26 (Dev 1) keeps FL-06's and FL-07's classes,** and **FL-30 (Dev 3) re-tests the tools after it.** If FL-26 lands after Dev 3's other work, Dev 3 changes only imports, and only if an export name changes; the spec keeps the names.
5. **FL-19 (Dev 2) and FL-21 (Dev 3) share `#ask-form`.** `HashHandler` must leave `#ask-form` alone, because the form owns focus there. Test them together (H11 and H2).
6. **FL-09 (Dev 1) is conditional and is verified in Dev 3's what-if** at 390. Dev 3 reports the result to Dev 1.
7. **FL-33 runs last:** FL-13, FL-14, FL-09 and FL-23 all move page height.
8. **v1.5:**
   - **FL-34 (Dev 1) comes before FL-35's logo check (Dev 2).** The logo becomes `href="/#top"`, which `HashHandler` already handles. Dev 2 confirms the landing and focus, and changes no logic.
   - **FL-36 (Dev 1) and FL-35 (Dev 2) ship in either order.** `HashHandler` already passes an explicit behaviour on every scroll.
   - **FL-30 is already closed.** After FL-34, Dev 3 only spot-checks that "Ask a CA about your own tax" still jumps to `#ask` (the element type changes; the API doesn't).
   - **FL-33 then re-measures I1** (≤ 200 / 30).

---

## Step 1: Tokens (Dev 1). Do this first.

| ID | Sev | Owner | Change (exact) | Spec | Source | Verify |
|---|---|---|---|---|---|---|
| **FL-01** | Should-fix | Dev 1 | Replace `src/app/globals.css` with §2.1 v1.3 **exactly**. The changes:<br>**(a) Primitives:** the board's exact values (`--p-ink-1…6`, `--p-ink-400…900`, `--p-gold`, `--p-gold-1…6`, `--p-gold-400…900`, `--p-light`, `--p-light-1…6`, `--p-success`, `--p-warning`, `--p-error`, greys 50–900). `--p-gold-500: #FDC037` becomes `--p-gold: #FDC037`, and `--p-gold-200` goes.<br>**(b) Light roles:**<br>• `--background-alt`, `--muted` and `--accent` → `var(--p-light)`<br>• `--placeholder` → `var(--p-grey-600)`<br>• `--primary-hover` → `var(--p-ink-1)`<br>• `--primary-active` → `var(--p-ink-900)`<br>• new `--brand: var(--p-gold)` and `--brand-foreground: var(--p-ink)`<br>• new `--success` and `--warning` (no `@theme` alias)<br>• `--selection` → `var(--p-gold-6)`<br>• `--data-gold` → `var(--p-gold)`<br>**(c) New scope:** `.theme-alt { --border: var(--p-grey-300); background-color: var(--background-alt); }`<br>**(d) `@theme inline`:** add `--color-brand` and `--color-brand-foreground`<br>**(e) Type:** `font-weight: 700` on `type-display`, `type-title`, `type-heading`, `type-subhead` and `type-figure`. New `@utility type-question` (18/26, 600, −0.005em). `type-label` stays 600<br>**(f) Base:** `abbr[title] { text-decoration: none; }`<br>**(g) Print:** `--muted: var(--p-light)` | §2.1, §3.1, §3.2, decisions 58–62 | Board; D1 §B5, V7; D2 §4 V2, V3, N2; D3 X2 | B2, B5, B26, B27, A22; C1 / C3 (axe, 0 contrast failures); F7 unchanged<br>**Status: DONE (Dev 1).** `globals.css` is byte-identical to §2.1 v1.4; served tokens verified (Light #F2F2F2 alt, brand #FDC037 / ink, placeholder grey-600, selection gold-6, success/warning). |
| **FL-02** | Should-fix | Dev 1 | `ui/section.tsx`: `TONE.alt` `"bg-background-alt"` → `"theme-alt"` | §4.1, §2.1 | Board; D1 B2; D3 X3 | B5, B27 (hairlines in Basket, Tools and Ask compute grey-300)<br>**Status: DONE (Dev 1).** Basket, Tools and Ask carry `theme-alt`; their hairlines compute grey-300 (rgb 203, 213, 225). |
| **FL-03** | Should-fix | Dev 1 | `ui/faq-item.tsx`: the summary's `type-subhead` → `type-question`, so the FAQ questions stay 600 | §4.18, decision 61 | D1 B4; D2 V3; D3 X4 | B26 (FAQ summaries 600), F7<br>**Status: DONE (Dev 1).** FAQ summaries compute 600; other headings 700. |
| **FL-04** | Nice | Dev 1 | `src/app/layout.tsx`: the font comment reads "400, 600 and 700". `src/lib/utils.test.ts`: add `cn("text-body-md", "text-brand-foreground")` keeps both | §2.2, §2.3 | D3 | A10, A13<br>**Status: DONE (Dev 1).** Font comment reads 400, 600 and 700; utils.test.ts adds the text-brand-foreground and type-subhead/type-question cases (npm test 53/53). |

---

## Step 2: Foundation components (Dev 1). Independent of Step 1.

| ID | Sev | Owner | Change (exact) | Spec | Source | Verify |
|---|---|---|---|---|---|---|
| **FL-05** | Should-fix | Dev 1 | `ui/slider.tsx`: `nearZero` hides the zero tick while the thumb's centre is within **32px** (`THUMB_PX + 8`), not 24px | §4.14 | D1 V1; Dev 3 F8; D3 X9 | G8: at the tax default, no tick at 320 / 390 / 768 / 1440; at −₹4,00,000 the tick shows at every width; Gold −5% at 390 shows none<br>**Status: DONE (Dev 1).** TICK_CLEAR_PX = THUMB_PX + 8. G8 measured: tax default no tick at 320/390/768/1440; −₹4,00,000 tick at all four; Gold −5% at 390 no tick.<br>**G8 closed (Dev 3):** no tick at the tax default at 320 / 390 / 768 / 1440; the tick shows (under the input) at −₹4,00,000 at all four; Gold −5% at 390 shows none. |
| **FL-06** | Should-fix | Dev 1 | `ui/tabs.tsx`, the `Tab` classes: append `forced-colors:border-[Canvas] forced-colors:data-active:border-[CanvasText]` | §4.12, A2 | D2 S1; D3 X10 | H5: the selected tab is distinct in a Windows contrast theme<br>**Status: DONE (Dev 1).** Forced colours (emulated): selected tab bar CanvasText, the other Canvas. Carried into FL-26. |
| **FL-07** | Nice | Dev 1 | `ui/tabs.tsx`, the `TabsPanel` classes: add `focus-visible:outline-offset-[-2px]` (the ring inset) | §4.12 | D2 N10; D3 X19 | D9; the ring sits inside the card edge at 390 and 1440<br>**Status: DONE (Dev 1).** Panel ring offset −2px measured on keyboard focus. Carried into FL-26. |
| **FL-08** | Should-fix | Dev 1 | `ui/link.tsx`, `FooterLink`: `inline-flex min-h-11 min-w-11 items-center …` | §4.4, §8 | D2 S3; D3 C4 / X12 | C4: the footer "FAQ" link is ≥ 44 × 44<br>**Status: DONE (Dev 1).** Footer FAQ link measures 44 × 44 at 390; every footer link ≥ 44 × 44. |
| **FL-09** | Nice (conditional) | Dev 1 | `ui/choice-chips.tsx`, the `twoLine` label: `px-3 sm:px-4`. **Keep it only if** at 390 "Rupee stronger too" and "Rupee 5% stronger" then fit on one line (Dev 3 checks it in the what-if). Otherwise revert | §4.13 | D1 V5; D3 X18 | B22, F6; screenshot at 390<br>**Status: DONE (Dev 1).** Kept: at 390 with px-3, "Rupee stronger too", "Rupee 5% stronger" and "Rupee 5% weaker" each measure 1 line (screenshot dev1/fl09-390-scenarios.png). Dev 3 may re-confirm.<br>**Verified (Dev 3), keep it:** at 390 every scenario note fits on one line with `px-3` ("Rupee stronger too" and "Rupee 5% stronger" included); chips 62px, 2 per row (B22, F6). |
| **FL-10** | Nice | Dev 1 | `ui/slider.tsx` and `ui/choice-chips.tsx`: on mount, a `useLayoutEffect` reads the input's DOM value and calls `onValueChange` if it differs, the same pattern as `AskForm` (Q36). A slider or chip moved before hydration then keeps its value | §4.14 (Q36 in `dev-questions.md`) | Dev 3 Q36; D2 Q36; D3 X17 | H2 (tools part): with scripts held back, a moved slider survives hydration<br>**Status: DONE (Dev 1).** Slider: mount useLayoutEffect adopts the DOM value. ChoiceChips: the same check as a commit-time callback ref (not a hook), so it stays a Server Component when uncontrolled. Tested with scripts held back: US stocks moved to −20% and ₹5 lakh picked before hydration both survive it; the scenario clears as for any slider move. |

---

## Step 3: Section work (Dev 2 and Dev 3)

### Dev 2

| ID | Sev | Owner | Change (exact) | Spec | Source | Verify |
|---|---|---|---|---|---|---|
| **FL-11** | Should-fix | Dev 2 | **Waits for FL-01.** `ui/money-path.tsx`: the end nodes (`step.end`) use `bg-brand text-brand-foreground forced-colors:border-2 forced-colors:border-[CanvasText]`, replacing `border-2 border-rule bg-card`. The middle nodes stay `bg-muted` | §4.11, decision 58 (G1) | Board; D1 G2 (their numbering); D3 X5 | B6, B10, A23, H5; B17 (heights unchanged: 56 / 70)<br>**Status: DONE (Dev 2).** End nodes compute gold #FDC037 with ink text and no border at 390, 1024 and 1440; middle nodes stay Light. H5 (emulated forced colours): end nodes 2px CanvasText border, middle nodes none. B17: 56 / 56 / 56 / 56 / 66 at 1024 and 1440 (FL-17's `text-balance` took the end node from 70 to 66). B10: 2px only on fact cells, steps and What you own. A23: exactly `ui/money-path.tsx` and `home/security.tsx`. C3: axe colour-contrast 0 failures in #how. |
| **FL-12** | Should-fix | Dev 2 | **Waits for FL-01.** `home/security.tsx`: "Not Paraa." becomes `<strong className="rounded-xs bg-brand px-1.5 font-semibold text-brand-foreground">Not Paraa.</strong>`. Reword the header comment ("no … gold") to "gold only on the Not Paraa. tags" | §6.5, decision 58 (G2) | Board; D1 G3 (their numbering); D3 X6 | B6, A23, F9 (band ≤ 1,250 / 2,000); C3<br>**Status: DONE (Dev 2).** The three tags compute gold / ink, 4px radius, 6px padding; each is 22px inside the 26px line, so no line height changes. F9: band 1,239 at 1440, 1,973 at 390. C3: axe colour-contrast 0 failures in #security at 390, 1024 and 1440. B6: the band's only gold is the three tags. Header comment reworded. |
| **FL-13** | Should-fix | Dev 2 | `ui/fact-cell.tsx`: the second sentence becomes `<span className="mt-1 block text-body-lg font-semibold text-copy">` (was `text-body-md text-muted-foreground`). **Owner decision 65**: same size and weight as the claim | §4.9, decision 65, decision 53 | D2 S5; owner | B30 (16px / 600 / grey-700); F7 at 390 ≤ **12,100** (simulated 12,012); F8: 390 cells 1–2 in full (cell 2 ends at 745), 360 cell 1 in full<br>**Status: DONE (Dev 2).** B30: all four second sentences compute 16px / 600 / rgb(51, 65, 85) at 360, 390 and 1440. F8: at 390×844 cell 2 ends at 745; at 360×740 cell 1 ends at 617; at 1440×900 all four cells end at 800. F7: 12,012 at 390, 7,683 at 1440 (dev server). |
| **FL-14** | Should-fix | Dev 2 | `home/hero.tsx` grid: `lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]` (6 / 6 at 1024–1279, 5 / 7 from 1280). Line placement unchanged | §6.2, decision 20 | D1 V2; D3 X11 | F8 at 1024×768 (h1 on 3 lines), F1, A2<br>**Status: DONE (Dev 2).** F8 at 1024×768: the h1 is 3 lines and the CTA ends at 534. Halves through 1279 (544 / 544), 5 / 7 from 1280 (453 / 635). F1: no horizontal scroll at 1024, 1279, 1280 and 1440. A2: the `xl:` class is on the allow-list. Note: the columns measure 456 / 456 at 1024, not §6.2's 464, because (976 − 64 gap) / 2 = 456 (`dev-questions.md` F9). |
| **FL-15** | Nice | Dev 2 | `home/basket.tsx`: the sleeve list `lg:gap-6` → `lg:gap-1` (the bar's gap); each column keeps `pr-6` | §6.3 | D1 V4; D3 X20 | B28 (each column within 1px of its segment at 1440 and 1024)<br>**Status: DONE (Dev 2).** B28: every sleeve column starts within 0.02px of its bar segment at 1024 and 1440 (columns 484 / 290 / 194 and 572 / 343 / 229, as in §6.3). |
| **FL-16** | Nice | Dev 2 | `home/hero-panel.tsx` and `home/security.tsx`: wrap the mask bullets as `<span className="normal-nums">••</span>4821…` | §4.7 | D2 N3; D3 X21 | B29<br>**Status: DONE (Dev 2).** B29: in both masks (hero panel and band mock) the bullets compute `font-variant-numeric: normal`, with no gap between them. |
| **FL-17** | Nice | Dev 2 | `ui/money-path.tsx`: add `text-balance` to `NODE`. `home/faq.tsx`: the "Try the tax estimate" `TextLink` gets `className="whitespace-nowrap"` | §4.11, §6.7 | D2 N8; D3 X21 | B30 (no one-word last lines at 360, 390, 1440)<br>**Status: DONE (Dev 2).** The FAQ link is one unbroken box (`nowrap`) at 360, 390, 1024 and 1440. Money path: every node is one line at 360 and 390, and at 1440 `text-balance` removed the end node's lone "name" (now "…account, in / your name"). **B30 still fails for one node at 1440:** "Your bank account" has about 95px of text room, so it takes 2 lines, and balance, pretty and plain wrap all measure "Your bank / account". No wrap mode can fix a 3-word label on 2 lines (`dev-questions.md` F10). |
| **FL-18** | Nice | Dev 2 | `home/hash-handler.tsx`: on an in-page link click, scroll with `behavior: "smooth"` only when the target is within 2 × `innerHeight` of `scrollY`; otherwise `behavior: "instant"` (v1.5, Q39; was "auto"). RM is always instant. Focus moves as today | §5.3, §3.5 | D2 N1; D3 X22 | G9, D11<br>**Status: DONE (Dev 2).** G9: at 1440 nav → #basket scrolls smoothly (29 frames); hero CTA → #ask and "You can lose money" → #numbers land instantly (one scroll position); at 390 a fact cell → the band row lands instantly; with RM even the near jump is instant. D11: focus lands on the target heading every time, with no ring. Long jumps use `behavior: "instant"`: `"auto"` follows the page's CSS `scroll-behavior: smooth` and would still animate (`dev-questions.md` Q39). |
| **FL-19** | Nice | Dev 2 | `home/hash-handler.tsx`: on load, any hash that matches a section `id` (for example `#ask`, `#numbers`) focuses that section's `h2` with `preventScroll` and no ring. **Skip `#ask-form`** (FL-21 owns focus there) | §5.3 | D2 N9; D3 X22 | H11 (cold `/#ask` and `/#numbers` focus the h2; `/#ask-form` doesn't); D12<br>**Status: DONE (Dev 2).** H11: cold /#ask, /#numbers and /#basket focus their h2 with no ring, landing 80px from the top at 390. Cold /#ask-form: `HashHandler` doesn't touch it (focus stays with the page for the form's outcome). D12: the next Tab after the #numbers h2 goes to the first tab, with its ring. The earlier H11 cases (#what-if, #tax, #faq-tax, #tour, #trust) re-run: all pass. |

### Dev 3

| ID | Sev | Owner | Change (exact) | Spec | Source | Verify |
|---|---|---|---|---|---|---|
| **FL-20** | Should-fix | Dev 3 | **Waits for FL-01 + FL-02.** `ui/tool-result.tsx`, `DivergingBar`: the track `bg-muted` → `bg-border`; the zero line `bg-border-strong` → `bg-muted-foreground` | §4.15 | Board; D1 B2; D3 X7 | B18, B19, B27 (the track is visible on the Light inset at ≥ 1024)<br>**Status: DONE (Dev 3).** Track `bg-border` computes grey-300 (rgb 203, 213, 225) and the zero line grey-600 (rgb 71, 85, 105) at 390 and 1440; at 1440 the inset is Light #F2F2F2 and the track shows on it (B27); row hairlines grey-300. |
| **FL-21** | Should-fix | Dev 3 | No-JS outcome in view:<br>• `home/ask-form.tsx`: `useActionState(askCa, IDLE, "/#ask-form")`, and render the 503, couldn't-send and offline `Alert`s at the **top of the form**, above "Your name" (they currently sit above the submit). The submit stays in the failed and offline states<br>• `home/ask.tsx`: the form card is `<Panel id="ask-form" …>` | §7.1, §7.4, decision 41 | D2 S2; Dev 3 Q31; D3 X13 | H1, H2 (after a no-JS POST at 390×844 the Alert, first error or confirmation heading is in the first viewport); C1; D8<br>**Status: DONE (Dev 3).** Permalink `/#ask-form`, card `Panel id="ask-form"`; the 503, couldn't-send and offline Alerts are the form's first visible child, above "Your name", with the submit kept in failed and offline (390, 1440). JS off at 390×844 and 1440×900: after the POST the URL ends `/#ask-form` and the Alert, the first error and the confirmation heading are each inside the first viewport (H1). Submit before hydration (scripts held): same (H2). |
| **FL-22** | Should-fix | Dev 3 | `home/ask-form.tsx`, `Sent`: render "Ask another question" only when `hydrated`, like the Copy buttons | §7.4 | Dev 3 Q32; D2 S4; D3 X14 | H1 (JS off: the confirmation has no button); D8 (JS on: it focuses the question and keeps contact fields)<br>**Status: DONE (Dev 3).** JS off: the confirmation has no button at all (H1). JS on: "Ask another question" focuses the question, keeps name and mobile, clears question and consent (D8). |
| **FL-23** | Nice | Dev 3 | `home/ask-form.tsx`, `Sent`: "Copy reference" becomes `Button variant="secondary" size="md"` on its own line, `mt-3`, after the "Your reference" paragraph, at every width (it was quiet and inline) | §7.4 | Dev 3 Q38; D1 V6; D3 X16 | B23, E10, H15<br>**Status: DONE (Dev 3).** Secondary `md` (grey-500 border), 44px, on its own line 12px under the reference, flush with the card's text edge at 390 and 1440 (B23); copies ("Copied", status "Copied."); clipboard blocked → reference selected, "Selected" (H15). |
| **FL-24** | Nice | Dev 3 | **Same edit as FL-20.** `ui/tool-result.tsx`: `BreakdownRow` wraps the bar as `<dd aria-hidden className="col-span-2">{bar}</dd>`, and `DivergingBar`'s root drops `col-span-2` | §4.15 | Dev 3 Q29; D3 X15 | C1 (axe `definition-list` / `dlitem`); the Nu HTML checker reports no `span` directly in a `dl` group<br>**Status: DONE (Dev 3).** Every breakdown `dl` group holds only `dt` / `dd`; the bar `dd` (`aria-hidden`) spans both columns; `DivergingBar` has no `col-span-2`. |
| **FL-25** | Nice | Dev 3 | `home/tax-estimator.tsx`: when the slab is 0, the row term is **"Tax on profit (0% slab)"** (copy, word for word); otherwise it's unchanged | §6.6.2 | D2 N4; D3 X23 | B16 (copy); J (0% row still ₹0, Appendix B); E2 (live text unchanged)<br>**Status: DONE (Dev 3).** At the 0% slab the row reads "Tax on profit (0% slab) · ₹0"; the other slabs are unchanged; Appendix B (₹1,00,000 at 0% → keep ₹1,00,000, tax ₹0) and the live text are unchanged. |

---

## Step 4: JS budget (Dev 1, then Dev 3 re-tests)

Use `vercel-react-best-practices` and `vercel-composition-patterns` here, where they agree with §4.12. The exports stay `Tabs`, `TabsList`, `Tab`, `TabsPanel` and `TabsNoScript`.

| ID | Sev | Owner | Change (exact) | Spec | Source | Verify |
|---|---|---|---|---|---|---|
| **FL-26** | Should-fix | Dev 1 | **After FL-06 and FL-07, and carrying their classes.** Rebuild `ui/tabs.tsx` without `@base-ui/react`, to the APG contract table in §4.12:<br>• `role` tablist / tab / tabpanel, `aria-selected`, `aria-controls`, `aria-labelledby`;<br>• roving `tabIndex`; ←/→ select with wrap, Home/End;<br>• `data-active` on the selected tab;<br>• panels always mounted, the inactive one `hidden` (never `inert`), `tabIndex={0}`;<br>• `starting:opacity-0 transition-opacity duration-200 ease-out`;<br>• server HTML from `value` (no CLS);<br>• `TabsNoScript` unchanged | §4.12, §9, decisions 26, 63 | D3 §2 / X8 | D3, E3, G4, H1, H5, I1<br>**Status: DONE (Dev 1).** Hand-built to the §4.12 APG table, same exports; FL-06/07 classes carried. Checked: tablist/tab/tabpanel roles, aria-selected/controls/labelledby, roving tabIndex (0/−1), data-active, ←/→ wrap + Home/End select and focus, Tab into the panel (tabIndex 0, inset ring), inactive panel hidden and never inert, CLS 0, cold /#tax selects the tab and focuses #tax-title, JS off stacks both panels. One addition: starting:opacity-0 is armed only after the first tab change, because @starting-style also fired on page load (G2: nothing moves on load); the fade on change is unchanged. Dev 3: tools-tabs.tsx needed no change (FL-30 re-test). |
| **FL-27** | Should-fix | Dev 1 | `ui/button.tsx`: `<Button>` renders a native `<button>` instead of `ButtonPrimitive`. It keeps `aria-disabled` / `aria-busy`, the click guard, the width lock (`--w`) and every class | §4.3, §9 | D3 X8 | H10 (loading state), D-series keyboard, B13, I1<br>**Status: DONE (Dev 1).** Native <button>, type defaults to "button" (as Base UI did; the submits pass type="submit"). aria-disabled/aria-busy, click guard, --w width lock and every class kept. Checked: loading width 186.33 → 186.33px, opacity 1, a click while loading does nothing; prompts/reset type=button, submit type=submit. |
| **FL-28** | Should-fix | Dev 1 | `site/brand.tsx`: `const { props } = getImageProps({ src: LOGO, alt: "", loading: "eager" })` for the header (lazy for the footer instance), then `<img {...props} className="h-10 w-auto" />`. No `next/image` `<Image>` remains | §4.19, §9 | D3 X8 | I1; I3 (LCP still the h1, ≤ 2.0s); F11; C1 (`alt=""` inside the named link)<br>**Status: DONE (Dev 1).** getImageProps(), computed once at module scope; header eager, footer lazy (<Brand loading="lazy" />). Checked: both logos plain <img> 102 × 40 with srcset and alt="" inside the named link; no next/image client component. |
| **FL-29** | Should-fix | Dev 1 | **After FL-26 and FL-27.** `package.json`: remove `@base-ui/react`. **Keep `motion`** (decision 66) | §10 | D3 X8; owner | I1: ≤ 200 KB gz total, ≤ 30 KB over the 404 page (today 215.0 / 44.3); A13<br>**Status: DONE (Dev 1).** @base-ui/react uninstalled (no importers left); motion@^14.12.0 kept. Production build (11 Nov) I1: 404 page 170.7 KB, / 201.1 KB total, ours 30.4 KB (was 215.0 / 44.3). No Base UI or motion code in any chunk. NOT within budget by 1.1 KB total / 0.4 KB ours: the largest remaining parts of our code are tailwind-merge (~7 KB gz, pulled into the client graph by cn() in client components of every owner) and next/link's client code (~3 KB, absent from the 404 baseline). Both need a spec decision (§10 keeps tailwind-merge; §4.3/§4.4 specify next/link). Raised to the coordinator. |
| **FL-30** | Should-fix | Dev 3 | **After FL-26.** Re-test `home/tools-tabs.tsx`, the what-if and the tax estimate on the hand-built tabs. Change imports only if needed | §4.12, §5.3 | D3 X8 | D3, D4, E3, G4, H1, H11 (`#what-if` / `#tax`)<br>**Status: DONE (Dev 3).** Re-tested on the hand-built Tabs at 390 and 1440; the only change was removing `tools-tabs.tsx`'s now-dead `inert={false}`. D3 (←/→ with wrap, Home/End, Tab into the panel, hash replaced); D4 (one stop per chip group, arrows select); E3 (roving tabIndex, `aria-controls` / `aria-labelledby` resolve, the hidden panel never `inert`, slider and radio names and values); G4 (no fade on load, a 200ms fade in on change, instant exit, 0px shift at the panel top); H1 (JS off: both panels stacked, noscript line, controls usable); H5 (forced colours: selected tab bar CanvasText against Canvas, checked chip outlined, slider native); H11 (`/#tax` and `/#what-if` on load; FAQ, same-hash, cross-hash and nav clicks). Appendix B values, E1/E2 live text and D9 unchanged. |

---

## Step 4b: The v1.5 rulings (11 Nov)

From `dev-questions.md`: I1 (Dev 1), Q40 and the two `web-design-guidelines` findings (Dev 2). F9, F10 and Q39 are spec-only; see the closed table.

| ID | Sev | Owner | Change (exact) | Spec | Source | Verify |
|---|---|---|---|---|---|---|
| **FL-34** | Should-fix | Dev 1 | **Drop `next/link`; every internal link is a plain `<a>`.** The four files that import it:<br>• `ui/link.tsx`: `TextLink`, `NavLink` and `FooterLink` render `<a>`; external links unchanged;<br>• `ui/button.tsx`: `ButtonLink` renders `<a className={…} {...props} />`, with `ButtonLinkProps` built on `ComponentProps<"a">`;<br>• `site/mobile-menu.tsx`: the rows are `<a>`, keeping `onClick={close}`;<br>• `site/brand.tsx`: `<a href="/#top" aria-label="Paraa Capital, home" …>`.<br>Keep `tailwind-merge`. Update the two file comments that say "next/link" | §4.3, §4.4, §4.19, §9, decision 68 | Dev 1 FL-29 / I1 | **I1 ≤ 200 / 30** (expected about 198 / 27); A25 (`rg "next/link" src` → 0); D7 (a menu link closes the menu); D11 / H11 (every nav, CTA and fact-cell jump unchanged); H1 (JS off: anchors jump natively); the logo click: see FL-35<br>**Status: DONE (Dev 1).** Every internal link is a plain <a>: TextLink, NavLink, FooterLink, ButtonLink (props on ComponentProps<"a">), the mobile-menu rows (onClick={close} kept) and the logo (href="/#top"; one eslint-disable for @next/next/no-html-link-for-pages, citing decision 68). tailwind-merge kept. I1 on a production build: / 197.9 KB, 404 170.5 KB, ours 27.4 KB (≤ 200 / 30 met). A25: the only remaining hit is the comment at home/hash-handler.tsx:198, which FL-35 (Dev 2) removes. Checked on :3000: nav, hero CTA and fact-cell jumps land on the section with its h2 focused, no ring, no reload; a menu row closes the menu and jumps (D7); the logo goes to #top with the h1 focused, no reload, typed form text kept. The preview still compiles. |
| **FL-35** | Nice | Dev 2 | **After FL-34.** `home/hash-handler.tsx`:<br>• **Verify** a logo click lands at the top with the h1 focused and no reload (it's the existing `#top` path: `scrollToTarget` + `aria-labelledby`), and that typed form text survives it;<br>• **comments:** drop "before next/link starts its own navigation" (about line 198) and the "CSS scroll-behavior, which is smooth" reason (lines 46–48 and 85–88). Keep the settle wait, which still covers late layout. **No logic change** | §5.3, §4.19 | Dev 2 Q39, Q40; D3 ruling | H11 (logo → `#top` → h1, no ring, no reload); D12<br>**Status: DONE (Dev 2).** **Verified after FL-34:** a click on the header logo (1440 and 390) or the footer logo (1440) lands at scrollY 0 on `#top` with the h1 focused and no ring (H11); no page load fires and the typed name and question survive; D12: the next Tab goes to the hero's "Ask a CA", with its ring. **Comments (after FL-36):** the "next/link" line and the two CSS smooth-scroll reasons are gone; the settle wait is kept and now described as covering the browser's own jump and late layout. No logic change. A25: `next/link` 0 hits in `src`. Re-run after FL-36: G9 (near smooth, far and RM instant), H11 / FL-19 cold loads, the 22 earlier hash checks, and G2 (a cold /#ask at 390 reaches its final position in one scroll, h2 focused): all pass. |
| **FL-36** | Should-fix | Dev 1 | `src/app/globals.css`: **remove** `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`. `@layer base` then matches §2.1 v1.5 (the comment replaces the rule) | §2.1, §3.5 | Dev 2 Q40 | **G2** (a cold `/#ask` at 390 lands without an animated scroll); A26; G9 (in-page clicks within 2 viewports still smooth, longer ones instant, RM always instant); G1<br>**Status: DONE (Dev 1).** The rule is replaced by the v1.5 comment; globals.css is byte-identical to §2.1 v1.5 and html computes scroll-behavior: auto. G2: a cold /#ask at 390 lands at its final position on the first frame (0 intermediate scroll steps), #ask at 80px, its h2 focused. G9: a near click (nav → #basket, 0.91 viewports) scrolls smoothly (27 steps); a far one (hero CTA → #ask, 6.48 viewports) is instant; with RM both are instant (G1). H1: JS off, the CTA lands on #ask. A26: no rule remains, but the literal grep still returns 1 hit, the v1.5 comment itself ("no CSS scroll-behavior"), which §2.1 mandates. A26 should exclude comments, or the comment should be reworded (raised with the coordinator). |
| **FL-37** | Nice | Dev 2 | `ui/money-path.tsx`: the connector lines become borders, not fills.<br>• vertical `h-5 w-px bg-input` → `h-5 w-0 border-l border-input`;<br>• horizontal `lg:h-px lg:w-auto lg:flex-1` with `bg-input` → `lg:h-0 lg:w-auto lg:flex-1 lg:border-l-0 lg:border-t border-input`, so the line keeps one 1px edge at every width;<br>• arrows and their `-ml-1` / `-mt-1` joins unchanged | §4.11 | Dev 2 `web-design-guidelines` finding | **H5** (emulated forced colours: the lines show as CanvasText); B17 and F12 unchanged (no position change); normal mode looks identical (screenshot at 390 and 1440)<br>**Status: DONE (Dev 2).** Both lines are 1px borders with no fill: vertical 1 × 20 (`border-l`), horizontal 1px tall (`border-t`), both grey-500 (`border-input`). H5 (emulated forced colours): every line keeps a visible 1px solid border at 390 and 1440 (they dropped out as fills). F12 at 390: path 380px, every arrow centred under its line (offset 0). B17 at 1440: nodes 56 / 56 / 56 / 56 / 66, every line on its node's middle (offset 0). Normal mode: the How-it-works section is pixel-identical to the pre-FL-37 capture at 390 and 1440 (0 pixels differ). |
| **FL-38** | Nice | Dev 2 | `ui/mock-frame.tsx`: the header strip's app name becomes `<span translate="no" …>Paraa</span>` | §4.7 | Dev 2 `web-design-guidelines` finding | B8 (the Example tag is still first in DOM); the DOM attribute is present in both mocks<br>**Status: DONE (Dev 2).** Both mocks (hero panel and band) render `<span translate="no">Paraa</span>`; B8: the Example tag is still first in DOM in each header strip (390 and 1440). |

---

## Step 5: Merge gates

| ID | Sev | Owner | Change (exact) | Spec | Source | Verify |
|---|---|---|---|---|---|---|
| **FL-31** | **Blocker** | Dev 1 | Delete `src/app/dev/` (the whole component preview). **Last of Dev 1's work**, because it's the preview for FL-05 to FL-10, FL-26 to FL-28, and (v1.5) FL-34 and FL-36. It also still imports `ButtonLink`, `FooterLink` and the others, so it must keep compiling through FL-34 | §10 | D3 A16 / X1 | A16 (client files = the §9 list), A24<br>**Status: DONE (Dev 1).** Deleted src/app/dev/ (components/page.tsx and components/demos.tsx, both untracked; then the empty folders). Nothing outside it existed only for the preview (no other file referenced it). Also removed the stale generated .next/types/validator.ts from the earlier production build, which still imported the deleted page and failed tsc; the next build regenerates it. On :3000, / → 200 and /dev/components → 404. A16: the client files are exactly ask-form, hash-handler, tax-estimator, tools-tabs, what-if, mobile-menu, scroll-state, slider and tabs (the §9 list, with tabs as marked client in §4.12). |
| **FL-32** | **Blocker** (gate) | Dev 1 runs it; it covers every owner's files | **Decision 66:** nothing in `src` imports `motion` (or `framer-motion`), and no Magic UI, Aceternity or React Bits component is added. `motion` stays in `package.json` | §1 decision 66, §10, §11 A4 / A24 / I2 | Owner, 11 Nov | A4, A24, I2<br>**Status: DONE (Dev 1).** Final run after FL-31, covering every owner's files: A4 0 hits in `src` and in `package.json` (`motion@^14.12.0` present, imported nowhere); no Magic UI / Aceternity / React Bits name or alias in `src`, `components.json` has no registries; A24 `src/components` is exactly the 39 files of §10; the last production build's chunks hold no motion code (no AnimatePresence, motion-dom, useAnimate, MotionValue or framer strings). Gates: tsc, eslint src, npm test 53/53 green. |
| **FL-33** | Should-fix (gate) | Dev 2 (page owner), with Designer 3 | After Steps 1–4b, re-measure on a production build: F7 (≤ 7,700 at 1440, ≤ **12,100** at 390), F8, F9, B17; **I1 (≤ 200 / 30, v1.5)** and G2; re-run axe (C1, C3) and Lighthouse (I3, median of 3). Report the numbers in the PR | §5.1, §9, §11 | All three reviews; v1.5 | F7, F8, F9, B17, I1, G2, C1, C3, I3 |

---

## Counts

| Owner | Blocker | Should-fix | Nice | Total |
|---|---|---|---|---|
| Dev 1 | 2 (FL-31, FL-32) | 12 (FL-01, 02, 03, 05, 06, 08, 26, 27, 28, 29, **34, 36**) | 4 (FL-04, 07, 09, 10) | 18 |
| Dev 2 | 0 | 5 (FL-11, 12, 13, 14, 33) | 8 (FL-15, 16, 17, 18, 19, **35, 37, 38**) | 13 |
| Dev 3 | 0 | 4 (FL-20, 21, 22, 30) | 3 (FL-23, 24, 25) | 7 |
| **Total** | **2** | **21** | **15** | **38** |

**Open after the v1.5 rulings** (everything else is reported done, or verified by Dev 3):
- **Dev 1:** FL-34, FL-36, then the gates FL-31 and FL-32.
- **Dev 2:** FL-35, FL-37, FL-38, then the gate FL-33.
- **Dev 3:** none (only the FL-34 spot check).

---

## Closed, decided or not adopted (no work)

| Source item | Outcome |
|---|---|
| D1 §B G1 "the ask" (gold hero and submit buttons); D2 V4 gold CTA; OQ-1 | **Closed by the owner (decision 64): main buttons stay ink, no gold button.** The `brand` button variant is removed from §4.3 |
| D2 S5 alternative (amend decision 53 to "one step down") | Not needed: the owner adopted S5 and raised the 390 budget to 12,100 (decision 65) → FL-13 |
| D1 V3 / Dev F5 (70px end node) | Spec only: B17 reworded in v1.3. No code |
| D2 N5 (three buttons in the failed state) | Not adopted: the submit stays (Dev 3 Q31 answer) |
| D2 N6 (`-ml-4` on Copy reference) | Superseded by FL-23 |
| D2 N7 (last path label 14px lower at ≥ 1024) | Accepted as is: a consequence of the 3-line end node, covered by B17's wording |
| D2 V1 (gold never marks state) | In the spec (§3.1 "Never gold", B6, A23). Code is covered by FL-11 and FL-12 |
| D1 / D2 Q26 (readout ink) | No change: kept ink (v1.3) |
| D1 "gold logo faint on white" | Owner decision 52; the swap point in `brand.tsx` stays ready for an ink-wordmark lockup |
| Dev 2 F3–F5, Q19–Q24; Dev 3 F6, F7, Q25, Q27, Q28, Q30, Q33–Q37 | Accepted as built (`dev-questions.md`); spec text only |
| OQ-2 (typography board) | Open with the owner. `type-label` stays 600; no dev work until the board arrives |
| Dev 2 F9 (hero columns 456, not 464) | **The spec was wrong:** §6.2 now says 456 / 456 (v1.5). The layout stays as built |
| Dev 2 F10 ("Your bank / account" at ≥ 1024) | **Accepted:** B30 now targets only nodes and labels of four or more words (v1.5). The copy and the step width stay |
| Dev 2 Q39 (`"instant"`, not `"auto"`) | **Confirmed** as built; §5.3 and FL-18 updated (v1.5) |
| I1: drop `tailwind-merge` from client components | **Not adopted** (decision 68): it resolves real class overrides. The I1 gap is closed by FL-34 instead |
| I1: move the JS budget to the measured value | **Not needed** if FL-34 meets 200 / 30. If it doesn't, the budget moves to the measured value, with that measurement as its reason |
| Not run yet by anyone: C1 "failed" (502) state with axe; I7 (INP while dragging); A20 test-URL half; E-series with real screen readers; F10 / G7 on a real Android phone | Designer 3 and the devs run these in FL-33 or before launch. They aren't code changes |
