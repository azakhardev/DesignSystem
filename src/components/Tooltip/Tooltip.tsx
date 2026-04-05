import { createContext, use, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";
import { Card } from "../Card";
import styles from "./Tooltip.module.css";

const TooltipContext = createContext<TooltipContext | null>(null);

type TooltipContext = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  id: string;
};

function useTooltip() {
  const context = use(TooltipContext);

  if (!context) {
    throw new Error(
      "Components like TooltipContent and TooltipTrigger must be used within <Tooltip> component.",
    );
  }

  return context;
}

interface TooltipProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
}

function Tooltip({
  children,
  className,
  defaultOpen = false,
  ...props
}: TooltipProps) {
  const [visible, setVisible] = useState(defaultOpen);
  const id = useId().replace(/:/g, "");

  return (
    <TooltipContext.Provider value={{ id, setVisible, visible }}>
      <div className="inline-block relative" {...props}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

interface TooltipContentProps extends React.ComponentProps<"div"> {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

function TooltipContent({
  children,
  className,
  side = "top",
  sideOffset = 8,
  style,
  ...props
}: TooltipContentProps) {
  const { id, visible } = useTooltip();

  if (!visible) return null;

  return createPortal(
    <Card
      className={cn(styles.content, "shadow-sm p-2", className)}
      data-side={side}
      id={`tooltip-content-${id}`}
      role="tooltip"
      style={
        {
          "--side-offset": `${sideOffset}px`,
          positionAnchor: `--anchor-${id}`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Card>,
    document.body,
  );
}

interface TooltipTriggerProps extends React.ComponentProps<"button"> {
  delay?: number;
}

function TooltipTrigger({
  children,
  className,
  delay = 200,
  style,
  ...props
}: TooltipTriggerProps) {
  const { id, setVisible } = useTooltip();
  // useRef saves reference to "survive" re-renders
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  };

  return (
    <button
      aria-describedby={`tooltip-${id}`}
      className={cn(styles.trigger, className)}
      onBlur={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={
        {
          "--tooltip-anchor": `--anchor-${id}`,
          anchorName: `--anchor-${id}`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </button>
  );
}

export { Tooltip, TooltipContent, TooltipTrigger };
export type {
  TooltipContentProps,
  TooltipContext,
  TooltipProps,
  TooltipTriggerProps,
};
