// "Run the numbers" (spec §6.6): the server shell around the two calculators. The header, the no-JS line and
// the no-JS tab style are static; the tabs and the tools are the client island ToolsTabs.
import { Alert } from "@/components/ui/alert";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TabsNoScript } from "@/components/ui/tabs";
import { ToolsTabs } from "./tools-tabs";

export function Tools() {
  return (
    <Section id="numbers" labelledBy="numbers-title" tone="alt">
      <SectionHeader
        id="numbers-title"
        layout="split"
        title="Run the numbers"
        lede="Two calculators with made-up inputs you can change. Neither is a forecast."
      />
      <noscript>
        <Alert variant="info">
          The calculators need JavaScript to update. The figures shown are for the starting values.
        </Alert>
      </noscript>
      <TabsNoScript />
      <ToolsTabs />
    </Section>
  );
}
