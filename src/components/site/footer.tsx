// Site footer: brand, links and the legal notes, always open and never below 14px. Registrations,
// company details, grievance details and legal pages come back here once they're confirmed and built
// (docs/content-rules.md §0.2). The ASCI line is the one place on the site its regulator-mandated
// wording appears (rulebook R14).
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Disclosure } from "@/components/paraa/primitives";
import { BLOG_URL, FIU_REG_NO } from "@/lib/links";
import { Brand } from "./brand";

const LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: "/#tour", label: "The app" },
  { href: "/#basket", label: "Basket" },
  { href: "/#what-if", label: "Calculator" },
  { href: "/#how", label: "How it works" },
  { href: "/#tax", label: "Tax" },
  { href: "/#trust", label: "Our rules" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#ask", label: "Talk to a CA" },
  ...(BLOG_URL ? [{ href: BLOG_URL, label: "Blog", external: true }] : []),
];

const linkCls =
  "inline-flex min-h-11 items-center rounded-sm text-body-md text-muted-foreground no-underline underline-offset-4 transition-colors duration-150 ease-out-soft hover:text-foreground hover:underline";

/** R15: the risk note, rendered from one place. */
export function GlobalRiskDisclosure() {
  return (
    <Disclosure id="global-risk-v3">
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
    <footer className="mt-auto bg-background">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <h2 className="sr-only">Site information</h2>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="max-w-md">
            <Brand />
            <p className="mt-4 text-body-md text-muted-foreground">
              US stocks, gold and crude oil in one basket, for residents of India.
            </p>
            <p className="mt-4 text-body-md font-semibold text-foreground">
              We never ask you to share your OTP or PIN, or to pay into a personal account.
            </p>
          </div>
          <nav aria-label="Site">
            <ul className="grid grid-cols-2 sm:grid-cols-3">
              {LINKS.map((l) => (
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
        </div>

        <div className="mt-12 grid gap-6 border-t pt-10 lg:grid-cols-2 lg:gap-16">
          <GlobalRiskDisclosure />
          <div className="space-y-4">
            {/* What the FIU-IND line in the hero, cards and FAQ does and doesn't mean. */}
            <Disclosure id="fiu-registration-v1">
              <p>
                <strong>Paraa Capital is registered with FIU-IND{FIU_REG_NO ? ` (Reg. no. ${FIU_REG_NO})` : ""}.</strong> This
                registration is for anti-money-laundering reporting. It doesn&rsquo;t mean any government body has approved or
                recommends this investment.
              </p>
            </Disclosure>
            {/* ASCI's mandated disclaimer, verbatim (rulebook R14). */}
            <Disclosure id="asci-vda-v1">
              <p>
                Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss
                from such transactions.
              </p>
            </Disclosure>
          </div>
        </div>

        <p className="mt-10 border-t pt-6 text-body-md text-muted-foreground">
          © <CurrentYear /> Paraa Capital.
        </p>
      </div>
    </footer>
  );
}
