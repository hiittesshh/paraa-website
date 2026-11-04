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

// Made-up scenarios for the what-if, on purpose. Real calendar years were removed: on the example
// weights every real year came out positive, which read as a flattering back-test of the basket.
export const PRESETS: readonly Preset[] = [
  { id: "all-fall", label: "All three fall", note: "Rupee stronger too", moves: { us: -0.25, gold: -0.05, oil: -0.4 }, rupee: -0.05 },
  { id: "stocks-fall", label: "Stocks fall", note: "Stocks down 20%", moves: { us: -0.2, gold: 0, oil: 0 }, rupee: 0 },
  { id: "oil-falls", label: "Oil falls", note: "Oil down 40%", moves: { us: 0, gold: 0, oil: -0.4 }, rupee: 0 },
  { id: "rupee-strong", label: "Stronger rupee", note: "Rupee 5% stronger", moves: { us: 0, gold: 0, oil: 0 }, rupee: -0.05 },
  { id: "rupee-weak", label: "Weaker rupee", note: "Rupee 5% weaker", moves: { us: 0, gold: 0, oil: 0 }, rupee: 0.05 },
];

export const NO_MOVES: Moves = { us: 0, gold: 0, oil: 0 };
