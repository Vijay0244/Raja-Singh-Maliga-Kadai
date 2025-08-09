import React from 'react';
import type { SelectProps } from '../types';

export const Select: React.FC<SelectProps> = ({ label, error, options, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? 'border-red-500' : ''} ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
