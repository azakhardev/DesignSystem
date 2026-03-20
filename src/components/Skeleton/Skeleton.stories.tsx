import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./Skeleton";

/**
 * The **Skeleton** component is used to provide a visual placeholder while content is loading.
 * - **Shimmer Effect:** Uses a CSS-optimized `cubic-bezier` animation for a smooth, premium feel.
 * - **Accessibility:** Automatically set to `aria-hidden="true"` to prevent screen readers from announcing empty placeholders.
 * - **Versatile:** Use the `variant` prop to toggle between rectangular and circular shapes.
 */
const meta = {
  argTypes: {
    className: {
      control: "text",
      description: "Tailwind classes for sizing and spacing.",
    },
    variant: {
      control: "radio",
      description: "The shape of the skeleton.",
      options: ["rect", "circle"],
    },
  },
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  title: "Components/Skeleton",
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * **Default** is a simple rectangular placeholder.
 * Use width and height classes to match the expected content.
 */
export const Default: Story = {
  args: {
    className: "w-[400px] h-[20px]",
    variant: "rect",
  },
};

/**
 * **Circle** is typically used for avatars or icon placeholders.
 */
export const Circle: Story = {
  args: {
    className: "w-12 h-12",
    variant: "circle",
  },
};

/**
 * **Text Block** simulates a paragraph.
 * Combining multiple skeletons with varying widths creates a more realistic loading state.
 */
export const TextBlock: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[300px]">
      <Skeleton className="h-4 w-full bg-blue-400" />
      <Skeleton className="h-4 w-full bg-blue-400" />
      <Skeleton className="h-4 w-[60%] bg-blue-400" />
    </div>
  ),
};

/**
 * **Card Showcase** demonstrates how to compose skeletons into a complex UI component.
 */
export const CardShowcase: Story = {
  render: () => (
    <div className="flex items-center space-x-4 p-4 border rounded-xl w-[400px]">
      <Skeleton className="h-12 w-12" variant="circle" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
