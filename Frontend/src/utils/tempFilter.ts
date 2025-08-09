import type { IProduct, IProductFilters } from "../types";

export const tempFilterProducts = (products: IProduct[], filters: IProductFilters): IProduct[] => {
    let filteredProducts = [...products];

    // Search functionality
    if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Category filter
    if (filters.category && filters.category !== '') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === filters.category
        );
    }

    // Date range filter
    if (filters.fromDate || filters.toDate) {
        filteredProducts = filteredProducts.filter(product => {
            const productDate = new Date(product.date || product.createdAt || '');
            const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
            const toDate = filters.toDate ? new Date(filters.toDate) : null;

            if (fromDate && toDate) {
                return productDate >= fromDate && productDate <= toDate;
            } else if (fromDate) {
                return productDate >= fromDate;
            } else if (toDate) {
                return productDate <= toDate;
            }
            return true;
        });
    }

    // Sort functionality
    if (filters.sortBy) {
        filteredProducts.sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (filters.sortBy) {
                case 'பொருளின் பெயர்':
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'வாங்கிய விலை':
                case 'costPrice':
                    aValue = Number(a.costPrice);
                    bValue = Number(b.costPrice);
                    break;
                case 'விற்கும் விலை':
                case 'sellingPrice':
                    aValue = Number(a.sellingPrice);
                    bValue = Number(b.sellingPrice);
                    break;
                case 'கடைசி மாற்றிய தேதி':
                case 'date':
                default:
                    aValue = new Date(a.date || a.createdAt || '');
                    bValue = new Date(b.date || b.createdAt || '');
                    break;
            }

            if (filters.sortOrder === 'desc') {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            } else {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            }
        });
    }

    return filteredProducts;
};