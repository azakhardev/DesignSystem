import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "../../lib/utils";
import styles from "./Button.module.css";

const buttonVariants = cva(
  [
    //Base style
    "py-2 px-4 rounded border-border cursor-pointer border text-on-primary shadow-md flex flex-row gap-1",
    //Transitons style
    "transition-all duration-150 ease-in-out",
    //Hover effects
    "hover:scale-[1.02] active:scale-[0.98]",
    //Disabled style
    "disabled:bg-disabled-surface disabled:border-disabled-border disabled:text-disabled-text disabled:cursor-default disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed",
  ],
  {
    defaultVariants: {
      variant: "primary",
    },
    variants: {
      variant: {
        animated: cn(
          "border-transparent rounded-full text-text-surface",
          styles.animatedButton,
        ),
        destructive:
          "bg-error text-white shadow-sm hover:bg-error-focus active:scale-95",
        ghost:
          "shadow-none border-transparent text-info-text disabled:border-none disabled:bg-transparent hover:bg-info-surface",
        link: "bg-transparent border-none shadow-none text-primary underline-offset-4 hover:underline px-0 py-0 h-auto",
        outline: "border-info text-info shadow-none disabled:bg-transparent",
        primary: "bg-primary hover:bg-primary-focus",
        ripple: cn(
          "bg-surface text-on-surface border-none shadow-md hover:shadow-lg",
          styles.ripple,
        ),
        secondary: "bg-secondary hover:bg-secondary-focus",
        success:
          "bg-success border-success-border text-white hover:shadow-[0_0_15px_rgba(var(--success-rgb),0.4)]",
      },
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ComponentProps<"button">, ButtonVariants {
  loading?: boolean;
  loadingText?: string;
}

function Button({
  children,
  className,
  loading,
  loadingText,
  ref,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
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
    </button>
  );
}

export { Button };
export type { ButtonProps, ButtonVariants };
