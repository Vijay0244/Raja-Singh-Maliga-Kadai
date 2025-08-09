import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "../types";
import { PriceHistoryModal } from "../components/PriceHistoryModal";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { EmptyState } from "../components/EmptyState";
import { ProductGrid } from "../components/ProductGrid";
import { useProductStore } from "../store/useProductStore";
import { useDebounce } from "../hooks/useDebounce";
import Loading from "../components/Loading";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { fetchProducts, isFetchingAllProducts, products, filters, setFilters } = useProductStore()

    const [historyProduct, setHistoryProduct] = useState<IProduct | null>(null)
    const [showFilters, setShowFilters] = useState(false)
    const [searchValue, setSearchValue] = useState(filters.search || '')
    const [isSearching, setIsSearching] = useState(false)
    
    // Debounce search input
    const debouncedSearchValue = useDebounce(searchValue, 150)

    useEffect(() => {
      fetchProducts()
    }, [])

    // Update search filter when debounced value changes
    useEffect(() => {
      if(debouncedSearchValue !== filters.search){
        setIsSearching(true)
        setFilters({ search: debouncedSearchValue })
        // Reset searching state after a short delay
        setTimeout(() => setIsSearching(false), 100)
      }
    }, [debouncedSearchValue, setFilters, filters.search])

    const handleSearchChange = useCallback((value: string) =>{
      setSearchValue(value)
    }, [])

    const handleHistoryClick = useCallback((product: IProduct) =>{
      setHistoryProduct(product)
    }, [])

    const handleCloseHistory = useCallback(() =>{
      setHistoryProduct(null)
    }, [])

    const toggleFilters = useCallback(() =>{
      setShowFilters(prev => !prev)
    }, [])

    const handleAddProduct = useCallback(() =>{
      navigate("/add-product")
    }, [navigate])

    if(isFetchingAllProducts){
      return <Loading />
    }

    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <SearchBar searchValue={searchValue} onSearchChange={handleSearchChange} isSearching={isSearching} />
            </div>
          </div>

          <FilterPanel showFilters={showFilters} onToggleFilters={toggleFilters} />

          {products.length === 0 ? (
            <EmptyState onAddProduct={handleAddProduct} />
          ) : (
            <ProductGrid products={products} onHistoryClick={handleHistoryClick} />
          )}
        </div>

        {historyProduct && <PriceHistoryModal isOpen={!!historyProduct} product={historyProduct} onClose={handleCloseHistory} />}
      </>
    );
};
