import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textVariants = cva("m-0 leading-normal transition-colors", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl md:text-3xl",
      "3xl": "text-3xl md:text-4xl",
      "4xl": "text-4xl md:text-5xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-text",
      muted: "text-text-secondary dark:text-slate-400",
      success: "text-success-text",
      error: "text-error-text",
      warning: "text-warning-text",
      info: "text-info-text",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    italic: {
      true: "italic",
      false: "",
    },
    underline: {
      true: "underline",
      false: "",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
    align: "left",
    italic: false,
    underline: false,
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
  as,
  className,
  children,
  ref,
  size,
  weight,
  color,
  align,
  italic,
  underline,
  ...props
}: TextProps<C>) {
  const Component = as || "p";

  return (
    <Component
      ref={ref}
      className={cn(
        textVariants({ size, weight, color, align, italic, underline }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Text };
export type { TextProps, TextVariantsProps };
