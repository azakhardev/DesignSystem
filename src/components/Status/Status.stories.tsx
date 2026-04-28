import type { Meta, StoryObj } from "@storybook/react-vite";

import { Status } from "./Status";

/**
 * A highly customizable visual indicator used to signal system states (Online, Recording, Error, etc.).
 * It uses CSS animations driven by CSS variables for optimal performance and flexibility.
 */
const meta = {
  argTypes: {
    className: {
      control: "text",
      description:
        "Tailwind classes to control size and color (e.g., 'bg-emerald-500 size-4').",
    },
    speed: {
      control: { type: "select" },
      description: "Predefined speeds or a numeric value in milliseconds.",
      options: ["fast", "normal", "slow"],
    },
    variant: {
      control: "select",
      description:
        "Defines the animation style. 'default' pulses the outer ring, 'heartbeat' pulses the core as well.",
      options: ["default", "heartbeat"],
    },
  },
  component: Status,
  parameters: {
    layout: "centered",
  },
  title: "Primitives/Status",
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard online status indicator using default settings.
 */
export const Default: Story = {
  args: {
    className: "bg-emerald-500",
    speed: "normal",
    variant: "default",
  },
};

/**
 * Comparison of the two available animation patterns.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <div className="flex flex-col items-center gap-2">
        <Status className="bg-sky-500" variant="default" />
        <span className="text-xs text-text-secondary font-mono">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Status className="bg-sky-500" variant="heartbeat" />
        <span className="text-xs text-text-secondary font-mono">Heartbeat</span>
      </div>
    </div>
  ),
};

/**
 * Showcasing different predefined speeds.
 */
export const AnimationSpeeds: Story = {
  render: () => (
    <div className="flex gap-12 items-center">
      <div className="flex flex-col items-center gap-2">
        <Status className="bg-amber-500" speed="fast" />
        <span className="text-xs text-text-secondary font-mono">
          Fast (0.7s)
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Status className="bg-amber-500" speed="normal" />
        <span className="text-xs text-text-secondary font-mono">
          Normal (1.3s)
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Status className="bg-amber-500" speed="slow" />
        <span className="text-xs text-text-secondary font-mono">
          Slow (2.5s)
        </span>
      </div>
    </div>
  ),
};

/**
 * Integration with your design system's semantic colors.
 */
export const SemanticColors: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <Status className="bg-success" title="System Operational" />
      <Status className="bg-info" title="Updates Available" />
      <Status className="bg-warning" title="Heavy Traffic" />
      <Status
        className="bg-error"
        speed="fast"
        title="Critical Failure"
        variant="heartbeat"
      />
    </div>
  ),
};

/**
 * Demonstrates the ability to pass a custom numeric speed (milliseconds) via the `speed` prop.
 */
export const CustomNumericSpeed: Story = {
  args: {
    className: "bg-purple-500",
    speed: 400,
    variant: "heartbeat",
  },
};
