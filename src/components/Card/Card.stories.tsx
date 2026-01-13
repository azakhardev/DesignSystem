import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Welcome!",

    children:
      "This is a test Card. If you can see the shadows and rounded corners, Tailwind works correctly.",

    className: "",
  },
};

export const WithCustomContent: Story = {
  args: {
    title: "Interactive Card",
    children: (
      <div className="space-y-2">
        <p>You can insert HTML here</p>
        <button className="px-3 py-1 bg-primary text-on-primary rounded hover:bg-primary-focus transition-colors">
          Click me
        </button>
      </div>
    ),
  },
};
