"use client";

import { useMemo, useState } from "react";

import { TimesheetEntryModal } from "@/components/modal/timesheet-entry-modal";
import { Badge } from "@/components/ui/badge";
import type {
  ProjectOption,
  TimesheetDayGroup,
  TimesheetEntryFormValues,
  TimesheetTask,
  WeeklyTimesheet,
  WorkType,
} from "@/types/timesheet";
import {
  getProgressPercentage,
  getProjectTone,
  normalizeTimesheetDays,
} from "@/utils/timesheet";

type WeeklyTimesheetDetailsProps = {
  timesheet: WeeklyTimesheet;
  projects: ProjectOption[];
  workTypes: WorkType[];
};

type DialogState =
  | { mode: "create"; dayKey: string }
  | { mode: "edit"; dayKey: string; taskId: string }
  | null;

export function WeeklyTimesheetDetails({
  timesheet,
  projects,
  workTypes,
}: WeeklyTimesheetDetailsProps) {
  const [currentTimesheet, setCurrentTimesheet] = useState(() => ({
    ...timesheet,
    days: normalizeTimesheetDays(timesheet.weekRange, timesheet.days),
  }));
  const [dialogState, setDialogState] = useState<DialogState>(null);

  const progress = getProgressPercentage(
    currentTimesheet.totalHours,
    currentTimesheet.expectedHours,
  );

  const selectedTask = useMemo(() => {
    if (!dialogState || dialogState.mode !== "edit") {
      return null;
    }

    const day = currentTimesheet.days.find((item) => item.dateKey === dialogState.dayKey);
    return day?.tasks.find((task) => task.id === dialogState.taskId) ?? null;
  }, [currentTimesheet.days, dialogState]);

  const initialFormValues = useMemo<TimesheetEntryFormValues | undefined>(() => {
    if (!selectedTask) {
      return undefined;
    }

    return {
      projectId:
        projects.find((project) => project.name === selectedTask.projectName)?.id ?? "",
      workType: selectedTask.workType,
      description: selectedTask.description,
      hours: selectedTask.hours,
    };
  }, [projects, selectedTask]);

  const updateTimesheetDays = (
    days: TimesheetDayGroup[],
    dayKey: string,
    updater: (tasks: TimesheetTask[]) => TimesheetTask[],
  ) =>
    days.map((day) =>
      day.dateKey === dayKey ? { ...day, tasks: updater(day.tasks) } : day,
    );

  const recalculateTotalHours = (days: TimesheetDayGroup[]) =>
    days.reduce(
      (total, day) =>
        total + day.tasks.reduce((dayTotal, task) => dayTotal + task.hours, 0),
      0,
    );

  const handleDelete = (dayKey: string, taskId: string) => {
    const nextDays = updateTimesheetDays(currentTimesheet.days, dayKey, (tasks) =>
      tasks.filter((task) => task.id !== taskId),
    );

    setCurrentTimesheet((previous) => ({
      ...previous,
      days: nextDays,
      totalHours: recalculateTotalHours(nextDays),
    }));
  };

  const handleSubmit = (values: TimesheetEntryFormValues) => {
    if (!dialogState) {
      return;
    }

    const project = projects.find((item) => item.id === values.projectId);
    if (!project) {
      return;
    }

    const nextDays =
      dialogState.mode === "create"
        ? updateTimesheetDays(currentTimesheet.days, dialogState.dayKey, (tasks) => [
            ...tasks,
            {
              id: `task-${crypto.randomUUID()}`,
              title: values.description,
              description: values.description,
              hours: values.hours,
              projectName: project.name,
              projectCode: project.code,
              workType: values.workType,
            },
          ])
        : updateTimesheetDays(currentTimesheet.days, dialogState.dayKey, (tasks) =>
            tasks.map((task) =>
              task.id === dialogState.taskId
                ? {
                    ...task,
                    title: values.description,
                    description: values.description,
                    hours: values.hours,
                    projectName: project.name,
                    projectCode: project.code,
                    workType: values.workType,
                  }
                : task,
            ),
          );

    setCurrentTimesheet((previous) => ({
      ...previous,
      days: nextDays,
      totalHours: recalculateTotalHours(nextDays),
    }));
    setDialogState(null);
  };

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              This week&apos;s timesheet
            </h1>
            <p className="mt-2 text-sm text-slate-500">{currentTimesheet.weekRange}</p>
          </div>

          <div className="w-full max-w-sm rounded-2xl bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Progress</span>
              <span className="text-sm font-semibold text-slate-900">
                {currentTimesheet.totalHours}/{currentTimesheet.expectedHours} hrs
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-right text-sm font-medium text-blue-700">{progress}%</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {currentTimesheet.days.map((day) => (
            <section key={day.dateKey} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">{day.dateLabel}</h2>
                <span className="text-sm text-slate-500">
                  {day.tasks.reduce((total, task) => total + task.hours, 0)} hrs logged
                </span>
              </div>

              <div className="space-y-3">
                {day.tasks.map((task) => (
                  <article
                    key={task.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{task.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{task.workType}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
                        {task.hours} hrs
                      </span>
                      <Badge className={getProjectTone(task.projectCode)}>
                        {task.projectCode}
                      </Badge>
                      <details className="relative">
                        <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
                          ...
                        </summary>
                        <div className="absolute right-0 z-10 mt-2 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                          <button
                            type="button"
                            className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                            onClick={() =>
                              setDialogState({
                                mode: "edit",
                                dayKey: day.dateKey,
                                taskId: task.id,
                              })
                            }
                          >
                            Edit entry
                          </button>
                          <button
                            type="button"
                            className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
                            onClick={() => handleDelete(day.dateKey, task.id)}
                          >
                            Delete entry
                          </button>
                        </div>
                      </details>
                    </div>
                  </article>
                ))}

                <button
                  type="button"
                  onClick={() => setDialogState({ mode: "create", dayKey: day.dateKey })}
                  className="flex w-full items-center justify-center rounded-2xl border border-dashed border-blue-200 bg-blue-50 px-4 py-4 text-sm font-medium text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                >
                  Add new task
                </button>
              </div>
            </section>
          ))}
        </div>
      </section>

      <TimesheetEntryModal
        open={Boolean(dialogState)}
        mode={dialogState?.mode ?? "create"}
        projects={projects}
        workTypes={workTypes}
        initialValues={initialFormValues}
        onClose={() => setDialogState(null)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
