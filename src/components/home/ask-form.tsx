"use client";

// The "Talk to a CA" form: name, mobile, optional email, question, consent. Validation is lib/advisor-request (the
// same function the API route runs), so the visitor sees the same messages the server would send.
// Each error sits under its field, is tied to it with aria-describedby and aria-invalid, and focus
// moves to the first one. Delivery is /api/advisor-request; if that fails, the form says so and
// keeps what was typed. A hidden "website" field catches bots (people never see it).
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LIMITS, validateRequest, type FieldErrors } from "@/lib/advisor-request";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; reference: string } | { kind: "failed" };

const EASE = [0.23, 1, 0.32, 1] as const;
const FIELD_ORDER = ["name", "phone", "email", "question", "consent"] as const;
const EMPTY = { name: "", phone: "", email: "", question: "", consent: false };

const input =
  "block w-full rounded-md border border-input bg-card px-4 text-body-lg text-foreground placeholder:text-faint transition-[border-color,box-shadow] duration-150 hover:border-grey-400 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-error";

export function AskForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  // The hero's quick field hands its number over, so nobody types it twice.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const phone = (e as CustomEvent<{ phone: string }>).detail.phone;
      setForm((f) => ({ ...f, phone }));
      formRef.current?.querySelector<HTMLElement>('[data-field="name"]')?.focus({ preventScroll: true });
    };
    window.addEventListener("paraa:prefill", onPrefill);
    return () => window.removeEventListener("paraa:prefill", onPrefill);
  }, []);

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

  return (
    <div className="surface-light rounded-xl p-6 shadow-lift sm:p-8">
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
              Thank you. We&rsquo;ve received your question.
            </h4>
            <p className="mt-2 text-body-md text-muted-foreground">
              Your reference: <strong className="text-foreground num">{status.reference}</strong>
            </p>
            <p className="mt-2 text-body-md text-muted-foreground">We&rsquo;ll contact you about it. We never ask for your OTP or PIN by call or message.</p>
            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={() => {
                setForm(EMPTY);
                setStatus({ kind: "idle" });
              }}
            >
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
            aria-label="Talk to a CA"
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

            <Field id="ask-email" label="Email (optional)" error={errors.email}>
              <input
                id="ask-email"
                data-field="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.email}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "ask-email-error" : undefined}
                className={cn(input, "h-13")}
              />
            </Field>

            <Field id="ask-question" label="Your question" error={errors.question}>
              <textarea
                id="ask-question"
                data-field="question"
                rows={4}
                maxLength={LIMITS.question}
                placeholder="For example: what are the fees, and when does it mature?"
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
                <span>Paraa Capital can contact me about this question.</span>
              </label>
              <FieldError id="ask-consent-error" error={errors.consent} />
            </div>

            {status.kind === "failed" && (
              <p role="alert" className="rounded-md border border-error/40 bg-error/10 p-4 text-body-md text-foreground">
                Sorry, we couldn&rsquo;t send your question. What you typed is still here, so please try again in a few minutes.
              </p>
            )}

            <Button type="submit" size="lg" disabled={status.kind === "sending"} className="w-full sm:w-auto">
              {status.kind === "sending" ? "Sending…" : "Send my question"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-body-md font-semibold text-foreground">
        {label}
      </label>
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
