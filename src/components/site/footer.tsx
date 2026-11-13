// The site footer (spec §6.9): brand, links and the legal notes, always open and never below 14px. The
// legal text renders from the disclosure registry (R15); the ASCI line appears here and nowhere else
// (R14). Registrations, company details, grievance officer and legal page links come back only when every
// field is real (content-rules.md §0.2); they aren't built as empty slots.
import { PHOTOS } from "@/lib/photos";
import { cacheLife } from "next/cache";
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { FooterLink } from "@/components/ui/link";
import { APP_LINK, BLOG_LINK, CTA, NAV } from "@/lib/nav";
import { Brand } from "./brand";

const LINKS: readonly { href: string; label: string; external?: boolean }[] = [
  ...NAV,
  CTA,
  ...(APP_LINK ? [APP_LINK] : []),
  ...(BLOG_LINK ? [BLOG_LINK] : []),
];

/** The copyright year, cached for a day (Cache Components forbids a bare new Date() in a prerender). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    // Round 18: an ink footer closes the page on the brand's dark, and the gold wordmark finally has contrast.
    <footer className="theme-ink">
      <div className="container-page pt-16 pb-10 lg:pt-20">
        <h2 className="sr-only">Site information</h2>

        {/* Round 18b: brand and the one action on top, links in a row, the legal notes in their own panel. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Brand loading="lazy" />
            <p className="mt-5 type-heading">One basket that follows US stocks, gold and crude oil, for residents of India.</p>
          </div>
          <ButtonLink variant="primary" size="lg" href={CTA.href} className="self-start lg:self-auto">
            {CTA.label}
          </ButtonLink>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t pt-8 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Site">
            <ul className="flex flex-wrap gap-x-8 gap-y-0">
              {LINKS.filter((link) => link.href !== CTA.href).map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
          <Disclosure id="otp-v1" as="p" className="max-w-md text-body-md font-semibold text-foreground" />
        </div>

        <div className="mt-8 grid gap-6 rounded-2xl bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
          <Disclosure id="global-risk-v3" variant="block" />
          <div>
            <Disclosure id="fiu-registration-v1" variant="block" />
            <Disclosure id="asci-vda-v1" variant="block" className="mt-4" />
          </div>
        </div>

        <p className="mt-8 text-body-md text-muted-foreground">
          © <CurrentYear /> Paraa Capital.
        </p>
        {/* The stand-in photographs' credits (Wikimedia Commons, CC BY-SA): one line. */}
        <p className="mt-2 text-body-md text-muted-foreground">
          Photographs:{" "}
          {Object.values(PHOTOS).map((p, i, all) => (
            <span key={p.page}>
              <a href={p.page} className="underline underline-offset-4" rel="noopener noreferrer license" target="_blank">
                {p.by}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {i < all.length - 1 ? ", " : ""}
            </span>
          ))}
          , Wikimedia Commons, CC BY-SA.
        </p>
      </div>
    </footer>
  );
}
