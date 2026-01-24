import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertTitle, AlertMessage } from "./Alert";
import { Terminal } from "lucide-react";

/**
 * A distinctive alert component with **absolute positioning** for icons.
 *
 * * **Design Note:** The icon is positioned absolutely in the top-right corner (`absolute top-2 right-2`).
 * * **Layout Handling:** If your content is long and overlaps with the icon, simply add right padding (e.g., `pr-10`) to the container or the title.
 * * **Composition:** Build the content using `AlertTitle` and `AlertMessage` subcomponents.
 */
const meta = {
  title: "Components/Alert",
  component: Alert,
  subcomponents: { AlertTitle, AlertMessage } as Record<
    string,
    React.ComponentType<unknown>
  >,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "error", "success", "noData"],
      description: "Visual style of the alert.",
      table: { defaultValue: { summary: "warning" } },
    },
    children: {
      control: false,
    },
    showIcon: {
      control: "boolean",
      description:
        "If true, displays the default icon for the selected variant in the top-right corner.",
    },
    icon: {
      control: false,
      description:
        "Overrides the default icon. Implicitly enables icon display when provided.",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default `warning` state. Simple and effective for general caution messages.
 */
export const Default: Story = {
  args: {
    variant: "warning",
    children: (
      <>
        <AlertTitle>Warning</AlertTitle>
        <AlertMessage>
          Your session is about to expire. Please save your work.
        </AlertMessage>
      </>
    ),
  },
};

/**
 * Enable `showIcon` to display the variant-specific icon in the top-right corner.
 */
export const WithIcon: Story = {
  args: {
    variant: "info",
    showIcon: true,
    children: (
      <>
        <AlertTitle>New Feature</AlertTitle>
        <AlertMessage>
          We have updated the dashboard with new metrics.
        </AlertMessage>
      </>
    ),
  },
};

/**
 * Use the `error` variant for critical issues.
 */
export const Error: Story = {
  args: {
    variant: "error",
    showIcon: true,
    children: (
      <>
        <AlertTitle>Critical Error</AlertTitle>
        <AlertMessage>
          Failed to connect to the database. Retrying in 5s...
        </AlertMessage>
      </>
    ),
  },
};

/**
 * Use the `success` variant for positive confirmation.
 */
export const Success: Story = {
  args: {
    variant: "success",
    showIcon: true,
    children: (
      <>
        <AlertTitle>Order Confirmed</AlertTitle>
        <AlertMessage>
          Your package has been dispatched successfully.
        </AlertMessage>
      </>
    ),
  },
};

/**
 * You can override the default icon by passing a React Node to the `icon` prop.
 */
export const CustomIcon: Story = {
  args: {
    variant: "noData",
    icon: <Terminal className="size-5" />,
    children: (
      <>
        <AlertTitle>System Log</AlertTitle>
        <AlertMessage>
          No recent activity found in the terminal logs.
        </AlertMessage>
      </>
    ),
  },
};

/**
 * Because the icon is positioned absolutely, it might overlap with long text.
 * **Solution:** Add a utility class like `pr-10` (padding-right) to the `Alert` component or the `AlertTitle` to make space.
 */
export const HandlingLongText: Story = {
  args: {
    variant: "info",
    showIcon: true,
    className: "pr-12",
    children: (
      <>
        <AlertMessage>
          A new version of the application is available. This update includes
          significant performance improvements and bug fixes. The icon here does
          not overlap because we added `pr-12`.
        </AlertMessage>
      </>
    ),
  },
};
