# Competitive research: communicating security (Blockaid, Fireblocks)

**Date visited:** 10 Nov 2026. **Researcher scope:** Blockaid and Fireblocks only. **Purpose:** inform Paraa's single dark security band (section 6 in `../audit-2026-11-10.md`), plus the registration facts, footer and the "Ask a CA" form.

**Method.** Headless Chrome (playwright-core) with a normal desktop Chrome 130 user agent (iPhone Safari UA at 390px). Every page was scrolled top to bottom to trigger lazy content, then captured at 1440×900 and/or 390×844. Measurements came from `getComputedStyle`, `document.getAnimations()`, element inventories, a background-colour band sampler, and a pixel diff of two screenshots taken 1.5s apart. Scripts and all raw captures are in the scratchpad (`research-security/`). Cookie banners were dismissed with "Reject Non-Essential" before the curated shots.

**Labels used below:** **[M]** measured by script, **[O]** observed in screenshots, **[I]** inferred.

**Lens:** the `ui-ux-pro-max` skill. I ran `--design-system "fintech investment trust security" --variance 3 --motion 2`, which returned the **Trust & Authority + Conversion** landing pattern and the **Minimalism & Swiss Style** style. I also ran domain searches (landing, ux, product, style). Rule IDs such as `color-accessible-pairs` come from the skill's `references/quick-reference.md`.

---

## 1. Pages visited

| Site | URL | Status | Height @1440 | Captured |
|---|---|---|---|---|
| Blockaid | https://www.blockaid.io | 200 | 7,927px | 1440 + 390 |
| Blockaid | https://www.blockaid.io/platform-overview | 200 | 4,595 | 1440 |
| Blockaid | https://www.blockaid.io/transaction-security | 200 | 7,191 | 1440 + 390 |
| Blockaid | https://www.blockaid.io/end-user-protection | 200 | 9,169 | 1440 |
| Blockaid | https://www.blockaid.io/compliance | 200 | 6,944 | 1440 |
| Blockaid | https://www.blockaid.io/threat-intelligence | 200 | 6,298 | 1440 |
| Blockaid | https://blockaid.io/about-us | 200 | 2,638 | 1440 |
| Blockaid | https://www.blockaid.io/legal | 200 | 1,262 | 1440 |
| Blockaid | https://blockaid.io/demo | 200 | 1,561 | 1440 |
| Blockaid | /security, /trust, /customers | **404** [M] | n/a | n/a |
| Blockaid | trust.blockaid.io | **DNS does not resolve** [M] | n/a | n/a |
| Fireblocks | https://www.fireblocks.com | 200 | 7,752 | 1440 + 390 |
| Fireblocks | https://www.fireblocks.com/platforms/security | 200 | 9,572 | 1440 + 390 |
| Fireblocks | https://www.fireblocks.com/platforms/governance-and-policies | 200 | 8,529 | 1440 |
| Fireblocks | https://www.fireblocks.com/trustco (qualified custody) | 200 | 8,267 | 1440 |
| Fireblocks | https://www.fireblocks.com/customers | 200 | 6,023 | 1440 |
| Fireblocks | https://www.fireblocks.com/team | 200 | 3,808 | 1440 |
| Fireblocks | https://www.fireblocks.com/regulated-entities | 200 | 24,990 | 1440 |
| Fireblocks | https://www.fireblocks.com/request-demo | 200 | 2,775 | 1440 |
| Fireblocks | https://trust.fireblocks.com | **403, Cloudflare "Just a moment…" challenge.** Blocked, so not studied. | n/a | n/a |

No site blocked the main marketing pages. The only block was Fireblocks' trust centre subdomain.

---

## 2. Measured facts

### Blockaid

| Property | Value | Label |
|---|---|---|
| Fonts | `NeueHaasDisplayProSans` (Neue Haas Grotesk Display) for everything; `AndaleMono` for uppercase eyebrow labels and diagram tags | M |
| H1 | 64px / weight 500 / line-height 70.4 / tracking **+0.64px** / `#232323`. Mobile: 36px / 450 | M |
| Section headings | 40px / **450** / lh 48 / tracking +0.4px. On the homepage they're mostly `<h3>`; the page has only one `<h2>` | M |
| Body | Lede 20/28 at 450, in rgba(35,35,35,.8) (7.8:1 on `#F8F8F8`). Body 16/28 (**1.75**) and 18/27 | M |
| Page background | `#F8F8F8`; cards are `#FFFFFF` | M |
| Dark surfaces (homepage) | One band in `#0E0E0E` from y=2400 to 4480 (**2,120px, 27% of the page**). After it the page is light again, then a dark final CTA and footer (`#0E0E0E` / `#000`). The product page `transaction-security` has **no** dark band, only black inset panels | M |
| Text on dark | Headings `#FFF`; body white at 80% (**12.4:1**); footer links `#8D8D8D` on black (6.3:1) | M |
| Accent | `#FF4500` (orange-red). It's the colour on only 11 elements on the homepage: link arrows, bullets, warning states | M |
| Threat-state colours | Green "BENIGN", amber "SUSPICIOUS", orange "MALICIOUS". Each pairs a text label with an icon, not colour alone | O |
| Container | 1280px content (80px gutters at 1440); several 1440px max-width wrappers | M |
| Buttons | Primary 46px high in the hero (40px in the nav), **radius 0–1.2px**, `#292923` fill, white 16/500 | M |
| Nav | Announcement bar (48px, dark) + nav (~60px) with 6 dropdowns + "Request a Demo". Sticky. Mobile: logo + hamburger | M/O |
| Section rhythm | Sections sit about 120–160px apart. The single measured `<section>` has 72px top and bottom padding | O/M |
| Media | 0 canvas, 0 video, 0 Lottie, 0 Rive. Diagrams are static images (68 img/svg on the homepage) | M |
| Motion | 0 running animations at every scroll position. Pixel change over 1.5s: 0.38% in the hero, **0% in the dark band**. Two `prefers-reduced-motion` rules | M |
| Hover | "Learn More" link: colour white → `#FF4500`, `transition: all` | M |
| Testimonial carousel | Manual prev/next and dots; side cards blurred | O |
| Mobile (390) | Height 10,493. No horizontal overflow. H1 36px. The hero illustration sits **above** the H1, which starts at about y=540 of 844 | M/O |

### Fireblocks

| Property | Value | Label |
|---|---|---|
| Fonts | "Ufficio Fireblocks" (custom) for display; **Figtree** for body (270 of 294 sampled text nodes) | M |
| H1 | 64px / **600** / lh 70.4 / tracking −0.56px / navy `#212647`. Mobile 48/600 | M |
| H2 | 48px / 600 / lh **46px (0.96)**. Some 48px section titles are `<h3>` | M |
| Body | 18/23.4 desktop, 16/20.8 mobile. Line height **1.3** | M |
| Surfaces | White `#FFF` and grey `#F4F5F7` panels with a signature angled cut-corner. **No dark band anywhere except the navy footer** (`#212647`), on the homepage and on the security page | M/O |
| Primary colour | Blue `#4568F3` (white text on it 4.64:1). Body text navy `#212647` (14.7:1). Key words in headings are set in lighter blue | M |
| Container | 1280px content; 1408 and 1440 wrappers | M |
| Buttons | **40px** high, radius 12px, blue fill, 16/500, arrow icon | M |
| Nav | Utility bar (language, Sign in) + main nav with 5 dropdowns (about 60 links in the mega menu) + "Talk to sales". **Sticky header 130px desktop, 133px mobile (16% of an 844px screen)** | M |
| Media | Homepage: one **autoplaying, looping 1280×720 WebM** in the hero, 2 Lottie players, a Splide logo marquee (5,000ms transform loop) | M |
| Motion | **32% of hero pixels changed in 1.5s** (video). Marquee running at every scroll position. Ten `prefers-reduced-motion` rules | M |
| Counters | Homepage text contains both "2500" and "2,500", which suggests a count-up animation | I |
| Hover | CTA background `#4568F3` → `#212647`. "Who we serve" card: no transform or shadow change | M |
| Certifications | Five tiles (SOC 2 Type 2, NCC audit, C4 CCSS QSP Level 3, penetration testing, ISO 27001) with green shield-check icons. Footer badges (CCSS, AICPA SOC 2, four ISO) on every page | O |
| Mobile (390) | Height 10,604. `overflowX` is false, but on the security page the three-column "approach" row does **not stack**, so "Rigorous standards" is clipped at the right edge | M/O |

---

## 3. How each site communicates security

### Blockaid: mechanisms, drawn as product states
- **Headings name a mechanism and a moment [O].** "Reveal the full onchain impact of a transaction, before it's signed." "Protect users from signing transactions that will drain their assets." "Log security and regulatory information on every address involved in a transaction." Each one has a verb, an object and a time. The bullets underneath are checkable specifics: "<300ms P99", "EIP-712 support", "OFAC-sanctioned entities". See `shots/blockaid-03-product-ui-threat-states.jpg`.
- **The threat is shown as the UI the end user would see [O].** A swap review card. A "MALICIOUS TRANSACTION · TRANSACTION BLOCKED" state. An "ADDRESS WAS INVOLVED IN A HACK" callout over an entity list. These are calm wireframes on a dotted 1px grid, not dramatic art.
- **The dark band explains where the knowledge comes from [O/M].** "Powered by superior threat intelligence" is followed by three alternating rows: Customer Data Network, Onchain data and Offchain data. Each row pairs a diagram with about 40 words and a "Learn More" link. The data-labelled diagrams use the BENIGN / SUSPICIOUS / MALICIOUS tags. See `shots/blockaid-02-dark-threat-band.jpg`.
- **Adjectives still slip in [O]:** "superior", "unmatched", "Enterprise-grade", "Battle-tested", "the trust layer". They sit on top of the specifics rather than replacing them.
- **Trust and compliance page: none exists [M].** /security and /trust return 404, and trust.blockaid.io doesn't resolve. No visited page mentions SOC 2, ISO or a pen test (text search across six pages: 0 hits). Their proof is customer logos, investors, stats, quotes, and a public **threat research library** of incident write-ups (`shots/blockaid-08-threat-research-index.jpg`). Publishing what they've seen is their credibility.
- **Legal Hub [O]:** three documents, each with a **"Last updated" date** (`shots/blockaid-05-legal-hub-dated.jpg`).

### Fireblocks: layered architecture plus regulatory paper trail
- **Defense-in-depth stack [O].** An isometric stack of layers, each labelled with a mechanism: "Multi-Device Approval… trusted execution environments (TEE), biometric authentication", "Distributed Wallet Infrastructure: no single point of private key compromise", "Zero-Trust Architecture… inside secure enclaves". It's the clearest one-glance diagram of "how we protect you" in this research. See `shots/fireblocks-02-defense-in-depth-stack.jpg`.
- **Approval-flow UI [O].** On the policy page, the hero is a transfer card listing an initiator, three approvers and their Approved/Pending states (`shots/fireblocks-05-policy-approval-ui.jpg`). It shows the control as a concrete moment.
- **Certifications named in a sentence [O].** "SOC 2 Type 2 certification (zero material findings), ISO 27001 … C4 CCSS QSP Level 3". The section right after is pure adjective: "Always vigilant", "Multi-layered security", "Rigorous standards". The contrast between the two is the lesson (`shots/fireblocks-03-certs-vs-adjectives.jpg`).
- **Regulated Entities page [O/M].** It gives the legal entity name, the regulator ("New York State Department of Financial Services"), the FinCEN MSB number, the NMLS ID with a link to the regulator's own lookup, and a table of state licences with numbers. It also states the **scope limit**: services from these entities "are not included with the Fireblocks software platform". This is Paraa's R6 rule in practice (`shots/fireblocks-04-regulated-entities.jpg`).
- **Complaint path [O].** The TrustCo page ends with how to complain to the company *and* how to complain directly to the regulator (email, phone, post, URL) (`shots/fireblocks-07-trustco-disclosure.jpg`).
- **Superlatives everywhere [M]:** "world's most trusted" (footer, every page), "The most advanced security stack in the industry", "world's first". Paraa can't say any of these (R1).

---

## 4. Dark surfaces, colour and type

- **Neither site is a dark site [M].** Blockaid is light (`#F8F8F8`) with **one** near-black band covering 27% of the homepage, plus a dark CTA and footer. Fireblocks is light throughout, with only a navy footer. That supports the owner's "light page, one dark band" decision. Blockaid's homepage is almost exactly that structure.
- **What makes Blockaid's band feel serious [O/M]:** near-black `#0E0E0E` rather than navy or gradient; white text at 80% opacity for body; inset panels one step lighter (`#1A1A1A`-ish [I]); diagrams in thin 1px grey lines with colour **only** on the state tags. There's no glow, no gradient and no motion (0% pixel change [M]).
- **Type [M]:** Blockaid's display weight is light (450–500) with *positive* tracking and 1.75 body leading, which reads unhurried and editorial. Fireblocks uses 600 with negative tracking and 1.3 leading, which reads denser and more "SaaS". The audit's choice of Manrope 600 with tight tracking sits between them. Blockaid's evidence suggests trying **500** for the security band's large headings on dark, where heavy weights look bolder than they are [I].
- **Second voice [O]:** Blockaid uses a monospace (Andale Mono, uppercase, letter-spaced) for eyebrows ("TRANSACTION PREVIEW"), diagram tags and testimonial names. It gives a "system output" texture cheaply. It is **not** accessible in one spot: orange `#FF4500` mono text on a peach tag measures **2.83:1** [M], which fails `color-contrast`.

## 5. Diagrams and product-UI visuals

| Device | Blockaid | Fireblocks | Usable by Paraa? |
|---|---|---|---|
| Product UI in a "state" (warning, blocked, approved) | Yes: malicious-transaction card, hacked-address callout | Yes: approver list with Approved/Pending chips | **Yes.** Show a real Paraa screen state (e.g. "Withdrawal to your own bank account: ••••4321"), labelled `Illustrative` |
| Labelled architecture diagram | Data-network rings, cubes, globe | Isometric layer stack, each layer labelled | **Partly.** A flat, labelled "who holds what" diagram fits, but only once the facts are confirmed. Isometric 3D doesn't fit the audit's flat system |
| Dotted hairline grid behind mock-ups | Yes, a signature | No | **Yes**, inside the dark band only (matches the TRM hairline principle in the audit) |
| Certification tiles with icons | No | Yes, green shield-checks | **No**, until real (R6) |

## 6. Proof: what we can and can't emulate

| Proof type | Blockaid | Fireblocks | Paraa |
|---|---|---|---|
| Customer logo wall | 18 logos ("PROTECTING THE BEST") | Marquee plus "2,000+ organizations" | **Can't** (no customers to show; R11 spirit) |
| Big counters | 5.9B / $312B / 527M / $13.1B, no date or source | 2,500 / $16T / 750M, no date or source | **Can't.** Our numbers need a date and source (R3) |
| Stat consistency | **Drift [M]:** homepage "$312B assets secured / 527M attacks / $13.1B theft prevented" vs End User Protection page "$431b+ / 585m+ / $14.7b+" | **Drift [M]:** homepage "750M wallets created / 2,500 enterprises" vs demo page "300M+ Wallets Created / 2,000+" | A warning: undated numbers drift. R3 prevents this |
| Testimonials | Named quotes (Coinbase, MetaMask) | Named quotes plus a G2 star rating on the demo page | **Can't** (R11) |
| Investors | "Backed by" logo row; "$83M raised" on About | Not on the pages visited | **Can't** |
| Certifications | None shown | SOC 2, ISO 27001, CCSS, NCC, pen test | **Only real ones, with entity, body, number and link** (R6) |
| Regulatory registration | None | Entity + regulator + number + lookup link + scope limit | **Yes, the core pattern for us.** FIU-IND line with number (currently `FIU_REG_NO = null` → `placeholder-tag`) and what it does *not* mean |
| Complaint and escalation path | No | Company *and* regulator contacts | **Yes** (grievance officer is TO CONFIRM; already a launch blocker) |
| Dated legal documents | Yes, "Last updated" per doc | No | **Yes** |
| Published research / incident write-ups | Large library | Blog | **Adapt:** a "How to spot a fake" explainer is our honest version |
| Team photos | Real team photos on About | 15 executive headshots | **Not yet** (R11: monograms until people sign off) |

## 7. Components, interactions, motion

- **Blockaid is static [M]:** no video, canvas, Lottie or running animations. The technical feel comes from drawing, not motion. Interactions are colour-only hovers and a manual testimonial carousel with prev/next buttons. That fits `motion-meaning` and `excessive-motion`, and supports the audit's "nothing looping" rule.
- **Fireblocks moves constantly [M]:** a hero video loop (32% of pixels changing), a logo marquee, two Lotties, and probably count-up counters [I]. Ten reduced-motion rules exist, but the marquee had no visible pause control [O]. That's a gap against `auto-rotation-controls`.
- **Scroll reveal failure [O]:** in the full-page capture of `/team`, the H1 "Meet the Executive Team" was still near-invisible. A reveal that waits for scroll can leave content hidden (`opacity-threshold`; the skill's motion preset also warns "don't reveal… content as invisible-by-default without a no-JS fallback"). Paraa's existing reveal already avoids this, which the audit says to keep.
- **Customer-story thumbnails [O]:** 6 of 10 cards rendered as empty grey boxes in capture. Lazy images without a placeholder look broken to a screenshotting sceptic.
- **Forms.**
  - *Blockaid demo* (`shots/blockaid-06-demo-form.jpg`) [O]: visible labels above every field, `*` for required, a "what we'll discuss" select, an optional scheduling link, an **unticked** marketing checkbox, Cloudflare Turnstile, and "By submitting this form, you agree to our Privacy Policy" under the button. A three-item Monitor/Detect/Protect list beside the form says what the meeting covers.
  - *Fireblocks demo* (`shots/fireblocks-06-demo-form-and-stats.jpg`) [O]: **placeholder-only labels** (fails `input-labels`), a phone number that's required and pre-set to India +91 from the visitor's location, seven required fields, and a G2 rating plus testimonial beside it.

## 8. Mobile

- **Blockaid [O/M]:** the dark band stacks cleanly (diagram, then text) with no overflow, and the 18px body copy stays readable on black (`shots/blockaid-07-mobile-dark-band.jpg`). One weakness: the hero art is placed *before* the H1, so the promise starts about 540px down (`content-priority`).
- **Fireblocks [O/M]:** the sticky header takes 133px, 16% of the viewport (`fixed-element-offset`). On the security page the three-column row doesn't collapse; headings clip and the copy runs 1–3 words per line (`shots/fireblocks-08-mobile-columns-squeezed.jpg`; `horizontal-scroll`, `line-length-control`). Mobile body leading stays at 1.3 (`line-height` asks 1.5–1.75). The 40px CTAs are under the 44px target (`touch-target-size`).

## 9. Why they feel designed rather than AI-generated

**Blockaid.**
- **One decisive and unusual choice:** square, 0–1px corners on buttons and cards. Most AI-default sites use 12–24px radii and pills.
- **One accent used about 11 times.**
- **A second typographic voice** (mono) with a job: labels and system output.
- **Diagrams that could only belong to this product,** with real tags ("ADDRESS WAS INVOLVED IN A HACK", "WALLET DATA", "PROTOCOLS").
- **A repeated structural motif:** the dotted hairline grid.
- **Copy with specifics** (P99 latency, EIP numbers).

**Fireblocks.**
- **Brand assets of its own:** a custom typeface (Ufficio), a signature chamfered container shape that echoes the triangle logo, and the logo mark reused as the top of the layer stack.
- **Generic parts weaken it:** iridescent glass-gradient blobs (the skill's design system lists "AI purple/pink gradients" as an anti-pattern) and a three-up icon-plus-adjective row.

**Generic tells to avoid, seen on both:** blurred side cards in carousels, the "Learn about the X landscape" carousel, and big unsourced round numbers.

## 10. What would not suit an Indian retail investor

- **Crypto and web3 visual idioms:** the radar sweep, globe with "MALICIOUS" pins, wireframe cubes, neon green/amber/red tags, and words like "onchain", "drainers" and "EIP-4337". These read as hacking and crypto. Rule R14 keeps crypto out of our marketing, and the association alone costs trust.
- **Fear-led headlines** ("Attackers only need one gap", Fireblocks security hero). A first-time investor worried about scams wants to know *what we do and what they should check*, not that attacks are everywhere.
- **Institutional proof** (trillions transacted, banks as clients, "Talk to sales", "Request a demo"). These are irrelevant at retail scale. Our honest CTA is "Ask a CA" (R12).
- **Mega menus, a 25,000px licence page and long scroll stories.** These suit procurement teams, not someone deciding on a phone in two minutes on a mid-range Android.
- **Autoplay video and marquees** cost data and battery on low-end Android, which is the audit's F1/F5 concern.

---

## 11. Comparison

| Dimension | Blockaid | Fireblocks | Better model for Paraa |
|---|---|---|---|
| Page structure | Light + **one dark band** + dark CTA/footer | All light + navy footer | Blockaid (minus the dark CTA/footer; we keep one band) |
| Security explanation | Product UI in threat states; mechanism headings | Labelled layer stack; approval flow; certifications in prose | Both: Blockaid's *state UI* for "spot a fake", Fireblocks' *labelled layers* for "how your money moves" |
| Regulatory transparency | None visible | Excellent (entity, regulator, number, link, scope, complaint path) | **Fireblocks** |
| Adjective load | Medium | High (superlatives) | Neither; R1 is stricter than both |
| Motion | Static | Video, marquee, Lottie, counters | **Blockaid** |
| Type | Light display weights, 1.75 body leading, mono labels | 600 display, 1.3 leading | Blockaid's leading; Manrope weight per the audit |
| Accessibility | Body contrast high; orange mono tags 2.83:1 fail | Placeholder-only form labels, 40px CTAs, clipped mobile columns | Blockaid, with the tag fix |
| Mobile | Clean stacking; art before H1 | 133px sticky header; unstacked columns | Blockaid |

---

## 12. Actionable recommendations for Paraa

Each item gives what to adopt, where it goes on our page, why, and the skill guideline behind it. Nothing here requires a claim we can't back. Facts we don't have yet stay as `placeholder-tag` / TO CONFIRM.

1. **Model section 6 on Blockaid's homepage band, but shorter.**
   - **Where:** section 6, "How we protect your account", in the one ink band.
   - **What:** Ink `#272A33` edge to edge. A centred H2 and a one-line lede, then **three** left/right alternating rows. Each row is one mechanism with one small diagram and about 30–40 words.
   - **Height:** cap the band at about 1.3 screens at 1440 (Blockaid's is 2,120px).
   - **No "Learn more" links,** because we're a single page. The facts are the content.
   - **Why:** this is the closest real-world match to the owner's decision, and it was measured working at 27% of a light page. (`shots/blockaid-02-dark-threat-band.jpg`)
   - **Skill:** landing pattern *Trust & Authority + Conversion* ("Proof… Solution overview… Clear CTA path"); `whitespace-balance`; `consistency`.

2. **Write each row's heading as mechanism + moment, never an adjective.**
   - **Where:** the three security rows.
   - **Pattern:** Blockaid's "Reveal the full onchain impact of a transaction, before it's signed" and Fireblocks' layer labels. For us that means sentences like "Money comes back only to a bank account in your own name" (TO CONFIRM) or "We never ask for your OTP or PIN". The second one already exists in `footer.tsx` and should move into the band.
   - **Avoid:** never "Always vigilant" or "Rigorous standards" (`shots/fireblocks-03-certs-vs-adjectives.jpg` shows both side by side).
   - **Why:** sceptics trust things they can check. R1 bans "safe", "insured" and "bank-grade" anyway.
   - **Skill:** *Trust & Authority* "credibility" focus; the design system's anti-pattern list ("Unclear fees" by extension: unclear mechanisms).

3. **Make "How to spot a fake" a product-state diagram.**
   - **Where:** row 3 of the band.
   - **What:** two small phone-message or screen cards side by side. One is labelled "From Paraa" (e.g. a statement notice). The other is labelled "Not from Paraa" (e.g. a message asking for an OTP, or to pay into a personal UPI ID). Each card gets a text label **and** an icon (check / warning), plus an `Illustrative` badge.
   - **Pattern:** Blockaid's BENIGN / MALICIOUS tags and its "Malicious transaction · blocked" card, translated into retail scams people actually meet.
   - **Why:** this is the most specific, useful security content a little-known company can publish honestly. It's our version of Blockaid's threat-research credibility. (`shots/blockaid-03-product-ui-threat-states.jpg`)
   - **Skill:** `color-not-only` / `color-not-decorative-only` (label plus icon, not colour alone); `motion-meaning` (keep it static).

4. **Put a registration facts block at the end of the band, using Fireblocks' Regulated Entities pattern.**
   - **Where:** the last row of the band, mirrored in the footer.
   - **What, in one hairline-ruled list:**
     - the legal entity name;
     - the body (FIU-IND);
     - the registration number, or `placeholder-tag` while `FIU_REG_NO` is null;
     - a link to the place to verify it;
     - **what it does not mean** ("This isn't approval of this investment").
   - **Why:** this is R6 done properly. Fireblocks shows that entity, regulator, number, lookup link and scope limit together are the most credible security element on either site. (`shots/fireblocks-04-regulated-entities.jpg`)
   - **Skill:** *Trust & Authority* "Proof (logos, **certs**, stats)", replacing logos and stats we don't have with verifiable registration; `number-tabular` for the registration number.

5. **Add a complaint path, including escalation beyond us.**
   - **Where:** the footer legal block (section 9).
   - **What:** grievance officer contact (TO CONFIRM) plus where to escalate if we don't resolve it.
   - **Pattern:** Fireblocks TrustCo's "you may also send complaints directly to [regulator]" (`shots/fireblocks-07-trustco-disclosure.jpg`).
   - **Why:** telling people how to complain about you signals accountability. This is already a launch blocker in the audit, so the slot should be designed now.
   - **Skill:** `consistent-help` (help in the same place on every page).

6. **Date every legal document.**
   - **Where:** footer links to Terms, Privacy and so on.
   - **What:** "Last updated 10 Nov 2026" beside each one (Blockaid Legal Hub, `shots/blockaid-05-legal-hub-dated.jpg`).
   - **Why:** cheap and honest, and it fits R3's "every number has a date" spirit.

7. **Keep the band static and draw technical precision with hairlines.**
   - **What:**
     - 1px hairline frames (Blockaid's dotted grid) behind the band's diagrams;
     - one accent colour used only for state (the gold marker, per the audit);
     - no glow, gradient or loop;
     - the existing 12px reveal once, then nothing.
   - **Why:** Blockaid's band measured 0% pixel change and still reads as the most technical surface in this research. Seriousness comes from drawing, not animation. It also protects low-end Android (audit F1/F5).
   - **Skill:** design system *Motion 2/10, Subtle*; `excessive-motion`; `motion-meaning`; `reduced-motion`; `effects-match-style`.

8. **Fix the type and contrast on dark using Blockaid's measured values.**
   - **Body:** 16–18px with **1.6–1.75** line height. White at 80–85% on ink: `rgba(255,255,255,.8)` on `#272A33` measures **9.7:1** and `.85` measures **10.8:1** [M]. Both pass AAA. (Pure white on ink is 14.3:1. Blockaid's 12.4:1 is on a darker base.)
   - **Headings:** pure white, Manrope **500–600**. Try 500 at 40–48px on dark.
   - **Eyebrow labels:** if we use them, grey-300 or white text, *not* accent-on-tint. Blockaid's orange-on-peach is 2.83:1.
   - **Skill:** `line-height` (1.5–1.75), `color-dark-mode`, `color-accessible-pairs`, `color-contrast`, `weight-hierarchy`.

9. **Use Blockaid's demo form as the model for "Ask a CA".**
   - **Where:** section 8.
   - **What:**
     - visible labels above fields, with `*` on required ones;
     - the **fewest** fields possible;
     - an unticked marketing opt-in, if any;
     - a privacy line directly under the button;
     - a three-line "what happens next" list beside the form (who replies, by when, what we'll never ask for).
   - **Avoid:** Fireblocks' placeholder-only fields and required phone.
   - **Why:** this also addresses audit T3 (asking for a number before earning it). (`shots/blockaid-06-demo-form.jpg` vs `shots/fireblocks-06-demo-form-and-stats.jpg`)
   - **Skill:** `input-labels`, `required-indicators`, `submit-feedback`, `error-placement`; the *Trust & Authority* pattern's "Low-friction form".

10. **Get mobile right where Fireblocks didn't.**
    - **What:**
      - put the band's text before its diagram on mobile, or keep diagrams short;
      - collapse every multi-column row to one column below about 640px;
      - keep the sticky header ≤64px;
      - keep every button ≥44px (Blockaid's 46px is right; Fireblocks' 40px isn't).
    - **Skill:** `content-priority`, `mobile-first`, `horizontal-scroll`, `fixed-element-offset`, `touch-target-size`.

11. **If any number ever appears in or near the band, give it a date and source.**
    - **Why:** both competitors' headline stats contradict themselves across their own pages (measured above). R3 already prevents this, so treat it as a check in review.
    - **Skill:** `number-tabular`; *Trust & Authority* "Proof" only if verifiable.

12. **Skill style choice: Swiss/minimal, not crypto-dark.**
    - The skill's product data has two rows. "Fintech/Crypto" recommends *Glassmorphism + Dark Mode (OLED)*. "Banking/Traditional Finance" recommends *Minimalism & Swiss Style + Accessible & Ethical*, "Navy + Trust Blue + Gold accents".
    - Paraa is a regulated-adjacent retail investment product, so the **banking row** is the right one, and it matches the audit's light page with an ink band and gold used sparingly.
    - The `--design-system` run agrees: *Minimalism & Swiss Style*, accessibility risk low.

## 13. Do not adopt

| Don't | Seen on | Reason |
|---|---|---|
| Customer logo walls, investor rows, "trusted by 2,000+" | Both | We have none; inventing or implying them breaks R11. The skill's *Trust & Authority* pattern assumes real proof |
| Big undated counters and count-up animation | Both | R3 (date and source) and R5. Both sites' own numbers drift between pages |
| Certification tiles and badge strips with shield-check icons | Fireblocks | R6: entity, body, number and link, or nothing. Green "verified" icons imply checks that don't exist |
| Adjectives and superlatives: "enterprise-grade", "battle-tested", "the trust layer", "world's most trusted", "most advanced", "world's first", "safer" | Both | R1 bans "safe", "bank-grade", "#1", "best" and rankings. Adjectives were the weakest parts of both sites anyway |
| Crypto/threat iconography: radar sweep, globe with malicious pins, wireframe cubes, neon state colours | Blockaid | Reads as crypto and hacking (R14 spirit). The skill rates *HUD/Sci-Fi FUI* accessibility risk "high" and *Cyberpunk* as gaming/crypto. Scares a first-time retail investor |
| Fear-led hero copy ("Attackers only need one gap") | Fireblocks | Wrong emotional register for retail; we explain what we do and what to check |
| Iridescent glass gradients, autoplay hero video, logo marquee, Lottie loops | Fireblocks | Design system anti-pattern "AI purple/pink gradients". `auto-rotation-controls`, `excessive-motion`. Data and CPU cost on low-end Android (audit F1/F5) |
| Accent text on tinted tags (orange on peach, 2.83:1) | Blockaid | Fails `color-contrast` |
| A second dark area (dark final CTA, black footer) | Blockaid | The owner's decision is **one** dark band; the audit keeps the footer white. A second dark block would dilute the band's meaning |
| Monospace second typeface | Blockaid | Audit tokens say Manrope only. Get the "system label" texture from Manrope tabular figures and letter-spaced small labels instead |
| Isometric 3D layer stack | Fireblocks | Off our flat, hairline system (`effects-match-style`). Borrow the *labelling idea*, not the rendering |
| Executive headshot grid and team photos | Both | R11: initials monograms until real people sign off |
| "Request a demo" / "Talk to sales" CTAs | Both | R12: our honest action is "Ask a CA" |
| Placeholder-only form labels; required phone number | Fireblocks | `input-labels`; audit T3 |
| Mega menus, long sticky headers (130px) | Fireblocks | Single-page site; `fixed-element-offset` |
| Scroll reveals that start invisible | Fireblocks (/team) | `opacity-threshold`; keep our no-JS-safe reveal |

---

## Screenshot index

Blockaid
- `shots/blockaid-01-home-hero.jpg`: light hero, square buttons, line-art cubes, logo wall
- `shots/blockaid-02-dark-threat-band.jpg`: the single dark band: three mechanism rows, BENIGN/SUSPICIOUS/MALICIOUS tags
- `shots/blockaid-03-product-ui-threat-states.jpg`: mechanism headings, specific bullets, "Malicious transaction · blocked" UI on a hairline grid
- `shots/blockaid-04-stats-and-proof.jpg`: undated counters and testimonial carousel (what not to copy)
- `shots/blockaid-05-legal-hub-dated.jpg`: legal documents with "Last updated" dates
- `shots/blockaid-06-demo-form.jpg`: visible labels, what-happens list, privacy line
- `shots/blockaid-07-mobile-dark-band.jpg`: dark band at 390px
- `shots/blockaid-08-threat-research-index.jpg`: public incident write-ups as credibility

Fireblocks
- `shots/fireblocks-01-home-hero.jpg`: gradient hero with UI overlay, logo marquee, undated counters
- `shots/fireblocks-02-defense-in-depth-stack.jpg`: labelled layer diagram
- `shots/fireblocks-03-certs-vs-adjectives.jpg`: named certifications vs the adjective trio
- `shots/fireblocks-04-regulated-entities.jpg`: entity, regulator, numbers, lookup link, scope limit
- `shots/fireblocks-05-policy-approval-ui.jpg`: approval-state UI as the hero
- `shots/fireblocks-06-demo-form-and-stats.jpg`: placeholder-only labels; stats that contradict the homepage
- `shots/fireblocks-07-trustco-disclosure.jpg`: complaint path to the company and the regulator
- `shots/fireblocks-08-mobile-columns-squeezed.jpg`: three columns not stacked at 390px, headings clipped
