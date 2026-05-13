"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type MobileFiltersDrawerProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function MobileFiltersDrawer({ title = "Filters", onClose, children }: MobileFiltersDrawerProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/40" aria-label="Close filters" />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-hidden border-l bg-background shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filters-title"
      >
        <div className="flex shrink-0 items-center justify-between border-b bg-background px-4 py-3">
          <h2 id="mobile-filters-title" className="text-lg font-semibold tracking-tight">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border bg-background p-2 text-muted-foreground hover:text-foreground"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">{children}</div>
      </aside>
    </div>
  );
}
