"use client";

// Prototype 1, "Tiles + step by step" (round 18g, reworked in 18h): one row of six compact tiles (five made-up
// scenarios, each with its result, and "Your own"), then the ink answer beside the year step by step. "Your own"
// doesn't open a separate panel: the − and + appear on the moves in the step-by-step rows, so each change shows
// in the same row, and the answer beside it, without scrolling.
import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { OWN, type BadYear } from "./model";
import { Answer, PICK, ScenarioRadio, StepByStep } from "./parts";

export function TilesPrototype({ m }: { m: BadYear }) {
  const own = m.selected === OWN;
  const tiles = [
    ...m.presets.map((p) => ({ id: p.id, label: p.label, figure: formatPct(p.change) })),
    { id: OWN, label: "Your own", figure: own ? m.change : "Set the moves" },
  ];
  return (
    <>
      <fieldset className="mt-6 min-w-0">
        <legend className="mb-2 text-body-md font-semibold text-foreground">Pick a scenario</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((t) => (
            <ScenarioRadio
              key={t.id}
              id={`what-if-scenario-${t.id}`}
              value={t.id}
              checked={m.selected === t.id}
              onSelect={() => m.choose(t.id)}
              className={cn(PICK, "flex flex-col gap-0.5 rounded-xl px-4 py-2.5")}
            >
              <span className="text-body-md font-semibold">{t.label}</span>
              <span className="num text-body-md opacity-80">{t.figure}</span>
            </ScenarioRadio>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Answer m={m} />
        <StepByStep m={m} />
      </div>
    </>
  );
}
