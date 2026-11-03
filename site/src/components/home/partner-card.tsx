// Section 11: partner programme teaser (Concept C, C5.6, post-audit form).
// Partner-only content. Per rulebook R13, no commission figures on the homepage: only the
// heading and the trail-commission line, with no earnings maths. The partner page doesn't exist yet,
// so the CTA is a marked mailto placeholder, never a link to a 404.
import { ClipboardCheck, FileText, Mail, ShieldCheck, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge, Reveal, Section, ToConfirm } from "@/components/paraa/primitives";
import { cn } from "@/lib/utils";

const PARTNER_EMAIL = "partners@paraacapital.com";

const IN_WRITING = [
  { icon: FileText, title: "The commission schedule", body: "Every rate and when it's paid, in one document you can show a client." },
  { icon: ShieldCheck, title: "A compliance kit", body: "Including the card that lists what a partner must never say." },
  { icon: ClipboardCheck, title: "Client materials, pre-approved", body: "So what you hand over matches what this site says." },
];

export function PartnerCard() {
  return (
    <Section id="partners" tone="alt" size="sm" labelledBy="partners-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-lg border border-gold-500/30 bg-card">
          {/* a single quiet gold wash marks this as the partner door, distinct from investor sections */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-60"
          />
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-12">
            <div className="space-y-4">
              <Badge>
                <Users aria-hidden className="size-3.5" />
                For advisors, distributors and CAs
              </Badge>
              <h2 id="partners-title" className="type-h3 text-balance">
                For advisors: what you earn, written down
              </h2>
              <p className="text-body-lg text-muted-foreground">
                Trail commission on invested amounts, paid [monthly] <ToConfirm />.
              </p>
              <p className="text-body-lg text-muted-foreground">
                No targets. No contests.{" "}
                <ToConfirm>No-churn claim depends on upfront commission: to confirm</ToConfirm>
              </p>
              <p className="text-body-sm text-faint">
                Investors: your advisor may be paid by us. The fee receipt above shows what you pay.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={`mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent("Partner programme")}`}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  <Mail aria-hidden />
                  Email the partner team
                </a>
                <span className="flex flex-wrap items-center gap-2 text-body-sm text-muted-foreground">
                  {PARTNER_EMAIL} <ToConfirm />
                </span>
              </div>
              <p className="text-body-sm text-faint">Partner page with the full schedule: coming soon.</p>
            </div>

            <div className="rounded-md border bg-background-alt p-5 sm:p-6">
              <p className="text-body-sm font-extrabold tracking-[0.06em] text-muted-foreground uppercase">
                What partners get in writing <ToConfirm className="ml-1" />
              </p>
              <ul className="mt-4 space-y-4">
                {IN_WRITING.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-3">
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-body-md font-bold">{title}</span>
                      <span className="block text-body-sm text-muted-foreground">{body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
