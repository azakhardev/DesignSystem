import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";

// Definition of types for extra controls, that are not in the DialogProps
type StoryProps = React.ComponentProps<typeof Dialog> & {
  position?: "center" | "left" | "right" | "top" | "bottom";
};

const meta = {
  title: "Layout/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  subcomponents: { DialogContent, DialogTrigger } as Record<
    string,
    React.ComponentType<unknown>
  >,
  // Creates select box for position
  argTypes: {
    position: {
      control: "select",
      options: ["center", "left", "right", "top", "bottom"],
      description: "Controls the animation and position of the content",
      table: {
        category: "DialogContent Props",
      },
    },
    children: { table: { disable: true } },
    defaultOpen: {
      control: "boolean",
      description:
        "Controls whether the dialog should be opened by default or not",
    },
  },
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Interactive: Story = {
  args: {
    position: "center",
    defaultOpen: false
  },
  render: ({ position, ...args }) => (
    <Dialog {...args}>
      <DialogContent position={position}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Dynamic Position</h2>
          <p>
            Current position:
            <code className="bg-muted p-1 rounded">{position}</code>
          </p>
          <p>Try changing the position in Storybook controls!</p>
        </div>
      </DialogContent>
      <DialogTrigger>Open Dialog</DialogTrigger>
    </Dialog>
  ),
};
