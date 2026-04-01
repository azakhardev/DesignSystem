import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

const meta = {
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  title: "Components/Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div className="w-[400px] flex items-end justify-start">
        <Tooltip>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent side="top">A content of the tooltip</TooltipContent>
        </Tooltip>
      </div>
    );
  },
};
