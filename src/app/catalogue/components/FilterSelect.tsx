"use client";

import type { ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FilterSelectProps = {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  renderOption?: (option: string) => ReactNode;
};

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  renderOption,
}: FilterSelectProps) {
  const ANY_VALUE = "__any__";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <Select
        value={value || ANY_VALUE}
        onValueChange={(selectedValue) => onChange(selectedValue === ANY_VALUE ? "" : selectedValue)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ANY_VALUE}>Any</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {renderOption ? renderOption(option) : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
