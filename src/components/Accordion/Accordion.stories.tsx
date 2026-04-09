import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect } from "storybook/test";

import { Status } from "../Status";
import { Tag } from "../Tag";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

/**
 * A highly flexible, compound Accordion component.
 * Supports both `single` and `multiple` modes, fully accessible with
 * Framer Motion animations.
 */
const meta = {
  argTypes: {
    collapsible: {
      control: "boolean",
      description: "If true, allows closing the last open item in single mode.",
    },
    defaultValue: {
      control: false,
      description:
        "Sets the default value of the Accordion (which item is expanded).",
    },
    mode: {
      control: "select",
      description: "Whether one or multiple items can be expanded at once.",
      options: ["single", "multiple"],
    },
    setValue: {
      control: false,
      description: "Callback fired when the expanded item changes.",
    },
    value: {
      control: false,
      description: "The controlled value of the expanded items.",
    },
  },
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

/**
 * Standard single-mode accordion. Only one item can be open at a time.
 */
export const SingleMode: Story = {
  args: {
    collapsible: true,
    defaultValue: "item-1",
    mode: "single",
  },
  play: async function ({ canvas, userEvent }) {
    const accordionTrigger2 = canvas.getByRole("button", { name: /privacy/i });

    expect(
      canvas.getByRole("region", { name: /privacy/i }),
    ).toBeInTheDocument();

    await userEvent.click(accordionTrigger2);

    expect(canvas.getByText(/two-factor/i)).toBeInTheDocument();
  },
  render: (args) => (
    <div className="w-[500px]">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionHeader>
            <AccordionTrigger className="w-full">
              System Settings
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Configure your global application preferences, language, and
            timezone settings here.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionHeader>
            <AccordionTrigger className="w-full">
              Privacy & Security
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Manage your two-factor authentication, active sessions, and data
            sharing permissions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Multiple items can be expanded simultaneously. Useful for FAQs or filters.
 */
export const MultipleMode: Story = {
  play: async function ({ canvas, userEvent }) {
    const accordionTrigger2 = canvas.getByRole("button", {
      name: /mobile app/i,
    });

    await userEvent.click(accordionTrigger2);

    expect(canvas.getByText(/login page and click/i)).toBeInTheDocument();
    expect(canvas.getByText(/download our app/i)).toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <Accordion defaultValue={["faq-1"]} mode="multiple">
        <AccordionItem value="faq-1">
          <AccordionHeader>
            <AccordionTrigger className="w-full text-primary">
              How do I reset my password?
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Go to the login page and click &quot;Forgot Password&quot;. We will
            send you a reset link via email.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionHeader>
            <AccordionTrigger className="w-full text-primary">
              Is there a mobile app available?
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Yes! You can download our app for both iOS and Android from their
            respective app stores.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Demonstrates the `collapsible={false}` behavior in single mode,
 * where at least one item must remain open at all times.
 */
export const NonCollapsible: Story = {
  play: async function ({ canvas, userEvent }) {
    const accordionTrigger1 = canvas.getByRole("button", {
      name: /database/i,
    });

    const accordionTrigger2 = canvas.getByRole("button", { name: /api/i });

    await userEvent.click(accordionTrigger1);

    expect(canvas.getByText(/this step is mandatory /i)).toBeInTheDocument();

    await userEvent.click(accordionTrigger2);

    expect(canvas.getByText(/register your application/i)).toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <p className="mb-4 text-xs text-text-secondary italic underline">
        Try clicking the open item to close it (it won&apos;t work).
      </p>
      <Accordion collapsible={false} defaultValue="opt-1" mode="single">
        <AccordionItem value="opt-1">
          <AccordionHeader>
            <AccordionTrigger className="w-full font-mono">
              STEP 1: DATABASE SETUP
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            This step is mandatory and cannot be collapsed once started.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="opt-2">
          <AccordionHeader>
            <AccordionTrigger className="w-full font-mono">
              STEP 2: API KEYS
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Register your application to obtain the necessary secret keys.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Showcases various trigger patterns: full-width, partial header,
 * and headers containing interactive elements like links or status tags.
 */
export const TriggerVariations: Story = {
  render: () => (
    <div className="w-[600px] space-y-8">
      <section className="space-y-2">
        <h4 className="text-[10px] font-mono uppercase text-text-secondary">
          1. Full Width Trigger
        </h4>
        <Accordion mode="single">
          <AccordionItem value="v1">
            <AccordionHeader>
              <AccordionTrigger className="w-full font-bold">
                The entire header is clickable
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Maximum hit area for best UX.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="space-y-2">
        <h4 className="text-[10px] font-mono uppercase text-text-secondary">
          2. Action Button Trigger
        </h4>
        <Accordion mode="single">
          <AccordionItem value="v2">
            <AccordionHeader>
              <span>Project Details</span>
              <AccordionTrigger className="bg-surface-secondary px-3 py-1 rounded-md text-sm border border-border">
                Expand info
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              Only the &quot;Expand info&quot; button triggers the collapse.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="space-y-2">
        <h4 className="text-[10px] font-mono uppercase text-text-secondary">
          3. Custom Header Content
        </h4>
        <Accordion mode="single">
          <AccordionItem value="v3">
            <AccordionHeader>
              <div className="flex items-center gap-3">
                <Status className="bg-green-500" />
                <span>Server Status</span>
                <Tag className="text-xs font-normal">v2.4.0</Tag>
                <a
                  className="text-xs text-primary hover:underline ml-2"
                  href="."
                  onClick={(e) => e.stopPropagation()}
                >
                  Logs
                </a>
              </div>
              <AccordionTrigger
                className="hover:bg-surface-secondary p-1 rounded-full"
                iconSize={20}
              />
            </AccordionHeader>
            <AccordionContent>
              The server is running optimally. Last health check: 2 minutes ago.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  ),
};

/**
 * Demonstrates the ability to provide custom icons or change the default chevron size.
 */
export const CustomIcons: Story = {
  render: () => (
    <div className="w-[500px]">
      <Accordion mode="single">
        <AccordionItem value="custom-1">
          <AccordionHeader>
            <AccordionTrigger
              className="w-full text-indigo-500"
              icon={<span className="text-xs font-bold font-mono">[OPEN]</span>}
              showIcon={true}
            >
              Custom Text Icon
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            You can pass any React element to the icon prop.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="custom-2">
          <AccordionHeader>
            <AccordionTrigger className="w-full" iconSize={40}>
              Large Default Chevron
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Using `iconSize={40}` for a bold visual statement.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Example of a controlled Accordion where the state is managed externally.
 */
export const ExternallyControlled: Story = {
  render: () => {
    const [val, setVal] = useState<string>("tab-1");

    return (
      <div className="w-[500px] space-y-4">
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-xs border rounded bg-surface"
            onClick={() => setVal("tab-1")}
          >
            Open 1
          </button>
          <button
            className="px-2 py-1 text-xs border rounded bg-surface"
            onClick={() => setVal("tab-2")}
          >
            Open 2
          </button>
          <button
            className="px-2 py-1 text-xs border rounded bg-surface text-error-text"
            onClick={() => setVal("")}
          >
            Close All
          </button>
        </div>

        <Accordion mode="single" setValue={setVal} value={val}>
          <AccordionItem value="tab-1">
            <AccordionHeader>
              <AccordionTrigger className="w-full">
                Controlled Item 1
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              Synced with external React state.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tab-2">
            <AccordionHeader>
              <AccordionTrigger className="w-full">
                Controlled Item 2
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              Change my state via the buttons above.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-[10px] font-mono text-text-secondary">
          Current State: &quot;{val}&quot;
        </div>
      </div>
    );
  },
};
