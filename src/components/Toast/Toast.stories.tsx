import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info } from "lucide-react";

import { Button } from "../Button";
import { toast, Toaster } from "./Toast";

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
    return (
      <div>
        <Button
          onClick={() =>
            toast({
              closable: true,
              description: "Demonstration of the toaster component",
              duration: 2500,
              icon: <Info />,
              title: "Toast DEMO",
              variant: "info",
            })
          }
        >
          Trigger toast
        </Button>
        <Toaster position="bottom-right" />
      </div>
    );
  },
};
