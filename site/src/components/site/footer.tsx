// §0.2 shared footer + legal block, ported from concept-a/index.html.
// Order of the legal block is fixed by the spec: registrations → company details → risk
// disclosure → (hidden) SEBI line → grievances → bottom line.
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Disclosure, ToConfirm } from "@/components/paraa/primitives";
import { SiteLink } from "@/components/paraa/site-link";
import { Brand } from "./brand";

// Routes from the site map (02-concepts.md §0.1). Unbuilt pages show as "Soon" (lib/routes.ts).
const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Invest",
    links: [
      { href: "/#how", label: "How your money moves" },
      { href: "/baskets", label: "Baskets" },
      { href: "/#fees", label: "Fees" },
      { href: "/risks", label: "What could go wrong" },
      { href: "/withdrawals", label: "Getting your money out" },
    ],
  },
  {
    title: "Check us",
    links: [
      { href: "/legal-entities", label: "Who we are legally" },
      { href: "/team", label: "Team & governance" },
      { href: "/log", label: "Transparency log" },
      { href: "/letters", label: "Letters" },
      { href: "/grievances", label: "Complaints & grievances" },
      { href: "/grade-is-now-paraa", label: "Grade is now Paraa" },
    ],
  },
  {
    title: "Partners & legal",
    links: [
      { href: "/advisors", label: "For advisors" },
      { href: "/cas", label: "For CAs" },
      { href: "/institutions", label: "For institutions" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/investor-agreement", label: "Investor agreement" },
      { href: "/legal/aml-policy", label: "AML policy" },
      { href: "/legal/risk-disclosure", label: "Full risk disclosure" },
    ],
  },
];

const linkCls =
  "inline-flex min-h-11 items-center text-body-md text-muted-foreground no-underline underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline";
const headCls = "mb-3 text-body-sm font-extrabold tracking-[0.1em] text-foreground uppercase";
const inlineLink = "font-semibold text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-150 hover:decoration-foreground";

/** R15: the global risk disclosure, rendered from one place. */
export function GlobalRiskDisclosure() {
  return (
    <Disclosure id="global-risk-v1" className="bg-card p-5 text-body-md leading-relaxed md:p-6">
      <p>
        <strong>Investing involves risk, including loss of the money you put in.</strong> Your investment is held and valued in
        US dollars. If the rupee weakens against the dollar, the rupee value of your investment rises; if the rupee strengthens,
        it falls. Both can happen in the same period as a fall in the investment itself. Past performance, including any
        simulation, does not predict future results. Figures marked <em>Illustrative</em> are examples, not records or
        forecasts. How your money is legally routed and held is <ToConfirm /> and is described on{" "}
        <Link href="/#how" className={inlineLink}>
          How your money moves
        </Link>
        . Nothing on this site is personal investment advice. Read the{" "}
        <SiteLink href="/legal/risk-disclosure" className={inlineLink} pendingClassName="inline-flex items-center gap-1.5 font-semibold text-foreground">
          full risk disclosure
        </SiteLink>{" "}
        before investing.
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

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Brand />
            <p className="mt-3 text-body-md text-muted-foreground">
              USD-denominated investing for residents of India. Every number dated, every intermediary named.
            </p>
            <h3 id="official-channels" className={`${headCls} mt-8`}>
              Official channels
            </h3>
            <ul className="space-y-2 text-body-md text-muted-foreground">
              <li>
                Website: <span className="font-semibold text-foreground">paraacapital.com</span>
              </li>
              <li>
                App: <span className="text-foreground">App Store</span> · <span className="text-foreground">Google Play</span>{" "}
                <ToConfirm />
              </li>
              <li>
                Support email: <ToConfirm />
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  We never ask for your OTP, PIN or money over WhatsApp or personal accounts.
                </span>
              </li>
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className={headCls}>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <SiteLink href={l.href} className={linkCls} pendingClassName={`${linkCls} text-faint`}>
                      {l.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 space-y-10 border-t border-border-strong pt-10">
          {/* §0.2.1 Registrations. Production rule: a row ships only when all five cells are real
              and the link opens the regulator's own lookup. Never a regulator's logo. */}
          <div id="registrations">
            <h3 className="type-h6 text-foreground">Registrations</h3>
            <div className="mt-4 overflow-x-auto rounded-lg border bg-card shadow-card">
              <table className="w-full min-w-[640px] text-left text-body-md">
                <caption className="sr-only">Registrations of Paraa Capital entities. All details to be confirmed.</caption>
                <thead className="border-b bg-background-alt text-body-sm tracking-[0.06em] text-faint uppercase">
                  <tr>
                    {["Entity", "Regulator", "Activity", "Number", "Check it"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr>
                    <td className="px-4 py-4">
                      <span className="text-foreground">Paraa Capital [legal name]</span> <ToConfirm />
                    </td>
                    <td className="px-4 py-4">
                      <ToConfirm />
                    </td>
                    <td className="px-4 py-4">
                      <ToConfirm />
                    </td>
                    <td className="px-4 py-4">
                      <ToConfirm />
                    </td>
                    <td className="px-4 py-4">
                      Lookup link <ToConfirm />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* §0.2.2 Company details. A foreign entity always gets its jurisdiction and role. */}
            <div>
              <h3 className="type-h6">Company details</h3>
              <dl className="mt-4 divide-y divide-border rounded-lg border bg-card text-body-md shadow-card">
                {(
                  [
                    ["Registered name", <ToConfirm key="n" />],
                    [
                      <abbr key="c" title="Corporate Identification Number">
                        CIN
                      </abbr>,
                      <>
                        <ToConfirm /> ·{" "}
                        <Link href="https://www.mca.gov.in/" className={inlineLink} rel="noopener noreferrer">
                          MCA lookup
                        </Link>
                      </>,
                    ],
                    ["Registered office", <ToConfirm key="r" />],
                    ["Operations office", <ToConfirm key="o" />],
                    [
                      "Foreign entities",
                      <>
                        [Entity], [country]: holds the fund&rsquo;s assets <ToConfirm />
                      </>,
                    ],
                  ] as const
                ).map(([dt, dd], i) => (
                  <div key={i} className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                    <dt className="font-semibold text-foreground">{dt}</dt>
                    <dd className="text-muted-foreground">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* §0.2.5 Grievance slot */}
            <div>
              <h3 className="type-h6">Grievances</h3>
              <p className="mt-4 text-body-md text-muted-foreground">
                Grievance officer: [Name] <ToConfirm /> · [email] <ToConfirm /> · [phone] <ToConfirm /> · We reply within [N]
                working days <ToConfirm />. Not satisfied? [Escalation route: regulator portal / ODR] <ToConfirm />.
              </p>
              <p className="mt-2">
                <SiteLink href="/grievances" className="inline-flex min-h-11 items-center text-body-md font-bold text-muted-foreground">
                  Complaint statistics
                </SiteLink>
              </p>
            </div>
          </div>

          {/* §0.2.3 Risk disclosure */}
          <GlobalRiskDisclosure />

          {/* §0.2.4 Conditional SEBI line: stays hidden until Compliance confirms a SEBI-registered
              entity offers the service. Its regulator-mandated verbatim text is inserted then. */}
          <p data-disclosure-id="sebi-mandated-v1" hidden />
        </div>

        {/* §0.2.6 Bottom line */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border-strong pt-6 text-body-sm text-faint md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> Paraa Capital [legal name <ToConfirm />]. Formerly Grade Capital.
          </p>
          <p id="rbi-alert" className="flex flex-wrap items-center gap-2">
            <Link href="https://rbi.org.in/" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground">
              Check whether any platform is authorised: RBI Alert List →
            </Link>
            <ToConfirm>URL TO CONFIRM</ToConfirm>
          </p>
        </div>
      </div>
    </footer>
  );
}
