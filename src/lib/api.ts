import { Task, TaskFormValues } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export class ApiRequestError extends Error {
  status: number;
  details?: { field: string; message: string }[];
  constructor(
    status: number,
    message: string,
    details?: { field: string; message: string }[]
  ) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new ApiRequestError(
      0,
      "Couldn't reach the server. Check that the backend is running."
    );
  }

  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiRequestError(
      res.status,
      body.error || "Something went wrong",
      body.details
    );
  }

  return body.data as T;
}

export const api = {
  listTasks: (params?: { status?: string; priority?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.priority) query.set("priority", params.priority);
    if (params?.search) query.set("search", params.search);
    const qs = query.toString();
    return request<Task[]>(`/tasks${qs ? `?${qs}` : ""}`);
  },
  createTask: (values: TaskFormValues) =>
    request<Task>("/tasks", { method: "POST", body: JSON.stringify(values) }),
  updateTask: (id: number, values: TaskFormValues) =>
    request<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    }),
  updateTaskStatus: (id: number, status: Task["status"]) =>
    request<Task>(`/tasks/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  deleteTask: (id: number) =>
    request<void>(`/tasks/${id}`, { method: "DELETE" }),
};
