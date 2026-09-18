import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "../../lib/utils";

const iconVariants = cva("shrink-0 transition-colors", {
  defaultVariants: {
    color: "inherit",
    size: "md",
  },
  variants: {
    color: {
      default: "text-text",
      error: "text-error-text",
      info: "text-info-text",
      inherit: "text-current",
      muted: "text-text-secondary",
      primary: "text-primary",
      success: "text-success-text",
      warning: "text-warning-text",
    },
    size: {
      "2xl": "h-14 w-14",
      "3xl": "h-16 w-16",
      lg: "h-10 w-10",
      md: "h-8 w-8",
      sm: "h-6 w-6",
      xl: "h-12 w-12",
      xs: "h-4 w-4",
    },
  },
});

export interface IconProps
  extends
    Omit<React.ComponentProps<"svg">, "color">,
    VariantProps<typeof iconVariants> {
  /** The SVG icon component to render (e.g., from lucide-react) */
  as: React.ElementType;
}

function Icon({ as: Component, className, color, size, ...props }: IconProps) {
  return (
    <Component
      className={cn(iconVariants({ color, size }), className)}
      {...props}
    />
  );
}

export { Icon };
