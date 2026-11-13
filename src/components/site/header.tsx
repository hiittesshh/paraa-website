// The site header (spec §4.19, §6.1), a Server Component: 64px at every width, solid ink (owner, 13 Nov 2026: "make the nav bar also dark"; .theme-ink re-colours the links, button and menu), sticky on screens at least
// 600px tall (static on landscape phones and at 200% zoom). It stays white over the ink band. The
// hairline appears once the page scrolls: ScrollState toggles data-at-top from a sentinel at the top of
// <main>, and with JS off the hairline always shows.
//
// One action: the outline "Ask a CA" (the section's filled button is the one primary in view). Below
// 1024 the nav moves into MobileMenu, which has no CTA of its own: the header's button stays visible
// above the open panel.
//
// Page wiring (src/app/page.tsx): <SkipLink /> first in <body>, then <SiteHeader />; <TopSentinel /> as
// the first child of <main id="main" tabIndex={-1} className="flex-1 outline-none">; <ScrollState />
// once, after </main>.
import { ButtonLink } from "@/components/ui/button";
import { NavLink } from "@/components/ui/link";
import { BLOG_LINK, CTA, NAV } from "@/lib/nav";
import { Brand } from "./brand";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    // `relative` makes the header the menu panel's containing block when it isn't sticky (< 600px tall).
    <header
      data-header=""
      className="theme-ink relative top-0 z-40 h-header border-b border-white/10 tall:sticky data-[at-top]:border-transparent"
    >
      <div className="container-page flex h-full items-center gap-6">
        <Brand />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {NAV.map((item) => (
              <li key={item.id}>
                <NavLink href={item.href} navId={item.id}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            {BLOG_LINK && (
              <li>
                <NavLink href={BLOG_LINK.href} external>
                  {BLOG_LINK.label}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ButtonLink variant="secondary" size="md" href={CTA.href}>
            {CTA.label}
          </ButtonLink>
          <MobileMenu className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}

/** First in <body>: visible on focus, lands on <main>. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-100 inline-flex min-h-11 items-center rounded-sm bg-primary px-4 text-body-md font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
  );
}

/** The first child of <main>: ScrollState watches it to show the header's hairline once you scroll. */
export function TopSentinel() {
  return <div data-top-sentinel="" aria-hidden className="h-px" />;
}
