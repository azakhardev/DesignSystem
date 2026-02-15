import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Ellipsis, Slash } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";

function Breadcrumb({
  children,
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)} {...props}>
      {children}
    </nav>
  );
}

function BreadcrumbList({
  children,
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-row gap-2 items-center justify-start",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

function BreadcrumbItem({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("inline-flex items-center text-nowrap gap-1", className)}
      {...props}
    >
      {children}
    </li>
  );
}

interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {
  /**
   * Defines if the link is the current page
   */
  current?: boolean;
}

function BreadcrumbLink({
  children,
  className,
  current,
  ...props
}: BreadcrumbLinkProps) {
  if (current) {
    return (
      <span aria-current="page" className={cn("text-sm text-text", className)}>
        {children}
      </span>
    );
  }

  return (
    <a
      className={cn("text-sm text-text-secondary hover:text-text", className)}
      {...props}
    >
      {children}
    </a>
  );
}

interface BreadcrumbMenuProps extends Omit<
  React.ComponentProps<"button">,
  "onClick"
> {
  /**
   * Sets the title of the menu button
   */
  text?: string;
}

function BreadcrumbMenu({
  children,
  className,
  text,
  ...props
}: BreadcrumbMenuProps) {
  const [open, setOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!open || !menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleOpen() {
    setOpen((old) => !old);
  }

  return (
    <li className="flex flex-col gap-1 relative" ref={menuRef}>
      <button
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="More options"
        className={cn(
          "flex flex-row gap-1 items-center justify-center rounded-md text-sm text-text-secondary px-2 hover:bg-surface-secondary hover:text-text transition-colors",
          className,
        )}
        onClick={handleOpen}
        {...props}
      >
        {text ? text : <Ellipsis />}
        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute left-0 top-full mt-1 z-50 flex flex-col gap-1 rounded-md border border-border-subtle bg-surface px-2 py-1 shadow-md"
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {
  /**
   * Sets the displayed icon to separator (can be any ReactNode)
   */
  icon?: React.ReactNode;
}

function BreadcrumbSeparator({
  className,
  icon,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      aria-hidden="true"
      className={cn("text-text-secondary", className)}
      role="presentation"
      {...props}
    >
      {icon ?? <Slash className="size-4" />}
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbMenu,
  BreadcrumbSeparator,
};

export type {
  BreadcrumbLinkProps,
  BreadcrumbMenuProps,
  BreadcrumbSeparatorProps,
};
