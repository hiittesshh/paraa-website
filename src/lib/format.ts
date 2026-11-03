// One formatting module for the whole site, so every page follows the same rule (audit S7):
// compute at full precision, round half-up (away from zero) only when displaying, never round
// in a direction that flatters us. Rupees use Indian grouping, dollars international grouping.

export const MINUS = "−"; // typographic minus (rulebook R10)

/** Half-up rounding on the magnitude: 2.5 → 3 and −2.5 → −3. */
export function roundHalfUp(n: number, digits = 0): number {
  const f = 10 ** digits;
  return (Math.sign(n) * Math.round(Math.abs(n) * f + Number.EPSILON)) / f;
}

function groupIndian(int: string): string {
  if (int.length <= 3) return int;
  const last3 = int.slice(-3);
  const rest = int.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last3}`;
}

/** ₹1,00,000 · −₹2,472 */
export function formatINR(n: number, { signed = false }: { signed?: boolean } = {}): string {
  const r = roundHalfUp(n);
  const body = "₹" + groupIndian(String(Math.abs(r)));
  if (r < 0) return MINUS + body;
  return signed && r > 0 ? "+" + body : body;
}

/** US$250,000 on first use; pass short to get $250,000. Cents only when asked. */
export function formatUSD(n: number, { short = false, cents = false }: { short?: boolean; cents?: boolean } = {}): string {
  const r = roundHalfUp(n, cents ? 2 : 0);
  const body = Math.abs(r).toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
  return (r < 0 ? MINUS : "") + (short ? "$" : "US$") + body;
}

/** 0.041 → "+4.1%". Fractions in, one decimal out (R10). */
export function formatPct(fraction: number, { digits = 1, signed = true }: { digits?: number; signed?: boolean } = {}): string {
  const r = roundHalfUp(fraction * 100, digits);
  const body = Math.abs(r).toFixed(digits) + "%";
  if (r < 0) return MINUS + body;
  return signed && r > 0 ? "+" + body : body;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-04" → "Apr 2025" */
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2026-10-31" → "31 Oct 2026" (R10 date format) */
export function dateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
