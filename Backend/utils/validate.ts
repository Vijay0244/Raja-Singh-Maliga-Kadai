export const validate = (name: string, category: string, unit: string, costPrice: number, sellingPrice: number, quantity: number, lang: string) => {
    const errorMsg = (enMsg: string, taMsg: string) =>lang === 'ta' ? taMsg : enMsg

    if(!name){
        return {success: false, error: errorMsg("Name is required", "பெயர் தேவை")}
    }
    if(!category){
        return {success: false, error: errorMsg("Category is required", "வகை தேவை")}
    }
    if(!unit){
        return {success: false, error: errorMsg("Unit is required", "அலகு தேவை")}
    }
    if(!costPrice){
        return {success: false, error: errorMsg("Cost Price is required", "செலவுக் விலை தேவை")}
    }
    if(!sellingPrice){
        return {success: false, error: errorMsg("Selling Price is required", "விற்பனை விலை தேவை")}
    }
    if(!quantity){
        return {success: false, error: errorMsg("Quantity is required", "அளவு தேவை")}
    }

    return {success: true}
}
