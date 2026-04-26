import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, Hash, MapPin, Tag as TagIcon, X } from "lucide-react";
import { useState } from "react";

import { Button } from "../Button";
import { Tag } from "./Tag";

/**
 * A compact element used for labeling, categorizing, or organizing content.
 * Commonly used in filters, metadata displays, or as "removable" items in a search bar.
 */
const meta = {
  argTypes: {
    children: {
      description: "The text content of the tag",
    },
    disabled: {
      control: "boolean",
      description: "Disables all interactions and reduces opacity",
    },
    icon: {
      control: false,
      description: "Optional icon element",
    },
    iconAriaLabel: {
      description:
        "Accessibility label for the icon button (required if onIconClick is used)",
    },
    onIconClick: {
      action: "icon-clicked",
      description:
        "Function called when the icon is clicked. If provided, the icon becomes an interactive button.",
    },
    variant: {
      control: "select",
      description: "Visual style of the tag's border",
      options: ["solid", "dashed"],
    },
  },
  component: Tag,

  parameters: {
    layout: "centered",
  },
  title: "Primitives/Tag",
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Standard static tag used for simple labeling without any interaction.
 */
export const Default: Story = {
  args: {
    children: "Category Name",
    variant: "solid",
  },
};

/**
 * The most common use case: a filter tag that can be removed.
 * Notice the hover effect and the 'X' icon.
 */
export const RemovableFilter: Story = {
  args: {
    children: "Location: Prague",
    icon: <X size={18} />,
    iconAriaLabel: "Remove filter",
    onIconClick: () => alert("Tag removed!"),
    variant: "solid",
  },
};

/**
 * Using the `dashed` variant, often used for "suggested" tags or optional metadata.
 */
export const Dashed: Story = {
  args: {
    children: "Draft Mode",
    icon: <Hash size={14} />,
    variant: "dashed",
  },
};

/**
 * Tags can also serve as pure visual indicators with non-clickable icons.
 */
export const WithStaticIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tag icon={<MapPin size={14} />}>New York</Tag>
      <Tag icon={<Calendar size={14} />}>2024-03-21</Tag>
      <Tag icon={<TagIcon size={14} />}>v1.0.2</Tag>
    </div>
  ),
};

/**
 * The disabled state prevents any hover effects or click events on the icon.
 */
export const Disabled: Story = {
  args: {
    children: "Inactive Filter",
    disabled: true,
    icon: <X size={14} />,
    onIconClick: () => {},
  },
};

/**
 * An example of how tags look when grouped together in a filter bar.
 */
export const FilterGroup: Story = {
  render: () => {
    const initialValues = [
      { id: 1, title: "Price", value: "$100+" },
      { id: 2, title: "Color", value: "Blue" },
      { id: 3, title: "Size", value: "XL" },
    ];
    const [filters, setFilters] = useState(initialValues);

    return (
      <div className="flex flex-col gap-3 border dark:border-none p-4 rounded-lg bg-surface-subtle">
        <div className="flex flex-wrap gap-2 max-w-md">
          {filters.map((t) => (
            <Tag
              icon={<X size={14} />}
              key={t.id}
              onIconClick={() =>
                setFilters((old) => old.filter((tag) => tag.id !== t.id))
              }
              variant="dashed"
            >
              {t.title}: {t.value}
            </Tag>
          ))}
        </div>
        <div className="flex flex-row justify-end">
          <Button
            className="py-1"
            onClick={() => {
              setFilters(initialValues);
            }}
            variant="primary"
          >
            Reset
          </Button>
        </div>
      </div>
    );
  },
};
