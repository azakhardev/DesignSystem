import { CheckIcon, ChevronRightIcon, CircleDotIcon } from "lucide-react";
import { createContext, use, useRef, useState } from "react";

import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { cn } from "../../lib/utils";

type DropdownContext = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
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
}

function Dropdown({ children, className, onOpenChange, open }: DropdownProps) {
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
      value={{ onOpenChange: handleOpen, open: dropdownIsOpen }}
    >
      <div className={cn("relative flex flex-col gap-1", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps extends React.ComponentProps<"button"> {
  triggerAction?: "hover" | "click";
}

function DropdownTrigger({
  children,
  className,
  triggerAction = "click",
  ...props
}: DropdownTriggerProps) {
  const { onOpenChange } = useDropdown();

  //TODO: Fix hover open state

  return (
    <button
      className={cn(
        "p-2 bg-surface hover:bg-surface-secondary rounded-md border transition-all border-border-strong",
        className,
      )}
      onClick={() => triggerAction === "click" && onOpenChange(true)}
      onMouseEnter={() => triggerAction === "hover" && onOpenChange(true)}
      onMouseLeave={() => triggerAction === "hover" && onOpenChange(false)}
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

  //TODO: On hover style

  return (
    <Component
      className={cn(
        "px-2 py-1 gap-2 flex flex-row items-center justify-between text-nowrap group hover:underline",
        active && "font-bold",
        className,
      )}
      role="menuitem"
      {...props}
    >
      <div className="flex items-center gap-2">{children}</div>

      {showIcon && (
        <div className="flex items-center justify-center w-5 h-5">
          {icon ? (
            icon
          ) : (
            <>
              {variant === "link" && <ChevronRightIcon />}

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

function DropdownMenu({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { onOpenChange, open } = useDropdown();
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => onOpenChange(false));
  useEscapeKey(() => onOpenChange(false));

  if (!open) return null;

  //TOOD: Style anchor using CSS module
  return (
    <div
      className={cn(
        "absolute top-full flex flex-col p-1 gap-1 bg-surface rounded border border-border shadow z-20",
        className,
      )}
      ref={ref}
      role="menu"
      {...props}
    >
      {children}
    </div>
  );
}

export { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger };
export type { DropdownItemProps, DropdownProps, DropdownTriggerProps };
