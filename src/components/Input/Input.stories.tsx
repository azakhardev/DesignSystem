import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Eye, EyeClosed, KeyRound, Mail, Search, User } from "lucide-react";
import { useState } from "react";

/**
 * ### 🖊️ Input Component
 * A highly flexible and accessible **Input** component designed for modern forms.
 *
 * #### Features:
 * - **Compound Layout**: Supports leading `icon` and trailing `suffix` (text or interactive elements).
 * - **Accessibility**: Automatically handles `aria-invalid` and `aria-describedby` when an error is present.
 * - **React 19 Ready**: Fully supports the new ref prop mechanism.
 * - **Animations**: Smooth transitions for error messages using Framer Motion.
 */
const meta = {
  title: "Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: { control: { disable: true } },
    suffix: { control: { disable: true } },
    disabled: { control: "boolean" },
    errorText: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default input variant without icons.
 * Usefull for simple text inputs, names or addresses.
 */
export const Default: Story = {
  args: {
    placeholder: "Enter your name...",
  },
};

/**
 * Variant with the Icon at the start (`icon`).
 * Icon holps user to quickly identify purpose of the field (search, email, etc.).
 */
export const WithIcon: Story = {
  args: {
    placeholder: "Search anything...",
    icon: <Search />,
  },
};

/**
 * Demonstration of suffix slot at the end of the input.
 * Ideal for units (kg, cm, %), currency or action buttons.
 */
export const WithSuffix: Story = {
  args: {
    placeholder: "your-site",
    suffix: <span className="text-sm font-medium">.com</span>,
  },
};

/**
 * Combination of the Icon and the suffix.
 */
export const EmailExample: Story = {
  args: {
    placeholder: "john.doe",
    icon: <Mail />,
    suffix: <span className="text-sm text-text-secondary">@gmail.com</span>,
  },
};

/**
 * When the `errorText` prop is provided, the input visually indicates an error state
 * (red border/ring), and an animated error message appears below.
 *
 * Crucially, it automatically manages `aria-invalid` and `aria-describedby`
 * attributes to ensure screen readers correctly associate the error with the input.
 */
export const WithError: Story = {
  args: {
    placeholder: "Email address",
    icon: <Mail />,
    defaultValue: "invalid-email@",
    errorText: "Please enter a valid email address.",
  },
};

/**
 * Renders the input in a disabled state with reduced opacity and a `not-allowed` cursor.
 * Any internal icons or suffixes automatically inherit the disabled visual style
 * to maintain consistency.
 */
export const Disabled: Story = {
  args: {
    placeholder: "You cannot type here...",
    icon: <User />,
    disabled: true,
  },
};

/**
 * A complex example demonstrating how to utilize the `suffix` slot for
 * interactive elements.
 *
 * - Implements `useState` to toggle password visibility.
 * - Dynamically switches the input `type` between `text` and `password`.
 * - Toggles the icon within the `suffix` slot based on state.
 */
export const PasswordInput: Story = {
  render: (args) => {
    const [showPassword, setShowPassword] = useState(false);

    const ToggleIcon = showPassword ? EyeClosed : Eye;

    return (
      <Input
        {...args}
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        icon={<KeyRound />}
        suffix={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none text-text-secondary hover:text-text transition-colors"
            tabIndex={-1}
          >
            <ToggleIcon />
          </button>
        }
      />
    );
  },
};
