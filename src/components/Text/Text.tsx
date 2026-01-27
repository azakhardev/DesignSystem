import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "../../lib/utils";

const textVariants = cva("m-0 leading-normal transition-colors", {
  defaultVariants: {
    align: "left",
    color: "default",
    italic: false,
    size: "base",
    underline: false,
    weight: "normal",
  },
  variants: {
    align: {
      center: "text-center",
      justify: "text-justify",
      left: "text-left",
      right: "text-right",
    },
    color: {
      default: "text-text",
      error: "text-error-text",
      info: "text-info-text",
      muted: "text-text-secondary dark:text-slate-400",
      success: "text-success-text",
      warning: "text-warning-text",
    },
    italic: {
      false: "",
      true: "italic",
    },
    size: {
      "2xl": "text-2xl md:text-3xl",
      "3xl": "text-3xl md:text-4xl",
      "4xl": "text-4xl md:text-5xl",
      base: "text-base",
      lg: "text-lg",
      sm: "text-sm",
      xl: "text-xl",
      xs: "text-xs",
    },
    underline: {
      false: "",
      true: "underline",
    },
    weight: {
      bold: "font-bold",
      medium: "font-medium",
      normal: "font-normal",
      semibold: "font-semibold",
    },
  },
});

//creates variant props from the textVariant function args
type TextVariantsProps = VariantProps<typeof textVariants>;

type TextProps<C extends React.ElementType> = {
  //Automatically sets generic type C after developer sets as props (otherwise falls back to p)
  as?: C;
  className?: string;
  children?: React.ReactNode;
  // Explicilty tells that the ref has a type of element C
  ref?: React.ComponentPropsWithRef<C>["ref"];
} & TextVariantsProps &
  React.ComponentPropsWithoutRef<C>;

function Text<C extends React.ElementType = "p">({
  align,
  as,
  children,
  className,
  color,
  italic,
  ref,
  size,
  underline,
  weight,
  ...props
}: TextProps<C>) {
  const Component = as || "p";

  return (
    <Component
      className={cn(
        textVariants({ align, color, italic, size, underline, weight }),
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Text };
export type { TextProps, TextVariantsProps };
