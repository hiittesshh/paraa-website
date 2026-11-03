// "Your CA": every investor is assigned a chartered accountant when they join (round 3). The
// section says what the CA does at each stage, how to check they're a real CA, that they may be
// paid by us (rulebook R13's neutral line), and ends in the question form for people who haven't
// joined yet (#ask, ask-form.tsx). No names or faces: real CAs only, once they've agreed (R11).
import { Reveal, RevealGroup, RevealItem, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { AskForm } from "./ask-form";

const STAGES = [
  {
    when: "Before you invest",
    body: "Looks at your income, goals and emergency savings, and tells you how much, if any, belongs in the basket. Sometimes the answer is “not yet”.",
  },
  {
    when: "While you’re invested",
    body: "Answers your questions when markets move, and goes over your plan with you when your situation changes.",
  },
  {
    when: "At tax time",
    body: "Works out your income from the basket for the year and prepares and files your return (ITR-3) with you.",
  },
];

export function Advisors() {
  return (
    <Section id="advisors" labelledBy="advisors-title">
      <SectionHead
        id="advisors-title"
        eyebrow="Your CA"
        title="A chartered accountant on your side, from the day you join"
        lede="Every investor is assigned a CA. Not a salesperson with a target: a qualified accountant who knows the tax side as well as the investing side."
      />

      <RevealGroup as="ol" className="grid border-y md:grid-cols-3 md:divide-x">
        {STAGES.map((s, i) => (
          <RevealItem as="li" key={s.when} className="border-b py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0">
            <p className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase num">
              {String(i + 1).padStart(2, "0")} · {s.when}
            </p>
            <p className="mt-3 text-body-lg text-foreground">{s.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <ul className="mt-6 grid gap-x-8 gap-y-2 text-body-md text-muted-foreground md:grid-cols-2">
          <li>
            <strong className="text-foreground">Check they&rsquo;re a real CA:</strong> your CA&rsquo;s ICAI membership number
            is shown in the app, so you can look it up on the ICAI website (<ToConfirm />).
          </li>
          <li>
            <strong className="text-foreground">Who pays them:</strong> your CA may be paid by us. Ask them how; they&rsquo;ll
            tell you.
          </li>
        </ul>
      </Reveal>

      <div id="ask" className="mt-16 scroll-mt-24 grid gap-8 rounded-xl border bg-background-alt p-5 sm:p-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12 lg:p-10">
        <Reveal>
          <p className="eyebrow">Haven&rsquo;t joined yet?</p>
          <h3 className="mt-3 type-h3 text-balance">Ask a CA first</h3>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Tax, how much to put in, how the basket works: send your question and a CA from our advisor desk will reply by
            phone or email.
          </p>
          <ul className="mt-6 space-y-3 text-body-md text-muted-foreground">
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
              <span>
                A reply within [1 working day] <ToConfirm />
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
              <span>Asking is free and doesn&rsquo;t sign you up for anything.</span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
              <span>When you join, a CA is assigned to you for good.</span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={1}>
          <AskForm />
        </Reveal>
      </div>
    </Section>
  );
}
