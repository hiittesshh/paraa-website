import { test } from "node:test";
import assert from "node:assert/strict";
import { AMOUNT_MAX, AMOUNT_MIN, AMOUNT_STEPS, amountAt, positionFor } from "./amount-steps.ts";

test("ladder runs ₹10,000 → ₹50,00,000, strictly increasing", () => {
  assert.equal(AMOUNT_MIN, 10_000);
  assert.equal(AMOUNT_MAX, 50_00_000);
  for (let i = 1; i < AMOUNT_STEPS.length; i++) assert.ok(AMOUNT_STEPS[i] > AMOUNT_STEPS[i - 1]);
});

test("round lakh values are exact stops", () => {
  for (const v of [50_000, 1_00_000, 2_00_000, 5_00_000, 10_00_000, 25_00_000, 50_00_000]) {
    assert.equal(amountAt(positionFor(v)), v, `₹${v}`);
  }
});

test("₹1 lakh sits in the first third of the track", () => {
  assert.ok(positionFor(1_00_000) / (AMOUNT_STEPS.length - 1) < 0.34);
});

test("positions clamp", () => {
  assert.equal(amountAt(-3), AMOUNT_MIN);
  assert.equal(amountAt(10_000), AMOUNT_MAX);
  assert.equal(positionFor(7), 0);
});
