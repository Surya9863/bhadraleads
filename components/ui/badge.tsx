import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand text-white",
        gold: "border-gold/40 bg-gold/10 text-gold-deep",
        outline: "border-line bg-surface text-muted",
        light: "border-white/25 bg-white/10 text-white backdrop-blur",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
