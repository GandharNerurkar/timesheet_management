import { getTimesheetStatus } from "@/utils/timesheet";
import type {
  ProjectOption,
  TimesheetDayGroup,
  TimesheetSummary,
  TimesheetTask,
  WeeklyTimesheet,
  WorkType,
} from "@/types/timesheet";

const PROJECTS: ProjectOption[] = [
  { id: "p1", name: "Website Redesign", code: "WR" },
  { id: "p2", name: "Payroll Portal", code: "PP" },
  { id: "p3", name: "Mobile App", code: "MA" },
];

const WORK_TYPES: WorkType[] = [
  "Development",
  "Design",
  "Research",
  "Meeting",
  "Testing",
];

function formatDateLabel(dateKey: string) {
  return new Date(`${dateKey}T00:00:00.000Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function createTask(task: Omit<TimesheetTask, "description">): TimesheetTask {
  return {
    ...task,
    description: task.title,
  };
}

function createWeekDays(startDate: string): TimesheetDayGroup[] {
  const start = new Date(`${startDate}T00:00:00.000Z`);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setUTCDate(start.getUTCDate() + index);
    const dateKey = current.toISOString().slice(0, 10);

    return {
      dateKey,
      dateLabel: formatDateLabel(dateKey),
      tasks: [],
    };
  });
}

function mergeWeekDays(
  startDate: string,
  overrides: Record<string, TimesheetTask[]>,
): TimesheetDayGroup[] {
  return createWeekDays(startDate).map((day) => ({
    ...day,
    tasks: overrides[day.dateKey] ?? day.tasks,
  }));
}

const TIMESHEET_SUMMARIES: TimesheetSummary[] = [
  {
    id: "jan-week-1",
    weekNumber: 1,
    dateRange: "Jan 1 - Jan 7, 2024",
    status: "COMPLETED",
    rangeKey: "January 2024",
  },
  {
    id: "jan-week-2",
    weekNumber: 2,
    dateRange: "Jan 8 - Jan 14, 2024",
    status: "COMPLETED",
    rangeKey: "January 2024",
  },
  {
    id: "jan-week-3",
    weekNumber: 3,
    dateRange: "Jan 15 - Jan 21, 2024",
    status: "COMPLETED",
    rangeKey: "January 2024",
  },
  {
    id: "jan-week-4",
    weekNumber: 4,
    dateRange: "Jan 22 - Jan 28, 2024",
    status: "INCOMPLETE",
    rangeKey: "January 2024",
  },
  {
    id: "jan-week-5",
    weekNumber: 5,
    dateRange: "Jan 29 - Feb 4, 2024",
    status: "MISSING",
    rangeKey: "January 2024",
  },
  {
    id: "dec-week-1",
    weekNumber: 1,
    dateRange: "Dec 1 - Dec 7, 2023",
    status: "INCOMPLETE",
    rangeKey: "December 2023",
  },
];

const WEEKLY_TIMESHEETS: WeeklyTimesheet[] = [
  {
    id: "jan-week-5",
    weekNumber: 5,
    weekRange: "Week 5 | Jan 29 - Feb 4, 2024",
    totalHours: 0,
    expectedHours: 40,
    days: createWeekDays("2024-01-29"),
  },
  {
    id: "jan-week-4",
    weekNumber: 4,
    weekRange: "Week 4 | Jan 22 - Jan 28, 2024",
    totalHours: 20,
    expectedHours: 40,
    days: mergeWeekDays("2024-01-22", {
      "2024-01-22": [
        createTask({
          id: "task-1",
          title: "Build dashboard filters",
          hours: 4,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Development",
        }),
        createTask({
          id: "task-2",
          title: "Stakeholder sync",
          hours: 2,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Meeting",
        }),
      ],
      "2024-01-23": [
        createTask({
          id: "task-3",
          title: "Refine task card states",
          hours: 5,
          projectName: "Mobile App",
          projectCode: "MA",
          workType: "Design",
        }),
      ],
      "2024-01-24": [
        createTask({
          id: "task-4",
          title: "Regression testing",
          hours: 3,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Testing",
        }),
        createTask({
          id: "task-5",
          title: "Document sprint notes",
          hours: 6,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Research",
        }),
      ],
    }),
  },
  {
    id: "jan-week-3",
    weekNumber: 3,
    weekRange: "Week 3 | Jan 15 - Jan 21, 2024",
    totalHours: 40,
    expectedHours: 40,
    days: mergeWeekDays("2024-01-15", {
      "2024-01-15": [
        createTask({
          id: "task-6",
          title: "Release preparation",
          hours: 8,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Development",
        }),
      ],
    }),
  },
  {
    id: "jan-week-2",
    weekNumber: 2,
    weekRange: "Week 2 | Jan 8 - Jan 14, 2024",
    totalHours: 40,
    expectedHours: 40,
    days: mergeWeekDays("2024-01-08", {
      "2024-01-08": [
        createTask({
          id: "task-7",
          title: "Implement login validation",
          hours: 8,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Development",
        }),
      ],
      "2024-01-09": [
        createTask({
          id: "task-8",
          title: "Review dashboard spacing",
          hours: 7,
          projectName: "Mobile App",
          projectCode: "MA",
          workType: "Design",
        }),
      ],
      "2024-01-10": [
        createTask({
          id: "task-9",
          title: "QA timesheet modal",
          hours: 4,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Testing",
        }),
      ],
      "2024-01-11": [
        createTask({
          id: "task-10",
          title: "Prepare sprint notes",
          hours: 3,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Research",
        }),
      ],
      "2024-01-12": [
        createTask({
          id: "task-11",
          title: "Client standup",
          hours: 2,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Meeting",
        }),
      ],
      "2024-01-13": [
        createTask({
          id: "task-12",
          title: "Refactor table component",
          hours: 8,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Development",
        }),
      ],
      "2024-01-14": [
        createTask({
          id: "task-13",
          title: "Polish visual states",
          hours: 8,
          projectName: "Mobile App",
          projectCode: "MA",
          workType: "Design",
        }),
      ],
    }),
  },
  {
    id: "jan-week-1",
    weekNumber: 1,
    weekRange: "Week 1 | Jan 1 - Jan 7, 2024",
    totalHours: 40,
    expectedHours: 40,
    days: mergeWeekDays("2024-01-01", {
      "2024-01-01": [
        createTask({
          id: "task-14",
          title: "Project kickoff",
          hours: 4,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Meeting",
        }),
        createTask({
          id: "task-11",
          title: "Requirements gathering",
          hours: 4,
          projectName: "ERP Sysytem",
          projectCode: "PP",
          workType: "Meeting",
        }),
      ],
      "2024-01-02": [
        createTask({
          id: "task-15",
          title: "Design system audit",
          hours: 6,
          projectName: "Mobile App",
          projectCode: "MA",
          workType: "Research",
        }),
      ],
      "2024-01-03": [
        createTask({
          id: "task-16",
          title: "Build auth routes",
          hours: 5,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Development",
        }),
      ],
      "2024-01-04": [
        createTask({
          id: "task-17",
          title: "Validate QA checklist",
          hours: 5,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Testing",
        }),
      ],
      "2024-01-05": [
        createTask({
          id: "task-18",
          title: "Prototype table filters",
          hours: 6,
          projectName: "Mobile App",
          projectCode: "MA",
          workType: "Design",
        }),
      ],
      "2024-01-06": [
        createTask({
          id: "task-19",
          title: "Write implementation notes",
          hours: 5,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Research",
        }),
      ],
      "2024-01-07": [
        createTask({
          id: "task-20",
          title: "Team sync and planning",
          hours: 5,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Meeting",
        }),
      ],
    }),
  },
  {
    id: "dec-week-1",
    weekNumber: 1,
    weekRange: "Week 1 | Dec 1 - Dec 7, 2023",
    totalHours: 36,
    expectedHours: 40,
    days: mergeWeekDays("2023-12-01", {
      "2023-12-01": [
        createTask({
          id: "task-21",
          title: "Requirements workshop",
          hours: 4,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Meeting",
        }),
      ],
      "2023-12-02": [
        createTask({
          id: "task-22",
          title: "User research synthesis",
          hours: 6,
          projectName: "Mobile App",
          projectCode: "MA",
          workType: "Research",
        }),
      ],
      "2023-12-03": [
        createTask({
          id: "task-23",
          title: "API contract planning",
          hours: 5,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Development",
        }),
      ],
      "2023-12-04": [
        createTask({
          id: "task-24",
          title: "Navigation design review",
          hours: 5,
          projectName: "Mobile App",
          projectCode: "MA",
          workType: "Design",
        }),
      ],
      "2023-12-05": [
        createTask({
          id: "task-25",
          title: "Accessibility QA",
          hours: 4,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Testing",
        }),
      ],
      "2023-12-06": [
        createTask({
          id: "task-26",
          title: "Client feedback review",
          hours: 6,
          projectName: "Payroll Portal",
          projectCode: "PP",
          workType: "Meeting",
        }),
      ],
      "2023-12-07": [
        createTask({
          id: "task-27",
          title: "Component cleanup",
          hours: 6,
          projectName: "Website Redesign",
          projectCode: "WR",
          workType: "Development",
        }),
      ],
    }),
  },
];

export function getMockTimesheetSummaries() {
  return TIMESHEET_SUMMARIES.map((summary) => {
    const matchingTimesheet = WEEKLY_TIMESHEETS.find((timesheet) => timesheet.id === summary.id);

    if (!matchingTimesheet) {
      return summary;
    }

    return {
      ...summary,
      status: getTimesheetStatus(matchingTimesheet.totalHours),
    };
  });
}

export function getMockWeeklyTimesheetById(id: string) {
  return WEEKLY_TIMESHEETS.find((timesheet) => timesheet.id === id) ?? null;
}

export function getMockProjects() {
  return PROJECTS;
}

export function getMockWorkTypes() {
  return WORK_TYPES;
}
