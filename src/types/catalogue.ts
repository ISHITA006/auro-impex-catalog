export type CatalogImageResponse = {
  uid: string;
  garment_uid: string;
  image_s3_key: string;
};

export type CatalogueResponse = {
  uid: string;
  garment_code: string;
  name: string;
  description: string | null;
  garment_type: string;
  category: string;
  gender: string;
  age: string;
  color: string;
  fabric_type: string | null;
  fabric_composition: string;
  print_category: string | null;
  embroidery_category: string | null;
  neck: string;
  design: string;
  images: CatalogImageResponse[];
  created_at: string;
  updated_at: string;
};

export type CatalogueListResponse = {
  data: CatalogueResponse[];
  total: number;
  page: number;
  page_size: number;
  page_count: number;
};
