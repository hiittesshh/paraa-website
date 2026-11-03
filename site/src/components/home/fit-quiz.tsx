"use client";

// Section 8: "Am I a fit?" (Concept D, D5.3), the questionnaire that can say no.
// One question per step, real radio inputs in a fieldset/legend, focus moved to each new
// heading, result announced with aria-live. Logic lives in @/lib/quiz (pure, tested).
// Nothing is stored or sent: answers exist only in this component's state.
import { useCallback, useRef, useState, type Ref } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, CheckCircle2, Lock, RotateCcw, XCircle } from "lucide-react";
import { ArrowLink, Illustrative, Reveal, Section, SectionHead } from "@/components/paraa/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fitResult, QUESTIONS, REASONS, type Answers, type Grade, type Verdict } from "@/lib/quiz";

const TOTAL = QUESTIONS.length;

const VERDICT: Record<Verdict, { title: string; icon: typeof XCircle; tone: string; label: string }> = {
  no: { title: "Not for you right now.", icon: XCircle, tone: "text-negative", label: "Result: no" },
  maybe: { title: "Possibly. Weigh these first:", icon: AlertTriangle, tone: "text-warning", label: "Result: possibly" },
  fit: { title: "It could fit.", icon: CheckCircle2, tone: "text-positive", label: "Result: it could fit" },
};

const ease = [0.2, 0.7, 0.2, 1] as const;

export function FitQuiz() {
  const [step, setStep] = useState(0); // 0..TOTAL-1 = questions, TOTAL = result
  const [answers, setAnswers] = useState<Answers>({});
  const interacted = useRef(false);

  // Move focus to each new step's heading as it mounts, but never on first render (that would
  // scroll the page). A ref callback, not an effect on `step`: AnimatePresence mode="wait" mounts
  // the next step only after the old one has animated out, so an effect would focus the outgoing
  // heading, which then unmounts and drops focus to <body>.
  const headingRef = useCallback((el: HTMLHeadingElement | null) => {
    if (el && interacted.current) el.focus();
  }, []);

  const done = step === TOTAL;
  const q = QUESTIONS[Math.min(step, TOTAL - 1)];
  const picked = answers[q.id];
  const result = done ? fitResult(answers) : null;

  function go(to: number) {
    interacted.current = true;
    setStep(to);
  }
  function restart() {
    setAnswers({});
    go(0);
  }

  return (
    <Section id="fit" labelledBy="fit-title">
      <SectionHead
        id="fit-title"
        eyebrow="Am I a fit?"
        title="This might not be for you. Let’s find out."
        lede="Five questions. A red answer means “not for you right now”, and we won’t point you to the app."
      />

      <Reveal>
        <div className="mx-auto max-w-[760px] overflow-hidden rounded-lg border bg-card">
          {/* progress */}
          <div className="border-b px-5 py-4 sm:px-8">
            <div className="flex items-center justify-between gap-3 text-body-sm">
              <span className="font-bold text-muted-foreground">
                {done ? "Your result" : `Question ${step + 1} of ${TOTAL}`}
              </span>
              <span className="flex items-center gap-1.5 text-faint">
                <Lock aria-hidden className="size-3.5" />
                Your answers stay in this browser
              </span>
            </div>
            <div
              className="mt-3 flex gap-1.5"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={TOTAL}
              aria-valuenow={done ? TOTAL : step}
              aria-valuetext={done ? "All questions answered" : `Question ${step + 1} of ${TOTAL}`}
            >
              {QUESTIONS.map((qq, i) => (
                <span
                  key={qq.id}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    done || i < step ? "bg-gold-500" : i === step ? "bg-muted-foreground" : "bg-muted",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Always mounted, so screen readers announce the verdict when it appears. */}
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {result
              ? `${VERDICT[result.verdict].title} ${result.reasons.map((k) => REASONS[k].text).join(" ")}`
              : ""}
          </p>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <AnimatePresence mode="wait" initial={false}>
              {!done ? (
                <motion.form
                  key={q.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (picked) go(step + 1);
                  }}
                  aria-label="Fit questions"
                >
                  <fieldset className="m-0 min-w-0 border-0 p-0">
                    <legend className="mb-5 w-full p-0">
                      <h3 ref={headingRef} tabIndex={-1} className="type-h5 text-balance outline-none focus-visible:outline-none">
                        <span className="sr-only">Question {step + 1} of {TOTAL}: </span>
                        {q.text}
                      </h3>
                    </legend>
                    <div className="grid gap-3">
                      {q.options.map((o) => (
                        <OptionCard
                          key={o.grade}
                          name={q.id}
                          grade={o.grade}
                          label={o.label}
                          checked={picked === o.grade}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.grade }))}
                        />
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <Button type="button" variant="ghost" onClick={() => go(step - 1)} disabled={step === 0}>
                      Back
                    </Button>
                    <Button type="submit" variant={step === TOTAL - 1 ? "default" : "outline"} disabled={!picked}>
                      {step === TOTAL - 1 ? "See my result" : "Next question"}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                  >
                    <Result verdict={result.verdict} reasons={result.reasons} headingRef={headingRef} />
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
                      <p className="text-body-sm text-faint">Nothing you picked was stored or sent.</p>
                      <Button type="button" variant="outline" onClick={restart}>
                        <RotateCcw aria-hidden />
                        Start again
                      </Button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function OptionCard({
  name,
  grade,
  label,
  checked,
  onChange,
}: {
  name: string;
  grade: Grade;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex min-h-14 cursor-pointer items-center gap-4 rounded-md border border-border-strong bg-background-alt px-4 py-3 transition-[border-color,background-color] duration-150",
        "hover:border-muted-foreground",
        "has-checked:border-gold-500 has-checked:bg-accent-soft",
        "has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
      )}
    >
      <input type="radio" name={name} value={grade} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
          checked ? "border-gold-500 bg-gold-500 text-primary-foreground" : "border-border-strong",
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      <span className="text-body-lg font-bold">{label}</span>
    </label>
  );
}

function Result({
  verdict,
  reasons,
  headingRef,
}: {
  verdict: Verdict;
  reasons: string[];
  headingRef: Ref<HTMLHeadingElement>;
}) {
  const v = VERDICT[verdict];
  const Icon = v.icon;
  return (
    <div>
      <p className={cn("flex items-center gap-2 text-body-sm font-extrabold tracking-[0.06em] uppercase", v.tone)}>
        <Icon aria-hidden className="size-4" />
        {v.label}
      </p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-2 type-h4 outline-none focus-visible:outline-none">
        {v.title}
      </h3>

      {reasons.length > 0 && (
        <ul className="mt-5 space-y-3">
          {reasons.map((k) => {
            const r = REASONS[k];
            return (
              <li key={k} className="flex gap-3 rounded-md border bg-background-alt p-4 text-body-md text-muted-foreground">
                <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", v.tone)} />
                <span>
                  {r.text}
                  {r.illustrative && <Illustrative className="ml-2 align-middle" />}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-6">
        <p className="text-body-sm font-bold text-foreground">What to do next</p>
        {verdict === "no" && (
          // Any red answer: no app link and no sign-up nudge, by design (D5 §3).
          <ul className="mt-2 list-disc space-y-1 pl-5 text-body-md text-muted-foreground">
            <li>Keep this money somewhere you can reach without risking a loss.</li>
            <li>If your situation changes, take the five questions again.</li>
          </ul>
        )}
        {verdict === "maybe" && (
          <div className="mt-2 space-y-1">
            <p className="text-body-md text-muted-foreground">Read the answers to the common worries before you decide.</p>
            <div className="flex flex-wrap gap-x-6">
              <ArrowLink href="#faq">Read the common worries</ArrowLink>
              <ArrowLink href="#range" className="text-foreground">
                See both ends of the range
              </ArrowLink>
            </div>
          </div>
        )}
        {verdict === "fit" && (
          <div className="mt-2 space-y-1">
            <p className="text-body-md text-muted-foreground">
              Before you decide, read what it costs on a real amount and how your money moves.
            </p>
            <div className="flex flex-wrap gap-x-6">
              <ArrowLink href="#fees">See the fee receipt</ArrowLink>
              <ArrowLink href="#how" className="text-foreground">
                How your money moves
              </ArrowLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
