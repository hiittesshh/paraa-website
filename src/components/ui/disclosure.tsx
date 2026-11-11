// A disclaimer or limit sentence, from the one registry (spec §4.21, R15). Never collapsed, never in a
// tooltip, never sticky or floating, never animated, at least 14px and 4.5:1.
//
// `block` is the footer's legal text. `inline` inherits the size of the claim it qualifies: pass the
// section's size and colour in `className`. `as` picks the element, so a disclosure can sit inside a
// <p> or a link's <span> without nesting a <div> where HTML doesn't allow one.
import { DEFAULT_DISCLOSURE_CONTEXT, DISCLOSURES, type DisclosureContext, type DisclosureId } from "@/content/disclosures";
import { cn } from "@/lib/utils";

export type { DisclosureId };

export function Disclosure({
  id,
  variant = "inline",
  as: Element = "div",
  className,
  context = DEFAULT_DISCLOSURE_CONTEXT,
}: {
  id: DisclosureId;
  variant?: "block" | "inline";
  as?: "div" | "p" | "span";
  className?: string;
  context?: DisclosureContext;
}) {
  return (
    <Element
      data-disclosure-id={id}
      className={cn(
        variant === "block" &&
          "max-w-[72ch] text-body-md text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground",
        className,
      )}
    >
      {DISCLOSURES[id](context)}
    </Element>
  );
}
