import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, User } from "lucide-react";
import { useEffect, useState } from "react";

import { Autocomplete } from "./Autocomplete";

/**
 * The **Autocomplete** component combines a text input with a dropdown list of options.
 *
 * It supports standard string arrays, complex objects, full keyboard navigation (Up/Down/Enter),
 * and custom list item rendering.
 */
const meta = {
  // Added argTypes to generate Storybook controls
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables the autocomplete input.",
    },
    errorText: {
      control: "text",
      description: "Displays an error message below the input.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input.",
    },
    value: {
      control: "text",
      description: "The current search value.",
    },
  },
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  title: "Form/Autocomplete",
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Basic Strings
 * The simplest usage. Pass an array of strings to `options`. The component will
 * automatically resolve the labels and keys.
 *
 * **Keyboard Navigation:** Try typing, then use `ArrowDown`, `ArrowUp`, and `Enter` to select.
 */
export const StringArray: Story = {
  args: {
    placeholder: "Search fruits...",
  },
  render: (args) => {
    const [search, setSearch] = useState(args.value ?? "");

    useEffect(() => {
      if (args.value !== undefined) {
        setSearch(args.value);
      }
    }, [args.value]);

    const allFruits = [
      "Apple",
      "Banana",
      "Cherry",
      "Date",
      "Elderberry",
      "Fig",
      "Grape",
    ];
    const filtered = allFruits.filter((f) =>
      f.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="flex w-75 flex-col gap-4">
        <Autocomplete<string>
          {...args}
          onSearchChange={setSearch}
          onSelectOption={(val) => {
            setSearch(val);
            alert(`You selected the suggestion: ${val}`);
          }}
          onSubmit={(val) => {
            alert(`You searched the raw text: "${val}"`);
          }}
          options={filtered}
          value={search}
        />
      </div>
    );
  },
};

/**
 * ### Complex Objects
 * When passing objects, the component will automatically look for `id` or `value` for the key,
 * and `label` for the display text.
 */
export const ObjectArray: Story = {
  args: {
    placeholder: "Search frameworks...",
  },
  render: (args) => {
    const frameworks = [
      { category: "Library", id: "1", label: "React" },
      { category: "Framework", id: "2", label: "Vue" },
      { category: "Framework", id: "3", label: "Angular" },
      { category: "Compiler", id: "4", label: "Svelte" },
    ];

    const [search, setSearch] = useState(args.value ?? "");

    useEffect(() => {
      if (args.value !== undefined) setSearch(args.value);
    }, [args.value]);

    const filtered = frameworks.filter((f) =>
      f.label.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="w-75">
        <Autocomplete
          {...args}
          icon={<Search className="h-4 w-4 text-text-secondary" />}
          onSearchChange={setSearch}
          onSelectOption={(val) => setSearch(val.label)}
          onSubmit={(val) => {
            alert(`You searched the raw text: "${val}"`);
          }}
          options={filtered}
          value={search}
        />
      </div>
    );
  },
};

/**
 * ### Custom Rendering
 * Use the `renderOption` prop to build complex UI for each row, such as adding avatars,
 * badges, or secondary text.
 */
export const CustomRenderer: Story = {
  args: {
    placeholder: "Search users by name or email...",
  },
  render: (args) => {
    type UserType = { email: string; id: string; name: string };

    const users: UserType[] = [
      { email: "alice@example.com", id: "u1", name: "Alice Smith" },
      { email: "bob@example.com", id: "u2", name: "Bob Johnson" },
      { email: "charlie@example.com", id: "u3", name: "Charlie Davis" },
    ];

    const [search, setSearch] = useState(args.value ?? "");

    useEffect(() => {
      if (args.value !== undefined) setSearch(args.value);
    }, [args.value]);

    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="w-87.5">
        <Autocomplete<UserType>
          {...args}
          // Explicitly define how to get the label text if the object doesn't have a `label` property
          getOptionLabel={(user) => user.name}
          onSearchChange={setSearch}
          onSelectOption={(val) => setSearch(val.name)}
          options={filtered}
          renderOption={(user) => (
            <div className="flex w-full items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-text-secondary">
                  {user.email}
                </span>
              </div>
            </div>
          )}
          value={search}
        />
      </div>
    );
  },
};
