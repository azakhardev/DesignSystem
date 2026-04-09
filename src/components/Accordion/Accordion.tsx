import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { createContext, use, useId, useState } from "react";

import { cn } from "../../lib/utils";

type AccordionContextType = {
  value: string | string[];
  setValue: (v: string | string[]) => void;
  mode: "single" | "multiple";
  collapsible: boolean;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

type SingleAccordionProps = {
  mode?: "single";
  value?: string;
  defaultValue?: string;
  setValue?: (v: string) => void;
  collapsible?: boolean;
};

type MultipleAccordionProps = {
  mode: "multiple";
  value?: string[];
  defaultValue?: string[];
  setValue?: (v: string[]) => void;
  collapsible?: never;
};

type AccordionProps = (SingleAccordionProps | MultipleAccordionProps) &
  Omit<React.ComponentProps<"div">, "value" | "defaultValue">;

function useAccordionContext() {
  const context = use(AccordionContext);
  if (!context) {
    throw new Error(
      "AccordionItem component must be used within a <Accordion> provider.",
    );
  }
  return context;
}

function Accordion({
  children,
  className,
  collapsible = true,
  defaultValue,
  mode = "single",
  setValue: externalSetValue,
  value: externalValue,
  ...props
}: AccordionProps) {
  const [internalValue, internalSetValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return mode === "multiple" ? [] : "";
  });

  const value = externalValue ?? internalValue;

  const setValue = (v: string | string[]) => {
    internalSetValue(v);

    if (externalSetValue) {
      (externalSetValue as (val: typeof v) => void)(v);
    }
  };

  return (
    <AccordionContext.Provider value={{ collapsible, mode, setValue, value }}>
      <div className={cn("flex flex-col w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

type AccordionItemContextType = {
  id: string;
  isOpen: boolean;
  itemValue: string;
  changeState: () => void;
};

const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null,
);

function useAccordionItemContext() {
  const context = use(AccordionItemContext);
  if (!context) {
    throw new Error(
      "Subcomponents of AccordionItem like AccordionTrigger and AccordionContent must be used within a <AccordionItem> Component.",
    );
  }
  return context;
}

interface AccordionItemProps extends React.ComponentProps<"div"> {
  value: string;
}

function AccordionItem({
  children,
  className,
  value: itemValue,
  ...props
}: AccordionItemProps) {
  const { collapsible, mode, setValue, value } = useAccordionContext();
  const isArray = Array.isArray(value);

  const id = useId().replace(/:/g, "");
  let isOpen = false;

  if (isArray) {
    isOpen = value.includes(itemValue);
  } else {
    isOpen = itemValue == value;
  }

  function changeState() {
    if (mode === "single") {
      const isOpened = value === itemValue;
      if (isOpened && collapsible) return setValue("");
      if (!isOpened) return setValue(itemValue);
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      const isOpened = currentValues.includes(itemValue);

      const nextValue = isOpened
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue];

      setValue(nextValue);
    }
  }

  return (
    <AccordionItemContext.Provider
      value={{ changeState, id, isOpen, itemValue }}
    >
      <div className={cn("flex flex-col gap-1 w-full", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

function AccordionHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-row justify-between items-center",
        "font-bold p-1 pb-2 text-lg border-b-2 border-text-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps extends React.ComponentProps<"button"> {
  icon?: React.ReactNode;
  iconSize?: number;
  showIcon?: boolean;
}

function AccordionTrigger({
  children,
  className,
  icon,
  iconSize = 26,
  showIcon = true,
  ...props
}: AccordionTriggerProps) {
  const { changeState, id, isOpen } = useAccordionItemContext();

  return (
    <button
      aria-controls={`accordion-item-content-${id}`}
      aria-expanded={isOpen}
      className={cn(
        "flex items-center gap-1 justify-between",
        "text-start transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-primary-focus",
        className,
      )}
      id={`accordion-item-trigger-${id}`}
      onClick={changeState}
      {...props}
    >
      {children}
      {showIcon && (
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          {icon ? icon : <ChevronDown size={iconSize} />}
        </motion.span>
      )}
    </button>
  );
}

function AccordionContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { id, isOpen } = useAccordionItemContext();

  return (
    <motion.div
      animate={{ height: isOpen ? "auto" : 0, opacity: 1 }}
      className="overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
    >
      <div
        aria-labelledby={`accordion-item-trigger-${id}`}
        className={cn("p-2", className)}
        id={`accordion-item-content-${id}`}
        role="region"
        {...props}
      >
        {children}
      </div>
    </motion.div>
  );
}

export {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
};
export type { AccordionContextType, AccordionItemProps, AccordionTriggerProps };
