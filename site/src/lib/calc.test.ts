// Check values from the spec (02-concepts.md, corrected after audit S7) and the prototype runs.
import { test } from "node:test";
import assert from "node:assert/strict";
import { calendarYears, daysBetween, feeReceipt, headline } from "./calc.ts";
import { formatINR, formatPct } from "./format.ts";

test("headline figures", () => {
  const h = headline();
  assert.equal(formatPct(h.sinceInception), "+10.6%");
  assert.equal(formatPct(h.annualised!), "+4.6%");
  assert.equal(formatPct(h.strongest), "+4.1%");
  assert.equal(h.strongestMonth, "2025-09");
  assert.equal(formatPct(h.weakest), "−6.3%");
  assert.equal(h.weakestMonth, "2025-04");
  assert.equal(formatPct(h.maxDrawdown), "−11.8%");
  assert.equal(h.underwaterMonths, 14);
  assert.equal(`${h.negCount}/${h.negTotal}`, "10/27");
});

test("fee receipt: ₹1,00,000 for 12 months at 0%", () => {
  const r = feeReceipt(100000, 12, 0);
  assert.equal(formatINR(r.fxIn), "₹500");
  assert.equal(formatINR(r.mgmt), "₹1,482");
  assert.equal(formatINR(r.exit), "₹0");
  assert.equal(formatINR(r.fxOut), "₹490");
  assert.equal(formatINR(r.total), "₹2,472");
  assert.equal(formatINR(r.net), "₹97,528");
});

test("fee receipt: 6-month exit matches concept D (₹97,280)", () => {
  const r = feeReceipt(100000, 6, 0);
  assert.equal(formatINR(r.mgmt), "₹744");
  assert.equal(formatINR(r.exit), "₹988");
  assert.equal(formatINR(r.net), "₹97,280");
});

test("calendar years", () => {
  const y = calendarYears().map((r) => `${r.year} ${formatPct(r.total!)}`);
  assert.deepEqual(y, ["2024 +5.2%", "2025 +0.6%", "2026 +4.5%"]);
});

test("days between", () => {
  assert.equal(daysBetween("2026-09-16", "2026-11-02"), 47);
});
