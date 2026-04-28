import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import Slot from "../../lib/Slot";
import { cn } from "../../lib/utils";

const containerVariants = cva("w-full", {
  defaultVariants: {
    center: true,
    gutter: "md",
    size: "lg",
  },
  variants: {
    center: {
      false: "mx-0",
      true: "mx-auto",
    },
    gutter: {
      lg: "px-8",
      md: "px-6",
      none: "px-0",
      sm: "px-4",
    },
    size: {
      "2xl": "max-w-(--breakpoint-2xl)",
      fluid: "max-w-full",
      lg: "max-w-(--breakpoint-lg)",
      md: "max-w-(--breakpoint-md)",
      sm: "max-w-(--breakpoint-sm)",
      xl: "max-w-(--breakpoint-xl)",
    },
  },
});

export interface ContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

function Container({
  asChild,
  center,
  className,
  gutter,
  size,
  ...props
}: ContainerProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn(containerVariants({ center, gutter, size }), className)}
      {...props}
    />
  );
}

export { Container };
export type { containerVariants };
