import React from 'react';
import type { ProductFormProps } from '../types';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { CATEGORIES, UNITS } from '../constants';

export const ProductForm: React.FC<ProductFormProps> = ({ formData, setFormData, onSubmit, onCancel, isLoading = false, error }) => {

  const handleChange = (name: any, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <Input label="பொருளின் பெயர்" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} error={error === 'பெயர் தேவை' ? error : ''} placeholder={"பொருளின் பெயர்"} />

      <Select label="வகை" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} error={error === 'வகை தேவை' ? error : ''} 
        options={[{ value: '', label: `வகை...` }, 
          ...CATEGORIES.map((element) => ({
            value: element.value,
            label: element.label
          }))
        ]}
      />

      <Select label="அலகு" value={formData.unit} onChange={(e) => handleChange('unit', e.target.value)} error={error === 'அலகு தேவை' ? error : ''}
        options={UNITS.map((element) => ({
          value: element.value,
          label: element.label
        }))}
      />

      <Input label="வாங்கிய விலை" type="number" value={formData.costPrice.toString()} onChange={(e) => handleChange('costPrice', parseFloat(e.target.value) || 0)} error={error === 'வாங்கிய விலை 0 க்கும் மேல் இருக்க வேண்டும்' ? error : ''} placeholder="0.00" />
      <Input label="விற்கும் விலை" type="number" value={formData.sellingPrice.toString()} onChange={(e) => handleChange('sellingPrice', parseFloat(e.target.value) || 0)} error={error === 'விற்கும் விலை 0 க்கும் மேல் இருக்க வேண்டும்' ? error : ''} placeholder="0.00" />

      <Input label="அளவு" type="number" step="1" min="0" value={formData.quantity.toString()} onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)} error={error === 'அளவு 0 க்கும் மேல் இருக்க வேண்டும்' ? error : ''} placeholder="0" />

      <div className="flex space-x-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">சேமிக்க</Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">ரத்து செய்</Button>
      </div>
    </form>
  );
};