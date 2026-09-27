"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/Button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Delete",
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-sm rounded-lg bg-surface p-5 shadow-modal">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-priority-high-soft p-2 text-priority-high">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h2 id="confirm-title" className="text-sm font-semibold text-ink">
              {title}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">{description}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button ref={cancelRef} variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
