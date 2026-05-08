"use client";

import { TimesheetTaskCard } from "@/components/timesheet/timesheet-task-card";
import type { TimesheetDayGroup } from "@/types/timesheet";

type TimesheetDayCardProps = {
  day: TimesheetDayGroup;
  onAddTask: (dayKey: string) => void;
  onEditTask: (dayKey: string, taskId: string) => void;
  onDeleteTask: (dayKey: string, taskId: string) => void;
};

export function TimesheetDayCard({
  day,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: TimesheetDayCardProps) {
  return (
    <section className="rounded-3xl p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="rounded-3xl p-5 min-w-[200px] sm:min-w-[200px] sm:max-w-[260px]">
          <h2 className="text-lg font-semibold text-slate-900">{day.dateLabel}</h2>
        </div>

        <div className="flex-1 space-y-3">
          {day.tasks.map((task) => (
            <TimesheetTaskCard
              key={task.id}
              task={task}
              dayKey={day.dateKey}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}

          <button
            type="button"
            onClick={() => onAddTask(day.dateKey)}
            className="flex w-full items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-blue-50 px-4 py-4 text-sm font-medium text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
          >
            + Add new task
          </button>
        </div>
      </div>
    </section>
  );
}
