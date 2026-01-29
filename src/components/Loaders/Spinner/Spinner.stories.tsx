import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner } from "./Spinner";

/**
 * A highly customizable loading spinner built with **Framer Motion**.
 * - Supports different animation curves, custom colors, and thickness.
 * - It automatically calculates the border width based on size if not provided.
 */
const meta = {
  argTypes: {
    duration: {
      control: { max: 5, min: 0.25, step: 0.25, type: "range" },
      description: "Time in milliseconds to complete one full animation cycle.",
      table: { defaultValue: { summary: "2000" } },
    },
    ease: {
      control: { type: "radio" },
      description: "The timing function of the animation.",
      options: ["linear", "easeInOut"],
      table: { defaultValue: { summary: "easeInOut" } },
    },
    primaryColor: {
      control: "color",
      description: "The main color of the spinner track (CSS variable or hex).",
    },
    rotationsCount: {
      control: { max: 20, min: 1, type: "number" },
      description:
        "How many 360° turns are performed within one duration cycle.",
      table: { defaultValue: { summary: "5" } },
    },
    secondaryColor: {
      control: "color",
      description: "The color of the rotating 'head' of the spinner.",
    },
    size: {
      control: { max: 256, min: 16, step: 4, type: "range" },
      description: "The diameter of the spinner in pixels.",
      table: { defaultValue: { summary: "72" } },
    },
    thickness: {
      control: { type: "number" },
      description: "Thickness of the spinner's stroke. Defaults to `size / 6`.",
    },
  },
  component: Spinner,
  decorators: [
    (Story, context) => {
      const key = JSON.stringify([
        context.args.duration,
        context.args.rotationsCount,
        context.args.ease,
      ]);
      return (
        <div key={key}>
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "centered",
  },
  title: "Components/Loaders/Spinner",
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard look of the spinner with default theme colors and ease-in-out motion.
 */
export const Default: Story = {
  args: {
    duration: 2,
    size: 72,
  },
};

/**
 * Uses `ease: "linear"` for a consistent, non-stop rotation, ideal for simple loading states.
 */
export const ConstantRotation: Story = {
  args: {
    duration: 1,
    ease: "linear",
    rotationsCount: 1,
    size: 48,
  },
};

/**
 * A thinner, larger version with custom brand colors to demonstrate flexibility.
 */
export const BrandedThin: Story = {
  args: {
    duration: 1.5,
    primaryColor: "var(--app-background)",
    rotationsCount: 3,
    secondaryColor: "#0ea5e9",
    size: 120,
    thickness: 2,
  },
};
