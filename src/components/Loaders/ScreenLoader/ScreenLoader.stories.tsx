import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScreenLoader } from "./ScreenLoader";

/**
 * `ScreenLoader` is an animated loading indicator featuring a "wave" effect.
 *
 * Built with **Framer Motion**, it automatically orchestrates the animation of
 * individual bars. It is fully responsive, accessible, and highly configurable.
 */
const meta = {
  title: "Components/Loaders/ScreenLoader",
  component: ScreenLoader,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "color",
      description: "Color of the bars (CSS color or hex).",
    },
    barHeight: {
      control: { type: "range", min: 20, max: 200 },
      description: "Maximum height of a bar during the animation peak.",
    },
    barWidth: {
      control: "number",
      description: "Width of a single bar (in px).",
    },
    barCount: {
      control: { type: "range", min: 3, max: 20 },
      description: "Total number of bars in the loader.",
    },
    duration: {
      control: { type: "range", min: 0.2, max: 5, step: 0.1 },
      description: "Duration of one full animation loop (in seconds).",
    },
    itemStagger: {
      control: { type: "number", step: 0.05 },
      description: "Delay between the start of each bar's animation.",
    },
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
    barHeight: 40,
    barWidth: 6,
    barCount: 12,
    duration: 0.8,
    itemStagger: 0.08,
    color: "#3b82f6", // Blue example
  },
};

/**
 * Slow and calm variant.
 * Suitable for full-screen loaders or relaxing applications where you want to avoid
 * rapid movement or flashing effects.
 */
export const CalmLoading: Story = {
  args: {
    barHeight: 100,
    barWidth: 16,
    barCount: 5,
    duration: 2,
    itemStagger: 0.3,
    color: "#10b981", // Green example
  },
};

/**
 * Brand customization example.
 * Demonstrates how to match the loader to a specific brand identity using color and size.
 */
export const BrandColor: Story = {
  args: {
    barHeight: 80,
    barCount: 7,
    color: "#f43f5e", // Pink/Red example
  },
};
