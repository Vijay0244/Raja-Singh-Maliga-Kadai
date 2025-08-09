import { create } from "zustand";
import { Axios } from "../utils/Axios";
import type { IProduct, IProductStore, IProductFilters } from "../types";
import { handleError } from "../utils/handleError";
import { tempFilterProducts } from "../utils/tempFilter";

export const useProductStore = create<IProductStore>((set, get) => ({
    products: [],
    allProducts: [], // Store all products for filtering
    product: null,
    pagination: null,
    filters: {
        search: '',
        category: '',
        fromDate: '',
        toDate: '',
        sortBy: 'name',
        sortOrder: 'asc'
    },
    isFetchingAllProducts: true,
    isFetchingEachProduct: false,
    isAddingProduct: false,
    isEditingProduct: false,
    isDeletingProduct: false,
    error: null,

    setError: (error: string | null) =>{
        set({ error: error })
    },

    setFilters: (newFilters: Partial<IProductFilters>) => {
        const { filters, allProducts } = get()
        const updatedFilters = { ...filters, ...newFilters }
        
        // Only apply filtering if we have products
        if (allProducts.length > 0) {
            // Use requestAnimationFrame for smoother UI updates
            requestAnimationFrame(() => {
                const filteredProducts = tempFilterProducts(allProducts, updatedFilters)
                set({ 
                    filters: updatedFilters,
                    products: filteredProducts
                })
            })
        } else {
            set({ filters: updatedFilters })
        }
    },

    fetchProducts: async() =>{
        const { setError } = get()
        try{
            const response = await Axios.get('/products/get/all')
            if(response.data.success){
                const fetchedProducts = response.data.products.reverse()
                
                // Store all products and apply current filters
                const { filters } = get()
                const filteredProducts = tempFilterProducts(fetchedProducts, filters)
                
                set({ 
                    allProducts: fetchedProducts,
                    products: filteredProducts
                })
            }
        } 
        catch(err: any){
            console.log(`Error in Fetching Products - ${err.message}`)    
            handleError(err, setError)
        } 
        finally{
            set({ isFetchingAllProducts: false })
        }
    },

    fetchProductById: async(id: string) =>{
        set({ isFetchingEachProduct: true })
        const { setError } = get()
        try{
            const response = await Axios.get(`/products/get/each/${id}`)
            if(response.data.success){
                set({ product: response.data.product })
            }
        } 
        catch(err: any){
            console.log(`Error in Fetching Product - ${err.message}`)
            handleError(err, setError)
        } 
        finally{
            set({ isFetchingEachProduct: false })
        }
    },

    addProduct: async(product: IProduct) =>{
        set({ isAddingProduct: true })
        const { products, allProducts, setError } = get()
        try{
            const response = await Axios.post("/products/add", {name: product.name, category: product.category, unit: product.unit, costPrice: product.costPrice, sellingPrice: product.sellingPrice, quantity: product.quantity})
            if(response.data.success){
                const newProduct = response.data.newProduct
                const updatedProducts = [newProduct, ...products]
                const updatedAllProducts = [newProduct, ...allProducts]
                
                set({ 
                    products: updatedProducts,
                    allProducts: updatedAllProducts
                })
            } 
        } 
        catch(err: any){
            console.log(`Error in Adding Product - ${err.message}`)
            handleError(err, setError)
        } 
        finally {
            set({ isAddingProduct: false })
        }
    },

    editProduct: async(id: string, product: IProduct) =>{
        set({ isEditingProduct: true })
        const { products, allProducts, setError } = get()
        try{
            const response = await Axios.put(`/products/edit/${id}`, {name: product.name, category: product.category, unit: product.unit, costPrice: product.costPrice, sellingPrice: product.sellingPrice, quantity: product.quantity})
            if(response.data.success){
                const updatedProduct = response.data.updatedProduct
                const updatedProducts = products.map((element: IProduct) => 
                    element._id === id ? updatedProduct : element
                )
                const updatedAllProducts = allProducts.map((element: IProduct) => 
                    element._id === id ? updatedProduct : element
                )
                
                set({ 
                    products: updatedProducts,
                    allProducts: updatedAllProducts
                })
            }
        } 
        catch(err: any){
            console.log(`Error in Editing Product - ${err.message}`)
            handleError(err, setError)
        } 
        finally{
            set({ isEditingProduct: false })
        }
    },

    deleteProduct: async (id: string) => {
        set({ isDeletingProduct: true })
        const { products, allProducts, setError } = get()
        try {
            const response = await Axios.delete(`/products/delete/${id}`)
            if(response.data.success){
                const updatedProducts = products.filter((product: IProduct) => product._id !== id);
                const updatedAllProducts = allProducts.filter((product: IProduct) => product._id !== id);
                
                set({ 
                    products: updatedProducts,
                    allProducts: updatedAllProducts
                })
            }
        } 
        catch(err: any){
            console.log(`Error in Deleting Product - ${err.message}`)
            handleError(err, setError)
        } 
        finally{
            set({ isDeletingProduct: false })
        }
    }
}))