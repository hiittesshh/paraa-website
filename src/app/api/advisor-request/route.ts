// Receives the "Ask a CA" form as JSON and forwards it to the advisor desk. The contract is unchanged
// (spec §7.1): 400 `invalid_json`, 422 `invalid` with fields, 503 `not_configured`, 502 `upstream`, or 200
// with a reference. The forwarding itself lives in lib/advisor-forward, shared with the form's Server Action.
import { forwardAdvisorRequest } from "@/lib/advisor-forward";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const r = await forwardAdvisorRequest(body);
  return Response.json(r.body, { status: r.status });
}
