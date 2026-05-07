import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        className={cn(
          "min-h-28 w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
          "placeholder:text-slate-400 focus-visible:ring-4 focus-visible:ring-blue-100",
          error
            ? "border-red-300 focus-visible:border-red-500"
            : "border-slate-300 hover:border-slate-400 focus-visible:border-blue-600",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
