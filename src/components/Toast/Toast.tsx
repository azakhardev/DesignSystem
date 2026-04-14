import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/utils";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastData {
  closable?: boolean;
  description: string;
  duration?: number;
  icon?: React.ReactNode;
  id: string;
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
}

function Toaster({ offset = 20, position = "bottom-right" }: ToasterProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const addToast = (t: ToastData) => setToasts((prev) => [...prev, t]);
    observers.push(addToast);
    return () => {
      observers.splice(observers.indexOf(addToast), 1);
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClasses = {
    "bottom-center": "bottom-0 flex-col-reverseitems-center w-full",
    "bottom-left": "bottom-0 left-0 flex-col-reverse",
    "bottom-right": "bottom-0 right-0 flex-col-reverse",
    "top-center": "top-0 flex-col items-center",
    "top-left": "top-0 left-0 flex-col w-full",
    "top-right": "top-0 right-0 flex-col",
  };

  return createPortal(
    <div
      className={cn(
        "fixed z-[100] p-4 flex gap-2 pointer-events-none ",
        positionClasses[position],
      )}
      style={{ padding: offset }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
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
  errorProgress: "bg-[#FF5C5C]",
  info: "bg-[#0284C7] text-white",
  infoProgress: "bg-[#47C0FF]",
  success: "bg-[#16A34A] text-white",
  successProgress: "bg-[#01D44F]",
  warining: "bg-[#D97706] text-white",
  warningProgress: "bg-[#FF951B]",
};

function ToastItem({ data, onRemove }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(onRemove, data.duration || 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(
        "w-72 sm:w-80 md:w-96 p-4 rounded-lg shadow-lg bg-surface relative overflow-hidden",
        "flex flex-col gap-3 pointer-events-auto",
        VARIANTS[data.variant],
      )}
      exit={{ opacity: 0, scale: 0.5, y: -20 }}
      initial={{ opacity: 0, scale: 0.5, y: -20 }}
    >
      <div className="flex flex-row gap-2 items-center justify-start pr-3">
        {data.icon && data.icon}
        <h4 className="font-bold ">{data.title}</h4>
      </div>
      <p className="pl-1">{data.description}</p>
      {data.closable && (
        <X
          className="hover:text-primary cursor-pointer absolute top-2 right-2"
          onClick={() => onRemove()}
          role="button"
        />
      )}
      <motion.div
        animate={{ width: 0 }}
        className={cn(
          "bottom-0 left-0 absolute h-1.5",
          VARIANTS[data.variant + "Progress"],
        )}
        initial={{ width: "100%" }}
        transition={{
          duration: (data.duration || 5000) / 1000,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

export { toast, Toaster, ToastItem };
export type { ToastData, ToasterProps, ToastItemProps };
