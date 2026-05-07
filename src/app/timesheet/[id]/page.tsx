import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { WeeklyTimesheetDetails } from "@/components/timesheet/weekly-timesheet-details";
import { requireAuth } from "@/lib/auth";
import { getTimesheetByIdFromApi } from "@/lib/api";

export const metadata: Metadata = {
  title: "Timesheet Details | Ticktock",
  description: "Review and update weekly timesheet entries.",
};

type TimesheetPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TimesheetPage({ params }: TimesheetPageProps) {
  const { id } = await params;
  const session = await requireAuth();
  let response;

  try {
    response = await getTimesheetByIdFromApi(id);
  } catch {
    notFound();
  }

  const {
    data: { timesheet, projects, workTypes },
  } = response;

  return (
    <AppShell pathname={`/timesheet/${id}`} userName={session.user.name ?? "John Doe"}>
      <WeeklyTimesheetDetails
        timesheet={timesheet}
        projects={projects}
        workTypes={workTypes}
      />
    </AppShell>
  );
}
