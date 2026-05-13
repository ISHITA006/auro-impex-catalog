"use client";

import { FilterX, Search } from "lucide-react";
import {
  COLOR_OPTIONS,
  DESIGN_OPTIONS,
  EMBROIDERY_CATEGORY_OPTIONS,
  FABRIC_TYPE_OPTIONS,
  GARMENT_TYPE_OPTIONS,
  NECK_OPTIONS,
  PRINT_CATEGORY_OPTIONS,
} from "@/lib/catalogue-options";
import { CATEGORY_FILTER_BUTTONS, TARGET_FILTER_OPTIONS } from "@/app/catalogue/constants";
import { FilterSelect } from "@/app/catalogue/components/FilterSelect";
import { getColorSwatchStyle } from "@/app/catalogue/utils";
import type { Filters } from "@/app/catalogue/types";

type CatalogueFiltersProps = {
  filters: Filters;
  onSetFilter: <K extends keyof Filters>(key: K, value: string) => void;
  onClearAll: () => void;
  /** Prefix for the search input id (avoids duplicate ids when filters render in multiple places). */
  idPrefix?: string;
  /** Optimised layout for the mobile slide-over panel (touch-friendly category chips, single column). */
  variant?: "default" | "drawer";
};

export function CatalogueFilters({
  filters,
  onSetFilter,
  onClearAll,
  idPrefix = "",
  variant = "default",
}: CatalogueFiltersProps) {
  const targetLabel = TARGET_FILTER_OPTIONS.find((option) => option.value === filters.target)?.label ?? "";
  const isDrawer = variant === "drawer";

  const clearAllButton = (
    <button
      type="button"
      onClick={onClearAll}
      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-red-600 underline-offset-4 transition hover:text-red-700 hover:underline"
    >
      <FilterX className="h-4 w-4" />
      Clear all filters
    </button>
  );

  const categoryChips = CATEGORY_FILTER_BUTTONS.map((option) => {
    const isActive = filters.category === option.value;
    return (
      <button
        key={option.label}
        type="button"
        onClick={() => onSetFilter("category", option.value)}
        className={
          isDrawer
            ? `rounded-full border px-3 py-2 text-sm font-medium transition active:scale-[0.98] ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`
            : `rounded-t-md border border-b-0 px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "-mb-px scale-[1.02] border-foreground border-b-background border-b-0 bg-background text-foreground shadow-sm"
                  : "border-border border-b-0 bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`
        }
      >
        {option.label}
      </button>
    );
  });

  return (
    <section className={isDrawer ? "space-y-4" : undefined}>
      {isDrawer ? (
        <>
          <div className="flex justify-start">{clearAllButton}</div>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">{categoryChips}</div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="overflow-x-auto border-b-0 border-border px-1">
            <div className="inline-flex min-w-full items-end gap-1 py-1">{categoryChips}</div>
          </div>
          {clearAllButton}
        </div>
      )}

      <div className={isDrawer ? "rounded-xl bg-muted/30 p-4" : "rounded-lg border bg-card p-4"}>
        <div className={`grid gap-4 ${isDrawer ? "grid-cols-1" : "md:grid-cols-3 lg:grid-cols-4"}`}>
          <div className={`space-y-2 ${isDrawer ? "" : "md:col-span-3 lg:col-span-4"}`}>
            <label className="inline-flex items-center gap-1.5 text-sm font-medium" htmlFor={`${idPrefix}cat-q`}>
              Search
              <Search className="h-4 w-4 text-muted-foreground" />
            </label>
            <input
              id={`${idPrefix}cat-q`}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={filters.q}
              onChange={(e) => onSetFilter("q", e.target.value)}
              placeholder="Search name, description, garment code, fabric composition"
            />
          </div>

          <FilterSelect
            label="Category"
            value={targetLabel}
            options={TARGET_FILTER_OPTIONS.map((option) => option.label)}
            onChange={(label) => {
              const selectedTarget = TARGET_FILTER_OPTIONS.find((option) => option.label === label);
              onSetFilter("target", selectedTarget?.value ?? "");
            }}
          />
          <FilterSelect label="Garment type" value={filters.garment_type} options={GARMENT_TYPE_OPTIONS} onChange={(v) => onSetFilter("garment_type", v)} />
          <FilterSelect
            label="Colour"
            value={filters.color}
            options={COLOR_OPTIONS}
            onChange={(v) => onSetFilter("color", v)}
            renderOption={(option) => (
              <span className="inline-flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border border-border" style={getColorSwatchStyle(option)} />
                <span>{option}</span>
              </span>
            )}
          />
          <FilterSelect label="Neck" value={filters.neck} options={NECK_OPTIONS} onChange={(v) => onSetFilter("neck", v)} />
          <FilterSelect label="Fabric type" value={filters.fabric_type} options={FABRIC_TYPE_OPTIONS} onChange={(v) => onSetFilter("fabric_type", v)} />
          <FilterSelect label="Design" value={filters.design} options={DESIGN_OPTIONS} onChange={(v) => onSetFilter("design", v)} />
          <FilterSelect label="Print category" value={filters.print_category} options={PRINT_CATEGORY_OPTIONS} onChange={(v) => onSetFilter("print_category", v)} />
          <FilterSelect
            label="Embroidery category"
            value={filters.embroidery_category}
            options={EMBROIDERY_CATEGORY_OPTIONS}
            onChange={(v) => onSetFilter("embroidery_category", v)}
          />
        </div>
      </div>
    </section>
  );
}
