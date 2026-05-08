"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import type { TimesheetSummary } from "@/types/timesheet";
import { getStatusTone } from "@/utils/timesheet";

type PageIndicator = number | "ellipsis";

type TimesheetsTableProps = {
  timesheets: TimesheetSummary[];
};

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

export function TimesheetsTable({ timesheets }: TimesheetsTableProps) {
  const [dateRange, setDateRange] = useState("all");
  const [status, setStatus] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const dateRangeOptions = useMemo(
    () => ["all", ...new Set(timesheets.map((item) => item.rangeKey))],
    [timesheets],
  );

  const filteredTimesheets = useMemo(() => {
    return timesheets.filter((item) => {
      const matchesRange = dateRange === "all" || item.rangeKey === dateRange;
      const matchesStatus = status === "all" || item.status === status;

      return matchesRange && matchesStatus;
    });
  }, [dateRange, status, timesheets]);

  const totalPages = Math.max(1, Math.ceil(filteredTimesheets.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredTimesheets.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const pageNumbers = useMemo<PageIndicator[]>(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  }, [currentPage, totalPages]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-[2.2rem] font-semibold tracking-tight text-slate-900">
            Your Timesheets
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Select
              id="date-range"
              className="h-13 w-full max-w-[190px]"
              value={dateRange}
              onChange={(event) => {
                setDateRange(event.target.value);
                setPage(1);
              }}
            >
              <option value="all">Date Range</option>
              {dateRangeOptions
                .filter((option) => option !== "all")
                .map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </Select>

            <Select
              id="status-filter"
              className="h-13 w-full max-w-[176px]"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="all">Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="INCOMPLETE">Incomplete</option>
              <option value="MISSING">Missing</option>
            </Select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-5 text-left text-[0.95rem] font-semibold uppercase tracking-wide text-slate-500">
                    WEEK # <span className="ml-3 text-slate-400">↓</span>
                  </th>
                  <th className="px-5 py-5 text-left text-[0.95rem] font-semibold uppercase tracking-wide text-slate-500">
                    DATE <span className="ml-3 text-slate-400">↓</span>
                  </th>
                  <th className="px-5 py-5 text-left text-[0.95rem] font-semibold uppercase tracking-wide text-slate-500">
                    STATUS <span className="ml-3 text-slate-400">↓</span>
                  </th>
                  <th className="px-5 py-5 text-right text-[0.95rem] font-semibold uppercase tracking-wide text-slate-500">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {pageItems.length > 0 ? (
                  pageItems.map((timesheet) => {
                    const actionLabel =
                      timesheet.status === "MISSING"
                        ? "Create"
                        : timesheet.status === "INCOMPLETE"
                          ? "Update"
                          : "View";

                    return (
                      <tr
                        key={timesheet.id}
                        className="border-t border-slate-200 hover:bg-slate-50/60"
                      >
                        <td className="whitespace-nowrap px-5 py-6 text-[1.05rem] text-slate-900">
                          {timesheet.weekNumber}
                        </td>
                        <td className="whitespace-nowrap px-5 py-6 text-[1.05rem] text-slate-500">
                          {timesheet.dateRange}
                        </td>
                        <td className="whitespace-nowrap px-5 py-6">
                          <Badge className={getStatusTone(timesheet.status)}>
                            {timesheet.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-6 text-right">
                          <Link
                            href={`/timesheet/${timesheet.id}`}
                            className="text-[1.05rem] font-medium text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                          >
                            {actionLabel}
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No timesheets match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-3 lg:flex-row lg:items-center lg:justify-between">
          <Select
            className="h-11 w-full max-w-[148px] rounded-2xl"
            aria-label="Rows per page"
            value={String(rowsPerPage)}
            onChange={(event) => {
              setRowsPerPage(Number(event.target.value));
              setPage(1);
            }}
          >
            {ROWS_PER_PAGE_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value} per page
              </option>
            ))}
          </Select>

          <div className="flex flex-wrap items-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              type="button"
              className="border-r border-slate-200 px-4 py-3 text-[1.05rem] text-slate-600 transition hover:bg-slate-50 disabled:text-slate-300"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((pageNumber, index) =>
              pageNumber === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="border-r border-slate-200 px-4 py-3 text-[1.05rem] text-slate-600"
                >
                  ...
                </span>
              ) : (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`min-w-11 border-r border-slate-200 px-4 py-3 text-[1.05rem] transition ${
                    currentPage === pageNumber
                      ? "font-semibold text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              className="px-4 py-3 text-[1.05rem] text-slate-600 transition hover:bg-slate-50 disabled:text-slate-300"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
