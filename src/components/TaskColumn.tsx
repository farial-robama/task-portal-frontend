"use client";

import { Skeleton } from "./ui/Skeleton";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyState";
import { Task, Status } from "@/lib/types";

const COLUMN_META: Record<Status, { accent: string; label: string }> = {
  Pending: { accent: "bg-status-pending", label: "Pending" },
  "In Progress": { accent: "bg-status-progress", label: "In Progress" },
  Completed: { accent: "bg-status-completed", label: "Completed" },
};

interface TaskColumnProps {
  status: Status;
  tasks: Task[];
  isLoading: boolean;
  className?: string;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: Status) => void;
}

export function TaskColumn({
  status,
  tasks,
  isLoading,
  className,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskColumnProps) {
  const meta = COLUMN_META[status];

  return (
    <section className={className} aria-label={`${status} tasks`}>
      <div className="flex items-center gap-2 pb-3">
        <span className={`h-2 w-2 rounded-full ${meta.accent}`} aria-hidden="true" />
        <h2 className="text-sm font-semibold text-ink">{meta.label}</h2>
        <span className="text-xs text-ink-muted">{tasks.length}</span>
      </div>

      <div className="column-scroll flex flex-col gap-2.5 overflow-y-auto sm:max-h-[calc(100vh-260px)]">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}

        {!isLoading && tasks.length === 0 && (
          <EmptyState
            title={`No ${meta.label.toLowerCase()} tasks`}
            description={
              status === "Pending"
                ? "New tasks will show up here first."
                : "Move a task here, or create one with this status."
            }
          />
        )}

        {!isLoading &&
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task)}
              onStatusChange={(s) => onStatusChange(task, s)}
            />
          ))}
      </div>
    </section>
  );
}
