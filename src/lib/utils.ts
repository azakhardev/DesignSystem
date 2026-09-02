import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
};

export function getCalendarDays(
  year: number,
  month: number,
  weekStartsOn: number = 0,
): CalendarDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  const offset = (dayOfWeek - weekStartsOn + 7) % 7;
  const startDate = new Date(year, month, 1 - offset);

  const grid = [];
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + i,
    );

    grid.push({
      date: currentDate,
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: currentDate.toDateString() === new Date().toDateString(),
    });
  }

  return grid;
}
