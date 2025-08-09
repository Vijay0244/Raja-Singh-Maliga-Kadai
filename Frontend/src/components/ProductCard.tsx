import React from "react";
import { Clock } from "lucide-react";
import type { ProductCardProps } from "../types";
import { formatDate } from "../utils/dateUtils";
import { useNavigate } from "react-router-dom";

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/products/${product._id}`)} className="hover:shadow-lg bg-white rounded-lg shadow-md p-6 transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-5">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">வகை:</span>
          <span className="font-medium">{product.category}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">அளவு:</span>
          <span className="font-medium">{product.unit}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">வாங்கிய விலை:</span>
          <span className="font-medium text-green-600">₹{product.costPrice.$numberDecimal}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 flex items-center">விற்கும் விலை:</span>
          <span className="font-medium text-blue-600">₹{product.sellingPrice.$numberDecimal}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">கடைசி விலை மாற்றம்:</span>
          <span className="font-medium text-orange-600">₹{product.costPrice.$numberDecimal}</span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-gray-600 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            கடைசி மாற்றிய தேதி:
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(product.updatedAt!)}
          </span>
        </div>
      </div>
    </div>
  );
};
