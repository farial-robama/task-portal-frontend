"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { PRIORITIES } from "@/lib/types";

interface FilterBarProps {
  search: string;
  priority: string;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export function FilterBar({
  search,
  priority,
  onSearchChange,
  onPriorityChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks by title or description"
          className="rounded-full pl-9 shadow-card"
          aria-label="Search tasks"
        />
      </div>
      <div className="sm:w-44">
        <Select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-full shadow-card"
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p} priority
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
