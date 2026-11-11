# Developer questions for the joint review

Raised against `spec.md` v1.1. Each item says what the spec says, what was built (the most conservative reading), and what needs a decision. Numbered so the review can answer by number.

## Dev 1 (foundation), 10 Nov 2026

### Spec defects found while building (a fix was needed to meet the spec's own intent)

**F1. §2.1 base rule `* { border-color: var(--color-border); }` paints grey-200 hairlines inside the ink band.**
- `--color-border` comes from `@theme inline`, so Tailwind emits it on `:root` as `var(--border)`, and the browser resolves it *there* (grey-200). `.theme-ink` changes `--border` but never re-resolves `--color-border`, so every default hairline in the band (`border-t`, `divide-y`, `border-y` without a colour class) was grey-200 on ink instead of ink-600 (§3.1).
- Measured on `/dev/components`: band `RuleList` border `rgb(226, 232, 240)` before, `rgb(72, 75, 85)` (ink-600) after.
- **Built:** the one change to §2.1: `* { border-color: var(--border); }`. Everything else in `globals.css` is byte-identical to §2.1. The light island in the band and the page still compute grey-200.
- **Decide:** confirm, and update §2.1 so A21-style comparisons against the spec don't flag it.

> **Answer (Designer 3):** Confirmed; spec defect, your fix is the spec now (v1.2, §2.1: `* { border-color: var(--border); }`). Reason: `--color-*` aliases resolve once on `:root`, so only the raw role variables re-colour inside `.theme-ink`. §2.1 also gains the general rule: plain CSS reads role variables (`var(--border)`), never the `--color-*` aliases. No code change.

**F2. A5 can't pass as written.** `rg 'tone="ink"|theme-ink' src/components` must return exactly 1 hit, but §4.1 has `Section` map `tone="ink"` → `theme-ink`, so `ui/section.tsx` is a permanent second hit once `security.tsx` uses `tone="ink"`.
- **Built:** as §4.1 says.
- **Decide:** change A5 to exclude `ui/section.tsx`, or count only `tone="ink"`.

> **Answer (Designer 3):** A5 becomes two checks (v1.2):
> - `rg -n 'tone="ink"' src/components` → exactly 1 hit, `home/security.tsx`;
> - `rg -l 'theme-ink' src/components` → exactly 1 file, `ui/section.tsx`.
>
> Reason: this still proves one band and one mapping, and nothing is excluded by path. No code change.

### Readings to confirm

**Q1. Button heights: `min-h-11` / `min-h-12` instead of `h-11` / `h-12`.**
- §4.3 gives heights `h-11` / `h-12`, but §4.16's quiet prompt buttons use `whitespace-normal` and wrap to 2 lines at 320. A fixed height would clip them, and §8 1.4.12 says "never a fixed `h-*` on anything that holds wrapping text".
- `min-h` renders identically for every one-line button.
- **Built:** `md` = `min-h-11 px-4`, `lg` = `min-h-12 px-6`, `icon` = `size-11`.

> **Answer (Designer 3):** Confirmed (`min-h`); §4.3 updated in v1.2. Reason: identical for one-line buttons, and the 1.4.12 rule wins for wrapping prompts. No code change.

**Q2. `cursor-pointer` on buttons.**
- The §4.3 base class list has no cursor, and Tailwind 4's preflight sets `cursor: default` on `<button>`. "Send my question" would show an arrow while "Ask a CA" (a link) shows a hand.
- The reference build used `cursor: pointer`, and chips and FAQ summaries already have `cursor-pointer` in the spec.
- **Built:** `cursor-pointer` added to the button base.

> **Answer (Designer 3):** Confirmed; added to the §4.3 base classes in v1.2. Reason: every clickable control on the page shows the same cursor (skill `cursor-pointer`). No code change.

**Q3. Is the loading button dimmed?**
- §4 shared states say `aria-disabled` → `opacity-60`, and §4.3's loading state is also `aria-disabled`. The reference build's "Sending…" button is full ink, while the prompts (unavailable) are dimmed.
- **Built:** `aria-disabled:not-aria-busy:opacity-60`. Unavailable actions dim; the loading button stays full ink with `cursor-not-allowed`.

> **Answer (Designer 3):** Confirmed. Loading (`aria-busy`) is not dimmed; only unavailable actions dim. §4.3 now says so (v1.2). Reason: a dimmed "Sending…" reads as "broken"; the spinner and label carry the state. No code change.

**Q4. How the loading width lock is measured.**
- §4.3: `min-w-[var(--w)]`, with `--w` measured on mount.
- `button.tsx` also exports `ButtonLink`, which server components import, so it can't use React state hooks.
- **Built:** a callback ref writes `--w` on the element whenever the button renders idle (subpixel width), and `min-w-[var(--w)]` applies only while `loading`. Measured on the preview: 186.33px idle → 186.33px "Sending…".
- **Consequence:** `<Button>` must be rendered from a client component (it attaches handlers). Every spec'd use already is: AskForm, QuestionPrompts, WhatIf, TaxEstimator. Server components use `ButtonLink`.

> **Answer (Designer 3):** Confirmed, including the rule "`<Button>` only inside client components; Server Components use `ButtonLink`" (added to §4.3 in v1.2). Reason: the width is measured from the rendered element with no hook, and every spec'd action already lives in a client component. No code change.

**Q5. The header needs `relative`.**
- §4.19's header classes are `tall:sticky top-0 z-40 …`. Below 600px tall the header is static, and the menu panel (`absolute top-full`) would then position against the page, not the header.
- **Built:** `relative tall:sticky …`. With `tall`, sticky overrides it; there's no visual change otherwise.

> **Answer (Designer 3):** Confirmed; §4.19 updated (v1.2). Reason: the menu panel must anchor to the header when the header is static (short screens, 200% zoom). No code change.

**Q6. `Disclosure` element.**
- §4.21: `<Disclosure>` renders a `<div>`. Several inline uses sit where a `div` is invalid HTML (and breaks hydration): the slider hint `<p>`, the fact cell's second `<span>` inside an `<a>`, and the footer's `p.font-semibold` OTP line.
- **Built:** an `as="div" | "p" | "span"` prop (default `div`). It always carries `data-disclosure-id`.

> **Answer (Designer 3):** Confirmed; §4.21 updated (v1.2). Reason: valid HTML and clean hydration; registry entries are inline content, so any of the three elements works. Section developers pick the element that fits its parent: `span` inside the fact-cell `<a>`, `p` for the slider hint and the footer OTP line. No code change.

**Q7. The disclosure registry's `ctx`.**
- §4.21 types entries as `(ctx) => ReactNode` without defining `ctx`.
- **Built:** `ctx = { fiuRegNo }`, defaulting to `FIU_REG_NO` from `links.ts`.

> **Answer (Designer 3):** Confirmed as `DisclosureContext = { fiuRegNo: string | null }`; §4.21 updated (v1.2). Reason: the number is the only variable in any disclosure today. A new field is added only with a new spec'd entry. No code change.

**Q8. `<abbr>` inside `fiu-band-v1`.**
- §3.2: the first FIU-IND in body text of each section gets `<abbr title>` plus the gloss. `fiu-band-v1` is that first use in both the band (row D) and the FAQ answer, and it already carries the gloss in words.
- **Built:** `<abbr title="Financial Intelligence Unit-India">FIU-IND</abbr>` inside that entry; the words are unchanged.
- The footer entries have no gloss in their copy, so they have no `abbr`. Confirm.

> **Answer (Designer 3):** Confirmed on both counts.
> - The `<abbr>` goes inside `fiu-band-v1` with the words unchanged.
> - There's no `abbr` in the footer entries: `fiu-registration-v1` is owner-protected wording that can't gain a gloss, and an `abbr` tooltip alone does nothing on touch (Round D N-g).
>
> No code change.

**Q9. Size of the external-link icon.**
- §4.4 says `ArrowUpRight` 14px; §3.6 and B9 allow icons at 16 / 20 / 24px only.
- **Built:** 14px (`size-3.5`) per §4.4. Which wins?

> **Answer (Designer 3):** §4.4 wins: 14px (`size-3.5`) for `ArrowUpRight` only. §3.6 and B9 now list it as the one 14px icon (v1.2). Reason: it sits inline in 14–16px link text, where a 16px glyph looks oversized next to lowercase letters. Keeping what's built avoids churn. No code change.

**Q10. A standalone link that is also external ("Get the app").**
- The standalone link has a trailing `ArrowRight`; external links add `ArrowUpRight`. Showing both would give two arrows.
- **Built:** `ArrowUpRight` replaces `ArrowRight` on external standalone links.

> **Answer (Designer 3):** Confirmed; §4.4 updated (v1.2). Reason: one arrow per link; the up-right arrow is the one that tells you you're leaving the site. No code change.

**Q11. `Alert info` text colour.**
- The §4.17 container is `text-body-md text-foreground`, but its anatomy says the body is `p.text-body-md.text-copy`.
- **Built:** per the anatomy (body in the copy grey). The container's ink colours only the `Info` icon.

> **Answer (Designer 3):** Confirmed: the title is ink (`type-subhead`), the body is `text-copy`, and the icon inherits ink; §4.17 clarified (v1.2). Reason: the same text hierarchy as everywhere else (heading ink, body copy grey). No code change.

**Q12. Colour of the FAQ `Minus` icon.**
- §4.18 gives `Plus` `text-muted-foreground`; `Minus` has only `hidden group-open:block`.
- **Built:** both icons muted, and both turn ink on hover (the stated hover).

> **Answer (Designer 3):** Confirmed; §4.18 updated (v1.2). Reason: open and closed are the same control, so they get the same colour; the shape carries the state. No code change.

**Q13. The slider's zero tick before measuring.**
- §4.14's `nearZero` needs the track width, which isn't known in the server HTML or with JS off.
- **Built:** until the `ResizeObserver` reports, the code assumes the narrowest track on the page (224px, the tool card at 320). So the tick can only *appear* after hydration, never vanish. At the tax default (4% from zero) it stays hidden at every width.

> **Answer (Designer 3):** Confirmed; §4.14 updated (v1.2). Reason: erring towards hidden means the server HTML and the JS-off view never show the "⊢◯" collision, and nothing pops out of view after hydration. No code change.

**Q14. Readout scroll margin on tool controls.**
- §4.15: every focusable control inside a tool gets `scroll-mt-[calc(var(--header-h)+var(--readout-h)+1rem)]`. `Slider` and `ChoiceChips` are only used in the tools.
- **Built:** the margin is baked into the slider's `<input>` and each chip's radio. Tool developers still add it to the reset button, the tabs and the standalone link.

> **Answer (Designer 3):** Confirmed for the slider and the chips. The tools developer adds the class only to the focusable controls **inside the tool card**: the reset button and the "Ask a CA about your own tax" link. The **tabs don't need it**: the tab list sits above the card, so the readout (sticky only inside the card) can never cover a focused tab. Adding it there is harmless but unnecessary. §4.15 updated (v1.2). Reason: the margin only matters where the readout can sit on top. **Code change (tools developer):** add `scroll-mt-[calc(var(--header-h)+var(--readout-h)+1rem)]` to those two controls (already in your plan).

**Q15. The slab chips' helper.**
- §6.6.2 puts a helper "under the legend", and §4.13's legend has `mb-3`.
- **Built:** when a helper exists, the legend has no margin and the helper is `mb-3`, linked with `aria-describedby` on the `<fieldset>`. This matches the reference build.

> **Answer (Designer 3):** Confirmed; §4.13 updated (v1.2). Reason: one 12px gap between the group's text and its options, whether or not a helper exists, and the helper is announced with the group. No code change.

**Q16. `DefinitionList` stacks below 360.**
- §4.8 says "< 360 or `stacked`". There's no token breakpoint at 360.
- **Built:** the arbitrary variant `max-[22.5rem]:`, the same 22.5rem `type-display` uses in §2.1. A2's allow-list covers values, not variants. Confirm.

> **Answer (Designer 3):** Confirmed: `max-[22.5rem]:` is the one allowed arbitrary breakpoint variant (it matches `type-display`'s own step). §4.8 and A2 updated (v1.2). Reason: no new token for one stacking rule, and the same 360px threshold as the type scale. No code change.

**Q17. `<html>` height.**
- §2.2: `<html className={manrope.variable}>` and `<body className="flex min-h-full flex-col">`. Without `h-full` on `<html>`, `min-h-full` on `<body>` has no effect. It doesn't matter on this page, which is far taller than the viewport.
- **Built:** exactly as §2.2. Add `h-full` to `<html>`?

> **Answer (Designer 3):** Yes: `<html lang="en-IN" className={`${manrope.variable} h-full`}>`; §2.2 updated (v1.2). Reason: it makes `min-h-full` on `<body>` do its job, keeping the footer at the bottom of any short route (`/dev/components`, a future 404), and restores what the pre-redesign layout had. **Code change (Dev 1):** `src/app/layout.tsx`, one class.

**Q18. `next/image` `priority` is deprecated.**
- §4.19 says `<Image … priority>`. Next 16 deprecates `priority` in favour of `preload` (same behaviour).
- **Built:** `preload`. The header and footer logos are the same file, so it's one request.

> **Answer (Designer 3):** Confirmed (`preload`); §4.19 updated (v1.2). Reason: the Next 16 docs (`image.md`) deprecate `priority` in favour of `preload`, with the same behaviour. Only the header instance needs `preload`; the footer's copy is the same cached file, so leaving `preload` off there is also fine. No code change.

### Ownership (the file plan doesn't assign developers)

**O1. Left for the section and form developers:**
- `src/lib/advisor-forward.ts` (+ test), `src/app/actions.ts` and the thin `route.ts`;
- `src/components/ui/{mock-frame, fact-cell, allocation-bar, money-path, tool-result}.tsx`, `QuestionPrompts` and `home/hash-handler.tsx`.

Built by Dev 1 because the header, footer or `Disclosure` need them: `src/lib/nav.ts`, `src/content/disclosures.tsx` and the `links.ts` additions. Confirm.

> **Answer (Designer 3):** Confirmed (already resolved by the coordinator).
> - **Dev 1 owns** `nav.ts`, `links.ts` and the registry.
> - **I checked the registry:** it holds all 16 ids of §4.21 word for word.
> - **The registry is closed:** section developers render only through `<Disclosure id>`. A new or changed sentence is a spec change (new `-vN` id) raised here, not added in a section file (A12 enforces it).

## Developer 2 (content sections), 10 Nov 2026

Raised against v1.2. Files: `page.tsx`, `home/{hero, hero-panel, basket, sleeve-info, how-it-works, security, faq, hash-handler}.tsx`, `ui/{mock-frame, fact-cell, allocation-bar, money-path}.tsx`. Each item gives what the spec says, what was built (the most conservative reading), and what needs a decision.

### Spec gaps found while building

**F3. The money-path `ArrowDown` isn't in the icon list.**
- §4.11 names `ArrowDown` for the vertical path below 1024. §3.6's "complete list" and B9 don't include it.
- **Built:** `ArrowDown` per §4.11. It's the only way to draw the arrow §4.11 specifies.
- **Decide:** add `ArrowDown` (money path, vertical) to §3.6 and B9.

> **Answer (Designer 3):** Accepted. `ArrowDown` (16px, the vertical money path below 1024) is added to §3.6's list and to B9 (v1.3). Reason: §4.11 already requires it, and the list was meant to be complete. No code change.

**F4. Hero grid areas against A2.**
- §6.2 says "use CSS grid areas" (`"copy" "facts" "panel"` / `"copy panel" "facts facts"`). Tailwind 4 has no `grid-template-areas` utility, so it would need arbitrary properties (`[grid-template-areas:…]`, `[grid-area:…]`), and those aren't on A2's allow-list.
- **Built:** the same grid with line placement: copy `lg:col-start-1 lg:row-start-1`, panel `lg:col-start-2 lg:row-start-1`, facts `lg:col-span-2 lg:row-start-2`. The DOM order is still copy → facts → panel; the rendered layout is identical.
- **Decide:** confirm line placement, or allow-list the two arbitrary properties.

> **Answer (Designer 3):** Line placement confirmed; §6.2 now gives your classes instead of "grid areas" (v1.3). Reason: the same layout and the same DOM order with no new A2 exception. I checked the build: no overflow from 320 to 1920, and at 1440 the four fact cells share one bottom edge. No code change.

**F5. The money-path end node is 70px tall at ≥ 1024, while B17 says "every node is 56px".**
- "Your bank account, in your name" wraps to 3 lines at both 1024 (node 122px) and 1440 (node 145px; 117px of text room after padding and border). Every other node is 56px, and every line meets its node's middle (measured offset 0).
- Reference-notes N1 records the same measured result: "every node 56px (70 for the 3-line end node)".
- **Built:** exactly §4.11's classes and ratios.
- **Decide:** reword B17 to "no node stretched by its label; one-line and two-line nodes are 56px", or change the node copy or ratio.

> **Answer (Designer 3):** B17 is reworded (v1.3). The new rule:
> - no node is stretched by a connector label;
> - one-line and two-line nodes are 56px;
> - the 3-line end node "Your bank account, in your name" may be up to 72px;
> - each line meets its node at the node's vertical middle;
> - every connector label is at most 2 lines.
>
> Reason: the copy is fixed (K11, the end node names the account's owner) and the ratio was tuned for the labels. I measured the build at 1440 and got nodes of 56 / 56 / 56 / 56 / 70. No code change.

### Readings to confirm

**Q19. `FactCellData.second` is a `ReactNode`, not a `string`.**
- §4.9 types `second: string`, but three of the four second sentences are registry entries (`fiu-cell-v1`, `risk-cell-v1`, `withdraw-cell-v1`), and R15 says they render only from the registry.
- **Built:** `second: ReactNode`. Cells 1–3 pass `<Disclosure id as="span" />`; cell 4 passes its plain string.

> **Answer (Designer 3):** Confirmed; §4.9 now types `second: ReactNode` (v1.3). Reason: the registry is the only source for those sentences (A12). No code change.

**Q20. The fact-cell arrow gap.**
- §4.9 says the first sentence is "followed by `ArrowRight` 16px inline", with no gap given.
- At 1440, "We never ask for your OTP or PIN." measures 248.5px in a 270px cell. An 8px gap (248.5 + 8 + 16 = 272.5) wraps "or PIN." onto a second line.
- **Built:** `ml-1` (4px, about one space). Cell 4 fits on one line at 1440, as in the reference. The last word and the arrow are kept together with `whitespace-nowrap`, so the arrow never wraps alone.

> **Answer (Designer 3):** Confirmed; §4.9 now says `ml-1`, with the last word and the arrow kept together (v1.3). Reason: a one-space gap reads as part of the sentence, and the arrow never ends up alone on a line. The v1.3 heading weight (700) applies only to `type-*` headings, not to this 16px first sentence, so the measurement still holds. No code change.

**Q21. `<abbr>` where the copy has no gloss.**
- §3.2 asks for `<abbr title>` plus a gloss in words on the first CA / KYC / FIU-IND / VDA in body text of each section, "as written in the copy below".
- **Built:** `abbr` only where the copy writes it: KYC in step 1, and FIU-IND inside `fiu-band-v1` (Dev 1's Q8). There is no `abbr` on:
  - hero cell 1 "Registered with FIU-IND." (no gloss in the copy, and §4.9 types it as a plain string);
  - "Ask a CA your question first." (How it works) and "Ask a CA." (the FAQ side line);
  - the FAQ's "A chartered accountant (CA)", whose gloss is already in words.
- Same reasoning as the Q8 answer: an `abbr` tooltip alone does nothing on touch.

> **Answer (Designer 3):** Confirmed; §3.2 now reads "`abbr` only where the copy itself writes the expansion" (v1.3). Reason: the gloss in words is what helps a reader, and a hover tooltip adds nothing on touch. The FAQ already says "chartered accountant (CA)" in words. No code change.

**Q22. Sleeve blocks at ≥ 1024: DOM order.**
- §6.3 shows the swatch and percentage above the name at ≥ 1024, and the name on the left with the percentage on the right below 1024.
- **Built:** one DOM at every width, with the `h3` (the name) first and the percentage second. `lg:flex-col-reverse` puts the percentage above the name from 1024. So a screen reader hears each block as "US stocks, 50%, what, why", and the heading opens its block. The order differs visually only at ≥ 1024, and the block has nothing focusable.
- **Decide:** confirm, or require the percentage first in DOM at every width (the name then comes after its figure below 1024 too).

> **Answer (Designer 3):** Confirmed: name first in the DOM, with `lg:flex-col-reverse`. Added to §6.3 (v1.3). Reason:
> - the heading opens its block for screen readers at every width;
> - the visual reorder happens only at ≥ 1024;
> - there's nothing focusable, so 2.4.3 focus order isn't affected.
>
> No code change.

**Q23. Page metadata and `openGraph`.**
- §6.0 lists `openGraph.title` and `.description` for `page.tsx` and `layout.tsx`. In Next 16, a page-level `openGraph` replaces the layout's whole object; it doesn't merge with it. Repeating it in the page would drop the layout's `siteName`, `locale` and `type`.
- **Built:** the page sets `title.absolute` and `description`. `openGraph` (the same §6.0 title and description) comes from the root layout. The rendered `<title>` and meta tags match §6.0.

> **Answer (Designer 3):** Confirmed; §6.0 now says `openGraph` lives only in `layout.tsx` (v1.3). Reason: a page-level `openGraph` object replaces the layout's instead of merging, which would drop `siteName`, `locale` and `type`. No code change.

**Q24. The hero panel's 600px cap starts at `sm` (640).**
- §6.2 gives "Panel width: 768 → `max-w-[600px]`".
- **Built:** `sm:max-w-[600px] lg:max-w-none` (decision 18: sm is the layout breakpoint). The widths at 320 / 390 / 768 / 1024 / 1440 are exactly as listed (288 / 358 / 600 / 532 / 635). Between 640 and 767 the panel stops growing at 600 instead of stretching to 719.

> **Answer (Designer 3):** Confirmed; §6.2 now says `sm:max-w-[600px] lg:max-w-none` (v1.3). Reason: the five listed widths are unchanged, and at 640–767 a 600px panel keeps the mock's proportions instead of stretching to 719. No code change.

### Coordination (Developer 3's files; not changed by me)

**C1. Two owners of `#what-if` / `#tax`.**
- §5.3 and §10 put hash handling in `home/hash-handler.tsx`. `home/tools-tabs.tsx` also selects the tab, scrolls and focuses on load, on hashchange and on a same-hash click.
- Its click path only fires when the link's hash already equals `location.hash`. A next/link to `/#tax` from another hash (the FAQ's "Try the tax estimate") changes the URL with `pushState`, so no `hashchange` fires; only `HashHandler` handles that case. It takes the click over in the capture phase, pushes the hash, activates the tab, scrolls to `#numbers` and focuses the panel's `h3`.
- Tested together: no conflict. On load, both reach the same tab, the same scroll position and the same focused `h3`. The duplication is still a maintenance risk.
- **Suggest:** `ToolsTabs` keeps only the `replaceState` on tab change (§5.3, row 3) and drops its own hash listeners.

**C2. Two `Swatch` components.**
- §4.10 specifies the swatch with `AllocationBar`. `ui/allocation-bar.tsx` exports `Swatch({ sleeve })` and is the only file that maps sleeves to `bg-data-*`.
- `ui/tool-result.tsx` defines a second `Swatch` with its own map, so A17 (`bg-data-gold`) hits two files.
- **Suggest:** `tool-result.tsx` imports `Swatch` from `ui/allocation-bar`. `sleeve-info.tsx` now holds only `what` / `why` (§6.3: `swatch`, `swatchOnInk` and `tag` deleted).

**C3. A3 / A12 match comments.**
- The greps are literal, so a comment that quotes a palette name ("grey-300") or a disclosure phrase ("may be paid by us") counts as a hit. I reworded my comments.
- `home/ask.tsx` line 1 still trips A12 ("the CA may be paid by us").

> **Answer (Designer 3):** All three are resolved and acknowledged; I checked them on the production build.
> - **C1:** `HashHandler` is the only owner of load, `hashchange` and click handling; `ToolsTabs` only replaces the hash. §5.3 already says this.
> - **C2:** `tool-result.tsx` imports `Swatch`, and A17 hits only `allocation-bar.tsx`.
> - **C3:** comments are reworded, and A3 and A12 are clean in `src/components`.

## Developer 3 (tools and form), 11 Nov 2026

Raised against v1.2. Files: `home/{tools, tools-tabs, what-if, tax-estimator, ask, ask-form}.tsx`, `ui/{tool-result, question-prompts}.tsx`, `app/actions.ts`, `lib/advisor-forward.ts` (+ test), `app/api/advisor-request/route.ts`. Same format as above: what the spec says, what was built (the most conservative reading), what needs a decision.

### Spec defects found while building (a fix was needed to meet the spec's own intent)

**F6. The §4.12 no-JS style can't show the second panel.**
- Tailwind 4's preflight hides `[hidden]` with `display: none !important` inside `@layer base`. An `!important` declaration in a cascade layer beats an unlayered `!important` one, so the spec's unlayered `[data-tools-panel][hidden]{display:block!important}` never applied: with JS off, the tax panel stayed hidden (QA H1 failed). Measured in Chrome with scripting off.
- **Built (Dev 1's `ui/tabs.tsx`, `TabsNoScript`, one change):** that one rule is wrapped in `@layer base{…}`, so it joins preflight's layer and wins on specificity (0,2,0 against 0,1,0). The tablist and margin rules are unchanged. H1 now passes at 390 and 1440.
- **Decide:** update the §4.12 snippet to `…[data-tools-tablist]{display:none}@layer base{[data-tools-panel][hidden]{display:block!important}}[data-tools-panel]+[data-tools-panel]{margin-top:3rem}…`.

> **Answer (Designer 3):** Accepted, and the foundation change in `ui/tabs.tsx` is approved. §4.12's snippet is now exactly yours (v1.3).
> - **Why it works:** inside the same layer the rule wins on specificity (0,2,0 over preflight's 0,1,0), and the other two rules don't need the layer.
> - **Verified on :3001 with JS off at 1440:** both panels compute `display: block`, the tablist `none`, and the second panel keeps its `hidden` attribute.
> - **If Tabs is rebuilt by hand** (§9, JS budget), keep `TabsNoScript` unchanged: inactive panels still use `hidden`.
>
> No further code change.

**F7. Base UI marks the unselected tab panel `inert`.**
- `Tabs.Panel` renders `inert` on the panel that isn't selected, in the server HTML too. With JS off, the stacked tax panel would be visible but out of the accessibility tree, skipped by find-in-page, and its chips and slider unusable. That undoes decision 28's reason ("all honesty text reachable").
- **Built:** `<TabsPanel inert={false}>` in `tools-tabs.tsx` (no foundation change). With JS on, the unselected panel is still `hidden`, which already removes it from reach.
- **Decide:** add `inert={false}` to §4.12's Panel line.

> **Answer (Designer 3):** Accepted; §4.12's Panel line now carries `inert={false}` (v1.3).
> - **Reason:** decision 28 exists so the tax panel's VDA warning stays reachable with JS off.
> - **Verified:** neither panel has `inert` in the server HTML.
> - **If Tabs is rebuilt by hand** (§9 should-fix), the prop disappears with Base UI: a hand-built panel never sets `inert`.
>
> No further code change.

**F8. G8's example contradicts §4.14's own rule at 320 and 390.**
- §4.14 hides the zero tick while the thumb's centre is within 24px of it. On the tax slider, −₹2,00,000 sits 8% of the track from zero: 17.8px at 320 and 23.4px at 390, so the tick is correctly hidden there. At 1440 it's 43px, and the tick shows. −₹3,00,000 shows it at every width (26.6px at 320).
- **Built:** exactly §4.14's formula, through Dev 1's `Slider`.
- **Decide:** change G8 to "drag to −₹3,00,000 and the tick shows" (or say "at 1440" for −₹2,00,000).

> **Answer (Designer 3):** Accepted, with one change.
> - **Threshold:** D1's joint review (V1) shows the tick still sitting beside the thumb just past 24px: the tax default at 768, and Gold −5% at 390. §4.14 now hides the tick within **32px** of the thumb's centre (24 thumb + 8 clear).
> - **G8 therefore reads "drag to −₹4,00,000 and the tick shows" at 320, 390 and 1440.** −₹3,00,000 is 26.6px at 320, still under 32; −₹4,00,000 is 35.5px.
> - **Measured on :3001 today:**
>   - 0 ticks at the default at 320, 390 and 1440;
>   - at −₹2,00,000 a tick at 1440 only, which matches your arithmetic.
>
> **Code change (Dev 1):** in `ui/slider.tsx`, the `nearZero` comparison uses `THUMB_PX + 8` (32) instead of `THUMB_PX`.

### Readings to confirm

**Q25. `DivergingBar` uses an inline `transform`, which A9's list doesn't include.**
- §4.15: "width via `transform: scaleX()` with `transform-origin` at the zero line". A9: inline `style` only for `--a`, `--b`, `left`, `flexGrow` and `--w`.
- **Built:** `style={{ transform: "scaleX(f)" }}` with `origin-left` / `origin-right`. A9's grep (colour and background) doesn't catch it.
- **Decide:** add `transform` (DivergingBar) to A9's list, or rebuild it as `style={{ "--b": f }}` plus a class, which needs an A2 allow-list entry.

> **Answer (Designer 3):** `transform` (DivergingBar only) is added to A9's list (v1.3). Reason: `scaleX` is the specified mechanism, it's a value rather than a colour, and a custom property plus an arbitrary class would only move the same number somewhere harder to read. No code change.

**Q26. The readout's text colour.**
- §4.15 gives the readout no colour class, so it inherits ink. Yet its figure span is explicitly `text-foreground`, and the reference shots show the rest of the line in grey.
- **Built:** the literal classes, so the whole line is ink; the figure is 600.
- **Decide:** keep ink, or add `text-muted-foreground` to the readout (the figure span stays ink).

> **Answer (Designer 3):** **Keep the whole line ink**, as built; §4.15 now says so (v1.3). Reason: D1 and D2 agree that the honesty word ("Example result:" / "Estimate:") must not be quieter than the figure it qualifies (K12, decision 53). The reference shots aren't binding on colour. No code change.

**Q27. Gaps in the tax result that §6.6.2 doesn't state.**
- **Built:** `SplitBar` `mt-3` (inside the figure's object); the `DefinitionList` `mt-4`; "No profit, so no tax." `mt-2` after the row; "Ask a CA about your own tax" `mt-2` after the footnote. The `mt-2` matches the reference's measured gap; the link's 44px hit row adds 9px either side.
- **Decide:** confirm, or state them in §6.6.2.

> **Answer (Designer 3):** Confirmed, and written into §6.6.2 as built (v1.3): `SplitBar mt-3`, `DefinitionList mt-4`, "No profit, so no tax." `mt-2`, and the link `mt-2`. Reason: each gap is one class on one element (§3.3), and the values match the reference. No code change.

**Q28. `lg:rounded-r-md` on the result column.**
- From 1024 the grey fill sits flush with the card's right edge. With square corners it would paint past the card's 12px rounded corners.
- **Built:** `lg:rounded-r-md` (12px). This is not a new radius: the existing 12px token, inside the card's 11px inner curve.
- **Decide:** confirm.

> **Answer (Designer 3):** Confirmed; §4.15 now includes `lg:rounded-r-md` (v1.3). B3 measured {4, 8, 12, 16} on :3001, so no new radius. No code change.

**Q29. The breakdown's bar is a `<span>` inside a `<dl>` row.**
- §4.15 puts the `DivergingBar` (`span`, `aria-hidden`) as the third child of each `div` row in the `<dl>`. HTML allows only `dt` / `dd` (and script-supporting elements) inside a `dl`'s `div`, so a validator flags it. Browsers and screen readers ignore it, because it's `aria-hidden`.
- **Built:** per spec.
- **Decide:** accept, or move the bar inside the `dd` (it then can't span both columns without `display: contents`).

> **Answer (Designer 3):** Fix it with a **second `dd`**: `<dd aria-hidden className="col-span-2">{bar}</dd>` after the amount's `dd`, and `DivergingBar`'s own span drops `col-span-2` (§4.15, v1.3).
> - **Valid HTML:** a `dl` group may hold one `dt` and several `dd`.
> - **Layout:** the `dd` is a grid child, so it still spans both columns.
> - **Screen readers:** `aria-hidden` keeps it silent.
>
> **Code change (Dev 3), nice-to-have:** `ui/tool-result.tsx`, `BreakdownRow` and `DivergingBar`.

**Q30. "A preset matches" is read as "a chip is checked".**
- §6.6.1 Result: "a preset matches → Made-up scenario: {label}". Interactions: "Any slider moved: the scenario radio set clears; the line becomes Your own scenario".
- **Built:** the scenario line follows the checked chip. A chip sets it; any slider move clears it, even one that happens to land on a preset's values. The line and the chips never disagree.
- **Decide:** confirm, or derive both from matching values (a chip would then re-check itself when sliders land on a preset).

> **Answer (Designer 3):** Confirmed; §6.6.1 now says "a chip is checked" (v1.3). Reason: the line and the chips can never disagree, and a chip re-checking itself mid-drag would be a surprise. D2 verified it on the build. No code change.

**Q31. Where the "couldn't send" and "offline" alerts go.**
- §7.4 places only the 503 alert ("where the submit was").
- **Built:** both sit above the submit, which stays. "Try again" is a `type="submit"` button, so it resubmits the same data and also works before hydration. The alert stays visible while the retry is sending, so nothing shifts under the pointer. It gets a new key per attempt, so a repeat failure re-focuses it.
- **Decide:** confirm.

> **Answer (Designer 3):** The behaviour is confirmed:
> - "Try again" is `type="submit"`;
> - there's a key per attempt;
> - the alert stays visible during the retry;
> - the submit stays visible in the failed and offline states.
>
> **Placement changes** (D2's joint review S2, adopted in v1.3, §7.1 and §7.4). Today a no-JS or pre-hydration POST lands on `/#ask` with the outcome about 1,300px down at 390. So:
> - the 503, couldn't-send and offline Alerts render at the **top of the form card**, above "Your name", in every mode;
> - the permalink becomes **`/#ask-form`**, on the card (`Panel id="ask-form"`).
>
> With JS the effect is unchanged, because focus already moves to the Alert. D2's optional N5 (hide the submit while "Try again" shows) isn't adopted.
>
> **Code change (Dev 3), should-fix:** `home/ask.tsx` (the card id) and `home/ask-form.tsx` (the permalink and the Alert position).

**Q32. "Ask another question" with JS off.**
- §7.4 lists only the two Copy buttons as client-only. Without JS the confirmation's "Ask another question" button renders but does nothing (reloading `/#ask` from a POST-landed `/#ask` is a fragment jump, so a plain link can't reset the form either).
- **Built:** per spec (always rendered).
- **Decide:** keep, or render it only after hydration like Copy.

> **Answer (Designer 3):** Render it **only after hydration** (§7.4 "Client-only controls", v1.3; D2 S4 agrees).
> - **Reason:** a button that does nothing on the success screen reads as broken. With JS off, the confirmation ends at the OTP line, which is a complete state.
> - **On slow 3G** the button simply appears when the scripts load.
>
> **Code change (Dev 3), should-fix:** `home/ask-form.tsx`, where `Sent` renders the button only when `hydrated`.

**Q33. Where `QuestionPrompts` lives.**
- §4.16 describes it inside the `field.tsx` section; §4 says components live in `src/components/ui/` unless noted.
- **Built:** `src/components/ui/question-prompts.tsx`, without `"use client"`: only `AskForm` imports it, so it's in the client bundle (A16 unaffected).

> **Answer (Designer 3):** Confirmed; §4.16 and §10 now name the file (v1.3). A16 is unaffected. No code change.

**Q34. Where `AskState` lives.**
- A `"use server"` file may export only async functions.
- **Built:** `AskValues`, `AskState`, `readAskForm` (FormData → values) and `toAskState` (forwarder result → state, counting repeat failures) are in `lib/advisor-forward.ts`, with tests. So `src/lib`'s diff stays within J's list. `actions.ts` exports only `askCa`.

> **Answer (Designer 3):** Confirmed; §7.1 now says where the types and helpers live (v1.3). Reason: a `"use server"` file may export only async functions, and the J check stays clean. No code change.

**Q35. A `timeoutMs` dependency on the forwarder.**
- §7.1's deps are `{ fetch, env, uuid }`.
- **Built:** an optional `timeoutMs` (default 8000) as well, so the timeout test runs in 30ms. A separate test spies on `AbortSignal.timeout` to prove the default is 8000.

> **Answer (Designer 3):** Confirmed; §7.1's signature now lists `timeoutMs = 8000` (v1.3). Reason: test speed, with the production default proven by its own test. No code change.

**Q36. Typing before hydration.**
- React 19 keeps a controlled input's DOM value while hydrating, but the first re-render writes the (empty) state back over it. On a slow network, a name typed before the scripts loaded vanished when they did (a variant of H2).
- **Built:** `AskForm` copies the fields' DOM values into state in a mount layout effect, before that re-render. Tested with scripts held back: the values survive, and a prompt appends to the typed question. React logs a development-only "attributes didn't match" notice in that case; it isn't logged on a normal load.
- **Note (foundation, not changed):** the tools' sliders and chips moved before hydration snap back to the defaults when the scripts load, because `Slider` and `ChoiceChips` are controlled. The result is consistent (default inputs, default result). The same layout-effect sync would fix it if wanted.

> **Answer (Designer 3):** The `AskForm` capture is accepted as a foundation-level pattern. I reviewed the code: a mount `useLayoutEffect` reads `readAskForm(new FormData(form))` and updates state only when a field differs. The development-only hydration notice is acceptable. H2 is recorded as passing (D2 verified it).
>
> The tools snapping back before hydration is accepted for v1.3: inputs and result stay consistent, and nothing typed is lost. The same sync on `Slider` and `ChoiceChips` is logged as a nice-to-have for Dev 1 (`joint-review-d3.md`). No code change now.

**Q37. The privacy link's path.**
- §7.2: add "Read our privacy notice." as a link only when the page exists (`isLive()`).
- **Built:** `isLive("/legal/privacy")` (the path from `content-rules.md`'s site map). It's false today, so nothing renders.

> **Answer (Designer 3):** Confirmed; §7.2 now names `/legal/privacy` (v1.3). Launch blocker 2 switches it on. No code change.

**Q38. "Copy reference" on its own line at 390.**
- At 390 the quiet button wraps under "Your reference: PQ-…", and its `px-4` padding starts the label 16px in from the text's left edge. A negative margin to pull it back isn't on A19's list.
- **Built:** per spec.
- **Decide:** accept, or allow `-ml-4` on it.

> **Answer (Designer 3):** Neither. Per D1's joint review (V6), "Copy reference" becomes a **`Button secondary md`** on its own line (`mt-3`), under the reference sentence, at every width (§7.4 and B23, v1.3).
> - **Same look:** it matches "Copy my question" in the 503 Alert.
> - **No indent and no negative margin:** A19 is unchanged, and D2's `-ml-4` (N6) isn't adopted.
>
> **Code change (Dev 3), nice-to-have:** `home/ask-form.tsx`, the `Sent` reference line.

### Foundation changes made by Developer 3, reviewed (Designer 3, 11 Nov)

> **Answer (Designer 3):** All three are accepted and written into v1.3.
> 1. **`TabsNoScript` `@layer base` wrapper** (`ui/tabs.tsx`): see F6.
> 2. **Slider value `shrink-0 whitespace-nowrap`** (`ui/slider.tsx`). The value span is now `num shrink-0 text-body-md font-semibold whitespace-nowrap text-foreground` in §4.14. A figure is never split ("+₹1,00,000" must not break after "+"), and the label wraps instead. Checked at 320: no overflow (F1).
> 3. **AskForm pre-hydration capture** (`home/ask-form.tsx`): see Q36.

### Coordination (Developer 2's C1–C3), resolved
- **C1:** `tools-tabs.tsx` now only replaces the hash on tab change. Load, hashchange and click handling are `HashHandler`'s. Tested together by real link clicks: `/#tax` and `/#what-if` on load, the FAQ's "Try the tax estimate" from no hash, from `#what-if` and from the same hash, a `#what-if` link from `#tax`, and the nav's "Calculators". Each selects the right tab and focuses the panel's `h3` (or `#numbers-title`), with no ring.
- **C2:** `tool-result.tsx` imports `Swatch` from `ui/allocation-bar`; A17 now hits only `allocation-bar.tsx`.
- **C3:** the `ask.tsx` header comment is reworded; A12 is clean.

## Developer 2, fix list round (FL-11 … FL-19), 11 Nov 2026

Raised against v1.4 while closing the Dev 2 items in `fix-list.md`. Each was built exactly as the fix list says; these are the measured results that don't match a number or check in the spec.

**F9. §6.2 gives the 1024 hero columns as 464 / 464; FL-14's classes give 456 / 456.**
- `lg:grid-cols-2` with the unchanged `lg:gap-x-16`: (976 − 64) / 2 = **456**. 464 would need a 48px gap. The old 5 / 7 value (532) also used the 64px gap.
- F8 holds: at 1024×768 the h1 is 3 lines and the CTA ends at 534.
- **Decide:** correct §6.2 to 456, or change the gap at 1024–1279 (that would be a second class, so a spec change).

> **Answer (Designer 3):** **The spec was wrong. §6.2 now reads 456 / 456** (v1.5), and the layout stays as built.
> - **Reason:** §3.3 sets one 64px gap for every two-part layout at ≥ 1024, and 464 was my arithmetic slip, not a design intent.
> - **Re-measured on the dev server (:3000):**
>   - at 1024: columns 456 / 456, the h1 on 3 lines, and every hero-panel row (dt and dd) on one line at a 456px panel;
>   - at 1279: 544 / 544;
>   - from 1280: 5 / 7 (453 / 635).
>
> No code change.

**F10. B30 can't pass for the money-path node "Your bank account" at 1440 with FL-17's `text-balance`.**
- The node is 119px wide, so about 95px of text room, and "Your bank account" is wider than that. Any two-line break of three words leaves one word on a line. Measured in Chrome at 1440 with `balance`, `pretty` and plain `wrap`, all three give "Your bank / account".
- `text-balance` did fix the other orphan: the 3-line end node now ends "account, in / your name" (it was "…in your / name"), and its height went from 70 to 66.
- At 360 and 390 every node is one line, so B30 passes there.
- **Options:**
  - (a) Accept it: two-word lines on a 2-line node are the floor.
  - (b) Widen `li` 1 (for example `flex-[1.25]`) so "Your bank account" fits on one line at 1440. That would shift every connector, so B17 needs a re-measure.
  - (c) Change the node copy.
- **Built:** as specified.

> **Answer (Designer 3):** **(a) Accept, and reword B30** (v1.5). The rule now targets real orphans: no one-word last line in a node or label of **four or more words**. A three-word node may break 2 + 1.
> - **Why not (b):** widening `li` 1 moves every connector and node at 1024 and 1440 (B17 and the label/line alignment re-measured), for one line in a box. At 1024 the node is 101px, so it would still wrap there.
> - **Why not (c):** "Your bank account" is the first half of the section's message and mirrors the end node's "Your bank account, in your name" (decision 58 G1, K11). The copy stays.
> - **Your other result is good:** `text-balance` took the end node to "account, in / your name" and 66px. B17's ≤ 72px still holds, and §4.11 now records 66.
>
> No code change.

**Q39. FL-18's "otherwise `behavior: \"auto\"`".**
- `scrollIntoView({ behavior: "auto" })` follows the scrolling box's CSS `scroll-behavior`, and `globals.css` sets `html { scroll-behavior: smooth }` under `no-preference`. So "auto" would still animate the long jumps G9 wants instant.
- **Built:** `behavior: "smooth"` within 2 × `innerHeight` (and not RM); `behavior: "instant"` otherwise. G9 passes: the CTA → `#ask` and "You can lose money" → `#numbers` land in one frame. Confirm.

> **Answer (Designer 3):** **Confirmed: `"instant"` is correct.** In CSSOM View, `"auto"` means "use the element's computed `scroll-behavior`", so it can't express "instant" while the page CSS says smooth. §5.3 and fix-list FL-18 now say `"instant"` (v1.5). Keep `"instant"` even after Q40 removes the CSS rule, because it doesn't depend on the stylesheet. No code change.

**Q40. Cold loads still animate (§3.5 "never animated: anything on load").**
- With a hash in the URL, Chrome smooth-scrolls to the fragment on load, because of the same `html { scroll-behavior: smooth }`. A cold `/#ask` at 390 animates about 9,000px before `HashHandler` (FL-19) settles it and moves focus.
- `HashHandler` now takes every in-page click itself (FL-18). The CSS rule only affects page loads, hashchange (a URL edited by hand) and anchor jumps with JS off.
- **Suggest (Dev 1, `globals.css`):** drop the `scroll-behavior: smooth` rule. JS-on clicks keep their short smooth scrolls from `HashHandler`, and loads and no-JS jumps become instant, which G9 already prefers for long jumps.
- **Decide:** confirm, or keep the rule and accept the animation on load.

> **Answer (Designer 3):** **Confirmed: drop the rule** (§2.1, v1.5). §3.5 says nothing animates on load, and a 9,000px animated scroll on a cold `/#ask` breaks that.
> - **What's left of smooth scrolling:** only `HashHandler`'s explicit `behavior: "smooth"`, for a click to a target within 2 viewport heights, never under RM.
> - **Nothing else animates:** `HashHandler` passes an explicit behaviour on every call (`behaviorFor`), so no JS click changes. Loads, `hashchange` and no-JS anchor jumps become instant, which G9 already wants for long jumps.
>
> **Code change: FL-36 (Dev 1, `globals.css`)**, plus a comment tidy in `hash-handler.tsx` (FL-35, Dev 2). Your `afterScrollSettles` wait can stay: it's harmless, and it still covers late layout.

**Two optional findings** from the `web-design-guidelines` review of my files (the spec doesn't ask for either, so neither was applied):
- `ui/mock-frame.tsx`: the brand name "Paraa" in the header strip could carry `translate="no"`, so page-translation tools leave it alone.
- `ui/money-path.tsx`: in forced colours the 1px connector lines (`bg-input` fills) drop out. The arrows and the bordered end nodes still carry the path. A `border-t` line instead of a fill would keep the lines; that's a spec change to §4.11.

> **Answer (Designer 3):** **Both are worth doing, as nice-to-haves.** Each is a one-line change with no visual effect in normal mode.
> 1. **`translate="no"` on the mock's "Paraa"** (§4.7, v1.5): it's the app's name shown as a UI label, which is exactly the case the guideline covers. Brand names in running copy stay translatable sentences; translators handle a proper noun there. **FL-38 (Dev 2).**
> 2. **Connector lines as borders** (§4.11, v1.5):
>    - vertical: `h-5 w-0 border-l border-input`;
>    - horizontal: `h-0 flex-1 border-t border-input`;
>    - replacing the `bg-input` fills. Borders are forced to `CanvasText`, so the path stays connected in contrast themes (H5 now lists the connector lines). The colour, 1px and the position are unchanged.
>
>    **FL-37 (Dev 2).** Re-check B17 and F12, which should be unchanged.

## Developer 1, fix list round: I1 and recorded changes (rulings, Designer 3, 11 Nov)

**I1. After FL-26 to FL-29 the build is 201.1 KB total and 30.4 KB ours, against 200 / 30** (`fix-list.md` FL-29 status).
- The largest parts left of our share are `tailwind-merge` (about 7 KB gz, through `cn()` in client components of all three developers) and `next/link`'s client code (about 3 KB; absent from the 404 baseline).

> **Answer (Designer 3):** **Swap `next/link` for plain `<a>` everywhere** (decision 68, v1.5). **Keep `tailwind-merge`. Keep the budget at 200 / 30.**
> - **`next/link` does nothing on this page.**
>   - Every internal link is an in-page anchor (`/#…`).
>   - Since FL-18, `HashHandler` takes every in-page click in the capture phase and calls `preventDefault()`. Its own comment says it exists to get ahead of next/link.
>   - With JS off, the browser follows the `<a>` natively, exactly as next/link's `<a>` does.
>   - There's no second route to soft-navigate to.
>
>   So the 3 KB buys nothing, and dropping it should bring the build to about 198 KB / 27 KB.
> - **The one non-anchor link, the logo, becomes `href="/#top"`.** `HashHandler` already handles `#top`: it scrolls to the top and focuses the h1 through the hero's `aria-labelledby`. A plain `<a href="/">` would reload the page from `/` and lose anything typed in the form, which next/link's soft navigation used to prevent.
> - **Why `tailwind-merge` stays:**
>   - `cn()` resolves real overrides that the caller depends on. The prompt buttons pass `justify-start text-left whitespace-normal` over the Button base's `justify-center whitespace-nowrap`. `className` overrides also run through `TextLink`, `DefinitionRow` and `Panel`.
>   - With plain `clsx`, both classes would ship, and the winner would be Tailwind's stylesheet order, not the caller's intent. That's the silent bug class `d3-system.md` S11 records.
>   - 7 KB is the cost of correctness here.
> - **Why the budget doesn't move:** the cut above meets it without a trade-off. **If the build still misses after FL-34, report the number and the remaining parts.** The budget then moves to that measured value, with the measurement as its reason. It doesn't move by dropping `tailwind-merge`.
>
> **Code changes:**
> - **FL-34 (Dev 1):** `ui/link.tsx`, `ui/button.tsx` (`ButtonLink`), `site/mobile-menu.tsx` and `site/brand.tsx`. These are the only files that import `next/link`.
> - **FL-35 (Dev 2):** the `hash-handler.tsx` comment, plus verifying that a logo click lands on the h1.

**Recorded changes from the Dev 1 round, accepted** (now written into the spec, v1.5):

> **Answer (Designer 3):**
> - **FL-26 (Tabs):** the panel's `starting:opacity-0` is armed only after the first tab change, because `@starting-style` also fired on page load (G2). The fade on a tab change is unchanged. §4.12 records this.
> - **FL-27 (Button):** the native `<button>` defaults to `type="button"`, as Base UI did; the submits pass `type="submit"`. §4.3 records this, because a plain `<button>` inside a form would otherwise submit.
> - **FL-10 (ChoiceChips):** the pre-hydration sync is a commit-time callback ref, not a hook, so an uncontrolled `ChoiceChips` stays usable from a Server Component. The Slider uses a mount `useLayoutEffect`. Both are accepted; §4.13 and §4.14 note it.
> - **FL-28 (logo):** `getImageProps()` runs once at module scope, with the header eager and the footer lazy (`<Brand loading="lazy" />`). Accepted.
