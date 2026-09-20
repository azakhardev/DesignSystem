import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Circle,
  Database,
  Server,
  ShieldAlert,
  Timer,
} from "lucide-react";
import { useState } from "react";

import { cn } from "../../lib/utils";
import {
  DragDropProvider,
  Draggable,
  type DragItem,
  DragTarget,
} from "./DragDrop";

/**
 * A lightweight, physics-based Drag and Drop engine built on Framer Motion.

Instead of heavy DOM-manipulation libraries, this component relies on an **Inversion of Control** pattern via React Context and Render Props.

### How the Architecture Works
 - **The Provider (`<DragDropProvider>`)**: Acts as the brain. You feed it your total array of `items`. It tracks mouse coordinates, handles DOM collision detection (via `getBoundingClientRect`), and manages the `active` state.
 - **The Target (`<DragTarget>`)**: Acts as a filter. It tells the Provider its `zoneId`. The Provider filters the global items array and hands the relevant items back to the Target via a `children` render prop function.
 - **The Item (`<Draggable>`)**: Acts as the physics body. It reports its drag coordinates back to the Provider. If dropped successfully, the Provider updates the item's `currentZone`. If dropped outside a zone, it springs back to its original DOM position automatically.

### Developer Requirements
- **Stable Keys**: When mapping items inside a `DragTarget`, you **must** use a combined key like `key={\`${item.id}-${item.currentZone}\`}`. This ensures React cleanly unmounts the item from the old zone and remounts it in the new zone without retaining old CSS transform data.
- **Payload Typing**: Pass a TypeScript interface to `DragTarget<MyType>` so your `children` render prop is strictly typed for your specific payload.
 */
const meta = {
  args: {
    items: [],
    onItemsChange: () => {},
  },
  component: DragDropProvider,
  parameters: {
    docs: {
      story: {
        // CRITICAL FIX: Renders the story in an iframe within the Docs tab.
        // Bypasses Storybook's inline CSS transforms which break Framer Motion's coordinate math.
        iframeHeight: 600,
        inline: false,
      },
    },
    layout: "padded",
  },
  subcomponents: { Draggable, DragTarget } as Record<
    string,
    React.ComponentType<unknown>
  >,
  title: "Data Display/DragDrop",
} satisfies Meta<typeof DragDropProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

interface BasicPayload {
  label: string;
}

const basicItems: DragItem<BasicPayload>[] = [
  { currentZone: "available", data: { label: "Apples" }, id: "1" },
  { currentZone: "available", data: { label: "Bananas" }, id: "2" },
  { currentZone: "available", data: { label: "Cherries" }, id: "3" },
];

/**
 * The most fundamental use case: moving items from a pool of available options into a selected bucket.
 */
export const BasicSelection: Story = {
  args: {
    children: <div>Empty</div>,
    items: basicItems,
  },
  render: () => {
    const [items, setItems] = useState(basicItems);

    return (
      <div className="mx-auto w-full max-w-2xl">
        <DragDropProvider items={items} onItemsChange={setItems}>
          <div className="flex gap-8">
            <div className="w-1/2 flex flex-col gap-2">
              <h3 className="font-medium text-text">Available Fruits</h3>
              <DragTarget<BasicPayload>
                className="min-h-75 flex-col"
                zoneId="available"
              >
                {(zoneItems) =>
                  zoneItems.map((item) => (
                    <Draggable className="w-full" item={item} key={item.id}>
                      {item.data.label}
                    </Draggable>
                  ))
                }
              </DragTarget>
            </div>

            <div className="w-1/2 flex flex-col gap-2">
              <h3 className="font-medium text-text">My Basket</h3>
              <DragTarget<BasicPayload>
                className="min-h-75 flex-col"
                zoneId="basket"
              >
                {(zoneItems) =>
                  zoneItems.map((item) => (
                    <Draggable className="w-full" item={item} key={item.id}>
                      {item.data.label}
                    </Draggable>
                  ))
                }
              </DragTarget>
            </div>
          </div>
        </DragDropProvider>
      </div>
    );
  },
};

// ==========================================
// KANBAN BOARD (THREE ZONES)
// ==========================================

interface TaskPayload {
  priority: "low" | "medium" | "high";
  title: string;
}

const kanbanItems: DragItem<TaskPayload>[] = [
  {
    currentZone: "todo",
    data: { priority: "high", title: "Fix login bug" },
    id: "t1",
  },
  {
    currentZone: "todo",
    data: { priority: "medium", title: "Update dependencies" },
    id: "t2",
  },
  {
    currentZone: "in-progress",
    data: { priority: "high", title: "Write API docs" },
    id: "t3",
  },
  {
    currentZone: "done",
    data: { priority: "low", title: "Fix typos in footer" },
    id: "t4",
  },
];

/**
 * A classic three-column layout demonstrating horizontal multi-zone dragging and custom card rendering based on the payload data.
 */
export const KanbanBoard: Story = {
  args: {
    children: <div>Empty</div>,
    items: basicItems,
  },
  render: () => {
    const [items, setItems] = useState(kanbanItems);

    const getPriorityColor = (priority: string) => {
      if (priority === "high") return "bg-error-surface text-error-text";
      if (priority === "medium") return "bg-warning-surface text-warning-text";
      return "bg-surface-secondary text-text-secondary";
    };

    return (
      <div className="mx-auto w-full max-w-5xl">
        <DragDropProvider items={items} onItemsChange={setItems}>
          <div className="grid grid-cols-3 gap-6">
            {/* To Do Column */}
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 font-medium text-text">
                <Circle className="h-4 w-4 text-text-secondary" /> To Do
              </h3>
              <DragTarget<TaskPayload>
                className="min-h-100 flex-col bg-surface-secondary/30 "
                zoneId="todo"
              >
                {(zoneItems) =>
                  zoneItems.map((item) => (
                    <Draggable
                      className="w-full flex flex-col gap-2"
                      item={item}
                      key={item.id}
                    >
                      <span className="text-sm font-medium">
                        {item.data.title}
                      </span>
                      <span
                        className={cn(
                          "w-fit rounded px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
                          getPriorityColor(item.data.priority),
                        )}
                      >
                        {item.data.priority}
                      </span>
                    </Draggable>
                  ))
                }
              </DragTarget>
            </div>

            {/* In Progress Column */}
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 font-medium text-text">
                <Timer className="h-4 w-4 text-warning-text" /> In Progress
              </h3>
              <DragTarget<TaskPayload>
                className="min-h-100 flex-col bg-surface-secondary/30"
                zoneId="in-progress"
              >
                {(zoneItems) =>
                  zoneItems.map((item) => (
                    <Draggable
                      className="w-full flex flex-col gap-2"
                      item={item}
                      key={item.id}
                    >
                      <span className="text-sm font-medium">
                        {item.data.title}
                      </span>
                      <span
                        className={cn(
                          "w-fit rounded px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
                          getPriorityColor(item.data.priority),
                        )}
                      >
                        {item.data.priority}
                      </span>
                    </Draggable>
                  ))
                }
              </DragTarget>
            </div>

            {/* Done Column */}
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 font-medium text-text">
                <CheckCircle2 className="h-4 w-4 text-success-text" /> Done
              </h3>
              <DragTarget<TaskPayload>
                className="min-h-100 flex-col bg-surface-secondary/30"
                zoneId="done"
              >
                {(zoneItems) =>
                  zoneItems.map((item) => (
                    <Draggable
                      className="w-full flex flex-col gap-2"
                      item={item}
                      key={item.id}
                    >
                      <span className="text-sm font-medium line-through opacity-70">
                        {item.data.title}
                      </span>
                      <span
                        className={cn(
                          "w-fit rounded px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider opacity-70",
                          getPriorityColor(item.data.priority),
                        )}
                      >
                        {item.data.priority}
                      </span>
                    </Draggable>
                  ))
                }
              </DragTarget>
            </div>
          </div>
        </DragDropProvider>
      </div>
    );
  },
};

// ==========================================
// KAFKA SUBSCRIPTIONS (COMPLEX/API)
// ==========================================

interface KafkaConsumer {
  description: string;
  name: string;
  type: "consumer" | "stream-processor";
}

const initialKafkaSetup: DragItem<KafkaConsumer>[] = [
  {
    currentZone: "unassigned",
    data: {
      description: "Pushes SMS/Push notifications",
      name: "NotificationService",
      type: "consumer",
    },
    id: "c1",
  },
  {
    currentZone: "unassigned",
    data: {
      description: "Analyzes velocity and origin",
      name: "FraudDetectionEngine",
      type: "stream-processor",
    },
    id: "c2",
  },
  {
    currentZone: "topic:transactions",
    data: {
      description: "Updates core banking DB",
      name: "LedgerUpdater",
      type: "stream-processor",
    },
    id: "c3",
  },
  {
    currentZone: "topic:auth",
    data: {
      description: "Logs failed login attempts",
      name: "AuditLogger",
      type: "consumer",
    },
    id: "c4",
  },
];

/**
 * A complex, asymmetrical layout demonstrating how to use the `onDrop` callback to trigger simulated network requests when items change zones.
 */
export const KafkaSubscriptions: Story = {
  args: {
    children: <div>Empty</div>,
    items: basicItems,
  },
  render: () => {
    const [items, setItems] = useState(initialKafkaSetup);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleDrop = (
      zoneId: string,
      _newItems: DragItem<KafkaConsumer>[],
      droppedItem: DragItem<KafkaConsumer>,
    ) => {
      setIsSyncing(true);
      console.log(
        `[API CALL] Re-routing ${droppedItem.data.name} to ${zoneId}...`,
      );

      setTimeout(() => {
        console.log(
          `[API SUCCESS] ${droppedItem.data.name} is now listening to ${zoneId}`,
        );
        setIsSyncing(false);
      }, 800);
    };

    return (
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text">
              Kafka Message Routing
            </h2>
            <p className="text-sm text-text-secondary">
              Drag services to subscribe them to topics.
            </p>
          </div>
          {isSyncing && (
            <span className="flex items-center gap-2 text-sm text-info-text animate-pulse">
              <Activity className="h-4 w-4" /> Syncing configuration...
            </span>
          )}
        </div>

        <DragDropProvider
          items={items}
          onDrop={handleDrop}
          onItemsChange={setItems}
        >
          <div className="flex gap-6">
            {/* Left Column: Unassigned Pool */}
            <div className="w-1/3 flex flex-col gap-2">
              <h3 className="font-medium text-text flex items-center gap-2">
                <Database className="h-4 w-4 text-text-secondary" />
                Available Services
              </h3>
              <DragTarget<KafkaConsumer>
                className="min-h-[400px] flex-col bg-surface"
                zoneId="unassigned"
              >
                {(zoneItems) =>
                  zoneItems.map((item) => (
                    <Draggable
                      className="flex flex-col gap-1 w-full"
                      item={item}
                      key={item.id}
                    >
                      <div className="flex items-center gap-2 font-medium text-text text-sm">
                        {item.data.type === "stream-processor" ? (
                          <Activity className="h-4 w-4 text-warning-text" />
                        ) : (
                          <Server className="h-4 w-4 text-info-text" />
                        )}
                        {item.data.name}
                      </div>
                      <span className="text-xs text-text-secondary line-clamp-1">
                        {item.data.description}
                      </span>
                    </Draggable>
                  ))
                }
              </DragTarget>
            </div>

            {/* Right Column: Active Topics */}
            <div className="w-2/3 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-text flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-text-secondary" />
                  Topic: core.transactions.v1
                </h3>
                <DragTarget<KafkaConsumer>
                  className="min-h-[120px] bg-surface"
                  zoneId="topic:transactions"
                >
                  {(zoneItems) =>
                    zoneItems.map((item) => (
                      <Draggable
                        className="w-[48%] flex flex-col gap-1"
                        item={item}
                        key={item.id}
                      >
                        <div className="font-medium text-text text-sm">
                          {item.data.name}
                        </div>
                        <span className="text-xs text-text-secondary line-clamp-1">
                          {item.data.description}
                        </span>
                      </Draggable>
                    ))
                  }
                </DragTarget>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-text flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-text-secondary" />
                  Topic: auth.events.v2
                </h3>
                <DragTarget<KafkaConsumer>
                  className="min-h-[120px] bg-surface"
                  zoneId="topic:auth"
                >
                  {(zoneItems) =>
                    zoneItems.map((item) => (
                      <Draggable
                        className="w-[48%] flex flex-col gap-1"
                        item={item}
                        key={item.id}
                      >
                        <div className="font-medium text-text text-sm flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4 text-error-text" />
                          {item.data.name}
                        </div>
                        <span className="text-xs text-text-secondary line-clamp-1">
                          {item.data.description}
                        </span>
                      </Draggable>
                    ))
                  }
                </DragTarget>
              </div>
            </div>
          </div>
        </DragDropProvider>
      </div>
    );
  },
};
