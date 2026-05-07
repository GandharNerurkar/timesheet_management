import { AppNavbar } from "@/components/layout/app-navbar";

type AppShellProps = {
  children: React.ReactNode;
  pathname: string;
  userName: string;
};

export function AppShell({ children, pathname, userName }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f8f8]">
      <div className="app-scale">
        <AppNavbar pathname={pathname} userName={userName} />
        <main className="mx-auto flex w-full max-w-[1620px] flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
          {children}
          <footer className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-[1.05rem] text-slate-500 shadow-sm">
            © 2024 tentwenty. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
