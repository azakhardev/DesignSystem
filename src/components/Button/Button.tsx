import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import styles from "./Button.module.css";

const buttonVariants = cva(
  [
    //Base style
    "py-2 px-4 rounded border-border cursor-pointer border text-on-primary shadow-md",
    //Transitons style
    "transition-all duration-150 ease-in-out",
    //Hover effects
    "hover:scale-[1.10] active:scale-[0.95]",
    //Disabled style
    "disabled:bg-disabled-surface disabled:border-disabled-border disabled:text-disabled-text disabled:cursor-default disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary-focus",
        secondary: "bg-secondary hover:bg-secondary-focus",
        danger:
          "border-error-border bg-error dark:bg-transparent dark:border-error dark:border-2 dark:font-bold dark:text-error dark:disabled:text-disabled-text dark:disabled:border-disabled-border",
        confirm: "bg-success border-success-border",
        info: "border-info text-info shadow-none disabled:bg-transparent",
        ghost:
          "shadow-none border-transparent text-info-text disabled:border-none disabled:bg-transparent hover:bg-info-surface",
        animated: cn(
          "border-transparent rounded-full text-text-surface",
          styles.animatedButton,
        ),
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ComponentProps<"button">, ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, children, variant, ...props }: ButtonProps,
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);
