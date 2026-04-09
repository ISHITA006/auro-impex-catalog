const API_PREFIX = "/catalogue-view";

function getApiBaseUrl(): string {
  const value = process.env.CATALOG_API_BASE_URL;
  if (!value) {
    throw new Error("CATALOG_API_BASE_URL is missing in environment.");
  }
  return value.replace(/\/+$/, "");
}

export function buildBackendUrl(path: string): string {
  return `${getApiBaseUrl()}${API_PREFIX}${path}`;
}
