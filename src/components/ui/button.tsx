import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-200 disabled:bg-blue-400",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-200",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-200",
};

const buttonSizes = {
  default: "px-4 py-3 text-sm",
  sm: "px-3 py-2 text-sm",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export function Button({
  className = "",
  type = "button",
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}
