import React from "react";

export interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden max-w-sm ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      </div>

      <div className="p-6 text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
};
