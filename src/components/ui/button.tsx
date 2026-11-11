// Buttons (spec §4.3). <Button> is a native <button> for actions (v1.3: no UI library, §9); <ButtonLink> is
// a plain <a> for navigation (v1.5, decision 68: HashHandler owns the in-page jumps). Never a div. One label
// per action across the page ("Ask a CA").
//
// primary: one action per screen (hero "Ask a CA", form submit). secondary: outline (header "Ask a CA",
// "Ask another question", "Try again", "Copy my question"). quiet: no border (reset, prompts, Copy).
//
// No client directive here on purpose, so server components can import ButtonLink. <Button> attaches event
// handlers and a measuring ref, so render it from a client component (every Button on the page lives in
// one: AskForm, QuestionPrompts, WhatIf, TaxEstimator).
import type { ComponentProps, MouseEvent, Ref } from "react";
import { cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border font-semibold whitespace-nowrap transition-colors duration-150 ease-out motion-safe:active:scale-97 aria-disabled:cursor-not-allowed aria-disabled:not-aria-busy:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover active:bg-primary-active",
        secondary: "border-input bg-transparent text-foreground hover:border-foreground hover:bg-accent",
        quiet: "border-transparent bg-transparent text-foreground hover:bg-accent",
      },
      // min-h, not h: a quiet prompt button wraps to two lines at 320 (spec §8, 1.4.12). A one-line
      // button still renders exactly 44 / 48px tall.
      size: {
        md: "min-h-11 px-4 text-body-md",
        lg: "min-h-12 px-6 text-body-lg",
        icon: "size-11",
      },
      block: {
        true: "w-full sm:w-auto",
        false: "",
      },
    },
  },
);

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg" | "icon";

type ButtonProps = Omit<ComponentProps<"button">, "className" | "ref"> & {
  variant: Variant;
  size: Size;
  /** Full width below 640, auto from 640. */
  block?: boolean;
  /**
   * The sending state: a leading spinner and the label you pass ("Sending…"), aria-busy and
   * aria-disabled, clicks do nothing, and the width stays what it was before, so nothing shifts.
   */
  loading?: boolean;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
};

function Button({
  variant,
  size,
  block = false,
  loading = false,
  className,
  children,
  onClick,
  ref,
  type = "button",
  "aria-disabled": ariaDisabled,
  ...props
}: ButtonProps) {
  // aria-disabled, never `disabled` (spec §4 shared states): the button stays focusable and its reason
  // stays readable. A click on it, or an Enter that would submit the form through it, does nothing.
  const unavailable = loading || ariaDisabled === true || ariaDisabled === "true";

  // Width lock (spec §4.3): measure the idle width as --w; while loading, min-width holds it.
  const measure = (el: HTMLButtonElement | null) => {
    if (el && !loading) el.style.setProperty("--w", `${el.getBoundingClientRect().width}px`);
    if (typeof ref === "function") return ref(el);
    if (ref) ref.current = el;
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (unavailable) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    // `type` defaults to "button" (as the Base UI primitive did), so only an explicit type="submit" submits.
    <button
      ref={measure}
      type={type}
      aria-disabled={unavailable || undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size, block }), loading && "min-w-[var(--w)]", className)}
      {...props}
    >
      {loading && <LoaderCircle aria-hidden className="motion-safe:animate-spin" />}
      {children}
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "className" | "href"> & {
  href: string;
  variant: Variant;
  size: Exclude<Size, "icon">;
  block?: boolean;
  className?: string;
};

/** A link styled as a button, for navigation ("Ask a CA" → /#ask). */
function ButtonLink({ variant, size, block = false, className, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size, block }), className)} {...props} />;
}

export { Button, ButtonLink, buttonVariants };
export type { ButtonProps, ButtonLinkProps };
