import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  errorText?: string;
  suffix?: React.ReactNode;
}

function Input({
  className,
  icon,
  errorText,
  suffix,
  disabled,
  ref,
  id,
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
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2",
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
          ref={ref}
          aria-invalid={!!errorText}
          aria-describedby={errorText ? errorId : undefined}
          className={`flex-1 w-full h-full bg-transparent outline-none placeholder:text-text-secondary file:bg-transparent file:border-0 file:text-sm file:font-medium ${disabled && "cursor-not-allowed"}`}
          disabled={disabled}
          {...props}
        />
        {suffix && (
          <div className="flex shrink-0 text-text-secondary">{suffix}</div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {errorText && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-1 text-sm text-error-text font-medium ml-1"
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
