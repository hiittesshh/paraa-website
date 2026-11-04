// "Tax": how the basket's income is taxed, as Paraa states its position: nothing is taxed when
// you invest; the basket earns through derivative contracts, so profit is business income, taxed
// at your own slab rate. Loss carry-forward depends on how the income is classified, so the page
// defers to the CA rather than picking a number of years. The first rule leads as a gold tile,
// three short rules follow, and the live estimator sits on the right (tax-estimator.tsx).
import { ArrowLink, Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
import { formatINR } from "@/lib/format";
import { TaxEstimator } from "./tax-estimator";

const RULES: { title: string; body: string }[] = [
  {
    title: "Profit is taxed at your slab rate",
    body: "It counts as business income from derivatives, taxed at your normal rate plus 4% cess.",
  },
  { title: "Losses can be carried forward", body: "A loss can be set off against future profits." },
  { title: "Your CA files it for you", body: "Your CA prepares and files your return (ITR-3)." },
];

export function Tax() {
  return (
    <Section id="tax" labelledBy="tax-title">
      <SectionHead
        id="tax-title"
        title={
          <>
            How <Mark>tax</Mark> works
          </>
        }
        lede="No tax when you invest. You pay tax only on the profit you make."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal>
            <article className="rounded-xl bg-secondary p-6 text-ink sm:p-8">
              <p className="type-h1 num">{formatINR(0)}</p>
              <h3 className="mt-6 type-h4">No tax when you invest</h3>
              <p className="mt-1 text-body-lg">Buying and holding units creates no tax.</p>
            </article>
          </Reveal>
          <RevealGroup as="ul" className="mt-3 divide-y">
            {RULES.map(({ title, body }) => (
              <RevealItem as="li" key={title} className="py-5">
                <h3 className="type-h6">{title}</h3>
                <p className="mt-1 text-body-md text-muted-foreground">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <p className="mt-2 text-body-sm text-muted-foreground">
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
