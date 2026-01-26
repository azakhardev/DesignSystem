import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar, SidebarContent } from "./Sidebar";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen", // Nutné, aby sidebar byl nalepený na kraji
  },
  subcomponents: {
    SidebarContent,
  } as Record<string, React.ComponentType<unknown>>,
  argTypes: {
    // Tady definujeme ovládací prvky pro "ruční" testování
    collapsed: {
      control: "boolean",
      description: "Desktop: Sbalený/Rozbalený stav",
    },
    mobileOpen: {
      control: "boolean",
      description: "Mobil: Otevřený/Zavřený Dialog",
    },
    // Callbacky pro logování do Actions panelu
    onCollapsedChange: { action: "collapsed changed" },
    onMobileOpenChange: { action: "mobileOpen changed" },

    // Skryjeme věci, které nepotřebujeme vidět
    defaultCollapsed: { table: { disable: true } },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Playground: Story = {
  args: {
    collapsed: false,
    mobileOpen: false,
  },
  render: (args) => (
    <div className="flex flex-row">
      <Sidebar {...args}>
        <SidebarContent className="bg-blue-100 border-r-2 border-blue-500">
          <div className="p-4">
            <h2 className="font-bold text-blue-900">TEST OBSAH</h2>
            <p className="mt-2 text-sm text-blue-700">Aktuální stav props:</p>
            <pre className="text-xs mt-2 bg-white/50 p-2 rounded">
              {JSON.stringify(
                {
                  collapsed: args.collapsed,
                  mobileOpen: args.mobileOpen,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="min-h-screen bg-gray-50 flex-1">
        <h1 className="text-2xl text-gray-300 font-bold uppercase">
          Zbytek stránky
        </h1>
      </div>
    </div>
  ),
};
