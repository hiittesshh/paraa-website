import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateTax } from "./tax.ts";
import { formatINR } from "./format.ts";

test("profit is taxed at the slab rate plus 4% cess", () => {
  const r = estimateTax(1_00_000, 0.3);
  assert.equal(formatINR(r.tax), "₹31,200");
  assert.equal(formatINR(r.keep), "₹68,800");
  assert.equal(r.onInvesting, 0);
});

test("the 0% slab pays nothing", () => {
  assert.equal(estimateTax(2_50_000, 0).tax, 0);
});

test("a loss is not taxed and is carried forward", () => {
  const r = estimateTax(-50_000, 0.2);
  assert.equal(r.tax, 0);
  assert.equal(r.lossCarried, 50_000);
  assert.equal(r.keep, -50_000);
});

test("break-even carries nothing forward (and never −0)", () => {
  assert.ok(Object.is(estimateTax(0, 0.3).lossCarried, 0));
});
