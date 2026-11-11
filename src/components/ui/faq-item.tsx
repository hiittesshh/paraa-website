// One FAQ question (spec §4.18): a native <details>, so it works with JS off, announces its own
// expanded/collapsed state, and Chrome's find-in-page opens a matching closed item. Several may be open
// at once (no `name`). Questions are not headings: they use type-question (18/26 at 600, decision 61), not the
// Bold 700 type-subhead. Wrap the items in <FaqList> for the closing hairline.
// It expands over 200ms where browsers can animate ::details-content, instantly elsewhere and under RM.
import type { ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Round 18b: each question is its own rounded Light card, like the brand tiles, instead of a hairline list.
export function FaqList({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}

export function FaqItem({
  slug,
  question,
  open = false,
  className,
  children,
}: {
  /** The item's id is `faq-{slug}`: the target of #faq-{slug} links. */
  slug: string;
  question: ReactNode;
  /** Open on load (only the first item, "When can I get my money out?"). */
  open?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details
      id={`faq-${slug}`}
      open={open}
      className={cn(
        "group rounded-xl bg-background-alt px-5 transition-colors duration-150 open:bg-card open:shadow-float sm:px-6 forced-colors:border [interpolate-size:allow-keywords] [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:transition-[height,content-visibility] [&::details-content]:duration-200 [&::details-content]:[transition-behavior:allow-discrete] open:[&::details-content]:h-auto",
        className,
      )}
    >
      <summary className="group/summary flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-5 type-question text-foreground [&::-webkit-details-marker]:hidden">
        <span className="underline-offset-[3px] group-hover/summary:underline">{question}</span>
        <Plus
          aria-hidden
          className="size-5 shrink-0 text-muted-foreground transition-colors duration-150 ease-out group-open:hidden group-hover/summary:text-foreground"
        />
        <Minus
          aria-hidden
          className="hidden size-5 shrink-0 text-muted-foreground transition-colors duration-150 ease-out group-open:block group-hover/summary:text-foreground"
        />
      </summary>
      <div className="max-w-prose pb-6 text-body-lg text-copy">{children}</div>
    </details>
  );
}
