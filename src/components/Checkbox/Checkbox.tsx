import { Check } from "lucide-react";
import React from "react";

import { cn } from "../../lib/utils";
import { Label } from "../Label";

interface CheckboxProps extends React.ComponentProps<"input"> {
  boxClassName?: string;
  checked: boolean;
  error?: boolean;
  icon?: React.ReactNode;
  label?: string;
  onCheckedChange: (checked: boolean) => void;
}

function Checkbox({
  boxClassName,
  checked,
  className,
  disabled,
  error,
  icon,
  id,
  label,
  onCheckedChange,
  ref,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className={cn("flex items-center space-x-2 group w-fit", className)}>
      <div className="relative flex items-center">
        <input
          checked={checked}
          className="peer sr-only"
          disabled={disabled}
          id={inputId}
          onChange={(e) => onCheckedChange(e.target.checked)}
          ref={ref}
          type="checkbox"
          {...props}
        />

        <label
          className={cn(
            "h-5 w-5 shrink-0 rounded border bg-surface transition-all cursor-pointer",
            "flex items-center justify-center",
            "border-border",
            !disabled &&
              "group-hover:border-primary group-hover:ring-4 group-hover:ring-primary/10",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-focus peer-focus-visible:outline-none ring-offset-background",
            checked &&
              "bg-primary border-primary text-on-primary group-hover:ring-primary/20",
            error && "border-error-border group-hover:ring-error/10 ",
            disabled &&
              "cursor-not-allowed bg-disabled-surface border-disabled-border opacity-50 group-hover:ring-0",
            boxClassName,
          )}
          htmlFor={inputId}
        >
          <div
            className={cn(
              "flex items-center justify-center pointer-events-none text-on-primary",
              checked
                ? "opacity-100"
                : "opacity-0 transition-opacity duration-200",
            )}
          >
            {icon || <Check size={14} strokeWidth={3} />}
          </div>
        </label>
      </div>

      {label && (
        <Label disabled={disabled} error={error} htmlFor={inputId}>
          {label}
        </Label>
      )}
    </div>
  );
}

export { Checkbox };
export type { CheckboxProps };
