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

test("each scenario gives the figure it should", () => {
  const value = (id: string) => scenario(1_00_000, preset(id).moves, preset(id).rupee).inrValue;
  near(value("stocks-fall"), 90_000);
  near(value("oil-falls"), 92_000);
  near(value("rupee-strong"), 95_000);
  near(value("rupee-weak"), 1_05_000);
});

test("no scenario is a real year, and the rupee's two directions are both there", () => {
  assert.ok(PRESETS.every((p) => !/^\d{4}$/.test(p.id) && !/\d{4}/.test(p.label)));
  assert.ok(PRESETS.some((p) => p.rupee > 0) && PRESETS.some((p) => p.rupee < 0));
});

test("when everything falls, it loses money in rupees too", () => {
  const r = scenario(1_00_000, preset("all-fall").moves, preset("all-fall").rupee);
  near(r.basketUsd, -0.22);
  near(r.inrValue, 1_00_000 * 0.78 * 0.95);
});
