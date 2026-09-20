import {
  type HTMLMotionProps,
  motion,
  type PanInfo,
  useAnimate,
} from "framer-motion";
import { Inbox } from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

/** A single draggable item tracked by `DragDropProvider`. */
export interface DragItem<T> {
  /** The id of the zone this item currently belongs to. */
  currentZone: string;
  /** Arbitrary payload — label, metadata, whatever your item needs. */
  data: T;
  /** Stable, unique identifier for this item. */
  id: string;
}

interface DragDropContextValue<T> {
  activeItemId: string | null;
  beginDrag: (itemId: string) => void;
  /** Synchronous: computes the drop target and, if valid, commits the move. Returns whether it moved. */
  endDrag: (x: number, y: number) => boolean;
  hoveredZoneId: string | null;
  items: DragItem<T>[];
  registerZone: (
    zoneId: string,
    ref: React.RefObject<HTMLDivElement | null>,
  ) => () => void;
  updateDrag: (x: number, y: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DragDropContext = createContext<DragDropContextValue<any> | null>(null);

function useDragDropContext<T>() {
  const ctx = useContext(DragDropContext) as DragDropContextValue<T> | null;
  if (!ctx) {
    throw new Error(
      "DragTarget and Draggable must be used within a <DragDropProvider>.",
    );
  }
  return ctx;
}

interface DragDropProviderProps<T> {
  children: React.ReactNode;
  /**
   * List of items that are draggable between zones.
   */
  items: DragItem<T>[];
  /**
   *  Fires once, right when a drop lands in a new zone.
   */
  onDrop?: (
    zoneId: string,
    items: DragItem<T>[],
    droppedItem: DragItem<T>,
  ) => void;
  /**
   *  Fires continuously while dragging, whenever the hovered zone changes.
   */
  onItemEnter?: (
    zoneId: string,
    items: DragItem<T>[],
    activeItem: DragItem<T>,
  ) => void;
  /**
   * Called with the updated array after a successful drop into a *different* zone.
   */
  onItemsChange: (items: DragItem<T>[]) => void;
}

function DragDropProvider<T>({
  children,
  items,
  onDrop,
  onItemEnter,
  onItemsChange,
}: DragDropProviderProps<T>) {
  const zonesRef = useRef(
    new Map<string, React.RefObject<HTMLDivElement | null>>(),
  );
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const registerZone = useCallback(
    (zoneId: string, ref: React.RefObject<HTMLDivElement | null>) => {
      zonesRef.current.set(zoneId, ref);
      return () => {
        zonesRef.current.delete(zoneId);
      };
    },
    [],
  );

  const getZoneAt = useCallback((x: number, y: number): string | null => {
    for (const [zoneId, ref] of zonesRef.current) {
      const box = ref.current?.getBoundingClientRect();
      if (!box) continue;
      if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) {
        return zoneId;
      }
    }
    return null;
  }, []);

  const beginDrag = useCallback((itemId: string) => {
    setActiveItemId(itemId);
  }, []);

  const updateDrag = useCallback(
    (x: number, y: number) => {
      const zoneId = getZoneAt(x, y);
      setHoveredZoneId((prev) => {
        if (zoneId && zoneId !== prev && activeItemId) {
          const activeItem = items.find((i) => i.id === activeItemId);
          if (activeItem) onItemEnter?.(zoneId, items, activeItem);
        }
        return zoneId;
      });
    },
    [getZoneAt, items, activeItemId, onItemEnter],
  );

  const endDrag = useCallback(
    (x: number, y: number): boolean => {
      const zoneId = getZoneAt(x, y);
      const activeItem = items.find((i) => i.id === activeItemId);

      setHoveredZoneId(null);
      setActiveItemId(null);

      if (!zoneId || !activeItem || zoneId === activeItem.currentZone) {
        return false; // dropped outside any zone, or back on its own zone
      }

      const newItems = items.map((i) =>
        i.id === activeItem.id ? { ...i, currentZone: zoneId } : i,
      );
      onItemsChange(newItems);
      onDrop?.(zoneId, newItems, activeItem);
      return true;
    },
    [getZoneAt, items, activeItemId, onItemsChange, onDrop],
  );

  const value = useMemo<DragDropContextValue<T>>(
    () => ({
      activeItemId,
      beginDrag,
      endDrag,
      hoveredZoneId,
      items,
      registerZone,
      updateDrag,
    }),
    [
      activeItemId,
      beginDrag,
      endDrag,
      hoveredZoneId,
      items,
      registerZone,
      updateDrag,
    ],
  );

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
}

export interface DragTargetProps<T> extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /**
   * A render prop function. Receives the strictly filtered array of items
   * that currently belong to this zone. You map over this array to render your `<Draggable>` components.
   */
  children: (items: DragItem<T>[]) => React.ReactNode;
  /**
   * The visual placeholder rendered when no items belong to this zone.
   * Defaults to a built-in `<DropZoneEmptyState>`.
   */
  emptyState?: React.ReactNode;
  /**
   * The unique identifier for this zone.
   * Must exactly match the `currentZone` string of the items expected to land here.
   */
  zoneId: string;
}

function DragTarget<T>({
  children,
  className,
  emptyState,
  zoneId,
  ...props
}: DragTargetProps<T>) {
  const { hoveredZoneId, items, registerZone } = useDragDropContext<T>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => registerZone(zoneId, ref), [zoneId, registerZone]);

  const zoneItems = items.filter((item) => item.currentZone === zoneId);
  const isEmpty = zoneItems.length === 0;
  const isDropTarget = hoveredZoneId === zoneId;

  return (
    <div
      className={cn(
        "relative flex w-full flex-row flex-wrap gap-2 rounded-lg border-2 border-dashed border-border bg-surface-secondary/80 p-4 transition-colors duration-150",
        isDropTarget && "border-accent bg-accent-surface/40",
        className,
      )}
      ref={ref}
      {...props}
    >
      {isEmpty ? (emptyState ?? <DropZoneEmptyState />) : children(zoneItems)}
    </div>
  );
}

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

export interface DraggableProps<T> extends Omit<
  HTMLMotionProps<"div">,
  "drag" | "onDrag" | "onDragEnd" | "onDragStart"
> {
  /**
   * Prevents dragging and applies a disabled visual state.
   */
  disabled?: boolean;
  /**
   * The complete data object for this item.
   * Passed directly to the context so the provider knows exactly *what* is being dragged.
   */
  item: DragItem<T>;
}

function Draggable<T>({
  className,
  disabled,
  item,
  ...props
}: DraggableProps<T>) {
  const { beginDrag, endDrag, updateDrag } = useDragDropContext<T>();
  const [scope, animate] = useAnimate();

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const moved = endDrag(info.point.x, info.point.y);
    if (!moved && scope.current) {
      animate(
        scope.current,
        { x: 0, y: 0 },
        { damping: 30, stiffness: 500, type: "spring" },
      );
    }
  };

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
      onDrag={(_, info) => updateDrag(info.point.x, info.point.y)}
      onDragEnd={handleDragEnd}
      onDragStart={() => beginDrag(item.id)}
      ref={scope}
      whileDrag={{
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.18)",
        scale: 1.04,
        zIndex: 200,
      }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { cursor: "grabbing" }}
      {...props}
    />
  );
}

export { DragDropProvider, Draggable, DragTarget, DropZoneEmptyState };
