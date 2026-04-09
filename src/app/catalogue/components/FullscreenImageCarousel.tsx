"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { usePresignedUrl } from "@/app/catalogue/components/usePresignedUrl";

type FullscreenImageCarouselProps = {
  title: string;
  s3Keys: string[];
  startIndex: number;
  onClose: () => void;
};

export function FullscreenImageCarousel({
  title,
  s3Keys,
  startIndex,
  onClose,
}: FullscreenImageCarouselProps) {
  const [idx, setIdx] = useState(startIndex);
  const currentKey = s3Keys[idx];
  const { url, isLoading, hasError } = usePresignedUrl(currentKey);

  useEffect(() => {
    setIdx(startIndex);
  }, [startIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") setIdx((current) => Math.max(0, current - 1));
      if (event.key === "ArrowRight") setIdx((current) => Math.min(s3Keys.length - 1, current + 1));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, s3Keys.length]);

  const canPrev = idx > 0;
  const canNext = idx < s3Keys.length - 1;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/80" aria-label="Close fullscreen preview" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative flex h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="text-sm font-medium">
              {title} {s3Keys.length ? `(${idx + 1}/${s3Keys.length})` : ""}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border bg-background p-2 text-muted-foreground hover:text-foreground"
              aria-label="Close fullscreen preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/5">
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : hasError || !url ? (
              <div className="text-sm text-destructive">Failed to load image</div>
            ) : (
              <img src={url} alt={title} className="max-h-[calc(100dvh-8rem)] max-w-full object-contain" />
            )}
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setIdx((current) => Math.max(0, current - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md border bg-background/80 p-2 disabled:opacity-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setIdx((current) => Math.min(s3Keys.length - 1, current + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border bg-background/80 p-2 disabled:opacity-50"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
