import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import Slot from "../../lib/Slot";
import { cn } from "../../lib/utils";
import styles from "./Button.module.css";

const buttonVariants = cva(
  [
    //Base style
    "py-2 px-4 rounded-sm border-border cursor-pointer border text-on-primary shadow-md flex flex-row gap-1",
    //Transitons style
    "transition-all duration-150 ease-in-out",
    //Hover effects
    "hover:scale-[1.02] active:scale-[0.98]",
    //Disabled style
    "disabled:bg-disabled-surface disabled:border-disabled-border disabled:text-disabled-text disabled:cursor-default disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed",
  ],
  {
    compoundVariants: [
      {
        className: "rounded-none px-0 py-0",
        shape: "pill",
        variant: "link",
      },
      {
        className: "text-text-surface",
        effect: "animated",
      },
    ],
    defaultVariants: {
      effect: "none",
      shape: "default",
      variant: "primary",
    },
    variants: {
      effect: {
        animated: styles.animatedButton,
        none: "",
        ripple: styles.ripple,
      },
      shape: {
        default: "",
        pill: "rounded-full px-5",
      },
      variant: {
        destructive:
          "bg-error text-white shadow-xs hover:bg-error-focus active:scale-95",
        ghost:
          "shadow-none border-transparent text-info-text disabled:border-none disabled:bg-transparent hover:bg-info-surface",
        link: "bg-transparent border-none shadow-none text-primary underline-offset-4 hover:underline px-0 py-0 h-auto",
        outline: "border-info text-info shadow-none disabled:bg-transparent",
        primary: "bg-primary hover:bg-primary-focus",
        secondary: "bg-secondary hover:bg-secondary-focus",
        soft: "bg-primary-surface border-primary-border text-primary-text shadow-none hover:bg-primary-surface/70",
        success:
          "bg-success border-success-border text-white hover:shadow-[0_0_15px_rgba(var(--success-rgb),0.4)]",
        warning:
          "bg-warning border-warning-border text-white hover:bg-warning-focus",
      },
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ComponentProps<"button">, ButtonVariants {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

function Button({
  asChild,
  children,
  className,
  effect,
  loading,
  loadingText,
  ref,
  shape,
  variant,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ effect, shape, variant }), className)}
      disabled={loading}
      ref={ref}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircle className="animate-spin" />{" "}
          <span>{loadingText}</span>{" "}
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button };
export type { ButtonProps, ButtonVariants };
