// "Tax": how the basket's income is taxed, as Paraa states its position: nothing is taxed when
// you invest; the basket earns through derivative contracts, so profit is business income, taxed
// at your own slab rate. Loss carry-forward depends on how the income is classified, so the page
// defers to the CA rather than picking a number of years. Four short rules on the left, the live
// estimator on the right (tax-estimator.tsx).
import { CircleCheck, FileText, Percent, Undo2, type LucideIcon } from "lucide-react";
import { ArrowLink, Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { TaxEstimator } from "./tax-estimator";

const RULES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: CircleCheck, title: "No tax when you invest", body: "Buying and holding units creates no tax." },
  {
    icon: Percent,
    title: "Profit is taxed at your slab rate",
    body: "It counts as business income from derivatives, taxed at your normal rate plus 4% cess.",
  },
  { icon: Undo2, title: "Losses can be carried forward", body: "A loss can be set off against future profits." },
  { icon: FileText, title: "Your CA files it for you", body: "Your CA prepares and files your return (ITR-3)." },
];

export function Tax() {
  return (
    <Section id="tax" labelledBy="tax-title">
      <SectionHead
        id="tax-title"
        eyebrow="Tax"
        title="How tax works"
        lede="No tax when you invest. You pay tax only on the profit you make."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <RevealGroup as="ul" className="space-y-3">
            {RULES.map(({ icon: Icon, title, body }) => (
              <RevealItem as="li" key={title} className="flex gap-4 rounded-lg border bg-card p-5 shadow-card">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-50 text-ink">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block type-h6">{title}</span>
                  <span className="mt-1 block text-body-md text-muted-foreground">{body}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <p className="mt-5 text-body-sm text-muted-foreground">
              General information. Your CA will confirm the exact tax for your situation.
            </p>
            <ArrowLink href="#ask">Ask a CA about your tax</ArrowLink>
          </Reveal>
        </div>

        <Reveal delay={1} className="lg:sticky lg:top-24 lg:self-start">
          <TaxEstimator />
        </Reveal>
      </div>
    </Section>
  );
}
