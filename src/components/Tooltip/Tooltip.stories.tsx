import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen } from "storybook/test";

import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
/**
 * A lightweight, accessible tooltip built on the CSS Anchor Positioning API
 * with Framer Motion animations. Supports all four sides with smart overflow
 * fallbacks, configurable open/close delays, and `asChild` composition.
 */
const meta = {
  args: {
    children: <>None</>,
  },
  argTypes: {
    children: {
      control: false,
      description:
        "Content inside of the Tooltip - usually TooltipTrigger and TooltipContent",
    },
    closeDelayDuration: {
      control: { min: 0, step: 50, type: "number" },
      description:
        "Milliseconds before the tooltip hides after the cursor leaves. Useful when the tooltip content itself needs to be hoverable.",
    },
    delayDuration: {
      control: { min: 0, step: 50, type: "number" },
      description: "Milliseconds before the tooltip appears after hover.",
    },
  },
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  subcomponents: { TooltipContent, TooltipTrigger } as Record<
    string,
    React.ComponentType<unknown>
  >,
  title: "Feedback/Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The simplest usage with default props — top side, 200ms delay.
 */
export const Default: Story = {
  args: {
    closeDelayDuration: 100,
    delayDuration: 200,
  },
  play: async function ({ canvas, userEvent }) {
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    const trigger = canvas.getByRole("button", { name: "Hover me" });
    await userEvent.hover(trigger);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("This is a tooltip");
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="top" text="This is a tooltip" />
    </Tooltip>
  ),
};

/**
 * Demonstrates all four `side` options with their entrance animations
 * originating from the correct edge.
 */
export const AllSides: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 place-items-center w-72 h-48">
      <div />
      <Tooltip>
        <TooltipTrigger>Top</TooltipTrigger>
        <TooltipContent side="top" text="Appears above" />
      </Tooltip>
      <div />

      <Tooltip>
        <TooltipTrigger>Left</TooltipTrigger>
        <TooltipContent side="left" text="Appears left" />
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger>Right</TooltipTrigger>
        <TooltipContent side="right" text="Appears right" />
      </Tooltip>

      <div />
      <Tooltip>
        <TooltipTrigger>Bottom</TooltipTrigger>
        <TooltipContent side="bottom" text="Appears below" />
      </Tooltip>
      <div />
    </div>
  ),
};

/**
 * Compares different open and close delay configurations.
 * Instant open feels snappy for always-visible UI, while a longer
 * delay reduces noise when the user is just moving the cursor around.
 */
export const Timing: Story = {
  render: () => (
    <div className="flex gap-10 items-center">
      <div className="flex flex-col items-center gap-3">
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Instant</TooltipTrigger>
          <TooltipContent side="top" text="Opens immediately" />
        </Tooltip>
        <span className="text-xs text-text-secondary font-mono">
          delay: 0ms
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Tooltip delayDuration={200}>
          <TooltipTrigger>Default</TooltipTrigger>
          <TooltipContent side="top" text="Opens after 200ms" />
        </Tooltip>
        <span className="text-xs text-text-secondary font-mono">
          delay: 200ms
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Tooltip delayDuration={600}>
          <TooltipTrigger>Slow</TooltipTrigger>
          <TooltipContent side="top" text="Opens after 600ms" />
        </Tooltip>
        <span className="text-xs text-text-secondary font-mono">
          delay: 600ms
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Tooltip closeDelayDuration={300} delayDuration={200}>
          <TooltipTrigger>Sticky</TooltipTrigger>
          <TooltipContent side="top" text="Stays for 300ms after leave" />
        </Tooltip>
        <span className="text-xs text-text-secondary font-mono">
          close: 300ms
        </span>
      </div>
    </div>
  ),
};

/**
 * `asChild` merges all tooltip props (anchor name, event handlers, aria attributes)
 * directly onto your own element — no extra wrapper `<button>` is rendered.
 * Useful for icon buttons, links, or custom interactive elements.
 */
export const AsChild: Story = {
  render: () => (
    <div className="flex gap-10 items-center">
      <div className="flex flex-col items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="text-sm underline text-blue-500"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              A link
            </a>
          </TooltipTrigger>
          <TooltipContent side="top" text="Tooltip on an anchor tag" />
        </Tooltip>
        <span className="text-xs text-text-secondary font-mono">
          asChild + &lt;a&gt;
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="px-3 py-1.5 rounded bg-surface border border-border text-sm cursor-pointer"
              role="button"
              tabIndex={0}
            >
              Custom div
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" text="Tooltip on a custom element" />
        </Tooltip>
        <span className="text-xs text-text-secondary font-mono">
          asChild + &lt;div&gt;
        </span>
      </div>
    </div>
  ),
};

/**
 * When `TooltipTrigger` has no children, it renders a `CircleQuestionMark`
 * icon automatically. Handy for inline help hints next to form labels or settings.
 */
export const DefaultIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">API Rate Limit</span>
      <Tooltip>
        <TooltipTrigger />
        <TooltipContent
          side="right"
          sideOffset={6}
          text="The maximum number of requests allowed per minute for your plan."
        />
      </Tooltip>
    </div>
  ),
};

/**
 * When a tooltip on the right or left side doesn't fit the viewport,
 * it automatically falls back to a centered-below or centered-above position.
 * Resize the window or place the trigger near the edge to see the fallback in action.
 */
export const OverflowFallback: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="w-full h-screen flex items-center justify-between px-4">
      <Tooltip>
        <TooltipTrigger>Near left edge</TooltipTrigger>
        <TooltipContent
          side="left"
          text="Falls back to bottom or top if left side overflows"
        />
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>Near right edge</TooltipTrigger>
        <TooltipContent
          side="right"
          text="Falls back to bottom or top if right side overflows"
        />
      </Tooltip>
    </div>
  ),
};
