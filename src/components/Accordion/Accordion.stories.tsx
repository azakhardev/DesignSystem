import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta = {
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    AccordionTrigger,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Components/Accordion",
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="acc1">
        <AccordionHeader>
          Accordion Header 1<AccordionTrigger></AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut autem
          expedita modi mollitia? Dicta at eos voluptate, doloribus optio
          adipisci aperiam. Dignissimos suscipit cum minus ducimus temporibus
          quidem perspiciatis sunt?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="acc2">
        <AccordionHeader>
          Accordion Header 2<AccordionTrigger></AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          consequuntur libero velit perferendis atque ullam voluptas ducimus
          quidem minus veniam. Recusandae dolor ad ipsam hic quam iste deleniti
          consectetur debitis.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
