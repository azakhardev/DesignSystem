import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitForElementToBeRemoved } from "storybook/test";

import { Button } from "../Button";
import {
  Dialog,
  DialogBody,
  DialogButtons,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./Dialog";

// Definition of types for extra controls that are not in the DialogProps
type StoryProps = React.ComponentProps<typeof Dialog> & {
  position?: "center" | "left" | "right" | "top" | "bottom";
  showCloseButton?: boolean;
};

/**
 * A highly flexible **Dialog (Modal)** component built using the **Compound Component** pattern.
 *
 * It utilizes **Framer Motion** for smooth entrance/exit animations and **React Portal** to ensure proper rendering context.
 *
 * ### Key Features:
 * - 🧩 **Compound Architecture**: Compose your dialog using `DialogHeader`, `DialogBody`, `DialogFooter`, etc.
 * - 📍 **Positioning**: Supports center modal, side drawers (left/right), and sheets (top/bottom).
 * - ♿ **Accessible**: Manages focus and utilizes semantic HTML.
 * - 📱 **Responsive**: `DialogBody` handles scrolling automatically while keeping buttons sticky.
 */
const meta = {
  argTypes: {
    children: { table: { disable: true } },
    defaultOpen: {
      control: "boolean",
      description: "Initial state of the dialog",
      table: { category: "Dialog Props" },
    },
    position: {
      control: "select",
      description: "Controls the animation and position of the content",
      options: ["center", "left", "right", "top", "bottom"],
      table: { category: "DialogContent Props" },
    },
    showCloseButton: {
      control: "boolean",
      description: "Show or hide the X close button",
      table: { category: "DialogContent Props" },
    },
  },
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    DialogBody,
    DialogButtons,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
  } as Record<string, React.ComponentType<unknown>>,

  title: "Layout/Dialog",
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

/**
 * Use the controls below to test different **positions** and **animations**.
 *
 * This story demonstrates the dynamic nature of the component. Changing the `position` prop
 * will instantly switch between a standard modal, a sidebar drawer, or a notification sheet.
 */
export const Default: Story = {
  args: {
    defaultOpen: false,
    position: "center",
    showCloseButton: true,
  },
  play: async function ({ canvas, userEvent }) {
    const button = canvas.getByRole("button", { name: /open center/i });

    await userEvent.click(button);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  },
  render: ({ position, showCloseButton, ...args }) => (
    <Dialog {...args}>
      <DialogContent
        className="md:w-2/3 md:h-3/4"
        closeButton={showCloseButton}
        position={position}
      >
        <DialogHeader
          subtitle="Change controls to see magic"
          title="Dynamic Dialog"
        />

        <DialogBody className="h-28">
          <div className="flex flex-col gap-4 text-text">
            <div className="p-4 bg-primary/10 rounded-md border border-primary/20">
              <h4 className="font-semibold text-primary mb-1">
                Current Configuration:
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>
                  Position: <b>{position}</b>
                </li>
                <li>
                  Close Button: <b>{showCloseButton ? "Yes" : "No"}</b>
                </li>
              </ul>
            </div>
            <p>
              This dialog uses the <code>DialogBody</code> component which
              automatically handles scrolling if the content gets too long.
            </p>
          </div>
        </DialogBody>

        <DialogFooter text="Changes are saved locally in your browser." />

        <DialogButtons>
          <Button variant="ghost">Cancel</Button>
          <Button variant="confirm">Confirm Action</Button>
        </DialogButtons>
      </DialogContent>

      <DialogTrigger>Open {position} Dialog</DialogTrigger>
    </Dialog>
  ),
};

/**
 * This example demonstrates the layout stability when content exceeds the viewport height.
 *
 * - **`DialogBody`**: Automatically applies `flex-1` and `overflow-y-auto` to handle the scrolling area.
 * - **`DialogButtons`**: Uses `mt-auto` to remain stuck to the bottom of the container, ensuring actions are always visible.
 */
export const ScrollableContent: Story = {
  args: {
    defaultOpen: false,
    position: "right",
    showCloseButton: true,
  },
  render: ({ position, showCloseButton, ...args }) => (
    <Dialog {...args}>
      <DialogContent closeButton={showCloseButton} position={position}>
        <DialogHeader
          subtitle="Please read carefully"
          title="Terms and Conditions"
        />

        <DialogBody>
          <div className="space-y-4 text-text-secondary">
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            ))}
          </div>
        </DialogBody>

        <DialogButtons className="bg-surface pt-4 border-t border-border">
          <Button className="w-full sm:w-auto" variant="danger">
            Decline
          </Button>
          <Button className="w-full sm:w-auto" variant="confirm">
            Accept Terms
          </Button>
        </DialogButtons>
      </DialogContent>
      <DialogTrigger>Read Terms</DialogTrigger>
    </Dialog>
  ),
};

/**
 * A common use case demonstrating a form layout within a standard centered modal.
 * Shows how to compose `Header`, `Body`, and `Buttons` to create a clean UI.
 */
export const EditProfile: Story = {
  render: () => (
    <Dialog>
      <DialogContent className="sm:max-w-[500px] w-[1500px]">
        <DialogHeader
          subtitle="Update your personal details"
          title="Edit Profile"
        />

        <DialogBody>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="col-span-3 p-2 border rounded-md bg-transparent"
                defaultValue="Artem Zakharchenko"
                id="name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="text-right text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="col-span-3 p-2 border rounded-md bg-transparent"
                defaultValue="@azakhardev"
                id="username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="text-right text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="col-span-3 p-2 border rounded-md bg-transparent"
                defaultValue="@azakhardev"
                id="username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="text-right text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="col-span-3 p-2 border rounded-md bg-transparent"
                defaultValue="@azakhardev"
                id="username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="text-right text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="col-span-3 p-2 border rounded-md bg-transparent"
                defaultValue="@azakhardev"
                id="username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                className="text-right text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="col-span-3 p-2 border rounded-md bg-transparent"
                defaultValue="@azakhardev"
                id="username"
              />
            </div>
          </div>
        </DialogBody>

        <DialogButtons>
          <Button variant="ghost">Cancel</Button>
          <Button variant="confirm">Save Changes</Button>
        </DialogButtons>
      </DialogContent>
      <DialogTrigger variant="secondary">Edit Profile</DialogTrigger>
    </Dialog>
  ),
};
