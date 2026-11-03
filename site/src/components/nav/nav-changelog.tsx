// A6.5 NAV changelog (full diff-row timeline). Built and kept so it can be switched back on in
// one edit, but NOT rendered: the user asked to drop the NAV changelog (see app/nav/page.tsx).
import { Badge, Illustrative, Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";

export function NavChangelog() {
  return (
    <Section id="changelog" labelledBy="changelog-title">
      <SectionHead
        id="changelog-title"
        title="When we change a number, we say so"
        lede="Software teams publish changelogs. We publish one for the NAV. Every revision, why it happened, and who signed it."
      />
      <Illustrative className="mb-8" />
      <ol className="space-y-6 border-l-2 border-border-strong pl-6">
        <Reveal as="li" delay={1}>
          <div className="mb-1 flex flex-wrap items-center gap-2 text-body-sm text-muted-foreground">
            <time dateTime="2026-09-12">12 Sep 2026</time>
            <Badge tone="pending">Revised</Badge>
          </div>
          <p className="text-body-lg">
            Basket 1, NAV for 31 Aug 2026: <del className="text-faint">11.04</del> → <ins className="font-bold no-underline">11.02</ins>
          </p>
          <p className="text-body-md text-muted-foreground">A price for one holding came in late and was lower than the estimate we used.</p>
          <p className="mt-1 text-body-sm text-muted-foreground">
            Signed: Administrator <ToConfirm /> · Reviewed: Risk officer <ToConfirm />
          </p>
        </Reveal>
        <Reveal as="li" delay={2}>
          <div className="mb-1 flex flex-wrap items-center gap-2 text-body-sm text-muted-foreground">
            <time dateTime="2026-02-03">3 Feb 2026</time>
            <Badge>Methodology</Badge>
          </div>
          <p className="text-body-md text-muted-foreground">
            We now value holdings at the 4 pm New York close instead of the last available price. No past NAV changed.
          </p>
          <p className="mt-1 text-body-sm text-muted-foreground">
            Signed: Valuation committee <ToConfirm />
          </p>
        </Reveal>
        <Reveal as="li" delay={3}>
          <div className="mb-1 flex flex-wrap items-center gap-2 text-body-sm text-muted-foreground">
            <time dateTime="2024-07-01">1 Jul 2024</time>
            <Badge>Launch</Badge>
          </div>
          <p className="text-body-md text-muted-foreground">Basket 1 opened at US$10.00 per unit.</p>
        </Reveal>
      </ol>
    </Section>
  );
}
