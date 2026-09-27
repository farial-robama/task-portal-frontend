import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "pending" | "progress" | "completed";

const TONE_CLASSES: Record<Tone, { circle: string; dots: string }> = {
  pending: { circle: "bg-status-pending-soft text-status-pending", dots: "bg-status-pending/50" },
  progress: { circle: "bg-status-progress-soft text-status-progress", dots: "bg-status-progress/50" },
  completed: { circle: "bg-status-completed-soft text-status-completed", dots: "bg-status-completed/50" },
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  tone = "pending",
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  const t = TONE_CLASSES[tone];
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-border px-4 py-8 text-center">
      <div className="relative">
        <span aria-hidden="true" className={cn("absolute -left-3 -top-1 h-1.5 w-1.5 rounded-full", t.dots)} />
        <span aria-hidden="true" className={cn("absolute -right-3 top-2 h-1 w-1 rounded-full", t.dots)} />
        <span aria-hidden="true" className={cn("absolute -right-2 -bottom-1 h-1.5 w-1.5 rounded-full", t.dots)} />
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-full", t.circle)}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-1 text-sm font-medium text-ink">{title}</p>
      <p className="text-xs text-ink-muted">{description}</p>
    </div>
  );
}