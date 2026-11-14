"use client";

// The two choices shared by the Story and 3D basket prototypes (owner, 14 Nov 2026): how much, and which made-up
// scenario. Compact, on one band, so the visual below gets the room. Native radios (one Tab stop per group).
import { ChoiceChips } from "@/components/ui/choice-chips";
import { cn } from "@/lib/utils";
import { AMOUNTS, OWN, type BadYear } from "./model";
import { MoveControl, ScenarioRadio } from "./parts";

export function Choices({ m, allowOwn = true, stacked = false, className }: { m: BadYear; allowOwn?: boolean; stacked?: boolean; className?: string }) {
  const options = [...m.presets.map((p) => ({ id: p.id, label: p.label })), ...(allowOwn ? [{ id: OWN, label: "Set your own" }] : [])];
  return (
    <div className={cn("grid gap-5", className)}>
      <div className={cn("grid gap-5", !stacked && "lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-10")}>
        <ChoiceChips
          legend="If you invest"
          name="what-if-amount"
          options={AMOUNTS}
          value={String(m.amount)}
          onValueChange={(v) => m.setAmount(Number(v))}
        />
        <fieldset className="min-w-0">
          <legend className="mb-3 text-body-md font-semibold text-foreground">And this happens over a year</legend>
          <div className="flex flex-wrap gap-2">
            {options.map((p) => (
              <ScenarioRadio
                key={p.id}
                id={`what-if-scenario-${p.id}`}
                value={p.id}
                checked={m.selected === p.id}
                onSelect={() => m.choose(p.id)}
                className="inline-flex min-h-10 items-center rounded-full border border-border-strong bg-card px-4 text-body-md font-semibold hover:border-input peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground"
              >
                {p.label}
              </ScenarioRadio>
            ))}
          </div>
        </fieldset>
      </div>
      {allowOwn && m.selected === OWN && (
        <ul className={cn("grid gap-2 rounded-xl bg-background-alt p-4", !stacked && "sm:grid-cols-2")} aria-label="Your own moves">
          {m.parts.map((p) => (
            <li key={p.key} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="text-body-md font-semibold">{p.label}</span>
              <MoveControl m={m} part={p} className="bg-card" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
