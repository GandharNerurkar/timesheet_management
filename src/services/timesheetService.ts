import type {
  ProjectOption,
  TimesheetSummary,
  TimesheetTask,
  TimesheetEntryFormValues,
  WeeklyTimesheet,
  WorkType,
} from "@/types/timesheet";

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

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = new URL(path, getBaseUrl()).toString();
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url} with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getTimesheets(): Promise<TimesheetSummary[]> {
  const result = await fetchJson<TimesheetsResponse>("/api/timesheets");
  return result.data.timesheets;
}

export async function getTimesheetById(id: string): Promise<TimesheetDetailResponse> {
  return fetchJson<TimesheetDetailResponse>(`/api/timesheets/${id}`);
}

export async function createTimesheet(data: TimesheetEntryFormValues): Promise<TimesheetTask> {
  return fetchJson<TimesheetTask>("/api/timesheets", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTimesheet(
  id: string,
  data: Partial<TimesheetEntryFormValues>
): Promise<TimesheetTask> {
  return fetchJson<TimesheetTask>(`/api/timesheets/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteTimesheet(id: string): Promise<void> {
  const response = await fetch(`/api/timesheets/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed for /api/timesheets/${id} with status ${response.status}`);
  }
}
