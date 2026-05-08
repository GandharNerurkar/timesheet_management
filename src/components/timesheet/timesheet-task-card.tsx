"use client";

import { Badge } from "@/components/ui/badge";
import type { TimesheetTask } from "@/types/timesheet";
import { getProjectTone } from "@/utils/timesheet";

type TimesheetTaskCardProps = {
  task: TimesheetTask;
  dayKey: string;
  onEdit: (dayKey: string, taskId: string) => void;
  onDelete: (dayKey: string, taskId: string) => void;
};

export function TimesheetTaskCard({ task, dayKey, onEdit, onDelete }: TimesheetTaskCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{task.workType}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {task.hours} hrs
        </span>
        <Badge className={getProjectTone(task.projectCode)}>{task.projectCode}</Badge>
        <details className="relative">
          <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
            ...
          </summary>
          <div className="absolute right-0 z-10 mt-2 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            <button
              type="button"
              className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              onClick={() => onEdit(dayKey, task.id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
              onClick={() => onDelete(dayKey, task.id)}
            >
              Delete
            </button>
          </div>
        </details>
      </div>
    </article>
  );
}
