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
      <div className="w-full flex flex-row gap-10 items-end justify-end">
        <div className="font-bold">ALSO NOT A TOOLTIP</div>
        <Tooltip>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent side="left">
            A content of the tooltip with very very long text for size testing.
          </TooltipContent>
        </Tooltip>
        <div className="font-bold">ALSO NOT A TOOLTIP</div>
        <div className="font-bold">ALSO NOT A TOOLTIP</div>
        <div className="font-bold">ALSO NOT A TOOLTIP</div>
        <div className="font-bold">ALSO NOT A TOOLTIP</div>
      </div>
    );
  },
};
