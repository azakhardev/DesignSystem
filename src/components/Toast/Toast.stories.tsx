import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toaster, toast, ToastItem } from "./Toast";
import { Button } from "../Button";

const meta = {
  argTypes: {},
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  title: "Components/Toast",
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaul: Story = {
  args: {},
  render: () => {

    return <div>
      <Button onClick={() => toast({ title: "Toast DEMO", description: "Demonstration of the toaster component", variant: "info", closable: true })}>Trigger toast</Button>
      <Toaster position="top-right" />
    </div>
  }
};
