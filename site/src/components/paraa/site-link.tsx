// A link that never 404s: if the target page isn't built yet (lib/routes.ts), it renders the
// label as plain text with a "Soon" tag, so visitors see the page is planned, not broken.
import Link from "next/link";
import type { ReactNode } from "react";
import { isLive } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function SiteLink({
  href,
  className,
  pendingClassName,
  children,
}: {
  href: string;
  className?: string;
  /** Classes for the not-yet-built state (defaults to className, minus hover affordance). */
  pendingClassName?: string;
  children: ReactNode;
}) {
  if (isLive(href)) {
    const external = /^https?:/.test(href);
    return (
      <Link href={href} className={className} {...(external ? { rel: "noopener noreferrer" } : {})}>
        {children}
      </Link>
    );
  }
  return (
    <span className={cn(pendingClassName ?? className, "cursor-default gap-2 hover:text-inherit")}>
      {children}
      <SoonTag />
    </span>
  );
}

export function SoonTag() {
  return (
    <span className="rounded-sm border border-border-strong px-1.5 text-body-xs font-bold tracking-[0.06em] text-faint uppercase">
      Soon<span className="sr-only">: page coming soon</span>
    </span>
  );
}
