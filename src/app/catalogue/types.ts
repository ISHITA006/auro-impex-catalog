export type Filters = {
  q: string;
  garment_type: string;
  target: string;
  color: string;
  neck: string;
  design: string;
  category: string;
  fabric_type: string;
  print_category: string;
  embroidery_category: string;
};

export type SortBy = "updated_at" | "created_at" | "name" | "garment_code";
export type SortDir = "asc" | "desc";
