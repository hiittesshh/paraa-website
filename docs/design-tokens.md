# Design tokens extracted from the design file

These were written down **before** any concept was designed. The design file (colors board +
typography board) is binding. The current grade.capital screenshot was used only to read the
*tone* (dark canvas, gold as the single accent), not its layout or copy.

Code version: [`src/app/globals.css`](../src/app/globals.css) (`@theme`). No component may
introduce a raw hex value. The site uses the light theme (round 2), so the dark-canvas notes below
are the original reading of the file, not what ships.

## 1. Color

### Brand (labelled in the design file)
| Token | Hex | Source | Use |
|---|---|---|---|
| `--gold-500` (Secondary) | `#FDC037` | labelled | Primary CTA fill, key highlights, focus ring on dark |
| `--ink-900` (Primary) | `#272A33` | labelled | Dark surfaces, text on gold |
| `--paper` (Light) | `#F2F2F2` | labelled | Light section background |

### "Main" gold trio (top of the board, unlabelled; eyedropped, approximate)
| Token | Hex (approx.) | Use |
|---|---|---|
| `--gold-main-1` | `#FFB000` | Hover on gold CTA |
| `--gold-main-2` | `#F2A900` | Pressed state / chart line |
| `--gold-main-3` | `#C68C0A` | Gold on light backgrounds (large text and icons only) |

### Generated ramps (from "Colors Generator" + "Additional Colors"; approximate)
| Step | Gold | Dark |
|---|---|---|
| 400 | `#FDD060` | `#888A90` |
| 500 | `#FDBA2C` | `#62646C` |
| 600 | `#E5A823` | `#484B55` |
| 700 | `#BB861A` | `#32353F` |
| 800 | `#8E6414` | `#1F2027` |
| 900 | `#5E450F` | `#131416` |

### Alerts (labelled)
Success `#10B981` · Warning `#FACC15` · Error `#EF4444`

### Greyscale (labelled, exact)
50 `#F8F9FD` · 100 `#F1F5F9` · 200 `#E2E8F0` · 300 `#CBD5E1` · 400 `#94A3B8` ·
500 `#64748B` · 600 `#475569` · 700 `#334155` · 800 `#1E293B` · 900 `#0F172A`

### Contrast rules that fall out of this palette (WCAG AA, 4.5:1 body text)
| Pair | Ratio (approx.) | Verdict |
|---|---|---|
| Gold `#FDC037` on dark `#131416` | ~10:1 | ✅ any text |
| Dark `#131416` text on gold button | ~10:1 | ✅ CTA labels are **dark**, never white |
| Grey-400 `#94A3B8` on `#131416` | ~7:1 | ✅ muted text on dark |
| Grey-500 `#64748B` on `#131416` | ~3.9:1 | ❌ **not** for body text on dark |
| Grey-500 on white | ~4.8:1 | ✅ muted text on light |
| Gold `#FDC037` on white | ~1.7:1 | ❌ never gold text on light; use `--gold-800` `#8E6414` (~5:1) |
| White on gold | ~1.7:1 | ❌ never |

## 2. Typography: Manrope only
Weights in the file: Regular 400, Medium 500, Semibold 600, Bold 700, Extrabold 800.

| Style | Size (desktop) | Weight | Mobile size (our call; the file shows desktop only) |
|---|---|---|---|
| Heading 1 | 48px | Bold | 34px |
| Heading 2 | 40px | Bold | 30px |
| Heading 3 | 32px | Bold | 26px |
| Heading 4 | 24px | Bold | 21px |
| Heading 5 | 20px | Bold | 19px |
| Heading 6 | 18px | Bold | 17px |
| Body XLarge | 18px | Bold / Medium / Regular | 18px |
| Body Large | 16px | Bold / Medium / Regular | 16px |
| Body Medium | 14px | Bold / Medium / Regular | 14px |
| Body Small | 12px | Extrabold / Medium / Regular | 12px |
| Body XSmall | 10px | Extrabold / Medium / Regular | 10px (labels only, never sentences) |

Line-heights are not in the file. We use 1.15 for H1–H2, 1.25 for H3–H6 and 1.6 for body.

## 3. Spacing, radius, elevation (not in the file; inferred)
- **Spacing**: 4px base, scale 4/8/12/16/24/32/48/64/96/128. Spacious marketing density.
- **Radius**: 8 (inputs, chips) · 12 (buttons) · 16 (cards) · 24 (feature panels). The
  swatches on the board are drawn at ~16–24px corners, and the screenshot cards are ~12–16px.
- **Elevation**: on dark, depth comes from surface steps (`#131416` → `#1F2027` → `#272A33`)
  and 1px borders, not shadows. On light, a single soft shadow.

## 4. Tone read from the screenshot
Dark near-black canvas, gold used sparingly as the one accent, rounded cards, big numeric
"proof" tiles. We keep the **canvas + accent discipline** and drop the **unverifiable
return numbers** (see `content-rules.md` R4).
