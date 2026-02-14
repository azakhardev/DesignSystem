import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./Breadcrumb";

const meta = {
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Components/Breadcrumb",
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/?path=/docs/components-alert--documentation">
              Alert
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/?path=/docs/components-button--documentation">
              Button
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              current
              href="/?path=/docs/components-breadcrumb--documentation"
            >
              Breadcrumb
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },
};
