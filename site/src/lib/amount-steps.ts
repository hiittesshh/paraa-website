// Stepped mapping for the fee-receipt amount slider. A linear ₹10,000–₹50,00,000 track would
// spend 98% of its length above ₹1 lakh and make round lakh values hard to land on, so the
// slider moves through a ladder of positions instead:
//   ₹10,000 → ₹1,00,000      in ₹5,000 steps   (19 positions)
//   ₹1,25,000 → ₹10,00,000   in ₹25,000 steps  (36 positions)
//   ₹12,50,000 → ₹50,00,000  in ₹2,50,000 steps (16 positions)
// Every round lakh up to ₹10 lakh, and every ₹5 lakh above it, is an exact stop.

function ladder(start: number, end: number, step: number) {
  const out: number[] = [];
  for (let v = start; v <= end; v += step) out.push(v);
  return out;
}

export const AMOUNT_STEPS: readonly number[] = [
  ...ladder(10_000, 1_00_000, 5_000),
  ...ladder(1_25_000, 10_00_000, 25_000),
  ...ladder(12_50_000, 50_00_000, 2_50_000),
];

export const AMOUNT_MIN = AMOUNT_STEPS[0];
export const AMOUNT_MAX = AMOUNT_STEPS[AMOUNT_STEPS.length - 1];

/** Slider position → rupees (clamped). */
export function amountAt(position: number) {
  const i = Math.min(AMOUNT_STEPS.length - 1, Math.max(0, Math.round(position)));
  return AMOUNT_STEPS[i];
}

/** Rupees → nearest slider position. */
export function positionFor(amount: number) {
  let nearest = 0;
  for (let i = 1; i < AMOUNT_STEPS.length; i++) {
    if (Math.abs(AMOUNT_STEPS[i] - amount) < Math.abs(AMOUNT_STEPS[nearest] - amount)) nearest = i;
  }
  return nearest;
}
