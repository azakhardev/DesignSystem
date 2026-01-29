import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { Check, CircleAlert, Info, SearchX,TriangleAlert } from "lucide-react";

import { cn } from "../../lib/utils";

const iconMap: Record<string, LucideIcon> = {
  error: CircleAlert,
  info: Info,
  noData: SearchX,
  success: Check,
  warning: TriangleAlert,
};

const alertVariants = cva(
  "relative flex flex-col gap-2 items-start rounded-md border-2 p-4 w-full ",
  {
    defaultVariants: {
      variant: "warning",
    },
    variants: {
      variant: {
        error: "border-error-border bg-error-surface text-error-text",
        info: "border-info-border bg-info-surface text-info-text",
        noData: "border-text-secondary text-text",
        success: "border-success-border bg-success-surface text-success-text",
        warning: "border-warning-border bg-warning-surface text-warning-text",
      },
    },
  },
);

type AlertVariantsProps = VariantProps<typeof alertVariants>;

interface AlertProps extends React.ComponentProps<"div">, AlertVariantsProps {
  icon?: React.ReactNode;
  showIcon?: boolean;
}

function Alert({
  children,
  className,
  icon,
  ref,
  showIcon = false,
  variant,
  ...props
}: AlertProps) {
  const IconComponent = iconMap[variant || "warning"];

  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      ref={ref}
      role={variant === "error" ? "alert" : "status"}
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
   * Content of the description.
   */
  children?: React.ReactNode;
  /**
   * Additional classes for styling the title.
   */
  className?: string;
}

function AlertTitle({ children, className, ...props }: AlertTitleProps) {
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
   * Content of the description.
   */
  children?: React.ReactNode;
  /**
   * Additional classes for styling the message.
   */
  className?: string;
}

function AlertMessage({ children, className, ...props }: AlertMessageProps) {
  return (
    <div className={cn("text-sm opacity-90", className)} {...props}>
      {children}
    </div>
  );
}

export { Alert, AlertMessage,AlertTitle };

export type { AlertMessageProps,AlertProps, AlertTitleProps };
