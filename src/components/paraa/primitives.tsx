// Small shared building blocks. Every section is built from these so spacing, type and
// compliance labels stay identical across the site.
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
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
        size === "md" ? "py-16 md:py-24" : "py-12 md:py-16",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Eyebrow + heading + lede block that opens most sections. */
export function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-[720px] space-y-3 md:mb-12", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="type-h2 text-balance">
        {title}
      </h2>
      {lede && <p className="text-body-xl text-muted-foreground text-pretty">{lede}</p>}
    </Reveal>
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
      className={cn("group inline-flex min-h-11 items-center gap-1 text-body-md font-bold text-accent no-underline", className)}
      {...props}
    >
      {children}
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** Legal/disclaimer box (dashed border, small muted text). */
export function Disclosure({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <div
      data-disclosure-id={id}
      className={cn("rounded-md border border-dashed border-border-strong p-4 text-body-sm text-muted-foreground [&_strong]:text-foreground", className)}
    >
      {children}
    </div>
  );
}
