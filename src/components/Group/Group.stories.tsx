import type { Meta, StoryObj } from "@storybook/react-vite";

import { Group } from "./Group";

/**
 * The **Group** component is a flexible layout primitive used to distribute items horizontally.
 * - Built on top of **Flexbox**.
 * - Supports **polymorphism** via the `asChild` prop using the `Slot` pattern.
 * - Provides type-safe controls for `gap`, `alignment`, and `distribution`.
 *
 * Use this component whenever you need to align elements like buttons, tags, or icons in a row.
 */
const meta = {
  argTypes: {
    align: {
      control: "select",
      description: "Vertical alignment of children",
      options: ["start", "center", "end", "baseline", "stretch"],
    },
    asChild: {
      control: "boolean",
      description: "Merge styles into the immediate child element",
    },
    children: {
      control: false,
    },
    gap: {
      control: "select",
      description: "Space between children (mapped to Tailwind gap scale)",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
    },
    grow: {
      control: "boolean",
      description:
        "If true, children will expand to fill available space equally",
    },
    justify: {
      control: "select",
      description: "Horizontal distribution of children",
      options: ["start", "center", "end", "between", "around"],
    },
    wrap: {
      control: "boolean",
      description: "Whether items should wrap to the next line",
    },
  },
  component: Group,
  parameters: {
    layout: "centered",
  },
  title: "Layout/Group",
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBoxes = () => (
  <>
    <div className="h-10 w-20 rounded bg-primary/20 border border-primary flex items-center justify-center text-xs">
      Box 1
    </div>
    <div className="h-14 w-20 rounded bg-secondary/20 border border-secondary flex items-center justify-center text-xs">
      Box 2
    </div>
    <div className="h-10 w-20 rounded bg-info/20 border border-info flex items-center justify-center text-xs">
      Box 3
    </div>
  </>
);

/**
 * The **Default** story shows the standard horizontal alignment with a small gap.
 */
export const Default: Story = {
  args: {
    align: "center",
    children: <DemoBoxes />,
    gap: 4,
    justify: "start",
  },
};

/**
 * Using **grow** is perfect for action bars where buttons should take up all available space.
 */
export const GrowingItems: Story = {
  args: {
    gap: 2,
    grow: true,
  },
  render: (args) => (
    <div className="w-[500px] border p-2 rounded-lg">
      <Group {...args}>
        <button className="bg-surface-subtle p-2 border rounded">Cancel</button>
        <button className="bg-primary text-white p-2 rounded">
          Save Changes
        </button>
      </Group>
    </div>
  ),
};

/**
 * **Justify Between** pushes items to the edges, ideal for headers or card footers.
 */
export const SpaceBetween: Story = {
  args: {
    align: "center",
    justify: "between",
  },
  render: (args) => (
    <div className="w-[400px] border p-4 rounded-lg bg-surface">
      <Group {...args}>
        <div className="font-bold">Card Title</div>
        <div className="text-xs text-text-secondary italic">Updated 2m ago</div>
      </Group>
    </div>
  ),
};

/**
 * Demonstrating the **asChild** prop. Here, the Group styles are applied directly
 * to a `<ul>` tag without an extra wrapping `div`.
 */
export const PolymorphicList: Story = {
  args: {
    asChild: true,
    children: (
      <ul className="list-none m-0 p-4 border rounded bg-surface-subtle">
        <li className="px-3 py-1 bg-white border rounded-full text-xs">
          React
        </li>
        <li className="px-3 py-1 bg-white border rounded-full text-xs">
          TypeScript
        </li>
        <li className="px-3 py-1 bg-white border rounded-full text-xs">
          Tailwind
        </li>
      </ul>
    ),
    gap: 2,
  },
};
