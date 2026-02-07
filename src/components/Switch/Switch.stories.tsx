import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Moon, Sun, X } from "lucide-react";
import { useArgs } from "storybook/internal/preview-api";

import { Switch } from "./Switch";

/**
 * A toggle switch component built with Framer Motion for smooth layout transitions.
 * It is fully controlled, accessible (using a hidden checkbox input), and supports custom icons.
 */
const meta = {
  args: {
    checked: false,
    disabled: false,
    onChange: () => {},
    onCheckedChange: () => {},
  },
  argTypes: {
    key: { control: false },
    ref: { control: false },
    switchIcon: { control: false },
  },
  component: Switch,
  parameters: {
    layout: "centered",
  },
  title: "Form/Switch",
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const RenderWithHooks: Story["render"] = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <div className="flex flex-row-reverse gap-1 items-center">
      <Switch
        {...args}
        checked={!!checked}
        id="switch"
        label="Label"
        onCheckedChange={(newChecked) => {
          updateArgs({ checked: newChecked });
          args.onCheckedChange?.();
        }}
      />
    </div>
  );
};

/**
 * The default interactive state of the Switch.
 */
export const Default: Story = {
  render: RenderWithHooks,
};

/**
 * The Switch in its initial 'checked' (on) state.
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
  render: RenderWithHooks,
};

/**
 * The disabled state prevents user interaction.
 * It reduces opacity and changes the cursor to indicate the state.
 */
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
  render: RenderWithHooks,
};

/**
 * A disabled switch that is stuck in the 'on' position.
 */
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: RenderWithHooks,
};

/**
 * The Switch supports injecting a custom icon into the thumb (circle).
 * Useful for Dark/Light mode toggles.
 */
export const WithIcon: Story = {
  args: {
    switchIcon: <Sun className="h-4 w-4 text-orange-500" />,
  },
  render: RenderWithHooks,
};

/**
 * An example demonstrating how to swap icons based on the `checked` state
 * by passing a conditional icon prop.
 */
export const DarkModeToggle: Story = {
  args: {
    checked: false,
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <Switch
        {...args}
        checked={!!checked}
        className={checked ? "bg-slate-900" : "bg-sky-200"}
        onCheckedChange={(val) => updateArgs({ checked: val })}
        switchIcon={
          checked ? (
            <Moon className="h-4 w-4 text-slate-700" fill="currentColor" />
          ) : (
            <Sun className="h-4 w-4 text-orange-500" fill="currentColor" />
          )
        }
      />
    );
  },
};

/**
 * Example using simple Check/X icons for confirmation.
 */
export const StatusToggle: Story = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <Switch
        {...args}
        checked={!!checked}
        className={checked ? "bg-primary" : "bg-red-200"}
        onCheckedChange={(val) => updateArgs({ checked: val })}
        switchIcon={
          checked ? (
            <Check className="h-3 w-3 text-primary" strokeWidth={4} />
          ) : (
            <X className="h-3 w-3 text-red-500" strokeWidth={4} />
          )
        }
      />
    );
  },
};
