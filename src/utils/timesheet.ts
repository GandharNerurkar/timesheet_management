import type { TimesheetDayGroup, TimesheetStatus } from "@/types/timesheet";

export function getStatusTone(status: TimesheetStatus) {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-700";
    case "INCOMPLETE":
      return "bg-amber-100 text-amber-700";
    case "MISSING":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function getProjectTone(projectCode: string) {
  switch (projectCode) {
    case "WR":
      return "bg-blue-100 text-blue-700";
    case "PP":
      return "bg-emerald-100 text-emerald-700";
    case "MA":
      return "bg-violet-100 text-violet-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function getProgressPercentage(totalHours: number, expectedHours: number) {
  if (expectedHours <= 0) {
    return 0;
  }

  return Math.min(100, Math.round((totalHours / expectedHours) * 100));
}

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getDatesFromWeekRange(weekRange: string) {
  const parts = weekRange.split("|");
  const rangeText = parts[1]?.trim();

  if (!rangeText) {
    return [];
  }

  const match = rangeText.match(
    /^([A-Za-z]{3}) (\d{1,2}) - (?:( [A-Za-z]{3}) |([A-Za-z]{3}) )?(\d{1,2}), (\d{4})$/,
  );

  if (!match) {
    const fallbackMatch = rangeText.match(
      /^([A-Za-z]{3}) (\d{1,2}) - ([A-Za-z]{3}) (\d{1,2}), (\d{4})$/,
    );

    if (!fallbackMatch) {
      const sameMonthMatch = rangeText.match(
        /^([A-Za-z]{3}) (\d{1,2}) - (\d{1,2}), (\d{4})$/,
      );

      if (!sameMonthMatch) {
        return [];
      }

      const [, startMonthLabel, startDayValue, endDayValue, yearValue] = sameMonthMatch;
      const startMonth = MONTHS[startMonthLabel];
      const year = Number(yearValue);
      const startDay = Number(startDayValue);
      const endDay = Number(endDayValue);

      return buildDateRange(year, startMonth, startDay, startMonth, endDay);
    }

    const [, startMonthLabel, startDayValue, endMonthLabel, endDayValue, yearValue] =
      fallbackMatch;

    return buildDateRange(
      Number(yearValue),
      MONTHS[startMonthLabel],
      Number(startDayValue),
      MONTHS[endMonthLabel],
      Number(endDayValue),
    );
  }

  return [];
}

function buildDateRange(
  year: number,
  startMonth: number,
  startDay: number,
  endMonth: number,
  endDay: number,
) {
  if (
    Number.isNaN(year) ||
    Number.isNaN(startMonth) ||
    Number.isNaN(startDay) ||
    Number.isNaN(endMonth) ||
    Number.isNaN(endDay)
  ) {
    return [];
  }

  const start = new Date(Date.UTC(year, startMonth, startDay));
  const end = new Date(Date.UTC(year, endMonth, endDay));
  const dates: Date[] = [];

  for (
    const current = new Date(start);
    current.getTime() <= end.getTime();
    current.setUTCDate(current.getUTCDate() + 1)
  ) {
    dates.push(new Date(current));
  }

  return dates;
}

export function normalizeTimesheetDays(
  weekRange: string,
  days: TimesheetDayGroup[],
): TimesheetDayGroup[] {
  const dates = getDatesFromWeekRange(weekRange);

  if (dates.length === 0) {
    return [...days].sort((left, right) => left.dateKey.localeCompare(right.dateKey));
  }

  const dayMap = new Map(days.map((day) => [day.dateKey, day]));

  return dates.map((date) => {
    const dateKey = formatDateKey(date);
    const existingDay = dayMap.get(dateKey);

    return (
      existingDay ?? {
        dateKey,
        dateLabel: formatDateLabel(date),
        tasks: [],
      }
    );
  });
}
