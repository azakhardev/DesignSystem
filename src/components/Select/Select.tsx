import { ChevronDown } from "lucide-react";
import {
  createContext,
  type Ref,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

import { useIsMobile } from "../../hooks/useIsMobile";
import { cn } from "../../lib/utils";

type SelectContextType = {
  value: string | string[];
  onSelect: (v: string) => void;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  mode: "single" | "multiple";
};

const SelectContext = createContext<SelectContextType | null>(null);

function useSelectContext() {
  const context = use(SelectContext);

  if (!context) {
    throw new Error(
      "Select Components like SelectTrigger, SelectContent and SelectItem must be used inside the Select component ",
    );
  }

  return context;
}

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
        mode: mode,
        onOpenChange: setIsOpen,
        onSelect: handleValueSelect,
        open: isOpen,
        value: selectValue,
      }}
    >
      <div className={cn("relative flex flex-col", className)} {...props}>
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

interface SelectTriggerProps extends React.ComponentProps<"button"> {
  /**
   * The text displayed inside the trigger when no options are currently selected.
   */
  placeholder?: string;

  /**
   * A custom callback function to format how the selected value is displayed inside the trigger.
   * If the select is in `multiple` mode, this function is called individually for each selected item.
   */
  valueFormatter?: (value: string) => React.ReactNode;
}

function SelectTrigger({
  children,
  className,
  placeholder = "Select option",
  valueFormatter,
  ...props
}: SelectTriggerProps) {
  const { onOpenChange, value } = useSelectContext();

  function handleOpen() {
    onOpenChange(true);
  }

  const isArray = Array.isArray(value);
  const hasValue = isArray ? value.length > 0 : Boolean(value);

  let displayedContent: React.ReactNode = placeholder;

  if (hasValue) {
    if (valueFormatter) {
      if (isArray) {
        const formattedNodes = value.map((v) => valueFormatter(v));
        displayedContent = formattedNodes.map((node, i) => (
          <span key={value[i]}>
            {node}
            {i < value.length - 1 ? ", " : ""}
          </span>
        ));
      } else {
        displayedContent = valueFormatter(value);
      }
    } else {
      displayedContent = isArray ? value.join(", ") : value;
    }
  }
  return (
    <button
      className={cn(
        "flex min-w-[150px] items-center justify-between p-2 border-border border bg-input-background cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-input-focus hover:bg-input-focus",
        !hasValue && "text-text-secondary",
        className,
      )}
      onClick={handleOpen}
      type="button"
      {...props}
    >
      <span className="truncate">{children ?? displayedContent}</span>

      <ChevronDown className="ml-2 opacity-50 text-xs" />
    </button>
  );
}

function SelectContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { onOpenChange, open } = useSelectContext();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(ev: KeyboardEvent) {
      if (!ref.current) return;

      if (ev.key === "Escape") {
        onOpenChange(false);
        return;
      }

      // Arrow navigation
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault();

        // Fins every SelectItem pased on role
        const items = Array.from(
          ref.current.querySelectorAll('[role="option"]'),
        ) as HTMLElement[];

        if (!items.length) return;

        //Gets the index of current active element
        const currentIndex = items.indexOf(
          document.activeElement as HTMLElement,
        );
        let nextIndex = 0;

        if (ev.key === "ArrowDown") {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else if (ev.key === "ArrowUp") {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        // Sets the focus on next element
        items[nextIndex]?.focus();
      }
    }

    function closeOnMouseDown(ev: MouseEvent) {
      if (!ref.current) return;

      const target = ev.target as Node;

      if (ref.current.contains(target)) {
        return;
      }

      onOpenChange(false);
    }

    document.body.addEventListener("mousedown", closeOnMouseDown);
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("mousedown", closeOnMouseDown);
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const style = isMobile
    ? "fixed bottom-0 left-0 w-full max-h-[30vh] rounded-b-none border-b-0"
    : "absolute top-[110%] w-full max-h-[250px] shadow-md";

  return (
    <div
      className={cn(
        "bg-input-background border rounded-md border-border overflow-y-auto z-50",
        "focus:outline-none",
        style,
        className,
      )}
      ref={ref}
      role="listbox"
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
}

interface SelectItemProps extends React.ComponentProps<"div"> {
  /**
   * Value of the SelectItem that will be passed to the select value handler
   */
  value: string;
}

function SelectItem({ children, className, value, ...props }: SelectItemProps) {
  const {
    mode,
    onOpenChange,
    onSelect,
    value: contextValue,
  } = useSelectContext();

  function handleSelect() {
    onSelect(value);

    if (mode === "single") {
      onOpenChange(false);
    }
  }

  function handleKeyDown(ev: React.KeyboardEvent<HTMLDivElement>) {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      handleSelect();
    }
  }

  const isSelected = Array.isArray(contextValue)
    ? contextValue.includes(value)
    : contextValue === value;

  return (
    <div
      aria-selected={isSelected}
      className={cn(
        "cursor-pointer p-1 ",
        "hover:bg-input-hover focus:bg-input-hover",
        "focus:outline-none focus:ring-2 ring-input-focus",
        isSelected && "font-bold text-primary",
        className,
      )}
      data-value={value}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="option"
      tabIndex={-1} //Allows div to be focused
      {...props}
    >
      {children}
    </div>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger };
export type { SelectItemProps, SelectProps, SelectTriggerProps };
