import { AnimatePresence, motion } from "framer-motion";
import { useId } from "react";

import { cn } from "../../lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  errorText?: string;
}

function Textarea({
  className,
  disabled,
  errorText,
  id,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  const errorId = `${inputId}-error`;
  return (
    <div className="w-full flex flex-col relative">
      <textarea
        aria-describedby={errorText ? errorId : undefined}
        aria-invalid={!!errorText}
        className={cn(
          "px-2 py-2 rounded-md border border-border transition-all w-full",
          "bg-input-background text-text",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-offset-background placeholder:text-text-secondary",
          disabled && "opacity-50 cursor-not-allowed bg-disabled-surface",
          errorText && !disabled
            ? "border-error focus-within:ring-error"
            : "border-border focus-within:ring-primary-focus",
          className,
        )}
        disabled={disabled}
        id={inputId}
        ref={ref}
        {...props}
      />
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
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
