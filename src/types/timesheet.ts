export type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING";

export type WorkType =
  | "Development"
  | "Design"
  | "Research"
  | "Meeting"
  | "Testing";

export type TimesheetSummary = {
  id: string;
  weekNumber: number;
  dateRange: string;
  status: TimesheetStatus;
  rangeKey: string;
};

export type TimesheetTask = {
  id: string;
  title: string;
  description: string;
  hours: number;
  projectName: string;
  projectCode: string;
  workType: WorkType;
};

export type TimesheetDayGroup = {
  dateKey: string;
  dateLabel: string;
  tasks: TimesheetTask[];
};

export type WeeklyTimesheet = {
  id: string;
  weekNumber: number;
  weekRange: string;
  totalHours: number;
  expectedHours: number;
  days: TimesheetDayGroup[];
};

export type ProjectOption = {
  id: string;
  name: string;
  code: string;
};

export type TimesheetEntryFormValues = {
  projectId: string;
  workType: WorkType;
  description: string;
  hours: number;
};
