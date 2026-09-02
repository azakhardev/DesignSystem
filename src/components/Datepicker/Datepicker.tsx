import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useIsMobile } from "../../hooks/useIsMobile";
import { cn } from "../../lib/utils";
import { Calendar, CalendarContent, CalendarHeader } from "../Calendar";

interface DatepickerContextType {
  onOpenChange: (open: boolean) => void;
  onValueChange: (v: string) => void;
  open: boolean;
  value: string;
}

const DatepickerContext = createContext<DatepickerContextType | null>(null);

function useDatepickerContext() {
  const context = use(DatepickerContext);
  if (!context) {
    throw new Error(
      "Datepicker components must be used within a <Datepicker> provider.",
    );
  }
  return context;
}

interface DatepickerProps {
  /**
   * The subcomponents of the Datepicker, typically `<DatepickerTrigger>` and `<DatepickerContent>`.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes to apply to the root Datepicker wrapper.
   */
  className?: string;
  /**
   * The initial date value for the uncontrolled state (expected as an ISO string).
   */
  defaultValue?: string;
  /**
   * Callback fired when a date is selected. Passes the date as an ISO string.
   */
  onValueChange?: (value: string) => void;
  /**
   * The controlled date value of the datepicker (expected as an ISO string).
   */
  value?: string;
}

function Datepicker({
  children,
  className,
  defaultValue,
  onValueChange,
  value: controlledValue,
}: DatepickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue ?? "",
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolledValue(v);
      onValueChange?.(v);
      // Optional: Auto-close after selection (highly recommended for UX)
      setOpen(false);
    },
    [isControlled, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      onOpenChange: setOpen,
      onValueChange: handleValueChange,
      open,
      value,
    }),
    [open, value, handleValueChange],
  );

  return (
    <DatepickerContext.Provider value={contextValue}>
      <div
        className={cn(
          "relative inline-flex flex-col gap-1 w-full max-w-sm",
          className,
        )}
      >
        {children}
      </div>
    </DatepickerContext.Provider>
  );
}

interface DatepickerTriggerProps extends React.ComponentProps<"button"> {
  /**
   * A function that takes the raw ISO string value and returns a formatted string for display.
   * @default (v) => new Date(v).toLocaleDateString()
   */
  dateFormatter?: (v: string) => string;
  /**
   * The text to display when no date is currently selected.
   * @default "DD/MM/YYYY"
   */
  placeholder?: string;
}

function DatepickerTrigger({
  className,
  dateFormatter = (v: string) => new Date(v).toLocaleDateString(),
  onClick,
  placeholder = "DD/MM/YYYY",
  ...props
}: DatepickerTriggerProps) {
  const { onOpenChange, open, value } = useDatepickerContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    onOpenChange(!open);
  }

  const displayedValue = value ? dateFormatter(value) : "";
  const hasValue = !!value;

  return (
    <button
      aria-expanded={open}
      aria-haspopup="dialog"
      className={cn(
        "flex w-full flex-row justify-between items-center px-3 py-2 gap-2 rounded-md border bg-input-background text-sm transition-colors min-w-32",
        "hover:bg-input-hover focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        !hasValue ? "text-text-secondary" : "text-text font-medium",
        className,
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {displayedValue || placeholder}
      <CalendarIcon className="h-4 w-4" />
    </button>
  );
}

interface DatepickerContentProps extends React.ComponentProps<
  typeof motion.div
> {
  /**
   * Custom calendar content. If omitted, a default `<Calendar>` will be rendered.
   * Use this to pass a highly customized calendar (e.g., specific start day or localized names).
   * If you want, you can use your own component, but the wrapper must accept `setValue: (v: string) => void` and `value: string` props
   */
  children?: React.ReactNode;
}

function DatepickerContent({
  children,
  className,
  ...props
}: DatepickerContentProps) {
  const { onOpenChange, onValueChange, open, value } = useDatepickerContext();
  const isMobile = useIsMobile();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, onOpenChange]);

  const calendarChildren = children ? (
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        const element = child as React.ReactElement<{
          value?: string;
          setValue?: (v: string) => void;
        }>;

        // 2. Safely read from the casted element
        return cloneElement(element, {
          setValue:
            element.props.setValue !== undefined
              ? element.props.setValue
              : onValueChange,
          value:
            element.props.value !== undefined ? element.props.value : value,
        });
      }
      return child;
    })
  ) : (
    <Calendar setValue={onValueChange} value={value} weekStartsOn={0}>
      <CalendarHeader />
      <CalendarContent className="md:min-w-60" />
    </Calendar>
  );

  return (
    <AnimatePresence>
      {open &&
        (isMobile ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/50 p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="mobile-overlay"
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={cn(
                "bg-surface p-4 rounded-lg border border-border shadow-lg",
                className,
              )}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              ref={contentRef}
              transition={{ duration: 0.2, ease: "easeOut" }}
              {...props}
            >
              {calendarChildren}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={cn(
              "absolute top-full left-0 z-50 mt-2 bg-surface p-4 rounded-lg border border-border shadow-lg",
              className,
            )}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            key="desktop-popover"
            ref={contentRef}
            transition={{ duration: 0.15, ease: "easeOut" }}
            {...props}
          >
            {calendarChildren}
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export { Datepicker, DatepickerContent, DatepickerTrigger };
