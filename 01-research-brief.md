# 01 — Research Brief: Paraa Capital website

*Research agent output · prepared 2 Nov 2026 · for the founder and the build team*

> **How to read this:** Section 1 covers today's grade.capital. Section 2 covers 15 sites we can learn from. Section 3 covers the Indian rules that limit what we can say. Sections 4–5 hold the ideas. Anything marked **[VERIFY]** needs a check by Compliance or a lawyer before it goes live. This brief is research, not legal advice.

---

## Executive summary

1. **The current site is a crypto-derivatives pitch.** Its page title says "India's First Crypto Derivatives Fund", the hero says "India's #1", and it shows undefined return figures ("680% growth since inception", "100% delivered in last 2 years"). It also claims "No 30% Crypto Tax", and a "Registered with:" heading has nothing under it. Every one of these is a trust or compliance risk. None should carry over.
2. **The product pivot (USD/forex, no crypto) is legally delicate.** For resident Indians, "forex trading" is legal only in permitted pairs on recognised Indian exchanges, through SEBI-registered brokers. Since May 2024 it also needs a real underlying exposure. LRS money **cannot** be used for margin or forex trading abroad. RBI publishes an Alert List of more than 90 illegal forex platforms.
3. **Implication:** the site must never say "forex trading", "trade currencies", "leverage" or "CFD". The honest frame is **"USD-denominated investing"**: your money is held and measured in dollars, so a weaker rupee helps you and a stronger rupee hurts you. The legal structure behind that sentence must be confirmed by counsel first. **[VERIFY]**
4. **Performance claims are the biggest single risk.** SEBI's IA/RA and PMS advertising codes ban implied guarantees, cherry-picked periods and superlatives ("#1", "best"). PMS returns must be shown as TWRR against a benchmark. Unregistered entities get no free pass. They attract more scrutiny.
5. **Every competitor uses the same trust toolkit:** user counts, "₹0 fees", app-store stars, logo walls of press mentions and footer disclaimers. That toolkit is generic. Big players already own it, so Paraa cannot win on it.
6. **What almost nobody does well:** show losses, publish an audited NAV history, explain where the money physically sits, or put a real-money example next to the fees. Kraken's proof-of-reserves, Wise's fee breakdown and Zerodha's "no gimmicks" stance are the only real exceptions.
7. **Opportunity:** be the **"glass-box" USD manager**, more open than a PMS and plainer than a broker. Lead with the evidence: a NAV history explorer, a custody map, a fee calculator in rupees, a monthly letter that includes the losing trades, and a public log of mistakes and incidents.
8. **Trust signals ranked:** independently verifiable facts (registration numbers that link to the regulator, an auditor's name and report, the custodian's name) beat self-reported numbers (AUM, user counts). Those beat soft signals (press logos, testimonials, "ISO certified").
9. **Four audiences need four paths.** Retail investors want "Is it safe? What does it cost?". Advisors want "How do I earn, and what can I legally say?". Institutions want due diligence (DDQ) documents. CAs want tax treatment, Form 67, Schedule FA and TCS.
10. **Below:** 24 section ideas, 12 interactive tools, 12 novel ideas, a "may / may not claim" table and a banned-words list.

---

## 1. Current site inventory: grade.capital

*Fetched 2 Nov 2026. The FAQ page loads its content with JavaScript, so its questions were not captured. Search results and the blog were checked instead.*

### 1.1 What's on the homepage now

| # | Section | Content / claims (verbatim where quoted) | CTA |
|---|---|---|---|
| — | Page metadata | Title: *"Grade Capital – India's First Crypto Derivatives Fund"*. Description mentions *"Fireblocks custody & ISO 9001 certification"*. These appear in metadata only, not on the page. | — |
| — | Nav | Support, FAQ, Blogs (blogs.grade.capital), Free Consultation | Free Consultation |
| 1 | Hero | *"India's #1"*, *"Fully-Managed Crypto Derivatives Baskets Platform"* | Know More |
| 2 | Why Grade Capital? | PAN-linked transactions; UPI / IMPS / NEFT; "From Bank Account / In Bank Account" with *"no intermediaries"* | — |
| 3 | Results | *"100% delivered in last 2 years"*; *"680% growth since inception"*; *"90% holdings in Blue-Chip Cryptos"* | — |
| 4 | Designed for Success | Dedicated RM; *"Dollar Appreciation Benefits"*; *"No 30% Crypto Tax"* via a "smarter structure"; Fully Managed | — |
| 5 | Growth you See / Trust you Feel | "AS SEEN ON" (logo images, outlets not named in text) | — |
| 6 | Crypto Can Be Clear | Education promise | — |
| 7 | Grade for Good | Carbon neutral "by 2027"; free crypto education; "Crypto for Bharat"; Women in Finance | — |
| 8 | Addresses | Gradepro Technologies Pvt Ltd (Gurgaon, Haryana); operations office Gurugram; "International Operations (USA): Dover, DE" | — |
| 9 | Footer | *"Registered with:"* followed by **nothing**; Privacy, T&C, Investor Agreement, AML Policy; anti-phishing URL notice; *"© 2025"* | Chat on WhatsApp |

**Blog (blogs.grade.capital):** 6+ crypto posts, for example "7 Things a CA Gets Wrong About Crypto Tax India 2026", "Crypto for Salaried Employees: Rs 5,000/Month Plan", "Crypto Fund Risk Management: Handling 80% Drawdowns" and "Crypto vs Gold 2026". They carry named authors, which is good. But they are all crypto-first, which conflicts with the new direction.

**Third-party trace:** a public GitHub gist describes the fund as run by *"Atlantease Ventures Inc"* with an *"inception NAV of $10.00 USDT"* (https://gist.github.com/Mahaveersonii). A **USDT-denominated** NAV directly conflicts with the new "dollar, not USDT" message. The real denomination needs confirming. **[VERIFY]**

**Not found:** the brief mentions "+1,221% net return" and "127% CAGR". Neither appears on the live homepage, the FAQ text that loaded, or the blog index. Web search found no trace either. They may live inside the app, in old ad creatives or on removed pages. Audit the app screens and any paid ads separately.

### 1.2 Risk flags (what to drop or fix)

| Content | Why it's weak or risky | Recommendation |
|---|---|---|
| "India's #1" / "India's First" | Superlatives with no source. SEBI's IA/RA ad code bars terms like "Best", "No. 1" and "Top" (https://taxguru.in/?p=902579). ASCI also requires claims to be substantiated. | Drop. |
| "680% growth since inception", "100% delivered in last 2 years" | No period, no basis (gross or net? which basket? which currency?), no benchmark, no audit. A cherry-picked headline number is the classic misleading performance claim (https://www.5paisa.com/news/sebi-cracks-down-on-exaggerated-portfolio-management-service-advertisements). | Replace with a full NAV history: every period, net of fees, with drawdowns. |
| "+1,221% net return" / "127% CAGR" (if used anywhere) | Same problem, and worse, because it is extreme and invites regulatory or press attention. | Remove everywhere: app, ads, decks. |
| "No 30% Crypto Tax" via a "smarter structure" | Reads as a tax-avoidance promise. Section 115BBH taxes VDA transfer income at 30% (https://taxguru.in/income-tax/scheme-taxation-virtual-digital-assets.html). How derivatives or offshore-fund units are actually taxed depends on facts. A CA-reviewed explainer is fine. A headline "no tax" promise is not. | Drop the headline. Publish a CA-signed tax note instead. |
| "Registered with:" (empty) | An empty trust slot is worse than no slot. It looks like something was removed. | Only list a registration if there is a number that links to the regulator's lookup. |
| ISO 9001 in metadata | ISO 9001 is a quality-management standard. It says nothing about investor protection, and pairing it with an investment pitch can mislead. | Mention it only on an "About / operations" page, with the certificate number and the certifying body. |
| "Fireblocks custody" in metadata | Fireblocks is wallet/MPC **technology**, not a qualified custodian. It is also a crypto signal we now want to avoid. | Describe the custody chain accurately (see idea N3). |
| "no intermediaries" | Untrue in any fund structure: banks, brokers and custodians are all intermediaries. | Replace with "here is every intermediary, by name". |
| "Dover, DE" address | A Delaware registered-agent address looks like a shell to a careful reader. | Explain the entity structure plainly on a "Who we are legally" page. |
| "90% holdings in Blue-Chip Cryptos" | "Blue-chip crypto" is promotional. It is also off-strategy now. | Drop. |
| Carbon neutral by 2027 | An unsupported ESG promise. | Drop, or back it with a plan. |
| © 2025 | Small, but stale details erode trust. | Auto-year. |
| No risk disclosure anywhere visible | The biggest gap. | Add a risk section above the fold on product pages. |

---

## 2. Competitive study (15 sites)

*Method: live fetches for grade.capital, Zerodha, Groww, Vested, INDmoney, Wealthfront, Marcellus and Wise (the Wise fetch returned a non-India variant). Kraken's proof-of-reserves page refused the connection, so it is covered through search results and Kraken's own blog posts. Stripe, Revolut, Robinhood, Coinbase, Varsity, smallcase, Betterment, Mercury and Public are described from search and prior knowledge of their public sites. Treat exact figures on those as indicative.*

### 2.1 Core set

| Site | Content offered | Homepage / key page structure | Trust signals used | What's WEAK |
|---|---|---|---|---|
| **Stripe** (stripe.com) | Product pages, docs, "Stripe Press", annual letter, long-form guides | Big claim, then a live animated product demo, a logo wall, numbers ("$1.4T+ volume" class stats) and a developer-first CTA | Customer logos, public annual letter with real numbers, docs quality as a proxy for competence, status page | Built for developers and businesses, so the gloss would feel slick and untrustworthy for retail money. Its logo walls are hard to verify. |
| **Revolut** | Accounts, FX, stocks, crypto, plans comparison | Phone mock-up hero; product carousels; pricing-plan table; "X million customers" | Licences listed per country, user count, app ratings, "your money is protected" pages | Plan and fee pages are dense, with many conditions in the fine print. FX markups apply on weekends and above plan limits. Its "do everything" breadth reads as consumer-app, not steward. |
| **Robinhood** | Trading, retirement, Gold, learn articles | "Investing for everyone" hero; product tiles; bold promo (match %, APY); disclosures in long footer | FINRA/SIPC, public company, big promo numbers | Gamified history (confetti, the 2021 enforcement history). Promo-first framing. Disclosures are walls of footer text. The tone is the opposite of what Paraa needs. |
| **Coinbase** | Exchange, learn, institutional, "Coinbase One" | Asset price list on the homepage; sign-up CTA; "most trusted" claims; institutional sub-site | Public listing, licences per state, audited financials, security page, insurance explainer (crypto not FDIC) | The live price list invites speculation. "Trusted" is asserted, not shown. Crypto framing, which we must avoid. |
| **Zerodha** (zerodha.com) | Broker, Varsity, TradingQ&A, Z-Connect blog, pricing | "Invest in everything"; "Trust with confidence" block (1.8+ crore customers, ~₹9 lakh crore equity); flat-pricing tiles (₹0 / ₹20); Varsity; closing CTA | SEBI reg no. INZ000031633, CDSL DP no., CIN, exchange memberships, investor charter, SCORES/ODR, "We don't give stock tips" anti-fraud notice, **"No spam, gimmicks or gamification"**, Nudge and Kill Switch | Long, dense footer. Trust copy depends heavily on scale, which a new firm can't copy. Few visuals of where money sits. |
| **Zerodha Varsity** (zerodha.com/varsity) | Free modules (markets, F&O, currency, personal finance), app, certification | Module grid → chapters → plain-language text with charts and examples | Free and ungated, author voice, years of consistent quality; Varsity's currency module is the reference text Indians read on forex | Text-heavy, few interactive tools. Thin on international or USD investing. |
| **Groww** (groww.in) | Stocks, MF, F&O, MTF, bonds | "Groww your wealth"; one product block after another; testimonials; investor-awareness carousel; long footer | "2 Cr+ active investors", SEBI broker INZ000301838, DP, AMFI ARN, SCORES instructions | Contradictory user counts ("2 Cr+" vs "1.4 crore"). A garbled stat ("130,8 34,586+"). "Up to 4x leverage" with no nearby risk text. Testimonials praise "advice" while the disclaimer says no advice. |
| **Kraken proof-of-reserves** (kraken.com/proof-of-reserves) | Periodic PoR reports; a personal Merkle-proof check in the app; open-source verifier | Explainer → "verify your balance" → auditor attestation → FAQ / limitations | Independent auditor; client **liabilities included**; user-verifiable inclusion proof (https://blog.kraken.com/news/proof-of-reserves-june-30-2025) | A snapshot in time only. It doesn't cover off-chain debts unless audited. Merkle trees can be gamed with negative balances unless the auditor checks (https://www.spark.money/tools/bitcoin-proof-of-reserves-comparison). Jargon-heavy for normal people. |
| **Wealthfront** (wealthfront.com) | Cash, managed portfolio, brokerage, loans, whitepapers | Promo carousel → APY hero → trust bar (Bankrate award, 1.5M+ clients, $100B+) → portfolio performance → life-stage cards → stats → FAQ | FDIC eligibility (up to $8M via program banks), awards, app ratings, NASDAQ listing, **published methodology whitepapers**, performance shown at 1y/5y/10y/since inception | Performance chart data date (May 2026) doesn't match the "as of" date (Oct 2026). The portfolio fee isn't on the homepage. Award footnotes aren't expanded. |

### 2.2 Less obvious, highly relevant

| Site | Why it matters to Paraa | Structure | Trust signals | What's WEAK |
|---|---|---|---|---|
| **Wise** (wise.com) | The gold standard for **fee transparency** in FX | Send calculator in the hero (amount → exact fee → mid-market rate → arrival time); "fees at a glance"; comparison against banks; "Wise is regulated by…" per country | Mid-market rate you can check on Google; fee broken out separately from the rate; quarterly "mission update" on price drops; public company | The comparison competitors are often unnamed on some pages. India-specific RBI disclosures were not visible on the fetched variant. |
| **Vested Finance** (vestedfinance.com) | US investing for Indians; recently repositioned to **NRIs** | NRI hero → scope disclosure → "Why US stocks" → stock grid → managed portfolios → returns calculator with a **USD/INR toggle** → 3-step onboarding → testimonials → FAQ (LRS) → US risk disclosure | Names the entity per product (VF Securities: FINRA/SIPC; Vested Finance Inc: SEC-registered adviser, with Form CRS and BrokerCheck links); DriveWealth named; "testimonials unpaid, may not be representative" | The custodian is unnamed in places. Its pivot to NRIs suggests the resident-Indian LRS market got harder (TCS, friction). Generic stock-logo grid. |
| **INDmoney US stocks** (indmoney.com/us-stocks) | The loudest **"Dual Advantage: Currency + Stock"** pitch, which is our exact message | Hero ("Start with $1", "Zero a/c fee") → stats → why US → features → stock directory → fee table → tax → safety → FAQ | IFSCA broker-dealer reg (GIFT City), DriveWealth/Alpaca named, SIPC $500K, ISO 27001, PCI DSS | "Zero fee" headline vs 0.25% brokerage plus 0.5–1.2% bank FX. It presents the currency gain as a benefit and only admits in the FAQ that rupee strength hurts. Regulatory badges blur together (SIPC ≠ loss protection). No visible capital-at-risk warning. |
| **smallcase** (smallcase.com) | The best model for **manager pages and rationale** | Discover grid → each smallcase page: manager card (SEBI RIA/RA number), methodology/rationale, constituents, rebalance timeline, CAGR vs benchmark, min amount, fee | Manager SEBI number on every page; rebalance history; methodology note; "returns are calculated…" footnotes | Performance tiles default to the flattering timeframe. Hundreds of managers of uneven quality. The rationale is often marketing prose. (Our fetch of a specific manager URL returned 404, so this is from prior knowledge.) |
| **Kuvera** (kuvera.in) | Plain-language, fee-free positioning; family accounts; US stocks earlier | Calm hero; product tiles; calculators; "Kuvera is free because…" | Explains its own business model; AMFI/SEBI numbers | Its "free" claim needs an explanation that many users never read. Less depth on risk. |
| **Mercury** (mercury.com) | Best example of **"where your money actually sits"** honesty in a fintech | Product hero; a clear "Mercury is a fintech, not a bank. Banking services provided by [Partner banks], Members FDIC" line, repeated everywhere | Partner banks named; sweep explanation; status and security pages | After the 2024 Synapse collapse (a different firm), readers want even more, such as a live diagram of the ledger. Mercury gives prose only. |
| **Public.com** | Shows "transparent revenue model" as a feature | Hero; "how we make money" page; investing plans; alpha/AI features | Explains payment-for-order-flow history; FINRA/SIPC | Has drifted to feature hype (AI, options). The transparency page is buried. |
| **Betterment** | A calm, methodology-first robo | Goal-first hero; "how we invest" methodology; fee comparison calculator; performance with disclosure | Methodology whitepapers, fee transparency, fiduciary language | Performance pages are hard to find. Lots of hedged legal text. |
| **Marcellus** (marcellus.in), an Indian PMS | Benchmark for how a serious Indian manager talks | Samuelson quote hero → philosophy (3 pillars) → **"what we don't do" list** → screening funnel → strategy cards → newsletters → team with credentials → books → FAQ (₹50 lakh minimum) | Named founders, CFA/CA team, a newsletter per strategy, fraud warnings ("we never ask you to join WhatsApp groups") | **No performance on the homepage** and **no visible SEBI PMS registration number**. "Superior returns" stated without data. Duplicate product copy. Client letters gated. |

### 2.3 Takeaways in one line each

- **Zerodha:** the closest Indian analogue for "trust through restraint". Copy the anti-gimmick stance, not the scale stats.
- **Wise:** show the fee in rupees before sign-up, separate from the rate.
- **Kraken:** "verify it yourself" beats "trust us", but state the limits of the proof.
- **Vested and INDmoney:** both sell the same USD message. Paraa must be *more honest* about rupee-strength risk to stand apart.
- **Marcellus:** a strong philosophy voice, but the missing performance data and registration number are the gap we can fill.

---

## 3. Indian regulatory guardrails

*Plain English first, sources after. This summarises public sources, mostly secondary (law-firm notes and news). Primary circulars must be checked by Compliance. **Nothing here is legal advice.***

### 3.1 Forex for resident Indians (RBI / FEMA)

**What the rules say:**

1. **Retail forex is allowed only in a narrow lane.** Residents may trade exchange-traded currency derivatives on **recognised Indian exchanges** (NSE, BSE, MSE) through **SEBI-registered brokers**. The rupee pairs are **USD-INR, EUR-INR, GBP-INR and JPY-INR** (https://rbi.org.in/Scripts/NotificationUser.aspx?Id=11222). Cross pairs (EUR-USD, GBP-USD, USD-JPY) were later allowed on Indian exchanges, but whether residents may trade them, and under what conditions, needs checking. **[VERIFY]**
2. **Since 3 May 2024 you need a real underlying exposure.** RBI's directions require participants in rupee currency derivatives to have an actual foreign-currency exposure, which means hedging, not speculating. Retail volumes then fell sharply (https://www.business-standard.com/markets/news/currency-derivatives-volumes-decline-sharply-before-norms-kick-in-124050201155_1.html; https://taxguru.in/?p=1093233). In plain English, "trading forex to make money" is effectively closed to Indian retail, even on Indian exchanges.
3. **Offshore forex platforms are illegal for residents.** RBI keeps an **Alert List** of entities not authorised to deal in forex or run forex e-trading platforms. It names 90+ platforms, including eToro, Forex.com, AvaTrade, IQ Option and MetaTrader-based brokers. Residents who trade on them face penal action under FEMA. The list is *not exhaustive*, so being absent from it does not make a platform legal (https://www.business-standard.com/amp/finance/personal-finance/rbi-expands-alert-list-names-13-unauthorised-forex-trading-platforms-124102300648_1.html; https://gulfnews.com/business/banking/starnetfx-fusion-markets-among-7-new-unauthorised-forex-platforms-in-india-flagged-by-rbi-1.500352489).
4. **LRS** (the Liberalised Remittance Scheme) lets a resident send up to **USD 250,000 per financial year** abroad for permitted purposes. Margin, margin calls and forex trading on overseas exchanges or with counterparties are **expressly not allowed** under LRS (https://taxguru.in/?p=929491; https://www.indmoney.com/learn/us-stocks/what-is-lrs-liberalised-remittance-scheme). TCS (tax collected at source) applies to LRS remittances. The rates have changed in recent Budgets: sources disagree between 20% and a revised 2% for specified cases (https://www.kotak.bank.in/en/digital-banking/insta-services/send-money-abroad/faqs.html). **[VERIFY with a CA before quoting any TCS rate.]**
5. **Portfolio investment abroad** (overseas stocks and fund units) under LRS is covered by the Overseas Investment Rules/Directions (2022). Whether a given Paraa basket qualifies as permitted overseas portfolio investment depends on what the underlying fund *does*. A fund that runs leveraged forex derivatives is very different from one holding USD bonds or T-bills. **[VERIFY: this is the single most important legal question for the site.]**
6. **GIFT City (IFSC)** is a separate route regulated by IFSCA. INDmoney uses it for US stocks. An IFSC-domiciled USD fund may give a cleaner legal story than a Delaware entity. This is a strategic option, not a website decision. **[VERIFY]**

**What this means for marketing copy:**

| Do | Don't |
|---|---|
| Describe the product as **USD-denominated investing**: "your investment is held and valued in US dollars" | Say "forex trading", "trade currencies", "FX trading", "forex investing" (if the product isn't exchange-traded INR derivatives) |
| Explain the currency effect honestly: "if the rupee weakens, your rupee value rises; if it strengthens, it falls" | Promise "dollar appreciation" as a benefit. The rupee *can* strengthen (it did in parts of 2017 and 2023). |
| Name the legal route money takes (LRS? IFSC? onshore?) and the regulator of each entity | Show currency pairs like EUR/USD, leverage ratios, "pips", MT4/MT5, "spreads from 0.0" |
| Link to RBI's Alert List as a public service ("check any platform here") | Imply Paraa is "RBI approved" or "RBI regulated" unless it actually holds an RBI authorisation |
| Show the LRS limit and the TCS effect in a calculator | Encourage anyone to remit money for margin or trading |

### 3.2 SEBI advertising rules (IA / RA / PMS)

Paraa's regulatory status (IA, RA, PMS, AIF, distributor, or none) must be confirmed first. **[VERIFY]** These rules apply if any entity is SEBI-registered, and they are also the **benchmark readers and regulators will judge us by** even if no entity is registered.

- **IA/RA Advertisement Code** (SEBI circular SEBI/HO/MIRSD/MIRSD-PoD-2/P/CIR/2023/51, 5 Apr 2023): no assured or guaranteed returns; restrictions on past-performance claims; misleading testimonials are prohibited; no superlatives ("best", "No. 1", "top"); securities shown as examples must be marked "for illustration only, not recommendatory"; ads need prior approval from the supervisory body (BASL for IAs); records kept 5 years. **Mandatory disclaimer:** *"Registration granted by SEBI, membership of BASL (in case of IAs) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors."* (https://taxguru.in/?p=902579; https://www.taxmann.com/post/blog/sebi-issues-advertisement-code-for-investment-advisers-research-analysts/; https://cafemutual.com/news/industry/28925-rias-cannot-provide-return-assurance-to-investors-sebi)
- **Brand and logo rules** (SEBI circular, 6 Apr 2023): IAs and RAs may **not use SEBI's logo**. They must prominently show their registered name, registration number, logo and full address on the website and in ads. The brand name must link clearly to the registered name (https://moneylife.in/article/investment-advisers-and-research-analysts-restricted-from-using-sebi-logo/70371.html; https://ssrana.in/articles/sebi-use-brand-name-trade-name-investment-advisers/).
- **PMS performance:** returns must be **TWRR** (time-weighted rate of return) against an APMI-prescribed benchmark. If performance is disclosed publicly, other strategies run by the same manager must be shown too, so no cherry-picking. Firm-level performance is audited annually (https://www.gktoday.in/sebi-new-benchmarking-norms-for-portfolio-managers/; https://www.apmiindia.org/storagebox/images/Circulars/APMI%20Circular%206-%20Reporting%20of%20Performance%20(BSE%20500%20TRI)%20-28th%20Apr'23_1.pdf).
- **Enforcement:** in June 2025 SEBI wrote to APMI about "unrealistic" return claims on PMS websites and social media and asked for removal (https://www.storyboard18.com/advertising/sebi-cracks-down-on-misleading-portfolio-manager-ads-flags-exaggerated-claims-70706.htm; https://cafemutual.com/news/cafe-alt/35121-sebi-tells-portfolio-managers-not-to-make-unrealistic-claims-of-returns).
- **Coming next:** a 2026 SEBI consultation proposes a **Common Advertisement Code** across intermediaries. It is a proposal, not final (https://lexplosion.in/sebis-proposal-for-a-common-advertisement-code-financial-advertisements-under-the-regulatory-lens/). Design the site so disclaimers are one configurable component.
- **Advisor (distributor) content:** advisors who refer investors and earn commission are **distributors, not advisers**. Advisor-facing copy must not let them present themselves as "SEBI RIA" or give "advice" unless they are registered. Our materials for them must be pre-approved. **[VERIFY]**

### 3.3 Crypto / VDA (kept minimal, but the rules still bite)

- **FIU-IND registration:** since March 2023, VDA service providers serving Indians are "reporting entities" under PMLA and must register with FIU-IND. Non-compliant offshore exchanges (Binance, Kraken and KuCoin in the first round, then 25 more in Oct 2025) received notices and had their URLs and apps blocked (https://www.legal500.com/developments/?p=41616; https://financefeeds.com/fiu-issues-notices-to-25-offshore-crypto-exchanges-over-aml-non-compliance/).
- **Tax:** income from transferring a VDA is taxed at a flat **30%** under **section 115BBH**, with no deductions except cost of acquisition and **no set-off or carry-forward of losses**. **1% TDS** applies under **section 194S** above thresholds (₹50,000 for specified persons, ₹10,000 otherwise) (https://taxguru.in/income-tax/scheme-taxation-virtual-digital-assets.html; https://www.5paisa.com/stock-market-guide/tax/section-194s). Note: the Income-tax Act, 2025 renumbers sections from April 2026. **[VERIFY current section numbers.]**
- **ASCI VDA advertising guidelines** (in force since 1 Apr 2022). Every ad for or featuring VDAs must carry, prominently and unmissably: ***"Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss from such transactions."*** The guidelines specify placement per medium: in print, a fixed share of the ad at the bottom; on social media, both in the caption and on the image or video. The disclaimer must be in the ad's language. Ads must not compare VDAs with regulated assets, must not imply VDAs solve money problems, and must not use the words "currency", "securities", "custodian" or "depository" loosely (https://ssrana.in/articles/asci-guidelines-ads-cryptocurrency/; https://www.khaitanco.com/thought-leaderships/ASCI-releases-crypto-and-NFT-advertising-guidelines-effective-1-April-22-onward; https://www.outlookmoney.com/amp/story/news/asci-says-crypto-ads-to-carry-disclaimers-avoid-comparisons-with-regulated-assets-from-april-1-news-183594). ASCI is self-regulatory, but courts have treated members as bound, and ASCI publicly names violators.
- **Implication:** if any basket still holds crypto, **every page or ad that mentions it** needs the ASCI disclaimer. The cleanest option is not to feature crypto at all on the marketing site, and to disclose holdings only in the factual fund documents.

### 3.4 "Insured", "regulated", "SEBI registered", "ISO certified": when each is honest

| Claim | Honest only when… | Common trap |
|---|---|---|
| **"Insured"** | A named insurer covers a named risk (for example cyber or crime insurance for the company), with the policy limit stated. | Implying investor money is insured against loss. There is no DICGC-style cover for investments. SIPC (US) covers broker *failure*, not market losses (INDmoney's page blurs this). |
| **"Regulated"** | You name *which entity* is regulated by *which regulator* for *which activity*, with a registration number. | Saying "regulated" because a *partner* (bank, broker) is regulated. |
| **"SEBI registered"** | The entity offering *this* service holds a SEBI registration for *this* activity. Show the number, link to SEBI's intermediary lookup, and no SEBI logo. | A group company's registration shown next to an unregistered product. Using SEBI's logo is banned for IAs and RAs. |
| **"RBI approved / authorised"** | The entity holds an RBI licence (AD Category, NBFC, PA). | Using "RBI" because money moves via UPI or bank rails. |
| **"FIU-IND registered"** | A VDA service provider holds an FIU registration. This is AML registration only. | Presenting it as "government approved" or "regulated". It is not investor-protection regulation. |
| **"ISO certified"** | You name the exact standard (ISO 27001 = information security; ISO 9001 = quality management), the certifying body and the certificate number, plus scope and expiry. | "ISO certified" bare, which suggests a broad endorsement it isn't. |
| **"Audited"** | A named audit firm has issued a dated report on a named scope (financial statements, NAV, controls). | "Audited" when only the company's statutory accounts were audited, not the NAV. |

### 3.5 Claims we may / may not make (until Compliance confirms)

| Claim | Status | Condition |
|---|---|---|
| "Your investment is held and valued in US dollars" | **May**, if true | Product legal structure confirmed |
| "If the rupee weakens against the dollar, the rupee value of your investment rises, and the reverse" | **May** | Always both directions |
| "Historical USD/INR change since year X" (RBI reference rate data) | **May** | Source and date shown; "past is not a guide" |
| "NAV published [daily/weekly] since [date]" | **May** | Full history, not selected periods |
| "Returns of X% over [period], net of fees, TWRR, vs benchmark Y" | **Conditional** | Audited or verified, every period shown, all baskets, Compliance sign-off |
| "Dollar appreciation benefit" | **May not** as a headline | It implies a one-way outcome |
| "Forex investing / forex trading / trade currencies" | **May not** | Legal route unconfirmed; the Alert List context makes this toxic |
| "Guaranteed", "assured", "safe returns", "risk-free", "capital protected" | **May not** | Ever |
| "India's #1 / first / best / leading" | **May not** | Without independent, dated substantiation |
| "No 30% tax" / "tax-free" | **May not** | A CA-signed explainer of actual treatment is fine |
| "SEBI registered" / "RBI regulated" / "regulated" | **May not** until confirmed | Then: entity + regulator + number + link |
| "Insured" | **May not** for investments | Corporate policies only, stated precisely |
| "ISO 9001 / 27001 certified" | **Conditional** | Standard, body, certificate number, scope |
| Client testimonials | **Conditional** | Real, dated, unpaid (or disclosed), no performance claims, "may not be representative" |
| "Bank-grade security" | **May not** | Vague; name the actual controls instead |
| Crypto in any marketing | **Avoid** | If unavoidable: the full ASCI disclaimer |
| Advisor earnings examples ("earn ₹X/month") | **Conditional** | Illustrative, with assumptions shown; no implied investor returns |

### 3.6 Words and phrases to avoid

**Hard no:** guaranteed · assured returns · fixed returns · risk-free · safe investment · capital protected · no loss · sure-shot · double your money · passive income (as a promise) · India's #1 / first / best / top / leading · SEBI-approved · RBI-approved · government-approved · forex trading · trade forex · FX trading · leverage · CFD · pips · MT4 / MT5 · tax-free · no 30% tax · beat the tax · insured (for investments) · zero risk · blue-chip crypto · to the moon · financial freedom (as an outcome).

**Use with care (needs context or a number):** dollar appreciation · beat inflation · outperform · consistent · low risk · secure · trusted (show, don't say) · regulated · audited · certified · zero fees · bank-grade · institutional-grade · expert-managed · AI-powered.

**Prefer:** USD-denominated · held in · valued in · net of fees · after tax (illustrative) · here's what could go wrong · we were wrong about · you can verify this at [link] · as of [date].

---

## 4. Content-opportunity brief

### 4.1 Patterns: what every competitor does (and so is generic)

| Pattern | Seen on | Why it's generic for Paraa |
|---|---|---|
| Phone mock-up hero plus a one-line promise | Groww, Revolut, Robinhood, INDmoney | Interchangeable; signals "app", not "steward of money" |
| User count / AUM as the main trust signal | Zerodha, Groww, Wealthfront, INDmoney | A new firm loses this contest. Inflated or mismatched numbers backfire (Groww). |
| "₹0 / zero fees" headline | Zerodha, Groww, INDmoney, Robinhood | Often contradicted in the fine print (INDmoney's 0.25% + 0.5–1.2% FX) |
| Logo walls ("As seen on") | grade.capital, Wealthfront, Stripe | Unverifiable; readers know press mentions can be bought |
| Testimonials with first names | Groww, Vested, Wealthfront | Low credibility, high compliance risk |
| Disclaimers dumped in the footer | Groww, Robinhood, almost all | Legally present, practically invisible |
| Best-period performance tiles | smallcase, Wealthfront (with footnotes) | Cherry-picking is exactly what SEBI calls out |
| "Learn" blog with SEO articles | All | Floods the market; quality varies |
| A 3-step "how it works" | Vested, INDmoney, Groww | Necessary but undifferentiating |

### 4.2 Gaps: what nobody does well

1. **Showing losses.** No one puts their worst month next to their best.
2. **Where the money physically sits.** Only Mercury names partner banks clearly, and nobody shows a diagram of the full chain (your bank → collection account → fund → custodian → instrument).
3. **Fees in rupees on a real amount.** Wise does this for transfers. No investment platform shows "₹1,00,000 in, here's every rupee of cost over 1 year".
4. **Both sides of the currency effect.** INDmoney and Vested sell rupee depreciation as a one-way benefit.
5. **A full, downloadable NAV history** with methodology. Indian mutual funds publish it through AMFI. Private managers don't.
6. **Verifiable registration.** Marcellus shows no PMS number. Many show a number without a link to the regulator's lookup.
7. **Plain answers for CAs.** Nobody publishes a CA-ready tax pack (Schedule FA, Form 67, TCS credit, the cost-basis currency).
8. **An advisor compliance kit.** Distributors get payout tables but rarely "what you can and can't say".
9. **Exit clarity.** "How do I get my money out, how long does it take, what does it cost" is buried everywhere.
10. **Accountability over time.** Nobody keeps a public log of incidents, delays or mistakes.

### 4.3 Recommended page types (beyond the homepage)

| Page | Purpose | Primary audience |
|---|---|---|
| **How it works / How your money moves** | A custody map, step by step, with entity names | Retail, CA |
| **Baskets index + one page per basket** | Strategy, holdings policy, NAV history, fees, risks, manager | Retail, Advisor |
| **NAV & performance centre** | All baskets, all periods, downloadable CSV, methodology | All |
| **Fees** | Every fee, a rupee calculator, a comparison with doing it yourself | Retail, CA |
| **Risks ("What could go wrong")** | Currency, market, liquidity, counterparty, regulatory, operational | All |
| **Who we are legally** | Entities, jurisdictions, registrations (with links), auditors, custodians, directors | Institutions, CA |
| **Team & governance** | Named people, credentials, what each decides, conflicts of interest | Institutions |
| **Letters** | A monthly manager letter archive | Retail, Institutions |
| **Transparency log** | Incidents, delays, errors, fixes | All |
| **For advisors** | Earnings model, onboarding, compliance kit, co-branded materials | Advisor |
| **For CAs** | Tax treatment, reporting checklist, sample statements | CA |
| **For institutions** | DDQ, policies, audited financials request, contact | Institutions |
| **Learn (USD & you)** | A Varsity-style module: rupee history, LRS, TCS, diversification | Retail |
| **Security & fraud** | Official channels, "we will never…", how to verify us, RBI Alert List link | Retail |
| **Withdrawals & exits** | Timelines, costs, a worked example | Retail |
| **Grievances** | Escalation ladder, response SLAs, published complaint stats | All |
| **Brand-change page** | "Grade Capital is now Paraa Capital": what changed, what didn't, how to verify | Existing users |

### 4.4 Section ideas (24)

| # | Section | One-line rationale |
|---|---|---|
| 1 | **Hero: "Invest in dollars, from India. See everything."** | Leads with the USD frame plus transparency, not returns. |
| 2 | **"The rupee, honestly"** chart (USD/INR over 20 years, with the years the rupee *strengthened* highlighted) | Shows the thesis and its exceptions at the same time. |
| 3 | **"What we do / what we don't do"** (Marcellus-style) | Restraint signals discipline: no leverage claims, no tips, no WhatsApp groups. |
| 4 | **How your money moves** (custody strip) | Fills the biggest trust gap in the category. |
| 5 | **Latest NAV + date + link to full history** | A dated fact beats a big percentage. |
| 6 | **Worst month / best month / max drawdown** tiles | Shows the downside first, which makes everything else believable. |
| 7 | **Fee in rupees** mini-calculator | The Wise lesson, applied to investing. |
| 8 | **"Who regulates what"** strip (entity → regulator → number → lookup link) | Turns vague "regulated" talk into checkable facts. |
| 9 | **Meet the managers** (names, faces, track record, what they *own* in the fund) | Skin in the game is a rare, strong signal. |
| 10 | **Latest manager letter** (excerpt including a losing trade) | Honesty as content. |
| 11 | **"What could go wrong"** risk cards | Risk disclosure people actually read. |
| 12 | **Exit in 3 steps** (timeline + cost) | Answers the unspoken fear: "can I get out?" |
| 13 | **Rebrand notice** (Grade → Paraa) | Prevents phishing confusion during the switch. |
| 14 | **Security & official channels** | Scams impersonating fintechs are common; Marcellus and Zerodha do this. |
| 15 | **For advisors** teaser (earn + comply) | A separate path, so investors don't see commission talk. |
| 16 | **For CAs** teaser (download the tax pack) | CAs are gatekeepers for HNI clients. |
| 17 | **For institutions** teaser (DDQ on request) | Signals seriousness. |
| 18 | **Transparency log** teaser ("last incident: …") | Proof of accountability over time. |
| 19 | **Learn: USD & you** module cards | Earns trust through education, the Varsity way. |
| 20 | **Basket comparison table** (strategy, currency, risk level, min, fee, liquidity) | Lets people compare plainly. |
| 21 | **Methodology box** ("How we calculate NAV and returns") | Pre-empts the "is this number real?" question. |
| 22 | **Grievance stats** (complaints received, resolved, average days) | Zerodha and the brokers must publish these; volunteering them stands out. |
| 23 | **FAQ grouped by fear** (safety, cost, tax, exit, legality) | Organised by the reader's worry, not our product menu. |
| 24 | **Footer with entity-level disclosures** (not one wall of text) | Every claim traceable to an entity. |

### 4.5 Trust signals, ranked by how honest and verifiable they are

| Rank | Signal | Verifiable by a visitor? | Notes |
|---|---|---|---|
| 1 | Registration numbers that **link to the regulator's own lookup** | Yes, in one click | Only if real. Never show the SEBI logo. |
| 2 | **Independent auditor's report** on NAV / fund financials (named firm, dated) | Yes (download) | The strongest signal for a new manager |
| 3 | **Named custodian / bank** with a confirmation letter or public listing | Mostly | Mercury-style |
| 4 | **Full NAV history CSV** with methodology | Yes | Self-published, but consistency over time is checkable |
| 5 | **Holdings disclosure** (monthly, with a lag) | Partly | Shows there are real assets |
| 6 | **Named people** with LinkedIn, credentials and personal stake | Yes | Accountability |
| 7 | **Published complaint statistics** | Partly | Rare and costly to fake |
| 8 | **Transparency / incident log** | Partly | Builds credibility over time |
| 9 | Legal entity details (CIN, MCA link, addresses) | Yes | Basic hygiene |
| 10 | ISO 27001 with certificate number | Yes, via the cert body | Only security; low investor relevance |
| 11 | Self-reported AUM / investor counts | No | Use only with an "as of" date; low value early |
| 12 | Press mentions | Weakly | Link to the article; never a logo wall |
| 13 | Testimonials | No | Lowest; compliance risk. Prefer advisor/CA case notes. |
| 14 | Awards | Weakly | Usually pay-to-play; avoid |

### 4.6 Interactive content ideas (12)

| # | Tool | What it does | Notes |
|---|---|---|---|
| 1 | **NAV history explorer** | Pick a basket and a date range: NAV line, drawdown shading, any period's return, CSV download | Defaults to *since inception*, never a flattering window |
| 2 | **Rupee-in, rupee-out fee calculator** | Enter ₹ amount and years: shows each fee (entry, management, FX conversion, TCS cash-flow effect, exit) in rupees | Wise-style; TCS as a timing cost, not a loss [VERIFY rates] |
| 3 | **Currency-effect splitter** | Splits a historical return into "asset return in USD" and "USD/INR effect" | Teaches honestly that both can be negative |
| 4 | **"What could go wrong" simulator** | Sliders: rupee strengthens 5%, the strategy falls 15%, both happen. Shows the ₹ outcome. | Makes risk tangible |
| 5 | **LRS limit planner** | How much of your $250k is used; remittance timeline; TCS estimate | Practical, and signals that we follow the rules |
| 6 | **Custody map (clickable)** | Each node: entity, regulator, what it holds, what happens if it fails | See N3 |
| 7 | **Exit timeline estimator** | Pick a date: when money reaches your bank, with holidays shown | Removes exit anxiety |
| 8 | **Platform checker** | Type a platform name: links to the RBI Alert List / SEBI lookup with a guide | Public service; positions Paraa as the honest one |
| 9 | **Advisor earnings model** | Clients × average ticket × commission schedule, with "illustrative only" assumptions visible | Advisor page |
| 10 | **CA tax-pack generator** (logged-in) | Produces a Schedule FA-ready table and FX conversion rates used | CA page |
| 11 | **Benchmark toggle** | Overlay a basket NAV against USD/INR alone, a USD T-bill index and Nifty | Answers "why not just buy dollars?" honestly |
| 12 | **"Am I a fit?" quiz** | Horizon, need for liquidity, rupee-expense plans. Can answer "not for you". | A "no" answer is a trust signal in itself |

### 4.7 Novel ideas (12) that no studied competitor does

| # | Idea | Why it's different |
|---|---|---|
| N1 | **"Rupee vs dollar since your birth year"** | Enter a year: what ₹1,000 then is worth in USD terms today, *and* the years it would have lost. Personal, shareable, honest. |
| N2 | **Public mistakes & incident log** | Every delayed withdrawal, NAV correction or outage, with cause and fix. Nobody in Indian finance does this. |
| N3 | **"How your money moves" live custody map** | An animated path of ₹ from your bank to the instrument, each hop named, with "what if this party fails?" answers. |
| N4 | **Monthly letter with the losing trades included** | A "Three things we got wrong" section, mandatory every month. |
| N5 | **NAV changelog** | Like a software changelog: every NAV revision, who signed it, what changed. Shows the automated NAV is controlled. |
| N6 | **"Skin in the game" register** | How much each manager and director has invested, updated quarterly. |
| N7 | **Fee receipts** | A sample annual statement showing every rupee taken, in plain words, published as a public specimen. |
| N8 | **"Why not do it yourself?" honest comparison** | Shows the cheaper DIY routes (USD ETFs via LRS, GIFT City funds) and when they're better for you. |
| N9 | **Regulator-question page** | "Questions we've been asked by regulators or auditors, and our answers" (where disclosable). |
| N10 | **Stress-test archive** | How each basket would have done in 2008, the 2013 taper tantrum (rupee crash) and 2020, clearly labelled as simulations with the method shown. |
| N11 | **Advisor "say this, not that" card** | A one-page compliant script for distributors, publicly visible, so investors know what an advisor should *not* promise. |
| N12 | **"Kill switch" commitment page** | The conditions under which we would close a basket and return money, written in advance. |

### 4.8 Audience-specific needs

| Audience | Top questions | Must-have content | Tone |
|---|---|---|---|
| **Retail investors** | Is it legal? Is my money safe? What does it cost? Can I exit? What if the rupee strengthens? | How money moves; fees in ₹; risks; exit timeline; NAV history; fraud and official channels; rebrand notice | Plain, calm, Hindi and regional versions later |
| **Advisors / distributors (incl. MFDs)** | How much do I earn and when? What can I legally say? How do I onboard clients? What support do I get? | Commission schedule and payout timing; earnings model; compliance "say this, not that"; co-branded material (pre-approved); advisor-app walkthrough; client-reporting samples | Practical, B2B |
| **Institutions (family offices, treasuries, corporates)** | Entity structure? Governance? Auditor? Custodian? Capacity, liquidity, fees? | Who we are legally; DDQ on request; policies (valuation, conflicts, AML); team and governance; audited financials; letters archive | Formal, document-led |
| **CAs** | How is it taxed? What gets reported where (Schedule FA, FSI, Form 67)? TCS credit? Cost basis and FX rates? Is the structure clean? | A CA-signed tax note; a reporting checklist; sample statement; FX rate source; CA referral programme rules | Technical, cited |

---

## 5. Open questions for the founder / Compliance (blockers before copy is written)

1. What is the exact **legal route** for an investor's money (LRS → which foreign entity? IFSC? onshore)? Is the underlying activity permitted under the overseas portfolio investment rules?
2. Which **entities hold which registrations** (SEBI IA/RA/PMS/AIF, FIU-IND, IFSCA, US/SEC, none)? Registration numbers and lookup links?
3. Is the NAV denominated in **USD or USDT** today? (The public gist says USDT.)
4. Who **audits** the NAV / fund, and who **custodies** the assets?
5. Does any basket still hold **crypto**? If so, the ASCI disclaimer is mandatory on every mention.
6. Where did "+1,221%" / "127% CAGR" appear (app, ads, decks)? These need removal across all channels.
7. Advisor commission: are advisors AMFI/ARN-registered distributors? Who approves their materials?
8. Current TCS rate and section numbering under the Income-tax Act, 2025, to be confirmed by a CA.

---

### Sources (main)

- grade.capital homepage, FAQ and blog: https://grade.capital, https://grade.capital/faq, https://blogs.grade.capital/
- Grade Capital gist: https://gist.github.com/Mahaveersonii
- RBI ETCD participation notification: https://rbi.org.in/Scripts/NotificationUser.aspx?Id=11222
- RBI Alert List coverage: https://www.business-standard.com/amp/finance/personal-finance/rbi-expands-alert-list-names-13-unauthorised-forex-trading-platforms-124102300648_1.html; https://gulfnews.com/business/banking/starnetfx-fusion-markets-among-7-new-unauthorised-forex-platforms-in-india-flagged-by-rbi-1.500352489; https://moneylife.in/article/unauthorised-forex-trading-platforms-rbi-adds-7-more-entities-to-its-alert-list/78900.html
- ETCD underlying-exposure rule (May 2024): https://www.business-standard.com/markets/news/currency-derivatives-volumes-decline-sharply-before-norms-kick-in-124050201155_1.html; https://zerodha.com/marketintel/bulletin/375304/change-in-eligibility-to-trade-in-currency-derivatives; https://taxguru.in/?p=1093233
- LRS: https://taxguru.in/?p=929491; https://www.indmoney.com/learn/us-stocks/what-is-lrs-liberalised-remittance-scheme; https://www.kotak.bank.in/en/digital-banking/insta-services/send-money-abroad/faqs.html
- SEBI IA/RA ad code: https://taxguru.in/?p=902579; https://www.taxmann.com/post/blog/sebi-issues-advertisement-code-for-investment-advisers-research-analysts/; https://files.caclub.in/wp-content/uploads/sebi-circular-dated-05-04-2023-ad-code-ia-ra.pdf
- SEBI brand/logo rules: https://moneylife.in/article/investment-advisers-and-research-analysts-restricted-from-using-sebi-logo/70371.html; https://ssrana.in/articles/sebi-use-brand-name-trade-name-investment-advisers/
- PMS benchmarking and enforcement: https://www.gktoday.in/sebi-new-benchmarking-norms-for-portfolio-managers/; https://www.storyboard18.com/advertising/sebi-cracks-down-on-misleading-portfolio-manager-ads-flags-exaggerated-claims-70706.htm; https://cafemutual.com/news/cafe-alt/35121-sebi-tells-portfolio-managers-not-to-make-unrealistic-claims-of-returns
- SEBI Common Ad Code proposal: https://lexplosion.in/sebis-proposal-for-a-common-advertisement-code-financial-advertisements-under-the-regulatory-lens/
- FIU-IND: https://www.legal500.com/developments/?p=41616; https://financefeeds.com/fiu-issues-notices-to-25-offshore-crypto-exchanges-over-aml-non-compliance/
- VDA tax: https://taxguru.in/income-tax/scheme-taxation-virtual-digital-assets.html; https://www.5paisa.com/stock-market-guide/tax/section-194s
- ASCI VDA guidelines: https://ssrana.in/articles/asci-guidelines-ads-cryptocurrency/; https://www.khaitanco.com/thought-leaderships/ASCI-releases-crypto-and-NFT-advertising-guidelines-effective-1-April-22-onward
- Kraken PoR: https://blog.kraken.com/news/proof-of-reserves-june-30-2025; https://www.spark.money/tools/bitcoin-proof-of-reserves-comparison
- Competitor pages: https://zerodha.com, https://groww.in, https://vestedfinance.com, https://www.indmoney.com/us-stocks, https://www.wealthfront.com, https://www.marcellus.in, https://wise.com/in/pricing/
