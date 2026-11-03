// A5.2 "Every claim, checkable": four slots a visitor can verify, each honestly marked until
// it holds a real, linked value (rulebook R6). Card 1's title is the audit-fixed prototype copy.
import type { ReactNode } from "react";
import { Download, FileCheck2, Landmark, LockKeyhole, type LucideIcon } from "lucide-react";
import { ArrowLink, Illustrative, Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { DownloadCsvButton } from "@/components/site/download-csv-button";

const CARDS: { icon: LucideIcon; title: string; body: string; value: ReactNode; action?: ReactNode }[] = [
  {
    icon: Landmark,
    title: "Our registrations, if any",
    body: "Entity, regulator and registration number, each linked to the regulator's own lookup.",
    value: <ToConfirm />,
    action: <ArrowLink href="#registrations">Registrations</ArrowLink>,
  },
  {
    icon: FileCheck2,
    title: "Who audits the NAV",
    body: "The audit firm's name and its dated report, downloadable.",
    value: <ToConfirm />,
  },
  {
    icon: LockKeyhole,
    title: "Who holds the assets",
    body: "The custodian, by name, and what happens if they fail.",
    value: <ToConfirm />,
  },
  {
    icon: Download,
    title: "Every NAV, ever",
    body: "Full history as a CSV. Nothing removed, revisions marked.",
    value: <Illustrative />,
    action: (
      <DownloadCsvButton variant="link" icon={false} className="group min-h-11 gap-1 text-body-md hover:no-underline">
        Download CSV
        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </DownloadCsvButton>
    ),
  },
];

export function TrustChecks() {
  return (
    <Section id="checks" tone="alt" size="sm" labelledBy="checks-title">
      <SectionHead id="checks-title" eyebrow="Every claim, checkable" title="Four things you can check without trusting us" />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ icon: Icon, title, body, value, action }, i) => (
          <Reveal as="li" key={title} delay={i + 1} className="flex">
            <article className="flex w-full flex-col rounded-lg border bg-card p-6 transition-colors duration-200 hover:border-border-strong">
              <span aria-hidden className="grid size-11 place-items-center rounded-md border bg-muted text-foreground">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 type-h6">{title}</h3>
              <p className="mt-2 text-body-md text-muted-foreground">{body}</p>
              <div className="mt-auto pt-5">
                <div className="border-t pt-4">{value}</div>
                {action && <div className="mt-1">{action}</div>}
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className="mt-8 max-w-[70ch] border-l-2 border-warning/60 pl-4 text-body-md text-muted-foreground">
          Until each slot above holds a real, linked number, it stays marked <ToConfirm />. An empty slot that looked filled
          would be worse.
        </p>
      </Reveal>
    </Section>
  );
}
