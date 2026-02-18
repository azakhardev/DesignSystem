import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Home,
  LogOut,
  PanelLeft,
  PanelRight,
  Settings,
  User,
} from "lucide-react";
import { expect, screen } from "storybook/test";

import {
  Sidebar,
  SidebarBody,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarTrigger,
} from "./Sidebar";

/**
 * A responsive, compound component suite for building application sidebars.
 *
 * **Key Features:**
 * - **Hybrid Architecture:** Functions as a collapsible sidebar on desktop and a modal dialog (Sheet) on mobile.
 * - **Compound Pattern:** Composed of `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarBody`, and `SidebarFooter`.
 * - **State Management:** Supports both controlled and uncontrolled states for collapsing and mobile visibility.
 * - **Animation:** Includes smooth transitions for width resizing and mobile drawer entry.
 */
const meta = {
  argTypes: {
    children: { table: { disable: true } },
    collapsed: {
      control: "boolean",
      description: "Controls the collapsed state on Desktop.",
      table: { category: "State" },
    },
    defaultCollapsed: {
      control: false,
      description: "Initial state for uncontrolled mode.",
      table: { category: "State" },
    },
    mobileOpen: {
      control: "boolean",
      description: "Controls the visibility of the Dialog on Mobile.",
      table: { category: "State" },
    },
    onCollapsedChange: {
      action: "collapsed changed",
      table: { category: "Events" },
    },
    onMobileOpenChange: {
      action: "mobileOpen changed",
      table: { category: "Events" },
    },
  },
  component: Sidebar,
  parameters: {
    // 'fullscreen' removes the default 1rem padding from Storybook,
    // allowing the sidebar to touch the edges of the window.
    layout: "fullscreen",
  },
  subcomponents: {
    SidebarBody,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Layout/Sidebar",
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

const DemoSidebarContent = () => (
  <>
    <SidebarHeader>
      <div className="flex items-center gap-2 p-2 text-primary group-data-[collapsed=true]/sidebar:justify-center">
        <div className="size-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold shrink-0">
          A
        </div>
        <div className="font-bold text-lg whitespace-nowrap overflow-hidden group-data-[collapsed=true]/sidebar:hidden transition-all duration-300 opacity-100 group-data-[collapsed=true]/sidebar:opacity-0">
          My Design System
        </div>
      </div>
    </SidebarHeader>

    <SidebarBody>
      <SidebarItem categoryTitle>General</SidebarItem>
      <SidebarItem icon={<Home />}>Dashboard</SidebarItem>
      <SidebarItem icon={<User />}>Team Members</SidebarItem>
      <SidebarItem icon={<Settings />}>Settings</SidebarItem>
    </SidebarBody>

    <SidebarFooter>
      <SidebarItem
        className="text-error-text mt-auto hover:bg-red-600/30"
        icon={<LogOut />}
      >
        Log out
      </SidebarItem>
      <div className="border-t border-border my-2" />
      <SidebarItem
        className="mt-auto hover:bg-transparent cursor-default"
        icon={<User />}
      >
        <div className="flex flex-col text-sm text-left">
          <span className="font-bold">John Doe</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
      </SidebarItem>
    </SidebarFooter>
  </>
);

/**
 * The standard layout. The sidebar is fixed to the left edge.
 *
 * **Usage:**
 * 1. Wrap your app in `<Sidebar>`.
 * 2. Use `<SidebarContent>` for the panel.
 * 3. Place your main content in a sibling `div` or `main`.
 */
export const LeftPanel: Story = {
  args: {
    defaultCollapsed: false,
  },
  play: async function ({ canvas, userEvent }) {
    const toggle = canvas.getByRole("button");

    await userEvent.click(toggle);

    const sidebar = canvas.getByRole("complementary");

    expect(sidebar).toHaveAttribute("data-collapsed", "true");

    await userEvent.click(toggle);

    expect(sidebar).toHaveAttribute("data-collapsed", "false");
  },
  render: (args) => (
    <div className="flex h-screen w-full bg-app-background overflow-hidden">
      <Sidebar {...args}>
        <SidebarContent
          dialogProps={{ className: "p-0 border-0", closeButton: true }}
        >
          <DemoSidebarContent />
        </SidebarContent>
        <main className="flex-1 p-8 overflow-auto transition-all duration-300">
          <header className="flex items-center gap-4 mb-6">
            <SidebarTrigger>
              <PanelLeft />
            </SidebarTrigger>
            <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          </header>
          <div className="p-4 border-2 border-dashed border-border rounded-lg h-96 flex items-center justify-center text-text-secondary">
            Page Content goes here
          </div>
        </main>
      </Sidebar>
    </div>
  ),
};

/**
 * The sidebar can be positioned on the right side by setting the `side` prop
 * on `SidebarContent`. But you still need to keep in mind HTML flow.
 *
 * Useful for properties panels, chat drawers, or secondary navigation.
 */
export const RightPanel: Story = {
  args: {
    defaultCollapsed: false,
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  play: async function ({ canvas, userEvent }) {
    const toggle = canvas.getByRole("button");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(toggle);

    const mobileMenu = await screen.findByRole("dialog");

    expect(mobileMenu).toBeInTheDocument();
  },
  render: (args) => (
    <div className="flex h-screen w-full bg-app-background overflow-hidden">
      <Sidebar {...args}>
        <main className="flex-1 p-8 overflow-auto mr-0">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-text">Settings</h1>
            {/* Trigger placed on the right for context */}
            <SidebarTrigger>
              <PanelRight />
            </SidebarTrigger>
          </header>
          <div className="p-4 border-2 border-dashed border-border rounded-lg h-96 flex items-center justify-center text-text-secondary">
            Main content is on the left
          </div>
        </main>
        <SidebarContent side="right">
          <DemoSidebarContent />
        </SidebarContent>
      </Sidebar>
    </div>
  ),
};

/**
 * Use the **Controls** panel below to toggle:
 * - `collapsed`: Switches between expanded and rail width.
 * - `mobileOpen`: Opens the Dialog overlay (switch Viewport to Mobile first).
 */
export const Playground: Story = {
  args: {
    collapsed: false,
    mobileOpen: false,
  },
  render: ({ collapsed, mobileOpen, ...args }) => (
    <div className="flex h-screen w-full bg-app-background overflow-hidden relative">
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} {...args}>
        <SidebarContent className="gap-2">
          <DemoSidebarContent />
        </SidebarContent>

        <div className="absolute top-4 right-4 z-10">
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
        </div>

        <div className="flex-1 flex items-center justify-center p-10">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-3xl font-bold text-text uppercase tracking-widest">
              Playground
            </h1>
            <p className="text-text-secondary">
              Interact with the <strong>Controls</strong> panel or the floating
              trigger button to test the sidebar states.
            </p>
          </div>
        </div>
      </Sidebar>
    </div>
  ),
};
