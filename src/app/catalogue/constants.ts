import type { Filters } from "@/app/catalogue/types";

export const DEFAULT_FILTERS: Filters = {
  q: "",
  garment_type: "",
  target: "",
  color: "",
  neck: "",
  design: "",
  category: "",
  fabric_type: "",
  print_category: "",
  embroidery_category: "",
};

export const CATEGORY_FILTER_BUTTONS = [
  { label: "All", value: "" },
  { label: "Development", value: "Development" },
  { label: "Production", value: "Production" },
  { label: "Shopped Samples", value: "Shopped Sample" },
] as const;

export const TARGET_FILTER_OPTIONS = [
  { label: "Men", value: "men", gender: "Male", age: "Adult" },
  { label: "Women", value: "women", gender: "Female", age: "Adult" },
  { label: "Kids (Boys)", value: "kids_boys", gender: "Male", age: "Child" },
  { label: "Kids (Girls)", value: "kids_girls", gender: "Female", age: "Child" },
] as const;
