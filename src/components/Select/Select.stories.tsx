import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";

import { Label } from "../Label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./Select";

/**
 * A highly customizable, accessible, and native-form-ready Select component built using the **Compound Components** pattern.
 ### Key Features
 * - **Accessibility First:** Full keyboard navigation (Up/Down arrows, Enter/Space to select, Escape to close) and proper ARIA roles (`listbox`, `option`).
 * - **Form Ready:** Seamlessly integrates with native HTML forms, `FormData`, and libraries like React Hook Form via an underlying hidden input element.
 * - **Two Modes:** Supports both `single` and `multiple` selection logic out of the box.
 * - **Highly Composable:** Gives you full control over the rendering and styling of the trigger, the dropdown content, and individual items.
 * - **Custom Formatting:** Use the `valueFormatter` prop on the `SelectTrigger` to customize how raw selected values are displayed to the user.
 */
const meta = {
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes to apply to the root wrapper element. Useful for overriding layout or spacing.",
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
      action: "onSelect triggered", // Shows the log in the Action panel in Storybook
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

/**
 * The default `single` selection mode.
 * * This example also demonstrates the use of the `valueFormatter` prop on the `SelectTrigger` to dynamically format the raw value (e.g., capitalizing the fruit name) while keeping the underlying value plain.
 */
export const Default: Story = {
  args: {
    mode: "single",
    name: "fruit-selection",
  },
  play: async function ({ canvas, userEvent }) {
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);

    expect(canvas.getByRole("listbox")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("option", { name: /Apple/i }));

    expect(trigger).toHaveTextContent(/Apple/i);
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

/**
 * The `multiple` selection mode.
 * * Allows selecting more than one option. The trigger will automatically concatenate the formatted values. This example also highlights how `SelectContent` handles overflow with a scrollbar when there are many items present.
 */
export const Multiple: Story = {
  args: {
    mode: "multiple",
    name: "fruits-selection",
  },
  play: async function ({ canvas, userEvent }) {
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);

    const content = canvas.getByRole("listbox");

    expect(content).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("option", { name: /Apple/i }));

    await userEvent.click(canvas.getByRole("option", { name: /Banana/i }));

    expect(trigger).toHaveTextContent(/Apple, Banana/i);

    await userEvent.keyboard("${ArrowDown}");
    await userEvent.keyboard("${Enter}");
    await userEvent.keyboard("${ArrowUp}");
    await userEvent.keyboard("${Enter}");

    expect(trigger).toHaveTextContent(/Apple, Orange/i);

    await userEvent.keyboard("{Escape}");

    expect(content).not.toBeInTheDocument();
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
            <SelectItem value="eggplant">Eggplant 🍆</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

/**
 * Demonstrates how the `Select` component integrates with native HTML forms.
 * * Because it renders a hidden input element under the hood, you can extract its value using standard `FormData` without needing complex state management.
 */
export const NativeForm: Story = {
  render: () => {
    return (
      <form
        className="w-64 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const data = {
            multipleTags: formData.getAll("multiple-tags"),
            singleCountry: formData.get("single-country"),
          };

          alert(`Form submitted with data: \n${JSON.stringify(data, null, 2)}`);
        }}
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium text-text-main">
            Single Selection
          </Label>
          <Select mode="single" name="single-country">
            <SelectTrigger placeholder="Select country..." />
            <SelectContent>
              <SelectItem value="cz">Czech Republic</SelectItem>
              <SelectItem value="sk">Slovakia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-text-main">
            Multiple Selection
          </Label>
          <Select mode="multiple" name="multiple-tags">
            <SelectTrigger placeholder="Select tags..." />
            <SelectContent>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          className="w-full rounded bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary-focus"
          type="submit"
        >
          Submit Form
        </button>
      </form>
    );
  },
};

/**
 * An example of using the `Select` as a controlled component.
 * * The state is managed externally by the parent component, allowing you to programmatically change or clear the selection (e.g., using a "Clear" button).
 */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | string[]>("");

    return (
      <div className="w-64 space-y-4">
        <Select onSelect={setSelected} value={selected}>
          <SelectTrigger placeholder="Choose a framework..." />
          <SelectContent>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue.js</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-sm text-text-secondary">
          Current external state:{" "}
          <span className="font-mono font-bold text-primary">
            {selected || "empty"}
          </span>
        </div>

        <button
          className="text-sm font-medium text-error hover:underline"
          onClick={() => setSelected("")}
          type="button"
        >
          Clear selection
        </button>
      </div>
    );
  },
};

/**
 * Demonstrates the power of the `valueFormatter` prop.
 * * You are not limited to text; you can return any React Node. Here, we render customized badges for the selected items in `multiple` mode.
 */
export const RichFormatting: Story = {
  render: () => {
    return (
      <div className="w-80">
        <Select mode="multiple" name="tags">
          <SelectTrigger
            placeholder="Select tags..."
            valueFormatter={(val) => (
              <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                #{val}
              </span>
            )}
          />
          <SelectContent>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
            <SelectItem value="design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};
