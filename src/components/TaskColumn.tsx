"use client";

import { CheckCircle2, Clock, MoreVertical, PlayCircle } from "lucide-react";
import { Skeleton } from "./ui/Skeleton";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyState";
import { Task, Status } from "@/lib/types";

const COLUMN_META: Record<
  Status,
  { label: string; icon: typeof Clock; iconBg: string; banner: string }
> = {
  Pending: {
    label: "Pending",
    icon: Clock,
    iconBg: "bg-status-pending text-white",
    banner: "bg-status-pending-soft",
  },
  "In Progress": {
    label: "In Progress",
    icon: PlayCircle,
    iconBg: "bg-status-progress text-white",
    banner: "bg-status-progress-soft",
  },
  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    iconBg: "bg-status-completed text-white",
    banner: "bg-status-completed-soft",
  },
};

const EMPTY_TONE: Record<Status, "pending" | "progress" | "completed"> = {
  Pending: "pending",
  "In Progress": "progress",
  Completed: "completed",
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
  const Icon = meta.icon;

  return (
    <section
      className={`overflow-hidden rounded-lg border border-border bg-surface shadow-card ${className ?? ""}`}
      aria-label={`${status} tasks`}
    >
      <div className={`flex items-center justify-between gap-2 px-4 py-3 ${meta.banner}`}>
        <div className="flex items-center gap-2.5">
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${meta.iconBg}`}>
            <Icon size={16} />
          </span>
          <h2 className="text-sm font-semibold text-ink">{meta.label}</h2>
          <span className="rounded-full bg-surface/70 px-2 py-0.5 text-xs font-medium text-ink-muted">
            {tasks.length}
          </span>
        </div>
       
        <button
          type="button"
          aria-label={`${meta.label} column options`}
          className="rounded p-1 text-ink-muted/70 hover:bg-surface/70 hover:text-ink"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="column-scroll flex flex-col gap-2.5 overflow-y-auto p-3 sm:max-h-[calc(100vh-300px)]">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}

        {!isLoading && tasks.length === 0 && (
          <EmptyState
            icon={Icon}
            tone={EMPTY_TONE[status]}
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