"use client";

import { useEffect, useState } from "react";

export function usePresignedUrl(s3Key: string | undefined) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!s3Key) {
      setUrl("");
      setHasError(true);
      setIsLoading(false);
      return;
    }
    const key = s3Key;

    let cancelled = false;
    async function fetchUrl() {
      setIsLoading(true);
      setHasError(false);
      const res = await fetch(`/api/catalogue/presigned-url?s3_key=${encodeURIComponent(key)}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        if (!cancelled) {
          setHasError(true);
          setIsLoading(false);
        }
        return;
      }
      const data = (await res.json()) as { url?: string; presigned_url?: string } | string;
      const resolved = typeof data === "string" ? data : (data.url ?? data.presigned_url ?? "");
      if (!cancelled) {
        setUrl(resolved);
        setIsLoading(false);
      }
    }

    void fetchUrl();
    return () => {
      cancelled = true;
    };
  }, [s3Key]);

  return { url, isLoading, hasError };
}
