import type { Variants } from "framer-motion";
import { motion, stagger } from "framer-motion";

import { cn } from "../../../lib/utils";

interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  dotsCount?: number;
  duration?: number;
  gap?: number;
  itemStagger?: number;
  jumpHeight?: number;
  repeatDuration?: number;
  size?: number;
}

function Dots({
  className,
  color,
  dotsCount = 3,
  duration = 0.7,
  gap = 6,
  itemStagger = 0.2,
  jumpHeight = 15,
  repeatDuration = 0.5,
  size = 10,
  ...props
}: DotsProps) {
  const containerVariants: Variants = {
    animate: {
      transition: {
        delayChildren: stagger(itemStagger),
      },
    },
  };

  const itemVariants: Variants = {
    animate: {
      transition: {
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: repeatDuration,
      },
      y: [0, -jumpHeight, 0],
    },
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
      aria-label="Loading"
      role="status"
    >
      <motion.div
        animate="animate"
        className="flex flex-row w-full h-full"
        initial="initial"
        style={{ gap: gap }}
        variants={containerVariants}
      >
        {Array.from({ length: dotsCount }).map((_, i) => (
          <motion.div
            className="rounded-full border border-border"
            key={i}
            style={{
              backgroundColor: color ?? "var(--primary)",
              height: size,
              width: size,
            }}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
}

export { Dots };
export type { DotsProps };
