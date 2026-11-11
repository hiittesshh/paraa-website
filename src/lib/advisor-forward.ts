// Forwards an "Ask a CA" question to the advisor desk (spec §7.1). Moved out of the API route so the route and
// the Server Action (src/app/actions.ts) share one path, with the route's behaviour unchanged:
//
// - honeypot `website` filled → 200 with a made-up reference, and nothing is sent;
// - invalid → 422 with the field messages from validateRequest;
// - no ADVISOR_REQUEST_WEBHOOK_URL → 503 `not_configured` (the form says nothing was sent: a question is
//   never silently dropped);
// - the webhook answers non-2xx, throws, or takes longer than 8s → 502 `upstream`;
// - otherwise → 200 with a reference, "PQ-" and 8 uppercase hex characters.
//
// The destination is whatever ADVISOR_REQUEST_WEBHOOK_URL points at (a backend endpoint, a CRM, or a
// Sheets/Slack webhook), with ADVISOR_REQUEST_WEBHOOK_TOKEN sent as a bearer token when set.
//
// Dependencies are injectable so `npm test` covers every outcome without a network.
import { validateRequest, type FieldErrors } from "./advisor-request.ts";

export type ForwardResult =
  | { status: 200; body: { ok: true; reference: string } }
  | { status: 422; body: { error: "invalid"; fields: FieldErrors } }
  | { status: 503; body: { error: "not_configured" } }
  | { status: 502; body: { error: "upstream" } };

export type ForwardDeps = {
  fetch: typeof fetch;
  env: Record<string, string | undefined>;
  uuid: () => string;
  /** How long the webhook gets before the question counts as not sent. 8s; tests shorten it. */
  timeoutMs: number;
};

// Built per call, not at module level: the form's client bundle imports this module's helpers, and a
// module-level `process.env` read would keep the forwarder from being tree-shaken out of it.
const defaults = (): ForwardDeps => ({
  fetch: (...args) => fetch(...args),
  env: process.env,
  uuid: () => crypto.randomUUID(),
  timeoutMs: 8000,
});

export async function forwardAdvisorRequest(body: unknown, deps: Partial<ForwardDeps> = {}): Promise<ForwardResult> {
  const { fetch: send, env, uuid, timeoutMs } = { ...defaults(), ...deps };
  const reference = () => "PQ-" + uuid().slice(0, 8).toUpperCase();

  // Honeypot: a field people never see. Bots fill it; answer as if it worked and forward nothing.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return { status: 200, body: { ok: true, reference: reference() } };
  }

  const result = validateRequest(body);
  if (!result.ok) return { status: 422, body: { error: "invalid", fields: result.errors } };

  const url = env.ADVISOR_REQUEST_WEBHOOK_URL;
  if (!url) return { status: 503, body: { error: "not_configured" } };

  const ref = reference();
  const token = env.ADVISOR_REQUEST_WEBHOOK_TOKEN;
  try {
    const res = await send(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ ...result.value, reference: ref, submittedAt: new Date().toISOString(), source: "website" }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return { status: 502, body: { error: "upstream" } };
  } catch {
    return { status: 502, body: { error: "upstream" } };
  }
  return { status: 200, body: { ok: true, reference: ref } };
}

/* ── The form's state (spec §7.1), shared by the Server Action and the form ── */

/** What the visitor typed, sent back so a server render can refill the fields. */
export type AskValues = { name: string; phone: string; email: string; question: string; consent: boolean };

export type AskState =
  | { kind: "idle" }
  | { kind: "sent"; reference: string }
  | { kind: "invalid"; fields: FieldErrors; values: AskValues }
  | { kind: "not_configured"; values: AskValues }
  | { kind: "failed"; values: AskValues; attempt: number };

/** The form's fields, from a form post. `website` is the honeypot. */
export function readAskForm(formData: FormData): { values: AskValues; website: string } {
  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    values: {
      name: text("name"),
      phone: text("phone"),
      email: text("email"),
      question: text("question"),
      consent: formData.get("consent") === "on",
    },
    website: text("website"),
  };
}

/** The forwarder's answer as the form's next state. A repeat failure counts up, so the form can offer Copy. */
export function toAskState(result: ForwardResult, values: AskValues, prev: AskState): AskState {
  switch (result.status) {
    case 200:
      return { kind: "sent", reference: result.body.reference };
    case 422:
      return { kind: "invalid", fields: result.body.fields, values };
    case 503:
      return { kind: "not_configured", values };
    case 502:
      return { kind: "failed", values, attempt: prev.kind === "failed" ? prev.attempt + 1 : 1 };
  }
}
