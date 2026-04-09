"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePresignedUrl } from "@/app/catalogue/components/usePresignedUrl";

type CardImageCarouselProps = {
  s3Keys: string[];
  alt: string;
};

export function CardImageCarousel({ s3Keys, alt }: CardImageCarouselProps) {
  const [idx, setIdx] = useState(0);
  const currentKey = s3Keys[idx];
  const { url } = usePresignedUrl(currentKey);

  useEffect(() => {
    setIdx(0);
  }, [s3Keys]);

  const canPrev = idx > 0;
  const canNext = idx < s3Keys.length - 1;

  if (!s3Keys.length) {
    return (
      <div className="flex aspect-[2/3] items-center justify-center bg-muted/30 text-xs text-muted-foreground">
        No image
      </div>
    );
  }

  return (
    <div className="relative aspect-[2/3] bg-muted/20">
      {url ? (
        <img src={url} alt={alt} className="h-full w-full object-contain" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          Loading...
        </div>
      )}
      {s3Keys.length > 1 ? (
        <>
          <button
            type="button"
            disabled={!canPrev}
            onClick={(event) => {
              event.stopPropagation();
              setIdx((current) => Math.max(0, current - 1));
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-1.5 shadow disabled:opacity-40"
            aria-label="Previous card image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={!canNext}
            onClick={(event) => {
              event.stopPropagation();
              setIdx((current) => Math.min(s3Keys.length - 1, current + 1));
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-1.5 shadow disabled:opacity-40"
            aria-label="Next card image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      ) : null}
    </div>
  );
}
