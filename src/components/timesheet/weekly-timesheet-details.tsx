"use client";

import { useMemo, useState } from "react";

import { TimesheetEntryModal } from "@/components/modal/timesheet-entry-modal";
import { TimesheetDayCard } from "@/components/timesheet/timesheet-day-card";
import { WeeklyHeader } from "@/components/timesheet/weekly-header";
import type {
  ProjectOption,
  TimesheetEntryFormValues,
  TimesheetTask,
  WeeklyTimesheet,
  WorkType,
} from "@/types/timesheet";
import { getProgressPercentage, normalizeTimesheetDays } from "@/utils/timesheet";

type WeeklyTimesheetDetailsProps = {
  timesheet: WeeklyTimesheet;
  projects: ProjectOption[];
  workTypes: WorkType[];
};

type DialogState =
  | { mode: "create"; dayKey: string }
  | { mode: "edit"; dayKey: string; taskId: string }
  | null;

function getInitialFormValues(
  projects: ProjectOption[],
  selectedTask: TimesheetTask | null,
): TimesheetEntryFormValues | undefined {
  if (!selectedTask) {
    return undefined;
  }

  return {
    projectId: projects.find((project) => project.name === selectedTask.projectName)?.id ?? "",
    workType: selectedTask.workType,
    description: selectedTask.description,
    hours: selectedTask.hours,
  };
}

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

  const progressPercentage = getProgressPercentage(
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

  const initialFormValues = useMemo(
    () => getInitialFormValues(projects, selectedTask),
    [projects, selectedTask],
  );

  const updateDayTasks = (
    dayKey: string,
    updater: (tasks: TimesheetTask[]) => TimesheetTask[],
  ) =>
    setCurrentTimesheet((previous) => {
      const nextDays = previous.days.map((day) =>
        day.dateKey === dayKey ? { ...day, tasks: updater(day.tasks) } : day,
      );

      return {
        ...previous,
        days: nextDays,
        totalHours: nextDays.reduce(
          (total, day) => total + day.tasks.reduce((sum, task) => sum + task.hours, 0),
          0,
        ),
      };
    });

  const handleDeleteTask = (dayKey: string, taskId: string) => {
    updateDayTasks(dayKey, (tasks) => tasks.filter((task) => task.id !== taskId));
  };

  const handleSubmit = (values: TimesheetEntryFormValues) => {
    if (!dialogState) {
      return;
    }

    const project = projects.find((item) => item.id === values.projectId);
    if (!project) {
      return;
    }

    const newTask = {
      id: `task-${crypto.randomUUID()}`,
      title: values.description,
      description: values.description,
      hours: values.hours,
      projectName: project.name,
      projectCode: project.code,
      workType: values.workType,
    };

    if (dialogState.mode === "create") {
      updateDayTasks(dialogState.dayKey, (tasks) => [...tasks, newTask]);
    } else {
      updateDayTasks(dialogState.dayKey, (tasks) =>
        tasks.map((task) =>
          task.id === dialogState.taskId ? { ...task, ...newTask, id: task.id } : task,
        ),
      );
    }

    setDialogState(null);
  };

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <WeeklyHeader
          weekRange={currentTimesheet.weekRange}
          totalHours={currentTimesheet.totalHours}
          expectedHours={currentTimesheet.expectedHours}
          progressPercentage={progressPercentage}
        />

        <div className="mt-6 space-y-6">
          {currentTimesheet.days.map((day) => (
            <TimesheetDayCard
              key={day.dateKey}
              day={day}
              onAddTask={(dayKey) => setDialogState({ mode: "create", dayKey })}
              onEditTask={(dayKey, taskId) => setDialogState({ mode: "edit", dayKey, taskId })}
              onDeleteTask={handleDeleteTask}
            />
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
