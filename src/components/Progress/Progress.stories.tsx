import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useState } from "react";

import {
  Progress,
  ProgressBar,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
} from "./Progress";

/**
 * A highly customizable, compound Progress component powered by Framer Motion.
 * Uses React Context to synchronize values across subcomponents, ensuring
 * accessibility and consistent data display.
 */
const meta = {
  argTypes: {
    children: {
      control: false,
      description: "Compound components: Label, Bar, Indicator, and Value.",
    },
    maxValue: {
      control: { min: 1, type: "number" },
      description: "The maximum value representing 100% progress.",
      table: { defaultValue: { summary: "100" } },
    },
    value: {
      control: { min: 0, type: "number" },
      description: "The current progress value.",
      table: { defaultValue: { summary: "0" } },
    },
  },
  component: Progress,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    ProgressBar,
    ProgressIndicator,
    ProgressLabel,
    ProgressValue,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Components/Progress",
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard setup with a label on top, the progress bar in the middle,
 * and an autofilled value string at the bottom.
 */
export const Default: Story = {
  args: {
    maxValue: 100,
    value: 45,
  },
  render: (args) => (
    <Progress {...args} className="w-80">
      <ProgressLabel>Uploading Assets</ProgressLabel>
      <ProgressBar>
        <ProgressIndicator />
      </ProgressBar>
      <ProgressValue autofill />
    </Progress>
  ),
};

/**
 * Demonstrates the `autofill` prop with different formatting options.
 * Use `numbers` for raw data counts and `percents` for a ratio view.
 */
export const DataFormatting: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-80">
      <Progress maxValue={5000} value={2450}>
        <div className="flex justify-between items-center">
          <ProgressLabel>Raw Numbers</ProgressLabel>
          <ProgressValue autofill format="numbers" />
        </div>
        <ProgressBar>
          <ProgressIndicator className="bg-blue-500" />
        </ProgressBar>
      </Progress>

      <Progress maxValue={100} value={75}>
        <div className="flex justify-between items-center">
          <ProgressLabel>Percentages</ProgressLabel>
          <ProgressValue autofill format="percents" />
        </div>
        <ProgressBar>
          <ProgressIndicator className="bg-emerald-500" />
        </ProgressBar>
      </Progress>
    </div>
  ),
};

/**
 * Demonstrates various animation flavors using the `type` and `transition` props.
 * Choosing the right animation character can significantly impact the "feel" of your UI.
 */
export const AnimationVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-10 w-96">
      <div className="space-y-1">
        <Progress value={70}>
          <ProgressLabel className="text-sm font-mono uppercase text-text-secondary">
            Snappy Spring (Stiff)
          </ProgressLabel>
          <ProgressBar className="h-2">
            <ProgressIndicator
              className="bg-blue-500"
              transition={{ damping: 20, stiffness: 300 }}
              type="spring"
            />
          </ProgressBar>
        </Progress>
      </div>

      <div className="space-y-1">
        <Progress value={70}>
          <ProgressLabel className="text-sm font-mono uppercase text-text-secondary">
            Bouncy Spring (Playful)
          </ProgressLabel>
          <ProgressBar className="h-2">
            <ProgressIndicator
              className="bg-pink-500"
              transition={{ damping: 5, mass: 1, stiffness: 100 }}
              type="spring"
            />
          </ProgressBar>
        </Progress>
      </div>

      <div className="space-y-1">
        <Progress value={70}>
          <ProgressLabel className="text-sm font-mono uppercase text-text-secondary">
            Linear Tween (Predictable)
          </ProgressLabel>
          <ProgressBar className="h-2">
            <ProgressIndicator
              className="bg-emerald-500"
              duration={2}
              transition={{ ease: "linear" }}
              type="tween"
            />
          </ProgressBar>
        </Progress>
      </div>

      <div className="space-y-1">
        <Progress value={70}>
          <ProgressLabel className="text-sm font-mono uppercase text-text-secondary">
            Anticipate (Professional)
          </ProgressLabel>

          <ProgressBar className="h-2">
            <ProgressIndicator
              className="bg-amber-500"
              duration={1}
              transition={{ ease: "anticipate" }}
              type="tween"
            />
          </ProgressBar>
        </Progress>
      </div>
    </div>
  ),
};

/**
 * Simulates a real-time data stream. For rapid updates, I recommend a shorter
 * `duration` and a `tween` transition to prevent the animation from lagging behind the data.
 */
export const RealTimeStream: Story = {
  render: () => {
    const [val, setVal] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setVal((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 100);
      return () => clearInterval(interval);
    }, []);

    return (
      <Progress className="w-80" value={val}>
        <ProgressLabel>Processing Stream...</ProgressLabel>
        <ProgressBar className="h-1.5">
          <ProgressIndicator
            className="bg-sky-500"
            duration={0.1}
            transition={{ ease: "linear" }}
            type="tween"
          />
        </ProgressBar>
        <ProgressValue autofill format="percents" />
      </Progress>
    );
  },
};

/**
 * Compound components allow you to restructure the layout entirely.
 * Here, we put the labels and values inline with custom Tailwind styling.
 */
export const CustomLayout: Story = {
  render: () => (
    <Progress
      className="w-96 p-4 bg-surface border border-border rounded-xl"
      value={60}
    >
      <div className="flex items-center gap-4">
        <ProgressLabel className="shrink-0">Storage</ProgressLabel>
        <ProgressBar className="h-6 bg-surface-secondary border-none flex-1">
          <ProgressIndicator className="bg-orange-500 rounded-none shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]" />
        </ProgressBar>
        <ProgressValue
          autofill
          className="shrink-0 font-bold text-orange-500 self-auto"
          format="percents"
        />
      </div>
    </Progress>
  ),
};

/**
 * Showcases how to apply complex backgrounds like gradients or CSS patterns.
 * Since `ProgressIndicator` is a motion component, it accepts any Tailwind utility
 * or inline CSS for advanced styling.
 */
export const CustomStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-10 w-96">
      <Progress value={65}>
        <ProgressLabel>Vibrant Gradient</ProgressLabel>
        <ProgressBar className="h-6 rounded-full border-none bg-surface-secondary shadow-inner">
          <ProgressIndicator className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        </ProgressBar>
        <ProgressValue
          autofill
          className="font-bold text-purple-500"
          format="percents"
        />
      </Progress>

      <Progress value={85}>
        <ProgressLabel>Striped Pattern (CSS Custom)</ProgressLabel>
        <ProgressBar className="h-8 border-2 border-black bg-white rounded-none">
          <ProgressIndicator
            className="bg-orange-500 rounded-none"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)",
              backgroundSize: "40px 40px",
            }}
          />
        </ProgressBar>
        <ProgressValue autofill />
      </Progress>

      <Progress value={40}>
        <ProgressLabel>Neon Glow</ProgressLabel>
        <ProgressBar className="h-1 bg-slate-800 border-none overflow-visible">
          <ProgressIndicator className="bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </ProgressBar>
      </Progress>
    </div>
  ),
};
