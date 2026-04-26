import type { Meta, StoryObj } from "@storybook/react-vite";

import { Kbd, KbdGroup } from "./Kbd";

/**
 * The `Kbd` component is used to signify keyboard input, typically for shortcuts.
 * It uses a monospace font and a subtle 3D shadow effect to resemble a physical key.
 */
const meta = {
  argTypes: {
    children: {
      description: "The character or symbol representing the key",
    },
    className: {
      description: "Additional CSS classes for custom styling",
    },
  },
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  title: "Primitives/Kbd",
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A standard single-key display.
 */
export const SingleKey: Story = {
  args: {
    children: "A",
  },
};

/**
 * Common modifier keys used in shortcuts.
 */
export const Modifiers: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Kbd>Shift</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Enter</Kbd>
    </div>
  ),
};

/**
 * Displaying shortcuts using macOS symbols.
 */
export const MacSymbols: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
    </KbdGroup>
  ),
};

/**
 * Using `KbdGroup` to display a full keyboard sequence.
 */
export const KeyCombination: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary">Copy:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>+<Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary">
          Open Command Palette:
        </span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd> +<Kbd>Shift</Kbd> +<Kbd>P</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
};

/**
 * Showing how `Kbd` components look when integrated directly into sentences.
 */
export const WithinText: Story = {
  render: () => (
    <p className="text-sm text-text">
      Press <Kbd>Esc</Kbd> to close the modal or{" "}
      <KbdGroup className="inline-flex">
        <Kbd>⌘</Kbd>+<Kbd>S</Kbd>
      </KbdGroup>{" "}
      to save your changes.
    </p>
  ),
};
