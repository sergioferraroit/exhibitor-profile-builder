import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary: solid blue background, white text, pill shape
        default: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        // Secondary: white/transparent background with blue border, blue text
        secondary: "rounded-full border border-primary bg-background text-primary hover:bg-primary/10 active:bg-primary/20",
        // Tertiary: no background, no border, just text
        tertiary: "rounded-full text-primary hover:bg-primary/10 active:bg-primary/20",
        // Ghost: similar to tertiary but more subtle
        ghost: "rounded-full hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        // Destructive: red solid background
        destructive: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        // Outline: neutral border
        outline: "rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        // Link: underlined text
        link: "text-primary underline-offset-4 hover:underline",
        // Icon button: for icon-only buttons with border
        icon: "rounded-full border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
