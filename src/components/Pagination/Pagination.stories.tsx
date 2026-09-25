import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { SortableListColumn } from "../SortableList/SortableList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";
import {
  Pagination,
  PaginationContent,
  PaginationCount,
  PaginationEllipsis,
  PaginationGoTo,
  PaginationItem,
  PaginationLink,
  PaginationNavButton,
  PaginationPageSize,
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
 * - **`<PaginationNavButton>`: Pre-configured links for moving to next/previous page.
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
    PaginationPageSize,
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
            <PaginationNavButton
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft /> Previous
            </PaginationNavButton>
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
            <PaginationNavButton
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight />
            </PaginationNavButton>
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
                <PaginationNavButton
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft /> Prev
                </PaginationNavButton>
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
                <PaginationNavButton
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next <ChevronRight />
                </PaginationNavButton>
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

const FIRST_NAMES = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "George",
  "Hannah",
  "Ivan",
  "Julia",
  "Kevin",
  "Laura",
  "Marcus",
  "Nina",
  "Oscar",
  "Priya",
];
const LAST_NAMES = [
  "Johnson",
  "Smith",
  "Davis",
  "Prince",
  "Walker",
  "Chen",
  "Rivera",
  "Patel",
  "Kowalski",
  "Nguyen",
  "Brooks",
  "Alvarez",
];
const ROLES = ["Admin", "Editor", "Viewer"] as const;
const STATUSES = ["Active", "Offline", "Pending"] as const;

interface UserRow {
  email: string;
  id: number;
  name: string;
  role: (typeof ROLES)[number];
  status: (typeof STATUSES)[number];
}

function generateUsers(count: number): UserRow[] {
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 3 + 1) % LAST_NAMES.length];
    return {
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      id: i + 1,
      name: `${first} ${last}`,
      role: ROLES[i % ROLES.length],
      status: STATUSES[i % STATUSES.length],
    };
  });
}

const ALL_USERS = generateUsers(87);

function statusBadgeClass(status: UserRow["status"]) {
  switch (status) {
    case "Active":
      return "bg-success-surface text-success-text";
    case "Offline":
      return "bg-surface-secondary text-text-secondary";
    case "Pending":
      return "bg-warning-surface text-warning-text";
  }
}

/**
 * A real table (your `Table` primitives) driven by pagination, with
 * click-to-sort columns. Sorting reuses `SortableListColumn` for the
 * header button + chevron + `aria-sort`, rendered inside `TableHead` —
 * composition rather than duplicating that logic in the table itself.
 */
export const TableWithPaginationDemo = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
      key: keyof UserRow | "";
      direction: "asc" | "desc" | null;
    }>({ direction: null, key: "" });

    const sortedUsers = useMemo(() => {
      if (!sortConfig.key || !sortConfig.direction) return ALL_USERS;
      const key = sortConfig.key;
      return [...ALL_USERS].sort((a, b) => {
        if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }, [sortConfig]);

    const handleSort = (key: keyof UserRow) => {
      setSortConfig((prev) => {
        if (prev.key !== key) return { direction: "asc", key };
        if (prev.direction === "asc") return { direction: "desc", key };
        return { direction: null, key: "" }; // reset
      });
      setPage(1);
    };

    const totalItems = sortedUsers.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, totalItems);
    const visibleRows = sortedUsers.slice(start, end);

    const paginationRange = usePagination({
      currentPage: page,
      pageSize,
      siblingCount: 1,
      totalCount: totalItems,
    });

    const handlePageSizeChange = (newSize: number) => {
      setPageSize(newSize);
      setPage(1);
    };

    const columns: { key: keyof UserRow; label: string }[] = [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status" },
    ];

    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        <Table stripped>
          <TableHeader>
            {columns.map((col) => (
              <TableHead key={col.key}>
                <SortableListColumn
                  direction={
                    sortConfig.key === col.key ? sortConfig.direction : null
                  }
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                </SortableListColumn>
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {visibleRows.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-text">
                  {user.name}
                </TableCell>
                <TableCell allowCopy>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadgeClass(user.status)}`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="flex flex-wrap items-center gap-6">
            <PaginationCount
              end={end}
              itemName="users"
              start={start + 1}
              total={totalItems}
            />
            <div className="hidden h-6 w-px bg-border md:block" />
            <PaginationPageSize
              onChange={handlePageSizeChange}
              options={[5, 10, 20, 50]}
              value={pageSize}
            />
          </div>

          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationNavButton
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft /> Prev
                </PaginationNavButton>
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
                <PaginationNavButton
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next <ChevronRight />
                </PaginationNavButton>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
};

/**
 * Edge case: total items fit within a small number of pages, so
 * `usePagination` never needs to insert ellipsis on either side.
 */
export const FewPagesNoEllipsis: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const totalCount = 28;
    const pageSize = 10;
    const totalPages = Math.ceil(totalCount / pageSize);

    const paginationRange = usePagination({
      currentPage: page,
      pageSize,
      siblingCount: 1,
      totalCount,
    });

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNavButton
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft /> Previous
            </PaginationNavButton>
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
            <PaginationNavButton
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight />
            </PaginationNavButton>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Edge case: current page starts in the middle of a large range, so
 * both a left and a right ellipsis should render simultaneously.
 */
export const ManyPagesDoubleEllipsis: Story = {
  render: () => {
    const [page, setPage] = useState(23);
    const totalCount = 980;
    const pageSize = 10;
    const totalPages = Math.ceil(totalCount / pageSize);

    const paginationRange = usePagination({
      currentPage: page,
      pageSize,
      siblingCount: 1,
      totalCount,
    });

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNavButton
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft /> Previous
            </PaginationNavButton>
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
            <PaginationNavButton
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight />
            </PaginationNavButton>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * Edge case: everything fits on a single page. Both nav buttons should
 * render disabled, and only page 1 should be shown.
 */
export const SinglePage: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationNavButton disabled>
            <ChevronLeft /> Previous
          </PaginationNavButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNavButton disabled>
            Next <ChevronRight />
          </PaginationNavButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/**
 * A compact variant for narrow layouts — drops the numbered links entirely
 * in favor of a "Page X of Y" label between prev/next buttons. Built purely
 * from the existing primitives, no new component needed.
 */
export const CompactMobile: Story = {
  render: () => {
    const [page, setPage] = useState(4);
    const totalPages = 12;

    return (
      <div className="w-full max-w-xs">
        <Pagination>
          <PaginationContent className="w-full justify-between">
            <PaginationItem>
              <PaginationNavButton
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft />
              </PaginationNavButton>
            </PaginationItem>

            <span className="text-sm text-text-secondary">
              Page <span className="font-medium text-text">{page}</span> of{" "}
              {totalPages}
            </span>

            <PaginationItem>
              <PaginationNavButton
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight />
              </PaginationNavButton>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};
