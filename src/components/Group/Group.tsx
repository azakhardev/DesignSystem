import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import Slot from "../../lib/Slot";
import { cn } from "../../lib/utils";

const groupVariants = cva("flex items-center", {
  defaultVariants: {
    align: "center",
    gap: 2,
    grow: false,
    justify: "start",
    wrap: false,
  },
  variants: {
    align: {
      baseline: "items-baseline",
      center: "items-center",
      end: "items-end",
      start: "items-start",
      stretch: "items-stretch",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    grow: {
      false: "[&>*]:flex-none",
      true: "[&>*]:flex-1",
    },
    justify: {
      around: "justify-around",
      between: "justify-between",
      center: "justify-center",
      end: "justify-end",
      start: "justify-start",
    },
    wrap: {
      false: "flex-nowrap",
      true: "flex-wrap",
    },
  },
});

export interface GroupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof groupVariants> {
  asChild?: boolean;
}

function Group({
  align,
  asChild,
  className,
  gap,
  grow,
  justify,
  wrap,
  ...props
}: GroupProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn(
        groupVariants({ align, gap, grow, justify, wrap }),
        className,
      )}
      {...props}
    />
  );
}

export { Group };
export type { groupVariants };
