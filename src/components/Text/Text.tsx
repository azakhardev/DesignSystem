import React, { forwardRef } from "react";
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
    unfrtline: {
      ture: "underline",
      false: "",
    },
  },

  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
    align: "left",
    italic: false,
  },
});

type TextVariantsProps = VariantProps<typeof textVariants>;

//generic variant of props, that shold be a valid html element
export type TextProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
  children?: React.ReactNode;
} & TextVariantsProps & //extends props of the CVA Variants, so developer cant use unsupported variants
  React.ComponentPropsWithoutRef<C>; //extends other props based on type C

//uses ref to support polymorph properties on elements (if user types 'a', it will support href, target, etc.)
export const Text = forwardRef(function Text<C extends React.ElementType = "p">(
  {
    as,
    className,
    size,
    weight,
    color,
    align,
    italic,
    children,
    ...props
  }: TextProps<C>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.ForwardedRef<any>
) {
  const Component = as || "p";

  return (
    <Component
      ref={ref}
      className={cn(
        textVariants({ size, weight, color, align, italic }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
