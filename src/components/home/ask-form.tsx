"use client";

// The "Ask a CA" form (spec §7): name, mobile, optional email, question, consent, in one column at every width.
//
// One transport (decision 41): the Server Action `askCa` through useActionState, with the permalink /#ask-form.
// - After hydration, submit validates on the client first (the same validateRequest the server runs), checks
//   that the browser is online, then calls the action from script, so the browser never reloads.
// - Before hydration or with JS off, the browser posts the form natively; the server answers with the page
//   rendered for the returned state (errors under fields, values refilled, the 503 copy, or the confirmation)
//   and lands on /#ask-form, the card, with the outcome at its top.
//
// Validation timing (decisions 43–44): a field with a value is checked on blur; a field showing an error is
// re-checked as you type; submit checks everything and focuses the first invalid field. No error summary.
//
// States: idle · sending (fields read-only, "Sending…", "Still sending" after 6s) · sent (the card shows the
// confirmation; name, mobile and email are kept for "Ask another question") · invalid · not open yet (503: no
// submit, no prompts, "Copy my question") · couldn't send (502 or network: "Try again", plus Copy from the
// second failure) · offline. A filled honeypot gets the sent state from the server and nothing is forwarded.
// Nothing is stored in localStorage or sessionStorage.
import {
  startTransition,
  useActionState,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { CircleCheck } from "lucide-react";
import { askCa } from "@/app/actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CharacterCounter, CheckboxField, Field, Input, PhoneInput, Textarea } from "@/components/ui/field";
import { TextLink } from "@/components/ui/link";
import { QuestionPrompts } from "@/components/ui/question-prompts";
import { readAskForm, type AskState, type AskValues } from "@/lib/advisor-forward";
import { LIMITS, normalisePhone, validateRequest, type FieldErrors } from "@/lib/advisor-request";
import { isLive } from "@/lib/routes";
import { cn } from "@/lib/utils";

type FieldKey = keyof AskValues;

/** The order focus looks for the first invalid field in. */
const FIELD_ORDER: readonly FieldKey[] = ["name", "phone", "email", "question", "consent"];
const FIELD_ID: Record<FieldKey, string> = {
  name: "ask-name",
  phone: "ask-phone",
  email: "ask-email",
  question: "ask-question",
  consent: "ask-consent",
};

const IDLE: AskState = { kind: "idle" };
const EMPTY: AskValues = { name: "", phone: "", email: "", question: "", consent: false };
const STILL_SENDING_MS = 6000;
const COPIED_MS = 2000;
// Shown as a link only once the page exists (spec §7.2, launch blocker 2).
const PRIVACY_HREF = "/legal/privacy";

const SENDING = "Sending your question.";
const STILL_SENDING = "Still sending. Please keep this page open.";
const NO_ROOM = "There isn’t room to add this. Edit your question first.";

/** True after hydration, false in the server HTML and before hydration (so client-only buttons aren't rendered). */
const noSubscription = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );

const valuesOf = (state: AskState): AskValues => ("values" in state ? state.values : EMPTY);
const firstInvalid = (errors: FieldErrors) => FIELD_ORDER.find((key) => errors[key]);

/** One field's message from validateRequest, given all the values. */
function fieldError(key: FieldKey, values: AskValues): string | undefined {
  const result = validateRequest(values);
  return result.ok ? undefined : result.errors[key];
}

/** Focus a field once React has drawn its error (so the error is read with it). */
function focusField(key: FieldKey | undefined) {
  if (!key) return;
  requestAnimationFrame(() => document.getElementById(FIELD_ID[key])?.focus());
}

// Module-level, so React calls it once when the element mounts, not on every render.
const focusOnMount = (el: HTMLElement | null) => {
  el?.focus();
};

export function AskForm() {
  // The permalink is the form card (v1.3, D2 S2): a pre-hydration post lands with its outcome in the first view.
  const [state, formAction, pending] = useActionState(askCa, IDLE, "/#ask-form");
  const hydrated = useHydrated();

  const [values, setValues] = useState<AskValues>(() => valuesOf(state));
  const [errors, setErrors] = useState<FieldErrors>(() => (state.kind === "invalid" ? state.fields : {}));
  // The last action state this component has taken in (to copy a server 422's errors into the fields).
  const [seen, setSeen] = useState(state);
  // "Ask another question" returns to idle without a round trip: the sent state it dismissed.
  const [dismissed, setDismissed] = useState<AskState | null>(null);
  // Offline at submit (JS only): counts up, so a repeat gets a fresh, focused alert. 0 = not offline.
  const [offline, setOffline] = useState(0);
  const [sends, setSends] = useState(0);
  const [stillSendingFor, setStillSendingFor] = useState(-1);
  const [status, setStatus] = useState("");
  const [noRoom, setNoRoom] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);

  // Anything typed before hydration (slow networks) is still in the fields: React keeps the DOM value while it
  // hydrates, but state doesn't have it, and the first re-render would write the empty state back over it (QA
  // H2: nothing typed is lost). Take it into state before that re-render.
  useLayoutEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const typed = readAskForm(new FormData(form)).values;
    setValues((current) =>
      FIELD_ORDER.some((key) => typed[key] !== current[key]) ? typed : current,
    );
  }, []);

  // A new answer from the server: show its field errors. (Adjusting state while rendering, not in an effect.)
  if (state !== seen) {
    setSeen(state);
    if (state.kind === "invalid") setErrors(state.fields);
  }

  // The server found invalid fields (422, or a post made before hydration): focus the first one.
  useEffect(() => {
    if (state.kind === "invalid") focusField(firstInvalid(state.fields));
  }, [state]);

  // "Still sending" after 6s of one send.
  useEffect(() => {
    if (!pending) return;
    const send = sends;
    const timer = setTimeout(() => setStillSendingFor(send), STILL_SENDING_MS);
    return () => clearTimeout(timer);
  }, [pending, sends]);
  const stillSending = pending && stillSendingFor === sends;

  const view: AskState = state === dismissed ? IDLE : state;
  const statusText = pending ? (stillSending ? STILL_SENDING : SENDING) : status;

  function change<K extends FieldKey>(key: K, value: AskValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // Live re-check only once a field shows an error; ticking consent clears its error.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: fieldError(key, next) }));
    if (key === "question") setNoRoom(false);
  }

  function blur(key: Exclude<FieldKey, "consent">) {
    const raw = values[key];
    if (raw.trim() === "") return; // nothing turns red from tabbing through
    const error = fieldError(key, values);
    setErrors((e) => ({ ...e, [key]: error }));
    if (key === "phone" && !error) {
      const digits = normalisePhone(raw);
      if (digits) setValues((v) => ({ ...v, phone: `${digits.slice(0, 5)} ${digits.slice(5)}` }));
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    // Always handled here after hydration: the action is called from script below.
    event.preventDefault();
    if (pending) return; // double-submit guard

    const check = validateRequest(values);
    if (!check.ok) {
      setErrors(check.errors);
      focusField(firstInvalid(check.errors));
      return;
    }
    setErrors({});
    if (!navigator.onLine) {
      setOffline((n) => n + 1);
      return;
    }
    setOffline(0);
    setStatus("");
    setNoRoom(false);
    setSends((n) => n + 1);

    const data = new FormData();
    data.set("name", values.name);
    data.set("phone", values.phone);
    data.set("email", values.email);
    data.set("question", values.question);
    if (values.consent) data.set("consent", "on");
    data.set("website", websiteRef.current?.value ?? "");
    startTransition(() => formAction(data));
  }

  function addPrompt(prompt: string) {
    if (pending) return;
    const q = values.question;
    const next = q === "" || q.endsWith("\n") ? q + prompt : `${q}\n${prompt}`;
    if (next.length > LIMITS.question) {
      setNoRoom(true);
      setStatus(NO_ROOM);
      return;
    }
    setNoRoom(false);
    setValues((v) => ({ ...v, question: next }));
    setErrors((e) => ({ ...e, question: undefined }));
    requestAnimationFrame(() => {
      const field = questionRef.current;
      if (!field) return;
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
    });
  }

  function askAnother() {
    setValues((v) => ({ ...v, question: "", consent: false }));
    setErrors({});
    setStatus("");
    setDismissed(state);
    focusField("question");
  }

  const copyQuestion = (
    <CopyButton
      label="Copy my question"
      text={() => values.question}
      select={() => {
        questionRef.current?.focus();
        questionRef.current?.select();
      }}
      onResult={setStatus}
    />
  );

  return (
    <>
      {view.kind === "sent" ? (
        // The client-only controls are passed in only after hydration (spec §7.4): with JS off the confirmation
        // ends at the OTP line, a complete state, rather than showing buttons that do nothing.
        <Sent
          reference={view.reference}
          copyReference={
            hydrated ? (
              <CopyButton
                label="Copy reference"
                text={() => view.reference}
                select={selectReference}
                onResult={setStatus}
              />
            ) : null
          }
          askAnother={
            hydrated ? (
              <Button type="button" variant="secondary" size="md" onClick={askAnother}>
                Ask another question
              </Button>
            ) : null
          }
        />
      ) : (
        <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-5">
          {/* The outcome sits at the top of the card (v1.3, D2 S2), so a post that lands on /#ask-form, with or
              without JS, shows it in the first view. */}
          {offline > 0 ? (
            <Alert
              key={`offline-${offline}`}
              variant="error"
              title="You seem to be offline"
              actions={
                <Button type="submit" variant="secondary" size="md">
                  Try again
                </Button>
              }
            >
              Nothing was sent, and what you typed is still here. Send it again when you’re back online.
            </Alert>
          ) : view.kind === "failed" ? (
            <Alert
              key={`failed-${view.attempt}`}
              variant="error"
              title="Sorry, we couldn’t send your question"
              actions={
                <>
                  {/* type="submit": resubmits the same data, before hydration too. */}
                  <Button type="submit" variant="secondary" size="md">
                    Try again
                  </Button>
                  {hydrated && view.attempt >= 2 ? copyQuestion : null}
                </>
              }
            >
              What you typed is still here. Please try again.
            </Alert>
          ) : view.kind === "not_configured" ? (
            // No retry, and no submit or prompts below (S2): a live Send under "we can't take questions" invites a
            // useless tap. Copy needs JS, so without it the alert has no button.
            <Alert
              variant="error"
              title="We can’t take questions on this website yet"
              actions={hydrated ? copyQuestion : undefined}
            >
              Nothing was sent. What you typed is still here. You can copy your question and keep it.
            </Alert>
          ) : null}

          <Field id={FIELD_ID.name} label="Your name" error={errors.name}>
            {(control) => (
              <Input
                {...control}
                name="name"
                autoComplete="name"
                maxLength={LIMITS.name}
                value={values.name}
                readOnly={pending}
                onChange={(e) => change("name", e.target.value)}
                onBlur={() => blur("name")}
              />
            )}
          </Field>

          <Field
            id={FIELD_ID.phone}
            label="Mobile number"
            helper="Indian mobile, 10 digits. We’ll use it to contact you about this question."
            error={errors.phone}
          >
            {(control) => (
              <PhoneInput
                {...control}
                name="phone"
                value={values.phone}
                readOnly={pending}
                onChange={(e) => change("phone", e.target.value)}
                onBlur={() => blur("phone")}
              />
            )}
          </Field>

          <Field id={FIELD_ID.email} label="Email (optional)" error={errors.email}>
            {(control) => (
              <Input
                {...control}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                maxLength={LIMITS.email}
                value={values.email}
                readOnly={pending}
                onChange={(e) => change("email", e.target.value)}
                onBlur={() => blur("email")}
              />
            )}
          </Field>

          {hydrated && view.kind !== "not_configured" && (
            <QuestionPrompts onPick={addPrompt} unavailable={pending} note={noRoom ? NO_ROOM : null} />
          )}

          <Field
            id={FIELD_ID.question}
            label="Your question"
            helper="At least 10 characters."
            error={errors.question}
            after={<CharacterCounter length={values.question.length} max={LIMITS.question} />}
          >
            {(control) => (
              <Textarea
                {...control}
                ref={questionRef}
                name="question"
                rows={4}
                maxLength={LIMITS.question}
                value={values.question}
                readOnly={pending}
                onChange={(e) => change("question", e.target.value)}
                onBlur={() => blur("question")}
              />
            )}
          </Field>

          <CheckboxField
            id={FIELD_ID.consent}
            name="consent"
            label="Paraa Capital can contact me about this question."
            error={errors.consent}
            checked={values.consent}
            aria-readonly={pending || undefined}
            onChange={(e) => {
              if (!pending) change("consent", e.target.checked);
            }}
          />

          {/* Honeypot: off-screen, out of the tab order, and hidden from assistive tech. People never fill it. */}
          <div aria-hidden className="sr-only">
            <label>
              Website
              <input ref={websiteRef} name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>

          <div>
            {view.kind === "not_configured" && offline === 0 ? null : (
              <Button type="submit" variant="primary" size="lg" block loading={pending}>
                {pending ? "Sending…" : "Send my question"}
              </Button>
            )}
            {stillSending ? <p className="mt-2 text-body-md text-muted-foreground">{STILL_SENDING}</p> : null}
            <p
              className={cn(
                "text-body-md text-muted-foreground",
                // With no submit above it (503), the privacy line is the block's first line.
                view.kind === "not_configured" && offline === 0 ? null : "mt-3",
              )}
            >
              Your name, mobile number, email and question go to Paraa Capital, so a CA can read your question and we
              can contact you about it.
              {isLive(PRIVACY_HREF) && (
                <>
                  {" "}
                  <TextLink href={PRIVACY_HREF}>Read our privacy notice.</TextLink>
                </>
              )}
            </p>
          </div>
        </form>
      )}

      {/* The form's one status region: sending, still sending, copied, and the prompt note. */}
      <p className="sr-only" aria-live="polite">
        {statusText}
      </p>
    </>
  );
}

/* ── The confirmation ── */

const REFERENCE_ID = "ask-reference";

/** The Copy fallback: select the reference so the browser's own copy works. */
function selectReference() {
  const el = document.getElementById(REFERENCE_ID);
  const selection = window.getSelection();
  if (!el || !selection) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  selection.removeAllRanges();
  selection.addRange(range);
}

/**
 * The confirmation, left-aligned (v1.1, N12). The two buttons are slots: AskForm passes them only after
 * hydration. "Copy reference" is a secondary button on its own line (v1.3, D1 V6), like "Copy my question".
 * Each button sits in a flex row, so its 44px height doesn't pick up a text line's strut.
 */
function Sent({
  reference,
  copyReference,
  askAnother,
}: {
  reference: string;
  copyReference: ReactNode;
  askAnother: ReactNode;
}) {
  return (
    <div className="transition-opacity duration-200 ease-out starting:opacity-0">
      <CircleCheck aria-hidden className="size-6 text-foreground" />
      <h3 ref={focusOnMount} tabIndex={-1} className="mt-4 type-heading">
        Thank you. We’ve received your question.
      </h3>
      <p className="mt-2 text-body-md text-copy">
        Your reference:{" "}
        <strong id={REFERENCE_ID} translate="no" className="num font-semibold text-foreground [overflow-wrap:anywhere]">
          {reference}
        </strong>
      </p>
      {copyReference ? <div className="mt-3 flex">{copyReference}</div> : null}
      <p className="mt-2 text-body-md text-copy">
        Keep it in case you need to mention this question. We’ll contact you about it.
      </p>
      <p className="mt-2 text-body-md text-copy">We never ask for your OTP or PIN by call or message.</p>
      {askAnother ? <div className="mt-6 flex">{askAnother}</div> : null}
    </div>
  );
}

/* ── Copy ── */

/**
 * Copies text with the clipboard API; the label reads "Copied" for 2s. If the API is missing or refuses (an
 * http:// LAN preview, a blocked permission), it selects the text instead and reads "Selected", so it never
 * fails silently. Client only: rendered after hydration.
 */
function CopyButton({
  label,
  text,
  select,
  onResult,
}: {
  label: string;
  text: () => string;
  select: () => void;
  onResult: (message: string) => void;
}) {
  const [result, setResult] = useState<"copied" | "selected" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("No clipboard API");
      await navigator.clipboard.writeText(text());
      setResult("copied");
      onResult("Copied.");
      timer.current = setTimeout(() => setResult(null), COPIED_MS);
    } catch {
      select();
      setResult("selected");
      onResult("Selected. Use your browser’s copy.");
    }
  }

  return (
    <Button type="button" variant="secondary" size="md" onClick={copy}>
      {result === "copied" ? "Copied" : result === "selected" ? "Selected" : label}
    </Button>
  );
}
