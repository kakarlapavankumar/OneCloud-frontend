import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;

  variant?: "success" | "danger" | "warning" | "info" | "default";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  const variantClasses = {
    success: "bg-green-600 text-white",

    danger: "bg-red-600 text-white",

    warning: "bg-yellow-500 text-slate-900",

    info: "bg-blue-600 text-white",

    default: "bg-slate-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
