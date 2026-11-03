import { test } from "node:test";
import assert from "node:assert/strict";
import { normalisePhone, validateRequest } from "./advisor-request.ts";

const good = {
  name: "Asha Rao",
  phone: "+91 98765 43210",
  email: "",
  topic: "tax",
  question: "How is the income from the basket taxed if I also have a salary?",
  consent: true,
};

test("Indian mobile numbers are normalised to 10 digits", () => {
  assert.equal(normalisePhone("+91 98765-43210"), "9876543210");
  assert.equal(normalisePhone("919876543210"), "9876543210");
  assert.equal(normalisePhone("09876543210"), "9876543210");
  assert.equal(normalisePhone("5876543210"), null); // must start 6–9
  assert.equal(normalisePhone("98765"), null);
});

test("a complete request passes, trimmed and normalised", () => {
  const r = validateRequest({ ...good, name: "  Asha Rao " });
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.value.name, "Asha Rao");
    assert.equal(r.value.phone, "9876543210");
  }
});

test("email is optional, but checked when given", () => {
  assert.ok(validateRequest({ ...good, email: "asha@example.in" }).ok);
  const r = validateRequest({ ...good, email: "asha@" });
  assert.ok(!r.ok && r.errors.email);
});

test("every missing field gets its own message", () => {
  const r = validateRequest({});
  assert.ok(!r.ok);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["consent", "name", "phone", "question", "topic"]);
});

test("unknown topics and unticked consent are refused", () => {
  const r = validateRequest({ ...good, topic: "stocks", consent: "yes" });
  assert.ok(!r.ok && r.errors.topic && r.errors.consent);
});
