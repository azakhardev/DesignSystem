import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  Calendar,
  CalendarCell,
  CalendarContent,
  CalendarHeader,
} from "./Calendar";

/**
 * The **Calendar** component provides a flexible, accessible date picker interface.
 *
 * It uses the **Compound Component** pattern, allowing you to compose the calendar's
 * layout using `CalendarHeader`, `CalendarContent`, and optionally customizing the `CalendarCell`.
 */
const meta = {
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    CalendarCell,
    CalendarContent,
    CalendarHeader,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Data Display/Calendar",
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Basic Usage
 * By default, the Calendar is uncontrolled. It manages its own internal state
 * and defaults to the current date. Wrapping it in a styled container is recommended
 * as the compound components are designed to expand to their parent's width.
 */
export const Default: Story = {
  render: () => (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <Calendar>
        <CalendarHeader />
        <CalendarContent />
      </Calendar>
    </div>
  ),
};

/**
 * ### Controlled State
 * Pass `value` (ISO string) and `setValue` to control the calendar externally.
 * This is useful when integrating with forms or displaying the selected date elsewhere.
 */
export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<string>(new Date().toISOString());

    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-md bg-surface-secondary p-3 text-sm font-mono text-text">
          <strong>Selected Date:</strong> <br />
          {new Date(date).toDateString()}
        </div>

        <div className="w-[320px] rounded-lg border border-border bg-surface p-4 shadow-sm">
          <Calendar setValue={setDate} value={date}>
            <CalendarHeader />
            <CalendarContent />
          </Calendar>
        </div>
      </div>
    );
  },
};

/**
 * ### Localization & Week Start
 * You can fully localize the calendar by providing `monthNames` to the header and `dayNames`
 * to the content. You can also change the starting day of the week using `weekStartsOn`
 * (e.g., `1` for Monday, standard in Europe).
 *
 * *Note: `dayNames` should always be provided in standard JavaScript order (Sunday to Saturday).
 * The component will automatically reorder them based on `weekStartsOn`.*
 */
export const Localized: Story = {
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

    // Standard order: Sunday to Saturday
    const CZECH_DAYS = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];

    return (
      <div className="w-[320px] rounded-lg border border-border bg-surface p-4 shadow-sm">
        <Calendar weekStartsOn={1}>
          <CalendarHeader monthNames={CZECH_MONTHS} />
          <CalendarContent dayNames={CZECH_DAYS} />
        </Calendar>
      </div>
    );
  },
};

/**
 * ### Custom Cell Renderer
 * You can pass a `cellRenderer` function to `CalendarContent` to intercept how days are rendered.
 * This allows you to apply custom logic, like highlighting weekends, holidays, or adding event dots.
 *
 * *In this example, weekends are styled with the warning color.*
 */
export const CustomCells: Story = {
  render: () => {
    return (
      <div className="w-[320px] rounded-lg border border-border bg-surface p-4 shadow-sm">
        <Calendar>
          <CalendarHeader />
          <CalendarContent
            cellRenderer={(day) => {
              // 0 is Sunday, 6 is Saturday
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
          />
        </Calendar>
      </div>
    );
  },
};
