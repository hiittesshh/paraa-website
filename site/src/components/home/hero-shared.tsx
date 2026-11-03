// Pieces every hero variant shares, so the four previews differ only in their 3D visual:
// the backdrop (gold glow + vignette) and the copy column (eyebrow, the page's single h1, lede,
// CTAs, "you can check this" links).
import Link from "next/link";
import { ArrowRight, ArrowLeftRight, Calculator, Route } from "lucide-react";
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

/** Eyebrow, the page's single h1 (id="hero-title"), lede, CTAs and the check links. */
export function HeroCopy() {
  return (
    <>
      <p className="eyebrow">USD-denominated investing, from India</p>
      <h1 id="hero-title" className="mt-4 type-h1 text-balance">
        Invest in dollars. Check every number first.
      </h1>
      <p className="mt-5 max-w-[46ch] text-body-xl text-muted-foreground text-pretty">
        Every fee in rupees, every hand your money passes through, and what the rupee does to your returns, in both
        directions. Read the receipt before the pitch.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="#fees" size="lg">
          See your fee receipt
        </ButtonLink>
        <ButtonLink href="#how" variant="outline" size="lg">
          How your money moves
        </ButtonLink>
      </div>
      <HeroChecks />
    </>
  );
}

const CHECKS = [
  { href: "#how", icon: Route, label: "Every hand your money passes through" },
  { href: "#method", icon: Calculator, label: "How each number is calculated" },
  { href: "#rupee", icon: ArrowLeftRight, label: "What the rupee does, in both directions" },
] as const;

function HeroChecks() {
  return (
    <div className="mt-10 border-t pt-6">
      <p className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase">You can check this</p>
      <ul className="mt-2 grid gap-x-6 sm:grid-cols-1">
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
