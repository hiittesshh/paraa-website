import { test } from "node:test";
import assert from "node:assert/strict";
import { clampRange, nearestIndex, niceTicks, sinceLabel, xLabelIndices, xLabelStep } from "./chart-scale.ts";
import { NAV_DATA } from "./nav-data.ts";

test("nice ticks cover the full Basket 1 range with round steps", () => {
  const t = niceTicks(9.52, 11.06, 5);
  assert.deepEqual(t.ticks, [9.5, 10, 10.5, 11, 11.5]);
  assert.ok(t.lo <= 9.52 && t.hi >= 11.06);
});

test("nice ticks on a narrow range use a finer step", () => {
  const t = niceTicks(10.88, 11.06, 5);
  assert.equal(t.step, 0.1); // 0.05 would need 6 ticks
  assert.ok(t.ticks.length >= 3);
  assert.ok(t.ticks.length <= 5);
  assert.ok(t.lo <= 10.88 && t.hi >= 11.06);
});

test("nice ticks on a flat series still give a domain", () => {
  const t = niceTicks(10, 10, 5);
  assert.ok(t.hi > t.lo);
});

// Min gap is 96px: a "Jul 2024" label is ~56px at 12px, and the first label is left-anchored,
// so 72px let "Jul 2024" and "Sep 2024" touch on a 1440px screen.
test("x labels thin out on narrow charts", () => {
  assert.equal(xLabelStep(40), 3); // 1440px desktop, 27 months
  assert.equal(xLabelStep(9), 12); // 375px phone, 27 months
  assert.equal(xLabelStep(80), 2);
  assert.equal(xLabelStep(100), 1);
});

test("x labels sit on calendar boundaries", () => {
  const six = xLabelIndices(NAV_DATA, 0, NAV_DATA.length - 1, 6).map((i) => NAV_DATA[i][0]);
  assert.deepEqual(six, ["2024-07", "2025-01", "2025-07", "2026-01", "2026-07"]);
  const twelve = xLabelIndices(NAV_DATA, 0, NAV_DATA.length - 1, 12).map((i) => NAV_DATA[i][0]);
  assert.deepEqual(twelve, ["2025-01", "2026-01"]);
});

test("a short range with no boundary labels its ends", () => {
  // Aug 2026 → Oct 2026, step 6: no Jan/Jul inside
  assert.deepEqual(xLabelIndices(NAV_DATA, 25, 27, 6), [25, 27]);
});

test("range always keeps at least one month", () => {
  assert.deepEqual(clampRange(5, 10, 27, "from"), { from: 5, to: 10 });
  assert.deepEqual(clampRange(10, 10, 27, "from"), { from: 10, to: 11 });
  assert.deepEqual(clampRange(27, 20, 27, "from"), { from: 26, to: 27 });
  assert.deepEqual(clampRange(4, 4, 27, "to"), { from: 3, to: 4 });
  assert.deepEqual(clampRange(4, 0, 27, "to"), { from: 0, to: 1 });
});

test("since label", () => {
  assert.equal(sinceLabel(NAV_DATA, 0), "since 1 Jul 2024");
  assert.equal(sinceLabel(NAV_DATA, 9), "since 30 Apr 2025");
});

test("pointer snaps to the nearest month", () => {
  assert.equal(nearestIndex(0, 50, 270, 0, 27), 0);
  assert.equal(nearestIndex(50 + 270, 50, 270, 0, 27), 27);
  assert.equal(nearestIndex(50 + 135, 50, 270, 0, 27), 14);
  assert.equal(nearestIndex(999, 50, 270, 5, 10), 10);
});
