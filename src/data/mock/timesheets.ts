import type {
  ProjectOption,
  TimesheetDayGroup,
  TimesheetSummary,
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

function mergeWeekDays(
  startDate: string,
  overrides: Record<string, TimesheetDayGroup>,
): TimesheetDayGroup[] {
  return createWeekDays(startDate).map((day) => overrides[day.dateKey] ?? day);
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
    status: "COMPLETED",
    rangeKey: "December 2023",
  },
];

function createWeekDays(startDate: string): TimesheetDayGroup[] {
  const start = new Date(`${startDate}T00:00:00.000Z`);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setUTCDate(start.getUTCDate() + index);

    return {
      dateKey: current.toISOString().slice(0, 10),
      dateLabel: current.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      tasks: [],
    };
  });
}

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
      "2024-01-22": {
        dateKey: "2024-01-22",
        dateLabel: "Jan 22",
        tasks: [
          {
            id: "task-1",
            title: "Build dashboard filters",
            description: "Build dashboard filters",
            hours: 4,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Development",
          },
          {
            id: "task-2",
            title: "Stakeholder sync",
            description: "Stakeholder sync",
            hours: 2,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Meeting",
          },
        ],
      },
      "2024-01-23": {
        dateKey: "2024-01-23",
        dateLabel: "Jan 23",
        tasks: [
          {
            id: "task-3",
            title: "Refine task card states",
            description: "Refine task card states",
            hours: 5,
            projectName: "Mobile App",
            projectCode: "MA",
            workType: "Design",
          },
        ],
      },
      "2024-01-24": {
        dateKey: "2024-01-24",
        dateLabel: "Jan 24",
        tasks: [
          {
            id: "task-4",
            title: "Regression testing",
            description: "Regression testing",
            hours: 3,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Testing",
          },
          {
            id: "task-5",
            title: "Document sprint notes",
            description: "Document sprint notes",
            hours: 6,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Research",
          },
        ],
      },
    }),
  },
  {
    id: "jan-week-3",
    weekNumber: 3,
    weekRange: "Week 3 | Jan 15 - Jan 21, 2024",
    totalHours: 40,
    expectedHours: 40,
    days: mergeWeekDays("2024-01-15", {
      "2024-01-15": {
        dateKey: "2024-01-15",
        dateLabel: "Jan 15",
        tasks: [
          {
            id: "task-6",
            title: "Release preparation",
            description: "Release preparation",
            hours: 8,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Development",
          },
        ],
      },
    }),
  },
  {
    id: "jan-week-2",
    weekNumber: 2,
    weekRange: "Week 2 | Jan 8 - Jan 14, 2024",
    totalHours: 32,
    expectedHours: 40,
    days: mergeWeekDays("2024-01-08", {
      "2024-01-08": {
        dateKey: "2024-01-08",
        dateLabel: "Jan 8",
        tasks: [
          {
            id: "task-7",
            title: "Implement login validation",
            description: "Implement login validation",
            hours: 6,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Development",
          },
        ],
      },
      "2024-01-09": {
        dateKey: "2024-01-09",
        dateLabel: "Jan 9",
        tasks: [
          {
            id: "task-8",
            title: "Review dashboard spacing",
            description: "Review dashboard spacing",
            hours: 5,
            projectName: "Mobile App",
            projectCode: "MA",
            workType: "Design",
          },
        ],
      },
      "2024-01-10": {
        dateKey: "2024-01-10",
        dateLabel: "Jan 10",
        tasks: [
          {
            id: "task-9",
            title: "QA timesheet modal",
            description: "QA timesheet modal",
            hours: 4,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Testing",
          },
        ],
      },
      "2024-01-11": {
        dateKey: "2024-01-11",
        dateLabel: "Jan 11",
        tasks: [
          {
            id: "task-10",
            title: "Prepare sprint notes",
            description: "Prepare sprint notes",
            hours: 3,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Research",
          },
        ],
      },
      "2024-01-12": {
        dateKey: "2024-01-12",
        dateLabel: "Jan 12",
        tasks: [
          {
            id: "task-11",
            title: "Client standup",
            description: "Client standup",
            hours: 2,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Meeting",
          },
        ],
      },
      "2024-01-13": {
        dateKey: "2024-01-13",
        dateLabel: "Jan 13",
        tasks: [
          {
            id: "task-12",
            title: "Refactor table component",
            description: "Refactor table component",
            hours: 6,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Development",
          },
        ],
      },
      "2024-01-14": {
        dateKey: "2024-01-14",
        dateLabel: "Jan 14",
        tasks: [
          {
            id: "task-13",
            title: "Polish visual states",
            description: "Polish visual states",
            hours: 6,
            projectName: "Mobile App",
            projectCode: "MA",
            workType: "Design",
          },
        ],
      },
    }),
  },
  {
    id: "jan-week-1",
    weekNumber: 1,
    weekRange: "Week 1 | Jan 1 - Jan 7, 2024",
    totalHours: 38,
    expectedHours: 40,
    days: mergeWeekDays("2024-01-01", {
      "2024-01-01": {
        dateKey: "2024-01-01",
        dateLabel: "Jan 1",
        tasks: [
          {
            id: "task-14",
            title: "Project kickoff",
            description: "Project kickoff",
            hours: 4,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Meeting",
          },
        ],
      },
      "2024-01-02": {
        dateKey: "2024-01-02",
        dateLabel: "Jan 2",
        tasks: [
          {
            id: "task-15",
            title: "Design system audit",
            description: "Design system audit",
            hours: 6,
            projectName: "Mobile App",
            projectCode: "MA",
            workType: "Research",
          },
        ],
      },
      "2024-01-03": {
        dateKey: "2024-01-03",
        dateLabel: "Jan 3",
        tasks: [
          {
            id: "task-16",
            title: "Build auth routes",
            description: "Build auth routes",
            hours: 7,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Development",
          },
        ],
      },
      "2024-01-04": {
        dateKey: "2024-01-04",
        dateLabel: "Jan 4",
        tasks: [
          {
            id: "task-17",
            title: "Validate QA checklist",
            description: "Validate QA checklist",
            hours: 5,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Testing",
          },
        ],
      },
      "2024-01-05": {
        dateKey: "2024-01-05",
        dateLabel: "Jan 5",
        tasks: [
          {
            id: "task-18",
            title: "Prototype table filters",
            description: "Prototype table filters",
            hours: 6,
            projectName: "Mobile App",
            projectCode: "MA",
            workType: "Design",
          },
        ],
      },
      "2024-01-06": {
        dateKey: "2024-01-06",
        dateLabel: "Jan 6",
        tasks: [
          {
            id: "task-19",
            title: "Write implementation notes",
            description: "Write implementation notes",
            hours: 5,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Research",
          },
        ],
      },
      "2024-01-07": {
        dateKey: "2024-01-07",
        dateLabel: "Jan 7",
        tasks: [
          {
            id: "task-20",
            title: "Team sync and planning",
            description: "Team sync and planning",
            hours: 5,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Meeting",
          },
        ],
      },
    }),
  },
  {
    id: "dec-week-1",
    weekNumber: 1,
    weekRange: "Week 1 | Dec 1 - Dec 7, 2023",
    totalHours: 36,
    expectedHours: 40,
    days: mergeWeekDays("2023-12-01", {
      "2023-12-01": {
        dateKey: "2023-12-01",
        dateLabel: "Dec 1",
        tasks: [
          {
            id: "task-21",
            title: "Requirements workshop",
            description: "Requirements workshop",
            hours: 4,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Meeting",
          },
        ],
      },
      "2023-12-02": {
        dateKey: "2023-12-02",
        dateLabel: "Dec 2",
        tasks: [
          {
            id: "task-22",
            title: "User research synthesis",
            description: "User research synthesis",
            hours: 6,
            projectName: "Mobile App",
            projectCode: "MA",
            workType: "Research",
          },
        ],
      },
      "2023-12-03": {
        dateKey: "2023-12-03",
        dateLabel: "Dec 3",
        tasks: [
          {
            id: "task-23",
            title: "API contract planning",
            description: "API contract planning",
            hours: 5,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Development",
          },
        ],
      },
      "2023-12-04": {
        dateKey: "2023-12-04",
        dateLabel: "Dec 4",
        tasks: [
          {
            id: "task-24",
            title: "Navigation design review",
            description: "Navigation design review",
            hours: 5,
            projectName: "Mobile App",
            projectCode: "MA",
            workType: "Design",
          },
        ],
      },
      "2023-12-05": {
        dateKey: "2023-12-05",
        dateLabel: "Dec 5",
        tasks: [
          {
            id: "task-25",
            title: "Accessibility QA",
            description: "Accessibility QA",
            hours: 4,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Testing",
          },
        ],
      },
      "2023-12-06": {
        dateKey: "2023-12-06",
        dateLabel: "Dec 6",
        tasks: [
          {
            id: "task-26",
            title: "Client feedback review",
            description: "Client feedback review",
            hours: 6,
            projectName: "Payroll Portal",
            projectCode: "PP",
            workType: "Meeting",
          },
        ],
      },
      "2023-12-07": {
        dateKey: "2023-12-07",
        dateLabel: "Dec 7",
        tasks: [
          {
            id: "task-27",
            title: "Component cleanup",
            description: "Component cleanup",
            hours: 6,
            projectName: "Website Redesign",
            projectCode: "WR",
            workType: "Development",
          },
        ],
      },
    }),
  },
];

export function getMockTimesheetSummaries() {
  return TIMESHEET_SUMMARIES;
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
