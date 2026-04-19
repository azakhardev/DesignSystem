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
      <Table className="w-[800px]" stripped {...args}>
        <TableHeader>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Surname</TableHead>
        </TableHeader>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Anthony</TableCell>
          <TableCell>Starr</TableCell>
        </TableRow>
        <TableRow>
          <TableCell allowCopy>2</TableCell>
          <TableCell>Home</TableCell>
          <TableCell>Lander</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <TableInput />
          </TableCell>
          <TableCell>
            <TableInput placeholder="Enter name" />
          </TableCell>
          <TableCell>
            <TableInput placeholder="Enter surname" />
          </TableCell>
        </TableRow>
      </Table>
    );
  },
};
