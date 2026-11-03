// Hero comparison previews: /preview/a … /preview/d render the full homepage with one hero variant
// each, plus a floating switcher. Temporary: delete this folder once the choice is final.
// noindex: search engines must not list these, and nothing on the site links here.
import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/home-page";
import type { HeroVariant } from "@/components/home/hero";
import { PreviewSwitcher } from "@/components/home/preview-switcher";

const VARIANTS: readonly HeroVariant[] = ["a", "b", "c", "d"];

export function generateStaticParams() {
  return VARIANTS.map((variant) => ({ variant }));
}

export const metadata: Metadata = {
  title: "Hero preview",
  robots: { index: false, follow: false },
};

// With Cache Components on, reading route params must happen inside a <Suspense> boundary.
export default function HeroPreview({ params }: PageProps<"/preview/[variant]">) {
  return (
    <Suspense>
      <Preview params={params} />
    </Suspense>
  );
}

async function Preview({ params }: { params: PageProps<"/preview/[variant]">["params"] }) {
  const { variant } = await params;
  if (!VARIANTS.includes(variant as HeroVariant)) notFound();
  return (
    <>
      <HomePage hero={variant as HeroVariant} />
      <PreviewSwitcher current={variant as HeroVariant} />
    </>
  );
}
