import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta = {
  argTypes: {},
  component: Table,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Layout/Table",
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <Table {...args}>
        <TableHeader>
          <TableHead></TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableHeader>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </Table>
    );
  },
};
