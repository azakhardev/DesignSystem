import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { useArgs } from "storybook/internal/preview-api";
import { expect, screen, spyOn, waitFor } from "storybook/test";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "./Dropdown";

/**
 * A customizable, accessible dropdown component menu built with React and Tailwind CSS. Supports various trigger actions, positioning, and item variants.
 * ### Key Features
 * - **Accessibility First:** Proper ARIA roles assigned dynamically based on item variants (`menuitem`, `menuitemcheckbox`, `menuitemradio`) and focus management.
 * - **Smart Positioning:** Uses CVA to position the menu around the trigger (12 possible alignments) with correct `transform-origin` for smooth animations.
 * - **Framer Motion Integration:** Smooth `scale` and `opacity` transitions when opening and closing the menu.
 * - **Versatile Items:** Items can act as buttons, checkboxes, radio options, or even HTML links via the `as` prop.
 * - **Hover Gap Protection:** Built-in `setTimeout` logic to prevent the menu from abruptly closing when the user's cursor leaves the trigger to enter the menu.
 */
const meta = {
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes to apply to the root wrapper element. Useful for overriding layout or spacing.",
    },
    onOpenChange: {
      action: "onOpenChange triggered",
      control: false,
      description: "Callback fired when the Dropdown is opened or closed.",
    },
    open: {
      control: "boolean",
      description:
        "Controls whether the DropdownMenu is visible. Use this for a controlled component.",
    },
    triggerAction: {
      control: "radio",
      defaultValue: "click",
      description: "Determines whether the menu opens on click or on hover.",
      options: ["click", "hover"],
    },
  },
  component: Dropdown,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-[250px] min-w-[250px] w-full">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Components/Dropdown",
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default behavior of the Dropdown menu.
 * * It opens on click and demonstrates a basic list of interactive actions. The state is managed via Storybook's `useArgs`.
 */
export const Default: Story = {
  args: {
    triggerAction: "click",
  },
  play: async function ({ canvas, userEvent }) {
    expect(canvas.queryByRole("menu")).not.toBeInTheDocument();
    const trigger = canvas.getByRole("button", { name: "Open Menu" });

    await userEvent.click(trigger);
    expect(await screen.findByRole("menu")).toBeInTheDocument();

    const buttons = screen.getAllByRole("menuitem");

    expect(buttons.length).toBeGreaterThan(0);

    const alertMock = spyOn(window, "alert").mockImplementation(() => {});

    await userEvent.click(buttons[0]);

    expect(alertMock).toHaveBeenCalledWith("Profile clicked!");
    expect(alertMock).toHaveBeenCalledTimes(1);

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    expect(alertMock).toHaveBeenCalledWith("Settings clicked!");
    expect(alertMock).toHaveBeenCalledTimes(2);

    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{Escape}");

    alertMock.mockRestore();
  },
  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs();

    return (
      <Dropdown
        {...args}
        onOpenChange={(b) => updateArgs({ open: b })}
        open={open}
      >
        <DropdownTrigger>Open Menu</DropdownTrigger>
        <DropdownMenu position="bottom-start">
          <DropdownItem onClick={() => alert("Profile clicked!")}>
            Profile
          </DropdownItem>
          <DropdownItem onClick={() => alert("Settings clicked!")}>
            Settings
          </DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  },
};

/**
 * Demonstrates the `hover` trigger action.
 * * The dropdown menu opens automatically when the user's cursor enters the trigger element and closes after a short delay (Hover Gap Protection) when it leaves.
 */
export const HoverTrigger: Story = {
  args: {
    triggerAction: "hover",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The dropdown menu opens automatically when hovering over the trigger.",
      },
    },
  },
  play: async function ({ canvas, userEvent }) {
    expect(canvas.queryByRole("menu")).not.toBeInTheDocument();
    const trigger = canvas.getByRole("button", { name: "Hover me" });

    await userEvent.hover(trigger);
    expect(await screen.findByRole("menu")).toBeInTheDocument();

    const div = canvas.getByTestId("hidden-div");
    await userEvent.hover(div);

    await waitFor(
      () => {
        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
      },
      { timeout: 500 },
    );
  },
  render: (args) => (
    <div className="flex flex-col">
      <Dropdown {...args}>
        <DropdownTrigger>Hover me</DropdownTrigger>
        <DropdownMenu position="bottom-center">
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="w-full h-1" data-testid="hidden-div"></div>
    </div>
  ),
};

/**
 * Shows how the dropdown menu can be positioned relative to its trigger using the `position` prop.
 * * Supports various alignments like `top-center`, `bottom-end`, `left-start`, etc. The animation origin automatically adjusts based on this prop.
 */
export const Placement: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The DropdownMenu accepts a `position` prop to align itself around the trigger.",
      },
    },
  },
  render: () => (
    <Dropdown>
      <DropdownTrigger>Position: Top Center</DropdownTrigger>
      <DropdownMenu position="top-center">
        <DropdownItem>I am above!</DropdownItem>
        <DropdownItem>Another item</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

/**
 * Demonstrates the versatility of the `DropdownItem` component.
 * * Includes custom icons from Lucide React, disabled states, visual dividers, HTML link rendering via the `as` prop, and custom text styling (e.g., error/danger state).
 */
export const WithIconsAndStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown items can display custom icons, handle disabled states, or act as external links.",
      },
    },
  },
  render: () => (
    <Dropdown>
      <DropdownTrigger>User Actions</DropdownTrigger>
      <DropdownMenu className="w-48" position="bottom-end">
        <DropdownItem icon={<UserIcon className="w-4 h-4" />} showIcon>
          My Profile
        </DropdownItem>
        <DropdownItem icon={<SettingsIcon className="w-4 h-4" />} showIcon>
          Settings
        </DropdownItem>
        <DropdownItem
          disabled
          icon={<CreditCardIcon className="w-4 h-4" />}
          showIcon
        >
          Billing (Disabled)
        </DropdownItem>

        <div className="h-px w-full bg-border my-1" />

        <DropdownItem
          as="a"
          href="https://google.com"
          showIcon
          target="_blank"
          variant="link"
        >
          Documentation
        </DropdownItem>

        <DropdownItem
          className="text-error hover:bg-error-surface"
          icon={<LogOutIcon className="w-4 h-4" />}
          showIcon
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
};

/**
 * Using the `checkbox` variant allows for multiple selections within the menu.
 * * The checkmark icon is handled automatically based on the `active` boolean prop. The role is automatically set to `menuitemcheckbox`.
 */
export const CheckboxSelection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Using the `checkbox` variant allows for multiple selections. The icon is handled automatically based on the `active` prop.",
      },
    },
  },
  render: function Render() {
    const [showToolbar, setShowToolbar] = useState(true);
    const [showStatusBar, setShowStatusBar] = useState(false);

    return (
      <Dropdown>
        <DropdownTrigger>View Options</DropdownTrigger>
        <DropdownMenu className="w-56" position="bottom-start">
          <DropdownItem
            active={showToolbar}
            onClick={() => setShowToolbar(!showToolbar)}
            showIcon
            variant="checkbox"
          >
            Show Toolbar
          </DropdownItem>
          <DropdownItem
            active={showStatusBar}
            onClick={() => setShowStatusBar(!showStatusBar)}
            showIcon
            variant="checkbox"
          >
            Show Status Bar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  },
};

/**
 * Using the `radio` variant allows the user to select exactly one choice among multiple options.
 * * A dot icon is displayed for the currently active item, and the ARIA role is set to `menuitemradio`.
 */
export const RadioSelection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Using the `radio` variant allows for a single choice among multiple options.",
      },
    },
  },
  render: function Render() {
    const [theme, setTheme] = useState("system");

    return (
      <Dropdown>
        <DropdownTrigger>Select Theme</DropdownTrigger>
        <DropdownMenu className="w-40" position="bottom-start">
          {(["light", "dark", "system"] as const).map((t) => (
            <DropdownItem
              active={theme === t}
              className="capitalize"
              key={t}
              onClick={() => setTheme(t)}
              showIcon
              variant="radio"
            >
              {t}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  },
};
