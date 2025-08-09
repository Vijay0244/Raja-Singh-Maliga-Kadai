import React from 'react';
import type { IPriceHistory, PriceHistoryModalProps } from '../types';
import { Modal } from './Modal';
import { formatDate } from '../utils/dateUtils';


export const PriceHistoryModal: React.FC<PriceHistoryModalProps> = ({ isOpen, product, onClose }) => {

  if(!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`"${product.name}" விலை வரலாறு`}>
      <div className="max-h-96 overflow-y-auto">
        {product.priceHistory && product.priceHistory.length > 0 ? (
          <div className="space-y-3">
            {product.priceHistory.map((history: IPriceHistory, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">வாங்கிய விலை</span>
                    <span className="ml-2 font-medium text-green-600">{history.costPrice.$numberDecimal}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">விற்கும் விலை:</span>
                    <span className="ml-2 font-medium text-blue-600">{history.sellingPrice.$numberDecimal}</span>
                  </div>
                  <div className="col-span-2 text-xs text-gray-500 mt-1">{formatDate(history.date)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            விலை வரலாறு இல்லை.
          </p>
        )}
      </div>
    </Modal>
  );
};
