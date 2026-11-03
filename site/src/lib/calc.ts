// Pure NAV and fee maths, ported 1:1 from the verified prototype (concept-a/concept.js).
// No rounding happens here: callers round only when displaying (see format.ts).
import { FEES, NAV_DATA, REVISIONS, type NavPoint } from "./nav-data.ts";

export const navs = (data: readonly NavPoint[] = NAV_DATA) => data.map((d) => d[1]);

export function indexOfMonth(data: readonly NavPoint[], ym: string) {
  return data.findIndex((d) => d[0] === ym);
}

/** Month-on-month returns. r[0] is null (the inception month has no prior NAV). */
export function monthlyReturns(v: readonly number[]): (number | null)[] {
  return v.map((x, i) => (i === 0 ? null : x / v[i - 1] - 1));
}

/** R = NAV[to] / NAV[from] − 1 */
export const rangeReturn = (v: readonly number[], from: number, to: number) => v[to] / v[from] - 1;

/** (1 + R)^(12 / months) − 1, only for 12+ months; otherwise null ("not annualised"). */
export function annualise(R: number, months: number): number | null {
  return months < 12 ? null : Math.pow(1 + R, 12 / months) - 1;
}

/** Drawdown series DD[t] = NAV[t] / running peak − 1, plus the deepest point and its peak. */
export function drawdown(v: readonly number[], from: number, to: number) {
  let peak = v[from];
  let peakIdx = from;
  let max = 0;
  let maxPeakIdx = from;
  let troughIdx = from;
  const series: number[] = [];
  for (let t = from; t <= to; t++) {
    if (v[t] > peak) {
      peak = v[t];
      peakIdx = t;
    }
    const dd = v[t] / peak - 1;
    series.push(dd);
    if (dd < max) {
      max = dd;
      maxPeakIdx = peakIdx;
      troughIdx = t;
    }
  }
  return { series, max, peakIdx: maxPeakIdx, troughIdx };
}

/** Negative months inside a range (months counted are from+1..to). */
export function negativeMonths(v: readonly number[], from: number, to: number) {
  const r = monthlyReturns(v);
  let count = 0;
  for (let i = from + 1; i <= to; i++) if ((r[i] ?? 0) < 0) count++;
  return { count, total: to - from };
}

export function extremeMonths(v: readonly number[]) {
  const r = monthlyReturns(v) as number[];
  let hi = 1;
  let lo = 1;
  for (let i = 1; i < r.length; i++) {
    if (r[i] > r[hi]) hi = i;
    if (r[i] < r[lo]) lo = i;
  }
  return { strongest: { idx: hi, value: r[hi] }, weakest: { idx: lo, value: r[lo] } };
}

/** Time underwater for the max drawdown: peak → first month-end above that peak. */
export function recovery(v: readonly number[]) {
  const dd = drawdown(v, 0, v.length - 1);
  let recoverIdx = -1;
  for (let i = dd.troughIdx + 1; i < v.length; i++) {
    if (v[i] > v[dd.peakIdx]) {
      recoverIdx = i;
      break;
    }
  }
  return { peakIdx: dd.peakIdx, troughIdx: dd.troughIdx, recoverIdx, months: recoverIdx < 0 ? null : recoverIdx - dd.peakIdx };
}

export interface CalendarYear {
  year: number;
  months: Record<number, number | null>;
  total: number | null;
  partial: boolean;
  count: number;
}

/** Each year's monthly returns plus total = Π(1 + monthly) − 1. */
export function calendarYears(data: readonly NavPoint[] = NAV_DATA): CalendarYear[] {
  const r = monthlyReturns(navs(data));
  const years = new Map<string, CalendarYear>();
  data.forEach((d, i) => {
    const y = d[0].slice(0, 4);
    if (!years.has(y)) years.set(y, { year: +y, months: {}, total: null, partial: false, count: 0 });
    years.get(y)!.months[+d[0].slice(5, 7)] = r[i];
  });
  return [...years.values()].map((row) => {
    let prod = 1;
    let n = 0;
    for (let m = 1; m <= 12; m++) {
      const x = row.months[m];
      if (typeof x === "number") {
        prod *= 1 + x;
        n++;
      }
    }
    return { ...row, count: n, total: n ? prod - 1 : null, partial: n < 12 };
  });
}

/** "Calendar years" preset: Dec of the previous year (or inception) → Dec of that year (or latest). */
export function yearRange(data: readonly NavPoint[], year: number) {
  let from = indexOfMonth(data, `${year - 1}-12`);
  let to = indexOfMonth(data, `${year}-12`);
  if (from < 0) from = 0;
  if (to < 0) to = data.length - 1;
  return { from, to };
}

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

/** "2026-10" → "31 Oct 2026" */
export function monthEndISO(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${ym}-${String(new Date(Date.UTC(y, m, 0)).getUTCDate()).padStart(2, "0")}`;
}

/** CSV download: date,basket,nav_usd,monthly_return,revised,revision_note,signed_by */
export function buildCsv(data: readonly NavPoint[] = NAV_DATA) {
  const r = monthlyReturns(navs(data));
  const rows = data.map((d, i) => {
    const note = REVISIONS[d[0]] ?? "";
    return [
      monthEndISO(d[0]),
      '"Basket 1 (Illustrative, name TO CONFIRM)"',
      d[1].toFixed(2),
      r[i] === null ? "" : r[i]!.toFixed(6),
      note ? "true" : "false",
      `"${note.replace(/"/g, '""')}"`,
      '"Administrator TO CONFIRM"',
    ].join(",");
  });
  return ["date,basket,nav_usd,monthly_return,revised,revision_note,signed_by", ...rows].join("\n") + "\n";
}

/** All headline figures in one place. */
export function headline(data: readonly NavPoint[] = NAV_DATA) {
  const v = navs(data);
  const last = v.length - 1;
  const R = rangeReturn(v, 0, last);
  const ex = extremeMonths(v);
  const rec = recovery(v);
  const neg = negativeMonths(v, 0, last);
  return {
    latestNav: v[last],
    latestMonth: data[last][0],
    sinceInception: R,
    months: last,
    annualised: annualise(R, last),
    strongest: ex.strongest.value,
    strongestMonth: data[ex.strongest.idx][0],
    weakest: ex.weakest.value,
    weakestMonth: data[ex.weakest.idx][0],
    maxDrawdown: drawdown(v, 0, last).max,
    peakMonth: data[rec.peakIdx][0],
    troughMonth: data[rec.troughIdx][0],
    recoverMonth: rec.recoverIdx < 0 ? null : data[rec.recoverIdx][0],
    underwaterMonths: rec.months,
    negCount: neg.count,
    negTotal: neg.total,
  };
}
