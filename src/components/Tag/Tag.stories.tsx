import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";

import { Tag } from "./Tag";

const meta = {
  argTypes: {},
  component: Tag,
  parameters: {
    layout: "centered",
  },
  title: "Components/Tag",
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Filter",
    icon: <X size={20} />,
  },
};
