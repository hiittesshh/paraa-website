"use client";

// The two calculators behind tabs (spec §6.6, §4.12): "A bad year" (the made-up scenarios) and the tax estimate.
// Controlled, and changing the tab replaces the hash with #what-if or #tax without adding a history entry
// (spec §5.3), so a shared link opens on the same tab. Opening a tab from a link (on load, hashchange or click)
// belongs to HashHandler, which selects the tab by activating it, then scrolls to the section and focuses the
// panel's h3. The panels' cards carry the ids `what-if` and `tax`, and their h3s `what-if-title` and `tax-title`.
//
// No-JS: TabsNoScript (rendered by the server shell) hides the tab list and shows both panels stacked, each
// under its own h3.
import { useState } from "react";
import { Tab, Tabs, TabsList, TabsPanel } from "@/components/ui/tabs";
import { TaxEstimator } from "./tax-estimator";
import { WhatIf } from "./what-if";

type ToolTab = "what-if" | "tax";

const isToolTab = (value: unknown): value is ToolTab => value === "what-if" || value === "tax";

export function ToolsTabs() {
  const [tab, setTab] = useState<ToolTab>("what-if");

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        if (!isToolTab(value)) return;
        setTab(value);
        window.history.replaceState(window.history.state, "", `#${value}`);
      }}
    >
      <TabsList>
        <Tab value="what-if">A bad year</Tab>
        <Tab value="tax">Tax on your profit</Tab>
      </TabsList>
      <TabsPanel value="what-if">
        <WhatIf />
      </TabsPanel>
      <TabsPanel value="tax">
        <TaxEstimator />
      </TabsPanel>
    </Tabs>
  );
}
