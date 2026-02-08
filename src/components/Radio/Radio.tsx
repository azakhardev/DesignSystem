import { createContext, use, useId } from "react";

import { cn } from "../../lib/utils";

type RadioGroupContextType = {
  disabled?: boolean;
  name?: string;
  onValueChange?: (value: string) => void;
  value?: string;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

interface RadioGroupProps extends React.ComponentProps<"div"> {
  disabled?: boolean;
  name?: string;
  onValueChange?: (value: string) => void;
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
      value={{ disabled, name: groupName, onValueChange, value }}
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

function RadioButton({ className, label, value, ...props }: RadioItemProps) {
  const context = use(RadioGroupContext);

  if (!context) {
    throw new Error("RadioItem must be used within a RadioGroup");
  }

  return <input className={cn("", className)} type="radio" {...props} />;
}

export { RadioButton, RadioGroup };
export type { RadioGroupContextType, RadioGroupProps, RadioItemProps };
