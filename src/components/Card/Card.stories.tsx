import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

/**
 * The **Card** component serves as a flexible container for grouping related content and actions.
 *
 * It follows the **Compound Component** pattern, allowing you to compose parts like
 * `CardHeader`, `CardContent`, and `CardFooter` to build diverse UI variations.
 */
const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Basic Usage
 * A simple container wrapper with a border, shadow, and rounded corners.
 * By default, the `Card` component has no internal padding, giving you full control over the layout.
 */
export const Default: Story = {
  args: {
    children: "This is a default Card component.",
    className: "p-4",
  },
};

/**
 * ### Header Structure
 * Use `CardHeader` to introduce the context of the card.
 * Within it, you can utilize `CardTitle` for the main heading and `CardDescription`
 * for supporting text (typically in a muted color).
 */
export const WithHeader: Story = {
  args: {
    className: "max-w-[400px]",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Some title here</CardTitle>
        <CardDescription>And the description over there</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </CardContent>
    </Card>
  ),
};

/**
 * ### Footer Actions
 * The `CardFooter` is ideal for placing actions (buttons), summaries, or credits at the bottom.
 * It automatically handles padding and aligning.
 */
export const WithFooter: Story = {
  args: {
    className: "w-[500px]",
  },
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <strong>Todo list</strong>
        <ul>
          <li>
            • <s>Complete the Card component</s>
          </li>
          <li>
            • <s>Add Card stories</s>
          </li>
          <li>• Read a book</li>
        </ul>
      </CardContent>
      <CardFooter>Designed by ArtemDev</CardFooter>
    </Card>
  ),
};

/**
 * ### Content & Interactivity
 * Use the `CardContent` sub-component to wrap your main content.
 * It provides standard padding and spacing, ensuring your text and interactive elements (like buttons)
 * look consistent.
 */
export const WithCustomContent: Story = {
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Completely custom</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p>You can insert your own HTML into the CardContent Comonent.</p>
        <strong>
          You can also combine multiple components to create beautiful cards
        </strong>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row justify-between items-center">
          <p>Newsletter</p>
          <button
            className="px-3 py-1 bg-primary text-on-primary rounded hover:bg-primary-focus transition-colors"
            onClick={() => alert("Subscribed!")}
          >
            Subscribe
          </button>
        </div>
      </CardFooter>
    </Card>
  ),
};
