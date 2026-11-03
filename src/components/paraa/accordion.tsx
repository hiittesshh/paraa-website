"use client";

// FAQ / methodology accordion. Visual pattern from Watermelon UI "accordion-9"
// (bordered cards, chevron on the left, deeper shadow when open), built directly on
// @radix-ui/react-accordion, which handles aria-expanded, aria-controls and keyboard support.
// Light theme: white cards that take the card shadow when open; the panel height animates from
// Radix's measured --radix-accordion-content-height over 300ms on the soft ease.
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
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
          className="rounded-lg border bg-card transition-[border-color,box-shadow] duration-200 ease-out-soft hover:border-border-strong data-[state=open]:border-border-strong data-[state=open]:shadow-card"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group flex min-h-14 flex-1 cursor-pointer items-center gap-3 rounded-lg px-5 py-4 text-left text-body-lg font-bold text-foreground">
              <ChevronRight aria-hidden className="size-5 shrink-0 text-accent transition-transform duration-300 ease-out-soft group-data-[state=open]:rotate-90" />
              <span>{item.title}</span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-muted-foreground duration-300 ease-out-soft data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="max-w-[70ch] px-5 pb-5 pl-13 [&_p+p]:mt-3">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
