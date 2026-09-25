import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";

import { cn } from "../../lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      className={cn(
        "mx-auto flex w-full justify-center items-center",
        className,
      )}
      role="navigation"
      {...props}
    />
  );
}

function PaginationContent({
  className,
  onKeyDown,
  ...props
}: React.ComponentProps<"ul">) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();

      const focusableElements = Array.from(
        e.currentTarget.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement,
      );

      if (currentIndex !== -1) {
        let nextIndex = currentIndex;

        if (e.key === "ArrowLeft") {
          nextIndex =
            currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        } else if (e.key === "ArrowRight") {
          nextIndex =
            currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        }

        focusableElements[nextIndex]?.focus();
      }
    }

    onKeyDown?.(e);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}
function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}

export interface PaginationLinkProps extends React.ComponentProps<"button"> {
  /**
   * Styles the button to indicate it represents the current active page.
   */
  isActive?: boolean;
}

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "border border-border bg-surface text-text shadow-sm"
          : "text-text-secondary hover:bg-surface-secondary hover:text-text",
        className,
      )}
      type="button"
      {...props}
    />
  );
}

function PaginationNavButton({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      className={cn("w-auto gap-1 px-3", className)}
      {...props}
    ></PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4 text-text-secondary" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export interface PaginationCountProps extends React.ComponentProps<"div"> {
  /**
   * The index of the last item currently displayed on the page.
   */
  end: number;
  /**
   * The noun used to describe the items being paginated (e.g., "results", "transactions").
   */
  itemName?: string;
  /**
   * The index of the first item currently displayed on the page.
   */
  start: number;
  /**
   * The total number of items across all pages.
   */
  total: number;
}

function PaginationCount({
  className,
  end,
  itemName = "results",
  start,
  total,
  ...props
}: PaginationCountProps) {
  return (
    <div className={cn("text-sm text-text-secondary", className)} {...props}>
      Showing <span className="font-medium text-text">{start}</span> to{" "}
      <span className="font-medium text-text">{end}</span> of{" "}
      <span className="font-medium text-text">{total}</span> {itemName}
    </div>
  );
}

export interface PaginationPageSizeProps extends Omit<
  React.ComponentProps<"select">,
  "onChange"
> {
  /**
   * Callback fired when the user selects a new page size from the dropdown.
   */
  onChange: (pageSize: number) => void;
  /**
   * The available page size options presented in the dropdown.
   */
  options?: number[];
  /**
   * Text to display before select
   */
  text?: string;
  /**
   * The currently selected page size.
   */
  value: number;
}

function PaginationPageSize({
  className,
  onChange,
  options = [10, 20, 50, 100],
  text = "Rows per page",
  value,
  ...props
}: PaginationPageSizeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-text-secondary",
        className,
      )}
    >
      <span>{text}</span>
      <select
        className="h-8 rounded-md border border-border bg-surface px-2 py-1 text-text outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        onChange={(e) => onChange(Number(e.target.value))}
        value={value}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export interface PaginationGoToProps extends Omit<
  React.ComponentProps<"input">,
  "onChange"
> {
  /**
   * Callback fired when the user submits a valid page number via the Enter key.
   */
  onChange: (page: number) => void;
  /**
   * Text to display before the input
   */
  text?: string;
  /**
   * The total number of available pages, used to restrict the maximum input value.
   */
  totalPages: number;
}

function PaginationGoTo({
  className,
  onChange,
  text = "Go to",
  totalPages,
  ...props
}: PaginationGoToProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = parseInt(e.currentTarget.value, 10);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
        onChange(val);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-text-secondary",
        className,
      )}
    >
      <span>{text}</span>
      <input
        className="h-8 w-12 rounded-md border border-border bg-surface px-2 py-1 text-center text-text outline-none transition-colors focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        max={totalPages}
        min={1}
        onKeyDown={handleKeyDown}
        type="number"
        {...props}
      />
    </div>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationCount,
  PaginationEllipsis,
  PaginationGoTo,
  PaginationItem,
  PaginationLink,
  PaginationNavButton,
  PaginationPageSize,
};
