import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScreenLoader } from "./ScreenLoader";

/**
 * `ScreenLoader` is an animated loading indicator featuring a "wave" effect.
 *
 * Built with **Framer Motion**, it automatically orchestrates the animation of
 * individual bars. It is fully responsive, accessible, and highly configurable.
 */
const meta = {
  argTypes: {
    barCount: {
      control: { max: 20, min: 3, type: "range" },
      description: "Total number of bars in the loader.",
    },
    barHeight: {
      control: { max: 200, min: 20, type: "range" },
      description: "Maximum height of a bar during the animation peak.",
    },
    barWidth: {
      control: "number",
      description: "Width of a single bar (in px).",
    },
    color: {
      control: "color",
      description: "Color of the bars (CSS color or hex).",
    },
    duration: {
      control: { max: 5, min: 0.2, step: 0.1, type: "range" },
      description: "Duration of one full animation loop (in seconds).",
    },
    itemStagger: {
      control: { step: 0.05, type: "number" },
      description: "Delay between the start of each bar's animation.",
    },
  },
  component: ScreenLoader,
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

  title: "Components/Loaders/ScreenLoader",
} satisfies Meta<typeof ScreenLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default loader appearance.
 * Ideal for general content loading or section placeholders.
 */
export const Default: Story = {
  args: {
    barHeight: 60,
  },
};

/**
 * "High Density" variant.
 * A faster animation with many thin bars. Gives a modern and technical feel.
 */
export const SmoothFlow: Story = {
  args: {
    barCount: 12,
    barHeight: 40,
    barWidth: 6,
    color: "#3b82f6", // Blue example
    duration: 0.8,
    itemStagger: 0.08,
  },
};

/**
 * Slow and calm variant.
 * Suitable for full-screen loaders or relaxing applications where you want to avoid
 * rapid movement or flashing effects.
 */
export const CalmLoading: Story = {
  args: {
    barCount: 5,
    barHeight: 100,
    barWidth: 16,
    color: "#10b981", // Green example
    duration: 2,
    itemStagger: 0.3,
  },
};

/**
 * Brand customization example.
 * Demonstrates how to match the loader to a specific brand identity using color and size.
 */
export const BrandColor: Story = {
  args: {
    barCount: 7,
    barHeight: 80,
    color: "#f43f5e", // Pink/Red example
  },
};
