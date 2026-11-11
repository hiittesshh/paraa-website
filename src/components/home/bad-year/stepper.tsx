"use client";

// Prototype 2, "One at a time" (round 18g, compacted in 18h): a focused stepper. The ink card names one scenario
// at a time (previous/next arrows, and pills to jump to any of them or to "Your own") and lists its four moves;
// in "Your own" the same moves gain − and +, in place, so nothing opens below and the result beside it updates
// as you press. Beside it a before-and-after: what you invest and what it's worth after a year, with the drop
// drawn as a dashed outline (or the rise in gold), and each market's effect underneath.
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { OWN, type BadYear } from "./model";
import { MoveControl, OwnAction, PICK, ScenarioRadio } from "./parts";

export function StepperPrototype({ m }: { m: BadYear }) {
  const ids = m.presets.map((p) => p.id);
  const index = ids.indexOf(m.selected);
  const current = m.presets[index];
  const step = (by: number) => {
    const from = index === -1 ? 0 : index;
    m.choose(ids[(from + by + ids.length) % ids.length]);
  };

  const top = Math.max(m.amount, m.r.inrValue);
  const h = (v: number) => `${(v / top) * 100}%`;
  const loss = m.r.inrValue < m.amount;

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* The scenario, one at a time. */}
      <div className="theme-ink flex flex-col gap-5 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="num text-body-md text-muted-foreground">
            {index === -1 ? "Set by you" : `Scenario ${index + 1} of ${ids.length}`}
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" size="icon" aria-label="Previous scenario" onClick={() => step(-1)}>
              <ArrowLeft aria-hidden />
            </Button>
            <Button type="button" variant="secondary" size="icon" aria-label="Next scenario" onClick={() => step(1)}>
              <ArrowRight aria-hidden />
            </Button>
          </div>
        </div>

        <p className="type-scenario">{current ? current.label : "Your own"}</p>

        {/* The moves: read-only for a scenario, − and + in "Your own". */}
        <div className="border-t pt-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4">
            <p className="text-body-md whitespace-nowrap text-muted-foreground">Over one year</p>
            <OwnAction m={m} />
          </div>
          <ul className="mt-2 grid gap-1.5">
            {m.parts.map((p) => (
              // At 320 the − / + is wider than the room beside the name, so it wraps under it.
              <li key={p.key} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <span className="min-w-0 text-body-md font-semibold">{p.label}</span>
                <MoveControl m={m} part={p} className="shrink-0" />
              </li>
            ))}
          </ul>
        </div>

        {/* The rule is on a wrapper: on the fieldset itself the legend would sit in the line. */}
        <div className="mt-auto border-t pt-4">
          <fieldset className="min-w-0">
            <legend className="mb-2 text-body-md text-muted-foreground">Or jump to</legend>
            <div className="flex flex-wrap gap-2">
              {[...m.presets.map((p) => ({ id: p.id, label: p.label })), { id: OWN, label: "Your own" }].map((p) => (
                <ScenarioRadio
                  key={p.id}
                  id={`what-if-scenario-${p.id}`}
                  value={p.id}
                  checked={m.selected === p.id}
                  onSelect={() => m.choose(p.id)}
                  className={cn(PICK, "inline-flex min-h-10 items-center rounded-full px-3.5 text-body-md font-semibold")}
                >
                  {p.label}
                </ScenarioRadio>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Before and after. */}
      <figure className="flex flex-col rounded-2xl border p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="text-body-md text-muted-foreground">Your {formatINR(m.amount)} after one year</p>
            <p className="mt-1 type-result">
              <span className="num">{m.value}</span>
            </p>
          </div>
          <p
            className={cn(
              "num self-start rounded-sm px-3 py-1 text-body-md font-semibold whitespace-nowrap sm:self-auto",
              loss ? "bg-background-alt" : "bg-brand text-brand-foreground",
            )}
          >
            {formatINR(m.r.inrValue - m.amount, { signed: true })} ({m.change})
          </p>
        </div>

        <div
          aria-hidden
          className="mt-6 grid h-44 grid-cols-2 items-end gap-6 border-b px-2 sm:gap-10 sm:px-8 lg:mt-auto lg:h-56"
        >
          <div className="flex h-full flex-col justify-end">
            <div className="rounded-t-lg bg-border-strong motion-safe:transition-[height] motion-safe:duration-500" style={{ height: h(m.amount) }} />
          </div>
          <div className="relative flex h-full flex-col justify-end">
            {loss ? (
              <>
                {/* The drop: a dashed outline from the value up to where you started. */}
                <div
                  className="grid place-items-center rounded-t-lg border-2 border-b-0 border-dashed border-input text-body-md font-semibold text-muted-foreground motion-safe:transition-[height] motion-safe:duration-500"
                  style={{ height: h(m.amount - m.r.inrValue) }}
                >
                  <span className="num">{formatINR(m.r.inrValue - m.amount, { signed: true })}</span>
                </div>
                <div className="bg-foreground motion-safe:transition-[height] motion-safe:duration-500" style={{ height: h(m.r.inrValue) }} />
              </>
            ) : (
              <>
                <div className="rounded-t-lg bg-brand motion-safe:transition-[height] motion-safe:duration-500" style={{ height: h(m.r.inrValue - m.amount) }} />
                <div className="bg-foreground motion-safe:transition-[height] motion-safe:duration-500" style={{ height: h(m.amount) }} />
              </>
            )}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-6 px-2 text-center sm:gap-10 sm:px-8">
          <figcaption className="text-body-md">
            <span className="block text-muted-foreground">You invest</span>
            <span className="num font-semibold">{formatINR(m.amount)}</span>
          </figcaption>
          <p className="text-body-md">
            <span className="block text-muted-foreground">After one year</span>
            <span className="num font-semibold">{m.value}</span>
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-4">
          {m.parts.map((part) => (
            <div key={part.key}>
              <dt className="text-body-md text-muted-foreground">{part.label}</dt>
              <dd className="num text-body-md font-semibold">
                {part.amount === 0 ? "₹0" : formatINR(part.amount, { signed: true })}
              </dd>
            </div>
          ))}
        </dl>
        <Disclosure id="rupee-both-v1" as="p" className="mt-3 text-body-md text-muted-foreground" />
      </figure>
    </div>
  );
}
