import { motion } from "framer-motion";
import type React from "react";

import { cn } from "../../../lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  ease?: "linear" | "easeInOut";
  primaryColor?: string;
  rotationsCount?: number;
  secondaryColor?: string;
  size?: number;
  thickness?: number;
}

function Spinner({
  className,
  duration = 2,
  ease = "easeInOut",
  primaryColor,
  rotationsCount = 5,
  secondaryColor,
  size = 72,
  thickness,
  ...props
}: SpinnerProps) {
  duration = duration < 0.25 ? 0.25 : duration;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      {...props}
      aria-label="Loading"
      role="status"
    >
      <motion.div
        animate={{
          rotate: rotationsCount * 360,
        }}
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{
          borderColor: primaryColor ?? "var(--primary)",
          borderTopColor: secondaryColor ?? "var(--secondary)",
          borderWidth: thickness ? thickness : size / 6,
          height: size,
          width: size,
        }}
        transition={{
          duration: duration,
          ease: ease,
          repeat: Infinity,
          type: ease === "linear" ? undefined : "spring",
        }}
      />
    </div>
  );
}

export { Spinner };
export type { SpinnerProps };
