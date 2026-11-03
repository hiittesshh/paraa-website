// The hero's backdrop (gold glow + vignette) and copy column: eyebrow, the page's single h1, lede,
// CTAs and the "before you decide" links. The 3D deck beside it lives in hero.tsx.
import Link from "next/link";
import { ArrowLeftRight, ArrowRight, Landmark, SlidersHorizontal } from "lucide-react";
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

/** Eyebrow, the page's single h1 (id="hero-title"), lede, CTAs and the read-first links. */
export function HeroCopy() {
  return (
    <>
      <p className="eyebrow">The Paraa international basket</p>
      <h1 id="hero-title" className="mt-4 type-h1 text-balance">
        US stocks, crude oil and gold. One basket, in rupees.
      </h1>
      <p className="mt-5 max-w-[48ch] text-body-xl text-muted-foreground text-pretty">
        Three global assets that move for different reasons, held together and priced every day in US dollars. You put
        money in and take it out in rupees, and a chartered accountant is assigned to you when you join.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="#basket" size="lg">
          See what&rsquo;s inside
        </ButtonLink>
        <ButtonLink href="#ask" variant="outline" size="lg">
          Ask a CA a question
        </ButtonLink>
      </div>
      <HeroChecks />
    </>
  );
}

const CHECKS = [
  { href: "#what-if", icon: SlidersHorizontal, label: "What ₹1 lakh does when markets move" },
  { href: "#why-usd", icon: ArrowLeftRight, label: "Why dollars, in both directions" },
  { href: "#tax", icon: Landmark, label: "How the income is taxed" },
] as const;

function HeroChecks() {
  return (
    <div className="mt-10 border-t pt-6">
      <p className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase">Before you decide, read</p>
      <ul className="mt-2 grid gap-x-6">
        {CHECKS.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex min-h-11 items-center gap-3 text-body-md font-semibold text-foreground no-underline"
            >
              <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-sm border bg-card transition-[border-color,box-shadow] duration-200 ease-out-soft group-hover:border-border-strong group-hover:shadow-card">
                <Icon className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
              </span>
              <span className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 group-hover:decoration-border-strong">
                {label}
              </span>
              <ArrowRight aria-hidden className="size-4 shrink-0 text-faint transition-[transform,color] duration-200 ease-out-soft group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
