import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import React, { createContext, useContext, useMemo } from "react";

import { cn } from "../../lib/utils";

interface StepperTrackStyles {
  /** Color applied to the filled track, active/completed borders, and active text (e.g., "#10b981" or "var(--color-success)"). */
  activeColor?: string;
  /** Color applied to the unfilled track background and upcoming step borders. */
  inactiveColor?: string;
}

interface StepperContextValue {
  currentStep: number;
  orientation: "horizontal" | "vertical";
  totalSteps: number;
  trackStyles?: StepperTrackStyles;
}

const StepperContext = createContext<StepperContextValue | null>(null);

function useStepperContext() {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error("StepperItem must be used within a <Stepper>.");
  }
  return ctx;
}

interface StepperProps extends React.ComponentProps<"div"> {
  /** The current active step. Supports fractional numbers (e.g., 2.5) for partial line fills. */
  currentStep: number;
  /** The layout direction of the stepper. */
  orientation?: "horizontal" | "vertical";
  /** Custom colors that automatically cascade down to the tracks and individual step indicators. */
  trackStyles?: StepperTrackStyles;
}

function Stepper({
  children,
  className,
  currentStep,
  orientation = "horizontal",
  trackStyles,
  ...props
}: StepperProps) {
  const totalSteps = React.Children.count(children);

  const contextValue = useMemo(
    () => ({
      currentStep,
      orientation,
      totalSteps,
      trackStyles,
    }),
    [currentStep, orientation, totalSteps, trackStyles],
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex w-full",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

export interface StepperItemProps extends Omit<
  React.ComponentProps<"div">,
  "title"
> {
  /** Optional icon to display when the step is completed. Defaults to a Check. */
  completedIcon?: React.ReactNode;
  /** Secondary text displayed below/beside the label. */
  description?: string;
  /** Custom icon to display instead of the step number. */
  icon?: React.ReactNode;
  /** Custom CSS class specifically for overriding the circle indicator layout/styles. */
  indicatorClassName?: string;
  /** The primary label of the step. */
  label: string;
  /** Error, disabled, or standard state. */
  status?: "default" | "disabled" | "error";
  /** The 1-based index of this step. */
  step: number;
}

function StepperItem({
  className,
  completedIcon = <Check className="h-5 w-5" />,
  description,
  icon,
  indicatorClassName,
  label,
  status = "default",
  step,
  ...props
}: StepperItemProps) {
  const { currentStep, orientation, totalSteps, trackStyles } =
    useStepperContext();

  const isLast = step === totalSteps;
  const isCompleted = currentStep > step;
  const isActive = Math.floor(currentStep) === step;
  const isUpcoming = currentStep < step;
  const isError = status === "error";

  const lineProgress = Math.max(0, Math.min(1, currentStep - step));

  const activeColor = trackStyles?.activeColor;
  const inactiveColor = trackStyles?.inactiveColor;

  let indicatorColorStyle: React.CSSProperties = {};
  if (!isError) {
    if ((isCompleted || isActive) && activeColor) {
      indicatorColorStyle = { borderColor: activeColor, color: activeColor };
    } else if (isUpcoming && inactiveColor) {
      indicatorColorStyle = { borderColor: inactiveColor };
    }
  }

  return (
    <div
      className={cn(
        "relative flex",
        orientation === "horizontal"
          ? "flex-1 flex-col items-center gap-3 text-center"
          : "flex-row items-start gap-4",
        orientation === "vertical" && !isLast && "pb-8",
        status === "disabled" &&
          "pointer-events-none cursor-not-allowed opacity-70",
        className,
      )}
      {...props}
    >
      {!isLast && (
        <div
          className={cn(
            "absolute overflow-hidden rounded-full",
            orientation === "horizontal"
              ? "left-1/2 top-5 h-1 w-full -translate-y-1/2"
              : "left-5 top-5 h-full w-1 -translate-x-1/2",
            !inactiveColor && "bg-border",
          )}
          style={inactiveColor ? { backgroundColor: inactiveColor } : undefined}
        >
          <motion.div
            animate={{
              height:
                orientation === "vertical" ? `${lineProgress * 100}%` : "100%",
              width:
                orientation === "horizontal"
                  ? `${lineProgress * 100}%`
                  : "100%",
            }}
            className={cn(
              "absolute left-0 top-0",
              !activeColor && "bg-primary",
              isError && "bg-error-border",
            )}
            initial={false}
            style={activeColor ? { backgroundColor: activeColor } : undefined}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Circle Indicator */}
      <div
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] bg-surface font-semibold transition-colors duration-300",
          isCompleted &&
            !isError &&
            !activeColor &&
            "border-primary text-primary",
          isActive &&
            !isError &&
            !activeColor &&
            "border-primary text-primary shadow-sm",
          isUpcoming &&
            !isError &&
            !inactiveColor &&
            "border-border text-text-secondary",
          isError && "border-error-border bg-surface text-error-text",
          indicatorClassName,
        )}
        style={indicatorColorStyle}
      >
        {isError ? (
          <X className="h-5 w-5" />
        ) : isCompleted ? (
          completedIcon
        ) : (
          icon || <span>{step}</span>
        )}
      </div>

      {/* Text Content */}
      <div
        className={cn(
          "flex flex-col",
          orientation === "horizontal" ? "items-center" : "items-start pt-2",
        )}
      >
        <span
          className={cn(
            "text-sm font-semibold uppercase tracking-wide",
            (isActive || isCompleted) && !isError
              ? "text-text"
              : "text-text-secondary",
            isError && "text-error-text",
          )}
        >
          {label}
        </span>
        {description && (
          <span className="mt-1 text-xs text-text-secondary">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

export { Stepper, StepperItem };
