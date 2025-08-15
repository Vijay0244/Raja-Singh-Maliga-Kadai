import React from 'react';
import type { DeleteConfirmModalProps } from '../types';
import { Modal } from './Modal';
import { Button } from './Button';
import { Trash2 } from 'lucide-react';


export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, product, onClose, onConfirm, isLoading = false }) => {

  if(!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`நீங்கள் "${product.name}" ஐ நீக்க விரும்புகிறீர்களா?`}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">{`"${product.name}" ஐ நீக்க விரும்புகிறீர்களா?`}</h3>
        <p className="text-sm text-gray-500 mb-6">நீக்குவதில் உறுதியாக இருக்கிறீர்களா?</p>

        <div className="flex space-x-3">
          <Button variant="danger" onClick={() => onConfirm(product._id as string)} disabled={isLoading} className="flex-1">
            {`"${product.name}" ஐ நீக்கவும்`}
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">
            {`"${product.name}" ஐ ரத்து செய்யவும்`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
