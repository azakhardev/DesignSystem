import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Settings,
  Trash2,
} from "lucide-react";

import { Icon } from "./Icon";

/**
 * A standardized wrapper for rendering SVG icons from libraries like `lucide-react`.
 *
 * Enforces strict adherence to design system tokens for sizing and semantic colors,
 * preventing UI inconsistencies caused by random, hardcoded pixel values.
 */
const meta = {
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "muted",
        "success",
        "error",
        "warning",
        "info",
        "inherit",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    },
  },
  component: Icon,
  parameters: { layout: "centered" },
  title: "Data Display/Icon",
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Pass the raw Lucide component into the `as` prop.
 */
export const Default: Story = {
  args: {
    as: Settings,
    color: "default",
    size: "md",
  },
};

/**
 * Icons should utilize semantic color tokens rather than hardcoded hex values.
 */
export const Colors: Story = {
  args: {
    as: Settings,
    color: "default",
    size: "md",
  },
  render: (args) => (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-6 shadow-sm">
      <Icon as={Info} color="info" size="lg" />
      <Icon as={CheckCircle2} color="success" size="lg" />
      <Icon as={AlertCircle} color="warning" size="lg" />
      <Icon as={Trash2} color="error" size="lg" />
      <Icon as={Settings} color="muted" size="lg" />
    </div>
  ),
};

/**
 * Enforces standardized dimensions across all icons in the system.
 */
export const Sizes: Story = {
  args: {
    as: Settings,
    color: "default",
    size: "md",
  },
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon as={Settings} size="xs" />
        <span className="text-xs text-text-secondary">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon as={Settings} size="sm" />
        <span className="text-xs text-text-secondary">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon as={Settings} size="md" />
        <span className="text-xs text-text-secondary">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon as={Settings} size="lg" />
        <span className="text-xs text-text-secondary">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon as={Settings} size="xl" />
        <span className="text-xs text-text-secondary">xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon as={Settings} size="2xl" />
        <span className="text-xs text-text-secondary">2xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon as={Settings} size="3xl" />
        <span className="text-xs text-text-secondary">3xl</span>
      </div>
    </div>
  ),
};
