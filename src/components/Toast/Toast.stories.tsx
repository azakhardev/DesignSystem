import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toast } from "./Toast";

const meta = {
  argTypes: {},
  component: Toast,
  parameters: {
    layout: "centered",
  },
  title: "Components/Toast",
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaul: Story = {
  args: {},
};
