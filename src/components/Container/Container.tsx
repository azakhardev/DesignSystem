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
      "2xl": "max-w-screen-2xl",
      fluid: "max-w-full",
      lg: "max-w-screen-lg",
      md: "max-w-screen-md",
      sm: "max-w-screen-sm",
      xl: "max-w-screen-xl",
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
