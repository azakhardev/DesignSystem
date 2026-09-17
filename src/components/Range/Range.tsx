import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

export type RangeValue = {
  id: string;
  value: number;
  label?: string;
};

interface RangeContextType {
  max: number;
  min: number;
  step: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  updateValue: (id: string, newValue: number) => void;
  values: RangeValue[];
}

const RangeContext = createContext<RangeContextType | null>(null);

function useRangeContext() {
  const context = useContext(RangeContext);
  if (!context) {
    throw new Error("Range components must be used within a <Range> provider");
  }
  return context;
}

interface RangeProps {
  children: React.ReactNode;
  /** Array of values determining how many thumbs exist and their default state */
  defaultValues?: RangeValue[];
  /** Maximal value on the track */
  max?: number;
  /** Minimal value on the track */
  min?: number;
  /** Callback fired whenever any value changes. Use this to extract data! */
  onValueChange?: (values: RangeValue[]) => void;
  /** How big is the step between numbers */
  step?: number;
  /** Provide values to control the component externally (e.g., from a form state) */
  values?: RangeValue[];
}

function Range({
  children,
  defaultValues = [],
  max = 100,
  min = 0,
  onValueChange,
  step = 1,
  values: controlledValues,
}: RangeProps) {
  const isControlled = controlledValues !== undefined;
  const [uncontrolledValues, setUncontrolledValues] =
    useState<RangeValue[]>(defaultValues);

  const values = isControlled ? controlledValues : uncontrolledValues;
  const trackRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback(
    (id: string, newValue: number) => {
      const currentValues = isControlled
        ? controlledValues
        : uncontrolledValues;
      const itemIndex = currentValues.findIndex((v) => v.id === id);

      if (itemIndex === -1) return;

      // Clamp the new value so it cannot cross the preceding or succeeding thumbs
      const minClamp =
        itemIndex === 0 ? min : currentValues[itemIndex - 1].value;
      const maxClamp =
        itemIndex === currentValues.length - 1
          ? max
          : currentValues[itemIndex + 1].value;

      // Apply clamping and rounding to nearest step
      let clampedValue = Math.max(minClamp, Math.min(maxClamp, newValue));
      clampedValue = Math.round(clampedValue / step) * step;

      const nextValues = [...currentValues];
      nextValues[itemIndex] = { ...nextValues[itemIndex], value: clampedValue };

      if (!isControlled) {
        setUncontrolledValues(nextValues);
      }
      onValueChange?.(nextValues);
    },
    [
      min,
      max,
      step,
      isControlled,
      controlledValues,
      uncontrolledValues,
      onValueChange,
    ],
  );

  return (
    <RangeContext.Provider
      value={{ max, min, step, trackRef, updateValue, values }}
    >
      {children}
    </RangeContext.Provider>
  );
}

interface RangeSliderProps extends React.ComponentProps<"div"> {
  /** If true, dynamically generates tick marks aligned precisely to the track */
  showMarks?: boolean;
  /** Color of the track */
  trackColor?: string;
}

function RangeSlider({
  children,
  className,
  showMarks = false,
  trackColor,
  ...props
}: RangeSliderProps) {
  const { max, min, step, trackRef, values } = useRangeContext();

  const isSingleThumb = values.length === 1;
  const firstPercent = isSingleThumb
    ? 0
    : ((values[0]?.value - min) / (max - min)) * 100;
  const lastPercent =
    ((values[values.length - 1]?.value - min) / (max - min)) * 100;

  // Generate mark positions based on step
  const marks = [];
  if (showMarks && step > 0) {
    for (let i = min; i <= max; i += step) {
      marks.push(i);
    }
  }

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative h-2 w-full rounded-full bg-surface-secondary",
          className,
        )}
        ref={trackRef}
        {...props}
      >
        {/* Active Track */}
        <div
          className="absolute top-0 h-full rounded-full bg-primary"
          style={{
            backgroundColor: trackColor,
            left: `${firstPercent}%`,
            width: `${lastPercent - firstPercent}%`,
          }}
        />

        {/* Generated Stepper Marks */}
        {showMarks &&
          marks.map((mark) => {
            const percentage = ((mark - min) / (max - min)) * 100;
            return (
              <div
                className="absolute top-full mt-2 flex -translate-x-1/2 flex-col items-center gap-1"
                key={mark}
                style={{ left: `${percentage}%` }}
              >
                <div className="h-1 w-px bg-border" />
                <span className="text-xs font-medium text-text-secondary">
                  {mark}
                </span>
              </div>
            );
          })}

        {children}
      </div>
    </div>
  );
}

interface RangeItemProps extends Omit<React.ComponentProps<"button">, "id"> {
  /** Required id to map RangeItem to the value state */
  id: string;
  /** Whether to show a floating tooltip above the thumb when interacting */
  showTooltip?: boolean;
}

function RangeItem({
  className,
  id,
  onKeyDown,
  showTooltip = false,
  ...props
}: RangeItemProps) {
  const { max, min, step, trackRef, updateValue, values } = useRangeContext();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const valueObj = values.find((v) => v.id === id);
  const value = valueObj?.value ?? min;

  const percentage = ((value - min) / (max - min)) * 100;

  function handlePointerDown(e: React.PointerEvent) {
    e.preventDefault();
    setIsDragging(true);
    const track = trackRef.current;
    if (!track) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    function handlePointerMove(moveEvent: PointerEvent) {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const percent = (moveEvent.clientX - rect.left) / rect.width;
      const newValue = min + percent * (max - min);
      updateValue(id, newValue);
    }

    function handlePointerUp() {
      setIsDragging(false);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    }

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      updateValue(id, value + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      updateValue(id, value - step);
    }
    onKeyDown?.(e);
  }

  return (
    <button
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      className={cn(
        "flex h-5.5 w-5.5 items-center justify-center rounded-full border border-border-strong bg-surface shadow-sm ",
        "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:cursor-grabbing",
        className,
      )}
      onBlur={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      role="slider"
      style={{ left: `${percentage}%` }}
      type="button"
      {...props}
    >
      {/* Tooltip */}
      {showTooltip && (isDragging || isHovered) && (
        <div className="absolute bottom-full mb-2 flex items-center justify-center rounded bg-surface px-2 py-1 text-xs font-bold text-on-surface shadow-md">
          {valueObj?.label ?? value}
          <div className="absolute top-full h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-surface" />
        </div>
      )}
    </button>
  );
}

interface RangeInputProps extends Omit<
  React.ComponentProps<"input">,
  "id" | "value" | "onChange"
> {
  id: string;
}

function RangeInput({ className, id, ...props }: RangeInputProps) {
  const { step, updateValue, values } = useRangeContext();
  const valueObj = values.find((v) => v.id === id);

  const [localValue, setLocalValue] = useState(
    valueObj?.value.toString() ?? "",
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(valueObj?.value.toString() ?? "");
  }, [valueObj?.value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalValue(e.target.value);
  }

  function handleBlur() {
    const num = parseFloat(localValue);
    if (!isNaN(num)) {
      updateValue(id, num);
    } else {
      setLocalValue(valueObj?.value.toString() ?? "");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleBlur();
  }

  return (
    <input
      className={cn(
        "w-16 rounded-md border border-border bg-input-background px-2 py-1 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary",
        className,
      )}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      step={step}
      type="number"
      value={localValue}
      {...props}
    />
  );
}

export { Range, RangeInput, RangeItem, RangeSlider };
