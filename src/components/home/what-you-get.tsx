"use client";

// "What you get with Paraa": Wise's "Excellent everywhere", measured from their live page. A white band, a
// huge uppercase heading, two 78px round arrows, and 392x542 cards running off the right of the screen.
// Pressing next steps the first card back: over one second it shrinks to half its size and fades out,
// behind the card sliding into its place, while the rest move along. There's no scrollbar; the previous
// arrow is grey and disabled at the start, the next one at the end, and phones can swipe.
//
// Wise fills these with customer reviews. We have none yet and won't invent any, so they state plain
// facts about the product. Real reviews can go in the same cards once they exist.
import { useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, BadgeIndianRupee, Landmark, Layers, Repeat, UserCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CARDS: { icon: LucideIcon; title: string; body: string; dark?: boolean }[] = [
  {
    icon: BadgeIndianRupee,
    title: "Invest in rupees",
    body: "You add money in rupees by UPI or bank transfer, and you withdraw in rupees.",
  },
  {
    icon: Layers,
    title: "One basket, three markets",
    body: "US stocks, gold and crude oil at one price per unit, updated daily.",
    dark: true,
  },
  {
    icon: UserCheck,
    title: "Talk to a CA",
    body: "Ask a chartered accountant your questions before you decide. Your CA may be paid by us.",
  },
  {
    icon: Repeat,
    title: "Once or every month",
    body: "Invest when you like, or set up a monthly plan that invests from your Paraa wallet.",
    dark: true,
  },
  {
    icon: Landmark,
    title: "Paid only to you",
    body: "Withdrawals are in rupees, only to a bank account in your name.",
  },
];

const SWIPE = 48;

export function WhatYouGet() {
  const [index, setIndex] = useState(0);
  const swipeFrom = useRef<number | null>(null);
  const last = CARDS.length - 1;
  const go = (next: number) => setIndex(Math.min(last, Math.max(0, next)));

  const onUp = (e: PointerEvent) => {
    if (swipeFrom.current === null) return;
    const moved = e.clientX - swipeFrom.current;
    swipeFrom.current = null;
    if (Math.abs(moved) > SWIPE) go(index + (moved < 0 ? 1 : -1));
  };

  const arrow = (on: boolean) =>
    cn(
      "grid size-16 place-items-center rounded-full transition-[background-color,color,transform] duration-200 ease-out-soft md:size-[78px]",
      on ? "cursor-pointer bg-secondary text-ink hover:bg-secondary-hover active:scale-95" : "cursor-not-allowed bg-grey-200 text-grey-500",
    );

  return (
    <section aria-labelledby="get-title" className="surface-light overflow-hidden py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-8">
        <div>
          <h2
            id="get-title"
            className="text-[48px] leading-[0.92] font-extrabold tracking-[-0.03em] uppercase md:text-[72px] xl:text-[80px]"
          >
            What you get with Paraa
          </h2>
          <p className="mt-5 max-w-[36ch] text-body-xl text-foreground">
            The short version of everything above.
          </p>
          <div className="mt-8 flex gap-3.5">
            <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous card" className={arrow(index > 0)}>
              <ArrowLeft aria-hidden className="size-8" />
            </button>
            <button type="button" onClick={() => go(index + 1)} disabled={index === last} aria-label="Next card" className={arrow(index < last)}>
              <ArrowRight aria-hidden className="size-8" />
            </button>
          </div>
        </div>

        {/* A fixed stage: the cards are placed by transform alone, and run off the screen's right edge. */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={`Five things you get, card ${index + 1} of ${CARDS.length}`}
          onPointerDown={(e) => {
            swipeFrom.current = e.clientX;
          }}
          onPointerUp={onUp}
          onPointerCancel={() => {
            swipeFrom.current = null;
          }}
          className="relative h-[460px] touch-pan-y select-none md:h-[542px] [--card:min(82vw,392px)] [--step:calc(var(--card)+28px)]"
        >
          {CARDS.map(({ icon: Icon, title, body, dark }, i) => {
            const passed = i < index;
            return (
              <article
                key={title}
                aria-hidden={passed}
                style={{
                  transform: passed ? "translateX(0) scale(0.5)" : `translateX(calc(var(--step) * ${i - index}))`,
                  opacity: passed ? 0 : 1,
                  zIndex: passed ? 0 : CARDS.length - i + 1,
                }}
                className={cn(
                  "absolute inset-y-0 left-0 flex w-(--card) flex-col rounded-[28px] p-7 transition-[transform,opacity] duration-1000 ease-[ease] motion-reduce:duration-0",
                  dark ? "bg-ink text-secondary" : "bg-secondary text-ink",
                  passed && "pointer-events-none",
                )}
              >
                <span className="grid size-[72px] place-items-center rounded-full bg-white text-ink">
                  <Icon aria-hidden className="size-8" strokeWidth={1.75} />
                </span>
                <h3 className="mt-7 text-[28px] leading-[1.15] font-bold tracking-[-0.01em]">{title}</h3>
                <p className={cn("mt-5 text-body-xl font-medium", dark ? "text-white" : "text-ink")}>{body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
