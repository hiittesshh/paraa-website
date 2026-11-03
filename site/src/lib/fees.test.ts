// Check values from the spec (02-concepts.md, corrected after audit S7).
import { test } from "node:test";
import assert from "node:assert/strict";
import { daysBetween, feeReceipt } from "./fees.ts";
import { formatINR } from "./format.ts";

test("fee receipt: ₹1,00,000 for 12 months at 0%", () => {
  const r = feeReceipt(100000, 12, 0);
  assert.equal(formatINR(r.fxIn), "₹500");
  assert.equal(formatINR(r.mgmt), "₹1,482");
  assert.equal(formatINR(r.exit), "₹0");
  assert.equal(formatINR(r.fxOut), "₹490");
  assert.equal(formatINR(r.total), "₹2,472");
  assert.equal(formatINR(r.net), "₹97,528");
});

test("fee receipt: 6-month exit charges the exit fee (₹97,280)", () => {
  const r = feeReceipt(100000, 6, 0);
  assert.equal(formatINR(r.mgmt), "₹744");
  assert.equal(formatINR(r.exit), "₹988");
  assert.equal(formatINR(r.net), "₹97,280");
});

test("days between", () => {
  assert.equal(daysBetween("2026-09-16", "2026-11-02"), 47);
});
