import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableInput,
  TableRow,
} from "./Table";

/**
 * A comprehensive and highly composable **Table** component built with the **Compound Component** pattern.
 *
 * It provides a solid foundation for displaying tabular data with built-in support for copy-to-clipboard functionality, inline editing, and customizable striped layouts.
 *
 * ### Key Features:
 * - 🧩 **Compound Architecture**: Fully customizable layout using standard HTML-like subcomponents (`TableHeader`, `TableRow`, `TableCell`, etc.).
 * - 📋 **Click to Copy**: Pass `allowCopy` to any `TableCell` to automatically enable clipboard copying with a smooth Framer Motion tooltip.
 * - ✏️ **Inline Editing**: Use `TableInput` for seamless inline data entry. It features smart CSS styling that shows a dashed border when empty and un-placeholdered.
 * - 🦓 **Striped Rows**: Easily toggle striped rows via the `stripped` prop and customize colors using `stripsScheme`.
 */
const meta = {
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    stripped: {
      control: "boolean",
      description: "Applies alternating background colors to table rows.",
    },
    stripsScheme: {
      control: "object",
      description: "Custom HSL color values for the odd and even striped rows.",
    },
  },
  component: Table,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableInput,
    TableRow,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Data Display/Table",
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard table layout. It uses semantic HTML tags under the hood,
 * ensuring maximum accessibility and compatibility with screen readers.
 */
export const Default: Story = {
  args: {
    stripped: false,
  },
  render: (args) => (
    <div className="w-[800px]">
      <Table {...args}>
        <TableHeader>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>#INV-001</TableCell>
            <TableCell>Acme Corp</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>$2,500.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#INV-002</TableCell>
            <TableCell>Globex Inc</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>$850.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#INV-003</TableCell>
            <TableCell>Initech</TableCell>
            <TableCell>Overdue</TableCell>
            <TableCell>$12,400.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * By passing the `stripped` prop, the table will automatically apply alternating
 * background colors to rows. You can override the default colors by providing a `stripsScheme` object.
 */
export const StripedCustomColors: Story = {
  args: {
    stripped: true,
    stripsScheme: {
      even: "hsl(var(--surface))",
      odd: "hsl(var(--surface-secondary) / 0.5)", // Slightly transparent secondary surface
    },
  },
  render: (args) => (
    <div className="w-[800px]">
      <Table {...args}>
        <TableHeader>
          <TableHead>Employee</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>Frontend Developer</TableCell>
            <TableCell>Engineering</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Smith</TableCell>
            <TableCell>Product Manager</TableCell>
            <TableCell>Product</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Charlie Davis</TableCell>
            <TableCell>UX Designer</TableCell>
            <TableCell>Design</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Diana Prince</TableCell>
            <TableCell>Backend Developer</TableCell>
            <TableCell>Engineering</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * Add the `allowCopy` prop to any `TableCell` to make it interactive.
 * Clicking the cell will copy its text content to the clipboard and display a brief "Copied!" tooltip.
 */
export const CopyableCells: Story = {
  args: {
    stripped: true,
  },
  render: (args) => (
    <div className="w-[800px]">
      <Table {...args}>
        <TableHeader>
          <TableHead>Server Name</TableHead>
          <TableHead>IP Address (Click to copy)</TableHead>
          <TableHead>Region (Click to copy)</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Web-Prod-01</TableCell>
            <TableCell allowCopy className="font-mono text-primary">
              192.168.1.105
            </TableCell>
            <TableCell allowCopy>us-east-1a</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>DB-Prod-01</TableCell>
            <TableCell allowCopy className="font-mono text-primary">
              10.0.0.52
            </TableCell>
            <TableCell allowCopy>eu-central-1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * `TableInput` allows for inline editing within cells.
 * It features a smart CSS state: if the input is empty and has no explicit placeholder,
 * it displays a dashed bottom border with `NULL` value to indicate to the user that data is missing.
 */
export const InlineEditing: Story = {
  args: {
    stripped: false,
  },
  render: (args) => (
    <div className="w-[800px]">
      <Table {...args}>
        <TableHeader>
          <TableHead>Key</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Description</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-mono">API_ENDPOINT</TableCell>
            <TableCell>
              <TableInput defaultValue="https://api.example.com/v1" />
            </TableCell>
            <TableCell>
              <TableInput placeholder="Enter endpoint description" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono">MAX_RETRIES</TableCell>
            <TableCell>
              <TableInput defaultValue="3" type="number" />
            </TableCell>
            <TableCell>
              <TableInput />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono">TIMEOUT_MS</TableCell>
            <TableCell>
              <TableInput />
            </TableCell>
            <TableCell>
              <TableInput defaultValue="Timeout before request fails" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
