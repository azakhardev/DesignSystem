import type { Meta, StoryObj } from "@storybook/react-vite";

import { Popover } from "./Popover";

const meta = {
  argTypes: {},
  component: Popover,
  parameters: {
    layout: "centered",
  },
  title: "Components/Popover",
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
