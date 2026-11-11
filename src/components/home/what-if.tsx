"use client";

// "What could a bad year do to your money?" (round 18g; two prototypes from 18h): the shell around them.
// The card, its heading and limit, the amount, the readout, the footnote and the live region are shared; the
// prototype in the middle is the one picked in lib/bad-year-prototypes.ts, or on the page with the review
// toggle. The toggle shows in development, and on the live site only with ?prototypes or ?badyear= in the URL,
// so visitors never see it. The pick is written to ?badyear=<id>, so a reload or a shared link keeps it.
//
// No-JS: the server renders the configured prototype in its default state. The controls move natively but the
// result doesn't update; the section's <noscript> line says so.
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { createPortal } from "react-dom";
import { ButtonLink } from "@/components/ui/button";
import { ChoiceChips } from "@/components/ui/choice-chips";
import { Disclosure } from "@/components/ui/disclosure";
import { Panel } from "@/components/ui/panel";
import { ResultReadout } from "@/components/ui/tool-result";
import {
  BAD_YEAR_PROTOTYPE,
  BAD_YEAR_PROTOTYPES,
  isBadYearPrototype,
  type BadYearPrototype,
} from "@/lib/bad-year-prototypes";
import { CTA } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { AMOUNTS, useBadYear } from "./bad-year/model";
import { StepperPrototype } from "./bad-year/stepper";
import { TilesPrototype } from "./bad-year/tiles";

const noSubscribe = () => () => {};
const readQuery = () => window.location.search;

const PROTOTYPE = { tiles: TilesPrototype, stepper: StepperPrototype } as const;

/**
 * Review only: a small bar fixed to the bottom of the screen while the calculator is on it, so it never adds to
 * the card's height. Portalled to <body>, because an animated ancestor (Reveal) would otherwise trap `fixed`.
 */
function PrototypeToggle({
  panel,
  prototype,
  onPick,
}: {
  panel: RefObject<HTMLDivElement | null>;
  prototype: BadYearPrototype;
  onPick: (id: BadYearPrototype) => void;
}) {
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [panel]);
  if (!onScreen) return null;
  return createPortal(
    <div
      role="group"
      aria-labelledby="what-if-prototype"
      className="theme-ink fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center gap-1.5 rounded-xl p-1.5 shadow-float"
    >
      <span id="what-if-prototype" className="px-2 text-body-md text-muted-foreground">
        Prototype
      </span>
      {BAD_YEAR_PROTOTYPES.map((p, i) => (
        <button
          key={p.id}
          type="button"
          aria-pressed={prototype === p.id}
          onClick={() => onPick(p.id)}
          className={cn(
            "inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-body-md font-semibold transition-colors duration-150",
            prototype === p.id ? "bg-primary text-primary-foreground" : "bg-background-alt hover:bg-accent",
          )}
        >
          <span className="num opacity-70">{i + 1}</span>
          {p.label}
        </button>
      ))}
    </div>,
    document.body,
  );
}

export function WhatIf() {
  const m = useBadYear();

  // The prototype: the one picked on the page, else ?badyear=, else the configured default.
  const query = useSyncExternalStore(noSubscribe, readQuery, () => "");
  const params = new URLSearchParams(query);
  const fromUrl = params.get("badyear");
  const [picked, setPicked] = useState<BadYearPrototype | null>(null);
  const prototype = picked ?? (isBadYearPrototype(fromUrl) ? fromUrl : BAD_YEAR_PROTOTYPE);
  const showToggle = process.env.NODE_ENV !== "production" || params.has("prototypes") || params.has("badyear");
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const panel = useRef<HTMLDivElement>(null);
  const Body = PROTOTYPE[prototype];

  function pick(id: BadYearPrototype) {
    setPicked(id);
    const url = new URL(window.location.href);
    url.searchParams.set("badyear", id);
    window.history.replaceState(window.history.state, "", url);
  }

  return (
    <Panel ref={panel} id="what-if" className="lg:p-8" onPointerUp={m.live.flush} onKeyUp={m.live.flush}>
      <ResultReadout>
        Example result: <span className="font-semibold text-foreground">{m.value}</span> ({m.change})
      </ResultReadout>

      {showToggle && hydrated && <PrototypeToggle panel={panel} prototype={prototype} onPick={pick} />}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 id="what-if-title" tabIndex={-1} className="type-heading">
            What could a bad year do to your money?
          </h3>
          <Disclosure id="scenarios-v1" as="p" className="mt-1 max-w-[62ch] text-body-md text-muted-foreground" />
        </div>
        <ChoiceChips
          className="shrink-0"
          legend="If you invest"
          name="what-if-amount"
          options={AMOUNTS}
          value={String(m.amount)}
          onValueChange={(v) => m.setAmount(Number(v))}
        />
      </div>

      <Body m={m} />

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Disclosure id="whatif-foot-v1" as="p" className="text-body-md text-muted-foreground" />
        {/* The label may wrap: at 320 it's wider than the screen on one line. */}
        <ButtonLink variant="secondary" size="md" href={CTA.href} className="self-start py-2 text-left whitespace-normal sm:self-auto">

          Ask a CA what a bad year could mean for you
        </ButtonLink>
      </div>

      {m.live.region}
    </Panel>
  );
}
