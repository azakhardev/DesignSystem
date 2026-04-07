import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Callout,
  CalloutBody,
  CalloutButtonPrimary,
  CalloutButtons,
  CalloutButtonSecondary,
  CalloutTitle,
} from "./Callout";

const meta = {
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "tip", "success", "warning", "danger"],
    },
  },
  component: Callout,
  parameters: {
    layout: "centered",
  },
  title: "Components/Callout",
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "info" },
  render: (args) => (
    <Callout {...args}>
      <CalloutTitle>Callout Title</CalloutTitle>
      <CalloutBody>
        Body of the Callout component for description or notification or
        whatever
      </CalloutBody>
      <CalloutButtons>
        <CalloutButtonPrimary>Primary</CalloutButtonPrimary>
        <CalloutButtonSecondary>Secondary</CalloutButtonSecondary>
      </CalloutButtons>
    </Callout>
  ),
};
