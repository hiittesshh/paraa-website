import { test } from "node:test";
import assert from "node:assert/strict";
import { NO_MOVES, PRESETS, SLEEVES, scenario } from "./basket.ts";

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);
const preset = (id: string) => PRESETS.find((p) => p.id === id)!;

test("the sleeve weights add up to the whole basket", () => {
  near(SLEEVES.reduce((s, x) => s + x.weight, 0), 1);
});

test("nothing moves, nothing changes", () => {
  const r = scenario(1_00_000, NO_MOVES, 0);
  near(r.inrValue, 1_00_000);
  near(r.inrChange, 0);
});

test("a sleeve's move counts at its weight", () => {
  const r = scenario(1_00_000, { us: 0.1, gold: 0, oil: 0 }, 0);
  near(r.contributions.us, 0.05);
  near(r.inrValue, 1_05_000);
});

test("a weaker rupee raises the rupee value; a stronger one lowers it", () => {
  near(scenario(1_00_000, NO_MOVES, 0.05).inrValue, 1_05_000);
  near(scenario(1_00_000, NO_MOVES, -0.05).inrValue, 95_000);
});

test("2022: the basket fell in dollars, the rupee's fall more than made up for it", () => {
  const r = scenario(1_00_000, preset("2022").moves, preset("2022").rupee);
  near(r.basketUsd, -0.073); // 0.5 × −19% + 0.3 × 0% + 0.2 × +11%
  near(r.inrChange, 0.927 * 1.11 - 1);
  near(r.rupeeEffect, r.inrChange - r.basketUsd);
  assert.ok(r.basketUsd < 0 && r.inrChange > 0);
});

test("the hard year loses money in rupees too", () => {
  const r = scenario(1_00_000, preset("hard").moves, preset("hard").rupee);
  near(r.basketUsd, -0.22);
  near(r.inrValue, 1_00_000 * 0.78 * 0.95);
});
