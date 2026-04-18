import { cn } from "../../lib/utils";
import styles from "./Table.module.css";

function Table({
  children,
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <div className="w-full rounded-md border border-border overflow-hidden">
      <table className={cn("w-full", className)} {...props}>
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

function TableCell({
  children,
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "relative text-start px-3 py-0.5",
        styles["table-cell"],
        className,
      )}
      {...props}
    >
      {children}
    </td>
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

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
