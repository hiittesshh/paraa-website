// A6.4 "Every month, every year": rows are years, columns are months, plus a year total that
// compounds the months shown (Π(1 + monthly) − 1, from calendarYears()). Signs are always in
// the text, so colour is never the only signal.
import { Illustrative, Reveal, Section } from "@/components/paraa/primitives";
import { calendarYears } from "@/lib/calc";
import { formatPct, formatUSD } from "@/lib/format";
import { INCEPTION_LABEL, NAV_DATA } from "@/lib/nav-data";
import { cn } from "@/lib/utils";
import { signTone } from "@/lib/tone";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const cell = "px-3 py-3 text-right text-body-md num whitespace-nowrap";

export function MonthGrid() {
  const years = calendarYears();
  return (
    <Section tone="alt" size="sm" labelledBy="grid-title">
      <Reveal className="mb-6 max-w-[720px] space-y-2">
        <h2 id="grid-title" className="type-h3">
          Every month, every year
        </h2>
        <p className="text-body-lg text-muted-foreground">
          Basket 1, monthly return in USD, net of fees. The year total compounds the months shown. <Illustrative className="align-middle" />
        </p>
      </Reveal>
      <Reveal className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full min-w-[960px] border-collapse">
          <caption className="sr-only">
            Basket 1 monthly returns by calendar year, with the year total. Plus and minus signs mark gains and losses. Illustrative.
          </caption>
          <thead className="border-b border-border-strong">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-body-sm font-bold text-muted-foreground">
                Year
              </th>
              {MONTHS.map((m) => (
                <th key={m} scope="col" className="px-3 py-3 text-right text-body-sm font-bold text-muted-foreground">
                  {m}
                </th>
              ))}
              <th scope="col" className="border-l border-border px-3 py-3 text-right text-body-sm font-bold text-muted-foreground">
                Year total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {years.map((row) => (
              <tr key={row.year}>
                <th scope="row" className="px-3 py-3 text-left text-body-md font-bold num">
                  {row.year}
                </th>
                {MONTHS.map((_, k) => {
                  const v = row.months[k + 1];
                  if (typeof v === "number") {
                    return (
                      <td key={k} className={cn(cell, signTone(v))}>
                        {formatPct(v)}
                      </td>
                    );
                  }
                  if (v === null) {
                    return (
                      <td key={k} className={cn(cell, "text-faint")}>
                        Start
                      </td>
                    );
                  }
                  return (
                    <td key={k} className={cn(cell, "text-faint")}>
                      <span aria-hidden>–</span>
                      <span className="sr-only">No data</span>
                    </td>
                  );
                })}
                <td className={cn(cell, "border-l border-border font-bold", signTone(row.total))}>
                  {row.total === null ? "–" : formatPct(row.total)}
                  {row.partial && <span className="ml-1 font-normal text-muted-foreground">({row.count} mo)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <p className="mt-3 text-body-sm text-muted-foreground">
        “Start” = inception month ({INCEPTION_LABEL}, {formatUSD(NAV_DATA[0][1], { cents: true })}). Part years show how many months the total
        covers. Illustrative.
      </p>
    </Section>
  );
}
