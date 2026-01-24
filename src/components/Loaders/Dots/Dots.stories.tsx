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
  title: "Components/Loaders/Dots",
  component: Dots,
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
    color: {
      control: "color",
      description: "Color of the dots. Accepts CSS variables or hex codes.",
      table: { defaultValue: { summary: "var(--primary)" } },
    },
    dotsCount: {
      control: { type: "range", min: 2, max: 10, step: 1 },
      description: "Number of dots to render.",
      table: { defaultValue: { summary: "3" } },
    },
    dotRadius: {
      control: { type: "range", min: 2, max: 20, step: 1 },
      description: "Radius of each dot in pixels.",
    },
    gap: {
      control: { type: "range", min: 2, max: 20, step: 1 },
      description: "Space between individual dots.",
    },
    jumpHeight: {
      control: { type: "number", min: 5, max: 50, step: 1 },
      description: "How high (in pixels) the dots jump.",
    },
    duration: {
      control: { type: "range", min: 0.2, max: 2, step: 0.1 },
      description: "Duration of one jump cycle per dot (in seconds).",
    },
    itemStagger: {
      control: { type: "number", step: 0.05 },
      description: "Delay between the start of each dot's animation.",
    },
    repeatDuration: {
      control: { type: "range", min: 0, max: 2, step: 0.1 },
      description: "Pause time between animation loops.",
    },
  },
} satisfies Meta<typeof Dots>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard configuration suitable for most loading states.
 */
export const Default: Story = {
  args: {
    dotsCount: 3,
    dotRadius: 10,
    gap: 6,
  },
};

/**
 * ### Chat Typing Indicator
 * A smaller, faster configuration that mimics the "user is typing" bubble found in chat applications (e.g., iMessage, Messenger).
 */
export const TypingIndicator: Story = {
  args: {
    dotsCount: 3,
    dotRadius: 4,
    gap: 4,
    jumpHeight: 6,
    duration: 0.6,
    itemStagger: 0.1,
    color: "#64748b",
    className: "opacity-80",
  },
};

/**
 * ### Smooth Wave
 * Uses a longer stagger and repeat delay to create a more relaxed, wavelike motion.
 * Useful for aesthetic, non-urgent loading states.
 */
export const SmoothWave: Story = {
  args: {
    dotsCount: 5,
    dotRadius: 6,
    jumpHeight: 12,
    itemStagger: 0.15,
    duration: 0.8,
    color: "#3b82f6",
  },
};

/**
 * ### High Impact
 * Larger dots with a higher jump, suitable for full-screen loading overlays.
 */
export const LargeLoader: Story = {
  args: {
    dotsCount: 3,
    dotRadius: 16,
    gap: 12,
    jumpHeight: 25,
    itemStagger: 0.1,
    color: "#ef4444",
  },
};
