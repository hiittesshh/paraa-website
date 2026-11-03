// The "Ask a CA" request: one validator shared by the form (instant feedback) and the API route
// (the check that counts). Pure, so `npm test` covers it.

export const TOPICS = [
  { id: "investing", label: "How much to invest" },
  { id: "tax", label: "Tax on my income" },
  { id: "account", label: "Opening an account" },
  { id: "other", label: "Something else" },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

export interface AdvisorRequest {
  name: string;
  phone: string; // 10 digits, no +91
  email: string; // optional: "" when not given
  topic: TopicId;
  question: string;
  consent: boolean;
}

export type FieldErrors = Partial<Record<keyof AdvisorRequest, string>>;

export const LIMITS = { name: 80, email: 120, question: 1000, questionMin: 10 } as const;

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
  if (name.length < 2) errors.name = "Tell us your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  const phone = normalisePhone(str(o.phone));
  if (!phone) errors.phone = "Enter a 10-digit Indian mobile number.";

  const email = str(o.email);
  if (email && (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.email = "Check the email address, or leave it blank.";

  const topic = TOPICS.find((t) => t.id === o.topic)?.id;
  if (!topic) errors.topic = "Pick what your question is about.";

  const question = str(o.question);
  if (question.length < LIMITS.questionMin) errors.question = "Write your question in a sentence or two.";
  else if (question.length > LIMITS.question) errors.question = `Keep it under ${LIMITS.question} characters.`;

  if (o.consent !== true) errors.consent = "We need your permission to contact you about this question.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { name, phone: phone!, email, topic: topic!, question, consent: true } };
}
