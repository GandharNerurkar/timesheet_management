"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  ProjectOption,
  TimesheetEntryFormValues,
  WorkType,
} from "@/types/timesheet";

const workTypeSchema = z.enum([
  "Development",
  "Design",
  "Research",
  "Meeting",
  "Testing",
]);

const entrySchema = z.object({
  projectId: z.string().min(1, "Project is required."),
  workType: workTypeSchema,
  description: z
    .string()
    .min(3, "Task description is required.")
    .max(240, "Description must be under 240 characters."),
  hours: z.number().min(1, "Hours must be at least 1.").max(24, "Hours cannot exceed 24."),
});

type TimesheetEntryFormProps = {
  initialValues?: TimesheetEntryFormValues;
  projects: ProjectOption[];
  workTypes: WorkType[];
  submitLabel: string;
  onSubmit: (values: TimesheetEntryFormValues) => void;
  onCancel: () => void;
};

const defaultValues: TimesheetEntryFormValues = {
  projectId: "",
  workType: "Development",
  description: "",
  hours: 1,
};

export function TimesheetEntryForm({
  initialValues,
  projects,
  workTypes,
  submitLabel,
  onSubmit,
  onCancel,
}: TimesheetEntryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TimesheetEntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: initialValues ?? defaultValues,
  });

  useEffect(() => {
    reset(initialValues ?? defaultValues);
  }, [initialValues, reset]);

  const hours = watch("hours");

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
      })}
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="projectId">
          Select Project
        </label>
        <Select id="projectId" {...register("projectId")}>
          <option value="">Choose project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </Select>
        {errors.projectId ? (
          <p className="text-sm text-red-600">{errors.projectId.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="workType">
          Type of Work
        </label>
        <Select id="workType" {...register("workType")}>
          {workTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        {errors.workType ? (
          <p className="text-sm text-red-600">{errors.workType.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="description">
          Task Description
        </label>
        <Textarea
          id="description"
          placeholder="Describe the work completed"
          error={errors.description?.message}
          {...register("description")}
        />
        {errors.description ? (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700" htmlFor="hours">
          Hours
        </label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-11 w-11 shrink-0 rounded-full p-0"
            onClick={() =>
              setValue("hours", Math.max(1, Number(hours) - 1), {
                shouldValidate: true,
              })
            }
            aria-label="Decrease hours"
          >
            -
          </Button>
          <Input
            id="hours"
            type="number"
            min={1}
            max={24}
            className="text-center"
            error={errors.hours?.message}
            {...register("hours", { valueAsNumber: true })}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-11 w-11 shrink-0 rounded-full p-0"
            onClick={() =>
              setValue("hours", Math.min(24, Number(hours) + 1), {
                shouldValidate: true,
              })
            }
            aria-label="Increase hours"
          >
            +
          </Button>
        </div>
        {errors.hours ? (
          <p className="text-sm text-red-600">{errors.hours.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
