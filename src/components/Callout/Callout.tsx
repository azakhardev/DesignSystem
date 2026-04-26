import React, { createContext, useContext } from "react";

import { cn } from "../../lib/utils";

type CalloutVariant = "info" | "tip" | "success" | "warning" | "danger";

const CalloutContext = createContext<{ variant: CalloutVariant }>({
  variant: "info",
});

function useCallout() {
  return useContext(CalloutContext);
}

interface CalloutProps extends React.ComponentProps<"div"> {
  variant?: CalloutVariant;
}

function Callout({
  children,
  className,
  variant = "info",
  ...props
}: CalloutProps) {
  const variantStyles = {
    danger: "border-error-border bg-error-surface",
    info: "border-info-border bg-info-surface",
    success: "border-success-border bg-success-surface",
    tip: "border-secondary/30 bg-secondary/5",
    warning: "border-warning-border bg-warning-surface",
  };

  return (
    <CalloutContext.Provider value={{ variant }}>
      <div
        className={cn(
          "flex flex-col gap-2 border-l-4 p-4 shadow-xs rounded-r-md transition-colors duration-200",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CalloutContext.Provider>
  );
}

function CalloutTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  const { variant } = useCallout();
  const textColors = {
    danger: "text-error-text",
    info: "text-info-text",
    success: "text-success-text",
    tip: "text-secondary",
    warning: "text-warning-text",
  };

  return (
    <h3
      className={cn(
        "text-lg font-bold font-sans leading-none",
        textColors[variant],
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CalloutBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-sm text-text/90 font-sans leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function CalloutButtons({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex justify-end gap-2 mt-3", className)} {...props} />
  );
}

function CalloutButtonPrimary({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { variant } = useCallout();

  const bgColors = {
    danger: "bg-error text-white hover:bg-error-main/90",
    info: "bg-info text-white hover:bg-info-main/90",
    success: "bg-success text-white hover:bg-success-main/90",
    tip: "bg-secondary text-on-secondary hover:bg-secondary-focus",
    warning: "bg-warning text-white hover:bg-warning-main/90",
  };

  return (
    <button
      className={cn(
        "px-4 py-1.5 rounded-sm text-sm font-medium transition-all active:scale-95 shadow-xs",
        bgColors[variant],
        className,
      )}
      {...props}
    />
  );
}

function CalloutButtonSecondary({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { variant } = useCallout();

  const borderStyles = {
    danger: "border-error-border text-error-text hover:bg-error-surface",
    info: "border-info-border text-info-text hover:bg-info-surface",
    success: "border-success-border text-success-text hover:bg-success-surface",
    tip: "border-secondary/50 text-secondary hover:bg-secondary/10",
    warning: "border-warning-border text-warning-text hover:bg-warning-surface",
  };

  return (
    <button
      className={cn(
        "px-4 py-1.5 rounded-sm text-sm font-medium border bg-surface transition-all active:scale-95",
        borderStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export {
  Callout,
  CalloutBody,
  CalloutButtonPrimary,
  CalloutButtons,
  CalloutButtonSecondary,
  CalloutTitle,
};
