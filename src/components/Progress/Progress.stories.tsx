import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Progress,
  ProgressBar,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
} from "./Progress";

const meta = {
  component: Progress,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    ProgressBar,
    ProgressIndicator,
    ProgressLabel,
    ProgressValue,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Components/Progress",
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Progress className="w-[550px]" value={70}>
        <ProgressLabel>Label</ProgressLabel>
        <ProgressBar>
          <ProgressIndicator />
        </ProgressBar>
        <ProgressValue autofill format="percents">
          20/100
        </ProgressValue>
      </Progress>
    );
  },
};
