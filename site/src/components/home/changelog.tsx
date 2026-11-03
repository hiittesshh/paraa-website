// A5.7 NAV changelog ("diff-row" timeline). Ported faithfully from the prototype.
// Currently commented out in app/page.tsx: it shows basket data, dropped on request.
import type { ReactNode } from "react";
import { ArrowLink, Badge, Illustrative, Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";

export function Changelog() {
  return (
    <Section id="changelog" labelledBy="changelog-title">
      <SectionHead
        id="changelog-title"
        eyebrow="NAV changelog"
        title="When we change a number, we say so"
        lede="Software teams publish changelogs. We publish one for the NAV. Every revision, why it happened, and who signed it."
      />
      <p className="-mt-6 mb-8 md:-mt-8">
        <Illustrative />
      </p>

      <ol className="relative max-w-[760px] space-y-8 border-l border-border-strong pl-6 md:pl-8">
        <Reveal as="li" delay={1} className="relative space-y-2">
          <Dot />
          <Meta date="2026-09-12" label="12 Sep 2026">
            <Badge tone="pending">Revised</Badge>
          </Meta>
          <p className="text-body-lg num">
            Basket 1, NAV for 31 Aug 2026:{" "}
            <del aria-label="was 11.04" className="text-faint">
              11.04
            </del>{" "}
            →{" "}
            <ins aria-label="now 11.02" className="font-extrabold text-foreground no-underline">
              11.02
            </ins>
          </p>
          <p className="text-body-md text-muted-foreground">A price for one holding came in late and was lower than the estimate we used.</p>
          <p className="text-body-sm text-muted-foreground">
            Signed: Administrator <ToConfirm /> · Reviewed: Risk officer <ToConfirm />
          </p>
        </Reveal>

        <Reveal as="li" delay={2} className="relative space-y-2">
          <Dot />
          <Meta date="2026-02-03" label="3 Feb 2026">
            <Badge>Methodology</Badge>
          </Meta>
          <p className="text-body-md text-muted-foreground">
            We now value holdings at the 4 pm New York close instead of the last available price. No past NAV changed.
          </p>
          <p className="text-body-sm text-muted-foreground">
            Signed: Valuation committee <ToConfirm />
          </p>
        </Reveal>

        <Reveal as="li" delay={3} className="relative space-y-2">
          <Dot />
          <Meta date="2024-07-01" label="1 Jul 2024">
            <Badge>Launch</Badge>
          </Meta>
          <p className="text-body-md text-muted-foreground">Basket 1 opened at US$10.00 per unit.</p>
        </Reveal>
      </ol>

      <ArrowLink href="/nav#changelog" className="mt-6">
        Full changelog
      </ArrowLink>
    </Section>
  );
}

function Dot() {
  return <span aria-hidden className="absolute top-2 -left-[29px] size-2.5 rounded-full border-2 border-border-strong bg-background md:-left-[37px]" />;
}

function Meta({ date, label, children }: { date: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <time dateTime={date} className="font-bold">
        {label}
      </time>
      {children}
    </div>
  );
}
