"use client";

import { useMemo } from "react";
import type { CatalogueResponse } from "@/types/catalogue";
import { CardImageCarousel } from "@/app/catalogue/components/CardImageCarousel";
import { valueOrDash } from "@/app/catalogue/utils";

type CatalogueCardProps = {
  item: CatalogueResponse;
  onOpen: () => void;
};

export function CatalogueCard({ item, onOpen }: CatalogueCardProps) {
  const imageKeys = useMemo(
    () => (item.images ?? []).map((img) => img.image_s3_key).filter((key): key is string => Boolean(key)),
    [item.images],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className="group w-full cursor-pointer overflow-hidden rounded-lg border bg-background text-left transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <CardImageCarousel s3Keys={imageKeys} alt={item.name || item.garment_code || "catalogue"} />
      <div className="space-y-1 border-t p-3">
        <p className="line-clamp-1 text-sm font-semibold text-foreground">{valueOrDash(item.name)}</p>
        <p className="line-clamp-1 text-xs text-muted-foreground">{valueOrDash(item.garment_code)}</p>
        <p className="line-clamp-1 text-xs text-muted-foreground">{valueOrDash(item.garment_type)}</p>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {valueOrDash(item.gender)} ({valueOrDash(item.age)})
        </p>
      </div>
    </div>
  );
}
