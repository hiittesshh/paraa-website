// Section 11: partner programme teaser (Concept C, C5.6, post-audit form).
// Partner-only content. Per rulebook R13, no commission figures on the homepage: only the
// heading and the trail-commission line, with no earnings maths. The partner page doesn't exist yet,
// so the CTA is a marked mailto placeholder, never a link to a 404.
//
// Light theme: the one dark panel on the page (Primary #272A33, white text), so the partner door
// reads as distinct from the investor sections. Gold appears only as fills (icon chips, the top
// rule, the button); gold *text* would be gold-800, which fails on this dark surface. The focus
// ring is switched to gold here because the default Primary ring would vanish against the panel.
import { ClipboardCheck, FileText, Mail, ShieldCheck, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { RevealGroup, RevealItem, Reveal, Section, ToConfirm } from "@/components/paraa/primitives";
import { cn } from "@/lib/utils";

const PARTNER_EMAIL = "partners@paraacapital.com";

const IN_WRITING = [
  { icon: FileText, title: "The commission schedule", body: "Every rate and when it's paid, in one document you can show a client." },
  { icon: ShieldCheck, title: "A compliance kit", body: "Including the card that lists what a partner must never say." },
  { icon: ClipboardCheck, title: "Client materials, pre-approved", body: "So what you hand over matches what this site says." },
];

// On the dark panel the tag needs a solid yellow fill, or its Primary text sits on near-Primary.
const TC_ON_DARK = "bg-warning";

export function PartnerCard() {
  return (
    <Section id="partners" size="sm" labelledBy="partners-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl bg-ink text-primary-foreground shadow-lift">
          <div aria-hidden className="h-1 bg-secondary" />
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-12">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-3 bg-ink-2 px-2.5 py-0.5 text-body-sm font-bold text-grey-200">
                <Users aria-hidden className="size-3.5" />
                For advisors, distributors and CAs
              </span>
              <h2 id="partners-title" className="type-h3 text-balance text-primary-foreground">
                For advisors: what you earn, written down
              </h2>
              <p className="text-body-lg text-grey-300">
                Trail commission on invested amounts, paid [monthly]{" "}
                <span className="whitespace-nowrap">
                  <ToConfirm className={TC_ON_DARK} />.
                </span>
              </p>
              <p className="text-body-lg text-grey-300">
                No targets. No contests.{" "}
                <ToConfirm className={TC_ON_DARK}>No-churn claim depends on upfront commission: to confirm</ToConfirm>
              </p>
              <p className="text-body-sm text-grey-400">
                Investors: your advisor may be paid by us. The fee receipt above shows what you pay.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={`mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent("Partner programme")}`}
                  className={cn(buttonVariants({ variant: "secondary" }), "focus-visible:outline-gold-500")}
                >
                  <Mail aria-hidden />
                  Email the partner team
                </a>
                <span className="flex flex-wrap items-center gap-2 text-body-sm text-grey-300">
                  {PARTNER_EMAIL} <ToConfirm className={TC_ON_DARK} />
                </span>
              </div>
              <p className="text-body-sm text-grey-400">Partner page with the full schedule: coming soon.</p>
            </div>

            <div className="rounded-lg border border-ink-3 bg-ink-2 p-5 sm:p-6">
              <p className="flex flex-wrap items-center gap-2 text-body-sm font-extrabold tracking-[0.06em] text-grey-300 uppercase">
                What partners get in writing <ToConfirm className={TC_ON_DARK} />
              </p>
              <RevealGroup as="ul" className="mt-5 space-y-5">
                {IN_WRITING.map(({ icon: Icon, title, body }) => (
                  <RevealItem as="li" key={title} className="flex gap-4">
                    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary text-ink">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-body-md font-bold text-primary-foreground">{title}</span>
                      <span className="mt-0.5 block text-body-sm text-grey-300">{body}</span>
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
