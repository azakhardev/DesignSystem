import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback } from "../Avatar";
import {
  SortableList,
  SortableListBody,
  SortableListCard,
  SortableListColumn,
  SortableListDragHandle,
  SortableListHeader,
  SortableListItem,
} from "./SortableList";

/**
 * A highly composable **SortableList** suite that supports both manual drag-and-drop reordering and automated property sorting.
 * Built on top of Framer Motion's `Reorder` API for fluid, performant animations.
 *
 * ### Component Architecture
 * - **`<SortableList>`**: The root layout wrapper.
 * - **`<SortableListHeader>`**: The container for your column names.
 * - **`<SortableListColumn>`**: A single column header. Pass an `onClick` and `direction` to enable automated sorting and display chevron indicators.
 * - **`<SortableListBody>`**: The draggable area (`Reorder.Group`). Requires `values` (your data array) and an `onReorder` callback.
 * - **`<SortableListItem>`**: The draggable wrapper (`Reorder.Item`) for a single row. Requires a `value` prop corresponding to its data item.
 * - **`<SortableListCard>`**: The visual styling container (surface color, borders, shadow) for a row.
 * - **`<SortableListDragHandle>`**: The grip element that the user clicks and drags to reorder the item.
 *
 * ### Key Features
 * - **Targeted Dragging**: Dragging is restricted to the `<SortableListDragHandle>`, meaning inputs, buttons, and links inside the row behave normally without triggering a drag.
 * - **Property Sorting**: Seamlessly handles ascending/descending states on column headers alongside manual reordering.
 */
const meta = {
  component: SortableList,
  parameters: {
    layout: "padded",
  },
  subcomponents: {
    SortableListBody,
    SortableListCard,
    SortableListColumn,
    SortableListDragHandle,
    SortableListHeader,
    SortableListItem,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Data Display/SortableList",
} satisfies Meta<typeof SortableList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock Data
const initialUsers = [
  { id: "1", name: "Alice Johnson", role: "Admin", status: "Active" },
  { id: "2", name: "Bob Smith", role: "Editor", status: "Offline" },
  { id: "3", name: "Charlie Davis", role: "Viewer", status: "Active" },
  { id: "4", name: "Diana Prince", role: "Editor", status: "Pending" },
];

type UserRow = (typeof initialUsers)[number];

/**
 * Shared render function so every story stays wired to real state
 * (sorting + drag reorder), rather than a static snapshot.
 */
function InteractiveListRender({
  initialItems = initialUsers,
}: {
  initialItems?: UserRow[];
}) {
  const [items, setItems] = useState(initialItems);
  const [sortConfig, setSortConfig] = useState<{
    direction: "asc" | "desc" | null;
    key: string;
  }>({
    direction: null,
    key: "",
  });

  const handleSort = (key: keyof UserRow) => {
    let newDirection: "asc" | "desc" | null = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      newDirection = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      newDirection = null;
    }

    setSortConfig({ direction: newDirection, key });

    if (newDirection === null) {
      setItems([...initialItems]);
    } else {
      const sorted = [...items].sort((a, b) => {
        if (a[key] < b[key]) return newDirection === "asc" ? -1 : 1;
        if (a[key] > b[key]) return newDirection === "asc" ? 1 : -1;
        return 0;
      });
      setItems(sorted);
    }
  };

  const handleReorder = (newOrder: UserRow[]) => {
    setItems(newOrder);
    setSortConfig({ direction: null, key: "" });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <SortableList>
          <SortableListHeader>
            <div className="w-8" />
            <SortableListColumn className="w-1/3">User Name</SortableListColumn>
            <SortableListColumn className="w-1/3">Role</SortableListColumn>
            <SortableListColumn className="w-1/3">Status</SortableListColumn>
          </SortableListHeader>
          <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-text-secondary">
            No items to display.
          </div>
        </SortableList>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <SortableList>
        <SortableListHeader>
          <div className="w-8" />
          <SortableListColumn
            className="w-1/3"
            data-testid="column-name"
            direction={sortConfig.key === "name" ? sortConfig.direction : null}
            onClick={() => handleSort("name")}
          >
            User Name
          </SortableListColumn>
          <SortableListColumn
            className="w-1/3"
            data-testid="column-role"
            direction={sortConfig.key === "role" ? sortConfig.direction : null}
            onClick={() => handleSort("role")}
          >
            Role
          </SortableListColumn>
          <SortableListColumn
            className="w-1/3"
            data-testid="column-status"
            direction={
              sortConfig.key === "status" ? sortConfig.direction : null
            }
            onClick={() => handleSort("status")}
          >
            Status
          </SortableListColumn>
        </SortableListHeader>

        <SortableListBody onReorder={handleReorder} values={items}>
          {items.map((item) => (
            <SortableListItem key={item.id} value={item}>
              <SortableListCard data-testid={`row-${item.id}`}>
                <SortableListDragHandle data-testid={`handle-${item.id}`} />

                <div className="flex w-1/3 items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-text">{item.name}</span>
                </div>

                <div className="w-1/3 text-sm text-text-secondary">
                  {item.role}
                </div>

                <div className="w-1/3 text-sm">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      item.status === "Active" &&
                        "bg-success-surface text-success-text",
                      item.status === "Offline" &&
                        "bg-surface-secondary text-text-secondary",
                      item.status === "Pending" &&
                        "bg-warning-surface text-warning-text",
                    )}
                  >
                    {item.status}
                  </span>
                </div>
              </SortableListCard>
            </SortableListItem>
          ))}
        </SortableListBody>
      </SortableList>
    </div>
  );
}

export const InteractiveList: Story = {
  render: () => <InteractiveListRender />,
};

/**
 * Zero items — confirms the caller-defined empty state renders instead of
 * an empty draggable area.
 */
export const Empty: Story = {
  render: () => <InteractiveListRender initialItems={[]} />,
};

/**
 * A single item — sanity check that dragging/sorting doesn't error with
 * nothing to reorder against.
 */
export const SingleItem: Story = {
  render: () => <InteractiveListRender initialItems={[initialUsers[0]]} />,
};

/**
 * A longer list, to eyeball scroll behavior and drag performance with
 * more items on screen.
 */
export const LongList: Story = {
  render: () => {
    const many: UserRow[] = Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
      status: i % 2 === 0 ? "Active" : "Offline",
    }));
    return <InteractiveListRender initialItems={many} />;
  },
};

/**
 * Headers with no `onClick` render as plain, non-interactive text —
 * no chevron, no button semantics.
 */
export const ReadOnlyColumns: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-3xl">
      <SortableList>
        <SortableListHeader>
          <div className="w-8" />
          <SortableListColumn className="w-1/3">User Name</SortableListColumn>
          <SortableListColumn className="w-1/3">Role</SortableListColumn>
          <SortableListColumn className="w-1/3">Status</SortableListColumn>
        </SortableListHeader>
        <SortableListBody onReorder={() => {}} values={initialUsers}>
          {initialUsers.map((item) => (
            <SortableListItem key={item.id} value={item}>
              <SortableListCard>
                <span className="w-1/3 font-medium text-text">{item.name}</span>
                <span className="w-1/3 text-sm text-text-secondary">
                  {item.role}
                </span>
                <span className="w-1/3 text-sm text-text-secondary">
                  {item.status}
                </span>
              </SortableListCard>
            </SortableListItem>
          ))}
        </SortableListBody>
      </SortableList>
    </div>
  ),
};
