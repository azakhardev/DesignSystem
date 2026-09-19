import { type HTMLMotionProps, motion } from "framer-motion";
import { Inbox } from "lucide-react";
import React from "react";

import { cn } from "../../lib/utils";

/**
 * A free-draggable item, built on Framer Motion's `drag`. Purely visual —
 * you own the actual drop logic. Wire up `dragConstraints`, `onDragStart`,
 * `onDragEnd`, `onDrag`, etc. as needed (they pass straight through); this
 * component only adds the grab cursor, hover/drag affordances, and a
 * sensible default for `dragMomentum`.
 */
interface DraggableItemProps extends Omit<HTMLMotionProps<"div">, "drag"> {
  /** Disables dragging and dims the item. */
  disabled?: boolean;
}

function DraggableItem({ className, disabled, ...props }: DraggableItemProps) {
  return (
    <motion.div
      className={cn(
        "touch-none select-none rounded-lg border border-border bg-surface px-4 py-3 shadow-sm",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-grab active:cursor-grabbing",
        className,
      )}
      drag={!disabled}
      dragElastic={0.15}
      dragMomentum={false}
      whileDrag={{
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.18)",
        scale: 1.04,
        zIndex: 50,
      }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { cursor: "grabbing" }}
      {...props}
    />
  );
}

/**
 * A container meant to receive draggable items — either items rendered
 * inside it as `children`, or items dropped in from elsewhere (you decide
 * what "dropped in" means, using whatever collision check you write around
 * a `DraggableItem`'s `onDragEnd`).
 *
 * This component is fully controlled for visuals: `isDropTarget` should
 * flip to `true` for the moment a drag is hovering over this zone (e.g.
 * from your own `onDrag`/bounding-box check), and `isEmpty` swaps in the
 * empty-state placeholder.
 */
interface DropZoneProps extends React.ComponentProps<"div"> {
  /** Custom content shown when `isEmpty` is true. Defaults to a simple placeholder. */
  emptyState?: React.ReactNode;
  /**
   * Whether something is currently being dragged over this zone. Purely
   * visual — you decide when this is true (e.g. via your own hit-testing
   * in a drag handler).
   */
  isDropTarget?: boolean;
  /** Whether the zone has no items — shows `emptyState` instead of `children`. */
  isEmpty?: boolean;
}

function DropZone({
  children,
  className,
  emptyState,
  isDropTarget,
  isEmpty,
  ...props
}: DropZoneProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-2 rounded-lg border-2 border-dashed border-border bg-surface-secondary/40 p-4 transition-colors duration-150",
        isDropTarget && "border-accent bg-accent-surface/40",
        className,
      )}
      {...props}
    >
      {isEmpty ? (emptyState ?? <DropZoneEmptyState />) : children}
    </div>
  );
}

/** Default placeholder shown by `DropZone` when `isEmpty` is true. */
function DropZoneEmptyState({
  className,
  label = "Drop items here",
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-2 py-8 text-text-secondary",
        className,
      )}
      {...props}
    >
      <Inbox className="h-6 w-6" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export { DraggableItem, DropZone, DropZoneEmptyState };
