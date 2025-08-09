import type { LucideIcon } from 'lucide-react';

export interface IPriceHistory{
    costPrice: number | any; 
    sellingPrice: number | any; 
    date: Date;
}

export interface IProduct {
    _id?: string;
    name: string;   
    unit: 'கிராம்' | 'கிலோ' | 'லிட்டர்' | 'மில்லிலிட்டர்';
    category: string;
    costPrice: number | any;
    sellingPrice: number | any;
    date?: Date;
    quantity: number;
    priceHistory?: IPriceHistory[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface IProductFilters {
    category?: string;
    search?: string;
    fromDate?: string;
    toDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IProductStore{
    products: IProduct[];
    allProducts: IProduct[]; // Store all products for filtering
    product: IProduct | null;
    pagination: IPagination | null;
    filters: IProductFilters;
    isFetchingAllProducts: boolean;
    isFetchingEachProduct: boolean;
    isAddingProduct: boolean;
    isEditingProduct: boolean;
    isDeletingProduct: boolean;
    error: string | null;

    setError: (error: string | null) => void;
    setFilters: (filters: Partial<IProductFilters>) => void;
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: string) => Promise<void>;
    addProduct: (product: IProduct) => Promise<void>;
    editProduct: (id: string, product: IProduct) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    children?: React.ReactNode;
}

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface EditProductModalProps {
    isOpen: boolean;
    product: IProduct | null;
    onClose: () => void;
    onSave: (id: string, data: Partial<IProduct>) => void;
    isLoading?: boolean;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export interface PriceHistoryModalProps {
    isOpen: boolean;
    product: IProduct | null;
    onClose: () => void;
}

export interface ProductCardProps {
    product: IProduct;
}

export interface ProductFormProps {
    formData: IProduct;
    setFormData: React.Dispatch<React.SetStateAction<IProduct>>;
    onSubmit: (data: IProduct) => void;
    onCancel: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export interface DeleteConfirmModalProps {
    isOpen: boolean;
    product: IProduct | null;
    onClose: () => void;
    onConfirm: (id: string) => void;
    isLoading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
}


export interface ProductGridProps {
    products: IProduct[];
    onHistoryClick: (product: IProduct) => void;
}

export interface SearchBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    isSearching?: boolean;
}

export interface FilterPanelProps {
    showFilters: boolean;
    onToggleFilters: () => void;
}

export interface EmptyStateProps {
    onAddProduct: () => void;
}