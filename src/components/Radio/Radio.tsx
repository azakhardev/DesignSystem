import { Circle } from "lucide-react";
import { createContext, use, useId } from "react";

import { cn } from "../../lib/utils";
import { Label } from "../Label";

type RadioGroupContextType = {
  disabled?: boolean;
  name: string;
  onValueChange: (value: string) => void;
  value?: string;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

interface RadioGroupProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  disabled?: boolean;
  name?: string;
  onValueChange: (value: string) => void;
  value?: string;
}

function RadioGroup({
  children,
  className,
  disabled,
  name,
  onValueChange,
  value,
  ...props
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name || generatedName;

  return (
    <RadioGroupContext.Provider
      value={{
        disabled,
        name: groupName,
        onValueChange,
        value,
      }}
    >
      <div
        className={cn("flex flex-col gap-2", className)}
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioItemProps extends Omit<
  React.ComponentProps<"input">,
  "onChange"
> {
  label?: React.ReactNode;
  value: string;
}

function RadioButton({
  className,
  id,
  label,
  value,
  ...props
}: RadioItemProps) {
  const context = use(RadioGroupContext);

  if (!context) {
    throw new Error("RadioButton must be used within a RadioGroup");
  }

  const generatedId = useId();
  const inputId = id || generatedId;

  const isChecked = context.value === value;
  const isDisabled = props.disabled || context.disabled;

  return (
    <label
      className={cn(
        "flex items-center gap-2 group relative transition-opacity group",
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      <input
        checked={isChecked}
        className="peer sr-only"
        disabled={isDisabled}
        id={inputId}
        name={context.name}
        onChange={() => context.onValueChange(value)}
        type="radio"
        value={value}
        {...props}
      />
      <div
        className={cn(
          "h-4 w-4 rounded-full border border-border flex items-center justify-center transition-all shadow-sm p-0.5",
          "bg-input-background",
          !isDisabled &&
            " group-hover:ring-2 group-hover:ring-primary-focus group-hover:ring-offset-0",
          "peer-checked:text-text",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-focus peer-focus-visible:ring-offset-0",
          className,
        )}
      >
        <Circle
          className={cn(
            "h-2.5 w-2.5 block transition-transform duration-200",
            isChecked ? "scale-100" : "scale-0",
          )}
          fill="currentColor"
        />
      </div>
      {label && (
        <Label disabled={isDisabled} htmlFor={inputId}>
          {label}
        </Label>
      )}
    </label>
  );
}

export { RadioButton, RadioGroup };
export type { RadioGroupContextType, RadioGroupProps, RadioItemProps };
