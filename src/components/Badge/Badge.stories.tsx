import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle, Tag, XCircle } from "lucide-react";

import { Badge } from "./Badge";

/**
 * **Badge Component**
 * * A versatile badge used to highlight status, categories, or counts.
 * Supports different semantic variants, sizes, and custom HTML elements via the `as` prop.
 */
const meta = {
  argTypes: {
    as: {
      control: "text",
      description: "The underlying HTML element or React component to render",
      //Table allows categorise properties to categories and set their default values
      table: { category: "Target" },
    },
    children: {
      control: "text",
      description: "The text content of the badge",
      table: { category: "Content" },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
      table: { category: "Target" },
    },
    icon: {
      control: false,
      description: "Optional icon displayed before the text",
      table: { category: "Content" },
    },
    size: {
      control: "select",
      description: "The size of the badge",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "select",
      description: "The visual style variant of the badge",
      options: ["default", "info", "success", "warning", "error"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
      },
    },
  },
  component: Badge,
  parameters: {
    layout: "centered",
  },
  title: "Components/Badge",
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard badge using the default variant and medium size.
 */
export const Default: Story = {
  args: {
    children: "Default Badge",
    size: "md",
    variant: "default",
  },
};

/**
 * Showcases all semantic color variants available in the design system.
 */
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Badge {...args} variant="default">
        Default
      </Badge>
      <Badge {...args} variant="info">
        Info
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="error">
        Error
      </Badge>
    </div>
  ),
};

/**
 * Showcases the different sizes to ensure proper padding and font-scaling.
 */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};

/**
 * Badges can include an icon to provide better visual context and accessibility.
 */
export const WithIcon: Story = {
  args: {
    children: "Verified",
    icon: <CheckCircle size={14} />,
    variant: "success",
  },
};

/**
 * By using the `as` prop, you can change the underlying element to an anchor tag for navigation.
 */
export const AsLink: Story = {
  args: {
    as: "a",
    children: "Clickable Link",
    className: "cursor-pointer hover:underline",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    href: "https://google.com",
    icon: <Tag size={14} />,
    target: "_blank",
    variant: "info",
  },
};

/**
 * A critical error badge often used for alerts or system failures.
 */
export const ErrorAlert: Story = {
  args: {
    children: "System Failure",
    icon: <XCircle size={14} />,
    variant: "error",
  },
};
