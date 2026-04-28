import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import {
  Callout,
  CalloutBody,
  CalloutButtonPrimary,
  CalloutButtons,
  CalloutButtonSecondary,
  CalloutTitle,
} from "./Callout";

/**
 * A versatile, compound Callout component for notifications, tips, and alerts.
 * * Powered by a shared React Context, sub-components automatically inherit
 * the theme from the parent `variant`. It supports seamless Dark Mode
 * transitions thanks to its HSL-based CSS variable architecture.
 */
const meta = {
  argTypes: {
    children: {
      control: false,
      description: "Compound components used to build the callout structure.",
    },
    variant: {
      control: "select",
      description:
        "Defines the semantic color palette for the entire component tree.",
      options: ["info", "tip", "success", "warning", "danger"],
      table: {
        defaultValue: { summary: "info" },
      },
    },
  },
  component: Callout,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    CalloutBody,
    CalloutButtonPrimary,
    CalloutButtons,
    CalloutButtonSecondary,
    CalloutTitle,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Feedback/Callout",
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default Callout using the `info` variant. Perfect for neutral,
 * informative messages.
 */
export const Default: Story = {
  args: { variant: "info" },
  render: (args) => (
    <Callout {...args} className="w-[450px]">
      <CalloutTitle>Information Update</CalloutTitle>
      <CalloutBody>
        A new software update is available. Please review the changelog to see
        the latest features and improvements added to your workspace.
      </CalloutBody>
      <CalloutButtons>
        <CalloutButtonPrimary>View Changelog</CalloutButtonPrimary>
        <CalloutButtonSecondary>Dismiss</CalloutButtonSecondary>
      </CalloutButtons>
    </Callout>
  ),
};

/**
 * Showcases all available variants. Each variant automatically adjusts
 * border, background, and text colors based on provided variant.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <Callout variant="info">
        <CalloutTitle>Info Variant</CalloutTitle>
        <CalloutBody>General information for the user.</CalloutBody>
      </Callout>

      <Callout variant="tip">
        <CalloutTitle>Tip Variant</CalloutTitle>
        <CalloutBody>Pro-tip: Use HSL for better color control.</CalloutBody>
      </Callout>

      <Callout variant="success">
        <CalloutTitle>Success Variant</CalloutTitle>
        <CalloutBody>Your changes have been saved successfully.</CalloutBody>
      </Callout>

      <Callout variant="warning">
        <CalloutTitle>Warning Variant</CalloutTitle>
        <CalloutBody>Your subscription is about to expire.</CalloutBody>
      </Callout>

      <Callout variant="danger">
        <CalloutTitle>Danger Variant</CalloutTitle>
        <CalloutBody>Failed to delete the project. Access denied.</CalloutBody>
      </Callout>
    </div>
  ),
};

/**
 * Demonstrates the component without action buttons. This is ideal for
 * inline documentation or static notes.
 */
export const StaticNote: Story = {
  args: { variant: "tip" },
  render: (args) => (
    <Callout {...args} className="max-w-md">
      <CalloutTitle>Did you know?</CalloutTitle>
      <CalloutBody>
        You can customize the layout of this component by wrapping the
        sub-components in standard HTML elements or Tailwind utility classes.
      </CalloutBody>
    </Callout>
  ),
};

/**
 * Highlights the accessibility features. The `CalloutTitle` uses an `h3` tag
 * by default, ensuring a logical heading hierarchy for screen readers.
 */
export const ActionRequired: Story = {
  args: { variant: "warning" },
  render: (args) => (
    <Callout {...args} className="w-[450px]">
      <CalloutTitle>Storage Almost Full</CalloutTitle>
      <CalloutBody>
        You have used <strong>90%</strong> of your allocated storage space.
        Consider cleaning up your old files or upgrading your plan.
      </CalloutBody>
      <CalloutButtons>
        <CalloutButtonPrimary>Upgrade Plan</CalloutButtonPrimary>
      </CalloutButtons>
    </Callout>
  ),
};

/**
 * Because it's built with Tailwind, you can easily override any internal style.
 * Here, we add a custom background and increase the padding.
 */
export const Customized: Story = {
  args: { variant: "danger" },
  render: (args) => (
    <Callout
      {...args}
      className="bg-red-500/10 dark:bg-red-500/20 p-8 border-l-8"
    >
      <CalloutTitle className="text-2xl uppercase tracking-tighter">
        System Critical
      </CalloutTitle>
      <CalloutBody className="text-red-900 dark:text-red-100 font-medium">
        Unrecoverable database error detected. Immediate intervention required.
      </CalloutBody>
      <CalloutButtons>
        <CalloutButtonPrimary className="w-full">
          Initialize Recovery
        </CalloutButtonPrimary>
      </CalloutButtons>
    </Callout>
  ),
};
