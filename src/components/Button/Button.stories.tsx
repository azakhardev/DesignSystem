import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

/**
 * The **Button** is a fundamental UI primitive used to trigger actions or navigation.
 * - It is built using **CVA (Class Variance Authority)** to ensure type-safe variant management
 * and consistent styling.
 *
 * **Key Features:**
 * - **Variants:** Supports multiple visual styles including `primary`, `danger`, `ghost`, and more.
 * - **Micro-interactions:** Includes built-in `scale` and `color` transitions on hover/active states.
 * - **Polymorphic:** Can receive a `ref` and passes all standard HTML button attributes.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "danger",
        "confirm",
        "info",
        "ghost",
        "animated",
      ],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The **Default** story showcases the standard `primary` appearance used for main actions.
 * * Try interacting with it to see the **micro-animations**:
 * - **Hover:** Slight scale up (`1.10x`) + background darken.
 * - **Active:** Slight scale down (`0.95x`) for tactile feedback.
 * - **Focus:** Accessible outline ring (default browser behavior).
 */
export const Default: Story = {
  args: {
    children: "Click me",
    className: "",
    onClick: () => {
      alert("Thanks!");
    },
    disabled: false,
  },
};
