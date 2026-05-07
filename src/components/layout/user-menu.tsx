"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  fallbackName: string;
};

export function UserMenu({ fallbackName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  const name = data?.user?.name ?? fallbackName;

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "rounded-lg px-2 py-2 text-right text-[1.05rem] font-medium text-slate-500 transition",
          "hover:text-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
        )}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {name}
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 z-20 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
          role="menu"
        >
          <div className="mb-3 border-b border-slate-100 pb-3">
            <p className="text-sm font-semibold text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">admin@test.com</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full justify-center"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </div>
  );
}
