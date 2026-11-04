// "What's inside": the one international basket as three solid tiles, each taking up its share of
// the space (US stocks half, gold and oil splitting the rest 60/40), with what it is and why it's
// there on the tile itself. Then four key facts for the whole basket.
import { CalendarClock, ChartLine, IndianRupee, Repeat } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
import { SLEEVES, type SleeveId } from "@/lib/basket";
import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { IngotArt, SkylineArt, WaveArt } from "./asset-art";
import { SLEEVE_INFO } from "./sleeve-info";

const FACTS = [
  { icon: IndianRupee, label: "Invest and withdraw in rupees" },
  { icon: Repeat, label: "Invest once or every month" },
  { icon: ChartLine, label: "Priced daily" },
  { icon: CalendarClock, label: "Withdraw after your investment matures" },
];

const TILE: Record<SleeveId, string> = {
  us: "surface-ink lg:row-span-2",
  gold: "bg-secondary text-ink",
  oil: "bg-grey-400 text-ink",
};

export function Basket() {
  return (
    <Section id="basket" labelledBy="basket-title">
      <SectionHead
        id="basket-title"
        title={
          <>
            What&rsquo;s in <Mark>the basket</Mark>
          </>
        }
        lede="Three markets, each moving for its own reasons."
      />

      <RevealGroup as="ul" className="grid gap-3 lg:grid-cols-2 lg:grid-rows-[auto_auto]">
        {SLEEVES.map((s) => {
          const info = SLEEVE_INFO[s.id];
          const dark = s.id === "us";
          return (
            <RevealItem as="li" key={s.id} className={cn("flex", s.id === "us" && "lg:row-span-2")}>
              <article
                className={cn(
                  "group relative isolate flex w-full flex-col overflow-hidden rounded-xl p-6 transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-1 hover:shadow-lift sm:p-8",
                  TILE[s.id],
                )}
              >
                {s.id === "oil" && <WaveArt className="absolute inset-x-0 bottom-0 -z-10 h-full w-[200%] max-w-none" />}
                {s.id === "gold" && <IngotArt className="absolute -right-2 -bottom-2 -z-10 hidden w-44 sm:block" />}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="type-h4">{s.name}</h3>
                    {info.tag && <p className="mt-1 text-body-sm font-bold text-gold-400">{info.tag}</p>}
                  </div>
                  <p className="type-h1 num">{formatPct(s.weight, { digits: 0, signed: false })}</p>
                </div>

                {dark && <SkylineArt className="my-8 w-full flex-1" />}

                <div className={cn("mt-6 max-w-[44ch]", dark ? "lg:mt-0" : "sm:pr-32")}>
                  <p className="text-body-lg font-semibold">{info.what}</p>
                  <p className={cn("mt-1 text-body-md", dark ? "text-grey-300" : "text-ink")}>{info.why}</p>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <p className="mt-3 text-body-sm text-faint">These percentages are an example.</p>

      <Reveal>
        <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-body-md font-semibold text-foreground">
              <Icon aria-hidden className="size-5 shrink-0 text-accent" />
              {label}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
