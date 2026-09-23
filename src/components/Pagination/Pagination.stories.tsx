import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationCount,
  PaginationEllipsis,
  PaginationGoTo,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPageSize,
  PaginationPrevious,
} from "./Pagination";
import { DOTS, usePagination } from "./usePagination";

/**
 * A highly composable **Pagination** suite for navigating across multi-page datasets.
 *
 * Designed with a Compound Component pattern, it allows developers to build anything from a simple centered pager to a complex, data-heavy table footer without overriding internal logic.
 *
 * ### The `usePagination` Hook
 * This suite intentionally separates the visual components from the pagination math. When building a standalone pager, use the included `usePagination` hook to automatically calculate sibling boundaries and inject `...` ellipses dynamically. If you are using a data-grid library (like TanStack Table), you can bypass the hook and feed the library's state directly into these visual components.
 *
 * ### Component Architecture
 * - **`<Pagination>`**: The semantic `<nav>` root wrapper.
 * - **`<PaginationContent>`**: The `<ul>` container handling flexbox spacing.
 * - **`<PaginationItem>`**: The `<li>` wrapper for standard semantic markup.
 * - **`<PaginationLink>`**: The clickable button. Use the `isActive` prop to highlight the current page.
 * - **`<PaginationPrevious>` & `<PaginationNext>`**: Pre-configured links with built-in Chevron icons and accessible labels.
 * - **`<PaginationEllipsis>`**: The `...` visual indicator for truncated ranges.
 * - **`<PaginationCount>`**: A supplementary text component for displaying context like "Showing 1 to 10 of 245 results".
 * - **`<PaginationPageSize>`**: A dropdown selector to control items per page.
 * - **`<PaginationGoTo>`**: A number input for rapid navigation to a specific page.
 */
const meta = {
  component: Pagination,
  parameters: { layout: "padded" },
  subcomponents: {
    PaginationContent,
    PaginationCount,
    PaginationEllipsis,
    PaginationGoTo,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPageSize,
    PaginationPrevious,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Navigation/Pagination",
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Utilizes the `usePagination` hook to automatically calculate sibling boundaries and ellipses dynamically.
 */
export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const totalCount = 150;
    const pageSize = 10;

    const paginationRange = usePagination({
      currentPage: page,
      pageSize,
      siblingCount: 1,
      totalCount,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            />
          </PaginationItem>

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <PaginationItem key={`dots-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={pageNumber === page}
                  onClick={() => setPage(pageNumber as number)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Incorporates context components (`PaginationCount`), dynamic sizing (`PaginationPageSize`), and rapid navigation (`PaginationGoTo`).
 */
export const DataTableFooter: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = 345;

    const paginationRange = usePagination({
      currentPage: page,
      pageSize,
      siblingCount: 1,
      totalCount: totalItems,
    });

    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);

    const handlePageSizeChange = (newSize: number) => {
      setPageSize(newSize);
      setPage(1); // Reset to page 1 when changing size
    };

    return (
      <div className="flex w-full flex-col items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3 shadow-sm lg:flex-row">
        {/* Left Side: Context & Sizing */}
        <div className="flex flex-wrap items-center gap-6">
          <PaginationCount
            end={end}
            itemName="transactions"
            start={start}
            total={totalItems}
          />
          <div className="hidden h-6 w-px bg-border md:block" />
          <PaginationPageSize
            onChange={handlePageSizeChange}
            value={pageSize}
          />
        </div>

        {/* Right Side: Navigation & Jump */}
        <div className="flex flex-wrap items-center gap-6">
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                />
              </PaginationItem>

              {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                  return (
                    <PaginationItem key={`dots-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === page}
                      onClick={() => setPage(pageNumber as number)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="hidden h-6 w-px bg-border md:block" />

          <PaginationGoTo onChange={setPage} totalPages={totalPages} />
        </div>
      </div>
    );
  },
};
