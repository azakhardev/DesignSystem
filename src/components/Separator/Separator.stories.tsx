import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./Separator";
/**
 * A visual primitive for separating content either horizontally or vertically.
 * It renders an accessible separator that can be customized in thickness and color.
 */
const meta = {
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes (useful for colors like `bg-red-500`).",
    },
    orientation: {
      control: "radio",
      description: "Defines the axis the separator runs along.",
      options: ["horizontal", "vertical"],
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    thickness: {
      control: { max: 10, min: 1, type: "number" },
      description: "Sets the visual thickness of the line in pixels.",
      table: {
        defaultValue: { summary: "1" },
      },
    },
  },
  component: Separator,
  parameters: {
    layout: "centered",
  },
  title: "Components/Separator",
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    thickness: 1,
  },
  render: (args) => (
    <div className="w-[300px] space-y-4 rounded-lg border p-4 shadow-sm">
      <div>
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-text-secondary">
          View the settings for the layer.
        </p>
      </div>

      <Separator {...args} />

      <div className="flex items-center space-x-4 text-sm">
        <div>Width</div>
        <div>Height</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    thickness: 1,
  },
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-sm font-medium">
      <div>Blog</div>
      <Separator {...args} />
      <div>Docs</div>
      <Separator {...args} />
      <div>Source</div>
    </div>
  ),
};

export const CustomStyle: Story = {
  args: {
    className: "bg-blue-500",
    orientation: "horizontal",
    thickness: 3,
  },
  render: (args) => (
    <div className="w-[300px] space-y-4">
      <div className="text-center font-bold text-primary">Section Header</div>
      <Separator {...args} />
      <p className="text-sm text-text-secondary">
        This separator has a custom thickness and uses a utility class for
        color.
      </p>
    </div>
  ),
};
