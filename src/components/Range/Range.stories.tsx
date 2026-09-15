import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bookmark, Scissors } from "lucide-react";
import { useState } from "react";

import {
  Range,
  RangeInput,
  RangeItem,
  RangeSlider,
  type RangeValue,
} from "./Range";

/**
 * The **Range** component suite provides a highly flexible, accessible, and robust architecture for building any type of slider or range input.
 *
 * Built using the **Compound Component** pattern, it strictly separates the mathematical state management from the visual representation. This allows you to freely compose tracks, draggable thumbs, and text inputs in completely custom layouts without breaking the core logic.
 *
 * ### Key Features
 * - **Unlimited Thumbs:** Render a single thumb for volume, two for a price filter, or several for a video timeline trimmer.
 * - **Smart Collision Prevention:** Thumbs intelligently block each other from crossing and clamp perfectly to the defined `min` and `max` boundaries.
 * - **Fully Accessible:** Native keyboard navigation (Arrow Keys) works out of the box, along with complete ARIA slider attributes (`role="slider"`, `aria-valuenow`, etc.).
 * - **Synchronized Inputs:** The `<RangeInput>` component automatically syncs with the slider state, allowing users to safely type exact numeric values.
 * - **Controlled & Uncontrolled:** Use `defaultValues` for "fire and forget" setups, or `values` + `onValueChange` to easily plug into external form libraries like React Hook Form.
 * - **Precision Stepping & Marks:** Snap values to a specific `step` size. Enable `showMarks` on the slider to automatically generate perfectly aligned visual ticks.
 * - **Interactive Tooltips:** Add the `showTooltip` prop to thumbs to reveal dynamic value bubbles while hovering or dragging.
 */
const meta = {
  argTypes: {
    max: {
      control: "number",
      description: "Maximal value on the track.",
      table: { defaultValue: { summary: "100" } },
    },
    min: {
      control: "number",
      description: "Minimal value on the track.",
      table: { defaultValue: { summary: "0" } },
    },
    step: {
      control: "number",
      description: "The increment/decrement step size.",
      table: { defaultValue: { summary: "1" } },
    },
  },
  component: Range,
  parameters: { layout: "centered" },
  subcomponents: {
    RangeInput,
    RangeItem,
    RangeSlider,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Form/Range",
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ### Standard Single Slider
 * The simplest use case of Range, with input attached to it.
 */
export const SingleThumb: Story = {
  args: {
    children: <div>Empty</div>,
    max: 100,
    min: 0,
    step: 1,
  },
  render: (args) => (
    <div className="flex w-75 items-center gap-4">
      <Range {...args} defaultValues={[{ id: "volume", value: 50 }]}>
        <RangeSlider>
          {/* Add showTooltip to reveal the floating value! */}
          <RangeItem id="volume" showTooltip />
        </RangeSlider>
        <RangeInput id="volume" />
      </Range>
    </div>
  ),
};

/**
 * ### Stepped Slider (Rating/Discrete)
 * By using `showMarks={true}` on the `RangeSlider`, the component automatically
 * generates perfectly aligned ticks based on your `min`, `max`, and `step` values.
 */
export const Stepped: Story = {
  args: {
    children: <div>Empty</div>,
    max: 5,
    min: 1,
    step: 1,
  },
  render: (args) => {
    return (
      <div className="w-75 pb-4">
        <Range {...args} defaultValues={[{ id: "rating", value: 3 }]}>
          <RangeSlider showMarks>
            <RangeItem id="rating" showTooltip />
          </RangeSlider>
        </Range>
      </div>
    );
  },
};

/**
 * ### Controlled Form State
 * Example of how to extract data. By providing `values` and `onValueChange`,
 * you can easily plug the Range component into external forms.
 */
export const Controlled: Story = {
  args: {
    children: <div>Empty</div>,
    max: 100,
    min: 0,
    step: 5,
  },
  render: (args) => {
    const [state, setState] = useState<RangeValue[]>([
      { id: "min", value: 20 },
      { id: "max", value: 80 },
    ]);

    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-md bg-surface-secondary p-3 text-sm font-mono text-text">
          <strong>Extracted State:</strong> <br />
          Min: {state.find((s) => s.id === "min")?.value} <br />
          Max: {state.find((s) => s.id === "max")?.value}
        </div>

        <Range {...args} onValueChange={setState} values={state}>
          <div className="flex w-100 flex-col gap-6 rounded-lg border border-border bg-surface p-6 shadow-sm">
            <h4 className="font-medium text-text">Select Range</h4>
            <RangeSlider>
              <RangeItem id="min" showTooltip />
              <RangeItem id="max" showTooltip />
            </RangeSlider>
          </div>
        </Range>
      </div>
    );
  },
};

/**
 * ### Multi-Thumb (Video Trimmer)
 * The component math supports as many nodes as you want to pass into it.
 * This example uses 4 thumbs to represent video trim boundaries and internal chapter markers.
 */
export const MultiThumb: Story = {
  args: {
    children: <div>Empty</div>,
    max: 120, // 2 minutes max
    min: 0,
    step: 1,
  },
  render: (args) => {
    const [markers, setMarkers] = useState<RangeValue[]>([
      { id: "start", value: 10 },
      { id: "chapter1", value: 35 },
      { id: "chapter2", value: 65 },
      { id: "end", value: 90 },
    ]);

    const formatTime = (seconds: number | undefined) => {
      if (seconds === undefined) return "0:00";
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
      <div className="flex w-125 flex-col gap-8 rounded-lg border border-border bg-surface p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scissors className="h-5 w-5 text-primary" />
            <h4 className="font-medium text-text">Video Trimmer & Chapters</h4>
          </div>
          <p className="text-sm text-text-secondary">
            Drag the start/end boundaries and internal chapter markers. They
            will automatically prevent collisions.
          </p>
        </div>

        <Range {...args} onValueChange={setMarkers} values={markers}>
          {/* We can customize the track color to signify the "kept" video portion */}
          <RangeSlider className="my-2" trackColor="var(--primary)">
            {/* Trim Bounds */}
            <RangeItem id="start" showTooltip />

            {/* Chapter Markers (Custom styled to look different) */}
            <RangeItem
              className="h-4 w-4 bg-warning border-warning shadow-md rounded-sm"
              id="chapter1"
              showTooltip
            />
            <RangeItem
              className="h-4 w-4 bg-warning border-warning shadow-md rounded-sm"
              id="chapter2"
              showTooltip
            />

            {/* Trim Bounds */}
            <RangeItem id="end" showTooltip />
          </RangeSlider>
        </Range>

        {/* Dynamic Data Display */}
        <div className="grid grid-cols-2 gap-4 rounded-md bg-surface-secondary p-4 text-sm text-text">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase text-text-secondary">
              Trim Start
            </span>
            <span className="font-mono">
              {formatTime(markers.find((m) => m.id === "start")?.value)}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-xs font-medium uppercase text-text-secondary">
              Trim End
            </span>
            <span className="font-mono">
              {formatTime(markers.find((m) => m.id === "end")?.value)}
            </span>
          </div>
          <div className="col-span-2 mt-2 border-t border-border pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Bookmark className="h-4 w-4 text-warning" />
              <span className="text-xs font-medium uppercase text-text-secondary">
                Chapters
              </span>
            </div>
            <div className="flex justify-between font-mono">
              <span>
                #1 at{" "}
                {formatTime(markers.find((m) => m.id === "chapter1")?.value)}
              </span>
              <span>
                #2 at{" "}
                {formatTime(markers.find((m) => m.id === "chapter2")?.value)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
