import React, { useEffect, useState } from "react";
import { Plus, Search, Filter, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "../types";
import { ProductCard } from "../components/ProductCard";
import { PriceHistoryModal } from "../components/PriceHistoryModal";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { useProductStore } from "../store/useProductStore";
import { CATEGORIES } from "../constants";
import Loading from "../components/Loading";

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { fetchProducts, isFetchingAllProducts, products, filters, setFilters } = useProductStore()

  const [historyProduct, setHistoryProduct] = useState<IProduct | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters)
  }

  if(isFetchingAllProducts){
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="தேடு..." value={filters.search || ''} onChange={(e) => handleFilterChange({ search: e.target.value })} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <Button variant="secondary" icon={Filter} onClick={() => setShowFilters(!showFilters)}>வடிகட்ட</Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select 
                value={filters.category || ''} 
                onChange={(e) => handleFilterChange({ category: e.target.value })}
                options={[
                  {
                    value: "",
                    label: "எல்லா வகைகள்"
                  },
                  ...CATEGORIES.map((element) => ({
                    value: element.value,
                    label: element.label
                  })),
                ]}
              />

              <Select 
                value={filters.sortBy || ''} 
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                options={[
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
                ]}
              />

              <Input type="date" value={filters.fromDate || ''} onChange={(e) => handleFilterChange({ fromDate: e.target.value })} label="தொடங்கும் தேதி" />
              <Input type="date" value={filters.toDate || ''} onChange={(e) => handleFilterChange({ toDate: e.target.value })} label="முடியும் தேதி" />
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {products.length === 0 && "பொருட்கள் இல்லை"}
            </p>
            {products.length === 0 && (
              <Button icon={Plus} onClick={() => navigate("/add-product")} className="bg-green-600 hover:bg-green-700">பொருள் சேர்க்க</Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((element: IProduct) =>(
                <div key={element._id} className="relative">
                  <ProductCard product={element}/>

                  {element && element.priceHistory && Array.isArray(element.priceHistory) && element.priceHistory.length > 0 && (
                    <History className="absolute size-7 top-5 right-5 p-1 text-purple-600 hover:text-purple-800 cursor-pointer" onClick={() => setHistoryProduct(element)} />
                  )}
                </div>
            ))}
          </div>
        )}
      </div>

      {historyProduct && <PriceHistoryModal isOpen={!!historyProduct} product={historyProduct} onClose={() => setHistoryProduct(null)} />}
    </>
  );
};
