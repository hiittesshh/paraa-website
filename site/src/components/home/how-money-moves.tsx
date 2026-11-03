// A5.6 How your money moves, refined. Same honesty rule as the prototype (every unconfirmed
// name, route and timing is marked TO CONFIRM, and the unconfirmed route is drawn dashed),
// but rebuilt as a rail you can read in one pass: five steps out and back, each answering the
// same five questions in the same order, so steps can be compared across the row.
//
// Light theme: a quiet rail on white. Each connector draws itself in once as it scrolls into
// view (a clip-path wipe rather than a scale, so the dashed segments keep their dash spacing
// while they animate). Motion's RSC entry keeps this a server component.
import type { ReactNode } from "react";
import { Connector } from "./how-connector";
import { ArrowRightLeft, type LucideIcon, Ban, BanknoteArrowDown, Calculator, Landmark, ShieldAlert, Vault } from "lucide-react";
import { ArrowLink, Reveal, RevealGroup, RevealItem, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { formatPct } from "@/lib/format";
import { FEES } from "@/lib/fees";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  icon: LucideIcon;
  money: string; // what currency the money is in at this step
  summary: ReactNode;
  who: ReactNode;
  can: ReactNode;
  cant: ReactNode;
  fail: ReactNode;
  timing: ReactNode;
  unconfirmed?: boolean; // the legal route is not yet known: dashed node and connector
}

const pct = (f: number) => formatPct(f, { digits: 2, signed: false });

/** A TO CONFIRM tag glued to the punctuation after it, so a lone full stop never wraps onto its own line. */
function Tc({ children, end = "." }: { children?: ReactNode; end?: string }) {
  return (
    <span className="whitespace-nowrap">
      <ToConfirm>{children}</ToConfirm>
      {end}
    </span>
  );
}

const STEPS: Step[] = [
  {
    title: "Your bank account",
    icon: Landmark,
    money: "₹ INR",
    summary: "You start every payment, from a bank account in your own name.",
    who: "You, at your own bank.",
    can: "You decide when, and how much, to send.",
    cant: (
      <>
        We never see your bank login, and we can&apos;t take money without your instruction (mandate terms <Tc end=")." />
      </>
    ),
    fail: "Your bank's own rules apply, as for any account you hold.",
    timing: "Whenever you choose.",
  },
  {
    title: "Changed into US dollars",
    icon: ArrowRightLeft,
    money: "₹ → US$",
    unconfirmed: true,
    summary: (
      <>
        Rupees land in a collection account and are changed into dollars, at the rate printed on your statement. The legal route abroad is{" "}
        <Tc>not yet confirmed</Tc>
      </>
    ),
    who: (
      <>
        Collection bank [name] <ToConfirm />, via <abbr title="Liberalised Remittance Scheme">LRS</abbr> (the RBI scheme for residents
        sending money abroad), <abbr title="International Financial Services Centre">IFSC</abbr> (GIFT City) or another route <Tc />
      </>
    ),
    can: `Convert your rupees and send the dollars to the fund. Conversion costs ${pct(FEES.fxIn)} (Illustrative, see Fees).`,
    cant: (
      <>
        Send the money anywhere except the fund&apos;s account <Tc />
      </>
    ),
    fail: <ToConfirm />,
    timing: (
      <>
        [T+N] business days <Tc />
      </>
    ),
  },
  {
    title: "Held by the custodian, in the basket",
    icon: Vault,
    money: "US$",
    summary: "The fund buys the basket's holdings. A custodian keeps them in the fund's name, not in Paraa's.",
    who: (
      <>
        Custodian [name] <ToConfirm />, for the fund [entity, jurisdiction] <Tc />
      </>
    ),
    can: (
      <>
        Keep the basket&apos;s assets and move them only on the fund&apos;s verified instructions <Tc />
      </>
    ),
    cant: (
      <>
        Lend or use the assets for its own business <Tc />
      </>
    ),
    fail: (
      <>
        Assets held by a custodian are normally kept separate from the custodian&apos;s own money. Whether that applies here, and what
        you&apos;d recover, is <ToConfirm /> with counsel.
      </>
    ),
    timing: (
      <>
        Units are bought at the next unit price after your dollars arrive <Tc />
      </>
    ),
  },
  {
    title: "Valued by an administrator",
    icon: Calculator,
    money: "US$",
    summary: (
      <>
        An administrator values everything at each month-end and sets the <abbr title="net asset value">NAV</abbr>, the price of one
        unit, which is what your statement uses.
      </>
    ),
    who: (
      <>
        Fund administrator [name] <ToConfirm />. Auditor [firm] <ToConfirm /> reviews it yearly.
      </>
    ),
    can: "Price the holdings, sign off the unit price, and correct it if a price was wrong.",
    cant: "Move money. It keeps the books; it never holds your assets.",
    fail: (
      <>
        Your assets stay with the custodian while a replacement is appointed <Tc />
      </>
    ),
    timing: (
      <>
        Month-end, within [N] business days <Tc />
      </>
    ),
  },
  {
    title: "Back to your own bank account",
    icon: BanknoteArrowDown,
    money: "US$ → ₹",
    summary: "When you sell, dollars are changed back into rupees and paid only into a bank account in your name.",
    who: (
      <>
        The same hands in reverse: custodian, collection bank, then your bank <Tc />
      </>
    ),
    can: "Pay you, into a bank account in your own name.",
    cant: "Pay anyone else, or any account that isn't yours, even if someone asks.",
    fail: <ToConfirm />,
    timing: (
      <>
        [T+N] business days <ToConfirm />. Holidays in India and the US both count. Exit fee {pct(FEES.exit)} under{" "}
        {FEES.exitUnderMonths} months, conversion {pct(FEES.fxOut)} (Illustrative).
      </>
    ),
  },
];

const QUESTIONS: { key: "who" | "can" | "cant" | "fail" | "timing"; label: string }[] = [
  { key: "who", label: "Who holds it" },
  { key: "can", label: "What they can do" },
  { key: "cant", label: "What they can't do" },
  { key: "fail", label: "If they fail" },
  { key: "timing", label: "How long" },
];

const NEVER = [
  "Ask you to pay a personal account, a person's UPI ID, or anyone over WhatsApp.",
  "Ask for your OTP, PIN or bank password.",
  "Pay a withdrawal into an account that isn't in your name.",
  "Draw a step on this map that we haven't confirmed.",
];

export function HowMoneyMoves() {
  return (
    <Section id="how" labelledBy="how-title">
      <SectionHead
        id="how-title"
        eyebrow="How your money moves"
        title="Every hand your money passes through, by name"
        lede="Five steps, out and back. For each one: who holds your money, what they can and can't do, what happens if they fail, and how long it takes."
      />

      <Reveal className="mb-12 max-w-[860px] rounded-lg border bg-background-alt p-5 md:p-6">
        <p className="mb-2 text-body-sm font-extrabold tracking-[0.12em] text-faint uppercase">In one line</p>
        <p className="text-body-xl text-pretty text-foreground">
          Your rupees leave your bank, become dollars, sit with a custodian inside the basket, are valued every month by an administrator,
          and come back only to a bank account in your name.
        </p>
        <p className="mt-2 text-body-md text-muted-foreground">
          Once your money is in dollars, a weaker rupee raises its rupee value; a stronger rupee lowers it.
        </p>
      </Reveal>

      <ol className="grid lg:grid-cols-5 lg:gap-4" aria-label="The five steps your money takes">
        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1;
          // The connector leaving step 1 and step 2 is dashed: both touch the unconfirmed route.
          const dashedOut = !!(s.unconfirmed || STEPS[i + 1]?.unconfirmed);
          const Icon = s.icon;
          return (
            <Reveal as="li" key={s.title} delay={Math.min(i, 4)} className="flex gap-4 lg:flex-col lg:gap-0">
              <div aria-hidden className="flex flex-col items-center lg:mb-5 lg:flex-row">
                <span
                  className={cn(
                    "relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 bg-card text-foreground shadow-card",
                    s.unconfirmed ? "border-dashed border-grey-500" : "border-ink",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  <span className="num absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-ink text-body-xs font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                </span>
                {!last && <Connector dashed={dashedOut} index={i} />}
              </div>

              <article
                className={cn(
                  "mb-6 flex min-w-0 flex-1 flex-col rounded-lg border bg-card p-5 shadow-card lg:mb-0",
                  s.unconfirmed && "border-2 border-dashed border-grey-400 shadow-none",
                )}
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="num text-body-sm font-extrabold tracking-[0.08em] text-faint uppercase">Step {i + 1}</span>
                  <span className="num rounded-full border bg-muted px-2 text-body-sm font-semibold text-foreground">{s.money}</span>
                  {s.unconfirmed && <ToConfirm>Route</ToConfirm>}
                </div>
                <h3 className="type-h6 text-balance">{s.title}</h3>
                <p className="mt-2 text-body-md text-muted-foreground">{s.summary}</p>

                <dl className="mt-4 space-y-3 border-t pt-4 text-body-sm">
                  {QUESTIONS.map((q) => (
                    <div key={q.key}>
                      <dt className="font-bold text-foreground">{q.label}</dt>
                      <dd className="mt-0.5 text-muted-foreground">{s[q.key]}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          );
        })}
      </ol>

      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
        <RevealItem className="rounded-lg border bg-card p-5 shadow-card md:p-6">
          <h3 className="type-h6 flex items-center gap-3">
            <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-error/10">
              <Ban className="size-5 stroke-error" />
            </span>
            What we never do
          </h3>
          <ul className="mt-4 space-y-2.5 text-body-md text-foreground">
            {NEVER.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-error" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-body-sm text-muted-foreground">
            If anyone asks you to do one of these in our name, stop and contact us on an official channel.
          </p>
        </RevealItem>

        <RevealItem className="flex flex-col rounded-lg border border-warning bg-warning/10 p-5 md:p-6">
          <h3 className="type-h6 flex items-center gap-3">
            <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-warning text-ink">
              <ShieldAlert className="size-5" />
            </span>
            The gap we&apos;re showing you
          </h3>
          <p className="mt-4 text-body-md text-foreground">
            The legal route in step 2 is not yet confirmed. We&apos;d rather show you a labelled gap than draw a confident arrow. Until counsel
            confirms it, that step stays dashed and marked <Tc />
          </p>
          <ArrowLink href="#faq" className="mt-auto pt-4">
            What-if answers in the FAQ
          </ArrowLink>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
