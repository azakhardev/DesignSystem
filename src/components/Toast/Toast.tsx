import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastData {
  description: string;
  duration?: number;
  icon?: React.ReactNode;
  id: string;
  style?: React.CSSProperties;
  title?: string;
  variant: ToastVariant;
}

let toastCount = 0;
const observers: Array<(toast: ToastData) => void> = [];

const toast = (data: Omit<ToastData, "id">) => {
  const newToast = { ...data, id: `tost-item-${++toastCount}` };
  observers.forEach((clbck) => clbck(newToast));
};

interface ToasterProps {
  offset?: number;
  position?:
    | "top-right"
    | "bottom-right"
    | "top-left"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  toastsLimit?: number;
}

function Toaster({
  offset = 20,
  position = "bottom-right",
  toastsLimit = 5,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [shownToasts, setShownToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const addToast = (t: ToastData) => setToasts((prev) => [...prev, t]);
    observers.push(addToast);

    return () => {
      observers.splice(observers.indexOf(addToast), 1);
    };
  }, []);

  useEffect(() => {
    setShownToasts(toasts.slice(0, toastsLimit));
  }, [toasts, toastsLimit]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClasses = {
    "bottom-center": "bottom-0 flex-col-reverse items-center w-full",
    "bottom-left": "bottom-0 left-0 flex-col-reverse",
    "bottom-right": "bottom-0 right-0 flex-col-reverse",
    "top-center": "top-0 flex-col items-center",
    "top-left": "top-0 left-0 flex-col w-full",
    "top-right": "top-0 right-0 flex-col",
  };

  return createPortal(
    <div
      aria-label="Notifications"
      className={cn(
        "fixed z-[100] p-4 flex gap-2 pointer-events-none ",
        positionClasses[position],
      )}
      role="region"
      style={{ padding: offset + "px" }}
    >
      <AnimatePresence>
        {shownToasts.map((t) => (
          <ToastItem data={t} key={t.id} onRemove={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

interface ToastItemProps extends React.ComponentProps<"div"> {
  data: ToastData;
  onRemove: () => void;
}

const VARIANTS: Record<string, string> = {
  error: "bg-[#DC2626] text-white",
  info: "bg-[#0284C7] text-white",
  success: "bg-[#16A34A] text-white",
  warning: "bg-[#D97706] text-white",
};

function ToastItem({ data, onRemove }: ToastItemProps) {
  const [isTimerActive, setIsTimerActive] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onRemove();
    }, data.duration || 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isTimerActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsTimerActive(false);
    }
  };

  const a11yRole =
    data.variant === "error" || data.variant === "warning" ? "alert" : "status";

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      aria-atomic="true"
      aria-live={a11yRole === "alert" ? "assertive" : "polite"}
      className={cn(
        "w-72 sm:w-80 md:w-96 p-4 rounded-lg shadow-lg bg-surface relative overflow-hidden",
        "flex flex-col gap-3 pointer-events-auto",
        VARIANTS[data.variant],
      )}
      exit={{ opacity: 0, scale: 0.5, y: -20 }}
      initial={{ opacity: 0, scale: 0.5, y: -20 }}
      onFocus={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      role={a11yRole}
      style={data.style}
    >
      <div className="flex flex-row gap-2 items-center justify-start pr-3">
        {data.icon && data.icon}
        <h4 className="font-bold ">{data.title}</h4>
      </div>
      <p className="pl-1">{data.description}</p>

      <X
        aria-label="Close toast"
        className="hover:text-primary cursor-pointer absolute top-2 right-2 transition-colors"
        onClick={() => onRemove()}
        role="button"
      />

      <AnimatePresence>
        {isTimerActive && (
          <motion.div
            animate={{ width: 0 }}
            className={cn(
              "bottom-0 left-0 absolute h-1.5",
              "bg-white opacity-30",
            )}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            initial={{ width: "100%" }}
            transition={{
              duration: (data.duration || 5000) / 1000,
              ease: "linear",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { toast, Toaster, ToastItem };
export type { ToastData, ToasterProps, ToastItemProps };
