import { test } from "node:test";
import assert from "node:assert/strict";
import { forwardAdvisorRequest, readAskForm, toAskState, type ForwardDeps } from "./advisor-forward.ts";

const good = {
  name: "Asha Rao",
  phone: "+91 98765 43210",
  email: "asha@example.com",
  question: "What are the fees on ₹1 lakh?",
  consent: true,
};

const WEBHOOK = "https://hooks.example.com/advisor";
const UUID = "1a2b3c4d-0000-4000-8000-000000000000";

type Call = { url: string; init: RequestInit };

/** A fake fetch that records every call and answers with `respond`. */
function fakeFetch(respond: (call: Call) => Promise<Response> | Response) {
  const calls: Call[] = [];
  const fn = (async (url: string | URL | Request, init?: RequestInit) => {
    const call = { url: String(url), init: init ?? {} };
    calls.push(call);
    return respond(call);
  }) as typeof fetch;
  return { fn, calls };
}

function deps(over: Partial<ForwardDeps> & { env?: ForwardDeps["env"] } = {}): Partial<ForwardDeps> {
  return { env: { ADVISOR_REQUEST_WEBHOOK_URL: WEBHOOK }, uuid: () => UUID, ...over };
}

test("200: a valid question is forwarded and gets a PQ- reference", async () => {
  const f = fakeFetch(() => new Response(null, { status: 204 }));
  const r = await forwardAdvisorRequest(good, deps({ fetch: f.fn }));
  assert.deepEqual(r, { status: 200, body: { ok: true, reference: "PQ-1A2B3C4D" } });
  assert.equal(f.calls.length, 1);
  assert.match(r.status === 200 ? r.body.reference : "", /^PQ-[0-9A-F]{8}$/);
});

test("the real reference generator gives PQ- and 8 uppercase hex characters", async () => {
  const f = fakeFetch(() => new Response("ok"));
  const r = await forwardAdvisorRequest(good, { env: { ADVISOR_REQUEST_WEBHOOK_URL: WEBHOOK }, fetch: f.fn });
  assert.equal(r.status, 200);
  assert.match(r.status === 200 ? r.body.reference : "", /^PQ-[0-9A-F]{8}$/);
});

test("payload shape: the validated value, the reference, a timestamp and the source, as JSON", async () => {
  const f = fakeFetch(() => new Response("ok"));
  const before = Date.now();
  await forwardAdvisorRequest(good, deps({ fetch: f.fn }));
  const [{ url, init }] = f.calls;

  assert.equal(url, WEBHOOK);
  assert.equal(init.method, "POST");
  assert.deepEqual(init.headers, { "Content-Type": "application/json" });
  assert.ok(init.signal instanceof AbortSignal, "the request carries a timeout signal");

  const payload = JSON.parse(String(init.body));
  const { submittedAt, ...rest } = payload;
  assert.deepEqual(rest, {
    name: "Asha Rao",
    phone: "9876543210", // normalised by validateRequest
    email: "asha@example.com",
    question: "What are the fees on ₹1 lakh?",
    consent: true,
    reference: "PQ-1A2B3C4D",
    source: "website",
  });
  assert.equal(new Date(submittedAt).toISOString(), submittedAt);
  assert.ok(Date.parse(submittedAt) >= before - 1000);
});

test("payload shape: an empty email is left out, as before", async () => {
  const f = fakeFetch(() => new Response("ok"));
  await forwardAdvisorRequest({ ...good, email: "" }, deps({ fetch: f.fn }));
  assert.equal("email" in JSON.parse(String(f.calls[0].init.body)), false);
});

test("the bearer token is sent when ADVISOR_REQUEST_WEBHOOK_TOKEN is set", async () => {
  const f = fakeFetch(() => new Response("ok"));
  await forwardAdvisorRequest(
    good,
    deps({ fetch: f.fn, env: { ADVISOR_REQUEST_WEBHOOK_URL: WEBHOOK, ADVISOR_REQUEST_WEBHOOK_TOKEN: "s3cret" } }),
  );
  assert.deepEqual(f.calls[0].init.headers, { "Content-Type": "application/json", Authorization: "Bearer s3cret" });
});

test("422: an invalid question returns the field messages and sends nothing", async () => {
  const f = fakeFetch(() => new Response("ok"));
  const r = await forwardAdvisorRequest({ ...good, phone: "12345", consent: false }, deps({ fetch: f.fn }));
  assert.deepEqual(r, {
    status: 422,
    body: {
      error: "invalid",
      fields: { phone: "Please enter a valid 10-digit mobile number.", consent: "Please tick this so we can contact you." },
    },
  });
  assert.equal(f.calls.length, 0);
});

test("422: a body that isn't an object is invalid, not a crash", async () => {
  const r = await forwardAdvisorRequest(null, deps({ fetch: fakeFetch(() => new Response("ok")).fn }));
  assert.equal(r.status, 422);
});

test("503: no webhook URL means not configured, and nothing is sent", async () => {
  const f = fakeFetch(() => new Response("ok"));
  const r = await forwardAdvisorRequest(good, deps({ fetch: f.fn, env: {} }));
  assert.deepEqual(r, { status: 503, body: { error: "not_configured" } });
  assert.equal(f.calls.length, 0);
});

test("502: the webhook answers non-2xx", async () => {
  const f = fakeFetch(() => new Response("nope", { status: 500 }));
  const r = await forwardAdvisorRequest(good, deps({ fetch: f.fn }));
  assert.deepEqual(r, { status: 502, body: { error: "upstream" } });
});

test("502: the webhook call throws (network error)", async () => {
  const f = fakeFetch(() => {
    throw new TypeError("fetch failed");
  });
  const r = await forwardAdvisorRequest(good, deps({ fetch: f.fn }));
  assert.deepEqual(r, { status: 502, body: { error: "upstream" } });
});

test("502: the webhook takes longer than the timeout", async () => {
  // A webhook that never answers; only the abort signal ends the wait.
  const f = fakeFetch(
    ({ init }) =>
      new Promise<Response>((_, reject) => {
        init.signal?.addEventListener("abort", () => reject(init.signal?.reason));
      }),
  );
  const started = Date.now();
  const r = await forwardAdvisorRequest(good, deps({ fetch: f.fn, timeoutMs: 30 }));
  assert.deepEqual(r, { status: 502, body: { error: "upstream" } });
  assert.ok(Date.now() - started < 2000);
});

test("the timeout is 8 seconds by default", async (t) => {
  const timeout = t.mock.method(AbortSignal, "timeout");
  const f = fakeFetch(() => new Response("ok"));
  await forwardAdvisorRequest(good, deps({ fetch: f.fn }));
  assert.equal(timeout.mock.callCount(), 1);
  assert.deepEqual(timeout.mock.calls[0].arguments, [8000]);
  assert.equal(f.calls[0].init.signal, timeout.mock.calls[0].result);
});

test("honeypot: a filled `website` gets a made-up reference and nothing is sent, even when invalid", async () => {
  const f = fakeFetch(() => new Response("ok"));
  const r = await forwardAdvisorRequest({ website: "http://spam.example", name: "" }, deps({ fetch: f.fn }));
  assert.deepEqual(r, { status: 200, body: { ok: true, reference: "PQ-1A2B3C4D" } });
  assert.equal(f.calls.length, 0);
});

test("honeypot: answers 200 even when no webhook is configured", async () => {
  const f = fakeFetch(() => new Response("ok"));
  const r = await forwardAdvisorRequest({ ...good, website: "x" }, deps({ fetch: f.fn, env: {} }));
  assert.equal(r.status, 200);
  assert.equal(f.calls.length, 0);
});

test("an empty `website` is not the honeypot", async () => {
  const f = fakeFetch(() => new Response("ok"));
  const r = await forwardAdvisorRequest({ ...good, website: "" }, deps({ fetch: f.fn }));
  assert.equal(r.status, 200);
  assert.equal(f.calls.length, 1);
});

/* ── The Server Action's helpers ── */

test("readAskForm: reads the fields as strings, consent from the checkbox, and the honeypot", () => {
  const fd = new FormData();
  fd.set("name", "Asha Rao");
  fd.set("phone", "98765 43210");
  fd.set("question", "What are the fees on ₹1 lakh?");
  fd.set("consent", "on");
  fd.set("website", "");
  fd.set("$ACTION_ID_abc", "");
  assert.deepEqual(readAskForm(fd), {
    values: { name: "Asha Rao", phone: "98765 43210", email: "", question: "What are the fees on ₹1 lakh?", consent: true },
    website: "",
  });
  assert.equal(readAskForm(new FormData()).values.consent, false);
});

test("toAskState: maps 200 / 422 / 503 / 502, and counts repeat failures", () => {
  const values = { name: "Asha Rao", phone: "9876543210", email: "", question: "What are the fees?", consent: true };
  const idle = { kind: "idle" } as const;
  assert.deepEqual(toAskState({ status: 200, body: { ok: true, reference: "PQ-1A2B3C4D" } }, values, idle), {
    kind: "sent",
    reference: "PQ-1A2B3C4D",
  });
  assert.deepEqual(toAskState({ status: 422, body: { error: "invalid", fields: { name: "x" } } }, values, idle), {
    kind: "invalid",
    fields: { name: "x" },
    values,
  });
  assert.deepEqual(toAskState({ status: 503, body: { error: "not_configured" } }, values, idle), {
    kind: "not_configured",
    values,
  });
  const first = toAskState({ status: 502, body: { error: "upstream" } }, values, idle);
  assert.deepEqual(first, { kind: "failed", values, attempt: 1 });
  const second = toAskState({ status: 502, body: { error: "upstream" } }, values, first);
  assert.deepEqual(second, { kind: "failed", values, attempt: 2 });
});
