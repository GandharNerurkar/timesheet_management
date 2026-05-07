import { forwardRef, type SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[1.05rem] text-slate-500 outline-none transition",
          "hover:border-slate-400 focus-visible:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-100",
          className,
        )}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";

export { Select };
