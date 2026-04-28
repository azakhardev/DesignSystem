import { cloneElement, isValidElement, type SyntheticEvent } from "react";

import { cn } from "./utils";

function mergeEventHandlers<T extends SyntheticEvent<unknown, Event>>(
  original?: React.EventHandler<T>,
  override?: React.EventHandler<T>,
) {
  if (!original) return override;
  if (!override) return original;
  return (e: T) => {
    original(e);
    override(e);
  };
}

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

function Slot({ children, ...slotProps }: SlotProps) {
  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const childProps = children.props as Record<string, unknown>;

  // Merge event handlers, compose classNames, spread the rest
  const mergedProps = { ...childProps };

  for (const key of Object.keys(slotProps)) {
    if (
      key.startsWith("on") &&
      typeof slotProps[key as keyof typeof slotProps] === "function"
    ) {
      mergedProps[key] = mergeEventHandlers(
        childProps[key] as React.EventHandler<never>,
        slotProps[key as keyof typeof slotProps] as React.EventHandler<never>,
      );
    } else if (key === "className") {
      mergedProps.className = cn(
        slotProps.className,
        childProps.className as string,
      );
    } else if (key === "style") {
      mergedProps.style = {
        ...(slotProps.style ?? {}),
        ...(childProps.style ?? {}),
      };
    } else {
      mergedProps[key] = slotProps[key as keyof typeof slotProps];
    }
  }

  return cloneElement(children, mergedProps);
}

export default Slot;
