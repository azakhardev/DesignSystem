import { cn } from "../../lib/utils";

interface SeparatorProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
}

function Separator({
  children,
  className,
  orientation = "horizontal",
  style,
  thickness = 1,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  if (thickness <= 0) {
    thickness = 1;
  }

  return (
    <div
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-text rounded",
        isHorizontal ? "w-full" : "h-full",
        className,
      )}
      role="separator"
      style={{
        [isHorizontal ? "height" : "width"]: `${thickness}px`,
        ...style,
      }}
      {...props}
      {...props}
    >
      {children}
    </div>
  );
}

export { Separator };
export type { SeparatorProps };
