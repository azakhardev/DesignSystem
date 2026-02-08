import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./Textarea";

/**
 * ### 📝 Textarea Component
 * A multi-line text input field designed for longer content, featuring accessibility support and smooth error animations.
 *
 * #### Features:
 * - **Accessibility**: Automatically handles `aria-invalid` and `aria-describedby` connecting the input with the error message.
 * - **React 19 Ready**: Uses native `ref` prop and `useId` hook for robust identifier generation.
 * - **Motion**: Integrated `framer-motion` for smooth appearance/disappearance of validation messages.
 * - **Styling**: Built with Tailwind CSS, supporting focus states and dark mode tokens.
 */
const meta = {
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables interaction and applies muted styling.",
    },
    errorText: {
      control: "text",
      description: "Error message to display below the field.",
    },
    placeholder: {
      control: "text",
    },
    rows: {
      control: { max: 20, min: 2, type: "number" },
      description: "Default height of the textarea in lines.",
    },
  },
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  title: "Form/Textarea",
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default variant of the Textarea.
 * Ideal for comments, descriptions, or feedback forms.
 */
export const Default: Story = {
  args: {
    className: "w-[400px]",
    placeholder: "Type your message here...",
  },
};

/**
 * Example of the textarea with pre-filled content using `defaultValue`.
 */
export const WithValue: Story = {
  args: {
    ...Default.args,
    defaultValue: "This is a pre-filled description used for editing content.",
  },
};

/**
 * When `errorText` is provided:
 * 1. The border color changes to indicate an error state.
 * 2. An animated error message appears below the input.
 * 3. Screen readers are notified via `aria-invalid` and `aria-describedby`.
 */
export const WithError: Story = {
  args: {
    ...Default.args,
    defaultValue: "Invlid contnt...",
    errorText: "The description contains invalid characters.",
  },
};

/**
 * Prevents user interaction. The component receives reduced opacity and
 * a `not-allowed` cursor to visually indicate its state.
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    defaultValue: "You cannot edit this note.",
    disabled: true,
  },
};

/**
 * You can control the initial height using the standard `rows` attribute
 * or by passing Tailwind utility classes via `className`.
 */
export const LargeArea: Story = {
  args: {
    className: "w-[600px]",
    placeholder: "Write a long essay here...",
    rows: 10,
  },
};
