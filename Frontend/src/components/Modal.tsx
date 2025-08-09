import React from 'react';
import { X } from 'lucide-react';
import type { ModalProps } from '../types';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-full overflow-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button title='Close' type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
