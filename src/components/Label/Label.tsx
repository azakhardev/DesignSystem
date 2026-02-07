import { cn } from "../../lib/utils";

interface LabelProps extends React.ComponentProps<"label"> {
  disabled?: boolean;
  error?: boolean;
}

function Label({
  children,
  className,
  disabled,
  error,
  ref,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none select-none cursor-pointer",
        disabled && "cursor-not-allowed opacity-70",
        error && "text-error-text",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
export type { LabelProps };
