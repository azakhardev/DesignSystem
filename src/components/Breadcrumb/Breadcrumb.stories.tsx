import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRight, Home } from "lucide-react";
import { expect, waitFor } from "storybook/test";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbMenu,
  BreadcrumbSeparator,
} from "./Breadcrumb";

/**
 * A responsive Breadcrumb navigation component built with semantic HTML (`nav`, `ol`, `li`)
 * and accessible ARIA attributes.
 *
 * It features a flexible composition model, support for custom separators,
 * and a collapsible menu for deep navigation hierarchies.
 */
const meta = {
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbMenu,
    BreadcrumbSeparator,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Components/Breadcrumb",
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard breadcrumb usage. Shows a path from the home page to the current page.
 * The last item should typically be marked with `current`.
 */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Settings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current href="#">
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * You can customize the separator icon. A common pattern is using a Chevron (`>`)
 * instead of the default Slash (`/`).
 */
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">E-Shop</BreadcrumbLink>
        </BreadcrumbItem>
        {/* Using a custom icon via the 'icon' prop */}
        <BreadcrumbSeparator icon={<ChevronRight />} />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator icon={<ChevronRight />} />
        <BreadcrumbItem>
          <BreadcrumbLink current href="#">
            Laptops
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * For deep hierarchies, you can use the `BreadcrumbMenu` component to collapse
 * intermediate steps into a dropdown. This saves space while keeping links accessible.
 */
export const CollapsedWithMenu: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbMenu>
          <BreadcrumbLink href="#">Documentation</BreadcrumbLink>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
          <BreadcrumbLink href="#">Primitives</BreadcrumbLink>
        </BreadcrumbMenu>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Forms</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current href="#">
            Input
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * The `BreadcrumbMenu` button can be customized with text instead of the default ellipsis icon.
 */
export const MenuWithCustomTrigger: Story = {
  play: async function ({ canvas, userEvent }) {
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    expect(canvas.getByText("Project Alpha")).toBeInTheDocument();
    expect(canvas.getByText("Project Beta")).toBeInTheDocument();

    await userEvent.type(button, "{Escape}");

    await waitFor(
      () => {
        expect(canvas.queryByText("Project Alpha")).not.toBeInTheDocument();
        expect(canvas.queryByText("Project Beta")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Custom text prop */}
        <BreadcrumbMenu text="Projects...">
          <BreadcrumbLink href="#">Project Alpha</BreadcrumbLink>
          <BreadcrumbLink href="#">Project Beta</BreadcrumbLink>
        </BreadcrumbMenu>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current href="#">
            Project Gamma
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * You can mix icons and text within `BreadcrumbLink` for richer visuals.
 * This is often used for the root "Home" link.
 */
export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="flex items-center gap-2" href="#">
            <Home size={14} />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Analytics</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current href="#">
            Reports
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
