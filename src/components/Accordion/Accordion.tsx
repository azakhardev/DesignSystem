import { createContext, use, useState } from "react";

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
  itemValue: string;
  changeState: () => void;
};

const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null,
);

function useAccordionItemContext() {
  const context = use(AccordionContext);
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
    <AccordionItemContext.Provider value={{ changeState, itemValue }}>
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionHeaderProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode;
  showIcon?: boolean;
}

function AccordionHeader(props: AccordionHeaderProps) {
  return <div></div>;
}

function AccordionTrigger(props: React.ComponentProps<"button">) {
  return <button></button>;
}

function AccordionContent(props: React.ComponentProps<"div">) {
  return <div></div>;
}

export {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
};
export type { AccordionContextType, AccordionHeaderProps, AccordionItemProps };
