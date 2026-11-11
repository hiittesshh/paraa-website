"use server";

// The "Ask a CA" form's Server Action (spec §7.1, decision 41). One path for every submit: after hydration the
// form calls it from script, and before hydration (or with JS off) the browser posts the form natively, the
// server re-renders with the returned state, and the page lands back on /#ask. It forwards through the same
// lib/advisor-forward the API route uses, so validation, the honeypot, the 503 and the 502 are identical.
import { forwardAdvisorRequest, readAskForm, toAskState, type AskState } from "@/lib/advisor-forward";

export async function askCa(prev: AskState, formData: FormData): Promise<AskState> {
  const { values, website } = readAskForm(formData);
  const result = await forwardAdvisorRequest({ ...values, website });
  return toAskState(result, values, prev);
}
