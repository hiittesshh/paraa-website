// Brand lock-up used by the header and the footer: a gold "P" tile + "Paraa Capital".
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
        className="grid size-8 place-items-center rounded-sm bg-primary text-body-lg leading-none font-extrabold text-primary-foreground"
      >
        P
      </span>
      <span aria-hidden className="text-body-lg tracking-tight">
        <span className="font-semibold">Paraa</span> <b className="font-extrabold">Capital</b>
      </span>
    </Link>
  );
}
