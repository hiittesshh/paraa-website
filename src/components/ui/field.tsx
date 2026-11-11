// Form fields (spec §4.16, §7.2). Visible labels, no placeholders (a placeholder isn't a label), the
// helper *before* the control so the reason is read before typing, and the error after it. Optional
// fields say "(optional)" in the label; required fields have no mark.
//
// States: hover → ink border; focus-visible → ring + ink border; error → red border + 1px inset red ring
// (the text doesn't shift), message, aria-invalid; read-only (while sending) → the alternate fill, still
// selectable. `disabled` is not used.
//
// Usage:
//   <Field id="ask-phone" label="Mobile number" helper="Indian mobile, 10 digits. …" error={errors.phone}>
//     {(control) => <PhoneInput {...control} name="phone" value={phone} onChange={…} />}
//   </Field>
import type { ComponentProps, ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

/** What a Field hands its control: the id, the describedby ids that exist, and aria-invalid. */
export type FieldControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
};

const helpId = (id: string) => `${id}-help`;
const errorId = (id: string) => `${id}-error`;

/** "{id}-help {id}-error", only the ids that exist. */
export function describedBy(id: string, { helper, error }: { helper?: boolean; error?: boolean }) {
  const ids = [helper && helpId(id), error && errorId(id)].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function Field({
  id,
  label,
  helper,
  error,
  after,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  helper?: ReactNode;
  /** The message from validateRequest, or nothing. */
  error?: ReactNode;
  /** Between the control and the error: the question's character counter. */
  after?: ReactNode;
  className?: string;
  children: (control: FieldControlProps) => ReactNode;
}) {
  const control: FieldControlProps = {
    id,
    "aria-describedby": describedBy(id, { helper: !!helper, error: !!error }),
    ...(error ? { "aria-invalid": true as const } : {}),
  };
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="mb-2 block text-body-md font-semibold text-foreground">
        {label}
      </label>
      {helper && (
        <p id={helpId(id)} className="mb-2 text-body-md text-muted-foreground">
          {helper}
        </p>
      )}
      {children(control)}
      {after}
      {error && <FieldError id={errorId(id)}>{error}</FieldError>}
    </div>
  );
}

/** A field's error line: a red icon, then the message in ink (red is never text). */
export function FieldError({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <p id={id} className={cn("mt-2 flex items-start gap-2 text-body-md font-semibold text-foreground", className)}>
      <CircleAlert aria-hidden className="mt-[3px] size-4 shrink-0 text-error" />
      <span>{children}</span>
    </p>
  );
}

const CONTROL =
  "w-full rounded-lg border border-input bg-card px-4 text-body-lg text-foreground transition-colors duration-150 hover:border-foreground focus-visible:border-foreground read-only:bg-background-alt aria-invalid:border-error aria-invalid:ring-1 aria-invalid:ring-error aria-invalid:ring-inset";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("h-12", CONTROL, className)} {...props} />;
}

/** The mobile number: a "+91" adornment (decorative; the helper says "Indian mobile") and tel keyboards. */
export function PhoneInput({ className, ...props }: Omit<ComponentProps<"input">, "type" | "inputMode">) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-body-lg text-placeholder"
      >
        +91
      </span>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        className={cn("h-12", CONTROL, "num pl-13", className)}
        {...props}
      />
    </div>
  );
}

export function Textarea({ className, rows = 4, ...props }: ComponentProps<"textarea">) {
  return <textarea rows={rows} className={cn(CONTROL, "min-h-32 resize-y py-3", className)} {...props} />;
}

/**
 * The question's counter: rendered only from `showFrom` characters (800), "{n} / 1,000", and at the limit
 * "1,000 / 1,000, the limit". Pass it to Field's `after`.
 */
export function CharacterCounter({ length, max, showFrom = 800 }: { length: number; max: number; showFrom?: number }) {
  if (length < showFrom) return null;
  // Grouped through the site's one formatter (Indian grouping), without the rupee sign.
  const count = (n: number) => formatINR(n).replace("₹", "");
  return (
    <p className="num mt-2 text-right text-body-md text-muted-foreground">
      {count(length)} / {count(max)}
      {length >= max && ", the limit"}
    </p>
  );
}

/**
 * The consent checkbox: native, never pre-ticked, inside a 44px label. Its error sits under the label and
 * is linked with aria-describedby.
 */
export function CheckboxField({
  id,
  label,
  error,
  className,
  ...props
}: Omit<ComponentProps<"input">, "type" | "id"> & { id: string; label: ReactNode; error?: ReactNode }) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 text-body-md text-copy">
        <input
          type="checkbox"
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, { error: !!error })}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs accent-primary"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error && <FieldError id={errorId(id)}>{error}</FieldError>}
    </div>
  );
}
