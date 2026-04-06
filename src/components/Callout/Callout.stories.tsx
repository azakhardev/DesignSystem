import type { Meta, StoryObj } from "@storybook/react-vite";

import { Callout } from "./Callout";

const meta = {
  argTypes: {},
  component: Callout,
  parameters: {
    layout: "centered",
  },
  title: "Components/Callout",
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Callout></Callout>,
};
