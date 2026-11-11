import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge must know our custom sizes (text-body-xl, -lg, -md) are font sizes (spec §2.3).
// Without this it treats them as text *colours* and silently drops a real colour such as
// text-primary-foreground, or a colour role such as text-copy.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["body-xl", "body-lg", "body-md", "micro"] }],
    },
  },
});

// Standard shadcn helper: join class names, letting later Tailwind classes win conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
