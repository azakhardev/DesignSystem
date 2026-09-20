import type { Meta, StoryObj } from "@storybook/react-vite";
import { Download, Edit2, MoreHorizontal, Trash2 } from "lucide-react";

import { Icon, IconButton } from "./Icon";

/**
 * **IconButton** is an accessible wrapper for actionable icons.
 *
 * Always use this component instead of raw `<button>` tags when building icon-only triggers.
 * It enforces consistent hit areas, hover states, and strictly requires an `aria-label`
 * to ensure screen readers can announce the button's purpose.
 */
const meta = {
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "ghost", "outline"],
    },
  },
  component: IconButton,
  parameters: { layout: "centered" },
  title: "Primitives/IconButton",
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A ghost button is the most common variant for icon buttons inside lists or toolbars.
 */
export const Default: Story = {
  args: {
    "aria-label": "Download file",
    children: <Icon as={Download} size="md" />,
    size: "md",
    variant: "ghost",
  },
};

/**
 * Support for standard button variants. `ghost` blends in, `outline` provides structure, and `default` emphasizes the action.
 */
export const Variants: Story = {
  args: {
    "aria-label": "Label",
    size: "md",
    variant: "default",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton aria-label="More options" variant="ghost">
        <Icon as={MoreHorizontal} size="md" />
      </IconButton>
      <IconButton aria-label="Edit item" variant="outline">
        <Icon as={Edit2} size="md" />
      </IconButton>
      <IconButton aria-label="Delete item" variant="default">
        <Icon as={Trash2} size="md" />
      </IconButton>
    </div>
  ),
};

/**
 * Ensure the inner `<Icon>` size matches the `<IconButton>` size for perfect visual balance.
 */
export const Sizes: Story = {
  args: {
    "aria-label": "Label",
    size: "md",
    variant: "default",
  },
  render: () => (
    <div className="flex items-end gap-4">
      <IconButton aria-label="Small action" size="xs" variant="outline">
        <Icon as={Download} size="xs" />
      </IconButton>

      <IconButton aria-label="Medium action" size="sm" variant="outline">
        <Icon as={Download} size="sm" />
      </IconButton>

      <IconButton aria-label="Large action" size="md" variant="outline">
        <Icon as={Download} size="md" />
      </IconButton>

      <IconButton aria-label="Extra large action" size="lg" variant="outline">
        <Icon as={Download} size="lg" />
      </IconButton>
    </div>
  ),
};
