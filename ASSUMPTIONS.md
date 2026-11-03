# ASSUMPTIONS

You asked us to decide rather than ask. Every decision below is one you can overturn; each
one says what changes if you do.

## Business
| # | Assumption | Basis | If wrong |
|---|---|---|---|
| B1 | **Lead offer = USD / forex exposure for Indian investors** ("dollar appreciation benefit"). Crypto is not advertised: at most one honest line in FAQ or legal. | `meeting.md`: "No crypto, only FOREX $$" and "dollar appreciation benefit, rather than USDT appreciation" | If crypto stays a product, add the ASCI VDA disclaimer wherever it's mentioned |
| B2 | The **regulatory region is India**. INR is the primary currency, Indian numbering (lakh/crore) is used in calculators, and a global audience is secondary. | App is India-only (phone OTP, PAN/KYC, INR deposits) | If global, add currency switch + jurisdiction pages |
| B3 | **All four audiences**: retail (primary), advisors/distributors, CAs, institutions (secondary, "talk to us"). | Brief + the existing advisor app | Drop routes if out of scope |
| B4 | **Tone = institutional trust, said plainly.** Not hype-fintech. Calm, specific, numbers with sources. | Brief: "trust building, not generic". Hype is also a compliance risk. | Concept D leans more modern if you prefer that tone |
| B5 | **We don't yet know which licences Paraa holds** (SEBI IA/PMS/AIF, RBI AD, IFSCA/GIFT City, FIU-IND). So the prototypes **claim none**. Every registration slot is a visible `TO CONFIRM` placeholder. | No licence evidence in the repo; the current site's claims can't be verified from here | Fill the placeholders after Compliance confirms. Several sections get much stronger when you do. |
| B6 | Mechanism (assumed): INR in → professionally managed USD-denominated baskets → NAV published → INR out. **How** the USD exposure is legally held (LRS, GIFT City fund, exchange-traded INR-USD derivatives, etc.) is **unknown**, so prototypes show it as a labelled placeholder diagram. | Meeting notes only say "FOREX", not the structure | This is the #1 open question. It decides what the site can legally say (see research brief §Regulatory). |
| B7 | Track-record numbers on the current site (e.g. large % returns) are **not reused**. Prototypes use obviously-dummy figures marked `Illustrative`. | Unaudited performance claims are a SEBI/ASCI risk, and the brief says "honest" | Re-introduce only audited, period-complete, net-of-fee figures with a benchmark |

| B8 | The word **"forex" is not used in marketing copy**; we say "USD-denominated investing". Every currency claim shows **both directions** (a weaker rupee helps, a stronger one hurts). | Research brief: retail forex for residents is legal only in INR pairs on recognised exchanges, and RBI's Alert List targets "forex" platforms | Revisit only once Compliance confirms the legal route |
| B9 | No superlatives ("#1", "first", "best"), no tax-avoidance framing, no "insured/regulated/certified" claims. | Research brief: these all appear on grade.capital today and conflict with the SEBI/ASCI codes | — |

## Design
| # | Assumption | If wrong |
|---|---|---|
| D1 | Image 1 = the current grade.capital site (tone reference only). Images 2–3 = the binding design file. | Swap the tone reference |
| D2 | The **dark canvas** (`#131416`) is the default theme, because the screenshot is dark. One concept (B) uses the light theme to test whether "trust" reads better light. Both themes are built only from design-file colors. | Flip themes in `tokens.css` |
| D3 | The unlabelled "Main" golds and the "Additional Colors" ramps were **eyedropped**, so they're approximate (±2–3%). Labelled hexes are exact. | Replace with Figma variable values |
| D4 | Mobile heading sizes (H1 34 / H2 30 …) are ours; the design file shows desktop only. | Adjust `@media` block in `tokens.css` |
| D5 | Spacing scale (4px base), radii (8/12/16/24) and line-heights are inferred; the file doesn't specify them. | Adjust tokens |
| D6 | Gold is **never** text on light backgrounds (fails contrast); `--gold-800` is used instead. CTA labels on gold are dark, never white. | — (accessibility rule, keep) |
| D7 | Icons are inline SVG strokes, not emoji, and no stock photography is used. Faces of "customers" would be fabricated, which is a trust failure. | Add real photography of the real team later |

## Build
| # | Assumption | Why |
|---|---|---|
| X1 | **Static HTML + CSS + ~80 lines of vanilla JS**, with a shared design system in `/shared`. No framework, no npm. | Zero install/cost, opens by double-click, fastest way to compare 4 directions. `tokens.css` ports directly to Tailwind/Next later. Trade-off: not production code. |
| X2 | Lives in `D:\paraa-website\`, **not** inside the investor-app repo, and nothing is committed. | A marketing site isn't part of the React Native app; per your standing "never auto-commit" rule |
| X3 | Manrope loads from Google Fonts (free). The design file links Fontshare; same family. | Self-host for production (privacy + performance) |
| X4 | "Watermelon UI" is **not installed** in this environment, so it was not used. UI/UX Pro Max was used. | Install it and re-run the component pass if you want it |
| X5 | "Motion agent" scope is implemented as one shared module (`shared/motion.js` + `motion.css`) that every concept opts into with `data-reveal`. It is not a separate pass per concept. | Keeps motion consistent and minimal, as briefed |
| X6 | All numbers, names, dates and figures in prototypes are **dummy** and labelled `Illustrative` where they could be mistaken for real. | Brief: dummy content is fine; honesty demands the label |
