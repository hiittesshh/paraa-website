# D3: design system, product consistency and QA

**Author:** Designer 3 (systems, consistency, QA). **Date:** 10 Nov 2026. **Branch:** `feat/trust-redesign`.
**Status:** draft for the joint review with D1 (visual and brand) and D2 (UX, trust and journey). After that review, D3 merges all three drafts into the one spec developers build from.

**Inputs read:** all five research files and the shots in `research/shots/`; `audit-2026-11-10.md`; `design-tokens.md`; `content-rules.md` §0.3; `build-brief.md` (Rules, accessibility, compliance); `proposal.md` §4; every file in `src/`; `package.json`; `AGENTS.md`, plus the Next 16 docs in `node_modules/next/dist/docs/` (fonts, forms, package bundling) and the Base UI 1.9 docs in `node_modules/@base-ui/react/docs/` (tabs, slider).

**What this covers:** tokens (code-ready for Tailwind 4), every reusable component with its states, breakpoints and layouts, the accessibility standard, performance budgets, which files go, merge or stay, and the QA checklist for the joint review.

**What this doesn't decide:** copy, section content and the final visual tone. Where those affect consistency, I state a position and mark it **C1…C14** (contested). §11 lists them. Questions only the owner can answer are **Q1…Q12** in §12.

**Fixed by the owner, and assumed throughout:**
1. A light page with exactly one dark band (security and verification).
2. A static hero with an example app panel. No scenery and no scroll-pinned flight.
3. No fake stats, logos, badges, testimonials, people or partners. Unconfirmed facts stay off the page, no section is ever empty, and no placeholder tag is ever visible to the public.
4. The CA form, its API and validation, the what-if and tax maths in `src/lib`, the FAQ and the copy limits all stay. No business logic changes.

---

## 0. The decisions in brief

1. **Three token layers, and only roles become classes.** Primitives (design-file hex values) live in `:root` as `--p-*` and generate no utilities. Semantic roles are exposed through `@theme inline`. The component layer is the `cva` recipes in `components/ui/*`, not colour variables (§3.1 explains why).
2. **Tailwind's default palette, type, radius, shadow and easing scales are reset** with `--*: initial`, so `bg-blue-500`, `text-sm`, `rounded-2xl` and `shadow-lg` simply don't exist. The system can't drift by accident.
3. **The ink band is a scope, not a set of overrides.** `<Section tone="ink">` adds `.theme-ink`, which redefines about 20 role variables. Every component inside it re-colours itself with no `dark:` classes and no per-component props. `.theme-light` restores the light roles for light mock-ups inside the band.
4. **Gold carries identity, never state.** Gold is used for the logo and the gold sleeve's data colour, and nothing else. Selected tabs, chips, slider thumbs and focus rings are ink (white in the band). That solves gold's 1.64:1 contrast on white and keeps the gold budget at 3 or fewer per screen. **(C1)**
5. **Type:** one scale with five heading and figure roles, one label role and three body sizes, in two weights (400 and 600) and rem-based sizes. At 1440 the page is designed to use **7 font sizes**; today it uses 11.
6. **Shape:** corners of 4 (tags, data swatches), 8 (controls), 12 (panels) and 16 (the app frame). **No pills.** The only circle on the page is the slider thumb, because it marks a point. **(C3)**
7. **One shadow token, `shadow-panel`,** used only by things that float over the page: the hero app frame and the open mobile menu.
8. **Motion is for state only:** 150ms colour, a 200ms fade-in for tab panels (exit is instant), and the existing 12px reveal limited to two lists. Motion and NumberFlow are removed (about 40–50 KB gzipped). The slider becomes a native `<input type="range">`, so the thumb tracks the pointer 1:1.
9. **One Tabs component** (Base UI Tabs, underline style, no sliding indicator) serves both the hero app panel and the tools. **One ChoiceChips component** (native radios) serves every value picker. **(C7)**
10. **Accessibility is WCAG 2.2 AA plus our own 44px target rule.** The new 2.2 criteria are designed in: focus not obscured by the sticky header or the mobile menu, a non-drag alternative for sliders, and consistent help.
11. **Budgets:** the homepage's First Load JS is at most **140 KB gzipped** (today 266 KB), CLS at most 0.05, LCP at most 2.0s on mid-range Android, page height at most **7,500px at 1440** (today 12,384px). Both Manrope subsets are preloaded, because the **₹ glyph is only in the latin-ext file** and today it arrives late.
12. **Found while auditing, and must be fixed:** with JavaScript off, the CA form reloads the page and sends nothing, silently. Its inputs have no `name` and the form has no `action` (§7.6). Also: the success heading is an `<h4>` straight under an `<h2>`, the global `:focus-visible` rule changes every focused element's corner radius to 4px, and `viewport.colorScheme` is still `"dark"`.

---

## 1. System principles

These are the rules the merged spec, the build and the joint QA are judged against. Each cites the `ui-ux-pro-max` guideline behind it.

| # | Principle | In practice | Skill guideline |
|---|---|---|---|
| P1 | **Roles, not values.** A component never names a colour, size or radius directly, only a role. | Greps A1–A3 in §10 must return nothing. | `color-semantic`, `consistency` |
| P2 | **One surface switch.** Dark means `.theme-ink`, and it happens once. | `tone="ink"` appears exactly once in `src/components`. | `dark-mode-pairing`, `color-dark-mode` |
| P3 | **Absent, not placeholder.** A component given an unconfirmed fact renders nothing, and a section with no facts doesn't render. | `FactItem` returns `null` when a required field is missing. No `TO CONFIRM` ever reaches HTML. | Owner decision 3; `content-rules` R6 |
| P4 | **One component per job.** A second look for the same job is a bug, not a variant. | One button set, one tabs, one chip, one list row, one mock frame. | `consistency`, `state-clarity` |
| P5 | **Complete without JavaScript.** Server HTML is the finished page. Scripts only add behaviour. | §7.6 says what each component does with JS off. | `reduced-motion`; the skill's motion preset ("don't reveal … as invisible-by-default without a no-JS fallback") |
| P6 | **Numbers are data.** Every figure goes through `lib/format` and is set in tabular figures. No figure animates. | `num` or `type-figure` on every figure. No `toLocaleString` in components. | `number-tabular`, `number-formatting` |
| P7 | **Budgets are part of the spec.** A change that breaks a budget is a regression, even when it looks better. | §8 budgets are checked in QA (§10-I). | `bundle-splitting`, `main-thread-budget` |
| P8 | **Restraint is counted, not just felt:** gold 3 or fewer per screen, 1 primary button per screen, 1 shadow, 7 or fewer font sizes, no more than 2 animated things in view. | Measured in QA (§10-B). | `primary-action`, `excessive-motion`, `elevation-consistent` |

### How the skill was used, and what was rejected

- `ui-ux-pro-max --design-system "banking finance trust light minimal" --variance 3 --motion 2 --density 3` returned the **Trust & Authority + Conversion** pattern, the **Minimalism & Swiss** style ("light supported; accessibility risk low; requires contrast 4.5, keyboard, visible focus, reduced motion") and a 375/768/1024/1440 responsive checklist. I adopt the pattern, the style and the checklist.
- **Rejected:** the same tool's default for "fintech investment trust" is **Dark Mode (OLED)** with "light not recommended", the Enterprise Gateway pattern and a green accent. It contradicts owner decision 1, and the research files already record it as not to be used. Its IBM Plex suggestion is also rejected: Manrope only.
- **Rejected:** the skill's Tailwind reference (`design-system/references/tailwind-integration.md`) is Tailwind 3 style (`tailwind.config.ts`, HSL triplets). Tailwind 4 `@theme` is used instead (§3.2).
- **Rejected:** the `html-tailwind` stack advice to theme dark areas with `dark:` prefixes. That is exactly the per-component override the owner wants to avoid. Scoped role variables do it with no classes (§3.1).
- **Adopted from the stacks:** `shadcn`: "use Tabs for content switching, not a custom implementation; set a default value". `nextjs`: "Server Components by default", "variable fonts", "analyse bundle size".
- **No verified match:** the `ux` queries for tab keyboard behaviour and slider keyboard behaviour returned only the generic "keyboard navigation" rule. The keyboard maps in §5 are therefore a **fallback to the WAI-ARIA Authoring Practices** Tabs and Slider patterns, and Base UI implements those patterns.

---

## 2. What's wrong in the current system, measured

This is the baseline for the QA "before and after" columns. It was measured with headless Chrome against `next dev` on 10 Nov, so treat JS weight from the audit's production build (F1), not from this table.

| Measure | 1440×900 | 390×844 | Target |
|---|---|---|---|
| Document height | 12,384px | 15,370px | ≤ 7,500 / ≤ 11,500 |
| DOM nodes (of which SVG) | 996 (207) | 1,023 (257) | ≤ 900 |
| Distinct computed font sizes | 11 (incl. 17, 22, 28, 38 and 80px) | 11 | ≤ 7 |
| Distinct corner radii | 7 (incl. 24px, 28px and 85 pills) | 7 | 4 plus circles |
| Elements with `will-change` | 17 | 16 | 0 |
| Header height | 72px, `fixed`, transparent over the hero | 64px | 64px, `sticky`, solid |
| Interactive elements under 44px | 13 (most are false positives: sr-only radios whose label is the target) | 19 | 0 real |

**Structural issues found in the code** (in addition to audit F1–F7):

| # | Where | Issue | Fix in this spec |
|---|---|---|---|
| S1 | `globals.css` `:root` | The default palette is dark. Light areas opt out with `surface-light`, which redefines 16 variables inline, and `surface-ink` uses raw `#FFFFFF`. | §3.2: light `:root` plus `.theme-ink` |
| S2 | `layout.tsx` | `viewport: { themeColor: "#131416", colorScheme: "dark" }`, so mobile browser chrome and native controls render dark. | `themeColor: "#FFFFFF"`, `colorScheme: "light"` |
| S3 | `globals.css` base | `:focus-visible { border-radius: 4px }` changes the shape of whatever is focused, such as a 12px card or an 8px button. | Delete it. Outlines follow the element's own radius. |
| S4 | `layout.tsx` font | `subsets: ["latin"]` preloads only latin. **₹ (U+20B9) is only in the latin-ext file** (verified: the glyph is present there), which loads late, so every rupee figure swaps from Arial's ₹ after first paint. | `subsets: ["latin", "latin-ext"]` (§8) |
| S5 | `ask-form.tsx` | No `name` on any field and no `action`. With JavaScript off, submitting reloads the page and nothing is sent or said. That breaks the build brief's "never drops a question silently". | §7.6 |
| S6 | `ask-form.tsx` | The success heading is an `<h4>` straight under the section `<h2>`, which skips a level. | `<h3>` |
| S7 | `primitives.tsx` `InlineLink` | An invisible ±13px strip makes inline links 44px tall, but it overlaps neighbouring lines and links, so taps land on the wrong target. WCAG 2.5.8 exempts inline links anyway. | Remove it (§5.4) |
| S8 | `what-if.tsx`, `tax-estimator.tsx` | Green and red gain/loss bars and gold result figures. `proposal.md` §4 limits red, yellow and green to form errors. | Single-colour bars; ink figures (§5.13) |
| S9 | `package.json`, `globals.css` | `@radix-ui/react-accordion` and `tw-animate-css` are unused but still installed and imported. | Remove both (§9) |
| S10 | `header.tsx` | The CTA label changes with width ("Ask a CA" or "Talk to a CA"), and the current-section marker is gold. | One label; an ink marker (§5.17) |
| S11 | `utils.ts` | `tailwind-merge` only knows the `body-*` sizes. Any new `text-*` token silently drops colour classes in `cn()`, the bug that already hit the gold buttons once. | Register every new size, with a test (§10 A10) |

---

## 3. Tokens

### 3.1 Architecture

```
Layer 1  Primitives   :root { --p-grey-600: #475569 }          design-file values, never used in components
Layer 2  Roles        :root / .theme-ink { --muted-foreground } → @theme inline { --color-muted-foreground }
Layer 3  Components   components/ui/*.tsx cva recipes            "text-muted-foreground border-input h-12 rounded-sm"
```

**Why there are no colour variables at the component layer.** The skill's pattern is `:root { --button-bg: var(--color-primary) }`. In CSS, that variable is resolved where it is declared, on `:root`, and descendants inherit the resolved value. Inside `.theme-ink`, `--button-bg` would still be light-page ink. Component colour tokens would therefore have to be re-declared in every scope. That is the per-component override we're removing. So the component layer is the `cva` recipe, which uses role utilities only.

**Component tokens that are safe in `:root`** don't change by surface, such as `--header-h` and `--control-h`. They are listed in §3.6.

**Why roles must be `@theme inline`.** With `inline`, `bg-background` compiles to `background-color: var(--background)`, which is read at the element, so a `.theme-ink` ancestor wins. Without `inline` it compiles to `var(--color-background)`, which is already resolved on `:root`, and the band would not re-colour. The current file does this correctly, and it must stay that way.

**Why primitives are not utilities.** If `--color-grey-400` exists, someone will write `text-grey-400` (2.56:1 on white, a fail). If primitives only exist as `--p-*` in `:root`, the only colours available as classes are roles that have been checked. A new visual need becomes a new role, with its contrast proof (change control is at the end of this section). **(C5)**

### 3.2 `globals.css`, code-ready

This replaces everything in today's file above `@layer components`. The reveal block in `@layer components` stays, minus `.mark`. Everything listed in §9 as dead CSS is deleted. Values are in rem (px at a 16px root is in the comments), so a user's browser font-size setting is respected.

```css
@import "tailwindcss";
@import "shadcn/tailwind.css"; /* only its custom variants (data-open/checked/selected) are used */
/* tw-animate-css: removed, nothing uses it */

/* ── 0. Reset: Tailwind's own scales are switched off, so only Paraa tokens make classes ── */
@theme {
  --color-*: initial;
  --font-*: initial;
  --font-weight-*: initial;
  --text-*: initial;
  --tracking-*: initial;
  --leading-*: initial;
  --radius-*: initial;
  --shadow-*: initial;
  --inset-shadow-*: initial;
  --drop-shadow-*: initial;
  --text-shadow-*: initial;
  --blur-*: initial;
  --ease-*: initial;
  --animate-*: initial;
  --breakpoint-2xl: initial;           /* sm 640 · md 768 · lg 1024 · xl 1280 remain */
}

/* ── 1. Primitives: the design file (docs/design-tokens.md). NOT classes. Components never use these. ── */
:root {
  --p-white: #FFFFFF;
  --p-grey-50: #F8F9FD;  --p-grey-100: #F1F5F9; --p-grey-200: #E2E8F0; --p-grey-300: #CBD5E1;
  --p-grey-400: #94A3B8; --p-grey-500: #64748B; --p-grey-600: #475569; --p-grey-900: #0F172A;
  --p-ink: #272A33;                                   /* Primary (labelled) */
  --p-ink-500: #62646C; --p-ink-600: #484B55; --p-ink-700: #32353F; /* "Additional dark" ramp */
  --p-ink-800: #1F2027; --p-ink-900: #131416;
  --p-gold-500: #FDC037;                              /* Secondary (labelled) */
  --p-gold-200: #FEE2AC; --p-gold-800: #8E6414;
  --p-success: #10B981; --p-error: #EF4444;           /* Alerts (labelled) */
}

/* ── 2. Roles. Light is the default; .theme-ink is the one dark band; .theme-light restores light inside it ── */
:root, .theme-light {
  color-scheme: light;
  --background: var(--p-white);          /* page */
  --background-alt: var(--p-grey-50);    /* alternate sections */
  --card: var(--p-white);                /* panels, inputs, mock frames */
  --muted: var(--p-grey-100);            /* quiet fills. NEVER put --faint text on it (4.34:1) */
  --foreground: var(--p-grey-900);       /* headings, figures, links       17.85:1 on white */
  --muted-foreground: var(--p-grey-600); /* body                            7.58:1 white · 7.20 grey-50 · 6.92 grey-100 */
  --faint: var(--p-grey-500);            /* captions, sources               4.76:1 white · 4.52 grey-50 */
  --primary: var(--p-ink);               /* primary button fill             white on it 14.33:1 */
  --primary-hover: var(--p-ink-600);     /*                                 white on it 8.70:1 */
  --primary-active: var(--p-ink-900);
  --primary-foreground: var(--p-white);
  --accent: var(--p-grey-100);           /* shadcn meaning: quiet hover fill (NOT gold) */
  --accent-foreground: var(--p-grey-900);
  --border: var(--p-grey-200);           /* 1px hairlines (decorative) */
  --border-strong: var(--p-grey-300);    /* frames, slider track (decorative) */
  --rule: var(--p-grey-900);             /* 2px item rules: facts, steps, totals */
  --input: var(--p-grey-500);            /* control boundaries               4.76:1 ≥ 3:1 (WCAG 1.4.11) */
  --ring: var(--p-ink);                  /* focus                            14.33:1 white · 13.62 grey-50 */
  --brand: var(--p-gold-500);            /* logo-adjacent identity only; never text on light, never state */
  --brand-text: var(--p-gold-800);       /* the one gold text colour         5.27:1 white · 5.01 grey-50 */
  --error: var(--p-error);               /* borders and icons only           3.76:1 white */
  --success: var(--p-success);           /* tints and icons on ink only      2.54:1 white: never alone on light */
  --selection: var(--p-gold-200);
  --data-us: var(--p-ink);               /* basket sleeve colours, always paired with a text label */
  --data-gold: var(--p-gold-500);
  --data-oil: var(--p-grey-400);
}
.theme-light { background-color: var(--background); color: var(--foreground); }

.theme-ink {
  color-scheme: dark;
  --background: var(--p-ink);
  --background-alt: var(--p-ink);        /* no alternation inside the band */
  --card: var(--p-ink-800);              /* inset well                      white 16.23:1 · grey-300 10.93 */
  --muted: var(--p-ink-700);             /*                                 grey-300 8.24 · grey-400 4.77 */
  --foreground: var(--p-white);          /*                                 14.33:1 */
  --muted-foreground: var(--p-grey-300); /*                                 9.65:1 */
  --faint: var(--p-grey-400);            /*                                 5.59:1 */
  --primary: var(--p-white);
  --primary-hover: var(--p-grey-200);
  --primary-active: var(--p-grey-300);
  --primary-foreground: var(--p-ink);    /*                                 14.33:1 */
  --accent: var(--p-ink-700);
  --accent-foreground: var(--p-white);
  --border: var(--p-ink-600);            /* 1.65:1, decorative */
  --border-strong: var(--p-ink-500);     /* 2.43:1, decorative */
  --rule: var(--p-white);
  --input: var(--p-grey-400);            /* 5.59:1 */
  --ring: var(--p-white);                /* 14.33:1 */
  --brand-text: var(--p-gold-500);       /* 8.72:1: gold may be text here */
  --data-us: var(--p-white);
  background-color: var(--background);
  color: var(--foreground);
}

/* ── 3. Roles exposed as classes. `inline` = read where used, so scopes work ── */
@theme inline {
  --color-background: var(--background);
  --color-background-alt: var(--background-alt);
  --color-card: var(--card);
  --color-muted: var(--muted);
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-faint: var(--faint);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-rule: var(--rule);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-brand: var(--brand);
  --color-brand-text: var(--brand-text);
  --color-error: var(--error);
  --color-success: var(--success);
  --color-data-us: var(--data-us);
  --color-data-gold: var(--data-gold);
  --color-data-oil: var(--data-oil);

  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;

  --spacing-section: var(--section-y);
  --spacing-section-compact: var(--section-y-compact);
  --spacing-head: var(--stack-head);
  --spacing-gutter: var(--gutter);
  --spacing-header: var(--header-h);
}

/* ── 4. Literal scales ── */
@theme {
  --font-weight-normal: 400;
  --font-weight-semibold: 600;

  --text-body-xl: 1.125rem; --text-body-xl--line-height: 1.75rem;    /* 18/28 ledes */
  --text-body-lg: 1rem;     --text-body-lg--line-height: 1.625rem;   /* 16/26 body, inputs, buttons */
  --text-body-md: 0.875rem; --text-body-md--line-height: 1.375rem;   /* 14/22 support, legal, captions, tags */

  --radius-xs: 0.25rem;  /* 4  tags, checkbox */
  --radius-sm: 0.5rem;   /* 8  buttons, inputs, chips, tabs (focus), alerts */
  --radius-md: 0.75rem;  /* 12 panels, result panel, form panel */
  --radius-lg: 1rem;     /* 16 the app mock frame only */
  --radius-full: 9999px; /* the slider thumb only (set in component CSS, not as a class) */

  --shadow-panel:
    0 1px 2px 0 color-mix(in srgb, var(--p-grey-900) 6%, transparent),
    0 16px 40px -12px color-mix(in srgb, var(--p-grey-900) 18%, transparent);

  --ease-out: cubic-bezier(.23, 1, .32, 1);  /* arriving (the existing curve) */
  --ease-in: cubic-bezier(.4, 0, 1, 1);      /* leaving */

  --animate-spin: spin 1s linear infinite;    /* the "Sending…" icon only */
  @keyframes spin { to { transform: rotate(360deg); } }
}

/* ── 5. Layout tokens (component layer, surface-independent, so safe in :root) ── */
:root {
  --header-h: 4rem;            /* 64 at every width */
  --control-h: 2.75rem;        /* 44 buttons, chips, tabs, rows */
  --field-h: 3rem;             /* 48 text inputs, primary lg button */
  --gutter: 1rem;              /* 16 */
  --container: 75rem;          /* 1200 including gutters → 1152 content */
  --section-y: 4rem;           /* 64 */
  --section-y-compact: 2.5rem; /* 40 facts strip */
  --stack-head: 2rem;          /* 32 section header → content */
  --duration-fast: 150ms;      /* hover and press colour */
  --duration-base: 200ms;      /* tab-panel fade-in, FAQ expand */
  --duration-reveal: 500ms;    /* the one scroll reveal */
  @media (width >= 40rem) { --gutter: 1.5rem; }
  @media (width >= 48rem) { --section-y: 6rem; --section-y-compact: 3rem; --stack-head: 3rem; }
}

@custom-variant tall (@media (height >= 37.5rem));   /* sticky things stick only on screens ≥ 600px tall */

@utility container-page { width: 100%; max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); }
@utility num { font-variant-numeric: tabular-nums lining-nums; }

/* Type roles (§3.5). Headings are utilities because their size steps by breakpoint. */
@utility type-display { font-size: 2.25rem; line-height: 2.625rem; font-weight: 600; letter-spacing: -0.025em; text-wrap: balance;
  @media (width < 22.5rem) { font-size: 2rem; line-height: 2.375rem; }
  @media (width >= 48rem) { font-size: 2.75rem; line-height: 3.125rem; }
  @media (width >= 64rem) { font-size: 3rem; line-height: 3.375rem; } }
@utility type-title { font-size: 1.875rem; line-height: 2.25rem; font-weight: 600; letter-spacing: -0.02em; text-wrap: balance;
  @media (width >= 48rem) { font-size: 2.25rem; line-height: 2.625rem; }
  @media (width >= 64rem) { font-size: 2.5rem; line-height: 2.875rem; } }
@utility type-heading { font-size: 1.25rem; line-height: 1.75rem; font-weight: 600; letter-spacing: -0.01em; text-wrap: balance;
  @media (width >= 64rem) { font-size: 1.5rem; line-height: 2rem; } }
@utility type-subhead { font-size: 1.125rem; line-height: 1.625rem; font-weight: 600; letter-spacing: -0.005em; }
@utility type-figure { font-size: 2rem; line-height: 2.375rem; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums lining-nums;
  @media (width >= 48rem) { font-size: 2.5rem; line-height: 2.875rem; } }
@utility type-label { font-size: 0.75rem; line-height: 1rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }

@layer base {
  * { border-color: var(--color-border); }
  html { font-family: var(--font-sans); scroll-padding-top: calc(var(--header-h) + 1rem); -webkit-text-size-adjust: 100%; }
  @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
  body { background-color: var(--background); color: var(--foreground); font-size: 1rem; line-height: 1.625rem; -webkit-font-smoothing: antialiased; }
  p, li, dd { text-wrap: pretty; }
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }      /* no border-radius here (S3) */
  ::selection { background: var(--selection); color: var(--p-grey-900); }      /* 14.19:1 */
  .lucide { stroke-width: 1.75; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
      animation-delay: 0s !important; transition-duration: .01ms !important; transition-delay: 0s !important; }
  }
  @media print { [data-reveal-state="waiting"] { opacity: 1; transform: none; } }
}

/* Print the band light. Browsers drop backgrounds when printing, which would leave white text on white paper.
   This must sit OUTSIDE @layer (like .theme-ink itself), because unlayered rules beat layered ones. */
@media print {
  .theme-ink {
    color-scheme: light;
    --background: var(--p-white); --card: var(--p-white); --muted: var(--p-grey-100);
    --foreground: var(--p-grey-900); --muted-foreground: var(--p-grey-600); --faint: var(--p-grey-500);
    --primary: var(--p-ink); --primary-foreground: var(--p-white);
    --border: var(--p-grey-200); --border-strong: var(--p-grey-300); --rule: var(--p-grey-900);
    --input: var(--p-grey-500); --ring: var(--p-ink); --brand-text: var(--p-gold-800); --data-us: var(--p-ink);
  }
}
```

**Primitives deleted on purpose.** Because they have no role, they are not carried over: `paper #F2F2F2`, `main-1/2/3`, gold 50/100/300/400/600/700/900, the derived `ink-2…ink-5` tints (the design file's own dark ramp, `ink-500…900`, replaces them), `grey-700`, `grey-800`, `warning`, the `chart-*` set and `shadow-card` / `shadow-lift`.

**Change control.** A new token needs four things:
1. a role name;
2. a light value and an ink value;
3. contrast proof on every surface it can sit on (Appendix A);
4. a line in the §3.3 table and in the QA greps.

### 3.3 Colour roles: where each may and may not go

| Role (class) | Light | Ink band | Use for | Never |
|---|---|---|---|---|
| `bg-background` | white | ink | page, base sections | |
| `bg-background-alt` | grey-50 | ink | alternate sections | inside the band |
| `bg-card` | white | ink-800 | panels, inputs, mock frames | card inside card |
| `bg-muted` | grey-100 | ink-700 | quiet fills (alert info, slider track on dark) | under `text-faint` (4.34:1 fails) |
| `text-foreground` | grey-900 | white | headings, figures, links, labels, error text | |
| `text-muted-foreground` | grey-600 | grey-300 | body, answers, captions that matter | |
| `text-faint` | grey-500 | grey-400 | source lines, "Example only", meta | on `bg-muted`; for any sentence a user must read to act |
| `bg-primary` / `text-primary-foreground` | ink / white | white / ink | the primary button, checked chip | more than one per screen |
| `border-border` | grey-200 | ink-600 | 1px hairlines, list separators | control boundaries |
| `border-input` | grey-500 | grey-400 | inputs, unchecked chips, checkbox, secondary button | decoration |
| `border-rule` | grey-900 | white | 2px top rule on facts and steps, the total row | more than one rule per item |
| `ring` (outline) | ink | white | focus only | |
| `bg-brand` | gold | gold | logo lock-up area (if needed), nothing else | buttons, state, text on light, large fills |
| `text-brand-text` | gold-800 | gold | at most one word or figure per screen, D1 to choose | links, body, headings |
| `bg-data-us / -gold / -oil` | ink / gold / grey-400 | white / gold / grey-400 | basket bar, legend swatch, breakdown swatch | without a text label beside them |
| `border-error`, `text-error` (icon) | #EF4444 | #EF4444 | invalid field border, error icon | text (3.76:1) |
| `bg-success/10`, `bg-error/8` | tints | tints | alert backgrounds | as the only signal |

**Status colour rule:** meaning is always in words, and a sign (+ or −) where it applies. Colour is a third, optional signal (`color-not-only`, `contrast-feedback`). Green and red are never used for gains, losses, risk or performance, only for form feedback (proposal §4).

**Gold budget (C1):** at most 3 gold items per screen, and the logo counts. With the rule "gold = identity and the gold sleeve, never state", the busiest screen is the basket, which shows the logo, the gold bar segment and the gold legend swatch: exactly 3. Today the tools screen alone shows 4 gold slider thumbs, a gold result figure and gold chips. (Text selection keeps its gold-200 tint: it's a browser state the visitor creates, so it doesn't count.)

### 3.4 Surfaces in sequence

```
Header        background (white), hairline bottom
1 Hero        background
2 Facts strip background, compact, border-y   ← the one allowed same-tone neighbour (it's the hero's foot)
3 Basket      background-alt
4 How it works background
5 Run the numbers background-alt
6 Security    theme-ink                       ← the only dark surface on the page
7 FAQ         background
8 Ask a CA    background-alt
Footer        background, border-t
```

Rule: no two adjacent sections share a tone, except the facts strip. If D2 reorders sections, the tones follow the new order. The ink band never sits next to the footer.

### 3.5 Typography

Manrope only, from the variable file, using weights **400 and 600 only**. 700 and 800 aren't used. `<strong>` in legal text is 600. **(C4)**

| Role | Element | < 360 | < 768 | ≥ 768 | ≥ 1024 | Weight / tracking | Design-file equivalent |
|---|---|---|---|---|---|---|---|
| `type-display` | `h1`, hero only | 32/38 | 36/42 | 44/50 | 48/54 | 600 / −0.025em | H1 48 (the 48 cap holds) |
| `type-title` | every section `h2` (one size per width) | 30/36 | 30/36 | 36/42 | 40/46 | 600 / −0.02em | H2 40 |
| `type-heading` | `h3`: panel, step, group | 20/28 | 20/28 | 20/28 | 24/32 | 600 / −0.01em | H4 24 |
| `type-subhead` | FAQ question, row title, slider value | 18/26 | 18/26 | 18/26 | 18/26 | 600 | H6 18 |
| `type-figure` | the one big result number | 32/38 | 32/38 | 40/46 | 40/46 | 600, tabular | H2 40 |
| `text-body-xl` | ledes | 18/28 | | | | 400 | Body XL |
| `text-body-lg` | body, inputs, buttons, answers | 16/26 | | | | 400 / 600 | Body L |
| `text-body-md` | support, legal, captions, tags, nav | 14/22 | | | | 400 / 600 | Body M |
| `type-label` | metadata labels: fact labels, step numbers, column heads | 12/16 | | | | 600, uppercase, +0.06em | Body S |

Rules:
- **Sizes at 1440:** 48, 40, 24, 18, 16, 14 and 12 are the only seven. Design-file H3 (32) and H5 (20, desktop) are deliberately unused.
- **12px is only for 1–3-word labels** in `text-foreground` or `text-muted-foreground` (≥ 7.58:1), never `text-faint`. It is never a sentence and never an honesty label. The Example tag is 14px.
- **Legal, risk and honesty text is ≥ 14px** and `text-muted-foreground` or darker (proposal §4; research A11).
- **Line length:** prose `max-w-prose` (65ch), ledes `max-w-[52ch]`, titles `max-w-[24ch]`, all with `text-wrap: balance` (`line-length-control`, `heading-line-balance`).
- **Mobile body is 16px.** Nothing a person must read is under 14px (`readable-font-size`). Both competitors drop to 14px or less, and we don't.
- **No eyebrow above a section title** (build brief, round 6). `type-label` labels facts, not headings.
- **Long tokens** (reference numbers, URLs, registration numbers) use `[overflow-wrap:anywhere]` inside a `min-w-0` child (`long-token-wrapping`).
- **Fonts in code:** `Manrope({ variable: "--font-manrope", subsets: ["latin", "latin-ext"], display: "swap" })`. Drop the `weight` array, because Manrope is a variable font (Next docs: "We recommend using variable fonts"). Keep `adjustFontFallback` (the default), so the "Manrope Fallback" size-adjust keeps CLS near zero.

### 3.6 Spacing and layout

**Scale (4px base). Tailwind steps allowed:** `0.5 1 2 3 4 5 6 8 10 12 16 24` (2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96px), plus control heights `11` (44), `12` (48) and `14` (56). Anything else needs a reason in review (`spacing-scale`).

| Token / class | < 768 | ≥ 768 | Use |
|---|---|---|---|
| `py-section` | 64 | 96 | every section (today 80/112: that's the main lever for the page-length budget) |
| `py-section-compact` | 40 | 48 | facts strip |
| `mb-head` | 32 | 48 | section header → content |
| `px-gutter` (via `container-page`) | 16 (24 from 640) | 24 | page gutters |
| gap inside one object | 12 | 12 | label → control, title → body |
| gap between items | 24 | 24 | list items, chips rows, columns |
| gap between groups | 48 | 64 | e.g. "never do" list → "spot a fake" pair |
| `max-w-(--container)` | 1200 incl. gutters | | page container |

**Grid:** 12 columns at `lg`, column gap 64 (`lg:gap-16`) for two-part layouts and 24 for repeated columns. There are five layouts and no others:

| Layout | Columns at ≥ 1024 | Below 1024 | Used by |
|---|---|---|---|
| L1 Stack | header above full-width content | same | Basket, How it works, Security |
| L2 Side | header 4 / content 8 (header sticky on `tall`) | stacked | FAQ |
| L3 Split | 5 / 7 | stacked (copy first) | Hero, Ask a CA |
| L4 Tool | inputs 7 / result 5 (result sticky on `tall`) | result readout first, then inputs (§6) | Run the numbers |
| L5 Columns | 4 equal (3 if three items) | 2 at `sm`–`md`, 1 below `sm` | Facts strip, How-it-works steps |

The fractions sum to 12 (4/8, 5/7, 7/5). Today's 4/7 and 7/5 sum to 11, and they're replaced.

### 3.7 Radius, borders, shadow

- **Radius:** `rounded-xs` 4 (tags, checkbox, data swatches) · `rounded-sm` 8 (buttons, inputs, chips, alerts) · `rounded-md` 12 (panels) · `rounded-lg` 16 (the mock frame). The slider thumb is the one circle, and it's drawn in component CSS. No pills, including tags and the header CTA (`effects-match-style`; research: radius 4–10px on TRM, 4px on Mercury and 3px on Zerodha all read as "built", while pills read as consumer app). **(C3)**
- **Borders:** `border` (1px) is the only hairline. `border-2` exists only for `border-rule` items and the focus outline. Hairlines are `border-border`. Control edges are `border-input`. Nothing else.
- **Shadow policy (one token):** `shadow-panel` goes only on things that overlap the page: the hero mock frame and the open mobile menu panel. Panels, cards, form, result, header and mock frames inside the band have no shadow. Hover never adds a shadow, and nothing lifts on hover (audit D4) (`elevation-consistent`).

### 3.8 Motion

| Token | Value | Used for |
|---|---|---|
| `duration-150` + `ease-out` | 150ms | colour, border and underline on hover and press. **Only on things you can click** |
| `active:scale-97` | 150ms | buttons and chips on press (`scale-feedback`) |
| `duration-200` + `ease-out` | 200ms | tab-panel fade-in (`data-starting-style`), FAQ expand where `::details-content` and `interpolate-size` are supported |
| exit | instant | tab panels hide immediately (`exit-faster-than-enter`; and `hidden` can't transition anyway) |
| reveal | 12px rise + fade, 500ms, 70ms stagger, ≤ 4 items, once | **only** the Basket rows and How-it-works steps (`RevealGroup`). Not headings, figures, the hero, the facts strip, the ink band, the tools, the FAQ, the form or legal text |
| `animate-spin` | 1s linear | the "Sending…" icon, `motion-safe:` only |

**Never animated:** numbers (no count-ups, no rolling digits), slider thumbs (no easing: they track 1:1), page load, scroll position, any loop. **Banned:** parallax, pinning, scroll-scrubbing, marquees, carousels, autoplay, hover lift, shine, shimmer (proposal §4 list, unchanged).

**Reduced motion:** the global rule zeroes durations *and* delays. RevealController already exits early. Smooth scrolling is only enabled under `no-preference`. Skill guidelines: `motion-meaning`, `excessive-motion`, `reduced-motion`, `fade-crossfade`, `interruptible`, `layout-shift-avoid`.

### 3.9 Breakpoints, z-index and variants

- **Breakpoints:** Tailwind's own `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280; `2xl` is removed. `md` changes the type steps and section rhythm. `lg` brings two-part layouts and the desktop nav. `xl` changes nothing but is allowed for gutters. **`tall`** (height ≥ 600px) gates every sticky behaviour, including the header (§5.17), so landscape phones and 200% zoom never get a stuck bar.
- **z-index:** `z-10` sticky in-section items (tool result, FAQ heading, mobile readout) · `z-40` header · `z-50` open mobile menu · `z-100` skip link. Nothing else (`z-index-management`).
- **Forced colours:** every state that is drawn with a background (checked chip, selected tab, primary button) also has a border or outline, so it survives Windows contrast themes. Use `forced-colors:` variants where needed (§7.5).

### 3.10 Icons

- `lucide-react` only, at 16px (inline with 14–16px text), 20px (list leads, alerts) and 24px (rare). The stroke is 1.75 everywhere, via `.lucide` in base CSS.
- Decorative icons get `aria-hidden`. The only icon-only button is the menu toggle, which has `aria-label="Menu"` (`icon-context`, `aria-labels`).
- **Not beside a status claim:** `Shield`, `Lock`, `BadgeCheck`, `ShieldCheck` or `Landmark` (proposal §4). They imply a check that doesn't exist.
- Arrows: `ArrowRight` = goes somewhere on this page. `ArrowUpRight` = leaves the site, opens in a new tab, and has sr-only "(opens in a new tab)".

---

## 4. Page system map

The order is the audit's. D2 may change it, and the tones then follow §3.4.

| # | Section (id) | Tone | Layout | Components | Gold on screen | Reveal |
|---|---|---|---|---|---|---|
| – | Header | base | – | Brand, NavLink, Button secondary, MobileMenu | logo | – |
| 1 | Hero (`#top`) | base | L3 | `type-display`, lede, Button primary + secondary, Disclosure `lead`, **MockFrame elevated** + Tabs + DefinitionList + ExampleTag | logo | no |
| 2 | Facts strip (`#facts`) | base, compact | L5 | FactItem ×2–4 (render only if complete) | – | no |
| 3 | Basket (`#basket`) | alt | L1 | SectionHeader, AllocationBar, RuleList (sleeve rows), caption | gold segment + gold swatch | RevealGroup |
| 4 | How it works (`#how`) | base | L1 + L5 | SectionHeader, RuledItem steps (`ol`) | – | RevealGroup |
| 5 | Run the numbers (`#numbers`) | alt | L4 inside Tabs | SectionHeader, Tabs, ChoiceChips, Slider, Panel (result), DefinitionList, LiveRegion, TextLink | gold swatch in the breakdown | no |
| 6 | Security (`#security`) | **ink** | L1 | SectionHeader, RuleList, StatePair (2 × MockFrame in `.theme-light` + Tag), DefinitionList (registration), Disclosure `inline` | – | no |
| 7 | FAQ (`#faq`) | base | L2 | SectionHeader stacked, Accordion | – | no |
| 8 | Ask a CA (`#ask`) | alt | L3 | SectionHeader stacked, StepList (what happens next), Disclosure `inline`, Panel + form fields, Alert | – | no |
| – | Footer | base | – | Brand, FooterLink grid, Disclosure `block` ×n, © | logo | – |

**Page-length budget:** at most 7,500px at 1440 and at most 11,500px at 390 (research: Zerodha 4.3 screens; the audit asks for 6–8). The ink band is at most about 1,200px at 1440 (1.3 screens; Blockaid's was 2,120px) and at most about 2,000px at 390.

**First-view budget:**
- **1440×900:** the h1, lede, primary CTA, disclosure line and at least the top 60% of the app panel are visible. The facts strip's top rule is visible or within 100px.
- **390×844:** the h1, lede, primary CTA and disclosure line are visible above the fold. The panel can start below.

---

## 5. Component inventory

Each entry gives the job, anatomy, variants and sizes, states, responsive behaviour, accessibility and the code mapping. A state that doesn't apply is marked "n/a", not left out. Class strings are guidance for the `cva` recipe, and they use only §3 tokens.

**Shared interaction states**, unless an entry says otherwise:

| State | Treatment |
|---|---|
| default | as specified |
| hover (pointer only) | 150ms colour or border change. No movement except a 2px arrow nudge on links |
| focus-visible | `outline 2px var(--ring)`, offset 2px. Inside clipping containers (the mock frame, the tab list), offset −2px so it isn't cut off |
| active | `scale-97` on buttons and chips; nothing elsewhere |
| disabled | avoided. If unavoidable: `aria-disabled="true"`, opacity .5, `cursor-not-allowed`, still focusable, with a reason in text nearby |
| loading | see Button |
| error | see Field |
| selected / checked | ink fill or a 2px ink edge, plus the ARIA state, plus a forced-colours outline |

### 5.1 Section

- **Job:** every band on the page. It owns tone, rhythm and container.
- **API:** `<Section id labelledBy tone="base"|"alt"|"ink" density="default"|"compact" className?>`
- **Renders:** `<section id aria-labelledby class="[tone] py-section|py-section-compact"><div class="container-page">…</div></section>`. `tone="alt"` → `bg-background-alt`. `tone="ink"` → `theme-ink` (it sets its own background and colour).
- **Rules:**
  - Every section has an `h2`. If it has no visible title (the facts strip), use `class="sr-only"`.
  - `tone="ink"` is allowed once per page (QA A5).
  - `scroll-margin-top` comes from the global `scroll-padding-top`.
- **States:** n/a. **Responsive:** padding steps at `md`.
- **Replaces** `Section` in `primitives.tsx`. Removes `size="sm"` (it becomes `density`), `InkTile` and `surface-ink`.

### 5.2 SectionHeader

- **Job:** a section's title and lede. One look for the whole page.
- **API:** `<SectionHeader id title lede? layout="stack"|"split" />`
- **Anatomy:** `h2.type-title max-w-[24ch]`, then an optional `p.text-body-xl.text-muted-foreground.max-w-[52ch]`.
  - `split`: at `lg`, title cols 1–7 and lede cols 8–12, aligned to the title's last line (the current behaviour).
  - `stack`: lede 12px below the title.
  - Margin to content: `mb-head`.
- **Rules:**
  - No eyebrow, no icon, no `Mark` highlight.
  - Not revealed: a heading is there the moment you reach it.
  - Lede of 20 words or fewer (R9).
- **Replaces** `SectionHead` and `SideHead` (`SideHead` is unused; delete it).

### 5.3 Button and ButtonLink

- **Job:** actions (`<button>`) and navigation styled as a button (`<a>` via `next/link`). Never a `<div>`.
- **Variants** (renamed from `default/secondary/outline/ghost/link`):

| Variant | Default | Hover | Active | Use |
|---|---|---|---|---|
| `primary` | `bg-primary text-primary-foreground` | `bg-primary-hover` | `bg-primary-active scale-97` | **one per screen**: the hero's main action, the form submit, the CTA in the mobile menu |
| `secondary` | `bg-transparent text-foreground border border-input` | `border-foreground bg-accent` | `scale-97` | the header CTA, the hero's second action, "Ask another question" |
| `quiet` | `bg-transparent text-foreground` | `bg-accent` | `scale-97` | tertiary in-component actions ("Set everything back to zero") |

The gold `secondary` and the `link` variant are **deleted**. Gold is not a button colour (audit), and links use TextLink.

- **Sizes:**

| Size | Height | Padding | Type | Use |
|---|---|---|---|---|
| `md` | 44px (`h-11`) | `px-5` | 16/600 | header, in-section |
| `lg` | 48px (`h-12`) | `px-6` | 16/600 | hero CTAs, form submit |
| `icon` | 44×44 | – | – | the menu toggle only |
| `block` (prop) | – | – | – | `w-full sm:w-auto` |

- **Anatomy:** label, plus an optional 16px icon with an 8px gap. A trailing `ArrowRight` only on in-page navigation CTAs. A leading `LoaderCircle` only while loading. Radius `rounded-sm`.
- **States:**
  - **Focus:** global ring.
  - **Loading:** label becomes "Sending…", leading spinner (`motion-safe:animate-spin`), `aria-busy="true"`, `aria-disabled="true"`. Clicks are ignored (a double-submit guard in the handler). Width is locked with `min-w` so the label change doesn't shift layout (`loading-buttons`, `submit-feedback`).
  - **Disabled:** never used for "form not valid yet". Validate on submit instead.
- **In the band:** inherits `primary = white / ink` with no prop.
- **Accessibility:**
  - The visible label is the accessible name, so there's no `aria-label` override (WCAG 2.5.3).
  - **One label per action across the page** ("Ask a CA" everywhere; R12, `consistent-help`). **(C12)**
- **Code:** `components/ui/button.tsx` (Base UI Button primitive kept). Delete `rounded-full` and `font-bold`. Text becomes `text-body-lg font-semibold`.

### 5.4 Links

| Type | Element | Look | Hover | Target | Notes |
|---|---|---|---|---|---|
| `TextLink` (inline) | `a` | inherits size, `font-semibold text-foreground underline decoration-faint decoration-1 underline-offset-3` | `decoration-foreground decoration-2` | inline: exempt from 2.5.8 | **No invisible hit strip** (S7). Underline is the non-colour cue (WCAG 1.4.1) **(C2)** |
| `TextLink` standalone | `a` | `inline-flex min-h-11 items-center gap-1.5 text-body-lg font-semibold text-foreground` + `ArrowRight` 16px | underline, arrow `motion-safe:translate-x-0.5` | 44px tall | "See every question" type links |
| `NavLink` (header) | `a` | `min-h-11 px-3 text-body-md font-semibold text-muted-foreground` | `text-foreground` | 44px | current section: `text-foreground` + 2px `bg-foreground` bar 4px below the text, `aria-current="true"` |
| `FooterLink` | `a` | `inline-flex min-h-11 items-center text-body-md text-muted-foreground` | `text-foreground underline` | 44px | |
| External | any of the above | + `ArrowUpRight` 14px + sr-only "(opens in a new tab)" | same | – | `target="_blank" rel="noopener noreferrer"`. Regulator lookups use this |

Visited links look the same as unvisited (single page). In the band, all of these inherit white and grey-300 automatically.

### 5.5 Tabs (panel switching): one component for the hero panel and the tools

- **Job:** switch between panels of related content in the same place. It's used twice: the hero app panel's screens, and "Run the numbers" (what-if / tax). **Not** for choosing a value: that's ChoiceChips (§5.10). **(C7)**
- **Built on** `@base-ui/react/tabs` (`Root/List/Tab/Panel`). The shadcn stack guideline says "use Tabs, not a custom implementation", and Base UI follows the WAI-ARIA Tabs pattern.
- **Anatomy:**
  - `List`: `flex border-b border-border`.
  - `Tab`: `relative -mb-px min-h-11 px-3 text-body-md font-semibold text-muted-foreground border-b-2 border-transparent rounded-t-sm` plus `data-active:text-foreground data-active:border-foreground`. That 2px bottom border is the selected bar. It sits over the list's hairline, it is static and rendered by the server (visible without JS), and borders survive forced-colours mode.
  - **No sliding `Tabs.Indicator`:** it needs JS measurements (`--active-tab-left`), it's decorative motion, and it disappears in forced-colours mode.
  - `Panel`: `keepMounted`, so each tool keeps its state when you switch. Panels fade in on `data-starting-style` over 200ms (opacity only) and hide instantly.
- **Variants:** `size="md"` (tools: tabs share the width equally below `sm`, auto width above) and `size="sm"` (inside the mock frame header: still 44px tall, 14px labels). No pill or segmented-track variant.
- **States:**

| State | Treatment |
|---|---|
| default | `text-muted-foreground` |
| hover | `text-foreground` |
| focus-visible | ring, offset −2px |
| active (pressed) | nothing extra |
| selected | `text-foreground` + 2px bar, `aria-selected="true"` |
| disabled | not used |
| forced colours | the bar is a border, so it shows as `CanvasText` with no extra rule |

- **Keyboard** (APG fallback; Base UI defaults):
  - Left and Right move between tabs, wrapping (`loopFocus`). Home and End go to the ends.
  - `activateOnFocus` is **true**: panels are local and instant, so automatic activation is right.
  - Tab moves into the panel (the panel is focusable only if it has no focusable content).
- **Responsive:** at most 4 tabs, each label 12 characters or fewer, so 4 tabs fit at 320px (72px each). The list never scrolls sideways. If a label doesn't fit, shorten it; don't wrap it. Don't turn tabs into a `<select>` (TRM does that, but a select hides the options).
- **Layout stability:** the panel area has a fixed `min-h` per breakpoint (the tallest screen), so switching never shifts the page (CLS).
- **No-JS:** the server renders the default tab selected and its panel visible. The other panels are present but `hidden`. That's acceptable: screen 1 of the hero is a complete picture, and the tools show their default state with a `<noscript>` line (§7.6).

### 5.6 MockFrame (the example app panel) and StatePair

- **Job:** every drawing of our product. One component, so the Example label can never be left off (honesty rule: "Mock screens carry an Example tag").
- **API:** `<MockFrame title="Paraa" elevated? caption tabs?>…screens…</MockFrame>`
- **Anatomy:**
  - **Frame:** `<figure class="theme-light rounded-lg border border-border-strong bg-card">`, with `shadow-panel` only when `elevated` (the hero).
  - **Header strip:** 48px, `px-5`, with the app name (`text-body-md font-semibold`) on the left and the **ExampleTag** on the right. **In DOM order the tag comes first**, so a screen reader hears "Example" before any figure.
  - **Optional Tabs** (`size="sm"`) under the header.
  - **Body:** `p-5 md:p-6`, made of DefinitionList rows, one optional figure (`type-heading num`), and an optional note (`bg-muted rounded-sm p-3 text-body-md text-muted-foreground`; never `text-faint` on muted).
  - **Caption:** `<figcaption class="mt-3 text-body-md text-muted-foreground">` *outside* the frame. Copy is D2's (today: "An illustration … Not a screenshot of the app, a real account, a quote or a past result.").
- **Content rules (system-enforced):**
  - No returns, values, percentages, prices or charts (build brief).
  - **No hard-coded calendar dates** that go stale. Groww's 2021 panel is the cautionary tale. Use relative wording ("Next month") or a date computed at build time.
  - Masked accounts look like "••4821".
  - All figures go through `formatINR`.
- **No device bezel:** no laptop and no phone chrome. Research: "frameless HTML panel… says more with less" (institutional §6). The frame's proportions should match the real app's form factor (Q9).
- **Responsive:**
  - ≥ 1024: 7/12 of the hero, about 620px wide.
  - < 1024: full content width, about 358px at 390.
  - The body never scrolls inside. Rows wrap: DefinitionList switches to stacked below 360.
- **StatePair** (the security band's "From Paraa / Not from Paraa"):
  - Two `MockFrame`s without `elevated`, side by side at `md`, stacked below.
  - Each carries a **Tag with icon and text** ("From Paraa" with `Check`; "Not from Paraa" with `X`) in addition to the ExampleTag. Words carry the meaning, not green or red (`color-not-only`).
  - In the band they sit in `.theme-light`, which the frame already sets.
- **Replaces** `AppDesktop`, `AppWindow` and the trust cards' mini-cards (audit T8/F4: three mock-ups become one component).

### 5.7 Panel

- **Job:** a container for one interactive object: the tool result, the form. That's all. No decorative cards.
- **Classes:** `rounded-md border bg-card p-6 md:p-8`, no shadow. On a `background-alt` section the white card and its hairline give the separation.
- **Variants:** `tone="default"` only. `InkTile` and `InnerPanel` are deleted. A panel never contains another panel or a card (round 6).
- **States:** n/a, because panels aren't interactive.

### 5.8 Lists: RuleList, DefinitionList, StepList, RuledItem

| Component | Element | Anatomy | Use |
|---|---|---|---|
| `RuleList` | `ul` | `divide-y border-y`. Rows `py-5`: optional 20px leading icon, `type-subhead` title, `text-body-md` or `-lg` muted body | basket sleeves, "what we'll never do", tax rules |
| `DefinitionList` | `dl` | rows `flex items-baseline justify-between gap-4 border-t py-3`: `dt text-muted-foreground`, `dd font-semibold text-foreground text-right num`. A `total` row has `border-t-2 border-rule` and `dd.type-heading`. `stacked` (or below 360px): dt above dd | mock screens, tool breakdown, registration details |
| `StepList` | `ol` | number (`num text-faint` or `type-label`) + `text-body-lg font-semibold` line, gap 12 | "what happens next" by the form |
| `RuledItem` | `li` or `div` | `border-t-2 border-rule pt-4`, then `type-label text-muted-foreground` label, then `type-heading` title or value, then `text-body-md` or `-lg` muted body, then an optional source line | facts strip, How-it-works steps |

- **Rules:** a 2px rule starts an item, and a 1px hairline separates rows. Those are the only two separators on the page (TRM, `whitespace-balance`). Hairline rows replace every card grid.
- **States:** rows aren't interactive, and nothing changes on hover (no lift).
- **Code:** `components/ui/list.tsx`. It replaces ad-hoc `dl` markup in `product-tour.tsx`, `trust.tsx` and `tax-estimator.tsx`.

### 5.9 Facts strip (FactItem)

- **Job:** the 2–4 facts a sceptic can check, right under the hero ("Can I check them?").
- **Anatomy:** a `RuledItem`:
  - `type-label` label ("Registration");
  - `type-heading` value ("FIU-IND");
  - `text-body-md` muted caption (what it means and what it doesn't);
  - source line `text-body-md text-faint` ("Source: … · checked 10 Nov 2026");
  - an optional external "Check it" link (`ArrowUpRight`).
- **Typed rules (P3, R3, R6):**

```ts
type Fact =
  | { kind: "plain";  label: string; value: string; caption: string; source?: string }
  | { kind: "status"; label: string; value: string; caption: string;
      number: string; verifyHref: string; checkedOn: string }; // R6: entity, body, number, link
```

  - The renderer returns `null` for a `status` fact with an empty field.
  - The strip returns `null` when fewer than 2 facts render. No empty section and no placeholder.
  - With today's data, the FIU-IND fact can't be a `status` fact, because `FIU_REG_NO` is null and there's no lookup URL (Q2).
- **Responsive:** 1 column below 640, 2 columns at 640–1023, 4 (or 3) at ≥ 1024. Values wrap, never truncate.
- **Accessibility:**
  - `<section aria-labelledby>` with an `h2.sr-only` ("Facts you can check").
  - Items are a `ul`.
  - Numbers carry `num`.

### 5.10 ChoiceChips (single choice from a few values)

- **Job:** amount presets, scenario presets and tax slabs. It's a **radio group**, not buttons with `aria-pressed`, because exactly one (or none) is chosen.
- **Markup:** `<fieldset><legend class="mb-3 text-body-md font-semibold">If you invest</legend>`. Each option is `<input type="radio" class="peer sr-only" name id>` + `<label for class="…">`. Using the sibling `peer`, not `:has()`, keeps it working in older Android browsers (build brief, round 11).
- **Classes:** `inline-flex min-h-11 items-center rounded-sm border border-input bg-card px-4 py-2 text-body-md font-semibold text-foreground num cursor-pointer transition-colors duration-150 ease-out`.
- **States:**

| State | Treatment |
|---|---|
| default | as above |
| hover | `border-foreground` |
| focus-visible (on the radio) | `peer-focus-visible:outline-2 outline-offset-2 outline-ring` |
| active | `scale-97` |
| checked | `peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary`, plus forced-colours `outline-2` |
| disabled | n/a |
| none checked | valid. After a slider moves, no scenario stays checked |

- **Two-line chips** (scenarios): title `text-body-md font-semibold` and note `text-body-md` (not 12px: it's a phrase a person reads), `min-h-14`, left-aligned. The checked note is `text-primary-foreground/80`.
- **Responsive:** `flex flex-wrap gap-2`. They wrap, never scroll sideways or truncate (`chip-collection-reflow`). Scenario chips use a 2-column grid below 640 and 3 columns above.
- **Keyboard:** native radio behaviour. Tab goes into the group (to the checked option), arrows move and select, Tab leaves.
- **No-JS:** radios still check, but the result doesn't update (§7.6).
- **Code:** `components/ui/choice-chips.tsx`. It replaces three chip styles (`what-if.tsx` amounts, `what-if.tsx` presets, `tax-estimator.tsx` slabs; audit F4).

### 5.11 Slider

- **Job:** a continuous value (each sleeve's move, the rupee's move, profit or loss).
- **Built on a native `<input type="range">`:** 0 KB of JS, keyboard and screen-reader support from the browser, and a 1:1 thumb. It replaces `AdaptiveSlider` (a Motion spring, which caused audit F2's lag). **(C6)**
- **Anatomy:**
  - **Label row:** `<label for>` (`text-body-md font-semibold`) on the left, and the current value (`type-subhead num`, `aria-hidden`) on the right. The value is spoken through `aria-valuetext`.
  - **Input:** `.range`, 44px tall (the whole row is the hit area).
  - **Track:** 6px, `--border-strong`.
  - **Fill:** from origin to value, in `--foreground` (ink).
  - **Origin tick** for ranges crossing zero: 2×14px, `foreground/40`, `aria-hidden`.
  - **Thumb:** 24px circle, `bg-card` with a 2px `--foreground` border (ink vs white 14.33:1 and ink vs track 11:1, so it meets WCAG 1.4.11).
  - **Hint:** `text-body-md text-muted-foreground`, joined with `aria-describedby`.
- **Fill technique** (no JS animation): the component sets inline `--a` and `--b` (0–1, the min and max of origin and value). The track background is `linear-gradient(to right, var(--border-strong) A, var(--foreground) A B, var(--border-strong) B)`, where `A = calc(12px + (100% - 24px) * var(--a))`. Use `::-webkit-slider-runnable-track`/`-thumb` and `::-moz-range-track`/`-thumb`. CSS goes in `@layer components`. That's the only non-utility component CSS on the page.
- **States:**

| State | Treatment |
|---|---|
| default | as above |
| hover | thumb halo `0 0 0 6px color-mix(foreground 10%)`, 150ms |
| focus-visible | ring on the input (offset 2px, radius 8) |
| active (dragging) | halo stays. No scale, no easing |
| disabled | n/a |
| forced colours | `forced-color-adjust: auto`; the thumb's border shows as `CanvasText` |

- **Keyboard:** native. Arrows move ±step, PageUp and PageDown move by larger steps, Home and End go to min and max.
- **WCAG 2.5.7 (dragging):** clicking anywhere on the track jumps the thumb (single pointer), the keyboard works, and the presets provide a third non-drag path (`dragging-alternative`).
- **Mobile:** a vertical swipe that starts on a slider must scroll the page, not change the value. This is native behaviour and must not be broken by `touch-action`. A value updates on `input` synchronously, but **screen-reader announcements are debounced** (§5.15).
- **Code:** `components/ui/slider.tsx`. Delete `components/watermelon/adaptive-slider.tsx`.

### 5.12 Form fields: TextField, PhoneField, TextArea, Checkbox

| Part | Spec |
|---|---|
| Label | above the field, `text-body-md font-semibold text-foreground`, `<label for>`. Mark the exception, not the rule: optional fields say "(optional)", and required fields carry no asterisk (`required-indicators`; the form has 4 required and 1 optional) |
| Hint | under the label, `text-body-md text-muted-foreground`, `id`, in `aria-describedby`. **PhoneField must have one** that says what happens to the number (audit T3; copy is D2's) |
| Input | `h-12 w-full rounded-sm border border-input bg-card px-4 text-body-lg text-foreground` (16px, so iOS doesn't zoom). Placeholder `text-faint`, used only for examples, never as the label (`input-labels`) |
| PhoneField | static `+91` adornment (`text-body-lg text-faint`, `aria-hidden`), `pl-13`, `type="tel" inputmode="tel" autocomplete="tel-national"`, `num` |
| TextArea | `min-h-32 py-3 resize-y`; `maxLength` from `LIMITS.question` |
| Checkbox | native `<input type="checkbox">`, `size-5 accent-primary`. The whole label row is `min-h-11 flex items-start gap-3 cursor-pointer`. Label text `text-body-md text-muted-foreground`. Using the native control keeps the platform's state rendering, high-contrast support and zero JS |
| Error | under the field: `mt-2 flex gap-2 text-body-md font-semibold text-foreground` with a `CircleAlert` 16px icon in `text-error` and the message from `lib/advisor-request` (cause and fix). The field gets `aria-invalid="true"`, the error `id` goes into `aria-describedby` (after the hint), and the border becomes `border-error` (3.76:1 ≥ 3:1). Colour is never the only signal: icon + text + border (`error-placement`, `color-not-only`) |

**Field states:**

| State | Treatment |
|---|---|
| default | as above |
| hover | `border-foreground` |
| focus-visible | ring 2px, offset 2px; border `foreground` |
| filled | same as default |
| error | as above |
| disabled | not used. **While sending**, fields stay editable and the button carries the state |
| read-only | n/a |

**Behaviour** (kept from `ask-form.tsx`, which already works):
- Validate on submit with the shared `validateRequest`. Clear a field's error as soon as it changes. After the first failed submit, also re-check a field on blur (`inline-validation`).
- Focus moves to the first invalid field. With 5 fields this is enough; the skill's `focus-management` allows it "without a summary".
- 422 field errors from the server map to the same slots.

**Layout:** one column below 640. At ≥ 640, name and mobile are side by side, and email, question and consent are full width. The submit is `block` (full width) below 640. A privacy sentence goes under the submit (`text-body-md text-muted-foreground`; research recommends it). It links to a privacy page only once that page exists in `LIVE_ROUTES` (Q8).

### 5.13 Tool result (Panel content)

- **Anatomy:**
  - `h3.type-subhead` ("After one year");
  - `p.text-body-md.text-muted-foreground` label;
  - the figure (`type-figure text-foreground`; **not gold**, since gold on white fails);
  - the change (`text-body-lg font-semibold num`, signed, U+2212 minus);
  - breakdown: a `DefinitionList` with a data swatch (`bg-data-*`, a 10px square, `rounded-xs`, the same as the basket legend) beside each sleeve name;
  - an optional diverging bar per row: `h-1 bg-muted`, a 1px zero line in `border-strong`, and the fill in **`bg-foreground` for both directions**. Direction shows the sign, the text carries the value, the bar is `aria-hidden`. No green or red (S8). **(C8)**
  - the footnote "Example only, before fees and tax." (`text-body-md text-muted-foreground`, not faint: it's an honesty line).
- **What-if "Columns" chart:** remove it. It repeats the two figures and needs Motion. **(C8)**
- **Tax split bar:** keep part = `bg-foreground`, tax part = `bg-border-strong`, `aria-hidden`.
- **Figures:** a plain `<span class="num">` from `formatINR` (replaces `Money`/NumberFlow). **Don't use `<output>`:** it has an implicit `role="status"` and would announce every drag step.

### 5.14 Alert / inline status

| Variant | Container | Icon (20px, `text-foreground` on light) | Role | Use |
|---|---|---|---|---|
| `info` | `rounded-sm border border-border-strong bg-muted p-4` | `Info` | none | neutral notes (e.g. the tools' `<noscript>` line) |
| `error` | `rounded-sm border border-error/60 bg-error/8 p-4` | `CircleAlert` in `text-error` | `role="alert"` (inserted on failure) | "We couldn't send your question" |
| `success` | `rounded-sm border border-success/60 bg-success/10 p-4`, or the full success view in the form | `CircleCheck` | the success heading gets focus (`tabIndex=-1`) | form sent |

Text is `text-body-md text-foreground`, with an optional `font-semibold` title. It never says only "Error": it gives the cause and the recovery (`error-clarity`, `error-recovery`). It's never a toast (single page, nothing to dismiss). In the band, the same classes tint over ink. The success view shows the reference with `num` and `[overflow-wrap:anywhere]`, and its heading is an **`h3`** (S6). The form ↔ success swap is a 200ms opacity change in CSS (no `AnimatePresence`).

### 5.15 Live region (tool results)

- One visually hidden `<p aria-live="polite" aria-atomic="true">` per tool, outside the result figure.
- Its text is set **500ms after the last change** (debounced), or on the `change` event. That's one announcement per gesture, not 40 per drag (`contextual-live-badge-updates`).
- Text format: "₹1,00,000 would become ₹74,100 after one year, −25.9%. Example only."

### 5.16 Accordion (FAQ)

- **Native `<details>`/`<summary>`.** It works without JS, Chrome's find-in-page opens matching answers, and the state is announced natively. This is kept from the current code.
- **Anatomy:** a `divide-y border-y` list. `summary`: `flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 type-subhead [&::-webkit-details-marker]:hidden`. `ChevronDown` 20px `text-muted-foreground` rotates 180° over 200ms (`motion-safe:`). Answer: `pb-6 max-w-prose text-body-lg text-muted-foreground`, with links as TextLink.
- **States:**

| State | Treatment |
|---|---|
| default | as above |
| hover | chevron `text-foreground`, question underline |
| focus-visible | ring on the summary, offset 2px, `rounded-sm` |
| open | chevron rotated |
| disabled | n/a |

- **Rules:**
  - At most 1 item `open` by default.
  - No exclusive `name=` grouping: visitors may want two answers open.
  - Expand animation: `[&::details-content]:transition-[height,content-visibility] duration-200 [interpolate-size:allow-keywords]` where supported, instant elsewhere.
  - Each `<details>` has an `id`, so other sections can link to an answer. A tiny script opens it on `hashchange` (optional).
- **Questions are not headings.** A heading inside `summary` loses its semantics in some screen readers, so the FAQ is navigated as a list. **(C10)**

### 5.17 Header and mobile menu

- **Header:** `<header class="tall:sticky top-0 z-40 h-header border-b bg-background">` at every width. It is **sticky, not fixed** (no layout offset hacks), **always solid** (there's no hero scene to float over), and has **no scroll listener**.
  - Contents: Brand (logo `h-8`), the desktop nav (≥ 1024), and on the right a **secondary** Button `md` with the one CTA label, plus the menu toggle below 1024.
  - The primary button on screen is always the section's, not the header's (`primary-action`).
- **Nav:**
  - At most 6 anchors, each label 14 characters or fewer, from **one `NAV` array** in `src/lib/nav.ts`. The header, footer and scrollspy all read it, so labels and order can't drift (WCAG 3.2.3, 3.2.6 `consistent-help`).
  - Scrollspy is the existing IntersectionObserver, with an ink current marker (S10).
- **Mobile menu:** a native `<details>`, kept.
  - **Toggle:** a 44×44 `secondary`-styled summary with `aria-label="Menu"`; the icon is `Menu`, or `X` when open.
  - **Panel:** `absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b bg-background shadow-panel`. Rows are `min-h-13 text-body-lg font-semibold`, `divide-y`. A **primary** `lg` block CTA sits at the bottom (the only primary on that screen).
  - Opens with a 200ms opacity fade where `::details-content` can animate.
  - **Script additions** (progressive):
    1. Esc closes it and returns focus to the toggle (exists).
    2. A link click closes it (exists).
    3. **New:** when focus leaves the `<details>` (`focusout` with `relatedTarget` outside), close it. Otherwise Tab moves focus into page content that the open panel covers, which fails **WCAG 2.4.11 Focus Not Obscured** (`focus-not-obscured`).
  - **Not modal:** no focus trap and no scroll lock.
- **States:** links follow §5.4; the toggle follows the secondary Button.
- **Responsive:** at 320 the logo (82px), CTA (about 104px), toggle (44px) and gaps fit 288px. **No label swap by width (S10). (C12)**
- **Short screens:** below 600px tall (landscape phones, 200% zoom), the header is static (`tall:` gate), so it can't cover focused content.
- **Code:** split `header.tsx` into a server `SiteHeader` plus two small client islands, `<ScrollSpy>` and `<MobileMenu>`.

### 5.18 Footer

- **Base tone, `border-t`.** It is not dark (one dark band).
- **Order:**
  1. Brand + a one-line description;
  2. `FooterLink` grid from `NAV`, plus the CTA (2 columns below 640, 3 above);
  3. the legal block: `Disclosure variant="block"` ×n (`global-risk`, `fiu-registration`, `asci-vda`, verbatim, once), 2 columns at ≥ 1024, each `max-w-prose`;
  4. **slots that render only when every field is real:** the registration table, company details and grievance officer (`content-rules` §0.2, production rule);
  5. "© {year} Paraa Capital." (the cached `CurrentYear` stays).
- **Rules:**
  - Legal text is `text-body-md text-muted-foreground` (7.58:1) with `strong` in `text-foreground font-semibold`. Never 10–12px grey (the Zerodha anti-pattern).
  - Links are 44px rows.
  - `<h2 class="sr-only">Site information</h2>` stays.

### 5.19 Disclosure

- **Job:** every disclaimer, from one source (R15). Text lives in **`src/content/disclosures.tsx`** as `Record<DisclosureId, ReactNode>`, and the component is `<Disclosure id="global-risk-v3" variant>`. Today the text is written inside `footer.tsx` and `hero.tsx`.
- **Variants:**

| Variant | Spec | Where |
|---|---|---|
| `lead` | `text-body-md text-muted-foreground max-w-[60ch]`, no box | under the hero CTAs (today it's a translucent ink pill over the scene) |
| `inline` | `mt-2 text-body-md text-muted-foreground` | directly under a claim ("Your CA may be paid by us", the FIU scope line) |
| `block` | `text-body-md text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold max-w-prose` | footer |

- **Rules:**
  - ≥ 14px and ≥ 4.5:1 on its surface.
  - Never collapsed, never in a tooltip, never sticky or floating (the Mercury 390px bar is the anti-pattern), never revealed by animation.
  - Rendered as `<div data-disclosure-id>`.
  - Ids are versioned (`-v1`, `-v2`).
  - QA A13: each disclosure's text exists in exactly one file.

### 5.20 ExampleTag and Tag

| Component | Spec |
|---|---|
| `ExampleTag` | the text is fixed as "Example" (copy can change it in one place). `inline-flex h-6 items-center rounded-xs border border-foreground bg-card px-2 text-body-md font-semibold text-foreground whitespace-nowrap`. **14px, not 12px** (honesty labels ≥ 14px). Not gold. Not interactive. Inside every MockFrame header, first in DOM |
| `Tag` (status) | same box. An optional 16px leading icon (`Check`, `X`, `Clock`) and text. Neutral colours only. Meaning is in the words |
| (removed) | the pill `ExampleTag` (`rounded-full`), and the two inline copies in `product-tour.tsx` and `trust.tsx` |

### 5.21 AllocationBar (Basket)

- **Anatomy:** a 12px bar (`flex gap-0.5 rounded-xs overflow-hidden`), with segments `bg-data-us|gold|oil` sized by `flex-grow` from `SLEEVES[].weight`. It's `aria-hidden`.
- **Legend:** `RuleList` rows, each with:
  - a swatch (10px square `rounded-xs`; squares mean data, circles mean points);
  - name (`type-subhead`);
  - weight (`type-heading num`, via `formatPct`);
  - "what" and "why" (`text-body-md` muted).
- **Example label:** a caption under the bar ("Example mix, for illustration", D2's copy) in `text-body-md text-muted-foreground`. The weights are illustrative (`lib/basket.ts`).
- **Contrast note:** gold and grey-400 segments are below 3:1 on white. The bar is a redundant graphic, and the percentages are text, so WCAG 1.4.11 doesn't apply. The 2px gaps keep the segments distinct.
- **States:** none. No hover lift and no drawings (audit D4; `asset-art.tsx` is deleted).

### 5.22 Brand, skip link and figures

- **Brand:** the logo inside a link, `aria-label="Paraa Capital, home"`, `img alt=""`, `h-8` in the header and `h-10` in the footer. **Ask for an SVG** (Q1): today's PNG is 235×92, 16.5 KB, preloaded, and soft on 3× screens.
- **SkipLink:** first in tab order. `sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-100 min-h-11 rounded-sm bg-primary px-4 text-primary-foreground`. It targets `main#main` (`tabIndex=-1`). Kept.
- **Figures:** `formatINR`, `formatUSD` and `formatPct` only, plus `num`. Rupees use Indian grouping whatever the browser locale (unlike Wise). `Money` and NumberFlow are deleted.

---

## 6. Responsive specification

**Widths tested:** 320, 360, 390, 768, 1024, 1280, 1440, and 1920 (the container caps at 1200). **Zoom:** 200% on 1440×900, which is 720×450 CSS px, and 400% on 1280, which is 320 CSS px (the WCAG 1.4.10 reflow case).

| Section | 320 / 390 | 768 | 1024 | 1440 |
|---|---|---|---|---|
| Header | logo · CTA · menu (288 / 358 content) | same | logo · 6 nav · CTA (fits about 850px) | same, centred 1152 |
| Hero | stack: h1 32 / 36 → lede → CTAs stacked, block → disclosure → panel (full width) | h1 44; CTAs in a row; panel full width | L3 5 / 7; h1 48; panel about 560px wide | L3 5 / 7; panel about 620px |
| Facts strip | 1 column, items separated by the 2px rule | 2 columns | 4 (or 3) columns | same |
| Basket | header → bar → rows stacked | same | L1; rows in 3 columns under the bar | same |
| How it works | 1 column steps | 2 × 2 | 4 columns | same |
| Run the numbers | Tabs (2 equal) → **readout** → inputs → full result | same | L4: inputs 7 / result 5, result `tall:sticky top-[calc(var(--header-h)+1.5rem)]` | same |
| Security (ink) | header → never-list → StatePair stacked (text before mocks: `content-priority`) → registration list | StatePair side by side | groups in 2 columns where content allows | same, band ≤ 1,200px |
| FAQ | stacked | stacked | L2 4 / 8, heading `tall:sticky` | same |
| Ask a CA | header → steps → form (1 column fields) | form fields 2 + 1 | L3 5 / 7 | same |
| Footer | brand → links in 2 columns → legal in 1 column | links in 3 columns | brand 5 / links 7; legal in 2 columns | same |

**Mobile readout in the tools (C9):**
- Below 1024, a compact result line ("After one year **₹74,100** · −25.9%", `type-subhead num`, `bg-card border-b`, 56px) sticks under the header (`tall:sticky top-header z-10`) **only while the tool's panel is on screen**. Make it sticky inside the tool's own container, so it scrolls away with the tool.
- This way the answer stays visible while you move a slider 600px further down. Today, on a phone, the result sits about 700px below the first slider.
- Controls inside the tool get `scroll-margin-top: calc(var(--header-h) + 4.5rem)`, so keyboard focus is never scrolled under the readout (WCAG 2.4.11).
- It isn't a sales bar: it shows the user's own number, and it isn't sticky on short screens.

**Zoom:**
- **200% (720×450):** mobile layouts. The header and readout aren't sticky (`tall` fails). No horizontal scroll. The hero panel is full width.
- **400% (320 CSS px):** identical to 320.
- **Text-spacing override (WCAG 1.4.12):** no clipping in chips, tabs, tags or buttons. Use `min-h-*`, never a fixed `h-*` on anything that holds text, except inputs, where `h-12` with single-line text is safe.

**Landscape phone (844×390):** the header is static, so the full height is content. The tools are usable, and the readout isn't sticky.

**Never:**
- horizontal page scroll (check `scrollWidth ≤ clientWidth` at every width);
- truncated labels;
- multi-column rows below 640 (the Fireblocks failure);
- `100vh` (use `svh`/`dvh` only where needed).

---

## 7. Accessibility standard

**Target:** WCAG 2.2 AA throughout, plus our own **44×44px rule for every target** except inline links in prose (2.5.8's inline exception). The skill notes WCAG's web minimum is 24px (`web-target-size`), and we choose 44 (`touch-target-size`) because the audience is on phones.

### 7.1 Criteria and how this design meets them

| WCAG 2.2 | How |
|---|---|
| 1.1.1 Non-text content | Icons beside text are `aria-hidden`. Mock frames are `<figure>` + `<figcaption>`. Allocation and breakdown bars are `aria-hidden` because the text carries every value. The logo link is named |
| 1.3.1 Info and relationships | `dl` for label–value pairs, `ol` for steps, `fieldset` + `legend` for chips and slab, `label for` on every field, `<table>` for the registration table when it exists |
| 1.3.2 Meaningful sequence | DOM order = visual order. The ExampleTag comes first in the mock |
| 1.3.5 Input purpose | `autocomplete="name"`, `"tel-national"`, `"email"` |
| 1.4.1 Use of colour | Underlined links. Signs and words on gains and losses. Selected = fill + edge + ARIA state. Status = icon + words |
| 1.4.3 Contrast (text) | Appendix A. Rules: `text-faint` never on `bg-muted`; 12px only in `foreground`/`muted-foreground` |
| 1.4.4 / 1.4.10 Resize, reflow | rem type; no horizontal scroll at 320; stepped headings |
| 1.4.11 Non-text contrast | `--input` grey-500 (4.76) for control edges, focus ring 14.33, slider thumb ink border, checked chip ink |
| 1.4.12 Text spacing | `min-h` not `h` on text containers |
| 1.4.13 Content on hover | No tooltips or hover-only content |
| 2.1.1 / 2.1.2 Keyboard, no trap | Native controls plus Base UI Tabs; §7.2 key map. The mobile menu isn't a trap |
| 2.4.1 Bypass | Skip link |
| 2.4.3 Focus order | Hero copy before the panel; tool inputs before the result; form fields in order |
| 2.4.6 Headings and labels | One `h1`; an `h2` per section (sr-only where untitled); `h3` inside; no skipped levels (S6) |
| 2.4.7 Focus visible | A global 2px ring, never removed; offset −2px inside clipping containers |
| **2.4.11 Focus not obscured** | `scroll-padding-top: header + 16px`; the header isn't sticky below 600px tall; the mobile menu closes on focusout; `scroll-margin-top` under the tools readout |
| 2.5.3 Label in name | No `aria-label` that differs from the visible text |
| **2.5.7 Dragging movements** | Slider: click on the track, keys and presets. No drag-only control exists (the carousel's swipe is deleted) |
| **2.5.8 Target size** | 44px (our rule); inline links exempt |
| 3.1.1 Language | `lang="en-IN"` (kept) |
| 3.2.1 / 3.2.2 On focus, on input | Tab activation on focus changes only the panel, never the page. No auto-submit |
| 3.2.3 Consistent navigation | One `NAV` array |
| **3.2.6 Consistent help** | "Ask a CA" is in the same position in the header and footer on every view |
| 3.3.1 / 3.3.3 Errors | Field-level, cause + fix (messages from `lib/advisor-request`) |
| 3.3.2 Labels | Visible labels; "(optional)" marked |
| **3.3.7 Redundant entry** | The hero phone field is gone, so nothing is asked twice |
| 4.1.2 Name, role, value | Native elements; Base UI Tabs; radios for chips (replacing `aria-pressed` buttons) |
| 4.1.3 Status messages | Debounced polite live region per tool; `role="alert"` on send failure; focus to the success heading |

### 7.2 Keyboard map

| Component | Keys |
|---|---|
| Skip link | Tab (first), Enter → `main` |
| Tabs | ←/→ move and activate · Home/End · Tab into the panel |
| ChoiceChips | Tab into the group · ←/→/↑/↓ select · Tab out |
| Slider | ←/→ ±step · PageUp/PageDown large step · Home/End |
| Accordion | Enter/Space toggle |
| Mobile menu | Enter/Space toggle · Esc closes and focuses the toggle · Tab out closes |
| Form | Tab order: name, phone, email, question, consent, submit · Enter submits from a text input |

### 7.3 Screen-reader expectations

These are verified with NVDA + Chrome on Windows, TalkBack + Chrome on Android (the main audience) and VoiceOver on iOS.

- **Mock frame:** "figure, [caption]… Example… Your plan…".
- **Tabs:** "Invest, tab, selected, 2 of 4".
- **Chips:** "₹1 lakh, radio button, checked, 2 of 4, If you invest".
- **Slider:** "US stocks, slider, −10%" (`aria-valuetext`).
- **Tool results:** announced once after a change settles, ending with "Example only".
- **Form:** each error is read with its field. A send failure is announced. The success heading is focused and read with the reference.
- **External links** say "(opens in a new tab)".
- **Abbreviations** (KYC, LRS, TCS, FIU-IND) are expanded in words on first use (R9). That's a content check.

### 7.4 Reduced motion

The page is complete with motion off. Nothing hides and nothing slides. The tab fade, FAQ expand, reveal and smooth scroll are all off. The spinner is static, and the label "Sending…" carries the state.

### 7.5 Forced colours and print

- **Forced colours (Windows contrast themes):** checked chips get `outline: 2px solid` (system colour), the selected tab bar becomes a border, the primary button keeps its border, and the slider thumb border and checkbox are native, so they're fine. Test with the "Night sky" and "Desert" themes.
- **Print:** `.theme-ink` falls back to the light roles. Reveal-hidden blocks print. The disclosures print.

### 7.6 No-JavaScript behaviour

| Component | With JS off |
|---|---|
| Whole page | Full HTML from the server, with no hidden content. RevealController never runs, so nothing is tucked away |
| Header / mobile menu | The native `<details>` opens and closes. Scrollspy is absent |
| Hero panel (Tabs) | The first screen is shown and the tab list is visible but inert. Acceptable: screen 1 is complete. A visually hidden note isn't needed |
| Tools | The default state is rendered: what-if at zero (R5), so the figure equals the amount, and tax at ₹1,00,000, 30% slab. Chips and sliders move, but results don't update. A `<noscript>` Alert `info` says so in one line ("The calculators need JavaScript. The figures shown are for the starting values.") |
| FAQ | Fully works |
| **CA form** | **Today it fails silently (S5).** Minimum for launch: a `<noscript>` Alert above the submit saying the form needs JavaScript. **Preferred (C13):** progressive enhancement through a Server Action and React's `useActionState` (`node_modules/next/dist/docs/01-app/02-guides/forms.md`), with `name` on every field, calling the **same** `validateRequest` and the same webhook forwarder (moved from `route.ts` into `lib/advisor-request` so both paths share it). The JSON route stays for the JS path, so business logic is unchanged |

---

## 8. Performance budgets

| Metric | Today | Budget | How measured |
|---|---|---|---|
| First Load JS, `/` (gzip) | 266 KB (audit F1) | **≤ 140 KB**, and ≤ 35 KB above an empty Next 16 page built in this repo | `next build` route table; `npx next analyze --output` (Next 16.1+ docs) |
| CSS (gzip) | – | ≤ 15 KB | build output |
| Fonts | 1 preloaded (latin) + latin-ext fetched late for ₹ | **2 preloaded** (latin about 24 KB + latin-ext about 15 KB), nothing else | Network panel; ₹ never swaps after first paint |
| Images above the fold | logo PNG 16.5 KB | logo ≤ 5 KB (SVG, Q1); no other images | Network panel |
| LCP (Lighthouse mobile, Slow 4G, 4× CPU) | – | ≤ 2.0s (the LCP element should be the `h1` text) | Lighthouse on `next start` |
| CLS | – | ≤ 0.05 (fixed tab-panel heights, `num`, size-adjusted fallback font, both subsets preloaded) | Lighthouse, Web Vitals |
| TBT / INP | – | TBT ≤ 150ms; INP ≤ 200ms while dragging a slider on a mid-range Android | Lighthouse; DevTools Performance with 4× CPU |
| DOM nodes | 996 (207 SVG) | ≤ 900 | `document.querySelectorAll('*').length` |
| `will-change` | 17 elements | 0 | QA A15 |
| Scroll listeners | 1 (header) + Motion's `useScroll` | 0 (IntersectionObserver only) | code review |
| Third-party requests | 0 | 0 | Network panel (Q10) |
| Lighthouse scores (mobile) | – | Perf ≥ 90 · Accessibility 100 · Best practices ≥ 95 · SEO 100 | Lighthouse |

**Removals that buy the budget:**

| Package / file | Why | Effect |
|---|---|---|
| `motion` (+ `providers.tsx` `MotionConfig`) | the flight, slider springs, form presence, art, columns: all gone or CSS | the largest single cut |
| `@number-flow/react` (+ `money.tsx`) | rolling digits are banned on money | removed |
| `@radix-ui/react-accordion` | unused (the FAQ is `<details>`) | dependency hygiene |
| `tw-animate-css` | imported, unused | smaller CSS |
| `hero-scene.tsx`, `hero.tsx` flight, `product-tour.tsx` pin, `what-you-get.tsx` carousel, `asset-art.tsx` | audit F5, F6, D4 | about 900 lines, 9 full-screen SVG layers, 207 SVG nodes |

**Client components allowed** (anything else is a Server Component; `nextjs`: "Server Components by default"):
- `ScrollSpy` and `MobileMenu` (header islands);
- the hero's `AppPanelTabs`;
- `ToolsTabs`, `WhatIf` and `TaxEstimator`;
- `AskForm`;
- `RevealController`.

`@base-ui/react` stays, for Button and Tabs, and its chunk is shared.

---

## 9. File plan: delete, merge, keep, new

| File | Action | Notes |
|---|---|---|
| `app/globals.css` | **Rewrite** tokens (§3.2) | Delete `surface-ink`, `surface-light`, `.mark`, `land-tint`/`.land-target` (unused), `scene-drift`/`.scene-layer`, `line-fill`/`.scroll-line`, `.no-scrollbar`, `--radius` 24/32 and both shadows. Keep the reveal rules |
| `app/layout.tsx` | Edit | Remove `Providers`; both font subsets; `themeColor "#FFFFFF"`, `colorScheme "light"` |
| `app/page.tsx` | Edit | New section order (D2); skip link kept |
| `app/api/advisor-request/route.ts` | **Keep** | Optionally move the forwarder into `lib` for the Server Action (C13); behaviour unchanged |
| `components/providers.tsx` | **Delete** | Motion only |
| `components/home/hero.tsx` | **Rebuild** as a static L3 hero (server) + `AppPanelTabs` (client) | ~230 → ~80 lines |
| `components/home/hero-scene.tsx` | **Delete** | |
| `components/home/hero-ask.tsx` | **Delete** | the phone field in the hero (T3); the `paraa:prefill` event goes with it |
| `components/home/product-tour.tsx` | **Delete**; its `SCREENS` data moves to `hero-screens.ts` | becomes MockFrame + Tabs content |
| `components/home/basket.tsx` | **Rebuild** | AllocationBar + RuleList; no art, no hover lift, no `Mark` |
| `components/home/asset-art.tsx` | **Delete** | |
| `components/home/sleeve-info.tsx` | **Keep**; `swatch` and `swatchOnInk` become `bg-data-*` roles | one swatch field, because the scope handles ink |
| `components/home/how-money-moves.tsx` | **Rebuild** as `how-it-works.tsx` | RuledItem steps; no sticky stack, no colour progression |
| `components/home/what-if.tsx` | **Restyle** (logic untouched) | ChoiceChips, Slider, light Panel, single-colour bars, no Columns, no `Money` |
| `components/home/tax.tsx` + `tax-estimator.tsx` | **Merge** into a `tools.tsx` section; `tax-estimator.tsx` restyled (logic untouched) | One section, one Tabs (audit D6) |
| `components/home/trust.tsx` | **Delete** → new `security.tsx` (ink band) | Its facts move into the band (audit T4) |
| `components/home/what-you-get.tsx` | **Delete** | the carousel (T6, F6) |
| `components/home/faq.tsx` | **Restyle** | Accordion spec; content from D2 |
| `components/home/ask.tsx` | **Rebuild** | Section alt, L3; the gold band is gone (T7) |
| `components/home/ask-form.tsx` | **Restyle**, keep the logic | Fields spec, no Motion, `h3` success, `name` attrs, optional Server Action |
| `components/paraa/primitives.tsx` | **Split** into `components/ui/{section,section-header,link,panel,list,tag,disclosure}.tsx` | Delete `InkTile`, `InnerPanel`, `SideHead`, `ArrowLink` (unused, F7) |
| `components/paraa/mark.tsx` | **Delete** | audit D3 |
| `components/paraa/money.tsx` | **Delete** | NumberFlow |
| `components/paraa/reveal.tsx`, `reveal-controller.tsx` | **Keep** | Drop `[data-mark]` from the controller's selector |
| `components/watermelon/adaptive-slider.tsx` | **Delete** → `components/ui/slider.tsx` | native range |
| `components/ui/button.tsx` | **Restyle** | §5.3 variants |
| `components/site/header.tsx` | **Rebuild** as server + 2 islands | §5.17 |
| `components/site/footer.tsx` | **Restyle** | Disclosures from the registry |
| `components/site/brand.tsx` | Keep | `h-8` in the header; SVG when supplied |
| **New** | `components/ui/{tabs,choice-chips,slider,field,alert,mock-frame,allocation-bar}.tsx`, `components/home/{facts-strip,security,tools,how-it-works}.tsx`, `content/disclosures.tsx`, `lib/nav.ts`, `home/hero-screens.ts` | |
| `lib/*` (all) | **Keep unchanged** | `format`, `basket`, `tax`, `advisor-request`, `rupee`, `routes`, `links`, `utils`, and every test. `utils.ts` gets new class groups only if new `text-*` tokens are added (A10) |
| `package.json` | Remove `motion`, `@number-flow/react`, `@radix-ui/react-accordion`, `tw-animate-css` | `shadcn` can move to `devDependencies` (only its CSS is imported at build time) |
| Docs | `build-brief.md` gets a ROUND 17 block; `design-tokens.md` §3 updated (radius, elevation) | after the merge, not now |

---

## 10. QA checklist for the joint review

Each check has an ID for review notes ("fails B6 at 390, basket"), an owner (**Dev** or **Des**), and an objective pass rule wherever possible. Greps use `rg` (ripgrep) from the repo root.

### A. Tokens and code hygiene (Dev, automatable)

| ID | Check | Pass |
|---|---|---|
| A1 | No raw colours in components: `rg -n "#[0-9a-fA-F]{3,8}\b\|rgb\(\|rgba\(\|hsl\(\|oklch\(" src/components src/app/page.tsx` | 0 hits |
| A2 | No arbitrary type, radius, shadow or size values: `rg -n "(text\|leading\|tracking\|rounded\|shadow\|size)-\[" src/components` | 0 hits. Other arbitrary values only from this list: `max-w-[24ch]`, `max-w-[52ch]`, `max-w-[60ch]`, `top-[calc(var(--header-h)+1.5rem)]`, `max-h-[calc(100dvh-var(--header-h))]`, `[overflow-wrap:anywhere]`, the FAQ's `[&::details-content]…` and `[interpolate-size:allow-keywords]` |
| A3 | No primitives in components: `rg -n "\b(grey\|gold\|ink)-[0-9]\|bg-white\|text-white\|bg-black\|surface-(ink\|light)" src/components` | 0 hits |
| A4 | Removed dependencies are gone: `rg -n "motion/react\|@number-flow\|@radix-ui\|tw-animate" src package.json` | 0 hits |
| A5 | One dark band: `rg -n "tone=\"ink\"\|theme-ink" src/components` | exactly 1 (`security.tsx`) |
| A6 | Two weights: `rg -n "font-(thin\|extralight\|light\|medium\|bold\|extrabold\|black)\b" src` | 0 hits |
| A7 | Radius set: `rg -n "rounded-(none\|full\|2xl\|3xl\|xl)\b\|rounded\b[^-]" src/components` | 0 hits (the slider thumb's circle lives in component CSS) |
| A8 | Shadow use: `rg -n "shadow-" src/components` | only `shadow-panel`, in `mock-frame.tsx` (elevated) and the mobile menu |
| A9 | No `dark:` and no inline colour: `rg -n "dark:\|style=\{\{[^}]*(color\|background)" src/components` | 0 hits. Inline `style` only for `--a`/`--b` (slider) and `--reveal-delay` |
| A10 | `cn()` keeps colour next to custom sizes: a test in `utils.test.ts` for `cn("text-body-md","text-primary-foreground")` and every new `text-*` token | test passes |
| A11 | Formatting through `lib/format`: `rg -n "toLocaleString\|Intl\.NumberFormat" src/components` | 0 hits |
| A12 | No `<output>` around changing figures: `rg -n "<output" src/components` | 0 hits, or reviewed |
| A13 | Disclosures single-sourced: `rg -n "Investing involves risk\|registered with FIU-IND\|Crypto products and NFTs" src` | each phrase appears in `content/disclosures.tsx` only (the FAQ answer may reference FIU in its own words; reviewed) |
| A14 | Gates: `npm run typecheck`, `npx eslint src`, `npm test`, and `npm run build` (the todo guard) | all green |
| A15 | `rg -n "will-change" src` | 0 hits |
| A16 | Client boundary: `rg -l "\"use client\"" src` | only the §8 allowlist |
| A17 | No placeholder text reaches HTML: `curl -s localhost:3000 \| rg -i "to confirm\|todo\|lorem\|\[tbd"` on a production build | 0 hits |

### B. Visual consistency (Des, at 1440 and 390, both scrolled fully)

| ID | Check | Pass |
|---|---|---|
| B1 | Every section is built with Section + SectionHeader; every `h2` computes to the same size at a given width | equal sizes |
| B2 | Distinct computed font sizes on the page | ≤ 7 at 1440 |
| B3 | Distinct radii | only {4, 8, 12, 16} + circles |
| B4 | Box shadows (excluding focus) | 1 token, on ≤ 2 elements |
| B5 | Surface sequence | matches §3.4 for the final order; one ink band; no same-tone neighbours except the facts strip |
| B6 | Gold count per screen | ≤ 3 including the logo; never text on light, never a button, never a state |
| B7 | Primary buttons per screen | exactly 1 where there's an action; the header CTA is secondary |
| B8 | Every mock | ExampleTag visible inside the frame and first in DOM; figcaption present; no return, price, % or chart; no hard-coded future date |
| B9 | Icons | lucide only, stroke 1.75, 16/20/24px; no Shield/Lock/BadgeCheck/Landmark beside a status claim |
| B10 | Separators | 1px hairline rows, 2px rules only on items and totals |
| B11 | Rhythm | every section's padding-top equals the `--section-y` token, except the hero and compact sections |
| B12 | Labels | the same action has the same label everywhere (header, menu, hero, footer, inline links) |
| B13 | Nothing hover-lifts or animates on hover except colour, underline or a 2px arrow nudge | visual check |
| B14 | Selected and checked states are the same ink treatment in tabs, chips and the mobile nav current item | visual check |

### C. Accessibility, automated (Dev)

| ID | Check | Pass |
|---|---|---|
| C1 | axe (DevTools or `@axe-core/cli`) at 390 and 1440 in these states: default, menu open, tools tab 2, form errors, form sending, form sent, form failed | 0 serious or critical |
| C2 | Lighthouse accessibility | 100 |
| C3 | Contrast spot checks against Appendix A, including the band and the light mocks inside it | all ≥ the table value |
| C4 | Target sizes: script over every `a, button, input, summary, label[for]` that is visible | ≥ 44×44, except inline prose links and sr-only radios (their label is measured) |
| C5 | Headings | one `h1`; an `h2` per section; no skipped levels |
| C6 | Landmarks | `header` (banner), `nav[aria-label="Main"]`, `main#main`, `footer`; each `section` has an accessible name |

### D. Keyboard (Des + Dev, manual)

| ID | Check |
|---|---|
| D1 | The skip link is the first stop, visible, and lands on `main` |
| D2 | Tab order follows visual order in every section, at 390 and 1440 |
| D3 | Tabs follow §7.2; focus is visible on the tab and on panel content |
| D4 | Chips: arrows select within a group; one Tab stop per group |
| D5 | Sliders: all keys in §7.2 work; the displayed value matches what's spoken |
| D6 | FAQ toggles with Enter and Space; focus is visible |
| D7 | Mobile menu: open, Esc, link and Tab-out behaviour as in §5.17 |
| D8 | Form: an empty submit focuses name; each error is read; a successful send focuses the success heading; "Ask another question" returns focus to name |
| D9 | **Focus not obscured:** tab through the whole page at 1440×900, 390×844 and 200% zoom. No focused element is fully hidden by the header, menu or readout |
| D10 | No keyboard trap anywhere |

### E. Screen readers (Des, NVDA, TalkBack, VoiceOver)

| ID | Check |
|---|---|
| E1 | A tool result is announced once per gesture, ending "Example only" |
| E2 | Tabs announce role, state and position |
| E3 | Chips announce as radio buttons with their group |
| E4 | Mocks: "Example" is read before any figure; the caption is read |
| E5 | Form: errors are associated with fields; the failure alert is announced; success is read with the reference |
| E6 | FAQ state (expanded or collapsed) is announced |
| E7 | External links say "(opens in a new tab)" |

### F. Responsive and zoom (Des + Dev)

| ID | Check | Pass |
|---|---|---|
| F1 | At 320, 360, 390, 768, 1024, 1280, 1440 and 1920: `document.documentElement.scrollWidth <= clientWidth`, with no clipping or overlap | all widths |
| F2 | 200% zoom on 1440×900 | mobile layout, header static, nothing cut off |
| F3 | 400% zoom (320 CSS px) | the same as F1 at 320 |
| F4 | Text-spacing bookmarklet (1.4.12) | no clipped text in chips, tabs, tags or buttons |
| F5 | Landscape 844×390 | header and readout static; tools usable |
| F6 | The longest chip and tab labels at 320 | fit; no ellipsis |
| F7 | Page height | ≤ 7,500px at 1440; ≤ 11,500px at 390 |
| F8 | First view (§4) | met at 1440×900 and 390×844 |
| F9 | Ink band height | ≤ 1,200px at 1440 |

### G. Motion (Des)

| ID | Check |
|---|---|
| G1 | With OS reduced motion on: no reveal, no fade, no smooth scroll; the page is complete |
| G2 | Nothing in the first screen moves on load |
| G3 | No loop anywhere except the spinner during "Sending…" |
| G4 | Switching tabs: a ≤ 200ms fade-in, instant exit, **no layout shift** (DevTools Layout Shift regions show nothing) |
| G5 | The slider thumb stays under the pointer while dragging fast (record at 60fps: 0 frames of lag) |
| G6 | At most 2 things animate at once in any screen |

### H. Resilience (Dev)

| ID | Check |
|---|---|
| H1 | With JS disabled, everything in §7.6 is true, including the form never failing silently |
| H2 | Slow 3G: before hydration, the content reads correctly, and no control looks ready while being dead (the form submit is either working or explained) |
| H3 | With fonts blocked: the fallback renders with no overflow, and ₹ is present |
| H4 | Print preview: the band prints legibly; the disclosures print |
| H5 | Windows contrast themes: focus, selected tab, checked chip, slider thumb and checkbox are all visible |
| H6 | API states: 422 shows the errors per field; 503 (no webhook configured) shows the failure alert and keeps the text; 502 does the same; 200 shows the reference; the honeypot is untouched |

### I. Performance (Dev, on a production build)

| ID | Check | Pass |
|---|---|---|
| I1 | `next build` First Load JS for `/` | ≤ 140 KB gz and ≤ 35 KB over an empty page |
| I2 | `npx next analyze --output` | no motion, number-flow or radix modules |
| I3 | Lighthouse mobile | Perf ≥ 90, LCP ≤ 2.0s, CLS ≤ 0.05, TBT ≤ 150ms |
| I4 | DOM nodes | ≤ 900 |
| I5 | Fonts | exactly 2 woff2, both preloaded, no late ₹ swap |
| I6 | Third-party requests | 0 |
| I7 | INP while dragging a slider on a 4× throttled CPU | ≤ 200ms |

### J. Business logic regression (Dev; compare before and after with the same inputs)

The reference values below were computed from today's `lib/basket.ts`, `lib/tax.ts` and `lib/format.ts`. The rebuilt UI must show exactly these figures.

| ID | Input (amount ₹1,00,000 unless stated) | Value after | Change | Breakdown (US / gold / oil / rupee) |
|---|---|---|---|---|
| J1 | Default (no change) | ₹1,00,000 | ₹0 (0.0%) | ₹0 / ₹0 / ₹0 / ₹0 |
| J2 | All three fall | ₹74,100 | −₹25,900 (−25.9%) | −₹12,500 / −₹1,500 / −₹8,000 / −₹3,900 |
| J3 | Stocks fall | ₹90,000 | −₹10,000 (−10.0%) | −₹10,000 / ₹0 / ₹0 / ₹0 |
| J4 | Oil falls | ₹92,000 | −₹8,000 (−8.0%) | ₹0 / ₹0 / −₹8,000 / ₹0 |
| J5 | Stronger rupee | ₹95,000 | −₹5,000 (−5.0%) | ₹0 / ₹0 / ₹0 / −₹5,000 |
| J6 | Weaker rupee | ₹1,05,000 | +₹5,000 (+5.0%) | ₹0 / ₹0 / ₹0 / +₹5,000 |

| ID | Tax input | Tax | You'd keep |
|---|---|---|---|
| J7 | +₹1,00,000 at 30% (the default) | ₹31,200 | ₹68,800 |
| J8 | +₹1,00,000 at 0% | ₹0 | ₹1,00,000 |
| J9 | −₹50,000 at 30% | ₹0 | loss shown ₹50,000 |
| J10 | +₹20,00,000 at 30% | ₹6,24,000 | ₹13,76,000 |
| J11 | +₹10,000 at 5% | ₹520 | ₹9,480 |

| ID | Check |
|---|---|
| J12 | `npm test` is green (format, basket, tax, advisor-request, rupee, routes, utils, todo guard) |
| J13 | Copy limits still present: "not approval of this investment", "Your CA may be paid by us", both rupee directions in one place, "you don't own the shares", the ASCI line verbatim and only in the footer, maturity-only withdrawals to your own account |

---

## 11. Positions I expect D1 and D2 to challenge

Each comes with the reason, and with what would change my mind.

| # | Position | Why | Would change my mind |
|---|---|---|---|
| **C1** | **Gold never signals state.** Thumbs, active markers and selected tabs are ink. Gold is the logo and the gold sleeve only. The audit had a gold slider thumb and a gold active marker | Gold is 1.64:1 on white, so it can't be a state indicator without an ink edge (WCAG 1.4.11), and 4 gold thumbs plus a figure break the ≤ 3 budget on the tools screen. The rule is simple enough to test (B6) | D1 shows a page that feels lifeless without gold *and* a gold use that passes 1.4.11 and the budget, for example one gold "active" marker in the hero panel with an ink outline |
| **C2** | **Links are ink with an underline, not gold-800** | Underline is required anyway (1.4.1). Gold-800 links everywhere in the FAQ and footer add gold to every screen. TRM and Zerodha get authority from restraint | If D1 wants `brand-text` for links, it must be the only gold-800 use, and B6 still holds |
| **C3** | **No pills anywhere**, including tags and status tags (the audit allowed pill status tags). 4/8/12/16 corners, and the slider thumb is the only circle | One shape language. Pills read as consumer app; 4–10px reads as institution (TRM, Mercury, Zerodha) | A brand reason from the design file (its swatches are drawn at 16–24px corners) |
| **C4** | **Two weights only (400, 600).** Headings at 600, against the design file's "Bold" | The audit already chose 600, and research says heavy display weights look generic. Two weights are easy to keep consistent | D1 wants 700 for `type-figure` only. That's acceptable as a single exception |
| **C5** | **Primitives aren't classes**; only roles are | Stops `text-grey-400`-style contrast failures and one-off colours at the source | If designers need an escape hatch, it should be a named role, not a primitive |
| **C6** | **A native range slider, not Base UI Slider or Motion** | 0 KB, 1:1 tracking (audit F2), native a11y, works without JS | If Samsung Internet or an older WebView can't style the thumb acceptably in QA, fall back to Base UI Slider (same visual spec) |
| **C7** | **One underline Tabs for both the hero panel and the tools, no segmented pill, no sliding indicator** | One component per job. The sliding indicator needs JS, is decorative, and vanishes in forced colours | D2 shows the hero panel tested better as a static single screen, in which case it has no tabs at all (Q4) |
| **C8** | **Tool results are light, single colour, with no Columns chart.** No ink result panels and no green or red bars | The ink band must stay unique (P2). Proposal §4 limits red and green to errors. The Columns chart repeats two figures and costs Motion | D2 proves the bars or Columns are what makes people understand the downside (R8); then bring them back in ink only |
| **C9** | **A sticky mobile result readout inside the tools** | On a phone the result is about 700px below the first slider today | D2 has a better pattern, such as result-first ordering, that keeps the figure visible |
| **C10** | **FAQ questions aren't headings** | `<details>` is robust without JS; a heading inside `summary` is unreliable | An APG accordion (`h3 > button[aria-expanded]`) is acceptable if D2 wants heading navigation, but it needs JS and loses find-in-page |
| **C11** | **Section padding 64/96 (down from 80/112), hero not full height** | The page-length budget (≤ 7,500px at 1440) and the facts strip in or near the first view | D1 shows the rhythm at 96 cramps the band. The budget then has to come from content |
| **C12** | **One CTA label everywhere, never swapped by width** ("Ask a CA" fits 320) | R12, consistent help | D2 has research for a different label; it must still be the same label everywhere |
| **C13** | **A Server Action no-JS path for the form** (the noscript notice is the minimum) | S5 is a silent failure today | The owner rules that JS-only is acceptable (Q3) |
| **C14** | **Reveal only on Basket rows and How-it-works steps** | Research shows institutions use 0 reveals; the audit kept the reveal. This is the smallest use that keeps it | Either side can argue for "no reveals at all", and I'd accept that |

---

## 12. Open questions for the owner

1. **Q1. Is there a vector (SVG) logo?** The PNG is 16.5 KB and soft on high-density phones.
2. **Q2. The FIU-IND registration number and a public lookup URL.** Without them, the facts strip and the band can state the registration only as a plain fact, not a checkable one (R6). Should the type system *require* the number and link before any "registered" claim renders?
3. **Q3. Must the CA form work with JavaScript off** (the Server Action path, C13), or is a clear "needs JavaScript" notice acceptable at launch?
4. **Q4. "Static hero with an example app panel":** may the panel switch between 3–4 screens when tapped (no motion, no autoplay), or must it be one fixed screen?
5. **Q5. Gold:** do you accept gold as identity only (the logo and the gold sleeve), never as an interactive or state colour (C1)?
6. **Q6. Official channels for the security band:** the official domain, the email domain you send from, support number and app-store listings. Each one that's confirmed becomes a checkable row; anything unconfirmed stays off.
7. **Q7. Page-length and first-view targets** (≤ 7,500px at 1440; the facts strip near the first view): do they match your expectation of a "calm, short" page?
8. **Q8. A privacy policy page.** The form should link to one under the submit button, and none exists (`LIVE_ROUTES` is `/` only). Is it a launch blocker?
9. **Q9. Is the Paraa app phone-only?** If so, the mock frame should use phone proportions (about 360px wide, no bezel) even on desktop, so it doesn't misrepresent the product.
10. **Q10. Analytics or any third-party script planned?** The budgets assume none. Any addition needs its own budget and consent handling.
11. **Q11. Dark mode:** the page is light even for visitors whose phone is set to dark. Please confirm. There's no `prefers-color-scheme` variant by design.
12. **Q12. The 12px label tier** (fact labels, step numbers): acceptable for Indian retail readers on low-DPI Android, or should the minimum be 14px everywhere?

---

## Appendix A. Contrast of every text and control pair (computed, WCAG 2.x)

| Pair | Ratio | Verdict |
|---|---|---|
| grey-900 on white / grey-50 | 17.85 / 16.97 | AAA |
| grey-600 on white / grey-50 / grey-100 | 7.58 / 7.20 / 6.92 | AAA / AAA / AA |
| grey-500 on white / grey-50 | 4.76 / 4.52 | AA (tight on grey-50) |
| **grey-500 on grey-100** | **4.34** | **fail: never (`text-faint` on `bg-muted`)** |
| grey-400 on white | 2.56 | fail: not a text role on light |
| gold-800 on white / grey-50 | 5.27 / 5.01 | AA |
| **gold-500 on white / grey-50** | **1.64 / 1.56** | **fail for text and for state indicators** |
| white on ink / ink on white | 14.33 | AAA (primary button) |
| white on ink-600 (primary hover) | 8.70 | AAA |
| ink on gold | 8.72 | AAA (if gold is ever a fill behind text) |
| grey-900 on gold-200 (selection) | 14.19 | AAA |
| error #EF4444 on white / on ink | 3.76 / 3.81 | ≥ 3:1: borders and icons only, never text |
| success #10B981 on white / on ink | 2.54 / 5.65 | not usable alone on light |
| grey-500 (input border) on white | 4.76 | ≥ 3:1 control edge |
| grey-300 (old input border) on white | 1.48 | fail (fixed) |
| **Ink band** | | |
| white on ink | 14.33 | AAA |
| grey-300 on ink / ink-800 / ink-700 | 9.65 / 10.93 / 8.24 | AAA |
| grey-400 on ink / ink-800 / ink-700 | 5.59 / 6.33 / 4.77 | AA |
| gold-500 on ink | 8.72 | AAA (gold text is allowed here) |
| grey-500 on ink | 3.01 | fail: never in the band |
| white/80% on ink (if D1 prefers alpha) | 9.71 | AAA; but use the grey-300 role, not alpha |
| ink-600 / ink-500 hairlines on ink | 1.65 / 2.43 | decorative only |

## Appendix B. How the numbers in this document were produced

- **Contrast:** relative-luminance formula over the design-file hex values (scratchpad `contrast.mjs`).
- **Manrope ₹:** the latin-ext woff2 was loaded into a probe `FontFace`, and ₹ measured the same width over a serif and a monospace fallback, so the glyph is in Manrope. Its unicode-range covers U+20AD–20C4. The preloaded latin file doesn't cover U+20B9.
- **Baseline (§2):** headless Chrome 141 against `next dev` at 1440×900 and 390×844 on 10 Nov 2026. JS weight is from the audit's production build, not dev.
- **Reference values (§10-J):** Node 24 importing `src/lib/basket.ts`, `tax.ts` and `format.ts` directly.
