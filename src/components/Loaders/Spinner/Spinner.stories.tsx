import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

/**
 * A highly customizable loading spinner built with **Framer Motion**.
 * - Supports different animation curves, custom colors, and thickness.
 * - It automatically calculates the border width based on size if not provided.
 */
const meta = {
  title: "Components/Loaders/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
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
  argTypes: {
    size: {
      control: { type: "range", min: 16, max: 256, step: 4 },
      description: "The diameter of the spinner in pixels.",
      table: { defaultValue: { summary: "72" } },
    },
    duration: {
      control: { type: "range", min: 0.25, max: 5, step: 0.25 },
      description: "Time in milliseconds to complete one full animation cycle.",
      table: { defaultValue: { summary: "2000" } },
    },
    thickness: {
      control: { type: "number" },
      description: "Thickness of the spinner's stroke. Defaults to `size / 6`.",
    },
    rotationsCount: {
      control: { type: "number", min: 1, max: 20 },
      description:
        "How many 360° turns are performed within one duration cycle.",
      table: { defaultValue: { summary: "5" } },
    },
    primaryColor: {
      control: "color",
      description: "The main color of the spinner track (CSS variable or hex).",
    },
    secondaryColor: {
      control: "color",
      description: "The color of the rotating 'head' of the spinner.",
    },
    ease: {
      options: ["linear", "easeInOut"],
      control: { type: "radio" },
      description: "The timing function of the animation.",
      table: { defaultValue: { summary: "easeInOut" } },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard look of the spinner with default theme colors and ease-in-out motion.
 */
export const Default: Story = {
  args: {
    size: 72,
    duration: 2,
  },
};

/**
 * Uses `ease: "linear"` for a consistent, non-stop rotation, ideal for simple loading states.
 */
export const ConstantRotation: Story = {
  args: {
    size: 48,
    duration: 1,
    ease: "linear",
    rotationsCount: 1,
  },
};

/**
 * A thinner, larger version with custom brand colors to demonstrate flexibility.
 */
export const BrandedThin: Story = {
  args: {
    size: 120,
    thickness: 2,
    primaryColor: "var(--app-background)",
    secondaryColor: "#0ea5e9",
    duration: 1.5,
    rotationsCount: 3,
  },
};
