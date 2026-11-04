// Small shared building blocks. Every section is built from these so spacing, type and
// compliance labels stay identical across the site.
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

export { Reveal, RevealGroup, RevealItem };

/** Page section with consistent vertical rhythm. `tone="alt"` gives the alternate background. */
export function Section({
  id,
  tone = "base",
  size = "md",
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone?: "base" | "alt";
  size?: "sm" | "md";
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "alt" && "bg-background-alt",
        size === "md" ? "py-20 md:py-28" : "py-12 md:py-16",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/**
 * Heading + lede that opens most sections. On wide screens the lede sits to the right of the
 * heading, level with its last line; `stacked` keeps them in one column, for a head that lives in
 * a narrow side column. Not animated: a heading is there the moment you reach it.
 */
export function SectionHead({
  id,
  title,
  lede,
  stacked = false,
  className,
}: {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 grid content-start gap-4 md:mb-16",
        !stacked && "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16",
        className,
      )}
    >
      <h2 id={id} className="type-h2 text-balance">
        {title}
      </h2>
      {lede && <p className="max-w-[48ch] text-body-xl text-muted-foreground">{lede}</p>}
    </div>
  );
}

export function Card({ className, accent, ...props }: ComponentProps<"div"> & { accent?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 shadow-card",
        accent && "border-gold-300 bg-[linear-gradient(180deg,var(--color-gold-50),var(--card)_60%)]",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ className, tone = "neutral", ...props }: ComponentProps<"span"> & { tone?: "neutral" | "accent" | "pending" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-body-sm font-bold whitespace-nowrap",
        tone === "neutral" && "border-border bg-muted text-muted-foreground",
        tone === "accent" && "border-gold-200 bg-gold-50 text-accent",
        tone === "pending" && "border-warning bg-warning/15 text-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** Rulebook R5: any number that could be mistaken for real carries this label. */
export function Illustrative({ className }: { className?: string }) {
  return (
    <Badge tone="accent" className={className}>
      Illustrative
    </Badge>
  );
}

/** Rulebook R6: anything unconfirmed (registrations, partners, routes) is visibly marked. */
export function ToConfirm({ children = "TO CONFIRM", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        // Warning #FACC15 as a fill with Primary text: the yellow itself fails contrast as text on white.
        "inline-block rounded-sm border border-warning bg-warning/25 px-1.5 align-middle text-body-xs font-extrabold tracking-[0.06em] text-ink uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A next/link styled as a button (shadcn's Button renders a <button>, not a link). */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ArrowLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn("group inline-flex min-h-11 items-center gap-1.5 text-body-md font-bold text-accent no-underline", className)}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease-out-soft group-hover:translate-x-1" />
    </Link>
  );
}

/** Legal/disclaimer text. Plain and readable, capped at a comfortable line length. */
export function Disclosure({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <div
      data-disclosure-id={id}
      className={cn("max-w-[56ch] text-body-md text-muted-foreground [&_strong]:text-foreground", className)}
    >
      {children}
    </div>
  );
}
