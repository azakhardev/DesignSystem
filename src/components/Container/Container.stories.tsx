import type { Meta, StoryObj } from "@storybook/react-vite";

import { Container } from "./Container";

/**
 * The **Container** component is a layout primitive used to constrain content width and center it.
 * - It prevents content from stretching too wide on large displays.
 * - Ensures a consistent **gutter** (horizontal padding) on mobile devices.
 * - Supports the **asChild** prop to act as a semantic `<main>`, `<section>`, or `<header>`.
 */
const meta = {
  argTypes: {
    asChild: {
      control: "boolean",
    },
    center: {
      control: "boolean",
      description: "Automatically centers the container using mx-auto",
    },
    children: {
      control: false,
    },
    gutter: {
      control: "select",
      description: "Horizontal padding",
      options: ["none", "sm", "md", "lg"],
    },
    size: {
      control: "select",
      description: "Maximum width constraint",
      options: ["sm", "md", "lg", "xl", "2xl", "fluid"],
    },
  },
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  title: "Layout/Container",
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The **Default** container used for standard page content.
 */
export const Default: Story = {
  args: {
    center: true,
    gutter: "md",
    size: "lg",
  },
  render: (args) => (
    <div className="w-full bg-surface-subtle py-10">
      <Container
        {...args}
        className="bg-primary/10 border-2 border-dashed border-primary text-center py-10"
      >
        <h2 className="font-bold">Container Content</h2>
        <p className="text-sm text-text-secondary">
          Resize the viewport to see the max-width in action.
        </p>
      </Container>
    </div>
  ),
};

/**
 * A **Fluid** container takes up 100% of the width, useful for full-width banners or footers
 * that still need internal gutters.
 */
export const Fluid: Story = {
  args: {
    gutter: "md",
    size: "fluid",
  },
  render: (args) => (
    <Container
      {...args}
      className="bg-secondary/20 p-4 border border-secondary"
    >
      Fluid container (100% width)
    </Container>
  ),
};

/**
 * Using **asChild** to turn the Container into a semantic `<section>` element.
 */
export const SemanticSection: Story = {
  args: {
    asChild: true,
    children: (
      <section className="bg-info-surface p-8 rounded-xl shadow-lg border border-info">
        <h3 className="text-info-text font-bold">Semantic Section</h3>
        <p className="text-info-text opacity-80">
          This is a constrained section element.
        </p>
      </section>
    ),
    size: "md",
  },
};
