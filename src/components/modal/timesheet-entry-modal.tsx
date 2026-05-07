"use client";

import { TimesheetEntryForm } from "@/components/forms/timesheet-entry-form";
import { Modal } from "@/components/modal/modal";
import type {
  ProjectOption,
  TimesheetEntryFormValues,
  WorkType,
} from "@/types/timesheet";

type TimesheetEntryModalProps = {
  open: boolean;
  mode: "create" | "edit";
  projects: ProjectOption[];
  workTypes: WorkType[];
  initialValues?: TimesheetEntryFormValues;
  onClose: () => void;
  onSubmit: (values: TimesheetEntryFormValues) => void;
};

export function TimesheetEntryModal({
  open,
  mode,
  projects,
  workTypes,
  initialValues,
  onClose,
  onSubmit,
}: TimesheetEntryModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Add entry" : "Edit entry"}
      description="Capture project, work type, hours, and a short task summary."
    >
      <TimesheetEntryForm
        initialValues={initialValues}
        projects={projects}
        workTypes={workTypes}
        submitLabel={mode === "create" ? "Add entry" : "Update entry"}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
