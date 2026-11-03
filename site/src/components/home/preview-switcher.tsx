// Floating A · B · C · D switcher for the hero previews only (never on the live homepage).
import Link from "next/link";
import type { HeroVariant } from "./hero";
import { cn } from "@/lib/utils";

const LABELS: Record<HeroVariant, string> = {
  a: "Tilt that settles",
  b: "Exploded receipt",
  c: "3-card fan",
  d: "Pinned journey",
};

export function PreviewSwitcher({ current }: { current: HeroVariant }) {
  return (
    <nav
      aria-label="Hero variant previews"
      className="fixed bottom-4 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-1 rounded-full border border-ink-2 bg-ink p-1 shadow-lift"
    >
      <span className="hidden px-3 text-body-sm font-bold text-grey-300 sm:inline">Hero</span>
      {(Object.keys(LABELS) as HeroVariant[]).map((v) => (
        <Link
          key={v}
          href={`/preview/${v}`}
          aria-current={v === current ? "page" : undefined}
          title={LABELS[v]}
          className={cn(
            "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-body-md font-bold no-underline transition-colors duration-200",
            v === current ? "bg-secondary text-secondary-foreground" : "text-grey-300 hover:bg-ink-2 hover:text-primary-foreground",
          )}
        >
          {v.toUpperCase()}
          <span className={cn("hidden lg:inline", v === current ? "" : "sr-only")}>{LABELS[v]}</span>
        </Link>
      ))}
    </nav>
  );
}
