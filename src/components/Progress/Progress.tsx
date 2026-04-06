import { type HTMLMotionProps, motion } from "framer-motion";
import { createContext, use } from "react";

import { cn } from "../../lib/utils";

const ProgressContext = createContext<{
  value: number;
  maxValue: number;
} | null>(null);

interface ProgressProps extends React.ComponentProps<"div"> {
  maxValue?: number;
  value?: number;
}

function Progress({
  children,
  className,
  maxValue = 100,
  value = 0,
  ...props
}: ProgressProps) {
  return (
    <ProgressContext.Provider value={{ maxValue, value }}>
      <div className={cn("flex flex-col gap-1 w-full", className)} {...props}>
        {children}
      </div>
    </ProgressContext.Provider>
  );
}

function useProgressContext() {
  const context = use(ProgressContext);
  if (!context) {
    throw new Error(
      "Components like ProgressBar, ProgressIndicator and ProgressValue must be used within Progress Component",
    );
  }
  return context;
}

function ProgressLabel({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("font-bold text-sm text-text capitalize", className)}
      {...props}
    >
      {children}
    </span>
  );
}

interface ProgressValueProps extends React.ComponentProps<"span"> {
  autofill?: boolean;
  format?: "numbers" | "percents";
}

function ProgressValue({
  autofill,
  children,
  className,
  format = "numbers",
  ...props
}: ProgressValueProps) {
  const { maxValue, value } = useProgressContext();

  const content = autofill
    ? format === "numbers"
      ? `${value}/${maxValue}`
      : (value / maxValue) * 100 + "%"
    : children;

  return (
    <span
      className={cn(
        "text-text-secondary text-xs font-medium self-end",
        className,
      )}
      {...props}
    >
      {content}
    </span>
  );
}
interface ProgressBarProps extends React.ComponentProps<"div"> {
  duration?: number;
}

function ProgressBar({ children, className, ...props }: ProgressBarProps) {
  const { maxValue, value } = useProgressContext();

  return (
    <div
      aria-valuemax={maxValue}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn(
        "rounded overflow-hidden relative border border-border bg-border h-4",
        className,
      )}
      role="progressbar"
      {...props}
    >
      {children}
    </div>
  );
}

interface ProgressIndicatorProps extends Omit<
  HTMLMotionProps<"div">,
  "children"
> {
  delay?: number;
  duration?: number;
  type?: "keyframes" | "decay" | "spring" | "tween" | "inertia";
}

function ProgressIndicator({
  className,
  delay = 0,
  duration = 1,
  initial = { width: 0 },
  transition,
  type = "spring",
  ...props
}: ProgressIndicatorProps) {
  const { maxValue, value } = useProgressContext();

  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);

  return (
    <motion.div
      animate={{ width: `${percentage}%` }}
      className={cn("h-full bg-primary rounded", className)}
      initial={initial}
      transition={{
        delay: delay,
        duration: duration,
        stiffness: 80,
        type: type,
        ...transition,
      }}
      {...props}
    />
  );
}

export {
  Progress,
  ProgressBar,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};

export type {
  ProgressBarProps,
  ProgressIndicatorProps,
  ProgressProps,
  ProgressValueProps,
};
