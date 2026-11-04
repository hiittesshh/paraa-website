// Site footer: brand, links to the homepage sections and the blog, the risk note, the ASCI line
// and the bottom line. Registrations, company details, grievances and legal pages come back here
// once they're confirmed and built (docs/content-rules.md §0.2); empty placeholders are not shown.
// The ASCI line is the one place on the site its regulator-mandated wording appears (rulebook R14).
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Disclosure } from "@/components/paraa/primitives";
import { BLOG_URL, FIU_REG_NO } from "@/lib/links";
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
  "inline-flex min-h-11 items-center rounded-sm text-body-md text-grey-300 no-underline underline-offset-4 transition-colors duration-150 hover:text-primary-foreground hover:underline";
const headCls = "mb-2 text-body-md font-bold text-primary-foreground";
const legalCls = "text-grey-300 [&_strong]:text-primary-foreground";

/** R15: the risk note, rendered from one place. */
export function GlobalRiskDisclosure() {
  return (
    <Disclosure id="global-risk-v3" className={legalCls}>
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
    <footer className="surface-ink mt-auto">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <h2 className="sr-only">Site information</h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Brand />
            <p className="mt-4 text-body-md text-grey-300">
              US stocks, gold and crude oil in one basket, with a chartered accountant for every investor.
            </p>
            <p className="mt-4 text-body-md font-semibold">
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

        <div className="mt-12 grid gap-6 border-t border-ink-2 pt-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <GlobalRiskDisclosure />
          <div className="space-y-4">
            {/* What the hero's "Registered with FIU-IND" tile does and doesn't mean. */}
            <Disclosure id="fiu-registration-v1" className={legalCls}>
              <p>
                <strong>Paraa Capital is registered with FIU-IND{FIU_REG_NO ? ` (Reg. no. ${FIU_REG_NO})` : ""}.</strong> This
                registration is for anti-money-laundering reporting. It doesn&rsquo;t mean any government body has approved or
                recommends this investment.
              </p>
            </Disclosure>
            {/* ASCI's mandated disclaimer, verbatim (rulebook R14). Footer only, by decision on 2026-11-03. */}
            <Disclosure id="asci-vda-v1" className={legalCls}>
              <p>
                Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any
                loss from such transactions.
              </p>
            </Disclosure>
          </div>
        </div>

        <p className="mt-10 border-t border-ink-2 pt-6 text-body-sm text-grey-400">
          © <CurrentYear /> Paraa Capital.
        </p>
      </div>
    </footer>
  );
}
