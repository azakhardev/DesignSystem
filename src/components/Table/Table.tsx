import { cn } from "../../lib/utils";

function Table({
  children,
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <table className={cn("", className)} {...props}>
      {children}
    </table>
  );
}

function TableHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead className={cn("", className)} {...props}>
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
    <th className={cn("", className)} {...props}>
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
    <tr className={cn("", className)} {...props}>
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
    <td className={cn("", className)} {...props}>
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
    <tbody className={cn("", className)} {...props}>
      {children}
    </tbody>
  );
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
