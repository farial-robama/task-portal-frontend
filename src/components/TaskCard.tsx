"use client";

import { Pencil, Trash2 } from "lucide-react";
import { PriorityBadge } from "./Badge";
import { Task, Status } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Select } from "./ui/Select";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Status) => void;
}

const STATUS_OPTIONS: Status[] = ["Pending", "In Progress", "Completed"];

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <article className="group rounded-md border border-border bg-surface p-3.5 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-ink">{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="mt-1.5 line-clamp-3 text-sm text-ink-muted">
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xs text-ink-muted">{formatDate(task.created_at)}</span>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            onClick={onEdit}
            aria-label={`Edit ${task.title}`}
            className="rounded p-1.5 text-ink-muted hover:bg-bg hover:text-ink"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={onDelete}
            aria-label={`Delete ${task.title}`}
            className="rounded p-1.5 text-ink-muted hover:bg-priority-high-soft hover:text-priority-high"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mt-3 border-t border-border pt-2.5">
        <Select
          aria-label={`Change status for ${task.title}`}
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value as Status)}
          className="py-1.5 text-xs"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              Move to: {s}
            </option>
          ))}
        </Select>
      </div>
    </article>
  );
}
