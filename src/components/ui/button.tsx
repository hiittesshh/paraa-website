import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn button: gold with a dark label is the main action on the dark page, and Primary #272A33
// inside a light card (surface-light). Pills, like the references. 44px minimum touch target.
// Motion: colour on hover, a press-down on click; all 150ms on the soft ease.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent font-bold whitespace-nowrap no-underline transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out-soft outline-none select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        outline: "border-border-strong bg-transparent text-foreground hover:border-foreground hover:bg-foreground/10",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "h-auto! px-0! text-accent underline-offset-4 hover:underline",
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
