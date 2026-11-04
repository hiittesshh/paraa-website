"use client";

// FAQ accordion, built directly on @radix-ui/react-accordion, which handles aria-expanded,
// aria-controls and keyboard support. Solid tiles: an open question fills with brand gold, and its
// chevron sits in a white disc at the end of the row. The panel height animates from Radix's
// measured --radix-accordion-content-height on the soft ease.
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccordionEntry {
  value: string;
  title: ReactNode;
  content: ReactNode;
}

export function Accordion({
  items,
  defaultOpen,
  className,
}: {
  items: AccordionEntry[];
  defaultOpen?: string[];
  className?: string;
}) {
  return (
    <AccordionPrimitive.Root type="multiple" defaultValue={defaultOpen} className={cn("w-full space-y-2", className)}>
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.value}
          value={item.value}
          className="rounded-xl bg-muted transition-colors duration-200 ease-out-soft hover:bg-grey-200 data-[state=open]:bg-secondary data-[state=open]:hover:bg-secondary"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group flex min-h-16 flex-1 cursor-pointer items-center justify-between gap-4 rounded-xl px-6 py-3 text-left type-h6 text-foreground">
              <span>{item.title}</span>
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-card">
                <ChevronDown className="size-5 transition-transform duration-200 ease-out-soft group-data-[state=open]:rotate-180" />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-ink duration-200 ease-out-soft data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="max-w-[65ch] px-6 pb-6 [&_p+p]:mt-3">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
