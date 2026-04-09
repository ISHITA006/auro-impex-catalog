"use client";

import type { CatalogueListResponse, CatalogueResponse } from "@/types/catalogue";
import { CatalogueCard } from "@/app/catalogue/components/CatalogueCard";

type CatalogueGridSectionProps = {
  isLoading: boolean;
  error: string;
  items: CatalogueListResponse | null;
  rows: CatalogueResponse[];
  canPrev: boolean;
  canNext: boolean;
  onOpenItem: (item: CatalogueResponse) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

export function CatalogueGridSection({
  isLoading,
  error,
  items,
  rows,
  canPrev,
  canNext,
  onOpenItem,
  onPrevPage,
  onNextPage,
}: CatalogueGridSectionProps) {
  return (
    <section className="overflow-hidden rounded-lg border bg-card">
      <div className="p-4">
        {isLoading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-sm text-destructive">{error}</div>
        ) : rows.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((item) => (
              <CatalogueCard key={item.uid} item={item} onOpen={() => onOpenItem(item)} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">No items found.</div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
        <div className="text-sm text-muted-foreground">
          {isLoading ? (
            <span>Loading...</span>
          ) : items ? (
            <span>
              Showing page <span className="font-medium text-foreground">{items.page}</span> of{" "}
              <span className="font-medium text-foreground">{items.page_count}</span> (total{" "}
              <span className="font-medium text-foreground">{items.total}</span>)
            </span>
          ) : (
            <span>—</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPage}
            disabled={!canPrev || isLoading}
            className="rounded-md border bg-background px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={onNextPage}
            disabled={!canNext || isLoading}
            className="rounded-md border bg-background px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
