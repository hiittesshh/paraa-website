// Spec check values: docs/content-rules.md §0.4 and round-1 spec B3 (y = 1995).
import { test } from "node:test";
import assert from "node:assert/strict";
import { birthYearResult, RATES, seriesWindow, strongYears, FIRST_YEAR, LAST_YEAR } from "./rupee.ts";
import { formatINR, formatPct, formatUSD } from "./format.ts";

test("1995: ₹1,000 then, in dollar terms today", () => {
  const r = birthYearResult(1995);
  assert.equal(formatUSD(r.usdThen, { cents: true }), "US$30.84");
  assert.equal(formatINR(r.inrToday), "₹2,714");
  assert.equal(r.yearsSince, 31);
  assert.equal(r.strongYrs, 7);
  assert.equal(r.worstYr, 2007);
  assert.equal(formatPct(r.worstPct!), "−8.7%");
  assert.equal(r.tooRecent, false);
});

test("rupee-strengthened years are derived from the interpolated series", () => {
  assert.deepEqual(strongYears(FIRST_YEAR, LAST_YEAR), [2003, 2004, 2005, 2007, 2010, 2017, 2021]);
  assert.deepEqual(birthYearResult(1995).strongList, [2003, 2004, 2005, 2007, 2010, 2017, 2021]);
});

test("interpolation fills unlisted years and keeps listed ones", () => {
  assert.equal(RATES[2026], 88);
  assert.ok(Math.abs(RATES[2001] - (44.94 + 48.61) / 2) < 1e-9);
  assert.equal(Object.keys(RATES).length, LAST_YEAR - FIRST_YEAR + 1);
});

test("chart window 2006–2026 marks 2007, 2010, 2017 and 2021", () => {
  const rows = seriesWindow(2006, 2026);
  assert.equal(rows.length, 21);
  assert.deepEqual(rows.filter((r) => r.stronger).map((r) => r.year), [2007, 2010, 2017, 2021]);
});

test("too-recent years and windows with no strengthening", () => {
  assert.equal(birthYearResult(2025).tooRecent, true);
  const r = birthYearResult(2025);
  assert.equal(r.worstYr, null);
  assert.equal(r.strongYrs, 0);
});
