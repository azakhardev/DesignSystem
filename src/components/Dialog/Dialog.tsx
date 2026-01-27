import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";
import { Button, type ButtonVariants } from "../Button";

interface DialogContextType {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const DialogContext = createContext<DialogContextType | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(
      "Dialog components (like DialogTrigger, DialogContent) must be used within a <Dialog> provider.",
    );
  }

  return context;
}

interface DialogProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

function Dialog({
  children,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  open: controlledOpen,
}: DialogProps) {
  // Internal state for uncontrolled mode
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  //Check if the dialog is controlled
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  //Manipulating state based on mode
  const onOpenChange = useCallback(
    (newOpen: boolean) => {
      if (isControlled) {
        controlledOnOpenChange?.(newOpen);
      } else {
        setUncontrolledOpen(newOpen);
      }
    },
    [isControlled, controlledOnOpenChange],
  );

  //Initialize context with values for used mode
  return (
    <DialogContext.Provider value={{ onOpenChange, open }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps
  extends React.ComponentProps<"button">, ButtonVariants {}

function DialogTrigger({
  children,
  ref,
  variant,
  ...props
}: DialogTriggerProps) {
  const { onOpenChange } = useDialogContext();

  return (
    <Button
      onClick={() => onOpenChange(true)}
      ref={ref}
      {...props}
      variant={variant}
    >
      {children}
    </Button>
  );
}

const dialogContentVariants = cva(
  "absolute flex flex-col bg-surface p-6 z-10 border-2 border-border",
  {
    defaultVariants: {
      position: "center",
    },
    variants: {
      position: {
        bottom: "w-full h-3/4 md:h-1/3 rounded-t-lg bottom-0",
        center: "relative w-[90%] h-[90%] md:w-1/2 md:h-1/3 rounded-lg",
        left: "w-[85%] md:w-1/3 h-full rounded-r-lg left-0 px-3",
        right: "w-[85%] md:w-1/3 h-full rounded-l-lg right-0 px-3",
        top: "w-full h-3/4 md:h-1/3 rounded-b-lg top-0",
      },
    },
  },
);

type DialogContentVariantsType = VariantProps<typeof dialogContentVariants>;

interface DialogContentProps
  extends Omit<HTMLMotionProps<"div">, "children">, DialogContentVariantsType {
  children?: React.ReactNode;
  closeButton?: boolean;
}

const dialogAnimations: Record<string, HTMLMotionProps<"div">> = {
  bottom: {
    animate: { y: 0 },
    exit: { y: "100%" },
    initial: { y: "100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  center: {
    animate: { opacity: 1, scale: [0, 1.05, 1] },
    exit: { opacity: 0, scale: 0.95 },
    initial: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  left: {
    animate: { x: 0 },
    exit: { x: "-100%" },
    initial: { x: "-100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  right: {
    animate: { x: 0 },
    exit: { x: "100%" },
    initial: { x: "100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  top: {
    animate: { y: 0 },
    exit: { y: "-100%" },
    initial: { y: "-100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function DialogContent({
  children,
  className,
  closeButton = false,
  position,
  ref,
  ...props
}: DialogContentProps) {
  const { onOpenChange, open } = useDialogContext();

  useEffect(() => {
    function closeOnEsc(ev: KeyboardEvent) {
      if (ev.key === "Escape") onOpenChange(false);
    }

    document.body.addEventListener("keydown", closeOnEsc);

    return () => document.body.removeEventListener("keydown", closeOnEsc);
  }, [onOpenChange]);

  const animationProps = dialogAnimations[position ?? "center"];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            aria-label="Close overlay"
            className="fixed inset-0 bg-black/70"
            onClick={() => onOpenChange(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onOpenChange(false);
            }}
            role="button"
            tabIndex={-1}
          />
          <motion.div
            aria-modal="true"
            className={cn(dialogContentVariants({ position }), className)}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            {...animationProps}
            ref={ref}
            {...props}
          >
            {children}
            {closeButton && (
              <button
                aria-label="Close dialog"
                className="absolute top-4 right-4 hover:scale-105 hover:text-primary transition-all cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <X size={32} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

interface DialogHeaderProps extends React.ComponentProps<"div"> {
  subtitle?: string;
  title?: string;
}

function DialogHeader({
  children,
  className,
  ref,
  subtitle,
  title,
  ...props
}: DialogHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b-2 border-text pb-1 mb-3",
        className,
      )}
      ref={ref}
      {...props}
    >
      {title && <h3 className="font-bold text-xl">{title}</h3>}
      {subtitle && <p className="text-text-secondary text-lg">{subtitle}</p>}
      {children}
    </div>
  );
}

interface DialogFooterProps extends React.ComponentProps<"div"> {
  text?: string;
}

function DialogFooter({
  children,
  className,
  ref,
  text,
  ...props
}: DialogFooterProps) {
  return (
    <div
      className={cn("flex border-y-2 border-text p-2 my-2", className)}
      ref={ref}
      {...props}
    >
      {text && <p className="w-full text-text italic text-center">{text}</p>}
      {children}
    </div>
  );
}

function DialogBody({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex-1 overflow-y-auto min-h-0", className)} {...props}>
      {children}
    </div>
  );
}

function DialogButtons({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full flex flex-row justify-end items-center gap-4 bottom-0",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Dialog,
  DialogBody,
  DialogButtons,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
};
export type {
  DialogContentProps,
  DialogContentVariantsType,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTriggerProps,
};
