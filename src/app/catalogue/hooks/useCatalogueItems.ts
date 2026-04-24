"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TARGET_FILTER_OPTIONS } from "@/app/catalogue/constants";
import type { Filters, SortBy, SortDir } from "@/app/catalogue/types";
import type { CatalogueListResponse } from "@/types/catalogue";

type UseCatalogueItemsArgs = {
  filters: Filters;
  page: number;
  sortBy: SortBy;
  sortDir: SortDir;
  router: AppRouterInstance;
};

function buildCatalogueParams({
  filters,
  page,
  sortBy,
  sortDir,
}: Omit<UseCatalogueItemsArgs, "router">): URLSearchParams {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("page_size", "9");
  params.set("sort_by", sortBy);
  params.set("sort_dir", sortDir);

  for (const [key, value] of Object.entries(filters)) {
    if (key === "target") continue;
    if (value.trim()) {
      params.set(key, value.trim());
    }
  }

  const selectedTarget = TARGET_FILTER_OPTIONS.find((option) => option.value === filters.target);
  if (selectedTarget) {
    params.set("gender", selectedTarget.gender);
    params.set("age", selectedTarget.age);
  }

  return params;
}

export function useCatalogueItems({ filters, page, sortBy, sortDir, router }: UseCatalogueItemsArgs) {
  const [items, setItems] = useState<CatalogueListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const resolvedPage = useMemo(() => Math.max(1, page), [page]);

  useEffect(() => {
    async function loadItems() {
      setIsLoading(true);
      setError("");

      const params = buildCatalogueParams({
        filters,
        page: resolvedPage,
        sortBy,
        sortDir,
      });

      const response = await fetch(`/api/catalogue/items?${params.toString()}`, {
        cache: "no-store",
      });

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        setError("Unable to fetch catalogue items.");
        setIsLoading(false);
        return;
      }

      const data = (await response.json()) as CatalogueListResponse;
      setItems(data);
      setIsLoading(false);
      router.replace(`/catalogue?${params.toString()}`);
    }

    void loadItems();
  }, [resolvedPage, filters, sortBy, sortDir, router]);

  return { items, isLoading, error, resolvedPage };
}
