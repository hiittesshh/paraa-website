import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn button, mapped to the design file: Primary #272A33 (white label) is the main action,
// Secondary #FDC037 (dark label) is the gold highlight. 44px minimum touch target.
// Motion: colour + a 1px lift on hover, a press-down on click; all ~200ms on the soft ease.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent font-bold whitespace-nowrap no-underline transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-soft outline-none select-none hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover hover:shadow-lift",
        secondary: "bg-secondary text-secondary-foreground shadow-card hover:bg-secondary-hover hover:shadow-lift",
        outline: "border-border-strong bg-card text-foreground hover:border-ink hover:bg-grey-50",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "h-auto! px-0! text-accent underline-offset-4 hover:translate-y-0 hover:underline",
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
