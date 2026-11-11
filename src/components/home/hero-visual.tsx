// The hero's product visual (round 18, "bold brand blocks"): a realistic phone showing the Invest screen,
// standing on a gold brand block, with two detail cards floating over its edges. A Server Component: the
// entrance is CSS (globals.css .enter-rise / .enter-pop), so it plays without JavaScript, runs once, and
// reduced motion cuts it out.
//
// Honesty limits for mocks still hold: an Example tag inside the screen (a crop can't remove it), only a
// sample amount paid in, no value, return, price, percentage, allocation split or chart, and a caption
// underneath. The tab names are the real app's tabs (home, baskets, portfolio, wallet).
import type { CSSProperties, ReactNode } from "react";
import { BriefcaseBusiness, Check, House, Landmark, LayoutGrid, Wallet } from "lucide-react";
import { Disclosure } from "@/components/ui/disclosure";
import { Swatch } from "@/components/ui/allocation-bar";
import { ExampleTag } from "@/components/ui/tag";
import { SLEEVES } from "@/lib/basket";
import { cn } from "@/lib/utils";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function HeroVisual({ className }: { className?: string }) {
  return (
    <figure aria-label="Example of the Paraa app" className={cn("relative", className)}>
      <div aria-hidden className="relative px-6 pb-12 sm:px-10 lg:pb-14">
        {/* The brand block the phone stands on. */}
        <div className="absolute inset-x-0 top-14 bottom-0 overflow-hidden rounded-2xl bg-brand">
          <div className="absolute -right-16 -bottom-24 size-80 rounded-full border-[3rem] border-brand-foreground/5" />
          <div className="absolute -top-20 -left-20 size-64 rounded-full border-[2.5rem] border-brand-foreground/5" />
        </div>

        <div className="enter-rise relative mx-auto w-[min(74%,18.75rem)]" style={delay(80)}>
          <Phone />
        </div>

        <FloatCard
          className="top-24 right-0 sm:right-2 lg:-right-8 xl:-right-12"
          style={delay(420)}
          icon={<Check className="size-4" />}
          iconClass="bg-primary text-primary-foreground"
          title="Payment verified"
          line="₹10,000 added by UPI"
        />
        <FloatCard
          className="bottom-3 left-0 sm:left-2 lg:-left-8 xl:-left-12"
          style={delay(560)}
          icon={<Landmark className="size-4" />}
          iconClass="bg-brand text-brand-foreground"
          title={
            <>
              Withdraw to <span className="normal-nums">••</span>4821
            </>
          }
          line="Bank account in your name"
        />
      </div>
      <figcaption className="mt-3 text-body-md text-muted-foreground">
        <Disclosure id="mock-caption-v1" as="span" />
      </figcaption>
    </figure>
  );
}

function FloatCard({
  className,
  style,
  icon,
  iconClass,
  title,
  line,
}: {
  className?: string;
  style?: CSSProperties;
  icon: ReactNode;
  iconClass: string;
  title: ReactNode;
  line: string;
}) {
  return (
    <div
      className={cn(
        "enter-pop theme-light absolute flex w-max max-w-60 items-center gap-3 rounded-xl bg-card py-3 pr-4 pl-3 shadow-float",
        className,
      )}
      style={style}
    >
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", iconClass)}>{icon}</span>
      <span className="min-w-0">
        <span className="block text-body-md font-semibold text-foreground">{title}</span>
        <span className="block text-micro text-muted-foreground">{line}</span>
      </span>
    </div>
  );
}

function Phone() {
  return (
    <div className="rounded-phone bg-primary p-2 shadow-float">
      <div className="theme-light overflow-hidden rounded-screen bg-card text-foreground">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 text-micro font-semibold">
          <span className="num">9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-0.5 rounded-xs bg-foreground" />
            <span className="h-2.5 w-0.5 rounded-xs bg-foreground" />
            <span className="h-3 w-0.5 rounded-xs bg-foreground" />
            <span className="ml-1 h-2.5 w-5 rounded-xs border border-foreground p-px">
              <span className="block h-full w-3/4 rounded-xs bg-foreground" />
            </span>
          </span>
        </div>

        {/* App header */}
        <div className="mt-4 flex items-center justify-between px-5">
          <span translate="no" className="text-body-lg font-semibold">
            Paraa
          </span>
          <ExampleTag />
        </div>

        <p className="mt-3 px-5 type-subhead">Invest</p>

        {/* The basket card */}
        <div className="theme-ink mx-4 mt-3 rounded-xl p-4">
          <p className="type-label text-muted-foreground">Basket</p>
          <p className="mt-1 text-body-md font-semibold">US stocks, gold and crude oil</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SLEEVES.map((s) => (
              <span
                key={s.id}
                className="theme-light inline-flex items-center gap-1.5 rounded-xs px-2 py-0.5 text-micro font-semibold"
              >
                <Swatch sleeve={s.id} />
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mt-4 px-5">
          <p className="text-micro text-muted-foreground">Amount</p>
          <p className="type-figure mt-0.5">₹10,000</p>
        </div>
        <dl className="mx-5 mt-3 divide-y border-y text-body-md">
          <div className="flex justify-between gap-3 py-2">
            <dt className="text-muted-foreground">Pay from</dt>
            <dd className="font-semibold">Paraa wallet</dd>
          </div>
          <div className="flex justify-between gap-3 py-2">
            <dt className="text-muted-foreground">Units at</dt>
            <dd className="font-semibold">Next daily price</dd>
          </div>
        </dl>

        <div className="mx-4 mt-4 flex h-11 items-center justify-center rounded-sm bg-brand font-semibold text-brand-foreground">
          Invest <span className="num ml-1">₹10,000</span>
        </div>

        {/* Tab bar: the real app's four tabs */}
        <div className="mt-5 grid grid-cols-4 border-t px-2 pt-2 pb-4 text-micro">
          {[
            { icon: House, label: "Home", on: false },
            { icon: LayoutGrid, label: "Baskets", on: true },
            { icon: BriefcaseBusiness, label: "Portfolio", on: false },
            { icon: Wallet, label: "Wallet", on: false },
          ].map(({ icon: Icon, label, on }) => (
            <span
              key={label}
              className={cn("flex flex-col items-center gap-1", on ? "font-semibold text-foreground" : "text-muted-foreground")}
            >
              <Icon className="size-5" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
