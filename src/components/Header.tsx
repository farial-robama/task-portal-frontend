import { Plus } from "lucide-react";
import { Button } from "./ui/Button";

export function Header({ onNewTask }: { onNewTask: () => void }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">Taskboard</h1>
          <p className="text-sm text-ink-muted">Track project work from open to done.</p>
        </div>
        <Button onClick={onNewTask}>
          <Plus size={16} />
          <span className="hidden sm:inline">New task</span>
        </Button>
      </div>
    </header>
  );
}
