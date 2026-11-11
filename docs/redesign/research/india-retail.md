# Competitive research: Indian retail investing (Groww, Zerodha)

**Date visited:** 10 Nov 2026. **Theme:** clarity, simplicity and trust for Indian investors, and how SEBI and regulatory information is shown.
**Method:** headless Chrome 141 (playwright-core), desktop user agent at 1440×900 and an iPhone user agent at 390×844, locale en-IN. Both sites returned HTTP 200 on every page; nothing was blocked. Each page was scrolled one viewport at a time with a screenshot per step. Scripts read computed styles, polled `document.getAnimations()` during the scroll, and hover-tested buttons. Scripts and every raw shot are in the scratchpad (`research-india/capture.mjs`, `detail.mjs`, `raw/`). The curated shots are in [`shots/`](shots/).

**Labels used below:** **[M]** measured by script, **[O]** observed in screenshots, **[I]** inferred.

**Evaluation lens:** the `ui-ux-pro-max` skill (v2.15.0). Rule IDs such as `color-contrast` come from its `references/quick-reference.md`. The design-system query "fintech investment trust India" returned **Dark Mode (OLED)** with an "Enterprise Gateway" pattern. That conflicts with the owner's decision of a light page with one dark band, so we don't follow it. The product search for "banking finance trust" returned **Minimalism & Swiss Style + Accessible & Ethical**, landing pattern **Trust & Authority**, "accent for CTA only", and we use that profile. Typography search: "Financial Trust" (IBM Plex Sans). Paraa already uses Manrope, and neither competitor uses Plex, so we note it but don't recommend a switch. The search for "accordion faq disclosure" returned **0 results**, so FAQ points cite `progressive-disclosure` from the quick reference instead.

---

## 1. Pages visited

| Site | Page | URL | Height 1440 / 390 [M] |
|---|---|---|---|
| Groww | Home | https://groww.in | 13,902 / 10,937 px |
| Groww | US stocks (product) | https://groww.in/us-stocks | 9,600 / 6,067 |
| Groww | Mutual funds (product) | https://groww.in/mutual-funds | 12,289 / 8,671 |
| Groww | Pricing (Stocks tab, then US Stocks tab) | https://groww.in/pricing | 4,095 / 5,782 |
| Groww | About | https://groww.in/about-us | 5,042 / 5,701 |
| Groww | Trust & Safety | https://groww.in/trust-and-safety | 8,683 / 5,732 |
| Groww | Regulatory & Other Info | https://groww.in/regulatory-and-other-information | 5,196 / 6,541 |
| Groww | Information Security Practices | https://groww.in/p/security | 3,541 / 6,507 |
| Zerodha | Home | https://zerodha.com | 3,856 / 6,843 |
| Zerodha | Products | https://zerodha.com/products/ | 4,893 / 8,418 |
| Zerodha | Pricing (redirects to /charges/, then US Equity tab) | https://zerodha.com/pricing/ → /charges/ | 5,520 / 10,613 |
| Zerodha | About | https://zerodha.com/about/ | 3,378 / 7,471 |
| Zerodha | Philosophy | https://zerodha.com/about/philosophy/ | 5,386 / 10,448 |
| Zerodha | For investor's attention | https://zerodha.com/investor-attention/ | 2,614 / 6,196 |

Zerodha has no "safety" page under that name. Its investor-protection content sits in the footer, on "For investor's attention", on the Investor charter, and in the Philosophy page's permissions table. Groww's footer links SEBI SCORES, SMART ODR, the Investor Charter and the Bug Bounty.

---

## 2. Measured facts

### Groww

| Property | Desktop 1440 | Mobile 390 | Label |
|---|---|---|---|
| Fonts | **Soehne** for display; **GrowwSans** for everything else (223 of 247 text nodes) | same | M |
| h1 | 88px / 535 / line-height 1.1 / `#44475B` ("Groww your wealth") | 48px / 500 | M |
| h2 | 44px / 500 / lh 1.1 | 32px / 535 | M |
| Inner-page h2 | 64px / 400 (Trust, Mutual funds) | 36px | M |
| Body | 16px / 435; mutual-funds page 18px / 435 | **14px / 435** (22 of 25 sampled paragraphs) | M |
| Body colour | `#7C7E8C` (most common text colour, 123 nodes) | same | M |
| Heading colour | `#44475B` | same | M |
| Accent | green `#04B488` (6 nodes plus buttons); blue `#5669FF` and olive `#A1B55C` card fills; one gold-on-brown "Commodities" pill | same | M |
| Surfaces | white; `#F0F0F2` footer; near-black `#060809` for the F&O and "Stock trading" bands (6.7 M px² of area, so two dark bands on the home page) | same | M |
| Container | `max-width: 1280px` (8 elements) | 16px gutters | M |
| Header | 72px, `position: sticky`, `rgba(255,255,255,.96)`, turns dark over dark bands (200ms colour transition) | logo, "Install app" pill, search, burger | M |
| Nav | Stocks · F&O · Mutual Funds · More, plus a search field with a Ctrl+K hint and a "Login/Sign up" button | | M |
| Primary button | "Get started": 49px tall, radius 99px (pill), `#04B488` with white 18px/535 text, **rendered as a `<div>`** | 38px pill | M |
| Header button | 40px, radius 8px | 48px, radius 8px | M |
| Secondary buttons | 36–50px pills, `#F2F5F7` fill or a 1px `#E9E9EB` outline | | M |
| Card radius | 22–24px (39 elements), 16px on mobile (108 elements) | | M |
| Shadows | none on cards (`box-shadow` empty in the sample) | | M |
| Sections | no `<section>` elements; about 12 distinct bands on the home page | | M / O |
| Assets | 62 images, 17 SVGs, 3 videos, 1 canvas | 147 images | M |
| Hover | "Get started" darkens `#04B488` → `#04AD83`; computed `transition: all`, so the change is instant | n/a | M |
| Motion (home) | 31 distinct animations during the scroll: hero word blur-in (1.5s), hero image fade-up (0.7s), staggered card fade-up (0.5s each), **three infinite marquees** (SEBI awareness ticker 162s loop, footer ticker 90s, rotating channel carousel 30s), sticky scroll scenes that switch the page to dark (300ms) | 26, plus a 60s auto-scrolling testimonial strip | M |
| Footer disclaimer | 14px / lh 20px / `#44475B` on `#F0F0F2`, starting **13,476px** down a 13,896px page | | M |
| Contrast, body grey `#7C7E8C` on white | **4.0:1** (fails AA for 14–16px) | | M (computed) |
| Contrast, white on `#04B488` | **2.7:1** (fails AA on the main CTA) | | M (computed) |
| Mobile overflow | none on home; **pricing overflows** (`scrollWidth > clientWidth`) and clips the DP-charges cell | | M / O |

### Zerodha

| Property | Desktop 1440 | Mobile 390 | Label |
|---|---|---|---|
| Fonts | **Inter** only (93 of 93 text nodes) | same | M |
| h1 | 28px / 500 / lh 35px / `#424242` ("Invest in everything") | 24px / 500 | M |
| h2 | 24px / 500 | 20px / 500 | M |
| h3 | 20px / 500 | 20px | M |
| Lede | 20px / 400 / lh 36px | same | M |
| Body | 16px / 400 / **lh 28.8px (1.8)**, `#666666` | 16px | M |
| Colours | text `#424242`, `#666666`, `#9B9B9B`; one blue `#387ED1` for links and the CTA; an orange (not measured) used only on the pricing numerals [O] | same | M |
| Surfaces | white; `#FAFAFB` and `#F6FBFF` bands; `#FBFBFB` footer | same | M |
| Container | **1100px** `.container` | 20px gutters [O] | M |
| Header | 64px, `position: fixed`, white, shadow `2px 1px 2px #EEE` | 60px, logo and burger | M |
| Nav | Signup · About · Products · Pricing · Support · ☰ (the burger opens a mega-panel) | burger only | M |
| Primary button | "Sign up for free": 45px tall, **radius 3px**, `#387ED1`, white 19.2px/500 | same | M |
| Hover | button `#387ED1` → `#222222`, instant; nav links `#666` → `#387ED1` over 0.3s; text links blue → `#444` | n/a | M |
| Sections | 6 `<section>` elements; padding-bottom 60–120px, padding-top 0–40px | 30px top and bottom | M |
| Radii and shadows | 3px on buttons; no card shadows; product logos sit in light bordered tiles | | M / O |
| Motion | **0 animations** recorded during the full scroll (`getAnimations()` empty); only 0.3s colour transitions on links | 0 | M |
| Skip link | "Skip to main content" present | present | M |
| Footer | 947px tall, 609 words; the legal block is set at **10.4px / lh 18.7px, `#9B9B9B` on `#FBFBFB`** | 3,244px tall | M |
| Contrast, legal grey `#9B9B9B` on `#FBFBFB` | **2.7:1** (fails AA, and the text is under 12px) | | M (computed) |
| Contrast, body `#666` on white | 5.7:1 (passes) | | M (computed) |
| Contrast, white on `#387ED1` | 4.1:1 (just fails AA at 19.2px/500) | | M (computed) |
| Tables | 8 on /charges/; cells 14.4px, padding 12px 15px, `#666`, alternating row tints [O] | wraps within the viewport, no overflow | M |

---

## 3. Analysis

### 3.1 Trust and credibility

**Groww asserts trust with scale. Zerodha argues for it with conduct.**

- **Groww** opens with "India's #1 Investing Platform · Trusted by 2 Cr+ active investors" between laurel wreaths [O], then "Trusted by 130,834,586+ Indians" over a wall of named, photographed testimonials ([groww-01](shots/groww-01-home-hero.jpg)). The counter read 130,834,586 on the desktop load and 130,834,348 on the mobile load minutes later [M], so it's a live or recomputed number. **The figures disagree with each other across the site:** 2 Cr+ active (home), 130.8 M+ (home), 50 Million+ customers and a "4.5★ Rating" (About), and "more than 1.4 crore active customers" (footer "About Groww") [O]. Only one scale claim carries a source and date: "India's largest Stock Broker by active users on NSE as of June 30, 2025. Refer: NSE's Arbitration status", and it sits in the fine print at the bottom of a 13,900px page ([groww-07](shots/groww-07-footer-disclaimer.jpg)). For a known brand the inconsistency costs little. For Paraa it would be fatal, and our R3 and R6 rules already forbid it.
- **Groww's Trust & Safety page** puts an ISO 27001 seal over the heading "We are trusted & regulated by", followed by a grid of logos: NACH, NPCI, Bharat BillPay, SEBI, RBI, BSE, CDSL, NSDL and "NBFC" ([groww-05](shots/groww-05-trust-regulator-logos.jpg)). Payment rails and regulators are mixed together, **none of the logos link anywhere** [M: `link: null` on every regulator image], and the grid carries no registration numbers [O]. It looks authoritative, but nobody can verify it from there. The page's better content is practical: "Decline investment advice. We don't offer any investment advice, nor have we partnered with anyone for it", "View all devices", and multi-factor auth [O]. Those are the "we will never…" statements a fraud-wary Indian user actually needs.
- **Zerodha's "Trust with confidence"** block is four short claims, each with a heading and two or three lines ([zerodha-02](shots/zerodha-02-home-trust.jpg)): customer-first (with scale numbers: 1.8+ crore customers, ~₹9 lakh crore, 15% of retail volume), "No spam or gimmicks", the ecosystem, and "Do better with money", which links **Nudge** and **Kill Switch** to support articles. Trust comes from naming a behaviour and linking to proof of it. The Philosophy page goes further and publishes a **permissions table** for its apps: Storage, SMS, Camera and so on, with the reason for each ([zerodha-06](shots/zerodha-06-philosophy-permissions-table.jpg)). That's the strongest trust device either site has: a dull, specific, checkable table.
- **Real people.** Zerodha's About page shows named founders and team in black-and-white portraits with bios, one of which notes membership of SEBI's Secondary Market Advisory Committee ([zerodha-07](shots/zerodha-07-about-founder.jpg)). Groww's About page uses 2019-style flat illustrations of generic people and a dog [O]. Our R11 forbids invented people, so the lesson for Paraa is the *slot*: name the accountable humans when they sign off, and until then say "TO CONFIRM" rather than illustrate.

### 3.2 Regulatory disclosure placement

| | Groww | Zerodha |
|---|---|---|
| Registration numbers | Footer disclaimer: CIN, SEBI INZ000301838, IN-DP-417-2019, AMFI ARN-111686, registered address, grievance email [O] | Footer first paragraph: SEBI INZ000031633, IN-DP-431-2019, CIN, address, complaints@ and dp@ emails [O] |
| Product-specific entity | US stocks: "REGULATED BY IFSCA (GIFT CITY)" chip under the h1 (14px, uppercase, `#7C7E8C`, **not a link, no number**) [M]. The number ("Groww IFSC Private Limited · Broker Dealer reg no IFSC/BD/2022-23/0009 · GAP reg no IFSCA/GAP/BD/2026-27/013") appears **only on the Pricing → US Stocks tab** [M] | Charges → US Equity tab lists an "IFSCA Turnover Fee" row; no separate entity chip [M] |
| Complaint path | SCORES procedure in the footer; "Investor Charter and Grievance" link [O] | SCORES / SMART ODR procedure plus three links (ODR, Grievance mechanism PDF, Project Jagrook) plus "How to file a complaint?" and "Status of your complaints" in the Support column [O] |
| Investor-awareness copy | A **scrolling marquee** labelled "INVESTOR AWARENESS MESSAGES" above the footer (12px, 162s loop) [M]; the same messages repeat as static text in the disclaimer [O] | Static paragraphs: "Attention investors: 1) … 2) … 3) …", "As a business we don't give stock tips…" [O] |
| Third-party carve-outs | n/a on home | Explicit: insurance via Ditto (IRDAI licence no.) and FDs via Blostem "will not have access to SEBI SCORES/ODR" [O] |
| Typography | 14px `#44475B`, readable, but 13,476px down the page [M] | 10.4px `#9B9B9B`, contrast 2.7:1 [M] |
| Dated footnotes | "as of June 30, 2025" on the scale claim [O] | "*The FINRA Trading Activity Fee (TAF) is paused from 1st October to 31st December 2026" under the US table ([zerodha-05](shots/zerodha-05-charges-us-equity.jpg)) [O] |

**Takeaways**
- Both sites keep the legally required text **complete and in the footer**, with **every number spelled out** and the complaint route named. That's the Indian convention, and visitors who know where to look expect it. Neither site links a registration number to a regulator's public register, which is a gap Paraa can fill.
- Groww's **regulator chip next to the product headline** is the right idea: it answers "is this legal?" before the question forms. It fails our R6 because it has no number or link and the entity is never named on that page. Zerodha's **scoped carve-outs** ("these products are not covered by SCORES") are exactly the honesty our audience needs, because Paraa's basket mixes asset classes.
- Groww puts the awareness messages in a marquee: moving, partly cut off, no pause control. That fails the skill's `auto-rotation-controls`, and it turns mandated warnings into decoration ([groww-06](shots/groww-06-awareness-ticker-footer.jpg)).

### 3.3 Simplifying financial information

- **Fees as a big number plus an exact rule.** Zerodha: "₹0 · ₹20 · ₹0" as huge orange numerals, each with one sentence stating the rule, including "whichever is lower" ([zerodha-03](shots/zerodha-03-home-pricing-education.jpg)). Groww's pricing cards do the same: "₹0 / ₹0 / ₹20", "0.1% per executed order whichever is lower, minimum ₹5" ([groww-04](shots/groww-04-pricing-us-tab.jpg)). The headline number is never shown without its rule.
- **Then the full table, by product tab.** Both sites put every statutory line (STT, stamp duty, exchange, SEBI, GST, DP) in a table with BUY/SELL tags (Groww) or plain rows (Zerodha), and both have a **US equity tab** listing SEC, FINRA and IFSCA fees to six decimal places [M]. Zerodha follows with "Calculate your costs upfront" linking to a calculator [O].
- **Where they stop being honest about FX.** Groww's US tab says "Forex Conversion Charges: charged as per bank rates. Zero charges by Groww" [M], which says nothing about the actual rupee cost. Our R7 (fees in rupees on a real amount) goes further than either competitor, and that's a real differentiator.
- **Groww's US-stocks cards** turn three abstract benefits into small UI fragments: a holdings card ("US STOCKS HOLDINGS $10,000"), a fractional-quantity ruler (0.01 → "$1.61"), and a **payment timeline** ("Payment initiated · 22 Feb 12:32 PM → Payment authorization · May take up to 3 working days → Payment confirmation") ([groww-03](shots/groww-03-us-stocks-cards-timeline.jpg)). The timeline admits a delay in plain words, which is the single most trust-building element on the page.
- **FAQ answers carry the facts.** Groww's US FAQ (10 questions, single-open accordion [O], no `<details>` and no `aria-expanded` [M]) answers "Is it legal?" with "RBI allows… up to $250,000 per financial year under LRS", "Is my money safe?" with "held with regulated US broker-dealers… SIPC… up to $500,000", and gives the 24-month STCG/LTCG rule at 12.5% [M]. The question is 18px/535, the answer about 14px grey [M/O]. Good content, weak hierarchy.
- **Stale example data.** Groww's mutual-funds hero mock-up shows "16.32% 1Y return · NAV 36.33 · 5th Feb 2021" [O]: a product panel with numbers almost six years old. That's exactly the risk in Paraa's own "example app panel" decision.

### 3.4 Typography, grid, spacing, colour, hierarchy

- **Groww** is a modern consumer brand: an 88px Soehne display face at weight 535 (a custom intermediate weight), short punchy h2s at 44px, generous 1280px grid, centred stacks, big rounded cards (22–24px) and no shadows [M]. Hierarchy comes from size. Colour is mostly grey on white, with one green and some per-product card colours (blue, olive, black, gold for commodities). Two problems: body grey `#7C7E8C` is 4.0:1, and white on the brand green is 2.7:1 [M]. Both fail `color-contrast`, and the CTA fails on the most important button on the page.
- **Zerodha** is restrained to the point of looking like documentation: one family (Inter), headings at only 24–28px and weight 500, 1.8 line-height body, a 1100px container, 3px radii, one blue [M]. Hierarchy comes from **whitespace and position**, not size. The page is 3,856px tall, 4.3 screens, against Groww's 15.4 [M]. The weak spot is the legal text: 10.4px at 2.7:1 [M] fails `color-contrast` and `readable-font-size`.
- Both sites use **colour sparingly and semantically**: Zerodha's orange appears only on price numerals, and Groww's green only on actions and positive changes. That's the `color-semantic` discipline Paraa's audit (T5, gold everywhere) is trying to recover.

### 3.5 Components

| Component | Groww | Zerodha | For Paraa |
|---|---|---|---|
| Hero | Centred h1 + one pill CTA + isometric illustrated city ([groww-02](shots/groww-02-us-stocks-hero-ifsca.jpg)); live index ticker above h1 on US page | Static composite of real product screens above a modest h1 + lede + one CTA ([zerodha-01](shots/zerodha-01-home-hero.jpg)) | Zerodha's model matches the owner's "static hero with example app panel" |
| Fee display | Bordered cards + full table with BUY/SELL chips | Numeral trio + tabbed tables + calculator link | Numeral + rule + "on ₹1,00,000" worked example |
| Steps | "Easy start in just 4 steps": sticky left heading, phone screens stacked on the right [O] | none on home | Numbered steps on a rule (audit already plans) |
| FAQ | Hairline-separated accordion, chevron right, 74px rows [O] | Lives on support.zerodha.com | Keep native `<details>` (audit) |
| Tables | Bordered, dashed row dividers, 14px `#7C7E8C` cells, 16/24px padding [M] | Bordered, zebra rows, 14.4px `#666`, 12/15px padding [M] | Zerodha-style table for fees and the permissions-style "what we can / can't do" list |
| Forms | None on marketing pages; Google One Tap sheet on mobile load ([groww-08](shots/groww-08-mobile-hero-onetap.jpg)) | None; CTA goes to signup | Paraa's CA form should explain what happens to the data next to the field |
| CTAs | One primary per view, but "Get started", "Invest now", "Start now", "START INVESTING" and "Start exploring" all appear [O] | "Sign up for free" repeated twice per page, and that's all | One label, honest per R12 |

### 3.6 Interactions and motion

- **Groww** moves constantly: a blur-in on the hero word, fade-up images, staggered card entry, three infinite marquees, a 30s rotating carousel, sticky scenes that flip the page dark, an auto-scrolling testimonial strip on mobile, and a floating QR widget on inner pages [M/O]. It feels polished, but it also fails `excessive-motion` (more than 1–2 animated elements per view) and `auto-rotation-controls`. Hover feedback is a near-invisible darken with 0ms transition [M], which fails `state-transition`.
- **Zerodha** has zero scroll animation [M]. Only links fade colour over 0.3s, and the button snaps to near-black on hover [M]. It feels static but fast, and nothing distracts from reading.
- **For Paraa:** the audit's motion plan (one 12px reveal, 150ms colour changes, 200ms crossfade in the app panel, nothing looping) sits between the two and is right. Zerodha shows that a finance site loses nothing by not animating.

### 3.7 Mobile

- **Groww** (390): h1 drops to 48px and body to **14px** [M], below the skill's `readable-font-size` (16px). Product cards re-flow into a 2-up bento [O]. A **Google One Tap sign-in sheet covers the bottom 15% of the first screen** on load ([groww-08](shots/groww-08-mobile-hero-onetap.jpg)). The pricing table **overflows horizontally** and clips text ("Depository: ₹3.5 (male") [M/O], which fails `horizontal-scroll`.
- **Zerodha** (390): Inter at 16px holds, the h1 is 24px, and tables wrap inside the viewport without overflow [M]. But the footer becomes **3,244px of 10.4px grey text** ([zerodha-08](shots/zerodha-08-mobile-footer.jpg)) [M], which is unreadable as designed. (The burger menu couldn't be opened by the script, so its panel isn't assessed.)

### 3.8 Why these feel designed rather than AI-generated

- **Specific numbers with their rule attached.** "₹20 or 0.03% whichever is lower", "$0.000195 per share (max $9.79)", "paused from 1st October to 31st December 2026". Generated pages round everything and skip conditions.
- **Uneven, real content.** Groww's FAQ has 10 questions and Zerodha's footer has 609 words of statute. Real sites aren't symmetric 3×3 grids.
- **Named things.** Nudge and Kill Switch, Kite and Coin, Project Jagrook, SMART ODR, specific SEBI circular numbers (NSE/INSP/45191). A generated site says "advanced risk tools".
- **A point of view in the copy.** "No gimmicks, spam, 'gamification', or annoying push notifications" (Zerodha). "Decline investment advice… nor have we partnered with anyone for it" (Groww). Both are statements a company can be held to.
- **Restraint in components.** Zerodha uses 3px radii, one font and one blue. Groww has one custom display face, consistent 22–24px radii and no shadows. Neither stacks gradients, glows and glass. That's the same diagnosis as our audit's T1, D1 and D2.

### 3.9 What would NOT suit Paraa

- Groww's **scale-as-proof** (live counters, "#1", laurels, photo testimonials). Paraa has none of these, and R3, R6 and R11 forbid inventing them.
- Groww's **isometric illustrated city hero**. It's a well-made brand asset, but it's the same "illustration says nothing about the product" problem as our audit's T1, and the owner has chosen an app panel.
- Groww's **marquees and auto-scrolling strips**, and the dark scroll-flip. They contradict the "nothing looping" motion plan and fail `auto-rotation-controls`.
- Groww's **unlinked regulator-logo wall**. It conflates payment rails with regulators, and it's unverifiable.
- Zerodha's **10.4px grey legal block**. It's compliant, but it reads as hiding the facts, and Paraa needs the opposite.
- Zerodha's **ecosystem orbit diagram**. It relies on an established family of brands that Paraa doesn't have.
- Either site's **footer SEO link farms** (Groww's A–Z stock index, Zerodha's 32-link mega-footer). Paraa is a one-page site.
- **Google One Tap or any sign-in prompt on first load.** That's the same trust problem as our audit's T3 (asking before earning).

---

## 4. Groww vs Zerodha

| Dimension | Groww | Zerodha | Closer to what Paraa needs |
|---|---|---|---|
| Trust strategy | Scale, testimonials, seals | Conduct, philosophy, named people, checkable tables | **Zerodha** |
| Regulatory placement | Product-level chip (no number) + complete footer | Complete footer + scoped carve-outs + dated footnotes | **Both**: Groww's placement, Zerodha's precision |
| Fee clarity | Cards + tables, but FX "as per bank rates" | Numerals + tables + calculator link | **Zerodha**, plus our R7 rupee example |
| Visual system | Bold display type, big radii, colourful cards | Small type, one font, one colour | **Between them**: Groww's confidence in the hero, Zerodha's restraint everywhere else |
| Motion | Heavy, looping | None | **Zerodha**, with the audit's minimal reveal |
| Page length | 15.4 screens | 4.3 screens | **Zerodha**. The audit's 9 sections should land around 6–8 screens |
| Accessibility | CTA 2.7:1, body 4.0:1, 14px mobile body, CTA is a `<div>` | Legal 2.7:1 at 10.4px; CTA 4.1:1; has skip link | Neither. Paraa's ink CTA (14.3:1) already beats both |
| Mobile | Sign-in sheet, overflowing table | Clean, but an endless footer | Zerodha's body, with a better footer |

---

## 5. Actionable recommendations for Paraa

Section numbers follow the audit's page order (§1 Hero … §9 Footer).

| # | Adopt | Why (evidence) | Where on our page | Skill guideline |
|---|---|---|---|---|
| A1 | **A regulator line under the hero headline, with substance.** One line at caption size naming the entity, the body, the number and a link, e.g. "Paraa Capital [entity] TO CONFIRM · registered with [body] TO CONFIRM, no. [x]". Until confirmed, render `<ToConfirm/>`, never a bare badge. | Groww's "Regulated by IFSCA (GIFT City)" chip answers "is this legal?" in the first view ([groww-02](shots/groww-02-us-stocks-hero-ifsca.jpg)) but has no number or link [M], which fails our R6. | §1 Hero, below h1 + lede | `visual-hierarchy`, `content-priority`; Trust & Authority pattern ("trust signals prominent") |
| A2 | **Make every registration number a link to the regulator's public register** (SEBI intermediary search, RBI, FIU-IND), in both the facts strip and the footer. | Neither competitor links its numbers [O]. It's the cheapest credibility a small company can add, and it's checkable rather than asserted. | §2 Facts strip; §9 Footer | `color-not-only` (link styling plus text); R6 |
| A3 | **"What we will never do" as a short plain list in the dark security band**: never give tips, never call for your OTP or PIN, never ask you to pay into a personal account, plus the official channels. | Groww's best Trust-page content is "Decline investment advice… nor have we partnered with anyone for it" ([groww-05](shots/groww-05-trust-regulator-logos.jpg) area); Zerodha's footer says "As a business we don't give stock tips, and have not authorized anyone…" [O]. Both are concrete and fraud-aware. | §6 Security (ink band) | `whitespace-balance`; Swiss/minimal style ("essential elements only") |
| A4 | **A checkable "what the app can access" table**, Zerodha-style: permission, why, optional/required. | Zerodha's permissions table is the most convincing trust artefact on either site ([zerodha-06](shots/zerodha-06-philosophy-permissions-table.jpg)). It's specific and dull, so nobody can mistake it for marketing. | §6 Security band, or behind a "See every permission" `<details>` there | `progressive-disclosure`, `number-tabular` (for any figures) |
| A5 | **Fees: big numeral + exact rule + rupee example, then the full table.** e.g. "1.5% a year · charged monthly · on ₹1,00,000 for 12 months that's ₹X (`Illustrative`)", then a hairline table with every line, **including FX in and out in rupees**. | Both sites pair the headline number with its rule ([zerodha-03](shots/zerodha-03-home-pricing-education.jpg), [groww-04](shots/groww-04-pricing-us-tab.jpg)). Groww's FX line ("as per bank rates") is the gap Paraa can beat [M]. | §3 Basket or §5 Run the numbers (fees tab) | `number-tabular`, `font-scale`; R7 |
| A6 | **Dated footnotes under any number that can change**, in the same component. | Zerodha's "*FINRA TAF paused from 1 Oct to 31 Dec 2026" sits directly under the US table ([zerodha-05](shots/zerodha-05-charges-us-equity.jpg)). Groww's only dated claim is buried 13,476px down [M]. | Every stat in §2, §3, §5 | R3; `visual-hierarchy` (same component, caption size) |
| A7 | **A money-movement timeline that admits delays** ("Rupees leave your bank → converted under LRS → units bought · may take up to N working days TO CONFIRM"), as one screen of the example app panel or the "How it works" rule. | Groww's payment timeline ("May take up to 3 working days") is the most honest element on its US page ([groww-03](shots/groww-03-us-stocks-cards-timeline.jpg)). | §1 Hero app panel (one screen) and §4 How it works | `multi-step-progress`, `motion-meaning` |
| A8 | **Hero = static product panel, modest headline.** Keep the h1 at the audit's 48px cap with weight 600; let the panel carry the visual weight. Stamp the panel's figures `Illustrative` with an "as of" date. | Zerodha's hero is a static composite of real screens with a 28px h1 ([zerodha-01](shots/zerodha-01-home-hero.jpg)). Groww's mutual-funds panel shows 2021 data six years on [O], so date the panel or it goes stale. | §1 Hero | `primary-action` (one CTA), `content-priority`; R3 |
| A9 | **FAQ answers that cite the rule.** Answer "Is it legal?" with the LRS limit and source, "Is my money safe?" with who holds it (TO CONFIRM) and what protection applies, and tax with the holding-period rule, each with a date. Set answers at body size (16px, grey-600), not smaller than the question by more than one step. | Groww's US FAQ answers are factual (LRS $250,000, SIPC $500,000, 24-month rule) [M], but answers are about 14px light grey under 18px questions [O]. | §7 FAQ | `progressive-disclosure`; `readable-font-size`; R9 |
| A10 | **Scoped carve-outs in plain words.** Where something isn't covered by a protection, say so beside it, e.g. "Complaints about [x] go to [y], not SEBI SCORES". | Zerodha states which products lack SCORES/ODR access [O]. Paraa's basket crosses asset classes and borders, so the visitor needs to know which regulator covers what. | §6 Security band ("Where to complain") and §9 Footer | R6, R15 (rendered as `<Disclosure/>`) |
| A11 | **A complete, readable legal footer.** Every number, the address, the grievance officer, the complaint ladder (company → regulator portal), set at **14px minimum, grey-600 on white (≥ 4.5:1)**, in two columns with hairlines, not one grey wall. | Both footers are complete but unreadable in different ways: Zerodha 10.4px at 2.7:1, Groww 14px but 13,476px down the page [M]. A short page (A12) solves Groww's problem; type tokens solve Zerodha's. | §9 Footer | `color-contrast`, `readable-font-size`, `line-length` |
| A12 | **Keep the page short: about 6–8 desktop screens.** | Zerodha's 4.3 screens read as confident; Groww's 15.4 screens bury the regulation [M]. The audit's 9 sections with no pinned scenes should fit. | Whole page | `content-priority`, `whitespace-balance` |
| A13 | **One body colour that passes, one CTA colour that passes.** Body grey-600 on white and the ink CTA (14.3:1) as planned. Never put white text on the gold. | Both competitors' primary CTAs fail AA (Groww 2.7:1, Zerodha 4.1:1), and Groww's body grey is 4.0:1 [M]. | Tokens (global) | `color-contrast`, `color-accessible-pairs`, `color-semantic` |
| A14 | **Hover and focus that actually show**: 150ms background/colour change plus a visible focus ring on every link and button, and a real `<button>`/`<a>` element for the CTA. | Groww's CTA is a `<div>` whose hover darkens by 3% instantly; Zerodha's button snaps to black [M]. | All interactive elements | `state-transition`, `focus-states`, `keyboard-nav` |

### Do not adopt

| Pattern | Seen on | Reason |
|---|---|---|
| Live user counters, "#1" claims, laurel wreaths, photo testimonials | Groww home ([groww-01](shots/groww-01-home-hero.jpg) area, 130.8 M counter) | We have no such facts; R3, R6 and R11 forbid them. Groww's own numbers contradict each other across pages [O], which shows how fast this erodes trust. |
| Unlinked "trusted & regulated by" logo wall mixing NPCI/NACH with SEBI/RBI | Groww Trust & Safety ([groww-05](shots/groww-05-trust-regulator-logos.jpg)) | Implies regulation it doesn't evidence; fails R6; nothing is linked [M]. |
| Seal artwork (ISO 27001 roundel) as a section hero | Groww Trust & Safety | A badge without certificate number, scope and certifier is exactly what R6 bans. |
| Marquee tickers for mandated warnings; auto-scrolling testimonial strips | Groww home ([groww-06](shots/groww-06-awareness-ticker-footer.jpg)) | Fails `auto-rotation-controls`; makes warnings unreadable; contradicts "nothing looping". |
| Sticky scroll scenes that flip the page dark | Groww home | Re-introduces the pinned-scroll problem from audit T2; the owner wants one deliberate dark band, not a scroll effect. |
| Isometric illustrated city hero | Groww home and US stocks ([groww-02](shots/groww-02-us-stocks-hero-ifsca.jpg)) | Same as audit T1: decorative, says nothing about our product; the owner chose an app panel. |
| Sign-in prompt (Google One Tap) or any login sheet on first load | Groww mobile ([groww-08](shots/groww-08-mobile-hero-onetap.jpg)) | Asks before earning trust (audit T3); covers the hero on a 390px screen. |
| 10.4px grey legal text | Zerodha footer ([zerodha-04](shots/zerodha-04-footer-disclosures.jpg), [zerodha-08](shots/zerodha-08-mobile-footer.jpg)) | Fails `color-contrast` (2.7:1) and `readable-font-size`; reads as hiding the facts. |
| 88px display headings and pill CTAs everywhere | Groww | Over the audit's 48px cap; pills were removed in audit D2; 88px is brand swagger an unknown company can't carry. |
| Zero-fee headlines ("Zero Hidden Charges", "₹0") as the lead | Groww pricing, Zerodha charges | R7 bans a "zero fee" headline; we show the rupee cost on a real amount. |
| Multiple CTA wordings ("Get started", "Invest now", "Start now", "START INVESTING") | Groww | Fails `primary-action` consistency; R12 wants one honest label per action. |
| Ecosystem orbit or partner-logo constellations | Zerodha home ([zerodha-02](shots/zerodha-02-home-trust.jpg)) | Depends on an established brand family Paraa doesn't have; becomes logo-wall filler. |
| The skill's own "Dark Mode (OLED)" design-system output | `ui-ux-pro-max` `--design-system` | Conflicts with the owner's light-page decision; only the single security band is dark. |

---

## 6. Shots index

| File | What it shows |
|---|---|
| [groww-01-home-hero.jpg](shots/groww-01-home-hero.jpg) | 88px h1, single pill CTA, isometric illustration, sticky 72px header |
| [groww-02-us-stocks-hero-ifsca.jpg](shots/groww-02-us-stocks-hero-ifsca.jpg) | US-stocks hero: live index ticker, "Regulated by IFSCA (GIFT City)" chip under the h1 |
| [groww-03-us-stocks-cards-timeline.jpg](shots/groww-03-us-stocks-cards-timeline.jpg) | Benefit cards as UI fragments; payment timeline "may take up to 3 working days" |
| [groww-04-pricing-us-tab.jpg](shots/groww-04-pricing-us-tab.jpg) | Pricing → US Stocks: numeral cards with rules, SEC/FINRA table |
| [groww-05-trust-regulator-logos.jpg](shots/groww-05-trust-regulator-logos.jpg) | ISO seal and unlinked "trusted & regulated by" logo grid |
| [groww-06-awareness-ticker-footer.jpg](shots/groww-06-awareness-ticker-footer.jpg) | "Investor awareness messages" marquee above the footer |
| [groww-07-footer-disclaimer.jpg](shots/groww-07-footer-disclaimer.jpg) | Full SEBI/CDSL/AMFI disclaimer, SCORES procedure, dated NSE claim |
| [groww-08-mobile-hero-onetap.jpg](shots/groww-08-mobile-hero-onetap.jpg) | 390px hero with the Google One Tap sheet over it |
| [zerodha-01-home-hero.jpg](shots/zerodha-01-home-hero.jpg) | Static product-screen composite, 28px h1, one 3px-radius CTA |
| [zerodha-02-home-trust.jpg](shots/zerodha-02-home-trust.jpg) | "Trust with confidence": four claims, linked Nudge/Kill Switch |
| [zerodha-03-home-pricing-education.jpg](shots/zerodha-03-home-pricing-education.jpg) | ₹0/₹0/₹20 numerals with rules; Varsity education block |
| [zerodha-04-footer-disclosures.jpg](shots/zerodha-04-footer-disclosures.jpg) | Footer: registration numbers, SCORES/ODR, carve-outs, 10.4px grey |
| [zerodha-05-charges-us-equity.jpg](shots/zerodha-05-charges-us-equity.jpg) | Charges → US Equity tab with dated FINRA footnote |
| [zerodha-06-philosophy-permissions-table.jpg](shots/zerodha-06-philosophy-permissions-table.jpg) | App permissions table: permission, Kite, Coin, reason |
| [zerodha-07-about-founder.jpg](shots/zerodha-07-about-founder.jpg) | Named founder with bio and SEBI committee membership |
| [zerodha-08-mobile-footer.jpg](shots/zerodha-08-mobile-footer.jpg) | 390px: the 3,244px legal footer |

**Not assessed:** Zerodha's mobile burger panel (the script couldn't open it). Groww's authenticated app flows. Any page behind login.
