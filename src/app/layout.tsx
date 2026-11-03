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
    default: "Paraa Capital: invest in US stocks, gold and crude oil from India",
    template: "%s · Paraa Capital",
  },
  description:
    "One international basket of US stocks, gold and crude oil, bought in rupees. No tax when you invest, and a chartered accountant for every investor.",
  openGraph: { siteName: "Paraa Capital", locale: "en_IN", type: "website" },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
