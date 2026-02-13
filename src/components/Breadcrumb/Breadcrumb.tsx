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
  current?: boolean;
}

function BreadcrumbLink({
  children,
  className,
  current,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <a
      className={cn(
        "text-sm",
        current
          ? "text-text"
          : "text-text-secondary hover:text-text hover:cursor-pointer",
        className,
      )}
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
  icon?: React.ReactNode;
}

function BreadcrumbSeparator({
  className,
  icon,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <span className={cn("", className)} {...props}>
      {icon ?? <Slash />}
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
