"use client";

// "Download CSV" for the trust strip and the closing CTA. The file is generated in the browser
// from the same illustrative dataset the rest of the site uses (lib/calc buildCsv), so the
// download can never disagree with the numbers on screen.
import type { ReactNode } from "react";
import { Download } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { buildCsv } from "@/lib/calc";
import { cn } from "@/lib/utils";

const FILE_NAME = "paraa-basket-1-nav-history-illustrative.csv";

export function DownloadCsvButton({
  children = "Download CSV",
  className,
  variant,
  size,
  icon = true,
}: {
  children?: ReactNode;
  className?: string;
  icon?: boolean;
} & VariantProps<typeof buttonVariants>) {
  const download = () => {
    const blob = new Blob([buildCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = FILE_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoke after the browser has picked up the file; revoking synchronously can cancel the
    // download in Safari/Firefox (same as components/nav/download-csv-button).
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <Button type="button" onClick={download} variant={variant} size={size} className={cn(className)}>
      {icon && <Download aria-hidden />}
      {children}
    </Button>
  );
}
