"use client";

import { valueOrDash } from "@/app/catalogue/utils";

type ViewFieldProps = {
  label: string;
  value: unknown;
  className?: string;
};

export function ViewField({ label, value, className }: ViewFieldProps) {
  return (
    <div className={`rounded-md border border-muted/70 bg-muted/20 px-3 py-2 ${className ?? ""}`}>
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 break-words text-sm font-medium text-foreground">{valueOrDash(value)}</div>
    </div>
  );
}
