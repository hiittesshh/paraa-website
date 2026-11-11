# Institutional information architecture: TRM Labs and Chainalysis

**Researcher scope:** TRM Labs and Chainalysis. **Theme:** how two regulated-industry data companies explain complex, compliance-heavy services with authority, calm structure and proof you can check.
**Date visited:** 10 Nov 2026. **Method:** headless Chrome (playwright-core) with a normal desktop UA (Chrome 130, Windows) and an iPhone UA for mobile, at 1440×900 and 390×844. Scripts and the full screenshot sets are in the scratchpad under `research-institutional/` (`discover.mjs`, `measure.mjs`, `extra.mjs`, `chamenu.mjs`, `curate.mjs`; raw shots and `*-metrics.json` in `raw/`).
**Lens:** the `ui-ux-pro-max` skill (v2.15.0): `--design-system` for "fintech investment trust institutional light", the `landing`, `product`, `typography`, `color`, `style` and `ux` domains, and `references/quick-reference.md`. Guideline IDs are cited in square brackets, e.g. [`number-tabular`].

**Labels:** **[M]** measured by script (computed styles, DOM, counts). **[O]** observed in a screenshot or by interacting. **[I]** inferred: my interpretation, not verified.

**Blocked or limited:** nothing was blocked; every page returned 200. Two limits:
- Chainalysis's mega menu opens on **click**, not hover, so my hover probe found nothing; a click probe captured it.
- The Chainalysis Trust Center (`trust.chainalysis.com`) scrolls inside an app container, so the normal page height reads 900px. I scrolled the container to capture it.
- I did not submit either demo form.

**A note on the skill's defaults.** For "fintech investment" the skill's design-system generator returns **Dark Mode (OLED)** with green accents, and for "Fintech/Crypto" it suggests **Glassmorphism + Dark Mode**. Neither fits Paraa. The owner has chosen a light page, and a crypto look would work against us (content rule R14). The skill's closer matches are the **Trust & Authority + Conversion** landing pattern ("Navy/Grey corporate. Trust blue. Accent for CTA only"), the **Minimalism & Swiss** style, the **Accessible & Ethical** style, and the **Banking/Traditional Finance** palette (navy `#0F172A`, gold accent `#A16207`, background `#F8FAFC`). I use those below.

---

## 1. Pages visited

| Site | Page | URL | Height at 1440 [M] | Height at 390 [M] |
|---|---|---|---|---|
| TRM | Home | https://www.trmlabs.com/ | 6,418px | 8,753px |
| TRM | Product: Crypto Compliance | https://www.trmlabs.com/crypto-compliance | 9,006px | 15,840px |
| TRM | Audience/problem: Fraud & Scams | https://www.trmlabs.com/missions/fraud-and-scams | 10,382px | 13,201px |
| TRM | Trust: Compliance Center | https://www.trmlabs.com/compliance-center | 5,065px | 8,766px |
| TRM | About: Our Mission | https://www.trmlabs.com/our-mission | 4,259px | 5,274px |
| TRM | Resources hub | https://www.trmlabs.com/resources | 9,047px | not captured |
| TRM | Glossary | https://www.trmlabs.com/resources/glossary | 2,788px | not captured |
| TRM | Demo form | https://www.trmlabs.com/request-a-demo | 1,740px | 2,795px |
| Chainalysis | Home | https://www.chainalysis.com/ | 7,673px | 10,720px |
| Chainalysis | Product: KYT | https://www.chainalysis.com/product/kyt/ | 9,379px | 12,932px |
| Chainalysis | Audience: Financial Institutions | https://www.chainalysis.com/financial-institutions/ | 12,263px | 19,734px |
| Chainalysis | Methodology and proof: Why Chainalysis | https://www.chainalysis.com/why-chainalysis/ | 7,194px | 11,972px |
| Chainalysis | Trust Center | https://trust.chainalysis.com/ | app scroller, 2,433px content | n/a |
| Chainalysis | Scam prevention | https://www.chainalysis.com/scams/ | 3,565px | 5,739px |
| Chainalysis | About and leadership: Company | https://www.chainalysis.com/company/ | 5,786px | 9,984px |
| Chainalysis | Reports | https://www.chainalysis.com/reports/ | 2,883px | not captured |
| Chainalysis | Legal | https://www.chainalysis.com/legal/ | 2,484px | not captured |
| Chainalysis | Demo form | https://www.chainalysis.com/request-a-demo/ | 2,313px | 4,474px |

Footers and legal bars were read on every page.

---

## 2. Measured facts

### TRM Labs

| Property | Value | Label |
|---|---|---|
| Stack | Next.js (`#__next` present); no GSAP, Lenis or Webflow globals | M |
| Font families | **TRM Sans** (344 elements on home) and **TRM Sans Mono** (52), both custom | M |
| H1 (home) | 62px / weight **300** / line-height 62px (1.0) / tracking −2.48px (−0.04em), `#F7F5F4` on navy | M |
| H2 (home, all six) | 62px / 300 / −2.48px, ink `#30302F`. Final CTA heading 118px / 300 / −5.9px | M |
| H3 | 36px / 500 / line-height 1.0 / −1.44px | M |
| Labels | TRM Sans Mono, uppercase, 12px / 700 / +0.24px, or 14px / 500 / +0.28px | M |
| Body | 18px / weight **350** / line-height 22.5px (**1.25**), `#30302F` | M |
| Mobile type | H1 and H2 40px / 300; body 16px; side gutter 16px; header 60px | M |
| Colours | Ink `#30302F`; warm off-white `#F7F5F4`; white; navy `#00124D`; wine `#330011`; link and stat blue `#0063E4`; muted `#C0BEBB` and `#898681` for rules and captions | M |
| CSS gradients / box-shadows | 0 / 0 on home | M |
| Container | 1,376px content at 1440 (32px gutters); `max-width: 1440px` | M |
| Section padding | 80px top and bottom on 5 of 7 home sections; 48px on the closing band | M |
| Section count and surfaces (home) | 7: navy hero, white, off-white, white, off-white, white, wine CTA, then a `#30302F` footer | M |
| Buttons | 38–44px tall, **8px radius**, 2px border, Mono uppercase 12–14px, weight 500. Primary "Request a demo" is an outline button; filled ink buttons inside sections | M |
| Radii in use | 4px (37 elements), 8px (17), 10px (15) | M |
| Header | Two floating bars, 76px tall, on `rgba(247,245,244,0.8)`: left bar with logo and 5 menus, right bar with search, Log in, Request a demo. Stays visible on scroll | M/O |
| Mega menus | Solutions 13 links in 3 columns with 1 image card; Missions 13 links; Customer Stories 5 links with 4 images; Resources 12; Company 11. All 1,376px wide, open on hover | M |
| Motion | No CSS keyframe animations. 87 elements have transitions: colour 0.12–0.2s, transforms 0.15–0.3s. **No scroll reveals**: 0 of 66 probed headings and blocks changed opacity or transform on scroll | M |
| Hover | Outline button gains a 20% grey tint; filled ink button goes to black. Colour only, no movement | M |
| Hero media | One looping, autoplaying particle video with a visible **pause button**. With `prefers-reduced-motion: reduce` the video is **not rendered** and the hero is static | M |
| Stat numerals | 80px / 300 / `#0063E4`, `font-variant-numeric: normal` (no tabular figures) | M |
| FAQ | Custom accordion, 24 `aria-expanded` controls, no `<details>` | M |
| Template drift | Older pages use another type style: Compliance Center, Glossary, Resources and Crypto Compliance set H1 at 65px / **700**, and H2 at 36px / 700, with blue link headings | M |

### Chainalysis

| Property | Value | Label |
|---|---|---|
| Stack | WordPress 7.1.4 (meta generator), 5 Lottie players and 5 canvases on home | M |
| Font families | **Chainalysis** (custom display, 73 elements) and **Mulish** (691) for body and nav | M |
| H1 (home) | 46px / 700 / line-height 54px, navy `#293972` | M |
| H2 | 32px / 700 / 40px on home; 46–56px on inner pages | M |
| Inner-page H1 | A 14px / 700 uppercase eyebrow ("KYT (KNOW-YOUR-TRANSACTION)"); the visible headline is an H2 | M |
| Body | 17px / 400 / 24.6px (**1.44**), **navy `#293972`**: all running text is navy, not black | M |
| Mobile type | H1 28px / 700; body 17px; header 91px | M |
| Colours | Navy `#293972` (text and primary), deep navy `#122149` (dark bands), orange `#FF5300` (primary CTA, category labels), surfaces `#F4F6FA` and `#F7F7F7` | M |
| CSS gradients / box-shadows | 0 gradients on home; shadows are only inset 1px field shadows | M |
| Container | 1,288px content at 1440 (76px gutters); a 1,068px narrow column for text | M |
| Section padding | 120px on major bands, 60–80px on minor ones | M |
| Buttons | 52–54px tall, **64px radius (pills)**, 16–18px / 700, sentence case. Orange filled for the main CTA, navy outline for secondary | M |
| Radii in use | 12px cards (21), 64px pills (12), 12px top-only on image cards | M |
| Header | 91px, white, not sticky; nav Products, Industries, Services, Insights, Company; language switch; Login; navy pill "Request a demo" | M |
| Mega menus | Click to open. Products: 15 links in 4 columns, orange uppercase category labels over a 1px rule, name plus one-line description, no images | M/O |
| Site-wide alert | Navy banner, "Be alert for scammers impersonating Chainalysis, particularly those offering fund recovery and recruiting services. Learn more." Stays at the top while scrolling; about 53px tall at 1440 and **about 148px at 390** | O |
| Motion | No scroll reveals (0 of 96 probed blocks changed). Transitions `all 0.2s`/`0.3s`. Hero is an animated dot grid with orange nodes | M/O |
| Hover | Navy pill inverts to white with dark text; outline pill fills | M |
| Stat numerals | 46px / 700 navy, no tabular figures | M |
| Forms | Demo form: 13 fields, all with **visible labels above** the input, 50px tall, square corners | M/O |

---

## 3. Analysis

### 3.1 Information architecture and navigation

- **Two axes, named the way buyers think.** TRM splits by *problem* ("Missions": Fraud & Scams, Sanctions Enforcement, Tax & Revenue Enforcement, 12 in all) and by *audience* (home-page tabs: Law Enforcement, National Security, Financial Services, Enterprise Security, Regulators & Revenue Agencies). Chainalysis splits by *product* (Products) and *audience* (Industries, 10 pages). [M/O] Each menu entry has a name and a one-line purpose ("KYT: Monitor transactions in real-time"). [O] That second line does a lot of the explaining.
- **Mega menus as a site map.** Both are big (TRM up to 13 links per panel; Chainalysis 15) but calm: labels over hairlines, no icons in Chainalysis's, one image card in TRM's. See `shots/trm-04-mega-menu.jpg` and `shots/cha-03-mega-menu.jpg`. [O]
- **Product sub-navigation.** Chainalysis product pages add a second sticky bar ("Crypto Compliance: KYT · VASP Risking · Address Screening · Sentinel") with an orange underline on the current one. [O]
- **Footers are the full index.** TRM: 5 columns plus a legal bar with Privacy, Terms, Cookie preferences, Trust & Security, Status, Help Center and "*Survey methodology". Chainalysis: 4 columns, including "Security & Trust → Trust Center" and "Company → Scam Prevention". [M] Methodology, status and trust links sit next to Privacy and Terms, so the people who check things find them where they look. [I]
- **Question-led content.** TRM's Fraud & Scams page structures its "How it works" as questions: "Which reports need your team's attention first?", "Who else may still be paying into the scam?" (`shots/trm-05-problem-rows-sourced-stats.jpg` is the neighbouring block). Both sites end product pages with a question-list FAQ. [O]
- **Skill check:** the **Enterprise Gateway** pattern (mega menu, path selection by role) fits a multi-product B2B site. Paraa has one page and one product, so only the *labelling* habits transfer, not the menus [`nav-hierarchy`].

### 3.2 How authority is built

| Lever | TRM | Chainalysis |
|---|---|---|
| Certifications | Compliance Center cards: ISO 27001, ISO 27701, SOC 2 Type II, UK Cyber Essentials Plus, GDPR, System Status, Modern Slavery Act. Each card has the badge, a plain sentence saying what the standard *means*, and an action: "Request Download" or "See status". Body text says pen tests run yearly and executive summaries are "available upon request" (`shots/trm-06-compliance-centre-certs.jpg`). [O] | Separate Trust Center: tabs Overview, Resources, Controls, Subprocessors, FAQ, Updates. Lists SOC 2 Type II, FedRAMP Moderate Rev. 5, ISO 27001:2022 and Cyber Essentials; named documents ("Chainalysis 2026 SOC 2 Type 2 Report.pdf", "Bridge Letter"), with a lock on the gated ones; controls in groups; subprocessors with purpose and region ("Amazon Web Services · Cloud infrastructure · US and EU") (`shots/cha-05-trust-centre.jpg`). [O] |
| Dated updates | None observed | Trust Center "Updates": "Hexagate is now ISO27001 Certified! Published February 17, 2026", with the standard, the scope, the auditor (Standards Institution of Israel) and the validity ("through December 2028"). [M] This is a fully specified claim of the kind content rule R6 asks for. |
| Methodology | Stat cards carry a **source line**: "SOURCE: TRM LABS · 2026 CRYPTO CRIME REPORT →" under "500%"; a footer link to "*Survey methodology"; copy says "with the methodology documented at each step so your findings can be defended in court". [M/O] | "Independently validated in academic research and tested under the **Daubert standard** in U.S. federal court" (linked); "Academic study found … **~0.01%** false positive rate" with the figure linked to the study (`why-chainalysis`). [O] |
| People | Our Mission page: no leadership grid. Authority comes from a signed "Founder's letter" by the CEO and from customer case studies with named agencies (HSI, Royal Thai Police, Massachusetts AG). [O] | Company page: named **Leadership** grid with title, including Chief Legal and Administrative Officer, Chief Information Security Officer and Chief Financial Officer; an investor logo row; awards as a plain list of links (`shots/cha-07-leadership.jpg`). [O] |
| Scam and impersonation | Demo form has a "Report a Personal Scam/Theft" option. [M] | Site-wide alert banner plus a **Scam Prevention** page: official website, authorised email domains (`@chainalysis.com`, `@chainalysis-gov.com`), every social handle, the careers page, a "How to Recognize a Fake Communication" list, and `spoof@chainalysis.com` (`shots/cha-06-scam-prevention-page.jpg`). The Trust Center hero gives `security@chainalysis.com`. [O] |
| Customer proof | Case-study carousel with named agencies and outcomes. [O] | "Trusted by over 1,500 customers" logo marquee; stat row "9/10 · $34 billion · 50+ · 1500+" with **no source line on the home page** (`shots/cha-02-stat-row-and-cards.jpg`). [O] |

**Takeaway [I]:** the strongest authority on both sites isn't a badge. It's specificity: the auditor's name, the validity date, the region of a subprocessor, the official email domains, and a source under a number. Most of these cost nothing, and an honest small company can publish them too.

### 3.3 How dense information is kept calm

- **Hairline-and-label columns (TRM).** Each column: a 2px ink rule along the top, a Mono uppercase label ("INTELLIGENCE", "SPEED", "TRADECRAFT"), a 36px headline, then two lines of body (`shots/trm-03-labelled-hairline-columns.jpg`). No card, no icon, no background. [O] The rule plus the label says "a new item starts here" more quietly than a box does. [I]
- **Problem rows (TRM).** A three-column row between full-width hairlines: line icon | claim in 36px | one sentence of explanation (`shots/trm-05-problem-rows-sourced-stats.jpg`). [O]
- **Stat cards with three tiers (TRM).** An 80px number, then a Mono label ("AI SCAM GROWTH"), then a one-line caption, then "SOURCE: …". [M] The number never appears alone.
- **Vertical hairlines between stats (Chainalysis).** Four stats separated by 1px rules, number over a two-line caption. [O]
- **Date-column lists (Chainalysis).** News items: a small spaced-caps date column ("NOV 09, 2026") beside the headline, with a 1px rule between rows. [O]
- **Product UI as a cropped fragment (Chainalysis KYT).** One table shown with real column headings (Status, Severity, Exposure, Direction) and SEVERE / HIGH / MEDIUM / LOW chips, cropped to the part that proves the sentence beside it (`shots/cha-04-product-ui-table.jpg`). [O] Severity is shown by the word *and* the colour [`color-not-decorative-only`].
- **Neither site uses tables for content.** 0 `<table>` elements on all 18 pages. [M] Structure comes from grids and rules.
- **Neither site uses tabular figures.** `font-variant-numeric: normal` on every stat. [M] The skill's [`number-tabular`] rule asks for them on prices and data, so this is a gap we can do better on.

### 3.4 Typography, colour and spacing

- **TRM: type does the branding.** One custom family in two cuts (Sans and Mono). The display is *light* (300) at 62px with −0.04em tracking, and every H2 on the home page is the same size, so the hierarchy is flat and confident. [M] The Mono is used *only* for labels, buttons and sources, so it reads as a system: "Mono means metadata". [I] **But** body text at line-height 1.25 is below the skill's [`line-height`] 1.5–1.75, and paragraphs feel tight at 18px. [M/I]
- **Chainalysis: conventional and readable.** A bold display font for headings, Mulish 17px / 1.44 for body. All text is navy rather than black, which softens the page. [M] The orange is used for the primary CTA, the mega-menu category labels and emphasis in stats. [O]
- **Colour discipline.** TRM's light sections use ink, warm off-white and **one** blue (`#0063E4`) for links and stat numerals. Strong colour (navy, wine, deep green) appears only in full-bleed bands and in the generative artwork. [M/O] Chainalysis is navy plus one orange. [M] Both match the skill's Trust & Authority strategy, "Accent for CTA only", and the Minimalism rule "single primary only".
- **Surfaces alternate.** TRM alternates white and `#F7F5F4`; Chainalysis alternates white and `#F4F6FA`, with deep-navy bands for proof. [M] This is the same rhythm the audit already chose for Paraa (white / grey-50 / one ink band).
- **Spacing.** TRM: 80px section padding, 32px page gutters (very wide content, 1,376px). Chainalysis: 120px padding on major bands, 1,288px container. [M] Both are on an 8px grid [`spacing-scale`].

### 3.5 Data visuals and product UI

- **TRM recreates its product in HTML**, not as a screenshot: "Vendor exposure review" with Graph / Audit log / Reports tabs, a chat turn, "Worked through 6 steps", findings with an "Inference" tag, and an entity graph ("7 entities · 6 links") (`shots/trm-02-product-ui-panel.jpg`). [O] It's crisp at any size, the text is real text, and the scenario is specific and plausible. [I] It's the closest reference for the owner's "static hero with an example app panel".
- **Chainalysis shows UI inside device frames** (laptop, phone) on the home page and as cropped fragments on product pages. [O] The fragments read better than the framed versions. [I]
- **Report covers as data art (TRM).** The "2026 AI-in-Crime Adoption Index" card uses a lollipop chart as its cover. [O]
- **Generative art as brand.** TRM's particle clouds recur in the hero, mega menu, report covers and the closing CTA, with the colour changed per section. [O] Chainalysis's dot grid with orange nodes echoes its logo. [O]

### 3.6 Components, interactions and motion

- **Motion is almost absent.** Neither site reveals content on scroll (0 changes measured). Hover changes colour only, in 120–300ms. [M] The only large motion is TRM's hero video, which has a pause control and is **removed under reduced motion**. [M] This follows the skill's [`reduced-motion`], [`auto-rotation-controls`] and "Excessive Motion: animate 1–2 key elements per view".
- **Accordions** carry the FAQ and TRM's question list (with up/down arrows to step through). [O] TRM's has `aria-expanded` but isn't `<details>`. [M]
- **Tabs to select on mobile.** TRM's audience tabs become a full-width select ("LAW ENFORCEMENT ▾") at 390px (`shots/trm-08-mobile.jpg`). [O]
- **Carousels.** Both use arrow-button carousels for case studies and industries. [O] They hide content behind clicks.
- **Forms.**
  - TRM's demo form uses **placeholder text as the only label** ("First Name*") (`shots/trm-07-demo-form.jpg`). [O] That breaks the skill's high-severity "Input Labels: always show label above or beside input".
  - Chainalysis puts **visible labels above** every field. [O]
  - Both ask 11–13 required fields, including role level and organisation type. [M]

### 3.7 Mobile

- TRM keeps its system intact at 390: 16px gutters, 40px light headings, hairline columns stacked, the product panel scaled rather than replaced, and tabs turned into a select. [M/O] The floating header shrinks to logo + "Request a demo" + menu (60px). [M]
- Chainalysis centres hero text, stacks the two pill CTAs, and keeps the stat hairlines as vertical rules on the left. [O] The scam banner stays at the top and **takes about 148px of an 844px screen** (about 17%), on every scroll position (`shots/cha-08-mobile.jpg`). [O] The skill's [`fixed-element-offset`] and [`content-priority`] argue against that.
- No horizontal overflow on any page at 390. [M]

### 3.8 Why these feel designed rather than generated

1. **One idea, applied everywhere.** TRM's Mono-for-metadata, its particle art and its single blue run through every new-template page. Chainalysis's dot-network motif comes from its logo. [O/I]
2. **Specific content.** "Meridian Data Centers", "listed on a ransomware leak site 41 days ago", "Calgary Police Service", "Standards Institution of Israel", "valid through December 2028". Generated pages say "industry-leading security". [O/I]
3. **Restraint you can measure.** Zero CSS gradients and zero decorative shadows on both home pages; 4–10px radii on TRM. [M]
4. **Rules instead of boxes.** Hairlines and labels carry the structure, so the page isn't a grid of identical rounded cards (the audit's D2). [O]
5. **Visible seams of a real organisation.** TRM's older pages still use the previous type style (65px / 700). [M] Seams like this come from a site that grew over time, not from one prompt. That's an observation, not something to copy. [I]

### 3.9 What would not suit an Indian retail investor

- **The B2B funnel.** "Request a demo", business email, role level, organisation type, 11–13 required fields. A retail visitor asking a CA one question needs 3–4 fields. [O]
- **Unsourced headline stats and logo walls.** "1500+ customers", "$34 billion", "Trusted by over 1,500 customers". Paraa can't and shouldn't: R3, R6 and R11. [O]
- **Crime-fighting drama and blockchain imagery.** Particle clouds, node graphs and wallet addresses signal *crypto*. R14 bans crypto in Paraa's marketing, and a first-time visitor could take the basket for a crypto product. [I]
- **TRM's 300-weight display and 1.25 body leading.** Thin strokes at 40–62px are fragile on low-DPI Android screens, the country's most common device (audit F5). Tight leading hurts long reading [`line-height`]. [I]
- **Autoplay hero video.** About the heaviest asset on either site. It's the opposite of the audit's performance goal (F1, F5). [M/I]
- **Pill buttons** (Chainalysis 64px radius) conflict with Paraa's 8px token decision. [M]
- **Stock photography** on Chainalysis's Industries cards. R11 rules out stock photos. [O]
- **Gated documents** ("Request access", lock icons). An enterprise buyer accepts an NDA; a retail investor reads a lock as "they're hiding it". Paraa should link public documents directly. [I]
- **Carousels** for proof. They hide the very content a sceptic is looking for. [O] Skill [`auto-rotation-controls`].
- **A sticky alert banner on mobile.** The *message* is right; a permanent 148px bar is not [`content-priority`]. [O]

---

## 4. Comparison

| Dimension | TRM Labs | Chainalysis | Better reference for Paraa |
|---|---|---|---|
| Visual voice | Editorial, light display type, Mono metadata, generative art | Conventional SaaS, bold display, navy + orange, pills | TRM's structure, Chainalysis's readability |
| Dense content | Hairline columns, problem rows, three-tier stat cards with sources | Vertical-rule stat row, date-column lists, cropped UI tables | TRM |
| Proof of numbers | Source line under each stat; methodology link in the footer | Linked figures on "Why" page; unsourced on home | TRM |
| Security / trust page | On-site Compliance Center: cert cards with plain explanations and a download or status action | Dedicated Trust Center with documents, controls, subprocessors and dated updates | Chainalysis for completeness, TRM for plain language |
| Anti-impersonation | A "report a scam" form option | Banner + full Scam Prevention page with official channels | Chainalysis (content), not the sticky banner |
| People | CEO letter; named customers | Named leadership with legal, security and finance officers | Chainalysis |
| Product UI | HTML-built example panel with a specific scenario | Device-framed screenshots; cropped tables on product pages | TRM for the hero panel; Chainalysis's crop for inline fragments |
| Motion | Colour hovers; one pausable video, removed under reduced motion | Colour hovers; Lottie dot grid | Both: near-zero motion |
| Forms | Placeholder-only labels | Visible labels above fields | Chainalysis |
| Mobile | System intact, tabs → select, 16px gutters | Readable, but sticky banner eats 17% of the screen | TRM |
| Weak spots | Body leading 1.25; template drift; placeholder labels | Unsourced stats; stock photos; H1 used as an eyebrow [`heading-hierarchy`] | n/a |

---

## 5. Actionable recommendations for Paraa

Section numbers refer to the page order in `audit-2026-11-10.md` (1 Hero … 9 Footer).

| # | Adopt | Where on our page | Why | Skill guideline |
|---|---|---|---|---|
| 1 | **Hairline-and-label facts.** Each fact gets a 2px grey-900 rule along the top, a 12px uppercase label at weight 600 with +0.04em tracking, the fact at 20–24px, one line of body, and a grey-500 **source line** ("FIU-IND registration · reg. no. TO CONFIRM · checked 10 Nov 2026 ↗"). No cards. Ref: `shots/trm-03-labelled-hairline-columns.jpg`. | §2 Facts strip | It makes the strip feel institutional without boxes, and the source line is R3 and R6 made visible. | Minimalism & Swiss ("no unnecessary decorations", "clean borders"); [`visual-hierarchy`]; [`whitespace-balance`] |
| 2 | **No number without a caption and a source.** TRM's stat anatomy: number → label → one-line meaning → "Source: …". Set numbers in **tabular figures** (`font-variant-numeric: tabular-nums`), which neither reference site does. Ref: `shots/trm-05-problem-rows-sourced-stats.jpg`. | §3 Basket, §5 Tools results, any number on the page | R3/R4 already require a date and source. TRM shows how to make that line look like part of the design rather than small print. | [`number-tabular`]; ux "Number Formatting" |
| 3 | **Security band as a trust ledger, not adjectives.** In the ink band, list each protection or registration as a row: what it is, what it means for *you* in one sentence, and an action that checks it ("Verify on the regulator's site ↗", "Read the policy"). Ref: `shots/trm-06-compliance-centre-certs.jpg`, `shots/cha-05-trust-centre.jpg`. | §6 Security (ink) | Both sites show that *verifiable* beats *asserted*. Chainalysis's dated update (standard, scope, auditor, validity) is exactly R6's "entity, body, number, link". | Trust & Authority landing pattern ("Proof: certs"); [`color-accessible-pairs`] and [`color-dark-mode`] for the ink band |
| 4 | **"How to spot a fake Paraa" block**, from Chainalysis's Scam Prevention page: our only domain, the email domain we send from, the official app-store listings, our support number, a "we will never ask you for…" list (wording TO CONFIRM with compliance), and where to report. **Inline in the band, not a sticky banner.** Ref: `shots/cha-06-scam-prevention-page.jpg`. | §6 Security, second column; repeat the report link in §9 | Impersonation and fake-advisor scams are a real worry for Indian retail investors. A little-known brand is easy to copy, so naming the official channels is proof in itself. | Accessible & Ethical style; [`content-priority`] (inline, not fixed) |
| 5 | **Dated "What changed" list** in the Chainalysis news format: date column ("31 Oct 2026") + one line, with 1px rules. Use it for registration status, fee changes and policy updates once they exist. Until then, leave it out rather than fake it. | §9 Footer and legal, or under §6 | It tells a sceptic the company keeps its claims up to date, and follows R10's date format. | [`whitespace-balance`]; Minimalism "clean borders" |
| 6 | **Hero app panel built in HTML**, TRM-style: one realistic screen (basket value in ₹, the three sleeves, "Priced daily · as of [date]"), tabs for 2–3 screens with a 200ms crossfade, a visible `Illustrative` badge, **one** shadow because it sits above the page. Ref: `shots/trm-02-product-ui-panel.jpg`. | §1 Hero | It matches the owner's decision. HTML stays crisp, keeps text selectable and is far lighter than video or the old SVG scene (audit F5). Specific, plausible content is what separates designed from generated. | [`elevation-consistent`] (one shadow); [`reduced-motion`]; Charts [`animation-optional`] |
| 7 | **Question-led labels and accordions.** Use the visitor's question as the label ("Who holds my money?", "What happens if the rupee strengthens?"), with hairline rows, a + icon and native `<details>`. | §4 How it works, §7 FAQ | TRM's question list and both FAQs show that questions organise dense material calmly. Our page order already starts from the question each section answers. | ux "Progressive disclosure"; [`nav-hierarchy`] |
| 8 | **Named accountability row.** A Chainalysis-style "Who's responsible" list: grievance officer, compliance officer, the CAs who answer questions. Initials monograms and `Name TO CONFIRM` until real people sign off (R11). Ref: `shots/cha-07-leadership.jpg`. | §8 Ask a CA (the CAs), §9 Footer (officers) | Chainalysis names its legal, security and finance chiefs, and that reads as accountability. For a retail investor, a named grievance officer matters more than a CEO photo. | Trust & Authority ("Trust signals prominent") |
| 9 | **Form with visible labels**, 3–4 fields, and a one-line note *beside the phone field* saying what we do with the number. Ref: `shots/trm-07-demo-form.jpg` (what not to do: placeholder labels) vs. Chainalysis's labelled form. | §8 Ask a CA | It fixes audit T3 and avoids TRM's placeholder-only labels. | ux "Input Labels" and "Form Labels" (High); Forms & Feedback "Helper text", "Progressive disclosure" |
| 10 | **Colour: one accent, used on purpose.** Like TRM's single blue or Chainalysis's single orange, gold appears only where the audit lists it. Body text stays grey-600/900 on white, and the primary button is ink. | Global tokens | It confirms the audit's T5 decision with two external precedents. | Trust & Authority color strategy ("Accent for CTA only"); Minimalism ("single primary only"); [`color-semantic`] |
| 11 | **Motion budget of zero, almost.** Colour-only hover at 150ms, no scroll-triggered movement beyond the existing one-time reveal, and nothing that loops. If anything ever moves on its own, give it a pause control and a static reduced-motion state, as TRM does. | Global | Both institutional sites measured zero scroll reveals. Calm reads as competent. | [`reduced-motion`]; [`auto-rotation-controls`]; ux "Excessive Motion" |
| 12 | **Mobile: tabs → select or segmented control, 16px gutters, nothing fixed except the header.** TRM's tab-to-select is a good model for the two tools in §5. | §5 Tools on 390px; global | It keeps the tools usable at 390px without horizontal scrolling or crowded tabs. | [`horizontal-scroll`]; [`content-priority`]; [`fixed-element-offset`]; Touch "Min size 44×44px" |
| 13 | **Footer legal bar as an index of checkable things**: Privacy, Terms, Grievance redressal, Registrations, Methodology (how the basket is priced), Security. TRM puts "Trust & Security", "Status" and "Survey methodology" right there. | §9 Footer | Sceptics look in the footer first, and the methodology link answers "how do you get this price?" | Trust & Authority pattern; [`nav-hierarchy`] |
| 14 | **A label tier in the type scale.** Small uppercase labels play the role TRM's Mono does ("metadata lives here"), in Manrope 600 rather than a second family. Body line-height **1.5–1.6**, not TRM's 1.25. Headings stay at 600 as decided, not 300. | Global type tokens | It gives dense sections a third level of hierarchy without new colours or boxes. | [`weight-hierarchy`]; [`line-height`]; [`font-scale`]; [`letter-spacing`] (tracking on labels only) |

## 6. Do not adopt

| Don't adopt | Seen on | Reason |
|---|---|---|
| Light (300) display type with −0.04em tracking | TRM | Thin strokes break up on low-DPI Android. The audit already chose 600. [`weight-hierarchy`] |
| Body line-height 1.25 | TRM | Below the skill's 1.5–1.75 [`line-height`]. It hurts long reading of risk and fee copy. |
| Generative particle art, node graphs, dot grids | Both | They signal crypto, and R14 bans crypto in our marketing. They're also decoration with no meaning, the audit's T1 and D3 problem. |
| Autoplay looping hero video | TRM | Heaviest asset on either site. It contradicts the owner's static-hero decision and audit F1/F5. |
| Unsourced headline stats, "Trusted by 1,500+", logo walls | Chainalysis | Breaks R3, R6 and R11. Paraa has no such numbers, and inventing a proxy would be worse than leaving it out. |
| Mega menus and multi-axis navigation | Both | One page, about 5 anchors. The Enterprise Gateway pattern fits a multi-product B2B site, not us [`nav-hierarchy`]. |
| Pill buttons (64px radius) and orange CTA | Chainalysis | They conflict with our 8px tokens and with ink as the only primary colour. |
| Mono uppercase button labels ("REQUEST A DEMO") | TRM | Uppercase mono is harder to read for a broad audience, and our CTAs must state the next action plainly (R12). Keep uppercase for small labels only. |
| Placeholder-only form labels | TRM | High-severity accessibility failure in the skill ("Input Labels"). |
| 11–13 field B2B forms, "business email", role level | Both | Retail visitors with one question to a CA. Ask for the minimum. |
| Sticky full-width alert banner on mobile | Chainalysis | Takes about 17% of a 390×844 screen for the whole visit [`content-priority`], [`fixed-element-offset`]. Put the scam guidance in the security band. |
| Gated "Request access" documents with lock icons | Chainalysis | A retail investor reads a lock as "hidden". Link the public document, or say plainly that it isn't published yet. |
| Carousels for proof and case studies | Both | They hide content a sceptic wants to scan [`auto-rotation-controls`]. The audit already removed our carousel. |
| Stock photography | Chainalysis | R11. It's also the most generic-looking part of either site. |
| Using H1 as a 14px eyebrow and the headline as H2 | Chainalysis | Breaks [`heading-hierarchy`] and hurts screen-reader navigation. |
| Device-frame mock-ups (laptop, phone bezels) | Chainalysis | Frames add chrome and weight. A frameless HTML panel (TRM) or a cropped fragment says more with less, and avoids repeating the audit's three-mock-up problem (T8). |

---

## Screenshot index

TRM Labs: `shots/trm-01-home-hero.jpg`, `shots/trm-02-product-ui-panel.jpg`, `shots/trm-03-labelled-hairline-columns.jpg`, `shots/trm-04-mega-menu.jpg`, `shots/trm-05-problem-rows-sourced-stats.jpg`, `shots/trm-06-compliance-centre-certs.jpg`, `shots/trm-07-demo-form.jpg`, `shots/trm-08-mobile.jpg` (390px: product panel, hairline columns, tabs as a select).

Chainalysis: `shots/cha-01-home-hero-scam-banner.jpg`, `shots/cha-02-stat-row-and-cards.jpg`, `shots/cha-03-mega-menu.jpg`, `shots/cha-04-product-ui-table.jpg`, `shots/cha-05-trust-centre.jpg`, `shots/cha-06-scam-prevention-page.jpg`, `shots/cha-07-leadership.jpg`, `shots/cha-08-mobile.jpg` (390px: hero, stat rule, date-column news; note the banner height).

Extras (all pages at both sizes, the mega menus and contact sheets) are in the scratchpad: `research-institutional/raw/`.
