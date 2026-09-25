import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border font-medium transition-colors duration-150 cursor-default",
  {
    defaultVariants: {
      size: "md",
      variant: "default",
    },
    variants: {
      size: {
        lg: "px-3 py-1 text-sm",
        md: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[0.6875rem]",
      },
      variant: {
        default:
          "border-border bg-surface-secondary text-text-secondary hover:bg-surface-secondary/70",
        error:
          "border-error-border bg-error-surface text-error-text hover:bg-error-surface/70",
        info: "border-info-border bg-info-surface text-info-text hover:bg-info-surface/70",
        outline:
          "border-border-strong bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text",
        success:
          "border-success-border bg-success-surface text-success-text hover:bg-success-surface/70",
        warning:
          "border-warning-border bg-warning-surface text-warning-text hover:bg-warning-surface/70",
      },
    },
  },
);

type BadgeVariantsProps = VariantProps<typeof badgeVariants>;

interface BadgeProps<T extends React.ElementType>
  extends React.ComponentProps<"span">, BadgeVariantsProps {
  as?: T;
  dot?: boolean;
  icon?: React.ReactNode;
}

const dotColorByVariant: Record<
  NonNullable<BadgeVariantsProps["variant"]>,
  string
> = {
  default: "bg-text-secondary",
  error: "bg-error-text",
  info: "bg-info-text",
  outline: "bg-text-secondary",
  success: "bg-success-text",
  warning: "bg-warning-text",
};

function Badge<T extends React.ElementType>({
  as,
  children,
  className,
  dot,
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
      {dot && (
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            dotColorByVariant[variant ?? "default"],
          )}
        />
      )}
      {icon && (
        <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
      )}
      {children}
    </Component>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariantsProps };
