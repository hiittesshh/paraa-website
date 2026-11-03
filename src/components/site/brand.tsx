// Brand lock-up used by the header and the footer: the official Paraa Capital wordmark
// (src/assets/paraa-logo.png, 235×92, transparent). The browser-tab and home-screen icons are
// src/app/icon.png and apple-icon.png (Next.js file conventions).
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logo from "@/assets/paraa-logo.png";

export function Brand({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Paraa Capital, home"
      className={cn("inline-flex min-h-11 shrink-0 items-center rounded-sm no-underline", className)}
    >
      <Image src={logo} alt="" priority className="h-10 w-auto" />
    </Link>
  );
}
