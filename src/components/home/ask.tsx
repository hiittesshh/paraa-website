// "Ask a chartered accountant" (spec §6.8). Owner, 14 Nov 2026: the form was "too many things at once", "plain or
// generic", and the left side "weak or empty". Now: on the left, the offer and what a CA can help with as four clear
// topics, then the two limits that must stay (the CA may be paid by Paraa; we never ask for an OTP or PIN). On the
// right, a dark card with the form in two steps. Below 1024 the form follows the text.
import { BadgeIndianRupee, Clock4, Landmark, Layers, ReceiptIndianRupee, ShieldCheck, type LucideIcon } from "lucide-react";
import { Disclosure } from "@/components/ui/disclosure";
import { Panel } from "@/components/ui/panel";
import { AskForm } from "./ask-form";

const TOPICS: readonly { title: string; body: string; Icon: LucideIcon }[] = [
  { title: "Tax on your profit", body: "How gains are taxed, and what to keep for filing.", Icon: ReceiptIndianRupee },
  { title: "Fees and charges", body: "What you pay, and when.", Icon: BadgeIndianRupee },
  { title: "How a basket works", body: "Units, the daily price and the rupee.", Icon: Layers },
  { title: "Getting money out", body: "Maturity, redeeming and withdrawing.", Icon: Landmark },
];

export function Ask() {
  return (
    <section id="ask" aria-labelledby="ask-title" className="ask-band py-section">
      <div className="container-page lg:grid lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-start lg:gap-16">
        <div>
          <p className="ask-eyebrow">No account needed</p>
          <h2 id="ask-title" tabIndex={-1} className="ask-title">
            Ask a chartered accountant <span className="ask-title-soft">before you decide.</span>
          </h2>
          <p className="mt-5 max-w-[46ch] text-body-xl text-copy">
            Write your question and we’ll contact you about it. A CA can help you with:
          </p>

          <ul className="ask-topics">
            {TOPICS.map(({ title, body, Icon }) => (
              <li key={title}>
                <span className="ask-topic-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="ask-topic-title">{title}</span>
                <span className="ask-topic-body">{body}</span>
              </li>
            ))}
          </ul>

          <ul className="ask-notes">
            <li>
              <Clock4 aria-hidden />
              <span>A CA reads your question, we contact you, and you decide what to do next.</span>
            </li>
            <li>
              <BadgeIndianRupee aria-hidden />
              <Disclosure id="ca-paid-v1" as="span" />
            </li>
            <li>
              <ShieldCheck aria-hidden />
              <span>We never ask for your OTP or PIN by call or message.</span>
            </li>
          </ul>
        </div>

        {/* id="ask-form": the form's permalink target (§7.1), so a post lands with its outcome in view. */}
        <Panel id="ask-form" className="theme-ink ask-card mt-10 md:mt-12 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:mt-0">
          <AskForm />
        </Panel>
      </div>
    </section>
  );
}
