import type { Meta, StoryObj } from "@storybook/react-vite";

import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  argTypes: {},
  component: Popover,
  parameters: {
    layout: "centered",
  },
  subcomponents: { PopoverContent, PopoverTrigger } as Record<
    string,
    React.ComponentType<unknown>
  >,
  title: "Components/Popover",
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Popover closeDelayDuration={500} delayDuration={200}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent className="w-[250px]" position="bottom">
          <h3 className="font-bold text-xl">Title</h3>
          <div>Content of the box</div>
          <div className="flex flex-row justify-end items-center">
            <button>Submit</button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
