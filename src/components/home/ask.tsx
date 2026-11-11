// "Ask a chartered accountant" (spec §6.8): what happens to a question, the CA-payment limit (from the
// disclosure registry), and the form card. Below 1024 the form follows the text; from 1024 they sit side by
// side (L3, 5 / 7).
import { Disclosure } from "@/components/ui/disclosure";
import { Reveal } from "@/components/motion/reveal";
import { Panel } from "@/components/ui/panel";
import { Section } from "@/components/ui/section";
import { AskForm } from "./ask-form";

const NEXT_STEPS = ["A CA reads your question.", "We contact you about it.", "You decide what to do next."] as const;

export function Ask() {
  return (
    <Section id="ask" labelledBy="ask-title" tone="gold">
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16">
        <div>
          <h2 id="ask-title" tabIndex={-1} className="type-title max-w-[24ch]">
            Ask a chartered accountant before you decide
          </h2>
          <p className="mt-4 max-w-[52ch] text-body-xl text-muted-foreground">
            You don’t need an account. Write your question, and we’ll contact you about it.
          </p>
          <h3 className="mt-10 type-subhead">What happens next</h3>
          {/* Round 18b: the three steps as white cards on the gold band, numbered like How it works. */}
          <Reveal as="ol" stagger={0.1} className="mt-4 space-y-3">
            {NEXT_STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-4 rounded-xl bg-card p-4">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-sm bg-primary text-body-lg font-semibold text-primary-foreground num"
                >
                  {i + 1}
                </span>
                <span className="text-body-lg font-semibold">{step}</span>
              </li>
            ))}
          </Reveal>
          <div className="mt-6 space-y-1 border-t pt-5">
            <Disclosure id="ca-paid-v1" as="p" className="text-body-lg text-copy" />
            <p className="text-body-lg text-copy">We never ask for your OTP or PIN by call or message.</p>
          </div>
        </div>

        {/* id="ask-form": the form's permalink target (§7.1), so a post lands with its outcome in view. */}
        {/* theme-light: the card keeps the light roles (inputs, hairlines, errors) on the gold band. */}
        <Panel id="ask-form" className="theme-light mt-10 border-0 shadow-float md:mt-12 lg:mt-0">
          <AskForm />
        </Panel>
      </div>
    </Section>
  );
}
