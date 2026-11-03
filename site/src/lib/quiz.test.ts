// Reproduces the prototype's three check results (concept-d/concept.js fitResult).
import { test } from "node:test";
import assert from "node:assert/strict";
import { fitResult, isComplete, QUESTIONS, REASONS, type Answers } from "./quiz.ts";

const allGreen: Answers = { q1: "G", q2: "G", q3: "G", q4: "G", q5: "G" };

test("a red answer says no", () => {
  const r = fitResult({ ...allGreen, q4: "R" });
  assert.equal(JSON.stringify(r), '{"verdict":"no","reasons":["q4:R"]}');
});

test("an amber answer says maybe", () => {
  const r = fitResult({ ...allGreen, q2: "A" });
  assert.equal(JSON.stringify(r), '{"verdict":"maybe","reasons":["q2:A"]}');
});

test("all green says it could fit", () => {
  assert.equal(JSON.stringify(fitResult(allGreen)), '{"verdict":"fit","reasons":[]}');
});

test("red outranks amber and lists every red in question order", () => {
  const r = fitResult({ q1: "R", q2: "A", q3: "A", q4: "R", q5: "G" });
  assert.deepEqual(r, { verdict: "no", reasons: ["q1:R", "q4:R"] });
});

test("every possible R/A answer has a reason, and completeness is tracked", () => {
  for (const q of QUESTIONS) for (const o of q.options) if (o.grade !== "G") assert.ok(REASONS[`${q.id}:${o.grade}`]);
  assert.equal(isComplete({ q1: "G" }), false);
  assert.equal(isComplete(allGreen), true);
});
