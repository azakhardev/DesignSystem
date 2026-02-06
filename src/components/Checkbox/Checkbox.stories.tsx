import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart, X } from "lucide-react";
import { useArgs } from "storybook/internal/preview-api";

import { Checkbox } from "./Checkbox";

/**
 * A customizable Checkbox component built with Headless UI patterns and Tailwind CSS.
 * It supports keyboard navigation, focus rings, custom icons, and validation states.
 */
const meta = {
  args: {
    checked: false,
    disabled: false,
    error: false,
    label: "Default label",
    onCheckedChange: () => {},
  },
  argTypes: {
    icon: { control: false },
    ref: { control: false },
  },
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  title: "Form/Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const RenderWithHooks: Story["render"] = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <Checkbox
      {...args}
      checked={!!checked}
      onCheckedChange={(newChecked) => updateArgs({ checked: newChecked })}
    />
  );
};

/**
 * The default state of the checkbox.
 */
export const Default: Story = {
  render: RenderWithHooks,
};

/**
 * The checked state pre-selected.
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
  render: RenderWithHooks,
};

/**
 * The disabled state prevents user interaction.
 * It changes visual opacity and cursor style.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    label: "This option is unavailable",
  },
  render: RenderWithHooks,
};

/**
 * The disabled and checked state.
 */
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: "You cannot uncheck this",
  },
  render: RenderWithHooks,
};

/**
 * The error state indicates a validation issue.
 * It typically turns the border red.
 */
export const Error: Story = {
  args: {
    error: true,
    label: "You must agree to continue",
  },
  render: RenderWithHooks,
};

/**
 * You can replace the default checkmark with any ReactNode (icon).
 * Here we use an 'X' icon from Lucide.
 */
export const CustomIcon: Story = {
  args: {
    checked: true,
    icon: <X size={14} strokeWidth={3} />,
    label: "Exclude this item",
  },
  render: RenderWithHooks,
};

/**
 * You can customize the shape and style of the checkbox box using `boxClassName`.
 * This example shows a rounded (circular) checkbox, often used for selection lists.
 */
export const CustomBoxStyle: Story = {
  args: {
    // Making it round and pink/rose colored
    boxClassName:
      "rounded-full w-6 h-6 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500",
    icon: <Heart fill="currentColor" size={14} />,
    label: "Add to favorites",
  },
  render: RenderWithHooks,
};

/**
 * A checkbox without a text label.
 */
export const NoLabel: Story = {
  args: {
    "aria-label": "Select row",
    label: undefined,
  },
  render: RenderWithHooks,
};
