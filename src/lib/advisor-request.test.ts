import { test } from "node:test";
import assert from "node:assert/strict";
import { normalisePhone, validateRequest } from "./advisor-request.ts";

const good = {
  name: "Asha Rao",
  phone: "+91 98765 43210",
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

test("every missing field gets its own message", () => {
  const r = validateRequest({});
  assert.ok(!r.ok);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["consent", "name", "phone", "question"]);
});

test("consent must be a real tick, not a truthy string", () => {
  const r = validateRequest({ ...good, consent: "yes" });
  assert.ok(!r.ok && r.errors.consent);
});

test("email is optional, but checked when filled in", () => {
  const none = validateRequest({ ...good, email: "   " });
  assert.ok(none.ok && !("email" in none.value));
  const fine = validateRequest({ ...good, email: " asha@example.com " });
  assert.ok(fine.ok && fine.value.email === "asha@example.com");
  for (const bad of ["asha", "asha@", "@example.com", "asha@example", "a b@example.com"]) {
    const r = validateRequest({ ...good, email: bad });
    assert.ok(!r.ok && r.errors.email, bad);
  }
});
