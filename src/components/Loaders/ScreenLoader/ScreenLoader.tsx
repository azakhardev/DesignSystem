import type { Variants } from "framer-motion";
import { motion, stagger } from "framer-motion";

import { cn } from "../../../lib/utils";

interface ScreenLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  barCount?: number;
  barHeight: number;
  barWidth?: number;
  color?: string;
  duration?: number;
  itemStagger?: number;
}

function ScreenLoader({
  barCount = 5,
  barHeight,
  barWidth = 16,
  className,
  color,
  duration,
  itemStagger = 0.15,
  ...props
}: ScreenLoaderProps) {
  const minHeight = Math.max(10, barHeight / 4);

  const containerVariants: Variants = {
    animate: {
      opacity: 1,
      transition: {
        delayChildren: stagger(itemStagger),
      },
    },
    initial: {
      opacity: 0,
    },
  };

  const itemVariants: Variants = {
    animate: {
      height: [minHeight, barHeight, minHeight],
      transition: {
        duration: duration ? duration : barCount * 0.3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    initial: {
      height: minHeight,
    },
  };

  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div
      aria-label="Loading"
      className={cn("relative flex items-center justify-center", className)}
      role="status"
      {...props}
    >
      <motion.ul
        animate="animate"
        className="flex flex-row gap-4 h-full w-full items-center justify-center"
        initial="initial"
        style={{ height: barHeight }}
        variants={containerVariants}
      >
        {bars.map((i) => (
          <motion.li
            key={i}
            style={{
              backgroundColor: color ?? "var(--primary)",
              borderRadius: barWidth / 2,
              width: barWidth,
            }}
            variants={itemVariants}
          ></motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export { ScreenLoader };
export type { ScreenLoaderProps };
