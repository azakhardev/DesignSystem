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
  mode: "hover" | "click";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!visible) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);


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

  const handleBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget &&
      !wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setVisible(false);
    }
  };

  return (
    <PopoverContext.Provider
      value={{ handleEnter, handleLeave, mode, id, setVisible, visible }}
    >
      <div
        ref={wrapperRef}
        onBlur={handleBlur}
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
  const { id, visible, handleEnter, handleLeave } = usePopover();

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
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
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
  onClick,
  onFocus,
  style,
  ...props
}: PopoverTriggerProps) {
  const { handleEnter, handleLeave, id, setVisible, mode } = usePopover();

  const Comp = asChild ? Slot : "button";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (mode === "click") {
      setVisible(true);
    }
    if (onClick) onClick(e as any);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (mode === "hover") {
      setVisible(true);
    }
    if (onFocus) onFocus(e as any);
  };

  return (
    <Comp
      aria-describedby={`popover-${id}`}
      className={cn(className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      onFocus={handleFocus}
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
