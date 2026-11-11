# Paraa homepage: the design spec developers build from

**Version 1.5, 11 Nov 2026. In development.** Branch `feat/trust-redesign`. Merged by D3 from `d1-visual.md`, `d2-ux.md`, `d3-system.md` and the three Round B reviews, under the owner's decisions of 10 Nov 2026. Updated with:
- the Round D reference review (`reference-notes.md`, D1; `reference-review-d2.md`, D2);
- the owner's **brand board** (`brand-board.md`, 11 Nov, binding);
- the joint design/dev review (`joint-review-d1.md`, `-d2.md`, `-d3.md`);
- **the owner's decisions of 11 Nov 2026** (decisions 64–67).

**Developers work from `fix-list.md`**, the consolidated, ordered list of every open change, which points back into this spec.

**Changelog**

| Version | Change |
|---|---|
| 1.5 (11 Nov 2026) | See the list below the table |
| 1.4 (11 Nov 2026) | See the list below the table |
| 1.3 (11 Nov 2026) | See the list below the table |
| 1.2 (10 Nov 2026) | See the list below the table |
| 1.1 (10 Nov 2026) | See the list below the table |
| 1.0 (10 Nov 2026) | First merged spec |

**1.5 (11 Nov 2026). Rulings on the fix-list round** (`dev-questions.md`: Dev 2 F9, F10, Q39, Q40 and the two `web-design-guidelines` findings; Dev 1's I1 and recorded changes).
- **Decision 68: no `next/link`.** Every internal link is a plain `<a>`, because `HashHandler` already owns in-page navigation. The logo links to `/#top` (§4.3, §4.4, §4.19, §9). `tailwind-merge` stays. The JS budget stays at 200 / 30 (I1, new A25).
- **No CSS smooth scroll:** the `html { scroll-behavior: smooth }` rule is removed (§2.1, §3.5). Smooth scrolling comes only from `HashHandler`'s explicit `"smooth"`; long jumps use `"instant"`, not `"auto"` (§5.3).
- **Corrections to match the build:**
  - the hero columns at 1024 are **456 / 456** (§6.2, §3.3);
  - B30 allows a three-word node to break 2 + 1 (§4.11);
  - the end node measures 66px.
- **Nice-to-haves:**
  - money-path connector lines drawn as borders, so they survive forced colours (§4.11, H5);
  - `translate="no"` on the mock's "Paraa" (§4.7).
- **Recorded from the build:**
  - the tab fade is armed only after the first tab change (§4.12);
  - `<Button>` defaults to `type="button"` (§4.3);
  - the pre-hydration value sync in `Slider` and `ChoiceChips` (§4.13, §4.14).

**1.4 (11 Nov 2026). The owner's decisions of 11 Nov (binding), plus the joint review's nice-to-haves.**
- **Decision 64: main buttons stay ink (OQ-1 closed).** No gold button. The `brand` button variant is removed from §4.3 and gold stays where v1.3 put it (§3.1, B6, A23, §12, Appendix A).
- **Decision 65: fact-cell limits take their claim's size and weight** (D2 S5). The second sentence is 16/26 600 (§4.9). **The 390 page budget rises to 12,100** (decision 56, §5.1, F7). The first view at 390 is unchanged; at 360, cell 1 is in full (§6.2).
- **Decision 66: tools installed, not used.** `motion@14.12.0` is back in `package.json` (§10), and the Magic UI, Aceternity and React Bits registries are available. Nothing in `src` may import them (A4, new A24). Using any of them needs a spec change.
- **Decision 67: design and dev skills.** Five skills are installed. Project rules override them, and Taste Skill's house rules don't apply (the note under "This is the only document").
- **Nice-to-haves adopted from the joint review:**
  - oil column aligned to its segment (§6.3, D1 V4);
  - two-line chips `px-3` below 640, once verified (§4.13, D1 V5);
  - the mask "••" with `normal-nums` (§4.7, D2 N3);
  - balanced money-path nodes and an unbroken FAQ link (§4.11, §6.7, D2 N8);
  - short smooth scrolls only, and cold-load focus for every section hash (§3.5, §5.3, D2 N1, N9);
  - the tab panel ring drawn inset (§4.12, D2 N10);
  - "Tax on profit (0% slab)" at the 0% slab (§6.6.2, D2 N4).
- **QA:** A4, A23, B6 and F7 updated; new A24, B28–B30 and G9.

**1.3 (11 Nov 2026).**
- **Brand board (owner, binding)**, §2.1, §3.1, §3.2 and Appendix A:
  - exact board primitives (Primary, Secondary and Light ramps, Additional 400–900, alerts, greyscale);
  - **Light `#F2F2F2`** is the alternate surface, the quiet fill and the hover fill;
  - a `.theme-alt` scope steps hairlines up to grey-300 on Light;
  - the placeholder role moves to grey-600;
  - **Secondary gold gets a real secondary role**: decision 13 is replaced by decision 58, and buttons are decision 59 / OQ-1;
  - **headings Bold 700**, with FAQ questions kept at 600 (`type-question`);
  - `--success` and `--warning` tokens.
- **Dev answers** (`dev-questions.md` F3–F8, Q19–Q38):
  - `ArrowDown` (§3.6);
  - hero line placement and `sm:max-w-[600px]` (§6.2);
  - `FactCellData.second: ReactNode` (§4.9);
  - §4.12 no-JS snippet and `inert={false}`;
  - A9 `transform`;
  - the readout stays ink (§4.15);
  - the breakdown bar as a `dd`;
  - the tax gaps (§6.6.2);
  - "Ask another question" only after hydration, and "Copy reference" as a secondary button (§7.4).
- **Joint review**:
  - zero tick hidden within 32px (§4.14, G8);
  - hero 6/6 at 1024–1279 (§6.2);
  - the forced-colours tab border (§4.12);
  - the form outcome at the top of the card and permalink `/#ask-form` (§7.1, §7.4);
  - the footer link width (§4.4);
  - `abbr` without underline.
- **Budgets:** the JS budget is re-based on measurement (§9, decision 63: 200 KB total, 30 KB ours). It's met by hand-built Tabs, a native `<button>` and a `getImageProps` logo (should-fix).
- **QA:** checks updated (A2, A9, B2, B5, B6, B10, B17, B23, C4, G8, H2, H5, I1); new checks A22, A23, B26 and B27.
- **Owner questions:** OQ-1 (gold buttons) and OQ-2 (typography board), in §12.

**1.2 (10 Nov 2026).** Answers to Dev 1's questions (`dev-questions.md` F1–F2, Q1–Q18, O1); all backward-compatible with the foundation as built.
- **Defects fixed:**
  - §2.1's base border rule reads `var(--border)`, so band hairlines are ink-600 (F1);
  - A5 is split into two greps (F2).
- **Clarified to match the build:**
  - `min-h` button heights, `cursor-pointer`, the loading button isn't dimmed, `<Button>` only in client components (§4.3);
  - external standalone links use only `ArrowUpRight`, which is 14px (§3.6, §4.4, B9);
  - `max-[22.5rem]:` stacking (§4.8, A2);
  - the legend/helper gap (§4.13);
  - the zero tick before measurement (§4.14);
  - `scroll-mt` scope (§4.15);
  - Alert info text colours (§4.17);
  - FAQ icon colour (§4.18);
  - header `relative`, `Image preload` (§4.19);
  - `Disclosure as` and `ctx` (§4.21).
- **One code change:** `h-full` on `<html>` (§2.2).

**1.1 (10 Nov 2026).** All 24 reference-build findings (N1–N24) and all 17 walk-through items (B1–B2, S1–S8, N-a–N-g) resolved; verdicts in §1.1.
- **Honesty:**
  - the hero withdrawal cell gains "after your investment matures" (`withdraw-cell-v1`);
  - the sticky readouts say "Example result" / "Estimate".
- **Order:** the facts row is reordered so the risk cell is in the 390 first view.
- **Layout fixes:**
  - money path (`items-start`, ratios, centred lines, compact vertical form);
  - the result column fills the card, with a sticky inner wrapper;
  - breakdown rows as a grid;
  - band group 3 as a split with a full-width rule;
  - steps aligned with subgrid;
  - "What you own" rule full width;
  - amount chips 2 × 2 on phones;
  - one-column contact fields;
  - no negative margins for rhythm;
  - stated gaps.
- **Form:**
  - no submit or prompts in the 503 state;
  - prompts aligned and relabelled;
  - sent icon on the left;
  - "Copy reference".
- **Other:**
  - no ring on programmatically focused headings;
  - the mobile menu loses its duplicate CTA;
  - the scam guidance ends with a next step;
  - "sign up" wording removed;
  - the tax slider's zero tick is hidden near the thumb;
  - the header width arithmetic is corrected.
- **Budgets:** 7,700 at 1440, 12,000 at 390, band 1,250, and a rule that no budget is met by cutting a limit, a disclosure or slider precision.
- **New:** optional `APP_URL` slot ("Get the app").
- **QA checks added:** A19–A21, B17–B25, D12, E9–E10, F12–F15, G8, H13–H15, K11–K14.

**This is the only document to build from.**
- It overrides the three drafts, the reviews, `audit-2026-11-10.md` §Phase 2 and `build-brief.md` wherever they differ.
- **The owner's brand board** (`brand-board.md`, 11 Nov 2026) is binding and overrides any earlier decision here. v1.3 applies it (decisions 58–62).
- **Skills (v1.4, decision 67).** Design and development use these installed skills:
  - Anthropic `frontend-design`;
  - `design-taste-frontend` (Taste Skill);
  - `vercel-react-best-practices`;
  - `vercel-composition-patterns`;
  - `web-design-guidelines`.

  **Project rules win every conflict**, in this order: `brand-board.md`, `content-rules.md` (R1–R15), then this spec. A skill's advice is used only where it doesn't contradict them.
  - **Taste Skill's house rules don't apply here:** no dealt palettes (the palette is the board's), no rule against captions (every mock keeps its caption, decision 5, B8), no stock photographs (the page uses none), and no rule against register numbers (the FIU-IND number appears once supplied, §12).
  - Its "hero entrance and dealt moments" also conflict with decision 25 and §3.5 (nothing moves on load, no reveals).
- **Installed tools (v1.4, decision 66).** `motion` and the Magic UI, Aceternity and React Bits shadcn registries are installed **but not used**. Nothing in `src` imports them (QA A4, A24), and using any of them is a spec change first.
- `content-rules.md` §0.3 (R1–R15) still binds the copy.
- Where a draft left something open, this spec decides it, and the decision log says **"Decided here"**.

**Conventions**
- **Must** means review fails without it. There are no "should"s: every item is required unless it is marked optional.
- Sizes are in px at a 16px root. Code uses rem (px ÷ 16).
- Class names are Tailwind 4 utilities backed by the tokens in §2. A class that isn't a token (for example `text-blue-500`) doesn't exist, because the tokens reset Tailwind's defaults.
- Widths **320 / 390 / 768 / 1024 / 1440** mean the viewport. The content widths at those viewports are **288 / 358 / 720 / 976 / 1152**.
- **Copy** in `"quotes"` or in tables marked *copy* is final, **word for word**, including punctuation. `{X}` is a value filled in by code. Use typographic apostrophes (’) and U+2212 (−) for minus.
- **No-JS** means the server HTML before or without hydration. **RM** means `prefers-reduced-motion: reduce`.

---

## 0. Contents

1. Decision log
2. Tokens (code-ready CSS) and `layout.tsx`
3. Foundations: colour, type, spacing and grid, shape, motion, icons, layers
4. Component inventory
5. Page order, surfaces, navigation and anchors
6. Sections, one by one: layout, copy, interactions, no-JS and RM
7. The question form: flow and every state
8. Accessibility requirements
9. Performance budgets
10. File plan and dependencies
11. QA checklist
12. Launch blockers (owner facts only)
- Appendix A: contrast table
- Appendix B: reference values for the tools

---

## 1. Decision log

**Owner** = the owner's decisions of 10 Nov 2026. **D1 / D2 / D3** = the designer whose position won. **Decided here** = no draft settled it, or the drafts crossed (two designers swapped positions in review), so the merge decided it on the reason given.

| # | Topic | Decision | Reason (one line) | By |
|---|---|---|---|---|
| 1 | Page tone | Light page, exactly one ink band (security) | Owner decision 9 | Owner |
| 2 | Section order | Hero → Basket → How it works → **Security (ink)** → Run the numbers → FAQ → Ask a CA → Footer | Doubt order (scam fear first, in 4 of 5 research tracks); tools → FAQ → form run straight into the form; band at about 40% of the page. After walking the reference build, D2 withdrew its preference for 5th | All three (v1.1) |
| 3 | Hero panel | **One still screen**, a Server Component, no tabs | Owner's "static hero"; three tabbed flows would repeat How it works and the band's withdraw example (audit T8). D1, D2 and D3 all landed here | D1 |
| 4 | Panel shape | Wide, web-shaped window at ≥ 1024; full content width below | Owner decision 4: the app is on phone and web | Owner |
| 5 | Panel content | No percentages, bar, chart, value, return, price figure or date. Rows only: Add money · Units bought at · Price · Withdraw to, plus a maturity note | Round-11 rule "no percentages or charts in mocks"; the app's own demo mix differs (content audit Q4) | D2 + D3 |
| 6 | Facts strip | Not a separate section. A **hero facts row** of four cells | The strip would repeat the band (audit T4). Each cell links to its proof | D1 + D2 |
| 7 | Facts row content and order | 1 Registered with FIU-IND · **2 You can lose money** · 3 Withdrawals go only to you (with "after your investment matures") · 4 We never ask for your OTP or PIN | Owner decision 1 (risk line, same weight); FIU as a cell, so the first view says it once; order chosen so the downside is in the 390 first view (R8, v1.1 S1); the withdrawal cell carries its maturity limit (v1.1 B1) | Owner + D2 (v1.1) |
| 8 | Risk lines elsewhere | **Only** the hero cell. No "Can I lose money?" FAQ item, no "all three can fall" in the basket lede, no risk sentence in the meta description | Owner decision 1: "this one line only"; round 16 stands for the rest | Owner |
| 9 | CTA label | **"Ask a CA"** everywhere, one label, never swapped by width | Owner decision 2 (CAs read the questions); measured: it fits 320 with 37px to spare | Owner |
| 10 | Header CTA style | **Secondary (outline)**. The section's filled button is the one primary in view | D1 and D2 both reviewed back to this; avoids two identical ink buttons in the hero view (`primary-action`) | D1 + D2 + D3 |
| 11 | Hero secondary action | **None.** Cells 1–3 link to the band; the helper line stays | A fourth link to the same place is redundant | D1 |
| 12 | What-if default | **"All three fall"**: ₹1,00,000 → ₹74,100, −25.9%. Scenario named beside the figure, inside the result frame | Owner decision 3 | Owner |
| 13 | Gold | **Replaced in v1.3 by decision 58** (the owner's brand board gives gold a real secondary role). Still true: gold is never state (nav marker, thumb, tabs, chips, focus) and never text on light | Gold is 1.64:1 on white and 1.47:1 on Light | Owner board (v1.3) |
| 14 | Near-black | **Ink `#272A33`** for headings, figures, rules, primary buttons. grey-900 isn't used | One near-black, not two side by side | D1 |
| 15 | Text greys | Body **grey-700**, secondary **grey-600**, **no grey-500 text at all** (v1.3: the `placeholder` role, which colours the `+91` adornment, moves to grey-600, because a read-only field is Light and grey-500 is 4.25:1 there). The `faint` role is deleted | ≥ 6.7:1 on every surface; removes a role with more exceptions than jobs | D1 + D2; v1.3 D3 |
| 16 | Gold text | **None.** The `brand-text` role is deleted | A role with no job finds the wrong one | D1 |
| 17 | Type scale | D3's scale: display 32 / 36 / 44 / 48; title 30 / 36 / 40; heading 20 → 24 at ≥ 1024; subhead 18; figure 32 → 40; body 18 / 16 / 14; label 12 caps. **Weights: decision 61** | D1 reviewed to D3's; 7 sizes at 1440. D3's Round-B concession to D1's scale is withdrawn | Decided here (D1 + D3) |
| 18 | Breakpoints | sm 640 (layout), md 768 (type and section rhythm), lg 1024 (two-part layouts, desktop nav) | Matches the type scale above | D3 |
| 19 | Section padding | 64 (< 768) / 96 (≥ 768) | Two steps; page-length budget | D3 (D1 agrees) |
| 20 | Hero grid | 5 / 7 with a 64px gap **from 1280**; **6 / 6 at 1024–1279** (v1.3) | D1 reviewed to it; D2 agrees. v1.3 (D1 joint review V2): at 1024 the 380px copy column broke the h1 over 4 lines; 6 / 6 gives 3 lines at the same hero height | Decided here; v1.3 D1 |
| 21 | Focus ring | **2px** solid, 2px offset: ink on light, white in the band. **No ring** on non-interactive elements focused by script (`[tabindex="-1"]`: headings, `main`, alerts) | 2 of 3 drafts; a 2px perimeter meets WCAG 2.4.13 (AAA); 2.4.7 covers operable components, and a box around a heading reads as an error (v1.1 N24 / S7c) | D1 + D2 |
| 22 | Radius | 4 tags, swatches, checkbox · 8 controls · 12 panels · 16 the mock frame. No pills. The slider thumb is the only circular shape | All three agree | All |
| 23 | Example tag | "Example", **14px / 600**, 4px radius, inside the frame, first in DOM | Honesty labels are ≥ 14px | D3 (D1 agrees) |
| 24 | Shadow | One token, `shadow-panel`: hero mock frame and the open mobile menu only. The menu panel has no CTA of its own (the header's "Ask a CA" stays visible) | `elevation-consistent`; the same action twice on one screen (v1.1 N13) | All |
| 25 | Scroll reveals | **None.** Delete `reveal.tsx`, `reveal-controller.tsx` and their CSS | 0 reveals at the institutional references; a generated-site tell | All |
| 26 | Tools switcher | **Underline Tabs**, equal halves below 640, no sliding indicator. Built on Base UI Tabs; **v1.3: rebuilt by hand without Base UI** (§4.12, §9; should-fix) | One component; a server-rendered border marker survives forced colours. D3's segmented concession is withdrawn. v1.3: Base UI is 13 KB gz of the 44 KB app JS for two tabs, and its `inert` default fights decision 28 | Decided here (D1 + D3); v1.3 D3 |
| 27 | Tab 1 label | "Markets and the rupee" (wraps to 2 lines at 320, allowed) | Names the half of the tool R2 is about | D2 |
| 28 | Tools with JS off | **Both panels stacked**, each under its own h3, tablist hidden, through a `<noscript>` style | No CLS for JS users (the style only applies with JS off); all honesty text reachable | Decided here (fixes D2's CLS concern) |
| 29 | Chips | **Native radio groups** (amount, scenario, slab); no check icon | Single choice is a radio; an icon would reflow chips on every tap | D3 (D1 + D2 agree) |
| 30 | Slider | Native `<input type="range">`, 1:1 tracking. **White thumb, 2px ink border.** Ink fill, grey-300 track | Audit F2; WCAG 1.4.11; gold isn't state | D3 (D1 + D2 agree) |
| 31 | Gain/loss colour | **Ink both directions**; the side of the zero line shows the sign, and text carries the value | Proposal §4: red/green for form feedback only | D3 (D1 + D2 agree) |
| 32 | Mobile result readout | Sticky **under the header**, inside the tool's box, **48px**, < 1024 and screens ≥ 600px tall only. Text starts **"Example result:"** (what-if) or **"Estimate:"** (tax) | A bottom dock sits under the dragging hand; 48px keeps the chrome at 13% of 844px; a stuck figure must carry its label (K9, v1.1 B2) | D3 placement, D1 height, D2 label |
| 33 | Typed tax amount | **Not built**; slider + keys + track click only | D2 withdrew it; 2.5.7 is already met | D2 |
| 34 | Spot a fake | **A two-column list of pairs** (scam line → "Not Paraa." + the truth), D2's three scam lines, no message cards, no "From Paraa" mock | Text first, no fraud-shaped mocks, no invented official message | D1 + D2 |
| 35 | 1930 / cybercrime.gov.in line | **Built, off by default** behind `SHOW_CYBERCRIME_HELPLINE = false` in `src/lib/links.ts` | Public facts, but compliance hasn't approved them; absent, not a placeholder | Decided here |
| 36 | Registration in the band | Row D: h3 + one paragraph with the limit in it; number line only when `FIU_REG_NO` is set | Owner decision 5; D2's merged row | Owner + D2 |
| 37 | Money path | **Kept** in How it works as a semantic `<ol>`, plus the "no shortcut back" limit under it | Best device for the withdraw-only-after-maturity rule (D1 + D2). D3's "defer" is withdrawn | D1 + D2 |
| 38 | Basket facts list with icons | **Dropped** | Repeats the lede and the steps; icon-row template | D1 |
| 39 | "Tokenized" tag | **Dropped**; "Tokens (digital units)" stays in the sentence | An unexplained label next to a crypto line in the footer | D2 (D1 agrees) |
| 40 | FAQ | 9 items, native `<details>`, plus/minus icon, heading not sticky, answers 16px grey-700. **"When can I get my money out?" is first and open**; "Is Paraa registered…" second, closed | One size per job; liquidity is the top unanswered doubt, and the registration answer already sits in full in the band (v1.1 N-d) | D1 + D2 + D3 |
| 41 | Form transport | **One Server Action** (`useActionState` with permalink **`/#ask-form`**, v1.3; was `/#ask`) for JS and pre-hydration submits. The API route stays, with an unchanged contract. Both call one shared `forwardAdvisorRequest()` | Pre-hydration taps on slow 3G are the real no-JS case (D2); one path, not two | Decided here (D2 + D3) |
| 42 | No-JS form fallback | If QA H1 fails for the action path: a `<noscript>` line above the submit, and the JS path stays | Never a silent failure | D2 + D3 |
| 43 | Error summary | **None.** Focus the first invalid field | Five fields; skill `focus-management` allows it | D2 + D3 |
| 44 | Validation timing | On blur for **filled** fields from the start; live once an error shows; on submit all fields | `inline-validation`; nothing turns red from tabbing | D2 |
| 45 | While sending | Fields `readOnly`; submit `aria-disabled` + "Sending…"; "Still sending" line after 6s; no client timeout (the server caps upstream at 8s) | An edit made while sending would be silently lost | D2 + Decided here |
| 46 | 503 `not_configured` | Its own copy, **no retry**, a "Copy my question" button. The submit and the prompts aren't rendered in this state | Owner decision 7; a live Send under "we can't take questions" invites a useless tap (v1.1 S2) | Owner + D2 |
| 47 | Privacy line | A factual line about what the form sends and the number's use; no "only", no policy claims | Owner decision 8 | Owner |
| 48 | Question prompts | 4 quiet buttons with a leading `Plus` icon, one per line, that insert text | Turns unpublished facts into an action without looking like selection chips | D2 content, D1 form |
| 49 | Character counter | Shown from 800 characters | Noise for most people otherwise | D1 |
| 50 | Header | 64px at every width, `sticky` on screens ≥ 600px tall, solid white, hairline appears after scroll (sentinel; always shown with JS off) | One token; no scroll listener | D1 + D3 |
| 51 | Nav | "The basket · How it works · Security · Calculators · FAQ" + "Ask a CA" | Page order; "Calculators" is the scanned word; the tools lede says "Two calculators…" so the word lands | D2 + Decided here (lede bridge) |
| 52 | Logo | Current gold PNG at 40px tall; one swap point in `brand.tsx` | Owner decision 6 | Owner |
| 53 | Disclosures | All disclaimer and limit text from one registry, `src/content/disclosures.tsx` (R15). A limit takes the size of the claim it qualifies (v1.4: **and its weight**, decision 65; the fact cells now obey it) | R15; R8 equal weight | D3 + D2; Owner (v1.4) |
| 54 | Hero h1 | "One basket that follows US stocks, gold and crude oil" | Content audit Q7: "bought in rupees" stays off | D2 |
| 55 | Tab and hash behaviour | `#what-if` and `#tax` select the tab; `#faq-<slug>` opens the item; old `#tour` → top, `#trust` → `#security` | Shared links don't break | D2 |
| 56 | Page-length budgets | ≤ **7,700** at 1440, ≤ **12,100** at 390 (v1.4, decision 65; was 12,000); ink band ≤ **1,250** at 1440, ≤ 2,000 at 390. **A budget is never met by cutting a limit, a disclosure or slider precision** | What fills the page is honesty and tool content; 7,700 is still under the research's 8,000 "short page" bar (v1.1 N14a, N6) | D1 + D2 |
| 57 | App link | Optional **`APP_URL`** slot: `null` renders nothing and reserves no space; when set, a "Get the app" link appears after the How-it-works off-ramp and in the footer links | A convinced visitor needs a way to start once the owner supplies a listing; no change while absent (v1.1, D2 owner question) | Decided here |
| 58 | **Gold (v1.3; confirmed by the owner in decision 64)** | **Secondary gold is a fill with ink on it, used where it carries meaning:**<br>**G1** your money's start and end: the money path's two end nodes;<br>**G2** the verdict: "Not Paraa." as a gold tag in the band;<br>**G3** identity and data (unchanged): the logo, and the gold sleeve;<br>**G4** the text-selection tint (Secondary-6).<br>Never text or an icon on white or Light. Never a state (selected, checked, current, focus, slider). Never on a figure, result, readout, honesty line, fact cell or section background. ≤ 3 gold uses per screen, the logo included | Owner board: gold returns as a real secondary colour. Ink on gold is 8.72:1, while gold as a line on light is 1.64 / 1.47:1, so gold works only as a fill. D1 proposed G1–G3 and D2 set the "never" list; both measured in their joint reviews | Owner board + D1 + D2 (v1.3) |
| 59 | **Gold buttons (v1.3)** | **Closed by decision 64 (v1.4): no gold buttons.** Main buttons stay ink; the header CTA stays outline | The owner's own answer (`build-brief.md`, "Main buttons = Primary #272A33 (white label), gold #FDC037 = secondary") conflicts with D1's proposal of gold hero and submit buttons. The spec keeps the owner's words until the owner chooses. Either option is a one-variant, two-prop change (§4.3) | Decided here (D3); closed by the owner in decision 64 |
| 60 | **Light surface (v1.3)** | `#F2F2F2` is the alternate section surface, the result inset, the read-only field fill, and the quiet fill and hover on white. On Light sections hairlines step up to grey-300 (`.theme-alt`). Cards stay white with their 1px border. Inputs stay white. A read-only field turns Light, so the `+91` adornment uses the grey-600 placeholder role (6.77:1 there) | Owner board item 1. grey-200 on Light is 1.10:1 (it vanishes) and grey-300 is 1.33:1. One neutral family instead of cool grey-50/100 next to a neutral grey | Owner board + D1 + D2 (v1.3) |
| 61 | **Weights (v1.3)** | **Headings Bold 700:** `type-display`, `type-title`, `type-heading`, `type-subhead`, `type-figure`. **600** for UI emphasis: buttons, nav, chips, labels, row values, fact-cell first sentences, `type-label`, and the FAQ questions (`type-question`). **400** for body | Owner board item 4. D1 and D2 both keep FAQ questions at 600 (nine bold 18px lines read heavy). Semibold is a design-file weight. Measured on :3001: 700 changes no line breaks and no page height | Owner board + D1 + D2 (v1.3) |
| 62 | **Success / warning (v1.3)** | Tokens `--success` `#10B981` and `--warning` `#FACC15`. Fills, icons and borders only, with ink on them (5.65 / 9.36:1). Never text on light (2.54 / 1.53:1). **No class until a component needs one** (a spec change) | Owner board item 5. No state on this page needs green or yellow; an unused class invites misuse | Owner board + D1 (v1.3) |
| 63 | **JS budget (v1.3)** | ≤ **200 KB** gz First Load JS for `/`, of which ≤ **30 KB** gz is ours (above the empty 404 page). Measured 215.0 / 44.3. Met by hand-built Tabs, a native `<button>` and a no-JS logo (§9) | The 140 KB budget sat below the framework floor (Next 16 + React 19 = 170.7 KB gz, measured on the 404 page). Lighthouse mobile already scores 99 (§11 I3), so this is should-fix, not a blocker | Decided here (D3, v1.3) |
| 64 | **Main buttons (v1.4, closes OQ-1)** | **Main buttons are ink (Primary `#272A33`, white label), as round 2 decided. No button is gold**, and none gets a gold variant. Gold appears only where decision 58 puts it: the money-path end nodes, the "Not Paraa." tags, the logo and the gold sleeve | Owner, 11 Nov: "Round 2's rule stands" | Owner |
| 65 | **Fact-cell limits (v1.4, D2 S5)** | Each fact cell's second sentence (the limit) is set **at the same size and weight as its claim**: 16/26, 600. The colour stays one step lighter (`text-copy`, grey-700, 10.35:1), so the claim still reads first. **The 390 page budget rises to 12,100px** | Owner, 11 Nov. R8 / decision 53: a limit is never smaller than its claim. Measured with the v1.3 tokens: 390 → 12,012 (88 spare); 1440 → 7,683 (17 spare); 390 first view still holds cells 1–2 in full (cell 2 ends at y = 745) | Owner |
| 66 | **Installed tools (v1.4)** | `motion@14.12.0` stays in `package.json` dependencies, and the Magic UI, Aceternity and React Bits registries are available. **None is used: nothing in `src` imports `motion`, and no component from those registries is added.** Any use needs a spec change first (a new decision, with its motion, a11y, RM and JS-budget cost). Decision 25 (no reveals) and §3.5 (banned motion) are unchanged | Owner, 11 Nov: "install only, don't use yet" | Owner |
| 67 | **Skills (v1.4)** | `frontend-design`, `design-taste-frontend`, `vercel-react-best-practices`, `vercel-composition-patterns` and `web-design-guidelines` are used in design and development. **`brand-board.md`, `content-rules.md` and this spec override any skill rule that conflicts.** Taste Skill's house rules (dealt palettes, no captions, stock photos, no register numbers) don't apply | Owner, 11 Nov | Owner |
| 68 | **Links (v1.5)** | **No `next/link`.** `TextLink`, `NavLink`, `FooterLink`, `ButtonLink`, the mobile menu rows and the logo render a plain `<a>`. The logo's `href` is **`/#top`**. `tailwind-merge` stays in `cn()`. The JS budget (decision 63) is unchanged | After FL-26 to FL-29 the build was 201.1 / 30.4 KB against 200 / 30. next/link's client code (about 3 KB) did nothing here: every internal link is an in-page anchor that `HashHandler` takes over (FL-18), JS-off anchors work natively, and there's no second route. `/#top` keeps the logo from reloading `/`, which would lose typed form text. `tailwind-merge` (about 7 KB) resolves real class overrides (the prompt buttons over the Button base), so dropping it would trade correctness for bytes. If a second route ships, next/link returns with a budget re-check | Decided here (D3, v1.5) |

### 1.1 Round D: reference-review resolutions

Every item from `reference-notes.md` (D1, "N") and `reference-review-d2.md` (D2, "B", "S", "N-"). **Accept** = applied as proposed; **Modify** = applied with the change stated; **Reject** = not applied.

| Item | Verdict | Where in this spec | Reason (one line) |
|---|---|---|---|
| N1 money-path nodes stretch | **Accept** | §4.11 | `items-start` stops every node stretching to its connector's height |
| N2 compact vertical path | **Accept** (core); **Reject** the optional 2-column path at 640–1023 | §4.11 | Saves 132px at 390; a second layout variant at 768 isn't worth it with no budget there |
| N3 connector ratio, centred lines | **Accept** | §4.11 | Lines meet the node's middle; labels stay ≤ 2 lines |
| N4 result fill stops short | **Accept** | §4.15 | Column stretches; inner wrapper is sticky |
| N5 breakdown rows read as one grey paragraph | **Accept** | §4.15, §6.6.1 | Sleeve name in ink 600 so a row can be scanned |
| N6 band over budget, short rule | **Accept** (a) and (b); band budget 1,250 instead of tightening rows | §6.5, decision 56 | The band is the one place not to compress (D2) |
| N7 "What you own" rule | **Accept** | §6.3 | Rule full width; max width on the text only |
| N8 step rows misaligned | **Accept** | §6.4 | Subgrid aligns labels, titles and bodies |
| N9 lone "₹10 lakh" chip | **Accept** | §4.13, §6.6.1 | 2 × 2 grid below 640 |
| N10 name/mobile misaligned | **Modify:** take D1's alternative (one column at every width), not the helper move | §6.8, §7.2 | The hint must come before the input (audit T3, D2 S6); single column also removes the misalignment |
| N11 prompts indented | **Accept** | §4.16 | `-mx-4` lines the icons up with the labels |
| N12 sent icon centred | **Accept** (icon left) | §7.4 | Matches every other block in the card |
| N13 duplicate CTA with menu open | **Accept** (drop the menu's CTA) | §4.19 | The header's button stays visible |
| N14 page over budget | **Accept (a)** new budgets; **Reject (b)** two-column sliders | decision 56 | (b) halves the track on a money tool (about 2px per step) |
| N15 panel size, title echoes h1 | **Accept** the size note; **Reject** "Your basket" | §6.2, §12 | "Your basket" implies a real account beside a caption that says it isn't one; the real basket name is an owner question |
| N17 negative margin collapse | **Accept** | §3.3, §6.6.2 | No negative margins for rhythm |
| N18 tools gap ambiguity | **Accept** | §6.6 | The 24px comes from `Tabs.Panel pt-6` only |
| N18b breakdown row layout | **Accept** | §4.15 | Rows are a grid; the bar spans both columns |
| N19 hero facts → panel gap | **Accept** | §6.2 | `mt-12` below 1024 |
| N20 footer brand → links gap | **Accept** | §6.9 | `gap-y-10` below 1024 |
| N21 vertical arrow position | **Accept** | §4.11 | Arrow centred under the line, above the next node |
| N22 zero tick under the thumb | **Accept** | §4.14 | Tick under the track; hidden within one thumb width of zero |
| N23 header arithmetic | **Accept** | §6.1 | Measured 269 of 288 at 320 |
| N24 heading focus ring | **Modify:** one rule, **no ring** on `[tabindex="-1"]` (D2's preference) | §2.1, §8 | Not operable controls; the scroll already shows the position |
| B1 hero withdrawal cell lacks its limit | **Accept** | §6.2, §4.21, K11 | A claim never appears without its limit |
| B2 readouts lack honesty labels | **Accept** | §4.15, §6.6, K12 | A stuck figure is a screenshot without its frame |
| S1 risk cell below the fold at 390 | **Accept** (reorder) | §6.2, decision 7 | R8: the downside gets equal weight in the most-used view |
| S2 live Send in the 503 state | **Accept** | §7.4, H13 | Decision 46 says no retry; the button contradicted it |
| S3 "Not ready to sign up?" | **Accept** | §6.4, K13 | No sign-up exists on the page |
| S4 scam guidance has no next step | **Modify:** the bank sentence shows **always** (not only when the helpline is off); 1930 approval goes on §12 as recommended | §6.5, §12 | One fixed sentence is simpler, and calling the bank comes first either way |
| S5 prompt label | **Accept** | §7.2 | Says what tapping does |
| S6 single-column contact fields | **Accept** | §6.8, §7.2 | Helper stays before the input |
| S7a / b / c sent state | **Accept** all | §7.4, §2.1 | Icon left; "Copy reference"; no heading ring |
| S8 apply N1, N4, N5, N6, N9 | **Accept** | as above | – |
| N-a orphans | **Accept** | §2.1, §4.13 | `text-wrap: pretty` on more elements; balanced chip notes |
| N-b label 1 too long | **Accept** | §4.11 | "UPI or bank transfer, verified" |
| N-c tax slider label | **Accept** | §6.6.2 | Says whose profit |
| N-d FAQ order | **Accept** | §6.7, decision 40 | – |
| N-e step 3 repeats the weekend rule | **Accept** | §6.4 | The FAQ "How often does the price change?" carries it |
| N-f footer link rows spread apart | **Accept** | §6.9 | `content-start gap-y-0` |
| N-g "CA" unglossed in buttons | **Accept: no change** | – | Common term in India; spelled out in the Ask h2 and the FAQ; `abbr` tooltips fail on touch |
| D2 band position | **Recorded** | decision 2 | D2 withdrew its preference for 5th |
| D2 owner question: app link | **Accept** as an optional slot | decision 57, §12 | Shown only when the owner supplies the URL |

---

## 2. Tokens

### 2.1 `src/app/globals.css`, complete

Replace the whole file with this. It is code-ready. Nothing else goes in `globals.css`.

```css
@import "tailwindcss";
@import "shadcn/tailwind.css"; /* only its custom variants (data-open/closed/checked) are used */

/* ── 0. Reset Tailwind's own scales: only the tokens below can produce classes ── */
@theme {
  --color-*: initial;
  --font-*: initial;
  --font-weight-*: initial;
  --text-*: initial;
  --tracking-*: initial;
  --leading-*: initial;
  --radius-*: initial;
  --shadow-*: initial;
  --inset-shadow-*: initial;
  --drop-shadow-*: initial;
  --text-shadow-*: initial;
  --blur-*: initial;
  --ease-*: initial;
  --animate-*: initial;
  --breakpoint-2xl: initial; /* sm 640 · md 768 · lg 1024 · xl 1280 remain */
}

/* ── 1. Primitives: the owner's brand board, exact values (brand-board.md, 11 Nov 2026; v1.3).
      NOT classes; never used in components (QA A22). Unused steps are kept so the board is complete. ── */
:root {
  --p-white: #FFFFFF;
  /* Greyscale (labelled) */
  --p-grey-50: #F8F9FD;  --p-grey-100: #F1F5F9; --p-grey-200: #E2E8F0; --p-grey-300: #CBD5E1; --p-grey-400: #94A3B8;
  --p-grey-500: #64748B; --p-grey-600: #475569; --p-grey-700: #334155; --p-grey-800: #1E293B; --p-grey-900: #0F172A;
  /* Primary (labelled); 1–6 = the tints under the Primary bar; 400–900 = Additional dark */
  --p-ink: #272A33;
  --p-ink-1: #3D3F47; --p-ink-2: #52555C; --p-ink-3: #686A70; --p-ink-4: #7D7F85; --p-ink-5: #939499; --p-ink-6: #A9AAAD;
  --p-ink-400: #86888F; --p-ink-500: #64666F; --p-ink-600: #4C4E57; --p-ink-700: #343844; --p-ink-800: #1F2027; --p-ink-900: #151517;
  /* Secondary (labelled); 1–6 = the tints under the Secondary bar; 400–900 = Additional gold */
  --p-gold: #FDC037;
  --p-gold-1: #FDC64B; --p-gold-2: #FDCD5F; --p-gold-3: #FED373; --p-gold-4: #FED987; --p-gold-5: #FEDF9B; --p-gold-6: #FEE6AF;
  --p-gold-400: #FED05F; --p-gold-500: #FEBE2F; --p-gold-600: #E5A920; --p-gold-700: #B98818; --p-gold-800: #8C6612; --p-gold-900: #5F440C;
  /* Light (the third main swatch) and the Colors Generator's light row */
  --p-light: #F2F2F2;
  --p-light-1: #F3F3F3; --p-light-2: #F4F4F4; --p-light-3: #F6F6F6; --p-light-4: #F7F7F7; --p-light-5: #F8F8F8; --p-light-6: #FAFAFA;
  /* Alerts (labelled; Warning by its label, not its sample) */
  --p-success: #10B981; --p-warning: #FACC15; --p-error: #EF4444;
}

/* ── 2. Roles. Light is the default. .theme-ink = the one band. .theme-light = a light island inside it ── */
:root, .theme-light {
  color-scheme: light;
  --background: var(--p-white);           /* page, base sections */
  --background-alt: var(--p-light);       /* v1.3 Light: alternate sections, result inset, read-only fields */
  --card: var(--p-white);                 /* panels, inputs, mock frames                       1.12 against Light */
  --muted: var(--p-light);                /* v1.3: quiet fills on white: mock note, money-path middle nodes, info alert */
  --foreground: var(--p-ink);             /* headings, figures, labels on controls, links   14.33 white · 12.80 Light */
  --copy: var(--p-grey-700);              /* body paragraphs, answers                         10.35 white · 9.25 Light */
  --muted-foreground: var(--p-grey-600);  /* secondary text, captions, legal, row labels      7.58 white · 6.77 Light */
  --placeholder: var(--p-grey-600);       /* v1.3: the +91 adornment (no placeholders exist)  7.58 white · 6.77 read-only Light */
  --primary: var(--p-ink);                /* primary button fill, checked chip                 white on it 14.33 */
  --primary-hover: var(--p-ink-1);        /* v1.3 board Primary-1                              white on it 10.50 */
  --primary-active: var(--p-ink-900);     /*                                                   white on it 18.24 */
  --primary-foreground: var(--p-white);
  --brand: var(--p-gold);                 /* v1.3 Secondary: gold fills with ink on them (decision 58). Never text, never state */
  --brand-foreground: var(--p-ink);       /*                                                   ink on gold 8.72 */
  --accent: var(--p-light);               /* shadcn meaning: quiet hover fill (on white) */
  --accent-foreground: var(--p-ink);
  --border: var(--p-grey-200);            /* 1px hairlines on white (decorative); .theme-alt steps it up on Light */
  --border-strong: var(--p-grey-300);     /* slider track (decorative) */
  --rule: var(--p-ink);                   /* 2px item rules: facts row, steps, "What you own" */
  --input: var(--p-grey-500);             /* control boundaries                                 4.76 white · 4.25 Light, ≥ 3:1 */
  --ring: var(--p-ink);                   /* focus                                              14.33 */
  --error: var(--p-error);                /* error borders and icons only                       3.76 white · 3.36 Light, ≥ 3:1 */
  --success: var(--p-success);            /* v1.3: fills, icons, borders only, ink on it 5.65; never text on light (2.54). No class yet */
  --warning: var(--p-warning);            /* v1.3: fills only, ink on it 9.36; never text, icon or border on light (1.53). No class yet */
  --selection: var(--p-gold-6);           /* v1.3 Secondary-6                                  grey-900 on it 14.58 */
  --data-us: var(--p-ink);                /* sleeve colours: always beside a text label */
  --data-gold: var(--p-gold);
  --data-oil: var(--p-grey-400);
}
.theme-light { background-color: var(--background); color: var(--foreground); }

/* v1.3: the alternate (Light) sections. grey-200 hairlines are 1.10:1 on Light (they vanish), so they step up
   to grey-300 (1.33 on Light, 1.48 on the white cards inside). A .theme-light island inside resets it. */
.theme-alt {
  --border: var(--p-grey-300);
  background-color: var(--background-alt);
}

.theme-ink {
  color-scheme: dark;
  --background: var(--p-ink);
  --background-alt: var(--p-ink);
  --card: var(--p-ink-800);
  --muted: var(--p-ink-700);
  --foreground: var(--p-white);           /* 14.33 */
  --copy: var(--p-grey-300);              /* 9.65 */
  --muted-foreground: var(--p-grey-300);  /* 9.65 (one light grey in the band; labels differ by size and case) */
  --primary: var(--p-white);
  --primary-hover: var(--p-grey-200);
  --primary-active: var(--p-grey-300);
  --primary-foreground: var(--p-ink);
  --accent: var(--p-ink-700);
  --accent-foreground: var(--p-white);
  --border: var(--p-ink-600);             /* 1.73 decorative */
  --border-strong: var(--p-ink-500);      /* 2.51 decorative */
  --rule: var(--p-white);
  --input: var(--p-grey-400);             /* 5.59 */
  --ring: var(--p-white);                 /* 14.33 */
  /* --brand / --brand-foreground inherit from :root: gold on ink is 8.72, ink on gold 8.72 */
  background-color: var(--background);
  color: var(--foreground);
}

/* ── 3. Roles as classes. `inline` = read where used, so .theme-ink re-colours everything inside it ── */
@theme inline {
  --color-background: var(--background);
  --color-background-alt: var(--background-alt);
  --color-card: var(--card);
  --color-muted: var(--muted);
  --color-foreground: var(--foreground);
  --color-copy: var(--copy);
  --color-muted-foreground: var(--muted-foreground);
  --color-placeholder: var(--placeholder);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-primary-foreground: var(--primary-foreground);
  --color-brand: var(--brand);                       /* v1.3: bg-brand, only where decision 58 allows (QA A23) */
  --color-brand-foreground: var(--brand-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-rule: var(--rule);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-error: var(--error);
  /* --success and --warning get no --color-* alias until a component needs one (decision 62) */
  --color-data-us: var(--data-us);
  --color-data-gold: var(--data-gold);
  --color-data-oil: var(--data-oil);

  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;

  --spacing-section: var(--section-y);
  --spacing-head: var(--stack-head);
  --spacing-gutter: var(--gutter);
  --spacing-header: var(--header-h);
  --spacing-readout: var(--readout-h);
}

/* ── 4. Literal scales ── */
@theme {
  --font-weight-normal: 400;
  --font-weight-semibold: 600;

  --text-body-xl: 1.125rem; --text-body-xl--line-height: 1.75rem;   /* 18/28 ledes */
  --text-body-lg: 1rem;     --text-body-lg--line-height: 1.625rem;  /* 16/26 body, inputs, buttons (lg) */
  --text-body-md: 0.875rem; --text-body-md--line-height: 1.375rem;  /* 14/22 secondary, legal, tags, nav, buttons (md) */

  --radius-xs: 0.25rem;  /* 4  tags, checkbox, allocation bar outer corners */
  --radius-sm: 0.5rem;   /* 8  buttons, inputs, chips, alerts, money-path nodes, mock notes */
  --radius-md: 0.75rem;  /* 12 panels */
  --radius-lg: 1rem;     /* 16 mock frames */

  --shadow-panel:
    0 1px 2px 0 color-mix(in srgb, var(--p-grey-900) 6%, transparent),
    0 16px 40px -12px color-mix(in srgb, var(--p-grey-900) 18%, transparent);

  --ease-out: cubic-bezier(.23, 1, .32, 1);

  --animate-spin: spin 1s linear infinite;   /* the "Sending…" icon only */
  @keyframes spin { to { transform: rotate(360deg); } }
}

/* ── 5. Layout tokens (surface-independent, so safe on :root) ── */
:root {
  --header-h: 4rem;      /* 64 at every width */
  --readout-h: 3rem;     /* 48 mobile result readout */
  --gutter: 1rem;        /* 16 */
  --container: 75rem;    /* 1200 including gutters */
  --section-y: 4rem;     /* 64 */
  --stack-head: 2rem;    /* 32 section header → content */
  @media (width >= 40rem) { --gutter: 1.5rem; }
  @media (width >= 48rem) { --section-y: 6rem; --stack-head: 3rem; }
}

@custom-variant tall (@media (height >= 37.5rem));   /* sticky things stick only on screens ≥ 600px tall */

@utility container-page { width: 100%; max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }
@utility num { font-variant-numeric: tabular-nums lining-nums; }

/* Type roles. Headings are utilities because their size steps by breakpoint.
   v1.3 (brand board): headings are Bold 700, as in the design file. 600 stays for UI emphasis (decision 61). */
@utility type-display { font-size: 2.25rem; line-height: 2.625rem; font-weight: 700; letter-spacing: -0.025em; text-wrap: balance;
  @media (width < 22.5rem) { font-size: 2rem; line-height: 2.375rem; }
  @media (width >= 48rem) { font-size: 2.75rem; line-height: 3.125rem; }
  @media (width >= 64rem) { font-size: 3rem; line-height: 3.375rem; } }
@utility type-title { font-size: 1.875rem; line-height: 2.25rem; font-weight: 700; letter-spacing: -0.02em; text-wrap: balance;
  @media (width >= 48rem) { font-size: 2.25rem; line-height: 2.625rem; }
  @media (width >= 64rem) { font-size: 2.5rem; line-height: 2.875rem; } }
@utility type-heading { font-size: 1.25rem; line-height: 1.75rem; font-weight: 700; letter-spacing: -0.01em; text-wrap: balance;
  @media (width >= 64rem) { font-size: 1.5rem; line-height: 2rem; } }
@utility type-subhead { font-size: 1.125rem; line-height: 1.625rem; font-weight: 700; letter-spacing: -0.005em; }
/* v1.3: the FAQ questions. The same metrics as type-subhead at 600: they're control labels in a list of nine, not headings */
@utility type-question { font-size: 1.125rem; line-height: 1.625rem; font-weight: 600; letter-spacing: -0.005em; }
@utility type-figure { font-size: 2rem; line-height: 2.375rem; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums lining-nums;
  @media (width >= 48rem) { font-size: 2.5rem; line-height: 2.875rem; } }
@utility type-label { font-size: 0.75rem; line-height: 1rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }

@layer base {
  /* v1.2: the raw role variable, not the --color-border alias. Aliases from @theme inline resolve once on
     :root, so only role variables re-colour inside .theme-ink. Rule for all plain CSS: read var(--role),
     never var(--color-role). */
  * { border-color: var(--border); }
  html { font-family: var(--font-sans); scroll-padding-top: calc(var(--header-h) + 1rem); -webkit-text-size-adjust: 100%; }
  /* v1.5: no CSS scroll-behavior. It animated cold loads with a hash (about 9,000px to #ask at 390), and
     HashHandler owns every in-page click with an explicit behaviour (§5.3). */
  body { background-color: var(--background); color: var(--foreground); font-size: 1rem; line-height: 1.625rem; -webkit-font-smoothing: antialiased; }
  p, li, dt, dd, summary, figcaption, label, legend { text-wrap: pretty; }
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
  /* Headings, main and alerts receive focus only from script (after an anchor jump, a send, an error).
     They aren't controls, so they get no ring. One rule for all of them (decision 21). */
  [tabindex="-1"]:focus { outline: none; }
  ::selection { background: var(--selection); color: var(--p-grey-900); }
  ::placeholder { color: var(--placeholder); opacity: 1; }
  /* v1.3 (D1 V7, D2 N2): the gloss is written out in words, and the tooltip does nothing on touch, so the dotted
     underline only looks like a link. The title stays for screen readers and mouse hover. */
  abbr[title] { text-decoration: none; }
  .lucide { stroke-width: 1.75; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
      animation-delay: 0s !important; transition-duration: .01ms !important; transition-delay: 0s !important; }
  }
}

/* The slider (§4.14): the one piece of component CSS. Fill runs between --a and --b (0–1), set inline.
   Literal radius/easing values on purpose: Tailwind may prune theme variables that no utility uses. */
@layer components {
  .range {
    --thumb: 1.5rem; --track: 0.375rem;
    --pos-a: calc(var(--thumb) / 2 + (100% - var(--thumb)) * var(--a, 0));
    --pos-b: calc(var(--thumb) / 2 + (100% - var(--thumb)) * var(--b, 0));
    appearance: none; display: block; width: 100%; height: 2.75rem; margin: 0; background: transparent; cursor: pointer;
    border-radius: 0.5rem;
  }
  .range::-webkit-slider-runnable-track {
    height: var(--track); border-radius: 0.25rem;
    background: linear-gradient(to right, var(--border-strong) var(--pos-a), var(--foreground) var(--pos-a) var(--pos-b), var(--border-strong) var(--pos-b));
  }
  .range::-moz-range-track {
    height: var(--track); border-radius: 0.25rem;
    background: linear-gradient(to right, var(--border-strong) var(--pos-a), var(--foreground) var(--pos-a) var(--pos-b), var(--border-strong) var(--pos-b));
  }
  .range::-webkit-slider-thumb {
    appearance: none; width: var(--thumb); height: var(--thumb); margin-top: calc((var(--track) - var(--thumb)) / 2);
    border-radius: 9999px; background: var(--card); border: 2px solid var(--foreground);
    transition: box-shadow 150ms cubic-bezier(.23, 1, .32, 1);
  }
  .range::-moz-range-thumb {
    width: var(--thumb); height: var(--thumb); border-radius: 9999px; background: var(--card); border: 2px solid var(--foreground);
    transition: box-shadow 150ms cubic-bezier(.23, 1, .32, 1);
  }
  .range:hover::-webkit-slider-thumb, .range:active::-webkit-slider-thumb { box-shadow: 0 0 0 6px color-mix(in srgb, var(--foreground) 12%, transparent); }
  .range:hover::-moz-range-thumb, .range:active::-moz-range-thumb { box-shadow: 0 0 0 6px color-mix(in srgb, var(--foreground) 12%, transparent); }
  .range:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
  @media (forced-colors: active) { .range { forced-color-adjust: auto; } }
}

/* Print the band light: browsers drop backgrounds on paper. Unlayered, so it beats .theme-ink. */
@media print {
  .theme-ink {
    color-scheme: light;
    --background: var(--p-white); --card: var(--p-white); --muted: var(--p-light);
    --foreground: var(--p-ink); --copy: var(--p-grey-700); --muted-foreground: var(--p-grey-600);
    --border: var(--p-grey-200); --border-strong: var(--p-grey-300); --rule: var(--p-ink);
    --input: var(--p-grey-500); --ring: var(--p-ink);
  }
}
```

**Rules that come with the tokens**
- **Components use role classes only.** QA greps A1–A4 enforce it.
- **A new visual need means a new role,** with a light value, an ink value, a contrast proof on each surface (Appendix A), and a line in §3.1.
- **Primitives vs roles (v1.3):** every board value is a primitive, so the board is complete in one place. **Only roles are classes.** A primitive with no role (most of the ramps, the Light ramp, grey-800) stays unused until a spec change gives it a role.
- **Deleted on purpose** (they have no role):
  - `paper` (its value, `#F2F2F2`, is now `--background-alt`), `main-1/2/3`;
  - the eyedropped gold and ink values (replaced by the board's exact ramps);
  - `chart-*`;
  - `shadow-card`, `shadow-lift`;
  - `--radius` 24 / 32;
  - `surface-ink` and `surface-light` (replaced by `.theme-ink` and `.theme-light`);
  - `faint`, `brand-text`, `accent-soft`, `destructive`, `positive`, `negative`, `popover`, `card-foreground`;
  - `secondary` as a colour role (gold's role is `brand`; the `secondary` *button variant* is the outline button);
  - all reveal, `.mark`, `land-tint`, `scene-drift`, `scroll-line`, `line-fill` and `no-scrollbar` CSS, and the `tw-animate-css` import.
- **Back in v1.3** (brand board): `brand` (gold fills, decision 58), and `success` / `warning` as variables without classes (decision 62).

### 2.2 `src/app/layout.tsx`

| Item | Value |
|---|---|
| Font | `Manrope({ variable: "--font-manrope", subsets: ["latin", "latin-ext"], display: "swap" })`. **No `weight` array** (it's a variable font, 200–800, so v1.3's 700 headings cost no extra file; only the code comment changes from "400 and 600" to "400, 600 and 700"). `latin-ext` holds ₹ (U+20B9), verified: today ₹ swaps in late because only `latin` is preloaded |
| `<html>` | `lang="en-IN"`, ``className={`${manrope.variable} h-full`}`` (v1.2: `h-full` lets `min-h-full` on `<body>` keep the footer at the bottom of short routes) |
| `<body>` | `className="flex min-h-full flex-col"` (no `Providers` wrapper) |
| `viewport` | `{ themeColor: "#FFFFFF", colorScheme: "light" }`. The only hex outside `globals.css`, because the Next API needs a literal |
| `metadata` | See §6.0 |

### 2.3 `src/lib/utils.ts`

Register the custom font-size tokens with `tailwind-merge`:

```ts
classGroups: { "font-size": [{ text: ["body-xl", "body-lg", "body-md"] }] }
```

Add a test to `utils.test.ts`: `cn("text-body-md", "text-primary-foreground")` must keep both classes, and `cn("text-copy", "text-body-lg")` must keep both. (`copy` is a colour, not a size.) **v1.3:** also `cn("text-body-md", "text-brand-foreground")` keeps both, and `cn("type-subhead", "type-question")` keeps both. `type-*` are custom utilities that `tailwind-merge` doesn't know, so never pass both to one element.

---

## 3. Foundations

### 3.1 Colour: where each role may go

| Class | Light | Ink band | Use for | Never |
|---|---|---|---|---|
| `bg-background` | white | ink | page, base sections | |
| `bg-background-alt` | **Light `#F2F2F2`** (v1.3) | ink | alternate sections (through `.theme-alt`); the tool result inset; read-only fields | inside the band |
| `bg-card` | white | ink-800 | panels, inputs, mock frames. On a Light section a white card keeps its 1px border (1.12:1 against Light) | a card inside a card |
| `bg-muted` | **Light** (v1.3) | ink-700 | quiet fills **on white**: the hero mock note, money-path middle nodes, the info alert, quiet hover (`bg-accent`) | large areas; on a Light surface (it vanishes: use `bg-card` or `border-border`) |
| `text-foreground` | ink | white | headings, figures, row values, labels on controls, links, error text | |
| `text-copy` | grey-700 | grey-300 | paragraphs, FAQ answers, step bodies, band body | |
| `text-muted-foreground` | grey-600 | grey-300 | ledes, captions, legal, row labels, helpers, `type-label` | |
| `text-placeholder` | **grey-600** (v1.3) | – | the `+91` adornment (white or read-only Light field) | any other text |
| `bg-primary` + `text-primary-foreground` | ink + white | white + ink | the primary button, a checked chip | more than one *action* per screen |
| `bg-brand` + `text-brand-foreground` (v1.3) | gold + ink | gold + ink | **only** decision 58's uses: the money path's end nodes, the band's "Not Paraa." tags | text or icons in gold; a state; a figure, result or honesty line; a section background; anything not listed in decision 58 |
| `border-border` | grey-200 on white; **grey-300 inside `.theme-alt`** (v1.3) | ink-600 | 1px hairlines between rows and sections | control edges |
| `border-border-strong` | grey-300 | ink-500 | the slider track (via `.range`) | |
| `border-input` | grey-500 | grey-400 | inputs, chips, the secondary button, checkbox | decoration |
| `border-rule` | ink | white | 2px rule on fact cells, steps, "What you own" | more than one per item |
| `outline-ring` | ink | white | focus only | |
| `border-error`, `text-error` | `#EF4444` | `#EF4444` | invalid field border (via `ring-1 ring-inset ring-error`), error icons | text |
| `--success`, `--warning` (v1.3, no class) | `#10B981` / `#FACC15` | same | reserved: a fill, icon or border with ink on it, once a component needs one (decision 62) | text on light; the only signal of a state |
| `bg-data-us / -gold / -oil` | ink / gold / grey-400 | (not used in the band) | the allocation bar, swatches | without a text label |

**Gold (v1.3, decision 58)** appears as:
- the logo PNG;
- `bg-data-gold` (the gold sleeve);
- `bg-brand` on the money path's two end nodes and the band's three "Not Paraa." tags;
- the `::selection` tint (Secondary-6).

**Budget:** at most 3 gold *uses* per screen. A data series (bar + legend swatches + breakdown swatch) is one use, the two end nodes are one, the three tags are one, and the logo counts. Every screen is at 2 at most (D1's measure: hero 1, basket 2, how 2, band 2, tools 2, FAQ 1, ask 1; there are no gold buttons, decision 64).

**Never gold** (D2's list, v1.3):
- text or icons on white or Light (1.64 / 1.47:1);
- a state: selected, checked, current, focus, slider;
- a figure, result, readout, gain/loss bar or honesty line;
- any fact cell;
- a section background or band;
- a button (decision 64).

**Status:** meaning is always in words and signs (+ / −). Colour is never the only signal. Red is used only for form errors. Green and yellow aren't used on this page (the tokens exist for future states, decision 62).

### 3.2 Typography

Manrope only. **Weights (v1.3, brand board, decision 61): 700 for headings, 600 for UI emphasis, 400 for body.** These are design-file weights. Bold `<strong>` in body text is 600. A 700 weight comes **only** from the heading utilities below, never from a class (A6 still bans `font-bold`).

| Class | Element / job | < 360 | 360–767 | 768–1023 | ≥ 1024 | Weight / tracking |
|---|---|---|---|---|---|---|
| `type-display` | the hero `h1` only | 32/38 | 36/42 | 44/50 | 48/54 | **700** / −0.025em |
| `type-title` | every section `h2` | 30/36 | 30/36 | 36/42 | 40/46 | **700** / −0.02em |
| `type-heading` | `h3`: steps, band rows, panel titles, the success heading | 20/28 | 20/28 | 20/28 | 24/32 | **700** / −0.01em |
| `type-subhead` | result headings, small headings ("What happens next"), Alert titles, the tax rules' titles | 18/26 | 18/26 | 18/26 | 18/26 | **700** |
| `type-question` (v1.3) | the FAQ questions (`summary`) only | 18/26 | 18/26 | 18/26 | 18/26 | 600 |
| `type-figure` | the one big number in a result; basket percentages | 32/38 | 32/38 | 40/46 | 40/46 | **700**, tabular |
| `text-body-xl` | ledes | 18/28 | | | | 400 |
| `text-body-lg` | body, answers, inputs, `lg` buttons | 16/26 | | | | 400 / 600 |
| `text-body-md` | secondary, legal, captions, tags, nav, `md` buttons, chips | 14/22 | | | | 400 / 600 |
| `type-label` | 1–3-word metadata: "Step 1", "Where your money goes", the panel's "Basket" | 12/16 | | | | 600, uppercase, +0.06em |

Rules:
- **Sizes at 1440:** 48, 40, 24, 18, 16, 14 and 12: exactly 7 (QA B2).
- **Legal, risk and honesty text** (disclosures, Example tag, captions, footnotes) is **≥ 14px**. `type-label` text uses `text-muted-foreground` or darker, and is never a sentence.
- **Line length:**

| Text | Max width |
|---|---|
| prose | `max-w-prose` (65ch) |
| ledes | `max-w-[52ch]` |
| section titles | `max-w-[24ch]` |
| legal | `max-w-[72ch]` |

- **Wrapping:** headings `text-wrap: balance`; `p, li, dt, dd, summary, figcaption, label, legend` use `pretty` (set in base CSS; it avoids one-word last lines); chip notes use `text-balance`. Never truncate text with an ellipsis.
- **Figures:** every figure, amount, percentage and the reference has `num` (or `type-figure`). Display only through `formatINR`, `formatUSD` and `formatPct` from `src/lib/format.ts`: Indian grouping, U+2212 minus, half-up rounding.
- **Abbreviations:** `<abbr title="…">` **only where the copy itself writes the expansion in words** (v1.3, Dev Q21): KYC in step 1, VDA in the tax rule, and FIU-IND in `fiu-band-v1`. A hover tooltip alone does nothing on touch. `abbr` has no underline (base CSS, v1.3).
- **Open (owner):** the design file's 12px styles are Extrabold / Medium / Regular, while `type-label` is 12 / 600. It stays 600 until the typography board arrives (D1 joint review B4). If that board sets UI labels to Bold, the 600 set moves to 700 in the utilities and button base. Nothing else changes.
- **Long tokens** (the reference, registration number): `[overflow-wrap:anywhere]` inside a `min-w-0` box.

### 3.3 Spacing, container and grid

**Spacing steps allowed** (Tailwind units → px):

| Unit | px |
|---|---|
| 0.5 | 2 |
| 1 | 4 |
| 2 | 8 |
| 3 | 12 |
| 4 | 16 |
| 5 | 20 |
| 6 | 24 |
| 8 | 32 |
| 10 | 40 |
| 12 | 48 |
| 16 | 64 |
| 20 | 80 |
| 24 | 96 |

Control heights: `h-11` (44), `h-12` (48), `min-h-13` (52), `min-h-14` (56). Named tokens: `py-section` (64 / 96), `mb-head` (32 / 48), `px-gutter` via `container-page`, `top-header` (64), `h-readout` (48).

**Margins (v1.1, N17):**
- **No negative margins for vertical rhythm.** When two blocks need a gap smaller than their container's `space-y-*`, wrap them in one `div` and space them inside it.
- **The only negative margins allowed** (all for alignment, none for spacing):
  - the readout's flush-to-card offsets (`-mx-5 -mt-5 sm:-mx-8 sm:-mt-8`, §4.15);
  - the question prompts' `-mx-4` (§4.16);
  - the tab's `-mb-px`, which lays its 2px bar over the list's hairline (§4.12);
  - the money-path arrows' `-ml-1` and `-mt-1`, which join each arrowhead to its line (§4.11).
- Every gap in this spec is stated as one class on one element. When two would apply, the spec names which one wins.

| Viewport | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Gutter | 16 | 16 | 24 | 24 | 24 |
| Content width | 288 | 358 | 720 | 976 | 1152 (container 1200, centred) |
| Section padding (`py-section`) | 64 | 64 | 96 | 96 | 96 |
| Header → content (`mb-head`) | 32 | 32 | 48 | 48 | 48 |

**Gaps:**
- 8 between chips;
- 12 inside one object (label → control);
- 24 between items;
- 32 between control groups;
- 48 / 64 between groups (< 768 / ≥ 768);
- 64 between the two columns of every two-part layout at ≥ 1024 (`lg:gap-16`).

**Layouts**, at ≥ 1024 (below 1024 everything stacks unless a section says otherwise):

| Layout | Columns | Used by |
|---|---|---|
| L1 Stack | header above full-width content | Basket, How it works, Security, Run the numbers |
| L2 Side | `lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]`, gap 64 | FAQ |
| L3 Split | `lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`, gap 64 | Hero (from 1280 only; 6 / 6 = 456 / 456 at 1024–1279, §6.2), Security group 1, Ask a CA, Footer |
| L4 Tool | `lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]`, no gap (the result is an inset) | Run the numbers panels |
| L5 Columns | 1 col < 640 · 2 cols 640–1023 · 4 cols ≥ 1024, gap 24 | Facts row, How-it-works steps |

At 1440, L3 is 453 / 635px, L2 is 363 / 725px and L4 is 635 / 453px. At 1024, L3 is 380 / 532px, L2 304 / 608 and L4 532 / 380.

### 3.4 Shape, borders, shadow

- **Radius:** `rounded-xs` 4 · `rounded-sm` 8 · `rounded-md` 12 · `rounded-lg` 16. No `rounded-full` class anywhere. The slider thumb's circle is in `.range`. **No pills.**
- **Borders:**
  - `border` (1px) is the only hairline;
  - `border-2` is used only with `border-rule` (fact cells, steps, "What you own"; v1.3: the path end nodes are gold fills with no border);
  - invalid fields get `ring-1 ring-inset ring-error` on top of their 1px border. This is the **only** use of `ring-*` utilities, and it means the text doesn't shift.
- **Shadow:** `shadow-panel` on the **hero mock frame** and the **open mobile menu panel** only. Nothing lifts on hover. No other shadow.

### 3.5 Motion

| What | Value |
|---|---|
| Hover / press colour, border, underline | `transition-colors duration-150 ease-out`, on clickable things only |
| Press | `motion-safe:active:scale-97` on buttons and chips only |
| Arrow nudge | `motion-safe:group-hover:translate-x-0.5` on `ArrowRight` in links and fact cells |
| Tab panel enter | opacity 0 → 1 over 200ms, `ease-out`, on Base UI `data-starting-style` (hand-built tabs, §4.12 v1.3: `starting:opacity-0`, i.e. CSS `@starting-style`). Exit is instant |
| FAQ expand | `::details-content` height and `content-visibility` transition 200ms with `interpolate-size: allow-keywords` where supported; instant elsewhere |
| Mobile menu | `::details-content` opacity 200ms where supported |
| Spinner | `motion-safe:animate-spin` on the "Sending…" icon |

- **Anchor scrolls (v1.4, §5.3):** smooth only within 2 viewport heights; longer jumps are instant. **v1.5:** the smoothness comes only from `HashHandler`'s explicit `behavior: "smooth"`. There's no CSS `scroll-behavior`, so loads, `hashchange` and JS-off anchor jumps are instant.
- **Never animated:** numbers, the slider thumb (it tracks 1:1), anything on load, anything tied to scroll, anything looping.
- **Banned:** reveals, parallax, pins, scroll-scrubbing, carousels, marquees, autoplay, hover lift, shimmer, rolling digits, count-ups.
- **RM:** the global rule zeroes every duration and delay, and `HashHandler` never scrolls smoothly under RM (v1.5: there's no CSS smooth scroll at all). Nothing depends on motion to be understood.

### 3.6 Icons

`lucide-react` only, stroke 1.75 (set in base CSS), at 16px (`size-4`) inline or 20px (`size-5`) in rows and alerts. The one exception is `ArrowUpRight` on external links, at 14px (`size-3.5`, v1.2) inline with link text. Decorative icons get `aria-hidden`. **The complete list:**

| Icon | Used for |
|---|---|
| `ArrowRight` | fact cells, standalone links, the horizontal money path |
| `ArrowDown` (v1.3, Dev F3) | the vertical money path below 1024 (16px) |
| `ArrowUpRight` | external links |
| `Plus` / `Minus` | FAQ toggle; question prompts (`Plus`) |
| `Menu` / `X` | mobile menu toggle |
| `RotateCcw` | reset |
| `CircleAlert` | field error, error and offline alerts |
| `Info` | the info alert |
| `CircleCheck` | the success heading |
| `Check` / `X` | "Allowed" / "Not allowed" tags in the withdraw mock |
| `LoaderCircle` | "Sending…" |

**Banned beside any status claim:** `Shield`, `ShieldCheck`, `Lock`, `BadgeCheck`, `Landmark`.

### 3.7 Layers and variants

- **z-index:**
  - `z-10`: sticky in-section items (result inset, readout);
  - `z-40`: header;
  - `z-50`: open mobile menu panel;
  - `z-100`: skip link.
- **`tall:`** (height ≥ 600px) gates every sticky behaviour. On landscape phones and at 200% zoom, nothing sticks.
- **`forced-colors:`**: every state drawn with a background (checked chip, primary button) also has a border or outline (§4).

---

## 4. Component inventory

Every component lives in `src/components/ui/` unless noted. Every one is a **Server Component** unless marked **client**.

**Shared states**, unless a component's table says otherwise:

| State | Treatment |
|---|---|
| default | as specified |
| hover (pointer) | colour/border change, 150ms |
| focus-visible | `outline-2 outline-ring outline-offset-2`. Inside a container that clips, `outline-offset-[-2px]`. Elements with `tabIndex={-1}` (headings, `main`, alerts) show **no** ring (§2.1) |
| active | `motion-safe:active:scale-97` on buttons and chips only |
| disabled | not used on this page. Where an action is temporarily unavailable, use `aria-disabled="true"`, `cursor-not-allowed`, `opacity-60`, keep it focusable, and say why in text |
| loading | Button only (§4.3) |
| error | Fields only (§4.16) |
| selected / checked | ink fill + `aria-checked`/`aria-selected` + `forced-colors:outline-2` |

### 4.1 `Section` (`section.tsx`)

- **API:** `<Section id labelledBy tone="base" | "alt" | "ink">`
- **Renders:** `<section id aria-labelledby class="py-section [tone]"><div class="container-page">{children}</div></section>`
  - `tone="alt"` → `theme-alt` (v1.3: it sets the Light background and the grey-300 hairlines, §2.1; was `bg-background-alt`);
  - `tone="ink"` → `theme-ink` (it sets its own background and text colour);
  - `tone="base"` → nothing (the body is white).
- **Rules:**
  - Every section has an `h2` with `tabIndex={-1}` (the target for focus after an anchor jump).
  - `tone="ink"` appears **exactly once** (the security band).
  - The hero overrides its top padding (§6.2).

### 4.2 `SectionHeader` (`section-header.tsx`)

- **API:** `<SectionHeader id title lede? layout="split" | "stack">`
- **Anatomy:**
  - `h2#id.type-title.max-w-[24ch]` with `tabIndex={-1}` (no ring when focused by script, §2.1);
  - lede `p.text-body-xl.text-muted-foreground.max-w-[52ch]`;
  - margin to content `mb-head`.
- **`split`:** at ≥ 1024, `grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16`, with the lede bottom-aligned to the title's last line. Below 1024 it stacks, with the lede `mt-4`.
- **`stack`:** one column, lede `mt-4`.
- **Rules:**
  - No eyebrow label, no icon, no highlight.
  - Not animated.
  - Ledes are 20 words or fewer (R9).

### 4.3 `Button` and `ButtonLink` (`button.tsx`)

- **Elements:** `<button>` for actions (v1.3: a native `<button>`, §9; **it defaults to `type="button"`**, and the submits pass `type="submit"`, v1.5). `ButtonLink` is a plain `<a>` for navigation (v1.5, decision 68: no `next/link`; its props are `ComponentProps<"a">`). Never a `div`.
- **Base:** `inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border font-semibold whitespace-nowrap transition-colors duration-150 ease-out motion-safe:active:scale-97 aria-disabled:cursor-not-allowed aria-disabled:not-aria-busy:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0` (v1.2: cursor, and only *unavailable* buttons dim; a loading button stays full ink).
- **`<Button>` only inside client components** (it attaches handlers and a measuring ref). Server Components use `ButtonLink` (v1.2).

**Variants:**

| Variant | Default | Hover | Active | Forced colours | Use |
|---|---|---|---|---|---|
| `primary` | `bg-primary text-primary-foreground border-primary` | `bg-primary-hover border-primary-hover` (v1.3: Primary-1 `#3D3F47`) | `bg-primary-active` | border stays (`CanvasText`) | **one action per screen**: hero "Ask a CA", form submit |
| `secondary` | `bg-transparent text-foreground border-input` | `bg-accent border-foreground` | scale | border | header "Ask a CA", "Ask another question", "Try again", "Copy my question", "Copy reference" (v1.3, D1 V6) |
| `quiet` | `bg-transparent text-foreground border-transparent` | `bg-accent` | scale | – | reset, question prompts |

**No gold variant** (v1.4, decision 64: main buttons are ink, and no button is gold). The three variants above are the complete set.

**Native element (v1.3, §9 should-fix):** `<Button>` renders a plain `<button>` instead of the Base UI Button primitive. It keeps the same props, `aria-disabled` handling, click guard and width lock. Base UI's Button adds nothing this page uses.

**Sizes:**

| Size | Height | Padding | Type | Use |
|---|---|---|---|---|
| `md` | 44 (`min-h-11`, v1.2: wrapping prompts grow) | `px-4` | `text-body-md` 600 | header, inline actions |
| `lg` | 48 (`min-h-12`) | `px-6` | `text-body-lg` 600 | hero CTA, form submit |
| `icon` | 44×44 | – | – | the menu toggle only |
| `block` (prop) | – | `w-full sm:w-auto` | – | – |

**States:**
- **focus-visible:** ring.
- **loading** (`loading` prop): a leading `LoaderCircle` (`motion-safe:animate-spin`) and the label passed in ("Sending…"), with `aria-busy="true"` and `aria-disabled="true"`. Clicks do nothing. Width is locked with `min-w-[var(--w)]`, where `--w` is written by a callback ref whenever the button renders idle, so the label change doesn't shift layout. The loading button is **not** dimmed (v1.2).
- **disabled:** not used.

**Accessibility:** the visible label is the accessible name (no `aria-label` override). One label per action across the page: **"Ask a CA"**.

### 4.4 Links (`link.tsx`)

| Type | Classes | Hover | Notes |
|---|---|---|---|
| `TextLink` (inline in prose) | `font-semibold text-foreground underline decoration-muted-foreground decoration-1 underline-offset-[3px]` | `decoration-foreground decoration-2` | **No invisible hit strip** (today's ±13px strip overlaps lines). Inline links are exempt from WCAG 2.5.8 |
| `TextLink variant="standalone"` | `group inline-flex min-h-11 items-center gap-1.5 text-body-lg font-semibold text-foreground` + trailing `ArrowRight` | underline + arrow nudge | e.g. "Ask a CA about your own tax" |
| `NavLink` | `inline-flex min-h-11 items-center px-3 text-body-md font-semibold text-muted-foreground` | `text-foreground` | current: `text-foreground` + a 2px `bg-foreground` bar 6px below the text, `aria-current="location"` |
| `FooterLink` | `inline-flex min-h-11 min-w-11 items-center text-body-md text-muted-foreground` (v1.3, D2 S3: "FAQ" measured 26 × 44) | `text-foreground underline` | |
| External (any type) | + `ArrowUpRight` 14px + `<span class="sr-only"> (opens in a new tab)</span>`, `target="_blank" rel="noopener noreferrer"` | same | On a standalone link, `ArrowUpRight` **replaces** the trailing `ArrowRight` (one arrow per link, v1.2) |

In the band, every link inherits white and grey-300 through the scope. Visited links look the same as unvisited.

**Element (v1.5, decision 68):** every link component renders a plain `<a>`, not `next/link`. In-page jumps are `HashHandler`'s (§5.3), and with JS off the browser follows the anchor natively.

### 4.5 `Tag` and `ExampleTag` (`tag.tsx`)

| | Spec |
|---|---|
| Box | `inline-flex h-6 items-center gap-1 rounded-xs border border-foreground bg-card px-2 text-body-md font-semibold text-foreground whitespace-nowrap` |
| `ExampleTag` | the text "Example", fixed. 72px wide. Not interactive. Inside every `MockFrame` header and beside the basket mix caption |
| `Tag` with icon | a leading 16px `Check` or `X` + text ("Allowed" / "Not allowed"). Neutral colours; the meaning is in the word |

No colour variants and no pill shape.

### 4.6 `Panel` (`panel.tsx`)

- **Classes:** `rounded-md border bg-card p-5 sm:p-8`. No shadow. Passes `id` through (v1.3: `ask-form`).
- **Use:** the two tool cards and the form card. Nothing else.
- **Rules:** never nested; no hover state.

### 4.7 `MockFrame` (`mock-frame.tsx`)

- **API:** `<MockFrame label caption? elevated? className>`
- **Anatomy:**
  - outer `<figure aria-label={label} class={className}>` (no surface of its own), containing:
  - the **frame** `<div class="theme-light rounded-lg border bg-card text-foreground">`, plus `shadow-panel` when `elevated`;
  - **header strip** inside the frame: `flex h-12 items-center justify-between border-b px-4 sm:px-5`. In DOM order, the `ExampleTag` comes **first** but is placed at the right (`order-last`); the left holds the app name "Paraa" (`text-body-md font-semibold`);
  - **body** inside the frame: `p-4 sm:p-6`;
  - **caption** (optional) `<figcaption class="mt-3 text-body-md text-muted-foreground">` after the frame, inside the `figure`. It takes the surrounding scope's colours (grey-300 in the band).
- **Rules:**
  - Nothing inside is focusable.
  - No bezel and no device chrome.
  - **Content:** sample amounts paid in are allowed. No values, returns, percentages, prices, charts, dates or names. Masked accounts look like "••4821". **v1.4 (D2 N3):** the bullets sit in `<span class="normal-nums">••</span>` inside the `num` value, so tabular figures don't open a gap between them.
  - **App name (v1.5, `web-design-guidelines`):** the header strip's "Paraa" carries `translate="no"`, so page-translation tools leave the product name alone.
- **Accessibility:** `<figure aria-label={label}>`. The text is real and is read in DOM order ("Example" first).
- **States:** none (static).

### 4.8 Lists (`list.tsx`)

| Component | Element | Anatomy |
|---|---|---|
| `RuleList` | `ul` | `divide-y border-y`. Rows `py-5`: `h3.type-heading` (or `type-subhead` where marked), then the body `mt-2 text-body-lg text-copy` |
| `DefinitionList` | `dl` | rows `flex items-baseline justify-between gap-4 border-t py-3 first:border-t-0`. `dt.text-body-md.text-muted-foreground` (or `-lg` in mocks ≥ 640). `dd.text-body-md.font-semibold.text-foreground.text-right.num` |
| `DefinitionList` stacked (< 360 or `stacked`) | `dl` | dt above dd, dd left-aligned. Below 360 via the `max-[22.5rem]:` variant, the same step as `type-display` (v1.2) |
| `StepList` | `ol` | `space-y-3`. Each `li` is `flex gap-3`: the number `num text-body-lg font-semibold text-muted-foreground w-5`, then the text `text-body-lg font-semibold text-foreground` |
| `RuledItem` | `div` / `li` | `border-t-2 border-rule pt-4`. Optional `type-label text-muted-foreground` → `mt-2` title → `mt-2` body |

Rows aren't interactive: nothing changes on hover.

### 4.9 `FactCell` (`fact-cell.tsx`), the hero facts row

- **Element:** `<a href={target} class="group block h-full border-t-2 border-rule pt-4 pb-1 focus-visible:outline-offset-4">`. The whole cell is the target, about 100px tall.
- **Anatomy:**
  - first sentence `<span class="block text-body-lg font-semibold text-foreground">` (16/26 600) followed by `ArrowRight` 16px inline (`ml-1 align-middle`, `motion-safe:group-hover:translate-x-0.5`, `aria-hidden`). The last word and the arrow sit together in a `whitespace-nowrap` span, so the arrow never wraps alone (v1.3, Dev Q20);
  - second sentence `<span class="mt-1 block text-body-lg font-semibold text-copy">`: **v1.4 (decision 65, owner): the limit has its claim's size and weight** (16/26, 600; was `text-body-md text-muted-foreground`). Grey-700 (10.35:1 on white) keeps one colour step, so the claim reads first. It costs 50px at 390 and 34px at 1440, inside the v1.4 budgets.
- **States:**

| State | Treatment |
|---|---|
| default | as above |
| hover | the first sentence underlines (`group-hover:underline underline-offset-[3px]`); arrow nudges 2px |
| focus-visible | ring around the cell, offset 4px |
| active | nothing |
| visited | same as default |

- **Rules:**
  - **Every cell is identical in treatment, including "You can lose money"**: no icon, no colour, no box (owner decision 1).
  - Content comes from the typed source below. A cell with a missing field renders `null`, and the row renders as 3 columns at ≥ 1024 if only three remain.

```ts
type FactCellData = { first: string; second: ReactNode; href: `#${string}` }; // v1.3 (Dev Q19): cells 1–3 pass <Disclosure as="span" />
```

- **Registration cell:** the first sentence is "Registered with FIU-IND." When `FIU_REG_NO` is set it becomes "Registered with FIU-IND, no. {FIU_REG_NO}." The second sentence (the limit) is always present.

### 4.10 `AllocationBar` (`allocation-bar.tsx`)

- **API:** `<AllocationBar size="sm" | "lg">`. It reads `SLEEVES` from `src/lib/basket.ts` (the weights are illustrative).
- **Anatomy:**
  - `div.flex.overflow-hidden.rounded-xs`, with `gap-0.5` (sm) or `gap-1` (lg);
  - square segments `bg-data-us|gold|oil`, `style={{ flexGrow: weight }}`;
  - height **12px** (sm), or **32px below 1024 / 40px at ≥ 1024** (lg);
  - `aria-hidden` (the text carries every value).
- **Swatch:** `size-2.5` (10px) square, `rounded-none`, `bg-data-*`, `aria-hidden`.
- **States:** none. No hover, no animation.

### 4.11 `MoneyPath` (`money-path.tsx`)

- **Purpose:** shows that money comes back only by investing, maturing and redeeming.
- **Markup:** `<ol aria-label="Where your money goes">` with 5 `li`. In items 2–5 the connector **label comes first in DOM**, then the decorative line, then the node, so a screen reader hears each step as a sentence in order. Grid placement (below) puts them where they appear.

| `li` | Connector label (word for word) | Node (word for word) | Node style |
|---|---|---|---|
| 1 | – | Your bank account | end node |
| 2 | UPI or bank transfer, verified | Paraa wallet | middle node |
| 3 | Invest at the next daily price | Basket units | middle node |
| 4 | After it matures, redeem | Paraa wallet | middle node |
| 5 | Withdraw in rupees | Your bank account, in your name | end node |

- **Node:** `flex items-center justify-center rounded-sm px-3 text-center text-body-md font-semibold text-balance text-foreground`, **`min-h-14` (56) at ≥ 1024 and `min-h-11` (44) below**. v1.4 (D2 N8): `text-balance`, so "Your bank / account" doesn't leave one word on its last line.
  - End nodes (`li` 1 and 5): **v1.3 (decision 58, G1): `bg-brand text-brand-foreground`, no border** (ink on gold 8.72). Was `border-2 border-rule bg-card`. Gold marks "your money starts and ends in your own account", the section's message.
  - Middle nodes: `bg-muted` (Light on the white section, v1.3), no border.
  - In forced colours the gold fill drops out, so the end nodes add `forced-colors:border-2 forced-colors:border-[CanvasText]`. That keeps start and end distinct from the middle nodes.
- **Line:** decorative (`aria-hidden`): a 1px grey-500 rule plus a 16px arrow (`ArrowRight` horizontal, `ArrowDown` vertical), `text-muted-foreground`. **v1.5 (`web-design-guidelines`): the rule is a border, not a fill.** Vertical: `h-5 w-0 border-l border-input`. Horizontal: `h-0 flex-1 border-t border-input`. A background fill drops out in forced colours, while a border is forced to `CanvasText`, so the path stays connected (H5). Same colour, width and position as the v1.4 `bg-input` spans.
- **Label:** `text-body-md text-muted-foreground`, at most 2 lines at every width (the copy above is sized for that).
- **Node height (v1.3, Dev F5):** one- and two-line nodes are 56px at ≥ 1024. The 3-line end node "Your bank account, in your name" may be up to 72px (measured 70; **66** with `text-balance`, v1.5). No node is stretched by a connector label (B17).
- **Line breaks (v1.5, Dev 2 F10):** at ≥ 1024 the start node "Your bank account" has about 95px of text room (77px at 1024), so it takes 2 lines, "Your bank / account". **Accepted:** a three-word node breaks 2 + 1, and B30 targets only nodes and labels of four or more words. The copy and the first step's width stay.

**≥ 1024, horizontal** (exact classes):
- `ol`: `flex items-start` (**`items-start` is required**, so nodes are never stretched to the height of a connector's label).
- `li` 1: `flex-1 basis-0 min-w-0`, holding only its node.
- `li` 2–4: `flex-[2.1] basis-0 min-w-0 grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] grid-rows-[auto_auto] items-center gap-x-2`.
- `li` 5: as `li` 2–4 but `flex-[2.35]` and `grid-cols-[minmax(0,1.1fr)_minmax(0,1.25fr)]` (the end node is wider for its longer text).
- Inside `li` 2–5:
  - the label is `col-start-1 row-start-2 mt-1 self-start text-center`;
  - the line is `col-start-1 row-start-1 flex items-center` (a `h-px flex-1 bg-input` span, then `ArrowRight size-4 -ml-1`). **Row 1's height is the node's height and `items-center` centres the line on the node's middle**, whatever the node's height;
  - the node is `col-start-2 row-start-1`.
- **At 1152:** a flex unit is about 119px, so nodes are about 119px wide, the end node about 149px, and connectors about 131px.

**< 1024, vertical** (exact classes):
- `ol`: `flex flex-col max-w-[360px]`.
- `li` 2–5: `flex flex-col`. First a connector row `grid grid-cols-[2.5rem_minmax(0,1fr)] items-center py-1` containing:
  - **col 1:** `flex flex-col items-center`, with the line `h-5 w-px bg-input` (20px) above `ArrowDown size-4 -mt-1`, so the arrow sits centred under the line, directly above the next node;
  - **col 2:** the label.

  Then the node at full width.
- `li` 1: the node only.
- Total height at 390: about 430px.

- **States:** none.
- **Not shown:** custody. A node is added only when custody is confirmed (§12).

### 4.12 `Tabs` (`tabs.tsx`), **client**, on `@base-ui/react/tabs` (v1.3: to be rebuilt by hand, below)

- **Used once:** "Run the numbers".
- **Root:** `Tabs.Root value onValueChange` (controlled, so the hash can set it), `defaultValue="what-if"`.
- **List:** `Tabs.List data-tools-tablist class="flex border-b"` with `activateOnFocus` and `loopFocus`.
- **Tab:** `Tabs.Tab class="-mb-px inline-flex min-h-11 flex-1 items-center justify-center border-b-2 border-transparent px-3 py-2 text-center text-body-md font-semibold text-balance text-muted-foreground transition-colors duration-150 hover:text-foreground data-active:border-foreground data-active:text-foreground sm:flex-none sm:px-4 focus-visible:outline-offset-[-2px] rounded-t-sm forced-colors:border-[Canvas] forced-colors:data-active:border-[CanvasText]"`.
  - **v1.3 (D2 S1):** the last two classes. In forced colours the transparent border is forced to CanvasText too, so without them the selected tab looks like the others (H5 failed).
- **Panel:** `Tabs.Panel keepMounted inert={false} data-tools-panel class="pt-6 data-starting-style:opacity-0 transition-opacity duration-200 ease-out"`. Each panel's own heading is its first child.
  - **v1.3 (Dev F7):** `inert={false}`. Base UI marks the unselected panel `inert` even in the server HTML, which would put the stacked tax panel out of reach with JS off.
  - **v1.4 (D2 N10):** the panel keeps its Tab stop (APG: its first content isn't focusable). Its ring is drawn inset (`focus-visible:outline-offset-[-2px]`), so it doesn't sit on the card's edge around a 930px box.
  - **v1.5 (Dev 1, FL-26, accepted):** in the hand-built Tabs, `starting:opacity-0` is applied only after the first tab change. `@starting-style` also fires when the page first renders, which would fade the panel in on load (G2). The 200ms fade on every tab change is unchanged.
- **No `Tabs.Indicator`.** The selected bar is the tab's own border: server-rendered and visible without JS. In forced colours it's kept by the two `forced-colors:` classes above.

**v1.3 rebuild without Base UI (decision 26, §9; should-fix, Dev 1).** `tabs.tsx` keeps its exports (`Tabs`, `TabsList`, `Tab`, `TabsPanel`, `TabsNoScript`) and the classes above, so `tools-tabs.tsx` changes only its imports. The contract it must meet is WAI-ARIA APG Tabs with automatic activation:

| Part | Must |
|---|---|
| Root | controlled `value` / `onValueChange`; context only, no DOM |
| List | `role="tablist"`, `data-tools-tablist`, `aria-label` passed through |
| Tab | `<button type="button" role="tab" id aria-controls aria-selected>`; `data-active` on the selected tab (so the classes above still work); **roving `tabIndex`** (0 on the selected tab, −1 on the other) |
| Keys | ←/→ move focus **and select**, wrapping; Home/End go to the ends. The browser handles Tab |
| Panel | `role="tabpanel" id aria-labelledby tabIndex={0} data-tools-panel`; always mounted; the inactive panel has `hidden` (never `inert`); `starting:opacity-0 transition-opacity duration-200 ease-out` for the fade-in; `focus-visible:outline-offset-[-2px]` (v1.4) |
| Server HTML | identical to today's: selected tab and panel from `value`, so there's no CLS and `TabsNoScript` works unchanged |

Re-test D3, E3, G4, H1 and H5 after the rebuild.
- **States:**

| State | Treatment |
|---|---|
| default | `text-muted-foreground`, transparent bar |
| hover | `text-foreground` |
| focus-visible | inset ring |
| selected | `text-foreground` + 2px `border-foreground` bar, `aria-selected="true"` |
| disabled | n/a |

- **Keyboard** (WAI-ARIA Tabs, automatic activation):
  - ←/→ move and select, wrapping;
  - Home/End go to the ends;
  - Tab moves into the panel.
- **Responsive:**
  - < 640: two equal halves (`flex-1`); labels wrap to 2 lines, never truncate.
  - ≥ 640: tabs size to their label.
- **No-JS** (decision 28): render, inside the section,

```tsx
<noscript dangerouslySetInnerHTML={{ __html: "<style>[data-tools-tablist]{display:none}@layer base{[data-tools-panel][hidden]{display:block!important}}[data-tools-panel]+[data-tools-panel]{margin-top:3rem}</style>" }} />
```

  Both panels then show, stacked, each under its own `h3`.
  - **v1.3 (Dev F6):** the `[hidden]` rule sits in `@layer base`. Tailwind's preflight hides `[hidden]` with `!important` in that layer, and a layered `!important` beats an unlayered one. Inside the layer, this rule wins on specificity (0,2,0 over 0,1,0).
- **Hash:** see §5.3.

### 4.13 `ChoiceChips` (`choice-chips.tsx`)

- **Markup:** `<fieldset class="min-w-0"><legend class="mb-3 text-body-md font-semibold text-foreground">{legend}</legend><div class="flex flex-wrap gap-2">…</div></fieldset>`. Each option is a `<input type="radio" class="peer sr-only" id name value>` followed by a `<label for>`. **With a helper** (the slab group): the legend loses `mb-3`, the helper `p.mb-3` follows it, and the `<fieldset>` gets `aria-describedby` = the helper's id (v1.2).
- **Label classes:** `inline-flex min-h-11 cursor-pointer items-center rounded-sm border border-input bg-card px-4 py-2 text-left text-body-md font-semibold text-foreground num transition-colors duration-150 ease-out hover:border-foreground motion-safe:active:scale-97 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring forced-colors:peer-checked:outline-2`
- **Variant `grid2`** (amounts): the option container is `grid grid-cols-2 gap-2` below 640 (two even rows, every chip the same width) and `sm:flex sm:flex-wrap` from 640. Labels are `justify-center` below 640.
- **Variant `twoLine`** (scenarios):
  - layout: a grid `grid-cols-2 sm:grid-cols-3 gap-2` instead of flex-wrap;
  - label `min-h-14 flex-col items-start justify-center` with a title (`font-semibold`) and a note (`font-normal text-muted-foreground text-balance`, and `peer-checked:` → `text-primary-foreground` at 80%: use `peer-checked:[&>span:last-child]:text-primary-foreground/80`);
  - a note may wrap to 2 lines (for example "Rupee 5% stronger" at 390); chips in a row then share the taller height through the grid.
  - **v1.4 (D1 V5, conditional):** below 640, `twoLine` labels use `px-3` (`px-3 sm:px-4`). Adopt it only if, at 390, "Rupee stronger too" and "Rupee 5% stronger" then fit on one line. If they still wrap, keep `px-4`. At 320 the wrap stays either way.
- **States:**

| State | Treatment |
|---|---|
| default | as above |
| hover | `border-foreground` |
| focus-visible | ring (on the label, from the radio) |
| active | scale |
| checked | ink fill + white text, `aria-checked` (native) |
| none checked | valid (scenarios after a slider moves) |
| disabled | n/a |

- **Keyboard:** native radio group. One Tab stop per group, arrows move and select.
- **No-JS:** radios check natively; results don't update (the `<noscript>` line explains it).
- **No check icon** (decision 29).
- **Before hydration (v1.5, FL-10):** a commit-time callback ref (not a hook) adopts a radio checked before hydration, so an uncontrolled `ChoiceChips` stays usable from a Server Component.

### 4.14 `Slider` (`slider.tsx`), **client**

- **Markup:**

```tsx
<div class="w-full">
  <div class="flex items-baseline justify-between gap-4">
    <label for={id} class="text-body-md text-copy">{label}</label>
    <span aria-hidden class="num shrink-0 text-body-md font-semibold whitespace-nowrap text-foreground">{format(value)}</span>
  </div>
  <div class="relative isolate">
    {crossesZero && !nearZero && <span aria-hidden class="absolute top-1/2 z-0 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-muted-foreground" style={{ left: `calc(0.75rem + (100% - 1.5rem) * ${origin})` }} />}
    <input id type="range" class="range relative z-[1]" min max step value onChange
           aria-valuetext={format(value)} aria-describedby={hint ? `${id}-hint` : undefined}
           style={{ "--a": Math.min(pos, origin), "--b": Math.max(pos, origin) }} />
  </div>
  {hint && <p id={`${id}-hint`} class="mt-1 text-body-md text-muted-foreground">{hint}</p>}
</div>
```

- **Visual:**
  - 44px hit row;
  - 6px track `border-strong`;
  - fill `foreground` from the origin (0 when the range crosses zero, else min) to the value;
  - **24px thumb, white fill, 2px ink border.**
  - **Zero tick** (only when the range crosses zero): a 2 × 16px mark drawn **under** the input (`z-0`, input `z-[1]`), so the track fill and the thumb always paint over it.
  - **The value** never splits: `shrink-0 whitespace-nowrap` (v1.3, Dev 3's foundation change). "+₹1,00,000" must not break after "+" beside a two-line label, so the label wraps instead.
  - **`nearZero`** is true while the thumb's centre is within **32px** of the tick (v1.3, D1 V1: the 24px thumb plus 8px clear; at 24px the tick still read as touching the thumb, at the 768 tax default and at 390 Gold −5%): `Math.abs(pos - origin) * trackWidth < 32`, where `trackWidth` is the input's width minus 24px, read with a `ResizeObserver` on the input. While true, the tick isn't rendered. This removes the "⊢◯" collision at the tax default (₹1,00,000 sits 4% from zero). **Before the first measurement** (server HTML, JS off), assume the narrowest track on the page (224px), so the tick can only appear after hydration, never vanish (v1.2).
- **States:**

| State | Treatment |
|---|---|
| default | as above |
| hover / active | 6px halo (`foreground` 12%) |
| focus-visible | ring on the input |
| dragging | the thumb under the pointer, 1:1, no easing |
| disabled | n/a |
| forced colours | native rendering |

- **Keyboard:** native (arrows ±step, Home/End). PageUp/PageDown use browser defaults.
- **WCAG 2.5.7:** a click on the track jumps there; keys work; presets offer a third path.
- **Touch:** don't set `touch-action`. A vertical swipe that starts on the slider must scroll the page (QA F10).
- **Replaces** `components/watermelon/adaptive-slider.tsx`.
- **Before hydration (v1.5, FL-10):** a mount `useLayoutEffect` adopts the input's DOM value and calls `onValueChange` if it differs, so a slider moved before the scripts loaded keeps its value (the same pattern as `AskForm`, Q36).

### 4.15 Tool result parts (`tool-result.tsx`)

- **`ResultInset`**, two elements with separate jobs (v1.1, N4):
  - **The column** (right column of the L4 grid at ≥ 1024) **fills**: `lg:self-stretch lg:rounded-r-md lg:bg-background-alt lg:border-l lg:p-8` (v1.3, Dev Q28: `rounded-r-md` keeps the fill inside the card's corners; v1.3 the fill is Light). The grey fill runs the full height of the card, whatever the inputs' height. Below 1024 it is `mt-8 border-t pt-6`, with no fill.
  - **The inner wrapper sticks:** `<div class="lg:tall:sticky lg:tall:top-[calc(var(--header-h)+1.5rem)]">`. All result content goes in it, so the figures stay in view while the sliders scroll.
  - The L4 grid itself is `lg:items-stretch` (the default `stretch`, stated so nobody adds `items-start`).
- **Order inside the wrapper:**
  1. `h4.type-subhead` (the result heading);
  2. **scenario line** `mt-1 text-body-md font-semibold text-foreground` (what-if only);
  3. figure label `mt-4 text-body-md text-muted-foreground`;
  4. figure `type-figure text-foreground` (`<span class="num">`, **never `<output>`**: it would announce every drag step);
  5. change `text-body-lg font-semibold num`;
  6. breakdown (below);
  7. footnote `mt-4 border-t pt-4 text-body-md text-muted-foreground` (from the disclosure registry).
- **`Breakdown`** (what-if only; v1.1, N5 and N18b): a label `p.mt-6.text-body-md.font-semibold.text-foreground` "Where the change came from", then `<dl class="mt-2 divide-y">`. **Each row is a grid**, not the flex `DefinitionList` row:
  - row: `div.grid.grid-cols-[minmax(0,1fr)_auto].items-baseline.gap-x-4.gap-y-2.py-3`;
  - `dt` (col 1): `flex items-center gap-2 text-body-md font-semibold text-foreground` (swatch + sleeve name), then on its own line `span.block.font-normal.text-muted-foreground` with the detail ("−25% on its part of the basket");
  - `dd` (col 2): `text-right text-body-md font-semibold text-foreground num` (the signed ₹ amount);
  - **v1.3 (Dev Q29):** the bar sits in a second `<dd aria-hidden class="col-span-2">` after the amount (valid HTML: a `dl` group may hold several `dd`), and `DivergingBar` itself drops `col-span-2`.
- **`DivergingBar`:**
  - `span.relative.block.h-1.bg-border`, with a 1px zero line `bg-muted-foreground` at 50% (v1.3: the track was `bg-muted`, which vanishes on the Light inset. `bg-border` is grey-300 inside the Light tools section, and the zero line takes the slider tick's colour);
  - the fill `bg-foreground` in both directions, from 50% to the right (gain) or left (loss);
  - width = `min(1, |value| / scale) × 50%` via `transform: scaleX()` with `transform-origin` at the zero line (not a `width` transition);
  - no transition while dragging, `duration-150` when a chip sets the value;
  - `aria-hidden`.
- **`SplitBar`** (tax): `flex h-3 overflow-hidden rounded-xs gap-0.5`. Keep part `bg-foreground` (`flexGrow` = keep share), tax part `bg-border-strong`. `aria-hidden`.
- **`ResultReadout`** (below 1024 only):
  - `lg:hidden tall:sticky top-header z-10 -mx-5 -mt-5 mb-5 sm:-mx-8 sm:-mt-8 sm:mb-8 flex h-readout items-center gap-2 rounded-t-md border-b bg-card px-5 sm:px-8 text-body-md num` (it sits flush with the card's top edge);
  - **the first child of the tool card (`Panel`)**, before the inputs column, so its negative margins make it flush with the card's top and side edges and it sticks only while the tool is on screen;
  - text (v1.1, B2): what-if `Example result: ` + `<span class="font-semibold text-foreground">{value}</span>` + ` ({change})`; tax `Estimate: you’d keep ` + **{keep}**, or `Estimate: a loss of ` + **{loss}**. **The honesty word always comes first**, so the stuck line never shows a bare figure. One line at 320 (about 248px of room);
  - **colour (v1.3, Dev Q26): the whole line is ink**, with no `text-muted-foreground`. The honesty word must not be quieter than the figure it qualifies (K12, decision 53; D1 and D2 agree);
  - `aria-hidden` (the live region speaks, and it still names the scenario).
  - Every focusable control **inside the tool card** gets `scroll-mt-[calc(var(--header-h)+var(--readout-h)+1rem)]`. It's built into `Slider` (the input) and `ChoiceChips` (each radio). The tools developer adds it to the reset button and the "Ask a CA about your own tax" link. The tab list sits above the card, where the readout can't cover it, so it doesn't need the margin (v1.2).
- **`LiveRegion`:**
  - one `<p class="sr-only" aria-live="polite" aria-atomic="true">` per tool;
  - text set **400ms after the last change** (debounced; on `pointerup`/`keyup` it flushes immediately);
  - the text is given per tool in §6.6.

### 4.16 Form fields (`field.tsx`), used by `AskForm`

| Part | Spec |
|---|---|
| Field wrapper | `min-w-0` |
| Label | `<label for class="mb-2 block text-body-md font-semibold text-foreground">`. Optional fields say "(optional)" in the label. Required fields have no mark |
| Helper | `<p id="{id}-help" class="mb-2 text-body-md text-muted-foreground">`, between the label and the input |
| Input | `h-12 w-full rounded-sm border border-input bg-card px-4 text-body-lg text-foreground transition-colors duration-150 hover:border-foreground focus-visible:border-foreground read-only:bg-background-alt aria-invalid:ring-1 aria-invalid:ring-inset aria-invalid:ring-error aria-invalid:border-error` |
| PhoneField | an input wrapper `relative`; `+91` as `pointer-events-none absolute inset-y-0 left-4 flex items-center text-body-lg text-placeholder` (`aria-hidden`); input `pl-13 num`, `type="tel" inputMode="tel" autoComplete="tel-national"` |
| TextArea | `min-h-32 py-3 resize-y`, `rows={4}`, `maxLength={1000}` |
| Counter (question) | rendered only when the length is ≥ 800: `mt-2 text-right text-body-md text-muted-foreground num`, "{n} / 1,000". At 1,000: "1,000 / 1,000, the limit" |
| Checkbox | native `<input type="checkbox" class="mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs accent-primary">` inside `<label class="flex min-h-11 cursor-pointer items-start gap-3 text-body-md text-copy">` |
| Error | `<p id="{id}-error" class="mt-2 flex items-start gap-2 text-body-md font-semibold text-foreground">` with `CircleAlert` 16px `text-error` (`aria-hidden`, `mt-[3px]`) and the message from `validateRequest` |
| `aria-describedby` | `"{id}-help {id}-error"`, only the ids that exist |

**Field states:**

| State | Treatment |
|---|---|
| default | as above |
| hover | `border-foreground` |
| focus-visible | ring + `border-foreground` |
| filled | default |
| error | error border + ring-1, message, `aria-invalid="true"` |
| read-only (sending) | `readOnly`, `bg-background-alt` (Light, v1.3: ink 12.80, the grey-600 `+91` 6.77), text selectable |
| disabled | n/a |

**`QuestionPrompts`** (client; v1.3, Dev Q33: `src/components/ui/question-prompts.tsx`, with no directive of its own, because only `AskForm` imports it):
- markup: `<div><p class="mb-1 text-body-md text-muted-foreground">Not sure what to ask? Tap one to add it:</p><ul class="-mx-4">` with one `li` per prompt. The `-mx-4` (v1.1, N11) lines the `Plus` icons up with the field labels' left edge and keeps the hover fill's padding; it stays inside the card padding at both `p-5` and `p-8`;
- each prompt is a `Button variant="quiet" size="md"` with `w-full justify-start text-left whitespace-normal min-h-11` and a leading `Plus`.
- **Behaviour:**
  - On click, append the prompt to the question (on a new line if there's already text).
  - Move focus to the end of the textarea.
  - Clear the question error.
  - If appending would exceed 1,000 characters, don't append, and show the helper "There isn't room to add this. Edit your question first." under the list (polite, through the form status region).
- **No-JS:** not rendered (they need JS). The textarea works.

### 4.17 `Alert` (`alert.tsx`)

| Variant | Container | Icon (20px) | Role / focus | Used for |
|---|---|---|---|---|
| `info` | `flex gap-3 rounded-sm border border-border bg-muted p-4 text-body-md text-foreground` (the container's ink colours the icon and title; the body is `text-copy`, v1.2) | `Info` | none | the tools' `<noscript>` line |
| `error` | `flex gap-3 rounded-sm border border-error bg-card p-4` | `CircleAlert` `text-error` | `role="alert"`, `tabIndex={-1}`, focused on appear | 503, failure, offline (§7) |

- **Anatomy:** icon, then a body with an `h3.type-subhead` title (when given), a `p.mt-1.text-body-md.text-copy` body, and actions `mt-4 flex flex-wrap gap-2` (Button `secondary md`).
- **Never** a toast, never auto-dismissed.

### 4.18 `FaqItem` (`faq-item.tsx`)

- **Markup:** `<details id="faq-{slug}" class="group border-t" open={first}>`
- **Summary:** `<summary class="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 type-question text-foreground rounded-sm [&::-webkit-details-marker]:hidden">` (v1.3: `type-question`, the same metrics as `type-subhead` at 600, decision 61), with the question, then `Plus` 20px `text-muted-foreground group-open:hidden` and `Minus` 20px `text-muted-foreground hidden group-open:block` (`aria-hidden`). Both go `text-foreground` on hover (v1.2).
- **Answer:** `<div class="pb-6 max-w-prose text-body-lg text-copy">`.
- **List:** the wrapper is `border-b`.
- **Expand animation:** `[&::details-content]:transition-[height,content-visibility] [&::details-content]:duration-200 [&::details-content]:[transition-behavior:allow-discrete] [interpolate-size:allow-keywords]` on the `details`, with `[&::details-content]:h-0 open:[&::details-content]:h-auto [&::details-content]:overflow-hidden`.
- **States:**

| State | Treatment |
|---|---|
| default | closed (except the first) |
| hover | the icon goes `text-foreground`; the question underlines |
| focus-visible | ring on the summary |
| open | `Minus` shown, answer visible |
| disabled | n/a |

- **Rules:**
  - Several items may be open at once (no `name=`).
  - Questions are not headings.
  - Chrome's find-in-page opens matching closed items natively.

### 4.19 Header parts (`components/site/`)

- **`SiteHeader`** (server):
  - `<header data-header class="relative tall:sticky top-0 z-40 h-header border-b border-border bg-background data-[at-top]:border-transparent">` (v1.2: `relative`, so the menu panel anchors to the header when it isn't sticky) → `div.container-page.flex.h-full.items-center.gap-6`;
  - Brand, then `<nav aria-label="Main" class="hidden lg:block">` with `NavLink`s, then the right group `ml-auto flex items-center gap-2`: `ButtonLink variant="secondary" size="md" href="/#ask"` "Ask a CA", then `MobileMenu` (`lg:hidden`).
- **`ScrollState`** (client island, renders nothing):
  1. An IntersectionObserver on a 1px sentinel `<div data-top-sentinel class="h-px">` (first child of `main`) toggles `data-at-top` on the header. With JS off the hairline always shows.
  2. Scrollspy: an observer with `rootMargin: "-50% 0px -50% 0px"` over the section ids in `NAV` sets `aria-current="location"` and the marker on the matching `NavLink`. With no section crossing (hero, footer), nothing is current.
- **`MobileMenu`** (client enhancements on a native `<details>`):
  - **Summary:** `grid size-11 place-items-center rounded-sm border border-input text-foreground hover:border-foreground [&::-webkit-details-marker]:hidden list-none cursor-pointer`, with `Menu` (`group-open:hidden`) and `X` (`hidden group-open:block`). `aria-label` is "Menu" closed and "Close menu" open (set by script; it stays "Menu" without JS).
  - **Panel:** `absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b bg-background shadow-panel`, with `nav[aria-label="Main menu"].container-page.py-3`. Rows: `ul.divide-y`, each `a.flex.min-h-13.items-center.justify-between.text-body-lg.font-semibold.text-foreground` with a trailing `ArrowRight` (`text-muted-foreground`). **No CTA inside the panel** (v1.1, N13): the header's "Ask a CA" stays visible above the open panel, so the action is never shown twice.
  - **Script behaviour:**
    1. Esc closes it and focuses the summary.
    2. A link click closes it.
    3. A click outside the header closes it.
    4. **`focusout` to outside the `<details>` closes it** (WCAG 2.4.11).
    5. A `matchMedia("(min-width: 64rem)")` change to true closes it.
  - **Not modal:** no focus trap, no scroll lock.
- **Brand** (`brand.tsx`):
  - **Link (v1.5, decision 68):** `<a href="/#top" aria-label="Paraa Capital, home" class="inline-flex min-h-11 shrink-0 items-center rounded-sm">`. It's a plain `<a>`, which `HashHandler` scrolls to the top with the h1 focused, so the page doesn't reload and nothing typed is lost. Was `next/link` to `/`.
  - **Image (v1.3):** `const { props } = getImageProps({ src: LOGO, alt: "", loading: "eager" })`, computed once at module scope, then `<img {...props} className="h-10 w-auto" />`. The footer instance is lazy (`<Brand loading="lazy" />`). The logo ships no client JS. (It was `<Image … preload>` up to v1.2.)
  - **Swap point (owner decision 6):** `brand.tsx` declares `import LOGO from "@/assets/paraa-logo.png"` on one line, with the comment `// Swap point: replace with the ink-wordmark lockup (SVG preferred) when supplied.` Nothing else references the file.
- **`SkipLink`:** first in `<body>`, `href="#main"`, "Skip to content". `sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-100 inline-flex min-h-11 items-center rounded-sm bg-primary px-4 text-body-md font-semibold text-primary-foreground`. `main#main` has `tabIndex={-1}` and `outline-none`.

### 4.20 `SiteFooter` (`components/site/footer.tsx`, server)

The structure is in §6.9. Links come from `NAV` plus the CTA. Disclosures come from the registry.

### 4.21 `Disclosure` (`disclosure.tsx`) and the registry

- **Registry:** `src/content/disclosures.tsx` exports `DISCLOSURES: Record<DisclosureId, (ctx: DisclosureContext) => ReactNode>`, with `DisclosureContext = { fiuRegNo: string | null }` defaulting to `FIU_REG_NO` (v1.2). Entries return inline content only. **Every disclaimer or limit sentence on the page renders from here and nowhere else** (R15). The registry is closed: a new or changed sentence is a spec change with a new `-vN` id.
- **Component:** `<Disclosure id variant="block" | "inline" as="div" | "p" | "span">` renders the chosen element (default `div`) with `data-disclosure-id={id}` (v1.2). Pick the element that is valid in the parent: `span` inside the fact-cell link, `p` for the slider hint and the footer OTP line.
  - `block` (footer): `max-w-[72ch] text-body-md text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground`;
  - `inline`: **inherits the size of the claim it qualifies** (pass `className`). Colour is `text-copy` or `text-muted-foreground` as the section specifies.
- **Rules:** never collapsed, never in a tooltip, never sticky or floating, never animated, ≥ 14px, ≥ 4.5:1.

| Id | Text (word for word) | Where |
|---|---|---|
| `global-risk-v3` | **Investing involves risk, including the loss of money you invest.** The basket invests in US stocks, gold and crude oil through derivative contracts and is valued in US dollars, so changes in the rupee affect its value in both directions. Past performance doesn’t predict future results; examples on this site are for illustration only. Tax information is general; your CA will confirm your own. Your CA may be paid by Paraa Capital. Nothing on this site is personal investment advice. | Footer (owner-protected, unchanged) |
| `fiu-registration-v1` | **Paraa Capital is registered with FIU-IND{ (Reg. no. {FIU_REG_NO})}.** This registration is for anti-money-laundering reporting. It doesn’t mean any government body has approved or recommends this investment. | Footer |
| `asci-vda-v1` | Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions. | Footer only, verbatim (R14) |
| `fiu-cell-v1` | For anti-money-laundering reporting. This isn’t approval of this investment. | Hero cell 1 |
| `withdraw-cell-v1` | In rupees, to a bank account in your name, after your investment matures. | Hero cell 3 (v1.1, B1) |
| `risk-cell-v1` | You hold units of the basket, not the shares, gold or oil. | Hero cell 2 |
| `mock-caption-v1` | An illustration, not a screenshot of the app or a real account. | Under every `MockFrame` |
| `basket-example-v1` | Example mix. These percentages are an example. | Basket |
| `rupee-both-v1` | A weaker rupee raises your investment’s rupee value. A stronger rupee lowers it. | What-if rupee slider hint |
| `scenarios-v1` | Made-up scenarios on an example mix. Not a forecast, and not the basket’s past returns. | What-if, under the scenario chips |
| `whatif-foot-v1` | Example only, before fees and tax. | What-if result |
| `tax-foot-v1` | Estimate only. It assumes profit is taxed as business income at your slab, and leaves out surcharge and rebates. If the basket counts as a virtual digital asset, tax is a flat 30% plus cess, whatever your slab. | Tax result |
| `ca-paid-v1` | Your CA may be paid by us. | Ask a CA, FAQ "Who reads my question?" |
| `otp-v1` | We never ask you to share your OTP or PIN, or to pay into a personal account. | Footer brand column |
| `no-shortcut-v1` | There’s no shortcut back. Money you add has to be invested, mature and be redeemed before you can withdraw it. | How it works, under the path |
| `fiu-band-v1` | Paraa Capital is registered with FIU-IND (Financial Intelligence Unit-India) for anti-money-laundering reporting. That means we must verify customers, keep records and report suspicious transactions. It isn’t approval of this investment, and no authority recommends it. | Security row D; FAQ "Is Paraa registered with anyone?" |

---

## 5. Page order, surfaces, navigation and anchors

### 5.1 Order and surfaces (`src/app/page.tsx`)

| # | Section | `id` | Tone | Component file |
|---|---|---|---|---|
| – | Skip link, header | – | white | `site/header.tsx` |
| 1 | Hero (+ facts row) | `top` | base (white) | `home/hero.tsx` |
| 2 | What you're buying | `basket` | alt (Light `#F2F2F2`, v1.3) | `home/basket.tsx` |
| 3 | How it works | `how` | base | `home/how-it-works.tsx` |
| 4 | How we protect your account | `security` | **ink** | `home/security.tsx` |
| 5 | Run the numbers | `numbers` | alt | `home/tools.tsx` |
| 6 | Questions before you invest | `faq` | base | `home/faq.tsx` |
| 7 | Ask a chartered accountant | `ask` | alt | `home/ask.tsx` |
| – | Footer | – | base, `border-t` | `site/footer.tsx` |

Inside `<main id="main" tabIndex={-1} class="flex-1 outline-none">`, the first child is the top sentinel (§4.19). `ScrollState` and `HashHandler` mount once, after `main`.

**Page-length budget (v1.1; v1.4 for 390):** ≤ **7,700px** at 1440 and ≤ **12,100px** at 390 (decision 65 raised it from 12,000 for the fact-cell limits). The ink band is ≤ **1,250px** at 1440 and ≤ 2,000px at 390. The reference build measured 7,617 / 11,990 with the v1.1 fixes, and D2's copy changes net out at about 7,660 / 11,960.

**Budget rule:** budgets are ceilings for layout. **A budget is never met by cutting a limit, a disclosure, a state's copy or slider precision** (track length, step size or range). If a budget is missed, reduce spacing or layout first, then raise it with the owner. Never remove honesty content.

### 5.2 Navigation source: `src/lib/nav.ts`

```ts
export const NAV = [
  { id: "basket",   href: "/#basket",   label: "The basket" },
  { id: "how",      href: "/#how",      label: "How it works" },
  { id: "security", href: "/#security", label: "Security" },
  { id: "numbers",  href: "/#numbers",  label: "Calculators" },
  { id: "faq",      href: "/#faq",      label: "FAQ" },
] as const;
export const CTA = { href: "/#ask", label: "Ask a CA" } as const;
```

The header, mobile menu, footer and scrollspy all read these. The `BLOG_URL` logic is kept: when it's set, add `{ href: BLOG_URL, label: "Blog", external: true }` to the header, menu and footer.

**`APP_URL` slot (v1.1, decision 57).** `src/lib/links.ts` gains:

```ts
// The official app listing or web-app address, on the official domain or store. null hides every app link.
export const APP_URL: string | null = null;
```

- **While `null`:** nothing renders and **no space is reserved**. The layout is identical to a build without the slot.
- **When set:** exactly two links appear, both external (new tab, `ArrowUpRight`, sr-only "(opens in a new tab)"), with the label **"Get the app"**:
  1. in How it works, as a `TextLink variant="standalone"` on its own line `mt-4` after the off-ramp line (§6.4);
  2. in the footer links, after "Ask a CA" (§6.9).
- **Never** in the header or the hero, which keep one action ("Ask a CA").

### 5.3 Anchors, hash and focus (`home/hash-handler.tsx`, client, renders nothing)

| Trigger | Behaviour |
|---|---|
| Any in-page link click (`a[href^="/#"]` or `a[href^="#"]`) | Scroll to the target, landing under the header via `scroll-padding-top`. Then focus the target's heading (`h2` of a section, `h3` of a band row, or `summary` of an FAQ item) with `focus({ preventScroll: true })`. Targets have `tabIndex={-1}`. **v1.4 (D2 N1):** `HashHandler` takes the click, and scrolls smoothly only when the target is within 2 viewport heights. A longer jump uses `behavior: "instant"` (v1.5, Dev 2 Q39: `"auto"` follows the CSS `scroll-behavior`, so it isn't reliably instant): the hero CTA → `#ask` took 2.1s, and "You can lose money" → `#numbers` 3.3s. RM is always instant |
| Load with a section hash (v1.4, D2 N9) | `/#ask`, `/#numbers` or any other section id: scroll there and focus its `h2` (no ring), the same as a click. **`/#ask-form` is the exception:** the form owns focus there (it focuses its Alert, first error or confirmation heading, §7.4), so `HashHandler` doesn't touch it |
| Hash `#what-if` or `#tax` (on load, `hashchange`, or click) | Set the Tabs value, then scroll to `#numbers` and focus the selected panel's `h3` |
| Tab change | `history.replaceState(null, "", "#what-if" or "#tax")` (no history entry) |
| Hash `#faq-<slug>` | Open that `<details>`, scroll to it, focus its `summary` |
| Old hash `#tour` | Replace with `#top`, focus the `h1` |
| Old hash `#trust` | Replace with `#security` |
| Old hash `#ask` from any CTA | Focus the `#ask` `h2`, **never a field** (no keyboard jumping up on phones) |

**No-JS:** native anchor jumps work. Tabs, FAQ opening and focus moves don't.

---

## 6. Sections

Each section gives its layout at 320 / 390 / 768 / 1024 / 1440, its copy, its interactions and states, and its no-JS and RM behaviour.

### 6.0 Page metadata (`page.tsx`, `layout.tsx`)

| Field | Copy |
|---|---|
| `title.absolute` | Paraa Capital: a basket that follows US stocks, gold and crude oil, for residents of India |
| `description` | One basket that follows US stocks, gold and crude oil, for residents of India. You add money and withdraw in rupees. |
| `openGraph.title` | A basket that follows US stocks, gold and crude oil |
| `openGraph.description` | same as `description` |
| (v1.3, Dev Q23) | `openGraph` lives **only in `layout.tsx`**. In Next 16 a page-level `openGraph` replaces the layout's object instead of merging, which would drop `siteName`, `locale` and `type`. The page sets only `title.absolute` and `description` |
| `metadataBase` | `https://paraacapital.com` (unchanged until the official domain is confirmed, §12) |

(No risk sentence in the metadata: owner decision 1 covers the hero cell only.)

### 6.1 Header

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Height | 64 | 64 | 64 | 64 | 64 |
| Contents (measured, v1.1 N23) | logo 102 + `gap-6` 24 + CTA 91 + `gap-2` 8 + menu 44 = **269 of 288** (19 spare) | same, 269 of 358 | same, of 720 | logo · 5 nav links · CTA | same, centred 1152 |
| Sticky | if viewport height ≥ 600 | yes | yes | yes | yes |

**Copy:** the nav labels and the CTA as in §5.2. Menu toggle `aria-label`: "Menu" / "Close menu".

**Interactions and states:**

| State | Treatment |
|---|---|
| at top of the page | no hairline (`data-at-top`, JS) |
| scrolled | 1px hairline |
| nav link hover | `text-foreground` |
| current section | ink text + 2px ink bar, `aria-current="location"` |
| menu | §4.19 |
| over the band | the header stays white (no flip) |

**No-JS:** hairline always on; no current marker; the menu opens and closes natively; links jump. **RM:** no fades.

### 6.2 Hero (`#top`, base)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Padding | top 32, bottom 64 | 32 / 64 | 64 / 96 | 80 / 96 | 80 / 96 |
| Grid | stack | stack | stack | **6/6 (456 / 456**, v1.5: (976 − 64) / 2; v1.3 said 464 in error), `items-center` (v1.3, D1 V2: `lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`; the h1 is 3 lines instead of 4, at the same hero height) | L3 5/7 (453 / 635), from 1280 |
| Order | copy → facts row → panel | same | same | copy (left) and panel (right), facts row full width below | same |
| h1 | 32/38 | 36/42 | 44/50 | 48/54 | 48/54 |
| CTA | `lg` block, full width | full width | auto width | auto | auto |
| Panel width | 288 | 358 | 600: `sm:max-w-[600px] lg:max-w-none` (v1.3, Dev Q24; from 640, so 640–767 also stops at 600) | **456** (v1.5; every row still one line, measured) | 635 |
| Facts row | `mt-12`, 1 column | 1 column | `mt-12`, 2 × 2 | `mt-16`, 4 columns | 4 columns |
| Panel (below 1024) | `mt-12` after the facts row | `mt-12` | `mt-12` | – (beside the copy) | – |

- **Placement by grid lines** (v1.3, Dev F4; Tailwind has no `grid-template-areas` utility):
  - copy: `lg:col-start-1 lg:row-start-1`;
  - panel: `lg:col-start-2 lg:row-start-1`;
  - facts: `lg:col-span-2 lg:row-start-2`.

  Below 1024 the three simply stack. The gaps are set as margins on the facts row and the panel (above), not as a grid `gap`, so each gap is one class (§3.3).
- **DOM order is copy → facts → panel at every width.** The panel has no focusable content, so tab order matches what you see.

**Spacing inside the copy column:**
- h1 → lede `mt-5` (20);
- lede → CTA `mt-8` (32);
- CTA → helper `mt-2` (8);
- panel → its caption `mt-3`.

**First view:**
- **1440×900:** the h1, lede, CTA, helper, the panel, and all four cells' first sentences are visible (the reference build measured the row at y = 669).
- **390×844:** the h1, lede, CTA, helper and cells 1–2 (registration and **"You can lose money"**) are fully visible, plus cell 3's first sentence. v1.4, measured with the 16px limits: cell 2 ends at y = 745, and cell 3's first sentence at 813.
- **360×740:** cell 1 in full, plus cell 2's first sentence (v1.4: cell 2's limit ends 5px below the fold).

**Copy:**

| Slot | Copy |
|---|---|
| h1 (`#hero-title`, `type-display`, `tabIndex={-1}`) | One basket that follows US stocks, gold and crude oil |
| Lede (`text-body-xl text-muted-foreground max-w-[52ch]`) | One of the baskets in the Paraa app, for residents of India. You add money and withdraw in rupees, and each unit’s price is updated once a day. |
| Primary button (`ButtonLink primary lg`, → `#ask`) | Ask a CA |
| Helper (`text-body-md text-muted-foreground`) | Send a question first. You don’t need an account. |
| Facts row heading (`h2.sr-only`) | Before you start |

**Facts row** (`ul` of `FactCell`, L5 grid):

| # | First sentence | Second sentence | Link |
|---|---|---|---|
| 1 | Registered with FIU-IND. (or "Registered with FIU-IND, no. {FIU_REG_NO}." when set) | For anti-money-laundering reporting. This isn’t approval of this investment. (`fiu-cell-v1`) | `#security-registration` |
| 2 | You can lose money. | You hold units of the basket, not the shares, gold or oil. (`risk-cell-v1`) | `#numbers` |
| 3 | Withdrawals go only to you. | In rupees, to a bank account in your name, after your investment matures. (`withdraw-cell-v1`) | `#security-withdrawals` |
| 4 | We never ask for your OTP or PIN. | Not by call, not by message. | `#security-otp` |

The order is fixed (decision 7). At 768 the 2 × 2 grid pairs registration and risk in the first row.

**Example panel** (`MockFrame elevated label="Example of the Paraa app"`; content in `home/hero-panel.tsx`, a Server Component):

| Part | Copy / spec |
|---|---|
| Header strip | "Paraa" · ExampleTag "Example" |
| `type-label text-muted-foreground` | Basket |
| Title (`mt-1 text-body-xl font-semibold`) | US stocks, gold and crude oil |
| `DefinitionList` (`mt-4`; rows `text-body-lg` at ≥ 640, `text-body-md` below) | Add money · UPI or bank transfer / Units bought at · The next daily price / Price · Updated once a day / Withdraw to · ••4821, in your name |
| Note (`mt-4 rounded-sm bg-muted p-3 text-body-md text-muted-foreground`) | Each investment has a maturity date. |
| Caption (outside the frame, `mock-caption-v1`) | An illustration, not a screenshot of the app or a real account. |

- **Web-shaped at ≥ 1024** (owner decision 4): landscape proportions, **about 635 × 430px** (measured in the reference build), header strip plus body. Below 1024 the same content fills the width.
- Below 360 the rows switch to the stacked `DefinitionList`.
- **The title stays "US stocks, gold and crude oil"** (v1.1, N15: "Your basket" is rejected because it implies a real account beside a caption that says it isn't one). When the owner confirms the app's own basket name, it replaces this title (§12 optional switches).

**Interactions:**
- Fact cells link to their proofs (§5.3 focus).
- The CTA goes to `#ask`.
- Nothing in the panel responds to the pointer.

**No-JS:** complete (it's a server-rendered section). **RM:** nothing moves.

### 6.3 What you're buying (`#basket`, alt)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Header | stack | stack | stack | split 7/5 | split |
| Example caption row | `mb-3` | | | | |
| Bar | lg, 32px tall | 32 | 32 | 40 | 40 |
| Sleeves | `RuleList`, one row per sleeve, `mt-6` | same | same | `mt-8`, grid `grid-cols-[50fr_30fr_20fr] gap-1` (v1.4, D1 V4: the bar's own gap, so every column starts under its segment; each column keeps `pr-6` for text spacing; was `gap-6`) under matching segments (484 / 290 / 194) | (572 / 343 / 229) |
| "What you own" | `mt-10`, `RuledItem` full width | `mt-10` | `mt-12` | `mt-12`; the **2px rule runs the full content width**; `max-w-prose` is on the title and body only (v1.1, N7) | same |

**Sleeve block:**
- **≥ 1024 (column):** a 10px swatch + `type-figure` percentage on one line (`flex items-center gap-3`), then the name as `h3.type-heading mt-2`, then "what" `mt-2 text-body-lg text-copy`, then "why" `mt-1 text-body-md text-muted-foreground`. `pr-6`.
- **< 1024 (row):** `flex items-baseline justify-between` with the swatch and name (`h3.type-heading`) on the left and the percentage (`type-heading num`) on the right, then what and why below.
- **DOM order (v1.3, Dev Q22):** one DOM at every width, with the `h3` (name) first and the percentage second. `lg:flex-col-reverse` puts the percentage above the name from 1024. The heading opens its block for screen readers, and nothing in the block is focusable.

**Copy:**

| Slot | Copy |
|---|---|
| h2 | What you’re buying |
| Lede | Units of one basket that follows three markets. Each moves for its own reasons. |
| Caption row | ExampleTag + "Example mix. These percentages are an example." (`basket-example-v1`, `text-body-md text-muted-foreground`) |

| Sleeve | % (from `lib/basket.ts`) | What | Why |
|---|---|---|---|
| US stocks | 50% | Tokens (digital units) that track shares of large US companies. | Moves with the share prices of those companies. |
| Gold | 30% | Tracks the global price of gold. | Has often moved differently from shares, though not always. |
| Crude oil | 20% | Tracks the global price of crude oil. | Moves with global supply and demand. |

**What you own:**
- `type-label`: "What you own"
- title (`type-heading`): "You hold units, not the assets"
- body (`text-body-lg text-copy`): "Units of the basket. The basket follows these markets through derivative contracts (agreements whose value follows a price), so you don’t own the shares, gold or oil directly."

**Interactions:** none. Nothing hovers or animates. **No-JS / RM:** complete.

**Code:** `sleeve-info.tsx` keeps the what/why text. Its `swatch` and `swatchOnInk` fields are replaced by the `bg-data-*` roles (`us` → `bg-data-us`, `gold` → `bg-data-gold`, `oil` → `bg-data-oil`). The `tag: "Tokenized"` field is deleted.

### 6.4 How it works (`#how`, base)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Header | stack | stack | stack | split 7/5 | split |
| Steps (`ol`, L5) | 1 column, `gap-y-8` | 1 column | 2 × 2, `gap-x-6 gap-y-8` | 4 columns (226 each), `gap-x-6`, rows aligned by subgrid | 4 columns (270 each) |
| Path block | `mt-12`, `border-t pt-8` | same | same | `mt-16` | same |
| Path layout | vertical, compact (§4.11) | vertical | vertical | horizontal | horizontal |
| Limit line | `mt-6`, `text-body-lg text-copy max-w-prose` | | | | |
| Off-ramp line | `mt-4`, `text-body-lg text-copy` | | | | |
| "Get the app" (only when `APP_URL` is set) | `mt-4`, standalone external link | | | | |

Each step is a `RuledItem` in an `li`: `type-label` "Step {n}", then `h3.type-heading`, then `p.text-body-lg.text-copy`.
- **Below 1024:** `mt-2` between the three.
- **At ≥ 1024** (v1.1, N8): the `ol` is `lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]` and each `li` is `lg:grid lg:grid-rows-subgrid lg:row-span-3 lg:gap-y-2` (with no `mt-2` on the children), so labels, titles and bodies line up across all four columns even when one title wraps to 2 lines. Browsers without subgrid simply stack each step (no breakage).

Above the path: `p.type-label.text-muted-foreground.mb-4` "Where your money goes".

**Copy:**

| Slot | Copy |
|---|---|
| h2 | From sign-up to withdrawal, in four steps |
| Lede | What happens to your money, in the order it happens. |

| Step | Title | Body |
|---|---|---|
| 1 | Verify your identity | In the Paraa app, complete <abbr title="know-your-customer checks">KYC</abbr> (know-your-customer checks) with PAN, Aadhaar through DigiLocker and a face scan. |
| 2 | Add money to your wallet | Pay in rupees by UPI or bank transfer. We verify the payment before you can invest it. |
| 3 | Invest | Invest from your Paraa wallet. The money you invest buys units at the next daily price. |
| 4 | Redeem and withdraw | When your investment matures, redeem it to your wallet. Then withdraw in rupees to a verified bank account in your name. |

**Path:** the five nodes and four connectors as in §4.11, word for word.

**After the path:**
- Limit (`no-shortcut-v1`): "There’s no shortcut back. Money you add has to be invested, mature and be redeemed before you can withdraw it."
- Off-ramp (v1.1, S3): "Want to ask before you start? " + `TextLink` (→ `#ask`) "Ask a CA your question first." + " You don’t need an account."
- **Only when `APP_URL` is set:** `TextLink variant="standalone"`, external, "Get the app" (§5.2). While `APP_URL` is `null`, nothing renders and the section ends at the off-ramp line.

**Interactions:** the off-ramp link (and the app link when set). **No-JS / RM:** complete.

### 6.5 How we protect your account (`#security`, **ink**, `.theme-ink`)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Header | stack | stack | stack | split 7/5 | split |
| Group 1 | rows A–C (`RuleList`), then the withdraw mock `mt-8 max-w-[460px]` | same | same | L3: mock left (`lg:order-first`, about 380 wide), list right (532) | mock 453, list 635 |
| Group 2 (spot a fake) | `mt-12`, pairs stacked | stacked | `mt-12`, 2-column pairs | 2-column pairs | same |
| Group 3 (registration) | `mt-12 border-t pt-8`, stacked: h3 then body | same | same | `mt-12 border-t pt-8`, **L3**: h3 in the left 5 columns, body in the right 7 (`max-w-[72ch]` on the body); **the `border-t` is on the full-width group**, so the rule spans the content width | same |

Group gaps are `mt-12` at **every** width, and Group 3 is `pt-8` at every width (v1.1, N6). Band height: ≤ 1,250 at 1440 (reference build with fixes: 1,213).

**Copy:**

| Slot | Copy |
|---|---|
| h2 | How we protect your account |
| Lede | What we always do, what we never ask, and how to spot someone pretending to be us. |

**Group 1** (`RuleList`; each row is an `li` with an `h3.type-heading` that has an `id` and `tabIndex={-1}`, and a body `p.mt-2.text-body-lg.text-copy`):

| Row | `id` | h3 | Body |
|---|---|---|---|
| A | `security-withdrawals` | Withdrawals go only to you | The app pays out only in rupees, to a bank account you’ve verified in your own name, after your investment matures. |
| B | `security-checks` | We check every payment you add | You add money by UPI or bank transfer, and we verify it before you can invest. |
| C | `security-otp` | We never ask for your OTP or PIN | Not by call, not by message. We also never ask you to pay into a personal account. Anyone who does isn’t us. |

**Withdraw mock** (`MockFrame label="Example of the withdraw screen"`, not elevated, `.theme-light` inside the band):
- header "Paraa" · ExampleTag;
- `DefinitionList`:
  - Withdraw to · ••4821;
  - Name matches yours · `Tag` (`Check`) "Allowed";
  - Someone else’s account · `Tag` (`X`) "Not allowed";
- caption under it (`mock-caption-v1`), which inherits `text-muted-foreground` (grey-300 on ink).

**Group 2** (`id="security-fakes"` on its `h3.type-heading` "How to spot a fake", `tabIndex={-1}`):
- **Markup:** `<dl class="mt-6 divide-y border-y">`. Each pair is a `div.grid.gap-2.py-4.sm:grid-cols-2.sm:gap-8`.
  - `dt` (the scam line): `text-body-lg text-foreground`, wrapped in curly quotes.
  - `dd`: `text-body-lg text-copy`, starting with `<strong class="rounded-xs bg-brand px-1.5 font-semibold text-brand-foreground">Not Paraa.</strong> ` (v1.3, decision 58 G2, D1's "verdict" tag: ink on gold 8.72, gold on ink 8.72. Was plain white `text-foreground`). It's an inline span, so the line height doesn't change. In forced colours it falls back to plain text, and the word still carries the meaning.

| Scam line (dt) | dd after "Not Paraa." |
|---|---|
| “Your withdrawal is on hold. Share the OTP we just sent to release it.” | We never ask for an OTP or PIN. |
| “Pay the processing fee to my personal account and your units will be released.” | We never ask you to pay into a personal account. |
| “I can send your withdrawal to a different account for you.” | Withdrawals go only to a verified bank account in your name. |

- **Under the list** (`mt-6 text-body-lg text-copy max-w-prose`), always shown (v1.1, S4): "If someone contacts you claiming to be Paraa, don’t share any code and don’t pay. If you’ve already shared a code or paid someone, call your bank straight away."
- **Only when `SHOW_CYBERCRIME_HELPLINE` is true:** add, in the same paragraph after those two sentences, "To report fraud in India, call " + `tel:1930` link "1930" + " or go to " + external `TextLink` "cybercrime.gov.in" (`https://cybercrime.gov.in`) + ".". Before turning it on, record the official source URL and the checked date in a code comment.

**Group 3** (`h3#security-registration.type-heading` "Registered with FIU-IND", `tabIndex={-1}`):
- body (`fiu-band-v1`, `text-body-lg text-copy`; `mt-2` below 1024, `lg:mt-0` in the right column): "Paraa Capital is registered with FIU-IND (Financial Intelligence Unit-India) for anti-money-laundering reporting. That means we must verify customers, keep records and report suspicious transactions. It isn’t approval of this investment, and no authority recommends it."
- **When `FIU_REG_NO` is set:** a line `mt-2 text-body-md text-muted-foreground num`: "Registration no. {FIU_REG_NO}". Unset → nothing.

**Band rules:**
- No other icons.
- No shield, padlock, globe, dot grid or glow. The only gold is the three "Not Paraa." tags (v1.3, decision 58).
- Focus ring white.
- Nothing animates.
- Text comes before its example on narrow screens (DOM order: list, then mock).

**Interactions:** only the optional links. **No-JS / RM:** complete. **Print:** prints light (§2.1).

### 6.6 Run the numbers (`#numbers`, alt)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Header | stack | stack | stack | split 7/5 | split |
| Tabs | 2 equal halves (144 each; tab 1 wraps to 2 lines) | halves (179) | auto width | auto | auto |
| Tool card (`Panel`, **no margin**: the 24px above it is `Tabs.Panel pt-6`, v1.1 N18) | `p-5`, one column | `p-5` | `p-8` | `lg:p-0`; L4 (`lg:items-stretch`): inputs column `p-8` (532) / `ResultInset` column `p-8` with full-height fill (380) | inputs 635 / result 453 |
| Readout | sticky under the header, 48px | yes | yes | hidden | hidden |
| Result | below the inputs, `border-t mt-8 pt-6` | same | same | right inset, sticky on `tall` | same |
| Scenario chips | 2 per row | 2 | 3 | 3 | 3 |

**Section copy:**

| Slot | Copy |
|---|---|
| h2 | Run the numbers |
| Lede | Two calculators with made-up inputs you can change. Neither is a forecast. |
| Tab 1 (→ panel `#what-if`) | Markets and the rupee |
| Tab 2 (→ panel `#tax`) | Tax on your profit |
| `<noscript>` Alert `info` (above the tabs) | The calculators need JavaScript to update. The figures shown are for the starting values. |

#### 6.6.1 Panel 1: What-if (`what-if.tsx`, client; maths `lib/basket.ts`, unchanged)

**Inputs column** (`space-y-8`):

| Part | Spec and copy |
|---|---|
| `h3.type-heading` | What could happen to your money in a year |
| Amount `ChoiceChips grid2` | legend "Starting amount"; options "₹50,000" · "₹1 lakh" (**default**) · "₹5 lakh" · "₹10 lakh" (values 50000 / 100000 / 500000 / 1000000). 2 × 2 below 640, one row from 640 (v1.1, N9) |
| Scenario `ChoiceChips twoLine` | legend "Try a scenario"; options (title / note): "All three fall" / "Rupee stronger too" (**default**) · "Stocks fall" / "Stocks down 20%" · "Oil falls" / "Oil down 40%" · "Stronger rupee" / "Rupee 5% stronger" · "Weaker rupee" / "Rupee 5% weaker". Values and moves from `PRESETS` in `lib/basket.ts` |
| Note under the scenarios (`mt-2 text-body-md text-muted-foreground`) | `scenarios-v1`: Made-up scenarios on an example mix. Not a forecast, and not the basket’s past returns. |
| Sliders (`space-y-6`) | "US stocks" (−40 to 40) · "Gold" (−30 to 30) · "Crude oil" (−60 to 60), step 1, value text "No change" / "+{n}%" / "−{n}%" · "Rupee vs dollar" (−15 to 15), value text "No change" / "{n}% weaker" (positive) / "{n}% stronger" (negative), hint `rupee-both-v1` |
| Reset (`Button quiet md` with `RotateCcw`) | Set everything back to zero |

**Default state** (owner decision 3): amount ₹1 lakh; scenario "All three fall"; sliders US stocks −25, Gold −5, Crude oil −40, Rupee −5 (5% stronger).

**Result** (`ResultInset`):

| Part | Copy |
|---|---|
| `h4.type-subhead` | After one year |
| Scenario line | a chip is checked (v1.3, Dev Q30: the line follows the checked chip; a slider move clears it even if it lands on a preset's values) → "Made-up scenario: {preset label}" · all four sliders at 0 → "No change in any market" · otherwise → "Your own scenario" |
| Figure label | Your investment’s value |
| Figure | `formatINR(inrValue)`, e.g. ₹74,100 |
| Change | `formatINR(delta, { signed: true })` + " (" + `formatPct(inrChange)` + ")", e.g. −₹25,900 (−25.9%) |
| Breakdown label | Where the change came from |
| Rows (`Breakdown`, §4.15: grid rows, name in ink 600, detail in grey, amount right, bar spanning both columns) | "US stocks" / "Gold" / "Crude oil" (with the swatch), detail "{±n}% on its part of the basket" or "no change", and the signed ₹ amount · "Rupee vs dollar" (no swatch), detail "{n}% stronger" / "{n}% weaker" / "no change", and the signed amount |
| Footnote | `whatif-foot-v1`: Example only, before fees and tax. |

**Readout text** (v1.1, B2): "Example result: **{value}** ({pct})", for example "Example result: **₹74,100** (−25.9%)". The scenario name isn't in the readout: it's on the checked chip and in the result frame, and leaving it out keeps the line on one line at 320.

**Live region text** (400ms debounce): "{Scenario line}. {formatINR(amount)} would become {formatINR(value)} after one year, {formatPct(change)}. Example only." For example: "Made-up scenario: All three fall. ₹1,00,000 would become ₹74,100 after one year, −25.9%. Example only."

**Interactions:**

| Trigger | Result |
|---|---|
| Amount chip | Sets the amount. The scenario stays |
| Scenario chip | Sets all four sliders. Bars animate 150ms (`motion-safe`) |
| Any slider moved | The scenario radio set clears (none checked); the line becomes "Your own scenario" (or "No change in any market" at all zeros); the result updates on every `input` event, with no animation |
| Reset | All sliders to 0, no scenario checked, focus stays on the button, an immediate announcement |
| All zero | ₹1,00,000, ₹0 (0.0%), rows "no change": a valid answer, not an empty state |

There are no error, loading or empty states: chips and sliders only allow valid values.

**No-JS:** the default state renders from the server (₹74,100). Controls move natively, but results don't update; the noscript Alert says so. **RM:** bar transitions off.

#### 6.6.2 Panel 2: Tax (`tax-estimator.tsx`, client; maths `lib/tax.ts`, unchanged)

**Inputs column** (`space-y-8`):

| Part | Copy |
|---|---|
| Heading group (one `div`, the first child of the `space-y-8` column; v1.1, N17) | `h3.type-heading` "Tax on your profit", then the lede `p.mt-2.text-body-lg.text-copy` "Move the slider to estimate what you’d keep." **No negative margin** |
| Rules (`RuleList` with `type-subhead` titles and `text-body-md text-copy` bodies) | **Profit may be taxed at your slab rate** / It depends on how this income is classified. If the basket counts as a <abbr title="virtual digital asset">VDA</abbr> (virtual digital asset), the rate is a flat 30% plus cess. · **Losses may not carry forward** / This also depends on how this income is classified. If the basket counts as a virtual digital asset, a loss can’t be set off against other income or carried forward. |
| Slider | label "Your profit or loss from the basket in a year" (v1.1, N-c), −5,00,000 to 20,00,000, step 10,000, **default 1,00,000**, value text `formatINR(v, { signed: true })`. The zero tick is hidden near the thumb (§4.14), which applies at this default |
| Slab `ChoiceChips` | legend "Your income tax slab", helper `text-body-md text-muted-foreground` "The rate on the top part of your income." under the legend, options 0% · 5% · 10% · 15% · 20% · 25% · 30% (**default 30%**) |

**Result:**

| Case | Label | Figure | Bar | Row (`DefinitionList`) | Extra |
|---|---|---|---|---|---|
| Profit > 0 | You’d keep | `formatINR(keep)` | `SplitBar` | Tax on profit ({slab}% + 4% cess, an add-on to income tax) · `formatINR(tax)`. **At the 0% slab (v1.4, D2 N4):** "Tax on profit (0% slab)" · ₹0, so it never reads as a 4% charge | – |
| Profit = 0 | You’d keep | ₹0 | none | Tax · ₹0 | "No profit, so no tax." (`text-body-md text-muted-foreground`) |
| Profit < 0 | Your loss for the year | `formatINR(lossCarried)` (shown without sign) | none | Tax on a loss · ₹0 | – |

- Heading `h4.type-subhead` "Tax estimate" above the label.
- Footnote `tax-foot-v1`.
- Then `TextLink standalone` (→ `#ask`): "Ask a CA about your own tax".
- **Gaps (v1.3, Dev Q27, as built):**
  - `SplitBar` `mt-3` inside the figure's block;
  - the `DefinitionList` `mt-4`;
  - "No profit, so no tax." `mt-2` after the row;
  - the link `mt-2` after the footnote (its 44px row adds 9px either side).

**Readout text** (v1.1, B2): "Estimate: you’d keep **{keep}**" (profit, and zero, where it shows ₹0), or "Estimate: a loss of **{loss}**" (loss).

**Live region** (400ms): profit → "Tax {tax} on a profit of {profit} at the {slab}% slab. You’d keep {keep}. Estimate only." · zero → "No profit, so no tax." · loss → "No tax on a loss of {loss}. Whether it can be carried forward depends on how this income is classified."

**Reference values:** Appendix B. **No-JS / RM:** as the what-if.

### 6.7 Questions before you invest (`#faq`, base)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Grid | stack | stack | stack | L2 4/8 (304 / 608) | (363 / 725) |
| Left | h2 + side line, `mb-8` | | | not sticky | not sticky |
| List | full width | | | 608 | 725 |

**Copy:**

| Slot | Copy |
|---|---|
| h2 | Questions before you invest |
| Side line (`mt-4 text-body-xl text-muted-foreground`) | Don’t see yours? `TextLink` (→ `#ask`) "Ask a CA." You don’t need an account. |

Items, in this order (`FaqItem`). **The first item, "When can I get my money out?", is open**; all others are closed (v1.1, N-d):

| `id` | Question | Answer (word for word) |
|---|---|---|
| `faq-money-out` | When can I get my money out? | Each investment has a maturity date. When it matures, redeem it, which moves it to your Paraa wallet. Then withdraw in rupees to a verified bank account in your name. |
| `faq-registered` | Is Paraa registered with anyone? | `fiu-band-v1`, the same text as band row D: Paraa Capital is registered with FIU-IND (Financial Intelligence Unit-India) for anti-money-laundering reporting. That means we must verify customers, keep records and report suspicious transactions. It isn’t approval of this investment, and no authority recommends it. When `FIU_REG_NO` is set, add the sentence "Registration no. {FIU_REG_NO}." |
| `faq-own` | What do I actually own? | Units of the basket. The basket follows US stocks, gold and crude oil through derivative contracts (agreements whose value follows a price), so you don’t own the shares, gold or oil directly. |
| `faq-uninvested` | Can I take out money I’ve added but not invested? | Not straight away. Money you add to your Paraa wallet has to be invested first. You can withdraw it after that investment matures and you redeem it. |
| `faq-price` | How often does the price change? | Once a day. Each unit has one price, and money you invest buys units at the next price. Weekends and holidays keep the last price. |
| `faq-rupee` | How does the rupee affect my money? | US stocks, gold and crude oil are mostly priced in dollars. So a weaker rupee raises your investment’s rupee value, and a stronger rupee lowers it. |
| `faq-tax` | How is it taxed? | It depends on how this income is classified. If it’s business income, profit is taxed at your slab rate plus 4% cess. If the basket counts as a virtual digital asset, it’s a flat 30% plus cess, and a loss can’t be set off against other income or carried forward. `TextLink` (→ `#tax`) "Try the tax estimate" (v1.4, D2 N8: the link text is `whitespace-nowrap`, so "estimate" never sits alone on a line at 360), and ask a CA about your own tax. |
| `faq-who-reads` | Who reads my question? | A chartered accountant (CA) reads it, and we contact you about it. Your CA may be paid by us. (The last sentence is `ca-paid-v1`.) |
| `faq-real` | How do I know it’s really Paraa? | We never ask you to share your OTP or PIN by call or message, or to pay into a personal account. If someone does, it isn’t us. See `TextLink` (→ `#security-fakes`) "how to spot a fake". |

**Not on the page** (owner decisions and unconfirmed facts): "Can I lose money?", "Can I invest every month?", and anything on fees, custody or "how does Paraa make money".

**Interactions:** §4.18; deep links per §5.3. **No-JS:** fully works (native). **RM:** instant expand.

### 6.8 Ask a chartered accountant (`#ask`, alt)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Grid | stack | stack | stack | L3 5/7 (380 / 532), `items-start` | (453 / 635) |
| Left column | h2, lede, "What happens next", limit, OTP line | | | | |
| Form card | `Panel id="ask-form" p-5` (v1.3: the permalink target, §7.1), `mt-10` | `p-5`, `mt-10` | `p-8`, `mt-12` | `p-8`, `lg:mt-0` (the grid gap separates the columns) | same |
| Fields | **one column at every width** (v1.1, S6): name, then mobile, each full width, `space-y-5` | same | same | same | same |
| Submit | block (full width) | full | auto | auto | auto |

**Left column copy:**

| Slot | Copy |
|---|---|
| h2 (`type-title`, `tabIndex={-1}`) | Ask a chartered accountant before you decide |
| Lede (`mt-4 text-body-xl text-muted-foreground`) | You don’t need an account. Write your question, and we’ll contact you about it. |
| `h3.type-subhead.mt-8` | What happens next |
| `StepList` (`mt-3`) | 1. A CA reads your question. · 2. We contact you about it. · 3. You decide what to do next. |
| Limit (`mt-6 text-body-lg text-copy`, `ca-paid-v1`) | Your CA may be paid by us. |
| OTP line (`mt-2 text-body-lg text-copy`) | We never ask for your OTP or PIN by call or message. |

**The form** is specified in §7.

### 6.9 Footer (base)

**Layout:**

| | 320 | 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|
| Padding | `pt-16 pb-10` (64 / 40) | | | | |
| Top | brand block, then links, `gap-y-10` between them (v1.1, N20) | same | same | L3 5/7: brand / links | |
| Links (`ul.grid.content-start.gap-x-6.gap-y-0`, rows are the links' 44px `min-h`; v1.1, N-f) | 2 columns | 2 | 3 | 3 | 3 |
| Legal | `mt-12 border-t pt-10`, 1 column, `gap-6` | 1 | 1 | 2 columns `gap-16` | 2 |
| © line | `mt-10 border-t pt-6` | | | | |

**Copy:**

| Slot | Copy |
|---|---|
| `h2.sr-only` | Site information |
| Brand column | Logo (Brand, `h-10`) · `p.mt-4.text-body-md.text-muted-foreground` "One basket that follows US stocks, gold and crude oil, for residents of India." · `p.mt-4.text-body-md.font-semibold.text-foreground` `otp-v1` "We never ask you to share your OTP or PIN, or to pay into a personal account." |
| `nav[aria-label="Site"]` | `FooterLink`s: The basket · How it works · Security · Calculators · FAQ · Ask a CA (· "Get the app", external, **only** when `APP_URL` is set) |
| Legal column 1 | `Disclosure block global-risk-v3` |
| Legal column 2 | `Disclosure block fiu-registration-v1`, then `mt-4` `Disclosure block asci-vda-v1` |
| © line (`text-body-md text-muted-foreground`) | © {current year, cached daily as today} Paraa Capital. |

**Slots that render only when every field is real** (`content-rules.md` §0.2): registrations table, company details, grievance officer, legal page links. None render today. They are not built as empty components.

**No-JS / RM:** complete.

---

## 7. The question form: flow and every state

### 7.1 Architecture (decisions 41–42)

| Piece | File | Spec |
|---|---|---|
| Validation (unchanged) | `src/lib/advisor-request.ts` | `validateRequest`, `normalisePhone`, `LIMITS`, used by the client, the action and the route |
| Forwarder (new, moved from `route.ts`) | `src/lib/advisor-forward.ts` (+ `advisor-forward.test.ts`) | `forwardAdvisorRequest(body: unknown, deps = { fetch, env: process.env, uuid: () => crypto.randomUUID(), timeoutMs: 8000 }): Promise<{ status: 200 \| 422 \| 502 \| 503; body: { ok: true; reference: string } \| { error: "invalid"; fields: FieldErrors } \| { error: "not_configured" } \| { error: "upstream" } }>`. **Behaviour identical to today's `route.ts`:** honeypot `website` → 200 with a fake reference and nothing sent; invalid → 422; no `ADVISOR_REQUEST_WEBHOOK_URL` → 503; webhook non-2xx or throw or 8s timeout → 502; success → 200 with "PQ-" + 8 uppercase hex. Same webhook payload (`…value, reference, submittedAt, source: "website"`) and bearer token |
| (v1.3, Dev Q35) | – | `timeoutMs` is an optional dependency (default 8000), so the timeout test runs in milliseconds. A separate test proves the default |
| API route (kept, contract unchanged) | `src/app/api/advisor-request/route.ts` | Parse JSON (400 `invalid_json` on failure, as today), then `const r = await forwardAdvisorRequest(json); return Response.json(r.body, { status: r.status })` |
| Server Action (new) | `src/app/actions.ts` (`"use server"`) | `askCa(prev: AskState, formData: FormData): Promise<AskState>`. Builds `{ name, phone, email, question, consent: formData.get("consent") === "on", website }` from `FormData` and calls `forwardAdvisorRequest`. Maps 200 → `sent`, 422 → `invalid` (+ `fields` + `values`), 503 → `not_configured` (+ `values`), 502 → `failed` (+ `values`) |
| Form (client) | `src/components/home/ask-form.tsx` | `const [state, formAction, pending] = useActionState(askCa, { kind: "idle" }, "/#ask-form")`; `<form action={formAction} noValidate>`. Every field has a `name`. **v1.3 (D2 S2): the permalink is `/#ask-form`**, the form card (`Panel id="ask-form"`, which inherits `scroll-padding-top`). A pre-hydration submit then lands with its outcome in the first view, not on the section heading about 1,300px above it at 390 |
| Types and helpers (v1.3, Dev Q34) | `src/lib/advisor-forward.ts` | `AskValues`, `AskState`, `readAskForm` (FormData → values) and `toAskState` (forwarder result → state, counting repeat failures), with tests. A `"use server"` file may export only async functions, so `actions.ts` exports only `askCa` |

```ts
type AskValues = { name: string; phone: string; email: string; question: string; consent: boolean };
type AskState =
  | { kind: "idle" }
  | { kind: "sent"; reference: string }
  | { kind: "invalid"; fields: FieldErrors; values: AskValues }
  | { kind: "not_configured"; values: AskValues }
  | { kind: "failed"; values: AskValues; attempt: number };
```

**Pre-hydration / no-JS behaviour:**
- The form posts natively to the action.
- The server re-renders with the state: errors under fields, values refilled through `defaultValue`, or the confirmation.
- The browser lands on `/#ask-form` (v1.3), with the outcome at the top of the card.

**Fallback (decision 42):** if QA H1 shows the action path doesn't work before hydration under `cacheComponents`:
1. render `<noscript>` with an Alert `info` "Sending a question needs JavaScript turned on." above the submit;
2. keep the same action for JS users.

Nothing else changes.

### 7.2 Fields and copy

| Field (`name`) | Label | Helper (always visible) | Attributes |
|---|---|---|---|
| `name` | Your name | – | `autoComplete="name"`, `maxLength={80}` |
| `phone` | Mobile number | Indian mobile, 10 digits. We’ll use it to contact you about this question. | `type="tel" inputMode="tel" autoComplete="tel-national"`, `+91` adornment |
| `email` | Email (optional) | – | `type="email" inputMode="email" autoComplete="email"`, `maxLength={254}` |
| (prompts) | Not sure what to ask? Tap one to add it: | – | `QuestionPrompts`: “What are the fees on ₹1 lakh?” · “When would my investment mature, and can I exit early?” · “Who holds my money?” · “How will my profit be taxed?” (inserted without the quotes) |
| `question` | Your question | At least 10 characters. | `textarea`, `rows={4}`, `maxLength={1000}`, counter from 800 |
| `consent` | Paraa Capital can contact me about this question. | – | checkbox, never pre-ticked |
| `website` | (honeypot) | – | off-screen, `tabIndex={-1}`, `autoComplete="off"`, inside `aria-hidden` |
| Submit | **Send my question** | – | `Button primary lg block`, `type="submit"` |
| Privacy line (under the submit, `mt-3 text-body-md text-muted-foreground`) | Your name, mobile number, email and question go to Paraa Capital, so a CA can read your question and we can contact you about it. | – | Add the sentence "Read our privacy notice." as a link **only** when the privacy page exists (`isLive("/legal/privacy")`, v1.3, Dev Q37) |

**Order:** name, mobile, email, prompts, question, consent, submit, privacy line, **one field per row at every width** (v1.1, S6). Vertical gap `space-y-5`.

**Inside each field:** label → helper → input → counter (question only) → error. The helper stays **before** the input, so the reason for the mobile number is read before it's typed (audit T3).

**No placeholder** on any field. A placeholder isn't a label.

### 7.3 Validation timing (decisions 43–44)

| Moment | What happens |
|---|---|
| Typing in an untouched field | Nothing |
| Blur on a field **with a value** | Validate that field with `validateRequest`. Show its error, set `aria-invalid`, add the error id to `aria-describedby` |
| Blur on an **empty** required field | Nothing |
| Typing in a field that shows an error | Re-validate live; the error clears when the value is valid |
| Ticking consent | Clears its error |
| Phone blur, valid | Display it as "98765 43210" (from `normalisePhone`) |
| Submit (JS) | Validate everything client-side. Errors → show them all and **focus the first invalid field** (order: name, phone, email, question, consent); don't call the action. Valid → check `navigator.onLine` (false → Offline state), else call the action |
| Submit (pre-hydration) | Server validates; errors render under their fields |
| Server `invalid` (422) | Same as client errors; focus the first invalid field |

Messages are exactly those in `validateRequest`:
- "Please enter your name." / "Please keep your name under 80 characters."
- "Please enter a valid 10-digit mobile number."
- "Please enter a valid email address, or leave it empty."
- "Please write your question in at least 10 characters." / "Please keep it under 1000 characters."
- "Please tick this so we can contact you."

### 7.4 States

**Status region:** one `<p class="sr-only" aria-live="polite">` for the form status, which carries sending, still sending, copied, and the prompt-overflow note. Errors and failures use the Alert's `role="alert"`.

| State | Trigger | What the visitor sees | Focus and announcement | Data |
|---|---|---|---|---|
| **Idle** | Load | The form | – | – |
| **Sending** | `pending` | Submit shows the loading state "Sending…" (fixed width); fields `readOnly`; prompts inert (`aria-disabled`) | Status: "Sending your question." | kept |
| **Still sending** | `pending` for more than 6s | Under the submit (`mt-2 text-body-md text-muted-foreground`): "Still sending. Please keep this page open." | Status: same text | kept |
| **Sent** | `sent` | The card content is replaced by the confirmation (below), with a 200ms opacity fade-in (`motion-safe`) | Focus to the confirmation `h3` (`tabIndex={-1}`) | name, phone and email kept in client state |
| **Invalid** | client or 422 | Inline errors | Focus the first invalid field | kept |
| **Not open yet** | `not_configured` (503) | Alert `error` at the **top of the form card**, above "Your name" (v1.3, D2 S2; was "where the submit was"; copy below), with **one button, "Copy my question"**. No retry. **The submit button and `QuestionPrompts` are not rendered** in this state (v1.1, S2). The fields stay editable, so the text can be selected and copied. The privacy line stays. With no JS, the Alert has no button (Copy needs JS), and the question stays in its field | Alert focused, `role="alert"` | kept |
| **Couldn’t send** | `failed` (502, network) | Alert `error` at the **top of the form card** (v1.3): copy below, button "Try again" (`type="submit"`, so it resubmits the same data, also before hydration; v1.3, Dev Q31). From the second failure (`attempt ≥ 2`), also "Copy my question". The submit stays. The Alert stays visible while the retry sends, and takes a new key per attempt | Alert focused | kept |
| **Offline** | `navigator.onLine === false` at submit (JS only) | Alert `error` at the **top of the form card** (v1.3): offline copy, button "Try again" | Alert focused | kept |
| **Bot** | honeypot | Identical to Sent | – | – |

There's no client timeout: the server caps the webhook at 8s, then returns `failed`. **Double-submit guard:** while `pending`, submits are ignored.

**Copy for each outcome:**

- **Sent** (inside the card, everything **left-aligned**: `CircleCheck` 24px ink at the left edge, no `mx-auto` (v1.1, N12), then):
  - `h3.type-heading.mt-4` (`tabIndex={-1}`, focused, no ring): Thank you. We’ve received your question.
  - `p.mt-2.text-body-md.text-copy`: Your reference: **{PQ-XXXXXXXX}** (`num`, `[overflow-wrap:anywhere]`)
  - then, on its own line, `Button secondary md mt-3` **"Copy reference"** (v1.1, S7b; "Copied" / "Selected" after use). v1.3 (D1 V6, Dev Q38): it was a quiet button inline. As a secondary button on its own line it looks like "Copy my question", with no 16px indent and no negative margin
  - `p.mt-2.text-body-md.text-copy`: Keep it in case you need to mention this question. We’ll contact you about it.
  - `p.mt-2.text-body-md.text-copy`: We never ask for your OTP or PIN by call or message.
  - `Button secondary md mt-6`: Ask another question (**client-only**, v1.3: not rendered before hydration)
- **Not open yet** (503):
  - title: We can’t take questions on this website yet
  - body: Nothing was sent. What you typed is still here. You can copy your question and keep it.
  - button: Copy my question
- **Couldn’t send:**
  - title: Sorry, we couldn’t send your question
  - body: What you typed is still here. Please try again.
  - buttons: Try again (· Copy my question from the second failure)
- **Offline:**
  - title: You seem to be offline
  - body: Nothing was sent, and what you typed is still here. Send it again when you’re back online.
  - button: Try again

**Ask another question:** clears the question and consent, **keeps** name, mobile and email (WCAG 3.3.7), returns to Idle, and focuses the question field.

**Client-only controls** (not rendered before hydration; v1.3, Dev Q32 and D2 S4): "Copy reference", "Copy my question" and **"Ask another question"**. With JS off, the confirmation ends at the OTP line, which is a complete state. A button that did nothing would read as broken on the success screen.

**Copy buttons:**
- The two buttons are labelled **"Copy reference"** (sent state) and **"Copy my question"** (503 and repeated failure).
- Use `navigator.clipboard.writeText()`. On success the label becomes "Copied" for 2s, and the status region says "Copied."
- If the clipboard API is missing or rejects, select the text instead (the reference span, or the textarea content) and set the label to "Selected", with the status message "Selected. Use your browser’s copy." Never fail silently.

**Not stored:** nothing is written to `localStorage` or `sessionStorage`.

**RM:** the confirmation appears instantly; the spinner is static.

### 7.5 Removed from the form

- The `paraa:prefill` listener (the hero phone field is deleted).
- The textarea placeholder.
- `AnimatePresence` and Motion.
- The single generic failure message.
- The error summary (decision 43).

---

## 8. Accessibility requirements

**Standard:** WCAG 2.2 AA throughout, plus **every pointer target ≥ 44×44px** except inline links in prose (the 2.5.8 inline exception) and sr-only radios (their label is the target). A `label` counts as a target **only when it is the hit area** (chips, the consent row). A text label above a slider or a field isn't a target: the control below it is (v1.3, C4).

| WCAG 2.2 | Requirement in this build |
|---|---|
| 1.1.1 | Decorative icons `aria-hidden`; mocks are `figure` + caption; bars and swatches `aria-hidden` (the text carries every value); the logo link is named "Paraa Capital, home" |
| 1.3.1 | `dl` for label/value; `ol` for steps, the path and next steps; `fieldset`/`legend` for chip groups; `label for` on every field; `ul` for fact cells |
| 1.3.2 | DOM order = reading order. Hero: copy → facts → panel. Band: text → mock. ExampleTag first in the mock |
| 1.3.5 | `autocomplete` `name`, `tel-national`, `email` |
| 1.4.1 | Underlined links; signed figures; checked = fill + ARIA + forced-colours outline; status by word + icon |
| 1.4.3 | Appendix A. Text roles all ≥ 6.7:1 on white and Light (v1.3; the `+91` is grey-600). Gold is never text on light; ink on gold is 8.72 |
| 1.4.4 / 1.4.10 | rem type; no horizontal scroll at 320 (= 400% of 1280) |
| 1.4.11 | Control edges grey-500 (4.76 white, 4.25 Light); ring 14.33; slider thumb ink border; checked chip ink. Gold never marks a state (1.64 / 1.47) |
| 1.4.12 | `min-h-*`, never a fixed `h-*`, on anything that holds wrapping text (inputs excepted) |
| 1.4.13 | No tooltips, no hover-only content |
| 2.1.1 / 2.1.2 | Native controls + the Tabs of §4.12 (Base UI today; hand-built to the APG contract in v1.3); the menu isn't modal; no trap |
| 2.4.1 | Skip link |
| 2.4.3 | Tab order follows reading order |
| 2.4.6 | One `h1`; an `h2` per section (sr-only for the facts row and footer); `h3` inside; `h4` for tool results. No skipped levels |
| 2.4.7 | 2px ring on every operable control; never `outline: none` on a control. The one exception is `[tabindex="-1"]:focus` (headings, `main`, alerts focused by script): these aren't operable components, so they get no ring (decision 21) |
| **2.4.11** | `scroll-padding-top` = header + 16; header static below 600px tall; menu closes on `focusout`; tool controls have `scroll-mt` for the readout |
| 2.5.3 | Visible label = accessible name |
| **2.5.7** | Slider: track click, keys, presets |
| **2.5.8** | 44px rule (stricter than AA's 24px) |
| 3.1.1 | `lang="en-IN"`; `<abbr>` on the first use of CA, KYC, FIU-IND, VDA in body text |
| 3.2.1 / 3.2.2 | Tab activation changes the panel only; nothing auto-submits |
| 3.2.3 / **3.2.6** | One `NAV` array; "Ask a CA" in the same relative position in the header (visible with the menu open) and the footer |
| 3.3.1 / 3.3.3 | Field-level messages from `validateRequest` (cause and fix) |
| 3.3.2 | Visible labels and helpers; "(optional)" on email |
| **3.3.7** | "Ask another question" keeps contact fields |
| 4.1.2 | Native elements; the Tabs of §4.12 (roles `tablist` / `tab` / `tabpanel`, `aria-selected`, `aria-controls`); radios for chips |
| 4.1.3 | Exactly 3 live regions: what-if (polite, debounced), tax (polite, debounced), form status (polite). Errors via `role="alert"` |

**Also required:**
- **Forced colours:** the checked chip, primary button, selected tab (distinct from the unselected one, v1.3), slider thumb, checkbox, focus ring and the money path's end nodes (v1.3) stay visible under Windows contrast themes.
- **Print:** the band prints light, and the disclosures print.
- **Screen readers tested:** NVDA + Chrome, TalkBack + Chrome on Android, VoiceOver on iOS.
- **Expected announcements:**
  - mock: "Example", then the figures;
  - tabs: "Markets and the rupee, tab, selected, 1 of 2";
  - chips: "₹1 lakh, radio button, checked, 2 of 4, Starting amount";
  - slider: "US stocks, slider, −25%";
  - tool: one announcement per gesture; the sticky readout is never read (`aria-hidden`), and the live region carries the scenario name;
  - sent state: "Copy reference, button";
  - external links say "(opens in a new tab)".

---

## 9. Performance budgets

Measured on a production build (`next build && next start`). The JS baseline is from the audit's production measurement.

| Metric | Today | Budget | How measured |
|---|---|---|---|
| First Load JS, `/` (gzip) | 266 KB before the rebuild; **215.0 KB on the v1.2 build** (11 Nov) | **≤ 200 KB total, and ≤ 30 KB above the empty 404 page** (v1.3, decision 63; was 140 / 35, which sat below the framework floor) | Sum of the gzip sizes of every `<script src>` on `/` and on a 404 URL, from `next start` (the 404 page is the empty-page baseline: same root layout, no page code) |
| CSS (gzip) | – | ≤ 15 KB | build output |
| Fonts | 1 preloaded + ₹ fetched late | **exactly 2 woff2, both preloaded** (latin + latin-ext); no late ₹ swap | Network panel |
| Images | logo PNG 16.5 KB | the logo only (until an SVG arrives) | Network panel |
| LCP (Lighthouse mobile, Slow 4G, 4× CPU) | – | ≤ 2.0s (the `h1` text) | Lighthouse |
| CLS | – | ≤ 0.05 | Lighthouse; Web Vitals |
| TBT / INP | – | TBT ≤ 150ms; INP ≤ 200ms while dragging a slider at 4× CPU | Lighthouse; DevTools Performance |
| DOM nodes | 996 | ≤ 900 | `document.querySelectorAll("*").length` |
| `will-change` elements | 17 | 0 | QA A15 |
| Scroll listeners | 1 + Motion | 0 (IntersectionObservers only) | code review |
| Third-party requests | 0 | 0 | Network panel |
| Lighthouse (mobile) | – | Perf ≥ 90 · Accessibility 100 · Best practices ≥ 95 · SEO 100 | Lighthouse |

**The JS budget, measured (v1.3).** Production build `A9mzzdmKE5Z42GGRU03NR`; level-9 gzip of each script:

| Part | gzip | Notes |
|---|---|---|
| Framework floor (the 404 page) | **170.7 KB** | React DOM 69.9, router 45.4, Next client 38.6, server-action runtime 7.5, Turbopack 3.8, two small chunks 5.5. Not ours to cut |
| Our code on `/` | **44.3 KB** | chunk A 24.9 (Base UI Tabs + Button, header, menu, the tools' shell, icons), chunk B 10.4 (what-if, tax, `AskForm`, prompts), chunk C 9.0 (`next/image`'s client component + lucide's core) |
| **Total** | **215.0 KB** | 10 scripts |

**What's worth cutting:**
- **Base UI is 13.3 KB gz** (Tabs + Button measured alone with esbuild; Button shares almost all of Tabs' internals). It serves **two tabs**. Its default `inert` on the hidden panel also fights decision 28 (Dev F7). → **Rebuild Tabs by hand** (§4.12) and render `<Button>` as a native `<button>` (§4.3). Expected saving about −12 KB (a hand-built tabs component is about 1.5 KB).
- **`next/image`'s client component is about 7–8 KB gz,** shipped for one static logo. → **`brand.tsx` uses `getImageProps()`** (Next 16 `image.md`: it returns plain `<img>` props, usable in a Server Component) and renders `<img {...props} className="h-10 w-auto" />`. It passes `loading: "eager"` for the header instance: `getImageProps` defaults to lazy, and `preload` is an `<Image>` feature. The footer instance keeps lazy. Same file, same size, no client JS. The LCP element is the h1, not the logo, so dropping the preload costs nothing (re-check I3).
- **lucide is tree-shaken:** the 10 client icons are 2.4 KB gz together. Nothing to gain.

Expected after the two changes: about **196 KB total, about 25 KB ours**, inside the v1.3 budget with margin. The skill guidance ("use the library's Tabs") is overridden on purpose: two tabs, no-JS stacking and 30% of our JS.

**Measured after the cut (v1.5): 201.1 KB total, 30.4 KB ours**, 1.1 / 0.4 KB over. The two largest parts left of ours:

| Part | Cost | Ruling (decision 68) |
|---|---|---|
| `next/link` client code | about 3 KB | **Drop it.** Every internal link is an in-page anchor that `HashHandler` takes over; JS-off anchors work natively; there's no second route. Plain `<a>` everywhere, logo → `/#top` (FL-34) |
| `tailwind-merge` (via `cn()` in client components) | about 7 KB | **Keep it.** It resolves real overrides (the prompt buttons' `justify-start whitespace-normal` over the Button base, and `className` overrides through the `ui/*` parts). With `clsx` alone, Tailwind's stylesheet order would pick the winner silently |

Expected after FL-34: about **198 / 27 KB**. If it still misses, the budget moves to the measured value with that measurement as its reason, and `tailwind-merge` stays.

**Lighthouse mobile today** (13.6.0, simulated Slow 4G and 4× CPU, median of 3): Performance **99**, Accessibility **100**, Best practices **100**, SEO **100**. LCP **0.92s** (the h1), TBT **104ms**, CLS **0**. **So the JS cut is should-fix, not a blocker.**

**Client components allowed** (everything else is a Server Component):
- `ScrollState`, `MobileMenu`, `HashHandler`;
- `ToolsTabs` (+ `WhatIf`, `TaxEstimator`, `Slider`);
- `AskForm` (+ `QuestionPrompts`).

The hero, panel, facts row, basket, how it works, band, FAQ and footer have **no client JS**. That includes the logo in the header and footer (v1.3: `getImageProps`, not `<Image>`).

---

## 10. File plan and dependencies

| Path | Action | Notes |
|---|---|---|
| `src/app/globals.css` | **Replace** with §2.1 | |
| `src/app/layout.tsx` | **Edit** | §2.2; remove `Providers` |
| `src/app/page.tsx` | **Edit** | Order of §5.1; skip link; top sentinel; mount `ScrollState` and `HashHandler`; remove `RevealController` |
| `src/app/actions.ts` | **Create** | Server Action `askCa` (§7.1) |
| `src/app/api/advisor-request/route.ts` | **Edit (thin)** | Delegates to `forwardAdvisorRequest`; same responses |
| `src/lib/advisor-forward.ts` + `.test.ts` | **Create** | The forwarder, moved from the route; tests for 200 / 422 / 503 / 502 / honeypot with an injected fetch |
| `src/lib/nav.ts` | **Create** | `NAV`, `CTA` (§5.2) |
| `src/lib/links.ts` | **Edit** | Add `export const SHOW_CYBERCRIME_HELPLINE = false;` with a comment: turn on only after compliance approves, recording the source URL and date. Add `export const APP_URL: string \| null = null;` (§5.2). Keep `BLOG_URL` and `FIU_REG_NO` |
| `src/lib/utils.ts` + test | **Edit** | `tailwind-merge` groups (§2.3) |
| `src/lib/{format,basket,tax,advisor-request,rupee,routes}.ts` + tests | **Keep, unchanged** | |
| `src/content/disclosures.tsx` | **Create** | The registry (§4.21) |
| `src/components/ui/button.tsx` | **Edit** | Variants `primary`, `secondary`, `quiet`; sizes `md`, `lg`, `icon`; `loading` |
| `src/components/ui/{section,section-header,link,tag,panel,mock-frame,list,fact-cell,allocation-bar,money-path,tabs,choice-chips,slider,tool-result,field,alert,faq-item,disclosure}.tsx` | **Create** | §4 |
| `src/components/paraa/primitives.tsx` | **Delete** | Split into the `ui/*` files above; `InkTile`, `InnerPanel`, `SideHead`, `ArrowLink`, `Card` go |
| `src/components/paraa/reveal.tsx`, `reveal-controller.tsx` | **Delete** | Decision 25 |
| `src/components/paraa/mark.tsx`, `money.tsx` | **Delete** | Highlighter; NumberFlow |
| `src/components/providers.tsx` | **Delete** | Motion only |
| `src/components/watermelon/adaptive-slider.tsx` | **Delete** | → `ui/slider.tsx` |
| `src/components/home/hero.tsx` | **Rebuild** (server) | §6.2 |
| `src/components/home/hero-panel.tsx` | **Create** (server) | The still panel |
| `src/components/home/hero-scene.tsx`, `hero-ask.tsx`, `product-tour.tsx`, `asset-art.tsx`, `what-you-get.tsx`, `trust.tsx`, `tax.tsx`, `how-money-moves.tsx` | **Delete** | Content moves as specified; `tax.tsx` merges into `tools.tsx`; `how-money-moves.tsx` → `how-it-works.tsx` |
| `src/components/home/basket.tsx` | **Rebuild** | §6.3 |
| `src/components/home/sleeve-info.tsx` | **Edit** | Data roles; delete `tag` |
| `src/components/home/how-it-works.tsx` | **Create** | §6.4 |
| `src/components/home/security.tsx` | **Create** | §6.5 |
| `src/components/home/tools.tsx` | **Create** (server shell + client `ToolsTabs`) | §6.6 |
| `src/components/home/what-if.tsx`, `tax-estimator.tsx` | **Restyle**; maths calls unchanged | §6.6.1–6.6.2; the default preset becomes `all-fall` |
| `src/components/home/faq.tsx` | **Rebuild** | §6.7 |
| `src/components/home/ask.tsx`, `ask-form.tsx` | **Rebuild** | §6.8, §7 |
| `src/components/home/hash-handler.tsx` | **Create** (client) | §5.3 |
| `src/components/site/header.tsx` | **Rebuild** | Server header + `scroll-state.tsx` + `mobile-menu.tsx` (client) |
| `src/components/site/footer.tsx` | **Rebuild** | §6.9; keep the cached `CurrentYear` |
| `src/components/site/brand.tsx` | **Edit** | `h-10`; the swap-point comment. v1.3: `getImageProps` + `<img>` (§9) |
| `src/components/ui/question-prompts.tsx` | **Create** (v1.3, records the build) | `QuestionPrompts` (§4.16), imported only by `AskForm` |
| `src/app/dev/` | **Delete before merge** (v1.3) | The temporary component preview. It returns 404 in production, but it ships a second `"use client"` file (A16) |
| `package.json` | **Edit** | **Remove** `@number-flow/react`, `@radix-ui/react-accordion`, `tw-animate-css`. **Move** `shadcn` to `devDependencies`. **Keep** `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `next`, `react`, `react-dom`. **v1.3: remove `@base-ui/react`** once Tabs and Button are rebuilt (they're its only importers). **v1.4 (decision 66):** `motion@14.12.0` stays as a dependency, installed by the owner, and **is not imported anywhere** (A4) |
| `docs/build-brief.md` | **Edit after the build** | Add a ROUND 17 block that points to this spec |

**Gates before review:** `npm run typecheck`, `npx eslint src`, `npm test`, `npm run build` (the todo guard). All four must pass.

---

## 11. QA checklist

Each check has an **ID**, an **owner** (Dev or Des) and a **pass rule**. Run it on a production build, at 1440×900 and 390×844 unless the check says otherwise. Greps use `rg` from the repo root.

### A. Code and tokens (Dev)

| ID | Check | Pass |
|---|---|---|
| A1 | `rg -n "#[0-9a-fA-F]{3,8}\b\|rgba?\(\|hsl\(\|oklch\(" src/components src/app/page.tsx` | 0 hits |
| A2 | `rg -n "(text\|leading\|tracking\|rounded\|shadow\|size)-\[" src/components` | 0 hits. Other arbitrary values only from: `max-w-[24ch\|52ch\|72ch\|360px\|460px\|600px]`, `top-[calc(var(--header-h)+1.5rem)]`, `max-h-[calc(100dvh-var(--header-h))]`, `scroll-mt-[calc(var(--header-h)+var(--readout-h)+1rem)]`, `underline-offset-[3px]`, `outline-offset-[-2px]`, `[overflow-wrap:anywhere]`, the FAQ `[&::details-content]…` / `[interpolate-size:allow-keywords]`, `min-w-[var(--w)]`, `grid-cols-[minmax…]` / `grid-cols-[50fr_30fr_20fr]` / `grid-cols-[2.5rem_minmax(0,1fr)]`, `grid-rows-[auto_auto]` / `grid-rows-[auto_auto_auto]`, `flex-[2.1]` / `flex-[2.35]`, `z-[1]`, the chip `peer-checked:[&>span:last-child]…`, `mt-[3px]`.<br>**v1.3 additions:** `xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]` (hero); `forced-colors:border-[Canvas]`, `forced-colors:data-active:border-[CanvasText]` (tab) and `forced-colors:border-[CanvasText]` (money-path end nodes); the mobile menu's `[&::details-content]:` opacity transition with `[transition-behavior:allow-discrete]` and `transition-[opacity,content-visibility]`.<br>**Allowed arbitrary variants:** `max-[22.5rem]:` (`DefinitionList` stacking, v1.2); and, found in the build (v1.3), `data-[at-top]:` (header), `group-data-[size=mock]/dl:` (`DefinitionList` in mocks), `aria-[current=location]:` (`NavLink`) and the `[&::details-content]:` / `[&::-webkit-details-marker]:` variants on `details` and `summary` |
| A3 | `rg -n "\b(grey\|gold\|ink)-[0-9]\|bg-white\|text-white\|bg-black\|surface-(ink\|light)\|text-faint\|brand-text" src/components` | 0 hits |
| A4 | (v1.4, decision 66) `rg -n "from ['\"]motion\|motion/react\|framer-motion\|@number-flow\|@radix-ui\|tw-animate\|data-reveal\|RevealGroup" src` and `rg -n "@number-flow\|@radix-ui\|tw-animate\|framer-motion" package.json` | 0 hits for both. **`motion` may appear in `package.json`** (owner-installed) but is imported nowhere in `src`, and the client bundle holds no motion code (I2) |
| A5 | (v1.2, two greps) `rg -n 'tone="ink"' src/components` and `rg -l 'theme-ink' src/components` | the first: exactly 1 hit (`home/security.tsx`); the second: exactly 1 file (`ui/section.tsx`, the tone mapping) |
| A6 | `rg -n "font-(thin\|extralight\|light\|medium\|bold\|extrabold\|black)\b" src` | 0 hits |
| A7 | `rg -n "rounded-(none\|full\|xl\|2xl\|3xl)\b\|rounded\b[^-]" src/components` | only `rounded-none` on swatches and bar segments |
| A8 | `rg -n "shadow-\|ring-" src/components` | `shadow-panel` only in `mock-frame.tsx` (elevated) and `mobile-menu.tsx`; `ring-1 ring-inset ring-error` only in `field.tsx` |
| A9 | `rg -n "dark:\|style=\{\{[^}]*(color\|background)" src/components` | 0 hits. Inline `style` only for `--a`, `--b`, `left` (the zero tick), `flexGrow`, `--w` and `transform` (`DivergingBar`'s `scaleX`, v1.3) |
| A10 | `npm test` includes the `cn()` cases of §2.3 | pass |
| A11 | `rg -n "toLocaleString\|Intl\.NumberFormat\|<output" src/components` | 0 hits |
| A12 | Disclosure single source: `rg -n "isn’t approval\|Investing involves risk\|Crypto products and NFTs\|may be paid by us\|no shortcut back" src --glob '!src/content/**'` | 0 hits outside `content/disclosures.tsx` |
| A13 | Gates: typecheck, eslint, test, build | all green |
| A14 | `curl -s localhost:3000 \| rg -i "to confirm\|todo\|lorem\|tbd"` | 0 hits |
| A15 | `rg -n "will-change\|addEventListener\(\"scroll\"" src` | 0 hits |
| A16 | `rg -l "\"use client\"" src` | only the §9 client list |
| A17 | `rg -n "bg-data-gold" src` | only `allocation-bar.tsx` and the swatch component |
| A18 | `lib/advisor-forward.test.ts` covers 200, 422, 503, 502 (non-2xx, throw, timeout), the honeypot and the payload shape | pass |
| A19 | Negative margins: `rg -n "(^\|[\s\"'\x60:])-m[trblxy]?-" src/components` | only `-mx-4` (prompts), `-mx-5 -mt-5 sm:-mx-8 sm:-mt-8` (readout), `-mb-px` (tab), `-ml-1` / `-mt-1` (money-path arrows) |
| A20 | `APP_URL` slot: with `null`, `curl -s localhost:3000 \| rg -c "Get the app"` | 0. With a test URL in a local build: exactly 2 links, both `target="_blank"` with the sr-only "(opens in a new tab)" |
| A22 | (v1.3) Primitives stay out of components: `rg -n "\-\-p-" src/components` | 0 hits |
| A23 | (v1.3) Gold fills only where decision 58 allows: `rg -l "(bg\|text\|border)-brand" src/components` | exactly `ui/money-path.tsx` and `home/security.tsx` (v1.4: never `ui/button.tsx`, decision 64) |
| A24 | (v1.4, decision 66) No registry components. The files under `src/components` are **exactly the 39 in §10**:<br>• `home/`: ask, ask-form, basket, faq, hash-handler, hero, hero-panel, how-it-works, security, sleeve-info, tax-estimator, tools, tools-tabs, what-if;<br>• `site/`: brand, footer, header, mobile-menu, scroll-state;<br>• `ui/`: alert, allocation-bar, button, choice-chips, disclosure, fact-cell, faq-item, field, link, list, mock-frame, money-path, panel, question-prompts, section, section-header, slider, tabs, tag, tool-result.<br>Also `rg -il "magicui\|magic-ui\|aceternity\|reactbits\|react-bits" src components.json` gives 0 hits, and `components.json` `registries` adds nothing used by `src` | any extra file or hit fails; adding one needs a spec change first |
| A25 | (v1.5, decision 68) No `next/link`: `rg -n "next/link" src` | 0 hits (comments included) |
| A26 | (v1.5) No CSS smooth scroll: `rg -n "scroll-behavior" src --glob "*.css"` | 0 hits; `HashHandler` passes an explicit `behavior` to every `scrollTo` / `scrollIntoView` |
| A21 | `globals.css` base rules | the extended `text-wrap: pretty` selector (`p, li, dt, dd, summary, figcaption, label, legend`) and `[tabindex="-1"]:focus { outline: none; }` are present, and no other `outline: none` exists in `src` |

### B. Visual consistency (Des)

| ID | Check | Pass |
|---|---|---|
| B1 | Every `h2` computes to the same size at a given width | equal |
| B2 | Distinct computed font sizes at 1440 | exactly 48, 40, 24, 18, 16, 14, 12. Weights (v1.3): every visible `h1`–`h4` and `type-figure` computes **700**; the FAQ summaries 600; nothing else is 700 (B26) |
| B3 | Distinct radii | {0, 4, 8, 12, 16} + the thumb circle |
| B4 | Box shadows (excluding focus) | `shadow-panel` on ≤ 2 elements |
| B5 | Surface sequence | (v1.3) white · **Light `#F2F2F2`** · white · **ink** · Light · white · Light · white |
| B6 | Gold per screen (scroll both widths) | (v1.3) ≤ 3 uses. Only: the logo, the gold sleeve, the two money-path end nodes, the band's three "Not Paraa." tags, and text selection. Never text or an icon on white or Light, a state, a figure or result, a fact cell, a background, or a button (decision 64) |
| B7 | Primary buttons | one filled button per screen (the header CTA is outline) |
| B8 | Every mock | ExampleTag visible inside the frame, first in DOM; caption below; no %, value, price, chart or date |
| B9 | Icons | only §3.6's list, stroke 1.75, 16 / 20 / 24px, plus the 14px `ArrowUpRight` on external links (v1.2) |
| B10 | Separators | 1px hairlines; 2px only on fact cells, steps, "What you own" and the selected tab bar (v1.3: path end nodes are gold fills with no border) |
| B11 | Rhythm | each section's top padding = 64 (< 768) or 96 (≥ 768); the hero per §6.2 |
| B12 | Labels | "Ask a CA" identical in header, hero and footer at every width |
| B13 | Hover | colour, underline or a 2px arrow nudge only. Nothing lifts or scales on hover |
| B14 | Selected states | chips = ink fill; tabs = ink text + 2px bar; nav = ink text + 2px bar; the slider thumb never gold |
| B15 | Facts row | all four cells identical in treatment; "You can lose money" has no icon, colour or box |
| B16 | Copy | every string matches §6 / §7 word for word (Des reads it against the spec) |
| B17 | Money path at ≥ 1024 | (v1.3, Dev F5) no node stretched by a connector label; one- and two-line nodes 56px; the 3-line end node ≤ 72px; each line meets its node at the node's vertical middle; every label ≤ 2 lines |
| B18 | Tool result at ≥ 1024 | the grey fill runs the full height of the card on both tabs; the figures stay in view while you scroll the sliders |
| B19 | Breakdown rows | sleeve names in ink at weight 600; detail lines in grey-600 at weight 400; amounts right-aligned; each bar spans the row |
| B20 | Band group 3 at ≥ 1024 | h3 in the left 5 columns, body in the right 7; the 1px rule above the group spans the full content width |
| B21 | Steps at ≥ 1024 | labels, titles and bodies line up across all four columns, including when "Add money to your wallet" wraps |
| B22 | Amount chips below 640 | 2 × 2, all four the same width; one row from 640 |
| B23 | Sent state | icon, heading, reference, lines and buttons all left-aligned; "Copy reference" is a secondary button on its own line under the reference, at every width (v1.3) |
| B24 | "What you own" | its 2px rule spans the full content width; the text stops at 65ch |
| B25 | Facts row | order: Registered with FIU-IND · You can lose money · Withdrawals go only to you · We never ask for your OTP or PIN |
| B26 | (v1.3) Weight audit, script over every visible text node | 700 only on `type-display/title/heading/subhead/figure`; 600 on UI emphasis; 400 elsewhere; no 500 or 800 |
| B27 | (v1.3) Light surfaces | hairlines inside Basket, Run the numbers and Ask compute grey-300; no `bg-muted` element sits directly on a Light surface; white cards on Light keep their 1px border |
| B28 | (v1.4) Basket at ≥ 1024 | each sleeve column starts within 1px of its bar segment's left edge (D1 V4: crude oil was 8px off) |
| B29 | (v1.4) Masked accounts | "••4821" renders with no gap between the bullets, in the hero panel and the band mock (D2 N3) |
| B30 | (v1.4) Fact cells and money path | each cell's second sentence computes 16px / 600 / grey-700 (decision 65); no money-path node or label **of four or more words**, and no FAQ link, ends on a one-word line at 360, 390 or 1440 (D2 N8). v1.5 (Dev 2 F10): a three-word node may break 2 + 1 ("Your bank / account" at ≥ 1024) |

### C. Accessibility, automated (Dev)

| ID | Check | Pass |
|---|---|---|
| C1 | axe at 390 and 1440 in these states: default · menu open · tools tab 2 · form invalid · sending · sent · 503 · failed | 0 serious or critical |
| C2 | Lighthouse accessibility | 100 |
| C3 | Contrast spot checks against Appendix A, including the band and the light mock in it | all pass |
| C4 | Target-size script over visible `a, button, input, summary` and the `label`s that are hit areas (chips, consent) | ≥ 44×44 except inline prose links, sr-only radios, the off-screen honeypot and the consent checkbox inside its ≥ 44px label (v1.3: text labels above sliders and fields aren't targets) |
| C5 | Headings | one `h1`; no skipped levels; the success heading is `h3` |
| C6 | Landmarks | `header`, `nav[aria-label="Main"]`, `main#main`, `footer`, `nav[aria-label="Site"]`; each section named |

### D. Keyboard (Des + Dev)

| ID | Check |
|---|---|
| D1 | The skip link is the first stop, visible, and lands on `main` |
| D2 | Tab order follows reading order in every section, at 390 and 1440 |
| D3 | Tabs: ←/→ select, Home/End, Tab into the panel; ring visible |
| D4 | Chips: one stop per group; arrows select |
| D5 | Sliders: arrows ±1, Home/End; the spoken value matches the shown value |
| D6 | FAQ: Enter and Space toggle |
| D7 | Menu: Enter opens; Esc closes and focuses the toggle; Tab out closes; a link closes; widening to 1024 closes |
| D8 | Form: an invalid submit focuses the first invalid field; "Ask another question" focuses the question with contact fields kept |
| D9 | **Focus not obscured:** tab through the page at 1440×900, 390×844 and 200% zoom; nothing focused is hidden by the header, menu or readout |
| D10 | No keyboard trap |
| D11 | An anchor from the nav, a fact cell or a CTA moves focus to the target heading (or the FAQ summary); a CTA never focuses a field |
| D12 | After D11, `document.activeElement` is the heading, **no ring is drawn on it**, and the next Tab goes to the first control after it. Every operable control still shows its 2px ring |

### E. Screen readers (Des: NVDA, TalkBack, VoiceOver)

| ID | Check |
|---|---|
| E1 | The what-if announces once per gesture: "Made-up scenario: All three fall. ₹1,00,000 would become ₹74,100 after one year, −25.9%. Example only." |
| E2 | The tax tool announces per §6.6.2 |
| E3 | Tabs, chips and sliders announce as in §8 |
| E4 | Mocks: "Example" before any figure; caption read |
| E5 | Form: errors read with their fields; alerts announced; sent heading and reference read; "Copied" announced |
| E6 | FAQ expanded/collapsed state announced |
| E7 | External links say "(opens in a new tab)" |
| E8 | The facts row is read as a list of four links under "Before you start", in the B25 order |
| E9 | The sticky readout is never announced; the live region still names the scenario (E1) |
| E10 | The sent state's button announces as "Copy reference, button"; after use, "Copied" in the status region |

### F. Responsive and zoom (Des + Dev)

| ID | Check | Pass |
|---|---|---|
| F1 | 320, 360, 390, 768, 1024, 1280, 1440, 1920: `scrollWidth ≤ clientWidth`; no clipping or overlap | all |
| F2 | 200% zoom at 1440×900 | mobile layout; header and readout static; nothing cut off |
| F3 | 400% zoom (320 CSS px) | as F1 at 320 |
| F4 | Text-spacing bookmarklet (1.4.12) | no clipped text in chips, tabs, tags, buttons or fact cells |
| F5 | Landscape 844×390 | header and readout static; tools usable |
| F6 | 320: "Markets and the rupee" wraps to 2 lines inside its 44px+ tab; every chip label fits | no ellipsis |
| F7 | Page height | ≤ 7,700 at 1440; ≤ **12,100** at 390 (v1.4, decision 65). Met by layout only: no limit, disclosure, state copy or slider precision removed to hit it (decision 56) |
| F8 | First view per §6.2 at 1440×900 and 390×844 (at 390: cells 1–2 in full, including "You can lose money") | met |
| F9 | Band height | ≤ 1,250 at 1440; ≤ 2,000 at 390 |
| F10 | On a real Android phone (390): a vertical swipe starting on a slider scrolls the page; the readout stays visible while dragging; the hand doesn't cover it | pass |
| F11 | Header at 320: logo 102 + 24 + "Ask a CA" 91 + 8 + menu 44 = 269 of 288px | no overflow |
| F12 | Vertical money path at 390 and 768 | ≤ 440px tall; each arrow sits centred under its line, directly above the next node |
| F13 | Contact fields | one column at every width; the mobile helper sits between its label and its input |
| F14 | `APP_URL = null` | How it works ends at the off-ramp line and the footer links end at "Ask a CA"; page height is identical to a build without the slot |
| F15 | Stated gaps | hero below 1024: panel 48px below the facts row; footer below 1024: 40px between brand and links; tools: 24px from tab list to card (no double gap) |

### G. Motion (Des)

| ID | Check |
|---|---|
| G1 | RM on: no fades, no smooth scroll, static spinner; the page is complete |
| G2 | Nothing moves on load. v1.5: a cold load of `/#ask` (and any hash) lands without an animated scroll; the tab panel doesn't fade in on load |
| G3 | No loop except the spinner during sending |
| G4 | Tab switch: ≤ 200ms fade-in, instant exit, no layout shift |
| G5 | The slider thumb stays under the pointer during a fast drag (60fps recording: 0 frames of lag) |
| G6 | No scroll reveals anywhere |
| G7 | Android Chrome: `active:scale-97` on chips causes no text shimmer. If it does, remove the scale from chips (colour only) |
| G8 | Tax slider at its default (₹1,00,000) at 320, 390, 768 and 1440: no zero tick visible under or beside the thumb; drag to **−₹4,00,000** and the tick shows, under the fill (v1.3: 32px threshold, Dev F8 + D1 V1). The same at 390 for the what-if's Gold slider at −5%: no tick |
| G9 | (v1.4, D2 N1) In-page jumps with motion on: a target within 2 viewport heights scrolls smoothly; a farther one (hero CTA → `#ask`, "You can lose money" → `#numbers`) lands instantly. RM: always instant |

### H. Resilience and form states (Dev)

| ID | Check |
|---|---|
| H1 | **JS disabled:** everything reads. The tools show both panels stacked with the noscript Alert. FAQ and menu work. **The form submits through the Server Action and lands on `/#ask`** with errors, the 503 copy, or the confirmation. If this fails, apply the decision-42 fallback and re-test |
| H2 | Slow 3G, submit before hydration: as H1 (no silent reload, nothing typed lost). **v1.3:** after the POST, the outcome (Alert, first error or confirmation heading) is inside the first viewport at 390×844; "Ask another question" isn't rendered with JS off |
| H3 | Fonts blocked: the fallback renders without overflow; ₹ present |
| H4 | Print preview: the band prints light; the disclosures print |
| H5 | Windows contrast themes: focus, **selected tab distinct from the unselected one** (v1.3, D2 S1), checked chip, slider thumb, checkbox, the money path's end nodes and (v1.5) its connector lines visible |
| H6 | No webhook set: submit → "We can’t take questions on this website yet", no retry, "Copy my question" copies the question |
| H7 | Webhook returns 500 / times out: "Sorry, we couldn’t send your question" + Try again; the second failure adds Copy |
| H8 | Offline (DevTools): the offline alert; nothing lost |
| H9 | Valid submit with a test webhook: the confirmation shows a "PQ-" reference; Copy works, with a fallback in an `http://` LAN preview |
| H10 | Fields are read-only while sending; "Still sending" appears after 6s (throttle the webhook) |
| H11 | `#what-if`, `#tax`, `#faq-tax`, `#tour` and `#trust` in the URL behave per §5.3. v1.4 (D2 N9): a cold load of `/#ask`, `/#numbers` or any other section id focuses that section's `h2`, with no ring; `/#ask-form` leaves focus to the form's outcome |
| H12 | `curl -X POST /api/advisor-request` with bad JSON → 400; an invalid body → 422 with fields; no webhook → 503 (the contract is unchanged) |
| H13 | 503 state (JS): **no submit button and no prompts are rendered**; fields stay editable; the privacy line stays; "Copy my question" is the only action. With JS off: the same, with no Copy button, and the question still in its field |
| H14 | Mobile menu open: the panel holds only the five links (no CTA); the header's outline "Ask a CA" is visible above it |
| H15 | "Copy reference" copies the reference; with the clipboard API blocked, the reference is selected and the label reads "Selected" |

### I. Performance (Dev)

| ID | Check | Pass |
|---|---|---|
| I1 | First Load JS for `/`: the gzip sum of every `<script src>`, against the same sum on a 404 URL | (v1.3) ≤ 200 KB gz total and ≤ 30 KB gz over the 404 page. v1.2 build: 215.0 / 44.3. After FL-26 to FL-29: 201.1 / 30.4. v1.5: met by dropping `next/link` (decision 68, FL-34; expected about 198 / 27) |
| I2 | `npx next analyze --output` | no motion, number-flow or radix modules |
| I3 | Lighthouse mobile | Perf ≥ 90, LCP ≤ 2.0s, CLS ≤ 0.05, TBT ≤ 150ms |
| I4 | DOM nodes | ≤ 900 |
| I5 | Fonts | exactly 2 woff2, both preloaded |
| I6 | Third-party requests | 0 |
| I7 | INP while dragging at 4× CPU | ≤ 200ms |

### J. Business logic reference values (Dev)

The tools must show exactly the values in Appendix B. `npm test` stays green, and `lib/*.ts` maths files are unchanged (`git diff --stat src/lib` shows only `advisor-forward.*`, `links.ts`, `nav.ts` and `utils.*`).

### K. Honesty limits (Des)

| ID | Check |
|---|---|
| K1 | "This isn’t / It isn’t approval of this investment" beside every FIU-IND mention (hero cell, band, FAQ, footer) |
| K2 | "Your CA may be paid by us" in Ask a CA and the FAQ "Who reads my question?"; the footer note as is |
| K3 | Both rupee directions: the slider hint, the FAQ, the footer |
| K4 | "you don’t own the shares, gold or oil" in Basket and the FAQ; "You hold units…" in hero cell 2 |
| K5 | The risk line appears **only** in hero cell 2 (plus the footer note) |
| K6 | ASCI line verbatim, footer only; no "crypto", "currency", "securities", "custodian", "depositories" anywhere else |
| K7 | No R1 banned words (guaranteed, safe, risk-free, insured, bank-grade, best, #1, …) in any string |
| K8 | No "monthly", "every month", "bought in rupees", "invest in rupees", "lock-in", "Tokenized", "assigned", "files your return" |
| K9 | Mock and tool figures carry "Example" / "Made-up scenario" / "Estimate only" in the same frame |
| K10 | No fee, custody, registration number, legal entity or support contact appears until supplied |
| K11 | Every place that says where withdrawals go carries "after … matures" in the same component: hero cell 3 (`withdraw-cell-v1`), band row A, the FAQ "When can I get my money out?", step 4 |
| K12 | The sticky readouts start with their honesty word: "Example result:" (what-if) and "Estimate:" (tax). No bare figure is ever stuck under the header |
| K13 | No "sign up" / "sign-up" / "Sign up" anywhere except the How-it-works h2 "From sign-up to withdrawal, in four steps". No app link unless `APP_URL` is set |
| K14 | The scam guidance ends with "If you’ve already shared a code or paid someone, call your bank straight away." (helpline sentence only when `SHOW_CYBERCRIME_HELPLINE` is true) |

---

## 12. Launch blockers (owner facts only)

The page builds and runs without these, but it **must not go public** until each one is supplied and the copy in §6 is checked against it.

| # | Fact needed | Blocks | Source |
|---|---|---|---|
| 1 | `ADVISOR_REQUEST_WEBHOOK_URL` (and token) set in production, and a test question received | The main CTA. Without it every question gets the 503 state | Owner decision 7 |
| 2 | A privacy notice page (who sees the details, how long they're kept, how they're used) | The form; then the "Read our privacy notice" link switches on through `isLive()` | Owner decision 8; proposal §9 #15, #16 |
| 3 | Legal entity name, CIN, registered office, and **which entity holds the FIU-IND registration** (Paraa Capital or ATLANTEASE VENTURES INC) | The FIU sentence names "Paraa Capital"; the footer's company block | Content audit Q3, Q14; proposal #1 |
| 4 | Grievance officer, support contact and official channels (domain, sending email domain, app store links) | Footer slots; the "spot a fake" section's credibility | `content-rules.md` §0.2; proposal #13, #14, #19 |
| 5 | Official domain (`paraacapital.com` or `paraa.capital`) | `metadataBase`, canonical | Proposal #14 |
| 6 | Counsel's answer on whether the basket is a VDA, and a CA-signed tax position | The tax panel and the FAQ tax answer ship hedged; counsel must accept the hedged wording | Content audit Q5, Q6; proposal #11 |
| 7 | Confirmation of what the basket holds (US stocks, gold, crude oil; any crypto) and that tokens/derivatives is the right description | The h1, Basket, FAQ "What do I actually own?" | Content audit Q4, Q17 |
| 8 | Maturity vs lock-in: confirmation that "after it matures" is right everywhere | How it works, band row A, FAQ | Content audit Q9; proposal #9 |
| 9 | Fees and who holds the money (custody, what happens if Paraa or a partner fails) | Not shown on the page; the audit lists both as launch blockers, and the form prompts ask about them | Audit Phase 3; proposal #4–#7, #10 |
| 10 | Written confirmation that staff and advisers never ask for an OTP, a PIN or payment to a personal account | Hero cell 4, band row C, the scam guidance, FAQ, footer | Content audit Q15 |
| 11 | Compliance review of the whole page, including the round-16 reversal for hero cell 2 ("You can lose money") and the ASCI line's footer placement | Launch | Build brief round 16; content audit §4 |
| 12 | **Recommended before launch:** compliance approval of the 1930 / cybercrime.gov.in sentence, then `SHOW_CYBERCRIME_HELPLINE = true` with its source URL and checked date in a code comment | Until then, the scam guidance ends at "call your bank straight away", true but with no official channel to report to | D2 review S4 |

**Optional switches, off until supplied** (not blockers; each renders nothing while unset, and none changes the layout):
- `FIU_REG_NO` (adds the number in four places);
- `SHOW_CYBERCRIME_HELPLINE` (see #12);
- `APP_URL`: the official store listing or web-app address. Adds "Get the app" in How it works and the footer (decision 57);
- `BLOG_URL`;
- the app's own basket name, which replaces the hero panel's title "US stocks, gold and crude oil" (v1.1, N15);
- an ink-wordmark logo (one swap point);
- custody facts (add a money-path node and a band row).

**Owner questions (v1.3, not blockers; the spec builds on the default until answered):**

- **OQ-1: gold buttons. Closed (11 Nov, decision 64):** main buttons stay ink, and no button is gold.
- **OQ-2: the typography board.** Only the Colors board arrived. `type-label` (12px caps) stays 600 until it does (§3.2).

---

## Appendix A. Contrast (WCAG 2.x, computed from the design-file values)

v1.3 re-computed every pairing the brand board changes, with the WCAG 2.x formula on the board's labelled values (`scratchpad/contrast-board.mjs`, `contrast-v13.mjs`). It was confirmed by axe on :3001 with the v1.3 roles injected: **0 AA contrast failures** at 390 and 1440.

| Pair | Ratio | Use |
|---|---|---|
| ink on white / **Light** | 14.33 / **12.80** | headings, figures, links, primary button (inverse) |
| grey-700 on white / **Light** | 10.35 / **9.25** | body (`copy`) |
| grey-600 on white / **Light** | 7.58 / **6.77** | secondary text, legal, mock notes, **the `+91` (placeholder role, v1.3)**. Below AAA's 7:1 on Light; AA is the target |
| grey-500 on white / **Light** | 4.76 / **4.25** | control edges only (≥ 3:1). **Never text** (4.25 fails on Light) |
| white on Primary-1 `#3D3F47` | 10.50 | primary hover (v1.3) |
| white on ink-900 `#151517` | 18.24 | primary active (v1.3) |
| white on ink / ink-800 | 14.33 / 16.23 | band headings |
| grey-300 on ink / ink-800 / ink-700 `#343844` | 9.65 / 10.93 / **7.88** | band copy and labels |
| grey-400 on ink | 5.59 | band control edges (≥ 3:1) |
| ink-600 `#4C4E57` / ink-500 `#64666F` on ink | 1.73 / 2.51 | band hairlines (decorative) |
| ink thumb border vs grey-300 track / vs white card | 9.65 / 14.33 | slider thumb (≥ 3:1) |
| error `#EF4444` on white / Light | 3.76 / 3.36 | error border and icon (≥ 3:1), never text |
| **ink on gold `#FDC037`** | **8.72** | `bg-brand` fills: money-path end nodes, "Not Paraa." tags (v1.3) |
| **gold on ink** | **8.72** | the "Not Paraa." tag against the band |
| gold on white / Light | 1.64 / 1.47 | fills only; **never** text, an icon, a state line or a boundary that carries meaning |
| grey-900 on Secondary-6 `#FEE6AF` | 14.58 | text selection (v1.3) |
| grey-200 on white / Light | 1.23 / **1.10** | hairlines on white; **on Light they step up to grey-300** (1.33; 1.48 on the white cards inside) |
| white card on Light | 1.12 | the card's 1px border carries the edge |
| success `#10B981` on white / ink on success | 2.54 / 5.65 | reserved (decision 62): a fill with ink, never text |
| warning `#FACC15` on white / ink on warning | 1.53 / 9.36 | reserved (decision 62): a fill with ink only |
| gold-800 `#8C6612` on white / Light | 5.22 / 4.66 | **not used** (decision 16: no gold text); recorded because the board lists it |
| grey-500 on grey-100 | 4.34 | **never** (grey-100 has no role in v1.3) |

## Appendix B. Reference values for the tools

Computed from `src/lib/basket.ts`, `tax.ts` and `format.ts` as they are today. The rebuilt UI must show exactly these.

**What-if, amount ₹1,00,000** (breakdown order: US stocks / Gold / Crude oil / Rupee):

| Scenario | Value | Change | Breakdown |
|---|---|---|---|
| **All three fall (default)** | **₹74,100** | **−₹25,900 (−25.9%)** | −₹12,500 / −₹1,500 / −₹8,000 / −₹3,900 |
| Stocks fall | ₹90,000 | −₹10,000 (−10.0%) | −₹10,000 / ₹0 / ₹0 / ₹0 |
| Oil falls | ₹92,000 | −₹8,000 (−8.0%) | ₹0 / ₹0 / −₹8,000 / ₹0 |
| Stronger rupee | ₹95,000 | −₹5,000 (−5.0%) | ₹0 / ₹0 / ₹0 / −₹5,000 |
| Weaker rupee | ₹1,05,000 | +₹5,000 (+5.0%) | ₹0 / ₹0 / ₹0 / +₹5,000 |
| After reset (all zero) | ₹1,00,000 | ₹0 (0.0%) | ₹0 / ₹0 / ₹0 / ₹0 |

**Tax:**

| Input | Tax | Result |
|---|---|---|
| +₹1,00,000 at 30% (default) | ₹31,200 | You’d keep ₹68,800 |
| +₹1,00,000 at 0% | ₹0 | You’d keep ₹1,00,000 |
| ₹0 at 30% | ₹0 | You’d keep ₹0 · "No profit, so no tax." |
| −₹50,000 at 30% | ₹0 | Your loss for the year ₹50,000 |
| +₹20,00,000 at 30% | ₹6,24,000 | You’d keep ₹13,76,000 |
| +₹10,000 at 5% | ₹520 | You’d keep ₹9,480 |
