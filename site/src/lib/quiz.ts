// "Am I a fit?" quiz logic (Concept D, D5.3), ported from concept-d/concept.js.
// R = red ("not for you right now"), A = amber ("weigh this first"), G = green.
// Pure: no storage, no network. Answers live only in component state.

export type Grade = "R" | "A" | "G";
export type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5";
export type Answers = Partial<Record<QuestionId, Grade>>;

export type Question = {
  id: QuestionId;
  text: string;
  options: { grade: Grade; label: string }[];
};

export const QUESTIONS: readonly Question[] = [
  {
    id: "q1",
    text: "When might you need this money?",
    options: [
      { grade: "R", label: "Within 1 year" },
      { grade: "A", label: "1–3 years" },
      { grade: "G", label: "Over 3 years" },
    ],
  },
  {
    id: "q2",
    text: "If it fell 15%, what would you do?",
    options: [
      { grade: "R", label: "Sell" },
      { grade: "A", label: "Worry, but wait" },
      { grade: "G", label: "Wait, or add more" },
    ],
  },
  {
    id: "q3",
    text: "Will you spend this money in rupees soon (a home, a wedding)?",
    options: [
      { grade: "A", label: "Yes, within 2 years" },
      { grade: "G", label: "No" },
    ],
  },
  {
    id: "q4",
    text: "Is this your emergency fund, or borrowed money?",
    options: [
      { grade: "R", label: "Yes" },
      { grade: "G", label: "No" },
    ],
  },
  {
    id: "q5",
    text: "Do you already hold US-dollar assets?",
    options: [
      { grade: "A", label: "A lot" },
      { grade: "G", label: "Some or none" },
    ],
  },
];

export type ReasonKey = `${QuestionId}:${"R" | "A"}`;

// Audit D9 follow-up: the prototype's q5 link pointed at risks.html#dont, which doesn't exist
// on this site, so it is plain text here.
export const REASONS: Readonly<Record<string, { text: string; illustrative?: boolean }>> = {
  "q1:R": { text: "Money you need within a year shouldn’t sit in something that can fall 15%." },
  "q1:A": {
    text: "One to three years is short. Investments can fall, and a fall can take more than a year to recover, so you may need the money before it does.",
  },
  "q2:R": { text: "If a 15% fall would make you sell, you would likely turn a temporary fall into a real loss." },
  "q2:A": { text: "Worrying is normal. Values can fall without warning and take time to recover, so be sure you could wait it out before you decide." },
  "q3:A": { text: "If you’ll spend this in rupees within 2 years, a stronger rupee could shrink it just when you need it." },
  "q4:R": { text: "Emergency money and borrowed money shouldn’t be in something that can fall." },
  "q5:A": { text: "You may already hold enough in dollars. Check the cheaper do-it-yourself routes before you add more." },
};

export type Verdict = "no" | "maybe" | "fit";
export type FitResult = { verdict: Verdict; reasons: ReasonKey[] };

/** Any red → "no" (with every red reason). Else any amber → "maybe". Else "fit". */
export function fitResult(answers: Answers): FitResult {
  const reds: ReasonKey[] = [];
  const ambers: ReasonKey[] = [];
  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (a === "R") reds.push(`${q.id}:R`);
    if (a === "A") ambers.push(`${q.id}:A`);
  }
  if (reds.length) return { verdict: "no", reasons: reds };
  if (ambers.length) return { verdict: "maybe", reasons: ambers };
  return { verdict: "fit", reasons: [] };
}

/** True once every question has an answer. */
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => answers[q.id] !== undefined);
}
