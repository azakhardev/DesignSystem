import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tab, TabContent, Tabs, TabsList } from "./Tabs";

const meta = {
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

export const Default: Story = {
  render: () => {
    return (
      <Tabs defaultValue="a">
        <TabsList>
          <Tab value="a">Tab A</Tab>
          <Tab value="b">Tab B</Tab>
        </TabsList>
        <TabContent value="a">Content of tab A</TabContent>
        <TabContent value="b">Content of tab B</TabContent>
      </Tabs>
    );
  },
};
