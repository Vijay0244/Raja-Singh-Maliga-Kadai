import React, { useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import type { SearchBarProps } from "../types";


export const SearchBar: React.FC<SearchBarProps> = React.memo(({ searchValue, onSearchChange, isSearching = false }) => {
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>{
    onSearchChange(e.target.value)
  }, [])

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4 animate-spin" />
        )}
        <input type="text" placeholder="தேடு..." value={searchValue} onChange={handleChange} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar'; 