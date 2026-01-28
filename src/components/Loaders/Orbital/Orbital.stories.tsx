import type { Meta, StoryObj } from "@storybook/react-vite";

import { Orbital } from "./Orbital";

/**
 * A mesmerizing **dual-orbit loading indicator**.
 *
 * * Features two dots orbiting around a central point in opposite directions.
 * * Fully scalable via the `size` prop – the dots resize proportionally.
 * * Built with **Framer Motion** for smooth, GPU-accelerated animation.
 *
 * Ideal for "processing" states or when you need a loader that feels more organic than a standard spinner.
 */
const meta = {
  argTypes: {
    primaryColor: {
      control: "color",
      description: "Color of the larger outer dot.",
      table: { defaultValue: { summary: "var(--primary)" } },
    },
    primaryDuration: {
      control: { max: 10, min: 0.5, step: 0.1, type: "range" },
      description: "Rotation speed of the primary dot (in seconds).",
      table: { defaultValue: { summary: "1" } },
    },
    secondaryColor: {
      control: "color",
      description: "Color of the smaller inner dot.",
      table: { defaultValue: { summary: "var(--secondary)" } },
    },
    secondaryDuration: {
      control: { max: 10, min: 0.5, step: 0.1, type: "range" },
      description: "Rotation speed of the secondary dot (in seconds).",
      table: { defaultValue: { summary: "0.8" } },
    },
    size: {
      control: { max: 200, min: 24, step: 4, type: "range" },
      description: "The total diameter of the orbital path in pixels.",
      table: { defaultValue: { summary: "48" } },
    },
  },
  component: Orbital,
  decorators: [
    (Story, context) => {
      const key = JSON.stringify(context.args);
      return (
        <div key={key} style={{ padding: "2rem" }}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "centered",
  },
  title: "Components/Loaders/Orbital",
} satisfies Meta<typeof Orbital>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default configuration uses the system's primary and secondary colors.
 */
export const Default: Story = {
  args: {
    size: 48,
  },
};

/**
 * ### Large Scale
 * Because the calculation uses percentages relative to `size`, the component scales perfectly without breaking the orbit path.
 */
export const Large: Story = {
  args: {
    primaryDuration: 2,
    secondaryDuration: 1.5,
    size: 128,
  },
};

/**
 * ### Slow & Ambient
 * By increasing the duration, you can create a calming, ambient loading effect suitable for background processes.
 */
export const SlowAmbient: Story = {
  args: {
    primaryColor: "#3b82f6",
    primaryDuration: 4,
    secondaryColor: "#60a5fa",
    secondaryDuration: 3,
    size: 64,
  },
};

/**
 * ### High Energy
 * Faster durations create a sense of urgency or rapid processing.
 */
export const FastProcessing: Story = {
  args: {
    primaryColor: "#ef4444",
    primaryDuration: 0.6,
    secondaryColor: "#f87171",
    secondaryDuration: 0.4,
    size: 40,
  },
};

/**
 * ### Monochrome
 * Using the same color (or shades of gray) for a subtle, professional look.
 */
export const Monochrome: Story = {
  args: {
    primaryColor: "#333333",
    secondaryColor: "#666666",
    size: 48,
  },
};
