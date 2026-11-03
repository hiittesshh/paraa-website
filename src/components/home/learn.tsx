// "Learn before you invest": the door to the blog (lib/links BLOG_URL; not rendered while it's unset). The page's one dark panel
// (Primary #272A33, white text), so it reads as a way out of the page rather than another section.
// No article titles or topic lists: the blog's own titles would bring words onto this page that
// the site's copy rules keep off it, and a topic list would promise articles that may not exist. Gold appears only as fills (the top rule, the button); the focus
// ring is switched to gold because the default Primary ring would vanish against the panel.
import { ArrowUpRight, BookOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, Section } from "@/components/paraa/primitives";
import { BLOG_URL } from "@/lib/links";
import { cn } from "@/lib/utils";

export function Learn() {
  if (!BLOG_URL) return null;
  return (
    <Section id="learn" size="sm" labelledBy="learn-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl bg-ink text-primary-foreground shadow-lift">
          <div aria-hidden className="h-1 bg-secondary" />
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:p-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-3 bg-ink-2 px-2.5 py-0.5 text-body-sm font-bold text-grey-200">
                <BookOpen aria-hidden className="size-3.5" />
                From our blog
              </span>
              <h2 id="learn-title" className="mt-4 type-h3 text-balance text-primary-foreground">
                Learn before you invest
              </h2>
              <p className="mt-3 max-w-[52ch] text-body-lg text-grey-300">Simple guides on investing, tax and the markets.</p>
            </div>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "shrink-0 self-start focus-visible:outline-gold-500 lg:self-auto")}
            >
              Read the blog
              <ArrowUpRight aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
