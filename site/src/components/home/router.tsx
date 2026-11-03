// A5.10 Routes for checkers: one card each for CAs, advisors and institutions. Commission
// details stay on the advisor page (rulebook R13); this card only links there.
import Link from "next/link";
import { Building2, Calculator, UserRound, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { SoonTag } from "@/components/paraa/site-link";
import { isLive } from "@/lib/routes";

const ROUTES: { href: string; icon: LucideIcon; title: string; body: ReactNode; cta: string }[] = [
  {
    href: "/cas",
    icon: Calculator,
    title: "For chartered accountants",
    body: (
      <>
        The tax pack: reporting checklist, the exchange rate behind every figure, a specimen statement. CA sign-off{" "}
        <ToConfirm />.
      </>
    ),
    cta: "For CAs",
  },
  {
    // The advisor page isn't built yet; the partner card further down this page is.
    href: "#partners",
    icon: UserRound,
    title: "For advisors",
    body: "What you can earn, what you can and can't say, and the client materials we approve.",
    cta: "For advisors",
  },
  {
    href: "/institutions",
    icon: Building2,
    title: "For institutions",
    body: (
      <>
        Entity structure, policies and the due-diligence questionnaire (<abbr title="due-diligence questionnaire">DDQ</abbr>),
        on request.
      </>
    ),
    cta: "For institutions",
  },
];

export function Router() {
  return (
    <Section id="routes" tone="alt" size="sm" labelledBy="routes-title">
      <SectionHead id="routes-title" eyebrow="Routes for checkers" title="Checking us for someone else?" />
      <ul className="grid gap-4 md:grid-cols-3">
        {ROUTES.map(({ href, icon: Icon, title, body, cta }, i) => {
          const live = isLive(href);
          const inner = (
            <>
              <span aria-hidden className="grid size-11 place-items-center rounded-md border bg-muted">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 type-h6">{title}</h3>
              <p className="mt-2 text-body-md text-muted-foreground">{body}</p>
              {live ? (
                <span className="mt-auto inline-flex min-h-11 items-center gap-1 pt-4 text-body-md font-bold text-accent">
                  {cta}
                  <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              ) : (
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-body-md font-bold text-faint">
                  {cta} <SoonTag />
                </span>
              )}
            </>
          );
          const card = "flex w-full flex-col rounded-lg border bg-card p-6 text-foreground no-underline";
          return (
            <Reveal as="li" key={href} delay={i + 1} className="flex">
              {live ? (
                <Link href={href} className={`group ${card} transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong`}>
                  {inner}
                </Link>
              ) : (
                <div className={card}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
