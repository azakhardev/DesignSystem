import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/internal/preview-api";

import { Button } from "../Button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "./Dropdown";

const meta = {
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes to apply to the root wrapper element. Useful for overriding layout or spacing.",
    },
    onOpenChange: {
      action: "onOpen triggered",
      control: false,
      description: "Callback fired when the Dropdown is opened/closed.",
    },
    open: {
      control: "boolean",
      description: "Controls if the DropdownMenu is shown or not.",
    },
    triggerAction: {
      control: "radio",
      description:
        "Selects the mode if the dropdown should open on hover on on click",
    },
  },
  component: Dropdown,
  decorators: [
    (Story, context) => {
      return (
        <div className="flex items-center min-h-[250px]">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Components/Dropdown",
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    const [{ open, triggerAction }, updateArgs] = useArgs();

    return (
      <Dropdown
        onOpenChange={(b) => updateArgs({ open: b })}
        open={open}
        triggerAction={triggerAction}
      >
        <DropdownTrigger>Trigger</DropdownTrigger>
        <DropdownMenu position="right-center">
          <DropdownItem onClick={() => alert("hello")}>
            Some item 1
          </DropdownItem>
          <DropdownItem>Some item 2</DropdownItem>
          <DropdownItem>Some item 3</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  },
};
