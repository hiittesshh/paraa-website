// The international basket: one basket, three sleeves (round 3). The weights are ILLUSTRATIVE
// until the investment team confirms them; this is the only place to change them.
// Pure maths for the "move the markets" what-if. No rounding here: format.ts rounds on display.

export type SleeveId = "us" | "gold" | "oil";

export interface Sleeve {
  id: SleeveId;
  name: string;
  weight: number; // fraction of the basket
}

export const SLEEVES: readonly Sleeve[] = [
  { id: "us", name: "US stocks", weight: 0.5 },
  { id: "gold", name: "Gold", weight: 0.3 },
  { id: "oil", name: "Crude oil", weight: 0.2 },
];

/** A move per sleeve in US$, as a fraction: 0.1 = +10%. */
export type Moves = Record<SleeveId, number>;

export interface Scenario {
  /** Each sleeve's share of the basket's US$ move (weight × move). */
  contributions: Record<SleeveId, number>;
  /** The basket's move in US$, before fees. */
  basketUsd: number;
  /** What the rupee alone added or took away, in rupee terms. */
  rupeeEffect: number;
  /** The whole change in rupees. */
  inrChange: number;
  inrValue: number;
}

/**
 * What `amount` rupees become if each sleeve moves by `moves` (in US$) and the rupee moves by
 * `rupee` (change in ₹ per US$: +0.05 = rupee 5% weaker, which raises the rupee value).
 */
export function scenario(amount: number, moves: Moves, rupee: number): Scenario {
  const contributions: Record<SleeveId, number> = { us: 0, gold: 0, oil: 0 };
  let basketUsd = 0;
  for (const s of SLEEVES) {
    contributions[s.id] = s.weight * moves[s.id];
    basketUsd += contributions[s.id];
  }
  const inrChange = (1 + basketUsd) * (1 + rupee) - 1;
  return { contributions, basketUsd, rupeeEffect: inrChange - basketUsd, inrChange, inrValue: amount * (1 + inrChange) };
}

export interface Preset {
  id: string;
  label: string;
  note: string;
  moves: Moves; // whole percentages as fractions
  rupee: number;
}

// Calendar-year benchmark moves, rounded to the nearest 1%: S&P 500, gold spot, Brent crude, and
// the rupee's year-end rate against the dollar. They are not the basket's past returns.
export const PRESETS: readonly Preset[] = [
  { id: "2020", label: "2020", note: "Pandemic year", moves: { us: 0.16, gold: 0.25, oil: -0.22 }, rupee: 0.02 },
  { id: "2022", label: "2022", note: "Stocks fell", moves: { us: -0.19, gold: 0, oil: 0.11 }, rupee: 0.11 },
  { id: "2023", label: "2023", note: "Oil fell", moves: { us: 0.24, gold: 0.13, oil: -0.1 }, rupee: 0.01 },
  { id: "hard", label: "A bad year", note: "Made-up example", moves: { us: -0.25, gold: -0.05, oil: -0.4 }, rupee: -0.05 },
];

export const NO_MOVES: Moves = { us: 0, gold: 0, oil: 0 };
