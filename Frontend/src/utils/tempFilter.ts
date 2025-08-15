import type { IProduct, IProductFilters } from "../types";

export const tempFilterProducts = (products: IProduct[], filters: IProductFilters): IProduct[] =>{
    if(!products.length) return []
    
    let filteredProducts = [...products]

    // Search functionality - optimized for better performance
    if(filters.search && filters.search.trim() !== ''){
        const searchTerm = filters.search.toLowerCase().trim()
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        )
        
        // Early return if no results after search
        if(filteredProducts.length === 0) return []
    }

    // Category filter - early return if no results
    if(filters.category && filters.category !== ''){
        filteredProducts = filteredProducts.filter(product => 
            product.category === filters.category
        )

        if(filteredProducts.length === 0) return []
    }

    // Date range filter - optimized date parsing
    if(filters.fromDate || filters.toDate){
        const fromDate = filters.fromDate ? new Date(filters.fromDate + 'T00:00:00') : null
        const toDate = filters.toDate ? new Date(filters.toDate + 'T23:59:59') : null

        filteredProducts = filteredProducts.filter(product =>{
            const productDate = new Date(product.date || product.createdAt || '')

            if(fromDate && toDate){
                return productDate >= fromDate && productDate <= toDate
            } 
            else if(fromDate){
                return productDate >= fromDate
            } 
            else if(toDate){
                return productDate <= toDate
            }
            return true
        })
        
        if(filteredProducts.length === 0) return []
    }

    // Sort functionality - only sort if there are results and sortBy is specified
    if(filters.sortBy && filteredProducts.length > 0){
        const sortOrder = filters.sortOrder === 'desc' ? -1 : 1
        
        filteredProducts.sort((a, b) =>{
            let aValue: any
            let bValue: any

            switch(filters.sortBy){
                case 'பொருளின் பெயர்':
                case 'name':
                    aValue = a.name.toLowerCase()
                    bValue = b.name.toLowerCase()
                    break
                case 'வாங்கிய விலை':
                case 'costPrice':
                    aValue = Number(a.costPrice)
                    bValue = Number(b.costPrice)
                    break
                case 'விற்கும் விலை':
                case 'sellingPrice':
                    aValue = Number(a.sellingPrice)
                    bValue = Number(b.sellingPrice)
                    break
                case 'கடைசி மாற்றிய தேதி':
                case 'date':
                default:
                    aValue = new Date(a.date || a.createdAt || '')
                    bValue = new Date(b.date || b.createdAt || '')
                    break
            }

            return aValue > bValue ? sortOrder : aValue < bValue ? -sortOrder : 0
        })
    }

    return filteredProducts
}