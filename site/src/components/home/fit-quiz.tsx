"use client";

// Section 8: "Am I a fit?" (Concept D, D5.3), the questionnaire that can say no.
// One question per step, real radio inputs in a fieldset/legend, focus moved to each new
// heading, result announced with aria-live. Logic lives in @/lib/quiz (pure, tested).
// Nothing is stored or sent: answers exist only in this component's state.
//
// Light theme: the selected answer is shown three ways (ink border, gold-50 fill, filled radio),
// never by colour alone. The verdict uses a tinted alert fill with dark text; the alert colour
// itself only appears as a fill behind the icon, because it fails contrast as text on white.
import { useCallback, useRef, useState, type Ref } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Lock, RotateCcw, XCircle } from "lucide-react";
import { ArrowLink, Illustrative, Reveal, Section, SectionHead } from "@/components/paraa/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fitResult, QUESTIONS, REASONS, type Answers, type Grade, type Verdict } from "@/lib/quiz";

const TOTAL = QUESTIONS.length;

const VERDICT: Record<
  Verdict,
  { title: string; icon: typeof XCircle; panel: string; chip: string; label: string }
> = {
  no: {
    title: "Not for you right now.",
    icon: XCircle,
    panel: "border-error/40 bg-error/10",
    chip: "bg-error text-ink",
    label: "Result: no",
  },
  maybe: {
    title: "Possibly. Weigh these first:",
    icon: AlertTriangle,
    panel: "border-warning bg-warning/20",
    chip: "bg-warning text-ink",
    label: "Result: possibly",
  },
  fit: {
    title: "It could fit.",
    icon: CheckCircle2,
    panel: "border-success/40 bg-success/10",
    chip: "bg-success text-ink",
    label: "Result: it could fit",
  },
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
  const progress = done ? 1 : step / TOTAL;

  function go(to: number) {
    interacted.current = true;
    setStep(to);
  }
  function restart() {
    setAnswers({});
    go(0);
  }

  return (
    <Section id="fit" tone="alt" labelledBy="fit-title">
      <SectionHead
        id="fit-title"
        eyebrow="Am I a fit?"
        title="This might not be for you. Let’s find out."
        lede="Five questions. A red answer means “not for you right now”, and we won’t point you to the app."
      />

      <Reveal>
        <div className="mx-auto max-w-[760px] overflow-hidden rounded-lg border bg-card shadow-card">
          {/* progress */}
          <div className="border-b px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-body-sm">
              <span className="num font-bold text-foreground">
                {done ? "Your result" : `Question ${step + 1} of ${TOTAL}`}
              </span>
              <span className="flex items-center gap-1.5 text-faint">
                <Lock aria-hidden className="size-3.5" />
                Your answers stay in this browser
              </span>
            </div>
            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={TOTAL}
              aria-valuenow={done ? TOTAL : step}
              aria-valuetext={done ? "All questions answered" : `Question ${step + 1} of ${TOTAL}`}
            >
              <motion.div
                className="h-full rounded-full bg-ink"
                initial={false}
                animate={{ width: `${Math.max(progress, 0.04) * 100}%` }}
                transition={{ duration: 0.45, ease }}
              />
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
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.24, ease }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (picked) go(step + 1);
                  }}
                  aria-label="Fit questions"
                >
                  <fieldset className="m-0 min-w-0 border-0 p-0">
                    <legend className="mb-6 w-full p-0">
                      <h3 ref={headingRef} tabIndex={-1} className="type-h4 text-balance outline-none focus-visible:outline-none">
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
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
        "flex min-h-16 cursor-pointer items-center gap-4 rounded-md border bg-card px-5 py-4",
        "transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out-soft",
        "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card",
        "has-checked:border-ink has-checked:bg-gold-50 has-checked:shadow-card",
        "has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring",
      )}
    >
      <input type="radio" name={name} value={grade} checked={checked} onChange={onChange} className="peer sr-only" />
      {/* The visible radio: an ink ring, filled with an ink dot when chosen. */}
      <span
        aria-hidden
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full border-2 bg-card transition-colors duration-200",
          checked ? "border-ink" : "border-border-strong",
        )}
      >
        <motion.span
          className="block size-3 rounded-full bg-ink"
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ duration: 0.2, ease }}
        />
      </span>
      <span className="text-body-lg font-semibold text-foreground">{label}</span>
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
      <div className={cn("rounded-lg border p-5 sm:p-6", v.panel)}>
        <div className="flex items-start gap-4">
          <span aria-hidden className={cn("grid size-11 shrink-0 place-items-center rounded-full", v.chip)}>
            <Icon className="size-5" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="text-body-sm font-extrabold tracking-[0.06em] text-foreground uppercase">{v.label}</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-1 type-h4 text-foreground outline-none focus-visible:outline-none">
              {v.title}
            </h3>
          </div>
        </div>

        {reasons.length > 0 && (
          <ul className="mt-5 space-y-2">
            {reasons.map((k) => {
              const r = REASONS[k];
              return (
                <li key={k} className="rounded-md border bg-card p-4 text-body-md text-foreground">
                  {r.text}
                  {r.illustrative && <Illustrative className="ml-2 align-middle" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <p className="text-body-md font-bold text-foreground">What to do next</p>
        {verdict === "no" && (
          // Any red answer: no app link and no sign-up nudge, by design (D5 §3).
          <ul className="mt-2 list-disc space-y-1 pl-5 text-body-md text-muted-foreground">
            <li>Keep this money somewhere you can reach without risking a loss.</li>
            <li>If your situation changes, take the five questions again.</li>
          </ul>
        )}
        {verdict === "maybe" && (
          <div className="mt-2 space-y-1">
            <p className="text-body-md text-muted-foreground">
              Investments can fall, and recovering can take time. Read the answers to the common worries, and how your money moves,
              before you decide.
            </p>
            <div className="flex flex-wrap gap-x-6">
              <ArrowLink href="#faq">Read the common worries</ArrowLink>
              <ArrowLink href="#how" className="text-foreground">
                How your money moves
              </ArrowLink>
            </div>
          </div>
        )}
        {verdict === "fit" && (
          <div className="mt-2 space-y-1">
            <p className="text-body-md text-muted-foreground">
              Before you decide, read what it costs on a real amount and how your money moves. Values can still fall.
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
