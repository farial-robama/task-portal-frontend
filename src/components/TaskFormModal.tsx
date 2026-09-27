"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { Task, TaskFormValues, PRIORITIES, STATUSES } from "@/lib/types";

interface TaskFormModalProps {
  task?: Task;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onClose: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
}

const EMPTY_VALUES: TaskFormValues = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Pending",
};

export function TaskFormModal({ task, onSubmit, onClose }: TaskFormModalProps) {
  const [values, setValues] = useState<TaskFormValues>(
    task
      ? {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
        }
      : EMPTY_VALUES
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!values.title.trim()) next.title = "Title is required";
    else if (values.title.length > 120) next.title = "Keep titles under 120 characters";
    if (values.description.length > 2000)
      next.description = "Keep descriptions under 2000 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Couldn't save the task. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div className="w-full max-w-md rounded-lg bg-surface p-5 shadow-modal">
        <div className="flex items-center justify-between">
          <h2 id="task-form-title" className="font-display text-lg font-semibold text-ink">
            {task ? "Edit task" : "New task"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded p-1 text-ink-muted hover:bg-bg hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink">
              Title
            </label>
            <Input
              id="title"
              ref={titleRef}
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              placeholder="e.g. Set up staging environment"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="mt-1 text-xs text-priority-high">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink">
              Description
            </label>
            <Textarea
              id="description"
              rows={3}
              value={values.description}
              onChange={(e) => setValues({ ...values, description: e.target.value })}
              placeholder="What needs to happen, and any useful context"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-xs text-priority-high">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="priority" className="mb-1 block text-sm font-medium text-ink">
                Priority
              </label>
              <Select
                id="priority"
                value={values.priority}
                onChange={(e) =>
                  setValues({ ...values, priority: e.target.value as TaskFormValues["priority"] })
                }
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-ink">
                Status
              </label>
              <Select
                id="status"
                value={values.status}
                onChange={(e) =>
                  setValues({ ...values, status: e.target.value as TaskFormValues["status"] })
                }
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {submitError && (
            <p className="rounded-md bg-priority-high-soft px-3 py-2 text-sm text-priority-high">
              {submitError}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {task ? "Save changes" : "Create task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
