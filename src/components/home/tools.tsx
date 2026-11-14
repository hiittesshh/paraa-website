// "Run the numbers" (spec §6.6): the server shell around the bad-year calculator. Owner, 14 Nov 2026: the tax
// estimate ("Tax on your profit") was removed, so there are no tabs; old #tax links land here (hash-handler.tsx).
import { Alert } from "@/components/ui/alert";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatIf } from "./what-if";

export function Tools() {
  return (
    <Section id="numbers" labelledBy="numbers-title" tone="alt">
      <SectionHeader
        id="numbers-title"
        layout="split"
        title="Run the numbers"
        lede="A calculator with made-up inputs you can change. It isn’t a forecast."
      />
      <noscript>
        <Alert variant="info">
          The calculator needs JavaScript to update. The figures shown are for the starting values.
        </Alert>
      </noscript>
      <WhatIf />
    </Section>
  );
}
