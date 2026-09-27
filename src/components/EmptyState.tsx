import { ClipboardList } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-border px-4 py-8 text-center">
      <ClipboardList size={22} className="text-ink-muted" />
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="text-xs text-ink-muted">{description}</p>
    </div>
  );
}
