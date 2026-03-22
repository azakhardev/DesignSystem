import { cn } from "../../lib/utils";

interface TagProps extends React.ComponentProps<"span"> {
  disabled?: boolean;
  icon?: React.ReactNode;
  iconAriaLabel?: string;
  onIconClick?: () => void;
  variant?: "dashed" | "solid";
}

function Tag({
  children,
  className,
  disabled,
  icon,
  iconAriaLabel = "Tag action",
  onIconClick,
  variant = "solid",
  ...props
}: TagProps) {
  const IconWrapper = onIconClick ? "button" : "span";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-all",
        "text-text bg-surface border-2 border-border-strong",
        "px-3 py-1 transition-all",
        variant === "dashed" && "border-dashed",
        disabled && "opacity-50 pointer-events-none",
        icon && "pr-1",
        className,
      )}
      {...props}
    >
      <span className="leading-none">{children}</span>

      {icon && (
        <IconWrapper
          aria-label={onIconClick ? iconAriaLabel : undefined}
          className={cn(
            "flex items-center justify-center shrink-0 transition-colors p-0.5 rounded-sm",
            "text-text-secondary",
            onIconClick
              ? "cursor-pointer hover:text-primary-focus hover:bg-black/5 dark:hover:bg-white/10"
              : "cursor-default select-none pointer-events-none",
          )}
          onClick={
            onIconClick
              ? (e) => {
                  e.stopPropagation();
                  onIconClick?.();
                }
              : undefined
          }
          type={onIconClick ? "button" : undefined}
        >
          {icon}
        </IconWrapper>
      )}
    </span>
  );
}

export { Tag };
