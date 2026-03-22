import { cn } from "../../lib/utils";

function Kbd({ children, className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center font-mono select-none",
        "h-5 min-w-[1.5rem] px-1.5 text-sm font-medium leading-none",
        "bg-surface-subtle rounded shadow",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

function KbdGroup({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex flex-row gap-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Kbd, KbdGroup };
