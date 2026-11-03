// A6.7 Methodology: the A5 §9 accordion, every panel expanded by default on /nav.
import { Accordion, type AccordionEntry } from "@/components/paraa/accordion";
import { Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";

const ITEMS: AccordionEntry[] = [
  {
    value: "nav",
    title: "What NAV means",
    content: (
      <p>
        <abbr title="net asset value">NAV</abbr> (net asset value) is the value of everything in the basket, minus what it owes, divided by the
        number of units. It&apos;s the price of one unit.
      </p>
    ),
  },
  {
    value: "returns",
    title: "How returns are measured",
    content: (
      <p>
        Time-weighted (<abbr title="time-weighted rate of return">TWRR</abbr>). It measures the basket, not the timing of anyone&apos;s
        deposits. Net of the illustrative fees on the fee receipt. In US dollars unless labelled ₹.
      </p>
    ),
  },
  {
    value: "rate",
    title: "Which exchange rate we use for ₹ figures",
    content: (
      <p>
        [Source] reference rate on the NAV date <ToConfirm />. Shown on every statement.
      </p>
    ),
  },
  {
    value: "checks",
    title: "Who checks it",
    content: (
      <p>
        Administrator <ToConfirm /> computes it. Auditor <ToConfirm /> reviews it annually. Report download <ToConfirm />.
      </p>
    ),
  },
  {
    value: "never",
    title: "What we will never do",
    content: <p>Remove a month from the history. Restart a track record. Show a period we chose because it looks good.</p>,
  },
];

export function NavMethodology() {
  return (
    <Section labelledBy="nav-method-title">
      <div className="mx-auto max-w-[820px]">
        <SectionHead id="nav-method-title" title="How we calculate what you see" />
        <Reveal>
          <Accordion items={ITEMS} defaultOpen={ITEMS.map((i) => i.value)} />
        </Reveal>
      </div>
    </Section>
  );
}
