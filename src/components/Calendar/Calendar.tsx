import { ChevronLeft, ChevronRight } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { type CalendarDay, cn, getCalendarDays } from "../../lib/utils";

type Period = {
  month: number;
  year: number;
};

type CalendarContextType = {
  period: Period;
  onPeriodChange: (p: Period) => void;
  value: Date;
  onValueChange: (d: Date) => void;
  weekStartsOn: number;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "Calendar compound components cannot be rendered outside the Calendar component",
    );
  }
  return context;
}

interface CalendarProps {
  /**
   * The subcomponents of the Calendar, typically `<CalendarHeader>` and `<CalendarContent>`.
   */
  children?: React.ReactNode;
  /**
   * Callback fired when a date is selected. Passes the date as an ISO string.
   */
  setValue?: (v: string) => void;
  /**
   * The controlled date value of the calendar (expected as an ISO string).
   */
  value?: string;
  /**
   * Defines which day the week starts on. 0 = Sunday, 1 = Monday, etc.
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

function Calendar({
  children,
  setValue,
  value,
  weekStartsOn = 0,
}: CalendarProps) {
  const isControlled = value !== undefined;

  const [internalDate, setInternalDate] = useState<Date>(new Date());

  const finalValue = isControlled ? new Date(value) : internalDate;

  const [period, setPeriod] = useState<Period>(() => {
    const d = value ? new Date(value) : new Date();
    return { month: d.getMonth(), year: d.getFullYear() };
  });

  useEffect(() => {
    if (isControlled && value) {
      const d = new Date(value);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPeriod({ month: d.getMonth(), year: d.getFullYear() });
    }
  }, [value, isControlled]);

  function handleDateChange(d: Date) {
    if (!isControlled) {
      setInternalDate(d);
    }

    if (setValue) {
      setValue(d.toISOString());
    }
  }

  const contextValue = {
    onPeriodChange: setPeriod,
    onValueChange: handleDateChange,
    period,
    value: finalValue,
    weekStartsOn,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
}

interface CalendarCellProps extends Omit<
  React.ComponentProps<"button">,
  "value" | "onClick"
> {
  /**
   * The calendar day object containing the native Date and context (date, isToday, isCurrentMonth).
   */
  day: CalendarDay;
  /**
   * Optional callback fired when this specific cell is clicked. Passes the native Date object.
   */
  onCellClick?: (d: Date) => void;
}

function CalendarCell({
  className,
  day,
  onCellClick,
  ...props
}: CalendarCellProps) {
  const { onValueChange, value: selectedValue } = useCalendar();

  const isSelected = selectedValue.toDateString() === day.date.toDateString();

  function handleClick() {
    onValueChange(day.date);
    onCellClick?.(day.date);
  }

  return (
    <button
      className={cn(
        "flex p-1 md:p-2 items-center justify-center rounded-md text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        isSelected
          ? "bg-primary text-on-primary font-bold hover:bg-primary-focus shadow-sm"
          : "hover:bg-surface-secondary",
        !isSelected &&
          day.isToday &&
          "bg-surface-subtle text-primary font-bold",
        !day.isCurrentMonth && "text-text-secondary opacity-50",
        !isSelected &&
          !day.isToday &&
          day.isCurrentMonth &&
          "text-text font-medium",
        className,
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <span>{day.date.getDate()}</span>
    </button>
  );
}

const DEFAULT_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = Array.from({ length: 2104 - 1900 + 1 }, (_, i) => 1900 + i);

interface CalendarHeaderProps extends React.ComponentProps<"div"> {
  /**
   * Array of 12 strings representing the months of the year.
   * @default ["January", "February", ...]
   */
  monthNames?: string[];
}

function CalendarHeader({
  className,
  monthNames = DEFAULT_MONTHS,
  ...props
}: CalendarHeaderProps) {
  const { onPeriodChange, period } = useCalendar();
  const [isYearOpen, setIsYearOpen] = useState(false);

  const selectedYearRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isYearOpen && selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, [isYearOpen]);

  function handlePrevMonth() {
    if (period.month === 0) {
      onPeriodChange({ month: 11, year: period.year - 1 });
    } else {
      onPeriodChange({ month: period.month - 1, year: period.year });
    }
  }

  function handleNextMonth() {
    if (period.month === 11) {
      onPeriodChange({ month: 0, year: period.year + 1 });
    } else {
      onPeriodChange({ month: period.month + 1, year: period.year });
    }
  }

  function handleYearSelect(year: number) {
    onPeriodChange({ ...period, year });
    setIsYearOpen(false);
  }

  return (
    <div
      className={cn("flex items-center justify-between pb-4", className)}
      {...props}
    >
      {/* === MONTH SELECTOR === */}
      <div className="flex items-center justify-between gap-1 w-37.5">
        <button
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={handlePrevMonth}
          type="button"
        >
          <ChevronLeft />
        </button>

        <span className="text-center font-medium text-text">
          {monthNames[period.month]}
        </span>

        <button
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={handleNextMonth}
          type="button"
        >
          <ChevronRight />
        </button>
      </div>

      {/* === YEAR SELECTOR === */}
      <div className="relative">
        {isYearOpen && (
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40"
            onClick={() => setIsYearOpen(false)}
          />
        )}

        <div className="relative z-50">
          {!isYearOpen ? (
            <button
              className="flex h-8 items-center justify-center rounded-md px-3 font-medium text-text transition-colors hover:bg-surface-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setIsYearOpen(true)}
              type="button"
            >
              {period.year}
            </button>
          ) : (
            <div className="absolute right-0 top-0 flex max-h-35 w-20 flex-col overflow-y-auto rounded-md border border-border bg-surface p-1 shadow-md">
              {YEARS.map((y) => {
                const isSelected = y === period.year;
                return (
                  <button
                    className={cn(
                      "flex w-full items-center justify-center rounded-sm px-2 py-1.5 text-sm transition-colors",
                      isSelected
                        ? "bg-primary font-bold text-on-primary"
                        : "text-text hover:bg-surface-secondary",
                    )}
                    key={y}
                    onClick={() => handleYearSelect(y)}
                    ref={isSelected ? selectedYearRef : null}
                    type="button"
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DEFAULT_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface CalendarContentProps extends React.ComponentProps<"div"> {
  /**
   * A render prop function that allows you to fully customize how each day cell is displayed.
   */
  cellRenderer?: (day: CalendarDay) => React.ReactNode;
  /**
   * Array of 7 strings representing the days of the week.
   * MUST be provided in standard JS order: Sunday to Saturday.
   * The component will automatically reorder them based on `weekStartsOn`.
   * @default ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
   */
  dayNames?: string[];
  /**
   * Determines whether the days of the week row is rendered at the top of the grid.
   * @default true
   */
  showDaysOfWeek?: boolean;
}

function CalendarContent({
  cellRenderer,
  className,
  dayNames = DEFAULT_DAYS,
  showDaysOfWeek = true,
  ...props
}: CalendarContentProps) {
  const { period, weekStartsOn } = useCalendar();

  const days = getCalendarDays(period.year, period.month, weekStartsOn);

  // Dynamically reorder the headers
  const orderedDayNames = [
    ...dayNames.slice(weekStartsOn),
    ...dayNames.slice(0, weekStartsOn),
  ];

  return (
    <div
      className={cn("grid grid-cols-7 gap-0.5 md:gap-1", className)}
      {...props}
    >
      {showDaysOfWeek &&
        orderedDayNames.map((dayName, index) => (
          <div
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center text-xs font-medium text-text-secondary"
            key={`day-${index}`}
          >
            {dayName}
          </div>
        ))}
      {days.map((d) =>
        cellRenderer ? (
          cellRenderer(d)
        ) : (
          <CalendarCell day={d} key={d.date.toISOString()} />
        ),
      )}
    </div>
  );
}

export { Calendar, CalendarCell, CalendarContent, CalendarHeader };
