import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type TargetAndTransition,
} from "framer-motion";
import { CircleQuestionMark } from "lucide-react";
import { createContext, use, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import Slot from "../../lib/Slot";
import { cn } from "../../lib/utils";
import styles from "./Tooltip.module.css";

const TooltipContextType = createContext<TooltipContextType | null>(null);

type TooltipContextType = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  id: string;
  handleEnter: () => void;
  handleLeave: () => void;
};

function useTooltip() {
  const context = use(TooltipContextType);

  if (!context) {
    throw new Error(
      "Components like TooltipContent and TooltipTrigger must be used within <Tooltip> component.",
    );
  }

  return context;
}

interface TooltipProps {
  children: React.ReactNode;
  closeDelayDuration?: number;
  delayDuration?: number;
}

function Tooltip({
  children,
  closeDelayDuration = 100,
  delayDuration = 200,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId().replace(/:/g, "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), delayDuration);
  };

  const handleLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), closeDelayDuration);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <TooltipContextType.Provider
      value={{ handleEnter, handleLeave, id, setVisible, visible }}
    >
      {children}
    </TooltipContextType.Provider>
  );
}

const ANIMATIONS: Record<string, TargetAndTransition> = {
  bottom: { opacity: 0, scale: 0.92, y: -10 },
  left: { opacity: 0, scale: 0.92, x: 10 },
  right: { opacity: 0, scale: 0.92, x: -10 },
  top: { opacity: 0, scale: 0.92, y: 10 },
};

const TRANSFORM_ORIGINS: Record<string, string> = {
  bottom: "top center",
  left: "right center",
  right: "left center",
  top: "bottom center",
};

interface TooltipContentProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Side at which Tooltip will appear
   */
  side?: "top" | "bottom" | "left" | "right";
  /**
   * Offset of the Tooltip from the trigger
   */
  sideOffset?: number;
  text: string;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 8,
  style,
  text,
  ...props
}: TooltipContentProps) {
  const { handleEnter, handleLeave, id, visible } = useTooltip();

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          className={cn(
            styles.content,
            "rounded-md border bg-surface border-border shadow-sm p-2",
            className,
          )}
          data-side={side}
          exit={{
            ...ANIMATIONS[side],
            transition: { duration: 0.1, ease: "easeIn" },
          }}
          id={`tooltip-content-${id}`}
          initial={ANIMATIONS[side]}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          role="tooltip"
          style={
            {
              "--side-offset": `${sideOffset}px`,
              positionAnchor: `--anchor-${id}`,
              ...style,
              transformOrigin: TRANSFORM_ORIGINS[side],
            } as React.CSSProperties
          }
          transition={{
            bounce: 0.25,
            duration: 0.2,
            type: "spring",
          }}
          {...props}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

interface TooltipTriggerProps extends React.ComponentProps<"button"> {
  /**
   * Allows cloning the child element
   */
  asChild?: boolean;
}

function TooltipTrigger({
  asChild,
  children,
  className,
  style,
  ...props
}: TooltipTriggerProps) {
  const { handleEnter, handleLeave, id, setVisible } = useTooltip();

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
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
      {children ? (
        children
      ) : (
        <CircleQuestionMark
          className="cursor-pointer text-text-secondary"
          size={20}
        />
      )}
    </Comp>
  );
}

export { Tooltip, TooltipContent, TooltipTrigger };
export type {
  TooltipContentProps,
  TooltipContextType as TooltipContext,
  TooltipProps,
  TooltipTriggerProps,
};
