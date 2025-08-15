import React, { useCallback } from "react";
import { History } from "lucide-react";
import type { IProduct, ProductGridProps } from "../types";
import { ProductCard } from "./ProductCard";

export const ProductGrid: React.FC<ProductGridProps> = React.memo(({ products, onHistoryClick }) => {

  const handleHistoryClick = useCallback((product: IProduct) =>{
    onHistoryClick(product)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((element: IProduct) =>(
        <div key={element._id} className="relative">
          <ProductCard product={element}/>
          {element && element.priceHistory && Array.isArray(element.priceHistory) && element.priceHistory.length > 0 && (
            <History className="absolute size-7 top-5 right-5 p-1 text-purple-600 hover:text-purple-800 cursor-pointer" onClick={() => handleHistoryClick(element)} />
          )}
        </div>
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid'; 