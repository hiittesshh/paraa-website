// The "Talk to a CA" request: one validator shared by the form (instant feedback) and the API
// route (the check that counts). Kept short so asking takes seconds; email is optional. Pure, so
// `npm test` covers it.

export interface AdvisorRequest {
  name: string;
  phone: string; // 10 digits, no +91
  email?: string; // optional, and only checked when filled in
  question: string;
  consent: boolean;
}

export type FieldErrors = Partial<Record<keyof AdvisorRequest, string>>;

export const LIMITS = { name: 80, question: 1000, questionMin: 10, email: 254 } as const;

/** "+91 98765-43210" → "9876543210". Indian mobile numbers only (10 digits, starting 6–9). */
export function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/[\s\-()]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export function validateRequest(input: unknown): { ok: true; value: AdvisorRequest } | { ok: false; errors: FieldErrors } {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const name = str(o.name);
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;

  const phone = normalisePhone(str(o.phone));
  if (!phone) errors.phone = "Please enter a valid 10-digit mobile number.";

  const email = str(o.email);
  if (email && (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    errors.email = "Please enter a valid email address, or leave it empty.";
  }

  const question = str(o.question);
  if (question.length < LIMITS.questionMin) errors.question = "Please write your question in at least 10 characters.";
  else if (question.length > LIMITS.question) errors.question = `Please keep it under ${LIMITS.question} characters.`;

  if (o.consent !== true) errors.consent = "Please tick this so we can contact you.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { name, phone: phone!, ...(email ? { email } : {}), question, consent: true } };
}
