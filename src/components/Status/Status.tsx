import { cn } from "../../lib/utils";
import styles from "./Status.module.css";

interface StatusProps extends React.ComponentProps<"div"> {
  speed?: "slow" | "normal" | "fast" | number;
  variant?: "default" | "heartbeat";
}

const SPEED_MAP = {
  fast: "0.7s",
  normal: "1.3s",
  slow: "2.5s",
};

function Status({
  className,
  speed = "normal",
  style,
  variant = "default",
  ...props
}: StatusProps) {
  const duration = typeof speed === "number" ? `${speed}ms` : SPEED_MAP[speed];

  return (
    <div
      className={cn(
        "size-3 rounded-full bg-disabled-surface",
        styles.status,
        variant === "heartbeat" && styles.heartbeat,
        className,
      )}
      role="status"
      style={
        {
          ...style,
          "--status-duration": duration,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Status };
