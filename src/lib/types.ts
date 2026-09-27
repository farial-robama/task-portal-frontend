export type Priority = "Low" | "Medium" | "High";
export type Status = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}

export const STATUSES: Status[] = ["Pending", "In Progress", "Completed"];
export const PRIORITIES: Priority[] = ["Low", "Medium", "High"];
