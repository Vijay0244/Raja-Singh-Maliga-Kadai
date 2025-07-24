import { Request, Response } from "express";
import mongoose from "mongoose";
import { getTranslations } from "../utils/translate";
import ProductModel from "../models/ProductModel";
import { validate } from "../utils/validate";
import { IProductDocument } from "../types/indes";
import { enToTaUnitMap, taToEnUnitMap } from "../constants/unitMapping";

export const addProductController = async(req: Request, res: Response) =>{
    try{
        const { name, category, unit, costPrice, sellingPrice, quantity, lang } = req.body

        const result = validate(name, category, unit, costPrice, sellingPrice, quantity, lang)
        if(!result.success){
            return res.status(400).json(result)
        }

        const translatedName = await getTranslations(name, lang)
        const translatedCategory = await getTranslations(category, lang)
        
        let translatedUnit: { en: string, ta: string }

        if(lang === 'ta'){
            translatedUnit = {
                en: taToEnUnitMap[unit] || unit,
                ta: unit
            }
        } 
        else{
            translatedUnit = {
                en: unit,
                ta: enToTaUnitMap[unit] || unit
            }
        }

        const newProduct: IProductDocument = new ProductModel({
            costPrice: costPrice,
            sellingPrice: sellingPrice,
            quantity: quantity,
            translation: {
                en: {
                    name: translatedName.en,
                    unit: translatedUnit.en,
                    category: translatedCategory.en
                },
                ta: {
                    name: translatedName.ta,
                    unit: translatedUnit.ta,
                    category: translatedCategory.ta
                }
            },
            priceHistory: [{
                costPrice: costPrice,
                sellingPrice: sellingPrice,
                date: new Date()
            }],
            date: new Date()
        })
        await newProduct.save()
        return res.status(200).json({success: true, message: 'Product created successfully', newProduct: newProduct})
    }
    catch(err: any){
        console.log(`Error in Add Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const getAllProductController = async(req: Request, res: Response) =>{
    try{
        const lang = (req.query.lang as 'en' | 'ta') || 'ta'

        if(!['en', 'ta'].includes(lang)){
            return res.status(400).json({success: false, error: 'Invalid or missing language query'})
        }

        const products = await ProductModel.aggregate([
            {
                $project: {
                    _id: 1,
                    costPrice: 1,
                    sellingPrice: 1,
                    quantity: 1,
                    date: 1,
                    priceHistory: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    name: `$translation.${lang}.name`,
                    unit: `$translation.${lang}.unit`,
                    category: `$translation.${lang}.category`,
                }
            }
        ])

        return res.status(200).json({success: true, products: products})
    }
    catch(err: any){
        console.log(`Error in Get All Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const getEachProductController = async(req: Request, res: Response) =>{
    try{
        const { id } = req.params
        const lang = (req.query.lang as 'en' | 'ta') || 'ta'

        if(!id){
            return res.status(400).json({success: false, error: 'Missing product ID'})
        } 
        if(!['en', 'ta'].includes(lang)){
            return res.status(400).json({success: false, error: 'Invalid or missing language query'})
        }

        const product = await ProductModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $project: {
                    _id: 1,
                    costPrice: 1,
                    sellingPrice: 1,
                    quantity: 1,
                    date: 1,
                    priceHistory: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    name: `$translation.${lang}.name`,
                    unit: `$translation.${lang}.unit`,
                    category: `$translation.${lang}.category`,
                }
            }
        ])

        if(!product || product.length === 0){
            return res.status(404).json({success: false, error: 'Product not found'})
        }

        return res.status(200).json({success: true, product: product[0]})
    }
    catch(err: any){
        console.log(`Error in Get Each Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const editProductController = async(req: Request, res: Response) =>{
    try{
        const { id } = req.params
        const { name, category, unit, costPrice, sellingPrice, quantity, lang } = req.body

        if(!id){
            return res.status(400).json({success: false, error: 'Missing product ID'})
        }

        const result = validate(name, category, unit, costPrice, sellingPrice, quantity, lang)
        if(!result.success){
            return res.status(400).json(result)
        }

        const existingProduct = await ProductModel.findById(id)
        if(!existingProduct){
            return res.status(404).json({success: false, error: 'Product not found'})
        }

        const translatedName = await getTranslations(name, lang)
        const translatedCategory = await getTranslations(category, lang)
        
        let translatedUnit: { en: string, ta: string }
        if(lang === 'ta'){
            translatedUnit = {
                en: taToEnUnitMap[unit] || unit,
                ta: unit
            }
        } 
        else{
            translatedUnit = {
                en: unit,
                ta: enToTaUnitMap[unit] || unit
            }
        }

        const translationUpdate = {
            en: {
                name: translatedName.en,
                unit: translatedUnit.en,
                category: translatedCategory.en
            },
            ta: {
                name: translatedName.ta,
                unit: translatedUnit.ta,
                category: translatedCategory.ta
            }
        }

        const costChanged = existingProduct.costPrice.toString() !== costPrice.toString()
        const sellingChanged = existingProduct.sellingPrice.toString() !== sellingPrice.toString()

        const updateFields: any = {
            costPrice: costPrice,
            sellingPrice: sellingPrice,
            quantity: quantity,
            translation: translationUpdate
        }

        const updateOps: any = {
            $set: updateFields
        }

        if (costChanged || sellingChanged) {
            updateOps.$push = {
                priceHistory: {
                    costPrice: costPrice,
                    sellingPrice: sellingPrice,
                    date: new Date()
                }
            }
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateOps, {
            new: true,
            runValidators: true
        })

        return res.status(200).json({success: true, message: 'Product updated successfully', product: updatedProduct})
    }
    catch(err: any){
        console.log(`Error in Edit Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

export const deleteProductController = async(req: Request, res: Response) =>{
    try{
        const { id } = req.params

        if(!id){
            return res.status(400).json({success: false, error: 'Missing product ID'})
        } 
        
        const deleted = await ProductModel.findOneAndDelete(new mongoose.Types.ObjectId(id))
        if(!deleted){
            return res.status(404).json({success: false, error: 'Product not found or delete failed'})
        }

        return res.status(200).json({success: true, message: 'Product deleted successfully'})
    }
    catch(err: any){
        console.log(`Error in Delete Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}