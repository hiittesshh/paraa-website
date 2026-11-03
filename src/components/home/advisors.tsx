// "CA Advisors": every investor is assigned a chartered accountant when they join. Three short
// points on what the CA does, then the "Talk to a CA" form (#ask, ask-form.tsx) for anyone who
// hasn't joined yet. No names or faces until real CAs have agreed (R11).
import { ClipboardList, FileText, MessageCircle, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { AskForm } from "./ask-form";

const POINTS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ClipboardList, title: "Plans with you", body: "Helps you decide how much to invest, based on your income and goals." },
  { icon: MessageCircle, title: "Answers your questions", body: "Someone to call when markets move or your plans change." },
  { icon: FileText, title: "Files your tax", body: "Works out your income from the basket and files your return." },
];

export function Advisors() {
  return (
    <Section id="advisors" labelledBy="advisors-title">
      <SectionHead
        id="advisors-title"
        eyebrow="CA Advisors"
        title="A chartered accountant for every investor"
        lede="When you join, a CA is assigned to you. They guide you from your first investment to your tax return."
      />

      <RevealGroup as="ul" className="grid gap-4 md:grid-cols-3">
        {POINTS.map(({ icon: Icon, title, body }) => (
          <RevealItem as="li" key={title} className="rounded-lg border bg-card p-6 shadow-card">
            <span aria-hidden className="grid size-11 place-items-center rounded-full bg-gold-50 text-ink">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 type-h6">{title}</h3>
            <p className="mt-1 text-body-md text-muted-foreground">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <div
        id="ask"
        className="mt-12 grid scroll-mt-24 gap-8 rounded-xl border bg-background-alt p-5 sm:p-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12 lg:p-10"
      >
        <Reveal>
          <p className="eyebrow">Talk to a CA</p>
          <h3 className="mt-3 type-h3 text-balance">Have a question? Ask a CA.</h3>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Send us your question. A CA from our team will call you back. It&rsquo;s free and you don&rsquo;t need an account.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <AskForm />
        </Reveal>
      </div>
    </Section>
  );
}
