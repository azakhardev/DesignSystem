import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

/**
 * The **Button** is a fundamental UI primitive used to trigger actions or navigation.
 * - It is built using **CVA (Class Variance Authority)** to ensure type-safe variant management
 * and consistent styling.
 *
 * **Key Features:**
 * - **Variants:** Nine visual styles — `primary`, `secondary`, `soft`, `outline`, `ghost`,
 *   `link`, `destructive`, `success`, and `warning` — covering both neutral actions and
 *   semantic states.
 * - **Shape:** `default` (standard corners) or `pill` (fully rounded), independent of variant.
 * - **Effects:** An independent `effect` prop layers a visual flourish — `ripple` (a CSS-only
 *   click pulse) or `animated` (a rotating gradient border) — on top of any variant, rather
 *   than being tied to a specific color.
 * - **Micro-interactions:** Includes built-in `scale` and `color` transitions on hover/active
 *   states across all variants.
 * - **Polymorphic:** Can receive a `ref` and passes all standard HTML button attributes.
 * - **Loading state:** `loading` swaps content for a spinner and disables the button, with
 *   optional `loadingText`.
 */
const meta = {
  argTypes: {
    asChild: {
      control: "check",
      description: "Uses React composition capabilities to merge components",
    },
    children: {
      control: "text",
      description: "Button content",
    },
    disabled: {
      control: "boolean",
    },
    effect: {
      control: "select",
      description:
        "An optional visual flourish layered on top of any variant. `ripple` adds a CSS-only click pulse; `animated` adds a rotating gradient border and overrides the variant's fill/border to make room for it.",
      options: ["none", "ripple", "animated"],
    },
    loading: {
      control: "boolean",
      description: "Switches button to loading state",
    },
    loadingText: {
      control: "text",
      description: "Text displayed next to the spinner during loading",
    },
    onClick: { action: "clicked" },
    shape: {
      control: "select",
      description: "Corner geometry, independent of variant and effect.",
      options: ["default", "pill"],
    },
    variant: {
      control: "select",
      description: "Visual style of button",
      options: [
        "primary",
        "secondary",
        "soft",
        "outline",
        "ghost",
        "link",
        "destructive",
        "success",
        "warning",
      ],
    },
  },
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Primitives/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The **Default** story showcases the standard `primary` appearance used for main actions.
 * * Try interacting with it to see the **micro-animations**:
 * - **Hover:** Slight scale up (`1.02x`) + background darken.
 * - **Active:** Slight scale down (`0.98x`) for tactile feedback.
 * - **Focus:** Accessible outline ring (default browser behavior).
 */
export const Default: Story = {
  args: {
    children: "Click me",
    disabled: false,
    effect: "none",
    loading: false,
    loadingText: "Loading...",
    shape: "default",
    variant: "primary",
  },
};

/** All nine color variants side by side, at their default shape and no effect. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
};

/** Pill shape composes with any color variant. */
export const PillShapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button shape="pill" variant="primary">
        Primary Pill
      </Button>
      <Button shape="pill" variant="soft">
        Soft Pill
      </Button>
      <Button shape="pill" variant="outline">
        Outline Pill
      </Button>
      <Button shape="pill" variant="destructive">
        Destructive Pill
      </Button>
    </div>
  ),
};

/**
 * The `ripple` effect layered onto different variants — since it's now an
 * independent prop, it's no longer locked to one fixed color scheme.
 */
export const RippleEffect: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button effect="ripple" variant="primary">
        Click me
      </Button>
      <Button effect="ripple" variant="secondary">
        Click me
      </Button>
      <Button effect="ripple" shape="pill" variant="soft">
        Click me
      </Button>
    </div>
  ),
};

/**
 * The `animated` effect: a rotating gradient border. It overrides the
 * paired variant's fill/border/shape by design, so the visual stays
 * consistent regardless of which variant is selected alongside it.
 */
export const AnimatedEffect: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button effect="animated" variant="primary">
        Upgrade
      </Button>
      <Button effect="animated" variant="ghost">
        Upgrade
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: "Click me",
    loading: true,
    loadingText: "Loading...",
    variant: "primary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Click me",
    disabled: true,
    variant: "primary",
  },
};
