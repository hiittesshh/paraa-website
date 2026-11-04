// "CA Advisors": every investor is assigned a chartered accountant when they join. Three solid
// tiles on what the CA does, each with its own drawing, then the "Talk to a CA" form (#ask,
// ask-form.tsx) for anyone who hasn't joined yet, on a full gold band. No names or faces until
// real CAs have agreed (R11).
import { Reveal, RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
import { cn } from "@/lib/utils";
import { AskForm } from "./ask-form";
import { ChatArt, FileArt, PlanArt } from "./asset-art";

const POINTS = [
  {
    art: PlanArt,
    title: "Plans with you",
    body: "Helps you decide how much to invest, based on your income and goals.",
    tile: "surface-ink",
    quiet: "text-grey-300",
  },
  {
    art: ChatArt,
    title: "Answers your questions",
    body: "Someone to call when markets move or your plans change.",
    tile: "bg-gold-100 text-ink",
    quiet: "text-ink",
  },
  {
    art: FileArt,
    title: "Files your tax",
    body: "Works out your income from the basket and files your return.",
    tile: "bg-grey-400 text-ink",
    quiet: "text-ink",
  },
];

export function Advisors() {
  return (
    <>
      <Section id="advisors" tone="alt" labelledBy="advisors-title">
        <SectionHead
          id="advisors-title"
          title={
            <>
              A chartered accountant for <Mark>every investor</Mark>
            </>
          }
          lede="When you join, a CA is assigned to you. They guide you from your first investment to your tax return."
        />
        <RevealGroup as="ul" className="grid gap-3 md:grid-cols-3">
          {POINTS.map(({ art: Art, title, body, tile, quiet }) => (
            <RevealItem as="li" key={title} className="flex">
              <div
                className={cn(
                  "flex w-full flex-col rounded-xl p-6 transition-[transform,box-shadow] duration-200 ease-out-soft hover:-translate-y-1 hover:shadow-lift sm:p-8",
                  tile,
                )}
              >
                <Art className="mx-auto mb-8 h-40 w-auto" />
                <h3 className="mt-auto type-h4">{title}</h3>
                <p className={cn("mt-2 text-body-lg", quiet)}>{body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <section id="ask" aria-labelledby="ask-title" className="scroll-mt-16 bg-secondary py-20 text-ink md:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="ask-title" className="type-h2 text-balance">
              Have a question? Ask a CA.
            </h2>
            <p className="mt-4 max-w-[40ch] text-body-xl">
              Send us your question. A CA from our team will call you back. It&rsquo;s free and you don&rsquo;t need an account.
            </p>
            <ChatArt className="mt-10 hidden w-56 lg:block" />
          </div>
          <Reveal>
            <AskForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
