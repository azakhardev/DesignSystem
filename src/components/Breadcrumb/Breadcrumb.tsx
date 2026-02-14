import { Slash } from "lucide-react";
import type React from "react";

import { cn } from "../../lib/utils";

function Breadcrumb({
  children,
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav className={cn("w-full", className)} {...props}>
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

function BreadcrumbMenu({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "onClick">) {
  return (
    <button className={cn("", className)} {...props}>
      {children}
    </button>
  );
}

interface BreadcrumbSeparatorProps extends React.ComponentProps<"span"> {
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
    <span className={cn("text-text-secondary", className)} {...props}>
      {icon ?? <Slash className="size-4" />}
    </span>
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

export type { BreadcrumbLinkProps, BreadcrumbSeparatorProps };
