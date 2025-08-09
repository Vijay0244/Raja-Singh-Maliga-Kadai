import React, { useCallback, useMemo } from "react";
import { Filter } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";
import { CATEGORIES } from "../constants";
import { useProductStore } from "../store/useProductStore";
import type { FilterPanelProps } from "../types";

export const FilterPanel: React.FC<FilterPanelProps> = React.memo(({ showFilters, onToggleFilters }) => {
  
  const { filters, setFilters } = useProductStore()
  
  const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) =>{
    setFilters(newFilters)
  }, [setFilters])

  const categoryOptions = useMemo(() => [
    {
      value: "",
      label: "எல்லா வகைகள்"
    },
    ...CATEGORIES.map((element) => ({
      value: element.value,
      label: element.label
    })),
  ], [])

  const sortOptions = useMemo(() => [
    {
      value: "பொருளின் பெயர்",
      label: "பெயர் வரிசை"
    },
    {
      value: "வாங்கிய விலை",
      label: "வாங்கிய விலை வரிசை"
    },
    {
      value: "விற்கும் விலை",
      label: "விற்கும் விலை வரிசை"
    },
    {
      value: "கடைசி மாற்றிய தேதி",
      label: "தேதி வரிசை"
    }
  ], [])

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <Button variant="secondary" icon={Filter} onClick={onToggleFilters}>வடிகட்ட</Button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={filters.category || ''} onChange={(e) => handleFilterChange({ category: e.target.value })} options={categoryOptions} label="வகை" />
          <Select value={filters.sortBy || ''} onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })} options={sortOptions} label="வரிசை" />
          <Input type="date" value={filters.fromDate || ''} onChange={(e) => handleFilterChange({ fromDate: e.target.value })} label="தொடங்கும் தேதி" />
          <Input type="date" value={filters.toDate || ''} onChange={(e) => handleFilterChange({ toDate: e.target.value })} label="முடியும் தேதி" />
        </div>
      )}
    </div>
  );
});

FilterPanel.displayName = 'FilterPanel'; 