import { cn } from "../../lib/utils";
import styles from "./Skeleton.module.css";

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "rect" | "circle";
}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-gray-600 relative overflow-hidden",
        variant === "circle" ? "rounded-full" : "rounded-md",
        styles.skeleton,
        className,
      )}
      role="status"
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
