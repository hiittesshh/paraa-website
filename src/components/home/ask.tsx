// "Talk to a CA": the page ends on the action itself, as a white card on a full band of brand gold,
// like the band Wise gives its calculator. Ready when seen, so no reveal.
import { AskForm } from "./ask-form";

const NEXT = ["Your question goes to our team.", "We contact you about it.", "You decide what to do next."];

export function Ask() {
  return (
    <section id="ask" aria-labelledby="ask-title" className="scroll-mt-16 bg-secondary py-20 text-ink md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <div>
          <h2 id="ask-title" className="type-h1 text-balance">
            Ask a chartered accountant before you decide
          </h2>
          <p className="mt-4 text-body-xl">You don&rsquo;t need an account to ask.</p>
          <ol className="mt-8 space-y-3">
            {NEXT.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-body-lg font-semibold">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-body-md font-bold text-white num">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-8 text-body-md">
            Your CA may be paid by us.
          </p>
        </div>
        <AskForm />
      </div>
    </section>
  );
}
