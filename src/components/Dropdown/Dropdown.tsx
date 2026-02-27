import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronRightIcon, CircleDotIcon } from "lucide-react";
import { createContext, use, useEffect, useRef, useState } from "react";

import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { cn } from "../../lib/utils";

type DropdownContext = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  triggerAction: "click" | "hover";
};

const DropdownContext = createContext<DropdownContext | null>(null);

function useDropdown() {
  const context = use(DropdownContext);
  if (!context)
    throw new Error(
      "Components like DropdownTrigger, DropdownItem and DropdownMenu must be used within <Dropdown> component.",
    );
  return context;
}

interface DropdownProps extends React.ComponentProps<"div"> {
  onOpenChange?: (v: boolean) => void;
  open?: boolean;
  triggerAction?: "click" | "hover";
}

function Dropdown({
  children,
  className,
  onOpenChange,
  open,
  triggerAction = "click",
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open ?? false);

  const isControlled = open !== undefined;

  function handleOpen(v: boolean) {
    if (!isControlled) {
      setIsOpen(v);
    }
    onOpenChange?.(v);
  }

  const dropdownIsOpen = isControlled ? open : isOpen;

  return (
    <DropdownContext.Provider
      value={{ onOpenChange: handleOpen, open: dropdownIsOpen, triggerAction }}
    >
      <div
        className={cn("relative flex flex-col gap-1", className)}
        onMouseEnter={() => triggerAction === "hover" && handleOpen(true)}
        onMouseLeave={() => triggerAction === "hover" && handleOpen(false)}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { onOpenChange, open, triggerAction } = useDropdown();

  function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(ev);

    if (triggerAction === "click") {
      onOpenChange(true);
    }
  }

  return (
    <button
      aria-expanded={open}
      aria-haspopup="menu"
      className={cn(
        "p-2 bg-surface hover:bg-surface-secondary rounded-md border transition-all border-border-strong",
        className,
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

type DropdownItemProps<T extends React.ElementType> = {
  active?: boolean;
  as?: T;
  showIcon?: boolean;
  icon?: React.ReactNode;
  variant?: "button" | "link" | "checkbox" | "radio";
} & React.ComponentProps<T>;

function DropdownItem<T extends React.ElementType = "button">({
  active,
  as,
  children,
  className,
  icon,
  showIcon,
  variant = "button",
  ...props
}: DropdownItemProps<T>) {
  const Component = as ?? "button";

  const role =
    variant === "checkbox"
      ? "menuitemcheckbox"
      : variant === "radio"
        ? "menuitemradio"
        : "menuitem";

  const isButton = Component === "button";

  return (
    <Component
      aria-checked={
        variant === "checkbox" || variant === "radio" ? active : undefined
      }
      className={cn(
        "px-2 py-1 gap-2 flex flex-row items-center justify-between text-nowrap group hover:bg-surface-secondary focus:bg-surface-secondary outline-none",
        active && "font-bold",
        props.disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      role={role}
      tabIndex={-1}
      type={isButton ? "button" : undefined}
      {...props}
    >
      <div className="flex items-center gap-2">{children}</div>

      {showIcon && (
        <div className="flex items-center justify-center w-5 h-5">
          {icon ? (
            icon
          ) : (
            <>
              {variant === "link" && <ChevronRightIcon className="w-4 h-4" />}
              {(variant === "button" || variant === "checkbox") && active && (
                <CheckIcon className="w-4 h-4" />
              )}
              {variant === "radio" && active && (
                <CircleDotIcon className="w-4 h-4" />
              )}
            </>
          )}
        </div>
      )}
    </Component>
  );
}

const dropdownMenuVariants = cva(
  "absolute flex flex-col p-1 gap-1 bg-surface rounded border border-border shadow z-20 min-w-max",
  {
    defaultVariants: {
      position: "bottom-start",
    },
    variants: {
      position: {
        "bottom-center": "top-full left-1/2 -translate-x-1/2 mt-1",
        "bottom-end": "top-full right-0 mt-1",
        "bottom-start": "top-full left-0 mt-1",
        "left-center": "right-full -translate-y-1/2 top-1/2 mr-1",
        "left-end": "right-full -translate-y-full top-full mr-1",
        "left-start": "right-full top-0 mr-1",
        "right-center": "left-full -translate-y-1/2 top-1/2 ml-1",
        "right-end": "left-full -translate-y-full top-full ml-1",
        "right-start": "left-full top-0 ml-1",
        "top-center": "bottom-full left-1/2 -translate-x-1/2 mb-1",
        "top-end": "bottom-full right-0 mb-1",
        "top-start": "bottom-full left-0 mb-1",
      },
    },
  },
);

interface DropdownMenuProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof dropdownMenuVariants> {}

function DropdownMenu({
  children,
  className,
  position,
  ...props
}: DropdownMenuProps) {
  const { onOpenChange, open } = useDropdown();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => onOpenChange(false));
  useEscapeKey(() => onOpenChange(false));

  useEffect(() => {
    if (!open) return;

    function handleArrowKey(ev: KeyboardEvent) {
      if (!ref.current) return;

      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault();

        const items = Array.from(
          ref.current.querySelectorAll('[role^="menuitem"]'),
        ) as HTMLElement[];

        if (!items.length) return;

        const currentIndex = items.indexOf(
          document.activeElement as HTMLElement,
        );
        let nextIndex = 0;

        if (ev.key === "ArrowDown") {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else if (ev.key === "ArrowUp") {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        items[nextIndex]?.focus();
      }
    }

    document.body.addEventListener("keydown", handleArrowKey);

    return () => {
      document.body.removeEventListener("keydown", handleArrowKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      aria-orientation="vertical"
      className={cn(dropdownMenuVariants({ position }), className)}
      ref={ref}
      role="menu"
      {...props}
    >
      {children}
    </div>
  );
}

export { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger };
export type { DropdownItemProps, DropdownProps };
