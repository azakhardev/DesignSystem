import { createContext, type Ref, use, useState } from "react";

import { cn } from "../../lib/utils";

type SelectContextType = {
  value: string | string[];
  onSelect: (v: string) => void;
  open: boolean;
  onOpenChange: (o: boolean) => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

interface SelectProps extends Omit<
  React.ComponentProps<"div">,
  "onSelect" | "value" | "ref"
> {
  mode?: "single" | "multiple";
  name?: string;
  onSelect?: (value: string | string[]) => void;
  ref?: Ref<HTMLInputElement>;
  value?: string | string[];
}

function Select({
  children,
  className,
  mode = "single",
  name,
  onSelect,
  ref,
  value,
  ...props
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    mode === "multiple" ? [] : "",
  );
  const [isOpen, setIsOpen] = useState(false);

  const selectValue = value !== undefined ? value : internalValue;

  function handleValueSelect(v: string) {
    let newValue: string | string[];

    if (mode === "multiple") {
      const arr = Array.isArray(selectValue) ? selectValue : [];

      if (arr.includes(v)) {
        newValue = arr.filter((item) => item !== v);
      } else {
        newValue = [...arr, v];
      }
    } else {
      newValue = v;
    }

    setInternalValue(newValue);
    if (onSelect) onSelect(newValue);
  }

  return (
    <SelectContext.Provider
      value={{
        onOpenChange: setIsOpen,
        onSelect: handleValueSelect,
        open: isOpen,
        value: selectValue,
      }}
    >
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>

      {mode === "multiple" && Array.isArray(selectValue) ? (
        selectValue.map((val, index) => (
          <input
            key={val}
            name={name}
            ref={index === 0 ? ref : undefined}
            type="hidden"
            value={val}
          />
        ))
      ) : (
        <input
          name={name}
          ref={ref}
          type="hidden"
          value={selectValue as string}
        />
      )}
    </SelectContext.Provider>
  );
}

function SelectTrigger({ children }: { children: React.ReactNode }) {
  //TODO: Style + Handle clicking
  return <button type="button">{children}</button>;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  //TODO: Styling and popping on the phones

  return <div role="listbox">{children}</div>;
}

function SelectItem({
  children,
  value,
}: {
  value: string;
  children: React.ReactNode;
}) {
  //TODO: Check the aria selected and handle clicking + styling
  return (
    <div aria-selected="false" data-value={value} role="option">
      {children}
    </div>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger };
