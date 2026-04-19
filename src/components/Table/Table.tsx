import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";
import styles from "./Table.module.css";

interface TableProps extends React.ComponentProps<"table"> {
  stripped?: boolean;
  stripsScheme?: {
    odd?: string;
    even?: string;
  };
}

function Table({
  children,
  className,
  stripped,
  stripsScheme,
  style,
  ...props
}: TableProps) {
  return (
    <div className="w-full rounded-md border border-border overflow-hidden">
      <table
        className={cn(
          "w-full",
          styles.table,
          stripped && styles["table-stripped"],
          className,
        )}
        style={
          stripped
            ? ({
                "--even-stripe": stripsScheme?.even ?? "hsl(var(--surface))",
                "--odd-stripe":
                  stripsScheme?.odd ?? "hsl(var(--surface-secondary))",
                ...style,
              } as React.CSSProperties)
            : style
        }
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

function TableHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead className={cn("bg-primary", className)} {...props}>
      {children}
    </thead>
  );
}

function TableHead({
  children,
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "relative text-start font-bold px-2.5 py-1.5 text-on-primary",
        styles["table-head"],
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

function TableRow({
  children,
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "bg-surface hover:bg-info-surface",
        styles["table-row"],
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

interface TableCellProps extends React.ComponentProps<"td"> {
  allowCopy?: boolean;
}

function TableCell({
  allowCopy,
  children,
  className,
  ...props
}: TableCellProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copyValue(e: React.MouseEvent<HTMLTableCellElement>) {
    if (!allowCopy) return;

    const content = e.currentTarget.textContent;
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <td
      className={cn(
        "relative text-start px-3 py-0.5",
        styles["table-cell"],
        allowCopy && "cursor-pointer transition-colors",
        className,
      )}
      onClick={copyValue}
      {...props}
    >
      <AnimatePresence>
        {copied && (
          <motion.div
            animate={{ opacity: 1, scale: 1, x: "-50%", y: -30 }}
            className={cn(
              "absolute left-1/2 top-0 z-10 whitespace-nowrap",
              "pointer-events-none select-none",
              "px-2 py-1 text-xs font-mono rounded shadow-md",
              "bg-surface text-text",
            )}
            exit={{ opacity: 0, x: "-50%", y: -40 }}
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: -10 }}
            transition={{ duration: 0.2 }}
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </td>
  );
}

interface TableInputProps extends React.ComponentProps<"input"> {
  editable?: boolean;
}

function TableInput({ className, placeholder, ...props }: TableInputProps) {
  const hasRealPlaceholder = Boolean(placeholder);

  return (
    <input
      className={cn(
        "w-full bg-inherit placeholder:text-text-secondary",
        "border-b border-transparent focus-within:outline-none focus-within:border-text-secondary focus-within:border-solid",
        !hasRealPlaceholder &&
          "placeholder-shown:border-dashed placeholder-shown:border-b-border",
        className,
      )}
      placeholder={placeholder || " "}
      {...props}
    />
  );
}

function TableBody({
  children,
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody className={cn("overflow-x-auto", className)} {...props}>
      {children}
    </tbody>
  );
}

export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableInput,
  TableRow,
};
export type { TableCellProps, TableProps };
