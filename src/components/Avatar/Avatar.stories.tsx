import type { Meta, StoryObj } from "@storybook/react-vite";
import { User } from "lucide-react";

import { Skeleton } from "../Skeleton";
import { Avatar, AvatarFallback, AvatarImage, AvatarLoading } from "./Avatar";

/**
 * A robust, graceful **Avatar** component suite for displaying user profile images.
 *
 * Avatars are perfect for representing users, organizations, or entities across your application.
 * They intelligently handle network delays and broken images by falling back to skeletons or initials.
 *
 * ### Key Features
 * - **Graceful Fallbacks**: Automatically detects 404s or broken `src` URLs and swaps to a `<AvatarFallback>` (initials or icons).
 * - **Network State Tracking**: Use `<AvatarLoading>` to display a skeleton or spinner while the image payload is actively downloading over the network.
 * - **CVA Styling**: Built-in support for different `size` (sm, md, lg, xl), `shape` (circle, square, squircle), and `outline` variants.
 * - **Interactive Mode**: Toggle the `interactive` prop to automatically apply hover-scaling and active-press states for clickable avatars.
 */
const meta = {
  argTypes: {
    interactive: {
      control: "boolean",
      description:
        "Defines if the Avatar should act as interactive - scales upon hover.",
      type: "boolean",
    },
    outline: {
      control: "boolean",
      description: "Wheter Avatar should have outline or not.",
      type: "boolean",
    },
    shape: {
      control: "select",
      description:
        "Defines shape of an avatar. Every shape has rounded edges, but you can change it in classes/styles.",
      options: ["circle", "square"],
    },
    size: {
      control: "select",
      description:
        "Size of an Avatar wrapper, can be changes by classes/styles.",
      options: ["sm", "md", "lg", "xl"],
    },
  },
  component: Avatar,
  parameters: { layout: "centered" },
  subcomponents: {
    AvatarFallback,
    AvatarImage,
    AvatarLoading,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Data Display/Avatar",
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    shape: "circle",
    size: "md",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        alt="User Profile"
        src="https://static.vecteezy.com/system/resources/thumbnails/024/183/502/small/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
      />
      <AvatarFallback>AZ</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Control the border-radius using the `shape` prop.
 * Even the `square` variant retains a slight rounding to match modern UI aesthetics.
 */
export const Shapes: Story = {
  args: { shape: "circle", size: "lg" },
  render: (args) => (
    <div className="flex items-center gap-6">
      <Avatar {...args}>
        <AvatarImage src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197908.png" />
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="https://non-existing-url" />
        <AvatarLoading>
          <Skeleton
            className="h-full w-full bg-disabled-border"
            variant="rect"
          />
        </AvatarLoading>
        <AvatarFallback>SQ</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * Use `outline` to add an offset ring (useful when avatars overlap in a group).
 * Use `interactive` to add a hover scale effect for clickable triggers.
 */
export const Modifiers: Story = {
  args: { interactive: true, outline: true, shape: "circle", size: "lg" },
  render: (args) => (
    <div className="flex items-center gap-6 p-4">
      <Avatar {...args}>
        <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg" />
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>
          <User className="h-1/2 w-1/2 text-text-secondary" />
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * By using `<AvatarLoading>`, we can display our `<Skeleton>` component while
 * waiting for the image payload. You can try it out with throttling enabled in devtools.
 */
export const SlowNetwork: Story = {
  args: { shape: "circle", size: "lg" },
  render: (args) => {
    return (
      <Avatar {...args}>
        {/* Shows instantly, disappears when image loads */}
        <AvatarLoading>
          <Skeleton className="h-full w-full" variant="rect" />
        </AvatarLoading>

        <AvatarImage
          alt="Delayed User"
          src={
            "https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg"
          }
        />

        {/* Only shows if the image URL returns a 404 */}
        <AvatarFallback>AZ</AvatarFallback>
      </Avatar>
    );
  },
};

/**
 * Because the component logic maps directly to CSS and standard elements,
 * you can style the `<AvatarFallback>` exactly like you would any `div`.
 * Here we apply red text and a red background to signify a failed load.
 */
export const CustomErrorState: Story = {
  args: { size: "lg" },
  render: (args) => {
    return (
      <Avatar {...args}>
        <AvatarImage src="https://this-image-does-not-exist.com/404.jpg" />
        <AvatarFallback className="bg-error-surface text-error-text border-2 rounded-full border-error-border">
          <span className="text-xs font-bold uppercase">Err</span>
        </AvatarFallback>
      </Avatar>
    );
  },
};
