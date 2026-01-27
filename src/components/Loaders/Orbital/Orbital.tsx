import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

interface OrbitalProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryColor?: string;
  primaryDuration?: number;
  secondaryColor?: string;
  secondaryDuration?: number;
  size?: number;
}

function Orbital({
  className,
  primaryColor,
  primaryDuration = 1,
  secondaryColor,
  secondaryDuration = 0.8,
  size = 48,
  ...props
}: OrbitalProps) {
  const radius = size / 2;

  const primaryDotSize = size * 0.35;
  const secondaryDotSize = size * 0.2;

  return (
    <div
      className={cn("relative flex justify-center items-center", className)}
      {...props}
      style={{ height: size, width: size }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        className="absolute top-0 left-1/2 rounded-full"
        style={{
          backgroundColor: primaryColor ?? "var(--primary)",
          height: primaryDotSize,
          transformOrigin: `50% ${radius}px`,
          width: primaryDotSize,
          x: "-50%",
        }}
        transition={{
          duration: primaryDuration,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      <motion.div
        animate={{ rotate: -360 }}
        className="absolute top-0 left-1/2 rounded-full"
        style={{
          backgroundColor: secondaryColor ?? "var(--secondary)",
          height: secondaryDotSize,
          transformOrigin: `50% ${radius}px`,
          width: secondaryDotSize,
          x: "-50%",
        }}
        transition={{
          duration: secondaryDuration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
}

export { Orbital };
export type { OrbitalProps };
