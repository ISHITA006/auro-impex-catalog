"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { CatalogueResponse } from "@/types/catalogue";
import { valueOrDash } from "@/app/catalogue/utils";
import { PresignedLargeImage } from "@/app/catalogue/components/PresignedLargeImage";
import { FullscreenImageCarousel } from "@/app/catalogue/components/FullscreenImageCarousel";
import { ViewField } from "@/app/catalogue/components/ViewField";

type DetailDrawerProps = {
  item: CatalogueResponse;
  onClose: () => void;
};

export function DetailDrawer({ item, onClose }: DetailDrawerProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const imageKeys = useMemo(
    () => (item.images ?? []).map((img) => img.image_s3_key).filter((key): key is string => Boolean(key)),
    [item.images],
  );

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/40" aria-label="Close detail view" />
      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l bg-background shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b bg-background px-5 py-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{item.name || "Catalogue item"}</h3>
            <p className="text-sm text-muted-foreground">{valueOrDash(item.garment_code)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border bg-background p-2 text-muted-foreground hover:text-foreground"
            aria-label="Close detail view"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <section className="space-y-3">
            <h4 className="text-base font-semibold">Images</h4>
            <div className="flex flex-wrap gap-3">
              {imageKeys.length ? (
                imageKeys.map((imageKey, index) => (
                  <PresignedLargeImage
                    key={imageKey}
                    s3Key={imageKey}
                    alt={item.name || item.garment_code || "catalogue"}
                    onClick={() => setPreviewIndex(index)}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No images available.</p>
              )}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ViewField label="Garment code" value={item.garment_code} />
            <ViewField label="Name" value={item.name} className="md:col-span-2 lg:col-span-2" />
            <ViewField label="Description" value={item.description} className="md:col-span-2 lg:col-span-3" />
            <ViewField label="Garment type" value={item.garment_type} />
            <ViewField label="Category" value={item.category} />
            <ViewField label="Gender" value={item.gender} />
            <ViewField label="Age" value={item.age} />
            <ViewField label="Colour" value={item.color} />
            <ViewField label="Fabric type" value={item.fabric_type} />
            <ViewField label="Fabric composition" value={item.fabric_composition} className="lg:col-span-2" />
            <ViewField label="Print category" value={item.print_category} />
            <ViewField label="Embroidery category" value={item.embroidery_category} />
            <ViewField label="Neck" value={item.neck} />
            <ViewField label="Design" value={item.design} />
          </section>
        </div>
      </aside>
      {previewIndex !== null ? (
        <FullscreenImageCarousel
          title={item.name || item.garment_code || "Catalogue image"}
          s3Keys={imageKeys}
          startIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      ) : null}
    </div>
  );
}
