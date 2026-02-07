import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "../Input";
import { Label } from "./Label";

/**
 * Renders an accessible label associated with controls.
 * It enforces consistent typography and handles visual states like errors and disabling.
 *
 * Primitive component often used in conjunction with Input, Checkbox, or Switch.
 */
const meta = {
  args: {
    children: "Email Address",
    disabled: false,
    error: false,
  },
  argTypes: {
    children: { control: "text", description: "The content of the label" },
  },
  component: Label,
  parameters: {
    layout: "centered",
  },
  title: "Form/Label",
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default appearance of the Label.
 */
export const Default: Story = {};

/**
 * The label visually indicates an error state (usually red text).
 * Use this when the associated form field has validation errors.
 */
export const Error: Story = {
  args: {
    children: "Invalid Email",
    error: true,
  },
};

/**
 * The disabled state reduces opacity and changes the cursor to 'not-allowed'.
 * It visually communicates that the associated field cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * A real-world example showing the Label paired with an Input element.
 * Note that the `htmlFor` prop on the Label matches the `id` of the Input.
 */
export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label {...args} htmlFor="email-example" />
      <Input id="email-example" placeholder="name@example.com" type="email" />
    </div>
  ),
};
