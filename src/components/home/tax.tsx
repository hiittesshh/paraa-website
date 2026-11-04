// "Tax on your profit": two short rules and the live estimator (tax-estimator.tsx). The tax position
// depends on how the income is classified, and no CA has signed it off, so the page says so rather than
// stating it as settled (docs/redesign/content-audit.md).
import { InlineLink, Reveal, RevealGroup, RevealItem, Section } from "@/components/paraa/primitives";
import { TaxEstimator } from "./tax-estimator";

const RULES: { title: string; body: string }[] = [
  { title: "Profit may be taxed at your slab rate", body: "It depends on how this income is classified. If the basket counts as a virtual digital asset, the rate is a flat 30% plus cess." },
  { title: "Losses may not carry forward", body: "This also depends on how this income is classified. If the basket counts as a virtual digital asset, a loss can't be set off against other income or carried forward." },
];

export function Tax() {
  return (
    <Section id="tax" tone="alt" labelledBy="tax-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h2 id="tax-title" className="type-h2 text-balance">
            See the tax on your profit
          </h2>
          <p className="mt-4 max-w-[48ch] text-body-xl text-muted-foreground">
            Move the slider to estimate what you&rsquo;d keep. <InlineLink href="#ask">Talk to a CA</InlineLink> about your own tax.
          </p>
          <RevealGroup as="ul" className="mt-8 divide-y border-y">
            {RULES.map(({ title, body }) => (
              <RevealItem as="li" key={title} className="py-5">
                <h3 className="type-h6">{title}</h3>
                <p className="mt-1 text-body-md text-muted-foreground">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <Reveal delay={1} className="lg:tall:sticky lg:tall:top-24 lg:self-start">
          <TaxEstimator />
        </Reveal>
      </div>
    </Section>
  );
}
