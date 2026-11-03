// Run with: npm test  (Node's built-in test runner with native TypeScript stripping)
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatINR, formatPct, formatUSD, roundHalfUp, dateLabel, monthLabel } from "./format.ts";

test("roundHalfUp rounds on the magnitude, never directionally", () => {
  assert.equal(roundHalfUp(2.5), 3);
  assert.equal(roundHalfUp(-2.5), -3);
  assert.equal(roundHalfUp(2472.37), 2472);
  assert.equal(roundHalfUp(2713.54), 2714);
});

test("rupees use Indian grouping", () => {
  assert.equal(formatINR(100000), "₹1,00,000");
  assert.equal(formatINR(97527.63), "₹97,528");
  assert.equal(formatINR(-2472.37), "−₹2,472");
  assert.equal(formatINR(10000000), "₹1,00,00,000");
  assert.equal(formatINR(500, { signed: true }), "+₹500");
});

test("dollars use international grouping", () => {
  assert.equal(formatUSD(250000), "US$250,000");
  assert.equal(formatUSD(30.84, { cents: true, short: true }), "$30.84");
});

test("percentages carry a sign and one decimal", () => {
  assert.equal(formatPct(0.041), "+4.1%");
  assert.equal(formatPct(-0.063), "−6.3%");
  assert.equal(formatPct(0.0247, { digits: 2, signed: false }), "2.47%");
});

test("dates follow R10", () => {
  assert.equal(dateLabel("2026-10-31"), "31 Oct 2026");
  assert.equal(monthLabel("2025-04"), "Apr 2025");
});
