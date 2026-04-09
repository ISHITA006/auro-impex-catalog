"use client";

import { usePresignedUrl } from "@/app/catalogue/components/usePresignedUrl";

type PresignedLargeImageProps = {
  s3Key: string;
  alt: string;
  onClick?: () => void;
};

export function PresignedLargeImage({ s3Key, alt, onClick }: PresignedLargeImageProps) {
  const { url } = usePresignedUrl(s3Key);

  if (!url) {
    return (
      <div className="flex h-28 w-28 items-center justify-center rounded-md border bg-muted/50 text-xs text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Preview ${alt}`}
    >
      <img src={url} alt={alt} className="h-28 w-28 rounded-md border object-cover" />
    </button>
  );
}
