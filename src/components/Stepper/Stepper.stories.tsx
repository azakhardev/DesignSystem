import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stepper, StepperItem } from "./Stepper";

/**
 * A highly flexible **Stepper** for guiding users through multi-step forms or workflows.
 *
 * ### Key Features
 * - **Fractional Progress**: Pass decimals to `currentStep` (e.g., `2.5`) to visually represent an in-progress transition between steps.
 * - **Orientation Agnostic**: Easily switch between `horizontal` and `vertical` layouts. Tracks render at the item-level to prevent alignment bugs with variable text heights.
 * - **Cascading Themes**: Pass the `trackStyles` object to perfectly reskin the lines, borders, and text of the entire component simultaneously.
 */
const meta = {
  argTypes: {
    currentStep: {
      control: { max: 4, min: 1, step: 0.1, type: "number" },
      description:
        "The current active step. Supports fractions for partial line fills.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
  component: Stepper,
  parameters: { layout: "padded" },
  subcomponents: { StepperItem } as Record<
    string,
    React.ComponentType<unknown>
  >,
  title: "Navigation/Stepper",
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default layout of the Stepper
 */
export const Horizontal: Story = {
  args: {
    currentStep: 2.5,
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-2xl py-12">
      <Stepper {...args}>
        <StepperItem label="Login" step={1} />
        <StepperItem label="Choose Interest" step={2} />
        <StepperItem label="Add Friends" step={3} />
      </Stepper>
    </div>
  ),
};

/**
 * Vertical layou for sidebar progress or mobile layouts
 */
export const Vertical: Story = {
  args: {
    currentStep: 2,
    orientation: "vertical",
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-sm py-12">
      <Stepper {...args}>
        <StepperItem
          description="Setup your basic profile details"
          label="Account"
          step={1}
        />
        <StepperItem
          description="Link your banking institution"
          label="Banking"
          step={2}
        />
        <StepperItem
          description="Awaiting identity verification"
          label="Verification"
          step={3}
        />
        <StepperItem description="Finalize setup" label="Complete" step={4} />
      </Stepper>
    </div>
  ),
};

/**
 * By defining `trackStyles`, the colors instantly cascade through context to correctly style both the connecting lines and the component borders. You can use arbitrary hex codes or CSS variables.
 */
export const CustomColors: Story = {
  args: {
    currentStep: 2,
    orientation: "horizontal",
    trackStyles: {
      activeColor: "#10b981",
      inactiveColor: "#d1fae5",
    },
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-2xl py-12">
      <Stepper {...args}>
        <StepperItem label="Ordered" step={1} />
        <StepperItem label="Shipped" step={2} />
        <StepperItem label="Delivered" step={3} />
      </Stepper>
    </div>
  ),
};

/**
 * Use the `status` prop on a specific `StepperItem` to flag errors or completely disable inaccessible future steps.
 */
export const WithErrorAndDisabledStates: Story = {
  args: {
    currentStep: 2,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-2xl py-12">
      <Stepper {...args}>
        <StepperItem label="Details" step={1} />
        <StepperItem
          description="Payment failed"
          label="Payment"
          status="error"
          step={2}
        />
        <StepperItem label="Confirm" status="disabled" step={3} />
      </Stepper>
    </div>
  ),
};
