import * as React from "react";

import { cn } from "../../lib/utils";

function Card({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-md border bg-surface border-border shadow-sm ",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col p-4 pb-3 ", className)}
      ref={ref}
      {...props}
    >
      {children}
      <div className="h-[2px] w-full bg-border-strong mt-2" />
    </div>
  );
}

function CardTitle({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-semibold leading-none tracking-tight text-xl",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("font-semibold text-text-secondary", className)}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  );
}

function CardContent({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("p-4", className)} ref={ref} {...props}>
      {children}
    </div>
  );
}

function CardFooter({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 pt-0 text-text-secondary text-sm",
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="h-[1px] w-full bg-border" />
      {children}
    </div>
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
