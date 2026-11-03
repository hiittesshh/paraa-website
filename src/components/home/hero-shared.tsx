// The hero's backdrop (gold glow + vignette) and copy column: eyebrow, the page's single h1, one
// sentence, CTAs and three quick facts. The 3D deck beside it lives in hero.tsx.
import { IndianRupee, Landmark, UserCheck } from "lucide-react";
import { ButtonLink } from "@/components/paraa/primitives";

/** Gold glow + vignette behind the hero. */
export function HeroBackdrop() {
  return (
    <>
      {/* Warm gold glow behind the visual (gold-100 core fading through gold-50). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(45%_60%_at_76%_45%,var(--color-gold-100),var(--color-gold-50)_45%,transparent_75%)]"
      />
      {/* Vignette: edges darken slightly (Greyscale 900 at ~7%), pulling the eye to the centre. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_95%_at_50%_45%,transparent_55%,var(--color-vignette)_100%)]"
      />
    </>
  );
}

/** Eyebrow, the page's single h1 (id="hero-title"), one sentence, CTAs and three quick facts. */
export function HeroCopy() {
  return (
    <>
      <p className="eyebrow">Paraa International Basket</p>
      <h1 id="hero-title" className="mt-4 type-h1 text-balance">
        Invest in US stocks, gold and crude oil
      </h1>
      <p className="mt-5 max-w-[44ch] text-body-xl text-muted-foreground text-pretty">
        One basket, bought in rupees from India. A chartered accountant guides you from day one.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="#basket" size="lg">
          Explore the basket
        </ButtonLink>
        <ButtonLink href="#ask" variant="outline" size="lg">
          Talk to a CA
        </ButtonLink>
      </div>
      <ul className="mt-10 grid gap-3 border-t pt-6 sm:grid-cols-3 sm:gap-4">
        {FACTS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-body-md font-semibold text-foreground">
            <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-50 text-ink">
              <Icon className="size-4" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </>
  );
}

const FACTS = [
  { icon: IndianRupee, label: "Invest in rupees" },
  { icon: Landmark, label: "No tax when you invest" },
  { icon: UserCheck, label: "A CA for every investor" },
] as const;
