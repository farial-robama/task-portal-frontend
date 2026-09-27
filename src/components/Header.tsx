import { ClipboardCheck, Plus } from "lucide-react";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ onNewTask }: { onNewTask: () => void }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
            <ClipboardCheck size={20} />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-ink">Taskboard</h1>
            <p className="text-sm text-ink-muted">Track project work from open to done.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onNewTask}>
            <Plus size={16} />
            <span className="hidden sm:inline">New task</span>
          </Button>
          <ThemeToggle />
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white"
            title="Farial"
            aria-label="Signed in as Farial"
          >
            F
          </span>
        </div>
      </div>
    </header>
  );
}