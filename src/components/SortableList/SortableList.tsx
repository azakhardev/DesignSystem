import { type DragControls, Reorder, useDragControls } from "framer-motion";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import React, { createContext, useContext } from "react";

import { cn } from "../../lib/utils";

function SortableList({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

function SortableListHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-2 text-sm font-medium text-text-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SortableListColumnProps extends React.ComponentProps<"button"> {
  /**
   * Direction of the items sorting
   */
  direction?: "asc" | "desc" | null;
  /**
   * Should be able to sort by this property?
   */
  sortable?: boolean;
}

function SortableListColumn({
  children,
  className,
  direction,
  sortable,
  ...props
}: SortableListColumnProps) {
  const isClickable = !!props.onClick || sortable;

  return (
    <button
      className={cn(
        "flex items-center gap-1.5 rounded outline-none cursor-default",
        isClickable &&
          "cursor-pointer transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      disabled={!isClickable}
      type="button"
      {...props}
    >
      {children}
      {isClickable && (
        <span className="flex h-4 w-4 items-center justify-center">
          {direction === "asc" ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : direction === "desc" ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
          )}
        </span>
      )}
    </button>
  );
}

/**
 * A wrapper around Framer Motion's Reorder.Group.
 * Accepts the array of values and an onReorder callback.
 */
type SortableListBodyProps<T> = Omit<
  React.ComponentProps<typeof Reorder.Group>,
  "values" | "onReorder"
> & {
  /**
   * Triggers when user changes the order of items
   */
  onReorder: (newOrder: T[]) => void;
  /**
   * Array of the items themselves
   */
  values: T[];
};

function SortableListBody<T>({
  children,
  className,
  ...props
}: SortableListBodyProps<T>) {
  return (
    <Reorder.Group
      axis="y"
      className={cn("flex flex-col gap-2 outline-none", className)}
      {...props}
    >
      {children}
    </Reorder.Group>
  );
}

/**
 * A wrapper around Framer Motion's Reorder.Item.
 *
 * Dragging is restricted to the <SortableListDragHandle /> via dragControls,
 * so interactive elements elsewhere in the card (buttons, links, inputs)
 * receive normal pointer events instead of starting a drag.
 */
const DragControlsContext = createContext<DragControls | null>(null);

function useDragControlsContext() {
  const controls = useContext(DragControlsContext);
  if (!controls) {
    throw new Error(
      "SortableListDragHandle must be used within a <SortableListItem>.",
    );
  }
  return controls;
}

type SortableListItemProps<T> = React.ComponentProps<typeof Reorder.Item> & {
  /**
   * Value/item that ListItem should hold - will be passed as part of the array into the onReorder function
   */
  value: T;
};

function SortableListItem<T>({
  className,
  ...props
}: SortableListItemProps<T>) {
  const controls = useDragControls();

  return (
    <DragControlsContext.Provider value={controls}>
      <Reorder.Item
        className={cn("relative outline-none", className)}
        dragControls={controls}
        dragListener={false}
        {...props}
      />
    </DragControlsContext.Provider>
  );
}

function SortableListCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 shadow-sm transition-shadow hover:shadow-md dark:shadow-surface-secondary",
        className,
      )}
      {...props}
    />
  );
}

/**
 * The only element that actually starts a drag (via dragControls.start).
 * Keyboard users cannot currently reorder items through this handle —
 * see the component docs for the known limitation.
 */
function SortableListDragHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const controls = useDragControlsContext();

  return (
    <div
      className={cn(
        "cursor-grab touch-none text-border active:cursor-grabbing",
        className,
      )}
      onPointerDown={(event) => controls.start(event)}
      {...props}
    >
      <GripVertical className="h-5 w-5" />
    </div>
  );
}

export {
  SortableList,
  SortableListBody,
  SortableListCard,
  SortableListColumn,
  SortableListDragHandle,
  SortableListHeader,
  SortableListItem,
};
