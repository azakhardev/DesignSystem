import { cva, type VariantProps } from "class-variance-authority";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import { cn } from "../../lib/utils";

export type AvatarStatus = "idle" | "loading" | "loaded" | "error";

interface AvatarContextType {
  setStatus: (status: AvatarStatus) => void;
  status: AvatarStatus;
}

const AvatarContext = createContext<AvatarContextType | null>(null);

function useAvatarContext() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error(
      "Avatar components must be used within an <Avatar> provider.",
    );
  }
  return context;
}

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden bg-surface-secondary",
  {
    defaultVariants: {
      interactive: false,
      outline: false,
      shape: "circle",
      size: "md",
    },
    variants: {
      interactive: {
        false: "",
        true: "cursor-pointer transition-transform hover:scale-105 active:scale-95",
      },
      outline: {
        false: "",
        true: "ring-2 ring-border ring-offset-2 ring-offset-background",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
      size: {
        lg: "h-18 w-18 text-base",
        md: "h-14 w-14 text-sm",
        sm: "h-10 w-10 text-xs",
        xl: "h-22 w-22 text-xl",
      },
    },
  },
);

interface AvatarProps
  extends React.ComponentProps<"div">, VariantProps<typeof avatarVariants> {}

function Avatar({
  className,
  interactive,
  outline,
  shape,
  size,
  ...props
}: AvatarProps) {
  const [status, setStatus] = useState<AvatarStatus>("idle");

  return (
    <AvatarContext.Provider value={{ setStatus, status }}>
      <div
        className={cn(
          avatarVariants({ interactive, outline, shape, size }),
          className,
        )}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

interface AvatarImageProps extends React.ComponentProps<"img"> {
  /** Fired when the image is not being loaded anymore */
  onLoadingStatusChange?: (status: AvatarStatus) => void;
}

function AvatarImage({
  className,
  onLoadingStatusChange,
  src,
  ...props
}: AvatarImageProps) {
  const { setStatus, status } = useAvatarContext();

  useLayoutEffect(() => {
    if (src) {
      setStatus("loading");
    }
  }, [src, setStatus]);

  if (!src) return null;

  return (
    <img
      alt="Avatar"
      className={cn(
        "aspect-square h-full w-full object-cover",
        status !== "loaded" && "hidden",
        className,
      )}
      onError={() => {
        setStatus("error");
        onLoadingStatusChange?.("error");
      }}
      onLoad={() => {
        setStatus("loaded");
        onLoadingStatusChange?.("loaded");
      }}
      onLoadCapture={() => {
        setStatus("loading");
      }}
      src={src}
      {...props}
    />
  );
}

/**
 * Renders its children ONLY while the AvatarImage is fetching from the network.
 */
function AvatarLoading({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { status } = useAvatarContext();

  if (status !== "loading") return null;

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)} {...props}>
      {children}
    </div>
  );
}

function AvatarFallback({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { status } = useAvatarContext();

  if (status !== "error" && status !== "idle") return null;

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center font-medium text-text",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Avatar, AvatarFallback, AvatarImage, AvatarLoading };
