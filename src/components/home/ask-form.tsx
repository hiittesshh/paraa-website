"use client";

// The "Ask a CA" form. Validation is lib/advisor-request (the same function the API route runs),
// so the visitor sees the same messages the server would send. Each error sits under its field,
// is tied to it with aria-describedby and aria-invalid, and focus moves to the first one.
// Delivery is /api/advisor-request; if that isn't configured or fails, the form says so plainly
// and keeps what was typed. A hidden "website" field catches bots (people never see it).
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { ToConfirm } from "@/components/paraa/primitives";
import { Button } from "@/components/ui/button";
import { LIMITS, TOPICS, validateRequest, type FieldErrors, type TopicId } from "@/lib/advisor-request";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; reference: string } | { kind: "failed" };

const EASE = [0.2, 0.7, 0.2, 1] as const;
const FIELD_ORDER = ["name", "phone", "email", "topic", "question", "consent"] as const;

const input =
  "block w-full rounded-md border border-input bg-card px-4 text-body-lg text-foreground placeholder:text-faint transition-[border-color,box-shadow] duration-150 hover:border-grey-400 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-error";

export function AskForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", topic: "" as TopicId | "", question: "", consent: false });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function focusFirstError(errs: FieldErrors) {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("website") as string) || "";
    const check = validateRequest(form);
    if (!check.ok) {
      setErrors(check.errors);
      focusFirstError(check.errors);
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/advisor-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reference) {
        setStatus({ kind: "sent", reference: data.reference });
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        setStatus({ kind: "idle" });
        focusFirstError(data.fields);
        return;
      }
      setStatus({ kind: "failed" });
    } catch {
      setStatus({ kind: "failed" });
    }
  }

  function again() {
    setForm({ name: "", phone: "", email: "", topic: "", question: "", consent: false });
    setStatus({ kind: "idle" });
  }

  return (
    <div className="rounded-lg border bg-card p-5 shadow-card sm:p-7">
      <AnimatePresence mode="wait" initial={false}>
        {status.kind === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="py-6 text-center"
          >
            <span aria-hidden className="mx-auto grid size-12 place-items-center rounded-full bg-success/15">
              <CheckCircle2 className="size-6 stroke-ink" />
            </span>
            <h4 ref={doneRef} tabIndex={-1} className="mt-4 type-h4 outline-none">
              Your question is with our advisor desk
            </h4>
            <p className="mt-2 text-body-lg text-muted-foreground">
              Reference <strong className="text-foreground num">{status.reference}</strong>. A CA will reply within [1 working
              day] <ToConfirm />
            </p>
            <Button type="button" variant="outline" className="mt-6" onClick={again}>
              Ask another question
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            aria-label="Ask a CA a question"
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="ask-name" label="Your name" error={errors.name}>
                <input
                  id="ask-name"
                  data-field="name"
                  autoComplete="name"
                  maxLength={LIMITS.name}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "ask-name-error" : undefined}
                  className={cn(input, "h-13")}
                />
              </Field>
              <Field id="ask-phone" label="Mobile number" error={errors.phone}>
                <div className="relative">
                  <span aria-hidden className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-body-lg text-faint">
                    +91
                  </span>
                  <input
                    id="ask-phone"
                    data-field="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "ask-phone-error" : undefined}
                    className={cn(input, "h-13 pl-13 num")}
                  />
                </div>
              </Field>
            </div>

            <Field id="ask-email" label="Email" optional error={errors.email}>
              <input
                id="ask-email"
                data-field="email"
                type="email"
                autoComplete="email"
                maxLength={LIMITS.email}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "ask-email-error" : undefined}
                className={cn(input, "h-13")}
              />
            </Field>

            <fieldset className="min-w-0 border-0 p-0" aria-describedby={errors.topic ? "ask-topic-error" : undefined}>
              <legend className="mb-2 p-0 text-body-md font-semibold text-foreground">What is it about?</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t, i) => (
                  <label
                    key={t.id}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-body-md font-semibold transition-colors duration-200 ease-out-soft",
                      "has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring",
                      form.topic === t.id ? "border-ink bg-ink text-primary-foreground" : "border-border-strong bg-card hover:border-ink",
                      errors.topic && form.topic !== t.id && "border-error",
                    )}
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={t.id}
                      data-field={i === 0 ? "topic" : undefined}
                      checked={form.topic === t.id}
                      onChange={() => set("topic", t.id)}
                      className="sr-only"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
              <FieldError id="ask-topic-error" error={errors.topic} />
            </fieldset>

            <Field id="ask-question" label="Your question" error={errors.question} counter={`${form.question.length}/${LIMITS.question}`}>
              <textarea
                id="ask-question"
                data-field="question"
                rows={4}
                maxLength={LIMITS.question}
                value={form.question}
                onChange={(e) => set("question", e.target.value)}
                aria-invalid={!!errors.question}
                aria-describedby={errors.question ? "ask-question-error" : undefined}
                className={cn(input, "min-h-28 resize-y py-3")}
              />
            </Field>

            {/* Honeypot: off-screen, out of the tab order, and announced to nobody. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-body-md text-muted-foreground">
                <input
                  type="checkbox"
                  data-field="consent"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "ask-consent-error" : undefined}
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-ink"
                />
                <span>Paraa Capital may call or email me about this question. Nothing else, and no marketing.</span>
              </label>
              <FieldError id="ask-consent-error" error={errors.consent} />
            </div>

            {status.kind === "failed" && (
              <p role="alert" className="rounded-md border border-error/40 bg-error/10 p-4 text-body-md text-foreground">
                We couldn&rsquo;t send your question just now. What you typed is still here; please try again in a few minutes,
                or write to the advisor desk at [email] <ToConfirm />
              </p>
            )}

            <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-body-sm text-faint">We use your details only to answer this question.</p>
              <Button type="submit" size="lg" disabled={status.kind === "sending"} className="w-full sm:w-auto">
                {status.kind === "sending" ? "Sending…" : "Send my question"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  counter,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  counter?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-body-md font-semibold text-foreground">
          {label} {optional && <span className="font-normal text-faint">(optional)</span>}
        </label>
        {counter && <span className="text-body-sm text-faint num">{counter}</span>}
      </div>
      {children}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-body-sm font-semibold text-foreground">
      <span aria-hidden className="mt-1 size-2 shrink-0 rounded-full bg-error" />
      {error}
    </p>
  );
}
