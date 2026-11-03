// Illustrative dataset (spec 02-concepts.md §0.4). Every figure here is DUMMY data and must be
// labelled Illustrative wherever it is shown. Swap this file for the administrator's feed later.

export type NavPoint = readonly [month: string, nav: number];

/** Basket 1 month-end NAV in US$, inception 1 Jul 2024 at 10.00. */
export const NAV_DATA: readonly NavPoint[] = [
  ["2024-07", 10.0], ["2024-08", 10.12], ["2024-09", 10.31], ["2024-10", 10.18],
  ["2024-11", 10.4], ["2024-12", 10.52], ["2025-01", 10.61], ["2025-02", 10.47],
  ["2025-03", 10.79], ["2025-04", 10.11], ["2025-05", 9.88], ["2025-06", 9.52],
  ["2025-07", 9.71], ["2025-08", 9.98], ["2025-09", 10.39], ["2025-10", 10.3],
  ["2025-11", 10.47], ["2025-12", 10.58], ["2026-01", 10.44], ["2026-02", 10.62],
  ["2026-03", 10.71], ["2026-04", 10.66], ["2026-05", 10.82], ["2026-06", 10.95],
  ["2026-07", 10.88], ["2026-08", 11.02], ["2026-09", 10.97], ["2026-10", 11.06],
];

export const INCEPTION_LABEL = "1 Jul 2024";

/** Revisions, keyed by NAV month (used by the changelog, currently commented out). */
export const REVISIONS: Readonly<Record<string, string>> = {
  "2026-08": "Revised 12 Sep 2026: 11.04 to 11.02. A price for one holding came in late and was lower than the estimate we used.",
};

/** Illustrative fee schedule (spec §0.4). FX held at 88.00 in the receipt so only fees move. */
export const FEES = { fxIn: 0.005, entry: 0, mgmt: 0.015, exit: 0.01, exitUnderMonths: 12, fxOut: 0.005 } as const;

/** Rulebook R4: performance figures can be switched off by Compliance without a code change. */
export const SHOW_PERFORMANCE = process.env.NEXT_PUBLIC_SHOW_PERFORMANCE !== "off";
