import React from "react";

import { cn } from "../../lib/utils";

function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-secondary text-text-secondary ring-8 ring-surface-secondary/50",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("mb-1 text-lg font-semibold text-text", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function EmptyStateDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("mb-4 max-w-sm text-sm text-text-secondary", className)}
      {...props}
    />
  );
}

function EmptyStateActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props} />
  );
}

export {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
};
