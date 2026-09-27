"use client";

import { useMemo, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useToast } from "./ToastProvider";
import { Header } from "./Header";
import { FilterBar } from "./FilterBar";
import { TaskColumn } from "./TaskColumn";
import { TaskFormModal } from "./TaskFormModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { Task, STATUSES, Status, TaskFormValues } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TaskBoard() {
  const {
    tasks,
    isLoading,
    error,
    filters,
    setFilters,
    reload,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
  } = useTasks();
  const { notify } = useToast();

  const [formTask, setFormTask] = useState<Task | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<Status>("Pending");

  const grouped = useMemo(() => {
    const map: Record<Status, Task[]> = {
      Pending: [],
      "In Progress": [],
      Completed: [],
    };
    for (const task of tasks) map[task.status].push(task);
    return map;
  }, [tasks]);

  async function handleFormSubmit(values: TaskFormValues) {
    if (formTask === "new") {
      await createTask(values);
      notify("success", "Task created.");
    } else if (formTask) {
      await updateTask(formTask.id, values);
      notify("success", "Task updated.");
    }
    setFormTask(null);
  }

  async function handleStatusChange(task: Task, status: Status) {
    try {
      await updateStatus(task.id, status);
      notify("success", `Moved "${task.title}" to ${status}.`);
    } catch {
      notify("error", "Couldn't update the status. Please try again.");
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      await deleteTask(pendingDelete.id);
      notify("success", `Deleted "${pendingDelete.title}".`);
      setPendingDelete(null);
    } catch {
      notify("error", "Couldn't delete the task. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header onNewTask={() => setFormTask("new")} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <FilterBar
          search={filters.search}
          priority={filters.priority}
          onSearchChange={(search) => setFilters((f) => ({ ...f, search }))}
          onPriorityChange={(priority) => setFilters((f) => ({ ...f, priority }))}
        />

        {error && (
          <div className="mt-4 flex items-center justify-between rounded-md border border-priority-high bg-priority-high-soft px-4 py-3 text-sm text-priority-high">
            <span>{error}</span>
            <button onClick={reload} className="font-medium underline">
              Retry
            </button>
          </div>
        )}

        {/* Mobile column switcher */}
        <div className="mt-5 flex gap-1 rounded-md border border-border bg-surface p-1 sm:hidden">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveTab(s)}
              className={cn(
                "flex-1 rounded-sm py-1.5 text-xs font-medium",
                activeTab === s ? "bg-accent text-white" : "text-ink-muted"
              )}
            >
              {s} ({grouped[s].length})
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STATUSES.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={grouped[status]}
              isLoading={isLoading}
              className={cn(status !== activeTab && "hidden sm:block")}
              onEdit={setFormTask}
              onDelete={setPendingDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </main>

      {formTask && (
        <TaskFormModal
          task={formTask === "new" ? undefined : formTask}
          onSubmit={handleFormSubmit}
          onClose={() => setFormTask(null)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this task?"
          description={`"${pendingDelete.title}" will be permanently removed. This can't be undone.`}
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
