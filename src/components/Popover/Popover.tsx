import { AnimatePresence, type HTMLMotionProps, motion } from "framer-motion";
import React, {
  createContext,
  use,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import Slot from "../../lib/Slot";
import { cn } from "../../lib/utils";
import styles from "./Popover.module.css";

type PopoverContextType = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  id: string;
  handleEnter: () => void;
  handleLeave: () => void;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

function usePopover() {
  const context = use(PopoverContext);

  if (!context) {
    throw new Error(
      "Components like PopoverContent and PopoverTrigger must be used within <Popover> component.",
    );
  }

  return context;
}

interface PopoverProps extends React.ComponentProps<"div"> {
  closeDelayDuration?: number;
  delayDuration?: number;
  mode?: "hover" | "click";
}

function Popover({
  children,
  closeDelayDuration,
  delayDuration,
  mode = "hover",
  ...props
}: PopoverProps) {
  const [visible, setVisible] = useState(false);
  const id = useId().replace(/:/g, "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (mode === "hover") {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(true), delayDuration);
    }
  };

  const handleLeave = () => {
    if (mode === "hover") {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(
        () => setVisible(false),
        closeDelayDuration,
      );
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <PopoverContext.Provider
      value={{ handleEnter, handleLeave, id, setVisible, visible }}
    >
      <div
        onBlur={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

//TODO: Select default position
function PopoverContent({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const { id, visible } = usePopover();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            styles.content,
            "flex flex-col gap-1",
            "rounded-md border bg-surface border-border shadow-sm p-2",
            className,
          )}
          exit={{ opacity: 0, scale: 0.5 }}
          id={`popover-content-${id}`}
          initial={{ opacity: 0, scale: 0.5 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface PopoverTriggerProps extends React.ComponentProps<"button"> {
  /**
   * Allows cloning the child element
   */
  asChild?: boolean;
}

function PopoverTrigger({
  asChild,
  children,
  className,
  style,
  ...props
}: PopoverTriggerProps) {
  const { handleEnter, handleLeave, id, setVisible } = usePopover();

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      aria-describedby={`popover-${id}`}
      className={cn(className)}
      onBlur={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={
        {
          "--popover-anchor": `--anchor-${id}`,
          anchorName: `--anchor-${id}`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Comp>
  );
}
export { Popover, PopoverContent, PopoverTrigger };
export type { PopoverContextType, PopoverProps, PopoverTriggerProps };
