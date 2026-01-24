import { cn } from "../../../lib/utils";
import { motion, stagger } from "framer-motion";
import type { Variants } from "framer-motion";

interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  dotRadius?: number;
  dotsCount?: number;
  duration?: number;
  gap?: number;
  itemStagger?: number;
  jumpHeight?: number;
  repeatDuration?: number;
}

function Dots({
  className,
  color,
  dotRadius = 10,
  dotsCount = 3,
  duration = 0.7,
  gap = 6,
  itemStagger = 0.2,
  jumpHeight = 15,
  repeatDuration = 0.5,
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
      y: [0, -jumpHeight, 0],
      transition: {
        ease: "easeInOut",
        repeat: Infinity,
        duration: duration,
        repeatDelay: repeatDuration,
      },
    },
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        className="flex flex-row w-full h-full"
        style={{ gap: gap }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: dotsCount }).map((_, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="rounded-full border border-border"
            style={{
              height: dotRadius * 2,
              width: dotRadius * 2,
              backgroundColor: color ?? "var(--primary)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export { Dots };
export type { DotsProps };
