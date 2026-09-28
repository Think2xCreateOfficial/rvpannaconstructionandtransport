/* eslint-disable react-refresh/only-export-components */
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border px-5 text-xs font-bold uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-primary-foreground hover:bg-primary/88",
        gold: "border-highlight bg-highlight text-highlight-foreground hover:bg-highlight-soft",
        glass:
          "border-highlight/50 bg-highlight/20 text-highlight backdrop-blur-md hover:border-highlight hover:bg-highlight hover:text-highlight-foreground",
        outline: "border-current bg-transparent text-current hover:bg-foreground/10",
        light: "border-background bg-background text-foreground hover:bg-background/90",
        ghost: "border-transparent bg-transparent text-current hover:border-current/30",
      },
      size: {
        default: "h-12",
        sm: "h-11 px-4",
        lg: "h-14 px-7",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
