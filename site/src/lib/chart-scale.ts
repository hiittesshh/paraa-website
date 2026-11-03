// Pure chart geometry for the hand-built NAV chart (no chart library). Kept out of the
// component so the tick, label-thinning and range rules are unit-tested.
import { monthEndISO } from "./calc.ts";
import { dateLabel } from "./format.ts";
import { INCEPTION_LABEL, type NavPoint } from "./nav-data.ts";

const NICE_STEPS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5, 10];

/**
 * Round y-axis ticks: the smallest "nice" step that covers [min, max] in at most
 * `maxTicks` ticks. Domain = first tick → last tick, so the line never touches the frame.
 */
export function niceTicks(min: number, max: number, maxTicks = 5) {
  if (max - min < 1e-9) {
    min -= 0.05;
    max += 0.05;
  }
  for (const step of NICE_STEPS) {
    const lo = Math.floor(min / step + 1e-9) * step;
    const hi = Math.ceil(max / step - 1e-9) * step;
    const count = Math.round((hi - lo) / step) + 1;
    if (count <= maxTicks) {
      const ticks = Array.from({ length: count }, (_, i) => Number((lo + i * step).toFixed(6)));
      return { lo: ticks[0], hi: ticks[ticks.length - 1], ticks, step };
    }
  }
  return { lo: min, hi: max, ticks: [min, max], step: max - min };
}

const LABEL_STEPS = [1, 2, 3, 6, 12];

/** Label every k months, where k is the smallest calendar-friendly step giving `minGap` px between labels. */
export function xLabelStep(pxPerMonth: number, minGap = 96) {
  return LABEL_STEPS.find((k) => pxPerMonth * k >= minGap) ?? 12;
}

/**
 * Which month indices get an x-axis label. Labels sit on calendar boundaries (Jan, Jul …)
 * so they read as dates, not offsets. A short range with no boundary labels its two ends.
 */
export function xLabelIndices(data: readonly NavPoint[], from: number, to: number, step: number) {
  const out: number[] = [];
  for (let i = from; i <= to; i++) {
    const m = Number(data[i][0].slice(5, 7));
    if ((m - 1) % step === 0) out.push(i);
  }
  if (out.length === 0) return from === to ? [from] : [from, to];
  return out;
}

/** Keep at least one month in the range when either end moves. */
export function clampRange(from: number, to: number, last: number, moved: "from" | "to") {
  if (from < to) return { from, to };
  if (moved === "from") {
    const t = Math.min(last, from + 1);
    return { from: t - 1, to: t };
  }
  const f = Math.max(0, to - 1);
  return { from: f, to: f + 1 };
}

/** Stat-source period: inception is 1 Jul 2024; any later start is that month's month-end NAV date. */
export function sinceLabel(data: readonly NavPoint[], from: number) {
  return from === 0 ? `since ${INCEPTION_LABEL}` : `since ${dateLabel(monthEndISO(data[from][0]))}`;
}

/** Snap a pointer x (px inside the plot) to the nearest month index in [from, to]. */
export function nearestIndex(px: number, plotLeft: number, plotWidth: number, from: number, to: number) {
  const n = to - from;
  if (n <= 0 || plotWidth <= 0) return from;
  const i = Math.round(((px - plotLeft) / plotWidth) * n) + from;
  return Math.min(to, Math.max(from, i));
}
