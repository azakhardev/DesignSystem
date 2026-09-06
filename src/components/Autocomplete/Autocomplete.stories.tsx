import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, User } from "lucide-react";
import { useState } from "react";

import { Autocomplete } from "./Autocomplete";

/**
 * The **Autocomplete** component combines a text input with a dropdown list of options.
 *
 * It supports standard string arrays, complex objects, full keyboard navigation (Up/Down/Enter),
 * and custom list item rendering.
 */
const meta = {
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
  render: () => {
    const [search, setSearch] = useState("");

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
      <div className="w-[300px] flex flex-col gap-4">
        <Autocomplete<string>
          onSearchChange={setSearch}
          onSelectOption={(val) => {
            setSearch(val);
            alert(`You selected the suggestion: ${val}`);
          }}
          onSubmit={(val) => {
            alert(`You searched the raw text: "${val}"`);
          }}
          options={filtered}
          placeholder="Search fruits..."
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
  render: () => {
    const frameworks = [
      { category: "Library", id: "1", label: "React" },
      { category: "Framework", id: "2", label: "Vue" },
      { category: "Framework", id: "3", label: "Angular" },
      { category: "Compiler", id: "4", label: "Svelte" },
    ];

    const [search, setSearch] = useState("");
    const filtered = frameworks.filter((f) =>
      f.label.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="w-[300px]">
        <Autocomplete
          icon={<Search className="w-4 h-4 text-text-secondary" />}
          onSearchChange={setSearch}
          onSelectOption={(val) => setSearch(val.label)}
          onSubmit={(val) => {
            alert(`You searched the raw text: "${val}"`);
          }}
          options={filtered}
          placeholder="Search frameworks..."
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
  render: () => {
    type UserType = { id: string; name: string; email: string };

    const users: UserType[] = [
      { email: "alice@example.com", id: "u1", name: "Alice Smith" },
      { email: "bob@example.com", id: "u2", name: "Bob Johnson" },
      { email: "charlie@example.com", id: "u3", name: "Charlie Davis" },
    ];

    const [search, setSearch] = useState("");
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    );

    return (
      <div className="w-[350px]">
        <Autocomplete<UserType>
          // Explicitly define how to get the label text if the object doesn't have a `label` property
          getOptionLabel={(user) => user.name}
          onSearchChange={setSearch}
          onSelectOption={(val) => setSearch(val.name)}
          options={filtered}
          placeholder="Search users by name or email..."
          renderOption={(user) => (
            <div className="flex items-center gap-3 w-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="font-medium truncate">{user.name}</span>
                <span className="text-xs text-text-secondary truncate">
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
