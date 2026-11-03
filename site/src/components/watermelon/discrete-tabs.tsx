"use client";

// Adapted from Watermelon UI "discrete-tabs" (registry.watermelon.sh/r/discrete-tabs.json).
// Kept: pill tabs whose label springs open when active, plus the one-off shine sweep.
// Changed for Paraa: real ARIA tabs (tablist / tab / tabpanel, aria-selected, roving
// tabindex, arrow/Home/End keys), one focus stop per tab (the original had two), gold active
// state, and the panels rendered here so content and tab can't drift apart.
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface DiscreteTab {
  id: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

interface DiscreteTabsProps {
  tabs: DiscreteTab[];
  label: string; // accessible name of the tablist
  defaultTab?: string;
  /** "active" = Watermelon's original (only the active tab shows its label);
   *  "all" = every label visible, for menus people scan to choose (e.g. FAQ groups). */
  labels?: "active" | "all";
  className?: string;
}

export function DiscreteTabs({ tabs, label, defaultTab, labels = "active", className }: DiscreteTabsProps) {
  const base = useId();
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const [shine, setShine] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setShine(true), 500);
    return () => {
      clearTimeout(t);
      setShine(false);
    };
  }, [active]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <motion.div layout role="tablist" aria-label={label} className="flex flex-wrap items-center gap-2">
        {tabs.map((tab, i) => {
          const on = tab.id === active;
          const showLabel = on || labels === "all";
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "flex h-12 cursor-pointer items-center rounded-full border px-4 transition-colors duration-300",
                on ? "border-transparent bg-primary text-primary-foreground" : "border-border-strong bg-card text-foreground hover:border-muted-foreground",
              )}
            >
              <span aria-hidden className="flex [&_svg]:size-5">{tab.icon}</span>
              {/* Label is always in the DOM (screen readers need it); it only animates visually. */}
              <motion.span
                initial={false}
                animate={{ width: showLabel ? "auto" : 0, opacity: showLabel ? 1 : 0, marginLeft: showLabel ? 8 : 0 }}
                className="relative overflow-hidden text-body-md font-bold whitespace-nowrap"
              >
                {tab.label}
                <AnimatePresence>
                  {on && shine && (
                    <motion.span
                      aria-hidden
                      initial={{ left: "-120%" }}
                      animate={{ left: "120%" }}
                      transition={{ duration: 0.5, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-16 bg-linear-to-r from-transparent via-white/50 to-transparent"
                    />
                  )}
                </AnimatePresence>
              </motion.span>
            </button>
          );
        })}
      </motion.div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${base}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="pt-6 focus-visible:outline-offset-8"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
