// One cell of the hero facts row (spec §4.9). The whole cell is one link to its proof further down the
// page. Every cell is identical in treatment, "You can lose money" included: no icon, no colour, no box
// (owner decision 1). The second sentence, the limit, is set at the claim's size and weight (decision 65).
// Hover underlines the first sentence and nudges the arrow 2px; visited looks the same.
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export type FactCellData = {
  first: string;
  /** The limit or detail. Registry text (a <Disclosure as="span" />) where the spec names a disclosure id. */
  second: ReactNode;
  href: `#${string}`;
};

export function FactCell({ first, second, href }: FactCellData) {
  // A cell with a missing field renders nothing (the row then drops to three columns).
  if (!first || !second || !href) return null;

  // The arrow stays on the line of the last word, and the underline doesn't run under the gap before it.
  const split = first.lastIndexOf(" ");
  const lead = split === -1 ? "" : first.slice(0, split + 1);
  const last = split === -1 ? first : first.slice(split + 1);

  return (
    <a href={href} className="group block h-full border-t-2 border-brand pt-4 pb-1 focus-visible:outline-offset-4">
      <span className="block text-body-lg font-semibold text-foreground">
        <span className="underline-offset-[3px] group-hover:underline">{lead}</span>
        <span className="whitespace-nowrap">
          <span className="underline-offset-[3px] group-hover:underline">{last}</span>
          <ArrowRight
            aria-hidden
            className="ml-1 inline-block size-4 align-middle transition-transform duration-150 ease-out motion-safe:group-hover:translate-x-0.5"
          />
        </span>
      </span>
      {/* The limit has its claim's size and weight (decision 65); one colour step lighter, so the claim reads first. */}
      <span className="mt-1 block text-body-lg font-semibold text-copy">{second}</span>
    </a>
  );
}
