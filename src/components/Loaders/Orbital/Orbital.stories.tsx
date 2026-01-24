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
  title: "Components/Loaders/Orbital",
  component: Orbital,
  parameters: {
    layout: "centered",
  },
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
  argTypes: {
    size: {
      control: { type: "range", min: 24, max: 200, step: 4 },
      description: "The total diameter of the orbital path in pixels.",
      table: { defaultValue: { summary: "48" } },
    },
    primaryColor: {
      control: "color",
      description: "Color of the larger outer dot.",
      table: { defaultValue: { summary: "var(--primary)" } },
    },
    secondaryColor: {
      control: "color",
      description: "Color of the smaller inner dot.",
      table: { defaultValue: { summary: "var(--secondary)" } },
    },
    primaryDuration: {
      control: { type: "range", min: 0.5, max: 10, step: 0.1 },
      description: "Rotation speed of the primary dot (in seconds).",
      table: { defaultValue: { summary: "1" } },
    },
    secondaryDuration: {
      control: { type: "range", min: 0.5, max: 10, step: 0.1 },
      description: "Rotation speed of the secondary dot (in seconds).",
      table: { defaultValue: { summary: "0.8" } },
    },
  },
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
    size: 128,
    primaryDuration: 2,
    secondaryDuration: 1.5,
  },
};

/**
 * ### Slow & Ambient
 * By increasing the duration, you can create a calming, ambient loading effect suitable for background processes.
 */
export const SlowAmbient: Story = {
  args: {
    size: 64,
    primaryDuration: 4,
    secondaryDuration: 3,
    primaryColor: "#3b82f6",
    secondaryColor: "#60a5fa",
  },
};

/**
 * ### High Energy
 * Faster durations create a sense of urgency or rapid processing.
 */
export const FastProcessing: Story = {
  args: {
    size: 40,
    primaryDuration: 0.6,
    secondaryDuration: 0.4,
    primaryColor: "#ef4444",
    secondaryColor: "#f87171",
  },
};

/**
 * ### Monochrome
 * Using the same color (or shades of gray) for a subtle, professional look.
 */
export const Monochrome: Story = {
  args: {
    size: 48,
    primaryColor: "#333333",
    secondaryColor: "#666666",
  },
};
