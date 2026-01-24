import { cn } from "../../../lib/utils";
import { motion, stagger } from "framer-motion";
import type { Variants } from "framer-motion";

interface ScreenLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  barHeight: number;
  barWidth?: number;
  color?: string;
  duration?: number;
  barCount?: number;
  itemStagger?: number;
}

function ScreenLoader({
  className,
  barHeight,
  barWidth = 16,
  color,
  duration,
  barCount = 5,
  itemStagger = 0.15,
  ...props
}: ScreenLoaderProps) {
  const minHeight = Math.max(10, barHeight / 4);

  const containerVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: stagger(itemStagger),
      },
    },
  };

  const itemVariants: Variants = {
    initial: {
      height: minHeight,
    },
    animate: {
      height: [minHeight, barHeight, minHeight],
      transition: {
        ease: "easeInOut",
        repeat: Infinity,
        duration: duration ? duration : barCount * 0.3,
      },
    },
  };

  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <motion.ul
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-row gap-4 h-full w-full items-center justify-center"
        style={{ height: barHeight }}
      >
        {bars.map((i) => (
          <motion.li
            variants={itemVariants}
            style={{
              backgroundColor: color ?? "var(--primary)",
              width: barWidth,
              borderRadius: barWidth / 2,
            }}
            key={i}
          ></motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export { ScreenLoader };
export type { ScreenLoaderProps };
