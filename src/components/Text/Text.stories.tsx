import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "./Text";

/**
 * The **Text** component is the unified typography primitive for the application.
 * - **Polymorphic:** Use the `as` prop to render semantic HTML (e.g., `h1` for SEO, `span` for inline, `a` for links).
 * - **Responsive:** The `size` prop handles responsive scaling automatically (e.g., `2xl` scales up on desktop).
 * - **Type-Safe:** Strictly typed to prevent invalid attributes (e.g., `href` is only allowed when `as="a"`).
 */
const meta = {
  // Defines the options for different props of our component
  argTypes: {
    as: {
      control: "select",
      description: "HTML tag, který se vyrenderuje",
      options: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "span",
        "div",
        "label",
        "a",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"],
    },
  },
  component: Text,
  // Wraps every story in this file with provided div
  decorators: [
    (Story) => (
      <div className="max-w-[500px] border-2 border-dashed border-slate-300 p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  title: "Components/Text",
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * **Default** renders a standard paragraph (`<p>`).
 * This is the go-to component for body text.
 */
export const Default: Story = {
  args: {
    as: "p",
    children: "This is the default Text Component - it renders as <p>",
    size: "base",
  },
};

/**
 * **Heading** example demonstrating semantic HTML.
 * Changing `as="h1"` ensures correct document structure for SEO, while `size` and `weight` control the visual hierarchy.
 */
export const Heading: Story = {
  args: {
    align: "center",
    as: "h1",
    children: "Main heading",
    size: "3xl",
    weight: "bold",
  },
};

/**
 * **Muted Label** uses the `color="muted"` variant.
 * Ideal for secondary information, dates, or captions that shouldn't distract from the main content.
 */
export const MutedLabel: Story = {
  args: {
    as: "span",
    children: "Muted text - for additional information",
    color: "muted",
    size: "sm",
  },
};

/**
 * **Link** demonstrates the component's polymorphism.
 * By setting `as="a"`, the component accepts anchor-specific props like `href` and `target` while maintaining the design system's typography.
 */
export const Link: Story = {
  args: {
    as: "a",
    children: "Click me (link)",
    className: "hover:underline cursor-pointer text-info-text",
    color: "default",
    href: "https://github.com/azakhardev/DesignSystem",
    target: "_blank",
  },
};

/**
 * **Article Preview** shows a real-world composition.
 * This example uses the `render` method to demonstrate how different variants (`muted`, `bold`, `link`) work together in a layout.
 */
export const ArticlePreview: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text as="h3" size="xl" weight="bold">
        How to use storybook?
      </Text>

      <div className="flex justify-between">
        <Text as="span" color="muted" size="xs">
          Author: Gemini
        </Text>
        <Text as="span" color="muted" size="xs">
          13.01.2026
        </Text>
      </div>

      <Text align="justify" as="p" size="sm">
        Storybook is a tool for developing UI Components in isolation. It allows
        documenting Component with <strong>autodocs</strong> and test different
        states.
      </Text>

      <Text as="a" color="default" href="#" size="sm" weight="medium">
        Read whole article →
      </Text>
    </div>
  ),
};
