import { NextResponse } from "next/server";

import { getMockTimesheetSummaries } from "@/data/mock/timesheets";

export async function GET() {
  return NextResponse.json({
    data: {
      timesheets: getMockTimesheetSummaries(),
    },
  });
}
