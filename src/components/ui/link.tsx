// Links (spec §4.4). Visited links look the same as unvisited. In the ink band every link inherits
// the band's white and light grey through the scope. External links (any type) open in a new tab and say so.
//
// Every link is a plain <a> (v1.5, decision 68): each internal link is an in-page anchor ("/#ask", "/#faq"),
// which HashHandler takes over with JS on and the browser follows natively with JS off. There's no second
// route to navigate to, so a client-side router link would add JS and do nothing.
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type LinkProps = Omit<ComponentProps<"a">, "className" | "target" | "rel" | "href"> & {
  href: string;
  className?: string;
  /** Opens in a new tab, with ArrowUpRight and a screen-reader "(opens in a new tab)". */
  external?: boolean;
};

const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The sr-only suffix every external link carries. */
function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

/**
 * A link in a sentence (`inline`, the default) or on its own line (`standalone`, with a trailing arrow).
 * Inline links have no invisible hit strip: they're exempt from WCAG 2.5.8, and a strip overlaps the
 * lines above and below.
 */
export function TextLink({
  variant = "inline",
  external = false,
  className,
  children,
  ...props
}: LinkProps & { variant?: "inline" | "standalone"; children: ReactNode }) {
  if (variant === "standalone") {
    const Arrow = external ? ArrowUpRight : ArrowRight;
    return (
      <a
        {...props}
        {...(external ? NEW_TAB : {})}
        className={cn(
          "group inline-flex min-h-11 items-center gap-1.5 text-body-lg font-semibold text-foreground underline-offset-[3px] transition-colors duration-150 ease-out hover:underline",
          className,
        )}
      >
        {children}
        {external && <NewTabNote />}
        <Arrow
          aria-hidden
          className={cn(
            "shrink-0 transition-transform duration-150 ease-out motion-safe:group-hover:translate-x-0.5",
            external ? "size-3.5" : "size-4",
          )}
        />
      </a>
    );
  }

  return (
    <a
      {...props}
      {...(external ? NEW_TAB : {})}
      className={cn(
        "font-semibold text-foreground underline decoration-muted-foreground decoration-1 underline-offset-[3px] transition-colors duration-150 ease-out hover:decoration-foreground hover:decoration-2",
        className,
      )}
    >
      {children}
      {external && (
        <>
          <ArrowUpRight aria-hidden className="ml-0.5 inline size-3.5 align-baseline" />
          <NewTabNote />
        </>
      )}
    </a>
  );
}

/**
 * A header nav link. The current section (set by ScrollState through aria-current="location") shows
 * ink text and a 2px ink bar 6px below the text. `navId` is the section id the scrollspy matches.
 */
export function NavLink({
  navId,
  external = false,
  className,
  children,
  ...props
}: LinkProps & { navId?: string; children: ReactNode }) {
  return (
    <a
      {...props}
      {...(external ? NEW_TAB : {})}
      data-nav-id={navId}
      className={cn(
        "group inline-flex min-h-11 items-center gap-1 px-3 text-body-md font-semibold text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground aria-[current=location]:text-foreground",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span aria-hidden className="absolute inset-x-0 -bottom-2 hidden h-0.5 bg-foreground group-aria-[current=location]:block" />
      </span>
      {external && (
        <>
          <ArrowUpRight aria-hidden className="size-3.5" />
          <NewTabNote />
        </>
      )}
    </a>
  );
}

/** A footer link: at least 44 × 44 (the short "FAQ" too, QA C4), grey, ink and underlined on hover. */
export function FooterLink({ external = false, className, children, ...props }: LinkProps & { children: ReactNode }) {
  return (
    <a
      {...props}
      {...(external ? NEW_TAB : {})}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center gap-1 text-body-md text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground hover:underline",
        className,
      )}
    >
      {children}
      {external && (
        <>
          <ArrowUpRight aria-hidden className="size-3.5" />
          <NewTabNote />
        </>
      )}
    </a>
  );
}
