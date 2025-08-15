import React, { useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "./Button";
import type { EmptyStateProps } from "../types";

export const EmptyState: React.FC<EmptyStateProps> = React.memo(({ onAddProduct }) => {
  
  const handleAddProduct = useCallback(() =>{
    onAddProduct()
  }, [])

  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg mb-4">பொருட்கள் இல்லை</p>
      <Button icon={Plus} onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
        பொருள் சேர்க்க
      </Button>
    </div>
  );
});

EmptyState.displayName = 'EmptyState'; 