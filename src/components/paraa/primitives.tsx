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

/**
 * The "side heading 4/7" layout: a heading column beside the content. `sticky` holds the heading in
 * view on tall screens while the content scrolls past; off by default.
 */
export function SideHead({
  id,
  title,
  lede,
  sticky = false,
  className,
  children,
}: {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  sticky?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16", className)}>
      <div className={cn(sticky && "lg:tall:sticky lg:tall:top-28 lg:self-start")}>
        <SectionHead id={id} stacked title={title} lede={lede} className="mb-0 md:mb-0" />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** A plain bordered panel: 24 corners, 32/24 padding, no shadow, because nothing overlaps it. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-xl border bg-card p-6 md:p-8", className)} {...props} />;
}

/** The one ink tile a section may have (fees figure, form tile). Same corners and padding as Card. */
export function InkTile({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("surface-ink rounded-xl p-6 md:p-8", className)} {...props} />;
}

/** An inner panel, sitting inside a tile or card: 16 corners on grey-50. */
export function InnerPanel({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-lg bg-background-alt p-6", className)} {...props} />;
}

/** Sits inside every mock screen, so a crop can't remove it. Mock screens show no returns, value or prices. */
export function ExampleTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink bg-card px-2.5 text-body-md font-semibold whitespace-nowrap text-ink",
        className,
      )}
    >
      Example
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

/**
 * A link inside a sentence. The invisible strip above and below brings its tap area to 44px at
 * 14px and larger, measured from the 18px-tall text box, without pushing the lines apart.
 * `tone="ink"` on an ink tile.
 */
export function InlineLink({
  className,
  tone = "base",
  ...props
}: ComponentProps<typeof Link> & { tone?: "base" | "ink" }) {
  return (
    <Link
      className={cn(
        "relative font-semibold underline underline-offset-4 transition-colors duration-150 ease-out-soft after:absolute after:inset-x-0 after:-inset-y-[13px]",
        tone === "ink" ? "text-primary-foreground hover:text-grey-300" : "text-accent hover:text-ink",
        className,
      )}
      {...props}
    />
  );
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
