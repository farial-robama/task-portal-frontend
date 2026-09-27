"use client";

import { useCallback, useEffect, useState } from "react";
import { api, ApiRequestError } from "@/lib/api";
import { Task, TaskFormValues } from "@/lib/types";

interface Filters {
  search: string;
  priority: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ search: "", priority: "" });

  const load = useCallback(async (f: Filters = filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.listTasks({
        search: f.search || undefined,
        priority: f.priority || undefined,
      });
      setTasks(data);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : "Couldn't load tasks. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => load(filters), 250); 
    return () => clearTimeout(timeout);
  }, [filters.search, filters.priority]);

  const createTask = useCallback(async (values: TaskFormValues) => {
    const created = await api.createTask(values);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateTask = useCallback(async (id: number, values: TaskFormValues) => {
    const updated = await api.updateTask(id, values);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const updateStatus = useCallback(async (id: number, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    try {
      await api.updateTaskStatus(id, status);
    } catch (err) {
      await load(filters); 
      throw err;
    }
  }, [filters, load]);

  const deleteTask = useCallback(async (id: number) => {
    const prev = tasks;
    setTasks((p) => p.filter((t) => t.id !== id));
    try {
      await api.deleteTask(id);
    } catch (err) {
      setTasks(prev); 
      throw err;
    }
  }, [tasks]);

  return {
    tasks,
    isLoading,
    error,
    filters,
    setFilters,
    reload: () => load(filters),
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
  };
}
