# Paraa homepage redesign: proposal for your approval

**Status:** nothing has been built. This file is the only thing added to the repo, and it is not committed.
**Date:** 4 Nov 2026. **Branch:** `feat/trust-redesign`.

**How to read this.** Sections 1 to 3 explain what is wrong and the plan. Sections 4 to 6 are the detail. **Section 8 is where I need you.** Section 9 is the list of facts only you can supply.

**Words used in this document**

| Word | Meaning |
|---|---|
| Tile | A solid coloured block, like the three in Baskets |
| Ink | The dark brand colour, `#272A33` |
| Hairline | A thin 1px grey line |
| Sticky | An element that holds its place while you scroll past. It is plain browser behaviour, and scrolling itself is not taken over |
| Reveal | A block that fades in and rises slightly the first time you scroll to it |
| Fold | The bottom edge of the screen before any scrolling |
| VDA | Virtual digital asset, the legal category for crypto-like tokens in India |

## The recommendation, in short

**The main finding is that the bigger problem is missing facts, not design.** We can make the page look like a serious company without any new facts. A skeptical investor will still stop at "who holds my money?", and right now nobody has given us that answer. The design makes those gaps visible so they get filled. It can't fill them.

| Option | What it is | Cost | Why it won or lost |
|---|---|---|---|
| **A. Rebuild every section except the two references (recommended)** | White, calm page. Real-looking app screen at the top. New sections for money, risks, fees and company | No money and no new package. Roughly 3 to 5 working days (a rough guess, not measured), plus your facts | Fixes what the audit found. **Gives up:** the pinned hero's "wow" moment, and it reverses rounds 7 to 9 |
| B. Restyle the current sections only | Same sections, calmer colours | About 1 to 2 days (rough guess) | Lost. It leaves no fees, money path, company details or contact, and the hero's biggest visual stays a ₹0 receipt built on an unsigned tax claim |
| C. Add many scroll effects on top of A | Option A plus a pinned product walkthrough and more | About 1.4 extra screens of scrolling, more JavaScript | Lost for now. It would expand made-up app screens while we can't confirm the features exist. You can still ask for it (decision 12) |

**A real example of the change.** Today a visitor at scroll 0 sees a dark stage, gold type and a ₹0 receipt, and the FIU-IND line is hidden behind a gold tile. After the redesign they see a white page, a plain headline, an example app screen labelled "Example", the line "You can lose money", and the FIU-IND registration with its limit beside it.

**Rules that are not up for discussion**

- We never imply government approval, name the ministry as a selling point, or use government emblems.
- No invented logos, audits, custodians, licences, AUM, user counts, fees, people or testimonials.
- App mockups carry an "Example" label and show no returns or performance.

---

## 1. Section audit scores

Scores are out of 10. They are the researcher's judgement, based on measurements at 1440×900 and 375×812 on the dev server. They are opinions backed by evidence, not test results.

| Section | Score | Main reasons | Plan |
|---|---|---|---|
| Header | 6 | Clean, 44px targets. The gold wordmark is faint on white (1.64:1). No links to Fees or company details | Restyle |
| Hero | 3 | 1,980px tall, with about 1,150px of held scrolling. FIU-IND hidden at scroll 0. Biggest visual is the ₹0 receipt. No product UI | Rebuild |
| **Baskets** | **9** | **Reference** | Keep, small edits |
| What-if | 5 | Good tool, wrong place, and a flattering pattern (see below) | Rebuild inside Risks, behind compliance |
| Why USD | 6 | Sound idea, but "Today ₹88.00" has no source, and its data is marked illustrative in the code | Off the page until sourced |
| **Four steps** | **9** | **Reference** | Keep, small edits |
| Tax | 6 | The calculator is good, but the ₹0 tile repeats the text above it and the section rests on an unsigned claim | Becomes a row in Fees |
| CA Advisors | 4 | Three equal tiles (the generic pattern round 6 banned), clip art, no CA facts | Moves into "Who we are" |
| Ask band | 4 | Full gold band, no privacy statement where a phone number is entered | Rebuild as a calm form |
| FAQ | 5 | Works, but avoids the real objections: safety of money, regulator, fees, what if Paraa closes | Restyle, new questions |
| Closing CTA | 4 | "Ready to invest globally?" says nothing specific. Decorative skyline | Removed. The form is the ending |
| Footer | 3 | Honest risk text, but no legal entity, contact, grievance or legal pages | Rebuild |

**Why Baskets and Four steps work.** Everything new must match these six things:

1. The layout comes from the content. The 50% tile really is the biggest.
2. Colour means something.
3. One big number per card, and it has a meaning.
4. **The risk sits beside the claim.** "Risk: The S&P 500 fell about 19% in 2022" is on the tile at body size.
5. Very few words, about 10 to 25 per card.
6. One motion per section, and it serves the idea.

**The honesty problem in What-if.** On the example weights, the year presets give these results:

| Preset | Result in rupees |
|---|---|
| 2020 | +13.3% |
| 2022 | +2.9% |
| 2023 | +15.0% |
| "A bad year" (made up) | −25.9% |

Every real year comes out positive and only the invented year loses. It works as a flattering back-test, close to the performance data you removed. I re-ran this arithmetic against `lib/basket.ts` and it is correct.

**Missing entirely today:** credibility strip, problem-to-solution story, security and who-holds-what, fees, company details, contact, product UI, and a real way to start (no app link exists).

---

## 2. Reference research

**Limits.** This is not legal advice. Site observations come from one headless Chrome visit each by the researcher, on or before 4 Nov 2026, and I did not repeat them. I did re-read the ASCI press release myself, and its quotes below are accurate.

### What other companies do

| Site | What was seen | Source |
|---|---|---|
| Zerodha | Product screenshot above a modest 28px headline. No sticky elements or animation seen. "No spam or gimmicks". Charges page says some taxes "can be a lot more than the brokerage we charge". Registrations only in a small footer block | [zerodha.com](https://zerodha.com/), [charges](https://zerodha.com/charges/) |
| Groww | 88px headline, isometric art, "India's #1", a tile showing a 16.32% return, pinned testimonial wall | [groww.in](https://groww.in/) |
| Wise India | Lime colour and 103px caps. Regulator badge straight after the first photo. Live calculator showing total fees before signup | [wise.com/in](https://wise.com/in/) |
| Mercury | 49px headline, real dashboard UI. "Mercury is a fintech company, not an FDIC-insured bank" in the first view, partner banks named, numbered footnotes | [mercury.com](https://mercury.com/) |
| Stripe | 48px headline at weight 300, which shows a 48px limit can still feel authoritative | [stripe.com](https://stripe.com/) |
| Kuvera (warning example) | No headline or CTA in the first view after 8 seconds, pinned sections of 4,050px and 8,100px | [kuvera.in](https://kuvera.in/) |

### Adopted

| Pattern | From | How we use it |
|---|---|---|
| Disclosure in the first view | Mercury | "You can lose money" and the FIU-IND limit sit under the hero button |
| Fees before signup | Wise | A fee receipt in rupees, starting at 0% assumed return. No numbers until you supply them |
| Same honest CTA top and bottom | Zerodha | "Talk to a CA" in the hero, and the form itself at the end |
| Restraint | Zerodha, Stripe | Short reveals, once only, content visible without JavaScript |
| Real product UI early | Zerodha, Mercury | Example app screen in the hero, tagged "Example" |
| Low-commitment first step | Zerodha's "Try Kite demo" | Tap through example screens without entering anything |

### Not copied

| Pattern | Why |
|---|---|
| Wise "Safe at every step", "Regulated by…" | "Safe" breaks R1, and we can't truthfully say "regulated by" |
| Groww "#1", return figures on tiles, testimonial wall | Banned words, your no-performance rule, and we have no testimonials |
| Mercury's landscape hero and 12.7 MB page | Too heavy for Lighthouse 90+ |
| Stripe's animated gradient and logo walls | Gradient for its own sake, and we have no logos |
| Kuvera's long pins | They hide the message |
| Zerodha's footer-only registrations | This is exactly the failure your brief names |

**What makes us different:** every step of the money path names who does it and what happens if it fails. None of the five sites studied does exactly this.

### Indian advertising limits

**ASCI virtual digital asset guidelines** ([press release](https://www.ascionline.in/wp-content/uploads/2022/09/vda-guidelines-press-release-feb-23.pdf), read directly by me; [Code page](https://www.ascionline.in/the-asci-code-guidelines/); [AdLaw Compendium 2026](https://www.ascionline.in/wp-content/uploads/2026/03/The-AdLaw-Compendium.pdf)). These apply **if** the basket counts as a VDA, which we don't know:

- The disclaimer must be "PROMINENT and UNMISSABLE". For print or static ads it takes at least 1/5 of the space. Whether a website counts as "static" is not confirmed.
- The words "currency", "securities", "custodian" and "depositories" may not be used.
- No comparison with any regulated asset class, so our story can't compare us with FDs or mutual funds.
- Nothing suggesting the product could solve money problems. **I added this point: it limits how far the brief's "problem-to-solution" story can go**, so our "problems" are practical ones like paperwork.
- Nothing suggesting understanding is so easy that people needn't think twice. "Four simple steps" describes a process, but counsel should read it.
- The advertiser's name and a phone or email are required.

**FIU-IND** ([Sept 2025 circular](https://fiuindia.gov.in/pdfs/downloads/VDASP15092025.pdf), [2023 guidelines](https://fiuindia.gov.in/pdfs/AML_legislation/AMLCFTguidelines10032023.pdf), [PIB release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2308131&reg=48&lang=2)). Registration is as a "reporting entity" under the anti-money-laundering law. It brings duties such as verifying customers, keeping records and reporting suspicious transactions. No public lookup was found. If Paraa holds a cyber security audit certificate from a CERT-In empanelled auditor, that would be a real, showable fact, so it's on the TODO list.

**RBI** ([LRS FAQ](https://www.rbi.org.in/commonman/english/Scripts/FAQs.aspx?Id=1834), [Alert List](https://rbidocs.rbi.org.in/rdocs/Content/PDFs/ALERTLIST10022023CC5FC4ACD619431497A56B6894188478.PDF)). The LRS (the Liberalised Remittance Scheme, India's route for sending money abroad) excludes margins to overseas counterparties. The route for "derivative contracts, bought in rupees" needs counsel before the money section can be finished.

**SEBI** ([PR 70/2025](https://www.sebi.gov.in/sebi_data/attachdocs/nov-2025/1762580259409.pdf)). SEBI warned that digital gold is outside its purview. Our gold exposure isn't necessarily the same product, but we avoid the "digital gold" framing and name counterparty risk plainly.

**Tax** ([Section 115BBH](https://www.incometaxindia.gov.in/documents/20117/11892059/Section+-+115BBH_en_310100.pdf/585c890f-88ac-6c4e-e3d1-53c40b59b6f6), [Circular 23/2022](https://www.incometaxindia.gov.in/documents/d/guest/circular-23-2022-pdf)). VDA income is taxed at 30% with no loss set-off. If the basket is a VDA, the current calculator and FAQ would be wrong for investors.

**Not verified by the research:** whether the product is a VDA or its route is lawful, any official rule on how FIU-IND registration may be advertised, and whether a brand's own website counts as an "ad" under ASCI (the researcher treats it as one by inference). The January 2026 FIU guidelines were not read (scanned PDF). CCPA's advertising and dark-pattern guidelines were not read in the original.

---

## 3. Proposed section order and why

The order follows the questions a skeptical person asks, one after another.

| # | Section | The doubt it answers | Why here | Background | Focal object |
|---|---|---|---|---|---|
| 1 | Header | | | White | |
| 2 | Hero | What is this? Is it real? | Product, risk and registration in the first view | White | Example phone |
| 3 | Credibility strip | Who are they? | Sits at the fold on 1440×900 | White | Four linked facts |
| 4 | What you get, what you give up `#why` | What's the catch? | Explains "units, not shares" before Baskets says "Tokenized". This is the problem-to-solution story | Grey-50 | The give-up column |
| 5 | **Baskets** `#basket` | What am I buying? | Reference | White | Tiles |
| 6 | **Four steps** `#how` | How hard is it? | Reference, and follows the product directly | Grey-50 | Card stack |
| 7 | Where your money goes `#money` | Who holds it? | The steps raise this question | White | Line with five stops |
| 8 | What you could lose `#risks` | How bad can it get? | Follows the parties who can fail | Grey-50 | Risk rows |
| 9 | What you pay `#fees` | What does it cost? | Costs make sense once risk is clear | White | Receipt and ink figure |
| 10 | Company and CA `#who` | Who is responsible? | Checked before sharing a phone number | Grey-50 | Fact sheet |
| 11 | FAQ `#faq` | What's left? | Catches remaining objections | White | Hairline rows |
| 12 | Talk to a CA `#ask` | Can I test them cheaply? | The page ends on the action itself | Grey-50 | Ink tile and form |
| 13 | Footer | Where's the legal detail? | Reference, never the first mention | White | |

**Differences from the minimum structure in your brief**

- **Risks and Company are extra sections.** A skeptic needs one place to find every loss and one place to check who is responsible.
- **The final CTA and the form are one thing.** A closing button would only jump back up the page, because there is no store link to send anyone to.
- **Testimonials are left out**, because none exist.

**Where the old sections go**

| Old section | What happens to it |
|---|---|
| Tax | A row in Fees |
| What-if | A tool in Risks, off until compliance approves |
| Why USD | Off until RBI/FBIL data exists. The "rupee" row in section 4 carries the point |
| CA Advisors | Moves into Company and CA |
| Closing CTA | Removed |
| Blog | Stays hidden |

**Page length:** about 11,000 to 12,000px by estimate, against 10,800 today. It is not shorter, because the honest sections add length.

### How designer disagreements were settled

My tests, in order: does it break an honesty rule, does it contradict a principle the same designer set, and does it add cost for an unconfirmed feature? Then the simplest option wins.

| Question | Positions | Decision | Why |
|---|---|---|---|
| Hero: tabs or static? | D1 and D3 want a tap-to-switch hero. D2 wants a static hero plus an `#app` section | **Three example screens in the hero, no `#app` section** | Native radios need no JavaScript and nothing moves until tapped, so D2's stillness concern is met. `#app` would add 1.4 screens of unconfirmed features |
| Sticky product walkthrough | D2 keeps, D1 "later", D3 dropped it in the end | **Not now** (decision 12) | Same reason. D1's note that D3 still wants it is out of date |
| Hero "Your basket" screen | D2's first draft showed value and unit price | **Amounts paid and rules only** | Value beside paid-in reads as a return. D2 agreed in its final |
| Gold tint on the give-up column | D1 and D2 **swapped positions**: D1 now wants it, D2 now doesn't. D3 wants it | **Gold-50 on the give-up column only** | Two votes. One tint with one meaning, pointing at the catch |
| Gold-100 on money-path endpoints | D2's final still uses it, D1 dropped it | **Plain bordered tiles** | Money path has no gold. Gold-100 is reserved for step 2 |
| Strip icons | Also swapped: D1 says none, D2 says icons | **None** | No chance of an icon implying safety. **Gives up:** a little scannability |
| CTA label | D2 "Ask a CA", D1 and D3 "Talk to a CA" | **"Talk to a CA"** | You approved it in round 4, and a line beneath says what happens. If it doesn't fit at 320px, the header alone uses "Ask a CA" |
| Header CTA | D3 fills it after the hero, D1 and D2 keep it outline | **Always outline** | Works without JavaScript, and keeps the hero button the one filled primary. **Gives up:** a quieter button further down |
| FIU note in hero | D2 mobile only, D1 and D3 all widths | **All widths** | On a 1366×768 laptop the strip falls below the fold. **Gives up:** a repeat of the fact on tall screens |
| Hero text length | D2's full text vs D1's shorter text | **D1's shorter text** | D2's pushes the phone too far down on mobile. "Derivative contracts" moves to section 4, directly below |
| Tax panel | D2 ink panel, D1 grey-50 panel | **Grey-50 inner panel, only after sign-off** | Fees already has its one allowed ink tile |
| Strip height | D1 120px (measured cell text), D2 132px (estimated) | **120px, check in build** | Measured beats estimated |
| Get/give-up reveal | D1 and D3 row by row, D2 whole table | **Row by row, each row whole** | The catch always arrives with its claim. Falls back to a whole-table reveal if rows misbehave in Safari |
| FAQ build | Radix vs native `<details>` | **Native `<details>`** | Closed answers are in the page text, so they work without JavaScript and in Ctrl+F. All three agree in their finals |
| Hero `Mark` | D1 lists it as open | **Static `Mark`** | All three finals actually agree |
| Footer | Ink vs white vs grey-50 | **White with a hairline** | Legal text reads like a document, and alternating backgrounds land on white |
| Backgrounds | D1's and D2's tables differ | **D1's table** | D2's alternation assumed the `#app` section |
| "Formerly Grade Capital" | D2 lists it as an open TODO | **Closed: not shown** | Round 5 already says the site never mentions Grade Capital |

**One thing I couldn't fully settle on paper.** With `#app` gone, Four steps and Where your money goes are next to each other, and both have a sticky side heading. Only the steps stack, so they should feel different. I'll check this in the first build, and if it feels repetitive the money heading stops being sticky.

---

## 4. Design system

**Principle:** full-width backgrounds are white or very light grey. Colour appears only in contained tiles, and only when it means something. This is how Baskets already works.

### Colours

All are existing tokens. No new colours are needed.

| Colour | Used for | Not used for |
|---|---|---|
| White, `grey-50` | Section backgrounds | |
| Ink `#272A33` | Primary button, US stocks tile, step 4, fees figure, form tile. **At most one ink tile per section** | Full-width bands |
| Gold `#FDC037` (the one accent) | Gold tile, step 3, `Mark`, slider thumb | Money, Risks, Who, FAQ, footer |
| `gold-100` | Step 2 only | |
| `gold-50` | Give-up column only, meaning "read this catch" | Hover or link highlights |
| `grey-400` | Oil tile only | |
| `accent` `#8E6414` | Inline links and small icons on white | |
| Red, yellow, green | Form errors only | Risk or performance |

**Gold budget:** at most 3 gold items per screen, and the logo counts as one.

**Contrast, which I recalculated**

| Pair | Ratio | Result |
|---|---|---|
| Ink on white | 14.33 | Pass |
| `grey-600` on white | 7.58 | Pass |
| `grey-500` on white | 4.76 | Pass |
| `grey-500` on `grey-50` | 4.52 | Pass, tight |
| `grey-500` on `grey-100` | 4.34 | **Fail, never use** |
| `accent` on white | 5.27 | Pass (the code comment says 5.6, fix it) |
| Ink on gold | 8.72 | Pass |
| Ink on `gold-50` | 13.56 | Pass |
| Ink on `grey-400` | 5.59 | Pass |
| `grey-300` on ink | 9.65 | Pass |

**Fixes**

- The input border moves to `grey-500`, because today's `grey-300` is 1.48:1 and fails the 3:1 rule for controls.
- `--chart-1` is replaced if a chart returns (2.93:1, and its comment says 3:1).
- The header underline becomes ink.

**Removed**

- `bg-dots` and the vignette tokens
- The `Card accent` gradient
- The hero grid and glow
- `PlanArt`, `ChatArt` and `FileArt`
- The header progress line

**Icons:** no `Shield`, `Lock`, `BadgeCheck` or `Landmark` beside a status claim. `Landmark` stays on step 3, where it means "bank".

### Type

Manrope only. `num` (fixed-width digits) goes on every figure, because without it "1111" and "0000" measure 56px vs 84px wide.

| Level | Desktop (size/line) | Mobile | Used for |
|---|---|---|---|
| `h1` | 48/53 | 40/44, and 32/37 below 360px | Hero only |
| `h2` | 40/46 | 32/37 | Section titles, big numbers |
| `h4` | 24/30 | 20/25 | Card titles |
| `h6` | 18/23 | 18/23 | Risk titles, FAQ questions |
| `body-xl` | 18/29 | same | Ledes |
| `body-lg` | 16/26 | same | Body, inputs |
| `body-md` | 14/22 | same | Support, risk, legal |
| `body-sm` | 12/18 | same | Table column labels only |

Honesty labels, risk text and legal text are **never below 14px**. The 10px size is retired. The 48px limit stays (decision 5).

### Spacing and grid

Spacing stays on the 4px grid.

| Item | Desktop | Mobile |
|---|---|---|
| Container | 1200 max, 1152 content, 24 gutter | 16 gutter |
| Section padding | 112 | 80 |
| Heading to content | 64 | 48 |
| Card padding | 32 | 24 |
| Gap inside one object | 12 | 12 |
| Gap between separate items | 24 | 24 |

**Four layouts, in rhythm:** split 7/5, top heading, side heading 4/7, and tile pair. Three equal columns of icon, title and text are banned.

### Corners and shadows

| Corner radius | Used for |
|---|---|
| 24 | Tiles and panels |
| 16 | Inner panels |
| 12 | Buttons, inputs |
| Full | Chips |
| 32 outer, 24 screen | Phone mock |

Shadows appear only when something overlaps something. Sticky steps and the phone use `shadow-lift`, the form uses `shadow-card`.

### Small parts

| Part | Spec |
|---|---|
| Primary button | Ink, 52px tall |
| Header button | Outline |
| `RiskLine` | 14px, bold "Risk:", directly under the claim |
| `ExampleTag` | 14px, 600 weight, 1px border, inside each mock screen |
| `Todo` | Dashed ink border. Shows in review builds only, and **the production build fails if any remain** |

### Motion rules

| Rule | Value |
|---|---|
| Easing | `cubic-bezier(.23,1,.32,1)`, the existing curve |
| Button press | `scale(.97)`, 150ms |
| Hover colour, underline | 150ms. Arrow nudge 4px. **Only on things you can click** |
| Reveal | 12px rise and fade, 500ms, 70ms stagger, at most 4 items, once |
| Expand (FAQ, details) | 200ms where supported, instant elsewhere |
| Screen crossfade | 200ms |
| `Mark` sweep | 600ms, once, in Baskets and Four steps only |
| Maximum | 600ms, except a 1.2s fade when a link lands on a target |

**Never animated**

- The first screen on load: headline, button, phone, strip
- Money path, risk list, registration details, fee table, legal text
- Headings, except the two `Mark`s
- Money figures on scroll (no count-ups)
- Chart lines, because a rising line stresses one direction, which works against R2

**Banned outright**

- Parallax, tilt, cursor followers, magnetic buttons
- Marquees, carousels, autoplay, background loops, shine sweeps
- Load sequences, shimmer skeletons, confetti
- Hover-only content
- Sticky sales bars, exit intent, countdowns, scarcity messages

**Reduced motion:** reveals never hide anything, the money line is simply full, crossfades are instant. The existing global rule zeroes durations but not delays, so it gets `animation-delay: 0s` and `transition-delay: 0s`.

---

## 5. Interactions and scroll animation

**The core idea: stillness at the top, control lower down.** The first screen moves only when the visitor touches it. Each interaction answers one doubt. **A claim's limit and its risks are never behind a click.**

| Doubt | What the visitor can do | Where |
|---|---|---|
| What will I see after joining? | Switch between example screens | Hero |
| Is that registration real? | Follow a strip fact to its detail | Strip to `#who` |
| Who holds my money? | Read every stop while a line tracks their progress | `#money` |
| How bad can it get? | Try a bad year, if compliance approves | `#risks` |
| What does it cost? | Enter an amount, once real fees exist | `#fees` |
| Can I test them first? | Send a question and see what happens next | `#ask` |

**There are two scroll moments:** the Four steps stack (existing) and the money-path line. This is fewer than your "scroll animation" focus might suggest. I think it's right for "serious and regulated", but it's your call (decision 12).

**How reveals change, in plain words.** Today the page starts invisible and waits for JavaScript to show it: 24 elements in the server page are at `opacity:0`, including the headline. The new page starts complete, then quietly tucks away only what you can't see yet. If the script fails, you still have a normal page.

| Section | At rest and on hover | On tap or click | While scrolling | Reduced motion or no JavaScript |
|---|---|---|---|---|
| Header | Fixed height 72/64, solid white. Current-section underline in ink, 150ms | Mobile menu: 200ms, Escape closes, focus returns | Hairline appears | Works, without the underline |
| Hero | Nothing moves on load | Three 44px options: Your basket · Invest · Withdraw, 200ms crossfade. No autoplay or swipe. Nothing inside the phone is focusable | Nothing | Works with no JavaScript. Older browsers show the screens stacked |
| Strip | Underline and 4px arrow nudge | Whole cell is a link. The target gets a brief `grey-100` tint and a return link | Nothing | Static |
| Get / give up | None | None | Each row reveals whole, so a catch never arrives late | Visible |
| Baskets | **Hover lift and wave removed** (decision 9) | None | Tile reveal and `Mark`, as today | Visible |
| Four steps | Unchanged | Link below the stack | CSS stacking, as today. New guard: sticks only at heights of 600px or more, so 200% zoom and landscape phones aren't covered | Works the same |
| Money path | Everything open | Deep links from strip and FAQ | Ink line fills along a grey track, CSS only with no JavaScript | Line is simply full |
| Risks | Static | Tool chips, if approved | **No reveal** | Same |
| Bad-year tool (off by default) | Default shows the loss case | Slider value changes instantly with no rolling digits. 300ms number change only on chip tap or release. Screen-reader updates wait 400ms | On phones, a 64px result dock sticks inside the tool only | Instant |
| Fees | Static | Tax details row, after sign-off. Amount field, once real fees exist | No reveal | Same |
| Company and CA | Static | Links only | No reveal | Same |
| FAQ | Rows at least 64px | Native expand, rotated chevron, hairline. First answer open. Each answer has a link | None | Instant. Ctrl+F finds closed answers |
| Form | Ready when seen, no reveal | Check on leaving a field and on submit. `+91` and spaces removed on paste. Arriving by link focuses the **heading, never a field**, so the phone keyboard doesn't pop up | None | Same |
| Form states | | "Sending…" with fixed width, no spinner. Success moves focus to the message, with reference and next steps. Failure keeps your text and offers another route | | Same |
| Footer | Link underline | Note targets get the tint and a 3px ink border | None | Same |

**Performance and accessibility targets.** These are targets and have not been measured. Lighthouse has not been run.

| Measure | Target | How |
|---|---|---|
| Lighthouse mobile | 90+, median of 3 runs on a production build | Below |
| Largest paint | under 2.0s | Server-rendered hero, no image, no load animation |
| Blocking time | under 150ms | No scroll-linked JavaScript |
| Layout shift | under 0.05 | Fixed header, screens stacked in one grid cell |
| Interaction delay | under 200ms | Only the tool re-renders on drag |
| First-load JavaScript | 150 KB gzip or less | Motion and NumberFlow out of the first load |

13 files import Motion today (I counted). Most can move to CSS, which may let Motion leave the page entirely. I'll confirm this while building.

**Done checks**

- The page reads fully with JavaScript off, keyboard only and reduced motion on.
- Widths 320, 375, 768, 1024, 1440, plus 200% zoom and a 1366×768 fold check.
- All targets at least 44px. Today the consent box, an inline link, footer "Tax" and "FAQ", and the chart columns fail.
- No sideways scrollers.

---

## 6. Copy for each section

**All copy is a draft for compliance.** `[TODO: ...]` marks a fact only you can supply. These tags can't ship publicly (decision 2). I checked the page copy against R1 and against ASCI's four words. "Crypto" appears only in the footer line that R14 and round 3 require.

### Header

Basket · How it works · Your money · Fees · Who we are · FAQ · **Talk to a CA**

### Page title and description

- **Title:** Paraa Capital: invest in US stocks, gold and crude oil from India (unchanged)
- **Description:** US stocks, gold and crude oil in one basket, bought in rupees and priced daily in US dollars, for residents of India. You can lose money. ("No tax when you invest" removed.)

### Hero

- **Headline:** US stocks, gold and crude oil in one basket, **bought in rupees**
- **Lede:** One investment for residents of India, priced daily in US dollars, with a chartered accountant assigned to you.
- **Button:** Talk to a CA
- **Text link:** See what's inside
- **Under the button (desktop; moves to `#ask` on phones):** Send a question and a CA calls you back. No account needed.
- **Risk note (links to `#risks`):** You can lose money. You hold units of the basket, not the shares, gold or oil.
- **FIU note (links to the FAQ):** Registered with FIU-IND for anti-money-laundering reporting, no. [TODO: number]. This is not approval of this investment.

**Example phone.** The caption on the panel reads: "Example screen with sample numbers. Not a real account, a quote or a past result." Each screen also has an "Example" tag inside it, so a crop can't remove it.

| Your basket | Invest | Withdraw |
|---|---|---|
| Paid in so far ₹60,000 | Amount ₹10,000 | Available when your lock-in ends [TODO: length] |
| Monthly plan ₹10,000, next on 5 Dec 2026 | Once / **Every month** | Paid in rupees |
| Paid from bank account ••4821 | Paid from ••4821 | Only to a bank account in your name, ••4821 |
| Withdrawals go to the same account | Units at the next daily price | Arrives in [TODO: timing] |
| Your CA ("CA" monogram, no name) | Fees [TODO: amount]. If a monthly payment fails, that month is skipped. You're never charged twice. | |

**Never in a mock:** portfolio value, gains, any percentage, unit price, charts, the asset split, exchange rates, bank logos, personal names, Grade Capital branding.

[TODO: confirm each feature shown exists, then replace with real screens]

### Credibility strip

| Fact | Second line | Goes to |
|---|---|---|
| Registered with FIU-IND [TODO: entity, number] | For anti-money-laundering reporting. It isn't approval of this investment. | `#who` |
| A CA assigned to you | A chartered accountant, from the day you join. | `#who` |
| Paid only to your own account | In rupees, to a bank account in your name, when your lock-in ends. | `#money` |
| We never ask for your OTP or PIN | Or for payment to a personal account. | `#money` |

A fifth cell appears only with real partner names and their permission. Until then we show nothing, with no grey logo slots.

### What you get, what you give up `#why`

- **Headline:** What you get, and what you give up
- **Lede:** Every part of this has a cost. Here they are in one place.

| The hard part | What Paraa does | What you give up |
|---|---|---|
| Investing abroad from India can mean dollars, overseas accounts and forms. | You pay in rupees from your bank account, and you're paid back in rupees. | You own units of the basket, not the shares, gold or oil. It works through derivative contracts, whose value follows a price. |
| Following three different markets takes time. | US stocks, gold and crude oil sit in one basket with one daily price. | You can't pick the mix. [TODO: confirm] Your money stays in until your lock-in ends. [TODO: length] |
| Working out your tax on this income takes expertise. | A chartered accountant is assigned to you, helps you plan and files your return. | Your CA may be paid by us; see Fees. [TODO: what you pay for this] |
| Your income and savings may all be in rupees. | The basket is valued in US dollars. | A weaker rupee raises your rupee value. A stronger rupee lowers it. |

### Baskets `#basket` (keep; four proposed edits, all declinable in decision 9)

1. **Caption** moves above the tiles at 14px: "Example 50/30/20 split, for illustration. [TODO: real weights]"
2. **Hover lift and wave** removed, because the tiles can't be clicked.
3. **Facts row:** "Withdraw when your lock-in ends ([TODO: length])"
4. **New lede:** "Each one moves for different reasons. All three can fall at the same time." The current one, "so one bad market doesn't decide everything", downplays risk.

All other tile copy stays. Three lines need your attention (decision 10).

### Four steps `#how` (keep)

- **Step 1:** live wording stays until KYC is confirmed. [TODO: Aadhaar and PAN, or DigiLocker, PAN and selfie] [TODO: store links or launch status]
- **Step 4:** See your value daily. Withdraw to your bank when your lock-in ends. (Currently "at maturity". [TODO: confirm maturity and lock-in mean the same thing])
- **Below the cards:** Not ready to sign up? Talk to a CA.

### Where your money goes `#money`

- **Headline:** Where your money goes, and who holds it
- **Lede:** Five stops, from your bank account and back.

| Stop | Who | What happens | If something goes wrong |
|---|---|---|---|
| 1. You pay in rupees | You | You pay from your bank account. [TODO: accepted methods] | A failed monthly payment skips that month. You're never charged twice. |
| 2. Paraa receives it | [TODO: entity, bank, whether it's separate from company money] | [TODO: who converts rupees to dollars, at what rate, under which rule] | [TODO: what happens here] |
| 3. The basket takes its positions | [TODO: other party, venue, country, token issuer] | Exposure comes through derivative contracts. | If the other party can't pay, you could lose money. [TODO: any protection] |
| 4. You get units | [TODO: who sets and who checks the price, who keeps the record] | One price per unit, updated daily in US dollars. New money gets the next price. | [TODO: wrong or late price] |
| 5. You're paid back | You | When your lock-in ends, in rupees, only to a bank account in your name. [TODO: timing] | [TODO: if Paraa closes first] |

**How we protect your account**

- [TODO: verification method, matching Step 1]
- Money comes back only to a bank account in your name.
- We never ask for your OTP or PIN, or for payment to a personal account.
- Got a suspicious call? Tell us at [TODO: contact].
- [TODO: security controls we can state, and any cyber audit with auditor and date]

### What you could lose `#risks`

- **Headline:** What you could lose, and how
- **Lede:** Read this before you invest. [TODO: link to full risk document]

| Risk | Text |
|---|---|
| Markets fall | US stocks, gold and crude oil can all fall at the same time. You can lose some or all of what you invest. [TODO: can a loss exceed the amount invested?] |
| The rupee moves | A stronger rupee lowers your rupee value. A weaker rupee raises it. |
| Your money is locked in | You can't withdraw until your lock-in ends, even if markets are falling. [TODO: length, any early exit] |
| A contract partner fails | If the other party to a contract can't pay, you could lose money. [TODO: who] |
| Paraa or a partner closes | [TODO: compliance-approved answer] |
| Rules change | Tax and rules for products like this can change. [TODO: what complaint route or investor protection applies, if any] |

**"Try a bad year" (off until compliance approves, decision 8).** On ₹1,00,000, with no real-year presets. Fixed line: "Made-up example on an example split. Not a forecast and not the basket's past returns."

| Scenario, all made up | Moves | Result, before fees |
|---|---|---|
| All fall (default) | Stocks −25%, gold −5%, oil −40%, rupee 5% stronger | ₹74,100 (−25.9%) |
| Stocks fall | Stocks −20% | ₹90,000 (−10.0%) |
| Oil falls | Oil −40% | ₹92,000 (−8.0%) |
| Stronger rupee | Rupee 5% stronger | ₹95,000 (−5.0%) |
| Weaker rupee | Rupee 5% weaker | ₹1,05,000 (+5.0%) |

I re-ran these against the formula in `lib/basket.ts` and they are correct.

### What you pay `#fees`

- **Headline:** What you pay, in rupees
- **Lede:** Every charge, on an example of ₹1,00,000 held for [TODO: months], assuming a 0% return.

These rows are proposed fee types, not known fees. Keep or remove each one. The dummy schedule in `content-rules.md` §0.4 is not used.

| Row | Amount |
|---|---|
| Rupees to dollars | [TODO: amount] |
| To buy | [TODO: amount] |
| To hold, each year | [TODO: amount] |
| On profit | [TODO: amount] |
| To withdraw | [TODO: amount] |
| Dollars to rupees | [TODO: amount] |
| Your CA | [TODO: amount] |
| Tax collected at source (tax taken when money moves abroad) | [TODO: whether it applies] |
| **Total** | [TODO: amount] |

- **Ink tile beside it:** On ₹1,00,000 for [TODO: term], you'd pay [TODO: amount]
- **Below:** Minimum investment: US$100. [TODO: reconfirm]
- **Tax row:** Tax on any profit. Your CA will confirm your own. [TODO: CA-approved position]

No calculator until real fees exist, because sample numbers would mislead. After sign-off the tax row opens the existing estimator, with the ₹0 row removed and "Tax" and "You keep" at equal size.

### Company and CA `#who`

- **Headline:** The company and people behind Paraa
- **Lede:** Check these details before you invest.

| Item | Value |
|---|---|
| Legal name | [TODO: legal name] |
| CIN (company ID) | [TODO: CIN, with government lookup link] |
| Registered office | [TODO: address] |
| FIU-IND | For anti-money-laundering reporting. It isn't approval of this investment. [TODO: number, date, proof] |
| Other registrations | [TODO: list, or confirm none] |
| Directors and team | [TODO: people who have signed off] |
| Support | [TODO: email, phone, hours] |
| Grievance officer | [TODO: name, contact, reply time] |

**Your chartered accountant**

- Helps you decide how much to invest, based on your income and goals.
- Someone to call when markets move or your plans change.
- Works out your income from the basket and files your return.
- Your CA may be paid by us; see Fees. [TODO: fee, response time, employed or contracted, how to check membership]

### FAQ `#faq`

- **Headline:** Questions people ask before investing
- **Left column:** Not here? Talk to a CA. Support: [TODO: contact].

| Question | Answer |
|---|---|
| What happens to my money, and what could I lose? | Your rupees buy units of the basket, valued in US dollars. The value can fall, and you can lose some or all of what you invest. Nobody can promise a return. [TODO: who holds what] See *Where your money goes*. |
| Who regulates you? | [TODO: entity] is registered with FIU-IND (no. [TODO: number]) for anti-money-laundering reporting. We must verify customers, keep records and report suspicious transactions. It isn't a licence for this product, and no authority has approved or recommends it. [TODO: any other registration, or a statement that there is none] |
| What are the fees? | [TODO: one line.] See every charge on ₹1,00,000 under *What you pay*. |
| What do I actually own? | Units of the basket. It gets exposure through derivative contracts, so you don't own the shares, gold or oil directly. |
| What does "tokenized" mean? | [TODO: compliance-approved. Draft: a token is a digital record that tracks a price, here US company shares. You hold units of the basket.] |
| When can I get my money out? | When your lock-in ends ([TODO: length]). You're paid in rupees, only to a bank account in your name. [TODO: timing, early exit] |
| What if Paraa or a partner closes? | [TODO: compliance-approved answer] |
| How is it taxed? | [TODO: after CA sign-off, including whether VDA rules apply.] Your CA confirms your own position. |
| How is the price set? | One price per unit, updated daily in US dollars. New money gets the next price. [TODO: who sets it, who checks it] |
| How does the rupee affect my money? | A weaker rupee raises your rupee value. A stronger rupee lowers it. |
| Can I invest every month? | Yes. If a payment fails, that month is skipped. You're never charged twice. |
| How do I know it's really Paraa? | We never ask for your OTP or PIN, or for payment to a personal account. Official channels: [TODO: site, app, support]. |

### Talk to a CA `#ask` (the final CTA)

**Left, ink tile**

- **Headline:** Ask a chartered accountant before you decide
- **Lede:** You don't need an account to ask.
- **What happens next:**
  1. Your question goes to our CA team.
  2. A CA calls you within [TODO: time], from [TODO: number].
  3. You decide what to do next. [TODO: confirm the call is free]
- **Small print:** **Risk:** you can lose money on this investment. Your CA may be paid by us; see Fees.

**Right, form card** (fields unchanged: name, mobile, question, consent)

- **Mobile hint:** Used only to call you back about this question. [TODO: confirm] [TODO: privacy policy link]
- **Placeholder:** For example: what are the fees, and how long is the lock-in?
- **Consent (unchanged, never pre-ticked):** You can call me about this question.
- **Button:** Send my question
- **Below the button:** We'll never ask for your OTP or PIN on a call.

**States**

- **Success:** Your question is with us. Reference [ref]. A CA will call within [TODO: time] from [TODO: number]. We'll never ask for your OTP, PIN or payment to a personal account.
- **Failure:** Sorry, we couldn't send your question. Please try again in a few minutes. Or reach us at [TODO: support].
- **Below the card, hidden until links exist:** Ready to sign up? [TODO: store links]

### Footer

- **Top:** Paraa wordmark. "US stocks, gold and crude oil in one basket, for residents of India." Official channels [TODO: site, app, support]. "We never ask for your OTP or PIN, or for payment to a personal account."
- **Links:** Basket, How it works, Your money, Risks, Fees, Who we are, FAQ, Talk to a CA.
- **Legal pages:** Privacy, Terms, Investor agreement, AML policy, Risk disclosure. [TODO: these pages don't exist yet]
- **Legal block, always open, 14px or larger:**
  - Registrations table and company details (`content-rules.md` §0.2)
  - Risk note `global-risk-v3`, wording unchanged
  - FIU note `fiu-registration-v1`, wording unchanged
  - ASCI line `asci-vda-v1`, verbatim (placement is decision 4)
  - Grievance officer [TODO: details]
  - © [TODO: legal name]
  - RBI Alert List link [TODO: URL]

---

## 7. Tools that would help

**Nothing has been installed, and none of these commands has been run for this proposal.** The commands come from each project's own page or from npm. I checked package names and licences with `npm view` today. An open-source licence is not the same as a stated price, so "Free" below means no charge was found, not a written promise.

### Already available, no install

| Tool | Helps with | Cost | Note |
|---|---|---|---|
| `ui-ux-pro-max` plugin | Design checks | None to use | Already installed in Claude Code |
| Figma connector | Showing the design in Figma before coding | Your Figma plan's limits, not checked | Available in this session, optional |
| `next experimental-analyze` | Measuring JavaScript size | Free | Listed in this project's own Next.js docs, so no package needed. **Use this, not** `@next/bundle-analyzer` |

The Stitch design connector failed to connect in this session ("connection closed"), so it is not an option right now.

### Recommended

| Tool | Why it materially helps | Command | Cost | Adds to `package.json`? |
|---|---|---|---|---|
| **Lighthouse CI** (`@lhci/cli` 0.16.0, Apache-2.0) | Proves or disproves the 90+ target, with a median of 3 runs | Build first with `npm run build`, then `npx @lhci/cli autorun --collect.startServerCommand="npm start" --collect.url=http://localhost:3000 --collect.numberOfRuns=3` | Free | **No**, run through `npx` |
| **axe** (`@axe-core/cli` 4.14.0, MPL-2.0) | Catches many WCAG AA failures automatically. It can't catch all, so the keyboard pass stays manual | `npx @axe-core/cli http://localhost:3000` | Free | **No**. May need a matching ChromeDriver |
| **Impeccable detector** (`impeccable` 4.8.0, Apache-2.0) | Flags "looks generated" patterns on the running site. Already used in round 6 | `npx impeccable detect http://localhost:3000` | Free. No API key needed per its page. Needs Chrome or Edge | **No** |

### Optional

| Tool | Why | Command | Cost | Adds to `package.json`? |
|---|---|---|---|---|
| **Playwright** (1.64.1, Apache-2.0) | Repeatable screenshots at all widths, plus JavaScript-off and reduced-motion checks | `npm i -D @playwright/test`, then `npx playwright install chromium` | Free, downloads a browser | **Yes, a dev package.** Not shipped to visitors |
| **Chrome DevTools MCP** (1.12.0, Apache-2.0) | Lets Claude read real performance traces | `/plugin marketplace add ChromeDevTools/chrome-devtools-mcp`, then `/plugin install chrome-devtools-mcp@chrome-devtools-plugins` | Free. May send trace URLs to Google's CrUX service unless started with `--no-performance-crux` | **No** |
| **Impeccable skill** | Design guidance while building | Global: `npx impeccable install --providers=claude --scope=global`. Or plugin: `/plugin marketplace add pbakaus/impeccable`, then install from `/plugin` | Free. May download a helper to `~/.impeccable/bin/` | Its page doesn't say whether the installer touches `package.json`. Check `git status` afterwards |
| **Emil Kowalski's motion skill** | Second opinion on animation timing | `npx skills add emilkowalski/skill` (his own page). Other sources use `emilkowalski/skills`, so check which is right first | Skill price not stated. He also links a separate course, price not shown | No sign that it does, unconfirmed |

### Two install problems you should know about

1. **Project skills were blocked.** Earlier attempts to copy skills into this project's `.claude` folder failed because a permission setting blocked it. I found a likely match: `~/.claude/settings.json` has the deny rule `Edit(.claude/**)`. That is your setting, and I have not changed it or tried to get around it. To install a skill at project level you would need to change it yourself. A global install or the plugin route may avoid that folder, but I haven't tested either.
2. **The Impeccable installer hung.** I don't know why. Its page lists `--providers` and `--scope` flags that skip the questions, so a hidden prompt could be the cause, but that is a guess. The detector doesn't need the installer, so **the recommended path doesn't depend on fixing this**.

**Not needed:** `unlighthouse` (made for many pages, and we have one), `pa11y-ci` (overlaps axe, and is LGPL).

---

## 8. Decisions you must make

The first seven decide whether this can go ahead. For each I give a recommendation. The ministry point is not listed because it is not open: we won't imply government backing.

### Decisions that shape the whole page

| # | Decision | The conflict | Recommendation |
|---|---|---|---|
| 1 | **Is the basket a virtual digital asset?** (counsel) | "Tokenized" may fit the legal definition. It decides ASCI wording, tax treatment, FAQ text, and whether the route works | **Ask counsel before launch.** It's the largest open question on the page |
| 2 | **Visible `[TODO]` tags vs round 4's "no placeholder tags"** | Tags can't ship publicly, but hiding gaps stops anyone fixing them | Visible on this branch only, and the production build fails if any remain. Blockers stop launch. Droppable rows are removed, as §0.2 says |
| 3 | **Calm brief vs rounds 7 to 9** | You approved dark and gold bands, the pinned hero, looping and scroll-linked effects. The new brief asks for calm | Remove the full-width bands, pinned hero, loops and progress line. **This reverses earlier approved work.** Gold stays in contained tiles, as in Baskets |
| 4 | **ASCI line vs "tokenized" vs footer-only** | Round 3 and R14 put it in the footer once. If this is a VDA, a footer line is unlikely to be "unmissable". Meanwhile a careful reader sees "Tokenized", then a crypto warning with no explanation, and may think they're being sold crypto without being told | Counsel decides. If VDA, add a full-width bordered block in `#risks`. Either way, answer "What does tokenized mean?" |
| 5 | **The 48px heading limit** | It limits hero impact, because `h1` is 48 and `h2` is 40 | Keep it. Stripe and Mercury show it works. Hierarchy comes from whitespace and the phone |
| 6 | **"No tax when you invest"** | No compliance sign-off, yet it's in the hero, tax section, FAQ and metadata. The estimator also assumes slab rate with loss carry-forward, which would be **wrong for investors** if the basket is a VDA | Remove everywhere until signed off. The estimator stays off too |
| 7 | **What is the real next step?** | "Download the app" has no link, so nobody can actually start | Primary CTA is "Talk to a CA" until store links exist. Tell me the launch status |

### Wording and content

| # | Decision | The conflict | Recommendation |
|---|---|---|---|
| 8 | **Bad-year tool** | Useful, but hypothetical numbers sit close to the performance data you removed | Off until compliance approves. Remove the real-year presets either way |
| 9 | **Changes to the praised Baskets section** | Hover lift and wave imply a click that does nothing. New lede and caption are more honest | Accept all four. Each can be declined |
| 10 | **Three Baskets claims** | "Can stay flat for years, as it did from 2020 to 2023" has no source, and our own `lib/basket.ts` has gold at +25% in 2020 and +13% in 2023. "S&P 500 fell about 19% in 2022" needs a source under R3. "Often steady when markets are nervous" and "Tends to rise with inflation" read as reassurance with no source | Supply sources, or I reword the gold line. **I found the gold mismatch while checking; the designers hadn't listed it** |
| 11 | **"Is my money safe?" vs R1** | R1 bans "safe", even in negations, with no exception for questions | Use "What happens to my money, and what could I lose?" The alternative is granting an exception for quoted visitor questions |
| 12 | **How much scroll animation?** | You asked for a focus on scroll and interaction. This gives two scroll moments and a tap-through hero | Accept for launch. Add the sticky product walkthrough only once real screens exist, placed after Baskets |
| 13 | **Why USD** | You now praise only Baskets and Four steps, while round 8 still calls it a reference. "Today ₹88.00" has no source, and it reads one-directionally | Off until RBI/FBIL data exists, then return as a static light card if you want it |
| 14 | **"Your CA may be paid by us"** | Only in the footer today, while the CA is the main pitch. R13's wording says "advisor", not "CA" | Show it beside the CA pitch and the form, with the word "CA". Needs your approval |
| 15 | **"It's free"** | Live copy says this, but the CA fee is `TO CONFIRM` | Removed until confirmed |
| 16 | **Is the CA giving investment advice?** | Copy says the CA "helps you decide how much to invest" and may be paid by Paraa, while the footer says "Nothing on this site is personal investment advice". This could be a contradiction, and a conflict of interest | Ask compliance. **I raised this, and I can't say whether it's a real problem** |
| 17 | **KYC wording** | Live copy says "Aadhaar and PAN". Platform notes say DigiLocker, PAN and selfie | Tell me which is true |
| 18 | **Lock-in vs maturity** | Platform notes say "at maturity", the site says "when your lock-in ends" | Confirm they're the same |

### Smaller decisions

| # | Decision | The conflict | Recommendation |
|---|---|---|---|
| 19 | **R6 needs a regulator link** | No public FIU-IND lookup was found | Tell me what proof can be shown. No substitute link. If none exists, R6 needs an exception from you |
| 20 | **Wordmark** | Gold logo measures 1.64:1 on white | Keep the official file. Ask your brand owner for a dark version |
| 21 | **Static `Mark` in hero** | Keeps a working accent in the first view, but adds gold | Keep. All three designers' finals agree |
| 22 | **Nav changes** | Round 4 approved Basket · Why USD · How it works · Tax · CA Advisors · Blog | Change to section 6's list, because those sections no longer exist |
| 23 | **"Four simple steps"** | A praised headline. ASCI bars suggesting a VDA is so easy nobody need think twice | Keep, and have counsel read it |

---

## 9. Every fact you must supply

### Launch blockers

The page can't go public without these.

| # | [TODO] | Used in |
|---|---|---|
| 1 | [TODO: legal entity name, CIN, registered office] | Who, footer, strip |
| 2 | [TODO: FIU-IND number, date, category, registration letter, approved wording, what proof can be shown] | Hero, strip, Who, FAQ, footer |
| 3 | [TODO: other registrations, or confirmation of none, and the approved answer to "Who regulates you?"] | Who, FAQ |
| 4 | [TODO: who receives the money: entity, bank, whether it's separate from company money] | Money stop 2 |
| 5 | [TODO: rupee and dollar conversion: who, at what rate, under which legal route] | Money stop 2 |
| 6 | [TODO: contract counterparty, venue, country, token issuer] | Money stop 3, Risks |
| 7 | [TODO: what happens if Paraa or a partner fails, and any protection or complaint route] | Money, Risks, FAQ |
| 8 | [TODO: whether a loss can exceed the amount invested] | Risks |
| 9 | [TODO: lock-in length, early exit, withdrawal timing, and whether lock-in and maturity are the same] | Mock, strip, Baskets, Steps, Money, Risks, FAQ |
| 10 | [TODO: full fee schedule, including TCS and any CA fee] | Fees, FAQ, mock |
| 11 | [TODO: VDA answer and CA-signed tax position] | Fees, FAQ |
| 12 | [TODO: approved explanation of "tokenized" and ASCI line placement] | FAQ, footer, Risks |
| 13 | [TODO: support email, phone and hours; grievance officer name, contact and reply time; official channels] | Who, FAQ, form, footer |
| 14 | [TODO: official domain: code uses paraacapital.com, rules doc says paraa.capital] | Footer, metadata |
| 15 | [TODO: privacy policy, terms, investor agreement, AML policy, risk document] | Form, Risks, footer |
| 16 | [TODO: use of phone numbers: who sees them, how long they're kept, callback-only confirmation] | Form |
| 17 | [TODO: CA callback: who reads questions, free or not, response time, calling number] | Form, FAQ |
| 18 | [TODO: CA details: employed or contracted, how to check membership, whether "files your return" and "helps you decide how much to invest" are approved] | Table, Who |
| 19 | [TODO: store links or launch status] | Steps, form |
| 20 | [TODO: confirm each mock feature exists, sign off sample amounts and ••4821, then real screens] | Hero |
| 21 | [TODO: KYC wording] | Steps, Money |
| 22 | [TODO: named team or founders who have signed off, or your acceptance of launching without them] | Who |
| 23 | [TODO: legal route for "derivative contracts, bought in rupees", from counsel] | Money, the whole product |

### Drop the row if you can't supply it

| # | [TODO] | Until then |
|---|---|---|
| 24 | [TODO: real basket weights] | Keep the "Example" caption |
| 25 | [TODO: source and date for the S&P 500 and gold risk lines] | Reword the lines |
| 26 | [TODO: partner and bank names, with permission] | Show nothing |
| 27 | [TODO: third-party audit firm and report date; who sets and who checks the daily price] | No claim |
| 28 | [TODO: security controls we can state, and any cyber audit with auditor and date] | Known lines only |
| 29 | [TODO: confirm investors can't choose the mix] | Remove the phrase |
| 30 | [TODO: accepted payment methods] | "From your bank account" |
| 31 | [TODO: reconfirm US$100 minimum] | Remove the line |
| 32 | [TODO: RBI/FBIL rupee series and date] | Why USD stays off |
| 33 | [TODO: dark logo variant] | Official file |
| 34 | [TODO: RBI Alert List URL] | Remove the link |

---

## Appendix: what I checked, and what I couldn't

**Checked by me and correct**

- Contrast ratios (recalculated)
- All what-if and scenario figures (recalculated from the `lib/basket.ts` formula)
- ASCI quotes (press release read directly)
- Banned-word rules, token values and round history (read in the docs and code)
- 13 files import Motion, and `DiscreteTabs` and `Stepper` have no importers outside their own files
- The `.claude` deny rule

**Corrected**

- D3 said the page has 82 inline `opacity:0` elements. In the saved page, 24 are real element styles (matching the audit). The 82 is every text occurrence, including script data. The finding stands, and the count is 24.
- D2 listed "Formerly Grade Capital" as open. Round 5 already closed it.
- D2's line "sending a question signs you up for nothing" had no source, so I cut it. Phone-number use is unknown.

**Traces only to what we were told or to live copy, not to a document**

- FIU-IND registration: stated by you only.
- "The CA files your return" and "helps you decide how much to invest": live copy, and CA review is still `TO CONFIRM` in round 3.
- KYC, next daily price, monthly skip, own-account withdrawal, US$100: round 3 says these came from the platform code, which is in another repo and which I didn't re-read.

**Opinions, or general statements I can't source**

- The left column of the get/give-up table ("takes time", "takes expertise") is general framing, not a fact about Paraa.
- The designers' effort figures and my Option B figure are rough guesses.
- Audit scores are judgement.

**Not verified**

- **Not run:** Lighthouse, any build, any prototype. All performance figures are targets.
- **Page heights and fold positions:** D1 measured the headline and strip wrapping. Mobile figures (phone top near 595px) and page length are estimates.
- **Browser behaviour from memory:** support for `animation-timeline`, `::details-content` and the `:has()` radio technique, and how Next loads the ₹ glyph. Each has a safe fallback, and the first prototype should test it.
- **Competitor sites:** not re-checked by me. FIU, RBI, SEBI and tax sources were not re-read by me. The researcher's direct fetch of the tax section page returned 403.

**Noticed, not touched:** an untracked `site/` folder sits in the repo (`next-env.d.ts`, `node_modules`, `public`, `tsconfig.tsbuildinfo`). It looks like a leftover, but I don't know its purpose.
