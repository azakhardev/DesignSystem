import { motion } from "framer-motion";
import type React from "react";
import { cn } from "../../../lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  duration?: number;
  primaryColor?: string;
  secondaryColor?: string;
  rotationsCount?: number;
  thickness?: number;
  ease?: "linear" | "easeInOut";
}

function Spinner({
  className,
  size = 72,
  duration = 2000,
  primaryColor,
  secondaryColor,
  rotationsCount = 5,
  thickness,
  ease = "easeInOut",
  ...props
}: SpinnerProps) {
  duration = duration < 250 ? 250 : duration;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      {...props}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: size,
          height: size,
          borderColor: primaryColor ?? "var(--primary)",
          borderTopColor: secondaryColor ?? "var(--secondary)",
          borderWidth: thickness ? thickness : size / 6,
        }}
        animate={{
          rotate: rotationsCount * 360,
        }}
        transition={{
          ease: ease,
          type: ease === "linear" ? undefined : "spring",
          duration: duration / 1000,
          repeat: Infinity,
        }}
      />
    </div>
  );
}

export { Spinner };
export type { SpinnerProps };
