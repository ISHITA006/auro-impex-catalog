import type { CSSProperties } from "react";

export function valueOrDash(v: unknown): string {
  const value = String(v ?? "").trim();
  return value === "" ? "—" : value;
}

export function getColorSwatchStyle(color: string): CSSProperties {
  const normalized = color.trim().toLowerCase();
  const colorMap: Record<string, string> = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
    purple: "#a855f7",
    pink: "#ec4899",
    orange: "#f97316",
    black: "#111827",
    brown: "#8b5e3c",
    grey: "#6b7280",
    beige: "#d6c6a5",
    white: "#ffffff",
  };

  if (normalized === "multi-colour") {
    return {
      backgroundImage: "linear-gradient(135deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #a855f7)",
    };
  }

  return { backgroundColor: colorMap[normalized] ?? "#9ca3af" };
}
