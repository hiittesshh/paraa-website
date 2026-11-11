# Direct competitors: how Vested and INDmoney sell US investing to Indian residents

**Researched:** 10 Nov 2026, using headless Chrome (playwright-core with a desktop Chrome 130 user agent, locale en-IN) at 1440×900 and 390×844. Neither site blocked the crawler and every page returned HTTP 200.
**Scope:** how each site answers four questions: *is my money safe, who holds it, what does it cost, how is it taxed*. Also where each puts its disclosures, its trust signals, and its visual system. The aim is to find what Paraa's homepage should take and what it should leave alone.
**Evidence labels:** **[M]** measured by script (computed styles, DOM counts, page text), **[O]** observed in screenshots or page text, **[I]** inferred.
**Lens:** the `ui-ux-pro-max` skill (v2.15.0). Guideline IDs in `code` come from its quick reference (§1–10) and its `landing`, `style`, `color` and `typography` data. One caveat: its `--design-system` output for "fintech investment trust" returned *Dark Mode (OLED)* with *"Light mode default"* listed as an anti-pattern. That contradicts the owner's decision on a light page. The guidance below is built from its domain searches and the per-rule guidelines instead (*Trust & Authority + Conversion* landing pattern, *Accessible & Ethical* style, *Banking/Traditional Finance* palette).

Screenshots: `shots/vested-0n-*.jpg` and `shots/indmoney-0n-*.jpg` (8 each). Raw captures, full-page JPEGs, text dumps and measurement JSON are in the scratchpad `research-competitors/raw/` and `research-competitors/cand/` folders and aren't committed.

---

## 1. Pages visited (10 Nov 2026)

| Site | Page | URL | Captured |
|---|---|---|---|
| Vested | India home (the resident-facing home; the root `/` is now aimed at NRIs) | https://vestedfinance.com/in/ | D + M |
| Vested | Global/NRI home (for comparison only) | https://vestedfinance.com/ | D |
| Vested | US stocks (also covers how it works, tax and custody in its FAQ) | https://vestedfinance.com/in/us-stocks/ | D + M |
| Vested | Pricing (India) | https://vestedfinance.com/in/pricing/ | D + M |
| Vested | About ("Our Story") | https://vestedfinance.com/our-story/ | D + M |
| Vested | Legal index | https://vestedfinance.com/legal/ | D |
| Vested | Help centre / FAQ (Zoho Desk) | https://support.vestedfinance.com/portal/en/home | D |
| Vested | Sign-up | https://app.vestedfinance.com/signup | D + M |
| INDmoney | Home | https://www.indmoney.com/ | D + M |
| INDmoney | US stocks (hero, steps, fees, tax, "legal and safe", FAQ) | https://www.indmoney.com/us-stocks | D + M |
| INDmoney | GIFT City route (custody explainer) | https://www.indmoney.com/us-stocks/investing-in-us-stocks-via-gift-city | D + M |
| INDmoney | Pricing, US stocks tab | https://www.indmoney.com/pricing?type=us-stocks | D + M |
| INDmoney | Tax guide | https://www.indmoney.com/learn/us-stocks/tax-on-us-stocks | D |
| INDmoney | How to invest (4 routes) | https://www.indmoney.com/learn/us-stocks/how-to-invest-in-us-stocks-from-india | D |
| INDmoney | About | https://www.indmoney.com/about | D + M |
| INDmoney | Legal & Regulatory (policy centre) | https://www.indmoney.com/page/policy-center | D |
| INDmoney | Sign-up / login | https://www.indmoney.com/login | D + M |

Neither site has a standalone "Is it safe?" page. Vested answers it in a homepage section and the first FAQ item. INDmoney answers it in a section on the US-stocks page and on the GIFT City page.

---

## 2. Measured facts

### 2.1 Vested (`/in/` home unless noted)

| Property | Value | |
|---|---|---|
| Stack | WordPress, GSAP 3.13.0 with ScrollTrigger, Swiper | M |
| Fonts | **Sentient** (serif display, weights 400/500/700) for h1–h3; **Inter** (300–700) for everything else. Inter is about 95% of text nodes (564 vs 29) | M |
| h1 | 80px / 83px, **weight 300**, letter-spacing **−4px**, navy `#002852`. Mobile: 36/40px, −2px | M |
| h2 | 36px / 42px, w400, −1px, Sentient (US-stocks page: 30/42 w500). Mobile: 24–28px | M |
| Stat figures (h3) | 40px Sentient w300, −2px, `#F3F4F6` on a navy band | M |
| Body | 16px / 24px Inter w400 (also 14/20 and 16/22.9 in cards). Hero lede 16/26.4 in `#334155`. Mobile: mostly 14/20, and 14 elements at **10px** | M |
| Text colours | `#262626`, slate `#334155`, grey `#737373` (4.72:1 on the cream background), navy `#002852` (14.7:1) | M |
| Surfaces | Cream `#FEFFFA` page, white cards, light blue `#EFF6FF` / `#EEF5FC` bands, one navy `#002852` stats band | M |
| Primary action | Blue `#1547EB`, white text (6.7:1), **radius 8px** (5px on the US-stocks page), 52px tall in the hero (46px in the nav, **42px on mobile**), 18px w600, `transition: 0.3s` | M |
| Container | 1032px most common (1100px for card rows) | M |
| Section padding | Home: uneven, from 31 to 124px top and 0 to 100px bottom. US-stocks page: a consistent 72/72px | M |
| Radii | 8px dominant (43 elements), 100px pills for collection chips, 30px on pricing cards | M |
| Shadow | One soft three-layer card shadow, repeated 12 times | M |
| Nav | 75px, **not sticky** (`position: relative`, and it's gone from scrolled screenshots). Items: Invest ▾ · Learn ▾ · Pricing · More ▾ · Partner With Us `New` · Log in · Sign up | M/O |
| Sections | 12 `<section>`, 11 h2. Page height **11,749px** desktop and 13,939px mobile. US-stocks page: 13,995px and 18,495px | M |
| Motion | **29 ScrollTriggers** on home and **61** on US stocks. Fade-up reveals: elements below the fold sit at opacity ≈0.70 and translateY ≈18px before they enter. 2 `prefers-reduced-motion` rules. A Swiper testimonial carousel with arrow buttons. Primary CTA hover: no change in computed bg, colour, transform or shadow after 600ms | M |
| Horizontal overflow | None at 390px | M |

### 2.2 INDmoney (`/us-stocks` unless noted)

| Property | Value | |
|---|---|---|
| Stack | Next.js (Tailwind-style utilities), no animation library | M |
| Fonts | **Inter only**, weights 400 and 700 loaded | M |
| h1 | 54px / 64px, **w700**, ink `#121313`. Mobile: 29.75/35px | M |
| h2 | **Four different sizes** on one page: 24/32, 40/48, 48/60 and 54/64, at w500–600 | M |
| Body | 16/24 and 18/32 w400. Mobile: **14px** (the root scales by 0.875), with captions at **11.375px** | M |
| Text colours | Ink `#121313`, `#393B3E`, grey `#757779` (4.50:1 on white, **4.27:1 on the `#F9F9F9` panels**), green `#089958`, link blue `#017AFE` | M |
| Surfaces | White, `#F9F9F9` / `#F5F7F9` rounded panels (24px), dark footer `#212529` | M |
| Primary action | Green `#089958`, white text, **contrast 3.68:1** (fails AA for 14–20px text), **pill** 9999px, 60px tall in the hero and 46px in the nav. Mobile nav "Login" is **34px tall** | M |
| Container | 1208px | M |
| Section padding | 48/48px (28/28px on mobile) | M |
| Radii | 12px cards, 24px panels, 9999px buttons and chips | M |
| Nav | 63px **sticky**. Items: US Stocks · Indian Stocks · ETFs · Mutual Funds · IPO · Features · Pricing · Login · Open Demat Account. Breadcrumb under the nav | M |
| Sections | 16 h2. Page height **16,988px** desktop and **23,845px** mobile. Home: 6,267px. GIFT City page: 13,064px | M |
| Motion | No scroll reveals (0 elements hidden or offset below the fold). Infinite CSS keyframes: `slowBounce 5s infinite` on a fixed QR-code widget (every page) and `smooth-swap 6s infinite` app-screen rotation on home. No `prefers-reduced-motion` rules found. CTA hover: no computed change | M |
| Horizontal overflow | None at 390px | M |

---

## 3. How each answers the four questions

### 3.1 "Is my money safe?"

**Vested** answers in three places on the home page:
1. A one-line strip under the product cards: *"SEC registered adviser · FINRA member broker · SIPC protected upto $500K · IFSCA authorised at GIFT City"*, followed by a line naming which **entity** offers which product ([shot 02](shots/vested-02-scale-stats-and-reg-strip.jpg)). [O]
2. A full section, *"Investing globally via Vested: regulation, entities & investor protection"*: four logo cards (SIPC, DriveWealth, FINRA, IFSCA) with one sentence each, then **"Verify us on IFSCA directory, FINRA BrokerCheck and SEC adviser search"** linked to the three public registers ([shot 03](shots/vested-03-regulation-entities-verify-links.jpg)). [O] This is the strongest trust device on either site: it hands the skeptic a way to check.
3. FAQ #1, *"Is Vested protected and regulated?"*, which is open by default. It begins with an over-reach (*"Yes, Vested is safe & regulated"*) but then gives the most honest sentence on either site: *"The protection covers the failure of a broker, not investments losing value in the market."* ([shot 04](shots/vested-04-faq-is-it-protected.jpg)). [O]

**INDmoney** puts its regulator in the hero lede (*"Regulated by IFSCA"*), then repeats it in a five-tile stat strip (*"IFSCA Regulated · $500K SIPC Protected"*), immediately followed by the **IFSCA licence numbers** (*IFSC/BD/2023-24/0016*, *IFSCA/GAP/BD/2025-26/002*) ([shot 01](shots/indmoney-01-us-stocks-hero-desktop.jpg)). [O] It later has a section titled *"Is investing in US stocks from India legal and safe?"* with four cards: LRS, IFSCA, SIPC, and "your money moves within India's regulated system" ([shot 03](shots/indmoney-03-legal-and-safe-section.jpg)). [O] The answer is mostly about *legality*, and it uses "safe" loosely (*"makes your fund movement fast and safe"*). [O]

### 3.2 "Who holds my money?"

- **Vested:** the US-stocks FAQ says *"The platform works with DriveWealth as clearing firm and custodian"*, and the home FAQ says *"All the shares and cash that you hold is in a brokerage account in your name."* Both are clear, but you have to open an accordion to find them. [O]
- **INDmoney** does this better than anyone in the category. The GIFT City page walks through the account in six numbered questions (*"What happens when I sign up / add money / trade / Where are my shares actually kept? / withdraw / dividends"*). It names **DTCC** as the depository ("the equivalent of NSDL or CDSL in India") and describes a **segregated client bank account in GIFT City**. It also draws the money path as text arrows: *You → GIFT City wallet → Money stays in GIFT City → Direct US custody (DTCC)* ([shot 06](shots/indmoney-06-money-path-hops.jpg)). [O] It even concedes *"both are regulated, so this is about structure and accountability, not safety"* [O]. That honesty is rare. The same page then turns into a comparison against named rivals (NSE IX, India INX, Viewtrade, Apex), and the how-to guide lists those rivals' app-store ratings ([shot 05](shots/indmoney-05-gift-city-comparison-table.jpg)). [O]

### 3.3 "What does it cost?"

- **Vested pricing** ([shot 06](shots/vested-06-pricing-plans.jpg)): a ₹0 Basic plan and a ₹375/mo Premium plan marked "Recommended" with a "Save 10%" chip. Brokerage is 0.25% (max $35) or 0.15%, and withdrawals cost $3 under $100 or $5 in USD. Every fee is a **percentage or a dollar figure**. There's no rupee example, and the **bank FX markup and TCS are missing** from the pricing page (the FAQ only says *"Vested discloses all costs clearly"*). [O] The hero promises *"Zero opening fee"* and the US page claims *"Best Forex rates on INR to USD transfers"* with no source. [O]
- **INDmoney** puts a plain fee table on the US-stocks page: five rows of *ZERO*, then *Brokerage 0.25% per trade* and **"Forex Conversion Charges (Charged By Bank) 0.5% to 1.2%"** ([shot 04](shots/indmoney-04-charges-table.jpg)). [O] Including the bank's cut is more honest than Vested. Yet the pricing page's headline says *"Zero Fixed Fee, Zero Hidden Charges"*, its deposit row says "Fees on Deposits: Free", and the hero tile claims *"INR-USD Best Exchange Rates"*. [O] The pricing page does list small regulatory charges precisely (SEC 0.00206%, IFSCA 0.005%). [O] Neither site shows what you'd pay **in rupees on a real amount**.

### 3.4 "How is it taxed?"

- **INDmoney** has a summary block on the US page, *"Capital gains: The one rule to remember"*: under 24 months is taxed at your slab, 24 months or more at 12.5% without indexation. It also covers dividend withholding of 25% and the foreign tax credit, and frames TCS as *"Not a cost, a credit"* (zero up to ₹10 lakh, 20% above). It says what the platform files for you (W-8BEN, Form 67 data, Schedule FA/FSI). [O] The long tax guide has worked examples and an SBI TT-rate explanation, but **no author, no reviewer and no "last reviewed" date** (none found on the tax or how-to pages). [M]
- **Vested** keeps tax in collapsed FAQ items (*"How are taxes handled…"*, *"Does TCS apply…"*) and links to a blog post that calls TCS *"not an additional cost"*. Its "Tax Module" is a pricing-table feature. [O]

### 3.5 Currency

- **Vested is one-directional:** *"Hedge against INR depreciation"*, *"US markets + dollar strength = compounded gains"*, *"Dual return potential"*, *"From 2010 to 2024, US stock markets generated 83% higher returns than Indian equities"*. The only counterweight is a small *"Past performance is no guarantee"* line. [O]
- **INDmoney's FAQ states both directions** (*"If the dollar strengthens… returns in INR terms increase. If the rupee strengthens, your returns may reduce"*), but its feature card is one-directional (*"Dual Advantage: Currency + Stock appreciation"*). [O]

Both break Paraa rule R2. This is where we can be clearly better.

---

## 4. Disclosure placement

| | Vested | INDmoney |
|---|---|---|
| Near the claim | "Past returns shown are hypothetical and for visual purposes only" under the hero product mock. Entity line under the regulator strip. "As of June 2026" under the stats. Testimonial disclaimer under the carousel ([shot 05](shots/vested-05-testimonials-with-disclaimer.jpg)). | IFSCA licence numbers under the regulator claim. "(Charged By Bank)" inside the fee row. |
| Footer | A long "Risk Disclosure – US Markets" block: SEC/FINRA wording, Form CRS link, entity tree ("wholly owned subsidiaries of Vested Holding Corp."), and country, FX and inflation risk. Both registered addresses (El Segundo, Mumbai), plus email and phone. | Seven dense paragraphs, one per group entity, with SEBI, CDSL, NSE/BSE/MCX, AMFI, IRDAI, PFRDA and IFSCA numbers and named compliance officers. |
| Sign-up | Before any input: "By signing up, you agree to our Terms and Policy. You also acknowledge you have read our Disclosure and Brochure" ([shot 08](shots/vested-08-signup.jpg)). | A risk line overlaid on an illustration, **clipped off both edges at 1440px** and unreadable ([shot 08](shots/indmoney-08-signup-login.jpg)). The submit button sits disabled at 1.89:1 contrast. |

[O] for all cells; contrast ratios [M]. INDmoney's footer is complete but unreadable for a visitor. Vested's in-context captions are the model to follow.

---

## 5. Trust signals: honest or inflated

| Signal | Vested | INDmoney | Verdict |
|---|---|---|---|
| Regulator names + public-register links | Yes, three links | Licence numbers, no register links on the US page | **Honest. Copy the mechanism** |
| Entity-per-product statement | Yes | Yes (GIFT page, footer) | Honest |
| Scope of protection ("broker failure, not market loss") | Yes, in the FAQ | "in the event of broker failure" | Honest |
| Scale stats | ₹10,000 Cr+ AUA, ₹40,000 Cr+ volume, 4,00,000+ investors, ₹8,00,000+ average portfolio, **dated "as of June 2026"** | Home: **20L+ investors**. About: **10m+ investors**. US page: **"3 Million+ Indians choose INDmoney for US stocks"**. GIFT page: **"trusted by over 1 million investors"** and also "3 million+ US Stocks A/C". "2.5b+ saved" has **no currency** | Vested: real but promotional. INDmoney: **four different user counts that can't all be true** [M, page text] |
| Ratings | "Rated 4.7 on the App Store and Google Play" | 4.7 iOS / 4.6 Android, "2Cr+ downloads", headed "Top Rated Trading & Investing App" ([shot 07](shots/indmoney-07-home-ratings-strip.jpg)) | Real but undated and unsourced |
| Press logos | "As featured in" Bloomberg, Mint, ET, Moneycontrol | n/a | Borrowed authority |
| Testimonials | 7 named people with photos and job titles in a looping carousel (the DOM holds three copies of each), plus an "were not paid" disclaimer | n/a | Real people, but the quotes read as marketing ("a true industry leader") |
| Superlatives | "The global investing specialist", "Best Forex rates", "Competitive… rates" | "Best Exchange Rates", "Top Rated", "first to launch", "one of the first", "Zero Hidden Charges", "Higher returns & Zero Estate Taxes" (UCITS) | **Inflated**, and all banned by our R1 |
| Leadership named | Yes: CEO, CFO, **Chief Compliance Officer**, directors | Founder, CEO, CTO etc. (first names only for some) | Honest, and the named compliance officer is a strong touch |

---

## 6. Visual design analysis

**Typography.** Vested's look comes from one decision: a thin, tightly tracked **serif display** (Sentient w300 at 80px, −4px) over Inter. That gives it an editorial, "private bank" register that most fintech templates lack [M]. Below the hero, though, the type is generic: 14/16px Inter in grey cards. INDmoney is all Inter at w600–700 with four competing h2 sizes. It reads like a product team, not a design system (`font-scale` and `text-styles-system` are both violated) [M]. Both drop mobile body text to 14px or less, and Vested goes down to 10px (`readable-font-size` asks for 16px minimum) [M].

**Colour.** Vested runs navy, a single blue CTA and pale-blue bands on cream, with one navy stats band. It's close to the skill's *Banking/Traditional Finance* palette (navy `#0F172A`, gold accent `#A16207`) and to Paraa's ink-plus-gold plan [M]. INDmoney is white and grey with brand green as the only accent. That green on white text measures **3.68:1** and fails `color-contrast` / `color-accessible-pairs` on every primary button [M].

**Grid and spacing.** Vested centres a 1032px container. Its home section padding varies from 31 to 124px, which is a sign of sections built one by one, but the US-stocks page holds 72px throughout [M]. INDmoney uses a 1208px container with a uniform 48px rhythm and 24px-radius grey panels, so it's consistent but monotonous [M].

**Hierarchy.** Vested's hero is calm: one sentence, one CTA, three proof chips ("Zero opening fee · Digital KYC in 5 minutes · Start from $1"), and a real product UI in a laptop and phone ([shot 01](shots/vested-01-home-hero-desktop.jpg)) [O]. INDmoney's hero is a pipe-separated list of seven claims followed by a **mobile-number field** ([shot 01](shots/indmoney-01-us-stocks-hero-desktop.jpg), [shot 02](shots/indmoney-02-us-stocks-mobile-hero.jpg)) [O]. That's the lead-capture pattern our audit already flagged as T3.

**Components.** Vested: logo cards, icon-tile product cards with "From $1" tabs, a numbered three-step "How to start", a tabbed product showcase, a carousel, an accordion FAQ and a two-plan pricing table. INDmoney: stat tiles, bordered HTML tables (fees, GAP comparison), a stock-price list, icon-led cards, a long FAQ, and a floating QR widget that bounces forever [O/M]. INDmoney's tables do the most useful work on either site, because they show facts side by side with nothing decorative.

**Motion.** Vested runs **29–61 GSAP ScrollTriggers** per page. Every block fades up about 18px, which is the `excessive-motion` anti-pattern ("animate 1–2 key elements per view max"), although it does ship reduced-motion rules [M]. INDmoney has no reveals, but runs two infinite loops (a bouncing QR widget and rotating app screens) with **no reduced-motion handling** (`reduced-motion`, `auto-rotation-controls`) [M]. Neither shows a hover state on its primary CTA that we could measure (`state-clarity`) [M].

**Mobile.** Both stack to one column with no horizontal overflow [M]. Vested keeps its serif hero and phone mock on screen 1 ([shot 07](shots/vested-07-mobile-hero.jpg)), then turns each regulator into a full-width card, about 190px each [O]. INDmoney puts the phone field and a sticky "Explore US Stocks Investing" bar on screen 1. Its mobile US page is **23,845px** long, about 28 screens [M]. Touch targets fall short on both: Vested's mobile CTAs are 42px and INDmoney's Login is 34px (`touch-target-size` asks for 44px) [M].

**Designed vs. generated?** Vested looks *designed*: a distinctive display face, real product screenshots, and restraint in colour. Its generated-looking parts are the icon-in-a-tinted-square cards, uniform fade-ups and a testimonial carousel. INDmoney looks *built*: plain, dense and table-led. Its credibility comes from **specificity**, not styling: licence numbers, DTCC, FIFO, Form A2, SBI TT rate. The lesson for Paraa is that **specific, checkable nouns read as human**. Generic claims and decoration are what make a page look generated. [I]

---

## 7. Side-by-side comparison

| Question / dimension | Vested | INDmoney | Opening for Paraa |
|---|---|---|---|
| Safe? | Regulator strip, verify links, protection-scope sentence | Licence numbers, "legal and safe" section | Verify links **plus** scope sentence **plus** "what this doesn't protect" at equal weight |
| Who holds it? | Custodian named in the FAQ | Six-step walk-through plus a money-path chain | A drawn chain on the homepage, one node per entity, each node checkable |
| Cost? | % only, FX and TCS missing | % plus bank FX range, but "zero hidden charges" | **Rupee receipt on ₹1,00,000**, with every line including bank and TCS cash flow |
| Tax? | Collapsed FAQ | "One rule to remember" card, unsigned guide | Three rules, **reviewed by a named CA on a date**, with a "Ask a CA" link |
| Currency | One-directional | Mixed | Both directions every time (R2) |
| Scale proof | Dated stats, press, testimonials | Inconsistent counts, ratings | None, by design. Replace with checkability |
| Type | Serif display + Inter | Inter only, 4 h2 sizes | Manrope with one scale (owner decision). Tabular figures |
| CTA | Blue, 8px, one per view | Green pill, 3.68:1 | Ink, 8px, 14.3:1 (already planned) |
| Motion | 29–61 scroll triggers | Infinite loops | One CSS reveal, nothing looping |
| Page length (desktop home) | 11,749px | 6,267px (US page 16,988px) | Aim well under 8,000px |

---

## 8. Actionable recommendations for Paraa

Each item says what to adopt, why, where it goes on our page (section numbers follow the audit's page order), and which skill guideline backs it.

1. **A "Where your money goes" chain in the security band (§6, ink).** Adapt INDmoney's money-path idea ([shot 06](shots/indmoney-06-money-path-hops.jpg)) as a horizontal chain of 4–5 nodes, vertical on mobile: *Your Indian bank → [Paraa entity] → [custodian] → basket units in your name → back to your bank*. Each node carries the legal entity, its regulator, the registration number and a "Check on [register]" link. Until those are confirmed, use `placeholder-tag` "TO CONFIRM" (R6). Render it as real text in an ordered list, not an image.
   *Why:* it answers "who holds it" in one look, and no direct competitor puts this on the homepage. *Guidelines:* `visual-hierarchy`, `data-table` (a text alternative, not a picture), `color-not-only`. Landing pattern *Trust & Authority + Conversion* ("Proof… certs" before the CTA).

2. **"Check us yourself" links next to every status claim (§2 facts strip and §6).** Take Vested's "Verify us on IFSCA directory, FINRA BrokerCheck and SEC adviser search" ([shot 03](shots/vested-03-regulation-entities-verify-links.jpg)) and apply it to Paraa's registrations: the FIU-IND registration, CIN on the MCA portal, and any SEBI/IFSCA number. Link to the public register, not to a logo.
   *Why:* for an unknown company, the visitor being able to check a claim is a stronger signal than any badge. It is R6 in practice. *Guidelines:* *Trust & Authority* pattern ("Security badges… Transparent pricing"), done honestly; `consistent-help`.

3. **A protection-scope pair at equal weight (§6).** Adopt Vested's sentence structure (*"covers the failure of a broker, not investments losing value"*) as two columns at the same type size, *"What this protects"* and *"What it doesn't"*. Never answer "Yes, it's safe."
   *Why:* R1 bans "safe", and R8 requires the downside at equal weight. Both competitors open with "Yes". *Guidelines:* `visual-hierarchy` (same size means equal weight), `color-not-only` (label the "doesn't" column in words, not just a colour).

4. **A rupee cost receipt (§5, Run the numbers, and a link from the nav).** Take INDmoney's fee table ([shot 04](shots/indmoney-04-charges-table.jpg)), including the "charged by bank" row, and go further: show the bill on ₹1,00,000 for 12 months. Include our fee, the bank's FX spread as a range, and TCS as a cash-flow line ("collected now, credited when you file"). Mark every number `Illustrative` with a date (R3, R7).
   *Why:* both competitors show only percentages, and Vested leaves FX and TCS out entirely. A rupee total is the most useful answer we can give. *Guidelines:* `number-tabular`, `number-formatting` (Indian grouping), `data-table`, `progressive-disclosure` (total first, line items below).

5. **Three tax rules with a named, dated CA review (§5 tax tab and §7 FAQ).** INDmoney's "one rule to remember" card is the right format (24 months, slab vs 12.5%, dividend withholding and credit, TCS). Its guide carries no reviewer or date. Add *"Reviewed by [CA name, membership no.] TO CONFIRM on [date]"* and a link to "Ask a CA" (§8).
   *Why:* this turns our CA form from a lead form into a credential, and neither competitor has it. *Guidelines:* `consistent-help` (the CA link sits in the same place in every tax context), `input-helper-text` on the form.

6. **Label the example app panel the way Vested labels its mock (§1 hero).** Vested puts *"Past returns shown are hypothetical and for visual purposes only"* directly under its product UI ([shot 01](shots/vested-01-home-hero-desktop.jpg)). Use our `Illustrative` badge **inside** the panel frame plus a one-line caption with the date. Show a flat or negative period by default (R5).
   *Guidelines:* `color-not-only` (the badge says it in words), and R3/R5 from our own rules.

7. **Put disclosures where the claim is, then repeat them in the footer.** Combine Vested's captions (entity line under the regulator strip, "as of" under numbers) with INDmoney's licence numbers under the claim, rendered from the `.disclosure` component (R15). Keep footer paragraphs short: one entity per row with a link. Avoid INDmoney's seven-paragraph wall and its clipped sign-up disclosure.
   *Guidelines:* `line-length-control`, `readable-font-size` (no 10–11px legal text), `color-contrast` at 4.5:1 for disclosure grey on grey-50 (INDmoney's grey on `#F9F9F9` measured 4.27:1).

8. **One quiet CTA, defined once.** Vested gets this right: one CTA colour, 8px radius, one primary action per view. Our ink button (14.3:1) is already stronger than Vested's blue (6.7:1) and INDmoney's green (3.68:1). Add the hover and focus states neither of them has.
   *Guidelines:* `primary-action`, `state-clarity`, `focus-states`, `touch-target-size` (both competitors miss 44px on mobile).

9. **Use the serif idea only for figures, if at all.** Vested's sense of quality comes from one confident typographic move. With Manrope only (owner decision), do the same move inside Manrope: display at w600 with tight tracking (already planned), **tabular lining figures** for every number, and one type scale with a single h2 size. INDmoney has four.
   *Guidelines:* `font-scale`, `weight-hierarchy`, `number-tabular`, `heading-line-balance`.

10. **A plain "Ask before you invest" path in the hero, not a phone field.** Vested's hero shows three proof chips under one CTA. Our version has two actions (see the basket, ask a CA) and **no data entry in the hero**. Where we do ask for a phone number (§8), state on the field what happens to it, the way Vested's sign-up shows Terms, Disclosure and Brochure links before any input ([shot 08](shots/vested-08-signup.jpg)).
    *Guidelines:* `input-labels`, `input-helper-text`, `progressive-disclosure`. Audit item T3.

11. **Put fraud and impersonation guidance in the security band.** INDmoney has a "Fraud Awareness" page, but only in its footer. Bring the essentials onto our homepage in §6: our only domain, our only app-store listing, and "we never ask for OTP/UPI PIN".
    *Guidelines:* *Accessible & Ethical* style. *Trust & Authority* pattern.

12. **Keep motion to one CSS reveal and no loops.** Vested's 29–61 scroll triggers and INDmoney's infinite bounce both add noise with no meaning, and INDmoney ignores reduced motion.
    *Guidelines:* `excessive-motion`, `motion-meaning`, `reduced-motion`, `auto-rotation-controls`. This matches the audit's motion tokens.

---

## 9. Do not adopt

| Pattern (where seen) | Why not |
|---|---|
| **Scale stats bands** (Vested's navy ₹10,000 Cr+ band, [shot 02](shots/vested-02-scale-stats-and-reg-strip.jpg). INDmoney's 20L+/2Cr+ strip, [shot 07](shots/indmoney-07-home-ratings-strip.jpg)) | We have no scale to show, and an empty or tiny number backfires. INDmoney shows how such numbers drift (four user counts that disagree). The facts strip should hold checkable facts instead: registration, pricing date, minimum. |
| **"As featured in" press logos** (Vested) | We have none, and borrowed authority breaks R6 unless it's linked and dated. |
| **Testimonial carousel** (Vested, [shot 05](shots/vested-05-testimonials-with-disclaimer.jpg)) | R11 forbids invented people, and we have no real customers to quote. Carousels also fail `auto-rotation-controls` / `gesture-conflicts` and repeat content. |
| **App-store rating tiles and "Top Rated"** (INDmoney) | We have no ratings to show, and "Top" used as a ranking is banned by R1. |
| **Superlatives**: "Best exchange rates", "specialist", "first to launch", "Zero hidden charges" (both) | Banned by R1, and unverifiable. Show the rate source and the spread instead. |
| **"Yes, it's safe & regulated" FAQ answers** (both) | "Safe" is banned (R1). Answer with the entity, the regulator, the number, the link, and the scope. |
| **Return-comparison charts** ("US beat India by 83%, 2010–2024", Vested) | A cherry-picked period, one-directional, and without R4's four parts. |
| **One-way currency selling**: "Hedge against INR depreciation", "Dual return potential" (Vested), "Dual Advantage" (INDmoney) | Breaks R2. Always state both directions in the same sentence. |
| **Mobile-number field in the hero** (INDmoney, [shot 02](shots/indmoney-02-us-stocks-mobile-hero.jpg)) | A lead-capture pattern that lowers trust (audit T3). |
| **Naming and rating competitors** (INDmoney GAP vs IB table, rivals' app ratings) | Picking fights is risky for a small firm and reads as defensive. Explain our own chain plainly instead. |
| **Floating bouncing QR widget, rotating app screens** (INDmoney) | Infinite motion with no reduced-motion handling (`excessive-motion`, `reduced-motion`). |
| **"Recommended" plan upsell and "Save 10%" chips** (Vested pricing) | We sell one product. Upsell framing undercuts calm pricing. |
| **Mega-footers of 100+ stock and collection links** (both) | SEO furniture. It adds no trust and buries the legal block. |
| **Emoji in brand copy** ("Made in India ❤️", INDmoney about page. "👉" in Vested's FAQ) | `no-emoji-icons`. It reads as casual on a money page. |
| **14px or smaller body text on mobile** (both, including Vested's 10px) | `readable-font-size`. Keep 16px. |
| **Green-on-white primary at 3.68:1** (INDmoney) | Fails `color-contrast`. |

---

## 10. Gaps neither competitor fills (where Paraa can win)

1. **A rupee total.** Neither shows the full cost on a real rupee amount. [O]
2. **A reviewed, dated tax summary from a named professional.** INDmoney's guide is unsigned and undated. Vested's tax content is in FAQs and blogs. [M/O]
3. **Two-directional currency language everywhere.** Both slip into "the dollar will help you". [O]
4. **The money chain on the homepage.** INDmoney's version is buried on a 13,064px sub-page, and Vested's is in an accordion. [M/O]
5. **Consistent numbers.** INDmoney's user counts contradict each other across pages. One dataset used everywhere (content-rules §0.4) is itself a trust signal. [M]
6. **Short pages.** Their pages run 11,749–16,988px on desktop and up to 23,845px on mobile. A complete answer in under 8,000px respects the skeptic's time. [M]
7. **A human you can ask before you sign up.** INDmoney offers "Certified CA Support for Tax" only as a Plan B table row. Vested offers help-desk articles. Our pre-sign-up CA question is unique, so make it visible. [O]
