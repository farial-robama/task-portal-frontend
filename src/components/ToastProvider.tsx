"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "error";
interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastContextValue {
  notify: (kind: ToastKind, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const notify = useCallback((kind: ToastKind, message: string) => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
        role="status"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-start gap-2 rounded-md border bg-surface px-4 py-3 shadow-modal",
              t.kind === "success" ? "border-status-completed" : "border-priority-high"
            )}
          >
            {t.kind === "success" ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-status-completed" />
            ) : (
              <XCircle size={18} className="mt-0.5 shrink-0 text-priority-high" />
            )}
            <p className="flex-1 text-sm text-ink">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-ink-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
