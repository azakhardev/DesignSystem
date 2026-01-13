import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  // Wraps every story in this file with provided div
  decorators: [
    (Story) => (
      <div className="max-w-[500px] border-2 border-dashed border-slate-300 p-4">
        <Story />
      </div>
    ),
  ],
  // Defines the options for different props of our component
  argTypes: {
    as: {
      control: "select",
      options: ["p", "h1", "h2", "h3", "span", "div", "label", "a"],
      description: "HTML tag, který se vyrenderuje",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: "p",
    children: "This is the default Text Component - it renders as <p>",
    size: "base",
  },
};

export const Heading: Story = {
  args: {
    as: "h1",
    children: "Main heading",
    size: "3xl",
    weight: "bold",
    align: "center",
  },
};

export const MutedLabel: Story = {
  args: {
    as: "span",
    children: "Muted text - for additional information",
    size: "sm",
    color: "muted",
  },
};

export const Link: Story = {
  args: {
    as: "a",
    children: "Click me (link)",
    href: "https://github.com/azakhardev/DesignSystem",
    target: "_blank",
    color: "primary",
    className: "hover:underline cursor-pointer text-info-text",
  },
};

export const ArticlePreview: Story = {
  //Allows to render Comopnent in a different way (with wrappers, static arguments, etc.)
  render: () => (
    <div className="flex flex-col gap-2">
      <Text as="h3" size="xl" weight="bold">
        How to use storybook?
      </Text>

      <div className="flex justify-between">
        <Text as="span" size="xs" color="muted">
          Author: Gemini
        </Text>
        <Text as="span" size="xs" color="muted">
          13.01.2026
        </Text>
      </div>

      <Text as="p" size="sm" align="justify">
        Storybook is a tool for developing UI Components in isolation. It allows
        documenting Component with <strong>autodocs</strong> and test different
        states.
      </Text>

      <Text as="a" href="#" color="primary" size="sm" weight="medium">
        Read whole article →
      </Text>
    </div>
  ),
};
