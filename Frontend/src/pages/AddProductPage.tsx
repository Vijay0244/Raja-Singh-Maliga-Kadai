import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IProduct } from '../types';
import { ProductForm } from '../components/ProductForm';
import { useProductStore } from '../store/useProductStore';
import { validate } from '../utils/validate';

export const AddProductPage: React.FC = () => {

  const navigate = useNavigate();
  const { addProduct, isAddingProduct, error, setError } = useProductStore()

  const [formData, setFormData] = useState<IProduct>({
    name: '',
    category: '',
    unit: 'கிராம்',
    costPrice: 0,
    sellingPrice: 0,
    quantity: 0,
  });

  const handleSubmit = async(data: IProduct) =>{
    const validationError = validate(data.name, data.category, data.unit, data.costPrice, data.sellingPrice, data.quantity)
    if(!validationError.success){
      return setError(validationError.error)
    }
    await addProduct(data)
    navigate('/')
    setError(null)
  }

  useEffect(() =>{
    setError(null)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ProductForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onCancel={() =>navigate('/')} isLoading={isAddingProduct} error={error} />
      </div>
    </div>
  );
};
