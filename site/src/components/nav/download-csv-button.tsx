"use client";

// Client-side CSV download (spec A6 §6): the file is generated in the browser from the
// dataset by buildCsv(), so what you download is exactly what the page shows.
import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { buildCsv } from "@/lib/calc";

export const CSV_FILENAME = "paraa-basket-1-nav-history-illustrative.csv";

export function DownloadCsvButton({
  children = "Download CSV",
  variant = "outline",
  className,
}: {
  children?: ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) {
  const download = () => {
    const blob = new Blob([buildCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = CSV_FILENAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <Button type="button" variant={variant} onClick={download} className={className}>
      <Download aria-hidden />
      {children}
    </Button>
  );
}
