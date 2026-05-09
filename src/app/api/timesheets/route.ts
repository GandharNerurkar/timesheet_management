import { NextResponse } from "next/server";

import { getMockTimesheetSummaries } from "@/__tests__/mocks/timesheets";

export async function GET() {
  return NextResponse.json({
    data: {
      timesheets: getMockTimesheetSummaries(),
    },
  });
}
