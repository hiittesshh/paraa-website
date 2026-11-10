# Content audit: Paraa Capital homepage

**Date:** 4 Nov 2026. **Branch:** `feat/trust-redesign`. Nothing is committed.

Three reviewers read every word on the page: a researcher checked the facts, a brand designer checked the wording, and a product manager checked whether each section does its job. A writer then changed the words, the reviewers checked the rewrite and sent back fixes, and the writer applied them (section 7). The reviewers did not re-check those final fixes. No layout, colours, components or logic changed. The only additions are one sentence on the form's thank-you screen and sample data on one tour screen.

**The short version:** the page now reads better, and the contradicted claims listed in section 3 are off the page body. Three conflicts remain: the protected footer note's "valued in US dollars", the basket mix (the app's demo data differs) and FIU-IND (older documents differ). **It is still not ready to publish.** Some lines still rest only on your word, and several facts are missing (section 5). The biggest change is that the promise "a CA assigned to you when you join, who files your return" is off the page, because the investor app shows no such thing. If it is real, tell me and it goes straight back.

**How to read the labels**

- **Confirmed:** a document, the app or an official source supports it.
- **Backend only:** the server code supports it, but the rebuilt app has no screen for it.
- **Your word:** only your brief supports it. The line stays until you answer, and it is listed in section 5.
- **Softened / Removed:** the old wording couldn't be supported, so it was reworded or taken out.

---

## 1. What each reviewer found

**Researcher (facts).** The page wasn't ready to call fact-checked. Five main claims conflicted with the investor app or backend:

- a CA assigned to you
- one basket
- priced in US dollars
- paying monthly from your bank
- withdrawing as a single step when lock-in ends

The tax section stated as fact something that is wrong if the basket counts as a virtual digital asset (VDA). The FIU-IND claim rests on your word, and older documents disagree with it. The ASCI line is word for word correct, and no banned words were found.

**Brand designer (wording).** The voice is mostly right: plain, short and speaking to "you". The problems were:

- "Account" had three meanings, and "lock-in" and "maturity" named the same event.
- A few lines claimed too much: "How your account stays yours", "Money comes back", "Growth from the world's biggest companies" and "Who regulates you?".
- Some headlines were generic, and the same ideas repeated.

**Product manager (does it work?).** A stranger understands the page in five seconds, then gets stuck on the next questions: how long is my money locked, what does it cost, who am I dealing with, and how do I start? Step 1 said "Download the app" with no link. The only action available is the question form, and the hero's "Talk to a CA" button only scrolled to it without sending anything.

**Where they disagreed, and who won**

The rule was: researcher on facts, brand designer on wording, product manager on what a section must do.

| Question | Decision |
|---|---|
| "Lock-in" or "maturity"? | **Maturity.** The brand designer preferred lock-in. The app's basket detail screen changed to "Matures in" on 3 Nov 2026 (`RebrandBasketDetailScreen.tsx:364`), but its plan screen still shows "held N months" (`RebrandPlanBasketScreen.tsx:101,118`), its order review still shows "Lock-in" (`RebrandOrderPlaced.tsx:395`) and the investment screen says "Locked until" (`RebrandInvestmentDetailScreen.tsx:397`). Please confirm (section 5). |
| Name for the "How your account stays yours" section | **"Our rules, in plain words"** (brand). The researcher and product manager offered other names. |
| What to do with the "What you get" cards | **Kept, with the line "The short version of everything above."** (brand). The product manager wants them replaced with the missing answers once you have those. |
| "Start in four simple steps" | **"From sign-up to withdrawal, in four steps"** (brand). You liked the old headline, and it's a one-line change back. Counsel should read "simple" first (proposal decision 23). |

**Where the writer changed a reviewer's suggestion**

| Suggestion | What went in | Why |
|---|---|---|
| Hero button "Continue" (product manager) | "Ask a question" | "Continue" doesn't say what happens next. This keeps their point: the button mustn't promise a call. |
| "You can call me" (product manager), "A CA will call you back" (brand) | "Paraa Capital can contact me" and "We've received your question" | The researcher found nothing showing who calls, or when. |
| "Your CA will confirm your own" (researcher) | "A CA can confirm your own tax" | "Your CA" implies one is assigned, and that claim came off. |
| "Value after one year" (researcher) | "Your investment's value" | The heading right above it already says "After one year". |
| "A CA from day one" (brand) | "Talk to a CA" | It repeated the contradicted claim. |

---

## 2. Every changed line, before and after

### Search and sharing text (`page.tsx`, `layout.tsx`)

| Before | After |
|---|---|
| Paraa Capital: invest in US stocks, gold and crude oil from India | Paraa Capital: a basket that tracks US stocks, gold and crude oil, for residents of India |
| Invest in US stocks, gold and crude oil | A basket that tracks US stocks, gold and crude oil |
| …bought in rupees and priced daily in US dollars, for residents of India. | …bought in rupees and priced daily, for residents of India. |

### Hero (`hero.tsx`, `hero-ask.tsx`)

| Before | After |
|---|---|
| One investment for residents of India, priced daily in US dollars, with a chartered accountant assigned to you. | One of the baskets in the Paraa app, for residents of India. Its price is updated daily. |
| Button: Talk to a CA | Ask a question |
| Button: See the app | See an example |
| Your money, in one app | Invest and withdraw from one app |
| Example screens with sample numbers. Not a real account, a quote or a past result. | An illustration of how it works, with sample numbers. Not a screenshot of the app, a real account, a quote or a past result. |

### Drawing on the laptop (`hero-scene.tsx`)

| Before | After |
|---|---|
| Menu: Your CA | Talk to a CA |
| Paid in so far | Invested so far |
| Next payment | Next investment |
| Paid from: ••4821 | Paid from: Paraa wallet |
| Your CA: Assigned | Withdraw to: ••4821 |
| Invest: From your bank account | From your Paraa wallet |
| Your CA / Assigned when you join | Talk to a CA / Ask before you decide |
| Withdraw: When your lock-in ends | When it matures |
| Example screen with sample numbers. Not a real account, a quote or a past result. | Illustration with sample numbers. Not the real app, an account, a quote or a past result. |

### App tour (`product-tour.tsx`)

| Before | After |
|---|---|
| Your money, in one app | Invest and withdraw from one app |
| See what you've paid in and when your next monthly payment is. | See what you've invested and when your next monthly investment is. |
| Paid in so far | Invested so far |
| Next payment | Next investment |
| Paid from: Bank account ••4821 (two screens) | Paid from: Paraa wallet |
| Pay in rupees from your bank account, once or every month. | Invest from your Paraa wallet, once or every month. |
| Units | Units bought |
| If a monthly payment fails, that month is skipped. You're never charged twice. | You add money to the wallet by UPI or bank transfer, and we verify the payment. |
| Your CA (screen name) | Talk to a CA |
| A chartered accountant is assigned to you when you join, and files your return. | Ask a chartered accountant your questions before you decide. |
| Assigned: When you join | How: Send a question |
| Helps with: How much to invest | Then: We contact you |
| Files: Your return (ITR-3) | After that: You decide |
| Your chartered accountant | A chartered accountant |
| Paid in rupees, only to a bank account in your name, when your lock-in ends. | When your investment matures, move it to your wallet, then withdraw in rupees to a bank account in your name. |
| Available: When your lock-in ends | Available: After it matures |
| Paid to: Your account ••4821 | Withdraw to: ••4821 (large, replacing the wrong CA badge), and Bank account: In your name |
| One price per unit, updated daily in US dollars. | One price per unit, updated daily. |
| Your account: Money comes back only to a bank account in your name. | Your bank account: Withdrawals go only to a bank account in your name. |
| We never ask for your OTP or PIN. | We never ask you to share your OTP or PIN. |
| Your CA: Assigned when you join | Talk to a CA: Before you decide |
| Withdraw: When your lock-in ends | Withdraw: After your investment matures |
| Example screens with sample numbers… (caption) | An illustration of how it works, with sample numbers. Not a screenshot of the app, a real account, a quote or a past result. |

### Basket (`basket.tsx`, `sleeve-info.tsx`)

| Before | After |
|---|---|
| Three global assets in one basket | What's in the basket |
| Each one moves for different reasons. | Three markets, each moving for its own reasons. |
| Growth from the world's biggest companies. | Moves with the share prices of those companies. |
| Often steady when markets are nervous. | Has often moved differently from shares, though not always. |
| Tends to rise with inflation. | Moves with global supply and demand. |
| Example allocation, for illustration. | These percentages are an example. |
| Invest once, or every month | Invest once or every month |
| Priced daily in US dollars | Priced daily |
| Withdraw when your lock-in ends | Withdraw after your investment matures |
| Tokens that track shares of large US companies. | Tokens (digital units) that track shares of large US companies. |
| Unused text, never shown: "Shares of large US companies, as tokens." / "Tends to hold its value when stocks fall." / "Moves with global supply and demand." | Deleted, so the strongest gold claim can't come back by accident |

### Calculator (`what-if.tsx`, `basket.ts`)

| Before | After |
|---|---|
| Try a scenario, or move the sliders yourself. It's an example, not a forecast. | Try a scenario, or move the sliders yourself. (The note lower down still says "Not a forecast".) |
| Made-up examples on an example split. Not a forecast, and not the basket's past returns. | Made-up scenarios on an example mix. Not a forecast, and not the basket's past returns. |
| All fall / Everything drops | All three fall / Rupee stronger too |
| A weaker rupee raises your value in rupees. A stronger rupee lowers it. | A weaker rupee raises your investment's rupee value. A stronger rupee lowers it. |
| Rupee slider: Unchanged | No change |
| You would have | Your investment's value |
| Chart labels: If you invest / You would have | You invest / Value after |
| −20% on its share | −20% on its part of the basket |
| Screen reader: ₹X would become ₹Y, +Z%. | ₹X would become ₹Y after one year, +Z%. |

### How it works (`how-money-moves.tsx`)

| Before | After |
|---|---|
| Start in four simple steps | From sign-up to withdrawal, in four steps |
| Download the app and complete KYC with Aadhaar and PAN. | In the app, verify your identity (KYC) with PAN, Aadhaar through DigiLocker and a face scan. |
| Meet your CA | Talk to a CA |
| A chartered accountant helps you plan how much to invest. | Ask a chartered accountant your questions before you invest. |
| Pay from your bank account. Invest once or every month. | Add money to your Paraa wallet in rupees, by UPI or bank transfer. After we verify the payment, invest once or every month. |
| See your value daily. Withdraw to your bank at maturity. | See your investment's value daily. When it matures, move it to your wallet and withdraw to your bank account. |

### Tax (`tax.tsx`, `tax-estimator.tsx`)

| Before | After |
|---|---|
| Move the slider to see what you'd keep. Ask a CA about your own. | Move the slider to estimate what you'd keep. Talk to a CA about your own tax. |
| Profit is taxed at your slab rate | Profit may be taxed at your slab rate |
| It counts as business income from derivatives, taxed at your normal rate plus 4% cess. | It depends on how this income is classified. If the basket counts as a virtual digital asset, the rate is a flat 30% plus cess. |
| Losses can be carried forward | Losses may not carry forward |
| A loss can be set off against future profits. | This also depends on how this income is classified. If the basket counts as a virtual digital asset, a loss can't be set off against other income or carried forward. |
| Your CA files it for you / Your CA prepares and files your return (ITR-3). | **Removed** |
| Tax calculator | Tax estimate |
| You keep | You'd keep |
| Loss you can carry forward | Your loss for the year |
| Screen reader: No tax. A loss of ₹X can be carried forward. | No tax on a loss of ₹X. Whether it can be carried forward depends on how this income is classified. |
| Estimate only. It assumes profit is taxed as business income at your slab, and leaves out surcharge and rebates. Your CA will confirm your own. | Estimate only. It assumes profit is taxed as business income at your slab, and leaves out surcharge and rebates. If the basket counts as a virtual digital asset, tax is a flat 30% plus cess, whatever your slab. A CA can confirm your own tax. |
| Tax on profit (30% + 4% cess) | Tax on profit (30% + 4% cess, an add-on to income tax) |

### Our rules (`trust.tsx`, `header.tsx`, `footer.tsx`)

| Before | After |
|---|---|
| How your account stays yours | Our rules, in plain words |
| Plain rules, so you know what to expect and what to refuse. | Know what to expect, and what to refuse. |
| Menu and footer link: Your account | Our rules |
| Money comes back only to you | Withdrawals go only to you |
| In rupees, to a bank account in your name, when your lock-in ends. | In rupees, to a bank account in your name, after your investment matures. |
| We never ask for your OTP or PIN | We never ask for your OTP or PIN by call or message |
| Or for payment to a personal account. Anyone who does isn't us. | Don't share them with anyone. We also never ask for payment to a personal account. Anyone who does isn't us. |
| A CA assigned to you | A CA you can ask |
| From the day you join. Your CA may be paid by us. | Ask before you decide. Your CA may be paid by us. |
| Your CA (card art) | A chartered accountant |
| One price a day, in US dollars | One price a day |
| One price per unit, updated daily. New money gets the next price. | Each unit has one price, updated daily. Weekends and holidays keep the last price. Money you invest buys units at the next price. |
| You pay and get paid in rupees | You add and withdraw in rupees |

### What you get (`what-you-get.tsx`)

| Before | After |
|---|---|
| Five plain facts about how it works. | The short version of everything above. |
| You pay in rupees from your bank account, and you're paid back in rupees. | You add money in rupees by UPI or bank transfer, and you withdraw in rupees. |
| US stocks, gold and crude oil in one basket, with one price, updated daily in US dollars. | US stocks, gold and crude oil at one price per unit, updated daily. |
| A CA assigned to you | Talk to a CA |
| A chartered accountant from the day you join, who helps you plan and files your return. Your CA may be paid by us. | Ask a chartered accountant your questions before you decide. Your CA may be paid by us. |
| Invest when you like, or set up a monthly plan. If a monthly payment fails, that month is skipped. | Invest when you like, or set up a monthly plan that invests from your Paraa wallet. |
| Money comes back in rupees, only to a bank account in your name. | Withdrawals are in rupees, only to a bank account in your name. |

### FAQ (`faq.tsx`)

| Before | After |
|---|---|
| Questions people ask before investing | Questions before you invest |
| Not here? Talk to a CA. | Don't see yours? Talk to a CA. |
| Who regulates you? | Is Paraa registered with anyone? |
| Paraa Capital is registered with FIU-IND for… | Paraa Capital is registered with FIU-IND (Financial Intelligence Unit-India) for… (rest unchanged) |
| Units of the basket. It gets exposure through derivative contracts, so you don't own the shares, gold or oil directly. | Units of the basket. The basket follows these markets through derivative contracts (agreements whose value follows a price), so you don't own the shares, gold or oil directly. |
| When your lock-in ends. You're paid in rupees, only to a bank account in your name. | Each investment has a maturity date. When it matures, redeem it, which moves it to your Paraa wallet. Then withdraw in rupees to a verified bank account in your name. Money you've added but not invested can't be withdrawn until it has been invested, matured and redeemed. |
| How is the price set? | How often does the price change? |
| One price per unit, updated daily in US dollars. New money gets the next price. | Once a day. Each unit has one price, and money you invest buys units at the next price. Weekends and holidays keep the last price. |
| A weaker rupee raises your rupee value. A stronger rupee lowers it. | US stocks, gold and crude oil are mostly priced in dollars. So a weaker rupee raises your investment's rupee value, and a stronger rupee lowers it. |
| Yes. If a payment fails, that month is skipped. You're never charged twice. | Yes. You can set up a monthly plan that invests from your Paraa wallet. |
| We never ask for your OTP or PIN, or for payment to a personal account. If someone does, it isn't us. | We never ask you to share your OTP or PIN by call or message, or to pay into a personal account. If someone does, it isn't us. |

### Form and footer (`ask.tsx`, `ask-form.tsx`, `advisor-request.ts`, `footer.tsx`)

| Before | After |
|---|---|
| Your question goes to our CA team. | Your question goes to our team. |
| A CA calls you back. | We contact you about it. |
| For example: what are the fees, and how long is the lock-in? | For example: what are the fees, and when does it mature? |
| You can contact me about this question. | Paraa Capital can contact me about this question. |
| Sorry, we couldn't send your question. Please try again in a few minutes. | Sorry, we couldn't send your question. What you typed is still here, so please try again in a few minutes. |
| Thank you! We'll call you soon. | Thank you. We've received your question. |
| Thank-you screen, nothing further | We'll contact you about it. We never ask for your OTP or PIN by call or message. |
| Error: Please write your question. | Please write your question in at least 10 characters. |
| Footer: We never ask for your OTP or PIN, or for payment to a personal account. | We never ask you to share your OTP or PIN, or to pay into a personal account. |

---

## 3. The claim check

These are the claims on the page **now**, plus the ones taken off. Sources are as the researcher reported them. App paths are in `main-investor-app-rebuild`. "Backend" means `D:/Investor App Backend/backend-api`, whose last commit was 15 Apr 2026, so it may be out of date.

### Still on the page

| Claim | Verdict | Source or reason |
|---|---|---|
| For residents of India | Confirmed | `docs/ux/PRODUCT-UNDERSTANDING.md:22` |
| Add money and withdraw in rupees | Confirmed | Withdrawals carry `amount_inr` (`PRODUCT-UNDERSTANDING.md:307`). Behind the scenes, deposits convert to USDT (line 24) and the wallet is debited in USDT (backend `sip.go:99`; `features/rebrand/data/invest.ts:89`). So the app tour no longer says you invest "in rupees" from the wallet. See question 7. |
| Withdrawals only to a verified bank account in your name | Confirmed | `RebrandWithdrawScreen.tsx:368`; `RebrandBankAccountsScreen.tsx:353`; `features/bank-accounts/api.ts:36-37`; `features/rebrand/data/withdraw.ts:131-136` |
| Add money by UPI or bank transfer, then Paraa verifies it | Confirmed | `features/rebrand/data/deposit.ts:34,50-53`; `RebrandPlanDepositScreen.tsx:389` |
| You invest from the wallet | Confirmed | `docs/api/INVESTOR_API.md` ("Wallet is debited") |
| Redeem to the wallet at maturity, then withdraw | Confirmed | `RebrandInvestmentDetailScreen.tsx:397`; `INVESTOR_API.md:688` |
| Money added but not invested can't be withdrawn until invested, matured and redeemed | Confirmed | `RebrandWithdrawScreen.tsx:424` |
| Money you invest buys units at the next price | Confirmed | `INVESTOR_API.md:631,635` |
| One price per unit, updated daily; last price carries over weekends and holidays | Confirmed | `INVESTOR_API.md:1087,1098-1107` |
| KYC: PAN, Aadhaar through DigiLocker, face scan | Confirmed | `RebrandKycFaceWebviewScreen.tsx:74`; `RebrandKycStatusScreen.tsx:38-41,149`. There's also an AML check the page doesn't mention. |
| A weaker rupee raises the rupee value; a stronger one lowers it | Confirmed | The arithmetic in `src/lib/basket.ts` is correct and tested; `PRODUCT-DECISIONS.md` Q6 |
| You don't need an account to ask | Confirmed | `ask-form.tsx` has no login |
| Text you typed stays if sending fails | Confirmed | `ask-form.tsx` keeps the form when sending fails |
| "We've received your question" | Confirmed | The API returns a reference once accepted (`api/advisor-request/route.ts`) |
| FIU-IND's role: verify customers, keep records, report suspicious transactions | Confirmed by secondary sources | FIU-IND's home page confirms only that it receives, analyses and shares suspect-transaction data: https://fiuindia.gov.in/. The duties (PMLA sections 11A and 12) come from https://www.taxmann.com/post/blog/obligations-of-reporting-entities-under-the-prevention-of-money-laundering-act-pmla/. The Act's text was not read. |
| ASCI line, word for word | Confirmed | ASCI press release, clause 1.1, read directly: https://www.ascionline.in/wp-content/uploads/2022/09/vda-guidelines-press-release-feb-23.pdf |
| Gold: "has often moved differently from shares, though not always" | Confirmed | World Gold Council ("few exceptions"): https://www.gold.org/goldhub/research/relevance-of-gold-as-a-strategic-asset/diversification. Fell with shares in Oct 2008 and Mar 2020: https://www.wisdomtree.com/gb/insights/blog/gold-price-moves-on-12th-march-2020-opening-up-attractive-entry-points |
| Oil: "moves with global supply and demand" | Confirmed | US EIA: https://www.eia.gov/todayinenergy/detail.php?id=55079 |
| Tax estimate: 4% cess | Confirmed by secondary sources | Not read from the official text, which was blocked |
| If a VDA: flat 30% plus cess, and no set-off or carry-forward of losses | Confirmed by secondary sources | Section 115BBH of the 1961 Act: https://www.taxmann.com/post/blog/opinion-all-about-section-115bbh-taxation-of-virtual-digital-assets/. Not read from the official text. See "Tax law version" in section 6. Whether the basket is a VDA is question 5. |
| US stocks, gold and crude oil are mostly priced in dollars | Confirmed by secondary sources | Search results only, for example https://theprint.in/economy/gold-extends-gains-for-5th-session-as-rupee-weakness-boosts-prices/3010681/ and https://rupeezy.in/blog/weak-rupee-crude-oil-prices-india. It describes the markets, not the basket's own unit, which stays open (question 7). |
| Each investment has a maturity date | Confirmed | `INVESTOR_API.md:636` (`maturity_date`). No length is given, because none is confirmed (question 9). |
| Monthly plans; plan invests from the wallet | **Backend only** | `INVESTOR_API.md` section 11; backend `internal/worker/sip.go`. The rebuilt app has no screen for it, so the FAQ's "You can set up a monthly plan" isn't true in the app today (question 10). |
| Paraa Capital is registered with FIU-IND | **Your word** | No number or letter. Older docs disagree: `docs/release/STORE_COMPLIANCE_AUDIT.md:39` ("Registration: None"), `PRODUCT-DECISIONS.md` Q1. |
| The basket holds US stocks, gold and crude oil | **Your word** | The app's demo says "US stocks and US oil, with a small part in crypto" (`features/rebrand/mock-portfolio.ts:81-95`). The real mix isn't sent on production. |
| "Tokenized", "Tokens that track shares" | **Your word** | No source, and `PRODUCT-UNDERSTANDING.md:261` leaves it open |
| Gold and oil "track the global price" | **Your word** | No source beyond your brief |
| Derivative contracts; "you don't own the shares" | **Your word** | Same open question. The line stays on purpose. |
| "Talk to a CA", "Ask a chartered accountant", "A CA you can ask" | **Your word** | Rounds 3 and 11 of the build brief. Nothing shows CAs read the form. |
| "Your question goes to our team", "We contact you about it" | **Your word** | Softer than the removed "A CA calls you back". Who reads the form and who replies is unconfirmed (question 2). |
| "Your CA may be paid by us" | **Your word, possibly understated** | The backend pays advisors commission (`internal/worker/sip.go`). If the CA is that advisor, "is paid" would be more accurate. |
| We never ask you to share your OTP or PIN, or to pay into a personal account | **Your word** | Rulebook section 0.2. No source shows it's a checked support policy. |
| Tax estimate assumes business income at your slab | **Your word, labelled as an assumption** | Round 15 says it still needs a CA's sign-off. Wrong if the basket is a VDA (Section 115BBH: https://www.taxmann.com/post/blog/opinion-all-about-section-115bbh-taxation-of-virtual-digital-assets/). |
| "Valued in US dollars" (footer note only) | **Contradicted in detail, kept** | The system works in USDT (`INVESTOR_API.md:549,1152`). The note is protected; see section 4. |
| Rupee vs dollar slider | Works, but the same question applies | USDT follows the dollar, so the direction is right. Wording depends on question 7. |
| App tour screens (Your plan, Talk to a CA) | **Illustration only** | The real tabs are home, baskets, portfolio and wallet. The caption now says it isn't a screenshot. |
| 50%, 30%, 20% | **Example, labelled as one** | Real weights not supplied |

### Taken off the page

| Claim | Verdict | Source |
|---|---|---|
| A CA assigned when you join | Contradicted | `RebrandAdvisorScreen.tsx:79-82` ("No advisor linked"); `PRODUCT-UNDERSTANDING.md:100-109`; zero "CA" or "ITR" matches in `features/rebrand` |
| CA files your return (ITR-3) | Unsupported | Proposal section 9, items 10 and 18 |
| CA helps you plan how much to invest | Unsupported, and sits badly with "not personal investment advice" | Proposal decision 16 |
| "Our CA team", "A CA calls you back", "We'll call you soon" | Unsupported | Proposal section 9, item 17. The form posts to a generic webhook. |
| One investment | Contradicted | `features/baskets/product.ts:27`; `mock-portfolio.ts:76-112` |
| Priced in US dollars | Contradicted in detail | `INVESTOR_API.md:549,1152`; `PRODUCT-UNDERSTANDING.md:24` |
| Monthly plan paid from your bank | Contradicted | Backend `sip.go` debits the wallet |
| Failed payment skips that month; never charged twice | Unsupported, likely wrong | Backend `sip.go` appears to stall the plan. Read from the code, not run. |
| Profit *is* taxed as business income at your slab | Stated as fact, no sign-off | Section 115BBH, as above; Section 43(5)(d): https://taxguru.in/?p=931055 |
| A loss can be set off against future profits | Wrong if a VDA, narrower otherwise | As above; https://cleartax.in/s/fo-trader-return-filing |
| Often steady when markets are nervous | One-sided | Gold sources above |
| Tends to rise with inflation | Unsupported | EIA: oil fell in the second half of 2022 while inflation was high |
| Growth from the world's biggest companies | Superlative, no source | No index or company list is named |
| How your account stays yours | Bigger than the facts | The site doesn't say who holds the money. The app's records name Fireblocks for the USDT (`PRODUCT-UNDERSTANDING.md:24`), and the Terms say third parties manage custody (`features/support/legal-content.ts:177`). |

---

## 4. Kept or removed, and why

**Kept because you decided**

| Line | Why |
|---|---|
| Footer risk note (`global-risk-v3`), unchanged | Your decision. It also still says "valued in US dollars", "invests in… through derivative contracts" and "your CA will confirm your own", which the new page body no longer says or implies. Counsel should approve new wording before it changes. |
| ASCI line (`asci-vda-v1`), word for word | Your decision |
| "This isn't approval of this investment" beside FIU-IND | Your decision |
| "Your CA may be paid by us" | Your decision |
| Both directions of the rupee; "you don't own the shares" | Your decision. The rupee sentence was reworded, and both directions stay. |

**Kept even though unproven, because removing it needs your answer**

- **The headline, "US stocks, gold and crude oil in one basket".** It's the whole product, and only you can confirm the mix.
- **"Talk to a CA" buttons and "Ask a chartered accountant before you decide".** You chose this as the main action in round 11, and "Your CA may be paid by us" needs it to make sense. **This is the weakest thing left on the page.** If nobody qualified reads the form, these must become "Ask a question", and I can do that in one pass.
- **"Tokenized" and "derivative contracts".** The page still explains the product two ways, because no one has said which is right.
- **"Invest once or every month".** The backend has it and a decision says it's on, but the rebuilt app has no screen. Only the details that were wrong came out.
- **The tax estimator.** You asked for it back. It's now labelled as an assumption throughout.

**Removed without replacement**

- "Your CA files it for you".
- "If a monthly payment fails…" and "You're never charged twice".
- Every "US dollars" in the page body that described the product, because it isn't accurate as written. The FAQ now says the markets are "mostly priced in dollars", which is about the markets, not how the basket is valued.

Replacing the "CA files" line would need a real arrangement. The dollar wording needs counsel.

**No risk lines came back.** The rewritten Basket lines say what moves each price, nothing more. The tax section now says a loss can't be set off or carried forward if the basket counts as a VDA. That is a tax fact, not a restored risk line.

**Problems your risk-line decision still creates (reported, not changed)**

- **ASCI placement.** If the basket counts as a VDA, ASCI clause 1.1 wants its line "PROMINENT and UNMISSABLE", and clause 10 says nothing may "downplay the risks". The line sits in the footer. Whether a website counts as a static ad isn't confirmed. Clause 6 also requires the advertiser's name and an easy phone or email contact, and the site has no contact. Clause 2 bars the words "currency", "securities", "custodian" and "depositories". Counsel decides.
- **Unexplained warning.** A reader sees "Tokenized" and then a crypto warning, with nothing connecting them.
- **Your own rules.** Rules R2 and R8 are still overridden for the page body, as round 16 records. Compliance should see this version.

**Spotted, not changed, because it isn't a words change**

- **"The app" menu link.** It still suggests a real product view. The caption now handles this, so I left it.

---

## 5. Questions only you can answer

Most important first. Each one blocks launch or decides a whole section.

1. **Is a CA really assigned to each investor, and do they file returns?** If yes: employed or contracted, who pays them, is it free, and where does the app show them? The app today has only an optional, self-linked "financial advisor". If yes, the old promise goes straight back. If no, "Your CA may be paid by us" needs rethinking too.
2. **Who actually reads the "Talk to a CA" form?** Are they CAs, is the call free, how soon do they call, and from what number? Is `ADVISOR_REQUEST_WEBHOOK_URL` set on the live site? If not, every question fails. This checkout has no value set, and production settings weren't visible.
3. **Can you share the FIU-IND letter?** I need the exact entity (Paraa Capital or ATLANTEASE VENTURES INC), number, category and date. Older repo documents say there is no registration, or that a partner holds it.
4. **What does the basket actually hold, at what weights?** Is it the app's "International" basket? The demo says US stocks, US oil and a small part in crypto, with no gold. If it holds any crypto, leaving that out would be a serious omission.
5. **Is the basket a virtual digital asset?** The investor app's `docs/ux/PRODUCT-UNDERSTANDING.md:22-24` says "CONFIRMED" that Paraa is a VDA product, that deposits convert to USDT, and that Fireblocks holds the USDT. Unless counsel says otherwise in writing, assume the tax estimate's business-income assumption is wrong and the ASCI rules apply. Has counsel decided? This decides the tax section, where the ASCI line goes, and how "Tokenized" is explained.
6. **Has a CA signed off the tax position in writing?** The section stays hedged until then.
7. **How should the site describe rupees becoming USDT?** "US dollars" isn't accurate, and "crypto" is only allowed in the ASCI line. Counsel should approve the wording, and the footer note follows from it.
8. **Should the site say "one of the baskets"?** The app lists several, including fixed-return and crypto-only ones. I used "one of the baskets in the Paraa app". If you'd rather not say that, the app needs to match the site.
9. **Lock-in and maturity: is it the same thing here?** How long is it, can someone exit early, and at what cost? I used "maturity" because the app's basket screens do, but the app still says "Lock-in" and "Locked until" at the point of purchase and after it, and the page never says the money is locked. The app stores them as two separate values (`baskets.ts:48-49`), and its plan screen still shows lock-in. If they can differ, every "after it matures" line on the page may be wrong. The app's data disagrees on early exit: one place says none, another has an "Early exit fee".
10. **Will monthly plans be in the rebuilt app at launch?** The old app was removed on 4 Nov 2026 (commit `281aea2`), and I found no monthly-plan screen in the rebuilt app, so "You can set up a monthly plan" isn't true in the app today. What really happens when an installment fails? Can investors pause or cancel? If it won't ship, I remove every monthly line.
11. **What are the fees, in rupees, and the minimum investment?** The page mentions fees and never states them. The form's own example asks about them.
12. **Who holds the money, and what happens if Paraa or a partner fails?** The app's records name Fireblocks as holding the USDT (`PRODUCT-UNDERSTANDING.md:24`), but the site says nothing, and the Terms only say third parties.
13. **Is the CA paid commission on what the investor puts in?** If so, should "may be paid" become "is paid"? Has counsel checked this against CA rules and the question of whether this is advice?
14. **What legal name, support contact, grievance contact, privacy notice and terms can go on the site?** The form collects phone numbers with no privacy notice. The app names ATLANTEASE VENTURES INC, a Delaware corporation, and the site never does.
15. **Is it confirmed policy that staff never ask for an OTP, a PIN or payment to a personal account?** Does that include outside advisors?
16. **Are the store links live?** The app has no download link on the site, and the records disagree on store status. Step 1 now says "In the app" until you confirm.
17. **Tokens, derivatives, or both, for the US stocks part?** And is "Tokenized" a fixed product term, or should it be "Tokenised" for India?
18. **Official domain: `paraacapital.com` or `paraa.capital`?** The code and the rulebook disagree. The app's Terms support `ParaaCapital.com`.
19. **"Monthly plan" or "SIP"?** Indian investors know SIP, but it may suggest a mutual fund. I left "monthly plan".

---

## 6. What was not verified

- **The researcher's sources.** I relied on their citations and did not reopen each app file or website. Official pages for income tax, PIB and S&P Global returned 403, and the FIU-IND "about" page failed to load. Those points rest on search results, secondary sources or the FIU-IND home page. ASCI's press release was read directly, but its full guideline returned 404.
- **The legal questions.** Whether the basket is a VDA, whether a CA arrangement exists, whether a website counts as an "ad" under ASCI, and whether the CA commission rules are breached are all open. **Nothing here is legal or tax advice.** Counsel and a CA have to settle them.
- **The real product.** The baskets on production need a login, so they weren't seen. Some app data is mock data, treated as a conflict to resolve rather than a fact. The backend's last commit is from April.
- **Monthly-plan failure behaviour.** This comes from reading code, not running it.
- **Fees, store status and production settings.** None of these could be checked.
- **Browser check.** I looked at the live page after the edits at 1440px with reduced motion, and at the four app-tour screens at 1440px with motion on. Nothing overflowed and there were no console errors. At 375px and 768px I measured only that the page doesn't scroll sideways. I didn't read those two sizes by eye, or check the pinned hero's flight frame by frame, so please look at a phone before launch. After sign-off I measured the four tour screens again at 1440px, 768px and 375px: all fit, nothing scrolls sideways, and there are no console errors. I also read the Withdraw screen, the tax section and the thank-you screen by eye at 1440px, with the form's sending mocked.
- **Tax law version.** Sections cited here are from the 1961 Act. Secondary sources say the Income-tax Act 2025 applies from 1 Apr 2026 and carries over the VDA treatment. The official text returned 403, and sources disagree on the new section number, so a CA must confirm both.
- **Other docs.** `docs/build-brief.md` still describes the older wording in places (round 3 says a CA is assigned, and how monthly plans behave). I didn't edit it, so read this file as newer on those points.
- **Secrets.** `token.md` and `docs/paraa-migration-credentials.md` were not opened.

---

## 7. What sign-off changed

The reviewers read the rewrite and sent back 41 items, some of them repeats. All are applied except where noted here.

- **New errors from the rewrite, now fixed.** "Money you add buys units" (adding to the wallet buys nothing). "You only enter them yourself, in the app" (a UPI PIN goes into your own payment app). "Currency" as a label (ASCI clause 2 bars the word). "Invest in rupees from your Paraa wallet" (the wallet debit is in USDT).
- **Tax now names the alternative.** The section and the estimator say what changes if the basket counts as a VDA. The VDA point comes from the product's own document, and the rates come from secondary sources.
- **Leftovers of the assigned-CA claim, now gone.** The "Your CA" card label, and the CA badge on the Withdraw screen.
- **Report corrections.** Lock-in and maturity, the VDA and Fireblocks records, monthly plans, the FIU-IND source, and two more ASCI clauses.

**Where fixes conflicted**

| Conflict | Decision |
|---|---|
| Withdraw badge: change the screen's data, or change the code that shows the badge | **Data.** It needs no logic change and removes the badge just the same. The new screen fits at 1440px. |
| Withdraw row: "Paid in", or keep "Currency" | **"Paid in"**, because ASCI clause 2 bars the word. |
| Tax wording: add the VDA rule, or trim the bodies and keep the estimator note as it was | **Both where possible.** The VDA sentences went in and the repeated "Ask a CA" came out. The estimator note did change, because the facts win. |
| Thank-you line: "on a call or message" or "by call or message" | **"by call or message"**, to match the card heading and the FAQ. |

**Where the writer changed a suggested line:** "If it counts as a virtual digital asset" became "If the basket counts…", since the basket is the asset and the income isn't. "Can't be set off" became "can't be set off against other income", so a first-time reader can follow it.

**Left as it is, for you to decide**

- **"Invest in rupees" and "bought in rupees".** The hero headline, step 3's title and the first "What you get" card still say this. It's true of what the investor pays, but the wallet debit is in USDT. It depends on question 7.
- **"You can set up a monthly plan".** The FAQ and a "What you get" card keep it, and the rebuilt app has no screen for it. Question 10 decides.
- **"Each investment has a maturity date".** This helps the reader, but it still doesn't say how long, or that the money is locked. Question 9 decides.
