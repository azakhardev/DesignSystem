import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sidebar,
  SidebarContent,
  SidebarItem,
  SidebarTrigger,
} from "./Sidebar";
import { Home, Settings, SidebarClose, User } from "lucide-react";

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
      <Sidebar>
        <SidebarContent className="gap-2">
          <SidebarItem categoryTitle icon={<Home />}>
            Domů
          </SidebarItem>
          <SidebarItem icon={<User size={28} />}>Profil</SidebarItem>
          <SidebarItem icon={<Settings size={28} />}>Nastavení</SidebarItem>
        </SidebarContent>
        <SidebarTrigger className="fixed bottom-2 right-2">
          <SidebarClose />
        </SidebarTrigger>
      </Sidebar>
      <div className="min-h-screen bg-app-background flex-1">
        <h1 className="text-2xl text-gray-300 font-bold uppercase">
          Zbytek stránky
        </h1>
      </div>
    </div>
  ),
};
