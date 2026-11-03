# Paraa Capital website: round 1 (content strategy + 4 prototypes)

> **The finished site is in [`site/`](site/)** (Next.js; see [site/README.md](site/README.md)).
> It's Concept A, rebuilt in the light design system with no basket NAV data. Everything below
> describes round 1: the research, the four static prototypes and the audit that led to it.

Open **[index.html](index.html)** in a browser. It links to all four concepts, and every concept
page has a switcher bar at the bottom (All · A · B · C · D). No install or build step is needed.

## What's here, in the order it was made

| File | Made by | What it is |
|---|---|---|
| [00-design-tokens.md](00-design-tokens.md) | Build lead | Colors, type scale and contrast rules extracted from the design file **before** any design work |
| [ASSUMPTIONS.md](ASSUMPTIONS.md) | Build lead | Every decision made on your behalf, and what changes if it's wrong |
| [01-research-brief.md](01-research-brief.md) | Research agent | 15 sites studied, Indian regulatory guardrails, page/section/interactive ideas, 12 novel ideas |
| [02-concepts.md](02-concepts.md) | Design agent | 4 copy-complete concept specs, a shared rulebook and a shared dummy dataset (check values corrected after the audit) |
| `concept-a/` … `concept-d/` | 4 developer agents (in parallel) | Homepage + one proof page each |
| [shared/](shared/) | Build lead, plus the motion stage | Tokens, base, components, motion, and the single-source disclosures used by all 4 |
| [03-audit.md](03-audit.md) | Audit agent | 56 findings, scorecard, compliance claims register, send-back list |
| (fix round) | 4 fix agents + build lead | Every Blocker/High/Medium item applied and re-verified |
| [COMPARISON.md](COMPARISON.md) | Build lead | Side-by-side comparison and **the recommendation** |

## Skills and tools used, and why
- **UI/UX Pro Max** (`ui-ux-pro-max`). Used for:
  - the accessibility rules: contrast, 44px targets, focus rings, skip links, reduced motion, content readable without JS;
  - the "Trust & Authority" landing pattern.
  Its suggested navy/blue palette and Atkinson font were **rejected** because your design file is binding.
- **Watermelon UI**: **not installed** in this environment, so not used (ASSUMPTIONS X4).
- **Sub-agents**, one per stage: research → design → 4× developer → audit → 4× fix. Each handed a written file to the next.
- **Web search and fetch**: competitor and regulatory research, with sources cited in the brief.
- **Headless Chrome via the DevTools protocol**: layout, overflow, tap-target, font and console checks at 375/768/1024/1440px.

## Final verification (after the fix round)
- **Browser run:** all 9 pages at 4 widths each. The result: no horizontal overflow, no console errors, Manrope everywhere, one `h1` per page.
- **Small controls:** the only ones left are radio buttons wrapped in larger labels and two links inside sentences. Both are acceptable under WCAG 2.5.8.
- **Calculators:** each concept's maths was run in Node against the spec's check values, and all match.
- **Not verified:** a real screen reader, real phones, and the share-card image download in B.

## Status
Prototype only. All numbers are dummy and labelled Illustrative, and every registration is
`TO CONFIRM`. Nothing is committed; this folder is outside the app repo.
