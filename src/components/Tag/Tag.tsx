import { cn } from "../../lib/utils";

interface TagProps extends React.ComponentProps<"span"> {
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

function Tag({ children, className, icon, onIconClick, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md text-text bg-border border-2 px-3 py-0.5 border-dashed border-border-strong",
        icon && "pr-1",
        className,
      )}
      {...props}
    >
      <span className="leading-none">{children}</span>

      {icon && (
        <button
          className={cn(
            "flex flex-col items-center justify-center shrink-0 transition-colors hover:cursor-pointer hover:text-primary-focus",
          )}
          onClick={onIconClick}
          type="button"
        >
          {icon}
        </button>
      )}
    </span>
  );
}

export { Tag };
