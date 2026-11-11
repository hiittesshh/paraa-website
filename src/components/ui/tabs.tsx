"use client";

// Underline tabs (spec §4.12), hand-built to the WAI-ARIA APG Tabs pattern with automatic activation
// (v1.3, decision 63: no UI library for two tabs). Used once: "Run the numbers".
//   • Root: controlled `value` / `onValueChange` (so the hash can select a tab), or `defaultValue`. Context
//     only, no DOM.
//   • List: role="tablist", data-tools-tablist. ←/→ move focus *and* select, wrapping; Home/End go to the
//     ends. The browser handles Tab.
//   • Tab: a native button, role="tab", aria-selected, aria-controls, roving tabIndex (0 on the selected
//     tab, −1 on the other), data-active on the selected one. The selected bar is the tab's own 2px bottom
//     border (no indicator element), so it's server-rendered, shows without JS and, through the two
//     forced-colors classes, survives Windows contrast themes.
//   • Panel: role="tabpanel", aria-labelledby, tabIndex 0 (its first content isn't focusable; the ring is
//     drawn inset). Both panels stay mounted; the inactive one is `hidden`, never `inert`. After a tab
//     change the newly shown panel fades in over 200ms through @starting-style; the exit is instant, and
//     nothing fades on load.
// The server HTML comes from `value`, so nothing shifts on hydration, and TabsNoScript stacks both panels
// with JS off. Below 640 the two tabs are equal halves and their labels wrap; from 640 they size to their
// label.
import { createContext, use, useId, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  /** True once the selection has changed: only then does a newly shown panel fade in (never on load). */
  changed: boolean;
  select: (value: string) => void;
  tabId: (value: string) => string;
  panelId: (value: string) => string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(part: string): TabsContextValue {
  const context = use(TabsContext);
  if (!context) throw new Error(`<${part}> must be inside <Tabs>.`);
  return context;
}

/** Controlled (`value` + `onValueChange`) so the hash can select a tab; `defaultValue` for uncontrolled use. */
export function Tabs({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue);
  const [changed, setChanged] = useState(false);
  const value = valueProp ?? internal;

  const context: TabsContextValue = {
    value,
    changed,
    select: (next) => {
      if (next === value) return;
      setChanged(true);
      setInternal(next);
      onValueChange?.(next);
    },
    tabId: (v) => `${baseId}-tab-${v}`,
    panelId: (v) => `${baseId}-panel-${v}`,
  };

  return <TabsContext value={context}>{children}</TabsContext>;
}

const KEYS = new Set(["ArrowLeft", "ArrowRight", "Home", "End"]);

export function TabsList({ className, onKeyDown, ...props }: ComponentProps<"div">) {
  const { select } = useTabs("TabsList");

  const moveFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !KEYS.has(event.key)) return;
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const current = tabs.indexOf(event.target as HTMLButtonElement);
    if (current === -1 || tabs.length === 0) return;
    event.preventDefault();
    const last = tabs.length - 1;
    const next =
      event.key === "Home" ? 0
      : event.key === "End" ? last
      : event.key === "ArrowRight" ? (current === last ? 0 : current + 1)
      : current === 0 ? last
      : current - 1;
    const tab = tabs[next];
    tab.focus();
    if (tab.dataset.value !== undefined) select(tab.dataset.value);
  };

  return (
    <div
      role="tablist"
      data-tools-tablist=""
      onKeyDown={moveFocus}
      // Round 18b: a segmented control (a white track, the selected tab an ink pill), like the brand tiles.
      className={cn("flex w-full gap-1 rounded-xl bg-card p-1 sm:inline-flex sm:w-auto", className)}
      {...props}
    />
  );
}

export function Tab({
  value,
  className,
  onClick,
  ...props
}: Omit<ComponentProps<"button">, "value" | "type" | "role"> & { value: string }) {
  const tabs = useTabs("Tab");
  const selected = tabs.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={tabs.tabId(value)}
      aria-controls={tabs.panelId(value)}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      data-active={selected ? "" : undefined}
      data-value={value}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) tabs.select(value);
      }}
      className={cn(
        "inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-lg border-2 border-transparent px-3 py-2 text-center text-body-md font-semibold text-balance text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-offset-2 data-active:bg-primary data-active:text-primary-foreground data-active:hover:text-primary-foreground sm:flex-none sm:px-5 forced-colors:data-active:border-[CanvasText]",
        className,
      )}
      {...props}
    />
  );
}

/** Each panel's own heading (an h3) is its first child. Fades in over 200ms; the exit is instant. */
export function TabsPanel({
  value,
  className,
  ...props
}: Omit<ComponentProps<"div">, "role" | "hidden"> & { value: string }) {
  const tabs = useTabs("TabsPanel");
  const selected = tabs.value === value;
  return (
    <div
      role="tabpanel"
      id={tabs.panelId(value)}
      aria-labelledby={tabs.tabId(value)}
      tabIndex={0}
      hidden={!selected}
      data-tools-panel=""
      className={cn(
        "pt-6 transition-opacity duration-200 ease-out focus-visible:outline-offset-[-2px]",
        // @starting-style also applies on first render, which would fade the open panel in on load (G2).
        // Base UI only faded on a change, so the starting style is armed after the first one.
        tabs.changed && "starting:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * With JavaScript off (decision 28): hide the tab list and show both panels stacked, each under its own
 * h3. The style only exists with JS off, so it causes no layout shift for everyone else. Render it once,
 * inside the section.
 *
 * The [hidden] override sits in `@layer base` (Dev 3, QA H1): Tailwind's preflight hides `[hidden]` with
 * `display:none !important` in that layer, and an !important declaration in a layer beats an unlayered
 * one, so the override outside the layer never applied and the tax panel stayed hidden with JS off. Inside
 * the same layer its higher specificity wins.
 */
export function TabsNoScript() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html:
          "<style>[data-tools-tablist]{display:none}@layer base{[data-tools-panel][hidden]{display:block!important}}[data-tools-panel]+[data-tools-panel]{margin-top:3rem}</style>",
      }}
    />
  );
}
