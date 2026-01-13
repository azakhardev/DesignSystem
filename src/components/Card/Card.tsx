import { type HTMLProps } from "react";

export interface CardProps extends HTMLProps<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-xl shadow-md border border-border overflow-hidden p-4 ${className}`}
    >
      <div className="py-2">
        <h3 className="font-bold text-lg ">{title}</h3>
      </div>

      <div>{children}</div>
    </div>
  );
}
