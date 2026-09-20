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

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 p-1",
  {
    defaultVariants: {
      size: "md",
      variant: "ghost",
    },
    variants: {
      size: {
        lg: "h-12 w-12",
        md: "h-10 w-10",
        sm: "h-8 w-8",
        xs: "h-6 w-6",
      },
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        ghost: "bg-transparent hover:bg-surface-secondary",
        outline:
          "border border-border bg-transparent hover:bg-surface-secondary text-text",
      },
    },
  },
);

export interface IconButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {
  /**
   * An aria-label is STRICTLY REQUIRED for icon-only buttons so screen readers
   * can announce what the button does.
   */
  "aria-label": string;
}

function IconButton({
  className,
  ref,
  size,
  variant,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(iconButtonVariants({ className, size, variant }))}
      ref={ref}
      type={props.type || "button"}
      {...props}
    />
  );
}

export { Icon, IconButton };
