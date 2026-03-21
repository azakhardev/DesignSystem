import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 cursor-default",
  {
    defaultVariants: {
      size: "md",
      variant: "default",
    },
    variants: {
      size: {
        lg: "px-3 py-1 text-base",
        md: "px-2.5 py-0.5 text-sm",
        sm: "px-2 py-0.5 text-xs",
      },
      variant: {
        default:
          "bg-transparent border-2 border-border-strong text-text-secondary hover:bg-surface-secondary hover:text-text",
        error: "bg-error text-white border border-border",
        info: "bg-info text-white border border-border dark:text-gray-700",
        success: "bg-success text-white dark:text-gray-700 ",
        warning: "bg-warning text-white dark:text-gray-700",
      },
    },
  },
);

type BadgeVariantsProps = VariantProps<typeof badgeVariants>;

interface BadgeProps<T extends React.ElementType>
  extends React.ComponentProps<"span">, BadgeVariantsProps {
  as?: T;
  icon?: React.ReactNode;
}

function Badge<T extends React.ElementType>({
  as,
  children,
  className,
  icon,
  size = "md",
  variant = "default",
  ...props
}: BadgeProps<T>) {
  const Component = as ?? "span";
  return (
    <Component
      className={cn(badgeVariants({ size, variant }), className)}
      {...props}
    >
      {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
      {children}
    </Component>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariantsProps };
