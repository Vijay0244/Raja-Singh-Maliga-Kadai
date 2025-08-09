import React from 'react';
import { sizeClasses, variantClasses } from '../utils/helper';
import type { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', icon: Icon, children, disabled, className = '', ...props }) => {
  
  return (
    <button disabled={disabled} className={`inline-flex disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer gap-x-2 items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};
