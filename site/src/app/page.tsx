import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: { absolute: "Paraa Capital: invest in dollars, check every number first" },
  description:
    "USD-denominated investing from India. Every fee in rupees, every hand your money passes through, and what the rupee does to your returns, in both directions.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Invest in dollars. Check every number first.",
    description: "Every fee in rupees, every hand your money passes through, both directions of the rupee.",
    url: "/",
  },
};

// The live homepage uses hero variant C (3-card fan, pinned while it plays), chosen 2026-11-03.
export default function Home() {
  return <HomePage hero="c" />;
}
