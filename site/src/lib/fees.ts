// Fee maths, ported 1:1 from the verified prototype (concept-a/concept.js).
// No rounding happens here: callers round only when displaying (see format.ts).
// Basket NAV data was removed from the site on request; only the fee schedule remains.

/** Illustrative fee schedule (spec §0.4). FX is held at 88.00 in the receipt so only fees move. */
export const FEES = { fxIn: 0.005, entry: 0, mgmt: 0.015, exit: 0.01, exitUnderMonths: 12, fxOut: 0.005 } as const;

export interface FeeReceipt {
  fxIn: number;
  entry: number;
  mgmt: number;
  exit: number;
  fxOut: number;
  total: number;
  costPct: number;
  net: number;
}

/** Fee receipt. A in ₹, t in months, rAnnual as a fraction (0.05 = 5% a year). */
export function feeReceipt(A: number, t: number, rAnnual = 0): FeeReceipt {
  const fxIn = A * FEES.fxIn;
  const entry = (A - fxIn) * FEES.entry;
  let V = A - fxIn - entry;
  let mgmt = 0;
  for (let m = 0; m < t; m++) {
    V *= Math.pow(1 + rAnnual, 1 / 12);
    const mgmtM = (V * FEES.mgmt) / 12;
    V -= mgmtM;
    mgmt += mgmtM;
  }
  const exit = t < FEES.exitUnderMonths ? V * FEES.exit : 0;
  const fxOut = (V - exit) * FEES.fxOut;
  const total = fxIn + entry + mgmt + exit + fxOut;
  return { fxIn, entry, mgmt, exit, fxOut, total, costPct: total / A, net: V - exit - fxOut };
}

/** Whole days between two ISO dates (UTC, so time zones can't shift it). */
export function daysBetween(isoFrom: string, isoTo: string) {
  const [a, b] = [isoFrom, isoTo].map((s) => s.split("-").map(Number));
  return Math.round((Date.UTC(b[0], b[1] - 1, b[2]) - Date.UTC(a[0], a[1] - 1, a[2])) / 86_400_000);
}

/** The specimen every hero visual shows: ₹1,00,000 held for 12 months at 0% assumed return. */
export const HERO_AMOUNT = 100_000;
export const HERO_MONTHS = 12;
