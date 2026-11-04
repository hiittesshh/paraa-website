"use client";

// "Invest and withdraw from one app": a list on the left and the app on the right. On wide, tall screens the
// pair holds still while you scroll and the app moves through its screens, like Mercury's feature
// list. It's a CSS sticky pin, so scrolling is never taken over; each item is also a button. Phones
// and reduced motion skip the pin and use the buttons alone. With no JavaScript the first screen shows.
//
// Every screen says "Example" inside the mock, so a crop can't remove it, and none shows a value,
// gain, price or chart. Only the amounts someone paid in appear, and they're samples.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const ACCOUNT = "••4821";

type Row = { label: string; value: ReactNode };

export const SCREENS: { key: string; title: string; body: string; rows: Row[]; big?: { label: string; value: string }; note?: string }[] = [
  {
    key: "plan",
    title: "Your plan",
    body: "See what you've invested and when your next monthly investment is.",
    big: { label: "Invested so far", value: "₹60,000" },
    rows: [
      { label: "Monthly plan", value: "₹10,000" },
      { label: "Next investment", value: "5 Dec 2026" },
      { label: "Paid from", value: "Paraa wallet" },
    ],
  },
  {
    key: "invest",
    title: "Invest",
    body: "Invest from your Paraa wallet, once or every month.",
    big: { label: "Amount", value: "₹10,000" },
    rows: [
      { label: "How often", value: "Every month" },
      { label: "Paid from", value: "Paraa wallet" },
      { label: "Units bought", value: "At the next daily price" },
    ],
    note: "You add money to the wallet by UPI or bank transfer, and we verify the payment.",
  },
  {
    key: "ca",
    title: "Talk to a CA",
    body: "Ask a chartered accountant your questions before you decide.",
    rows: [
      { label: "How", value: "Send a question" },
      { label: "Then", value: "We contact you" },
      { label: "After that", value: "You decide" },
    ],
    note: "Your CA may be paid by us.",
  },
  {
    key: "withdraw",
    title: "Withdraw",
    body: "When your investment matures, move it to your wallet, then withdraw in rupees to a bank account in your name.",
    big: { label: "Withdraw to", value: ACCOUNT },
    rows: [
      { label: "Available", value: "After it matures" },
      { label: "Paid in", value: "Rupees" },
      { label: "Bank account", value: "In your name" },
    ],
    note: "Withdrawals can't go to anyone else's account.",
  },
];

export function ProductTour() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);

  // One invisible stop per screen in the tall track. Whichever crosses the middle of the window wins.
  useEffect(() => {
    const pin = window.matchMedia("(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)");
    if (!pin.matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(stopRefs.current.indexOf(e.target as HTMLDivElement));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    stopRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  function choose(i: number) {
    setActive(i);
    const stop = stopRefs.current[i];
    if (stop && stop.offsetParent && getComputedStyle(stop).display !== "none") {
      window.scrollTo({ top: stop.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + 1, behavior: "instant" });
    }
  }

  return (
    <section id="tour" data-tour aria-labelledby="tour-title" className="bg-background">
      <div ref={trackRef} className="relative lg:tall:h-[300svh] motion-reduce:lg:tall:h-auto">
        {/* The stops, spread evenly down the track. */}
        <div aria-hidden className="absolute inset-0 hidden grid-rows-4 lg:tall:grid motion-reduce:lg:tall:hidden">
          {SCREENS.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => {
                stopRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16 lg:tall:sticky lg:tall:top-0 lg:tall:h-svh lg:tall:py-0 motion-reduce:lg:tall:static motion-reduce:lg:tall:h-auto motion-reduce:lg:tall:py-28">
          <div>
            <h2 id="tour-title" className="type-h2 text-balance">
              Invest and withdraw from one app
            </h2>
            <ul className="mt-8 border-b">
              {SCREENS.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.key} className="border-t">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => choose(i)}
                      className="w-full cursor-pointer rounded-sm py-4 text-left"
                    >
                      <span className={cn("flex items-center gap-3 text-body-lg font-bold transition-colors duration-200", on ? "text-foreground" : "text-faint hover:text-foreground")}>
                        <span aria-hidden className={cn("size-2 rounded-full transition-colors duration-200", on ? "bg-secondary" : "bg-border-strong")} />
                        {s.title}
                      </span>
                      {/* All four stay in the page, so they're readable with no script and by screen readers. */}
                      <span
                        className={cn(
                          "grid pl-5 text-body-md text-muted-foreground transition-[grid-template-rows,opacity] duration-300 ease-out-soft",
                          on ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">{s.body}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <AppWindow active={active} />
        </div>
      </div>
    </section>
  );
}

/**
 * The same app at full size, for the hero's flight: one element that starts small inside the laptop,
 * ends whole on the dark page, then slides aside to become the tour. Laid out at a fixed size (the
 * laptop screen's shape) so the camera can scale it. Each screen's content sits in the left
 * DESK_TUCKED_W, so on a narrower screen the side panels can be tucked away with every figure in view.
 */
export const DESK_W = 1160;
export const DESK_H = 723;
export const DESK_TUCKED_W = 782;

export function AppDesktop({ active }: { active: number }) {
  return (
    <figure
      style={{ width: DESK_W, height: DESK_H }}
      className="flex overflow-hidden rounded-xl border bg-card text-left shadow-[0_24px_80px_rgb(0_0_0/0.5)]"
    >
      <div aria-hidden className="w-52 shrink-0 border-r p-5">
        <div className="mb-6 flex items-center gap-2 text-body-lg font-bold">
          <span className="size-7 rounded-full bg-secondary" />
          Paraa
        </div>
        {SCREENS.map((s, i) => (
          <div
            key={s.key}
            className={cn(
              "mb-1 rounded-sm px-3 py-2.5 text-body-md font-semibold transition-colors duration-200",
              i === active ? "bg-muted text-foreground" : "text-faint",
            )}
          >
            {s.title}
          </div>
        ))}
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-[520px_minmax(0,1fr)] grid-rows-[1fr_auto] gap-x-6 gap-y-4 p-8">
        <div className="grid *:[grid-area:1/1]">
          {SCREENS.map((s, i) => (
            <div
              key={s.key}
              aria-hidden={i !== active}
              className={cn("transition-opacity duration-200 ease-out-soft", i === active ? "opacity-100" : "invisible opacity-0")}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="type-h2">{s.title}</span>
                <span className="rounded-full border border-border-strong px-3 py-0.5 text-body-md font-semibold">Example</span>
              </div>
              <p className="mt-2 text-body-lg text-muted-foreground">{s.body}</p>

              <div className="mt-5 rounded-lg border bg-background p-6">
                {s.big ? (
                  <>
                    <p className="text-body-md text-muted-foreground">{s.big.label}</p>
                    <p className="type-h1 num">{s.big.value}</p>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="grid size-14 place-items-center rounded-full bg-secondary text-body-lg font-bold text-ink">CA</span>
                    <span className="type-h6">A chartered accountant</span>
                  </div>
                )}
                <dl className="mt-5">
                  {s.rows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4 border-t py-3 text-body-lg">
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd className="text-right font-semibold num">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {s.note && <p className="mt-4 rounded-md bg-muted px-4 py-3 text-body-md text-muted-foreground">{s.note}</p>}
            </div>
          ))}
        </div>

        {/* The rest of the account, visible while the window is whole. */}
        <div aria-hidden className="row-span-2 flex flex-col gap-3">
          {[
            ["Price", "One price per unit, updated daily."],
            ["Your bank account", "Withdrawals go only to a bank account in your name."],
            ["Security", "We never ask you to share your OTP or PIN."],
          ].map(([title, line]) => (
            <div key={title} className="rounded-lg border bg-background p-5">
              <p className="text-body-lg font-bold">{title}</p>
              <p className="mt-1 text-body-md text-muted-foreground">{line}</p>
            </div>
          ))}
          <div className="mt-auto rounded-lg bg-secondary p-5 text-ink">
            <p className="text-body-lg font-bold">Talk to a CA</p>
            <p className="mt-1 text-body-md">Ask a chartered accountant before you decide.</p>
          </div>
        </div>

        <div aria-hidden className="grid grid-cols-3 gap-3 self-end">
          {[
            ["Invest", "Once or every month"],
            ["Talk to a CA", "Before you decide"],
            ["Withdraw", "After your investment matures"],
          ].map(([title, line]) => (
            <div key={title} className="rounded-lg border bg-background p-4">
              <p className="text-body-md font-bold">{title}</p>
              <p className="mt-1 text-body-md text-muted-foreground">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

/** The app, drawn as one window whose screens cross-fade in place. */
function AppWindow({ active }: { active: number }) {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-xl border bg-card shadow-[0_24px_80px_rgb(0_0_0/0.45)]">
        <div className="flex">
          <div aria-hidden className="hidden w-44 shrink-0 border-r p-4 sm:block">
            <div className="mb-5 size-7 rounded-full bg-secondary" />
            {SCREENS.map((s, i) => (
              <div
                key={s.key}
                className={cn(
                  "mb-1 rounded-sm px-3 py-2 text-body-md font-semibold transition-colors duration-200",
                  i === active ? "bg-muted text-foreground" : "text-faint",
                )}
              >
                {s.title}
              </div>
            ))}
          </div>

          <div className="grid min-w-0 flex-1 *:[grid-area:1/1]">
            {SCREENS.map((s, i) => (
              <div
                key={s.key}
                aria-hidden={i !== active}
                className={cn(
                  "min-h-96 p-6 transition-opacity duration-200 ease-out-soft sm:p-8",
                  i === active ? "opacity-100" : "invisible opacity-0",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="type-h4">{s.title}</span>
                  <span className="rounded-full border border-border-strong px-2.5 text-body-md font-semibold">Example</span>
                </div>

                {s.big && (
                  <div className="mt-6">
                    <p className="text-body-md text-muted-foreground">{s.big.label}</p>
                    <p className="type-h2 num">{s.big.value}</p>
                  </div>
                )}
                {!s.big && (
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-full bg-secondary text-body-md font-bold text-ink">CA</span>
                    <span className="text-body-lg font-semibold">A chartered accountant</span>
                  </div>
                )}

                <dl className="mt-6">
                  {s.rows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4 border-t py-3 text-body-md">
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd className="text-right font-semibold num">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                {s.note && <p className="mt-2 rounded-md bg-muted px-4 py-3 text-body-md text-muted-foreground">{s.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-body-md text-faint">
        An illustration of how it works, with sample numbers. Not a screenshot of the app, a real account, a quote or a past result.
      </figcaption>
    </figure>
  );
}
