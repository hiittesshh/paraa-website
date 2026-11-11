// Inline status boxes (spec §4.17). Never a toast, never auto-dismissed.
// `info`: the tools' <noscript> line. `error`: the form's 503, failure and offline states; it is
// role="alert" and takes focus when it appears (tabIndex -1, so no ring is drawn on it).
//
// The error variant focuses itself on mount, so render it from a client component (AskForm). To move focus
// to it again for a repeat failure, give it a new `key` (for example the attempt number).
import type { ReactNode } from "react";
import { CircleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Module-level, so its identity is stable and React calls it once on mount, not on every render.
const focusOnMount = (el: HTMLDivElement | null) => {
  el?.focus();
};

export function Alert({
  variant,
  title,
  actions,
  className,
  children,
}: {
  variant: "info" | "error";
  /** Rendered as h3.type-subhead. */
  title?: ReactNode;
  /** Buttons (secondary, md), e.g. "Try again" and "Copy my question". */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const isError = variant === "error";
  const Icon = isError ? CircleAlert : Info;
  return (
    <div
      {...(isError ? { role: "alert", tabIndex: -1, ref: focusOnMount } : {})}
      className={cn(
        "flex gap-3 rounded-sm border p-4",
        isError ? "border-error bg-card" : "border-border bg-muted text-body-md text-foreground",
        className,
      )}
    >
      <Icon aria-hidden className={cn("size-5 shrink-0", isError && "text-error")} />
      <div className="min-w-0">
        {title && <h3 className="type-subhead">{title}</h3>}
        <p className={cn("text-body-md text-copy", title && "mt-1")}>{children}</p>
        {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
