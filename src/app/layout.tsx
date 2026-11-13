import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Manrope is the only typeface (spec §3.2). It's a variable font, so no `weight` array: one file per
// subset covers 400, 600 and 700. `latin-ext` holds the rupee sign (U+20B9). With only `latin` preloaded,
// ₹ arrived late and swapped in after first paint, so both subsets are listed and both get preloaded.
// next/font self-hosts the files at build time: no request goes to Google from the visitor's browser.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Spec §6.0. The page sets its own `title.absolute`; these are the defaults for every route.
const TITLE = "Paraa Capital: a basket that follows US stocks, gold and crude oil, for residents of India";
const DESCRIPTION =
  "One basket that follows US stocks, gold and crude oil, for residents of India. You add money and withdraw in rupees.";

export const metadata: Metadata = {
  // Unchanged until the official domain is confirmed (spec §12, launch blocker 5).
  metadataBase: new URL("https://paraacapital.com"),
  title: { default: TITLE, template: "%s · Paraa Capital" },
  description: DESCRIPTION,
  openGraph: {
    siteName: "Paraa Capital",
    locale: "en_IN",
    type: "website",
    title: "A basket that follows US stocks, gold and crude oil",
    description: DESCRIPTION,
  },
};

// The only hex outside globals.css: the Next API needs a literal (spec §2.2).
export const viewport: Viewport = { themeColor: "#FFFFFF", colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${manrope.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* The header and hero look (owner, 13 Nov 2026): a saved "dark" choice is applied before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("paraa-look")==="dark")document.documentElement.dataset.look="dark"}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
