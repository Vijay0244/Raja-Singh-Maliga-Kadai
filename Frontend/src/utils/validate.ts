export const validate: (name: string, category: string, unit: string, costPrice: number, sellingPrice: number, quantity: number) => { success: boolean, error: string } = (name, category, unit, costPrice, sellingPrice, quantity) => {
    if(!name){
        return {success: false, error: "பெயர் தேவை"}
    }
    if(!category){
        return {success: false, error: "வகை தேவை"}
    }
    if(!unit){
        return {success: false, error: "அலகு தேவை"}
    }
    if(costPrice <= 0){
        return {success: false, error: "வாங்கிய விலை 0 க்கும் மேல் இருக்க வேண்டும்"}
    }
    if(sellingPrice <= 0){
        return {success: false, error: "விற்கும் விலை 0 க்கும் மேல் இருக்க வேண்டும்"}
    }
    if(quantity <= 0){
        return {success: false, error: "அளவு 0 க்கும் மேல் இருக்க வேண்டும்"}
    }

    return {success: true, error: ""}
}
