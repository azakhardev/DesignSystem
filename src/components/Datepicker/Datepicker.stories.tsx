import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  Calendar,
  CalendarCell,
  CalendarContent,
  CalendarHeader,
} from "../Calendar";
import { Datepicker, DatepickerContent, DatepickerTrigger } from "./Datepicker";

/**
 * The **Datepicker** component provides a popover interface for selecting dates.
 *
 * It uses the **Compound Component** pattern alongside **Framer Motion** for smooth
 * mobile/desktop transitions. You can compose it using `DatepickerTrigger` and `DatepickerContent`.
 * By default, `DatepickerContent` renders a standard calendar, but you can override this by
 * passing your own `<Calendar>` as children.
 */
const meta = {
  component: Datepicker,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    DatepickerContent,
    DatepickerTrigger,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Form/Datepicker",
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Basic Usage
 * A standard, uncontrolled date picker. It manages its own state and displays
 * the default format (Locale Date String).
 */
export const Default: Story = {
  render: () => (
    <Datepicker>
      <DatepickerTrigger placeholder="Pick a date" />
      <DatepickerContent />
    </Datepicker>
  ),
};

/**
 * ### Custom Trigger Formatting
 * You can pass a `dateFormatter` function and a custom `placeholder` to the
 * `DatepickerTrigger` to control exactly how the selected value is displayed.
 */
export const CustomTrigger: Story = {
  render: () => (
    <Datepicker>
      <DatepickerTrigger
        dateFormatter={(v) => {
          const d = new Date(v);
          return `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
        }}
        placeholder="Select your birthday..."
      />
      <DatepickerContent />
    </Datepicker>
  ),
};

/**
 * ### Controlled State
 * Pass `value` (ISO string) and `onValueChange` to control the datepicker externally.
 * The `Datepicker` will automatically synchronize this state with its internal calendar.
 */
export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<string>(new Date().toISOString());

    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-md bg-surface-secondary p-3 text-sm font-mono text-text">
          <strong>Form State:</strong> <br />
          {new Date(date).toDateString()}
        </div>

        <Datepicker onValueChange={setDate} value={date}>
          <DatepickerTrigger />
          <DatepickerContent />
        </Datepicker>
      </div>
    );
  },
};

/**
 * ### Injecting a Custom Calendar
 * If you need a calendar with a different starting day (e.g., Monday), localized
 * names, or custom cell rendering (like highlighting weekends), you can pass a
 * fully customized `<Calendar>` directly into `<DatepickerContent>`.
 *
 * *The Datepicker will intelligently clone your Calendar and inject the correct state.*
 */
export const WithCustomCalendar: Story = {
  render: () => {
    const CZECH_MONTHS = [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ];
    const CZECH_DAYS = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];

    return (
      <Datepicker>
        <DatepickerTrigger placeholder="Vyberte datum (Czech)" />
        <DatepickerContent>
          {/* We pass our own Calendar configuration here */}
          <Calendar weekStartsOn={1}>
            <CalendarHeader monthNames={CZECH_MONTHS} />
            <CalendarContent
              cellRenderer={(day) => {
                const isWeekend =
                  day.date.getDay() === 0 || day.date.getDay() === 6;
                return (
                  <CalendarCell
                    className={
                      isWeekend && day.isCurrentMonth
                        ? "text-warning hover:bg-warning-surface hover:text-warning"
                        : ""
                    }
                    day={day}
                    key={day.date.toISOString()}
                  />
                );
              }}
              dayNames={CZECH_DAYS}
            />
          </Calendar>
        </DatepickerContent>
      </Datepicker>
    );
  },
};
