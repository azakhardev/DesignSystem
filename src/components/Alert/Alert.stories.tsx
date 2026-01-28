import type { Meta, StoryObj } from "@storybook/react-vite";
import { Terminal } from "lucide-react";

import { Alert, AlertMessage,AlertTitle } from "./Alert";

/**
 * A distinctive alert component with **absolute positioning** for icons.
 *
 * * **Design Note:** The icon is positioned absolutely in the top-right corner (`absolute top-2 right-2`).
 * * **Layout Handling:** If your content is long and overlaps with the icon, simply add right padding (e.g., `pr-10`) to the container or the title.
 * * **Composition:** Build the content using `AlertTitle` and `AlertMessage` subcomponents.
 */
const meta = {
  argTypes: {
    children: {
      control: false,
    },
    icon: {
      control: false,
      description:
        "Overrides the default icon. Implicitly enables icon display when provided.",
    },
    showIcon: {
      control: "boolean",
      description:
        "If true, displays the default icon for the selected variant in the top-right corner.",
    },
    variant: {
      control: "select",
      description: "Visual style of the alert.",
      options: ["info", "warning", "error", "success", "noData"],
      table: { defaultValue: { summary: "warning" } },
    },
  },
  component: Alert,
  parameters: {
    layout: "centered",
  },
  subcomponents: { AlertMessage, AlertTitle } as Record<
    string,
    React.ComponentType<unknown>
  >,
  title: "Components/Alert",
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default `warning` state. Simple and effective for general caution messages.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Warning</AlertTitle>
        <AlertMessage>
          Your session is about to expire. Please save your work.
        </AlertMessage>
      </>
    ),
    variant: "warning",
  },
};

/**
 * Enable `showIcon` to display the variant-specific icon in the top-right corner.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <AlertTitle>New Feature</AlertTitle>
        <AlertMessage>
          We have updated the dashboard with new metrics.
        </AlertMessage>
      </>
    ),
    showIcon: true,
    variant: "info",
  },
};

/**
 * Use the `error` variant for critical issues.
 */
export const Error: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Critical Error</AlertTitle>
        <AlertMessage>
          Failed to connect to the database. Retrying in 5s...
        </AlertMessage>
      </>
    ),
    showIcon: true,
    variant: "error",
  },
};

/**
 * Use the `success` variant for positive confirmation.
 */
export const Success: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Order Confirmed</AlertTitle>
        <AlertMessage>
          Your package has been dispatched successfully.
        </AlertMessage>
      </>
    ),
    showIcon: true,
    variant: "success",
  },
};

/**
 * You can override the default icon by passing a React Node to the `icon` prop.
 */
export const CustomIcon: Story = {
  args: {
    children: (
      <>
        <AlertTitle>System Log</AlertTitle>
        <AlertMessage>
          No recent activity found in the terminal logs.
        </AlertMessage>
      </>
    ),
    icon: <Terminal className="size-5" />,
    variant: "noData",
  },
};

/**
 * Because the icon is positioned absolutely, it might overlap with long text.
 * **Solution:** Add a utility class like `pr-10` (padding-right) to the `Alert` component or the `AlertTitle` to make space.
 */
export const HandlingLongText: Story = {
  args: {
    children: (
      <>
        <AlertMessage>
          A new version of the application is available. This update includes
          significant performance improvements and bug fixes. The icon here does
          not overlap because we added `pr-12`.
        </AlertMessage>
      </>
    ),
    className: "pr-12",
    showIcon: true,
    variant: "info",
  },
};
