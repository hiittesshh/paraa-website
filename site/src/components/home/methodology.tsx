// A5.9 Methodology: pre-empts "is this number real?". Five answers in the shared accordion.
// Round 2: no published history or performance on the site, so these explain the process only.
import { Accordion, type AccordionEntry } from "@/components/paraa/accordion";
import { Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";

const ITEMS: AccordionEntry[] = [
  {
    value: "nav",
    title: "What NAV means",
    content: (
      <p>
        <abbr title="net asset value">NAV</abbr> (net asset value) is the value of everything in the basket, minus what it
        owes, divided by the number of units. It&rsquo;s the price of one unit.
      </p>
    ),
  },
  {
    value: "returns",
    title: "How returns on your statement are measured",
    content: (
      <p>
        Time-weighted (<abbr title="time-weighted rate of return">TWRR</abbr>). It measures the basket, not the timing of
        anyone&rsquo;s deposits. After the fees shown on the fee receipt. In US dollars unless labelled ₹.
      </p>
    ),
  },
  {
    value: "rate",
    title: "Which exchange rate we use for ₹ figures",
    content: (
      <p>
        [Source] reference rate on the valuation date <ToConfirm />. Shown on every statement.
      </p>
    ),
  },
  {
    value: "checks",
    title: "Who checks it",
    content: (
      <p>
        Administrator <ToConfirm /> computes it. Auditor <ToConfirm /> reviews it annually. Audit report on request{" "}
        <span className="whitespace-nowrap">
          <ToConfirm />.
        </span>
      </p>
    ),
  },
  {
    value: "never",
    title: "What we will never do",
    content: (
      <p>
        Show a number without saying where it comes from. Call an illustrative figure real. Change a unit price after the fact
        without telling the people it affects.
      </p>
    ),
  },
];

export function Methodology() {
  return (
    <Section id="method" labelledBy="method-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="method-title"
            eyebrow="Methodology"
            title="How we calculate what you see"
            lede="Five short answers to the question behind every number on this site: is it real?"
            className="mb-0 md:mb-0"
          />
        </div>
        <Reveal delay={1}>
          <Accordion items={ITEMS} />
        </Reveal>
      </div>
    </Section>
  );
}
