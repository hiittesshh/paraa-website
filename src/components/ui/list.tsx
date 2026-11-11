// Hairline lists and definition rows (spec §4.8). Rows aren't interactive: nothing changes on hover.
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingTag = "h3" | "h4";

/* ── RuleList: a ul between two hairlines, one hairline between rows ── */

export function RuleList({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("divide-y border-y", className)} {...props} />;
}

/**
 * One RuleList row: a heading, then the body. `size="heading"` is type-heading over body-lg (the band's
 * rows); `size="subhead"` is type-subhead over body-md (the tax rules). Give the heading an `id` to make it
 * an anchor target: it then takes focus from script (tabIndex -1, no ring).
 */
export function RuleListItem({
  title,
  id,
  as: Heading = "h3",
  size = "heading",
  className,
  children,
}: {
  title: ReactNode;
  id?: string;
  as?: HeadingTag;
  size?: "heading" | "subhead";
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={cn("py-5", className)}>
      <Heading
        id={id}
        tabIndex={id ? -1 : undefined}
        className={size === "heading" ? "type-heading" : "type-subhead"}
      >
        {title}
      </Heading>
      <p className={cn("mt-2 text-copy", size === "heading" ? "text-body-lg" : "text-body-md")}>{children}</p>
    </li>
  );
}

/* ── DefinitionList: label/value rows ── */

/**
 * `size="md"`: 14px rows. `size="mock"`: 14px below 640 and 16px from 640 (the mock screens).
 * Below 360, or always with `stacked`, the label sits above the value and the value is left-aligned.
 * Rows: <DefinitionRow term="Withdraw to">••4821</DefinitionRow>.
 */
export function DefinitionList({
  size = "md",
  stacked = false,
  className,
  children,
}: {
  size?: "md" | "mock";
  stacked?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <dl
      data-size={size}
      data-stacked={stacked || undefined}
      className={cn("group/dl", className)}
    >
      {children}
    </dl>
  );
}

export function DefinitionRow({ term, children, className }: { term: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-t py-3 first:border-t-0",
        "max-[22.5rem]:flex-col max-[22.5rem]:items-start max-[22.5rem]:gap-0",
        "group-data-stacked/dl:flex-col group-data-stacked/dl:items-start group-data-stacked/dl:gap-0",
        className,
      )}
    >
      <dt className="text-body-md text-muted-foreground sm:group-data-[size=mock]/dl:text-body-lg">{term}</dt>
      <dd
        className={cn(
          "num text-right text-body-md font-semibold text-foreground sm:group-data-[size=mock]/dl:text-body-lg",
          "max-[22.5rem]:text-left group-data-stacked/dl:text-left",
        )}
      >
        {children}
      </dd>
    </div>
  );
}

/* ── StepList: a short numbered list ("What happens next") ── */

export function StepList({ steps, className }: { steps: readonly ReactNode[]; className?: string }) {
  return (
    <ol className={cn("space-y-3", className)}>
      {steps.map((step, i) => (
        <li key={i} className="flex items-center gap-3">
          {/* The ol already numbers the items for assistive tech; the visible number is decoration. */}
          <span
            aria-hidden
            className="num grid size-8 shrink-0 place-items-center rounded-full bg-primary text-body-md font-semibold text-primary-foreground"
          >
            {i + 1}
          </span>
          <span className="text-body-lg font-semibold text-foreground">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/* ── RuledItem: a 2px rule, then an optional label, a title and a body ── */

/**
 * The 2px-ruled item (How-it-works steps, "What you own"). `subgrid` lines the label, title and body up
 * across sibling columns at ≥ 1024 (the parent ol needs `lg:grid-cols-4 lg:grid-rows-[auto_auto_auto]`);
 * below 1024, and without subgrid support, the three simply stack with 8px between them.
 */
export function RuledItem({
  as: Element = "div",
  label,
  title,
  titleAs: Title = "h3",
  subgrid = false,
  className,
  titleClassName,
  bodyClassName,
  children,
}: {
  as?: "div" | "li";
  label?: ReactNode;
  title: ReactNode;
  titleAs?: HeadingTag;
  subgrid?: boolean;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  children?: ReactNode;
}) {
  const gap = subgrid ? "mt-2 lg:mt-0" : "mt-2";
  return (
    <Element
      className={cn(
        "border-t-2 border-rule pt-4",
        subgrid && "lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-y-2",
        className,
      )}
    >
      {label && <p className="type-label text-muted-foreground">{label}</p>}
      <Title className={cn("type-heading", label && gap, titleClassName)}>{title}</Title>
      {children && <p className={cn(gap, "text-body-lg text-copy", bodyClassName)}>{children}</p>}
    </Element>
  );
}
