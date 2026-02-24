import { createContext, use, useState } from "react";

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

function Dropdown({ children, onOpenChange, open }: DropdownProps) {
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
      <div>{children}</div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps extends React.ComponentProps<"button"> {
  triggerAction?: "hover" | "click";
}

function DropdownTrigger({
  children,
  triggerAction = "click",
  ...props
}: DropdownTriggerProps) {
  const { onOpenChange, open } = useDropdown();

  return (
    <button onClick={() => onOpenChange(!open)} {...props}>
      {children}
    </button>
  );
}

type DropdownItemProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentProps<T>;

function DropdownItem<T extends React.ElementType = "button">({
  as,
  children,
  ...props
}: DropdownItemProps<T>) {
  const Component = as ?? "button";

  return (
    <Component role="menuitem" {...props}>
      {children}
    </Component>
  );
}

function DropdownMenu({ children, ...props }: React.ComponentProps<"div">) {
  const { open } = useDropdown();
  if (!open) return null;
  return (
    <div role="menu" {...props}>
      {children}
    </div>
  );
}

export { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger };
export type { DropdownItemProps, DropdownProps, DropdownTriggerProps };
