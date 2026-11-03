# 02 — Concept directions: Paraa Capital website

*Design agent output · 2 Nov 2026 · input for the build agents*

> **How to use this file.** The shared rules come first: the site map, the footer/legal block, the copy rulebook and one shared illustrative dataset. All four concepts must follow them. Then come Concepts A–D. Each one is copy-complete: build what is written, and don't invent copy. If something is missing, use a `TO CONFIRM` placeholder. Do not write your own claim.
>
> **Binding inputs:** `00-design-tokens.md` (colors and type), `01-research-brief.md` §3 (what we may claim), `ASSUMPTIONS.md` (B1–B9, D1–D7). The components named here are the classes in `shared/components.css` and `shared/base.css`. New layouts are named in `code` and specified where they first appear. Build them from semantic tokens only (`--surface`, `--accent-text`, …), with no raw hex.

---

## 0. Shared foundations (all concepts)

### 0.1 Shared site map

Every concept ships the same page inventory. Concepts differ in **which page the homepage pushes people toward** and in **which inner page gets built first** (§6 of each concept). The others ship as stubs: H1, one-paragraph purpose, `placeholder-tag` "Page in preparation".

| Path | Page | Primary audience | Notes |
|---|---|---|---|
| `/` | Home | per concept | |
| `/how-money-moves` | How your money moves | Retail, CA | Custody map. The route is a labelled placeholder (B6) |
| `/baskets` · `/baskets/[slug]` | Baskets index + one page per basket | Retail, Advisor | Strategy, holdings policy, NAV, fees, risks, manager |
| `/nav` | NAV & performance centre | All | Full history, CSV, methodology |
| `/fees` | Fees, in rupees | Retail, CA | Every fee and the receipt calculator |
| `/risks` | What could go wrong | All | Contains the "2-minute risk brief" anchor `#brief` |
| `/legal-entities` | Who we are legally | Institutions, CA | Entities, registrations, auditor, custodian, directors |
| `/team` | Team & governance | Institutions | Named people, who decides what, skin in the game |
| `/letters` | Monthly letters | Retail, Institutions | Archive |
| `/log` | Transparency log | All | Incidents, NAV revisions, delays, fixes |
| `/advisors` | For advisors & distributors | Advisor | Earnings model, compliance kit |
| `/cas` | For chartered accountants | CA | Tax pack (CA-signed: TO CONFIRM) |
| `/institutions` | For institutions | Institutions | DDQ request |
| `/learn` | Rupee & you (learning module) | Retail | Six chapters |
| `/security` | Security & official channels | Retail | "We will never…", platform checker |
| `/withdrawals` | Getting your money out | Retail | Timeline + cost, worked example |
| `/grievances` | Complaints & grievances | All | Escalation ladder, published stats |
| `/grade-is-now-paraa` | Grade Capital is now Paraa Capital | Existing users | What changed, what didn't, how to verify |
| `/legal/*` | Privacy, Terms, Investor agreement, AML policy, Risk disclosure | All | Carried over and re-branded |
| `/contact` | Contact | All | |

**Global nav (all concepts):** Brand · How it works (`/how-money-moves`) · Baskets · NAV · Fees · Risks · For partners ▾ (Advisors / CAs / Institutions) · [concept CTA button]. "For partners" keeps commission talk away from investor pages (rule R13).

**Sitewide rebrand bar** (above `.site-header`, dismissible, the dismissal stored in `localStorage` with try/catch): `badge-accent` "New name" + text: **"Grade Capital is now Paraa Capital. Before you log in or pay, check you're on an official channel."** + `link-arrow` "How to verify us" → `/grade-is-now-paraa`. While Compliance hasn't confirmed what carries over, do not write "same account" or "nothing changes".

### 0.2 Shared footer / legal block

Use the `.site-footer` + `.footer-grid` (4 columns) + `.footer-legal` components.

**Column 1 — Brand.** Brand mark + "Paraa Capital". Line: "USD-denominated investing for residents of India. Every number dated, every intermediary named." Then the **official channels** list: website `paraa.capital` `placeholder-tag` TO CONFIRM · app (store links) · support email `TO CONFIRM` · "We never ask for your OTP, PIN or money over WhatsApp or personal accounts." → `/security`.

**Column 2 — Invest:** How your money moves · Baskets · NAV & performance · Fees · What could go wrong · Getting your money out.

**Column 3 — Check us:** Who we are legally · Team & governance · Transparency log · Letters · Complaints & grievances · Grade is now Paraa.

**Column 4 — Partners & legal:** For advisors · For CAs · For institutions · Privacy · Terms · Investor agreement · AML policy · Full risk disclosure.

**`.footer-legal` block, in this order:**

1. **Registrations** (a `.table` with columns Entity | Regulator | Activity | Number | Check it). One row per entity. Prototype content:
   `Paraa Capital [legal name] TO CONFIRM | TO CONFIRM | TO CONFIRM | TO CONFIRM | Lookup link TO CONFIRM`.
   Every cell carries a `placeholder-tag`. **Production rule:** a row appears only once all five cells are real and the link opens the regulator's own lookup. An empty "Registered with:" slot is never shipped (brief §1.2). Never use a regulator's logo.
2. **Company details:** Registered name `TO CONFIRM` · CIN `TO CONFIRM` (link to MCA lookup) · Registered office `TO CONFIRM` · Operations office `TO CONFIRM`. Any foreign entity gets its jurisdiction and role spelled out ("[Entity], [country]: holds the fund's assets", `TO CONFIRM`). A bare Delaware address is never shown.
3. **Risk disclosure** (`.disclosure`, `data-disclosure-id="global-risk-v1"`). The text:
   > **Investing involves risk, including loss of the money you put in.** Your investment is held and valued in US dollars. If the rupee weakens against the dollar, the rupee value of your investment rises; if the rupee strengthens, it falls. Both can happen in the same period as a fall in the investment itself. Past performance, including any simulation, does not predict future results. Figures marked *Illustrative* are examples, not records or forecasts. How your money is legally routed and held is `TO CONFIRM` and is described on [How your money moves]. Nothing on this site is personal investment advice. Read the [full risk disclosure] before investing.
4. **Conditional SEBI line.** This is hidden until Compliance confirms that a SEBI-registered entity offers the service. When it is shown, it uses the verbatim text from brief §3.2: *"Registration granted by SEBI, membership of BASL (in case of IAs) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors."* The quote is regulator-mandated, so the word "guarantee" in it is exempt from R1.
5. **Grievance slot:** "Grievance officer: [Name] `TO CONFIRM` · [email] `TO CONFIRM` · [phone] `TO CONFIRM` · We reply within [N] working days `TO CONFIRM`. Not satisfied? [Escalation route: regulator portal / ODR] `TO CONFIRM`." + `link-arrow` "Complaint statistics" → `/grievances`.
6. **Bottom line:** "© {current year, generated} Paraa Capital [legal name TO CONFIRM]. Formerly Grade Capital." + a link to the RBI Alert List: "Check whether any platform is authorised: RBI Alert List →" (official RBI URL `TO CONFIRM`).

### 0.3 Global copy rulebook (binding on every concept)

| # | Rule | Example |
|---|---|---|
| R1 | **Banned words, anywhere in site copy (including negations like "not guaranteed"):** guaranteed, assured, safe, risk-free, capital protected, no loss, #1, best, and first / top / leading *used as rankings* ("India's first"; "see every number first" is fine), forex, FX trading, trade currencies, leverage, CFD, pips, tax-free, insured, bank-grade, financial freedom, passive income. **Only exceptions:** verbatim regulator-mandated text (0.2 item 4), and phrases quoted in the "Never say" column of Concept C's say/not-say card, where they appear as forbidden examples. | ✗ "Your safe route to dollars" → ✓ "Your route to dollars, every step named" |
| R2 | **Every currency sentence shows both directions**, in the same sentence or the next one, at the same type size. | "A weaker rupee raises your rupee value. A stronger rupee lowers it." |
| R3 | **Every number has a date and a source.** Every dummy number has an `Illustrative` badge in the same card or row. Use the `.stat-source` line under `.stat`. | "NAV US$11.06 · as of 31 Oct 2026 · fund administrator TO CONFIRM · `Illustrative`" |
| R4 | **No return figure without four things:** the period, net or gross, the currency, and the comparison. Prototype returns are always `Illustrative`. The old site's figures are never used (B7). | "+10.6% · since inception 1 Jul 2024 · net of fees · in USD · vs USD cash TO CONFIRM" |
| R5 | **Defaults never flatter.** Charts default to *since inception*. Simulator sliders default to a loss or to zero growth. Tables sort by date, not by return. | Fee receipt default assumed return = 0% |
| R6 | **Claims of status** ("regulated", "audited", "certified", "registered") need the entity, the body, the number and a link. Until then, use a `placeholder-tag`. | "Audited by [firm] TO CONFIRM, report dated [date] TO CONFIRM" |
| R7 | **Fees are shown in rupees on a real amount**, never as a "zero fee" headline. | "On ₹1,00,000 for 12 months, you'd pay ₹2,472 in fees (`Illustrative`)" |
| R8 | **The downside gets equal weight.** Wherever a strongest month is shown, the weakest month sits next to it in the same component at the same size. | Stat row: Strongest month / Weakest month / Max drawdown |
| R9 | **Plain words.** Hero and headline sentences stay at or under 20 words. Define NAV, LRS, TCS and drawdown on first use on each page, with `<abbr>` plus an inline gloss. | "NAV (the price of one unit of the basket)" |
| R10 | **Formats:** ₹ with Indian grouping (₹1,00,000, ₹12.5 lakh). "US$" on first use, then "$". Dates as "31 Oct 2026". Percentages to one decimal, with a sign on returns (+4.1%, −6.3%). The minus sign is U+2212. **Rounding (audit S7):** compute at full precision; round half-up to the nearest rupee (or 0.1%) only when displaying; never round directionally; a receipt total is the rounded raw total. Dollar amounts use international grouping (US$250,000). | |
| R11 | **No fabricated people.** No stock photos, no testimonials, no invented names. Team slots use initials monograms plus "Name TO CONFIRM" until real people sign off (D7). | |
| R12 | **CTA labels state the next action honestly.** No "Start earning" and no "Grow your wealth". | "See every number first", "Run your numbers" |
| R13 | **Commission talk only lives under `/advisors`.** Investor pages never mention advisor payouts, except a neutral line: "Your advisor may be paid by us; see Fees." | |
| R14 | **Crypto is not mentioned in marketing copy** (B1). If any page must mention it, the ASCI disclaimer goes on that page verbatim: *"Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions."* | |
| R15 | **Disclaimers are components, not pasted text.** Each one is a `.disclosure` with a `data-disclosure-id`, rendered from one shared source, so a change to SEBI's proposed Common Advertisement Code is a single edit. | |

### 0.4 Shared illustrative dataset (use it everywhere so the numbers agree across pages)

All values below are **dummy** and render with an `Illustrative` badge.

**Basket names:** "Basket 1 — USD Core", "Basket 2 — USD Balanced", "Basket 3 — USD Growth". Each name carries the tag `name TO CONFIRM`. Only Basket 1 has the full series below. Baskets 2 and 3 show "Data in preparation" rather than invented series. If the real baskets differ, this is where the swap happens.

**Basket 1 month-end NAV (US$), inception 1 Jul 2024 at 10.00:**

```
2024-07 10.00 | 2024-08 10.12 | 2024-09 10.31 | 2024-10 10.18 | 2024-11 10.40 | 2024-12 10.52
2025-01 10.61 | 2025-02 10.47 | 2025-03 10.79 | 2025-04 10.11 | 2025-05  9.88 | 2025-06  9.52
2025-07  9.71 | 2025-08  9.98 | 2025-09 10.39 | 2025-10 10.30 | 2025-11 10.47 | 2025-12 10.58
2026-01 10.44 | 2026-02 10.62 | 2026-03 10.71 | 2026-04 10.66 | 2026-05 10.82 | 2026-06 10.95
2026-07 10.88 | 2026-08 11.02 | 2026-09 10.97 | 2026-10 11.06
```

Derived figures (devs must compute these, not hard-code them; the values are listed here so you can check your code):
- Since inception: 11.06 / 10.00 − 1 = **+10.6%** (27 months). Annualised = 1.106^(12/27) − 1 = **+4.6%**.
- Strongest month: Sep 2025, 9.98 → 10.39 = **+4.1%**. Weakest month: Apr 2025, 10.79 → 10.11 = **−6.3%**.
- Max drawdown: peak 10.79 (Mar 2025) → trough 9.52 (Jun 2025) = **−11.8%**. The first month-end above 10.79 is **May 2026 (10.82)**, so it took **14 months** from the peak (Mar 2025) to recover.
- Negative months: **10 of 27**.

**Illustrative USD/INR annual averages** (₹ per US$; replace with the RBI/FBIL reference-rate series before launch, and keep the source line):

```
1980 7.86  | 1985 12.37 | 1990 17.50 | 1991 22.74 | 1995 32.43 | 2000 44.94 | 2002 48.61
2003 46.58 | 2004 45.32 | 2005 44.10 | 2006 45.31 | 2007 41.35 | 2008 43.51 | 2009 48.41
2010 45.73 | 2011 46.67 | 2012 53.44 | 2013 58.60 | 2014 61.03 | 2015 64.15 | 2016 67.20
2017 65.12 | 2018 68.39 | 2019 70.42 | 2020 74.10 | 2021 73.92 | 2022 78.60 | 2023 82.60
2024 83.68 | 2025 86.50 | 2026 88.00
```

For years that aren't listed, interpolate linearly (prototype only; the production series is annual). "Today" = 88.00. **Rupee-strengthened years** (rate below the previous year) in this set are 2003, 2004, 2005, 2007, 2010, 2017 and 2021. They're computed from the full interpolated series, so code must derive them, not hard-code them.

**Illustrative fee schedule** (every value `TO CONFIRM`): currency conversion in 0.50% · entry fee 0.00% · management fee 1.50% a year, accrued monthly · performance fee `TO CONFIRM`, shown as a row and excluded from the maths · exit fee 1.00% if held under 12 months, otherwise 0% · currency conversion out 0.50% · TCS: rate and threshold `TO CONFIRM`.

---

## Concept A — "The Open Book"

### A1. Thesis
**You should be able to check every number we publish before you give us a rupee.** The site is a ledger first and a pitch second.

### A2. Audience
**Primary:** the sceptical retail investor who has seen "680% returns" ads and distrusts them. A close second is **CAs**, who check numbers for a living. Routing: CAs get a dedicated card (section 10) and the CSV download. Advisors and institutions get one card each in section 10 and the "For partners" nav. There's no advisor content above the fold.

### A3. Hero (new layout `ledger-hero`)
- **Eyebrow:** USD-denominated investing, from India
- **H1:** Invest in dollars. Check every number first.
- **Subhead:** Every NAV we've published, every fee in rupees, every correction we've made. Dated, sourced, downloadable. Read the ledger before the pitch.
- **Primary CTA:** `btn-primary btn-lg` "See every number first" → `/nav`
- **Secondary CTA:** `btn-secondary btn-lg` "How your money moves" → `/how-money-moves`
- **Visual: `ledger-hero`.** A two-column `.split`. The left column holds the copy. The right column holds a `.table-wrap` styled as a ledger, with a header row: `badge` "Latest entries" + `badge-accent` `Illustrative` + `.stat-source` "Prototype data · source: fund administrator TO CONFIRM".
  Columns: Date | Basket | NAV (US$) | Month | Signed off by | Status. Show the last 6 rows of Basket 1 (May–Oct 2026), newest first. "Month" is the computed month-on-month change, coloured `.pos` or `.neg`. "Signed off by" reads "Administrator TO CONFIRM". In "Status", every row shows `badge` "Final", except Aug 2026, which shows `badge-pending` "Revised · see changelog" and links to `#changelog`.
  Under the table, a `grid-4` of `.stat`: Latest NAV **$11.06** · Since inception **+10.6%** · Weakest month **−6.3%** · Max drawdown **−11.8%**. Each has a `.stat-source` "as of 31 Oct 2026 · in USD · net of fees · Illustrative".
  Mobile: the table collapses to Date, NAV and Month only. "Signed off by" moves into a row-tap `<details>`.

### A4. Primary CTA logic
The CTA asks for **attention, not money**: "See every number first". The trust model is *verify, then trust*. An investor who has read the NAV history has already done the thing scam sites never let you do, so the download-the-app ask comes **after** the evidence (in the closing section and on `/nav`), never in the hero. The header CTA button repeats "See every number".

### A5. Homepage sections

**1. Hero.** As described in A3.

**2. "Every claim, checkable" (trust ledger strip).**
*Purpose:* replace the logo wall with facts a visitor can check. *Components:* `section-sm`, `grid-4` of `.card`, with an `icon-tile` + `h6` + text + `link-arrow` in each card.
- H2: "Four things you can check without trusting us"
- Card 1 "Who regulates us": "Entity, regulator and registration number, each linked to the regulator's own lookup." Value: `placeholder-tag` TO CONFIRM. Link "Registrations".
- Card 2 "Who audits the NAV": "The audit firm's name and its dated report, downloadable." `placeholder-tag` TO CONFIRM.
- Card 3 "Who holds the assets": "The custodian, by name, and what happens if they fail." `placeholder-tag` TO CONFIRM.
- Card 4 "Every NAV, ever": "Full history as a CSV. Nothing removed, revisions marked." Link "Download CSV" (works in the prototype: it generates from §0.4).
- Under the cards, a `.callout`: "Until each slot above holds a real, linked number, it stays marked TO CONFIRM. An empty slot that looked filled would be worse."

**3. NAV explorer (interactive).**
*Purpose:* the core proof. *Components:* `.tabs` (Basket 1 / 2 / 3), two `.select` fields (From, To), an inline SVG line chart (new layout `nav-chart`), `.stat` row, `.btn-secondary` "Download CSV".
- H2: "The whole history. No flattering window."
- Lede: "The chart opens on *since inception*. Pick any start and end month. The weakest stretch stays shaded whatever range you choose."
- **Behaviour:** From/To default to the first and last months. On change, recompute:
  - `R = NAV[to] / NAV[from] − 1`
  - `months = index(to) − index(from)`. If `months ≥ 12`, show annualised `(1+R)^(12/months) − 1`. Otherwise show "Not annualised (under 12 months)".
  - Drawdown series: `DD[t] = NAV[t] / max(NAV[from..t]) − 1`. Max drawdown = `min(DD)` within the range. Shade the peak→trough span in a `--negative` fill at 12% opacity.
  - Stat row: Return over range · Annualised · Max drawdown in range · Negative months in range "x of y".
  - Tabs 2 and 3: chart area replaced by `placeholder-tag` "Data in preparation". The tab stays visible to signal that more baskets exist.
- Chart spec: gold line (`--accent`), 2px stroke; y-axis in US$ with 4 ticks; x-axis in months, labelled every 6; keyboard-focusable points with `aria-label` "Apr 2025, NAV 10.11, −6.3%".
- `.disclosure` (`nav-explorer-v1`): "Illustrative prototype data. Returns in US dollars, net of the illustrative fees in §Fees, time-weighted. Rupee returns differ: see How the rupee changes this."

**4. "Both ends of the range" (stat strip).**
*Purpose:* rule R8 made visible. *Components:* `grid-4` `.card` with `.stat`.
- H2: "The good month and the bad month, side by side"
- Strongest month **+4.1%** (Sep 2025) · Weakest month **−6.3%** (Apr 2025) · Longest time underwater **14 months** (Mar 2025 → May 2026, back above the previous high) · Months with a loss **10 of 27**.
- Key line under it: "If a −6.3% month would make you sell, this basket isn't for you. Better to know that now."
- All tiles `Illustrative`.

**5. Fee receipt (interactive). `UNIQUE:` the specimen fee receipt (extends N7).**
*Purpose:* a public specimen of the annual statement you would receive, live-recalculated for your amount. *Components:* new layout `receipt-card` (a `.card-lg` with dashed `--border-strong` dividers between line items, `.num` right-aligned amounts, monospace-free and in Manrope tabular numerals). Three inputs: amount `.input` (₹10,000–₹50,00,000, default ₹1,00,000), holding period `range` (3–120 months, default 12), assumed return in USD `range` (−20% to +20% a year, **default 0%**).
- H2: "Your fee receipt, before you invest"
- Lede: "This is the statement you'd get, for an amount you choose. Assumed return starts at zero, so you see what fees alone do to your money."
- **Maths** (FX held at 88.00 to isolate fees; say so on the receipt):
  ```
  fxIn   = A × 0.005
  entry  = (A − fxIn) × 0.00
  V      = A − fxIn − entry                 // ₹, held in US$ at 88.00
  for each month: V = V × (1 + r)^(1/12); mgmt_m = V × 0.015/12; V −= mgmt_m; mgmtTotal += mgmt_m
  exit   = t < 12 ? V × 0.01 : 0
  fxOut  = (V − exit) × 0.005
  net    = V − exit − fxOut
  costs  = fxIn + entry + mgmtTotal + exit + fxOut ; costPct = costs / A
  ```
  Check value: A = ₹1,00,000, t = 12, r = 0% → fxIn ₹500 · mgmt ₹1,482 · exit ₹0 · fxOut ₹490 · **total fees ₹2,472 (2.47%)** · you receive **₹97,528**.
- Receipt lines (in order): "Currency conversion in (0.50%)" · "Entry fee (0.00%)" · "Management fee (1.50% a year, charged monthly)" · "Performance fee: TO CONFIRM (not included)" · "Exit fee (1.00% if under 12 months)" · "Currency conversion out (0.50%)" · **"Total paid to us and our partners"** · "You receive". A separate box, outside the total, holds: "Tax collected at source (TCS): `TO CONFIRM`. TCS is not a fee. It is tax collected upfront that you may be able to claim back when you file. Ask your CA."
- Footer line on the receipt: "Specimen · Illustrative fees · Exchange rate fixed at ₹88.00 per US$ so only fees move. In real life, the rate moves too."

**6. How your money moves (custody strip).**
*Purpose:* name every intermediary, and fill the brief's biggest gap. *Components:* new layout `custody-strip`: a horizontal row of 5 nodes (`.card`, with connecting lines in `--border-strong`), stacked vertically under 960px. Each node opens a `<details>` with "Who" / "What they hold" / "If they fail".
- H2: "Every hand your money passes through, by name"
- Nodes: 1 "Your bank account" (Who: you) → 2 "Collection account" (Who: [bank] TO CONFIRM) → 3 "Route abroad" (Who: `placeholder-tag` "LRS / IFSC / other TO CONFIRM"; the node is drawn with a dashed border) → 4 "The fund" ([entity, jurisdiction] TO CONFIRM) → 5 "Custodian" ([name] TO CONFIRM).
- "If they fail" copy for node 5, as a template: "Assets held by a custodian are normally kept separate from the custodian's own money. Whether that applies here, and what you'd recover, is `TO CONFIRM` with counsel."
- `.callout-warn`: "The legal route in step 3 is not yet confirmed. We'd rather show you a labelled gap than draw a confident arrow."
- `link-arrow` "The full map, with what-if answers" → `/how-money-moves`.

**7. NAV changelog (`id="changelog"`). `UNIQUE:` NAV changelog (N5).**
*Purpose:* show that the NAV is controlled, not just computed. *Components:* new layout `diff-row`: a `.timeline`, where each `li` contains a date, a `badge`, a "was → now" line with the old value struck through in `--text-faint` and the new value in `--text`, a reason and a signer.
- H2: "When we change a number, we say so"
- Lede: "Software teams publish changelogs. We publish one for the NAV. Every revision, why it happened, and who signed it."
- Entries (Illustrative):
  - **12 Sep 2026** · `badge-pending` Revised · Basket 1, NAV for 31 Aug 2026: ~~11.04~~ → **11.02** · "A price for one holding came in late and was lower than the estimate we used." · Signed: Administrator TO CONFIRM · Reviewed: Risk officer TO CONFIRM.
  - **3 Feb 2026** · `badge` Methodology · "We now value holdings at the 4 pm New York close instead of the last available price. No past NAV changed." · Signed: Valuation committee TO CONFIRM.
  - **1 Jul 2024** · `badge` Launch · "Basket 1 opened at US$10.00 per unit."
- `link-arrow` "Full changelog" → `/nav#changelog`.

**8. "Last time something went wrong" (incident teaser). `UNIQUE:` public incident log (N2), shown as a live "days since" counter.**
*Purpose:* accountability over time, not just at launch. *Components:* `.card-accent` with a `.stat` "Days since last logged incident: **47**" (computed: today minus the last incident date, 16 Sep 2026, Illustrative), plus a two-row `.table`.
- H2: "Our mistakes are on the record too"
- Rows (Illustrative): "16 Sep 2026 · Withdrawals delayed 1 business day · Cause: a bank holiday in the US that our timeline didn't show · Fix: both holiday calendars now in the exit estimator · Affected: 38 requests" / "12 Sep 2026 · NAV revised · see changelog".
- Line: "If something affects your money, it goes here within [N] business days `TO CONFIRM`, whether or not anyone noticed."
- `link-arrow` "Transparency log" → `/log`.

**9. Methodology (accordion).**
*Purpose:* pre-empt "is this number real?". *Components:* `.accordion` with 5 `details`.
- H2: "How we calculate what you see"
- "What NAV means": "NAV (net asset value) is the value of everything in the basket, minus what it owes, divided by the number of units. It's the price of one unit."
- "How returns are measured": "Time-weighted (TWRR). It measures the basket, not the timing of anyone's deposits. Net of management fees. In US dollars unless labelled ₹."
- "Which exchange rate we use for ₹ figures": "[Source] reference rate on the NAV date `TO CONFIRM`. Shown on every statement."
- "Who checks it": "Administrator `TO CONFIRM` computes it. Auditor `TO CONFIRM` reviews it annually. Report download `TO CONFIRM`."
- "What we will never do": "Remove a month from the history. Restart a track record. Show a period we chose because it looks good."

**10. Routes for checkers (audience router).**
*Components:* `grid-3` `.card-link`.
- H2: "Checking us for someone else?"
- CA: "The tax pack: reporting checklist, the exchange rate behind every figure, a specimen statement. CA sign-off TO CONFIRM." → `/cas`
- Advisor: "What you can earn, what you can and can't say, and the client materials we approve." → `/advisors`
- Institution: "Entity structure, policies and the due-diligence questionnaire (DDQ), on request." → `/institutions`

**11. FAQ grouped by worry.** *Components:* `.tabs` (Where's my money · What it costs · Tax · Getting out · Is this allowed), each panel an `.accordion`.
- Where's my money: "Who holds my money?" → "[Custodian] TO CONFIRM. See every step on How your money moves." / "What if Paraa shuts down?" → "Our written closure commitments are on [Risks]. Legal ring-fencing of your assets: TO CONFIRM."
- What it costs: "Is there a fee I won't see?" → "Every fee is on the receipt above. If it's not there, we don't charge it. Performance fee: TO CONFIRM."
- Tax: "How is this taxed?" → "We'll publish a CA-signed note. Until then, we won't guess. TO CONFIRM."
- Getting out: "How long do withdrawals take?" → "[T+N] business days `TO CONFIRM`. Holidays in India and the US both count."
- Is this allowed: "Is this legal for a resident Indian?" → "The legal route is being confirmed by counsel and will be named here, with the rule it relies on. TO CONFIRM. We don't offer currency speculation." / "How do I check a platform?" → "Use RBI's Alert List. Link below."

**12. Closing CTA.** *Components:* `.card-lg` centred, `.row` of buttons.
- H2: "Seen enough numbers?"
- Line: "Download the full history first. Then the app, if it still makes sense."
- Buttons: `btn-primary` "Download NAV history (CSV)" · `btn-secondary` "Get the app".

### A6. Second page: `/nav` — NAV & performance centre
1. **Header:** H1 "NAV & performance", lede "Every published NAV for every basket, since day one. Download it, check it, quote it back to us." `badge` "Last updated 31 Oct 2026" `Illustrative`.
2. **Basket comparison table** (`.table`): Basket | Currency | NAV | Since inception | Annualised | Max drawdown | Weakest month | Min. amount `TO CONFIRM` | Fee/yr. Baskets 2–3 show "In preparation".
3. **Full NAV explorer:** as in A5 §3, plus a date-range preset row: "Since inception" (default, pre-selected) · "Calendar years" · "Custom". **There is no "1Y best" preset.**
4. **Monthly returns grid** (new layout `month-grid`): rows are years, columns are months, cells coloured `.pos`/`.neg` with text values, and an annual total column. Each annual total = product of (1+monthly) − 1.
5. **Changelog:** the full `diff-row` timeline.
6. **Download:** CSV columns `date,basket,nav_usd,monthly_return,revised(bool),revision_note,signed_by`. The button triggers a client-side Blob download.
7. **Methodology:** the A5 §9 accordion, expanded by default.
8. **Comparisons:** "Compared with what?" A line chart overlay toggle: Basket 1 / USD cash `TO CONFIRM index`. Copy: "If plain dollars in a deposit would have done as well, you should know that. Benchmark: TO CONFIRM."
9. **Disclosure** `nav-centre-v1`, plus the footer.

### A7. Unique ideas
- `UNIQUE:` **Specimen fee receipt** that recalculates for your amount, with TCS kept outside the fee total.
- `UNIQUE:` **NAV changelog** with signer and reviewer on every revision.
- `UNIQUE:` **"Days since last incident" counter** linked to the public log.

### A8. Theme
**Dark** (default tokens). Gold appears only on: the primary CTA fill, the NAV line in the chart, the `eyebrow`, `link-arrow`s, and the active tab. Gold is never used for positive numbers (those are `--positive`), so gold never reads as "gain". In the ledger, everything is `--text`/`--text-muted`. The rule of thumb: at most 3 gold elements visible in any viewport.

### A9. Genericness self-check
| Section | Could it appear unchanged on a competitor site? | Action |
|---|---|---|
| Hero ledger | No: competitors lead with phones or promises, not a table with a "Revised" row | Keep |
| Trust ledger strip | Draft 1 ("Trusted by thousands, secure, regulated") = **yes** | Rewritten to four checkable slots with honest placeholders |
| NAV explorer | Partly (Wealthfront has charts), but none default to since inception with forced drawdown shading | Keep |
| Both ends of the range | No | Keep |
| Fee receipt | No (Wise does it for transfers, nobody for investments) | Keep |
| Custody strip | Draft 1 ("3 easy steps") = **yes** | Rewritten to named hops with "if they fail" |
| Changelog | No | Keep |
| Incident counter | No | Keep |
| Methodology | Partly (Betterment). The "never do" line makes it ours | Keep |
| Router | Yes in structure, no in copy (it names DDQ, and the "can't say" kit) | Keep, with copy as written |
| FAQ | Draft 1 ("Is Paraa safe?") = **yes**, and it broke R1 | Rewritten, grouped by worry |
| Closing CTA | No: it offers a CSV before the app | Keep |

### A10. Compliance notes
- **Return figures (+10.6%, −6.3%)**: dummy. Each sits in a component carrying `Illustrative`. In production they're conditional on audit, TWRR, every basket shown and Compliance sign-off (brief §3.5). The hero stat row must be removable by a config flag if performance can't be shown publicly at all.
- **"Every claim, checkable"**: would be misleading if the slots were filled with a *partner's* registration. The R6 entity-level rule applies.
- **"If they fail" copy**: makes no promise of recovery; it's marked TO CONFIRM.
- **Incident log**: Legal should review what can be disclosed. The "within N days" commitment is a promise, so it must be operationally real.
- **"We don't offer currency speculation"** in the FAQ: it must be true of the confirmed structure. Remove it if counsel says otherwise.

---

## Concept B — "Rupee vs Dollar"

### B1. Thesis
**Once you see what the rupee has done in your own lifetime, in both directions, you can decide about dollars yourself.** Education first. The product appears only after the visitor understands the currency effect.

### B2. Audience
**Primary:** first-time retail investors, aged 25–45, salaried, who have heard "dollar investing" from friends or ads. **Routing:** CAs get the LRS/TCS section (5) and a card. Advisors get a "Use this calculator with clients" card that links to `/advisors` (the shareable calculator is useful to them). Institutions get a footer and nav link only.

### B3. Hero (new layout `calc-hero`)
- **Eyebrow:** The rupee, honestly
- **H1:** What has the rupee done since you were born?
- **Subhead:** Enter your birth year. See what ₹1,000 then is worth in dollar terms today, and the years the rupee won.
- **Primary CTA:** `btn-primary btn-lg` "Run your numbers". It focuses the year input and scrolls it into view on mobile.
- **Secondary CTA:** `btn-ghost` "Why we show both directions" → `#both-ways`
- **Visual: `calc-hero`.** A `.card-lg` on `--bg-alt`, holding:
  - `.field`: label "Your birth year", `.input type=number` (1980–2025, default empty, placeholder "e.g. 1995"), plus a `range` mirror.
  - Output block (it appears on input; before input, it shows a greyed sample for 1995):
    - `.output-big` "**₹2,714**". Line: "₹1,000 in 1995 bought **$30.84**. Those same dollars buy ₹2,714 today."
    - Second line, at the **same size**: "But in **7 of the 31 years** since, the rupee got stronger. The worst was **2007: −8.7%** for anyone holding dollars." (R2/R8)
    - Third line, `.body-sm .muted`: "This is the currency alone, not an investment. Part of the rupee's fall reflects India's higher inflation, so prices here rose too."
  - `year-strip` (new layout): one thin vertical bar per year from the birth year to 2026. Bar height = |yearly change|. Bars above the baseline (rupee weakened) are `--text-muted`; bars below (rupee strengthened) are `--negative`. The birth year is marked with a gold dot. Hovering or focusing a bar shows "2007: ₹41.35 per $ · rupee +8.7% stronger".
  - `badge-accent` `Illustrative` + `.stat-source` "Exchange rates: illustrative annual averages. Live version uses RBI/FBIL reference rates `TO CONFIRM`."
  - `btn-secondary` "Share my result". It generates a PNG via canvas (see the B7 unique).
- **Maths:**
  ```
  usdThen   = 1000 / rate[y]
  inrToday  = usdThen × rate[2026]               // = 1000 × rate[2026]/rate[y]
  strongYrs = count of k in (y+1..2026) where rate[k] < rate[k−1]
  worstYr   = argmin over k of (rate[k]/rate[k−1] − 1)  → shown as rupee % stronger = −(that value)
  ```
  Check: y = 1995 → usdThen 30.84, inrToday 2,714, strongYrs 7, worst 2007 (41.35/45.31 − 1 = −8.7%).
  For y ≥ 2025, show: "Too recent to say much. One or two years of currency moves tell you very little."

### B4. Primary CTA logic
"Run your numbers" asks for **one personal fact** (a birth year, which isn't sensitive). The trust model is *you reached the conclusion yourself*. People believe a number they generated from their own life more than one we tell them. The product ask ("See how Paraa works") comes only after section 3. The app download sits in the closing section, beneath the comparison of cheaper alternatives (section 6), so the person who downloads has already seen the reasons not to.

### B5. Homepage sections

**1. Hero calculator.** As described in B3.

**2. "The rupee, honestly" (`id="both-ways"`).**
*Purpose:* show the 20-year trend *and* its exceptions in one picture. *Components:* `section-alt`, inline SVG line chart (`nav-chart` reused with a rupee series), with the strengthening years shaded `--negative` at 10% and labelled. A `.grid-2` of callouts sits below.
- H2: "Mostly one way. Not always."
- Lede: "Since 2006, the rupee has mostly weakened against the dollar. But it strengthened in 2007, 2010, 2017 and 2021. If you'd needed rupees in one of those years, dollars bought fewer of them."
- `.callout`: "**When it helps:** if you invest ₹1,00,000 and the rupee weakens 5%, your holding is worth about ₹1,05,000 before any investment gain or loss."
- `.callout-warn`: "**When it hurts:** if the rupee strengthens 5%, the same holding is worth about ₹95,000, even if the investment didn't move."
- Source line: "Illustrative annual averages · live: RBI/FBIL reference rate TO CONFIRM · past movements don't predict future ones."

**3. Currency-effect splitter (interactive).**
*Purpose:* teach that the result has two engines, and either can go negative. *Components:* `.grid-2`. Left: an amount `.input` (default ₹1,00,000) and two `range` sliders: "Investment return in US$" (−30% to +30%, default +6%) and "Rupee move" (−15% to +15%, default +3%, labelled at the ends "rupee stronger ← → rupee weaker"). Right: `.output-big` value, plus a stacked `.bar` showing the parts.
- H2: "Two things decide your rupee result"
- **Maths:**
  ```
  total       = (1 + r)(1 + c) − 1
  valueINR    = A × (1 + total)
  assetPart   = A × r
  currencyPart= A × c
  mixPart     = A × r × c        // label: "the two acting on each other"
  ```
  Default check: r = 6%, c = 3% → total +9.18% → ₹1,09,180 = 6,000 + 3,000 + 180.
- **Mirror row (always visible, auto-computed):** "Same investment, if the rupee had moved the *other* way (−3%): **₹1,02,820**." The mirror flips the sign of `c`. If the user sets `c` to 0, the mirror uses −3%.
- Below: a 2×2 `.table` "Four ways a year can go" (r ± 6%, c ± 3%): ₹1,09,180 / ₹1,02,820 / ₹96,820 / ₹91,180. Every cell carries the R2 colouring.
- `.disclosure` `splitter-v1`: "Illustrative. Excludes fees and tax. Not a forecast of any basket."

**4. "What dollars do, and what they don't."**
*Components:* `.grid-2`: a `.check-list` vs an `.x-list`.
- H2: "Dollars are a tool, not a shortcut"
- Do: "Spread your savings across two currencies, not one" · "Match future costs you'll pay in dollars (study abroad, travel, imported goods)" · "Keep their value in dollar terms when the rupee falls"
- Don't: "Make a bad investment good" · "Help if the rupee strengthens while you need rupees" · "Remove market risk. The investment itself can still fall."

**5. LRS limit planner (interactive).**
*Purpose:* practical, and it shows we follow the rules. *Components:* `.field`s and `.bar` meter.
- H2: "How much of your yearly limit does this use?"
- Lede: "LRS (the Liberalised Remittance Scheme) lets each resident send up to US$2,50,000 abroad per financial year, across *all* purposes: study, travel, gifts and investments together. `VERIFY`"
- Inputs: "Already sent abroad this financial year (US$)", default 0 · "Planning to invest (₹)", default 1,00,000 · rate fixed at 88.00 (shown).
- **Maths:** `plannedUSD = planned / 88`, `used = already + plannedUSD`, `left = 250000 − used`, `bar width = used/250000`. If `left < 0`, show a `.callout-warn`: "This would go over your LRS limit for the year. You can't remit more until 1 April." TCS line: "TCS on this remittance: `TO CONFIRM` (rate and threshold changed in recent Budgets; we'll show it once a CA confirms)."
- **Condition:** this section ships only if the confirmed route *is* LRS. Otherwise it's replaced with a "Your route" explainer (config flag `route=lrs|ifsc|other`).

**6. Why not do it yourself? `UNIQUE:` the honest DIY comparison (N8).**
*Purpose:* name the cheaper routes and say when they suit you better. *Components:* `.table`.
- H2: "You don't need us to own dollars"
- Lede: "Here are other ways residents can hold US-dollar assets. Some cost less. Here's when they make more sense."
- Columns: Route | What you do | Typical cost | Who it suits | What it doesn't do.
  - "US-listed ETFs via an LRS broker" | "Open an overseas account, pick funds, rebalance yourself" | "Brokerage + bank conversion `TO CONFIRM`" | "People who'll manage their own allocation" | "No one rebalances for you"
  - "GIFT City (IFSC) funds" | "Invest through an IFSC platform" | "`TO CONFIRM`" | "People who want an India-based regulator in the chain" | "Fewer choices today `VERIFY`"
  - "Indian funds of global funds" | "Buy through any mutual fund app, in rupees" | "Expense ratio `TO CONFIRM`" | "Small amounts, no LRS paperwork" | "May have inflow limits `VERIFY`"
  - "Paraa basket" | "Invest in rupees; we manage a USD-denominated basket" | "See your fee receipt (₹2,472 on ₹1,00,000 a year, Illustrative)" | "People who want it managed and every number published" | "It isn't the cheapest option on this list"
- Closing line: "If one of the first three fits you better, use it. We'd rather you trusted us later than regretted us now."

**7. How Paraa works (product, finally).**
*Components:* `.steps` (3) + `.callout-warn`.
- H2: "If you do want it managed"
- Steps: 1 "Verify yourself (PAN, KYC) in the app." 2 "Add rupees from your bank. They're converted and held in a US-dollar basket. `Route: TO CONFIRM`." 3 "Track the NAV in dollars and in rupees. Withdraw back to the same bank account."
- `.callout-warn`: "We haven't yet named the legal route your money takes. Until we do, this page says so instead of drawing it." → `/how-money-moves`

**8. Rupee & you (learn module cards).**
*Components:* `grid-3` `.card-link`, each with a chapter number `badge` and a read time.
- H2: "Six short chapters on the rupee and you"
- "1 · Why the rupee moves (8 min)" · "2 · Inflation and the exchange rate (7 min)" · "3 · LRS in plain words (6 min)" · "4 · TCS: what it is, why it isn't a fee (5 min)" · "5 · Investment return vs currency return (6 min)" · "6 · When dollars are the wrong answer (5 min)". All link to `/learn#ch-n`.

**9. Questions people ask after running the calculator.** `.accordion`.
- "So the rupee will keep falling?" → "Maybe, maybe not. It fell over most decades and rose in some years. Nobody can tell you which year comes next, and you should doubt anyone who says they can."
- "Is a weaker rupee good for me?" → "Only for money you hold in dollars. For your rupee salary and rupee spending, it usually makes imports and travel cost more."
- "What's the minimum?" → "`TO CONFIRM`."
- "Can my advisor use this calculator with me?" → "Yes. Every result can be shared, and it always shows the years the rupee won."

**10. Closing CTA.** `.card-lg`.
- H2: "Ran your numbers? Here's what to do with them."
- Buttons: `btn-primary` "See how Paraa works" → `/how-money-moves` · `btn-secondary` "Get the app".
- Line: "Or close this tab and buy an ETF. That's a reasonable answer too."

### B6. Second page: `/learn` — "Rupee & you"
1. **Header:** H1 "Rupee & you", lede "Six chapters, about 40 minutes in all. No sign-up. No product pitch until chapter 6, and chapter 6 is about when not to buy." A `.timeline` progress rail on the left (desktop), with chapter anchors.
2. **Ch 1 "Why the rupee moves":** prose plus a `.callout`: "Exchange rates move with inflation gaps, interest rates, trade and capital flows. Here's each one in a sentence." It ends with a 1-question self-check (radio buttons, instant feedback, no storage).
3. **Ch 2 "Inflation and the exchange rate":** an interactive "same basket of goods" toy. Inputs: India inflation `i_in` (default 5%), US inflation `i_us` (default 2.5%), years n. Output: the implied rupee drift ≈ `((1+i_in)/(1+i_us))^n − 1`. Copy: "A falling rupee often just reflects higher prices here. It's not free money. Illustrative relationship, not a forecast."
4. **Ch 3 "LRS in plain words":** the LRS planner from B5 §5, with a worked example: "Priya sends US$8,000 for a course in May. Her limit left for the year: US$2,42,000." (The worked example uses an invented, clearly hypothetical name. That's allowed, because it's an example, not a testimonial; label it "Example".)
5. **Ch 4 "TCS":** a 3-row `.table` (When, How much `TO CONFIRM`, How you get it back), plus "Ask your CA" `.callout`.
6. **Ch 5 "Investment return vs currency return":** the full splitter from B5 §3, plus the stress cases "Rupee crash year" and "Rupee strong year" as preset buttons (c = +15% / −8%).
7. **Ch 6 "When dollars are the wrong answer":** an `.x-list`: "You'll need the money in rupees within 2 years" · "It's your emergency fund" · "You'd sell after a 10% fall" · "You already hold a lot in US assets". Then the DIY comparison table, and only then a `btn-secondary` "If none of these apply: how Paraa works".
8. **Footer + disclosure** `learn-v1`.

### B7. Unique ideas
- `UNIQUE:` **Birth-year rupee calculator** (N1) whose output always includes the years the rupee won and the worst year.
- `UNIQUE:` **"Honest share card."** The shareable PNG (1080×1350, canvas-drawn, light theme) is designed so the downside **can't be cropped out**: the headline number and the "rupee won in 7 of 31 years" line are set in one locked block at equal size, with the `Illustrative` badge inside that block. The caption pre-fills "My rupee since 1995, both directions. paraa.capital/rupee".
- `UNIQUE:` **DIY comparison that recommends competitors** (N8), with Paraa listed last and labelled "isn't the cheapest".

### B8. Theme
**Light** (`<html data-theme="light">`). Background `--bg` white, alternating sections `--bg-alt` (paper #F2F2F2). Gold appears only as a **fill** (CTA buttons, the birth-year dot, the active tab). Gold-coloured text uses `--accent-text` = gold-800 (D6), and it's limited to `eyebrow` and `link-arrow`. Chart lines are `--text` (ink) for the rupee series, so gold never encodes data. Strengthening years are `--negative` (#B91C1C on light). Cards use the light `--shadow`.

### B9. Genericness self-check
| Section | Generic? | Action |
|---|---|---|
| Hero calculator | No: Vested has a returns calculator, but not personal, and it shows one direction only | Keep |
| Rupee honestly chart | Draft 1 showed only the upward trend = **yes** (INDmoney's "Dual Advantage") | Rewritten with shaded strong years + the "When it hurts" callout |
| Splitter | No: the mirror row is ours | Keep |
| Do / don't | Partly. The "don't" list makes it ours | Keep |
| LRS planner | Partly (bank sites have LRS FAQs, not planners) | Keep |
| DIY comparison | No | Keep |
| How Paraa works | Draft 1 ("3 easy steps to global investing") = **yes** | Rewritten with the route placeholder and warning |
| Learn cards | Yes in format (Varsity). The "when dollars are wrong" chapter differentiates | Keep, with that chapter listed explicitly |
| FAQ | No | Keep |
| Closing CTA | No ("buy an ETF" is a reasonable answer) | Keep |

### B10. Compliance notes
- **Historical rates** are permitted with a source and date plus "past is not a guide" (brief §3.5). The prototype values are illustrative and must be replaced with the official series before launch.
- **"₹2,714"** risks reading as an investment return. It's hedged by the "This is the currency alone, not an investment" line, which is fixed in the same block.
- **LRS statements** carry `VERIFY`. The section is behind a route flag, so it can't ship if the route isn't LRS.
- **The DIY table** names product categories, not competitor brands, to avoid comparative-advertising disputes. Costs are TO CONFIRM.
- **The share card** is a marketing asset under ASCI rules. The locked downside and Illustrative badge are mandatory, and no edit mode is offered.
- **The inflation toy** is labelled a relationship, not a forecast.

---

## Concept C — "The Firm"

### C1. Thesis
**Money follows people you can name, check and hold to account.** The site is a register of people, decisions and entities. The product sits behind them.

### C2. Audience
**Primary:** advisors and distributors (MFDs), CAs and institutions (family offices, corporate treasuries), the gatekeepers who bring retail money. **Retail routing:** the hero router (section 2) has an "I'm investing for myself" tab that summarises fees, risks and how money moves, then links to the app. The investor-facing pages are the shared `/how-money-moves`, `/fees` and `/risks`.

### C3. Hero (new layout `register-grid`)
- **Eyebrow:** Paraa Capital · formerly Grade Capital
- **H1:** The people behind your dollars, on the record.
- **Subhead:** Who manages each basket, what each of them has invested alongside you, who signs off the NAV, and which entity answers for it.
- **Primary CTA:** `btn-primary btn-lg` "Talk to us". It opens the `/contact#call` form (section 12).
- **Secondary CTA:** `btn-secondary btn-lg` "Become a partner" → `/advisors`
- **Visual: `register-grid`.** A 2×2 grid (1 column on mobile) of `.card`. Each card holds:
  - A 56px initials monogram circle (`--surface-2`, `--accent-text` initials). Not a photo, per R11.
  - "Name TO CONFIRM" (`h6`) + role (`body-sm .muted`): "Portfolio manager, Basket 1" / "Chief risk officer" / "Head of valuation" / "Compliance officer".
  - "Decides:" one line, e.g. "What Basket 1 holds".
  - "Checked by:" one line, e.g. "Risk officer (veto)".
  - "Own money in Paraa baskets:" `.stat-value` "$48,000" + `badge-accent` `Illustrative` + `.stat-source` "as of 30 Sep 2026 · updated quarterly".
  - `link-arrow` "Credentials and record".
  - A strip under the grid: "Every figure on this register is updated quarterly and signed by Compliance (TO CONFIRM)."

### C4. Primary CTA logic
"Talk to us" asks for a **conversation, not a deposit**. Advisors, CAs and institutions don't sign up from a homepage. They do due diligence through a person. The trust model is *accountability through named humans*: a call with someone whose name and stake are on the register converts the gatekeeper, and the gatekeeper converts the retail clients. "Become a partner" splits off advisors, who have a self-serve path. Retail visitors are never asked to "talk to us". Their tab offers the app.

### C5. Homepage sections

**1. Hero register.** As described in C3.

**2. "Who are you here for?" (audience router).**
*Components:* `.tabs` with 4 tabs: Advisor · CA · Institution · Investing for myself. Each panel is a `.grid-2`: copy on the left, a `.check-list` "What you'll find" and one CTA on the right.
- Advisor: H3 "Bring clients to a manager you can stand behind." "Commission schedule, a compliance kit that tells you what not to say, and client materials we pre-approve." CTA "See the partner programme".
- CA: H3 "A structure you can explain to a client." "Tax treatment (CA-signed: TO CONFIRM), a reporting checklist, the exchange rate behind every figure." CTA "Get the tax pack".
- Institution: H3 "Due diligence, documented." "Entity chart, policies, auditor and custodian letters, DDQ." CTA "Request the DDQ".
- Investing for myself: H3 "You're in the right place too." "Read how your money moves, what it costs in rupees and what could go wrong. Then use the app." CTA `btn-secondary` "Start with the risks" → `/risks`.

**3. Who decides what (governance table).**
*Components:* `.table`, with a `badge` "Org chart" `link-arrow`.
- H2: "No decision here belongs to one person"
- Columns: Decision | Made by | Checked by | How often | Where you can see it
  - "What a basket holds" | "Portfolio manager" | "Risk officer (can veto)" | "Monthly" | "Monthly letter"
  - "The NAV" | "Fund administrator (independent) TO CONFIRM" | "Auditor, annually TO CONFIRM" | "Daily/weekly TO CONFIRM" | "NAV centre"
  - "Fee changes" | "Board" | "Notice to investors, [N] days TO CONFIRM" | "As needed" | "Transparency log"
  - "Closing a basket" | "Board" | "Written conditions, published in advance" | "As needed" | "Risks page"
  - "Approving advisor materials" | "Compliance officer" | "Logged and kept [5] years" | "Each item" | "Advisor kit"

**4. Who we are legally (`entity-tree`).**
*Purpose:* replace the old bare Delaware address with a plain structure. *Components:* new layout `entity-tree`: a vertical tree of `.card` nodes joined by 1px `--border-strong` connectors. Each node shows: Entity name `TO CONFIRM` · Country · What it does · Regulator + number `TO CONFIRM` · `link-arrow` "Check".
- H2: "Every company in the chain, and what each one does"
- Nodes: "Paraa Capital [India entity]: the company you sign up with" → "[Fund / investment entity], [jurisdiction]: holds the basket" → "[Custodian]: keeps the assets" + a side node "[Administrator]: calculates the NAV" + a side node "[Auditor]: checks the accounts".
- `.callout-warn`: "Which of these entities exist, and where, is being confirmed with counsel. We'll publish the tree only with real names and registration numbers."

**5. Skin in the game. `UNIQUE:` skin-in-the-game register (N6), with a quarterly change column.**
*Components:* `.table`.
- H2: "What we've each put in, and whether we've taken it out"
- Lede: "If the people running a basket won't hold it, you shouldn't either. Updated every quarter. A sale shows up here, in red."
- Columns: Person | Role | Invested (US$) | Change this quarter | Since | Last updated
  - "Initials A. · TO CONFIRM" | PM, Basket 1 | $48,000 | +$5,000 | Jul 2024 | 30 Sep 2026
  - "Initials B. · TO CONFIRM" | Risk officer | $22,000 | $0 | Jan 2025 | 30 Sep 2026
  - "Initials C. · TO CONFIRM" | Director | $1,10,000 | **−$10,000** `.neg` + note "Sold for a house purchase, disclosed 2 Aug 2026" | Jul 2024 | 30 Sep 2026
  - "Initials D. · TO CONFIRM" | Compliance officer | $0 | — | — | "Compliance staff don't invest, to stay independent"
- All rows `Illustrative`. A footer line: "Total team holding: $1,80,000 (Illustrative). Shown in US$ because that's what the baskets are valued in."

**6. Partner programme teaser.**
*Components:* `.split`: copy on the left, a mini earnings `.card` on the right (static numbers, linking to the full model on `/advisors`).
- H2: "For advisors: what you earn, written down"
- Key lines: "Trail commission on invested amounts, paid [monthly] TO CONFIRM." "No targets. No contests. No incentive to churn your clients."
- Mini card: "20 clients × ₹5,00,000 each × 0.50% trail = **₹50,000 a year**" `Illustrative` "Rate TO CONFIRM. Assumes amounts stay flat. We don't assume market gains."
- CTA `link-arrow` "Full earnings model" → `/advisors#model`.

**7. "Say this, not that." `UNIQUE:` the public advisor script (N11).**
*Purpose:* published openly, so investors know what an advisor must not promise. *Components:* new layout `say-not-say`: a `.table` with two columns, "Say" (with a `.check-list` style marker) and "Never say" (with an `.x-list` style marker).
- H2: "What our advisors are allowed to tell you"
- Lede: "This is the card every partner signs. It's public, so if you hear the right-hand column from anyone using our name, tell us."
- Pairs:
  - "Your investment is held and valued in US dollars." / "You'll earn dollar appreciation."
  - "If the rupee strengthens, your rupee value falls." / "The rupee only goes down."
  - "Here's the full NAV history, including the bad months." / "It's returned X% (with a period they picked)."
  - "Here are the fees in rupees for your amount." / "There are no fees."
  - "I'm a distributor; I'm paid by Paraa. Here's how much." / "I'm your adviser" (unless SEBI-registered as one).
  - "I can't tell you how it's taxed; ask your CA. Here's the tax pack." / "It's tax-free" or "It avoids the 30% tax."
  - "Withdrawals take about [N] business days." / "You can take it out anytime, instantly."
- `btn-secondary` "Report an advisor" → `/grievances#advisor`.

**8. For CAs: tax pack teaser.**
*Components:* `.card-accent` with a `.check-list`.
- H2: "For CAs: the pack you'd otherwise have to ask for"
- List: "Tax treatment note, signed by [CA firm] `TO CONFIRM`" · "Reporting checklist: foreign assets schedule, foreign tax credit form, TCS credit `VERIFY under Income-tax Act, 2025 numbering`" · "The exchange rate used for every statement date, with its source" · "A specimen annual statement" · "Referral rules for CAs `TO CONFIRM`"
- Line: "We won't describe the tax treatment until a CA has signed it."
- CTA "Request the tax pack" → `/cas`.

**9. For institutions: DDQ.**
*Components:* `.grid-2`: a `.check-list` of DDQ contents + a short form (`.field`s).
- H2: "For institutions: due diligence on request"
- Contents: "Entity chart and constitutional documents" · "Valuation, conflicts of interest and AML policies" · "Auditor and custodian confirmation letters" · "Business continuity plan" · "Last 12 monthly letters" · "Capacity, liquidity terms and fees per basket".
- Form fields: Organisation · Your name · Role · Work email · "What are you evaluating?" (`.select`: Treasury allocation / Family office / Wealth platform / Other). Button `btn-primary` "Request the DDQ". Confirmation: "Thanks. A named person replies within [2] business days `TO CONFIRM`."

**10. Questions we've been asked by regulators and auditors. `UNIQUE:` regulator-question log (N9).**
*Components:* `.accordion`, each `summary` showing the question, the asker type (`badge`) and the date.
- H2: "Hard questions we've already answered"
- Lede: "Where we're allowed to share them: the questions auditors, regulators and institutional reviewers asked us, and what we said."
- Entries (Illustrative): "`Auditor` · Aug 2026 · How do you price a holding when its market is closed?" → "We use the last traded price and flag it in the changelog if it's revised. Policy §4." · "`Institutional reviewer` · Jun 2026 · Can one person change the NAV?" → "No. The administrator computes it, and two of our staff must approve any revision." · "`Regulator` · TO CONFIRM" → "Published only where disclosure is permitted."
- `.disclosure`: "We publish only what we're permitted to. Absence of an entry doesn't mean no questions were asked."

**11. Letters from the managers.**
*Components:* `grid-3` `.card-link`: date `badge`, title, author monogram, 2-line excerpt.
- H2: "In their own words, every month"
- Cards (Illustrative): "Oct 2026 · Why we cut Basket 1's cash to 8%" · "Sep 2026 · A strong month, and why we didn't chase it" · "Aug 2026 · The NAV revision, explained".
- `link-arrow` "All letters" → `/letters`.

**12. Talk to us (`id="call"`).**
*Components:* `.split`: left, "Who you'll speak to" (a monogram card with "Partner team lead: Name TO CONFIRM"); right, a form.
- H2: "Talk to a named person, not a sales queue"
- Form: Name · Phone · Email · "I am a" (`.select`: Advisor / CA / Institution / Investor) · "Preferred time" (`.select`) · message. Submit `btn-primary` "Request a call". Under the button: "We'll never ask for money, OTPs or passwords on a call. Official numbers are listed on Security." (link)
- Investors who pick "Investor" see an inline note: "Calls for individual investors are about how the product works, not personal advice."

### C6. Second page: `/advisors` — For advisors & distributors
1. **Header:** H1 "Partner with a manager you can explain", lede "What you earn, when you're paid, what you may say, and the materials we approve for you." CTA `btn-primary` "Apply to partner" + `btn-secondary` "Download the compliance kit (PDF)".
2. **Who can partner:** a `.check-list`: "AMFI-registered distributors (ARN) `VERIFY`" · "CAs, under the CA referral rules `TO CONFIRM`" · "SEBI-registered advisers, where fee-only rules allow `VERIFY`". Plus a `.callout-warn`: "If you aren't registered as an investment adviser, you're a distributor. You may explain the product; you may not give personal advice."
3. **Earnings model (interactive, `id="model"`).** Sliders: clients N (1–200, default 20), average invested per client T (₹50,000–₹50,00,000, default ₹5,00,000), trail rate p (`Illustrative` 0.50%/yr, shown read-only with `placeholder-tag` TO CONFIRM).
   **Maths:** `annual = N × T × p`, `monthly = annual / 12`, `aum = N × T`. Check: 20 × 5,00,000 × 0.005 = ₹50,000/yr, ₹4,167/month, client total ₹1 crore.
   Fixed caption: "Assumes client amounts stay flat. We don't model market gains, because that would be a prediction about your clients' returns." An upfront commission row reads `TO CONFIRM`.
4. **Payout timeline:** `.timeline`: "Month-end: trail accrues" → "[Day 10] TO CONFIRM: statement in the advisor app" → "[Day 15] TO CONFIRM: paid to your bank, TDS deducted `VERIFY`".
5. **Say this, not that:** the full card from C5 §7, plus a "Sign the card" step in onboarding.
6. **Approved materials:** a `grid-3` of `.card`s (Client one-pager · Fee receipt for your client's amount · Birth-year rupee card, both directions). Each card carries an "Approved by Compliance, ref [ID] TO CONFIRM, valid until [date]" `badge`.
7. **Advisor app walkthrough:** `.steps` (4): "Invite a client by link" · "Client completes KYC themselves (you never handle OTPs)" · "See their holdings and statements" · "Download your payout statements".
8. **What we don't do for partners:** an `.x-list`: "Sales contests or targets" · "Higher pay for selling one basket over another `TO CONFIRM`" · "Approve WhatsApp group promotions".
9. **Apply:** a form (Name, ARN `VERIFY`, City, Clients served, Email). Confirmation copy: "A partner manager (named in your confirmation email) replies within [3] business days `TO CONFIRM`."

### C7. Unique ideas
- `UNIQUE:` **Skin-in-the-game register** with a quarterly change column that shows sales in red with a reason.
- `UNIQUE:` **Public "say this, not that" card** plus a "Report an advisor" route.
- `UNIQUE:` **Regulator and auditor question log**.

### C8. Theme
**Dark**, with **document-style inset panels**: tables and the entity tree sit on `--surface` with 1px `--border` and generous padding, so the page reads like a well-set filing. Gold is used only for: the CTA fills, monogram initials, `eyebrow`, active tab and `link-arrow`. Gold never colours money figures. The register's numbers are `--text`, and sales are `--negative`.

### C9. Genericness self-check
| Section | Generic? | Action |
|---|---|---|
| Hero register | Draft 1 ("Meet our expert team" with headshots) = **yes** (Marcellus) | Rewritten: decides / checked by / own money, no photos |
| Router tabs | Partly. The investor tab "start with the risks" differentiates | Keep |
| Governance table | No | Keep |
| Entity tree | No (nobody in the category shows it) | Keep |
| Skin in the game | No | Keep |
| Partner teaser | Draft 1 ("Earn up to ₹X lakh!") = **yes**, and non-compliant | Rewritten: flat-AUM formula, "no contests" |
| Say/not say | No | Keep |
| CA pack | No | Keep |
| DDQ | Partly (institutional sites have "contact us") | Keep: the contents list is the difference |
| Regulator Q&A | No | Keep |
| Letters | Partly (Marcellus gates them). Ours are ungated, and their titles admit things | Keep |
| Talk to us | Draft 1 ("Free consultation") = **yes** (the old site's CTA) | Rewritten: named person + the "never ask" line |

### C10. Compliance notes
- **Advisor earnings** are conditional per brief §3.5: illustrative, with assumptions shown and no implied investor returns. The flat-AUM rule enforces that.
- **"Distributor, not adviser"** language must match each partner's actual registration. The ARN requirement is `VERIFY`.
- **Skin-in-the-game figures** are personal financial disclosures. They need written consent from each person, and Compliance sign-off each quarter.
- **The regulator Q&A** must never imply regulatory endorsement ("SEBI asked us X" ≠ "SEBI approved us"). Legal checks each entry before it's published.
- **The call form** for investors: the "not personal advice" note guards against unregistered advice.
- **"No incentive to churn"** is only true if the trail structure has no upfront component. It's tied to the TO CONFIRM.

---

## Concept D — "Downside First"

### D1. Thesis
**If you understand how you could lose money here, you'll make a better decision, and you'll believe whatever we say next.** Risk is the front door. The app is what's behind it.

### D2. Audience
**Primary:** mobile-first retail investors, including **existing Grade Capital app users** arriving after the rebrand. **Routing:** advisors, CAs and institutions use the "For partners" nav. One line in section 10 also points advisors to the risk brief as a client-education link.

### D3. Hero (new layout `loss-sim-hero`)
- **Eyebrow:** Read this before you invest
- **H1:** Here's how you could lose money with us.
- **Subhead:** Three things push your rupee value down: the investment falls, the rupee strengthens, or both. Two minutes on the risks, then the app.
- **Primary CTA:** `btn-primary btn-lg` "Read the 2-minute risk brief" → `/risks#brief`
- **Secondary CTA:** `btn-ghost` "I've read it: get the app" → `#app`. It's deliberately a ghost button, a lower-weight option.
- **Visual: `loss-sim-hero`.** A `.card-lg` holding the "What could go wrong" simulator.
  - Inputs: amount `.input` (default ₹1,00,000) · "The investment, in US$" `range` (−30% to +30%, **default −15%**) · "The rupee" `range` (−15% to +15%, **default −5% = rupee strengthens**; end labels "stronger ← → weaker") · fee drag fixed at 2.5%/yr, shown as text with `Illustrative`.
  - Four preset `.badge` buttons: "Investment falls" (−15, 0) · "Rupee strengthens" (0, −5) · "Both" (−15, −5; the default) · "Both go your way" (+10, +5).
  - **Maths:**
    ```
    afterAsset   = A × (1 + s)
    afterFX      = afterAsset × (1 + c)
    fees         = afterFX × 0.025
    end          = afterFX − fees
    assetEffect  = A × s ; fxEffect = afterAsset × c ; feeEffect = −fees
    ```
    Default check: ₹1,00,000 → asset −₹15,000 → currency −₹4,250 → fees −₹2,019 → **₹78,731**. "Both go your way" → **₹1,12,613**.
  - Output: `.output-big` "₹78,731", then "You'd have lost **₹21,269** in a year like this." A waterfall of three `.bar` rows (asset, currency, fees) coloured `--negative`/`--positive` by sign, with ₹ labels.
  - Fixed line: "Illustrative. A bad year can be worse than this. These sliders stop at −30% only to stay readable." Plus `badge-accent` `Illustrative`.
  - `aria-live="polite"` on the output.

### D4. Primary CTA logic
The CTA asks for **two minutes of reading before anything else**. The trust model is *informed consent*. Every competitor's app CTA appears before any risk text, so making the risk brief the gate signals the opposite. The download is never hidden. It's a ghost button in the hero, and the full app section comes after the risks. The brief page ends with the app store buttons, so the main path is: simulator → brief → download. For existing Grade users, the rebrand bar plus section 10 come first, because their risk is phishing during the switch.

### D5. Homepage sections

**1. Hero simulator.** As described in D3.

**2. Five ways this goes wrong (risk cards).**
*Components:* `grid-3` (the last row has 2 cards) of `.card`. Each card: `h5` title, a `.meter` with 5 segments (how often it matters, our judgement, `Illustrative`), a "What it looks like" line and a "What we do about it" line.
- H2: "Five ways you could lose money, in order of how often they bite"
- "Currency": meter 4/5. "The rupee strengthens 5% in a year. Your basket is flat in dollars; you're down 5% in rupees." / "We can't control it. We show it on every statement."
- "Market": meter 4/5. "The basket's holdings fall. Our weakest month so far was −6.3% (Illustrative)." / "Published limits on what a basket may hold `TO CONFIRM`."
- "Getting out": meter 2/5. "You need money in a week, but withdrawals take [N] business days, longer around holidays." / "Exit estimator below. Holiday calendars for both countries."
- "A company in the chain fails": meter 1/5. "A bank, administrator or custodian has a problem." / "Every party named; what happens is on How your money moves `TO CONFIRM`."
- "Rules change": meter 2/5. "Indian rules on sending money abroad, or its tax, change." / "We follow the rule changes and tell you in the log. We can't promise rules stay the same."

**3. Am I a fit? (quiz that can say no).**
*Components:* a `.card-lg` with 5 radio-group `.field`s, one question per screen on mobile (a stepper), with the result card.
- H2: "This might not be for you. Let's find out."
- Questions and scoring (`R` = red, `A` = amber, `G` = green):
  1. "When might you need this money?" Within 1 year **R** · 1–3 years **A** · Over 3 years **G**
  2. "If it fell 15%, what would you do?" Sell **R** · Worry, but wait **A** · Wait, or add more **G**
  3. "Will you spend this money in rupees soon (a home, a wedding)?" Yes, within 2 years **A** · No **G**
  4. "Is this your emergency fund, or borrowed money?" Yes **R** · No **G**
  5. "Do you already hold US-dollar assets?" A lot **A** ("Check the cheaper DIY routes first" → `/learn#ch-6`) · Some or none **G**
- Result: any **R** → "**Not for you right now.**" + the reason for each R answer, e.g. "Money you need within a year shouldn't sit in something that can fall 15%." with no app CTA. Otherwise any **A** → "**Possibly. Weigh these first:**" + the reasons + CTA "Read the risk brief". All **G** → "**It could fit.** Read the 2-minute brief before you decide." Answers are not stored or sent anywhere. Say so: "Your answers stay on this page."

**4. Stress-test archive. `UNIQUE:` stress-test archive (N10), including a calm-year rupee loss.**
*Components:* `.table` + `.disclosure`.
- H2: "How Basket 1 might have done in years that hurt"
- Lede: "Basket 1 didn't exist then. These are simulations: today's rules applied to old prices. A simulation isn't a track record."
- Columns: Episode | Dates | Rupee move | Simulated basket (US$) | Simulated in ₹ (all `Illustrative` · Simulated):
  - "Global financial crisis" | Sep 2008–Mar 2009 | rupee −18% (weaker) | −14.0% | **+1.5%**
  - "Taper tantrum (rupee crash)" | May–Aug 2013 | rupee −19% (weaker) | −4.0% | **+14.2%**
  - "Covid crash" | Feb–Mar 2020 | rupee −6% (weaker) | −9.0% | **−3.5%**
  - "Calm year, strong rupee" | Jan–Jul 2017 | rupee +6% (stronger) | +3.0% | **−3.2%**
  - ₹ column maths: `(1 + basket) × (1 + usdInrChange) − 1`, where the USD/INR change is +18%, +19%, +6% and −6% respectively. Show the formula in the table caption.
- Key line: "Notice the last row: you can lose money in rupees in a year when nothing went wrong."
- `.disclosure` `stress-v1`: "Simulated, Illustrative. Method: [description] `TO CONFIRM`. Simulations use hindsight and can't capture costs or decisions we would really have made."

**5. And what can go right (balance section).**
*Components:* `.grid-2` `.callout` pairs at the same size (R8).
- H2: "The other side, at the same size"
- `.callout`: "If the rupee weakens and the investment rises, both help: +10% and +5% make about +15.5% in rupees, before fees." · `.callout-warn` next to it: "The same two numbers in reverse, −10% and −5%, make about −14.5%."
- Line: "We can't tell you which one you'll get. Nobody honest can."

**6. Kill-switch commitments. `UNIQUE:` pre-written closure conditions (N12).**
*Components:* `.timeline`, where each item has a condition (bold), what happens and a timeline.
- H2: "When we'd close a basket, written before we need to"
- Lede: "Most funds decide this in a crisis. We've decided now, and we'll log any change to this list."
- Items (all thresholds `TO CONFIRM`):
  - "**If a basket's assets stay below US$[X] for 3 months**: it stops taking new money. Within [30] days we return your money at NAV, minus no exit fee."
  - "**If we lose our custodian and can't appoint another within [60] days**: we stop new money at once, and return assets at NAV."
  - "**If a rule change makes the basket impossible to run as described**: we tell you within [5] business days, then follow the regulator's instruction."
  - "**If we decide to shut down the company**: [N] days' notice, all baskets returned at NAV, statements kept available for [8] years."
- `link-arrow` "Change history for this list" → `/log#commitments`.

**7. Exit timeline estimator (interactive).**
*Components:* `.field` date input (default today) + a `.steps` output with computed dates.
- H2: "When would my money reach my bank?"
- **Behaviour (prototype values, all `TO CONFIRM`):** cut-off 3 pm IST. A request after the cut-off or on a non-business day rolls to the next business day `T`. NAV date = `T`. Proceeds settle in US$ at `T + 2` business days (US calendar). Conversion and credit to your bank at `+ 2` business days (Indian calendar). A business day = Mon–Fri, excluding the holiday arrays `IN_HOLIDAYS` and `US_HOLIDAYS` (seed each with 4 sample 2026 dates, labelled Illustrative).
- Output: 1 "Request counted on Tue 3 Nov 2026" · 2 "Priced at that day's NAV" · 3 "Dollars settle by Thu 5 Nov" · 4 "Rupees in your bank by **Mon 9 Nov**". The worked check uses request date Mon 2 Nov 2026 after 3 pm, with no holidays.
- Line: "Exit fee: 1% if you've held under 12 months, otherwise none (Illustrative)."

**8. The monthly letter, with what we got wrong. `UNIQUE:` mandatory "three things we got wrong" section (N4), shown as a template rule.**
*Components:* `.card-lg` styled as a letter excerpt (`prose`, monogram signature), with a three-item `.x-list` inset.
- H2: "Every letter has to include our mistakes"
- Excerpt (Illustrative, Oct 2026): "Basket 1 rose 0.8% in dollars in October, but fell 0.4% in rupees as the rupee firmed. Three things we got wrong this month:" `.x-list`: "We held too much cash into a rally, which cost about 0.3%." · "Our September letter said rupee weakness would continue. It didn't." · "Two withdrawal requests were delayed by a missed US holiday (now fixed; see log)." Signature: "Initials A., Portfolio manager (name TO CONFIRM)".
- Line: "If a letter ever has fewer than three, it says why." `link-arrow` "Read all letters".

**9. Get the app (`id="app"`).**
*Purpose:* the app flow, with the risk step visible. *Components:* new layout `app-flow-rail`: 5 annotated screen frames (rounded `--r-xl` outlines, with simplified wireframe UI drawn in CSS, **no photographic phone mock-up**), joined by a horizontal rail that scrolls with snap on mobile.
- H2: "What the app asks you, in order"
- Frames: 1 "Phone number + OTP" ("We'll never ask for this OTP anywhere else.") · 2 "PAN & KYC" · 3 "**The risk check**" (highlighted with `.card-accent`): "The same 5 questions as above. A red answer pauses your sign-up." `TO CONFIRM that the app implements this` · 4 "Add rupees from your own bank account" ("Only from an account in your name.") · 5 "Your holding, in US$ and ₹, side by side".
- CTA row: app store buttons (official badges, links `TO CONFIRM`) + `btn-secondary` "Not yet: read the brief" → `/risks#brief`.

**10. Moving from Grade Capital? + official channels.**
*Components:* `.grid-2`: left, a `.steps` list; right, a `.card` "Platform checker".
- H2: "Coming from Grade Capital? Check before you tap."
- Steps: "1 Grade Capital is now Paraa Capital. What carries over: `TO CONFIRM`." · "2 Only download from the official store links on this page." · "3 We will never ask for your OTP, PIN or a transfer to a personal account, by call, SMS or WhatsApp."
- Platform checker: `.input` "Name of a platform you were offered" + `btn-secondary` "Check". Behaviour: it **does not** claim to verify anything itself. It opens a result panel: "Search this name on: RBI's Alert List [link] · SEBI's intermediary search [link]. If it's on the Alert List, don't send money. Not finding it there doesn't make a platform authorised." (Official URLs `TO CONFIRM`.) Advisors line: "Advisors: send clients the 2-minute brief before the first call."

**11. Closing CTA.**
- H2: "Two minutes now, or a surprise later."
- Buttons: `btn-primary` "Read the 2-minute risk brief" · `btn-ghost` "Get the app".

### D6. Second page: `/risks` — What could go wrong (with `#brief`)
1. **The 2-minute brief (`id="brief"`).** H1 "The 2-minute risk brief". Then a `badge` "About 400 words · 2 min". Seven numbered paragraphs (`.steps`), each at most 2 sentences:
   1. "You can lose money. Some of what you put in may not come back."
   2. "Your investment is held and valued in US dollars. A stronger rupee lowers its rupee value, even if the investment didn't move."
   3. "The investment itself can fall. Basket 1's weakest month was −6.3% and its deepest fall was −11.8% (Illustrative)."
   4. "Both can happen at once. In a year like that, ₹1,00,000 could become about ₹78,700 (Illustrative)."
   5. "Getting out takes [N] business days `TO CONFIRM`, and costs 1% if you've held under 12 months (Illustrative)."
   6. "Your money passes through [named companies] `TO CONFIRM`. If one fails, here's what happens: [link]."
   7. "Rules on sending money abroad and on tax can change. We can't promise they won't."
   Then the end block: "That's it. If any of these is a deal-breaker, stop here, and that's a good outcome." Then `btn-primary` "Get the app" + app store badges + `btn-secondary` "Take the fit quiz".
2. **Full simulator:** the hero simulator, plus a "Time" slider (1–5 years) that compounds the inputs yearly: `end = A × ((1+s)(1+c)(1−0.025))^years`.
3. **Each risk in depth:** an `.accordion` with the five risks from D5 §2, each with: what it is · a worked ₹ example · what we do · what we can't do.
4. **Stress-test archive:** the full table plus the method `TO CONFIRM`.
5. **Kill-switch commitments**, plus their change history.
6. **Limits we set ourselves:** a `.table` (rule | limit `TO CONFIRM` | checked by). Example rows: "Most in any one holding", "Least in cash", "No borrowing to increase positions".
7. **What we don't do:** an `.x-list`: "Borrow to amplify returns" · "Promise a return" · "Run WhatsApp or Telegram tip groups" · "Take money from accounts not in your name".
8. **Full risk disclosure:** the shared `.disclosure` `global-risk-v1`, expanded, plus the link to the legal PDF.

### D7. Unique ideas
- `UNIQUE:` **Stress-test archive** that includes a calm year with a rupee-strength loss.
- `UNIQUE:` **Kill-switch commitments** with a public change history.
- `UNIQUE:` **Letters with a mandatory "three things we got wrong"** rule.
- `UNIQUE:` **An in-app risk check that can pause sign-up**, previewed on the marketing site (it depends on the app team).

### D8. Theme
**Dark.** Risk colours carry the meaning: `--negative` for losses in the simulator and stress table, `--positive` only for gains. Gold appears on **CTAs and the brief's step numbers only**, plus the highlighted risk-check frame border. Gold never colours a gain, so "gold = go" and "green = gain" stay separate signals. The `.meter` "on" segments use `--accent` (the component default). That's allowed here, because meters show our judgement, not money.

### D9. Genericness self-check
| Section | Generic? | Action |
|---|---|---|
| Hero simulator | No: competitors' calculators default to gains | Keep |
| Five risks | Draft 1 (footer-style "Investments are subject to market risks") = **yes** | Rewritten as ranked cards with ₹ examples |
| Fit quiz | No: it can return "not for you" without an app CTA | Keep |
| Stress archive | No | Keep |
| What can go right | No (mirrored at equal size) | Keep |
| Kill switch | No | Keep |
| Exit estimator | No | Keep |
| Letter excerpt | No | Keep |
| App section | Draft 1 = phone mock-up hero, **yes** | Rewritten as a wireframe rail with the risk step highlighted |
| Grade → Paraa | Partly (anti-phishing notices exist: Zerodha). The platform checker differentiates | Keep |
| Closing CTA | No | Keep |

### D10. Compliance notes
- **Simulations** are the highest risk in this concept. SEBI scrutinises hypothetical performance. Every row is labelled "Simulated · Illustrative", the method is shown, and the "isn't a track record" line is fixed. Compliance may require removing the ₹ column or the whole section. Build it behind a flag (`stress=on|off`).
- **"Within [30] days we return your money"** and the other kill-switch items are binding promises. Legal must confirm they're operationally possible before any number replaces a placeholder.
- **"No borrowing to increase positions"** must be true for every basket. It replaces "no leverage" (R1).
- **The in-app risk check** must be built in the app before the site describes it. Until then, frame 3 shows the `placeholder-tag`.
- **The platform checker** says explicitly that it verifies nothing itself, which avoids implying regulator endorsement.
- **The ₹78,731 / ₹1,12,613 pair**: both outcomes are shown via presets, so the simulator can't be screenshot as one-directional promotion. The default state (a loss) is what any screenshot of the untouched page shows.

---

## Cross-concept summary (for the build lead)

| | A — The Open Book | B — Rupee vs Dollar | C — The Firm | D — Downside First |
|---|---|---|---|---|
| Belief | Check every number | Understand the currency yourself | Name the people | Know the downside |
| Hero element | NAV ledger table | Birth-year calculator | People register | Loss simulator |
| CTA | See every number first | Run your numbers | Talk to us / Become a partner | Read the 2-min risk brief |
| Theme | Dark | **Light** | Dark, document panels | Dark, risk colours |
| Second page | `/nav` | `/learn` | `/advisors` | `/risks` |
| Unique | Fee receipt, NAV changelog, incident counter | Birth-year calc, honest share card, DIY comparison | Skin-in-game register, say/not-say card, regulator Q&A | Stress archive, kill switch, "three wrongs" letters, in-app risk check |
| New layouts | `ledger-hero`, `nav-chart`, `receipt-card`, `custody-strip`, `diff-row`, `month-grid` | `calc-hero`, `year-strip` | `register-grid`, `entity-tree`, `say-not-say` | `loss-sim-hero`, `app-flow-rail` |
| Biggest compliance dependency | Whether performance can be published at all | Confirmed legal route (the LRS flag) | Personal-disclosure consent; partner registration | Simulations; binding closure promises |

**Shared dependencies (block launch for every concept):** the confirmed legal route (B6), the entity and registration list, the auditor and custodian names, the fee schedule, the withdrawal timeline, and a CA-signed tax note. Until each one lands, its slot shows a `placeholder-tag`. It is never invented.
