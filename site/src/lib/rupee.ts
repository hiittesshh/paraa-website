// Rupee vs dollar maths (Concept B, B3 + B5.2), ported from concept-b/concept.js.
// Spec §0.4: ILLUSTRATIVE USD/INR annual averages (₹ per US$). Replace with the RBI/FBIL
// reference-rate series before launch, and keep the source line. Unlisted years are
// interpolated linearly (prototype rule; the production series is annual).

export const RATE_POINTS: Readonly<Record<number, number>> = {
  1980: 7.86, 1985: 12.37, 1990: 17.5, 1991: 22.74, 1995: 32.43, 2000: 44.94, 2002: 48.61,
  2003: 46.58, 2004: 45.32, 2005: 44.1, 2006: 45.31, 2007: 41.35, 2008: 43.51, 2009: 48.41,
  2010: 45.73, 2011: 46.67, 2012: 53.44, 2013: 58.6, 2014: 61.03, 2015: 64.15, 2016: 67.2,
  2017: 65.12, 2018: 68.39, 2019: 70.42, 2020: 74.1, 2021: 73.92, 2022: 78.6, 2023: 82.6,
  2024: 83.68, 2025: 86.5, 2026: 88.0,
};

export const FIRST_YEAR = 1980;
export const LAST_YEAR = 2026; // "today"

/** Full annual series FIRST_YEAR..LAST_YEAR, gaps filled by linear interpolation. */
export function buildSeries(points: Readonly<Record<number, number>>): Record<number, number> {
  const known = Object.keys(points).map(Number).sort((a, b) => a - b);
  const out: Record<number, number> = {};
  for (let i = 0; i < known.length - 1; i++) {
    const y0 = known[i];
    const y1 = known[i + 1];
    const r0 = points[y0];
    const r1 = points[y1];
    for (let y = y0; y < y1; y++) out[y] = r0 + ((r1 - r0) * (y - y0)) / (y1 - y0);
  }
  const last = known[known.length - 1];
  out[last] = points[last];
  return out;
}

export const RATES: Readonly<Record<number, number>> = buildSeries(RATE_POINTS);

export function rate(y: number): number {
  return RATES[y];
}

/** Change in ₹ per $ from the year before. Positive = rupee weakened; negative = rupee strengthened. */
export function yearlyChange(k: number): number {
  return RATES[k] / RATES[k - 1] - 1;
}

/** Years in (from+1 .. to) where the rupee strengthened (rate below the previous year). Derived, never hard-coded. */
export function strongYears(from: number, to: number): number[] {
  const list: number[] = [];
  for (let k = from + 1; k <= to; k++) if (RATES[k] < RATES[k - 1]) list.push(k);
  return list;
}

export type BirthYearResult = {
  year: number;
  usdThen: number; // what ₹1,000 bought in that year, US$
  inrToday: number; // those dollars in rupees today (full precision; round only at display)
  yearsSince: number;
  strongYrs: number;
  strongList: number[];
  worstYr: number | null; // null = the rupee never strengthened in the window
  worstPct: number | null; // e.g. −0.087 for 2007
  tooRecent: boolean;
};

/** B3 maths: ₹1,000 in year y, in dollar terms today, plus the years the rupee won. */
export function birthYearResult(y: number): BirthYearResult {
  const usdThen = 1000 / RATES[y];
  const inrToday = usdThen * RATES[LAST_YEAR];
  const strong = strongYears(y, LAST_YEAR);
  let worstYr: number | null = null;
  let worstChange = Infinity;
  for (let k = y + 1; k <= LAST_YEAR; k++) {
    const ch = yearlyChange(k);
    if (ch < worstChange) {
      worstChange = ch;
      worstYr = k;
    }
  }
  return {
    year: y,
    usdThen,
    inrToday,
    yearsSince: LAST_YEAR - y,
    strongYrs: strong.length,
    strongList: strong,
    worstYr: worstChange < 0 ? worstYr : null,
    worstPct: worstChange < 0 ? worstChange : null,
    tooRecent: y >= 2025,
  };
}

/** One row per year for a chart window, with its change from the year before. */
export function seriesWindow(from: number, to: number): { year: number; rate: number; change: number; stronger: boolean }[] {
  const rows = [];
  for (let y = from; y <= to; y++) {
    const change = yearlyChange(y);
    rows.push({ year: y, rate: RATES[y], change, stronger: change < 0 });
  }
  return rows;
}
