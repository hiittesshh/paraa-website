"use client";

// Prototype "Story" (owner, 14 Nov 2026: "interactive story", switchable with the 3D basket). Your money as a glowing
// pile of gold coins. Scroll, and the year plays out one event at a time: each market's own scene (the 3D city, the
// gold stack, the oil drop, a turning rupee coin) with what it did and what it did to your money, while the pile
// loses or gains coins live. It ends on the result. Same model and maths as the other prototypes (model.ts).
//
// The stage sticks under the header while its track scrolls past (one rAF-throttled scroll listener, one CSS
// variable, `data-step` only when the step changes). The pile and scenes are decorative; each step's text, and the
// live region, carry every figure.
import { useEffect, useRef, useState } from "react";
import { Disclosure } from "@/components/ui/disclosure";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { MarketArt } from "../market-art";
import { Choices } from "./choices";
import type { BadYear } from "./model";
import "./story.css";

const COINS = 20; // the pile at the start: 20 coins, each 5% of what you put in
const MAX_COINS = 30;

function happened(key: string, label: string, v: number) {
  if (key === "rupee") return v === 0 ? "The rupee didn’t move" : `The rupee got ${Math.abs(v)}% ${v > 0 ? "weaker" : "stronger"}`;
  return v === 0 ? `${label} didn’t move` : `${label} ${v < 0 ? "fell" : "rose"} ${Math.abs(v)}%`;
}

function RupeeScene({ v }: { v: number }) {
  return (
    <div className="m3 st-rupee" aria-hidden>
      <span className="m3-glow" />
      <span className={cn("st-coin", v > 0 && "is-weak", v < 0 && "is-strong")}>
        <span className="st-coin-face">₹</span>
        <span className="st-coin-face st-coin-back">$</span>
      </span>
    </div>
  );
}

export function StoryPrototype({ m }: { m: BadYear }) {
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const steps = [
    { key: "start", title: `You start with ${formatINR(m.amount)}`, note: "Spread across the basket: half in US stocks, 30% in gold, 20% in crude oil.", level: m.amount, effect: null as number | null },
    ...m.parts.map((p) => ({
      key: p.key,
      title: happened(p.key, p.label, p.value),
      note: p.key === "rupee" ? "Everything is held in dollars, so the rupee moves all of it." : p.baseNote,
      level: p.to,
      effect: p.amount,
    })),
    { key: "end", title: `After one year: ${m.value}`, note: "", level: Math.round(m.r.inrValue), effect: Math.round(m.r.inrValue) - m.amount },
  ];
  const last = steps.length - 1;
  const current = steps[step];

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) * 16 || 64;
      const r = el.getBoundingClientRect();
      const run = r.height - (innerHeight - header);
      const p = run > 0 ? Math.min(1, Math.max(0, (header - r.top) / run)) : 0;
      el.style.setProperty("--st-p", p.toFixed(4));
      setStep(Math.min(last, Math.floor(p * (last + 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [last]);

  const coins = Math.max(0, Math.min(MAX_COINS, Math.round((current.level / m.amount) * COINS)));
  const shown = Math.max(COINS, coins);

  return (
    <div className="mt-6">
      <Choices m={m} />

      <div ref={track} className="st-track mt-6" style={{ "--st-n": steps.length } as React.CSSProperties}>
        <div className="theme-ink st-stage">
          {/* The pile, and what it's worth now. */}
          <div className="st-pile-wrap">
            <div aria-hidden className="st-pile">
              {Array.from({ length: shown }, (_, i) => (
                <span
                  key={i}
                  className={cn("st-coin-disc", i >= coins && "is-gone", i >= COINS && i < coins && "is-new")}
                  style={{ "--i": i } as React.CSSProperties}
                />
              ))}
            </div>
            <p className="text-body-md text-muted-foreground">Your money now</p>
            <p className={cn("num st-amount", step === last && "text-brand")}>{formatINR(current.level)}</p>
            <ol aria-hidden className="st-dots">
              {steps.map((s, i) => (
                <li key={s.key} data-on={i <= step ? "" : undefined} />
              ))}
            </ol>
          </div>

          {/* The event. */}
          <div className="st-event">
            <div className="st-frame">
              {steps.map((s, i) => (
                <div key={s.key} className="st-scene" data-on={i === step ? "" : undefined}>
                  {s.key === "us" || s.key === "gold" || s.key === "oil" ? (
                    <MarketArt id={s.key} u={`story-${s.key}`} />
                  ) : s.key === "rupee" ? (
                    <RupeeScene v={m.rupee} />
                  ) : (
                    <div className="m3 st-pot" aria-hidden>
                      <span className="m3-glow" />
                      <span className="st-pot-mark num">{s.key === "start" ? "50 · 30 · 20" : m.change}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="st-text" aria-live="polite">
              <p className="num text-body-md text-muted-foreground">
                {step === 0 ? "The start" : step === last ? "The result" : `Event ${step} of ${last - 1}`}
              </p>
              <p className="st-title">{current.title}</p>
              {current.note && <p className="text-body-md text-copy">{current.note}</p>}
              {current.effect !== null && (
                <p className={cn("num st-effect", current.effect > 0 && "text-brand")}>
                  {current.effect === 0
                    ? "No change to your money"
                    : step === last
                      ? `${formatINR(Math.abs(current.effect))} ${current.effect < 0 ? "less" : "more"} than you put in (${m.change})`
                      : `${formatINR(current.effect, { signed: true })} to your money`}
                </p>
              )}
              {step === 0 && <p className="st-hint">Scroll to play the year ↓</p>}
              {step === last && <Disclosure id="rupee-both-v1" as="p" className="text-body-md text-muted-foreground" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
