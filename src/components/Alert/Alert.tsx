import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { TriangleAlert, CircleAlert, Info, Check, SearchX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  success: Check,
  noData: SearchX,
};

const alertVariants = cva(
  "relative flex flex-col gap-2 items-start rounded-md border-2 p-4 w-full ",
  {
    variants: {
      variant: {
        info: "border-info-border bg-info-surface text-info-text",
        warning: "border-warning-border bg-warning-surface text-warning-text",
        error: "border-error-border bg-error-surface text-error-text",
        success: "border-success-border bg-success-surface text-success-text",
        noData: "border-text-secondary text-text",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

type AlertVariantsProps = VariantProps<typeof alertVariants>;

interface AlertProps extends React.ComponentProps<"div">, AlertVariantsProps {
  icon?: React.ReactNode;
  showIcon?: boolean;
}

function Alert({
  className,
  ref,
  variant,
  children,
  icon,
  showIcon = false,
  ...props
}: AlertProps) {
  const IconComponent = iconMap[variant || "warning"];

  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      role={variant === "error" ? "alert" : "status"}
      ref={ref}
      {...props}
    >
      {children}
      {(showIcon || icon) && (
        <div className="absolute top-2 right-2">
          {icon ? icon : <IconComponent size={22} />}
        </div>
      )}
    </div>
  );
}

interface AlertTitleProps extends React.ComponentProps<"h5"> {
  /**
   * Additional classes for styling the title.
   */
  className?: string;
  /**
   * Content of the description.
   */
  children?: React.ReactNode;
}

function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  return (
    <h5
      className={cn("font-bold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  );
}

interface AlertMessageProps extends React.ComponentProps<"div"> {
  /**
   * Additional classes for styling the message.
   */
  className?: string;
  /**
   * Content of the description.
   */
  children?: React.ReactNode;
}

function AlertMessage({ className, children, ...props }: AlertMessageProps) {
  return (
    <div className={cn("text-sm opacity-90", className)} {...props}>
      {children}
    </div>
  );
}

export { Alert, AlertTitle, AlertMessage };

export type { AlertProps, AlertTitleProps, AlertMessageProps };
