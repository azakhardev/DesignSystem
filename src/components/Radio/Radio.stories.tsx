import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/internal/preview-api";

//import { expect, fn, screen, userEvent, waitFor } from "storybook/test";
import { RadioButton, RadioGroup } from "./Radio";

/**
 * ### 📻 Radio Group Component
 *
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 *
 * #### Features
 * - **Accessible**: Uses native HTML inputs visually hidden for full keyboard and screen reader support.
 * - **Controlled**: Designed to be controlled via `value` and `onValueChange` props.
 * - **Scalable**: Supports disabled states for the entire group or individual items.
 */
const meta = {
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables all radio buttons in the group.",
    },
    name: {
      control: "text",
      description:
        "The name of the group, used for form submission and grouping inputs.",
    },
    onValueChange: {
      action: "changed",
      description: "Event handler called when the value changes.",
    },
    value: {
      control: "text",
      description: "The currently selected value (controlled state).",
    },
  },
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  title: "Form/Radio",
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Interactive example demonstrating how to wire up the state using `onValueChange`.
 * Try clicking the options to see the value update.
 */
export const Default: Story = {
  args: {
    name: "experience-level",
    onValueChange: () => {},
    value: "jun",
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <RadioGroup
        {...args}
        onValueChange={(val) => {
          args.onValueChange(val);
          updateArgs({ value: val });
        }}
        value={value}
      >
        <RadioButton label="Trainee" value="trn" />
        <RadioButton label="Junior" value="jun" />
        <RadioButton label="Medior" value="mid" />
        <RadioButton label="Senior" value="sen" />
      </RadioGroup>
    );
  },
};

/**
 * You can disable the entire group by passing the `disabled` prop to the `RadioGroup` wrapper.
 */
export const GroupDisabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: Default.render,
};

/**
 * Specific items can be disabled independently of the group state.
 * Notice how "Enterprise" cannot be selected.
 */
export const ItemDisabled: Story = {
  args: {
    ...Default.args,
    value: "pro",
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <RadioGroup
        {...args}
        onValueChange={(val) => updateArgs({ value: val })}
        value={value}
      >
        <RadioButton label="Hobby (Free)" value="free" />
        <RadioButton label="Pro ($20/mo)" value="pro" />
        <RadioButton disabled label="Enterprise (Custom)" value="ent" />
      </RadioGroup>
    );
  },
};

// /**
//  * **🧪 Interaction Test: Form Submission**
//  *
//  * This story simulates a real browser form submission.
//  * It verifies that the `RadioGroup` correctly passes the selected `value`
//  * through the native `FormData` API.
//  *
//  * **Test Scenario:**
//  * 1. Renders a native `<form>`.
//  * 2. User clicks on "Option B".
//  * 3. User clicks "Submit".
//  * 4. Test checks if the form data contains `{ "test-radio": "b" }`.
//  */
// export const FormSubmissionTest: Story = {
//   args: {
//     name: "test-radio",
//     onValueChange: fn(),
//     value: "a",
//   },
//   play: async ({ args, step }) => {
//     await step("User selects 'Option B'", async () => {
//       const optionB = await screen.findByTestId("optionB");
//       await userEvent.click(optionB);

//       const optionBInput = screen.getByLabelText("Option B");

//       await waitFor(() => {
//         expect(optionBInput).toBeChecked();
//       });
//     });

//     await step("User submits the form", async () => {
//       const submitBtn = await screen.findByRole("button", { name: /submit/i });
//       await userEvent.click(submitBtn);
//     });

//     await step("Verify form data", async () => {
//       await waitFor(() =>
//         expect(args.onValueChange).toHaveBeenCalledWith(
//           expect.stringContaining('"test-radio":"b"'),
//         ),
//       );
//     });
//   },
//   render: (args) => {
//     const [value, setValue] = useState("a");

//     return (
//       <form
//         className="flex flex-col gap-4 p-4 border border-dashed rounded-md"
//         onSubmit={(e) => {
//           e.preventDefault();
//           const formData = new FormData(e.currentTarget);
//           const data = Object.fromEntries(formData);

//           args.onValueChange(JSON.stringify(data));
//         }}
//       >
//         <p className="text-sm text-text-secondary font-mono">Form Context</p>
//         <RadioGroup
//           {...args}
//           onValueChange={(val) => setValue(val)}
//           value={value}
//         >
//           <RadioButton label="Option A" value="a" />
//           <RadioButton data-testid="optionB" label="Option B" value="b" />
//           <RadioButton label="Option C" value="c" />
//         </RadioGroup>

//         <button
//           className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-md text-sm hover:opacity-80 transition-all"
//           type="submit"
//         >
//           Submit Form
//         </button>
//       </form>
//     );
//   },
// };
