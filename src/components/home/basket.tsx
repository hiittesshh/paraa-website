"use client";

// "What's inside": the one international basket, explored a part at a time. A proportional bar
// shows the split; three real ARIA tabs (arrow / Home / End keys, one focus stop) pick the part,
// and its panel answers the same four questions in the same order for every part, so they can be
// compared. Beside it, "How you hold it": the facts that are the same for the whole basket.
// The selected tab is shown three ways (ink border, gold-50 fill, the bar segment staying full
// strength), never by colour alone.
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Illustrative, Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { SLEEVES, type SleeveId } from "@/lib/basket";
import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SLEEVE_INFO } from "./sleeve-info";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const pct = (w: number) => formatPct(w, { digits: 0, signed: false });

const QUESTIONS: { key: "what" | "why" | "moves" | "risk"; label: string }[] = [
  { key: "what", label: "What it is" },
  { key: "why", label: "Why it’s in the basket" },
  { key: "moves", label: "What moves it" },
  { key: "risk", label: "What can go wrong" },
];

export function Basket() {
  const base = useId();
  const [active, setActive] = useState<SleeveId>(SLEEVES[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const i = SLEEVES.findIndex((s) => s.id === active);
    const last = SLEEVES.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(SLEEVES[next].id);
    tabs.current[next]?.focus();
  }

  const sleeve = SLEEVES.find((s) => s.id === active)!;
  const info = SLEEVE_INFO[active];

  return (
    <Section id="basket" labelledBy="basket-title">
      <SectionHead
        id="basket-title"
        eyebrow="What’s inside"
        title="One basket, three jobs"
        lede="Each part is there for a different reason. They tend to move for different reasons too, so a bad month for one isn’t always a bad month for the others. The basket can still fall."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <Reveal>
          {/* The split, to scale. Decorative: the tabs below carry the same numbers as text. */}
          <div aria-hidden className="flex h-4 gap-1 overflow-hidden rounded-full">
            {SLEEVES.map((s) => (
              <motion.span
                key={s.id}
                className={cn("h-full rounded-full", SLEEVE_INFO[s.id].swatch)}
                style={{ flexBasis: `${s.weight * 100}%` }}
                animate={{ opacity: s.id === active ? 1 : 0.3 }}
                transition={{ duration: 0.25, ease: EASE }}
              />
            ))}
          </div>

          <div role="tablist" aria-label="Parts of the basket" onKeyDown={onKey} className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {SLEEVES.map((s, i) => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${base}-tab-${s.id}`}
                  aria-selected={on}
                  aria-controls={`${base}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "flex min-h-11 cursor-pointer flex-col items-start rounded-md border px-3 py-3 text-left transition-[border-color,background-color,box-shadow] duration-200 ease-out-soft sm:px-4",
                    on ? "border-ink bg-gold-50 shadow-card" : "bg-card hover:border-border-strong hover:bg-background-alt",
                  )}
                >
                  <span className="flex items-center gap-2 text-body-sm font-extrabold tracking-[0.06em] text-muted-foreground uppercase">
                    <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", SLEEVE_INFO[s.id].swatch)} />
                    {s.name}
                  </span>
                  <span className="mt-1 type-h4 text-foreground num">{pct(s.weight)}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 flex items-center gap-2 text-body-sm text-faint">
            Weights <Illustrative /> <ToConfirm />
          </p>

          <div
            id={`${base}-panel`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${active}`}
            className="mt-6 rounded-lg border bg-card p-5 shadow-card sm:p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: EASE }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="type-h4">{sleeve.name}</h3>
                  {info.tag && <span className="text-body-sm font-bold text-accent">{info.tag}</span>}
                </div>
                <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {QUESTIONS.map((q) => (
                    <div key={q.key} className={cn(q.key === "risk" && "rounded-md border-l-2 border-error bg-error/5 py-2 pr-2 pl-3")}>
                      <dt className="text-body-sm font-extrabold tracking-[0.06em] text-foreground uppercase">{q.label}</dt>
                      <dd className="mt-1 text-body-md text-muted-foreground">{info[q.key]}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <HowYouHoldIt />
        </Reveal>
      </div>
    </Section>
  );
}

const FACTS: { term: string; detail: ReactNode }[] = [
  {
    term: "What you own",
    detail: (
      <>
        Units of the basket. The basket holds derivative contracts that track these assets, so you don&rsquo;t own the
        shares, barrels or bars yourself. Where the contracts are held: <ToConfirm />
      </>
    ),
  },
  {
    term: "Its price",
    detail: (
      <>
        One <abbr title="net asset value">NAV</abbr> a day (the price of one unit), in US dollars. Each morning we publish
        the price for the day before.
      </>
    ),
  },
  { term: "When you buy", detail: "Money you invest gets units at the next NAV, usually the next day." },
  { term: "How", detail: "Once, or every month with a monthly plan." },
  {
    term: "Minimum",
    detail: (
      <>
        US$100, about ₹8,800 at ₹88 to the dollar <ToConfirm />
      </>
    ),
  },
  {
    term: "Lock-in",
    detail: (
      <>
        You can take money out once your lock-in ends, not before. How long it is: <ToConfirm />
      </>
    ),
  },
];

function HowYouHoldIt() {
  return (
    <aside aria-labelledby="hold-title" className="rounded-lg border bg-background-alt p-5 sm:p-6">
      <h3 id="hold-title" className="type-h5">
        How you hold it
      </h3>
      <p className="mt-1 text-body-md text-muted-foreground">The same for the whole basket.</p>
      <dl className="mt-5 divide-y divide-border">
        {FACTS.map((f) => (
          <div key={f.term} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[120px_1fr] sm:gap-4">
            <dt className="text-body-md font-bold text-foreground">{f.term}</dt>
            <dd className="text-body-md text-muted-foreground">{f.detail}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
