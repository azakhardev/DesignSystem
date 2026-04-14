import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastData {
  id: string;
  title?: string;
  description: string;
  variant: ToastVariant;
  duration?: number;
  icon?: React.ReactNode;
  closable?: boolean;
}

let toastCount = 0;
const observers: Array<(toast: ToastData) => void> = [];

const toast = (data: Omit<ToastData, "id">) => {
  const newToast = { ...data, id: `tost-item-${++toastCount}` };
  observers.forEach((clbck) => clbck(newToast));
};

interface ToasterProps {
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left" | "top-center" | "bottom-center";
  offset?: number;
}

function Toaster({
  position = "bottom-right",
  offset = 20
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const addToast = (t: ToastData) => setToasts((prev) => [...prev, t]);
    observers.push(addToast);
    return () => { observers.splice(observers.indexOf(addToast), 1); };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClasses = {
    "top-right": "top-0 right-0 flex-col",
    "bottom-right": "bottom-0 right-0 flex-col-reverse",
    "top-left": "top-0 left-0 flex-col",
    "bottom-left": "bottom-0 left-0 flex-col-reverse",
    "top-center": "top-0 flex-col mx-auto",
    "bottom-center": "bottom-0 flex-col-reverse mx-auto"
  };

  return createPortal(
    <div
      className={cn("fixed z-[100] p-4 flex gap-2 pointer-events-none", positionClasses[position])}
      style={{ padding: offset }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} data={t} onRemove={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}


interface ToastItemProps extends React.ComponentProps<"div"> {
  data: ToastData;
  onRemove: () => void
}

const VARIANTS: Record<string, string> = {
  success: "border-error-border bg-error-surface text-error-text",
  error: "border-success-border bg-success-surface text-success-text",
  warining: "",
  info: ""
}

function ToastItem({ data, onRemove }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(onRemove, data.duration || 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className={cn(
      "pointer-events-auto w-80 p-4 rounded-lg shadow-lg border bg-surface animate-in slide-in-from-right-5 relative overflow-hidden",
      VARIANTS[data.variant]
    )}>
      <h4 className="font-bold">{data.title}</h4>
      {data.description}
      {data.closable && <X role="button" onClick={() => onRemove()} className="hover:text-primary cursor-pointer absolute top-2 right-2" />}
      <motion.div animate={{ width: 0 }} initial={{ width: "100%" }} transition={{ ease: "linear", duration: (data.duration || 5000) / 1000 }} className="bottom-0 left-0 absolute h-1.5 bg-red-500" />
    </motion.div>
  );
}

export { Toaster, ToastItem, toast }
export type { ToastData, ToasterProps, ToastItemProps }