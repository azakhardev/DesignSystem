import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "./Stack";

/**
 * The **Stack** component is a vertical layout primitive used to manage spacing and alignment between elements in a column.
 * - Built on top of **Flexbox (flex-direction: column)**.
 * - Supports **polymorphism** via the `asChild` prop.
 * - Ideal for forms, lists, and defining the vertical rhythm of a page.
 *
 * It is the vertical counterpart to the `Group` component.
 */
const meta = {
  argTypes: {
    align: {
      control: "select",
      description: "Horizontal alignment of items",
      options: ["start", "center", "end", "stretch"],
    },
    asChild: {
      control: "boolean",
    },
    children: {
      control: false,
    },
    gap: {
      control: "select",
      description: "Vertical space between children",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
    },
    grow: {
      control: "boolean",
      description:
        "If true, children will expand to fill available height equally",
    },
    justify: {
      control: "select",
      description: "Vertical distribution of items",
      options: ["start", "center", "end", "between", "around"],
    },
    wrap: {
      control: "boolean",
      description:
        "Whether items should wrap into new columns if height is constrained",
    },
  },
  component: Stack,
  parameters: {
    layout: "centered",
  },
  title: "Layout/Stack",
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to visualize stack items
const DemoItems = () => (
  <>
    <div className="h-10 w-32 rounded-sm bg-primary/20 border border-primary flex items-center justify-center text-xs">
      Item 1
    </div>
    <div className="h-10 w-48 rounded-sm bg-secondary/20 border border-secondary flex items-center justify-center text-xs">
      Item 2
    </div>
    <div className="h-10 w-32 rounded-sm bg-info/20 border border-info flex items-center justify-center text-xs">
      Item 3
    </div>
  </>
);

/**
 * **Default Stack** layout with standard vertical spacing and items stretching to full width.
 */
export const Default: Story = {
  args: {
    align: "stretch",
    children: <DemoItems />,
    gap: 4,
  },
};

/**
 * **Form Layout** example. Stack is ideal for managing the rhythm between form fields and buttons.
 */
export const FormExample: Story = {
  args: {
    gap: 4,
  },
  render: (args) => (
    <div className="w-80 border border-border p-6 rounded-xl bg-surface shadow-md">
      <Stack {...args}>
        <h3 className="font-bold text-lg mb-2">Login</h3>
        <Stack gap={2}>
          <label className="text-xs font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            className="border border-border rounded-sm p-2 text-sm"
            id="email"
            placeholder="user@example.com"
          />
        </Stack>
        <Stack gap={2}>
          <label className="text-xs font-medium" htmlFor="pswd">
            Password
          </label>
          <input
            className="border border-border rounded-sm p-2"
            id="pswd"
            placeholder="••••••••"
            type="password"
          />
        </Stack>
        <button className="mt-4 bg-primary text-on-primary py-2 rounded-md font-medium">
          Sign In
        </button>
      </Stack>
    </div>
  ),
};

/**
 * **Vertical Distribution** using `justify: between`.
 * This is useful when you have a fixed height container and want to push items to the top and bottom.
 */
export const VerticalDistribution: Story = {
  args: {
    gap: 0,
    justify: "between",
  },
  render: (args) => (
    <div className="h-48 w-64 border border-border p-4 rounded-lg bg-surface-subtle flex">
      <Stack {...args} className="w-full">
        <div className="p-3 bg-surface border border-border rounded-sm shadow-xs">
          Top Header
        </div>
        <div className="p-3 bg-surface border border-border rounded-sm shadow-xs">
          Navigation
        </div>
        <div className="p-3 bg-error/10 text-error border border-error rounded-sm shadow-xs">
          Logout Action
        </div>
      </Stack>
    </div>
  ),
};

/**
 * **Polymorphic Stack** applied to a semantic `<ul>` element.
 */
export const SemanticList: Story = {
  args: {
    asChild: true,
    children: (
      <ul className="list-none m-0 p-4 border rounded-lg bg-surface">
        <li className="p-2 hover:bg-surface-subtle rounded-sm cursor-pointer">
          Profile Settings
        </li>
        <li className="p-2 hover:bg-surface-subtle rounded-sm cursor-pointer">
          Security
        </li>
        <li className="p-2 hover:bg-surface-subtle rounded-sm cursor-pointer">
          Billing
        </li>
      </ul>
    ),
    gap: 2,
  },
};
