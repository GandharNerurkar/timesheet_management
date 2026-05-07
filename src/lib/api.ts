import "server-only";

import type { ProjectOption, TimesheetSummary, WeeklyTimesheet, WorkType } from "@/types/timesheet";

function getBaseUrl() {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

async function fetchJson<T>(path: string) {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path} with status ${response.status}`);
  }

  return (await response.json()) as T;
}

type TimesheetsResponse = {
  data: {
    timesheets: TimesheetSummary[];
  };
};

type TimesheetDetailResponse = {
  data: {
    timesheet: WeeklyTimesheet;
    projects: ProjectOption[];
    workTypes: WorkType[];
  };
};

export async function getTimesheetsFromApi() {
  return fetchJson<TimesheetsResponse>("/api/timesheets");
}

export async function getTimesheetByIdFromApi(id: string) {
  return fetchJson<TimesheetDetailResponse>(`/api/timesheets/${id}`);
}
