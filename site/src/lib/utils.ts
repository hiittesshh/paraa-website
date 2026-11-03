import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge must know our custom design-file sizes (text-body-xl … text-body-xs) are
// font sizes. Without this it treats them as text *colours* and silently drops a real colour
// such as text-primary-foreground (it made the labels on gold buttons pale).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["body-xl", "body-lg", "body-md", "body-sm", "body-xs"] }],
    },
  },
});

// Standard shadcn helper: join class names, letting later Tailwind classes win conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
