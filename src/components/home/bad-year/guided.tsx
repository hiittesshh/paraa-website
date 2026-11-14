"use client";

// Prototype 3, "Guided" (owner, 14 Nov 2026: "the calculator ui is not easy to understand"; chose "Guided, 3 steps").
// One question at a time, in the order a person thinks: 1. how much, 2. what happens over the year, 3. the answer.
// The answer reads as a plain story: what you put in, what you'd have, one sentence, and why it changed, one market
// per line, adding up to the total. Same model and maths as the other prototypes (model.ts).
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Minus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { ChoiceChips } from "@/components/ui/choice-chips";
import { Disclosure } from "@/components/ui/disclosure";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AMOUNTS, OWN, type BadYear } from "./model";
import { MoveControl, ScenarioRadio } from "./parts";

function StepLabel({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-body-lg font-semibold text-foreground">
      <span aria-hidden className="num grid size-8 shrink-0 place-items-center rounded-full bg-primary text-body-md text-primary-foreground">
        {n}
      </span>
      {children}
    </span>
  );
}

/** What each made-up scenario means, in plain words (the radio's second line). */
const PLAIN: Record<string, string> = {
  "all-fall": "Stocks, gold and oil all fall, and the rupee gets stronger",
  "stocks-fall": "US stocks fall 20%, the rest stays the same",
  "oil-falls": "Crude oil falls 40%, the rest stays the same",
  "rupee-strong": "Markets stay flat, the rupee gets 5% stronger",
  "rupee-weak": "Markets stay flat, the rupee gets 5% weaker",
};

/** "US stocks fell 25%" · "Gold didn't move" · "The rupee got 5% stronger" (+ rupee = weaker). */
function plainMove(key: string, label: string, v: number) {
  if (key === "rupee") return v === 0 ? "The rupee didn’t move" : `The rupee got ${Math.abs(v)}% ${v > 0 ? "weaker" : "stronger"}`;
  return v === 0 ? `${label} didn’t move` : `${label} ${v < 0 ? "fell" : "rose"} ${Math.abs(v)}%`;
}

// The cards view (owner, 14 Nov 2026: chose "Market cards" over a chart, coins or a list as the default). One card per
// market, picture first: its emblem, a big up or down arrow, the amount it added or took, and what it did in plain
// words. A market that didn't move is dimmed. Then the total. The list view stays behind the switch.
function Emblem({ id }: { id: string }) {
  const c = "size-9";
  if (id === "us")
    return (
      <svg viewBox="0 0 36 36" className={c} aria-hidden>
        <rect x="6" y="18" width="6" height="12" rx="1.5" fill="#F2F2F2" />
        <rect x="15" y="10" width="6" height="20" rx="1.5" fill="#FDC037" />
        <rect x="24" y="14" width="6" height="16" rx="1.5" fill="#F2F2F2" />
      </svg>
    );
  if (id === "gold")
    return (
      <svg viewBox="0 0 36 36" className={c} aria-hidden>
        <path d="M10 14H26L31 26H5Z" fill="#E5A920" />
        <path d="M10 14H26L28 18H8Z" fill="#FED987" />
        <path d="M13 16H22" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  if (id === "oil")
    return (
      <svg viewBox="0 0 36 36" className={c} aria-hidden>
        <path d="M18 5C18 5 9 17 9 22.5C9 27.5 13 31 18 31C23 31 27 27.5 27 22.5C27 17 18 5 18 5Z" fill="#151517" stroke="#FDC037" strokeWidth="1.5" />
        <path d="M14 21C14.5 18 16 15.5 17.5 13.5" stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 36 36" className={c} aria-hidden>
      <circle cx="18" cy="18" r="13" fill="none" stroke="#F2F2F2" strokeWidth="1.8" />
      <text x="18" y="23.5" textAnchor="middle" fontSize="15" fontWeight="700" fill="#F2F2F2">₹</text>
    </svg>
  );
}

function plainShort(key: string, v: number) {
  if (v === 0) return "Didn’t move";
  if (key === "rupee") return `Got ${Math.abs(v)}% ${v > 0 ? "weaker" : "stronger"}`;
  return `${v < 0 ? "Fell" : "Rose"} ${Math.abs(v)}%`;
}

function MarketCards({ m }: { m: BadYear }) {
  const diff = Math.round(m.r.inrValue) - m.amount;
  return (
    <div className="mt-6">
      <ul className="grid grid-cols-2 gap-3">
        {m.parts.map((p) => {
          const down = p.amount < 0;
          const up = p.amount > 0;
          const Arrow = down ? ArrowDown : up ? ArrowUp : Minus;
          return (
            <li
              key={p.key}
              className={cn("flex flex-col gap-3 rounded-xl p-4 motion-safe:transition-opacity motion-safe:duration-300", !down && !up && "opacity-55")}
              style={{
                background: down ? "rgb(242 242 242 / .07)" : up ? "rgb(253 192 55 / .12)" : "rgb(255 255 255 / .03)",
                boxShadow: `inset 0 0 0 1px ${up ? "rgb(253 192 55 / .45)" : "rgb(255 255 255 / .1)"}`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <Emblem id={p.key} />
                <span
                  className="grid size-9 place-items-center rounded-full"
                  style={{ background: down ? "rgb(242 242 242 / .12)" : up ? "#FDC037" : "rgb(255 255 255 / .06)", color: up ? "#272A33" : undefined }}
                >
                  <Arrow aria-hidden className="size-5" strokeWidth={2.5} />
                </span>
              </div>
              <div>
                <p className="text-body-md font-semibold">{p.key === "rupee" ? "The rupee" : p.label}</p>
                <p className="text-body-md text-muted-foreground">{plainShort(p.key, p.value)}</p>
              </div>
              <p className={cn("num text-[1.375rem] leading-none font-bold tracking-[-0.02em]", up && "text-brand")}>
                {p.amount === 0 ? "₹0" : formatINR(p.amount, { signed: true })}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex items-center justify-between gap-4 rounded-xl px-4 py-3.5" style={{ background: "linear-gradient(90deg, rgb(253 192 55 / .22), rgb(253 192 55 / .08))", boxShadow: "inset 0 0 0 1px rgb(253 192 55 / .5)" }}>
        <span className="text-body-md font-semibold">Total change</span>
        <span className="num text-[1.375rem] leading-none font-bold text-brand">{diff === 0 ? "₹0" : formatINR(diff, { signed: true })}</span>
      </div>
    </div>
  );
}

export function GuidedPrototype({ m }: { m: BadYear }) {
  const [view, setView] = useState<"cards" | "list">("cards");
  const end = Math.round(m.r.inrValue);
  const diff = end - m.amount;
  const loss = diff < 0;
  const own = m.selected === OWN;

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
      {/* Steps 1 and 2: the two choices. */}
      <div className="grid content-start gap-8">
        <ChoiceChips
          legend={<StepLabel n={1}>How much would you invest?</StepLabel>}
          name="what-if-amount"
          options={AMOUNTS}
          value={String(m.amount)}
          onValueChange={(v) => m.setAmount(Number(v))}
        />

        <fieldset className="min-w-0">
          <legend className="mb-3">
            <StepLabel n={2}>What happens over the year?</StepLabel>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {[...m.presets.map((p) => ({ id: p.id, label: p.label, plain: PLAIN[p.id] ?? p.note })), { id: OWN, label: "Set your own", plain: "Choose how each market moves" }].map((p) => (
              <ScenarioRadio
                key={p.id}
                id={`what-if-scenario-${p.id}`}
                value={p.id}
                checked={m.selected === p.id}
                onSelect={() => m.choose(p.id)}
                className="flex h-full flex-col gap-0.5 rounded-xl border border-border-strong bg-card px-4 py-3 text-left hover:border-input peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground [&_.plain]:text-muted-foreground peer-checked:[&_.plain]:text-primary-foreground/75"
              >
                <span className="text-body-md font-semibold">{p.label}</span>
                <span className="plain text-body-md">{p.plain}</span>
              </ScenarioRadio>
            ))}
          </div>

          {own && (
            <ul className="mt-4 grid gap-2 rounded-xl bg-background-alt p-4" aria-label="Your own moves">
              {m.parts.map((p) => (
                <li key={p.key} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <span className="text-body-md font-semibold">{p.label}</span>
                  <MoveControl m={m} part={p} className="bg-card" />
                </li>
              ))}
            </ul>
          )}
        </fieldset>
      </div>

      {/* Step 3: the answer, told as a plain story (owner, 14 Nov 2026: the first version was hard to understand):
          what you put in and what you'd have, one sentence, then why it changed, one market per line, adding up. */}
      <section aria-labelledby="what-if-answer" className="theme-ink flex flex-col rounded-2xl p-6 sm:p-7 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 id="what-if-answer">
            <StepLabel n={3}>Your result</StepLabel>
          </h4>
          <div role="group" aria-label="Show the result as" className="inline-flex rounded-full p-1" style={{ background: "rgb(255 255 255 / .08)" }}>
            {(["cards", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "min-h-9 cursor-pointer rounded-full px-3.5 text-body-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {v === "cards" ? "Cards" : "List"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <p>
            <span className="block text-body-md text-muted-foreground">You put in</span>
            <span className="num block text-[1.75rem] leading-tight font-bold tracking-[-0.03em]">{formatINR(m.amount)}</span>
          </p>
          <ArrowRight aria-hidden className="mb-2 size-6 text-muted-foreground" />
          <p>
            <span className="block text-body-md text-muted-foreground">After one year</span>
            <span className="num block text-[1.75rem] leading-tight font-bold tracking-[-0.03em] text-brand">{m.value}</span>
          </p>
        </div>

        <p className="mt-4 rounded-xl px-4 py-3 text-body-lg font-semibold" style={{ background: "rgb(255 255 255 / .07)" }}>
          {diff === 0
            ? "That’s the same as you put in."
            : loss
              ? `That’s ${formatINR(-diff)} less than you put in (${m.change}).`
              : `That’s ${formatINR(diff)} more than you put in (${m.change}).`}
        </p>

        {view === "cards" ? (
          <MarketCards m={m} />
        ) : (
          <>
            <h5 className="mt-6 text-body-md font-semibold text-muted-foreground">Why it changed</h5>
            <ul className="mt-2">
              {m.parts.map((p) => {
                const down = p.amount < 0;
                const Icon = p.amount === 0 ? Minus : down ? ArrowDownRight : ArrowUpRight;
                return (
                  <li key={p.key} className="flex items-center gap-3 border-t py-2.5 text-body-md">
                    <Icon aria-hidden className={cn("size-4 shrink-0", p.amount === 0 ? "text-muted-foreground" : down ? "text-copy" : "text-brand")} />
                    <span className="min-w-0 flex-1">{plainMove(p.key, p.label, p.value)}</span>
                    <span className="num font-semibold whitespace-nowrap">{p.amount === 0 ? "₹0" : formatINR(p.amount, { signed: true })}</span>
                  </li>
                );
              })}
              <li className="flex items-center justify-between gap-3 border-t-2 pt-3 text-body-lg font-bold">
                <span>Total</span>
                <span className="num">{diff === 0 ? "₹0" : formatINR(diff, { signed: true })}</span>
              </li>
            </ul>
          </>
        )}
        <Disclosure id="rupee-both-v1" as="p" className="mt-4 text-body-md text-muted-foreground" />
      </section>
    </div>
  );
}
