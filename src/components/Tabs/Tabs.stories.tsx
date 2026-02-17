import type { Meta, StoryObj } from "@storybook/react-vite";
import { Music, Podcast, Radio } from "lucide-react";
import { expect } from "storybook/test";

import { Tab, TabContent, Tabs, TabsList } from "./Tabs";

/**
A set of accessible, compound components for switching between different views or content sections within the same context.

### Key Features
- **Compound Component API:** Built using React Context to allow flexible composition of components.
- **Layout Modes:** Supports both standard **horizontal** (top bar) and **vertical** (sidebar) orientations via the `tabsDirection` prop.
- **Visual Customization:** 
*  - **Grow:** Tabs can automatically fill the available width using the `grow` prop on `TabsList`.
*  - **Align:** Tabs can be aligned to the start, center, or end using the `justify` prop.
- **Smart Borders:** Features a polished border-overlap design where the active tab cleanly sits on top of the content border.

### Anatomy
To implement this component, you must use the following parts together:
1. **`Tabs`**: The root provider. Manages state (active tab) and direction.
2. **`TabsList`**: A wrapper for the triggers. Handles the main border line and flex layout.
3. **`Tab`**: The clickable trigger. Handles the active state styling and interactions.
4. **`TabContent`**: The panel that displays content when its value matches the active tab.
 */
const meta = {
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The value of the tab to show by default.",
    },
    onValueChange: { action: "changed" },
    tabsDirection: {
      control: "radio",
      description: "The orientation of the tabs.",
      options: ["horizontal", "vertical"],
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
  },
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    Tab,
    TabContent,
    TabsList,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Layout/Tabs",
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default horizontal layout. The content width is determined by the `TabContent` size.
 */
export const Default: Story = {
  play: async function ({ canvas, userEvent }) {
    const tab = canvas.getByRole("tab", { name: /password/i });

    await userEvent.click(tab);

    expect(canvas.getByText("Change your password here.")).toBeInTheDocument();
  },
  render: (args) => {
    return (
      <Tabs defaultValue="account" {...args}>
        <TabsList>
          <Tab value="account">Account</Tab>
          <Tab value="password">Password</Tab>
          <Tab disabled value="settings">
            Settings
          </Tab>
        </TabsList>
        <TabContent className="w-[400px] bg-surface-secondary" value="account">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Account</h3>
            <p className="text-sm text-text-secondary">
              Make changes to your account here. Click save when you are done.
            </p>
          </div>
        </TabContent>
        <TabContent className="w-[400px] bg-surface-secondary" value="password">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">Password</h3>
            <p className="text-sm text-text-secondary">
              Change your password here.
            </p>
          </div>
        </TabContent>
      </Tabs>
    );
  },
};

/**
 * Use `tabsDirection="vertical"` on the `Tabs` component to switch to a side-by-side layout.
 * **Note:** You usually need to set a fixed height or `h-full` on the Tabs container so the border renders correctly.
 */
export const Vertical: Story = {
  args: {
    tabsDirection: "vertical",
  },
  render: (args) => {
    return (
      <Tabs className="h-[300px] w-[500px]" defaultValue="music" {...args}>
        <TabsList>
          <Tab value="music">
            <Music className="mr-2" /> Music
          </Tab>
          <Tab value="podcasts">
            <Podcast className="mr-2" />
            Podcasts
          </Tab>
          <Tab value="live">
            <Radio className="mr-2" />
            Live
          </Tab>
        </TabsList>
        <TabContent className="bg-surface-secondary" value="music">
          <h3 className="font-bold text-lg mb-2">Discover Music</h3>
          <p>Listen to the latest hits.</p>
        </TabContent>
        <TabContent className="bg-surface-secondary" value="podcasts">
          <h3 className="font-bold text-lg mb-2">Your Episodes</h3>
          <p>Catch up on your favorite shows.</p>
        </TabContent>
        <TabContent className="bg-surface-secondary" value="live">
          <h3 className="font-bold text-lg mb-2">Live Radio</h3>
          <p>Tune in to live broadcasts.</p>
        </TabContent>
      </Tabs>
    );
  },
};

/**
 * Use the `grow` prop on `TabsList` to make the tabs take up equal space within the container.
 * This is especially useful for mobile views or cards.
 */
export const FullWidth: Story = {
  render: () => {
    return (
      <Tabs className="w-[400px]" defaultValue="login">
        <TabsList grow>
          <Tab className="justify-center" value="login">
            Login
          </Tab>
          <Tab className="justify-center" value="register">
            Register
          </Tab>
        </TabsList>
        <TabContent className="pt-4 bg-surface-secondary" value="login">
          <div className="h-32 rounded flex items-center justify-center">
            Login Form
          </div>
        </TabContent>
        <TabContent className="pt-4 bg-surface-secondary" value="register">
          <div className="h-32 flex items-center justify-center">
            Register Form
          </div>
        </TabContent>
      </Tabs>
    );
  },
};

/**
 * The `TabsList` component accepts a `justify` prop to align the tabs.
 * Options: `start` (default), `center`, `end`, `between`.
 */
export const Centered: Story = {
  render: () => {
    return (
      <Tabs className="w-[600px]" defaultValue="overview">
        <TabsList justify="center">
          <Tab value="overview">Overview</Tab>
          <Tab value="features">Features</Tab>
          <Tab value="pricing">Pricing</Tab>
        </TabsList>
        <TabContent
          className="text-center pt-10 bg-surface-secondary"
          value="overview"
        >
          Overview Content
        </TabContent>
        <TabContent
          className="text-center pt-10 bg-surface-secondary"
          value="features"
        >
          Features Content
        </TabContent>
        <TabContent
          className="text-center pt-10 bg-surface-secondary"
          value="pricing"
        >
          Pricing Content
        </TabContent>
      </Tabs>
    );
  },
};

/**
 * Example of right-aligned tabs using `justify="end"`.
 */
export const RightAligned: Story = {
  render: () => {
    return (
      <Tabs className="w-[500px]" defaultValue="details">
        <TabsList justify="end">
          <Tab value="details">Details</Tab>
          <Tab value="reviews">Reviews</Tab>
        </TabsList>
        <TabContent
          className="pt-4 text-right bg-surface-secondary"
          value="details"
        >
          Product Details
        </TabContent>
        <TabContent
          className="pt-4 text-right bg-surface-secondary"
          value="reviews"
        >
          Customer Reviews
        </TabContent>
      </Tabs>
    );
  },
};
