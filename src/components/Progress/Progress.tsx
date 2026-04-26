import { type HTMLMotionProps, motion } from "framer-motion";
import { createContext, use, useId } from "react";

import { cn } from "../../lib/utils";

type ProgressContextType = {
  id: string;
  value: number;
  maxValue: number;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

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
  const generatedId = useId().replace(/:/g, "");

  const id = props.id || `progress-${generatedId}`;

  return (
    <ProgressContext.Provider value={{ id, maxValue, value }}>
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
  const { id } = useProgressContext();

  return (
    <span
      className={cn(
        "ml-0.5 inline-block font-bold text-sm text-text capitalize",
        className,
      )}
      id={`${id}-progress-label`}
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
      : Math.round((value / maxValue) * 100) + "%"
    : children;

  return (
    <span
      className={cn(
        "inline-block text-text-secondary text-xs font-medium self-end mr-1.5",
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
  const { id, maxValue, value } = useProgressContext();

  return (
    <div
      aria-labelledby={`${id}-progress-label`}
      aria-valuemax={maxValue}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn(
        "rounded-sm overflow-hidden relative border border-border bg-border h-4",
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
  type?: "spring" | "tween";
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
      className={cn("h-full bg-primary rounded-sm", className)}
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
  ProgressContextType,
  ProgressIndicatorProps,
  ProgressProps,
  ProgressValueProps,
};
