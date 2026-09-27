import { cn } from "@/lib/utils";
import { Priority, Status } from "@/lib/types";

const priorityClasses: Record<Priority, string> = {
  High: "bg-priority-high-soft text-priority-high",
  Medium: "bg-priority-medium-soft text-priority-medium",
  Low: "bg-priority-low-soft text-priority-low",
};

const statusClasses: Record<Status, string> = {
  Pending: "bg-status-pending-soft text-status-pending",
  "In Progress": "bg-status-progress-soft text-status-progress",
  Completed: "bg-status-completed-soft text-status-completed",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
        priorityClasses[priority]
      )}
    >
      {priority}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
        statusClasses[status]
      )}
    >
      {status}
    </span>
  );
}
