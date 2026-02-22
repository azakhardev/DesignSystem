import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select, SelectContent, SelectItem, SelectTrigger } from "./Select";

const meta = {
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes to apply to the root element. Useful for overriding layout or spacing.",
    },
    mode: {
      control: "inline-radio",
      description:
        "Determines the selection behavior. Set to `single` for a mutually exclusive choice, or `multiple` to allow multiple active options.",
      options: ["single", "multiple"],
    },
    name: {
      control: "text",
      description:
        "The name attribute applied to the hidden input element. Required for native form submission and `FormData` extraction.",
    },
    onSelect: {
      action: "onSelect triggered", // Shows the log in action panel in sotrybook
      control: false,
      description:
        "Callback fired when the selection changes. Receives the newly selected value (a string) or an array of strings in `multiple` mode.",
    },
    value: {
      control: "text",
      description:
        "The controlled value of the select. Use this to externally manage the component's state.",
    },
  },
  component: Select,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    SelectContent,
    SelectItem,
    SelectTrigger,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Form/Select",
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "single",
    name: "fruit-selection",
  },
  render: (args) => {
    return (
      <div className="w-64">
        <Select {...args}>
          <SelectTrigger
            placeholder="Select an option..."
            valueFormatter={(v) => <span className="capitalize">{v}</span>}
          />
          <SelectContent>
            <SelectItem value="apple">Apple 🍎</SelectItem>
            <SelectItem value="banana">Banana 🍌</SelectItem>
            <SelectItem value="orange">Orange 🍊</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const Multiple: Story = {
  args: {
    mode: "multiple",
    name: "fruits-selection",
  },
  render: (args) => {
    return (
      <div className="w-64">
        <Select {...args}>
          <SelectTrigger placeholder="Select multiple options..." />
          <SelectContent>
            <SelectItem value="apple">Apple 🍎</SelectItem>
            <SelectItem value="banana">Banana 🍌</SelectItem>
            <SelectItem value="orange">Orange 🍊</SelectItem>
            <SelectItem value="melon">Melon 🍉</SelectItem>
            <SelectItem value="cherry">Cherry 🍒</SelectItem>
            <SelectItem value="kiwi">Kiwi 🥝</SelectItem>
            <SelectItem value="pear">Pear 🍐</SelectItem>
            <SelectItem value="lemon">Lemon 🍋</SelectItem>
            <SelectItem value="peach">Peach 🍑</SelectItem>
            <SelectItem value="mango">Mango 🥭</SelectItem>
            <SelectItem value="strawberry">Strawberry 🍓</SelectItem>
            <SelectItem value="eggplant">Eggplant🍆</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};
