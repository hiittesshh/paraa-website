// Receives the "Ask a CA" form and forwards it to the advisor desk.
// The backend has no public enquiry endpoint, so the destination is whatever
// ADVISOR_REQUEST_WEBHOOK_URL points at (a backend endpoint, a CRM, or a Sheets/Slack webhook),
// with ADVISOR_REQUEST_WEBHOOK_TOKEN sent as a bearer token if set. Without the URL the route
// answers 503 and the form tells the visitor it wasn't sent: a question is never silently dropped.
import { validateRequest } from "@/lib/advisor-request";

function reference() {
  return "PQ-" + crypto.randomUUID().slice(0, 8).toUpperCase();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: a field people never see. Bots fill it; answer as if it worked and forward nothing.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return Response.json({ ok: true, reference: reference() });
  }

  const result = validateRequest(body);
  if (!result.ok) return Response.json({ error: "invalid", fields: result.errors }, { status: 422 });

  const url = process.env.ADVISOR_REQUEST_WEBHOOK_URL;
  if (!url) return Response.json({ error: "not_configured" }, { status: 503 });

  const ref = reference();
  const token = process.env.ADVISOR_REQUEST_WEBHOOK_TOKEN;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ ...result.value, reference: ref, submittedAt: new Date().toISOString(), source: "website" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return Response.json({ error: "upstream" }, { status: 502 });
  } catch {
    return Response.json({ error: "upstream" }, { status: 502 });
  }
  return Response.json({ ok: true, reference: ref });
}
