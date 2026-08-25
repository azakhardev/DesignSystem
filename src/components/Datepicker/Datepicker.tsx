import { createContext, use, useCallback, useMemo, useState } from "react";

import { cn } from "../../lib/utils";

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
      "Datepicker components (like DatepickerTrigger, DatepickerContent) must be used within a <Datepicker> provider.",
    );
  }

  return context;
}

interface DatepickerProps {
  children: React.ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

function Datepicker({
  children,
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
      if (!isControlled) {
        setUncontrolledValue(v);
      }
      onValueChange?.(v);
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

  return <DatepickerContext value={contextValue}>{children}</DatepickerContext>;
}

interface DatepickerTriggerProps extends React.ComponentProps<"button"> {
  dateFomratter?: (v: string) => string;
  placeholder?: string;
}

function DatepickerTrigger({
  className,
  dateFomratter,
  onClick,
  placeholder,
  ...props
}: DatepickerTriggerProps) {
  const { onOpenChange, open, value } = useDatepickerContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    onOpenChange(!open);
  }

  const displayedValue = dateFomratter ? dateFomratter(value) : value;

  return (
    <button
      className={cn("", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {displayedValue || placeholder}
    </button>
  );
}

function DatepickerContent() {
  const { onValueChange, open, value } = useDatepickerContext();

  if (!open) return null;

  return <div>Datepicer Content</div>;
}

function getCalendarDays(year: number, month: number) {
  // 1. Get the first day of the current month
  const firstDayOfMonth = new Date(year, month, 1);

  // 2. Find out what day of the week the 1st lands on
  // 0 = Sunday, 1 = Monday ... 6 = Saturday
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // 3. Calculate the date of the top-left cell in the calendar.
  const startDate = new Date(year, month, 1 - startingDayOfWeek);

  const grid = [];

  // 4. Loop exactly 42 times to fill 6 weeks
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + i,
    );

    // We store an object so it's easy to render in React
    grid.push({
      date: currentDate,
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: currentDate.toDateString() === new Date().toDateString(),
    });
  }

  return grid;
}

export { Datepicker, DatepickerContent, DatepickerTrigger };
