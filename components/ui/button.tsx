import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-white shadow-[0_10px_30px_-14px_rgba(11,31,58,0.75)] hover:bg-brand-soft hover:-translate-y-0.5",
        gold: "bg-gradient-to-r from-gold-deep via-gold to-gold-light text-brand-strong shadow-gold hover:brightness-105 hover:-translate-y-0.5",
        whatsapp:
          "bg-[#25D366] text-[#07321c] shadow-[0_10px_28px_-12px_rgba(37,211,102,0.8)] hover:brightness-105 hover:-translate-y-0.5",
        outline:
          "border border-line bg-surface text-brand hover:border-gold hover:text-gold-deep",
        ghost: "text-brand hover:bg-brand/5 hover:text-gold-deep",
        light:
          "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20 hover:ring-gold/70",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-[0.95rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
