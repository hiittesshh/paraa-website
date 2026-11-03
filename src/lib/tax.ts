// Tax estimate for the basket's income, as Paraa states its position (round 3): nothing is taxed
// when you invest; profit is business income from derivatives, taxed at the investor's own slab
// rate plus 4% health and education cess. Deliberately simple: no surcharge, rebate or regime
// maths. The page says so and sends the real answer to the investor's CA.

export const CESS = 0.04;
export const SLAB_RATES = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3] as const;

export interface TaxEstimate {
  /** Investing itself is not taxed. */
  onInvesting: 0;
  tax: number;
  /** Slab rate with cess on top, e.g. 0.312 for the 30% slab. */
  rate: number;
  /** Profit after tax; the loss itself when there was one. */
  keep: number;
  /** A loss isn't taxed; it can be carried forward against future profits of the same kind. */
  lossCarried: number;
}

/** `profit` in ₹ (negative = loss), `slab` as a fraction (0.3 = the 30% slab). */
export function estimateTax(profit: number, slab: number): TaxEstimate {
  const rate = slab * (1 + CESS);
  if (profit <= 0) return { onInvesting: 0, tax: 0, rate, keep: profit, lossCarried: profit < 0 ? -profit : 0 };
  const tax = profit * rate;
  return { onInvesting: 0, tax, rate, keep: profit - tax, lossCarried: 0 };
}
