import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings, User } from "lucide-react";
import React from "react";

import { Button } from "../Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

/**
 * A highly interactive **Popover** component built with Framer Motion and modern CSS Anchor Positioning.
 * * Popovers are perfect for displaying rich content, forms, or menus that need to be contextually attached to a trigger element.
 * They support both `hover` and `click` interaction modes and manage focus and outside-clicks automatically.
 *
 * ### Key Features
 * - ⚓ **CSS Anchor Positioning**: Uses modern browser APIs (`anchor-name`, `position-area`) to perfectly align the content without heavy JavaScript calculations.
 * - 🖱️ **Dual Modes**: Seamlessly switch between `hover` (with customizable delays) and `click` interactions.
 * - ♿ **Accessible**: Handles `onBlur`, `onFocus`, and `click-outside` logic so the popover behaves naturally for keyboard and mouse users alike.
 * - 🪄 **Framer Motion**: Smooth entry and exit animations.
 */
const meta = {
  argTypes: {
    children: { disable: true },
    closeDelayDuration: {
      control: "number",
      description:
        "How long to wait (in ms) before closing the popover when the mouse leaves. Only applies to `hover` mode.",
    },
    delayDuration: {
      control: "number",
      description:
        "How long to wait (in ms) before opening the popover when hovered. Only applies to `hover` mode.",
    },
    mode: {
      control: "radio",
      description: "Determines how the popover is triggered.",
      options: ["hover", "click"],
    },
  },
  component: Popover,
  parameters: {
    layout: "centered",
  },
  subcomponents: { PopoverContent, PopoverTrigger } as Record<
    string,
    React.ComponentType<unknown>
  >,
  title: "Overlays/Popover",
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard `hover` mode implementation.
 * * Notice that you can move your mouse from the trigger into the Popover content without it closing,
 * thanks to the `closeDelayDuration` and hover listeners on the content itself.
 */
export const HoverMode: Story = {
  args: {
    closeDelayDuration: 300,
    delayDuration: 100,
    mode: "hover",
  },
  render: (args) => {
    return (
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button variant="secondary">Hover me</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px]" position="bottom">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-text-secondary">
              Update the dimensions for the model.
            </p>
            <div className="grid gap-2 pt-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-sm" htmlFor="width">
                  Width
                </label>
                <input
                  className="col-span-2 h-8 rounded border px-2 text-sm"
                  defaultValue="100%"
                  id="width"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-sm" htmlFor="height">
                  Height
                </label>
                <input
                  className="col-span-2 h-8 rounded border px-2 text-sm"
                  defaultValue="25px"
                  id="height"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * Setting `mode="click"` changes the interaction model entirely.
 * * The popover will only open when clicked, and will remain open until the user clicks outside the wrapper
 * or tabs away to a completely different element.
 */
export const ClickMode: Story = {
  args: {
    mode: "click",
  },
  render: (args) => {
    return (
      <Popover {...args}>
        <PopoverTrigger asChild>
          <Button className="gap-2 flex items-center">
            <User size={16} />
            Open Profile
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]" position="bottom">
          <div className="flex flex-col gap-2">
            <div className="px-1 pb-2 border-b border-border">
              <h4 className="font-semibold text-sm">John Doe</h4>
              <p className="text-xs text-text-secondary">Manage your account</p>
            </div>
            <button className="flex items-center gap-2 text-sm p-2 hover:bg-surface-secondary rounded-md w-full text-left transition-colors">
              <User size={14} /> Profile
            </button>
            <button className="flex items-center gap-2 text-sm p-2 hover:bg-surface-secondary rounded-md w-full text-left transition-colors">
              <Settings size={14} /> Settings
            </button>
            <button className="text-sm p-2 hover:bg-error-surface text-error-text rounded-md w-full text-left transition-colors mt-1">
              Log out
            </button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * You can control the popover's placement using the `position` prop on the `PopoverContent`.
 * * *Note: CSS Anchor Positioning automatically provides fallbacks. If there isn't enough space on the specified side, it will flip to the opposite side.*
 */
export const Placements: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-16 p-8 justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Position: Top</Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm px-3 py-1" position="top">
            I appear above the trigger!
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Position: Bottom</Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm px-3 py-1" position="bottom">
            I appear below the trigger!
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Position: Right</Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm px-3 py-1" position="right">
            I appear to the right!
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Position: Left</Button>
          </PopoverTrigger>
          <PopoverContent className="text-sm px-3 py-1" position="left">
            I appear to the left!
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
