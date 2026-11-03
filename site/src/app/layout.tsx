import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

// Manrope is the only typeface in the design file. next/font self-hosts it at build time,
// so no request goes to Google from the visitor's browser.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paraacapital.com"),
  title: {
    default: "Paraa Capital: invest in dollars, check every number first",
    template: "%s · Paraa Capital",
  },
  description:
    "USD-denominated investing from India. Every NAV, every fee in rupees and every correction we make, published, dated and downloadable.",
  openGraph: { siteName: "Paraa Capital", locale: "en_IN", type: "website" },
};

export const viewport: Viewport = { themeColor: "#131416", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`dark ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
