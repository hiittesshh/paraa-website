// Site footer: brand, links to the homepage sections and the blog, the risk note, the ASCI line
// and the bottom line. Registrations, company details, grievances and legal pages come back here
// once they're confirmed and built (docs/content-rules.md §0.2); empty placeholders are not shown.
// The ASCI line is the one place on the site its regulator-mandated wording appears (rulebook R14).
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Disclosure } from "@/components/paraa/primitives";
import { BLOG_URL } from "@/lib/links";
import { Brand } from "./brand";

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/#basket", label: "The basket" },
      { href: "/#why-usd", label: "Why USD" },
      { href: "/#how", label: "How it works" },
      { href: "/#tax", label: "Tax" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/#advisors", label: "CA Advisors" },
      { href: "/#ask", label: "Talk to a CA" },
      { href: "/#faq", label: "FAQ" },
      ...(BLOG_URL ? [{ href: BLOG_URL, label: "Blog", external: true }] : []),
    ],
  },
];

const linkCls =
  "inline-flex min-h-11 items-center text-body-md text-muted-foreground no-underline underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline";
const headCls = "mb-3 text-body-sm font-extrabold tracking-[0.1em] text-foreground uppercase";

/** R15: the risk note, rendered from one place. */
export function GlobalRiskDisclosure() {
  return (
    <Disclosure id="global-risk-v3" className="bg-card p-5 text-body-md leading-relaxed md:p-6">
      <p>
        <strong>Investing involves risk, including the loss of money you invest.</strong> The basket invests in US stocks, gold
        and crude oil through derivative contracts and is valued in US dollars, so changes in the rupee affect its value in
        both directions. Past performance doesn&rsquo;t predict future results; examples on this site are for illustration
        only. Tax information is general; your CA will confirm your own. Your CA may be paid by Paraa Capital. Nothing on this
        site is personal investment advice.
      </p>
    </Disclosure>
  );
}

/** Auto-updating copyright year. Cached for a day (Cache Components forbids a bare new Date() in prerender). */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-background-alt">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <h2 className="sr-only">Site information</h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Brand />
            <p className="mt-3 text-body-md text-muted-foreground">
              US stocks, gold and crude oil in one basket, with a chartered accountant for every investor.
            </p>
            <p className="mt-4 text-body-md font-semibold text-foreground">
              We never ask for your OTP or PIN, or for payment to a personal account.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className={headCls}>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={linkCls}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.label}
                      {l.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 space-y-4 border-t border-border-strong pt-10">
          <GlobalRiskDisclosure />
          {/* ASCI's mandated disclaimer, verbatim (rulebook R14). Footer only, by decision on 2026-11-03. */}
          <Disclosure id="asci-vda-v1" className="bg-card p-5 text-body-md md:p-6">
            <p>
              Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any
              loss from such transactions.
            </p>
          </Disclosure>
        </div>

        <p className="mt-10 border-t border-border-strong pt-6 text-body-sm text-faint">
          © <CurrentYear /> Paraa Capital.
        </p>
      </div>
    </footer>
  );
}
