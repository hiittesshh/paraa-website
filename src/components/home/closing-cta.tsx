// Closing CTA: a dark band with a gold main button, ending in a skyline that runs straight into the
// dark footer, so the page finishes on one continuous scene instead of a stack of boxes.
import { ButtonLink, Reveal } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
import { SkylineArt } from "./asset-art";

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="surface-ink overflow-hidden pt-20 md:pt-28">
      <Reveal className="container-page flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="closing-title" className="type-h2 text-balance">
            Ready to <Mark>invest globally?</Mark>
          </h2>
          <p className="mt-3 text-body-xl text-grey-300">Talk to a CA first. It&rsquo;s free, and there&rsquo;s no obligation.</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink href="#ask" variant="secondary" size="lg">
            Talk to a CA
          </ButtonLink>
          <ButtonLink
            href="#basket"
            variant="outline"
            size="lg"
            className="border-ink-4 bg-transparent text-primary-foreground hover:border-grey-300 hover:bg-ink-2"
          >
            Explore the basket
          </ButtonLink>
        </div>
      </Reveal>
      <div className="mt-16 flex justify-center gap-1">
        {[0, 1, 2, 3].map((n) => (
          <SkylineArt key={n} className={n > 0 ? "hidden w-1/4 shrink-0 md:block" : "w-full shrink-0 md:w-1/4"} />
        ))}
      </div>
    </section>
  );
}
