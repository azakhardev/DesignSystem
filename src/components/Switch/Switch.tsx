import { motion } from "framer-motion";
import React from "react";

import { cn } from "../../lib/utils";
import { Label } from "../Label";

interface SwitchProps extends React.ComponentProps<"input"> {
  checked: boolean;
  error?: boolean;
  label?: string;
  onCheckedChange: (checked: boolean) => void;
  switchIcon?: React.ReactNode;
}

function Switch({
  checked,
  className,
  disabled,
  error,
  id,
  label,
  onChange,
  onCheckedChange,
  ref,
  switchIcon,
  ...props
}: SwitchProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(e.target.checked);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <label
        className={cn(
          "flex h-8 w-[60px] cursor-pointer items-center rounded-full p-1 transition-colors duration-300 shadow",
          checked ? "bg-primary" : "bg-border-strong",
          disabled && "cursor-not-allowed opacity-50",
          checked ? "justify-end" : "justify-start",
          "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-focus has-[:focus-visible]:ring-offset-2",
          className,
        )}
        htmlFor={inputId}
      >
        <input
          checked={checked}
          className="peer sr-only"
          disabled={disabled}
          id={inputId}
          onChange={handleChange}
          ref={ref}
          type="checkbox"
          {...props}
        />

        <motion.div
          className={cn(
            "aspect-square h-full rounded-full bg-white shadow-sm",
            "flex items-center justify-center text-xs",
          )}
          layout
          transition={{
            damping: 30,
            stiffness: 700,
            type: "spring",
          }}
        >
          {switchIcon && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              initial={{ opacity: 0, scale: 0.5 }}
              key={checked ? "on" : "off"}
            >
              {switchIcon}
            </motion.div>
          )}
        </motion.div>
      </label>
      {label && (
        <Label disabled={disabled} error={error} htmlFor={inputId}>
          {label}
        </Label>
      )}
    </>
  );
}

export { Switch };
export type { SwitchProps };
