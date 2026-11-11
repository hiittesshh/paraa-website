# Build brief: Paraa Capital site (Next.js 16 + Tailwind 4 + shadcn + Watermelon UI)

## ROUND 18 (2026-11-11): bold brand blocks, overrides ROUND 17's visual rules
The owner rejected the round-17 result as flat and empty: "absolute trash". The problems they named were no brand, no real product visuals, no motion, and a weak hero and typography. They chose **"Bold brand blocks"**. Content, copy, calculators, the form and its states, accessibility and every honesty limit are unchanged. Only the visual layer changed.

| Area | Round 18 |
|---|---|
| Hero | 68px headline. A phone mockup of the Invest screen stands on a gold block, with two floating detail cards (`hero-visual.tsx`). The four facts sit in an ink block, with a gold rule over each cell. Below 1024 the order is copy → facts → visual, so "You can lose money" stays in the 390×844 first view. |
| Basket | Ink, gold and Light tiles sized by weight, with 136px / 76px numbers. The Example tag stays above the tiles. |
| How it works | White step cards with gold number chips. The money path sits in a gold block, with ink end nodes. |
| Surfaces | white · white · Light · **ink** (Security) · Light (tools; the result panel is ink) · white · **gold** (Ask) · **ink** (footer). New scopes: `.theme-gold`, and `Section tone="gold"`. |
| Motion | Motion is now in use, as `motion/react-mini` `useAnimate` plus `useInView` in `components/motion/reveal.tsx`, for scroll reveals. The server HTML is complete. A block hides only after hydration and only if it is below the fold, and it never hides for reduced motion, without JavaScript, or in print. The hero entrance is CSS (`.enter-rise` / `.enter-pop`), and the h1 never animates. The Magic UI, Aceternity and React Bits registries are still unused. |
| Type | `type-display` is 40 / 56 / 68px. `type-title` is 32 / 40 / 48px. New `type-numeral`, `type-numeral-sm` and `text-micro` (phone UI only). |

Measured on the production build: 200.3 KB of JS gzipped; 8,466px at 1440 and 13,530px at 390; axe reports 0 violations at 320–1440, including after every reveal; no sideways scroll; no console errors. `spec.md` v1.5 is out of date on the visual rules above: one ink band, gold limits, no motion, page budgets. Its honesty, accessibility and form rules still apply.

**Round 18b, same day:** the owner approved the page from the hero through "Where your money goes" and called everything below it ugly. Those sections were rebuilt in the same language: contained rounded colour blocks on light sections, product visuals, and short text.

| Section | Round 18b |
|---|---|
| Security | Now a white section, not a full-bleed ink band, with four tiles:<br>• ink: withdrawals, with an example withdraw card<br>• gold: the OTP/PIN rule, with six masked code boxes<br>• Light: payment checks, with a verified chip<br>• outlined: FIU-IND and its limit<br>"How to spot a fake" is one ink block, with each scam line as a message bubble. All anchor ids are kept. |
| Calculators | Segmented tabs (ink pill), filled Light chips, borderless 32px-corner cards, and an ink result panel. |
| FAQ | Questions as Light cards; the open card turns white and floats. A sticky left column holds an ink "Don't see yours?" card with the CTA. |
| Ask | Step cards on the gold band, question prompts as wrapped chips, and 16px-corner inputs. |
| Footer | Brand line and CTA on top, links in one row, the legal notes in their own panel. |

**Measured:** 9,008px at 1440 and 14,315px at 390; JS 200.3 KB; axe 0 violations at 320/390/768/1024/1440 after all reveals; no sideways scroll. The 320px overflow from the OTP boxes was fixed.

**Round 18c, same day: the calculators.** The owner still found them ugly: a long form beside a half-empty result. They were rebuilt answer-first.
- **Markets and the rupee:**
  - One ink card holds the starting amount, the scenario's name, the value after a year (76px) and the breakdown.
  - Below it, the five made-up scenarios are tiles, each showing its own outcome on the chosen amount (−25.9% · ₹74,100, …).
  - The four sliders fold away under "Set each market yourself" (native `<details>`).
- **Tax:** one ink card, with the inputs on the left and "You'd keep" on the right. The two tax rules are cards underneath.

The maths, defaults, live region, mobile readout, anchors (`#what-if`, `#tax`, `#…-title`) and no-JS behaviour are unchanged. The tool totals still match Appendix B.

**Round 18d: the calculators, again.** The owner still disliked them, so 18c's ink card, scenario tiles and folded sliders were replaced with the familiar Indian-fintech calculator pattern (Groww-style).
- **One white card per tool, inputs on the left:**
  - every slider has its label at reading size and its value in a soft gold box (`bg-brand-soft`, gold-6);
  - the starting amount is a slider from ₹10,000 to ₹10 lakh;
  - the scenarios are pills;
  - the four market sliders are always visible, so picking a scenario visibly sets them.
- **The answer on the right, in a Light panel that stays in view on desktop:**
  - the scenario name, "You invest", the value after a year (76px) and the change;
  - one compact line per market (swatch, name, diverging bar, rupee amount).
- **Tax:** the same card, with "You'd keep" as the big figure, a keep/tax bar with a legend, and Profit and Tax rows. The two rules stay as cards underneath.

Unchanged: the maths, defaults (₹74,100 / ₹68,800), live region, mobile readout, anchors, and the no-JS behaviour.

**Round 18h: two prototypes kept, made clearer and compact.** The owner kept "One at a time" and "Tiles + waterfall" and asked for three things: make the waterfall easier to understand, fix the "Your own" UI, and stop the calculator feeling zoomed in (they had to scroll to see a change land). The comparison chart and the money split were removed. Copies of all four 18g prototypes are in the session scratchpad, `backup-bad-year-18g/`.

- **Waterfall → "How ₹1,00,000 becomes ₹74,100".** One row per market, in the order the maths runs. Each row says what the move acts on ("₹50,000 of your money"; the rupee: "All ₹78,000 is held in dollars"), the move, what it takes away or adds, and what's left ("₹87,500 left"). Every bar uses one scale: the light track is what you started with, ink is what you have now, hatching is what that step lost and gold what it gained. So the bars visibly shrink row by row. The figures are rounded so each row adds up and the last one equals the answer (`parts` in `model.ts`).
- **"Your own" is edited in place.** There's no separate slider panel any more. Each move is a pill; in "Your own" the same pill gains − and + (5 points for markets, 1 for the rupee; − always means less money, so for the rupee it means stronger). The figure doesn't move, and the row, the answer and the readout update together. "Change the moves" switches to Your own from any scenario; "Set all to zero" resets. At the ends of a range the buttons stay focusable and are `aria-disabled`. The live region now speaks the moves in Your own too. In "One at a time" the ink card lists the four moves in every scenario, and Your own adds − and + to them there.
- **Compact.**
  - The answer is one step smaller (`type-result` 36/44px).
  - A new `type-scenario` sets the stepper's scenario name.
  - Tiles are one compact row.
  - Card padding is 32px.
  - The review toggle is now a small floating bar at the bottom of the screen, shown only while the calculator is on screen and portalled to `<body>`. It no longer adds height.
  - The ink answer gains one summary bar (what's still yours vs lost).
- **Measured (production):**
  - Card height: 795px at 1440×900 in both prototypes, the same in Your own. It fits below the header. At 1366×768 the footer line falls just below the fold.
  - axe: 0 for both prototypes, default and Your own, at 320/390/768/1024/1366/1440.
  - Overflow and errors: no sideways overflow and no console errors at any width.
  - Keyboard: Enter and Space on − work, focus stays put, and the end of the range is `aria-disabled`.
  - Gates: tsc, eslint, 53 tests and the build all pass.

**Round 18g: four prototypes of the bad-year calculator, switchable.** The owner asked for other prototypes of the same concept, toggleable. All four share one model (`components/home/bad-year/model.ts`: state, maths, live region, sentence) and one shell (`what-if.tsx`: heading, limit, amount, readout, footnote, CTA), so they can't drift apart.

| # | `?badyear=` | Prototype |
|---|---|---|
| 1 | `tiles` | Six scenario tiles, the ink answer and the waterfall (18f) |
| 2 | `chart` | Every scenario on one comparison chart; the picked one is broken down in ink, and a gold card opens "Set each market" |
| 3 | `stepper` | One at a time: previous/next and jump-to pills on an ink card, beside a before-and-after (the dashed drop or the gold rise) and each market's effect |
| 4 | `split` | One bar for what you invest: gold for what you keep, a shaded slice per market that takes money away, and any gain past a "You invest" marker |

- **Default:** `BAD_YEAR_PROTOTYPE` in `src/lib/bad-year-prototypes.ts`, currently `tiles`.
- **Review toggle:** a dashed "Prototype (review only)" bar above the calculator. It shows in development, and on the live site only with `?prototypes` or `?badyear=` (verified absent from the production HTML otherwise). A pick is written to `?badyear=`.
- **Measured:** JS 203.7 KB; axe 0 and no overflow for every prototype at 1440/768/390/320 in the All three fall, Weaker rupee and Your own states.

**Round 18f: the scenario concept only, done properly (supersedes 18e).** The owner wants only the "All three fall / Stocks fall / Oil falls…" concept. The growth calculator, `lib/growth.ts` (with its tests), the design switch (`lib/calculator.ts`, `?calc=`) and the growth disclosures were removed. Copies are kept outside the repo in the session scratchpad, `backup-growth-designs/`.

"A bad year" (`what-if.tsx`) is now:
- **Scenario tiles:** six big tiles. Five made-up scenarios, each showing its result on the chosen amount (−25.9%, −10.0%, −8.0%, −5.0%, +5.0%), plus "Your own", which opens the four market sliders inline, starting from the scenario that was picked.
- **The answer:** an ink panel with the value after a year (`type-result`, which fits ₹10,50,000 at every width) and the scenario as one plain sentence.
- **The waterfall:** a chart starting at "You invest", where each market takes its part away (slate) or adds it (gold) from where the last ended, ending on "After one year". The bars glide when the scenario changes (CSS; instant under reduced motion). Below 640 each row stacks: label and figure on one line, the bar full width under them.

The tax tab is unchanged. Measured: JS 200.9 KB; axe 0 at 320–1440 on the default, "Your own" and tax states; no overflow; 53 tests pass.

**Round 18e: three calculator designs, switchable (superseded by 18f).** The owner rejected 18d as plain, with a weak result visual and the wrong kind of calculator. They were shown three mockups (`docs/redesign/design/img/calc-option-a/b/c.png`) and asked for all three to be built and switchable.
- **The switch:** `CALCULATOR_DESIGN` in `src/lib/calculator.ts`, one line. To preview without editing, add `?calc=growth-light`, `growth-ink` or `scenarios` to the URL (read on the client after hydration).
- **The designs:**

  | Design | What it shows | Tabs |
  |---|---|---|
  | `growth-light` (A, the default) | Growth calculator: monthly SIP or one-time, amount, years 1–25, an assumed return of −5% to 10%, and a donut of invested vs estimated growth (or loss) | Growth · A bad year · Tax |
  | `growth-ink` (B) | The same calculator in the dark brand card: a gold total and year-by-year bars. The other tabs are in ink too | Growth · A bad year · Tax |
  | `scenarios` (C) | No growth projection | A bad year · Tax |

  "A bad year" (`what-if.tsx`) shows all five made-up scenarios as one chart. Picking a row shows its breakdown; "Set each market" adds a "Your own scenario" row.
- **Maths:** growth is in `src/lib/growth.ts`, with tests: ₹10,000 a month for 5 years at 6% = ₹7,01,189. The scenario and tax maths are unchanged.
- **Honesty:** the growth designs reverse the old "no projected returns" rule. The return is always the visitor's own choice. `growth-assumption-v1` ("Your assumption, not a forecast. The basket can fall in value, and you can lose money.") sits under the choice, and `growth-foot-v1` under the result. **Compliance must approve the growth designs before launch;** until then, `scenarios` is the safe setting.
- **Measured:** 203.2 KB JS; axe shows 0 violations for every design, tab and width (1440/390/320); no overflow. `#growth`, `#what-if` and `#tax` deep links select their tab.

**Tooling fix (round 18c):** Tailwind now runs through PostCSS (`postcss.config.mjs`, `@tailwindcss/postcss@4.3.3`), as the Next.js docs say. The custom `@tailwindcss/turbopack` loader rule was removed from `next.config.ts` and the package uninstalled. That loader didn't track source files, so classes added while `next dev` ran (and theme edits after a restart) never reached the browser. It's now verified: a class added to a `.tsx` file appears in the served CSS within seconds.

## ROUND 17 (2026-11-11): research → design → development rebuild, overrides anything below it
The homepage was rebuilt through a staged process: five researchers studied ten reference sites (`docs/redesign/research/`), three designers drafted, cross-reviewed and merged one spec, and three developers built it. A joint design and dev review followed (`docs/redesign/design/`).
- **The spec is the source of truth:** `docs/redesign/design/spec.md` (v1.5). Every decision and its reason is in its decision log. The theme is the owner's Colors board (`docs/redesign/design/brand-board.md`): Primary ink `#272A33`, Secondary gold `#FDC037`, Light `#F2F2F2`, and Manrope with Bold 700 headings.
- **Owner decisions:**
  - a light page with one ink band (Security);
  - a static hero with an example panel;
  - "You can lose money" sits in the hero facts row, and each limit is set at the same size as its claim;
  - the CTA is "Ask a CA" everywhere, because CAs read the questions;
  - the what-if opens on "All three fall";
  - main buttons stay ink;
  - FIU-IND is a plain sentence until the number exists.
- **Installed but not used:** `motion` and the Magic UI, Aceternity and React Bits shadcn registries. The owner chose "install only". QA A4/A24 fail if anything imports them, and a spec change is needed first.
- **Skills used:** `ui-ux-pro-max`, `frontend-design`, `design-taste-frontend`, `vercel-react-best-practices`, `vercel-composition-patterns` and `web-design-guidelines`. The project rules (spec, brand board, `content-rules.md`) win any conflict; Taste Skill's house rules don't apply here.
- **Launch blockers (owner facts):** spec §12, and `proposal.md` §9. They include the production webhook (`ADVISOR_REQUEST_WEBHOOK_URL`), a privacy page, the legal entity, the FIU-IND number, grievance details, fees and custody.

## ROUND 16 (2026-11-04): risk lines off the marketing sections, by the user's request
Removed: "You can lose money" and "Risk:" from the hero, Basket tiles, app window, calculator and form, the FAQ's "what could I lose",
and the catch cards (`what-you-get.tsx` keeps the Wise effect with product facts). Overrides R2 and R8 and the brief's "disclosures where doubt
occurs" for those sections, so **compliance needs to review it**. Kept on purpose: the footer's risk note (`global-risk-v3`) and the ASCI
line, the FIU limit, "Your CA may be paid by us", the rupee's two directions in the FAQ, and "you don't own the shares".

## Viewing on another device
Open the dev server by network address only with `allowedDevOrigins` covering it (`next.config.ts`), or Next blocks its scripts and the
hero freezes. Production isn't affected. The pin's height is added only once the script runs, so a failed script gives a normal page.

## ROUND 15 (2026-11-04): calculators back, art plays on arrival
The user asked for "the calculator" back. Both came back: the what-if (`what-if.tsx`, nav "Calculator") and the tax estimator
(`tax.tsx`, `tax-estimator.tsx`). This overrides proposal decisions 6 and 8 for the tools themselves. Kept from those decisions:
real-year presets stay out (made-up scenarios only), and "No tax when you invest" stays off, including its ₹0 row. The tax
estimate's assumption still needs a CA's sign-off, and it's wrong if the basket counts as a VDA.
Basket art (`asset-art.tsx`) plays once when half of the drawing is on screen.

## ROUND 14 (2026-11-04): one continuous object
The user found the flight laggy, and the cut from the zoomed laptop to the tour bad. On wide screens the hero and tour are now one
3.7-screen pin (`hero.tsx`): the app window (`AppDesktop`) flies out of the laptop, stops whole on the dark page, slides right as the
list appears (the pair is centred and always fully on screen, by the user's request; narrower screens shrink it or tuck its side panels), then moves through its four screens, as Mercury's dashboard does. Every layer is a graphics-card
texture, so scrolling redraws nothing, and scroll is lightly smoothed. Phones and short or reduced-motion screens keep the separate tour.

## ROUND 13 (2026-11-04): the two exact effects
The user asked for Mercury's hero motion and Wise's "Excellent everywhere" as they are. Both were recorded frame by frame.
- **Hero (`hero.tsx`, `hero-scene.tsx`):** a 2.5-screen pin, 1,350px on a 900px screen, as Mercury's is. Mercury scrubs a video;
  we can't use their footage, so the same camera move is built from layers in true perspective, with our app on the
  laptop. Words fade from 14% to 42% of the pin. A photoreal video can replace the drawing later with the same scroll code.
- **Catch (`catch.tsx`):** white band, 392x542 cards, 78px arrows, and Wise's step back: over 1s the passed card shrinks
  to 50% and fades behind the next. Its heading goes to 80px on request, past the 48px limit, in this section only.

## ROUND 12 (2026-11-04): built from the user's references, overrides anything below it
The user rejected the calm white redesign and named references: Mercury ("the best"), Wise's "Excellent
everywhere", Circle, Revolut (couldn't be captured: it blocks automated browsers) and Plaid. They were studied live.
- **Dark page in Paraa's ink and gold,** with light cards using `surface-light`. Replaces round 2's light theme.
- **Hero like Mercury's:** a drawn landscape (`hero-scene.tsx`), centred 48px headline, one field and button, the
  product cropped by the fold, the disclosure in the first view.
- **Sticky product tour** (`product-tour.tsx`), **light cards with product pieces** (`trust.tsx`), **arrow-led cards**
  (`catch.tsx`, which says the catch because we have no reviews), and a **gold band** holding the form (`ask.tsx`).
- **No visible `[TODO]`s, and no empty sections.** Fees, who holds the money and company details are left off until
  they're confirmed, as round 4 asked. `docs/redesign/proposal.md` section 9 lists them. They block launch.
- **Form:** name, mobile, optional email, question, consent. Replaces round 4's list.
- **Off the page:** "No tax when you invest", the tax calculator, what-if and Why USD (unsigned or unsourced).
- **Kept:** Basket and Four steps, restyled only as far as the dark page needs. No invented reviews, logos or people.

## ROUND 11 (2026-11-04): calm trust redesign, overrides anything below it
The user approved `docs/redesign/proposal.md` with "Implement". Its sections 3 to 6 are the spec for order,
design system, motion and copy. Baskets and Four steps stay the visual reference. Decisions, by the proposal's
numbers in section 8:
- **3 Calm:** the pinned hero, full-width dark and gold bands, loops and the header progress line are gone. This
  reverses rounds 7 to 9. Backgrounds are white or grey-50, and colour lives in contained tiles.
- **12 Scroll:** two scroll moments only: the Four steps stack and the money-path line.
- **2 `[TODO]`s:** visible on this branch, and a plain production build fails while any remain. This replaces
  round 4's "no placeholder tags". See the README.
- **6 Tax:** "No tax when you invest" and the tax estimator are off everywhere until sign-off.
- **7 Next step:** "Talk to a CA" is the primary CTA until store links exist.
- **8 Bad-year tool:** off by default behind `BAD_YEAR_TOOL` in `src/lib/flags.ts`. Real-year presets are removed.
- **9 Baskets:** all four edits accepted (caption above the tiles, no hover lift or wave, facts row, new lede).
- **10 Baskets claims:** the gold risk line is reworded to "Can stay flat for long stretches." and the S&P line
  shows `[TODO: source and date]`.
- **11 FAQ:** "What happens to my money, and what could I lose?" replaces "Is my money safe?", so R1 holds.
- **5 Headings:** the 48px limit stays.
- **13 Why USD:** off the page until RBI/FBIL data exists.
- **14 CA payment:** "Your CA may be paid by us; see Fees." sits beside the CA pitch and the form.
- **15 "It's free":** removed until confirmed.
- **22 Nav:** Basket · How it works · Your money · Fees · Who we are · FAQ, plus "Talk to a CA".

**New from the user: the form also collects email.** An optional "Email (optional)" field, checked for format
only when filled in, shared by the client and API route through `lib/advisor-request`, and sent in the webhook.
Name and mobile stay required. This replaces round 4's "name, mobile, question, consent, nothing else".

**Honesty rules, no exceptions:** no invented logos, partners, audits, custodians, licences, AUM, user counts, fees,
people or testimonials. Mock screens carry an Example tag and show no returns, value, percentages, prices or charts.
Never imply government approval, name the Ministry of Finance as a selling point or use government emblems. Never
reword FIU-IND as approval. The ASCI line stays verbatim.

**Still open, for counsel or compliance (proposal section 8):** whether the basket is a VDA (1), where the ASCI line
goes (4), whether the CA is giving advice (16), KYC wording (17), lock-in vs maturity (18), and what FIU-IND proof can
be shown (19). The full list of facts needed is in proposal section 9.

**Choices made while building that the proposal didn't spell out:**
- The footer's registrations table says "Registered with", not §0.2's "Regulator", because FIU-IND registration isn't
  regulation of this product.
- The mobile menu is a native `<details>`, so it works with no JavaScript. Motion is gone from the header.
- The hero's radios use the sibling selector rather than `:has()`, so older browsers switch screens too.

## ROUND 10 (2026-11-04): FIU-IND registration
The user stated that Paraa is registered with FIU-IND. The hero's third tile now says so, and a footer note
(`fiu-registration-v1`) says what that means. Rules:
- **State the registration as a fact.** No "approved by", "certified by" or "under the Ministry of Finance", and
  no government emblem or logo: wording that suggests official backing is misleading, however it's phrased.
- **Keep the footer note beside any such claim.**
- **Still needed (R6):** the number (`FIU_REG_NO` in `src/lib/links.ts`), the legal entity's name, and
  compliance sign-off on the wording. Not yet on file.

## ROUND 9 (2026-11-04): hero rebuilt, overrides anything below it
The user rejected the split hero. It's now a centred headline over three full-width tiles that start as a
tilted 3D stack and deal out into a linked row while the page is pinned (md+; phones don't pin). The finished
row is the plain CSS layout, so server render and reduced motion show it flat. All in `hero.tsx`.
**The hero must not repeat Basket:** its tiles answer "why Paraa?" (rupees, no tax when you invest, the
registration) and never show the asset split. The gold facts band (`FactMarquee`) was removed because it repeated those three.

## ROUND 8 (2026-11-04): the rest of the page, overrides anything below it
The user liked only Basket, Why USD and How it works from round 7: big colour blocks, big numbers, drawn art.
Those three are the reference and weren't changed. Everything else was brought up to them: a fully dark hero
with art on the deck cards, live visuals in the what-if and tax calculator with the answer in big gold type,
art tiles for CA Advisors (`PlanArt`, `ChatArt`, `FileArt`), a gold #ask band, solid FAQ tiles, and a dark
closing band whose skyline runs into the footer. Headings stay inside the design file's 48px limit.

## ROUND 7 (2026-11-04): bolder, overrides anything below it
The user found round 6 still too plain. Same tokens, type scale, copy and pinned hero, with more visual weight:
- **Replaces round 2's motion limits:** scroll-linked effects and one slow loop are now allowed. Scrolling is
  still never taken over (no wheel interception), and anything that loops needs a pause control.
- **Replaces round 6's "no cards":** Basket is solid tiles sized by share with drawn art (`asset-art.tsx`), How it
  works is sticky stacking cards, Advisors has icon rows. No art may read as basket performance.
- **New pieces:** `Mark` (gold highlighter under a heading phrase), `FactMarquee` (gold band with pause), the
  dark hero stage, the dark Why USD band whose line and rupee figure follow scroll, the header progress line.

## ROUND 6 (2026-11-04): structural polish, overrides anything below it
The user asked for a clean, polished UI that doesn't look generated. Colours, type, copy and the pinned
hero stayed; how sections are built changed. Guidance came from Impeccable (`pbakaus/impeccable`) and Emil
Kowalski's skills; `npx impeccable detect http://localhost:3000` checks the running site.
- **No small label above a heading.** The `eyebrow` utility and `SectionHead`'s `eyebrow` prop are gone.
- **No rows of same-size icon + heading + text cards, and no card inside a card.** Use hairline rows
  (Tax, Advisors, FAQ), a real proportional shape (Basket's bar) or a numbered rail (How it works). Cards are
  for tools only: the tax calculator and the form.
- **One dark Primary band (`surface-ink`) for the main action (#ask), one gold band (closing CTA), a dark
  footer.** `surface-ink` also switches the focus ring to gold; a white card inside it sets it back.
- **Sliders are slim** and fill from zero when the range crosses zero. Slider values are bold body text.
- **Motion:** the hero's 3D deck is the page's one big moment, and it lands flat so the text is crisp.
  `Reveal` is now a 12px rise + fade over 500ms with no blur; section headings don't animate. Easing is
  `cubic-bezier(.23, 1, .32, 1)`. The rupee line draws once. The header underline follows the current section.
- **Icons come from lucide, never text glyphs** such as arrows.

Homepage order is unchanged. "CA Advisors" and the #ask band are now two separate sections.

## ROUND 5 (2026-11-03): no Grade Capital anywhere, overrides anything below it
- **The site never mentions Grade Capital.** The name-change bar (`rebrand-bar.tsx`) and the footer's
  "Formerly Grade Capital." are gone; this replaces `content-rules.md` §0.1's rebrand bar and the
  "Formerly" part of §0.2's bottom line. Don't link to any grade.capital address either.
- **Blog hidden until it has a Paraa address.** `BLOG_URL` in `src/lib/links.ts` is `null`, which hides
  the header and footer Blog links and the Learn box. Set it and all three come back.
- **Logo:** the official wordmark (`src/assets/paraa-logo.png`) and app icon (`src/app/icon.png`,
  `apple-icon.png`). A brand guide is coming; it will set colours and type.

## ROUND 4 (2026-11-03): user-friendly pass, overrides anything below it
The user found the site too wordy, the navbar unclear and the placeholders unfriendly. Rules now:
- **No placeholder tags on the public page.** No "TO CONFIRM", "Illustrative" badges or "Soon" links.
  If a fact isn't confirmed, leave it out rather than tagging it (this replaces rulebook R6's visible
  marking). Example numbers are labelled in plain words ("Example allocation, for illustration").
- **Short and plain.** One-line card text, simple words, no jargon ("pts", "NAV", "sleeve").
- **Navbar:** Basket · Why USD · How it works · Tax · CA Advisors · Blog, plus "Talk to a CA".
- **Removed:** the readiness quiz, the birth-year calculator, the rupee help/hurt cards, the "never do"
  box, FAQ tabs, and the footer's empty registration / company / grievance / legal-link blocks.
  Those footer blocks must come back, filled in, before launch (`content-rules.md` §0.2).
- **Form:** name, mobile, question, consent. Nothing else.

Homepage order: Hero → Basket → Try it (#what-if) → Why USD → How it works → Tax → CA Advisors (#ask)
→ Blog → FAQ → Closing CTA.

## ROUND 3 (2026-11-03)
The site now sells **one international basket**: tokenized US stocks, gold and crude oil, held through
derivative contracts, priced daily (NAV) in US dollars. The user's decisions:
- **The word "crypto" appears nowhere in site copy.** The single exception is the ASCI disclaimer, verbatim,
  in the footer legal block (`asci-vda-v1`), chosen by the user. Don't paraphrase it or repeat it elsewhere.
- **Tax position (as the user stated it):** nothing is taxed when you invest; profit is business income from
  derivatives, taxed at the investor's slab rate + 4% cess, filed on ITR-3. Loss carry-forward is 4 or 8
  years depending on classification, so the copy names both and defers to the CA. The CA review is `TO CONFIRM`.
- **CA advisors:** a CA is assigned when someone joins; before that, visitors send a question (`#ask`), which
  goes to `/api/advisor-request` and on to `ADVISOR_REQUEST_WEBHOOK_URL` (see `.env.example`). Without that
  variable the form says "not sent"; it never drops a question silently.
- **Blog:** one link, `BLOG_URL` in `src/lib/links.ts`. No blog article titles on the site (they contain
  words the site's copy rules keep off it).

Facts taken from the platform (grade-backend), not invented: KYC via DigiLocker/PAN/selfie that never
auto-rejects; units at the next daily NAV; monthly plans skip a missed payment, never double-charge;
withdrawals only at maturity, only to the investor's own account; minimum US$100.
Still `TO CONFIRM`: sleeve weights (`lib/basket.ts`, illustrative 50/30/20), lock-in length, withdrawal
timing, fees, contract venue/custodian, CA response time, CA fee, advisor-desk email, registrations.

Removed in round 3 (in git history): the fee receipt and its invented fee schedule (`lib/fees.ts`), hero
variants A/B/D and `/preview`, Methodology, Routes for checkers, the partner card, the trust-check cards.

### Homepage order (`src/app/page.tsx`)
Hero (3D deck: the three sleeves) → Basket (#basket) → What-if (#what-if) → Why dollars (#why-usd) →
How it works (#how) → Tax (#tax) → Is it right for you? (#fit) → Your CA (#advisors, form at #ask) →
Blog (#learn) → FAQ (#faq) → Closing CTA.

---
*Round 2 follows. Its design-system and motion rules still apply; its homepage order and fee notes don't.*

## ROUND 2 (2026-11-03)
The user asked for three things:
1. Remove all basket NAV data. The explorer, range stats, `/nav` page, ledger, changelog and CSV are **gone**.
2. Refine the overall UI/UX, with smooth animation and transitions.
3. Follow the design system **strictly**.

Their answers to the open questions:
- **Light theme**, like the design file.
- **Main buttons = Primary #272A33** (white label), gold #FDC037 = secondary.
- **No basket performance data anywhere.**

### Design system: strict
Every token is in `src/app/globals.css`, and all of them come from the design file. **Use only these:**
- **Surfaces:**
  - `bg-background` (#FFF) and `bg-background-alt` (Greyscale 50 #F8F9FD) for alternating sections;
  - `bg-card` (#FFF) with `border` (Greyscale 200) and `shadow-card`;
  - `bg-muted` (Greyscale 100);
  - `bg-paper` (#F2F2F2);
  - `bg-ink` (#272A33) for dark emphasis panels, with white text.
- **Text:**
  - `text-foreground` (Greyscale 900) for headings and key numbers;
  - `text-muted-foreground` (Greyscale 600) for body;
  - `text-faint` (Greyscale 500) for captions;
  - `text-accent` (gold-800) is the **only** gold text colour.
- **Gold:** `bg-secondary` (#FDC037), and the `gold-50 … gold-900` tints/ramp for fills, highlights and badges. `main-1/2/3` are the "Main" swatches.
- **Alerts:** `success` #10B981, `warning` #FACC15, `error` #EF4444, plus `positive`/`negative`.
  - Use them only as fills, icons, borders, bars or tinted backgrounds (e.g. `bg-success/10 border-success`).
  - **Never use them as text on white.** They fail contrast: green 2.5:1, yellow 1.6:1, red 3.8:1.
  - Meaning goes in words and +/− signs, with dark text.
- **Buttons:**
  - `ButtonLink`/`Button` `variant="default"` is the dark primary; `"secondary"` is gold; `"outline"` and `"ghost"` are also available.
  - **At most one primary button per view**, and gold secondary buttons are rare.
- **Type:** only the file's scale.
  - Headings: `type-h1 … type-h6` (Bold).
  - Body: `text-body-xl|lg|md|sm|xs` with weights `font-normal|medium|semibold|bold`, plus `font-extrabold` only at sm/xs, as the file shows.
  - **No arbitrary sizes** (`text-[28px]` etc.). Big numbers use `type-h2`/`type-h3`/`type-h4` + `num`.
  - `text-body-xs` (10px) is for labels only, never sentences.
- **Radius:** `rounded-sm|md|lg|xl` (8/12/16/24). **Spacing:** the 4px grid only. **No raw hex anywhere in components.**
- **Focus:** the global 2px Primary ring. Don't remove it.

### Motion: smooth, but quiet
- Use `Reveal`, `RevealGroup` and `RevealItem` from `@/components/paraa/primitives` (a 16px rise, fade and blur-clear, once). They are the **only** scroll reveals: one vocabulary, no per-section custom timings.
- **Hover:** cards lift `hover:-translate-y-0.5 hover:shadow-lift` (200ms, `ease-out-soft`); links get underline or arrow nudges; buttons are already animated.
- **State changes:**
  - numbers that change use `@number-flow/react` (already installed);
  - accordions and tabs animate height and layout through Motion and Radix;
  - the quiz uses `AnimatePresence`.
- Respect reduced motion: `MotionConfig reducedMotion="user"` is global, and nothing may stay at opacity 0 without JS.
- **Don't** add parallax, scroll-jacking, looping or autoplay animations, or anything over ~600ms.

### Removed: don't reintroduce
`/nav`, NAV charts, basket returns, drawdowns, "best/worst month", "since inception", CSV downloads, and links to any of them.
`lib/calc.ts` and `lib/nav-data.ts` are gone; the fee maths is in `lib/fees.ts`. The routes in `lib/routes.ts` are now `/` only.

### Homepage order (`src/app/page.tsx`)
Hero → TrustChecks → FeeReceipt → RupeeDollar → HowMoneyMoves → FitQuiz → (Incident, commented out) → Methodology → Router → PartnerCard → Faq → ClosingCta.

---
*Round 1 brief follows. Its file-ownership table is historical; its accessibility and compliance rules still apply.*

Finished version of **Concept A "The Open Book"** with grafts from B, C and D.
Round-1 prototypes (the source of all copy, maths and structure) were `concept-a … concept-d`; they,
the full spec `02-concepts.md` and the audit `03-audit.md` are in git history at commit `2194970`.
The shared part of the spec is kept in `content-rules.md` (§0.2 footer/legal, §0.3 copy rulebook: **binding**, §0.4 dataset).

## Homepage order (`src/app/page.tsx`)
| # | Section | Source | Component (named export) | File | Owner |
|---|---|---|---|---|---|
| – | Rebrand bar | A | `RebrandBar` | `components/site/rebrand-bar.tsx` | agent 1 |
| – | Header | A | `SiteHeader` | `components/site/header.tsx` | agent 1 |
| 1 | Hero, **ledger table commented out** | A5.1 | `Hero` (+ `HeroLedger` kept but not rendered) | `components/home/hero.tsx`, `hero-ledger.tsx` | agent 1 |
| 2 | Every claim, checkable | A5.2 | `TrustChecks` | `components/home/trust-checks.tsx` | agent 1 |
| 3 | NAV explorer | A5.3 | `NavExplorer` | `components/home/nav-explorer.tsx` | agent 2 |
| 4 | Both ends of the range | A5.4 | `RangeStats` | `components/home/range-stats.tsx` | agent 2 |
| 5 | The rupee, honestly (chart) | **B5.2** | `RupeeDollar` | `components/home/rupee-dollar.tsx` | agent 3 |
| 6 | Fee receipt | A5.5 | `FeeReceipt` | `components/home/fee-receipt.tsx` | agent 2 |
| 7 | How your money moves, **refined** | A5.6 | `HowMoneyMoves` | `components/home/how-money-moves.tsx` | agent 2 |
| 8 | Am I a fit? (questionnaire) | **D5.3** | `FitQuiz` | `components/home/fit-quiz.tsx` | agent 3 |
| – | NAV changelog: **commented out** | A5.7 | `Changelog` | `components/home/changelog.tsx` | agent 1 |
| – | Last time something went wrong: **commented out** | A5.8 | `Incident` | `components/home/incident.tsx` | agent 1 |
| 9 | Methodology | A5.9 | `Methodology` | `components/home/methodology.tsx` | agent 1 |
| 10 | Routes for checkers | A5.10 | `Router` | `components/home/router.tsx` | agent 1 |
| 11 | Partner card | **C5.6** | `PartnerCard` | `components/home/partner-card.tsx` | agent 3 |
| 12 | FAQ grouped by worry | A5.11 | `Faq` | `components/home/faq.tsx` | agent 1 |
| 13 | Closing CTA | A5.12 | `ClosingCta` | `components/home/closing-cta.tsx` | agent 1 |
| – | Footer + legal block | A + §0.2 | `SiteFooter` | `components/site/footer.tsx` | agent 1 |
| – | `/nav` NAV & performance centre (changelog section commented out there too) | A6 | page | `app/nav/page.tsx` + `components/nav/*` | agent 2 |

"Commented out" means: the component exists and is imported, but its JSX in the page is inside
`{/* … */}` with a one-line note saying why, so it can be switched back on in one edit.

Section anchors (header nav and cross-links use these): `#checks`, `#explorer`, `#range`, `#rupee`,
`#fees`, `#how`, `#fit`, `#method`, `#routes`, `#partners`, `#faq`.

## Use what's already built (don't re-create)
- `@/components/paraa/primitives`: `Section`, `SectionHead`, `Card`, `Badge`, `Illustrative`, `ToConfirm`,
  `ButtonLink`, `ArrowLink`, `Disclosure`, `Reveal`.
- `@/components/paraa/accordion`: `Accordion` (Radix; Watermelon accordion-9 look).
- `@/components/watermelon/adaptive-slider`: `AdaptiveSlider` (amount sliders).
- `@/components/watermelon/stepper`: `Stepper` (small integer inputs, e.g. months held).
- `@/components/watermelon/discrete-tabs`: `DiscreteTabs` (ARIA tabs with panels).
- `@/components/ui/button`: `Button` (for real buttons; `ButtonLink` for links).
- `@/lib/format`: `formatINR`, `formatUSD`, `formatPct`, `roundHalfUp`, `monthLabel`, `dateLabel`, `MINUS`.
  **All number display goes through these** (audit rule: round half-up only when displaying;
  ₹ Indian grouping; US$ international grouping; U+2212 minus).
- `@/lib/calc` + `@/lib/nav-data`: NAV maths, fee receipt, `headline()`, `SHOW_PERFORMANCE`. Tested.
- Icons: `lucide-react` only. No emoji, no images of people, no stock photos.

## Rules
- **Design tokens only.** Use Tailwind classes backed by `globals.css`: `bg-background`, `bg-background-alt`,
  `bg-card`, `bg-muted`, `text-muted-foreground`, `text-faint`, `text-accent` (gold text),
  `bg-primary`/`text-primary-foreground` (gold CTA, dark label), `border-border`, `border-border-strong`,
  `text-positive`, `text-negative`, `text-warning`, plus `gold-*`/`ink-*` primitives.
  **No raw hex, no `style={{color…}}`**, except SVG chart geometry, which may use `var(--…)` strings.
- **Type:** headings use `type-h1`…`type-h6`; body uses `text-body-xl|lg|md|sm` (xs = labels only).
  One `<h1>` per page (the hero). Section titles are `<h2>` via `SectionHead`.
- **Gold is the single accent**, used sparingly (≈3 gold items per screen).
- **Accessibility:**
  - every input has a visible label;
  - live results use `aria-live="polite"`;
  - charts are SVGs with `role="img"` + `aria-label`, plus a visually hidden data table or summary;
  - colour is never the only signal (use +/− and words);
  - touch targets are ≥ 44px; focus stays visible;
  - motion stays subtle (`Reveal` and the Watermelon components only).
- **Responsive:** check 375 / 768 / 1024 / 1440. No horizontal page scroll; wide tables scroll inside `overflow-x-auto`.
- **Compliance:** follow the rulebook (`content-rules.md` §0.3). In particular:
  - every number that could look real carries `<Illustrative/>`;
  - registrations, routes and partners use `<ToConfirm/>`;
  - currency claims always state both directions;
  - no "forex", "guaranteed", "safe", "#1", "best", "assured", "risk-free" or "insured";
  - commission figures stay off the homepage (a link to the partner page is fine).
- **Client components** (`"use client"`) only where there is state or interaction; everything else is a server component.
- Pure maths lives in `src/lib/*.ts` with a `*.test.ts` next to it, using relative imports with the `.ts` extension
  (e.g. `import { x } from "./format.ts"`) so `npm test` (node --test) can run it.
- **Gates before you finish:**
  ```
  npm run typecheck
  npx eslint src
  npm test
  ```
  All must pass for your files.
