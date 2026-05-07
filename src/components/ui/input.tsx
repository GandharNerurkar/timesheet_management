import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

function getInputClasses(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition",
    "placeholder:text-slate-400",
    "focus-visible:ring-4 focus-visible:ring-blue-100",
    hasError
      ? "border-red-300 focus-visible:border-red-500"
      : "border-slate-300 hover:border-slate-400 focus-visible:border-blue-600",
  ].join(" ");
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error ? "true" : "false"}
        className={`${getInputClasses(Boolean(error))} ${className}`.trim()}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export type { InputProps };
export { Input };
