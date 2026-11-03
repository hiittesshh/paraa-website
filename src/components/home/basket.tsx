// "What's inside": the one international basket as three plain cards (what it is, why it's
// there, its main risk), then four key facts that hold for the whole basket.
import { CalendarClock, ChartLine, IndianRupee, Repeat } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { SLEEVES } from "@/lib/basket";
import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SLEEVE_INFO } from "./sleeve-info";

const FACTS = [
  { icon: IndianRupee, label: "Invest and withdraw in rupees" },
  { icon: Repeat, label: "Invest once, or every month" },
  { icon: ChartLine, label: "Priced daily in US dollars" },
  { icon: CalendarClock, label: "Withdraw when your lock-in ends" },
];

export function Basket() {
  return (
    <Section id="basket" labelledBy="basket-title">
      <SectionHead
        id="basket-title"
        eyebrow="The basket"
        title="Three global assets in one basket"
        lede="Each one moves for different reasons, so one bad market doesn't decide everything."
      />

      <RevealGroup as="ul" className="grid gap-4 md:grid-cols-3">
        {SLEEVES.map((s) => {
          const info = SLEEVE_INFO[s.id];
          return (
            <RevealItem as="li" key={s.id} className="flex">
              <article className="flex w-full flex-col overflow-hidden rounded-lg border bg-card shadow-card transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-lift">
                <div aria-hidden className={cn("h-1.5", info.swatch)} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="type-h5">{s.name}</h3>
                      {info.tag && <p className="mt-0.5 text-body-sm font-bold text-accent">{info.tag}</p>}
                    </div>
                    <p className="type-h3 num">{formatPct(s.weight, { digits: 0, signed: false })}</p>
                  </div>
                  <p className="mt-4 text-body-lg text-foreground">{info.what}</p>
                  <p className="mt-1 text-body-md text-muted-foreground">{info.why}</p>
                  <p className="mt-auto pt-5">
                    <span className="block border-t pt-4 text-body-sm text-muted-foreground">
                      <span className="font-bold text-foreground">Risk: </span>
                      {info.risk}
                    </span>
                  </p>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <p className="mt-3 text-body-sm text-faint">Example allocation, for illustration.</p>

      <Reveal>
        <ul className="mt-10 grid gap-3 rounded-lg border bg-background-alt p-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-body-md font-semibold text-foreground">
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-card shadow-card">
                <Icon className="size-4" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
