# Content rules: site map, footer/legal, copy rulebook, dataset

These are §0 ("Shared foundations") of the round-1 spec `02-concepts.md`, kept because the
site still follows them; §0.3 is **binding**. Section numbers are unchanged so code comments
like "§0.2" still resolve.

**Round 2 overrides:** all basket NAV data was removed. Ignore the `/nav` row and "NAV" nav
item in §0.1 and the Basket 1 NAV series in §0.4 (see `build-brief.md`, "Removed: don't
reintroduce").

**Round 3 overrides:** the site sells one international basket (US stocks, gold, crude oil), so
the three-basket names and the fee schedule in §0.4 no longer apply. R14 stands: the ASCI line
appears once, verbatim, in the footer legal block, and nowhere else. The tax position, the CA
advisors and everything still `TO CONFIRM` are listed in `build-brief.md`, ROUND 3.

Some references below point at round-1 files that are no longer in the tree: CSS class names
(`.site-footer`, `placeholder-tag`, …) from `shared/`, "brief §x" (`01-research-brief.md`),
B1–B9 / D1–D7 (`ASSUMPTIONS.md`) and Concepts A–D. Read any of them with
`git show 2194970:<file>`. In the Next.js site, `placeholder-tag` is `<ToConfirm/>`, the
`Illustrative` badge is `<Illustrative/>` and `.disclosure` is `<Disclosure/>`.

## 0.1 Shared site map

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

## 0.2 Shared footer / legal block

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

## 0.3 Global copy rulebook (binding on every concept)

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

## 0.4 Shared illustrative dataset (use it everywhere so the numbers agree across pages)

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
