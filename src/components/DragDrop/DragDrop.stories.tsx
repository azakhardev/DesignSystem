import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";

import { DraggableItem, DropZone } from "./DragDrop";

const meta = {
  component: DraggableItem,
  parameters: { layout: "padded" },
  subcomponents: { DropZone } as Record<string, React.ComponentType<unknown>>,
  title: "Data Display/DragDrop",
} satisfies Meta<typeof DraggableItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A single item, freely draggable, unconstrained. */
export const Basic: Story = {
  render: () => <DraggableItem className="w-40">Drag me</DraggableItem>,
};

/** Constrained to its parent via `dragConstraints` — a ref to the bounding box. */
export const ConstrainedToParent: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div
        className="relative h-64 w-full rounded-lg border border-dashed border-border bg-surface-secondary/40"
        ref={containerRef}
      >
        <DraggableItem
          className="absolute left-4 top-4 w-40"
          dragConstraints={containerRef}
        >
          Bounded drag
        </DraggableItem>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DraggableItem className="w-40" disabled>
      Can&apos;t drag this
    </DraggableItem>
  ),
};

/** DropZone visual states on their own, no drag logic wired up. */
export const DropZoneStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DropZone className="h-32">
        <p className="text-sm text-text-secondary">idle, with children</p>
      </DropZone>
      <DropZone className="h-32" isDropTarget>
        <p className="text-sm text-text-secondary">isDropTarget = true</p>
      </DropZone>
      <DropZone className="h-32" isEmpty />
    </div>
  ),
};

/**
 * A minimal working demo wiring a `DraggableItem` into a `DropZone` using a
 * bounding-box check on `onDragEnd`. This glue code lives in the story only
 * — swap it for whatever drop-detection approach fits your app (a proper
 * collision library, multiple zones, etc.).
 */
export const DragIntoZoneDemo: Story = {
  render: () => {
    const zoneRef = useRef<HTMLDivElement>(null);
    const [isOver, setIsOver] = useState(false);
    const [dropped, setDropped] = useState(false);

    const isPointOverZone = (x: number, y: number) => {
      const box = zoneRef.current?.getBoundingClientRect();
      if (!box) return false;
      return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    };

    return (
      <div className="flex flex-col gap-6">
        <DraggableItem
          className="w-40"
          dragSnapToOrigin={!dropped}
          onDrag={(_, info) => {
            setIsOver(isPointOverZone(info.point.x, info.point.y));
          }}
          onDragEnd={(_, info) => {
            const over = isPointOverZone(info.point.x, info.point.y);
            setIsOver(false);
            setDropped(over);
          }}
        >
          {dropped ? "Dropped ✓" : "Drag me into the zone"}
        </DraggableItem>

        <DropZone
          className="h-32"
          isDropTarget={isOver}
          isEmpty={!dropped}
          ref={zoneRef}
        >
          {dropped && (
            <p className="text-sm font-medium text-text">Item landed here</p>
          )}
        </DropZone>
      </div>
    );
  },
};
