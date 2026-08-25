import type { Meta, StoryObj } from "@storybook/react-vite";

import { Datepicker, DatepickerContent, DatepickerTrigger } from "./Datepicker";

/**
 * The **Card** component serves as a flexible container for grouping related content and actions.
 *
 * It follows the **Compound Component** pattern, allowing you to compose parts like
 * `CardHeader`, `CardContent`, and `CardFooter` to build diverse UI variations.
 */
const meta = {
  component: Datepicker,
  parameters: {
    layout: "centered",
  },
  title: "Form/Datepicker",
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Basic Usage
 * A simple container wrapper with a border, shadow, and rounded corners.
 * By default, the `Card` component has no internal padding, giving you full control over the layout.
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <DatepickerTrigger placeholder="Pick a value" />
        <DatepickerContent></DatepickerContent>
      </>
    ),
  },
  render: (args) => {
    return <Datepicker {...args} />;
  },
};
