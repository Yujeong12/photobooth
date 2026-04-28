"use client";

import { FILTERS } from "@/constants/filters";
import FilterCard from "@/components/filters/FilterCard";

type Props = {
  selectedFilterId: string;
  onSelectFilter: (id: string) => void;
};

export default function FilterPanel({
  selectedFilterId,
  onSelectFilter,
}: Props) {
  return (
    <div
      className="
        space-y-3
        max-md:flex max-md:gap-3 max-md:space-y-0
        max-md:overflow-x-auto max-md:overflow-y-hidden
        max-md:pb-2
      "
    >
      {FILTERS.map((filter) => (
        <FilterCard
          key={filter.id}
          filter={filter}
          isSelected={filter.id === selectedFilterId}
          onClick={() => onSelectFilter(filter.id)}
        />
      ))}
    </div>
  );
}
