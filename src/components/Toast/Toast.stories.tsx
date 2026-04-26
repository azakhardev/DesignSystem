import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { expect, screen, waitFor, within } from "storybook/test";

import { Button } from "../Button";
import { toast, Toaster } from "./Toast";

/**
 * An imperative toast notification system powered by Framer Motion.
 * ### Architecture
 * The system consists of two parts:
 * 1. **`<Toaster />`**: A singleton wrapper that should be mounted once at the root of your app.
 * 2. **`toast()`**: An imperative function that can be called from anywhere (even outside React, like in API interceptors) to dispatch a notification.
 *
 * ### Features
 * - **Pause on Hover**: Hovering over a toast removes the timer, keeping it on screen until manually closed.
 * - **Queue Limit**: Prevents screen clutter by limiting the maximum number of visible toasts.
 * - **Framer Motion**: Smooth entry/exit animations and a CSS-driven progress bar.
 */
const meta = {
  argTypes: {
    offset: {
      control: "number",
      description: "Specifies offset of the toast from the corners",
    },
    position: {
      control: "select",
      description: "Controls the corner/edge where the toast stack appears.",
      options: [
        "top-right",
        "bottom-right",
        "top-left",
        "bottom-left",
        "top-center",
        "bottom-center",
      ],
    },
    toastsLimit: {
      control: "number",
      description: "Maximum number of toasts visible at the same time.",
    },
  },
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  title: "Feedback/Toast",
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The basic usage of the toast component.
 * Notice how the progress bar accurately reflects the `duration` parameter.
 */
export const Default: Story = {
  args: {
    position: "bottom-right",
  },
  play: async function ({ canvasElement, userEvent }) {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByRole("button", {
      name: /trigger default toast/i,
    });

    await userEvent.click(triggerButton);

    const toastTitle = await screen.findByText(/update available/i);
    const toastDesc = screen.getByText(/a new software version/i);

    await waitFor(() => {
      expect(toastTitle).toBeVisible();
      expect(toastDesc).toBeVisible();
    });

    const toastContainer = screen.getByRole("status");
    expect(toastContainer).toBeInTheDocument();

    const closeButton = within(toastContainer).getByRole("button", {
      name: /close/i,
    });

    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/update available/i)).not.toBeInTheDocument();
    });
  },
  render: (args) => {
    return (
      <div>
        <Button
          onClick={() =>
            toast({
              description: "A new software version is ready to install.",
              duration: 4000,
              icon: <Info size={20} />,
              title: "Update Available",
              variant: "info",
            })
          }
        >
          Trigger default toast
        </Button>
        <Toaster {...args} />
      </div>
    );
  },
};

/**
 * Toasts come in four semantic variants. Each variant automatically applies
 * the correct background, text color, and progress bar accent color. However you can revrite the styles using the styles prop.
 */
export const Variants: Story = {
  args: {
    position: "bottom-right",
  },
  render: (args) => {
    return (
      <div className="flex flex-wrap gap-4">
        <Button
          className="bg-[#0284C7] hover:bg-[#0284C7]/80 text-white"
          onClick={() =>
            toast({
              description: "Your profile has been viewed 12 times today.",
              icon: <Info size={20} />,
              title: "Information",
              variant: "info",
            })
          }
        >
          Info
        </Button>

        <Button
          className="bg-[#16A34A] hover:bg-[#16A34A]/80 text-white"
          onClick={() =>
            toast({
              description: "Your changes have been saved successfully.",
              icon: <CheckCircle size={20} />,
              title: "Success",
              variant: "success",
            })
          }
        >
          Success
        </Button>

        <Button
          className="bg-[#D97706] hover:bg-[#D97706]/80 text-white"
          onClick={() =>
            toast({
              description: "Your subscription is about to expire in 3 days.",
              icon: <AlertTriangle size={20} />,
              title: "Warning",
              variant: "warning",
            })
          }
        >
          Warning
        </Button>

        <Button
          className="bg-[#DC2626] hover:bg-[#DC2626]/80 text-white"
          onClick={() =>
            toast({
              description: "Failed to delete the project. Please try again.",
              icon: <XCircle size={20} />,
              title: "Error",
              variant: "error",
            })
          }
        >
          Error
        </Button>

        <Toaster position="bottom-right" {...args} />
      </div>
    );
  },
};

/**
 * Demonstrate the "Pause on Hover" UX pattern.
 * * If a user hovers over the toast, the progress bar disappears and the timeout
 * is cancelled. The toast becomes persistent until the user explicitly clicks the 'X' button.
 */
export const PauseOnHover: Story = {
  render: (args) => {
    return (
      <div>
        <Button
          onClick={() =>
            toast({
              description:
                "If you hover over me, I will stay on screen forever.",
              duration: 3000,
              icon: <Info size={20} />,
              title: "Hover me quickly!",
              variant: "info",
            })
          }
        >
          Trigger fast toast
        </Button>
        <Toaster position="top-right" {...args} />
      </div>
    );
  },
};

/**
 * The `<Toaster />` component uses the `toastsLimit` prop (default: 5) to prevent
 * the UI from being overwhelmed if many events fire simultaneously.
 * * Click the button below rapidly to see how the list is truncated.
 */
export const ToastLimit: Story = {
  args: {
    position: "bottom-left",
    toastsLimit: 3,
  },
  render: (args) => {
    return (
      <div>
        <Button
          onClick={() => {
            // Firing 5 toasts rapidly, but the limit is set to 3 in the args
            for (let i = 1; i <= 5; i++) {
              setTimeout(() => {
                toast({
                  description: `This is notification ${i} of 5.`,
                  title: `Batch Toast #${i}`,
                  variant: "success",
                });
              }, i * 200);
            }
          }}
        >
          Spawns 5 Toasts (Limit: 3)
        </Button>
        <Toaster {...args} />
      </div>
    );
  },
};
