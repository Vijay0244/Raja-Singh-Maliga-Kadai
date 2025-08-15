import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { IProduct } from '../types';
import { ProductForm } from '../components/ProductForm';
import { Button } from '../components/Button';
import { useProductStore } from '../store/useProductStore';
import { validate } from '../utils/validate';
import Loading from '../components/Loading';

export const EditProductPage: React.FC = () => {
  
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { product, editProduct, isEditingProduct, fetchProductById, isFetchingEachProduct, setError, error } = useProductStore()

  const [formData, setFormData] = useState<IProduct>({
    name: product?.name || '',
    category: product?.category || '',
    unit: product?.unit || 'கிராம்',
    costPrice: product?.costPrice?.$numberDecimal || 0,
    sellingPrice: product?.sellingPrice?.$numberDecimal || 0,
    quantity: product?.quantity || 0,
  })

  useEffect(() =>{
    fetchProductById(id!)
  }, [])

  const handleSubmit = async(data: IProduct) =>{
    const validationError = validate(data.name, data.category, data.unit, data.costPrice, data.sellingPrice, data.quantity)
    if(!validationError.success){
      return setError(validationError.error)
    }
    await editProduct(id!, data)
    navigate(-1)
    setError(null)
  }

  useEffect(() =>{
    setError(null)
  }, [])

  if(isFetchingEachProduct){
    return (
      <Loading />
    )
  }

  if(!product){
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">பொருள் கிடைக்கவில்லை</p>
          <Button onClick={() => navigate('/')}>
            முகப்பு
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="secondary" size="md" onClick={() => navigate(-1)} icon={ArrowLeft}></Button>
        <h1 className="text-2xl font-bold text-gray-900">பொருளை மாற்று</h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProductForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onCancel={() => navigate('/')} isLoading={isEditingProduct} error={error} />
        </div>
      </div>
    </div>
  );
};
