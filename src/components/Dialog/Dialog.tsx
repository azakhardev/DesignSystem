import {
  useContext,
  useState,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { cn } from "../../lib/utils";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { Button, type ButtonVariants } from "../Button";
import { cva, type VariantProps } from "class-variance-authority";

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function Dialog({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  defaultOpen = false,
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
    <DialogContext.Provider value={{ open, onOpenChange }}>
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
    variants: {
      position: {
        bottom: "w-full h-3/4 md:h-1/3 rounded-t-lg bottom-0",
        center: "relative w-[90%] h-[90%] md:w-1/2 md:h-1/3 rounded-lg",
        left: "w-[85%] md:w-1/3 h-full rounded-r-lg left-0 px-3",
        right: "w-[85%] md:w-1/3 h-full rounded-l-lg right-0 px-3",
        top: "w-full h-3/4 md:h-1/3 rounded-b-lg top-0",
      },
    },
    defaultVariants: {
      position: "center",
    },
  },
);

type DialogContentVariantsType = VariantProps<typeof dialogContentVariants>;

interface DialogContentProps
  extends Omit<HTMLMotionProps<"div">, "children">, DialogContentVariantsType {
  closeButton?: boolean;
  children?: React.ReactNode;
}

const dialogAnimations: Record<string, HTMLMotionProps<"div">> = {
  center: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: [0, 1.05, 1] },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function DialogContent({
  className,
  ref,
  children,
  position,
  closeButton = false,
  ...props
}: DialogContentProps) {
  const { open, onOpenChange } = useDialogContext();

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
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="fixed inset-0 bg-black/70"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            className={cn(dialogContentVariants({ position }), className)}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            {...animationProps}
            ref={ref}
            {...props}
          >
            {children}
            {closeButton && (
              <button
                className="absolute top-4 right-4 hover:scale-105 hover:text-primary transition-all cursor-pointer"
                onClick={() => onOpenChange(false)}
                aria-label="Close dialog"
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
  title?: string;
  subtitle?: string;
}

function DialogHeader({
  className,
  children,
  ref,
  title,
  subtitle,
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
  className,
  children,
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
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex-1 overflow-y-auto min-h-0", className)} {...props}>
      {children}
    </div>
  );
}

function DialogButtons({
  className,
  children,
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogButtons,
  DialogBody,
};
export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogContentVariantsType,
  DialogHeaderProps,
  DialogFooterProps,
};
