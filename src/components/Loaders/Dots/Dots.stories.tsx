import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dots } from "./Dots";

/**
 * A customizable **jumping dots** loading indicator built with Framer Motion.
 *
 *
 * **It is perfect for:**
 * - **Wait states** (data fetching, processing).
 * - **Typing indicators** in chat interfaces.
 * - **Inline loading** feedback.
 *
 *
 * The component allows full control over the animation timing, geometry, and colors.
 */
const meta = {
  argTypes: {
    color: {
      control: "color",
      description: "Color of the dots. Accepts CSS variables or hex codes.",
      table: { defaultValue: { summary: "var(--primary)" } },
    },
    dotsCount: {
      control: { max: 10, min: 2, step: 1, type: "range" },
      description: "Number of dots to render.",
      table: { defaultValue: { summary: "3" } },
    },
    duration: {
      control: { max: 2, min: 0.2, step: 0.1, type: "range" },
      description: "Duration of one jump cycle per dot (in seconds).",
    },
    gap: {
      control: { max: 20, min: 2, step: 1, type: "range" },
      description: "Space between individual dots.",
    },
    itemStagger: {
      control: { step: 0.05, type: "number" },
      description: "Delay between the start of each dot's animation.",
    },
    jumpHeight: {
      control: { max: 50, min: 5, step: 1, type: "number" },
      description: "How high (in pixels) the dots jump.",
    },
    repeatDuration: {
      control: { max: 2, min: 0, step: 0.1, type: "range" },
      description: "Pause time between animation loops.",
    },
    size: {
      control: { max: 20, min: 2, step: 1, type: "range" },
      description: "Diameter of each dot in pixels.",
    },
  },
  component: Dots,
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
  title: "Components/Loaders/Dots",
} satisfies Meta<typeof Dots>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard configuration suitable for most loading states.
 */
export const Default: Story = {
  args: {
    dotsCount: 3,
    gap: 6,
    size: 10,
  },
};

/**
 * ### Chat Typing Indicator
 * A smaller, faster configuration that mimics the "user is typing" bubble found in chat applications (e.g., iMessage, Messenger).
 */
export const TypingIndicator: Story = {
  args: {
    className: "opacity-80",
    color: "#64748b",
    dotsCount: 3,
    duration: 0.6,
    gap: 4,
    itemStagger: 0.1,
    jumpHeight: 6,
    size: 4,
  },
};

/**
 * ### Smooth Wave
 * Uses a longer stagger and repeat delay to create a more relaxed, wavelike motion.
 * Useful for aesthetic, non-urgent loading states.
 */
export const SmoothWave: Story = {
  args: {
    color: "#3b82f6",
    dotsCount: 5,
    duration: 0.8,
    itemStagger: 0.15,
    jumpHeight: 12,
    size: 6,
  },
};

/**
 * ### High Impact
 * Larger dots with a higher jump, suitable for full-screen loading overlays.
 */
export const LargeLoader: Story = {
  args: {
    color: "#ef4444",
    dotsCount: 3,
    gap: 12,
    itemStagger: 0.1,
    jumpHeight: 25,
    size: 16,
  },
};
