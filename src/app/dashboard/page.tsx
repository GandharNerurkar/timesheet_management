import type { Metadata } from "next";

import { AppShell } from "@/components/layout/app-shell";
import { TimesheetsTable } from "@/components/table/timesheets-table";
import { requireAuth } from "@/lib/auth";
import { getTimesheets } from "@/services/timesheetService";

export const metadata: Metadata = {
  title: "Dashboard | Ticktock",
  description: "Review and manage team timesheets.",
};

export default async function DashboardPage() {
  const session = await requireAuth();
  const timesheets = await getTimesheets();

  return (
    <AppShell pathname="/dashboard" userName={session.user.name ?? "John Doe"}>
      <TimesheetsTable timesheets={timesheets} />
    </AppShell>
  );
}
