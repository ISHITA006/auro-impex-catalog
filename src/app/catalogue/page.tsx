"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CatalogueResponse } from "@/types/catalogue";
import { CatalogueFilters } from "@/app/catalogue/components/CatalogueFilters";
import { CatalogueGridSection } from "@/app/catalogue/components/CatalogueGridSection";
import { DetailDrawer } from "@/app/catalogue/components/DetailDrawer";
import { DEFAULT_FILTERS } from "@/app/catalogue/constants";
import { useCatalogueItems } from "@/app/catalogue/hooks/useCatalogueItems";
import type { Filters, SortBy, SortDir } from "@/app/catalogue/types";

export default function CataloguePage() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedItem, setSelectedItem] = useState<CatalogueResponse | null>(null);
  const { items, isLoading, error, resolvedPage } = useCatalogueItems({
    filters,
    page,
    sortBy,
    sortDir,
    router,
  });

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  }

  function setFilter<K extends keyof Filters>(key: K, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearAll() {
    setFilters(DEFAULT_FILTERS);
    setSortBy("updated_at");
    setSortDir("desc");
    setPage(1);
  }

  const rows: CatalogueResponse[] = items?.data ?? [];
  const canPrev = resolvedPage > 1;
  const canNext = items ? resolvedPage < items.page_count : false;

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container space-y-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Auro Impex Catalogue</h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <CatalogueFilters filters={filters} onSetFilter={setFilter} onClearAll={clearAll} />
        <CatalogueGridSection
          isLoading={isLoading}
          error={error}
          items={items}
          rows={rows}
          canPrev={canPrev}
          canNext={canNext}
          onOpenItem={setSelectedItem}
          onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
          onNextPage={() => setPage((p) => p + 1)}
        />
      </div>
      {selectedItem ? <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} /> : null}
    </main>
  );
}
