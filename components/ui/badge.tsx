import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-chinese-red text-white",
        secondary: "border-transparent bg-dark-card text-white/70",
        gold: "border-gold/30 bg-gold/10 text-gold",
        outline: "border-current text-white/60",
        success: "border-green-800/30 bg-green-900/20 text-green-400",
        warning: "border-yellow-800/30 bg-yellow-900/20 text-yellow-400",
        destructive: "border-red-800/30 bg-red-900/20 text-red-400",
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
