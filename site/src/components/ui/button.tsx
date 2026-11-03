import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn button, resized to the 44px touch-target minimum and restyled to the design file:
// gold is the one accent, and labels on gold are always dark (white on gold fails contrast).
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent font-bold whitespace-nowrap no-underline transition-[background-color,border-color,color,transform] duration-150 ease-out-soft outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline: "border-border-strong bg-transparent text-foreground hover:border-muted-foreground",
        ghost: "bg-transparent text-muted-foreground hover:text-foreground",
        link: "h-auto! px-0! text-accent hover:underline underline-offset-4",
      },
      size: {
        default: "h-11 px-5 text-body-md",
        lg: "h-13 px-7 text-body-lg",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
