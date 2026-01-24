import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";

interface OrbitalProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  primaryColor?: string;
  primaryDuration?: number;
  secondaryColor?: string;
  secondaryDuration?: number;
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
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute top-0 left-1/2 rounded-full"
        style={{
          width: primaryDotSize,
          height: primaryDotSize,
          backgroundColor: primaryColor ?? "var(--primary)",
          x: "-50%",
          transformOrigin: `50% ${radius}px`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: primaryDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-0 left-1/2 rounded-full"
        style={{
          width: secondaryDotSize,
          height: secondaryDotSize,
          backgroundColor: secondaryColor ?? "var(--secondary)",
          x: "-50%",
          transformOrigin: `50% ${radius}px`,
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: secondaryDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export { Orbital };
export type { OrbitalProps };
