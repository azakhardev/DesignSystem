import * as React from "react";
import { cn } from "../../lib/utils";

function Card({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border bg-surface border-border shadow-sm ",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col p-4 pb-3 ", className)}
      {...props}
    >
      {children}
      <div className="h-[2px] w-full bg-border-strong mt-2" />
    </div>
  );
}

function CardTitle({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      ref={ref}
      className={cn(
        "font-semibold leading-none tracking-tight text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      ref={ref}
      className={cn("font-semibold text-text-secondary", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function CardContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2 p-4 pt-0 text-text-secondary text-sm",
        className,
      )}
      {...props}
    >
      <div className="h-[1px] w-full bg-border" />
      {children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
