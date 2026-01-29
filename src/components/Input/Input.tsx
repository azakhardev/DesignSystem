import { AnimatePresence, motion } from "framer-motion";
import { useId } from "react";

import { cn } from "../../lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  errorText?: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
}

function Input({
  className,
  disabled,
  errorText,
  icon,
  id,
  ref,
  suffix,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  const errorId = `${inputId}-error`;
  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center gap-2 px-2 py-2 rounded-md border transition-all",
          "bg-input-background text-text",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-offset-background",
          disabled && "opacity-50 cursor-not-allowed bg-disabled-surface",
          errorText && !disabled
            ? "border-error focus-within:ring-error"
            : "border-border focus-within:ring-primary-focus",
          className,
        )}
      >
        {icon && (
          <div className="text-text flex pr-1 border-r-2 border-text">
            {icon}
          </div>
        )}
        <input
          aria-describedby={errorText ? errorId : undefined}
          aria-invalid={!!errorText}
          className={`flex-1 w-full h-full bg-transparent outline-none placeholder:text-text-secondary file:bg-transparent file:border-0 file:text-sm file:font-medium ${disabled && "cursor-not-allowed"}`}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div className="flex shrink-0 text-text-secondary">{suffix}</div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {errorText && (
          <motion.p
            animate={{ height: "auto", opacity: 1, y: 0 }}
            className="mt-1 text-sm text-error-text font-medium ml-1"
            exit={{ height: 0, opacity: 0, y: -10 }}
            id={errorId}
            initial={{ height: 0, opacity: 0, y: -10 }}
            role="alert"
          >
            {errorText}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

export { Input };
export type { InputProps };
