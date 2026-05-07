import Link from "next/link";

import { UserMenu } from "@/components/layout/user-menu";
import { cn } from "@/lib/utils";

type AppNavbarProps = {
  userName: string;
  pathname: string;
};

export function AppNavbar({ userName, pathname }: AppNavbarProps) {
  const isActive = pathname === "/dashboard" || pathname.startsWith("/timesheet");

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex w-full items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-10">
          <Link
            href="/dashboard"
            className="text-[2rem] font-semibold leading-none text-slate-900"
          >
            ticktock
          </Link>
          <nav aria-label="Primary">
            <Link
              href="/dashboard"
              className={cn(
                "rounded-md px-2 py-1 text-[1.05rem] font-medium transition",
                isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
              )}
            >
              Timesheets
            </Link>
          </nav>
        </div>

        <UserMenu fallbackName={userName} />
      </div>
    </header>
  );
}
