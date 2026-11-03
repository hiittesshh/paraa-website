// Brand lock-up used by the header and the footer: a Primary "P" tile + "Paraa Capital".
// Weights stay on the design file's scale (Extrabold is only used at 12/10px, so Bold here).
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Paraa Capital, home"
      className={cn("inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-sm text-foreground no-underline", className)}
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-sm bg-primary text-body-lg leading-none font-bold text-primary-foreground shadow-card"
      >
        P
      </span>
      <span aria-hidden className="text-body-lg tracking-tight">
        <span className="font-medium">Paraa</span> <b className="font-bold">Capital</b>
      </span>
    </Link>
  );
}
