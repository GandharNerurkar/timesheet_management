import { NextResponse } from "next/server";

import {
  getMockProjects,
  getMockWeeklyTimesheetById,
  getMockWorkTypes,
} from "@/data/mock/timesheets";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const timesheet = getMockWeeklyTimesheetById(id);

  if (!timesheet) {
    return NextResponse.json({ message: "Timesheet not found" }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      timesheet,
      projects: getMockProjects(),
      workTypes: getMockWorkTypes(),
    },
  });
}
