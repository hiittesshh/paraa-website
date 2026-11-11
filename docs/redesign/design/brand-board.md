# Brand board: binding theme (owner, 11 Nov 2026)

The owner sent the design file's **Colors** board and said: "This should be the design theme and typography." This overrides any earlier spec decision that conflicts with it. Source image: [`img/brand-colors-board.png`](img/brand-colors-board.png) (5760×13888).

Values were sampled from the full-resolution image using the median of a 9×9 patch at each swatch's centre (`scratchpad/sample-board.mjs`). Labelled hex values always win over samples. Every labelled swatch sampled identical to its label, except Warning: it is labelled `#FACC15` but samples as `#FFD023`, so `#FACC15` is used.

## The three brand colours (labelled)

| Role | Hex | Board name |
|---|---|---|
| **Primary** | `#272A33` | Primary (ink) |
| **Secondary** | `#FDC037` | Secondary (gold) |
| **Light** | `#F2F2F2` | the third main swatch |

The board's top row prints `#FDC037` above the dark swatch and `#272A33` above the gold one. That is a labelling slip on the board. The "Primary #272A33" and "Secondary #FDC037" bars below it are unambiguous.

## Primary ramp (the shades under the Primary bar, and the Colors Generator's dark row)

| Step | Hex |
|---|---|
| Primary | `#272A33` |
| 1 | `#3D3F47` |
| 2 | `#52555C` |
| 3 | `#686A70` |
| 4 | `#7D7F85` |
| 5 | `#939499` |
| 6 | `#A9AAAD` |

## Secondary ramp (the shades under the Secondary bar, and the Colors Generator's gold row)

| Step | Hex |
|---|---|
| Secondary | `#FDC037` |
| 1 | `#FDC64B` |
| 2 | `#FDCD5F` |
| 3 | `#FED373` |
| 4 | `#FED987` |
| 5 | `#FEDF9B` |
| 6 | `#FEE6AF` |

## Light ramp (the Colors Generator's light row)

`#F2F2F2` (labelled), then `#F3F3F3`, `#F4F4F4`, `#F6F6F6`, `#F7F7F7`, `#F8F8F8`, `#FAFAFA`.

## Additional colours, 400–900

| Step | Gold | Dark |
|---|---|---|
| 400 | `#FED05F` | `#86888F` |
| 500 | `#FEBE2F` | `#64666F` |
| 600 | `#E5A920` | `#4C4E57` |
| 700 | `#B98818` | `#343844` |
| 800 | `#8C6612` | `#1F2027` |
| 900 | `#5F440C` | `#151517` |

These replace the eyedropped approximations in `docs/design-tokens.md` §1. For example, gold-800 is `#8C6612`, not `#8E6414`.

## Alerts (labelled)

Success `#10B981` · Warning `#FACC15` · Error `#EF4444`

## Greyscale (labelled)

50 `#F8F9FD` · 100 `#F1F5F9` · 200 `#E2E8F0` · 300 `#CBD5E1` · 400 `#94A3B8` · 500 `#64748B` · 600 `#475569` · 700 `#334155` · 800 `#1E293B` · 900 `#0F172A`

## Typography

The owner's message says the theme **and typography** should follow the design file. Only the Colors board came through (the same image twice). Until the typography board arrives, the binding typography is the design file's, as recorded in `docs/design-tokens.md` §2:

- **Manrope only.** Weights in the file: Regular 400, Medium 500, Semibold 600, Bold 700, Extrabold 800.
- **Headings are Bold (700):** H1 48, H2 40, H3 32, H4 24, H5 20, H6 18 (desktop).
- **Body:** XLarge 18, Large 16, Medium 14 (each Bold / Medium / Regular); Small 12 (Extrabold / Medium / Regular); XSmall 10 (labels only).

## What this changes in spec v1.2 (for Designer 3 to settle in v1.3)

1. **Light `#F2F2F2` becomes the light surface role.** Spec v1.2 uses greyscale-50 `#F8F9FD` and doesn't use `#F2F2F2` at all.
2. **Secondary gold returns to its board role, as a real secondary colour, not only the logo and basket slice.** Contrast rules still hold: gold is never text on white or Light (1.6:1), and anything on gold uses Primary ink (8.7:1). How and where gold carries the Secondary role is a design decision for v1.3, made from this board.
3. **The Primary and Secondary ramps and the Additional colours use the sampled values above.**
4. **Headings move from weight 600 to the design file's Bold 700,** and the weight set follows the file.
5. **Success and Warning are added as tokens.** They're used only as fills, icons or borders, never as text on light (they fail contrast).
