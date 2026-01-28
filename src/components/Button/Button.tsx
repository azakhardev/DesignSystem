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
    defaultVariants: {
      variant: "primary",
    },
    variants: {
      variant: {
        animated: cn(
          "border-transparent rounded-full text-text-surface",
          styles.animatedButton,
        ),
        confirm: "bg-success border-success-border",
        danger:
          "border-error-border bg-error dark:bg-transparent dark:border-error dark:border-2 dark:font-bold dark:text-error dark:disabled:text-disabled-text dark:disabled:border-disabled-border",
        ghost:
          "shadow-none border-transparent text-info-text disabled:border-none disabled:bg-transparent hover:bg-info-surface",
        info: "border-info text-info shadow-none disabled:bg-transparent",
        primary: "bg-primary hover:bg-primary-focus",
        secondary: "bg-secondary hover:bg-secondary-focus",
      },
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends React.ComponentProps<"button">, ButtonVariants {}

function Button({ children, className, ref, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
export type { ButtonProps, ButtonVariants };
