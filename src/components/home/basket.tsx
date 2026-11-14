// What you're buying (owner, 13 Nov 2026: the c3 concept's scrolling markets and liquid hover, on site B). On ink,
// one market at a time: the section holds on screen while US stocks, gold and crude oil open in turn, each with its
// example weight, what it is and why it moves, and its motion graphic fills the frame at the right (market-art.tsx;
// owner, 14 Nov 2026: in place of the stand-in photographs). Without JS, under reduced motion and below 1024 × 640
// every market is a static row with its graphic.
// Then "You hold units, not the assets" set very large, rippling under a moving mouse.
import { LiquidType } from "@/components/motion/liquid-type";
import { PinnedScroll } from "@/components/motion/pinned-scroll";
import { Disclosure } from "@/components/ui/disclosure";
import { ExampleTag } from "@/components/ui/tag";
import { SLEEVES } from "@/lib/basket";
import { formatPct } from "@/lib/format";
import { MarketArt } from "./market-art";
import { ScenePicker } from "./market-scenes";
import { SLEEVE_INFO } from "./sleeve-info";
import "./basket.css";

export function Basket() {
  return (
    <PinnedScroll
      id="basket"
      labelledBy="basket-title"
      count={SLEEVES.length}
      className="mk theme-ink py-section"
      frame={
        <>
          {SLEEVES.map((s, i) => (
            <figure key={s.id} className="mk-shot" data-i={i} style={{ "--i": i } as React.CSSProperties}>
              <MarketArt id={s.id} u="frame" />
            </figure>
          ))}
          {/* The frame's furniture: which market of three, and its share of the example mix lit on the bar. */}
          <div className="mk-count num">
            {SLEEVES.map((s, i) => (
              <span key={s.id} data-i={i}>
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
            <span className="mk-count-of">/ {String(SLEEVES.length).padStart(2, "0")}</span>
          </div>
          <div className="mk-bar">
            {SLEEVES.map((s, i) => (
              <span key={s.id} data-i={i} data-sleeve={s.id} style={{ flexGrow: 1 }} />
            ))}
          </div>
        </>
      }
      after={
        <div className="container-page mk-units">
          <ScenePicker />
          <div className="mk-units-head">
            <p className="mk-eyebrow">What you own</p>
            <LiquidType>
              <h3 className="mk-units-title">
                You hold units, <span className="mk-units-soft">not the assets.</span>
              </h3>
            </LiquidType>
          </div>
          {/* The chain from what you own to what you don't: one row on a desktop, a column on a phone. */}
          <ol className="mk-chain" aria-label="How your units follow the markets">
            <li className="mk-link mk-link-own">
              <span className="mk-link-tag">You own</span>
              <span className="mk-link-name">Units of the basket</span>
              <span className="mk-link-body">What you buy with your rupees, and what you hold.</span>
            </li>
            <li className="mk-link">
              <span className="mk-link-tag">Which follow, through</span>
              <span className="mk-link-name">Derivative contracts</span>
              <span className="mk-link-body">Agreements whose value follows a price.</span>
            </li>
            <li className="mk-link mk-link-not">
              <span className="mk-link-tag">You don’t own</span>
              <span className="mk-link-name">The shares, gold or oil</span>
              <span className="mk-link-body">The basket follows their prices. You don’t own them directly.</span>
            </li>
          </ol>
        </div>
      }
    >
      <div className="mk-text">
        <h2 id="basket-title" tabIndex={-1} className="type-title">
          What you’re buying
        </h2>
        <div className="mk-example">
          <ExampleTag className="shrink-0" />
          <Disclosure id="basket-example-v1" as="p" className="text-body-md text-muted-foreground" />
        </div>
        <ol className="mk-steps">
          {SLEEVES.map((s, i) => {
            const info = SLEEVE_INFO[s.id];
            return (
              <li key={s.id} className="mk-step" data-i={i} style={{ "--i": i } as React.CSSProperties}>
                <div className="mk-head">
                  <h3 className="mk-name">{s.name}</h3>
                  <p className="mk-pct num">
                    {formatPct(s.weight, { digits: 0, signed: false })}
                    <span className="sr-only"> of the example mix</span>
                  </p>
                </div>
                <div className="mk-body">
                  <div className="mk-body-in">
                    <p className="mk-what">{info.what}</p>
                    <p className="mk-why">{info.why}</p>
                  </div>
                </div>
                <figure className="mk-inline">
                  <MarketArt id={s.id} u="row" />
                </figure>
              </li>
            );
          })}
        </ol>
        {/* Live only: the market in hand's two lines, crossfading in one fixed place so the list above never moves.
            The same lines stay in each step for screen readers (visually hidden when live). */}
        <div className="mk-detail" aria-hidden>
          {SLEEVES.map((s, i) => (
            <div key={s.id} data-i={i} className="mk-detail-item">
              <p className="mk-what">{SLEEVE_INFO[s.id].what}</p>
              <p className="mk-why">{SLEEVE_INFO[s.id].why}</p>
            </div>
          ))}
        </div>
      </div>
    </PinnedScroll>
  );
}
